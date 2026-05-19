#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP = path.join(__dirname, 'sitemap-landal.xml');
const OUT = path.join(__dirname, 'vacancies-base.json');

const xml = fs.readFileSync(SITEMAP, 'utf8');
const entries = [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)]
  .map(([, loc, lastmod]) => ({ loc, lastmod }));

const VACANCY_SEGMENTS = ['vacatures', 'stellenangebote', 'ledige-stillinger', 'vacancies'];
const LOCATION_SEGMENTS = ['locatie', 'standort', 'lokation', 'location'];

// Slug -> role family. Order matters: most specific first.
const ROLE_PATTERNS = [
  ['hoofdkantoor', /(marketeer|marketing-analyst|controller|business-analyst|business-controller|category-(manager|buyer)|product-(owner|data|manager)|tech-delivery-lead|data-(engineer|specialist)|delivery-lead|lead-(data|park-administrator)|risk-and-control|esg(-controller)?|growth-marketeer|hr-recruitment|recruitment|conversational-specialist-ai|seo-specialist|paid-social|programmatic-specialist|business-development|business-line|business-controller|employer-branding|operations-manager|formule-manager|crm-marketeer|accounting|park-administrator|park-administrateur|administratief|administrator|homeowner|home-owner|eigentuemer|eigent.merbetreuung|klantenservice|contractbeheer|commercial-(outlets|services|support)|sales|esg|finance|financial|process-improvement|change-en-transition|change-transition|content-team|content-(team|specialist)|communicatie|hospitality-tech|revenue-management|solution-(en-)?business-analyst|specialist-cleaning|support-specialist|settlement|operations|real-estate|category)/i],
  ['horeca-keuken', /(keuken|kok|cuisinier|chef|spoelkeuken|kitchen|kueche|kuechenhilfe|koekken|opvasker|kokken|leerling-kok)/i],
  ['horeca-bediening', /(bediening|serveur|server|tjener|service|barista|servicekellner|barmedewerker|allround|allround-toerisme|hospitality|f-en-b|f-and-e|f-en-e|fastfood|snackbar|pizzeria|friettent|brasserie|gusto|harrewar|afwas|ijs-en-wafel|wafel|strandpaviljoen|beach-pavilion|shift(-leader|leader)|shiftleader|leidinggevende-horeca|supervisor-(horeca|keuken)|horeca|f-en-b-management|teamleider-keuken|leerling-keuken|kitchen-supervisor|floormanager-horeca|assistant-manager-f-en-b|manager-f-en-b|restaurant-manager|backoffice|hulpkracht-hospitality|hulpkracht|combifunctie|kombifunktion|kombinator|f-en-b-service)/i],
  ['fun-entertainment', /(fun-en-entertainment|animatie|animatieteam|animation|entertainer|sport-en-animatie|edutainment|leisure|recreatie)/i],
  ['front-office', /(front-office|receptie|rezeptionist|recepti|relatiemanagement)/i],
  ['zwembad', /(zwembad|livredder|aquatic|pool)/i],
  ['techniek', /(techniek|technische-dienst|technisch|onderhoud|maintenance|facility(-manager|-management|-services)?|facility|property|teknisk|tech-mitarbeiter|objectservice|objektservice|groen-en-techniek)/i],
  ['housekeeping', /(schoonmaak|housekeeping|cleaning|housekeeper)/i],
  ['retail', /(parkshop|retail|supermarkt|winkel|store)/i],
  ['parkmanagement', /(parkmanagement|park-administratie)/i],
];

const CONTRACT_PATTERNS = [
  ['stage', /(^|\/|-)(stage|zomerstage)(-|$|\/)/i],
  ['bijbaan', /(^|\/|-)(bijbaan|flexijob|studentenjob|minijob|student(en)?basis)(-|$|\/)/i],
  ['vakantiebaan', /(^|\/|-)(vakantiebaan|vakantie-baan|zomerbaan|zomerjob|summerjob|sommerjob|ferienjob|saison)(-|$|\/)/i],
];

function classifyByPath(loc) {
  const url = new URL(loc);
  const parts = url.pathname.split('/').filter(Boolean);
  // parts[0] = locale (e.g. nl-nl), parts[1] = section (e.g. vacatures, locatie, campagne)
  const locale = parts[0] ?? '';
  const section = parts[1] ?? '';
  const slug = parts[2] ?? '';
  const id = parts[3] ?? '';

  if (VACANCY_SEGMENTS.includes(section)) return { kind: 'vacancy', locale, section, slug, id };
  if (LOCATION_SEGMENTS.includes(section)) return { kind: 'location', locale, section, slug };
  if (section === 'campagne') return { kind: 'campaign', locale, section, slug };
  return { kind: 'other', locale, section, slug, id };
}

function deriveRole(slug) {
  for (const [name, pattern] of ROLE_PATTERNS) {
    if (pattern.test(slug)) return name;
  }
  return 'overig';
}

function deriveContract(slug) {
  for (const [name, pattern] of CONTRACT_PATTERNS) {
    if (pattern.test(slug)) return name;
  }
  return 'vast';
}

const country = (locale) => ({ 'nl-nl': 'nl', 'de-de': 'de', 'dk-da': 'dk', 'gb-en': 'gb' }[locale] ?? locale);

const enriched = entries.map((e) => {
  const c = classifyByPath(e.loc);
  if (c.kind === 'vacancy') {
    return {
      kind: 'vacancy',
      url: e.loc,
      lastmod: e.lastmod,
      country: country(c.locale),
      slug: c.slug,
      jobId: c.id,
      role: deriveRole(c.slug),
      contract: deriveContract(c.slug),
    };
  }
  if (c.kind === 'campaign') {
    return { kind: 'campaign', url: e.loc, lastmod: e.lastmod, country: country(c.locale), slug: c.slug };
  }
  if (c.kind === 'location') {
    return { kind: 'location', url: e.loc, lastmod: e.lastmod, country: country(c.locale), slug: c.slug };
  }
  return { kind: 'other', url: e.loc };
});

const vacancies = enriched.filter((x) => x.kind === 'vacancy');
const campaigns = enriched.filter((x) => x.kind === 'campaign');
const locations = enriched.filter((x) => x.kind === 'location');

const summary = {
  totalUrls: entries.length,
  vacancies: vacancies.length,
  campaigns: campaigns.length,
  locations: locations.length,
  vacanciesByCountry: tally(vacancies, (v) => v.country),
  vacanciesByContract: tally(vacancies, (v) => v.contract),
  vacanciesByRole: tally(vacancies, (v) => v.role),
  vacanciesByCountryAndContract: tallyPair(vacancies, (v) => v.country, (v) => v.contract),
  unclassifiedSlugs: vacancies.filter((v) => v.role === 'overig').slice(0, 15).map((v) => v.slug),
};

function tally(arr, keyFn) {
  const out = {};
  for (const x of arr) {
    const k = keyFn(x);
    out[k] = (out[k] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]));
}

function tallyPair(arr, k1, k2) {
  const out = {};
  for (const x of arr) {
    const key = `${k1(x)}/${k2(x)}`;
    out[key] = (out[key] ?? 0) + 1;
  }
  return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]));
}

fs.writeFileSync(OUT, JSON.stringify({ summary, vacancies, campaigns, locations }, null, 2));
console.log(JSON.stringify(summary, null, 2));
console.log(`\nWritten: ${path.relative(process.cwd(), OUT)}`);
