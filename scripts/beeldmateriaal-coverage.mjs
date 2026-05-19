#!/usr/bin/env node
// Coverage-overzicht voor het beeldmateriaal in de campagne-configurator.
// Output: docs/beeldmateriaal-coverage.md — bedoeld als design-briefing.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const VACANCIES = path.join(ROOT, 'src/features/campaign-configurator/data/vacancies.json');
const PARK_IMAGES = path.join(ROOT, 'src/data/parkImageUrls.js');
const ROLES_DIR = path.join(ROOT, 'public/photos/roles');
const OUT = path.join(ROOT, 'docs/beeldmateriaal-coverage.md');

// ── Role photos ─────────────────────────────────────
const ROLE_LABEL = {
  'horeca-bediening': 'Horeca · Bediening',
  'horeca-keuken': 'Horeca · Keuken',
  'front-office': 'Front Office',
  'fun-entertainment': 'Fun & Entertainment',
  techniek: 'Techniek',
  zwembad: 'Zwembad',
  retail: 'Retail / Parkshop',
  housekeeping: 'Housekeeping',
  parkmanagement: 'Parkmanagement',
  hoofdkantoor: 'Hoofdkantoor',
  overig: 'Overig',
};
const ROLE_PHOTO_MAP = {
  'horeca-bediening': '/photos/roles/horeca.webp',
  'horeca-keuken': '/photos/roles/keuken.webp',
  'front-office': '/photos/roles/receptie.webp',
  'fun-entertainment': '/photos/roles/fun_entertainment.webp',
  techniek: '/photos/roles/techniek.webp',
  zwembad: '/photos/roles/zwembad.webp',
  retail: '/photos/roles/parkshop.webp',
  housekeeping: '/photos/roles/housekeeping.webp',
  parkmanagement: 'unsplash:1521737711867',
  hoofdkantoor: '/photos/roles/hoofdkantoor.webp',
  overig: 'unsplash:1522202176988',
};

function classifyPhoto(p) {
  if (!p) return { kind: 'missing', detail: '—' };
  if (p.startsWith('/photos/')) {
    const fname = p.slice('/photos/roles/'.length);
    const full = path.join(ROLES_DIR, fname);
    const exists = fs.existsSync(full);
    return exists
      ? { kind: 'landal', detail: p }
      : { kind: 'missing', detail: `${p} (file ontbreekt)` };
  }
  if (p.startsWith('unsplash:')) return { kind: 'stock', detail: 'Unsplash fallback' };
  return { kind: 'stock', detail: p };
}

const roleRows = Object.entries(ROLE_PHOTO_MAP).map(([id, src]) => {
  const c = classifyPhoto(src);
  return { id, label: ROLE_LABEL[id], ...c };
});

// ── World vibe photos ───────────────────────────────
const WORLD_LABEL = {
  eb: 'Iedereen (EB-default)',
  hq: 'Hoofdkantoor',
  forest: 'Bos',
  coast: 'Kust',
  wadden: 'Wadden',
  family: 'Familie',
  premium: 'Premium',
  wellness: 'Wellness',
  mountain: 'Bergen',
  uk: 'UK',
};
const WORLD_VIBE_SOURCE = {
  eb: 'Unsplash · 1455849318743',
  hq: '/photos/roles/hoofdkantoor.webp',
  forest: 'Unsplash · 1448375240586',
  coast: 'Unsplash · 1507525428034',
  wadden: 'Unsplash · 1565687981296',
  family: 'Unsplash · 1543610892',
  premium: 'Unsplash · 1540541338287',
  wellness: 'Unsplash · 1540555700478',
  mountain: 'Unsplash · 1464822759023',
  uk: 'Unsplash · 1543832923',
};
const worldRows = Object.entries(WORLD_VIBE_SOURCE).map(([id, src]) => ({
  id,
  label: WORLD_LABEL[id],
  ...classifyPhoto(src),
}));

// ── Park gallery photos ─────────────────────────────
const parkSrc = fs.readFileSync(PARK_IMAGES, 'utf8');
const galleryStart = parkSrc.indexOf('export const parkGalleryImages = {');
const galleryEnd = parkSrc.indexOf('};', galleryStart);
const galleryBlock = parkSrc.slice(galleryStart, galleryEnd);
const galleryRe = /^\s*([a-z_]+):\s*\[([^\]]+)\]/gm;
const galleryParks = new Set();
const galleryCount = new Map();
let m;
while ((m = galleryRe.exec(galleryBlock)) !== null) {
  const id = m[1];
  const photos = m[2].split(',').map((s) => s.trim()).filter(Boolean);
  galleryParks.add(id);
  galleryCount.set(id, photos.length);
}

// Vacancies → unique parks
const v = JSON.parse(fs.readFileSync(VACANCIES, 'utf8'));
const parksFromVacancies = new Map();
for (const row of v.vacancies) {
  if (!row.park) continue;
  const entry = parksFromVacancies.get(row.park) ?? { count: 0, parkId: row.parkId ?? null };
  entry.count += 1;
  if (!entry.parkId && row.parkId) entry.parkId = row.parkId;
  parksFromVacancies.set(row.park, entry);
}

const parksWithGallery = [];
const parksWithoutGallery = [];
for (const [name, { parkId, count }] of parksFromVacancies) {
  const hasGallery = parkId && galleryParks.has(parkId);
  const photos = hasGallery ? galleryCount.get(parkId) : 0;
  const row = { name, parkId: parkId ?? '—', count, photos };
  if (hasGallery) parksWithGallery.push(row);
  else parksWithoutGallery.push(row);
}
parksWithGallery.sort((a, b) => b.count - a.count);
parksWithoutGallery.sort((a, b) => b.count - a.count);

// ── Markdown output ─────────────────────────────────
const tag = (kind) =>
  kind === 'landal' ? '✓ Landal'
  : kind === 'stock' ? '⚠️ Stock'
  : '✗ Ontbreekt';

const mdRoles = [
  '| Rol | Beeld | Bron |',
  '|---|---|---|',
  ...roleRows.map((r) => `| ${r.label} | ${tag(r.kind)} | ${r.detail} |`),
].join('\n');

const mdWorlds = [
  '| Vibe / Wereld | Beeld | Bron |',
  '|---|---|---|',
  ...worldRows.map((w) => `| ${w.label} | ${tag(w.kind)} | ${w.detail} |`),
].join('\n');

const mdParksWith = [
  '| Park | Vacatures (huidig) | Gallery foto\'s |',
  '|---|---:|---:|',
  ...parksWithGallery.slice(0, 30).map((p) => `| ${p.name} | ${p.count} | ${p.photos} |`),
].join('\n');

const mdParksWithout = [
  '| Park | Vacatures (huidig) |',
  '|---|---:|',
  ...parksWithoutGallery.slice(0, 60).map((p) => `| ${p.name} | ${p.count} |`),
].join('\n');

const md = `# Beeldmateriaal coverage

> Gegenereerd: ${new Date().toISOString().slice(0, 10)}
> Bron: \`scripts/beeldmateriaal-coverage.mjs\`

Dit overzicht laat zien voor welke onderdelen van de campagne-configurator we al echt Landal-beeld hebben en waar we nog terugvallen op stock of placeholders. Te gebruiken als briefing-document.

---

## Rollen (${roleRows.filter((r) => r.kind === 'landal').length} / ${roleRows.length} met Landal-foto)

${mdRoles}

**Briefing-actie**: 1-2 hoogwaardige werk-foto's per ontbrekende rol (Parkmanagement, Overig).

---

## Vibe / Wereld vibe-foto's (${worldRows.filter((r) => r.kind === 'landal').length} / ${worldRows.length} met Landal-foto)

${mdWorlds}

**Briefing-actie**: per vibe één signature Landal-beeld dat het gevoel vat (Bos = stille bossfeer; Kust = strand met gasten; Wadden = horizon; Familie = drie generaties; Premium = service-moment; Wellness = badjas-ochtend; Bergen = Alpen-uitzicht; UK = Brits park).

---

## Park-gallery — wél beeld (top 30 op vacaturecount)

${parksWithGallery.length} parken hebben minstens 1 gallery-foto via Landal CDN. Voor bento-collage geldt: 3+ foto's per park is optimaal.

${mdParksWith}

---

## Park-gallery — geen beeld (top 60 op vacaturecount)

${parksWithoutGallery.length} parken in onze vacaturedata hebben géén gallery-foto's. Hoog-prioriteit volgt vacaturecount.

${mdParksWithout}

**Briefing-actie**: per park 3 gallery-foto's via de Landal Sanity CDN beschikbaar maken — bento-collage werkt dan op 100%.

---

## Samenvatting

- **Rollen**: ${roleRows.filter((r) => r.kind === 'landal').length}/${roleRows.length} ok, ${roleRows.filter((r) => r.kind === 'stock').length} stock, ${roleRows.filter((r) => r.kind === 'missing').length} ontbreekt
- **Vibes**: ${worldRows.filter((r) => r.kind === 'landal').length}/${worldRows.length} ok, ${worldRows.filter((r) => r.kind === 'stock').length} stock
- **Parken (in vacaturedata)**: ${parksWithGallery.length} met gallery, ${parksWithoutGallery.length} zonder
`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, md);
console.log(`Geschreven: ${path.relative(ROOT, OUT)}`);
console.log(`\nSamenvatting:`);
console.log(`  Rollen   ${roleRows.filter((r) => r.kind === 'landal').length}/${roleRows.length} ok`);
console.log(`  Vibes    ${worldRows.filter((r) => r.kind === 'landal').length}/${worldRows.length} ok`);
console.log(`  Parken   ${parksWithGallery.length} met gallery, ${parksWithoutGallery.length} zonder`);
