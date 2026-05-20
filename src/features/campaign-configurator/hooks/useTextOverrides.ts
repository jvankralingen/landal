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
      value: string
    ) => {
      const key = textOverrideKey(field, subject, role);
      persistTextOverride(key, value);
      setOverrides((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetFor = useCallback(
    (
      field: TextField,
      subject: OverrideSubject | null | undefined,
      role: string | null | undefined
    ) => {
      const key = textOverrideKey(field, subject, role);
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
      role: string | null | undefined
    ): string | undefined => {
      return overrides[textOverrideKey(field, subject, role)];
    },
    [overrides]
  );

  return { overrides, getFor, setFor, resetFor };
}
