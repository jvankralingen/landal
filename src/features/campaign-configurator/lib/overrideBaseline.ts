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
import {
  clearOverride as clearImageOverride,
  getAllOverrides as getAllImageOverrides,
  setOverride as setImageOverride,
} from './imageOverrides';
import {
  clearPersistedTextOverride,
  getAllTextOverrides,
  persistTextOverride,
} from './textOverrides';
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

/**
 * Importeer een door de gebruiker aangeleverd preset (bv. een JSON die
 * een collega heeft geëxporteerd). Vervangt alle huidige overrides door
 * de inhoud van het preset, zodat de preview lokaal precies overeenkomt
 * met wat de gebruiker straks gaat committen als baseline.
 *
 * Marker (APPLIED_VERSION_KEY) wordt ook bijgewerkt zodat de
 * baseline-loader het niet alsnog wil overschrijven met de in-repo
 * `presetOverrides.json` (die mogelijk nog oud is).
 */
export async function importPreset(toImport: OverridePreset): Promise<void> {
  if (typeof localStorage === 'undefined') return;

  // Bestaande text-overrides wissen.
  for (const key of Object.keys(getAllTextOverrides())) {
    clearPersistedTextOverride(key);
  }
  // Bestaande image-overrides wissen.
  try {
    const existingImages = await getAllImageOverrides();
    for (const key of Object.keys(existingImages)) {
      try {
        await clearImageOverride(key);
      } catch {
        // best-effort
      }
    }
  } catch {
    // best-effort
  }

  // Nieuwe overrides toepassen.
  for (const [key, value] of Object.entries(toImport.texts)) {
    persistTextOverride(key, value);
  }
  for (const [key, value] of Object.entries(toImport.images)) {
    try {
      await setImageOverride(key, value);
    } catch {
      // best-effort
    }
  }

  localStorage.setItem(APPLIED_VERSION_KEY, toImport.exportedAt);
}
