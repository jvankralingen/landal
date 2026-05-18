import { allWorldParks } from '../data/parks';
import { parkImageUrls } from '../../../data/parkImageUrls';
import { getWorldForPark } from './getWorldForPark';
import type { WorldPark } from '../types';

/**
 * Tiny deterministic hash so adjacent-park selection is stable per parkId.
 * We don't want the cluster to reshuffle on every re-render.
 */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Pick `count` parks that:
 *   - share the current park's world
 *   - have a Landal CDN image in parkImageUrls
 *   - are not the current park itself
 *
 * Selection is deterministic (same input → same output) so the cluster
 * doesn't reshuffle while the user looks at it.
 */
export function pickAdjacentParks(
  currentPark: WorldPark,
  count = 2
): WorldPark[] {
  const currentWorld = getWorldForPark(currentPark);
  const candidates = allWorldParks.filter(
    (p) =>
      p.id !== currentPark.id &&
      getWorldForPark(p) === currentWorld &&
      Boolean(parkImageUrls[p.id])
  );

  // Stable sort by hash(currentParkId + candidateId).
  const sorted = candidates
    .map((p) => ({ p, key: hash(currentPark.id + ':' + p.id) }))
    .sort((a, b) => a.key - b.key)
    .map((x) => x.p);

  return sorted.slice(0, count);
}
