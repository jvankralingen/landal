import Anthropic from '@anthropic-ai/sdk';
import { vibeConfigs } from '../data/constants';
import { getHighlightsForPark } from '../utils/localization';

// Initialiseer Anthropic client
const getClient = () => {
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('REACT_APP_ANTHROPIC_API_KEY is niet geconfigureerd');
  }
  return new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
};

export const generateAIContent = async (profile, park, customBeschrijving = null) => {
  const vibeConfig = vibeConfigs[park.vibe] || vibeConfigs.natuur;
  const highlights = getHighlightsForPark(park.id, park.vibe);
  const beschrijving = customBeschrijving || profile.description;

  const prompt = `Je bent een HR-specialist die functieprofielen schrijft voor Landal GreenParks vakantieresorts.

BELANGRIJK: Je schrijft een FUNCTIEPROFIEL, geen vacaturetekst. Een functieprofiel beschrijft een rol die op het park bestaat - onafhankelijk van of er momenteel een vacature is. Het is vanuit het perspectief van het park: "deze rol hebben wij, dit is wat iemand in deze rol doet."

FUNCTIE:
- Titel: ${profile.title}
- Beschrijving: ${beschrijving}
- Familie: ${profile.familie || 'Algemeen'}

PARK:
- Naam: ${park.name}
- Sfeer/Vibe: ${vibeConfig.label}
- Land: ${park.countryLabel || 'Nederland'}
- Regio: ${park.regionLabel || ''}

KENMERKEN VAN DIT PARK:
${highlights.map(h => `- ${h}`).join('\n')}

Genereer een FUNCTIEPROFIEL in JSON formaat:

{
  "intro": "Beschrijving van de rol in 2-3 zinnen - wat doet iemand in deze functie en waarom is het belangrijk voor het park",
  "searchVariants": ["3-4 alternatieve benamingen voor deze functie"],
  "roleDescription": "Uitgebreide beschrijving van de rol: wat is de kern van deze functie, welk probleem lost deze persoon op, waarom bestaat deze rol (3-4 zinnen)",
  "dailyTasks": ["5-6 concrete dagelijkse werkzaamheden - specifiek voor dit type park"],
  "responsibilities": ["4-5 verantwoordelijkheden en beslissingsbevoegdheden"],
  "teamDescription": "Beschrijving van het team waarin deze persoon werkt: samenstelling, cultuur, samenwerking (2-3 zinnen)",
  "reportingTo": "Aan wie rapporteert deze functie (functietitel)",
  "growthPath": "Groeimogelijkheden vanuit deze functie binnen Landal (2-3 zinnen)",
  "nextRoles": ["2-3 functies waar je naar kunt doorgroeien"],
  "mustHaves": ["4-5 vereiste competenties/ervaring - wees concreet"],
  "niceToHaves": ["3-4 pre's"],
  "benefits": ["5-6 voordelen van werken in deze functie bij dit park"],
  "salarisindicatie": "Salarisrange voor deze functie (bijv. €2.200 - €2.800 bruto p/m)",
  "niveau": "Ervaringsniveau (bijv. Starter, Medior, Senior)",
  "afdeling": "Afdeling waar deze functie onder valt",
  "highlights": ["4 KORTE highlights (max 3-4 woorden per highlight), bijv: 'Uitzicht op de Veluwe', 'Kleinschalig team', 'Aan het water'"]
}

SCHRIJFREGELS:
- Schrijf vanuit het perspectief van het park ("In deze rol..." / "De ${profile.title} bij ${park.name}...")
- Wees concreet en specifiek - geen vage algemeenheden
- Pas de inhoud aan op de specifieke sfeer van dit park: ${vibeConfig.label}
- De salarisrange moet realistisch zijn voor Nederland
- Focus op wat deze rol uniek maakt op DIT specifieke park
- BELANGRIJK: Highlights moeten KORT zijn (max 3-4 woorden). Niet "Werken in een kleinschalig team waar je persoonlijk wordt gewaardeerd" maar "Kleinschalig team"

Geef ALLEEN de JSON terug, geen markdown of andere tekst.`;

  try {
    const client = getClient();
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = response.content[0].text;
    const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleanedContent);

    return {
      parkId: park.id,
      parkName: park.name,
      vibe: park.vibe,
      regionId: park.regionId,
      countryId: park.countryId,
      functieId: profile.id,
      functionTitle: profile.title,
      title: `${profile.title} bij ${park.name}`,
      ...parsed,
      generated: true,
      aiGenerated: true,
      date: new Date().toLocaleDateString('nl-NL'),
    };
  } catch (error) {
    console.error('AI generation error:', error);
    throw error;
  }
};

// Batch generatie voor meerdere parken met gedetailleerde voortgang
// onProgress: (current, total, parkName, status) => void
// onParkComplete: (parkId, content) => void - wordt aangeroepen zodra een park klaar is
export const generateAIContentBatch = async (profile, parks, onProgress, onParkComplete, customBeschrijving = null) => {
  const results = {};
  let completed = 0;

  for (const park of parks) {
    try {
      // Stap 1: Park kenmerken ophalen
      if (onProgress) {
        onProgress(completed, parks.length, park.name, 'Parkkenmerken ophalen...');
      }
      await sleep(300); // Korte pauze voor UI update

      // Stap 2: Sfeer analyseren
      if (onProgress) {
        onProgress(completed, parks.length, park.name, 'Sfeer en omgeving analyseren...');
      }
      await sleep(300);

      // Stap 3: Profiel genereren met roterende status
      if (onProgress) {
        onProgress(completed, parks.length, park.name, 'Functieprofiel schrijven...');
      }

      // Start status rotatie tijdens het wachten op AI
      const statusInterval = startStatusRotation(onProgress, completed, parks.length, park.name);

      let content;
      try {
        content = await generateAIContent(profile, park, customBeschrijving);
      } finally {
        // Stop de rotatie zodra de AI klaar is
        clearInterval(statusInterval);
      }
      results[park.id] = content;

      // Direct updaten in UI
      if (onParkComplete) {
        onParkComplete(park.id, content);
      }

      // Stap 4: Afgerond
      completed++;
      if (onProgress) {
        onProgress(completed, parks.length, park.name, 'Afgerond');
      }
    } catch (error) {
      console.error(`Failed to generate content for ${park.name}:`, error);
      if (onProgress) {
        onProgress(completed, parks.length, park.name, 'Fallback gebruiken...');
      }
      const fallbackContent = generateFallbackContent(profile, park, customBeschrijving);
      results[park.id] = fallbackContent;

      // Ook fallback direct updaten in UI
      if (onParkComplete) {
        onParkComplete(park.id, fallbackContent);
      }

      completed++;
      if (onProgress) {
        onProgress(completed, parks.length, park.name, 'Afgerond (template)');
      }
    }
  }

  return results;
};

// Helper voor korte pauzes
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Schrijf-statussen die roteren tijdens AI generatie
const writingStatuses = [
  'Functieprofiel schrijven...',
  'Intro formuleren...',
  'Taken beschrijven...',
  'Vereisten opstellen...',
  'Voordelen toevoegen...',
  'Groeimogelijkheden bepalen...',
  'Tekst optimaliseren...',
  'Details verfijnen...',
];

// Start een interval die de status en subProgress update tijdens het wachten
const startStatusRotation = (onProgress, completed, total, parkName) => {
  let index = 0;
  let subProgress = 0;
  const interval = setInterval(() => {
    index = (index + 1) % writingStatuses.length;
    // SubProgress loopt van 0 naar ~0.9 (nooit helemaal vol tot park klaar is)
    subProgress = Math.min(0.9, subProgress + 0.1);
    if (onProgress) {
      onProgress(completed, total, parkName, writingStatuses[index], subProgress);
    }
  }, 2000); // Wissel elke 2 seconden
  return interval;
};

// Fallback naar template-gebaseerde generatie
const generateFallbackContent = (profile, park, customBeschrijving = null) => {
  const vibeConfig = vibeConfigs[park.vibe] || vibeConfigs.natuur;
  const highlights = getHighlightsForPark(park.id, park.vibe);
  const beschrijving = customBeschrijving || profile.description;

  // Bepaal profiel eigenschappen op basis van functietitel
  const titleLower = profile.title.toLowerCase();
  const isManager = titleLower.includes('manager') || titleLower.includes('chef') || titleLower.includes('leidinggevende');
  const isHoreca = titleLower.includes('horeca') || titleLower.includes('kok') || titleLower.includes('bediening') || titleLower.includes('restaurant');
  const isTechnisch = titleLower.includes('technisch') || titleLower.includes('onderhoud') || titleLower.includes('facilitair');
  const isReceptie = titleLower.includes('receptie') || titleLower.includes('gastvrouw') || titleLower.includes('front');
  const isSchoonmaak = titleLower.includes('schoonmaak') || titleLower.includes('housekeeping');

  // Salarisrange bepalen
  let salarisindicatie = '€2.200 - €2.600 bruto p/m';
  let niveau = 'Medior';
  let afdeling = 'Operatie';
  let nextRoles = ['Senior functie', 'Teamleider', 'Assistent manager'];

  if (isManager) {
    salarisindicatie = '€2.800 - €3.600 bruto p/m';
    niveau = 'Senior';
    afdeling = 'Management';
    nextRoles = ['Parkmanager', 'Regiomanager', 'Hoofdkantoor functie'];
  } else if (isHoreca) {
    salarisindicatie = '€2.000 - €2.500 bruto p/m';
    afdeling = 'Food & Beverage';
    nextRoles = ['Sous chef', 'Restaurant manager', 'F&B coördinator'];
  } else if (isTechnisch) {
    salarisindicatie = '€2.400 - €3.000 bruto p/m';
    afdeling = 'Technische dienst';
    nextRoles = ['Hoofd technische dienst', 'Facilitair manager', 'Projectleider'];
  } else if (isReceptie) {
    salarisindicatie = '€2.100 - €2.500 bruto p/m';
    afdeling = 'Front Office';
    nextRoles = ['Senior receptionist', 'Front office manager', 'Guest relations'];
  } else if (isSchoonmaak) {
    salarisindicatie = '€1.900 - €2.300 bruto p/m';
    niveau = 'Starter/Medior';
    afdeling = 'Housekeeping';
    nextRoles = ['Voorvrouw/voorman', 'Housekeeping supervisor', 'Facilitair medewerker'];
  }

  return {
    parkId: park.id,
    parkName: park.name,
    vibe: park.vibe,
    regionId: park.regionId,
    countryId: park.countryId,
    functieId: profile.id,
    functionTitle: profile.title,
    title: `${profile.title} bij ${park.name}`,
    intro: `De ${profile.title.toLowerCase()} speelt een belangrijke rol in de dagelijkse operatie van ${park.name}. ${beschrijving}`,
    searchVariants: [profile.title, `${profile.title} vakantiepark`, `${profile.title} recreatie`, `${profile.title} hospitality`],
    roleDescription: `Bij ${park.name} zorgt de ${profile.title.toLowerCase()} ervoor dat gasten een onvergetelijke ervaring hebben. Deze functie combineert zelfstandig werken met nauwe samenwerking binnen het team. In de ${vibeConfig.label.toLowerCase()} sfeer van dit park staat gastvrijheid centraal.`,
    dailyTasks: [
      'Gasten ontvangen en begeleiden tijdens hun verblijf',
      'Zorgen voor een optimale gastbeleving passend bij de parksfeer',
      'Samenwerken met collega\'s van verschillende afdelingen',
      'Bijdragen aan de dagelijkse operatie van het park',
      'Proactief inspelen op vragen en wensen van gasten',
      'Kwaliteitscontroles uitvoeren binnen je werkgebied'
    ],
    responsibilities: [
      'Verantwoordelijk voor kwaliteit binnen je werkgebied',
      'Zelfstandig prioriteiten stellen en werkzaamheden plannen',
      'Signaleren van verbeterpunten en deze bespreken met je leidinggevende',
      'Bijdragen aan een positieve teamsfeer',
      'Naleven van veiligheids- en kwaliteitsprotocollen'
    ],
    teamDescription: `Je maakt deel uit van een hecht team dat samen werkt aan de beste gastervaring. De sfeer is ${vibeConfig.label.toLowerCase()} en informeel, met korte lijnen naar collega's en leidinggevenden.`,
    reportingTo: isManager ? 'Parkmanager' : 'Afdelingsmanager',
    growthPath: 'Landal biedt diverse mogelijkheden om je te ontwikkelen. Via interne opleidingen en praktijkervaring kun je doorgroeien naar functies met meer verantwoordelijkheid, zowel binnen dit park als op andere locaties.',
    nextRoles,
    mustHaves: [
      'Relevante werkervaring in een vergelijkbare functie',
      'Goede beheersing van de Nederlandse taal',
      'Gastgerichte en servicegerichte instelling',
      'Flexibel en bereid om in weekenden te werken',
      'Zelfstandig kunnen werken én een teamspeler'
    ],
    niceToHaves: [
      'Beheersing van Duits en/of Engels',
      'Ervaring in de recreatie- of hospitalitysector',
      'Rijbewijs B',
      'Affiniteit met de regio'
    ],
    benefits: [
      'Werken in een prachtige omgeving',
      'Korting op verblijven bij alle Landal parken',
      'Informele en collegiale werksfeer',
      'Mogelijkheden voor persoonlijke ontwikkeling',
      'Reiskostenvergoeding',
      'Pensioenregeling'
    ],
    salarisindicatie,
    niveau,
    afdeling,
    highlights,
    generated: true,
    aiGenerated: false,
    date: new Date().toLocaleDateString('nl-NL'),
  };
};

// Check of API key is geconfigureerd
export const isAIAvailable = () => {
  return !!process.env.REACT_APP_ANTHROPIC_API_KEY;
};
