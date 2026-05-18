import type { WorldId, WorldPark } from '../types';

/** Inland regions where "watersport" means lake/river, not sea. */
const INLAND_REGIONS = new Set([
  'friesland',
  'overijssel',
  'gelderland',
  'limburg',
  'drenthe',
  'flevoland',
  'utrecht',
  'noord_brabant',
  'groningen',
]);

/** Tag/name keywords that strongly indicate a lake/river park. */
const MEER_KEYWORDS = [
  'meer',
  'meren',
  'plas',
  'plassen',
  'feanen',
  'grevelingen',
  'zuidlaarder',
  'recreatieplas',
];

function isInlandWaterPark(park: WorldPark): boolean {
  if (park.vibe !== 'watersport') return false;
  const text = `${park.name} ${park.tags.join(' ')}`.toLowerCase();
  if (MEER_KEYWORDS.some((kw) => text.includes(kw))) return true;
  return INLAND_REGIONS.has(park.region);
}

export function getWorldForPark(park: WorldPark): WorldId {
  if (park.country === 'oostenrijk' || park.country === 'zwitserland') {
    return 'mountain';
  }

  if (park.region === 'waddeneilanden') {
    return 'wadden';
  }

  if (park.country === 'engeland') {
    return 'uk';
  }

  if (park.vibe === 'luxe') return 'premium';
  if (park.vibe === 'wellness') return 'wellness';

  if (park.tags.some(matchesAttractie)) {
    return 'family';
  }

  if (park.country === 'belgie') {
    if (park.region === 'wallonie' || park.vibe === 'actief') return 'family';
    return 'forest';
  }

  // Beach = sea. Inland water = lake/river. Coastal watersport = coast.
  if (park.vibe === 'strand') return 'coast';
  if (park.vibe === 'watersport') {
    return isInlandWaterPark(park) ? 'meer' : 'coast';
  }

  if (park.vibe === 'familie' && park.tags.some(matchesGroot)) {
    return 'family';
  }

  if (park.vibe === 'kinderen' || park.vibe === 'actief') {
    return 'family';
  }

  return 'forest';
}

function matchesAttractie(tag: string): boolean {
  const t = tag.toLowerCase();
  return (
    t.includes('attractie') ||
    t.includes('pretpark') ||
    t.includes('dieren') ||
    t.includes('zoo') ||
    t === 'efteling' ||
    t.includes('sprookjes')
  );
}

function matchesGroot(tag: string): boolean {
  const t = tag.toLowerCase();
  return t === 'groot' || t.includes('mega') || t.includes('zomerkamp');
}
