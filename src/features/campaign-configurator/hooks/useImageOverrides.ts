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
   * Exact-match lookup. Override geldt alléén voor de huidige selectie;
   * een upload onder "park-only" verschijnt NIET in "park+rol" view (daar
   * zou de default-picker een rol-specifieke foto tonen).
   *
   * Non-primary slots negeren rol — voor die slots is alleen subject-axis.
   */
  const overrideFor = useCallback(
    (
      subject: OverrideSubject | null | undefined,
      role: string | null | undefined,
      slot: BentoSlot
    ): { dataUrl: string } | undefined => {
      // Non-primary slots: subject vereist, rol genegeerd
      if (slot !== 'primary') {
        if (!subject) return undefined;
        const k = overrideKey(subject, null, slot);
        const found = overrides[k];
        return found ? { dataUrl: found } : undefined;
      }
      // Primary: exact-match op (subject, role) — beide kunnen leeg zijn,
      // maar minstens één moet gezet zijn anders is er geen handvat.
      if (!subject && !role) return undefined;
      const k = overrideKey(subject ?? null, role ?? null, slot);
      const found = overrides[k];
      return found ? { dataUrl: found } : undefined;
    },
    [overrides]
  );

  return { overrides, loaded, uploadFor, resetFor, overrideFor };
}
