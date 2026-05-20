/**
 * Focus-parken voor de EVP-presentatie — parken waar we expliciet rijke
 * beeldregie + concrete copy aan koppelen. Worden bovenaan de park-lijst
 * gepind zodat ze tijdens een live-demo snel te selecteren zijn, en
 * gemarkeerd met een ster zodat duidelijk is welke parken "presentatie-
 * klaar" zijn.
 *
 * Houd de namen exact gelijk aan `name` in src/data/parkData.js — de
 * lijst wordt op park-naam gematcht, niet op id.
 */
export const FOCUS_PARK_NAMES: string[] = [
  // Bestaand
  'Hof van Saksen',          // premium · luxe / flagship
  'Park Gulpen',             // forest · natuur / panorama
  'Hillview Resort Grandvoir', // forest · natuur / Ardennen
  'Roompot Zandvoort',       // coast · actief / F1
  // Toegevoegd voor vibe-diversiteit
  'Het Land van Bartje',     // family · boerderij / kinderen
  'Marber Veluwe',           // wellness · spa / stilte
  'Ameland State',           // wadden · eiland / ruimte
  'Alpendorf Dachstein West', // mountain · alpen / ski
];

export const FOCUS_PARKS_SET = new Set(FOCUS_PARK_NAMES);

export function isFocusPark(parkName: string): boolean {
  return FOCUS_PARKS_SET.has(parkName);
}
