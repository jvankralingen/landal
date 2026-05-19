#!/usr/bin/env node
// Parse the Bluewave summer inventory xlsx by reading raw XML.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, 'Inventarisatie zomer Bluewave.xlsx');
const TMP = '/tmp/bluewave-parse';
const OUT = path.join(__dirname, 'inventarisatie.json');

execSync(`rm -rf ${TMP} && mkdir -p ${TMP} && unzip -q "${SRC}" -d ${TMP}`);

const sharedXml = fs.readFileSync(`${TMP}/xl/sharedStrings.xml`, 'utf8');
const sharedStrings = [...sharedXml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)].map(([, body]) => {
  // Collect text from all <t> nodes within (rich text may have several).
  return [...body.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((m) => m[1]).join('');
});

const sheetXml = fs.readFileSync(`${TMP}/xl/worksheets/sheet1.xml`, 'utf8');

function colLetterToIndex(letters) {
  let n = 0;
  for (const ch of letters) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n - 1;
}

const rows = {};
const cellRe = /<c r="([A-Z]+)(\d+)"(?:\s+t="([^"]+)")?[^>]*>(?:<v>([^<]*)<\/v>|<is><t[^>]*>([^<]*)<\/t><\/is>)?<\/c>/g;
let m;
while ((m = cellRe.exec(sheetXml)) !== null) {
  const [, colLetters, rowStr, type, vNum, vInline] = m;
  const rowIdx = parseInt(rowStr, 10);
  const colIdx = colLetterToIndex(colLetters);
  let value;
  if (type === 's') value = sharedStrings[parseInt(vNum, 10)];
  else if (type === 'inlineStr') value = vInline;
  else value = vNum;
  if (!rows[rowIdx]) rows[rowIdx] = {};
  rows[rowIdx][colIdx] = value;
}

const sortedRowKeys = Object.keys(rows).map(Number).sort((a, b) => a - b);
const headerRow = rows[sortedRowKeys[0]] ?? {};
const headerCols = Object.keys(headerRow).map(Number).sort((a, b) => a - b);
const headers = headerCols.map((c) => headerRow[c] ?? `col${c}`);

const data = [];
for (const k of sortedRowKeys.slice(1)) {
  const row = rows[k];
  const obj = {};
  headerCols.forEach((c, i) => {
    obj[headers[i]] = row[c] ?? null;
  });
  // Skip fully empty rows
  if (Object.values(obj).every((v) => v === null || v === '')) continue;
  data.push(obj);
}

console.log(`Sheets: 1 · Rows: ${data.length} · Columns: ${headers.join(' | ')}\n`);
console.log('First 8 data rows:');
data.slice(0, 8).forEach((r) => console.log(JSON.stringify(r, null, 0)));

// Summary tallies
const byProv = {};
const byAfd = {};
const byDV = {};
const parkSet = new Set();
let totalAantal = 0;
for (const r of data) {
  const prov = r['Provincie'];
  const park = r['Park'];
  const afd = r['Afdeling'];
  const dv = r['Dienstverband'];
  const aantal = parseInt(r['Aantal'], 10);
  if (prov) byProv[prov] = (byProv[prov] ?? 0) + (isNaN(aantal) ? 0 : aantal);
  if (afd) byAfd[afd] = (byAfd[afd] ?? 0) + (isNaN(aantal) ? 0 : aantal);
  if (dv) byDV[dv] = (byDV[dv] ?? 0) + (isNaN(aantal) ? 0 : aantal);
  if (park) parkSet.add(park);
  if (!isNaN(aantal)) totalAantal += aantal;
}
const sortDesc = (o) => Object.fromEntries(Object.entries(o).sort((a, b) => b[1] - a[1]));

const summary = {
  rows: data.length,
  uniqueParks: parkSet.size,
  parks: [...parkSet].sort(),
  totalAantal,
  byProvincie: sortDesc(byProv),
  byAfdeling: sortDesc(byAfd),
  byDienstverband: sortDesc(byDV),
};
fs.writeFileSync(OUT, JSON.stringify({ summary, rows: data }, null, 2));
console.log('\n=== Summary ===');
console.log(JSON.stringify(summary, null, 2));
console.log(`\nWritten: ${path.relative(process.cwd(), OUT)}`);
