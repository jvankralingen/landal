#!/usr/bin/env node
// Enrich vacancies.json with park names by matching JobPosting locality to parkData.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PARKDATA = path.join(__dirname, '..', 'src', 'data', 'parkData.js');
const VACANCIES = path.join(__dirname, '..', 'src', 'features', 'campaign-configurator', 'data', 'vacancies.json');
const RAW_VACANCIES = path.join(__dirname, 'vacancies-enriched.json');

// 1. Extract park entries from parkData.js without importing it (uses ESM + image deps).
const src = fs.readFileSync(PARKDATA, 'utf8');

// Walk top-level structure: country -> regions -> region -> parks []
// We extract park objects with their containing country/region labels.
const parks = [];
const countryBlocks = src.split(/^(\s*)([a-z_]+):\s*\{/gm);
// Simpler: parse all park entries with a robust regex.
const parkRe = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]/g;
let m;
while ((m = parkRe.exec(src)) !== null) {
  parks.push({ id: m[1], name: m[2] });
}

// Find region containers and their parks - parse hierarchically.
// We re-scan by tracking the most recent country + region label per park position.
const countryRe = /^\s*([a-z_]+):\s*\{\s*\n\s*label:\s*['"]([^'"]+)['"]/gm;
const regionRe = /^\s*([a-z_]+):\s*\{\s*\n\s*label:\s*['"]([^'"]+)['"]/gm;

// Build position-keyed index of country / region starts
const positions = [];
{
  const lineRe = /\n(\s*)([a-z_]+):\s*\{[\s\n]+label:\s*['"]([^'"]+)['"]/g;
  let lm;
  while ((lm = lineRe.exec(src)) !== null) {
    positions.push({ pos: lm.index, indent: lm[1].length, key: lm[2], label: lm[3] });
  }
}

function findContextAt(parkPos) {
  let country = null;
  let region = null;
  for (const p of positions) {
    if (p.pos > parkPos) break;
    if (p.indent <= 2) country = p;
    else if (p.indent <= 6) region = p;
  }
  return { country, region };
}

// Rebuild parks list with location context.
const parksWithContext = [];
const fullParkRe = /\{\s*id:\s*['"]([^'"]+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]/g;
let mm;
while ((mm = fullParkRe.exec(src)) !== null) {
  const ctx = findContextAt(mm.index);
  parksWithContext.push({
    id: mm[1],
    name: mm[2],
    countryKey: ctx.country?.key ?? null,
    countryLabel: ctx.country?.label ?? null,
    regionKey: ctx.region?.key ?? null,
    regionLabel: ctx.region?.label ?? null,
  });
}

console.log(`Parsed ${parksWithContext.length} parks from parkData.js`);

// 2. Build normalization helpers.
function norm(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/['"`]/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tokens(s) {
  return new Set(norm(s).split(/\s+/).filter(Boolean));
}

// 3. Build lookup: by id, by name tokens, by region tokens.
const byId = new Map();
for (const p of parksWithContext) byId.set(p.id, p);

// Manual locality (or known park-village) -> park id. Used when the locality
// is a village/town that doesn't match the park name directly. Verify before demo.
const LOCALITY_TO_PARK_ID = {
  hapert: 'vennenbos',
  aalden: 'aelderholt',
  borger: 'hunzepark',
  nooitgedacht: 'hof_van_saksen',
  witteveen: 'drentse_lagune',
  gasselternijveen: 'hunzedal',
  ees: 'land_van_bartje',
  kamperland: 'veerse_kreek',
  oosterhout: 'katjeskelder',
  mierlo: 'strabrechtse_vennen',
  'nieuw milligen': 'rabbit_hill',
  weert: 'weerterbergen',
  holten: 'sallandse_heuvelrug',
  eerbeek: 'hoevegaerde',
  epe: 'heideheuvel',
  renesse: 'resort_haamstede',
  breskens: 'nieuwvliet',
  hellevoetsluis: 'cape_helius',
  vrouwenpolder: 'banjaard',
  reuver: 'klein_vink',
  beekbergen: 'heihaas',
  braamt: 'stroombroek',
  overveen: 'bloemendaal_aan_zee',
  someren: 'strabrechtse_vennen',
  posterholt: 'aerwinkel',
  overloon: 'park_de_peel',
  overberg: 'rhenen',
  zwartewaal: 'lakeside_brielle',
  goes: 'veerse_kreek',
  beuningen: 'twenhaarsveld',
  hollum: 'elfstedenhart',
  wolphaartsdijk: 'veerse_kreek',
  // HQ locations - leave as null since role=hoofdkantoor handles them
  // amsterdam: null,
  // zwolle: null,
};

function matchPark(locality, region) {
  if (!locality) return null;
  const locNorm = norm(locality);
  if (!locNorm) return null;
  const locTokens = locNorm.split(/\s+/);

  // Manual override first
  const manualId = LOCALITY_TO_PARK_ID[locNorm];
  if (manualId && byId.has(manualId)) return byId.get(manualId);

  // Try direct id match (single-word locality)
  const idCandidate = locTokens.join('_');
  if (byId.has(idCandidate)) return byId.get(idCandidate);

  // Try slugified locality vs id (e.g. "ouddorp" -> "ouddorp_duin"? partial match)
  // Score parks based on token overlap between locality and park name.
  let best = null;
  let bestScore = 0;
  for (const p of parksWithContext) {
    const nameTokens = tokens(p.name);
    let score = 0;
    for (const t of locTokens) {
      if (nameTokens.has(t)) score += 2;
    }
    // Region bonus
    if (region && p.regionLabel) {
      const regNorm = norm(region);
      const pRegNorm = norm(p.regionLabel);
      if (pRegNorm.includes(regNorm) || regNorm.includes(pRegNorm.split(' ')[0])) {
        score += 0.5;
      }
    }
    // ID match bonus
    if (norm(p.id).split(' ').some((t) => locTokens.includes(t))) score += 1;

    if (score > bestScore) {
      bestScore = score;
      best = p;
    }
  }

  return bestScore >= 2 ? best : null;
}

// 4. Apply matching to all vacancies.
const raw = JSON.parse(fs.readFileSync(RAW_VACANCIES, 'utf8'));
const vacancies = raw.vacancies;

let matched = 0;
let unmatchedLocalities = new Map();

const enriched = vacancies.map((v) => {
  if (v.park) return v; // Trust existing park if present from regex.
  const m = matchPark(v.locality, v.region);
  if (m) {
    matched++;
    return { ...v, park: m.name, parkId: m.id, parkRegion: m.regionLabel ?? v.region };
  }
  if (v.locality) {
    const key = `${v.locality}|${v.region ?? ''}|${v.country ?? ''}`;
    unmatchedLocalities.set(key, (unmatchedLocalities.get(key) ?? 0) + 1);
  }
  return v;
});

const summary = {
  totalVacancies: vacancies.length,
  alreadyHadPark: vacancies.filter((v) => v.park).length,
  newlyMatched: matched,
  totalWithPark: enriched.filter((v) => v.park).length,
  unmatchedLocalities: Object.fromEntries(
    [...unmatchedLocalities.entries()].sort((a, b) => b[1] - a[1])
  ),
};

fs.writeFileSync(VACANCIES, JSON.stringify({ summary: raw.summary, vacancies: enriched }, null, 2));
console.log('\n=== Park matching summary ===');
console.log(JSON.stringify(summary, null, 2));
console.log(`\nWritten to: src/features/campaign-configurator/data/vacancies.json`);
