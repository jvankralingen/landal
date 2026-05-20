import { useCallback, useMemo, useState } from 'react';
import { ConfigPanel } from './components/ConfigPanel';
import { MobilePreview } from './components/MobilePreview';
import { AnimatedNumber } from './components/AnimatedNumber';
import { SocialPack } from './components/SocialPack';
import { buildBento } from './lib/buildHeroCollage';
import { parkGalleryImages, getGalleryImageUrl } from '../../data/parkImageUrls';
import { parkDatabase } from '../../data/parkData';
import vacanciesData from './data/vacancies.json';
import type { CampaignState, Vacancy } from './types';
import { deriveHeadline, deriveSubtitle, deriveTone, deriveVibeCopy, filterVacancies, getParkPerks, impliedDoelgroep, LANDAL_PERKS, plural, uniqueParks, uniqueRegions } from './lib/computeCampaign';
import { DOELGROEP_LABELS, TRIM_LABELS } from './lib/labels';
import { deriveWorld } from './lib/deriveWorld';
import { WORLDS } from './lib/worlds';
import { useImageOverrides } from './hooks/useImageOverrides';
import type { BentoSlot, OverrideSubject } from './lib/imageOverrides';
import './configurator.css';

const allVacancies = (vacanciesData as { vacancies: Vacancy[] }).vacancies;

const INITIAL_STATE: CampaignState = {
  trim: 'eb',
  regions: [],
  roles: [],
  contracts: [],
  parks: [],
  worlds: [],
  doelgroep: 'studenten',
  energie: 50,
  premium: 50,
  heroOverride: null,
  subOverride: null,
};

export default function ConfiguratorApp() {
  const [state, setState] = useState<CampaignState>(INITIAL_STATE);

  // Derive layout trim from scope priority: park > regio > rol > contract > eb.
  // The most-specific dimension that is non-empty wins. Keeps the bento layout
  // stable regardless of chip-click order (a role-click after a park-click no
  // longer demotes the park-layout).
  const effectiveTrim: typeof state.trim = useMemo(() => {
    if (state.parks.length > 0) return 'park';
    if (state.regions.length > 0) return 'regio';
    if (state.roles.length > 0) return 'rol';
    if (state.contracts.length > 0) return 'contract';
    return 'eb';
  }, [state.parks, state.regions, state.roles, state.contracts]);
  const effectiveState = useMemo(() => ({ ...state, trim: effectiveTrim }), [state, effectiveTrim]);

  const filtered = useMemo(() => filterVacancies(allVacancies, effectiveState), [effectiveState]);
  const headline = useMemo(() => deriveHeadline(effectiveState, filtered), [effectiveState, filtered]);
  const subtitle = useMemo(() => deriveSubtitle(effectiveState, filtered), [effectiveState, filtered]);
  const tone = useMemo(() => deriveTone(effectiveState), [effectiveState]);
  const parkNameToId = useMemo(() => {
    const m = new Map<string, string>();
    // Bron-of-truth: parkDatabase. Bevat ook parken met 0 open vacatures
    // (bv. Marber Veluwe, Dachstein) zodat focus-parken altijd mapbaar zijn.
    for (const country of Object.values(parkDatabase)) {
      for (const region of Object.values((country as { regions: Record<string, { parks: { id: string; name: string }[] }> }).regions)) {
        for (const p of region.parks) {
          if (!m.has(p.name)) m.set(p.name, p.id);
        }
      }
    }
    // Vacancies-based names die ergens afwijken kunnen we hier nog overrulen.
    for (const v of allVacancies) {
      if (v.park && v.parkId && !m.has(v.park)) m.set(v.park, v.parkId);
    }
    return m;
  }, []);
  const parkNameToRegion = useMemo(() => {
    // First (most common) region per park-name across all vacancies. Used by
    // deriveWorld so a selected park's world stays correct even when filtered
    // vacancies have inconsistent / wrong region tags in the JobPosting data.
    const tally = new Map<string, Map<string, number>>();
    for (const v of allVacancies) {
      if (!v.park || !v.region) continue;
      let inner = tally.get(v.park);
      if (!inner) { inner = new Map(); tally.set(v.park, inner); }
      inner.set(v.region, (inner.get(v.region) ?? 0) + 1);
    }
    const out = new Map<string, string>();
    for (const [park, inner] of tally) {
      let best: string | null = null;
      let bestN = 0;
      for (const [region, n] of inner) {
        if (n > bestN) { bestN = n; best = region; }
      }
      if (best) out.set(park, best);
    }
    return out;
  }, []);
  const worldId = useMemo(() => {
    // Explicit world-pick wins over derivation.
    if (state.worlds.length >= 1) return state.worlds[0] as keyof typeof WORLDS;
    return deriveWorld(filtered, effectiveState, parkNameToRegion);
  }, [filtered, effectiveState, parkNameToRegion]);
  const world = WORLDS[worldId];
  const doelgroep = useMemo(() => impliedDoelgroep(effectiveState), [effectiveState]);
  const vibeCopy = useMemo(() => deriveVibeCopy(effectiveState, filtered, worldId, doelgroep), [effectiveState, filtered, worldId, doelgroep]);
  const selectedParkRefs = useMemo(
    () =>
      state.parks
        .map((name) => ({ name, id: parkNameToId.get(name) }))
        .filter((r): r is { name: string; id: string } => Boolean(r.id)),
    [state.parks, parkNameToId]
  );
  const baseBento = useMemo(
    () =>
      buildBento(
        filtered,
        state.roles,
        worldId,
        effectiveTrim,
        selectedParkRefs,
        state.contracts
      ),
    [
      filtered,
      state.roles,
      state.contracts,
      worldId,
      effectiveTrim,
      selectedParkRefs,
    ]
  );

  // Per-tile image overrides (IndexedDB). Twee onafhankelijke assen:
  // subject (park/regio) en rol. Slot-regels:
  //  - primary: subject+rol > rol-only > subject-only > default
  //  - andere slots: alleen subject-only (geen rol-axis)
  const { uploadFor, resetFor, overrideFor } = useImageOverrides();
  const overrideSubject: OverrideSubject | null = useMemo(() => {
    if (state.parks.length === 1 && selectedParkRefs[0]?.id) {
      return { type: 'park', id: selectedParkRefs[0].id };
    }
    if (state.regions.length === 1) {
      return { type: 'region', id: state.regions[0] };
    }
    return null;
  }, [state.parks.length, state.regions, selectedParkRefs]);
  // De rol-axis voor de override: alleen als precies één rol gekozen is.
  const overrideRole: string | null =
    state.roles.length === 1 ? state.roles[0] : null;
  // Upload-zone is actief wanneer minimaal één axis ingevuld is. Voor
  // non-primary slots geldt extra dat subject set moet zijn (zie HeroCollage).
  const overridesAvailable = overrideSubject != null || overrideRole != null;

  const slotOverrides = useMemo(() => {
    // Geen guard op subject — rol-only is ook een geldige primary-override.
    return {
      primary: overrideFor(overrideSubject, overrideRole, 'primary'),
      secondary: overrideFor(overrideSubject, overrideRole, 'secondary'),
      tertiary: overrideFor(overrideSubject, overrideRole, 'tertiary'),
      accent: overrideFor(overrideSubject, overrideRole, 'accent'),
    };
  }, [overrideSubject, overrideRole, overrideFor]);

  const slotHasOverride = useMemo(() => {
    if (!slotOverrides) return undefined;
    return {
      primary: Boolean(slotOverrides.primary),
      secondary: Boolean(slotOverrides.secondary),
      tertiary: Boolean(slotOverrides.tertiary),
      accent: Boolean(slotOverrides.accent),
    };
  }, [slotOverrides]);

  // (Niveau-track is overbodig nu we exact-match doen: de huidige scope
  // is automatisch de juiste key voor zowel upload als reset.)

  const bento = useMemo(() => {
    if (!slotOverrides) return baseBento;
    return {
      ...baseBento,
      primary: slotOverrides.primary
        ? { ...baseBento.primary, src: slotOverrides.primary.dataUrl }
        : baseBento.primary,
      secondary: slotOverrides.secondary
        ? { ...baseBento.secondary, src: slotOverrides.secondary.dataUrl }
        : baseBento.secondary,
      tertiary: slotOverrides.tertiary
        ? { ...baseBento.tertiary, src: slotOverrides.tertiary.dataUrl }
        : baseBento.tertiary,
      accent: slotOverrides.accent
        ? { ...baseBento.accent, src: slotOverrides.accent.dataUrl }
        : baseBento.accent,
    };
  }, [baseBento, slotOverrides]);

  // Upload/reset op de exact-matching key voor de huidige selectie.
  // Primary mag (subject, rol) of (subject) of (rol) zijn — minstens één
  // axis moet gezet zijn. Non-primary vereist subject (rol wordt
  // automatisch genegeerd door overrideKey).
  const handleSlotUpload = useCallback(
    (slot: BentoSlot, file: File) => {
      if (slot === 'primary') {
        if (!overrideSubject && !overrideRole) return;
        void uploadFor(overrideSubject, overrideRole, slot, file);
        return;
      }
      if (!overrideSubject) return;
      void uploadFor(overrideSubject, null, slot, file);
    },
    [uploadFor, overrideSubject, overrideRole]
  );
  const handleSlotReset = useCallback(
    (slot: BentoSlot) => {
      if (slot === 'primary') {
        if (!overrideSubject && !overrideRole) return;
        void resetFor(overrideSubject, overrideRole, slot);
        return;
      }
      if (!overrideSubject) return;
      void resetFor(overrideSubject, null, slot);
    },
    [resetFor, overrideSubject, overrideRole]
  );

  // Park-cards on the landing — visible when scope is regio/vibe-based and no
  // specific park is yet picked. Helps the visitor pick from the relevant set.
  const parksInScope = useMemo(() => {
    if (state.parks.length > 0) return [];
    if (state.regions.length === 0 && state.worlds.length === 0) return [];
    const tally = new Map<string, { name: string; parkId: string; region: string; count: number }>();
    for (const v of filtered) {
      if (!v.park) continue;
      const e = tally.get(v.park);
      if (e) e.count++;
      else tally.set(v.park, { name: v.park, parkId: v.parkId ?? '', region: v.region ?? '', count: 1 });
    }
    return [...tally.values()]
      .sort((a, b) => b.count - a.count)
      .map((p) => {
        const gallery = p.parkId ? parkGalleryImages[p.parkId] ?? [] : [];
        const imageUrl = gallery[0] ? getGalleryImageUrl(gallery[0], '3x2', 600) : null;
        return { ...p, imageUrl };
      });
  }, [filtered, state.parks, state.regions, state.worlds]);

  const regionLabel = useMemo(() => {
    if (state.regions.length === 1) return state.regions[0];
    if (state.regions.length > 1) return `${state.regions.length} regio's`;
    if (state.worlds.length === 1) return WORLDS[state.worlds[0] as keyof typeof WORLDS]?.label ?? null;
    return null;
  }, [state.regions, state.worlds]);

  // "Wat krijg je" — park-specifieke perks vooraan, aangevuld met Landal-brede.
  const perks = useMemo(() => {
    const parkPerks = state.parks.length === 1 ? getParkPerks(state.parks[0]) : [];
    const combined = [...parkPerks, ...LANDAL_PERKS];
    // Dedup en max 6 tonen.
    const seen = new Set<string>();
    return combined.filter((p) => {
      if (seen.has(p)) return false;
      seen.add(p);
      return true;
    }).slice(0, 6);
  }, [state.parks]);

  const parkPerksLabel = state.parks.length === 1 ? `op Landal ${state.parks[0]}` : null;

  // Beeldkeuze-samenvatting: welke foto's draaien in de bento, groepeerd op label.
  const beeldkeuze = useMemo(() => {
    const counts = new Map<string, number>();
    for (const t of [bento.primary, bento.secondary, bento.tertiary, bento.accent]) {
      if (!t.src) continue; // skip placeholder tiles
      counts.set(t.label, (counts.get(t.label) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([label, n]) => (n > 1 ? `${n}× ${label}` : label))
      .join(' · ');
  }, [bento]);

  const pickPark = (parkName: string) => {
    setState((s) =>
      s.parks.includes(parkName) ? s : { ...s, parks: [...s.parks, parkName], trim: 'park' }
    );
  };

  return (
    <div className="cc-root">
      <ConfigPanel state={state} setState={setState} allVacancies={allVacancies} filtered={filtered} />
      <main className="cc-stage" data-world={worldId}>
        <header className="cc-stage-header">
          <p className="cc-eyebrow">Live preview</p>
          <div className="cc-world-badge">
            <span className="cc-world-dot" style={{ background: world.palette.accent }} />
            <span className="cc-world-name">Vibe · {world.label}</span>
            <span className="cc-world-tag">{world.tagline}</span>
          </div>
          <p className="cc-stage-meta"><AnimatedNumber value={filtered.length} /> {plural.vacature(filtered.length)} in scope</p>
        </header>

        <div className="cc-consequences">
          <div className="cc-consequence">
            <span className="cc-consequence-label">Headline</span>
            <span className="cc-consequence-value">"{headline}"</span>
          </div>
          <div className="cc-consequence">
            <span className="cc-consequence-label">Layout</span>
            <span className="cc-consequence-value">{TRIM_LABELS[effectiveTrim]}</span>
          </div>
          <div className="cc-consequence">
            <span className="cc-consequence-label">Doelgroep (afgeleid)</span>
            <span className="cc-consequence-value">{DOELGROEP_LABELS[doelgroep]}</span>
          </div>
          <div className="cc-consequence">
            <span className="cc-consequence-label">Vibe</span>
            <span className="cc-consequence-value">{world.label} · {world.tagline}</span>
          </div>
          {beeldkeuze && (
            <div className="cc-consequence">
              <span className="cc-consequence-label">Beeldkeuze</span>
              <span className="cc-consequence-value">{beeldkeuze}</span>
            </div>
          )}
          <div className="cc-consequence">
            <span className="cc-consequence-label">Scope</span>
            <span className="cc-consequence-value">
              <AnimatedNumber value={filtered.length} /> {plural.vacature(filtered.length)} · <AnimatedNumber value={uniqueParks(filtered).length} /> {plural.park(uniqueParks(filtered).length)} · <AnimatedNumber value={uniqueRegions(filtered).length} /> {plural.regio(uniqueRegions(filtered).length)}
            </span>
          </div>
        </div>
        <div className="cc-stage-frame">
          <div className="cc-mobile-wrap">
            <p className="cc-socials-label">Landingspagina</p>
            <MobilePreview
              headline={headline}
              subtitle={subtitle}
              vibeCopy={vibeCopy}
              vacancies={filtered}
              toneLabel={tone}
              worldId={worldId}
              bento={bento}
              parksInScope={parksInScope}
              regionLabel={regionLabel}
              onPickPark={pickPark}
              perks={perks}
              parkPerksLabel={parkPerksLabel}
              showVacancyList={effectiveTrim !== 'eb'}
              uploadEnabled={overridesAvailable}
              uploadSubjectAvailable={overrideSubject != null}
              slotHasOverride={slotHasOverride}
              onSlotUpload={handleSlotUpload}
              onSlotReset={handleSlotReset}
            />
            <p className="cc-disclaimer">Conceptweergave · niet voor publicatie</p>
          </div>
          <SocialPack
            headline={headline}
            cta={`${filtered.length} ${plural.vacature(filtered.length)} →`}
            worldId={worldId}
            bento={bento}
            doelgroep={doelgroep}
          />
        </div>
      </main>
    </div>
  );
}
