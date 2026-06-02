import { useCallback, useEffect, useMemo, useState } from 'react';
import { ConfigPanel } from './components/ConfigPanel';
import { MobilePreview } from './components/MobilePreview';
import { AnimatedNumber } from './components/AnimatedNumber';
import { SocialPack } from './components/SocialPack';
import { PrintPreview } from './components/PrintPreview';
import type { MediaKey } from './components/MediaToggleBar';
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
import { useTextOverrides } from './hooks/useTextOverrides';
import type { BentoSlot, OverrideSubject } from './lib/imageOverrides';
import type { TextField } from './lib/textOverrides';
import { applyBaselineIfNeeded } from './lib/overrideBaseline';
import './configurator.css';

const allVacancies = (vacanciesData as { vacancies: Vacancy[] }).vacancies;

const INITIAL_STATE: CampaignState = {
  trim: 'eb',
  regions: [],
  roles: [],
  contracts: [],
  parks: [],
  worlds: [],
  doelgroep: 'iedereen',
  energie: 50,
  premium: 50,
  heroOverride: null,
  subOverride: null,
};

/**
 * Presentatie-staging. Twee fases:
 *  - idle   → groot startscherm met één knop. Geen ruis na de EVP-talk.
 *  - active → ConfigPanel + consequences + previews verschijnen tegelijk.
 *             Eén instelling raakt meteen alle previews — dat geeft het
 *             overzicht waarvoor het ConfigPanel direct zichtbaar moet zijn.
 */
type PresoStage = 'idle' | 'active';

const INITIAL_MEDIA: Record<MediaKey, boolean> = {
  mobile: true,
  social: false,
  print: false,
};

export default function ConfiguratorApp() {
  const [state, setState] = useState<CampaignState>(INITIAL_STATE);
  const [presoStage, setPresoStage] = useState<PresoStage>('idle');
  const [media, setMedia] = useState<Record<MediaKey, boolean>>(INITIAL_MEDIA);
  const toggleMedia = useCallback((key: MediaKey) => {
    setMedia((m) => ({ ...m, [key]: !m[key] }));
  }, []);

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
  const autoHeadline = useMemo(() => deriveHeadline(effectiveState, filtered), [effectiveState, filtered]);
  const autoSubtitle = useMemo(() => deriveSubtitle(effectiveState, filtered), [effectiveState, filtered]);
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
  const autoVibeCopy = useMemo(() => deriveVibeCopy(effectiveState, filtered, worldId, doelgroep), [effectiveState, filtered, worldId, doelgroep]);
  const selectedParkRefs = useMemo(
    () =>
      state.parks
        .map((name) => ({ name, id: parkNameToId.get(name) }))
        .filter((r): r is { name: string; id: string } => Boolean(r.id)),
    [state.parks, parkNameToId]
  );
  // Regio-only filter — gebruikt om de supporting-tiles in regio-trim te
  // vullen, los van rol/contract zodat een smal rol-filter de regio-
  // context niet wegslaat.
  const regionOnlyFiltered = useMemo(
    () =>
      effectiveTrim === 'regio'
        ? filterVacancies(allVacancies, { ...INITIAL_STATE, regions: state.regions })
        : undefined,
    [effectiveTrim, state.regions]
  );
  const baseBento = useMemo(
    () =>
      buildBento(
        filtered,
        state.roles,
        worldId,
        effectiveTrim,
        selectedParkRefs,
        state.contracts,
        regionOnlyFiltered
      ),
    [
      filtered,
      state.roles,
      state.contracts,
      worldId,
      effectiveTrim,
      selectedParkRefs,
      regionOnlyFiltered,
    ]
  );

  // Per-tile image overrides (IndexedDB). Twee onafhankelijke assen:
  // subject (park/regio) en rol. Slot-regels:
  //  - primary: subject+rol > rol-only > subject-only > default
  //  - andere slots: alleen subject-only (geen rol-axis)
  const { uploadFor, resetFor, overrideFor, refresh: refreshImages } = useImageOverrides();
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
  // De contract-axis: idem, alleen bij precies één contracttype. Maakt
  // "alleen stage" een distinct key van "geen selectie".
  const overrideContract: string | null =
    state.contracts.length === 1 ? state.contracts[0] : null;
  // Upload-zone is altijd actief — ook in default-state (geen selectie)
  // kunnen initiële beelden worden ingesteld. Exact-match-keys regelen dat
  // het alleen voor die selectie geldt.
  const overridesAvailable = true;

  const slotOverrides = useMemo(() => {
    // Geen guard — alle axis-combinaties zijn geldige primary keys
    // (subject, rol, contract — elk los of in combinatie).
    return {
      primary: overrideFor(overrideSubject, overrideRole, 'primary', overrideContract),
      secondary: overrideFor(overrideSubject, overrideRole, 'secondary'),
      tertiary: overrideFor(overrideSubject, overrideRole, 'tertiary'),
      accent: overrideFor(overrideSubject, overrideRole, 'accent'),
    };
  }, [overrideSubject, overrideRole, overrideContract, overrideFor]);

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

  // Per-scope text-overrides. Headline/subtitle/vibe kunnen per (subject, rol)
  // worden overschreven; exact-match — andere selectie laat de auto-tekst zien.
  const {
    getFor: getTextFor,
    setFor: setTextFor,
    resetFor: resetTextFor,
    refresh: refreshTexts,
  } = useTextOverrides();

  // Baseline-loader: een ge-committeerd preset in data/presetOverrides.json
  // wordt eenmalig per versie naar de stores gemerged. Daarna refreshen we
  // beide hooks zodat de baseline meteen zichtbaar is zonder F5.
  useEffect(() => {
    void applyBaselineIfNeeded().then(() => {
      refreshTexts();
      void refreshImages();
    });
  }, [refreshTexts, refreshImages]);
  const headlineOverride = getTextFor('headline', overrideSubject, overrideRole, overrideContract);
  const subtitleOverride = getTextFor('subtitle', overrideSubject, overrideRole, overrideContract);
  const vibeOverride = getTextFor('vibe', overrideSubject, overrideRole, overrideContract);
  const headline = headlineOverride ?? autoHeadline;
  const subtitle = subtitleOverride ?? autoSubtitle;
  const vibeCopy = vibeOverride ?? autoVibeCopy;
  const textHasOverride = {
    headline: headlineOverride !== undefined,
    subtitle: subtitleOverride !== undefined,
    vibe: vibeOverride !== undefined,
  };
  const handleTextSave = useCallback(
    (field: TextField, value: string) => {
      setTextFor(field, overrideSubject, overrideRole, value, overrideContract);
    },
    [setTextFor, overrideSubject, overrideRole, overrideContract]
  );
  const handleTextReset = useCallback(
    (field: TextField) => {
      resetTextFor(field, overrideSubject, overrideRole, overrideContract);
    },
    [resetTextFor, overrideSubject, overrideRole, overrideContract]
  );

  // Upload/reset op de exact-matching key voor de huidige selectie.
  // Ook bij volledig lege selectie (subject én rol null) is uploaden
  // toegestaan — dat zet de "initiële" baseline-afbeeldingen.
  // Non-primary slots negeren altijd de rol-axis (zie overrideKey).
  const handleSlotUpload = useCallback(
    (slot: BentoSlot, file: File) => {
      const roleForKey = slot === 'primary' ? overrideRole : null;
      const contractForKey = slot === 'primary' ? overrideContract : null;
      void uploadFor(overrideSubject, roleForKey, slot, file, contractForKey);
    },
    [uploadFor, overrideSubject, overrideRole, overrideContract]
  );
  const handleSlotReset = useCallback(
    (slot: BentoSlot) => {
      const roleForKey = slot === 'primary' ? overrideRole : null;
      const contractForKey = slot === 'primary' ? overrideContract : null;
      void resetFor(overrideSubject, roleForKey, slot, contractForKey);
    },
    [resetFor, overrideSubject, overrideRole, overrideContract]
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
  const autoPerks = useMemo(() => {
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

  // Perks-override per scope: opgeslagen als JSON-string in dezelfde
  // text-overrides store. Parse hier, save met JSON.stringify.
  const perksOverrideRaw = getTextFor('perks', overrideSubject, overrideRole, overrideContract);
  const perksOverride = useMemo<string[] | null>(() => {
    if (!perksOverrideRaw) return null;
    try {
      const parsed = JSON.parse(perksOverrideRaw);
      return Array.isArray(parsed) ? (parsed as string[]) : null;
    } catch {
      return null;
    }
  }, [perksOverrideRaw]);
  const perks = perksOverride ?? autoPerks;
  const handlePerksChange = useCallback(
    (next: string[]) => {
      setTextFor('perks', overrideSubject, overrideRole, JSON.stringify(next), overrideContract);
    },
    [setTextFor, overrideSubject, overrideRole, overrideContract]
  );
  const handlePerksReset = useCallback(() => {
    resetTextFor('perks', overrideSubject, overrideRole, overrideContract);
  }, [resetTextFor, overrideSubject, overrideRole, overrideContract]);

  const parkPerksLabel = state.parks.length === 1 ? `op Landal ${state.parks[0]}` : null;

  // Beeldcuratie-samenvatting: wat zit er in de bento, in één leesbare regel.
  // We groeperen per kind (role / park / vibe) en zetten aantal + onderwerpen
  // achter elkaar. Bij single-park-trim worden de tile-labels door buildBento
  // bewust onderdrukt; dan vallen we terug op de gekozen park-naam zodat het
  // niet leeg of cryptisch wordt.
  const beeldkeuze = useMemo(() => {
    const tiles = [bento.primary, bento.secondary, bento.tertiary, bento.accent]
      .filter((t) => t.src);
    const roleTiles = tiles.filter((t) => t.kind === 'role');
    const parkTiles = tiles.filter((t) => t.kind === 'park');
    const vibeTiles = tiles.filter((t) => t.kind === 'vibe');

    const uniqueLabels = (ts: typeof tiles): string[] => {
      const seen = new Set<string>();
      const out: string[] = [];
      for (const t of ts) {
        const label = t.label?.trim();
        if (!label) continue;
        if (seen.has(label)) continue;
        seen.add(label);
        out.push(label);
      }
      return out;
    };

    const summarize = (
      n: number,
      noun: { singular: string; plural: string },
      labels: string[],
      fallback?: string
    ): string => {
      const head = `${n} ${n === 1 ? noun.singular : noun.plural}`;
      if (labels.length > 0) {
        const list =
          labels.length <= 3
            ? labels.join(', ')
            : `${labels.slice(0, 2).join(', ')} +${labels.length - 2}`;
        return `${head} (${list})`;
      }
      if (fallback) return `${head} van ${fallback}`;
      return head;
    };

    const parts: string[] = [];
    if (roleTiles.length > 0) {
      parts.push(
        summarize(
          roleTiles.length,
          { singular: 'rol-foto', plural: 'rol-foto’s' },
          uniqueLabels(roleTiles)
        )
      );
    }
    if (parkTiles.length > 0) {
      const parkLabels = uniqueLabels(parkTiles);
      // Single-park: labels onderdrukt in de bento → pak de naam uit state.
      const singleParkFallback =
        parkLabels.length === 0 && state.parks.length === 1
          ? state.parks[0]
          : undefined;
      parts.push(
        summarize(
          parkTiles.length,
          { singular: 'park-shot', plural: 'park-shots' },
          parkLabels,
          singleParkFallback
        )
      );
    }
    if (vibeTiles.length > 0 && parts.length === 0) {
      // Vibe-tiles tellen alleen als er niets anders is — anders zijn ze
      // visuele filler en hoeven ze niet in de tekst.
      parts.push(`${vibeTiles.length} vibe-shot${vibeTiles.length === 1 ? '' : 's'}`);
    }
    return parts.join(' + ');
  }, [bento, state.parks]);

  const pickPark = (parkName: string) => {
    setState((s) =>
      s.parks.includes(parkName) ? s : { ...s, parks: [...s.parks, parkName], trim: 'park' }
    );
  };

  // Stage-gating. ConfigPanel staat altijd links — die geeft het overzicht
  // van wat je kunt instellen. In 'idle' is rechts alleen het start-overlay
  // zichtbaar; bij 'active' bouwt de preview-kant op (mobile-preview eerst,
  // dan media-toggles, optioneel social/print).
  const isActive = presoStage === 'active';
  const showConsequences = isActive;
  const showPreviews = isActive;

  return (
    <div className={`cc-root cc-stage-${presoStage}`}>
      <ConfigPanel
        state={state}
        setState={setState}
        allVacancies={allVacancies}
        filtered={filtered}
        onPresetImported={() => {
          refreshTexts();
          void refreshImages();
        }}
        presoStage={presoStage}
        onStartCampaign={() => setPresoStage('active')}
        media={media}
        onMediaToggle={toggleMedia}
      />
      <main className="cc-stage" data-world={worldId}>
        {presoStage === 'idle' && (
          <div className="cc-stage-empty" aria-hidden="true">
            <p className="cc-stage-empty-text">
              Start een campagne om de preview te zien.
            </p>
          </div>
        )}

        {showConsequences && (
          <section
            className="cc-narrator"
            style={{ borderTopColor: world.palette.accent }}
            aria-label="Informatie achter de campagne"
          >
            <p
              className="cc-narrator-headline"
              style={{ color: world.palette.accent }}
            >
              {headline}
            </p>

            <div className="cc-narrator-bar">
              <div className="cc-narrator-block">
                <span className="cc-narrator-block-label">Vibe</span>
                <span className="cc-narrator-block-value">
                  <span
                    className="cc-narrator-dot"
                    style={{ background: world.palette.accent }}
                    aria-hidden="true"
                  />
                  {world.label}
                </span>
              </div>

              <div className="cc-narrator-block">
                <span className="cc-narrator-block-label">Scope</span>
                <span className="cc-narrator-block-value cc-narrator-block-value--num">
                  <b><AnimatedNumber value={filtered.length} /></b>
                  <span className="cc-narrator-unit">{plural.vacature(filtered.length)}</span>
                  <span className="cc-narrator-mini-sep">·</span>
                  <b><AnimatedNumber value={uniqueParks(filtered).length} /></b>
                  <span className="cc-narrator-unit">{plural.park(uniqueParks(filtered).length)}</span>
                  <span className="cc-narrator-mini-sep">·</span>
                  <b><AnimatedNumber value={uniqueRegions(filtered).length} /></b>
                  <span className="cc-narrator-unit">{plural.regio(uniqueRegions(filtered).length)}</span>
                </span>
              </div>

              <div className="cc-narrator-block">
                <span className="cc-narrator-block-label">Doelgroep</span>
                <span className="cc-narrator-block-value">{DOELGROEP_LABELS[doelgroep]}</span>
              </div>

              <div className="cc-narrator-block">
                <span className="cc-narrator-block-label">Layout</span>
                <span className="cc-narrator-block-value">{TRIM_LABELS[effectiveTrim]}</span>
              </div>

              {beeldkeuze && (
                <div className="cc-narrator-block cc-narrator-block--wide">
                  <span className="cc-narrator-block-label">Beeldcuratie</span>
                  <span className="cc-narrator-block-value">{beeldkeuze}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {showPreviews && (
          <>
            <div className="cc-stage-frame">
              {media.mobile && (
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
                    uploadSubjectAvailable
                    // ↑ true → alle 4 tiles uploadable, ook bij geen selectie
                    slotHasOverride={slotHasOverride}
                    onSlotUpload={handleSlotUpload}
                    onSlotReset={handleSlotReset}
                    textHasOverride={textHasOverride}
                    onTextSave={handleTextSave}
                    onTextReset={handleTextReset}
                    perksHasOverride={perksOverride !== null}
                    onPerksChange={handlePerksChange}
                    onPerksReset={handlePerksReset}
                  />
                  <p className="cc-disclaimer">Conceptweergave · niet voor publicatie</p>
                </div>
              )}
              {media.social && (
                <SocialPack
                  headline={headline}
                  cta={`${filtered.length} ${plural.vacature(filtered.length)} →`}
                  worldId={worldId}
                  bento={bento}
                  doelgroep={doelgroep}
                />
              )}
              {media.print && (
                <PrintPreview
                  headline={headline}
                  subtitle={subtitle}
                  vibeCopy={vibeCopy}
                  perks={perks}
                  worldId={worldId}
                  bento={bento}
                />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
