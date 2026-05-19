#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, 'vacancies-base.json');
const OUT = path.join(__dirname, 'vacancies-enriched.json');
const CACHE = path.join(__dirname, '.crawl-cache.json');

const UA = 'Mozilla/5.0 (Landal-EVP-Demo)';
const THROTTLE_MS = 200;
const PROGRESS_EVERY = 25;

const base = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const vacancies = base.vacancies;

// Resume support: re-use already-crawled entries.
let cache = {};
if (fs.existsSync(CACHE)) {
  cache = JSON.parse(fs.readFileSync(CACHE, 'utf8'));
  console.log(`Resuming with ${Object.keys(cache).length} cached entries.`);
}

function extractJsonLd(html) {
  const m = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!m) return null;
  try {
    return JSON.parse(m[1].replace(/\\u002F/g, '/'));
  } catch {
    return null;
  }
}

function extractParkName(description) {
  if (!description) return null;
  // Match "Landal <Park Name>" up to a sentence break or comma
  const m = description.match(/Landal\s+([A-Z][A-Za-zÀ-ÿ0-9'\-]+(?:\s+[A-Z][A-Za-zÀ-ÿ0-9'\-]+){0,4})/);
  if (!m) return null;
  // Strip trailing punctuation
  return m[1].replace(/[.,;:!?]+$/, '').trim();
}

async function fetchVacancy(v) {
  const res = await fetch(v.url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${v.url}`);
  const html = await res.text();
  const ld = extractJsonLd(html);

  // Title fallback from <h1>
  const h1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/);

  const title = ld?.title || h1?.[1]?.trim() || null;
  const description = ld?.description || null;
  const datePosted = ld?.datePosted || null;
  const addr = ld?.jobLocation?.address || {};
  const salary = ld?.baseSalary?.value || null;

  return {
    title,
    park: extractParkName(description),
    locality: addr.addressLocality || null,
    region: addr.addressRegion || null,
    street: addr.streetAddress || null,
    postalCode: addr.postalCode || null,
    addressCountry: addr.addressCountry || null,
    salaryMin: salary?.minValue ?? null,
    salaryMax: salary?.maxValue ?? null,
    salaryUnit: salary?.unitText ?? null,
    datePosted,
    descriptionSnippet: description ? description.slice(0, 240) : null,
  };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const enriched = [];
let ok = 0;
let fail = 0;
const startedAt = Date.now();

for (let i = 0; i < vacancies.length; i++) {
  const v = vacancies[i];
  try {
    let data = cache[v.url];
    if (!data) {
      data = await fetchVacancy(v);
      cache[v.url] = data;
      await sleep(THROTTLE_MS);
    }
    enriched.push({ ...v, ...data });
    ok++;
  } catch (err) {
    fail++;
    enriched.push({ ...v, error: String(err.message ?? err) });
  }

  if ((i + 1) % PROGRESS_EVERY === 0 || i === vacancies.length - 1) {
    const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0);
    console.log(`  ${i + 1}/${vacancies.length}  ok=${ok}  fail=${fail}  ${elapsed}s`);
    // Persist cache periodically.
    fs.writeFileSync(CACHE, JSON.stringify(cache, null, 2));
  }
}

// Compose summary
const withPark = enriched.filter((v) => v.park).length;
const withRegion = enriched.filter((v) => v.region).length;
const regionTally = {};
const parkTally = {};
for (const v of enriched) {
  if (v.region) regionTally[v.region] = (regionTally[v.region] ?? 0) + 1;
  if (v.park) parkTally[v.park] = (parkTally[v.park] ?? 0) + 1;
}
const sortedRegions = Object.fromEntries(Object.entries(regionTally).sort((a, b) => b[1] - a[1]));
const sortedParks = Object.fromEntries(Object.entries(parkTally).sort((a, b) => b[1] - a[1]).slice(0, 30));

const summary = {
  fetched: ok,
  failed: fail,
  withPark,
  withRegion,
  topRegions: sortedRegions,
  topParks: sortedParks,
};

fs.writeFileSync(OUT, JSON.stringify({ summary, vacancies: enriched }, null, 2));
console.log('\n=== Summary ===');
console.log(JSON.stringify(summary, null, 2));
console.log(`\nWritten: ${path.relative(process.cwd(), OUT)}`);
