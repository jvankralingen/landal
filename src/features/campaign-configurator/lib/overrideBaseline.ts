/**
 * Baseline-loader: een ge-committeerd preset uit `data/presetOverrides.json`
 * wordt op boot in de stores geladen, zodat alle gebruikers dezelfde
 * "permanente" beelden + teksten zien als de redactie heeft vastgelegd.
 *
 * Strategie:
 *  - Per `exportedAt` (≈ version) houden we in localStorage bij of de
 *    baseline al geïmporteerd is. Zo overschrijven we niet bij elke reload
 *    de overrides die de gebruiker zelf maakt.
 *  - Bij een nieuwer preset (andere exportedAt) wordt de baseline opnieuw
 *    gemerged — bestaande gebruikerskeuzes voor andere keys blijven staan,
 *    maar keys in de baseline worden overschreven.
 */

import presetData from '../data/presetOverrides.json';
import { setOverride as setImageOverride } from './imageOverrides';
import { persistTextOverride } from './textOverrides';
import type { OverridePreset } from './overrideExport';

const APPLIED_VERSION_KEY = 'landal-baseline-applied-version';

const preset = presetData as OverridePreset;

export function isEmptyPreset(): boolean {
  return (
    Object.keys(preset.images).length === 0 &&
    Object.keys(preset.texts).length === 0
  );
}

export async function applyBaselineIfNeeded(): Promise<void> {
  if (typeof localStorage === 'undefined') return;
  if (isEmptyPreset()) return;
  const applied = localStorage.getItem(APPLIED_VERSION_KEY);
  if (applied === preset.exportedAt) return;

  // Text-overrides direct in localStorage (synchroon).
  for (const [key, value] of Object.entries(preset.texts)) {
    persistTextOverride(key, value);
  }
  // Image-overrides via IndexedDB (asynchroon).
  for (const [key, value] of Object.entries(preset.images)) {
    try {
      await setImageOverride(key, value);
    } catch {
      // best-effort; één faal mag niet de hele baseline blokkeren
    }
  }
  localStorage.setItem(APPLIED_VERSION_KEY, preset.exportedAt);
}
