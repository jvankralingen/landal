/**
 * Per-tile image-overrides opgeslagen in IndexedDB.
 *
 * Een gebruiker kan een eigen afbeelding uploaden voor elke tile in de
 * bento. De keuze blijft in deze browser tot er een reset gedaan wordt.
 * Cross-browser sharing zou Vercel Blob / KV nodig hebben — buiten scope
 * voor deze MVP.
 *
 * Sleutel = `${parkId}:${slot}` (bv. `hof_van_saksen:primary`). Value =
 * data-URL string (image/webp of fallback image/jpeg, max ~200KB na resize).
 */

export type BentoSlot = 'primary' | 'secondary' | 'tertiary' | 'accent';

export const overrideKey = (parkId: string, slot: BentoSlot): string =>
  `${parkId}:${slot}`;

const DB_NAME = 'landal-config-overrides';
const DB_VERSION = 1;
const STORE = 'park-images';

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(new Error('IndexedDB not available'));
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return dbPromise;
}

export async function getOverride(parkId: string): Promise<string | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(parkId);
    req.onsuccess = () => resolve((req.result as string | undefined) ?? null);
    req.onerror = () => reject(req.error);
  });
}

export async function setOverride(parkId: string, dataUrl: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(dataUrl, parkId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearOverride(parkId: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(parkId);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getAllOverrides(): Promise<Record<string, string>> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const out: Record<string, string> = {};
    const tx = db.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    const req = store.openCursor();
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor) {
        out[cursor.key as string] = cursor.value as string;
        cursor.continue();
      } else {
        resolve(out);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

/**
 * Verkleint een upload naar maximaal `maxWidth` pixels breed en encodeert
 * naar WebP voor compacte opslag. Voorkomt dat IndexedDB onnodig vol loopt
 * met multi-MB foto's terwijl het render-formaat amper 500px nodig heeft.
 */
export async function fileToResizedDataUrl(
  file: File,
  maxWidth = 1920,
  quality = 0.82
): Promise<string> {
  const sourceDataUrl = await readAsDataUrl(file);
  const img = await loadImage(sourceDataUrl);
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, maxWidth / img.naturalWidth);
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  // WebP geeft typisch 50-70% kleinere files dan JPEG bij identieke kwaliteit.
  // Sommige (oudere) browsers ondersteunen WebP-encoding niet → silently
  // valt toDataURL terug op PNG of leeg; in dat geval expliciet JPEG.
  const webp = canvas.toDataURL('image/webp', quality);
  if (webp.startsWith('data:image/webp')) return webp;
  return canvas.toDataURL('image/jpeg', quality);
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = src;
  });
}
