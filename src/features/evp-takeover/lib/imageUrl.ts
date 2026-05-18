/**
 * Resolve a photo identifier to a usable URL.
 *
 * Accepts three formats:
 *   - Full URL (starts with http) → returned as-is
 *   - Pure numeric string → treated as a Pexels photo ID
 *   - Anything else → treated as an Unsplash photo ID
 *
 * This lets the data layer mix sources freely (e.g. Pexels for setting
 * photography, Unsplash for work close-ups, or a Landal CDN URL later).
 */
export function resolveImageUrl(id: string, width = 700): string {
  if (id.startsWith('http') || id.startsWith('/')) return id;
  if (/^\d+$/.test(id)) {
    return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
  }
  return `https://images.unsplash.com/photo-${id}?w=${width}&auto=format&fit=crop&q=80`;
}
