import type { RoleId } from '../types';

export interface RoleDef {
  id: RoleId;
  label: string;
  /** "Het werk" · twee eerlijke regels over wat de rol echt vraagt. */
  reality: string[];
  /** "Wat je krijgt" · drie concrete voordelen / realiteiten van deze rol. */
  perks: string[];
  /**
   * Twee photo URLs (Pexels numeric, Unsplash alphanumeric, of volledige URL)
   * van de rol aan het werk. Null = placeholder met label tot er een echte
   * foto is. Inhoud per slot staat inline beschreven.
   */
  photos: [string | null, string | null];
}

export const roles: Record<RoleId, RoleDef> = {
  horeca: {
    id: 'horeca',
    label: 'Horeca',
    reality: [
      '12 uur zaterdagen. 12 uur zondagen.',
      'Glimlachen als de keuken geen friet meer heeft.',
    ],
    perks: [
      'Proeven van de kaart hoort erbij.',
      'Front-of-house energie, altijd live.',
      'Internationale gasten, dagelijks.',
    ],
    photos: ['/photos/roles/horeca.webp', null],
  },

  fun_entertainment: {
    id: 'fun_entertainment',
    label: 'Fun & Entertainment',
    reality: [
      'Acht shows per dag. Plus de toegift.',
      'Glitter krijg je niet meer van je huid.',
    ],
    perks: [
      'Applaus dat langer duurt dan je dienst.',
      'Een ander podium elk seizoen.',
      'Kinderen die je naam onthouden.',
    ],
    photos: ['/photos/roles/fun_entertainment.webp', null],
  },

  receptie: {
    id: 'receptie',
    label: 'Receptie',
    reality: [
      'Eerste gezicht om 7 uur. Hetzelfde gezicht om 19 uur.',
      'Verloren sleutels. Gemiste shuttles. Vergeten verjaardagen.',
    ],
    perks: [
      'Verwelkom gasten van over de hele wereld.',
      'Lokale tips die je zelf hebt getest.',
      'Inzicht in het hele park.',
    ],
    photos: ['/photos/roles/receptie.webp', null],
  },

  parkshop: {
    id: 'parkshop',
    label: 'Parkshop',
    reality: [
      'Vakken vullen voordat de rij opengaat.',
      'Negen uur op je voeten.',
    ],
    perks: [
      'Gasten in vakantiestemming. Relaxed.',
      'Aanbevelingen die landen.',
      'Rustige ochtenden, drukke middagen.',
    ],
    photos: ['/photos/roles/parkshop.webp', null],
  },

  zwembad: {
    id: 'zwembad',
    label: 'Zwembad',
    reality: [
      'Ogen op het water. Geen telefoon, geen afdwalen.',
      'Koude ochtenden op een natte tegelvloer.',
    ],
    perks: [
      'Gratis zwemmen na je dienst.',
      'Jij hebt de leiding op de rand.',
      'Kinderen leren zwemmen. Dat onthouden ze.',
    ],
    photos: ['/photos/roles/zwembad.webp', null],
  },

  housekeeping: {
    id: 'housekeeping',
    label: 'Housekeeping',
    reality: [
      '30 kamers vóór de middag. Geen hoeken overslaan.',
      'Zaterdagen zijn altijd wisseldagen.',
    ],
    perks: [
      'Klaar om 14:00. De rest van de dag is van jou.',
      'Direct, zichtbaar resultaat van je werk.',
      'Eigen tempo, eigen route.',
    ],
    photos: ['/photos/roles/housekeeping.webp', null],
  },

  techniek: {
    id: 'techniek',
    label: 'Technische dienst / Groen',
    reality: [
      'Bevroren leidingen om 6 uur. Snoeien voor de gasten wakker zijn.',
      'Regen annuleert het werk niet.',
    ],
    perks: [
      'Elke dag een ander probleem.',
      'Van jacuzzi tot heggenrij. Echte variatie.',
      'Vertrouwen om het te fixen zonder twee keer te vragen.',
    ],
    photos: ['/photos/roles/techniek.webp', null],
  },

  keuken: {
    id: 'keuken',
    label: 'Keuken',
    reality: [
      'Lunchservice voor ze hebben ontbeten.',
      'Hitte, stoom, en een klok die niet wacht.',
    ],
    perks: [
      'Koken voor duizenden. Eten met het team.',
      'Echte autonomie op het menu.',
      'Een biertje na de shift. Soms verdiend.',
    ],
    photos: ['/photos/roles/keuken.webp', null],
  },
};

export const roleOrder: RoleId[] = [
  'horeca',
  'keuken',
  'receptie',
  'housekeeping',
  'techniek',
  'parkshop',
  'zwembad',
  'fun_entertainment',
];
