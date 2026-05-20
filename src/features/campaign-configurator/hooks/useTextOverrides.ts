import { useCallback, useState } from 'react';
import type { OverrideSubject } from '../lib/imageOverrides';
import {
  clearPersistedTextOverride,
  getAllTextOverrides,
  persistTextOverride,
  textOverrideKey,
  type TextField,
} from '../lib/textOverrides';

/**
 * Stateful interface naar localStorage voor per-scope text-overrides.
 * Initial state wordt synchronous geladen — geen flash van auto-tekst
 * tijdens hydration.
 */
export function useTextOverrides() {
  const [overrides, setOverrides] = useState<Record<string, string>>(() =>
    getAllTextOverrides()
  );

  const setFor = useCallback(
    (
      field: TextField,
      subject: OverrideSubject | null | undefined,
      role: string | null | undefined,
      value: string,
      contract?: string | null
    ) => {
      const key = textOverrideKey(field, subject, role, contract);
      persistTextOverride(key, value);
      setOverrides((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFor = useCallback(
    (
      field: TextField,
      subject: OverrideSubject | null | undefined,
      role: string | null | undefined,
      contract?: string | null
    ) => {
      const key = textOverrideKey(field, subject, role, contract);
      clearPersistedTextOverride(key);
      setOverrides((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    []
  );

  /** Exact-match lookup (geen fallback). Retourneert undefined als geen override. */
  const getFor = useCallback(
    (
      field: TextField,
      subject: OverrideSubject | null | undefined,
      role: string | null | undefined,
      contract?: string | null
    ): string | undefined => {
      return overrides[textOverrideKey(field, subject, role, contract)];
    },
    [overrides]
  );

  const refresh = useCallback(() => {
    setOverrides(getAllTextOverrides());
  }, []);

  return { overrides, getFor, setFor, resetFor, refresh };
}
