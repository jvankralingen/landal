import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement>;

const base = (children: React.ReactNode, viewBox = '0 0 120 120') =>
  function Illustration(props: Props) {
    return (
      <svg
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {children}
      </svg>
    );
  };

// ─── Woodlands ─────────────────────────────────────────────────────────────

export const Pinecone = base(
  <>
    <ellipse cx="60" cy="62" rx="22" ry="34" />
    <path d="M40 42 L60 50 L80 42" />
    <path d="M38 54 L60 64 L82 54" />
    <path d="M38 68 L60 78 L82 68" />
    <path d="M40 82 L60 92 L80 82" />
    <path d="M60 26 L60 36" />
    <path d="M52 24 L60 28" />
    <path d="M68 24 L60 28" />
  </>
);

export const PineBranch = base(
  <>
    <path d="M16 60 C 36 58, 64 58, 104 56" />
    <path d="M28 56 L24 44" />
    <path d="M28 56 L32 44" />
    <path d="M42 55 L38 42" />
    <path d="M42 55 L46 42" />
    <path d="M56 54 L52 41" />
    <path d="M56 54 L60 41" />
    <path d="M70 54 L66 41" />
    <path d="M70 54 L74 41" />
    <path d="M84 53 L80 40" />
    <path d="M84 53 L88 40" />
    <path d="M28 64 L24 76" />
    <path d="M42 65 L38 78" />
    <path d="M56 66 L52 79" />
    <path d="M70 66 L66 79" />
    <path d="M84 67 L80 80" />
  </>
);

export const OakLeaf = base(
  <>
    <path d="M60 14 C 48 28, 30 28, 28 44 C 28 56, 38 58, 36 70 C 36 82, 50 84, 60 104 C 70 84, 84 82, 84 70 C 82 58, 92 56, 92 44 C 90 28, 72 28, 60 14 Z" />
    <path d="M60 16 L60 102" />
  </>
);

export const Fern = base(
  <>
    <path d="M60 100 C 60 80, 56 50, 60 18" />
    <path d="M60 92 C 50 90, 44 84, 42 76" />
    <path d="M60 92 C 70 90, 76 84, 78 76" />
    <path d="M60 80 C 48 78, 40 70, 38 60" />
    <path d="M60 80 C 72 78, 80 70, 82 60" />
    <path d="M60 66 C 50 64, 44 56, 44 48" />
    <path d="M60 66 C 70 64, 76 56, 76 48" />
    <path d="M60 50 C 52 48, 48 42, 50 36" />
    <path d="M60 50 C 68 48, 72 42, 70 36" />
    <path d="M60 36 C 54 34, 52 30, 56 26" />
    <path d="M60 36 C 66 34, 68 30, 64 26" />
  </>
);

export const Mushroom = base(
  <>
    <path d="M28 56 C 28 36, 48 24, 60 24 C 72 24, 92 36, 92 56 Z" />
    <ellipse cx="46" cy="44" rx="3" ry="2" />
    <ellipse cx="62" cy="38" rx="2.5" ry="1.6" />
    <ellipse cx="76" cy="50" rx="3" ry="2" />
    <path d="M46 56 C 46 76, 52 92, 60 96 C 68 92, 74 76, 74 56" />
    <path d="M52 80 C 56 82, 64 82, 68 80" />
  </>
);

export const Heather = base(
  <>
    <path d="M30 96 L40 30" />
    <path d="M60 96 L60 22" />
    <path d="M90 96 L80 30" />
    <path d="M40 30 L36 34" />
    <path d="M40 30 L44 34" />
    <path d="M40 38 L36 42" />
    <path d="M40 38 L44 42" />
    <path d="M40 46 L36 50" />
    <path d="M40 46 L44 50" />
    <path d="M60 22 L56 26" />
    <path d="M60 22 L64 26" />
    <path d="M60 32 L56 36" />
    <path d="M60 32 L64 36" />
    <path d="M60 42 L56 46" />
    <path d="M60 42 L64 46" />
    <path d="M80 30 L76 34" />
    <path d="M80 30 L84 34" />
    <path d="M80 40 L76 44" />
    <path d="M80 40 L84 44" />
  </>
);

// ─── Coast ────────────────────────────────────────────────────────────────

export const Wave = base(
  <>
    <path d="M8 70 C 24 56, 36 84, 60 70 C 84 56, 96 84, 112 70" />
    <path d="M8 84 C 24 70, 36 98, 60 84 C 84 70, 96 98, 112 84" />
  </>,
  '0 0 120 120'
);

export const Seashell = base(
  <>
    <path d="M60 100 L20 50 C 28 32, 52 18, 60 18 C 68 18, 92 32, 100 50 L60 100 Z" />
    <path d="M60 100 L36 52" />
    <path d="M60 100 L46 46" />
    <path d="M60 100 L60 22" />
    <path d="M60 100 L74 46" />
    <path d="M60 100 L84 52" />
  </>
);

export const Seagull = base(
  <>
    <path d="M10 70 C 24 50, 36 56, 44 64 C 50 56, 56 56, 60 60 C 64 56, 70 56, 76 64 C 84 56, 96 50, 110 70" />
    <path d="M40 70 C 46 78, 52 78, 60 72 C 68 78, 74 78, 80 70" />
  </>
);

export const Lighthouse = base(
  <>
    <rect x="48" y="34" width="24" height="58" />
    <path d="M44 34 L76 34" />
    <path d="M44 50 L76 50" />
    <path d="M44 70 L76 70" />
    <rect x="44" y="22" width="32" height="12" />
    <path d="M52 22 L52 14 L68 14 L68 22" />
    <path d="M58 14 L62 14 L62 8 L58 8 Z" />
    <path d="M40 92 L80 92" />
    <path d="M44 22 L40 18" />
    <path d="M76 22 L80 18" />
  </>
);

export const Anchor = base(
  <>
    <circle cx="60" cy="20" r="6" />
    <path d="M60 26 L60 90" />
    <path d="M44 38 L76 38" />
    <path d="M30 70 C 30 84, 44 96, 60 96 C 76 96, 90 84, 90 70" />
    <path d="M30 70 L24 64" />
    <path d="M90 70 L96 64" />
  </>
);

// ─── Island ───────────────────────────────────────────────────────────────

export const Seagrass = base(
  <>
    <path d="M30 100 C 36 70, 30 40, 38 14" />
    <path d="M50 100 C 56 60, 48 28, 54 8" />
    <path d="M70 100 C 76 70, 70 40, 78 14" />
    <path d="M90 100 C 96 60, 88 28, 94 8" />
  </>
);

export const Buoy = base(
  <>
    <circle cx="60" cy="62" r="22" />
    <path d="M60 84 L60 96" />
    <path d="M40 62 L80 62" />
    <path d="M60 40 L60 84" />
    <path d="M42 50 L78 50" />
    <path d="M42 74 L78 74" />
    <path d="M48 30 L72 30 L60 40 Z" />
  </>
);

export const Compass = base(
  <>
    <circle cx="60" cy="60" r="40" />
    <path d="M60 20 L60 30" />
    <path d="M60 90 L60 100" />
    <path d="M20 60 L30 60" />
    <path d="M90 60 L100 60" />
    <path d="M60 30 L66 60 L60 90 L54 60 Z" />
    <path d="M30 60 L60 54 L90 60 L60 66 Z" />
  </>
);

export const SaltMarsh = base(
  <>
    <path d="M8 88 C 28 80, 48 92, 68 84 C 88 76, 100 88, 116 80" />
    <path d="M8 96 C 28 88, 48 100, 68 92 C 88 84, 100 96, 116 88" />
    <path d="M18 78 L20 70" />
    <path d="M22 78 L24 68" />
    <path d="M40 80 L42 70" />
    <path d="M44 80 L46 66" />
    <path d="M64 76 L66 66" />
    <path d="M70 76 L72 60" />
    <path d="M90 80 L92 70" />
    <path d="M94 80 L96 66" />
  </>
);

// ─── Mountain ─────────────────────────────────────────────────────────────

export const Peak = base(
  <>
    <path d="M10 96 L40 36 L60 60 L80 24 L110 96 Z" />
    <path d="M40 36 L48 48 L60 60" />
    <path d="M80 24 L72 52 L88 56" />
  </>
);

export const Snowflake = base(
  <>
    <path d="M60 12 L60 108" />
    <path d="M18 36 L102 84" />
    <path d="M18 84 L102 36" />
    <path d="M60 22 L56 28 M60 22 L64 28" />
    <path d="M60 98 L56 92 M60 98 L64 92" />
    <path d="M26 40 L33 41 M26 40 L27 47" />
    <path d="M94 80 L87 79 M94 80 L93 73" />
    <path d="M26 80 L33 79 M26 80 L27 73" />
    <path d="M94 40 L87 41 M94 40 L93 47" />
  </>
);

export const Cabin = base(
  <>
    <path d="M16 92 L60 32 L104 92 Z" />
    <rect x="32" y="68" width="56" height="24" />
    <rect x="50" y="76" width="10" height="16" />
    <rect x="66" y="74" width="10" height="10" />
    <path d="M24 92 L96 92" />
    <path d="M40 56 L80 56" />
  </>
);

export const Edelweiss = base(
  <>
    <ellipse cx="60" cy="60" rx="4" ry="4" />
    <ellipse cx="60" cy="36" rx="6" ry="14" />
    <ellipse cx="60" cy="84" rx="6" ry="14" />
    <ellipse cx="36" cy="60" rx="14" ry="6" />
    <ellipse cx="84" cy="60" rx="14" ry="6" />
    <ellipse cx="42" cy="42" rx="6" ry="11" transform="rotate(-45 42 42)" />
    <ellipse cx="78" cy="42" rx="6" ry="11" transform="rotate(45 78 42)" />
    <ellipse cx="42" cy="78" rx="6" ry="11" transform="rotate(45 42 78)" />
    <ellipse cx="78" cy="78" rx="6" ry="11" transform="rotate(-45 78 78)" />
  </>
);
