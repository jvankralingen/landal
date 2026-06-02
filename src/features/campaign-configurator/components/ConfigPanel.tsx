import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { CampaignState, Contract, Role, Vacancy } from '../types';
import { CONTRACT_LABELS, DOELGROEP_LABELS, ROLE_LABELS } from '../lib/labels';
import { filterVacancies, impliedDoelgroep, uniqueParks, uniqueRegions } from '../lib/computeCampaign';
import { getWorldForParkName } from '../lib/deriveWorld';
import { FOCUS_PARK_NAMES, isFocusPark } from '../lib/focusParks';
import {
  buildPreset,
  downloadPreset,
  parsePreset,
  presetSummary,
} from '../lib/overrideExport';
import { importPreset } from '../lib/overrideBaseline';
import { AnimatedNumber } from './AnimatedNumber';
import { LandalLogo } from './LandalLogo';
import { MediaToggleBar, type MediaKey } from './MediaToggleBar';

const CONTRACTS: Contract[] = ['stage', 'bijbaan', 'vakantiebaan', 'vast'];

function toggleArr<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

/**
 * Eenvormige selectie-logica voor alle pill-groepen:
 *  - Klik zonder shift = vervangt de selectie (single-select).
 *  - Klik op het enige geselecteerde = deselecteren.
 *  - Shift-klik = toggle dat item in/uit de bestaande set (multi-select).
 */
function applyPillClick<T extends string>(
  current: T[],
  value: T,
  shiftKey: boolean
): T[] {
  if (shiftKey) return toggleArr(current, value);
  if (current.length === 1 && current[0] === value) return [];
  return [value];
}

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

/**
 * Inklapbare scope-sectie. Header toont titel + samenvatting (bv. "1 regio
 * geselecteerd"); chevron draait bij open/dicht. Wanneer dicht is, blijft
 * de selectie zichtbaar in de header zodat de presentator overzicht houdt
 * zonder te hoeven openklappen.
 */
interface CollapsibleSectionProps {
  title: string;
  summary: string;
  hint?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function CollapsibleSection({
  title,
  summary,
  hint,
  isOpen,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <section className={`cc-section cc-section--collapsible${isOpen ? ' is-open' : ''}`}>
      <button
        type="button"
        className="cc-section-toggle"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="cc-section-toggle-title">{title}</span>
        <span className="cc-section-toggle-summary">{summary}</span>
        <span className="cc-section-toggle-chev" aria-hidden="true">▾</span>
      </button>
      {isOpen && (
        <div className="cc-section-body">
          {hint && <p className="cc-section-hint-inline">{hint}</p>}
          {children}
        </div>
      )}
    </section>
  );
}

interface ConfigPanelProps {
  state: CampaignState;
  setState: (updater: (s: CampaignState) => CampaignState) => void;
  allVacancies: Vacancy[];
  filtered: Vacancy[];
  /** Aangeroepen na het importeren van een JSON, zodat de parent z'n
   *  override-hooks kan refreshen en de preview meteen meebeweegt. */
  onPresetImported?: () => void;
  /** Presentatie-fase: 'idle' toont alleen de start-CTA; 'active' alle
   *  scope-secties (media → regio → park → rol → contract). */
  presoStage: 'idle' | 'active';
  onStartCampaign: () => void;
  /** Media-previews die in de preview-pane gerenderd worden. */
  media: Record<MediaKey, boolean>;
  onMediaToggle: (key: MediaKey) => void;
}

// Import/Export-knoppen zijn een interne tool voor het exporteren van een
// preset (JSON) naar src/features/campaign-configurator/data/ als nieuwe
// baseline. Tijdens externe presentaties (EVP-talk) verbergen we ze om
// het paneel rustig te houden. Flip terug naar true voor intern gebruik.
const SHOW_PRESET_TOOLS = false;

type SectionKey = 'regio' | 'park' | 'rol' | 'contract';

export function ConfigPanel({
  state,
  setState,
  allVacancies,
  filtered,
  onPresetImported,
  presoStage,
  onStartCampaign,
  media,
  onMediaToggle,
}: ConfigPanelProps) {
  const regionsAvailable = uniqueRegions(allVacancies);
  const [parkSearch, setParkSearch] = useState('');
  // Alle scope-secties default open zodat de presentator bij binnenkomst
  // het volledige overzicht heeft. Klap-mechanisme blijft beschikbaar om
  // tijdens de demo onderwerpen weg te halen die de aandacht afleiden.
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    regio: true,
    park: true,
    rol: true,
    contract: true,
  });
  const toggleSection = (key: SectionKey) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  const importInputRef = useRef<HTMLInputElement | null>(null);

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

  // Samenvattingen die naast de sectie-titel verschijnen wanneer de sectie
  // dicht is. "Alle X" als er niks gekozen is — anders het label van de
  // enige keuze, of "N stuks" bij multi-select. Houdt de presentator
  // overzicht op het scherm zonder open te klappen.
  const summaryRegio = state.regions.length === 0
    ? 'Alle regio’s'
    : state.regions.length === 1
      ? state.regions[0]
      : `${state.regions.length} regio’s`;
  const summaryPark = state.parks.length === 0
    ? 'Alle parken'
    : state.parks.length === 1
      ? state.parks[0]
      : `${state.parks.length} parken`;
  const summaryRol = state.roles.length === 0
    ? 'Alle rollen'
    : state.roles.length === 1
      ? (ROLE_LABELS[state.roles[0]] ?? state.roles[0])
      : `${state.roles.length} rollen`;
  const summaryContract = state.contracts.length === 0
    ? 'Alle types'
    : state.contracts.length === 1
      ? (CONTRACT_LABELS[state.contracts[0]] ?? state.contracts[0])
      : `${state.contracts.length} types`;

  const isActive = presoStage === 'active';
  return (
    <aside className={`cc-panel cc-panel--${presoStage}`}>
      <header className="cc-panel-header">
        <div className="cc-panel-header-top">
          <div className="cc-panel-brand">
            <LandalLogo height={36} />
            <h2 className="cc-panel-title">Campagne configurator</h2>
          </div>
          {SHOW_PRESET_TOOLS && (
            <div className="cc-panel-actions">
              <button
                type="button"
                className="cc-panel-export"
                onClick={() => importInputRef.current?.click()}
                title="Laad een eerder geëxporteerd preset (JSON-bestand) — overschrijft je huidige overrides."
              >
                ↑ Import
              </button>
              <button
                type="button"
                className="cc-panel-export"
                onClick={async () => {
                  const preset = await buildPreset();
                  const summary = presetSummary(preset);
                  if (
                    Object.keys(preset.images).length === 0 &&
                    Object.keys(preset.texts).length === 0
                  ) {
                    alert(
                      'Nog niks aangepast om te exporteren. Upload beelden of bewerk teksten eerst.'
                    );
                    return;
                  }
                  downloadPreset(preset);
                  // eslint-disable-next-line no-console
                  console.log('[preset] geëxporteerd —', summary);
                }}
                title="Download alle aanpassingen als presetOverrides.json. Drop dat bestand in src/features/campaign-configurator/data/ en push → permanent voor iedereen."
              >
                ↓ Export
              </button>
              <input
                ref={importInputRef}
                type="file"
                accept="application/json,.json"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  e.target.value = '';
                  if (!file) return;
                  const text = await file.text();
                  const preset = parsePreset(text);
                  if (!preset) {
                    alert('Dit lijkt geen geldig preset-bestand. Controleer of het door de configurator geëxporteerd is.');
                    return;
                  }
                  const ok = window.confirm(
                    `Preset uit ${file.name} laden? Dit overschrijft de huidige overrides in deze browser.\n\nInhoud: ${presetSummary(preset)}`
                  );
                  if (!ok) return;
                  await importPreset(preset);
                  onPresetImported?.();
                }}
              />
            </div>
          )}
        </div>
      </header>

      {!isActive && (
        <div className="cc-panel-start">
          <p className="cc-panel-start-lead">
            Bouw een campagne op die zich aanpast aan park, regio, rol en
            contracttype. Eén control, alle media tegelijk.
          </p>
          <button
            type="button"
            className="cc-panel-start-cta"
            onClick={onStartCampaign}
          >
            Start nieuwe campagne →
          </button>
        </div>
      )}

      {isActive && (
        <>
          <section className="cc-section cc-section-media">
            <p className="cc-section-label">Media</p>
            <MediaToggleBar enabled={media} onToggle={onMediaToggle} variant="panel" />
          </section>

          <CollapsibleSection
            title="Regio"
            summary={summaryRegio}
            hint="Shift-klik voor meerdere"
            isOpen={openSections.regio}
            onToggle={() => toggleSection('regio')}
          >
            <div className="cc-chips">
              {regionsAvailable.map((r) => (
                <Chip
                  key={r}
                  active={state.regions.includes(r)}
                  disabled={disabledRegions.has(r)}
                  onClick={(e) =>
                    setState((s) => {
                      const next = applyPillClick(s.regions, r, e.shiftKey);
                      return next.length > 0
                        ? { ...s, regions: next, trim: 'regio' }
                        : { ...s, regions: next };
                    })
                  }
                >
                  {r}
                </Chip>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Park"
            summary={summaryPark}
            hint={`Shift-klik voor meerdere · ${allParkNames.length} parken`}
            isOpen={openSections.park}
            onToggle={() => toggleSection('park')}
          >
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
                        const next = applyPillClick(s.parks, p, e.shiftKey);
                        return next.length > 0
                          ? { ...s, parks: next, trim: 'park' }
                          : { ...s, parks: next };
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
          </CollapsibleSection>

          <CollapsibleSection
            title="Rol"
            summary={summaryRol}
            hint="Shift-klik voor meerdere"
            isOpen={openSections.rol}
            onToggle={() => toggleSection('rol')}
          >
            <div className="cc-chips">
              {rolesAvailable.map((r) => (
                <Chip
                  key={r}
                  active={state.roles.includes(r)}
                  disabled={disabledRoles.has(r)}
                  onClick={(e) =>
                    setState((s) => {
                      const next = applyPillClick(s.roles, r, e.shiftKey);
                      return next.length > 0
                        ? { ...s, roles: next, trim: 'rol' }
                        : { ...s, roles: next };
                    })
                  }
                >
                  {ROLE_LABELS[r]}
                </Chip>
              ))}
            </div>
          </CollapsibleSection>

          <CollapsibleSection
            title="Contracttype"
            summary={summaryContract}
            hint="Shift-klik voor meerdere"
            isOpen={openSections.contract}
            onToggle={() => toggleSection('contract')}
          >
            <div className="cc-chips">
              {CONTRACTS.map((c) => (
                <Chip
                  key={c}
                  active={state.contracts.includes(c)}
                  onClick={(e) =>
                    setState((s) => {
                      const next = applyPillClick(s.contracts, c, e.shiftKey);
                      return next.length > 0
                        ? { ...s, contracts: next, trim: 'contract' }
                        : { ...s, contracts: next };
                    })
                  }
                >
                  {CONTRACT_LABELS[c]}
                </Chip>
              ))}
            </div>
          </CollapsibleSection>
        </>
      )}

    </aside>
  );
}
