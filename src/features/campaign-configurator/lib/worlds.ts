export type WorldId =
  | 'eb'
  | 'hq'
  | 'forest'
  | 'coast'
  | 'wadden'
  | 'family'
  | 'premium'
  | 'wellness'
  | 'mountain'
  | 'uk';

export interface World {
  id: WorldId;
  label: string;
  tagline: string;
  palette: {
    bg: string;
    fg: string;
    accent: string;
    highlight: string;
    tone: 'light' | 'dark';
  };
  font: {
    headline: string;
    headlineWeight: number;
  };
}

export const WORLDS: Record<WorldId, World> = {
  eb: {
    id: 'eb',
    label: 'Iedereen',
    tagline: '80+ parken · 4 landen · alle rollen',
    palette: { bg: '#fffae9', fg: '#1c1f24', accent: '#0097a2', highlight: '#1ecad3', tone: 'light' },
    font: { headline: '"Playfair Display", Georgia, serif', headlineWeight: 600 },
  },
  hq: {
    id: 'hq',
    label: 'Hoofdkantoor',
    tagline: 'het brein · Amsterdam & Zwolle',
    palette: { bg: '#fffae9', fg: '#1c1f24', accent: '#0097a2', highlight: '#cdde00', tone: 'light' },
    font: { headline: '"Playfair Display", Georgia, serif', headlineWeight: 600 },
  },
  forest: {
    id: 'forest',
    label: 'Bos',
    tagline: 'rust · ritme · groen',
    palette: { bg: '#fffae9', fg: '#212721', accent: '#3dae2b', highlight: '#cdde00', tone: 'light' },
    font: { headline: '"Playfair Display", Georgia, serif', headlineWeight: 600 },
  },
  coast: {
    id: 'coast',
    label: 'Kust',
    tagline: 'zee · zout · zonsondergang',
    palette: { bg: '#fffae9', fg: '#0a3a40', accent: '#0097a2', highlight: '#1ecad3', tone: 'light' },
    font: { headline: '"Playfair Display", Georgia, serif', headlineWeight: 600 },
  },
  wadden: {
    id: 'wadden',
    label: 'Wadden',
    tagline: 'eiland · ruimte · wind',
    palette: { bg: '#fffae9', fg: '#212721', accent: '#1ecad3', highlight: '#0097a2', tone: 'light' },
    font: { headline: '"Playfair Display", Georgia, serif', headlineWeight: 500 },
  },
  family: {
    id: 'family',
    label: 'Familie',
    tagline: 'energie · kinderen · drukte',
    palette: { bg: '#fffae9', fg: '#4a2a10', accent: '#e75402', highlight: '#f5a800', tone: 'light' },
    font: { headline: '"Playfair Display", Georgia, serif', headlineWeight: 700 },
  },
  premium: {
    id: 'premium',
    label: 'Premium',
    tagline: 'verfijnd · service · stilte',
    palette: { bg: '#212721', fg: '#fffae9', accent: '#c0afdc', highlight: '#764897', tone: 'dark' },
    font: { headline: '"Inter", system-ui, sans-serif', headlineWeight: 500 },
  },
  wellness: {
    id: 'wellness',
    label: 'Wellness',
    tagline: 'ontspanning · zacht licht · ademen',
    palette: { bg: '#fffae9', fg: '#3a2a4a', accent: '#764897', highlight: '#c0afdc', tone: 'light' },
    font: { headline: '"Playfair Display", Georgia, serif', headlineWeight: 500 },
  },
  mountain: {
    id: 'mountain',
    label: 'Bergen',
    tagline: 'alpen · helder · hoogte',
    palette: { bg: '#212721', fg: '#fffae9', accent: '#1ecad3', highlight: '#0097a2', tone: 'dark' },
    font: { headline: '"Playfair Display", Georgia, serif', headlineWeight: 500 },
  },
  uk: {
    id: 'uk',
    label: 'UK',
    tagline: 'engels · groen · gewoonte',
    palette: { bg: '#fffae9', fg: '#212721', accent: '#cdde00', highlight: '#3dae2b', tone: 'light' },
    font: { headline: '"Playfair Display", Georgia, serif', headlineWeight: 500 },
  },
};
