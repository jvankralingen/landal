# Plan: Drie-dimensionale EVP Content Generator

## Concept

De content generator combineert drie dimensies om een unieke "waarom werken bij dit park" pitch te creëren:

```
[Functiefamilie] × [Contracttype] × [Park Vibe + Perks] = Gepersonaliseerde EVP
```

---

## De Drie Dimensies

### 1. Functiefamilie (Rol-perspectief)

Elke functie heeft andere aspecten van "park life" die relevant zijn:

| Functie | Relevante park-aspecten | USP's |
|---------|------------------------|-------|
| **Horeca** | Gasten, drukte, sfeer | Internationale gasten, seizoenspiek, teamwork |
| **Groen** | Natuur, buitenwerk, terrein | Werken in de natuur, fysiek actief, seizoenen zien wisselen |
| **Techniek** | Accommodaties, variatie | Zelfstandigheid, diverse klussen, direct resultaat zien |
| **Receptie** | Gasten, lokale kennis | Eerste indruk maken, mensen helpen, lokale tips delen |
| **Housekeeping** | Accommodaties, kwaliteit | Tevreden gasten, schone start, team spirit |
| **Animatie** | Activiteiten, kinderen | Creativiteit, energie, blije gezichten |
| **Retail** | Winkel, gasten | Vakantiesfeer, relaxte klanten, gezelligheid |

### 2. Contracttype (Levensfase-perspectief)

| Type | Doelgroep | Kernboodschap | Tone of voice |
|------|-----------|---------------|---------------|
| **Stage** | MBO/HBO studenten | Leren in de praktijk, begeleiding, cv-builder | Leerzaam, begeleid, kans |
| **Seizoen** | Studenten, avonturiers | Intens, sociaal, zomerverhaal | Avontuur, vrienden, ervaring |
| **Bijbaan** | Scholieren, studenten | Flexibel, combineerbaar, leuk | Chill, flexibel, verdienen |
| **Vast** | Carrière-zoekers | Doorgroeien, zekerheid, bouwen | Stabiel, groeien, team |

### 3. Park Eigenschappen

#### A. Park Vibe (bestaand)
- `luxe` → Premium service, high-end gasten
- `kinderen` → Energie, families, activiteiten
- `natuur` → Rust, wildlife, buitenleven
- `strand` → Zee, zand, watersport
- `actief` → Sport, avontuur, beweging
- `wellness` → Ontspanning, spa, rust
- `familie` → Gezelligheid, drukte, diversiteit
- `watersport` → Water, boten, vissen

#### B. Park-specifieke Perks (nieuw!)
Unieke voordelen per park die we kunnen uitlichten:

```javascript
parkPerks: {
  twin_lakes: ['gratis_pretpark', 'korting_attracties'],
  marwell_resort: ['gratis_dierentuin', 'wildlife_ervaring'],
  scheveningen: ['strand_pauze', 'surfen', 'zonsondergang'],
  hof_van_saksen: ['mega_faciliteiten', 'groot_team', 'doorgroeikansen'],
  // etc.
}
```

---

## Implementatie

### Stap 1: Data Uitbreiding

**A. Nieuwe file: `src/data/evpContent.js`**

```javascript
// Rol-specifieke content
export const roleContent = {
  horeca: {
    tagline: "Waar gasten worden verwend",
    highlights: [
      "Internationale gasten ontmoeten",
      "Werken in vakantiesfeer",
      "Teamwork in de piek"
    ],
    parkVibeMatch: {
      luxe: "Serveer in een premium omgeving waar gasten het beste verwachten",
      kinderen: "Maak families blij met een lekker ontbijtje of ijsje aan het zwembad",
      strand: "Terras met zeezicht - je werkplek is andermans vakantiedroom"
    }
  },
  groen: {
    tagline: "Waar natuur je kantoor is",
    highlights: [
      "Elke dag buiten werken",
      "Seizoenen zien wisselen",
      "Direct resultaat van je werk"
    ],
    parkVibeMatch: {
      natuur: "Onderhoud de mooiste bossen en heidevelden van Nederland",
      strand: "Werk tussen de duinen met zeelucht in je longen",
      luxe: "Houd de tuinen er piekfijn bij voor veeleisende gasten"
    }
  },
  // ... etc voor andere rollen
};

// Contract-specifieke content
export const contractContent = {
  stage: {
    tagline: "Leer waar anderen vakantie vieren",
    angle: "praktijkervaring",
    highlights: [
      "Begeleiding door ervaren collega's",
      "Theorie in praktijk brengen",
      "Netwerk opbouwen in hospitality"
    ],
    cta: "Start je carrière op een plek die je nooit vergeet"
  },
  seizoen: {
    tagline: "Een zomer om nooit te vergeten",
    angle: "avontuur",
    highlights: [
      "Intense teamband",
      "Zomerverhalen voor later",
      "Werken waar je ook kunt genieten"
    ],
    cta: "Maak van deze zomer het beste verhaal"
  },
  bijbaan: {
    tagline: "Verdienen in vakantiesfeer",
    angle: "flexibiliteit",
    highlights: [
      "Flexibele roosters",
      "Combineer met studie",
      "Relaxte werksfeer"
    ],
    cta: "Werk wanneer het jou uitkomt"
  },
  vast: {
    tagline: "Bouw mee aan de vakantie van morgen",
    angle: "carrière",
    highlights: [
      "Doorgroeimogelijkheden",
      "Vast team, vaste collega's",
      "Investering in jouw ontwikkeling"
    ],
    cta: "Groei met ons mee"
  }
};

// Park-specifieke perks
export const parkPerks = {
  // Pretpark/attractie parken
  twin_lakes: {
    perks: ['Gratis toegang attractiepark', 'Korting voor familie'],
    highlight: "Werk naast een attractiepark en spring er na je shift zo in"
  },
  marwell_resort: {
    perks: ['Gratis toegang dierentuin', 'Wildlife op je werk'],
    highlight: "Je collega's? Giraffen, leeuwen en je team"
  },
  kaatsheuvel: {
    perks: ['Nabij Efteling', 'Magische omgeving'],
    highlight: "Werk in de schaduw van het sprookjesbos"
  },

  // Strand/kust parken
  scheveningen: {
    perks: ['Strand in je pauze', 'Zonsondergangen', 'Watersport korting'],
    highlight: "Je lunchpauze op het strand - elke dag"
  },
  beach_resort_brouwersdam: {
    perks: ['Kitesurfen', 'Beachclub', 'Watersport paradise'],
    highlight: "Werk op Europas beste kitespot"
  },
  texel: {
    perks: ['Eilandleven', 'Natuur', 'Bootje naar werk'],
    highlight: "Werk op een eiland waar anderen vakantie vieren"
  },

  // Grote parken met veel faciliteiten
  hof_van_saksen: {
    perks: ['Mega faciliteiten', 'Groot team', 'Veel doorgroeikansen'],
    highlight: "Ons grootste park met de meeste mogelijkheden"
  },
  duinrell: {
    perks: ['Tikibad', 'Attractiepark', 'Attracties na werktijd'],
    highlight: "Werk bij een van Nederlands bekendste vakantieparken"
  },

  // Luxe parken
  gwel_an_mor: {
    perks: ['Spa toegang', 'Premium omgeving', 'High-end hospitality'],
    highlight: "Leer werken op het hoogste niveau"
  },

  // Natuur parken
  veluwe_parken: { // template voor meerdere parken
    perks: ['Mountainbiken', 'Wildlife spotten', 'Boslucht'],
    highlight: "Je kantoor? De mooiste natuur van Nederland"
  }
};
```

### Stap 2: Content Generator Logica

**In `src/utils/generateEVPContent.js`**

```javascript
export const generateEVPContent = (park, role, contractType) => {
  const parkData = getParkData(park.id);
  const roleData = roleContent[role];
  const contractData = contractContent[contractType];
  const perks = parkPerks[park.id] || getVibePerks(park.vibe);

  return {
    // Hoofdboodschap combineert alle drie
    headline: generateHeadline(park, role, contractType),

    // Rol-specifieke content afgestemd op park vibe
    roleStory: roleData.parkVibeMatch[park.vibe] || roleData.tagline,

    // Contract-specifieke angle
    contractAngle: contractData.angle,
    contractHighlights: contractData.highlights,

    // Park-specifieke voordelen
    parkPerks: perks.perks,
    parkHighlight: perks.highlight,

    // Call to action
    cta: contractData.cta
  };
};

// Voorbeeld output:
// Park: Beach Resort Brouwersdam
// Rol: Horeca
// Contract: Seizoen
//
// → Headline: "Serveer met zeezicht - jouw zomer aan de Brouwersdam"
// → Role story: "Terras met zeezicht - je werkplek is andermans vakantiedroom"
// → Contract angle: "avontuur"
// → Park perks: ["Kitesurfen", "Beachclub", "Watersport paradise"]
// → Park highlight: "Werk op Europas beste kitespot"
// → CTA: "Maak van deze zomer het beste verhaal"
```

### Stap 3: UI Aanpassingen

**Preview Modal uitbreiden met:**

1. **Rol-selector** (naast park selector)
2. **Contract-type selector** (stage/seizoen/bijbaan/vast)
3. **Preview past zich dynamisch aan** op basis van alle drie selecties

```
┌─────────────────────────────────────────────────┐
│  Genereer Vacaturetekst                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  Park:     [Beach Resort Brouwersdam ▼]         │
│  Functie:  [Horeca ▼]                           │
│  Contract: [○ Stage ○ Seizoen ● Bijbaan ○ Vast] │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │ [Afbeelding: Brouwersdam strand]        │    │
│  │                                         │    │
│  │ SERVEER MET ZEEZICHT                    │    │
│  │ Jouw bijbaan aan de Brouwersdam         │    │
│  │                                         │    │
│  │ "Terras met zeezicht - je werkplek      │    │
│  │  is andermans vakantiedroom"            │    │
│  │                                         │    │
│  │ ✓ Kitesurfen na je shift                │    │
│  │ ✓ Flexibele roosters                    │    │
│  │ ✓ Werken in vakantiesfeer              │    │
│  │                                         │    │
│  │ [Werk wanneer het jou uitkomt →]        │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Fasering

### Fase 1: Data Foundation
- [ ] Maak `evpContent.js` met role/contract content
- [ ] Voeg parkPerks toe voor ~20 key parken
- [ ] Koppel vibe-based fallbacks voor parken zonder specifieke perks

### Fase 2: Generator Logic
- [ ] Bouw `generateEVPContent()` utility
- [ ] Maak headline generator die alle dimensies combineert
- [ ] Test met verschillende combinaties

### Fase 3: UI Integration
- [ ] Voeg rol-selector toe aan App.js
- [ ] Voeg contract-type selector toe
- [ ] Update PreviewModal om nieuwe content te tonen

### Fase 4: Content Refinement
- [ ] Schrijf specifieke content voor alle functie/vibe combinaties
- [ ] Voeg meer park-specifieke perks toe
- [ ] A/B test verschillende headlines

---

## Voorbeeld Outputs

### Voorbeeld 1: Horeca + Seizoen + Strand park
```
SERVEER MET ZEEZICHT
Jouw zomer aan zee

Terras met zeezicht - je werkplek is andermans vakantiedroom

✓ Internationale gasten ontmoeten
✓ Intense teamband
✓ Strand in je pauze

"Maak van deze zomer het beste verhaal"
```

### Voorbeeld 2: Groen + Vast + Natuur park
```
JOUW KANTOOR? DE VELUWE
Bouw mee aan de mooiste natuur

Onderhoud de mooiste bossen en heidevelden van Nederland

✓ Elke dag buiten werken
✓ Doorgroeimogelijkheden
✓ Mountainbiken na werktijd

"Groei met ons mee"
```

### Voorbeeld 3: Receptie + Stage + Luxe park
```
LEER VAN DE BESTE GASTEN
Jouw stage in premium hospitality

Eerste indruk maken bij gasten die het beste verwachten

✓ Begeleiding door ervaren collega's
✓ Spa toegang
✓ High-end hospitality ervaring

"Start je carrière op een plek die je nooit vergeet"
```

---

## Vraag aan jou

1. **Klopt deze richting met jouw visie?**
2. **Welke parken hebben de meest unieke perks die we moeten uitlichten?**
3. **Zijn er nog contracttypes of rollen die ik mis?**
4. **Wil je dat ik begin met Fase 1?**
