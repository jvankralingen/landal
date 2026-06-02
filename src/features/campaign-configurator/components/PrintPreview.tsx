/**
 * A4-poster preview voor de presentatie. Géén interactie, géén uploads.
 *
 * Visuele keuzes:
 *  - Vierkante hoeken (drukwerk crop tot rand).
 *  - Logo + headline + CTA krijgen de world-accentkleur — print mag knallen.
 *  - Hetzelfde verhaal als de mobile preview (headline + sub + vibe + perks)
 *    maar layout-wise rustiger en typografisch verzorgd voor drukwerk.
 */

import { HeroCollage } from './HeroCollage';
import { LandalLogo } from './LandalLogo';
import { WORLDS, type WorldId } from '../lib/worlds';
import type { Bento } from '../lib/buildHeroCollage';

interface PrintPreviewProps {
  headline: string;
  subtitle: string;
  vibeCopy: string;
  perks: string[];
  worldId: WorldId;
  bento: Bento;
}

export function PrintPreview({
  headline,
  subtitle,
  vibeCopy,
  perks,
  worldId,
  bento,
}: PrintPreviewProps) {
  const world = WORLDS[worldId];
  const accent = world.palette.accent;
  // Max 4 perks om de A4 luchtig te houden — bij meer verdwijnt het visuele
  // ritme van een poster.
  const printPerks = perks.slice(0, 4);
  return (
    <div className="cc-print-wrap">
      <p className="cc-socials-label">Print · A4</p>
      <div className="cc-print-paper">
        {/* Crop-marks rondom de gedrukte zone — prepress-stijl. 8 lijnen
            (4 hoeken × 2: horizontaal + verticaal) op een vaste afstand
            van de print-rand. Decoratief; aria-hidden voor screenreaders. */}
        <span aria-hidden="true" className="cc-crop cc-crop--h cc-crop--tl-h" />
        <span aria-hidden="true" className="cc-crop cc-crop--v cc-crop--tl-v" />
        <span aria-hidden="true" className="cc-crop cc-crop--h cc-crop--tr-h" />
        <span aria-hidden="true" className="cc-crop cc-crop--v cc-crop--tr-v" />
        <span aria-hidden="true" className="cc-crop cc-crop--h cc-crop--bl-h" />
        <span aria-hidden="true" className="cc-crop cc-crop--v cc-crop--bl-v" />
        <span aria-hidden="true" className="cc-crop cc-crop--h cc-crop--br-h" />
        <span aria-hidden="true" className="cc-crop cc-crop--v cc-crop--br-v" />
        <div className="cc-print" data-world={worldId}>
        <header className="cc-print-header" style={{ color: accent }}>
          <LandalLogo height={32} />
        </header>
        <div className="cc-print-hero">
          <HeroCollage bento={bento} />
        </div>
        <div className="cc-print-body">
          <h2 className="cc-print-headline" style={{ color: accent }}>
            {headline}
          </h2>
          <p className="cc-print-subtitle">{subtitle}</p>
          {vibeCopy && <p className="cc-print-vibe-copy">{vibeCopy}</p>}
          {printPerks.length > 0 && (
            <ul className="cc-print-perks">
              {printPerks.map((p) => (
                <li key={p}>
                  <span
                    className="cc-print-perk-bullet"
                    style={{ background: accent }}
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
        <footer className="cc-print-footer">
          <span className="cc-print-url" style={{ color: accent }}>
            jobs.landal.com
          </span>
        </footer>
        </div>
      </div>
      <p className="cc-disclaimer">Conceptweergave · niet voor publicatie</p>
    </div>
  );
}
