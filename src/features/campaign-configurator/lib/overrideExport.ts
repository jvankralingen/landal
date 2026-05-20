/**
 * Export / import-format voor alle gebruikers-overrides (beelden + tekst).
 *
 * De configurator-state bestaat uit twee stores:
 *  - **IndexedDB** (`landal-config-overrides`, store `park-images`) — beelden
 *  - **localStorage** (`landal-text-overrides`) — tekst (headline, subtitle,
 *    vibe, perks-als-JSON)
 *
 * De export combineert beide tot één JSON-blob die de gebruiker kan
 * downloaden. Een dev kan diezelfde JSON in `data/presetOverrides.json`
 * committen — die wordt op boot als baseline geladen, zodat de
 * presentatie-versie van de campagne reproduceerbaar is voor iedereen.
 *
 * Bestandsformaat (v1):
 * {
 *   "version": 1,
 *   "exportedAt": "<ISO date>",
 *   "images": { "<key>": "<data-url>" },
 *   "texts":  { "<key>": "<string>" }
 * }
 */

import { getAllOverrides as getAllImageOverrides } from './imageOverrides';
import { getAllTextOverrides } from './textOverrides';

export interface OverridePreset {
  version: 1;
  exportedAt: string;
  images: Record<string, string>;
  texts: Record<string, string>;
}

export async function buildPreset(): Promise<OverridePreset> {
  const [images, texts] = await Promise.all([
    getAllImageOverrides().catch(() => ({})),
    Promise.resolve(getAllTextOverrides()),
  ]);
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    images,
    texts,
  };
}

export function presetSummary(preset: OverridePreset): string {
  const imgCount = Object.keys(preset.images).length;
  const textCount = Object.keys(preset.texts).length;
  return `${imgCount} beeld${imgCount === 1 ? '' : 'en'} · ${textCount} tekst${textCount === 1 ? '' : 'en'}`;
}

/**
 * Trigger een browser-download van het preset als `presetOverrides.json`.
 * Die filename matcht het pad in de repo (`data/presetOverrides.json`),
 * zodat de ontvanger het bestand direct daar kan droppen zonder rename.
 */
export function downloadPreset(preset: OverridePreset): void {
  const blob = new Blob([JSON.stringify(preset, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'presetOverrides.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Geef de browser de kans om de download te starten voordat we de URL releasen.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Validatie van een ingeladen JSON-blob. Geeft een schoon preset-object
 * terug of `null` bij onverwacht formaat.
 */
export function parsePreset(json: string): OverridePreset | null {
  try {
    const parsed = JSON.parse(json) as Partial<OverridePreset>;
    if (
      parsed &&
      typeof parsed === 'object' &&
      parsed.version === 1 &&
      typeof parsed.exportedAt === 'string' &&
      parsed.images &&
      typeof parsed.images === 'object' &&
      parsed.texts &&
      typeof parsed.texts === 'object'
    ) {
      return parsed as OverridePreset;
    }
    return null;
  } catch {
    return null;
  }
}
