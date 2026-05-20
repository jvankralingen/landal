import { useCallback, useEffect, useState } from 'react';
import {
  clearOverride as clearStored,
  fileToResizedDataUrl,
  getAllOverrides,
  overrideKey,
  setOverride as setStored,
  type BentoSlot,
} from '../lib/imageOverrides';

/**
 * Stateful interface naar de IndexedDB-store van per-tile overrides.
 * Sleutels volgen `parkId|role|slot` (role kan leeg zijn voor park-brede
 * defaults). Lookup is hiërarchisch: probeert eerst rol-specifiek, dan
 * park-breed, anders no-op.
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

  /**
   * Upload voor een specifieke scope. Wanneer `role` niet leeg is, geldt de
   * upload alleen voor díe rol binnen dit park. Geen rol = park-brede default.
   */
  const uploadFor = useCallback(
    async (parkId: string, role: string | null, slot: BentoSlot, file: File) => {
      const dataUrl = await fileToResizedDataUrl(file);
      const key = overrideKey(parkId, role, slot);
      await setStored(key, dataUrl);
      setOverrides((prev) => ({ ...prev, [key]: dataUrl }));
    },
    []
  );

  /** Wist alléén de exact-matchende key. Eventuele park-brede default blijft staan. */
  const resetFor = useCallback(
    async (parkId: string, role: string | null, slot: BentoSlot) => {
      const key = overrideKey(parkId, role, slot);
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
   * Lookup voor de huidige scope. Probeer eerst rol-specifiek, dan
   * park-breed (role = ''). Retourneert ook welk niveau ('role' | 'park')
   * gematcht heeft, zodat de UI weet welke reset de gebruiker uitvoert.
   */
  const overrideFor = useCallback(
    (
      parkId: string | null | undefined,
      role: string | null | undefined,
      slot: BentoSlot
    ): { dataUrl: string; level: 'role' | 'park' } | undefined => {
      if (!parkId) return undefined;
      if (role) {
        const roleKey = overrideKey(parkId, role, slot);
        const found = overrides[roleKey];
        if (found) return { dataUrl: found, level: 'role' };
      }
      const parkKey = overrideKey(parkId, null, slot);
      const found = overrides[parkKey];
      if (found) return { dataUrl: found, level: 'park' };
      return undefined;
    },
    [overrides]
  );

  return { overrides, loaded, uploadFor, resetFor, overrideFor };
}
