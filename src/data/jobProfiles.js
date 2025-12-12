const contentTemplates = {
  horeca: {
    title: 'Horeca Medewerker',
    afdeling: 'Hospitality',
    icon: '🍽️',
    description:
      'Bedienen van gasten in restaurants, bars en terrassen. Zorgen voor een gastvrije eet- en drinkervaring.',
    highlights: [
      'Gasten ontvangen',
      'Bestellingen opnemen',
      'Teamspeler',
      'Flexibel',
    ],
  },
  receptie: {
    title: 'Receptie Medewerker',
    afdeling: 'Front Office',
    icon: '🛎️',
    description:
      'Het eerste aanspreekpunt voor gasten. Check-in, check-out en informatievoorziening.',
    highlights: [
      'Gasten inchecken',
      'Vragen beantwoorden',
      'Stressbestendig',
      'Representatief',
    ],
  },
  housekeeping: {
    title: 'Medewerker Housekeeping',
    afdeling: 'Facilitair',
    icon: '🛏️',
    description:
      'Schoonmaken en verzorgen van accommodaties. Zorgen voor een perfect verblijf.',
    highlights: ['Nauwkeurig', 'Zelfstandig', 'Fysiek werk', 'Ochtendmens'],
  },
  techniek: {
    title: 'Technisch Medewerker',
    afdeling: 'Technische Dienst',
    icon: '🔧',
    description:
      'Onderhoud en reparaties aan accommodaties en parkfaciliteiten.',
    highlights: [
      'Technisch inzicht',
      'Probleemoplosser',
      'Proactief',
      'Handige harry',
    ],
  },
  entertainment: {
    title: 'Entertainment & Animatie',
    afdeling: 'Fun & Entertainment',
    icon: '🎭',
    description:
      'Organiseren van activiteiten en entertainment voor gasten van alle leeftijden.',
    highlights: ['Enthousiast', 'Creatief', 'Kindervriend', 'Showman/vrouw'],
  },
  retail: {
    title: 'Retail Medewerker',
    afdeling: 'Retail',
    icon: '🛒',
    description:
      'Werken in de parkwinkel. Verkoop, voorraadbeheer en klantenservice.',
    highlights: ['Klantvriendelijk', 'Netjes', 'Rekenvaardig', 'Teamplayer'],
  },
  zwembad: {
    title: 'Zwembad Medewerker',
    afdeling: 'Zwembad',
    icon: '🏊',
    description: 'Toezicht en onderhoud van zwembad en wellness faciliteiten.',
    highlights: ['Verantwoordelijk', 'Alert', 'EHBO diploma', 'Gastvrij'],
  },
  groen: {
    title: 'Groenvoorziening',
    afdeling: 'Terrein',
    icon: '🌿',
    description: 'Onderhoud van tuinen, parken en groene ruimtes op het park.',
    highlights: [
      'Graag buiten',
      'Fysiek sterk',
      'Groene vingers',
      'Zelfstandig',
    ],
  },
};

export const functiefamilies = Object.entries(contentTemplates).map(
  ([id, data]) => ({ id, ...data })
);
