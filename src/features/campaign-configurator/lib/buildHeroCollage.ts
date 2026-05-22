import { parkGalleryImages, getGalleryImageUrl } from '../../../data/parkImageUrls';
import type { Contract, Role, Trim, Vacancy } from '../types';
import type { WorldId } from './worlds';
import {
  pickRolePhoto,
  pickRolePhotoPool,
  ROLE_PHOTOS,
  type PickScope,
} from '../data/roleImages';

export interface BentoTile {
  src: string | null;
  label: string;
  kind: 'role' | 'park' | 'vibe';
}

/**
 * The bento has four semantic slots that we re-style per trim.
 * - primary    = the largest, hero tile
 * - secondary  = the second-most prominent
 * - tertiary   = a complementing tile
 * - accent     = the smallest tile, often a vibe or role accent
 */
export interface Bento {
  primary: BentoTile;
  secondary: BentoTile;
  tertiary: BentoTile;
  accent: BentoTile;
  trim: Trim;
}

const ROLE_PHOTO: Partial<Record<Role, string>> = {
  'horeca-bediening': '/photos/roles/horeca.webp',
  'horeca-keuken': '/photos/roles/keuken.webp',
  'front-office': '/photos/roles/receptie.webp',
  'fun-entertainment': '/photos/roles/fun_entertainment.webp',
  techniek: '/photos/roles/techniek.webp',
  zwembad: '/photos/roles/zwembad.webp',
  retail: '/photos/roles/parkshop.webp',
  housekeeping: '/photos/roles/housekeeping.webp',
  // Unsplash fallbacks for roles without bespoke park photography yet.
  parkmanagement:
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80',
  hoofdkantoor: '/photos/roles/hoofdkantoor.webp',
  overig:
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
};

const ROLE_LABEL: Partial<Record<Role, string>> = {
  'horeca-bediening': 'Bediening',
  'horeca-keuken': 'Keuken',
  'front-office': 'Front Office',
  'fun-entertainment': 'Fun & Entertainment',
  techniek: 'Techniek',
  zwembad: 'Zwembad',
  retail: 'Parkshop',
  housekeeping: 'Housekeeping',
  parkmanagement: 'Parkmanagement',
  hoofdkantoor: 'Hoofdkantoor',
  overig: 'Werk bij Landal',
};

const WORLD_VIBE: Record<WorldId, { src: string; label: string }> = {
  eb: { src: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&auto=format&fit=crop&q=80', label: 'Landal' },
  hq: { src: '/photos/roles/hoofdkantoor.webp', label: 'Hoofdkantoor' },
  forest: { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80', label: 'Bos' },
  coast: { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', label: 'Kust' },
  wadden: { src: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?w=800&auto=format&fit=crop&q=80', label: 'Wadden' },
  family: { src: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=800&auto=format&fit=crop&q=80', label: 'Familie' },
  premium: { src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&auto=format&fit=crop&q=80', label: 'Premium' },
  wellness: { src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80', label: 'Wellness' },
  mountain: { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80', label: 'Bergen' },
  uk: { src: 'https://images.unsplash.com/photo-1543832923-44667a44c804?w=800&auto=format&fit=crop&q=80', label: 'UK' },
};

function roleTile(roleId: Role | null): BentoTile {
  const id = roleId ?? ('horeca-bediening' as Role);
  return {
    src: ROLE_PHOTO[id] ?? null,
    label: ROLE_LABEL[id] ?? 'Het werk',
    kind: 'role',
  };
}

/**
 * Scope-aware role tile: scores the roles_2 photo pool against the active
 * scope and picks the most-specific match. Falls back to the legacy
 * ROLE_PHOTO map when no scoped photo is available — keeps the bento alive
 * for roles we haven't shot bespoke photography for yet (techniek, housekeeping).
 */
function pickRoleTile(scope: PickScope, seed: string): BentoTile {
  const photo = pickRolePhoto(scope, seed);
  if (photo) {
    const labelFromRole = scope.role ? ROLE_LABEL[scope.role] : null;
    return {
      src: photo.src,
      label: photo.label ?? labelFromRole ?? 'Het werk',
      kind: 'role',
    };
  }
  // Legacy fallback for roles without bespoke roles_2 coverage.
  if (scope.role) return roleTile(scope.role);
  return { src: null, label: '—', kind: 'role' };
}

/** Does the photo pool have any park-specific photos for this parkId? */
function hasParkSpecificPhotos(parkId: string | null | undefined): boolean {
  if (!parkId) return false;
  return ROLE_PHOTOS.some((p) => p.parkId === parkId);
}

function parkTile(parkName: string, contentId: string | null, label?: string): BentoTile {
  return {
    src: contentId ? getGalleryImageUrl(contentId, '3x2', 800) : null,
    label: label ?? parkName,
    kind: 'park',
  };
}

function vibeTile(worldId: WorldId): BentoTile {
  const v = WORLD_VIBE[worldId];
  return { src: v.src, label: v.label, kind: 'vibe' };
}

function mostCommonRole(filtered: Vacancy[]): Role | null {
  const counts = new Map<Role, number>();
  for (const v of filtered) {
    if (v.role === 'hoofdkantoor' || v.role === 'overig') continue;
    counts.set(v.role, (counts.get(v.role) ?? 0) + 1);
  }
  let best: Role | null = null;
  let bestN = 0;
  for (const [r, n] of counts) {
    if (n > bestN) { bestN = n; best = r; }
  }
  return best;
}

interface ParkRef { parkId: string; parkName: string; gallery: string[] }

function topParks(filtered: Vacancy[], n: number): ParkRef[] {
  const counts = new Map<string, { name: string; n: number }>();
  for (const v of filtered) {
    if (!v.parkId) continue;
    const e = counts.get(v.parkId);
    if (e) e.n += 1;
    else counts.set(v.parkId, { name: v.park ?? v.parkId, n: 1 });
  }
  return [...counts.entries()]
    .sort((a, b) => b[1].n - a[1].n)
    .map(([parkId, { name }]) => ({ parkId, parkName: name, gallery: parkGalleryImages[parkId] ?? [] }))
    .filter((p) => p.gallery.length > 0)
    .slice(0, n);
}

// Curated EB showcase: 4 roles that together tell the "Werken bij Landal"
// story. Het werk staat centraal — sterker dan een willekeurige park-mix —
// dus we kiezen 4 herkenbare, visueel diverse rollen (gasten-facing,
// recreatie, F&B, hospitality).
const EB_SHOWCASE_ROLES: Role[] = [
  'horeca-bediening',
  'front-office',
  'fun-entertainment',
  'zwembad',
];

interface Candidate { parkId: string; parkName: string; src: string; }

function makeParkPool(parks: ParkRef[], strategy: 'sameFirst' | 'variety'): Candidate[] {
  const out: Candidate[] = [];
  if (strategy === 'sameFirst') {
    // park-trim: parks[0].gallery[0,1,2], then parks[1].gallery[0,1,2], ...
    for (const p of parks) {
      for (let i = 0; i < p.gallery.length; i++) {
        out.push({
          parkId: p.parkId,
          parkName: p.parkName,
          src: getGalleryImageUrl(p.gallery[i], '3x2', 800),
        });
      }
    }
  } else {
    // variety: round-robin — parks[0].g0, parks[1].g0, ..., parks[0].g1, parks[1].g1, ...
    const maxG = Math.max(0, ...parks.map((p) => p.gallery.length));
    for (let i = 0; i < maxG; i++) {
      for (const p of parks) {
        if (i < p.gallery.length) {
          out.push({
            parkId: p.parkId,
            parkName: p.parkName,
            src: getGalleryImageUrl(p.gallery[i], '3x2', 800),
          });
        }
      }
    }
  }
  return out;
}

export function buildBento(
  filtered: Vacancy[],
  selectedRoles: Role[],
  worldId: WorldId,
  trim: Trim,
  selectedParks: { id: string; name: string }[] = [],
  selectedContracts: Contract[] = [],
  /** Vacancies van alleen de regio-filter (zonder rol/contract). Worden
   *  gebruikt in regio-trim om de supporting-tiles te vullen, zodat een
   *  smal rol-filter de regio-context niet leegtrekt. */
  regionContextVacancies?: Vacancy[]
): Bento {
  let parks = topParks(filtered, 8);
  // When the user explicitly selected a park (typically in park-trim), make sure
  // the selection is the source of truth, even when filtered has zero vacancies.
  if (selectedParks.length > 0) {
    const explicit: ParkRef[] = selectedParks
      .map((sel) => ({
        parkId: sel.id,
        parkName: sel.name,
        gallery: parkGalleryImages[sel.id] ?? [],
      }))
      .filter((p) => p.gallery.length > 0);
    // Put explicit selections first, then unique others.
    const seen = new Set(explicit.map((p) => p.parkId));
    parks = [...explicit, ...parks.filter((p) => !seen.has(p.parkId))];
  }
  const roleId =
    selectedRoles.find((r) => ROLE_PHOTO[r]) ?? mostCommonRole(filtered) ?? null;
  const explicitRole = selectedRoles.length === 1 ? selectedRoles[0] : null;
  const explicitContract = selectedContracts.length === 1 ? selectedContracts[0] : null;
  const explicitParkId =
    selectedParks.length === 1 ? selectedParks[0].id : null;
  const scope: PickScope = {
    role: explicitRole ?? roleId,
    contract: explicitContract,
    parkId: explicitParkId,
    world: worldId,
    manager: (explicitRole ?? roleId) === 'parkmanagement',
  };
  const seed = [
    scope.parkId ?? '',
    scope.role ?? '',
    scope.contract ?? '',
    scope.world ?? '',
    trim,
  ].join('|');
  const roleT = pickRoleTile(scope, seed);
  const vibeT = vibeTile(worldId);

  // HQ-vibe: HQ role-photo primary; the remaining tiles become labelled
  // text-cards (Amsterdam / Zwolle / Internationaal) instead of park photos.
  // The scope-picker rotates through the HQ subroles (Communicatie / ESG /
  // HR / IT / etc.) so the spotlight shifts with the chosen contract/role.
  if (worldId === 'hq') {
    return {
      primary: pickRoleTile({ ...scope, role: 'hoofdkantoor', world: 'hq' }, seed),
      secondary: { src: null, label: 'Amsterdam', kind: 'vibe' },
      tertiary: { src: null, label: 'Zwolle', kind: 'vibe' },
      accent: { src: null, label: 'Internationaal', kind: 'vibe' },
      trim,
    };
  }

  // EB trim: showcase variety — 4 rol-foto's die samen "Werken bij Landal"
  // vertellen. Geen rol/park-filters actief, dus per slot bouwen we een
  // scope met alleen de rol gezet. De picker kiest dan z'n best-passende
  // foto uit /photos/roles_2/ voor die rol. Dedup via `used` voorkomt dat
  // twee slots dezelfde shot pakken als een rol toevallig één foto heeft.
  if (trim === 'eb') {
    const usedRoleSrcs = new Set<string>();
    const tileFor = (role: Role, idx: number): BentoTile => {
      const roleScope: PickScope = {
        role,
        contract: null,
        parkId: null,
        world: worldId,
        manager: role === 'parkmanagement',
      };
      // Variatie in de seed zodat ties tussen kandidaat-foto's per slot
      // verschillend kunnen vallen (deterministisch, maar niet identiek).
      const slotSeed = `eb|${role}|${idx}|${seed}`;
      const tile = pickRoleTile(roleScope, slotSeed);
      if (tile.src && usedRoleSrcs.has(tile.src)) {
        // Probeer een tweede pick met andere seed; lukt dat ook niet, val
        // terug op de vibe-tile zodat het slot niet leeg blijft.
        const retry = pickRoleTile(roleScope, `${slotSeed}|retry`);
        if (retry.src && !usedRoleSrcs.has(retry.src)) {
          usedRoleSrcs.add(retry.src);
          return retry;
        }
        return vibeTile(worldId);
      }
      if (tile.src) usedRoleSrcs.add(tile.src);
      return tile;
    };
    return {
      primary: tileFor(EB_SHOWCASE_ROLES[0], 0),
      secondary: tileFor(EB_SHOWCASE_ROLES[1], 1),
      tertiary: tileFor(EB_SHOWCASE_ROLES[2], 2),
      accent: tileFor(EB_SHOWCASE_ROLES[3], 3),
      trim,
    };
  }

  // Dedup pipeline: each slot walks a prioritized list, skips any src already used.
  const used = new Set<string>();

  // In single-park-trim is de park-naam al via de headline duidelijk; labels
  // op de tegels worden dan ruis. Bij multi-park willen we juist wél tonen
  // welk park je ziet.
  const suppressParkLabel = trim === 'park' && selectedParks.length === 1;
  const parkLabel = (name: string) => (suppressParkLabel ? '' : name);

  function pickFromPool(pool: Candidate[], ...fallbacks: BentoTile[]): BentoTile {
    for (const c of pool) {
      if (!used.has(c.src)) {
        used.add(c.src);
        return { src: c.src, label: parkLabel(c.parkName), kind: 'park' };
      }
    }
    for (const f of fallbacks) {
      if (!f) continue;
      if (!f.src) return f;
      if (!used.has(f.src)) {
        used.add(f.src);
        return f;
      }
    }
    return { src: null, label: '—', kind: 'vibe' };
  }

  if (trim === 'park' && parks[0]) {
    // Multi-park selectie → round-robin zodat elk geselecteerd park
    // minstens 1 foto krijgt voordat een park een 2e foto pakt.
    // Single park → sameFirst zodat 3 verschillende shots van dat park tonen.
    const strategy = selectedParks.length > 1 ? 'variety' : 'sameFirst';
    const pool = makeParkPool(parks, strategy);
    const hasSpecificRole = selectedRoles.length === 1 && Boolean(roleT.src);

    // Focus-park (zoals Hof van Saksen) heeft eigen rol/contract-foto's
    // in roles_2/. Die winnen van de generieke Sanity gallery: ze tonen
    // letterlijk een collega van dít park aan het werk.
    if (
      selectedParks.length === 1 &&
      hasParkSpecificPhotos(selectedParks[0].id)
    ) {
      const parkScope: PickScope = { ...scope, parkId: selectedParks[0].id };
      const parkPool = pickRolePhotoPool(parkScope, 4, seed);

      // Met een expliciete rol → die foto eerst (specificiteit-bonus geeft
      // 'm vanzelf de top-score), aangevuld met park-specifieke variatie.
      // Park-naam als fallback-label valt weg bij single-park (zie
      // suppressParkLabel); rol-specifieke labels ("Pizza", "Bediening")
      // blijven wel staan want die geven extra context.
      const fallbackParkLabel = parkLabel(selectedParks[0].name);
      const primaryTile: BentoTile = {
        src: parkPool[0]?.src ?? roleT.src,
        label: parkPool[0]?.label ?? fallbackParkLabel,
        kind: 'role',
      };
      if (primaryTile.src) used.add(primaryTile.src);

      const fillFromParkPool = (idx: number): BentoTile => {
        const candidate = parkPool[idx];
        if (candidate && !used.has(candidate.src)) {
          used.add(candidate.src);
          return {
            src: candidate.src,
            label: candidate.label ?? fallbackParkLabel,
            kind: 'role',
          };
        }
        // Fallback: leverde te weinig park-foto's; gallery aanvullen.
        return pickFromPool(pool, vibeT);
      };

      return {
        primary: primaryTile,
        secondary: fillFromParkPool(1),
        tertiary: fillFromParkPool(2),
        accent: fillFromParkPool(3),
        trim,
      };
    }

    // Park + specific role → role gets the highlighted primary slot, park
    // photos fill the rest. The work is the hero, the location supports it.
    if (hasSpecificRole && roleT.src) {
      used.add(roleT.src);
      return {
        primary: roleT,
        secondary: pickFromPool(pool, vibeT),
        tertiary: pickFromPool(pool, vibeT),
        accent: pickFromPool(pool, vibeT),
        trim,
      };
    }

    // Park-only (geen expliciete rol) → het werk leidt nog steeds: pak de
    // meest voorkomende rol uit de vacatures van dit park als primary.
    // Park-foto's vullen secondary/tertiary/accent en laten zien wáár dit
    // werk plaatsvindt.
    if (roleT.src) used.add(roleT.src);
    return {
      primary: roleT,
      secondary: pickFromPool(pool, vibeT),
      tertiary: pickFromPool(pool, vibeT),
      accent: pickFromPool(pool, vibeT),
      trim,
    };
  }

  if (trim === 'regio') {
    // Regio: het werk leidt (rol primary). De 3 supporting-tiles laten
    // de breedte van de regio zien — ongeacht of de rol-filter weinig
    // matches geeft. Daarom: parks-pool uit regionContextVacancies
    // (regio-only) zodat een smal rol-filter de context niet wegslaat.
    const contextParks = regionContextVacancies
      ? topParks(regionContextVacancies, 8)
      : parks;
    const pool = makeParkPool(contextParks, 'variety');
    if (roleT.src) used.add(roleT.src);
    return {
      primary: roleT,
      secondary: pickFromPool(pool, vibeT),
      tertiary: pickFromPool(pool, vibeT),
      accent: pickFromPool(pool, vibeT),
      trim,
    };
  }

  // ROL + CONTRACT: role primary; the other 3 slots prefer different parks; vibe last resort.
  const pool = makeParkPool(parks, 'variety');
  if (roleT.src) used.add(roleT.src);
  return {
    primary: roleT,
    secondary: pickFromPool(pool, vibeT),
    tertiary: pickFromPool(pool, vibeT),
    accent: pickFromPool(pool, vibeT),
    trim,
  };
}
