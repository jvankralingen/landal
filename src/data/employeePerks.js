// src/data/employeePerks.js
// Medewerker-perks vanuit het perspectief: "Wat gun je jezelf door hier te werken?"

import { parkDatabase } from './parkData';

// =============================================================================
// HELPER: Zoek park op ID in de geneste parkDatabase structuur
// =============================================================================

const findParkById = (parkId) => {
  for (const country of Object.values(parkDatabase)) {
    for (const region of Object.values(country.regions || {})) {
      const park = region.parks?.find(p => p.id === parkId);
      if (park) {
        return park;
      }
    }
  }
  return null;
};

// =============================================================================
// ROL-SPECIFIEKE PERKS (PRIMAIR)
// Dit zijn de perks die specifiek zijn voor een functie, ongeacht het park
// =============================================================================

export const rolePerks = {
  horeca: {
    tagline: "Waar gasten worden verwend",
    perks: [
      "Proeven van de kaart hoort erbij",
      "Internationale gasten aan je tafels",
      "Fooi in het hoogseizoen",
      "Teamspirit in de piek",
      "Flexibele diensten, vrije ochtenden of avonden",
    ],
  },

  receptie: {
    tagline: "Het visitekaartje van het park",
    perks: [
      "Eerste die de gasten welkom heet",
      "Lokale tips geven die je zelf hebt uitgeprobeerd",
      "Afwisselend: check-ins, telefoontjes, vragen oplossen",
      "Binnen werken met uitzicht op vakantiegangers",
      "Kennis van de hele omgeving opbouwen",
    ],
  },

  housekeeping: {
    tagline: "Zorgen voor de perfecte start",
    perks: [
      "Om 14:00 klaar, rest van de dag vrij",
      "Ochtendmens? Perfect, je begint vroeg",
      "Direct resultaat zien van je werk",
      "Lekker fysiek bezig zijn",
      "Eigen tempo, eigen route",
    ],
  },

  techniek: {
    tagline: "De held achter de schermen",
    perks: [
      "Elke dag een andere klus",
      "Zelfstandig je route bepalen",
      "Van jacuzzi tot verwarming: variatie genoeg",
      "Dankbare gasten als je het probleem oplost",
      "Buiten en binnen werken",
    ],
  },

  entertainment: {
    tagline: "Maak het onvergetelijk",
    perks: [
      "Applaus van je publiek, elke dag",
      "Creativiteit kwijt kunnen in je werk",
      "Van knutselen tot disco: geen dag hetzelfde",
      "Energie van blije kinderen",
      "Zelf de shows bedenken",
    ],
  },

  retail: {
    tagline: "De vakantie compleet maken",
    perks: [
      "Relaxte klanten in vakantiestemming",
      "Geen haast, wel gezelligheid",
      "Lokale producten verkopen",
      "Tips geven over de omgeving",
      "Rustige ochtenden, drukke middagen",
    ],
  },

  zwembad: {
    tagline: "Baas over het water",
    perks: [
      "Hele dag bij het zwembad",
      "Verantwoordelijk voor veiligheid",
      "Kinderen leren zwemmen",
      "Gratis zwemmen na werktijd",
      "Lekker warm werken, ook in de winter",
    ],
  },

  groen: {
    tagline: "Je kantoor is de natuur",
    perks: [
      "Buitenlucht de hele dag",
      "Seizoenen echt zien wisselen",
      "Fysiek werk dat je fit houdt",
      "Rust om je heen, geen kantoorpolitiek",
      "Je eigen stukje park onderhouden",
    ],
  },
};

// =============================================================================
// PARK LIFE PERKS (ALGEMEEN)
// Dit zijn de perks die gelden voor iedereen die bij een vakantiepark werkt
// =============================================================================

export const parkLifePerks = [
  "Werken waar anderen vakantie vieren",
  "Korting op Landal verblijven",
  "Nooit in de file naar je werk",
  "Collega's die ook van buiten zijn houden",
  "Seizoensgebonden werk: rust in de winter, actie in de zomer",
];

// =============================================================================
// PARK-SPECIFIEKE PERKS
// Unieke voordelen die alleen voor bepaalde parken gelden
// =============================================================================

export const parkSpecificPerks = {
  // === PRETPARK/ATTRACTIE PARKEN ===
  twin_lakes: {
    perks: [
      "Gratis toegang tot het attractiepark",
      "Achtbaan in je lunchpauze",
    ],
    highlight: "Werk naast een attractiepark",
  },
  marwell_resort: {
    perks: [
      "Giraffen en leeuwen als buren",
      "Gratis toegang tot de dierentuin",
    ],
    highlight: "Je collega's lopen op vier poten",
  },
  kaatsheuvel: {
    perks: [
      "In de schaduw van de Efteling",
      "Gasten vol sprookjesverhalen",
    ],
    highlight: "Magie om de hoek",
  },

  // === STRAND/KUST PARKEN ===
  scheveningen: {
    perks: [
      "Strandwandeling in je lunchpauze",
      "Pier en boulevard om de hoek",
    ],
    highlight: "Werken op het bekendste strand van Nederland",
  },
  beach_resort_brouwersdam: {
    perks: [
      "Kitesurfen na je shift",
      "Midden in de watersport community",
    ],
    highlight: "Mekka voor watersporters",
  },
  beach_park_texel: {
    perks: [
      "Met de boot naar je werk",
      "Eilandleven zonder vakantiedagen",
    ],
    highlight: "Eilandleven op z'n best",
  },
  west_terschelling: {
    perks: [
      "Wonen en werken op een Waddeneiland",
      "Oerol-festival in je achtertuin",
    ],
    highlight: "Het echte eilandgevoel",
  },
  ameland_state: {
    perks: [
      "Wadlopen in je vrije tijd",
      "Fietsen zonder verkeerslichten",
    ],
    highlight: "Rust, ruimte, en zee",
  },

  // === GROTE PARKEN MET VEEL FACILITEITEN ===
  hof_van_saksen: {
    perks: [
      "Grootste waterpark van Noord-Nederland",
      "Mega team, altijd gezelligheid",
    ],
    highlight: "Het grootste Landal park",
  },
  veluwemeer: {
    perks: [
      "Eigen jachthaven",
      "Waterskibaan in de achtertuin",
    ],
    highlight: "Alles draait om water",
  },

  // === VELUWE PARKEN ===
  miggelenberg: {
    perks: [
      "Mountainbikeroutes starten bij het park",
      "Herten spotten op weg naar je werk",
    ],
    highlight: "Hart van de Veluwe",
  },
  coldenhove: {
    perks: [
      "Boswandeling in je pauze",
      "Grootste zomerkamp-sfeer",
    ],
    highlight: "Klassiek Veluwepark",
  },
  rabbit_hill: {
    perks: [
      "Konijnen en reeën als collega's",
      "Diep in het bos verstopt",
    ],
    highlight: "Natuur tot aan de voordeur",
  },

  // === BUITENLANDSE PARKEN ===
  // Oostenrijk
  dachstein: {
    perks: [
      "Skiën in je vrije tijd",
      "Alpen als uitzicht vanaf je werk",
    ],
    highlight: "Werken met bergzicht",
    buitenland: true,
  },
  katschberg: {
    perks: [
      "Ski-in ski-out werkplek",
      "Après-ski met je collega's",
    ],
    highlight: "Wintersport als lifestyle",
    buitenland: true,
  },
  hochmontafon: {
    perks: [
      "Hoogste werkplek van Landal",
      "Sneeuwgarantie tot in het voorjaar",
    ],
    highlight: "Werken op de top",
    buitenland: true,
  },

  // Duitsland
  winterberg: {
    perks: [
      "Wintersport om de hoek",
      "Rodelen na je shift",
    ],
    highlight: "Wintersport zonder ver te reizen",
    buitenland: true,
  },
  mont_royal: {
    perks: [
      "Wijn proeven aan de Moezel",
      "Kastelen en wijngaarden",
    ],
    highlight: "Werken in wijngebied",
    buitenland: true,
  },

  // België
  village_les_gottales: {
    perks: [
      "Ardennen als speeltuin",
      "Mountainbiken, kajakken, klimmen",
    ],
    highlight: "Avontuur in de Ardennen",
    buitenland: true,
  },

  // UK
  gwel_an_mor: {
    perks: [
      "Werken in Cornwall",
      "Engels verbeteren on the job",
    ],
    highlight: "Premium hospitality in Engeland",
    buitenland: true,
  },
};

// =============================================================================
// HOOFD FUNCTIE
// Haalt de juiste perks op: park-specifiek (uit parkData) + rol-specifiek
// =============================================================================

export const getEmployeePerks = (parkId, vibe, functieId) => {
  // Haal rol-specifieke perks op
  const role = rolePerks[functieId] || rolePerks.horeca;

  // Zoek het park in parkData voor de employeePerks
  const park = findParkById(parkId);
  const parkPerks = park?.employeePerks || [];

  // Check ook of er een legacy entry is in parkSpecificPerks (voor highlight/buitenland)
  const legacyPerks = parkSpecificPerks[parkId];

  if (parkPerks.length > 0) {
    // Park heeft employeePerks in parkData: combineer met rol-perks
    return {
      perks: [
        ...parkPerks.slice(0, 2),                 // 2 park-specifieke uit parkData
        ...role.perks.slice(0, 2),                // 2 rol-specifieke
      ],
      highlight: legacyPerks?.highlight || null,
      isBuitenland: legacyPerks?.buitenland || false,
      roleTagline: role.tagline,
    };
  }

  // Fallback: alleen rol-perks + 1 park life perk
  return {
    perks: [
      ...role.perks.slice(0, 3),                  // 3 rol-specifieke
      parkLifePerks[0],                           // 1 algemene park life
    ],
    highlight: null,
    isBuitenland: false,
    roleTagline: role.tagline,
  };
};
