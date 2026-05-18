import type { WorldDefExtended } from '../data/worlds';
import type { RoleDef } from '../data/roles';
import type { CollageTile, WorldPark } from '../types';
import { resolveImageUrl } from './imageUrl';
import {
  parkGalleryImages,
  getGalleryImageUrl,
} from '../../../data/parkImageUrls';

/**
 * Build the 5-tile collage for the current (world, role, park) combo.
 *
 * Slot allocation:
 *   0 = ROLE photo                  (jobs.landal.com asset)
 *   1 = selected PARK photo #1      (Landal CDN · gallery image 1 of this park)
 *   2 = selected PARK photo #2      (Landal CDN · gallery image 2 of this park)
 *   3 = selected PARK photo #3      (Landal CDN · gallery image 3 of this park)
 *   4 = WORLD vibe photo            (Pexels · single accent)
 *
 * All three context tiles are now 3 different shots of the SAME park, taken
 * from the card-gallery on the park's landal.nl page. Stock-photo risk is
 * contained to slot 4 only.
 */
export function buildCollage(
  world: WorldDefExtended,
  role: RoleDef,
  park: WorldPark
): CollageTile[] {
  const base = world.collage ?? [];
  if (base.length < 5) return base;

  const galleryIds = parkGalleryImages[park.id] ?? [];
  const galleryUrls = galleryIds.map((id) => getGalleryImageUrl(id, '3x2', 1280));

  return base.map((t, i) => {
    if (i === 0) {
      const photo0 = role.photos[0];
      return {
        ...t,
        src: photo0 ? resolveImageUrl(photo0, 900) : null,
        placeholderLabel: role.label,
        aspect: 'role' as const,
      };
    }
    if (i === 1 || i === 2 || i === 3) {
      const idx = i - 1; // 0, 1, 2
      const src = galleryUrls[idx] ?? null;
      return {
        ...t,
        src,
        placeholderLabel: park.name,
        aspect: 'park' as const,
      };
    }
    // Slot 4 keeps the world's vibe photo from worlds.ts.
    return t;
  });
}
