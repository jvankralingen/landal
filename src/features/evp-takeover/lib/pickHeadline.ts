import { worlds } from '../data/worlds';
import type { WorldId } from '../types';

export function pickHeadline(world: WorldId, seed: string): string {
  const list = worlds[world].headlines;
  if (list.length === 0) return '';
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(h) % list.length;
  return list[idx];
}
