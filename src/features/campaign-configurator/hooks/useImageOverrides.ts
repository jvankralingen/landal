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
 * Bij mount worden alle bestaande overrides geladen; daarna is de state
 * synchroon te lezen en mutaties schrijven door naar IDB. Sleutels
 * volgen `${parkId}:${slot}` — zie lib/imageOverrides.ts.
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
    async (parkId: string, slot: BentoSlot, file: File) => {
      const dataUrl = await fileToResizedDataUrl(file);
      const key = overrideKey(parkId, slot);
      await setStored(key, dataUrl);
      setOverrides((prev) => ({ ...prev, [key]: dataUrl }));
    },
    []
  );

  const resetFor = useCallback(async (parkId: string, slot: BentoSlot) => {
    const key = overrideKey(parkId, slot);
    await clearStored(key);
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const overrideFor = useCallback(
    (parkId: string | null | undefined, slot: BentoSlot): string | undefined => {
      if (!parkId) return undefined;
      return overrides[overrideKey(parkId, slot)];
    },
    [overrides]
  );

  return { overrides, loaded, uploadFor, resetFor, overrideFor };
}
