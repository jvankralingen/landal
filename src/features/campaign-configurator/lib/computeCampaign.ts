import type { CampaignState, Contract, Doelgroep, Role, Vacancy } from '../types';
import { CONTRACT_LABELS, DOELGROEP_LABELS, ROLE_LABELS } from './labels';
import type { WorldId } from './worlds';
import { parkDatabase } from '../../../data/parkData';

// park-name -> { vibe, tags, perks } — voor park-specifieke copy in deriveVibeCopy
const PARK_DETAIL_BY_NAME = (() => {
  const map = new Map<string, { vibe: string; tags: string[]; perks: string[] }>();
  for (const country of Object.values(parkDatabase)) {
    for (const region of Object.values(country.regions)) {
      for (const p of region.parks) {
        map.set(p.name, {
          vibe: p.vibe,
          tags: p.tags ?? [],
          perks: p.employeePerks ?? [],
        });
      }
    }
  }
  return map;
})();

function lowerFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export const plural = {
  vacature: (n: number) => (n === 1 ? 'vacature' : 'vacatures'),
  park: (n: number) => (n === 1 ? 'park' : 'parken'),
  regio: (n: number) => (n === 1 ? 'regio' : "regio's"),
  land: (n: number) => (n === 1 ? 'land' : 'landen'),
};

// Landal-brede arbeidsvoorwaarden — gelden voor elke campagne.
export const LANDAL_PERKS: string[] = [
  '8% vakantiegeld',
  'Korting op alle Landal verblijven',
  'Gratis koffie & lunch op het park',
  'Doorgroei-traject op maat',
  'Werken in vakantiesfeer, het hele jaar',
  'Reiskostenvergoeding',
];

export function getParkPerks(parkName: string | null | undefined): string[] {
  if (!parkName) return [];
  return PARK_DETAIL_BY_NAME.get(parkName)?.perks ?? [];
}

function mostCommon<T>(items: T[], keyFn: (item: T) => string | null | undefined): string | null {
  const counts = new Map<string, number>();
  for (const it of items) {
    const k = keyFn(it);
    if (!k) continue;
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }
  let best: string | null = null;
  let bestN = 0;
  for (const [k, n] of counts) {
    if (n > bestN) { bestN = n; best = k; }
  }
  return best;
}

export function filterVacancies(all: Vacancy[], state: CampaignState): Vacancy[] {
  return all.filter((v) => {
    if (state.regions.length > 0 && (!v.region || !state.regions.includes(v.region))) return false;
    if (state.roles.length > 0 && !state.roles.includes(v.role as Role)) return false;
    if (state.parks.length > 0 && (!v.park || !state.parks.includes(v.park))) return false;
    if (state.contracts.length > 0 && !state.contracts.includes(v.contract as Contract)) return false;
    return true;
  });
}

// Doelgroep wordt afgeleid uit rol + contract. Het paneel exposeert 'm niet
// meer als losse knop. Logica:
//  - Management-rollen (parkmanagement/hoofdkantoor) → altijd professionals.
//  - Vast contract met een gewone parkrol → starters (early career, vaste
//    plek, langer perspectief).
//  - Vakantiebaan → tieners (klassiek scholieren-in-de-zomer).
//  - Stage/bijbaan → studenten (de meest voorkomende combinatie).
//  - Niks gekozen → iedereen. De EB-headline ("voor iedereen") en het
//    narrator-paneel moeten consistent zijn: geen filters = brede doelgroep.
export function impliedDoelgroep(state: CampaignState): Doelgroep {
  const role: Role | null = state.roles[0] ?? null;
  const contract: Contract | null = state.contracts[0] ?? null;

  // Management dicteert altijd boven contract: een parkmanager-stage blijft
  // zeldzaam en de doelgroep voor de campagne is in die hoek professionals.
  if (role === 'hoofdkantoor' || role === 'parkmanagement') return 'professionals';

  if (contract === 'vast') return 'starters';
  if (contract === 'vakantiebaan') return 'tieners';
  if (contract === 'stage' || contract === 'bijbaan') return 'studenten';

  // Geen contract gekozen → iedereen. Als alleen een rol gekozen is zonder
  // contract, blijft de doelgroep breed: het kan zowel een bijbaan als een
  // vaste medewerker zijn, en pas bij contract-keuze versmalt het beeld.
  return 'iedereen';
}

export function uniqueRegions(vacancies: Vacancy[]): string[] {
  return [...new Set(vacancies.map((v) => v.region).filter((r): r is string => Boolean(r)))].sort();
}

export function uniqueParks(vacancies: Vacancy[]): string[] {
  return [...new Set(vacancies.map((v) => v.park).filter((p): p is string => Boolean(p)))].sort();
}

export function deriveHeadline(state: CampaignState, _filtered: Vacancy[]): string {
  if (state.heroOverride) return state.heroOverride;

  const role: Role | null = state.roles.length === 1 ? state.roles[0] : null;
  const multiRoles = state.roles.length > 1 ? state.roles.length : 0;
  const contract: Contract | null = state.contracts.length === 1 ? state.contracts[0] : null;
  const park = state.parks[0] ?? null;
  const multiParks = state.parks.length > 1 ? state.parks.length : 0;
  const region = state.regions[0] ?? null;
  const multiRegions = state.regions.length > 1 ? state.regions.length : 0;

  // SUBJECT — combines contract action + role.
  let subject: string;
  if (contract && role) {
    const inPlace = ROLE_IN_PLACE[role];
    subject = inPlace
      ? `${CONTRACT_ACTION[contract]} ${inPlace}`
      : CONTRACT_ACTION[contract];
  } else if (contract) {
    subject = CONTRACT_ACTION[contract];
  } else if (role) {
    subject = ROLE_HEADLINE_LABEL[role] ?? ROLE_LABELS[role];
  } else if (multiRoles) {
    subject = `${multiRoles} rollen`;
  } else {
    subject = 'Werken';
  }

  // PLACE — multi-park/regio krijgt voorrang op single (anders zou alleen
  // parks[0] zichtbaar zijn terwijl er meerdere gekozen zijn). Bij één park
  // tonen we de naam, anders een count.
  let place: string;
  if (multiParks) {
    place = ` op ${multiParks} parken`;
  } else if (park) {
    place = ` ${park}`;
  } else if (multiRegions) {
    place = ` in ${multiRegions} regio's`;
  } else if (region) {
    place = ` in ${region}`;
  } else {
    place = '';
  }

  return `${subject} bij Landal${place}`;
}

export function deriveSubtitle(state: CampaignState, filtered: Vacancy[]): string {
  if (state.subOverride) return state.subOverride;
  const count = filtered.length;
  const parkCount = uniqueParks(filtered).length;
  const regionCount = uniqueRegions(filtered).length;
  const countryCount = new Set(filtered.map((v) => v.country)).size;
  if (count === 0) return 'Geen open vacatures voor deze scope.';
  if (state.trim === 'eb')
    return `${count} open ${plural.vacature(count)} · ${parkCount} ${plural.park(parkCount)} · ${countryCount} ${plural.land(countryCount)}`;
  if (state.trim === 'park') return `${count} open ${plural.vacature(count)}`;
  if (state.trim === 'regio')
    return `${count} ${plural.vacature(count)} in ${parkCount} ${plural.park(parkCount)}`;
  if (state.trim === 'rol')
    return `${count} ${plural.vacature(count)} · ${parkCount} ${plural.park(parkCount)} · ${regionCount} ${plural.regio(regionCount)}`;
  return `${count} kansen verspreid over ${parkCount} ${plural.park(parkCount)}`;
}

export function deriveTone(state: CampaignState): string {
  return DOELGROEP_LABELS[state.doelgroep] + ' · ' + (state.energie > 60 ? 'energiek' : state.energie < 40 ? 'rustig' : 'gebalanceerd') + (state.premium > 60 ? ' · premium' : state.premium < 40 ? ' · casual' : '');
}

/* ────── Vibe copy ─────────────────────────────────────
   Een 1-2 zins paragraaf tussen headline en CTA die rol,
   locatie en doelgroep combineert tot een herkenbare sfeer.
   Per dimensie korte phrasings die we weven. */

/* Wat maakt werken op een Landal park anders dan een supermarkt of bezorgbaan?
   - Gasten zijn op vakantie, niet in transit
   - Het park IS de werkplek, niet een willekeurig pand
   - Seizoenen + ritme, niet uniforme dagen
   - Verhalen + gezichten, niet anonieme transacties
   Bank-zinnen per rol haken hier op aan. */

const ROLE_REALITY: Partial<Record<Role, string>> = {
  'horeca-bediening': 'Terrassen die rond vier uur volstromen',
  'horeca-keuken': 'Een keuken waar je het zwembad hoort',
  'front-office': 'Gasten die met sleutels en koffers binnenkomen',
  'fun-entertainment': 'Kinderen die ’s ochtends vragen of jij er bent',
  techniek: 'Van zwembad-pomp tot fietsverhuur op één dag',
  zwembad: 'Een bad dat de hele dag vol kinderen zit',
  retail: 'Vakantiegasten die nog even kletsen voor ze afrekenen',
  housekeeping: 'Bungalows klaar voor gezinnen die al jaren terugkomen',
  parkmanagement: 'Een park van honderden bungalows op jouw besluiten',
  hoofdkantoor: 'Een vakantieconcern dat tien miljoen gasten raakt',
  overig: 'Werk waar gasten gelukkig van worden',
};

const WORLD_FLAVOR: Record<WorldId, string> = {
  eb: '',
  hq: 'op het hoofdkantoor in Amsterdam of Zwolle',
  forest: 'op een park midden tussen hoge bomen',
  coast: 'op een park waar het strand om de hoek ligt',
  wadden: 'op een eiland met uitzicht over het wad',
  family: 'op een park waar drie generaties tegelijk uitchecken',
  premium: 'op een park waar service en stilte de standaard zijn',
  wellness: 'op een park waar gasten ’s ochtends in badjas lopen',
  mountain: 'in de Alpen, met bergen voor je raam',
  uk: 'op een Brits park waar dagen rustig beginnen',
};

const DOELGROEP_HOOK: Record<Doelgroep, string> = {
  iedereen: 'Werk dat past — van een zomer aan zee tot een vaste plek in het bos.',
  tieners: 'Een eerste baan waar je tussen volwassenen werkt die op je rekenen.',
  studenten: 'Een zomer met collega’s die vrienden worden.',
  starters: 'Een rol met snel verantwoordelijkheid en elke dag iets nieuws.',
  professionals: 'Beslissingen die je terugziet in elk park.',
  senior: 'Vakmanschap dat gasten en collega’s onthouden.',
};

const CONTRACT_FLAVOR: Record<Contract, string> = {
  vakantiebaan: 'een seizoen lang',
  stage: 'met een echte meewerk-stage',
  bijbaan: 'naast school of studie',
  vast: 'voor de langere termijn',
};

// Verb-phrase opener per contract; used as the subject when contract is set.
const CONTRACT_ACTION: Record<Contract, string> = {
  vakantiebaan: 'Beleef jouw zomer',
  stage: 'Loop stage',
  bijbaan: 'Werk naast je studie',
  vast: 'Bouw je carrière',
};

// "in {x}" form, used after a contract action: "Beleef jouw zomer in de keuken".
const ROLE_IN_PLACE: Partial<Record<Role, string>> = {
  'horeca-bediening': 'in de bediening',
  'horeca-keuken': 'in de keuken',
  'front-office': 'op de receptie',
  'fun-entertainment': 'in entertainment',
  techniek: 'in de techniek',
  zwembad: 'in het zwembad',
  retail: 'in retail',
  housekeeping: 'in housekeeping',
  parkmanagement: 'in parkmanagement',
  hoofdkantoor: 'op het hoofdkantoor',
};

// Stand-alone headline label per role. Shorter than ROLE_LABELS which uses
// "Horeca · Bediening" — that dot looks odd in a hero title.
const ROLE_HEADLINE_LABEL: Partial<Record<Role, string>> = {
  'horeca-bediening': 'Bediening',
  'horeca-keuken': 'Keuken',
  'front-office': 'Front Office',
  'fun-entertainment': 'Fun & Entertainment',
  techniek: 'Techniek',
  zwembad: 'Zwembad',
  retail: 'Retail',
  housekeeping: 'Housekeeping',
  parkmanagement: 'Parkmanagement',
  hoofdkantoor: 'Hoofdkantoor',
};

const EB_COPY =
  'Werken op een plek waar mensen voor sparen om te komen. Van bos tot kust, van Drenthe tot de Alpen. Vakantiegasten in vakantiestand, een werkplek met seizoenen.';

export function deriveVibeCopy(
  state: CampaignState,
  filtered: Vacancy[],
  worldId: WorldId,
  doelgroep: Doelgroep = impliedDoelgroep(state)
): string {
  // Employer Branding: brede pitch, geen scope-afhankelijke samenstelling.
  if (
    state.trim === 'eb' &&
    state.parks.length === 0 &&
    state.regions.length === 0 &&
    state.roles.length === 0 &&
    state.contracts.length === 0
  ) {
    return EB_COPY;
  }

  // Only weave a clause for dimensions the user EXPLICITLY set.
  const explicitRole: Role | null = state.roles.length === 1 ? state.roles[0] : null;
  const explicitContract: Contract | null = state.contracts.length === 1 ? state.contracts[0] : null;
  const explicitPark = state.parks.length === 1 ? state.parks[0] : null;
  const hasPlaceContext = state.parks.length > 0 || state.regions.length > 0;

  const roleReality = explicitRole ? ROLE_REALITY[explicitRole] ?? null : null;

  // Park-specific flavor wins over generic world-flavor when a single park
  // is selected. Weave de eerste 2 employeePerks samen — één klinkt kaal,
  // twee bouwt de sfeer beter op.
  let placeFlavor: string | null = null;
  if (explicitPark) {
    const detail = PARK_DETAIL_BY_NAME.get(explicitPark);
    const perks = detail?.perks ?? [];
    if (perks.length >= 2) {
      placeFlavor = `${lowerFirst(perks[0])}, ${lowerFirst(perks[1])}`;
    } else if (perks.length === 1) {
      placeFlavor = lowerFirst(perks[0]);
    }
  }
  if (!placeFlavor && hasPlaceContext && worldId !== 'eb') {
    placeFlavor = WORLD_FLAVOR[worldId] ?? null;
  }

  const contractFlavor = explicitContract ? CONTRACT_FLAVOR[explicitContract] : null;
  const hook = DOELGROEP_HOOK[doelgroep];

  const firstClauses: string[] = [];
  if (roleReality) firstClauses.push(roleReality);
  if (placeFlavor) firstClauses.push(placeFlavor);
  if (contractFlavor) firstClauses.push(contractFlavor);

  if (firstClauses.length === 0) return hook;
  const sentence = firstClauses.join(', ');
  const capitalized = sentence.charAt(0).toUpperCase() + sentence.slice(1);
  return `${capitalized}. ${hook}`;
}

export function summarizeContracts(filtered: Vacancy[]): Partial<Record<Contract, number>> {
  const out: Partial<Record<Contract, number>> = {};
  for (const v of filtered) {
    out[v.contract as Contract] = (out[v.contract as Contract] ?? 0) + 1;
  }
  return out;
}
