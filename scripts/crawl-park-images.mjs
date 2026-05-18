// Crawl Landal park pages for stylelabs CDN image URLs.
//
// Usage:
//   node scripts/crawl-park-images.mjs                  # all parks
//   node scripts/crawl-park-images.mjs hoenderloo coast # subset by id
//
// Output: scripts/park-images-crawled.json
//   {
//     "hoenderloo": ["https://mss-p-014-delivery.stylelabs.cloud/...", ...],
//     ...
//   }
//
// Be polite — script sleeps 600ms between requests.

import { writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PARK_PAGE_URLS_FILE = resolve(__dirname, '../src/data/parkImageUrls.js');
const OUT_FILE = resolve(__dirname, 'park-images-crawled.json');

const CDN_PATTERN =
  /https:\/\/mss-p-014-delivery\.stylelabs\.cloud\/api\/public\/content\/[a-zA-Z0-9-]+(?:\?[^"'\s)<>]*)?/g;

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function loadParkPageUrls() {
  const url = pathToFileURL(PARK_PAGE_URLS_FILE).href;
  const mod = await import(url);
  if (!mod.parkPageUrls) throw new Error('parkPageUrls export not found');
  return mod.parkPageUrls;
}

// Aspect priority — wider crops first, square last; "original" is full-res.
const ASPECT_RANK = { '3x1': 0, '16x9': 1, '3x2': 2, '4x3': 3, '1x1': 4, 'original': 5 };

function parseUrl(rawUrl) {
  const m = rawUrl.match(/content\/(\d+)-([a-zA-Z0-9]+)(\?[^]*)?$/);
  if (!m) return null;
  const [, contentId, aspect] = m;
  return { contentId, aspect, raw: rawUrl };
}

/**
 * Pick the best 6 unique images for this park.
 *  - Group all variants by contentId.
 *  - For each group, pick the most landscape variant (3x1 > 3x2 > 4x3 > 1x1).
 *  - Force ?t=w1920 for consistent size.
 *  - Take first 6 distinct content IDs.
 */
function curate(urls, limit = 6) {
  const byContent = new Map();
  for (const url of urls) {
    const p = parseUrl(url);
    if (!p) continue;
    const existing = byContent.get(p.contentId);
    if (
      !existing ||
      (ASPECT_RANK[p.aspect] ?? 99) < (ASPECT_RANK[existing.aspect] ?? 99)
    ) {
      byContent.set(p.contentId, p);
    }
  }
  return [...byContent.values()]
    .slice(0, limit)
    .map(
      (p) =>
        `https://mss-p-014-delivery.stylelabs.cloud/api/public/content/${p.contentId}-${p.aspect}?t=w1920`
    );
}

async function crawl(parkId, url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept-Language': 'nl-NL,nl' },
      redirect: 'follow',
    });
    if (!res.ok) {
      return { ok: false, status: res.status, urls: [] };
    }
    const html = await res.text();
    const matches = html.matchAll(CDN_PATTERN);
    const allUrls = [...new Set([...matches].map((m) => m[0]))];
    const curated = curate(allUrls);
    return { ok: true, status: res.status, urls: curated, total: allUrls.length };
  } catch (err) {
    return { ok: false, status: 0, urls: [], error: String(err) };
  }
}

async function main() {
  const filter = process.argv.slice(2);
  const all = await loadParkPageUrls();
  const ids = filter.length > 0 ? filter.filter((id) => all[id]) : Object.keys(all);
  console.log(`Crawling ${ids.length} parks...`);

  const result = {};
  let i = 0;
  for (const id of ids) {
    i++;
    const url = all[id];
    process.stdout.write(`[${i}/${ids.length}] ${id.padEnd(28)} → `);
    const r = await crawl(id, url);
    if (r.ok) {
      result[id] = r.urls;
      console.log(`${r.urls.length} curated (of ${r.total} raw)`);
    } else {
      console.log(`FAIL ${r.status} ${r.error ?? ''}`);
    }
    await sleep(600);
  }

  await writeFile(OUT_FILE, JSON.stringify(result, null, 2), 'utf8');
  console.log(`\nWrote ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
