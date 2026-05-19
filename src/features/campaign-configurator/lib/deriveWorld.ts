import type { CampaignState, Vacancy } from '../types';
import type { WorldId } from './worlds';

// Region (province) -> default world. Used when no park-specific override hits.
export const REGION_WORLD: Record<string, WorldId> = {
  Drenthe: 'forest',
  Gelderland: 'forest',
  Overijssel: 'forest',
  Limburg: 'forest',
  'Noord-Brabant': 'forest',
  Utrecht: 'forest',
  Groningen: 'forest',
  Zeeland: 'coast',
  'Zuid-Holland': 'coast',
  'Noord-Holland': 'coast',
  Friesland: 'wadden',
};

// Park-specific overrides keyed by parkId (from parkData) or park name.
// Source-of-truth: src/data/parkData.js — park.vibe + park.tags.
export const PARK_WORLD: Record<string, WorldId> = {
  // luxe flagship resorts → premium
  hof_van_saksen: 'premium',
  'Hof van Saksen': 'premium',
  cuber_veluwe: 'premium',
  'Cuber Veluwe': 'premium',
  hoog_vaals: 'premium',
  'Hoog Vaals': 'premium',
  // dedicated wellness parks
  marber: 'wellness',
  'Marber Veluwe': 'wellness',
  // attractie-/kindermagneet parken
  kaatsheuvel: 'family',
  Kaatsheuvel: 'family',
  rabbit_hill: 'family',
  'Rabbit Hill': 'family',
};

export function deriveWorldForVacancy(v: Vacancy): WorldId | null {
  // HQ has no park-vibe; return null so it doesn't sway the average.
  if (v.role === 'hoofdkantoor') return null;

  if (v.country === 'gb') return 'uk';
  if (v.country === 'at' || /sterreich|austria|tirol|salzburg|kuhtai|dachstein/i.test(v.locality ?? '')) {
    return 'mountain';
  }
  if (v.country === 'de') return 'forest';
  if (v.country === 'dk') return 'coast';

  if (v.park && PARK_WORLD[v.park]) return PARK_WORLD[v.park];

  if (v.region && REGION_WORLD[v.region]) return REGION_WORLD[v.region];

  return 'forest';
}

function worldFromSelectedRegions(regions: string[]): WorldId | null {
  if (regions.length === 0) return null;
  const r = regions[0];
  return REGION_WORLD[r] ?? null;
}

function worldFromSelectedParks(
  parks: string[],
  parkNameToRegion?: Map<string, string>
): WorldId | null {
  if (parks.length === 0 || !parkNameToRegion) return null;
  for (const name of parks) {
    // Park-specific override beats region lookup.
    if (PARK_WORLD[name]) return PARK_WORLD[name];
    const region = parkNameToRegion.get(name);
    if (region && REGION_WORLD[region]) return REGION_WORLD[region];
  }
  return null;
}

export function getWorldForParkName(
  parkName: string,
  parkNameToRegion: Map<string, string>
): WorldId | null {
  if (PARK_WORLD[parkName]) return PARK_WORLD[parkName];
  const region = parkNameToRegion.get(parkName);
  if (region && REGION_WORLD[region]) return REGION_WORLD[region];
  return null;
}

export function deriveWorld(
  filtered: Vacancy[],
  state?: CampaignState,
  parkNameToRegion?: Map<string, string>
): WorldId {
  // Employer Branding default: brand-neutral identity, no park-specific world.
  if (state?.trim === 'eb' && state.parks.length === 0 && state.regions.length === 0) {
    return 'eb';
  }
  // Pure HQ scope has no park-world; use the Landal brand-aligned HQ vibe.
  if (state?.roles.length === 1 && state.roles[0] === 'hoofdkantoor') {
    return 'hq';
  }
  if (filtered.length === 0) {
    if (state) {
      const fromPark = worldFromSelectedParks(state.parks, parkNameToRegion);
      if (fromPark) return fromPark;
      const fromRegion = worldFromSelectedRegions(state.regions);
      if (fromRegion) return fromRegion;
      if (state.contracts.includes('vakantiebaan') && state.contracts.length === 1) return 'coast';
      if (state.contracts.includes('stage') && state.contracts.length === 1) return 'forest';
      if (state.roles.includes('hoofdkantoor') && state.roles.length === 1) return 'premium';
    }
    return 'forest';
  }
  const counts = new Map<WorldId, number>();
  for (const v of filtered) {
    const w = deriveWorldForVacancy(v);
    if (!w) continue;
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  // Reinforce with selected-park lookups; protects against vacancies with
  // wrong region tags (e.g. Strand Resort Ouddorp Duin posted under Cadzand-Bad).
  if (state) {
    const fromPark = worldFromSelectedParks(state.parks, parkNameToRegion);
    if (fromPark) {
      counts.set(fromPark, (counts.get(fromPark) ?? 0) + Math.max(2, filtered.length));
    }
  }
  if (counts.size === 0) {
    if (state) {
      const fromPark = worldFromSelectedParks(state.parks, parkNameToRegion);
      if (fromPark) return fromPark;
      const fromRegion = worldFromSelectedRegions(state.regions);
      if (fromRegion) return fromRegion;
    }
    return 'forest';
  }
  let bestWorld: WorldId = 'forest';
  let bestCount = 0;
  for (const [w, n] of counts) {
    if (n > bestCount) {
      bestCount = n;
      bestWorld = w;
    }
  }
  return bestWorld;
}

export function worldDistribution(filtered: Vacancy[]): Record<WorldId, number> {
  const out: Partial<Record<WorldId, number>> = {};
  for (const v of filtered) {
    const w = deriveWorldForVacancy(v);
    if (!w) continue;
    out[w] = (out[w] ?? 0) + 1;
  }
  return out as Record<WorldId, number>;
}
