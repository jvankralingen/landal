import type { CollageTile, CountryKey, WorldDef, WorldId } from '../types';
import { resolveImageUrl } from '../lib/imageUrl';

// Photo ID helper: pure numeric → Pexels, alphanumeric → Unsplash, http → URL.
// Backgrounds use width 1400, collage tiles 700.
const u = (id: string) => resolveImageUrl(id, 1400);
const tile = (id: string) => resolveImageUrl(id, 700);

export interface WorldDefExtended extends WorldDef {
  backgroundsByCountry?: Partial<Record<CountryKey, string[]>>;
}

// A loose 5-tile Pinterest-style constellation for the right side of the stage.
// Slots: place (wide landscape, anchors the cluster), human (portrait),
// work (portrait), detail (small square), sign (small extra).
type TileInput = {
  src: string;
  aspect: CollageTile['aspect'];
};

// Hero in the centre-right of the canvas, four smaller orbits around it.
// Slot 0 = role hero, 1 = selected park, 2-3 = adjacent parks (Landal CDN),
// 4 = world vibe photo (Pexels). Three of the four orbits are now verified
// Landal imagery; only slot 4 carries the generic-stock-photo risk.
const cardPattern = [
  'var(--accent)',     // role hero
  'var(--highlight)',  // selected park
  '#fffae9',           // adjacent park
  'var(--accent)',     // adjacent park
  '#fffae9',           // vibe accent
];

function constellation(items: [TileInput, TileInput, TileInput, TileInput, TileInput]): CollageTile[] {
  // Park photos are 3:1 landscape from Landal CDN, so all park slots get
  // landscape-friendly aspect ratios. Only the role hero stays portrait.
  const positions: Omit<CollageTile, 'src' | 'aspect' | 'cardBg'>[] = [
    { top: '14%', right: '10%', width: 340, ratio: '4/5', rotate: -2, z: 3 },  // 0 · role hero (portrait)
    { top: '4%', right: '32%', width: 230, ratio: '3/2', rotate: 4, z: 2 },    // 1 · selected park (wide landscape)
    { top: '6%', right: '3%', width: 170, ratio: '3/2', rotate: 5, z: 2 },     // 2 · adjacent park
    { top: '58%', right: '28%', width: 200, ratio: '4/3', rotate: 3, z: 1 },   // 3 · adjacent park
    { top: '54%', right: '3%', width: 130, ratio: '1/1', rotate: -6, z: 1 },   // 4 · vibe accent (square)
  ];
  return items.map((it, i) => ({
    ...positions[i],
    src: tile(it.src),
    aspect: it.aspect,
    cardBg: cardPattern[i],
  }));
}

export const worlds: Record<WorldId, WorldDefExtended> = {
  forest: {
    id: 'forest',
    label: 'Bos',
    status: 'deep',
    backgrounds: [
      u('1448375240586-882707db888b'),
      u('1473773508845-188df298d2d1'),
      u('1500382017468-9049fed747ef'),
      u('1542202229-7d93c33f5d07'),
    ],
    backgroundsByCountry: {
      nederland: [
        u('1448375240586-882707db888b'),
        u('1473773508845-188df298d2d1'),
        u('1500382017468-9049fed747ef'),
        u('1542202229-7d93c33f5d07'),
        u('1518173946687-a4c8892bbd9f'),
      ],
    },
    // Pexels Veluwe + NL bos · herkenbaar bos / heide. Slots 2/3 overridden.
    collage: constellation([
      { src: '33287267', aspect: 'place' },  // Pexels: red deer in dense forest (Veluwe)
      { src: '9481036', aspect: 'human' },   // Pexels: purple heather field
      { src: '11885758', aspect: 'work' },   // (overridden by role)
      { src: '36345091', aspect: 'detail' }, // Pexels: person walking autumn path with railings
      { src: '36414122', aspect: 'sign' },   // Pexels: sunny bos met hoge bomen Enschede
    ]),
    headlines: [
      'Het bos kent geen zaterdag.',
      'Mooi kantoor.\nLange dagen.',
      'Stille bomen.\nDrukke uren.',
      'Zij komen om werk te vergeten.\nJij komt om het te doen.',
    ],
    intro:
      'De Veluwe heeft zijn eigen klok. Gasten komen op vrijdag, gaan op maandag. Jij houdt het ritme er tussenin.',
    font: {
      headline: '"PP Hatton", "Playfair Display", Georgia, serif',
      body: '"Inter", system-ui, sans-serif',
    },
    audioSrc: undefined,
  },

  coast: {
    id: 'coast',
    label: 'Kust',
    status: 'sketch',
    backgrounds: [u('1473093226795-af9932fe5856')],
    backgroundsByCountry: {
      nederland: [
        u('1473093226795-af9932fe5856'),
        u('1518173946687-a4c8892bbd9f'),
        u('1505236858219-8359eb29e329'),
      ],
    },
    // Pexels NL kust · beach huts, Scheveningen, Den Haag, Ouddorp.
    collage: constellation([
      { src: '33529164', aspect: 'place' },   // Pexels: row of beach huts Noordwijk
      { src: '34039273', aspect: 'human' },   // Pexels: sunny Scheveningen beach day
      { src: '36835155', aspect: 'work' },    // (overridden by role)
      { src: '31556731', aspect: 'detail' },  // Pexels: beach house in tall dry grass Ouddorp
      { src: '17814625', aspect: 'sign' },    // Pexels: seascape sunset golden hour
    ]),
    headlines: [
      'De zee is je uitzicht.\nNiet je pauze.',
      'Zand in je schoenen.\nZand in je diensten.',
      'Toeristen komen voor een week.\nJij voor het seizoen.',
    ],
    intro:
      'Tij, wind en weekend-wissels. De zee bepaalt het schema. Jij houdt het bij.',
    font: {
      headline: '"PP Hatton", "Playfair Display", Georgia, serif',
      body: '"Inter", system-ui, sans-serif',
    },
    audioSrc: undefined,
  },

  meer: {
    id: 'meer',
    label: 'Meer',
    status: 'sketch',
    backgrounds: [u('1502082553048-f009c37129b9')],
    // Pexels Friese meren · lake/inland water vibe. Slots 0–3 overridden.
    collage: constellation([
      { src: '1502082553048-f009c37129b9', aspect: 'place' },
      { src: '1469854523086-cc02fe5d8800', aspect: 'human' },
      { src: '1559827260-dc66d52bef19', aspect: 'work' },
      { src: '1473773508845-188df298d2d1', aspect: 'detail' },
      { src: '32568296', aspect: 'sign' },   // Pexels: pier overlooking calm water
    ]),
    headlines: [
      'Stil water.\nDruk seizoen.',
      'Het meer ademt anders\ndan de zee.',
      'Boten in, boten uit.\nJij houdt de wal op orde.',
    ],
    intro:
      'Stil water, druk seizoen. Als de boten varen, vaart het tempo mee. Jij staat aan de wal.',
    font: {
      headline: '"PP Hatton", "Playfair Display", Georgia, serif',
      body: '"Inter", system-ui, sans-serif',
    },
    audioSrc: undefined,
  },

  wadden: {
    id: 'wadden',
    label: 'Wadden',
    status: 'sketch',
    backgrounds: [u('1559827260-dc66d52bef19')],
    backgroundsByCountry: {
      nederland: [
        u('1502082553048-f009c37129b9'),
        u('1469854523086-cc02fe5d8800'),
      ],
    },
    // Pexels Wadden · sheep marshes, Wadden walks, Wierum church, Friesland.
    collage: constellation([
      { src: '30691932', aspect: 'place' },   // Pexels: sheep in coastal marshes
      { src: '32797244', aspect: 'human' },   // Pexels: man walking dog along Waddenzee
      { src: '32568297', aspect: 'work' },    // (overridden by role)
      { src: '34596642', aspect: 'detail' },  // Pexels: Friesland beach with seagrass markers
      { src: '32568296', aspect: 'sign' },    // Pexels: pier overlooking Waddenzee
    ]),
    headlines: [
      'Als de laatste boot vertrekt,\nbegint jouw dienst.',
      'Jij woont\nwaar zij weggaan.',
      'Het eiland sluit niet.\nJij ook niet.',
    ],
    intro:
      'Als de laatste boot vertrekt, wordt het eiland stil. Het werk niet.',
    font: {
      headline: '"PP Hatton", "Playfair Display", Georgia, serif',
      body: '"Inter", system-ui, sans-serif',
    },
    audioSrc: undefined,
  },

  family: {
    id: 'family',
    label: 'Familie',
    status: 'sketch',
    backgrounds: [u('1530549387789-4c1017266635')],
    // Pexels NL familie · cycling Haarlem, family beach, Amsterdam, ice cream park.
    collage: constellation([
      { src: '31125245', aspect: 'place' },   // Pexels: father + child cycling Haarlem
      { src: '21525765', aspect: 'human' },   // Pexels: family at the beach
      { src: '33543020', aspect: 'work' },    // (overridden by role)
      { src: '30445491', aspect: 'detail' },  // Pexels: family cycling Amsterdam streets
      { src: '37228702', aspect: 'sign' },    // Pexels: Dutch house with blooming trees
    ]),
    headlines: [
      'Driehonderd kinderen. Eén zwembad.\nJouw dienst.',
      'Het is hún vakantie.\nNiet die van jou.',
      'Als het luid is,\ndan werkt het.',
    ],
    intro:
      'Driehonderd kinderen, één zwembad, één pizza-oven. Het lawaai ÍS het werk.',
    font: {
      headline: '"PP Hatton", "Playfair Display", Georgia, serif',
      body: '"Inter", system-ui, sans-serif',
    },
    audioSrc: undefined,
  },

  premium: {
    id: 'premium',
    label: 'Premium',
    status: 'sketch',
    backgrounds: [
      u('1542718610-a1d656d1884c'),
      u('1551776235-dde6d482980b'),
    ],
    // Premium · refined scandi-luxe (no specific NL search). Mix sauna + alps shots.
    collage: constellation([
      { src: '36420271', aspect: 'place' },   // Pexels: luxe indoor sauna Scandinavian
      { src: '31092918', aspect: 'human' },   // Pexels: sauna with snowy outdoor views
      { src: '34097633', aspect: 'work' },    // (overridden by role)
      { src: '28553900', aspect: 'detail' },  // Pexels: panoramic sunrise Bavarian Alps
      { src: '33891531', aspect: 'sign' },    // Pexels: aerial Bavaria lush + mountains
    ]),
    headlines: [
      'Hun verwachtingen\nkennen geen vrije dag.',
      'Jij bepaalt de standaard.\nZe merken het als je faalt.',
      'Perfectie bij elke check-in.\nPerfectie bij elke turn-down.',
    ],
    intro:
      'Elk detail wordt gezien. Elke dienst is rustig aan de oppervlakte, druk eronder.',
    font: {
      headline: '"PP Hatton", "Playfair Display", Georgia, serif',
      body: '"Inter", system-ui, sans-serif',
    },
    audioSrc: undefined,
  },

  wellness: {
    id: 'wellness',
    label: 'Wellness',
    status: 'sketch',
    backgrounds: [
      u('1540555700478-4be289fbecef'),
      u('1571902943202-507ec2618e8f'),
    ],
    // Pexels NL sauna · sauna interieurs, wellness retreats.
    collage: constellation([
      { src: '36420271', aspect: 'place' },   // Pexels: luxe indoor sauna Scandinavian
      { src: '34097635', aspect: 'human' },   // Pexels: relaxing woman in modern sauna
      { src: '31092918', aspect: 'work' },    // (overridden by role)
      { src: '34097633', aspect: 'detail' },  // Pexels: outdoor sauna serene views
      { src: '32504774', aspect: 'sign' },    // Pexels: Scandinavian sauna cabin evening
    ]),
    headlines: [
      'Zij komen om los te laten.\nJij blijft aan.',
      'Stille ruimtes.\nLange dagen.',
      'Bewaar de rust.\nOok als die niet de jouwe is.',
    ],
    intro:
      'Jij houdt de rust vast terwijl zij zich loslaten. De truc is dat de jouwe blijft.',
    font: {
      headline: '"PP Hatton", "Playfair Display", Georgia, serif',
      body: '"Inter", system-ui, sans-serif',
    },
    audioSrc: undefined,
  },

  mountain: {
    id: 'mountain',
    label: 'Bergen',
    status: 'sketch',
    backgrounds: [
      u('1551524559-8af4e6624178'),
      u('1531366936337-7c912a4589a7'),
    ],
    // Pexels Alpen · Bavarian + Austrian Alps, snow peaks, alpine villages.
    collage: constellation([
      { src: '31784860', aspect: 'place' },   // Pexels: snow-covered Salzburg Alps
      { src: '33891531', aspect: 'human' },   // Pexels: aerial Bavarian green + mountains
      { src: '28553900', aspect: 'work' },    // (overridden by role)
      { src: '32341404', aspect: 'detail' },  // Pexels: snowy Alps with moon
      { src: '33646279', aspect: 'sign' },    // Pexels: Bavarian Alps Samerberg blue sky
    ]),
    headlines: [
      'Zij komen om te skiën.\nJij kwam om te werken.',
      'Het uitzicht\nbetaalt zichzelf niet.',
      'Onder nul.\nBoven verwachting.',
    ],
    intro:
      'Sneeuw, zon, hoogte. Drie soorten weer in één ochtend. Lagen aan en aan de slag.',
    font: {
      headline: '"Inter", system-ui, sans-serif',
      body: '"Inter", system-ui, sans-serif',
    },
    audioSrc: undefined,
  },

  uk: {
    id: 'uk',
    label: 'Verenigd Koninkrijk',
    status: 'sketch',
    backgrounds: [
      u('1471919743851-c4df8b6ee133'),
      u('1517137744086-08b96ae2af04'),
    ],
    // Pexels UK nature · country lanes, cottages, riverbanks, English landscapes.
    collage: constellation([
      { src: '35728980', aspect: 'place' },   // Pexels: rustic seaside cottage, dramatic sky
      { src: '35749463', aspect: 'human' },   // Pexels: serene country lane winter English terrain
      { src: '35749435', aspect: 'work' },    // (overridden by role)
      { src: '9685756', aspect: 'detail' },   // Pexels: grassy riverbank water reflection
      { src: '8567865', aspect: 'sign' },     // Pexels: coastal seascape remote
    ]),
    headlines: [
      'Hun weekend.\nJouw werk.',
      'Britse beleefdheid\nop de drukste dag.',
      'Regen annuleert\nde dienst niet.',
    ],
    intro:
      'Regen of zon, de waterkoker staat aan en de kamers worden schoongemaakt. Beleefdheid is je uniform.',
    font: {
      headline: '"PP Hatton", "Playfair Display", Georgia, serif',
      body: '"Inter", system-ui, sans-serif',
    },
    audioSrc: undefined,
  },
};

export const worldOrder: WorldId[] = [
  'forest',
  'coast',
  'meer',
  'wadden',
  'family',
  'premium',
  'wellness',
  'mountain',
  'uk',
];

export function resolveBackgrounds(
  world: WorldDefExtended,
  country?: CountryKey
): string[] {
  if (country && world.backgroundsByCountry?.[country]?.length) {
    return world.backgroundsByCountry[country]!;
  }
  return world.backgrounds;
}
