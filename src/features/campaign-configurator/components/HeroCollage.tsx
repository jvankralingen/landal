import { useRef } from 'react';
import type { Bento, BentoTile } from '../lib/buildHeroCollage';
import type { BentoSlot } from '../lib/imageOverrides';

interface HeroCollageProps {
  bento: Bento;
  /**
   * True wanneer minimaal één axis (subject of rol) gezet is — dan is de
   * primary tile uploadable (rol-only override is geldig).
   */
  uploadEnabled?: boolean;
  /**
   * True wanneer een subject (park/regio) eenduidig gekozen is. Non-primary
   * slots (secondary/tertiary/accent) zijn alleen uploadable als dit waar
   * is, want zij representeren subject-context.
   */
  uploadSubjectAvailable?: boolean;
  /** Map van slot → boolean: heeft deze slot een actieve override? */
  slotHasOverride?: Partial<Record<BentoSlot, boolean>>;
  onSlotUpload?: (slot: BentoSlot, file: File) => void;
  onSlotReset?: (slot: BentoSlot) => void;
}

const ALL_SLOTS: BentoSlot[] = ['primary', 'secondary', 'tertiary', 'accent'];

function Slot({ slot, tile }: { slot: BentoSlot; tile: BentoTile }) {
  // Re-key the inner img on tile change so CSS animation re-fires.
  const innerKey = `${tile.src ?? ''}-${tile.label}`;
  return (
    <div className={`cc-hero-tile cc-hero-tile--${slot} cc-hero-tile--${tile.kind}`}>
      <div className="cc-hero-tile-inner" key={innerKey}>
        {tile.src ? (
          <img src={tile.src} alt={tile.label} />
        ) : (
          <span className="cc-hero-tile-placeholder">{tile.label}</span>
        )}
        {tile.label && (
          <span className="cc-hero-tile-tag">{tile.label}</span>
        )}
      </div>
    </div>
  );
}

function UploadableSlot({
  slot,
  tile,
  hasOverride,
  onUpload,
  onReset,
}: {
  slot: BentoSlot;
  tile: BentoTile;
  hasOverride: boolean;
  onUpload: (slot: BentoSlot, file: File) => void;
  onReset: (slot: BentoSlot) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const innerKey = `${tile.src ?? ''}-${tile.label}`;

  const handleClick = () => fileRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(slot, file);
    e.target.value = '';
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReset(slot);
  };

  return (
    <div
      className={`cc-hero-tile cc-hero-tile--${slot} cc-hero-tile--${tile.kind} cc-hero-tile--uploadable${
        hasOverride ? ' cc-hero-tile--has-override' : ''
      }`}
    >
      <button
        type="button"
        className="cc-hero-tile-upload-zone"
        onClick={handleClick}
        aria-label={`Upload eigen afbeelding voor ${slot}-tegel`}
      >
        <div className="cc-hero-tile-inner" key={innerKey}>
          {tile.src ? (
            <img src={tile.src} alt={tile.label} />
          ) : (
            <span className="cc-hero-tile-placeholder">{tile.label}</span>
          )}
          {tile.label && (
            <span className="cc-hero-tile-tag">{tile.label}</span>
          )}
        </div>
        <span className="cc-hero-tile-upload-hint">
          {hasOverride ? 'Vervangen' : 'Klik om te uploaden'}
        </span>
      </button>
      {hasOverride && (
        <button
          type="button"
          className="cc-hero-tile-reset"
          onClick={handleReset}
          aria-label="Override verwijderen, terug naar default beeld"
          title="Override verwijderen"
        >
          ×
        </button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </div>
  );
}

export function HeroCollage({
  bento,
  uploadEnabled = false,
  uploadSubjectAvailable = false,
  slotHasOverride = {},
  onSlotUpload,
  onSlotReset,
}: HeroCollageProps) {
  const handlersPresent = onSlotUpload != null && onSlotReset != null;

  // primary: uploadable zodra rol of subject set is.
  // andere slots: alleen uploadable als subject set is (zonder subject geen
  // zinvolle context-override).
  const slotIsUploadable = (slot: BentoSlot): boolean => {
    if (!handlersPresent) return false;
    if (slot === 'primary') return uploadEnabled;
    return uploadSubjectAvailable;
  };

  return (
    <div className="cc-hero-collage" data-trim={bento.trim}>
      {ALL_SLOTS.map((slot) => {
        const tile = bento[slot];
        if (!slotIsUploadable(slot))
          return <Slot key={slot} slot={slot} tile={tile} />;
        return (
          <UploadableSlot
            key={slot}
            slot={slot}
            tile={tile}
            hasOverride={slotHasOverride[slot] ?? false}
            onUpload={onSlotUpload!}
            onReset={onSlotReset!}
          />
        );
      })}
    </div>
  );
}
