import type { Bento, BentoTile } from '../lib/buildHeroCollage';

interface HeroCollageProps {
  bento: Bento;
}

type SlotName = 'primary' | 'secondary' | 'tertiary' | 'accent';

function Slot({ slot, tile }: { slot: SlotName; tile: BentoTile }) {
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

export function HeroCollage({ bento }: HeroCollageProps) {
  return (
    <div className="cc-hero-collage" data-trim={bento.trim}>
      <Slot slot="primary" tile={bento.primary} />
      <Slot slot="secondary" tile={bento.secondary} />
      <Slot slot="tertiary" tile={bento.tertiary} />
      <Slot slot="accent" tile={bento.accent} />
    </div>
  );
}
