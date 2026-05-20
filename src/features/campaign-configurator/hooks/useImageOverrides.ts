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
      subject: OverrideSubject,
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

  /**
   * Wist alléén de exact-matchende key. Voor non-primary slots is dat
   * automatisch de subject-brede entry; voor primary kies de aanroeper
   * (via `role`) of die de rol-specifieke of de subject-brede wist.
   */
  const resetFor = useCallback(
    async (
      subject: OverrideSubject,
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
   * Hiërarchische lookup:
   *  - primary: probeer rol-specifiek, dan subject-breed
   *  - andere slots: altijd subject-breed
   *
   * Retourneert ook welk niveau ('role' | 'subject') gematcht heeft zodat
   * een UI weet welke reset uitgevoerd moet worden.
   */
  const overrideFor = useCallback(
    (
      subject: OverrideSubject | null | undefined,
      role: string | null | undefined,
      slot: BentoSlot
    ): { dataUrl: string; level: 'role' | 'subject' } | undefined => {
      if (!subject) return undefined;
      if (slot === 'primary' && role) {
        const roleKey = overrideKey(subject, role, slot);
        const found = overrides[roleKey];
        if (found) return { dataUrl: found, level: 'role' };
      }
      const subjectKey = overrideKey(subject, null, slot);
      const found = overrides[subjectKey];
      if (found) return { dataUrl: found, level: 'subject' };
      return undefined;
    },
    [overrides]
  );

  return { overrides, loaded, uploadFor, resetFor, overrideFor };
}
