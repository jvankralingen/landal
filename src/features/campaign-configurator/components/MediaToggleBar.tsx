/**
 * Drie checkbox-achtige toggles waarmee de presentator kiest welke
 * media-previews live staan: mobile (landingspagina), social (social pack),
 * print (A4-poster). Mobile is default aan zodra de "preview"-stage start;
 * social en print zet je tijdens het verhaal extra aan om te laten zien dat
 * dezelfde scope op meerdere kanalen werkt.
 *
 * Bewust visueel ingetogen — het is een control-strookje, geen knop-CTA.
 */

export type MediaKey = 'mobile' | 'social' | 'print';

interface MediaToggleBarProps {
  enabled: Record<MediaKey, boolean>;
  onToggle: (key: MediaKey) => void;
  /** 'stage' = donkere preview-pane styling. 'panel' = lichte ConfigPanel
   *  styling (geen rounded pill-bar, geen "Toon op"-label want de
   *  sectie-titel doet dat al). */
  variant?: 'stage' | 'panel';
}

const ITEMS: { key: MediaKey; label: string; hint: string }[] = [
  { key: 'mobile', label: 'Mobile', hint: 'Landingspagina' },
  { key: 'social', label: 'Social', hint: 'Stories + posts' },
  { key: 'print', label: 'Print', hint: 'A4-poster' },
];

export function MediaToggleBar({ enabled, onToggle, variant = 'stage' }: MediaToggleBarProps) {
  return (
    <div className={`cc-media-bar cc-media-bar--${variant}`} role="group" aria-label="Media-previews">
      {variant === 'stage' && (
        <span className="cc-media-bar-label">Toon op</span>
      )}
      <div className="cc-media-bar-items">
        {ITEMS.map((item) => {
          const on = enabled[item.key];
          return (
            <button
              key={item.key}
              type="button"
              className={`cc-media-toggle${on ? ' is-on' : ''}`}
              aria-pressed={on}
              onClick={() => onToggle(item.key)}
            >
              <span className="cc-media-toggle-box" aria-hidden="true">
                {on ? '✓' : ''}
              </span>
              <span className="cc-media-toggle-text">
                <span className="cc-media-toggle-label">{item.label}</span>
                <span className="cc-media-toggle-hint">{item.hint}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
