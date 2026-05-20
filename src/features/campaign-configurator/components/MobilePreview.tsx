import { AnimatePresence, motion } from 'framer-motion';
import type { Vacancy } from '../types';
import { AnimatedNumber } from './AnimatedNumber';
import { WORLDS, type WorldId } from '../lib/worlds';
import type { Bento } from '../lib/buildHeroCollage';
import type { BentoSlot } from '../lib/imageOverrides';
import type { TextField } from '../lib/textOverrides';
import { HeroCollage } from './HeroCollage';
import { LandalLogo } from './LandalLogo';
import { EditableText } from './EditableText';

interface ParkRef {
  name: string;
  parkId: string;
  region: string;
  count: number;
  imageUrl: string | null;
}

interface MobilePreviewProps {
  headline: string;
  subtitle: string;
  vibeCopy: string;
  vacancies: Vacancy[];
  toneLabel: string;
  worldId: WorldId;
  bento: Bento;
  parksInScope: ParkRef[];
  regionLabel: string | null;
  onPickPark?: (parkName: string) => void;
  perks: string[];
  parkPerksLabel: string | null;
  showVacancyList: boolean;
  /** Override-prop's: actief wanneer minimaal één axis (subject of rol) gezet is. */
  uploadEnabled?: boolean;
  /** Subset: is er een subject (park/regio) zodat non-primary slots ook uploadable zijn? */
  uploadSubjectAvailable?: boolean;
  slotHasOverride?: Partial<Record<BentoSlot, boolean>>;
  onSlotUpload?: (slot: BentoSlot, file: File) => void;
  onSlotReset?: (slot: BentoSlot) => void;
  /** Text-overrides per veld voor de huidige scope (true = override actief). */
  textHasOverride?: Partial<Record<TextField, boolean>>;
  onTextSave?: (field: TextField, value: string) => void;
  onTextReset?: (field: TextField) => void;
  /** Perks-list voor de huidige scope (override óf auto). */
  perksHasOverride?: boolean;
  onPerksChange?: (next: string[]) => void;
  onPerksReset?: () => void;
}

const itemMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function MobilePreview({ headline, subtitle, vibeCopy, vacancies, toneLabel, worldId, bento, parksInScope, regionLabel, onPickPark, perks, parkPerksLabel, showVacancyList, uploadEnabled, uploadSubjectAvailable, slotHasOverride, onSlotUpload, onSlotReset, textHasOverride, onTextSave, onTextReset, perksHasOverride, onPerksChange, onPerksReset }: MobilePreviewProps) {
  const noopSave = (_field: TextField, _value: string) => {};
  const noopReset = (_field: TextField) => {};
  const saveText = onTextSave ?? noopSave;
  const resetText = onTextReset ?? noopReset;
  const has = (f: TextField) => textHasOverride?.[f] ?? false;
  const previewList = vacancies.slice(0, 5);
  const world = WORLDS[worldId];

  const screenStyle = {
    '--world-bg': world.palette.bg,
    '--world-fg': world.palette.fg,
    '--world-accent': world.palette.accent,
    '--world-highlight': world.palette.highlight,
    '--world-font': world.font.headline,
    '--world-headline-weight': world.font.headlineWeight,
  } as React.CSSProperties;

  return (
    <div className="cc-mobile-frame">
      <div className="cc-mobile-notch" />
      <div
        className="cc-mobile-screen"
        data-world={worldId}
        data-tone={world.palette.tone}
        style={screenStyle}
      >
        <div className="cc-mobile-statusbar">
          <span>9:41</span>
          <span>•••• 5G</span>
        </div>

        <div className="cc-mobile-hero">
          <div className="cc-brand"><LandalLogo height={24} /></div>

          <HeroCollage
            bento={bento}
            uploadEnabled={uploadEnabled}
            uploadSubjectAvailable={uploadSubjectAvailable}
            slotHasOverride={slotHasOverride}
            onSlotUpload={onSlotUpload}
            onSlotReset={onSlotReset}
          />

          <EditableText
            as="h1"
            className="cc-mobile-headline"
            value={headline}
            hasOverride={has('headline')}
            onSave={(v) => saveText('headline', v)}
            onReset={() => resetText('headline')}
          />
          {/* Subtitle = aantal openstaande vacatures, niet editable —
              hij telt automatisch op basis van de selectie. */}
          <p key={subtitle} className="cc-mobile-sub">{subtitle}</p>
          <EditableText
            as="p"
            className="cc-mobile-vibe"
            value={vibeCopy}
            hasOverride={has('vibe')}
            multiline
            onSave={(v) => saveText('vibe', v)}
            onReset={() => resetText('vibe')}
          />

          <motion.button
            className="cc-mobile-cta"
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
          >
            Bekijk alle <AnimatedNumber value={vacancies.length} /> {vacancies.length === 1 ? 'vacature' : 'vacatures'} →
          </motion.button>
        </div>

        {(perks.length > 0 || onPerksChange) && (
          <div className="cc-mobile-section cc-mobile-perks">
            <p className="cc-mobile-section-label">
              {parkPerksLabel ? `Wat krijg je ${parkPerksLabel}` : 'Wat krijg je als Landal-medewerker'}
              {perksHasOverride && onPerksReset && (
                <button
                  type="button"
                  className="cc-perks-reset"
                  onClick={onPerksReset}
                  title="Terug naar default-lijst"
                >
                  reset
                </button>
              )}
            </p>
            <ul className="cc-mobile-perks-list">
              {perks.map((p, i) => (
                <li key={i} className="cc-mobile-perk">
                  <span className="cc-mobile-perk-check" aria-hidden="true">✓</span>
                  {onPerksChange ? (
                    <EditableText
                      as="span"
                      className="cc-mobile-perk-text"
                      value={p}
                      hasOverride={perksHasOverride ?? false}
                      onSave={(v) => onPerksChange(perks.map((x, j) => (j === i ? v : x)))}
                      onReset={() =>
                        onPerksChange(perks.filter((_, j) => j !== i))
                      }
                    />
                  ) : (
                    <span className="cc-mobile-perk-text">{p}</span>
                  )}
                </li>
              ))}
              {onPerksChange && (
                <li className="cc-mobile-perk cc-mobile-perk--add">
                  <button
                    type="button"
                    className="cc-perks-add"
                    onClick={() => onPerksChange([...perks, 'Nieuw punt'])}
                  >
                    + punt toevoegen
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}

        {parksInScope.length > 0 && (
          <div className="cc-mobile-section cc-mobile-parks">
            <p className="cc-mobile-section-label">
              {regionLabel ? `Parken in ${regionLabel}` : 'Onze parken'}
            </p>
            <div className="cc-mobile-park-grid">
              {parksInScope.slice(0, 6).map((p) => (
                <button
                  key={p.name}
                  className="cc-mobile-park-card"
                  onClick={() => onPickPark?.(p.name)}
                  type="button"
                >
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="cc-mobile-park-img" />
                  ) : (
                    <div className="cc-mobile-park-img cc-mobile-park-img--placeholder" />
                  )}
                  <span className="cc-mobile-park-name">{p.name}</span>
                  <span className="cc-mobile-park-count">{p.count} {p.count === 1 ? 'vacature' : 'vacatures'}</span>
                </button>
              ))}
            </div>
            {parksInScope.length > 6 && (
              <p className="cc-mobile-more">+ {parksInScope.length - 6} meer</p>
            )}
          </div>
        )}

        {showVacancyList && <div className="cc-mobile-section">
          <p className="cc-mobile-section-label">Open vacatures</p>
          {previewList.length === 0 ? (
            <p className="cc-mobile-empty">Pas de scope aan om vacatures te zien.</p>
          ) : (
            <ul className="cc-mobile-list">
              <AnimatePresence mode="popLayout" initial={false}>
                {previewList.map((v, i) => (
                  <motion.li
                    key={v.url}
                    layout
                    className="cc-mobile-list-item"
                    initial={itemMotion.initial}
                    animate={itemMotion.animate}
                    exit={itemMotion.exit}
                    transition={{ duration: 0.28, delay: i * 0.04, ease: 'easeOut' as const }}
                  >
                    <span className="cc-mobile-list-title">{v.title ?? v.slug}</span>
                    <span className="cc-mobile-list-meta">
                      {v.park ?? v.locality ?? '—'} · {v.region ?? v.country?.toUpperCase()}
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
          {vacancies.length > 5 && (
            <p className="cc-mobile-more">
              + <AnimatedNumber value={vacancies.length - 5} /> meer
            </p>
          )}
        </div>}

      </div>
    </div>
  );
}
