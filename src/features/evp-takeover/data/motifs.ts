import type { ComponentType, SVGProps } from 'react';
import {
  Anchor,
  Buoy,
  Cabin,
  Compass,
  Edelweiss,
  Fern,
  Heather,
  Lighthouse,
  Mushroom,
  OakLeaf,
  Peak,
  PineBranch,
  Pinecone,
  SaltMarsh,
  Seagrass,
  Seagull,
  Seashell,
  Snowflake,
  Wave,
} from '../illustrations';
import type { WorldId } from '../types';

export type IllustrationCmp = ComponentType<SVGProps<SVGSVGElement>>;

export type MotifColor = 'fg-secondary' | 'accent' | 'highlight';

export interface MotifPlacement {
  cmp: IllustrationCmp;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  size: number;
  rotate?: number;
  opacity?: number;
  color?: MotifColor;
}

export type MotifSet = MotifPlacement[];

// Motifs live on the LEFT half of the stage, behind the headline,
// so they balance the photo constellation on the right without crowding it.

const forestDefault: MotifSet = [
  { cmp: Pinecone, top: '8%', left: '4%', size: 110, rotate: -10, opacity: 0.32, color: 'highlight' },
  { cmp: Fern, bottom: '20%', left: '2%', size: 160, rotate: -8, opacity: 0.28, color: 'accent' },
  { cmp: OakLeaf, top: '38%', left: '38%', size: 80, rotate: 22, opacity: 0.22, color: 'accent' },
];

const veluweMotifs: MotifSet = [
  { cmp: Pinecone, top: '8%', left: '5%', size: 120, rotate: -8, opacity: 0.42, color: 'highlight' },
  { cmp: PineBranch, top: '54%', left: '-2%', size: 280, rotate: 6, opacity: 0.22, color: 'accent' },
  { cmp: Mushroom, top: '30%', left: '40%', size: 90, rotate: -6, opacity: 0.3, color: 'highlight' },
];

const drentheMotifs: MotifSet = [
  { cmp: Heather, top: '10%', left: '4%', size: 160, rotate: 0, opacity: 0.4, color: 'highlight' },
  { cmp: OakLeaf, bottom: '24%', left: '2%', size: 110, rotate: -12, opacity: 0.32, color: 'accent' },
  { cmp: Fern, top: '36%', left: '38%', size: 110, rotate: 18, opacity: 0.25, color: 'accent' },
];

const coastDefault: MotifSet = [
  { cmp: Wave, top: '12%', left: '2%', size: 200, rotate: 0, opacity: 0.32, color: 'accent' },
  { cmp: Seashell, bottom: '22%', left: '4%', size: 120, rotate: 14, opacity: 0.4, color: 'highlight' },
  { cmp: Seagull, top: '46%', left: '34%', size: 100, rotate: -6, opacity: 0.42, color: 'fg-secondary' },
];

const zeelandMotifs: MotifSet = [
  { cmp: Seashell, top: '10%', left: '4%', size: 140, rotate: 18, opacity: 0.45, color: 'highlight' },
  { cmp: Wave, top: '46%', left: '0%', size: 220, rotate: 0, opacity: 0.3, color: 'accent' },
  { cmp: Anchor, bottom: '22%', left: '6%', size: 130, rotate: -8, opacity: 0.35, color: 'highlight' },
];

const noordHollandMotifs: MotifSet = [
  { cmp: Lighthouse, top: '8%', left: '4%', size: 150, rotate: 0, opacity: 0.4, color: 'highlight' },
  { cmp: Seagull, top: '34%', left: '36%', size: 90, rotate: -8, opacity: 0.4, color: 'fg-secondary' },
  { cmp: Wave, bottom: '20%', left: '2%', size: 210, rotate: 0, opacity: 0.32, color: 'accent' },
];

const meerDefault: MotifSet = [
  { cmp: Anchor, top: '12%', left: '4%', size: 130, rotate: -6, opacity: 0.4, color: 'accent' },
  { cmp: Buoy, bottom: '20%', left: '6%', size: 110, rotate: 8, opacity: 0.45, color: 'highlight' },
  { cmp: Compass, top: '42%', left: '36%', size: 100, rotate: 0, opacity: 0.32, color: 'fg-secondary' },
];

const waddenDefault: MotifSet = [
  { cmp: SaltMarsh, bottom: '14%', left: '0%', size: 300, rotate: 0, opacity: 0.32, color: 'accent' },
  { cmp: Compass, top: '10%', left: '4%', size: 130, rotate: 0, opacity: 0.4, color: 'highlight' },
  { cmp: Seagrass, top: '40%', left: '36%', size: 130, rotate: 0, opacity: 0.3, color: 'accent' },
];

const mountainDefault: MotifSet = [
  { cmp: Peak, top: '10%', left: '2%', size: 200, rotate: 0, opacity: 0.32, color: 'highlight' },
  { cmp: Snowflake, top: '44%', left: '36%', size: 90, rotate: 0, opacity: 0.38, color: 'fg-secondary' },
  { cmp: Cabin, bottom: '22%', left: '4%', size: 140, rotate: 0, opacity: 0.4, color: 'accent' },
  { cmp: Edelweiss, top: '62%', left: '30%', size: 72, rotate: 0, opacity: 0.45, color: 'highlight' },
];

const familyDefault: MotifSet = [
  { cmp: Buoy, top: '10%', left: '4%', size: 130, rotate: -8, opacity: 0.42, color: 'highlight' },
  { cmp: Wave, bottom: '22%', left: '2%', size: 210, rotate: 0, opacity: 0.3, color: 'accent' },
  { cmp: Compass, top: '40%', left: '36%', size: 90, rotate: 0, opacity: 0.35, color: 'fg-secondary' },
];

const premiumDefault: MotifSet = [
  { cmp: Compass, top: '10%', left: '4%', size: 140, rotate: 0, opacity: 0.42, color: 'highlight' },
  { cmp: Edelweiss, bottom: '22%', left: '4%', size: 120, rotate: 0, opacity: 0.38, color: 'highlight' },
  { cmp: OakLeaf, top: '40%', left: '36%', size: 80, rotate: 16, opacity: 0.26, color: 'accent' },
];

const wellnessDefault: MotifSet = [
  { cmp: Fern, top: '10%', left: '4%', size: 160, rotate: 6, opacity: 0.38, color: 'accent' },
  { cmp: Heather, bottom: '20%', left: '4%', size: 140, rotate: 0, opacity: 0.34, color: 'highlight' },
  { cmp: Edelweiss, top: '42%', left: '36%', size: 84, rotate: 0, opacity: 0.42, color: 'highlight' },
];

const ukDefault: MotifSet = [
  { cmp: Lighthouse, top: '10%', left: '4%', size: 150, rotate: 0, opacity: 0.38, color: 'highlight' },
  { cmp: OakLeaf, bottom: '20%', left: '4%', size: 130, rotate: -10, opacity: 0.34, color: 'accent' },
  { cmp: Wave, top: '44%', left: '32%', size: 200, rotate: 0, opacity: 0.26, color: 'fg-secondary' },
];

export const motifsByWorld: Record<WorldId, MotifSet> = {
  forest: forestDefault,
  coast: coastDefault,
  meer: meerDefault,
  wadden: waddenDefault,
  family: familyDefault,
  premium: premiumDefault,
  wellness: wellnessDefault,
  mountain: mountainDefault,
  uk: ukDefault,
};

export const motifsByWorldRegion: Record<string, MotifSet> = {
  'forest:gelderland': veluweMotifs,
  'forest:drenthe': drentheMotifs,
  'coast:zeeland': zeelandMotifs,
  'coast:noord_holland': noordHollandMotifs,
};

export function resolveMotifs(world: WorldId, region: string): MotifSet {
  return motifsByWorldRegion[`${world}:${region}`] ?? motifsByWorld[world];
}
