/**
 * Per-scope text-overrides voor headline / subtitle / vibe-copy.
 *
 * Volgens hetzelfde exact-match-model als de image-overrides: een override
 * geldt alléén voor de exacte (subject, role)-selectie waaronder hij is
 * opgeslagen. Switch je naar een andere selectie → andere key → de
 * auto-generated tekst neemt het over.
 *
 * Sleutel-formaat: `${field}|${subjectKey}|${roleKey}`
 *  - field: 'headline' | 'subtitle' | 'vibe'
 *  - subjectKey: 'park:<id>', 'region:<id>' of '' (geen subject)
 *  - roleKey: rol-id of '' (geen rol-axis)
 *
 * Opslag: localStorage. Synchronous, klein (text), simpel. Volstaat voor
 * de demo-context — cross-device sharing zou een backend nodig hebben.
 */
import type { OverrideSubject } from './imageOverrides';

const STORAGE_KEY = 'landal-text-overrides';

export type TextField = 'headline' | 'subtitle' | 'vibe';

export function textOverrideKey(
  field: TextField,
  subject: OverrideSubject | null | undefined,
  role: string | null | undefined
): string {
  const subjectKey = subject ? `${subject.type}:${subject.id}` : '';
  return `${field}|${subjectKey}|${role ?? ''}`;
}

export function getAllTextOverrides(): Record<string, string> {
  if (typeof localStorage === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function persistTextOverride(key: string, value: string): void {
  if (typeof localStorage === 'undefined') return;
  const all = getAllTextOverrides();
  all[key] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function clearPersistedTextOverride(key: string): void {
  if (typeof localStorage === 'undefined') return;
  const all = getAllTextOverrides();
  delete all[key];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
