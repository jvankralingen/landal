import { useCallback, useEffect, useState } from 'react';
import {
  clearOverride as clearStored,
  fileToResizedDataUrl,
  getAllOverrides,
  overrideKey,
  setOverride as setStored,
  type BentoSlot,
  type OverrideSubject,
} from '../lib/imageOverrides';

/**
 * Stateful interface naar de IndexedDB-store van per-tile overrides.
 *
 * Het subject is óf een park óf een regio. Per slot gelden andere
 * scope-regels (zie lib/imageOverrides.ts):
 *  - primary tile is rol-aware met fallback naar subject-breed
 *  - andere tiles zijn altijd subject-breed (rol genegeerd)
 */
export function useImageOverrides() {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getAllOverrides()
      .then((all) => {
        if (cancelled) return;
        setOverrides(all);
        setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const uploadFor = useCallback(
    async (
      subject: OverrideSubject | null,
      role: string | null,
      slot: BentoSlot,
      file: File
    ) => {
      const dataUrl = await fileToResizedDataUrl(file);
      const key = overrideKey(subject, role, slot);
      await setStored(key, dataUrl);
      setOverrides((prev) => ({ ...prev, [key]: dataUrl }));
    },
    []
  );

  /** Wist alléén de exact-matchende key. Aanroeper bepaalt welk niveau. */
  const resetFor = useCallback(
    async (
      subject: OverrideSubject | null,
      role: string | null,
      slot: BentoSlot
    ) => {
      const key = overrideKey(subject, role, slot);
      await clearStored(key);
      setOverrides((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    []
  );

  /**
   * Hiërarchische lookup (specifiekst eerst):
   *  - primary:
   *      1. subject + rol     — meest specifiek
   *      2. rol-only          — "deze rol op elk park" (rol > park)
   *      3. subject-only      — "dit park voor elke rol"
   *  - andere slots: altijd subject-only
   *
   * Retourneert ook welk niveau gematcht heeft zodat de UI weet welke
   * reset uitgevoerd moet worden.
   */
  const overrideFor = useCallback(
    (
      subject: OverrideSubject | null | undefined,
      role: string | null | undefined,
      slot: BentoSlot
    ):
      | { dataUrl: string; level: 'subject+role' | 'role' | 'subject' }
      | undefined => {
      if (slot === 'primary') {
        if (subject && role) {
          const k = overrideKey(subject, role, slot);
          const found = overrides[k];
          if (found) return { dataUrl: found, level: 'subject+role' };
        }
        if (role) {
          const k = overrideKey(null, role, slot);
          const found = overrides[k];
          if (found) return { dataUrl: found, level: 'role' };
        }
        if (subject) {
          const k = overrideKey(subject, null, slot);
          const found = overrides[k];
          if (found) return { dataUrl: found, level: 'subject' };
        }
        return undefined;
      }
      // non-primary slots: alleen subject-axis
      if (!subject) return undefined;
      const k = overrideKey(subject, null, slot);
      const found = overrides[k];
      if (found) return { dataUrl: found, level: 'subject' };
      return undefined;
    },
    [overrides]
  );

  return { overrides, loaded, uploadFor, resetFor, overrideFor };
}
