export const parkPageUrls: Record<string, string>;
export const parkImageUrls: Record<string, string>;
export const parkGalleryImages: Record<string, string[]>;
export function getParkPageUrl(parkId: string): string | undefined;
export function getParkImageUrl(parkId: string): string | undefined;
export function getGalleryImageUrl(
  contentId: string,
  format?: '3x2' | '4x5' | '16x9' | '1x1',
  width?: 400 | 600 | 800 | 1024 | 1280 | 1920
): string;
