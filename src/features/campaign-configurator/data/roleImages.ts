import type { Contract, Role } from '../types';
import type { WorldId } from '../lib/worlds';

/**
 * One photo from /public/photos/roles_2/ tagged with the scope it best
 * represents. Specificity is layered: parkId > role > contract > world.
 * The bento picker scores all photos against the active campaign scope and
 * picks the best match; ties are broken deterministically via a seed so the
 * same scope always renders the same tile until inputs change.
 *
 * Adding a new file? Pick the most specific tags that are truthfully visible
 * in the photo. Leave a field empty if the photo is generic on that axis.
 */
export interface RolePhoto {
  src: string;
  role: Role | null;
  contract?: Contract;
  /** Specific park ID (e.g. 'hof_van_saksen'). Used for park spotlight. */
  parkId?: string;
  /** Hint for which world the photo fits (e.g. HQ photos → 'hq'). */
  world?: WorldId;
  /** True if the photo depicts a manager/senior — used for parkmanagement. */
  manager?: boolean;
  /** Optional short label shown under the tile. */
  label?: string;
}

const P = (file: string) => `/photos/roles_2/${file}`;

export const ROLE_PHOTOS: RolePhoto[] = [
  // ─── Horeca · keuken ────────────────────────────────────────────────
  { src: P('bakkerij-baan.webp'), role: 'horeca-keuken', contract: 'vast', label: 'Bakkerij' },
  { src: P('keuken-baan.webp'), role: 'horeca-keuken', contract: 'vast' },
  { src: P('keuken-bijbaan.webp'), role: 'horeca-keuken', contract: 'bijbaan' },
  { src: P('keuken-manager.webp'), role: 'horeca-keuken', manager: true },
  { src: P('kok-baan.webp'), role: 'horeca-keuken', contract: 'vast', label: 'Kok' },

  // ─── Horeca · bediening ────────────────────────────────────────────
  { src: P('bediening-baan.webp'), role: 'horeca-bediening', contract: 'vast' },
  { src: P('bediening-bijbaan.webp'), role: 'horeca-bediening', contract: 'bijbaan' },
  { src: P('fb-manager.webp'), role: 'horeca-bediening', manager: true, label: 'F&B' },
  { src: P('snackbar-baan.webp'), role: 'horeca-bediening', contract: 'vast', label: 'Snackbar' },
  { src: P('snackbar-bijbaan.webp'), role: 'horeca-bediening', contract: 'bijbaan', label: 'Snackbar' },

  // ─── Front office / hospitality ────────────────────────────────────
  { src: P('fo-baan.webp'), role: 'front-office', contract: 'vast' },
  { src: P('fo-bijbaan.webp'), role: 'front-office', contract: 'bijbaan' },
  { src: P('fo-manager.webp'), role: 'front-office', manager: true },
  { src: P('hospitality-baan.webp'), role: 'front-office', contract: 'vast', label: 'Hospitality' },
  { src: P('hospitality-bijbaan.webp'), role: 'front-office', contract: 'bijbaan', label: 'Hospitality' },
  { src: P('hospitality-manager.webp'), role: 'front-office', manager: true, label: 'Hospitality' },

  // ─── Fun & entertainment ───────────────────────────────────────────
  { src: P('fe-baan.webp'), role: 'fun-entertainment', contract: 'vast' },
  { src: P('fe-bijbaan.webp'), role: 'fun-entertainment', contract: 'bijbaan' },

  // ─── Zwembad ───────────────────────────────────────────────────────
  { src: P('zwembad-baan.webp'), role: 'zwembad', contract: 'vast' },
  { src: P('zwembad-bijbaan.webp'), role: 'zwembad', contract: 'bijbaan' },
  { src: P('zwembad-manager.webp'), role: 'zwembad', manager: true },

  // ─── Retail ────────────────────────────────────────────────────────
  { src: P('parkshop-baan.webp'), role: 'retail', contract: 'vast', label: 'Parkshop' },
  { src: P('parkshop-bijbaan.webp'), role: 'retail', contract: 'bijbaan', label: 'Parkshop' },
  { src: P('supermarkt-baan.webp'), role: 'retail', contract: 'vast', label: 'Supermarkt' },
  { src: P('supermarkt-bijbaan.webp'), role: 'retail', contract: 'bijbaan', label: 'Supermarkt' },

  // ─── Parkmanagement (per world) ────────────────────────────────────
  { src: P('general-manager-bos.webp'), role: 'parkmanagement', manager: true, world: 'forest' },
  { src: P('general-manager-strand.webp'), role: 'parkmanagement', manager: true, world: 'coast' },

  // ─── Hoofdkantoor ──────────────────────────────────────────────────
  { src: P('communicatie-hq.webp'), role: 'hoofdkantoor', world: 'hq', label: 'Communicatie' },
  { src: P('esg-hq.webp'), role: 'hoofdkantoor', world: 'hq', label: 'ESG' },
  { src: P('guest-service-hq.webp'), role: 'hoofdkantoor', world: 'hq', label: 'Guest Service' },
  { src: P('hr-hq.webp'), role: 'hoofdkantoor', world: 'hq', label: 'HR' },
  { src: P('it-hq.webp'), role: 'hoofdkantoor', world: 'hq', label: 'IT' },
  { src: P('makelaardij-hq.webp'), role: 'hoofdkantoor', world: 'hq', label: 'Makelaardij' },
  { src: P('operations-hq.webp'), role: 'hoofdkantoor', world: 'hq', label: 'Operations' },
  { src: P('shared-service-center-hq.webp'), role: 'hoofdkantoor', world: 'hq', label: 'SSC' },
  { src: P('hoofdkantoor-1-stage.webp'), role: 'hoofdkantoor', world: 'hq', contract: 'stage' },
  { src: P('hoofdkantoor-2-stage.webp'), role: 'hoofdkantoor', world: 'hq', contract: 'stage' },
  { src: P('hoofdkantoor-3-stage.webp'), role: 'hoofdkantoor', world: 'hq', contract: 'stage' },

  // ─── Wellness (wereld, geen losse rol) ─────────────────────────────
  { src: P('thermaalbad.webp'), role: null, world: 'wellness', label: 'Thermaalbad' },
  { src: P('wellness-baan.webp'), role: null, world: 'wellness', contract: 'vast' },
  { src: P('wellness-manager.webp'), role: null, world: 'wellness', manager: true },

  // ─── Generic / stage / placeholder ─────────────────────────────────
  { src: P('duitsland-stage.webp'), role: null, contract: 'stage', label: 'Duitsland' },
  { src: P('teamfoto-stage.webp'), role: null, contract: 'stage', label: 'Team' },

  // ─── Hof van Saksen specifiek ──────────────────────────────────────
  // HSN photos all carry parkId — they win the spotlight when Hof van
  // Saksen is selected as a single park. Roles are tagged where the
  // photo shows a clearly identifiable role/contract.
  { src: P('hsn-fb-bediening.webp'), parkId: 'hof_van_saksen', role: 'horeca-bediening' },
  { src: P('hsn-fb-kok.webp'), parkId: 'hof_van_saksen', role: 'horeca-keuken', label: 'Kok' },
  { src: P('hsn-fb-leerling.webp'), parkId: 'hof_van_saksen', role: 'horeca-keuken', contract: 'stage', label: 'Leerling' },
  { src: P('hsn-fb-management-1.webp'), parkId: 'hof_van_saksen', role: 'horeca-bediening', manager: true },
  { src: P('hsn-fb-management-2.webp'), parkId: 'hof_van_saksen', role: 'horeca-bediening', manager: true },
  { src: P('hsn-fb-pizza.webp'), parkId: 'hof_van_saksen', role: 'horeca-keuken', label: 'Pizza' },
  { src: P('hsn-kantoor.webp'), parkId: 'hof_van_saksen', role: 'parkmanagement', label: 'Kantoor' },
  { src: P('hsn-kok-supermarkt.webp'), parkId: 'hof_van_saksen', role: 'horeca-keuken', label: 'Kok supermarkt' },
  { src: P('hsn-ontbijtkok.webp'), parkId: 'hof_van_saksen', role: 'horeca-keuken', label: 'Ontbijtkok' },
  { src: P('hsn-property-management.webp'), parkId: 'hof_van_saksen', role: 'parkmanagement', manager: true, label: 'Property' },
  { src: P('hsn-property.webp'), parkId: 'hof_van_saksen', role: 'parkmanagement', label: 'Property' },
  { src: P('hsn-retail.webp'), parkId: 'hof_van_saksen', role: 'retail' },
  { src: P('hsn-stage-edu.webp'), parkId: 'hof_van_saksen', contract: 'stage', role: null, label: 'Stage' },
  { src: P('hsn-stage-fb.webp'), parkId: 'hof_van_saksen', role: 'horeca-bediening', contract: 'stage' },
  { src: P('hsn-stage-fo.webp'), parkId: 'hof_van_saksen', role: 'front-office', contract: 'stage' },
  { src: P('hsn-supermarkt-ijs.webp'), parkId: 'hof_van_saksen', role: 'retail', label: 'Supermarkt' },
  { src: P('hsn-supermarkt-manager.webp'), parkId: 'hof_van_saksen', role: 'retail', manager: true, label: 'Supermarkt' },
  { src: P('hsn-edutainment.webp'), parkId: 'hof_van_saksen', role: 'fun-entertainment', label: 'Edutainment' },
  { src: P('hsn-edu-archacademie.webp'), parkId: 'hof_van_saksen', contract: 'stage', role: null, label: 'Archacademie' },
  { src: P('hsn-beauty.webp'), parkId: 'hof_van_saksen', role: null, label: 'Beauty' },
  { src: P('hsn-beveiliger.webp'), parkId: 'hof_van_saksen', role: null, label: 'Beveiliging' },
];

/* ──────────────────────────────────────────────────────────────────────
   Picker
   ──────────────────────────────────────────────────────────────────────
   Given an active scope (role, contract, parkId, world), score every photo
   and return the best match — or a small variety pool when picking
   multiple tiles.
   ────────────────────────────────────────────────────────────────────── */

export interface PickScope {
  role?: Role | null;
  contract?: Contract | null;
  parkId?: string | null;
  world?: WorldId | null;
  /** When true, prefer manager/senior portraits (used for parkmanagement). */
  manager?: boolean;
}

/** How well a photo matches a scope. Higher = better. */
function scorePhoto(p: RolePhoto, s: PickScope): number {
  let score = 0;
  if (s.parkId && p.parkId === s.parkId) score += 100;
  else if (s.parkId && p.parkId) score -= 50; // park-specific photo for wrong park is a penalty
  if (s.role && p.role && p.role === s.role) score += 40;
  else if (s.role && p.role && p.role !== s.role) score -= 10;
  if (s.contract && p.contract === s.contract) score += 20;
  else if (s.contract && p.contract && p.contract !== s.contract) score -= 5;
  if (s.world && p.world === s.world) score += 10;
  if (s.manager && p.manager) score += 8;
  // Generic photos (role: null, no park) score 0 baseline — used as last resort.
  return score;
}

/** Stable seeded RNG so the same cache key gives the same picks. */
function seededRng(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}

/** Pick the single best photo for a scope, or null if no photo scores > 0. */
export function pickRolePhoto(scope: PickScope, seed = 'default'): RolePhoto | null {
  const scored = ROLE_PHOTOS.map((p) => ({ p, score: scorePhoto(p, scope) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  if (scored.length === 0) return null;
  // All photos tied at top score → deterministic pick from that group.
  const topScore = scored[0].score;
  const top = scored.filter((x) => x.score === topScore);
  const rng = seededRng(seed);
  return top[Math.floor(rng() * top.length)].p;
}

/** Pick N photos for a scope with variety (no duplicates). */
export function pickRolePhotoPool(
  scope: PickScope,
  n: number,
  seed = 'default'
): RolePhoto[] {
  const scored = ROLE_PHOTOS.map((p) => ({ p, score: scorePhoto(p, scope) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  if (scored.length === 0) return [];

  // Shuffle within score buckets so variety isn't biased toward file order.
  const rng = seededRng(seed);
  const buckets = new Map<number, RolePhoto[]>();
  for (const { p, score } of scored) {
    const arr = buckets.get(score) ?? [];
    arr.push(p);
    buckets.set(score, arr);
  }
  const ordered: RolePhoto[] = [];
  const sortedScores = [...buckets.keys()].sort((a, b) => b - a);
  for (const s of sortedScores) {
    const bucket = buckets.get(s)!.slice();
    // Fisher-Yates with seeded rng
    for (let i = bucket.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [bucket[i], bucket[j]] = [bucket[j], bucket[i]];
    }
    ordered.push(...bucket);
  }
  return ordered.slice(0, n);
}
