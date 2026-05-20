import { useRef } from 'react';
import type { Bento, BentoTile } from '../lib/buildHeroCollage';
import type { BentoSlot } from '../lib/imageOverrides';

interface HeroCollageProps {
  bento: Bento;
  /**
   * Wanneer gezet wordt elke tile klikbaar: klik opent de file-picker, de
   * gekozen afbeelding wordt door de parent opgeslagen als override voor
   * `parkId:slot`. `null` = upload-mogelijkheid uit (bv. bij meerdere
   * parken, regio-scope, of EB).
   */
  uploadParkId?: string | null;
  /** Map van slot → boolean: heeft deze slot een actieve override? */
  slotHasOverride?: Partial<Record<BentoSlot, boolean>>;
  onSlotUpload?: (parkId: string, slot: BentoSlot, file: File) => void;
  onSlotReset?: (parkId: string, slot: BentoSlot) => void;
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
  parkId,
  hasOverride,
  onUpload,
  onReset,
}: {
  slot: BentoSlot;
  tile: BentoTile;
  parkId: string;
  hasOverride: boolean;
  onUpload: (parkId: string, slot: BentoSlot, file: File) => void;
  onReset: (parkId: string, slot: BentoSlot) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const innerKey = `${tile.src ?? ''}-${tile.label}`;

  const handleClick = () => fileRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(parkId, slot, file);
    e.target.value = '';
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    onReset(parkId, slot);
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
  uploadParkId,
  slotHasOverride = {},
  onSlotUpload,
  onSlotReset,
}: HeroCollageProps) {
  const canUpload =
    uploadParkId != null && onSlotUpload != null && onSlotReset != null;

  return (
    <div className="cc-hero-collage" data-trim={bento.trim}>
      {ALL_SLOTS.map((slot) => {
        const tile = bento[slot];
        if (!canUpload) return <Slot key={slot} slot={slot} tile={tile} />;
        return (
          <UploadableSlot
            key={slot}
            slot={slot}
            tile={tile}
            parkId={uploadParkId!}
            hasOverride={slotHasOverride[slot] ?? false}
            onUpload={onSlotUpload!}
            onReset={onSlotReset!}
          />
        );
      })}
    </div>
  );
}
