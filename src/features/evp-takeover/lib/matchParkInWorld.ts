import { allWorldParks, parkById } from '../data/parks';
import { parkSpecificPerks } from '../../../data/employeePerks';
import type { WorldId, WorldPark } from '../types';
import { getWorldForPark } from './getWorldForPark';

const worldIndex: Map<WorldId, WorldPark[]> = (() => {
  const map = new Map<WorldId, WorldPark[]>();
  for (const park of allWorldParks) {
    const world = getWorldForPark(park);
    const list = map.get(world) ?? [];
    list.push(park);
    map.set(world, list);
  }
  return map;
})();

const hasHighlight = (id: string): boolean =>
  Boolean((parkSpecificPerks as Record<string, unknown>)[id]);

export function parksForWorld(world: WorldId): WorldPark[] {
  return worldIndex.get(world) ?? [];
}

export function pickParkInWorld(
  world: WorldId,
  options: { excludeId?: string } = {}
): WorldPark | undefined {
  const candidates = parksForWorld(world).filter(
    (p) => p.id !== options.excludeId
  );
  if (candidates.length === 0) return undefined;

  const highlighted = candidates.filter((p) => hasHighlight(p.id));
  const pool = highlighted.length > 0 ? highlighted : candidates;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getPark(id: string): WorldPark | undefined {
  return parkById.get(id);
}
