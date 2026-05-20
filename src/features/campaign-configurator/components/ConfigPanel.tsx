import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { CampaignState, Contract, Role, Vacancy } from '../types';
import { CONTRACT_LABELS, DOELGROEP_LABELS, ROLE_LABELS } from '../lib/labels';
import { filterVacancies, impliedDoelgroep, uniqueParks, uniqueRegions } from '../lib/computeCampaign';
import { getWorldForParkName } from '../lib/deriveWorld';
import { FOCUS_PARK_NAMES, isFocusPark } from '../lib/focusParks';
import { AnimatedNumber } from './AnimatedNumber';

const CONTRACTS: Contract[] = ['stage', 'bijbaan', 'vakantiebaan', 'vast'];

interface ChipProps {
  active: boolean;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

function Chip({ active, disabled = false, onClick, children }: ChipProps) {
  return (
    <motion.button
      type="button"
      className={`cc-chip ${active ? 'is-active' : ''} ${disabled ? 'is-disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.12 }}
      aria-disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

interface ConfigPanelProps {
  state: CampaignState;
  setState: (updater: (s: CampaignState) => CampaignState) => void;
  allVacancies: Vacancy[];
  filtered: Vacancy[];
}

export function ConfigPanel({ state, setState, allVacancies, filtered }: ConfigPanelProps) {
  const regionsAvailable = uniqueRegions(allVacancies);
  const [parkSearch, setParkSearch] = useState('');

  const allParkNames = useMemo(
    () => {
      // Parken uit vacatures + focus-parken (laatste altijd zichtbaar, ook
      // als ze 0 open vacatures hebben — anders zou bv. Marber Veluwe
      // ontbreken in de lijst tijdens de presentatie).
      const set = new Set<string>(
        allVacancies.map((v) => v.park).filter((p): p is string => Boolean(p))
      );
      for (const name of FOCUS_PARK_NAMES) set.add(name);
      return [...set].sort();
    },
    [allVacancies]
  );

  const parkCountByName = useMemo(() => {
    const m = new Map<string, number>();
    for (const v of allVacancies) {
      if (!v.park) continue;
      m.set(v.park, (m.get(v.park) ?? 0) + 1);
    }
    return m;
  }, [allVacancies]);

  const parkNameToRegion = useMemo(() => {
    const m = new Map<string, string>();
    for (const v of allVacancies) {
      if (v.park && v.region && !m.has(v.park)) m.set(v.park, v.region);
    }
    return m;
  }, [allVacancies]);

  const filteredParks = useMemo(() => {
    const q = parkSearch.trim().toLowerCase();
    let base = q ? allParkNames.filter((p) => p.toLowerCase().includes(q)) : allParkNames;
    // When a region is selected, only show parks in that region — but always
    // keep currently selected parks visible for context.
    if (state.regions.length > 0) {
      base = base.filter((name) => {
        if (state.parks.includes(name)) return true;
        const region = parkNameToRegion.get(name);
        return region != null && state.regions.includes(region);
      });
    }
    // When a vibe/world is selected, only show parks in that world (+ keep selected).
    if (state.worlds.length > 0) {
      base = base.filter((name) => {
        if (state.parks.includes(name)) return true;
        const w = getWorldForParkName(name, parkNameToRegion);
        return w != null && state.worlds.includes(w);
      });
    }
    // Sortering: (1) selected eerst, (2) focus-parken bovenaan (presentatie-
    // klaar, eigen beeldregie), (3) op vacature-count desc.
    return [...base].sort((a, b) => {
      const aSel = state.parks.includes(a);
      const bSel = state.parks.includes(b);
      if (aSel !== bSel) return aSel ? -1 : 1;
      const aFocus = isFocusPark(a);
      const bFocus = isFocusPark(b);
      if (aFocus !== bFocus) return aFocus ? -1 : 1;
      return (parkCountByName.get(b) ?? 0) - (parkCountByName.get(a) ?? 0);
    });
  }, [allParkNames, parkSearch, state.parks, state.regions, state.worlds, parkCountByName, parkNameToRegion]);

  const rolesAvailable: Role[] = [
    'horeca-bediening',
    'horeca-keuken',
    'front-office',
    'fun-entertainment',
    'techniek',
    'zwembad',
    'retail',
    'housekeeping',
    'parkmanagement',
    'hoofdkantoor',
  ];

  const toggleArr = <T,>(arr: T[], v: T): T[] =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  // STRUCTURAL impossibilities only — 0-vacatures is geen criteria, want een
  // vacature kan simpelweg nog niet zijn geplaatst. We disablen alleen
  // combinaties die in werkelijkheid niet kunnen voorkomen:
  //
  //   - Hoofdkantoor + een specifiek park (HQ leeft niet op parken)
  //   - Hoofdkantoor + regio buiten Noord-Holland/Overijssel (Amsterdam/Zwolle)
  //   - Park × Regio mismatch (park ligt in een andere regio dan gekozen)
  const HQ_REGIONS = new Set(['Noord-Holland', 'Overijssel']);
  const hqRoleSelected = state.roles.includes('hoofdkantoor');

  const disabledRegions = useMemo(() => {
    const out = new Set<string>();
    for (const r of regionsAvailable) {
      if (state.regions.includes(r)) continue;
      // HQ-rol + niet-HQ regio = onmogelijk
      if (hqRoleSelected && !HQ_REGIONS.has(r)) { out.add(r); continue; }
      // Toevoegen van deze regio zou een geselecteerd park buiten regio plaatsen
      if (state.parks.length > 0) {
        const conflict = state.parks.some((park) => {
          const pr = parkNameToRegion.get(park);
          return pr && pr !== r && !state.regions.includes(pr);
        });
        if (conflict) out.add(r);
      }
    }
    return out;
  }, [state, regionsAvailable, hqRoleSelected, parkNameToRegion]);

  const disabledRoles = useMemo(() => {
    const out = new Set<Role>();
    // Hoofdkantoor is onmogelijk zodra er een specifiek park of een
    // niet-HQ regio is gekozen.
    if (state.parks.length > 0 || state.regions.some((r) => !HQ_REGIONS.has(r))) {
      out.add('hoofdkantoor');
    }
    return out;
  }, [state]);

  const disabledParks = useMemo(() => {
    const out = new Set<string>();
    // Geen enkele park-keuze kan met Hoofdkantoor — disable alle park-chips.
    if (hqRoleSelected) {
      for (const p of filteredParks) if (!state.parks.includes(p)) out.add(p);
    }
    return out;
  }, [filteredParks, hqRoleSelected, state.parks]);

  return (
    <aside className="cc-panel">
      <header className="cc-panel-header">
        <p className="cc-eyebrow">Landal · Campagne Configurator</p>
        <h2 className="cc-panel-title">Bouw je wervingscampagne</h2>
      </header>

      <section className="cc-section">
        <p className="cc-section-label">Scope · regio</p>
        <div className="cc-chips">
          {regionsAvailable.map((r) => (
            <Chip
              key={r}
              active={state.regions.includes(r)}
              disabled={disabledRegions.has(r)}
              onClick={() =>
                setState((s) => {
                  const next = toggleArr(s.regions, r);
                  const adding = next.includes(r);
                  return adding
                    ? { ...s, regions: next, trim: 'regio' }
                    : { ...s, regions: next };
                })
              }
            >
              {r}
            </Chip>
          ))}
        </div>
      </section>

      <section className="cc-section">
        <p className="cc-section-label">
          Scope · park ({allParkNames.length}){' '}
          <span className="cc-section-hint">shift-klik voor meerdere</span>
        </p>
        <input
          type="text"
          className="cc-park-search"
          placeholder="Zoek park..."
          value={parkSearch}
          onChange={(e) => setParkSearch(e.target.value)}
        />
        <div className="cc-chips cc-chips--scroll">
          {filteredParks.map((p) => {
            const focus = isFocusPark(p);
            return (
              <Chip
                key={p}
                active={state.parks.includes(p)}
                disabled={disabledParks.has(p)}
                onClick={(e) =>
                  setState((s) => {
                    // Default = single-select (live-demo: snel wisselen
                    // tussen parken). Shift-click = multi-select toggle,
                    // voor wanneer je een set parken naast elkaar wil
                    // vergelijken.
                    if (e.shiftKey) {
                      const nextParks = toggleArr(s.parks, p);
                      const adding = nextParks.includes(p);
                      return adding
                        ? { ...s, parks: nextParks, trim: 'park' }
                        : { ...s, parks: nextParks };
                    }
                    // Klik op het enige geselecteerde park = deselecteren.
                    if (s.parks.length === 1 && s.parks[0] === p) {
                      return { ...s, parks: [] };
                    }
                    return { ...s, parks: [p], trim: 'park' };
                  })
                }
              >
                {focus && (
                  <span
                    className="cc-chip-focus-marker"
                    aria-label="Focus-park met eigen beeldregie"
                    title="Focus-park met eigen beeldregie"
                  >
                    ★
                  </span>
                )}
                {p}{' '}
                <span className="cc-chip-count">
                  {parkCountByName.get(p) ?? 0}
                </span>
              </Chip>
            );
          })}
          {filteredParks.length === 0 && (
            <span className="cc-empty">Geen parken gevonden</span>
          )}
        </div>
      </section>

      <section className="cc-section">
        <p className="cc-section-label">Scope · rol</p>
        <div className="cc-chips">
          {rolesAvailable.map((r) => (
            <Chip
              key={r}
              active={state.roles.includes(r)}
              disabled={disabledRoles.has(r)}
              onClick={() =>
                setState((s) => {
                  const next = toggleArr(s.roles, r);
                  const adding = next.includes(r);
                  return adding
                    ? { ...s, roles: next, trim: 'rol' }
                    : { ...s, roles: next };
                })
              }
            >
              {ROLE_LABELS[r]}
            </Chip>
          ))}
        </div>
      </section>

      <section className="cc-section">
        <p className="cc-section-label">Scope · contracttype</p>
        <div className="cc-chips">
          {CONTRACTS.map((c) => (
            <Chip
              key={c}
              active={state.contracts.includes(c)}
              onClick={() =>
                setState((s) => {
                  const next = toggleArr(s.contracts, c);
                  const adding = next.includes(c);
                  return adding
                    ? { ...s, contracts: next, trim: 'contract' }
                    : { ...s, contracts: next };
                })
              }
            >
              {CONTRACT_LABELS[c]}
            </Chip>
          ))}
        </div>
      </section>

    </aside>
  );
}
