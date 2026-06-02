import { LandalLogo } from './LandalLogo';
import { WORLDS, type WorldId } from '../lib/worlds';
import type { Bento } from '../lib/buildHeroCollage';
import type { Doelgroep } from '../types';

interface SocialPackProps {
  headline: string;
  cta: string;
  worldId: WorldId;
  bento: Bento;
  doelgroep: Doelgroep;
}

// UGC-clips horen bij video-native publiek (tieners/studenten/starters)
// én bij de brede EB-campagne ('iedereen') waarin dat publiek meereist.
// Bij management-rollen (professionals/senior) houden we de social-pack
// rustig — daar werkt polished content beter dan vertical reels.
const UGC_DOELGROEPEN: Doelgroep[] = ['iedereen', 'tieners', 'studenten', 'starters'];

// Mock UGC captions per role-photo theme — placeholder until real clips land.
const UGC_CAPTIONS = [
  { author: '@jaimy', caption: 'POV: het is weer wisseldag', duration: '0:18' },
  { author: '@sem', caption: 'Bardrukte op zaterdagavond', duration: '0:23' },
  { author: '@noa', caption: 'Mijn animatie-team is mijn nieuwe vriendengroep', duration: '0:31' },
];

function pickUgcCaption(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return UGC_CAPTIONS[Math.abs(h) % UGC_CAPTIONS.length];
}

function pickHero(bento: Bento) {
  return bento.primary.src ?? bento.secondary.src ?? bento.accent.src ?? null;
}

function pickSecond(bento: Bento) {
  // For the square format we put a secondary photo next to the primary.
  return bento.secondary.src ?? bento.tertiary.src ?? bento.accent.src ?? null;
}

export function SocialPack({ headline, cta, worldId, bento, doelgroep }: SocialPackProps) {
  const world = WORLDS[worldId];
  const accent = world.palette.accent;
  const onAccent = world.palette.tone === 'dark' ? '#1c1f24' : '#fffae9';
  const heroSrc = pickHero(bento);
  const secondSrc = pickSecond(bento);
  const showUgc = UGC_DOELGROEPEN.includes(doelgroep);
  const ugcCaption = pickUgcCaption(`${headline}-${doelgroep}`);
  const ugcSrc = bento.primary.kind === 'role' ? bento.primary.src : secondSrc;

  const accentVars = { ['--social-accent' as never]: accent, ['--social-on-accent' as never]: onAccent };

  return (
    <div className="cc-socials">
      <p className="cc-socials-label">Social pack</p>

      <div className="cc-socials-row">

      {/* Story · 9:16 — photo top, accent panel bottom */}
      <article className="cc-social cc-social--story" style={accentVars}>
        <div className="cc-social-photo">
          {heroSrc && <img src={heroSrc} alt="" />}
          <span className="cc-social-logo"><LandalLogo height={18} /></span>
        </div>
        <div className="cc-social-card">
          <h3 className="cc-social-headline">{headline}</h3>
          <span className="cc-social-cta">{cta}</span>
        </div>
        <span className="cc-social-format">Story · 9:16</span>
      </article>

      {/* Square · 1:1 — left photo (spotlight, zelfde als bento primary), right accent panel met logo boven en titel/CTA onderaan */}
      <article className="cc-social cc-social--square" style={accentVars}>
        <div className="cc-social-photo">
          {heroSrc && <img src={heroSrc} alt="" />}
        </div>
        <div className="cc-social-card">
          <span className="cc-social-logo cc-social-logo--inline"><LandalLogo height={20} /></span>
          <div className="cc-social-card-bottom">
            <h3 className="cc-social-headline cc-social-headline--sm">{headline}</h3>
            <span className="cc-social-cta">{cta}</span>
          </div>
        </div>
        <span className="cc-social-format">Square · 1:1</span>
      </article>

      {/* UGC Reel · 9:16 — alleen voor video-native doelgroepen */}
      {showUgc && (
        <article className="cc-social cc-social--ugc" style={accentVars}>
          <div className="cc-social-photo">
            {ugcSrc && <img src={ugcSrc} alt="" />}
            <div className="cc-ugc-overlay">
              <span className="cc-ugc-play" aria-hidden="true">▶</span>
              <span className="cc-ugc-duration">{ugcCaption.duration}</span>
            </div>
            <div className="cc-ugc-caption">
              <span className="cc-ugc-author">{ugcCaption.author}</span>
              <span className="cc-ugc-text">{ugcCaption.caption}</span>
            </div>
          </div>
          <span className="cc-social-format">UGC · 9:16</span>
        </article>
      )}

      </div>

      <p className="cc-disclaimer">Conceptweergave · niet voor publicatie</p>
    </div>
  );
}
