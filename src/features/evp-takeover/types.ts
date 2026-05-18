export type WorldId =
  | 'forest'
  | 'coast'
  | 'meer'
  | 'wadden'
  | 'family'
  | 'premium'
  | 'wellness'
  | 'mountain'
  | 'uk';

export type RoleId =
  | 'horeca'
  | 'fun_entertainment'
  | 'receptie'
  | 'parkshop'
  | 'zwembad'
  | 'housekeeping'
  | 'techniek'
  | 'keuken';

export type Vibe =
  | 'luxe'
  | 'kinderen'
  | 'natuur'
  | 'strand'
  | 'actief'
  | 'wellness'
  | 'familie'
  | 'watersport'
  | 'rust';

export type CountryKey =
  | 'nederland'
  | 'belgie'
  | 'duitsland'
  | 'denemarken'
  | 'oostenrijk'
  | 'zwitserland'
  | 'tsjechie'
  | 'engeland';

export interface WorldPark {
  id: string;
  name: string;
  vibe: Vibe;
  tags: string[];
  employeePerks: string[];
  country: CountryKey;
  countryLabel: string;
  region: string;
  regionLabel: string;
}

export type CollageAspect = 'human' | 'work' | 'detail' | 'place' | 'sign' | 'role' | 'park';

export interface CollageTile {
  /** Image URL, or null to render a labelled placeholder (no real photo yet). */
  src: string | null;
  /** Label shown when src is null (e.g. role name). */
  placeholderLabel?: string;
  aspect: CollageAspect;
  /** Position as % of stage. */
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  /** Width in px. */
  width: number;
  /** CSS aspect-ratio (e.g. "4/3"). Image cropped via object-fit cover. */
  ratio: string;
  /** Tilt angle. */
  rotate?: number;
  /** Layer order within the collage. */
  z?: number;
  /** CSS color (token or hex) for the card background around the image. */
  cardBg: string;
}

export interface WorldDef {
  id: WorldId;
  label: string;
  status: 'deep' | 'sketch' | 'stub';
  backgrounds: string[];
  collage?: CollageTile[];
  headlines: string[];
  /** One-sentence intro that sets the tone of the setting. */
  intro: string;
  font: {
    headline: string;
    body: string;
  };
  audioSrc?: string;
}
