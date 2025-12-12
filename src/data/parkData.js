// src/data/parkData.js

import { parkImageUrls } from './parkImageUrls';

export const parkDatabase = {
  nederland: {
    label: 'Nederland',
    regions: {
      gelderland: {
        label: 'Gelderland / Veluwe',
        parks: [
          {
            id: 'schaapskooi',
            name: 'Bospark De Schaapskooi',
            vibe: 'natuur',
            tags: ['kleinschalig', 'persoonlijk', 'rust'],
            employeePerks: [
              'Klein team waar iedereen elkaar kent',
              'Rustige werksfeer midden in het bos',
              'Persoonlijk contact met vaste gasten',
            ],
          },
          {
            id: 'hoenderloo',
            name: 'Bungalowpark Hoenderloo',
            vibe: 'natuur',
            tags: ['bosrijk', 'fysiek werk', 'groen'],
            employeePerks: [
              'Nationaal Park de Hoge Veluwe om de hoek',
              'Kröller-Müller Museum in je pauze',
              'Werken in het hart van de Veluwe',
            ],
          },
          {
            id: 'cuber_veluwe',
            name: 'Cuber Veluwe',
            vibe: 'luxe',
            tags: ['high-tech', 'suites', 'privacy', 'app-service'],
            employeePerks: [
              'Werken met de nieuwste smart home technologie',
              'High-end hospitality ervaring opdoen',
              'Kleinschalig en exclusief concept',
            ],
          },
          {
            id: 'coldenhove',
            name: 'Coldenhove',
            vibe: 'familie',
            tags: ['camping', 'zomer drukte', 'groot'],
            employeePerks: [
              'Groot team met zomerkamp-sfeer',
              'Veel doorgroeimogelijkheden',
              'Boswandeling in je pauze',
            ],
          },
          {
            id: 'hoevegaerde',
            name: 'De Veluwse Hoevegaerde',
            vibe: 'familie',
            tags: ['vlak terrein', 'vijvers', 'gemoedelijk', 'vaste gasten'],
            employeePerks: [
              'Gemoedelijke sfeer met trouwe gasten',
              'Vlak terrein, makkelijk fietsen',
              'Vijvers en groen om je heen',
            ],
          },
          {
            id: 'vlinderhoeve',
            name: 'De Vlinderhoeve',
            vibe: 'natuur',
            tags: ['rustig', 'groenonderhoud', 'kringen'],
            employeePerks: [
              'Intieme werksfeer in de natuur',
              'Rustig park, relaxte gasten',
              'Vlinders en natuur om je heen',
            ],
          },
          {
            id: 'heideheuvel',
            name: 'Heideheuvel',
            vibe: 'actief',
            tags: ['heuvelachtig', 'trappenlopen', 'kuitspieroefening'],
            employeePerks: [
              'Uitzicht over de heidevelden',
              'Sportieve omgeving, fit blijven',
              'Mountainbikeroutes vanaf het park',
            ],
          },
          {
            id: 'heihaas',
            name: 'Heihaas',
            vibe: 'familie',
            tags: ['dorp', 'compact', 'hecht team'],
            employeePerks: [
              'Compact park, korte lijntjes',
              'Hecht team als kleine familie',
              'Dorpse gezelligheid in Hoenderloo',
            ],
          },
          {
            id: 't_loo',
            name: "Landgoed 't Loo",
            vibe: 'watersport',
            tags: ['recreatieplas', 'badmeester', 'zomer'],
            employeePerks: [
              'Eigen recreatieplas met strand',
              'Zwemmen na je shift',
              'Zomerse vakantiesfeer aan het water',
            ],
          },
          {
            id: 'marber',
            name: 'Marber Veluwe',
            vibe: 'wellness',
            tags: ['luxe', 'privacy', 'rust', 'hoge eisen'],
            employeePerks: [
              'Spa en wellness faciliteiten',
              'Premium gasten, premium ervaring',
              'Luxe werkomgeving in de natuur',
            ],
          },
          {
            id: 'miggelenberg',
            name: 'Miggelenberg',
            vibe: 'natuur',
            tags: ['klassieker', 'ruim opgezet', 'logistiek', 'heuvels'],
            employeePerks: [
              'Mountainbikeroutes starten bij het park',
              'Herten spotten op weg naar je werk',
              'Klassiek Veluwepark met historie',
            ],
          },
          {
            id: 'rabbit_hill',
            name: 'Rabbit Hill',
            vibe: 'kinderen',
            tags: ['kindermagneet', 'druk', 'geluid', 'energiek'],
            employeePerks: [
              'Energie van blije kinderen om je heen',
              'Nooit een saaie dag',
              'Konijnen en reeën als collega\'s',
            ],
          },
          {
            id: 'soof_rijn',
            name: 'Soof aan de Rijn',
            vibe: 'natuur',
            tags: ['eco-lodges', 'water', 'duurzaamheid'],
            employeePerks: [
              'Werken met duurzame eco-lodges',
              'Aan de rivier in de natuur',
              'Pionieren in nieuw concept',
            ],
          },
          {
            id: 'stroombroek',
            name: 'Stroombroek',
            vibe: 'wellness',
            tags: ['Palestra', 'dagrecreatie', 'achterhoek'],
            employeePerks: [
              'Toegang tot Palestra wellness',
              'Recreatieplas voor een duik na werk',
              'Achterhoekse nuchterheid',
            ],
          },
        ],
      },
      drenthe: {
        label: 'Drenthe',
        parks: [
          {
            id: 'aelderholt',
            name: 'Aelderholt',
            vibe: 'kinderen',
            tags: ['indoorspeeltuin', 'groot', 'familie'],
            employeePerks: [
              'Grootste indoorspeeltuin van het noorden',
              'Altijd droog werken, ook bij regen',
              'Groot team met veel doorgroeikansen',
            ],
          },
          {
            id: 'lunsbergen',
            name: 'Bospark Lunsbergen',
            vibe: 'natuur',
            tags: ['rustig', 'bosrijk', 'wandelaars'],
            employeePerks: [
              'Rustige werkplek in het Drentse bos',
              'Wandelroutes starten bij de deur',
              'Relaxte sfeer, geen drukte',
            ],
          },
          {
            id: 'bloemert',
            name: 'De Bloemert',
            vibe: 'watersport',
            tags: ['zuidlaardermeer', 'boten', 'watersport'],
            employeePerks: [
              'Aan het Zuidlaardermeer',
              'Zeilen en suppen in je vrije tijd',
              'Watersportliefhebbers als collega\'s',
            ],
          },
          {
            id: 'drentse_lagune',
            name: 'Drentse Lagune',
            vibe: 'strand',
            tags: ['nieuw', 'waterrijk', 'zandstranden', 'onderhoud'],
            employeePerks: [
              'Splinternieuw park, alles fris',
              'Eigen zandstranden en lagunes',
              'Meehelpen opbouwen van iets nieuws',
            ],
          },
          {
            id: 'land_van_bartje',
            name: 'Het Land van Bartje',
            vibe: 'kinderen',
            tags: ['pony-resort', 'boerenerf', 'populair'],
            employeePerks: [
              'Werken tussen de pony\'s',
              'Boerderijsfeer met dieren',
              'Blije kinderen om je heen',
            ],
          },
          {
            id: 'hof_van_saksen',
            name: 'Hof van Saksen',
            vibe: 'luxe',
            tags: ['flagship', 'hotel-service', 'culinair', 'perfectie'],
            employeePerks: [
              'Grootste waterpark van Noord-Nederland',
              'Mega team, altijd gezelligheid',
              'Het vlaggenschip van Landal',
            ],
          },
          {
            id: 'hunerwold',
            name: 'Hunerwold State',
            vibe: 'natuur',
            tags: ['nationaal park', 'rustig', 'zelfstandig'],
            employeePerks: [
              'Nationaal Park Dwingelderveld om je heen',
              'Zelfstandig werken in de rust',
              'Sterrenhemel zonder lichtvervuiling',
            ],
          },
          {
            id: 'hunzepark',
            name: 'Hunzepark',
            vibe: 'actief',
            tags: ['groepen', 'survival', 'buitenactiviteiten'],
            employeePerks: [
              'Survivalactiviteiten in je achtertuin',
              'Groepen begeleiden in de natuur',
              'Actieve werksfeer buiten',
            ],
          },
          {
            id: 'orveltermarke',
            name: 'Orveltermarke',
            vibe: 'natuur',
            tags: ['ecologisch', 'natuurpark', 'techniek', 'hout'],
            employeePerks: [
              'Ecologisch park met houten huisjes',
              'Werken in authentieke natuur',
              'Duurzaamheid als uitgangspunt',
            ],
          },
          {
            id: 'puur_exloo',
            name: 'PUUR Exloo',
            vibe: 'wellness',
            tags: ['high-end', 'villa', 'exclusief', 'discretie'],
            employeePerks: [
              'High-end villapark',
              'Exclusieve gasten, premium service',
              'Luxe werkomgeving in de natuur',
            ],
          },
          {
            id: 'hunzedal',
            name: 'Vakantiepark Hunzedal',
            vibe: 'actief',
            tags: ['actiepark', 'recreatieplas', 'animatie'],
            employeePerks: [
              'Recreatieplas voor een duik na werk',
              'Veel animatie en activiteiten',
              'Energieke sfeer in het park',
            ],
          },
        ],
      },
      overijssel: {
        label: 'Overijssel',
        parks: [
          {
            id: 'vlegge',
            name: 'De Vlegge',
            vibe: 'natuur',
            tags: ['klein', 'bomenrijk', 'VvE'],
            employeePerks: [
              'Kleinschalig, iedereen kent iedereen',
              'Werken in bomenrijk gebied',
              'Rustige Twentse sfeer',
            ],
          },
          {
            id: 'elsgraven',
            name: 'Landgoed De Elsgraven',
            vibe: 'natuur',
            tags: ['twente', 'ruime kavels', 'groenwerk'],
            employeePerks: [
              'Landgoed met ruime kavels',
              'Twents coulisselandschap',
              'Veel groenwerk in de natuur',
            ],
          },
          {
            id: 'hellendoorn',
            name: 'Landgoed De Hellendoornse Berg',
            vibe: 'familie',
            tags: ['heuvelachtig', 'gezellig', 'mix'],
            employeePerks: [
              'Avonturenpark Hellendoorn om de hoek',
              'Heuvelachtig terrein, sportief werken',
              'Gezellige familiesfeer',
            ],
          },
          {
            id: 'olde_kottink',
            name: 'Olde Kottink',
            vibe: 'natuur',
            tags: ['kleinschalig', 'boerderijstijl', 'gemoedelijk'],
            employeePerks: [
              'Authentieke boerderijsfeer',
              'Gemoedelijke Twentse gastvrijheid',
              'Kleinschalig en persoonlijk',
            ],
          },
          {
            id: 'tolplas',
            name: 'Recreatiepark De Tolplas',
            vibe: 'natuur',
            tags: ['visvijver', 'vissers', 'rustig'],
            employeePerks: [
              'Visvijver voor een rustig momentje',
              'Relaxte sfeer, geen drukte',
              'Vissers als tevreden gasten',
            ],
          },
          {
            id: 'sallandse_heuvelrug',
            name: 'Sallandse Heuvelrug',
            vibe: 'natuur',
            tags: ['duinpan', 'uniek landschap'],
            employeePerks: [
              'Uniek stuifzandlandschap',
              'Nationaal Park Sallandse Heuvelrug',
              'Wandelen door de heide na werk',
            ],
          },
          {
            id: 'twenhaarsveld',
            name: 'Twenhaarsveld',
            vibe: 'familie',
            tags: ['autovrij', 'lopen', 'honden'],
            employeePerks: [
              'Autovrij park, rustig werken',
              'Hondenvriendelijke sfeer',
              'Familiale Twentse gezelligheid',
            ],
          },
          {
            id: 'giethoorn',
            name: 'Vakantiepark Giethoorn',
            vibe: 'watersport',
            tags: ['boot', 'logistiek', 'uitdaging'],
            employeePerks: [
              'Met de boot naar je werk',
              'Venetië van het Noorden',
              'Internationale toeristen ontmoeten',
            ],
          },
          {
            id: 'weerribben',
            name: 'Villapark de Weerribben',
            vibe: 'luxe',
            tags: ['rietgedekt', 'onderhoudsintensief', 'mooi'],
            employeePerks: [
              'Werken tussen rietgedekte villa\'s',
              'Nationaal Park de Weerribben',
              'Natuurschoon als werkplek',
            ],
          },
          {
            id: 'belterwiede',
            name: 'Waterpark Belterwiede',
            vibe: 'watersport',
            tags: ['aan water', 'bootgasten', 'seizoen'],
            employeePerks: [
              'Direct aan het water werken',
              'Watersport in je vrije tijd',
              'Zomerse vakantiesfeer',
            ],
          },
          {
            id: 'blocksyl',
            name: 'Waterresort Blocksyl',
            vibe: 'luxe',
            tags: ['aan water', 'kleinschalig', 'exclusief'],
            employeePerks: [
              'Exclusief waterresort',
              'Kleinschalig team aan het water',
              'Premium gasten, premium service',
            ],
          },
          {
            id: 'waterstaete',
            name: 'Waterstaete Ossenzijl',
            vibe: 'watersport',
            tags: ['vrijstaand', 'water', 'muggen'],
            employeePerks: [
              'Vrijstaande huisjes aan het water',
              'Nationaal Park Weerribben-Wieden',
              'Rust en ruimte in overvloed',
            ],
          },
        ],
      },
      noord_brabant: {
        label: 'Noord-Brabant',
        parks: [
          {
            id: 'wolfsven',
            name: "Bospark 't Wolfsven",
            vibe: 'familie',
            tags: ['recreatieplas', 'camping', 'massaal'],
            employeePerks: [
              'Eigen recreatieplas met strand',
              'Zwemmen na je shift',
              'Brabantse gezelligheid in het team',
            ],
          },
          {
            id: 'heihorsten',
            name: 'De Heihorsten',
            vibe: 'luxe',
            tags: ['landelijk', 'rietdaken', 'paarden'],
            employeePerks: [
              'Paarden en landelijk leven',
              'Rietgedekte villa\'s onderhouden',
              'Luxe werken in de Brabantse natuur',
            ],
          },
          {
            id: 'katjeskelder',
            name: 'De Katjeskelder',
            vibe: 'familie',
            tags: ['gezellig', 'bos', 'brede doelgroep'],
            employeePerks: [
              'Bosrijk park met veel groen',
              'Gezellige Brabantse sfeer',
              'Diverse gasten, nooit saai',
            ],
          },
          {
            id: 'strabrechtse_vennen',
            name: 'De Strabrechtse Vennen',
            vibe: 'natuur',
            tags: ['nieuw', 'water', 'natuur', 'modern'],
            employeePerks: [
              'Gloednieuw park bij natuurgebied',
              'Moderne faciliteiten',
              'Strabrechtse Heide voor de deur',
            ],
          },
          {
            id: 'vers',
            name: 'De Vers',
            vibe: 'natuur',
            tags: ['oorlogsmuseum', 'bosrijk', 'ouderen'],
            employeePerks: [
              'Oorlogsmuseum Overloon naast de deur',
              'Rustig bosrijk park',
              'Historie ademt door het park',
            ],
          },
          {
            id: 'duc_de_brabant',
            name: 'Duc de Brabant',
            vibe: 'familie',
            tags: ['bourgondisch', 'restaurant', 'rustig'],
            employeePerks: [
              'Bourgondisch Brabants genieten',
              'Lekker eten in het restaurant',
              'Rustige werkomgeving',
            ],
          },
          {
            id: 'vennenbos',
            name: 'Het Vennenbos',
            vibe: 'kinderen',
            tags: ['subtropisch', 'volume', 'werkdruk', 'team'],
            employeePerks: [
              'Subtropisch zwembad als werkplek',
              'Groot team, veel collega\'s',
              'Bruisende familiesfeer',
            ],
          },
          {
            id: 'kaatsheuvel',
            name: 'Kaatsheuvel',
            vibe: 'familie',
            tags: ['Efteling', 'korte verblijven', 'snelle wissels'],
            employeePerks: [
              'In de schaduw van de Efteling',
              'Gasten vol sprookjesverhalen',
              'Magie om de hoek',
            ],
          },
          {
            id: 'klein_oisterwijk',
            name: 'Klein Oisterwijk',
            vibe: 'natuur',
            tags: ['vennen', 'buitensporters', 'rust'],
            employeePerks: [
              'Oisterwijkse Vennen als achtertuin',
              'Rust en natuur om je heen',
              'Wandelen en fietsen na werktijd',
            ],
          },
          {
            id: 'peel',
            name: 'Roompot Park De Peel',
            vibe: 'natuur',
            tags: ['bosrijk', 'autovrij', 'fietsers'],
            employeePerks: [
              'Autovrij park, rustige sfeer',
              'Nationaal Park de Groote Peel',
              'Fietsen door de bossen',
            ],
          },
          {
            id: 'schaijk',
            name: 'Vakantiepark Schaijk',
            vibe: 'actief',
            tags: ['avontuurlijk', 'drones', 'lodges'],
            employeePerks: [
              'Avontuurlijke activiteiten begeleiden',
              'Innovatieve lodges',
              'Actieve gasten, dynamische werkdag',
            ],
          },
        ],
      },
      limburg: {
        label: 'Limburg',
        parks: [
          {
            id: 'schin_op_geul',
            name: 'Bungalowpark Schin op Geul',
            vibe: 'actief',
            tags: ['hellingen', 'kuitenbijter', 'uitzicht', 'wielrenners'],
            employeePerks: [
              'Wielrenners als gasten, fietsen als hobby',
              'Heuvellandschap met uitzichten',
              'Limburgse vlaai in de pauze',
            ],
          },
          {
            id: 'lommerbergen',
            name: 'De Lommerbergen',
            vibe: 'kinderen',
            tags: ['subtropisch', 'technische dienst', 'heuvelachtig'],
            employeePerks: [
              'Subtropisch zwembad als werkplek',
              'Technisch uitdagend terrein',
              'Heuvellandschap om je heen',
            ],
          },
          {
            id: 'waufsberg',
            name: 'De Waufsberg',
            vibe: 'luxe',
            tags: ['heuvellandschap', 'culinair', 'streekproducten'],
            employeePerks: [
              'Culinaire streekproducten proeven',
              'Bourgondisch Limburg beleven',
              'Luxe gasten, premium service',
            ],
          },
          {
            id: 'schatberg',
            name: 'Domein De Schatberg',
            vibe: 'familie',
            tags: ['gigantisch', 'camping', 'dorp'],
            employeePerks: [
              'Één van de grootste parken',
              'Klein dorp aan voorzieningen',
              'Camping met alles erop en eraan',
            ],
          },
          {
            id: 'hoog_vaals',
            name: 'Hoog Vaals',
            vibe: 'luxe',
            tags: ['drielandenpunt', 'internationaal', 'heuvelachtig'],
            employeePerks: [
              'Drielandenpunt: NL, BE, DE',
              'Internationale gasten ontmoeten',
              'Hoogste punt van Nederland',
            ],
          },
          {
            id: 'cauberg',
            name: 'Kasteeldomein De Cauberg',
            vibe: 'luxe',
            tags: ['toplocatie', 'chique', 'Valkenburg'],
            employeePerks: [
              'Naast de beroemde Cauberg',
              'Valkenburg met grotten en kastelen',
              'Chique omgeving, premium gasten',
            ],
          },
          {
            id: 'klein_vink',
            name: 'Klein Vink',
            vibe: 'wellness',
            tags: ['thermaalbad', 'kamperen', 'wellness'],
            employeePerks: [
              'Thermaalbad voor ontspanning',
              'Wellness faciliteiten gebruiken',
              'Kampeersfeer met luxe twist',
            ],
          },
          {
            id: 'aerwinkel',
            name: 'Landgoed Aerwinkel',
            vibe: 'luxe',
            tags: ['landhuizen', 'golf', 'chique'],
            employeePerks: [
              'Golfbaan naast de deur',
              'Werken op een chique landgoed',
              'Premium gasten in landhuizen',
            ],
          },
          {
            id: 'marina_well',
            name: 'Marina Resort Well',
            vibe: 'watersport',
            tags: ['leukermeer', 'nieuw', 'modern'],
            employeePerks: [
              'Nieuw modern resort aan het Leukermeer',
              'Watersport en strand in één',
              'Pionieren in gloednieuw park',
            ],
          },
          {
            id: 'reevallis',
            name: 'Reevallis',
            vibe: 'natuur',
            tags: ['hoogstgelegen', 'kleinschalig', 'uitzicht'],
            employeePerks: [
              'Hoogstgelegen park van Landal',
              'Panoramisch uitzicht elke dag',
              'Kleinschalig en persoonlijk',
            ],
          },
          {
            id: 'resort_arcen',
            name: 'Resort Arcen',
            vibe: 'familie',
            tags: ['groot', 'faciliteiten', 'kamperen'],
            employeePerks: [
              'Kasteeltuinen Arcen naast de deur',
              'Groot park met veel faciliteiten',
              'Afwisselende werkzaamheden',
            ],
          },
          {
            id: 'gulpen',
            name: 'Park Gulpen',
            vibe: 'natuur',
            tags: ['panorama', 'terrasvormig', 'trappen'],
            employeePerks: [
              'Panoramisch uitzicht over Limburg',
              'Terrasvormig park, sportief werken',
              'Wijnranken en natuur',
            ],
          },
          {
            id: 'weerterbergen',
            name: 'Weerterbergen',
            vibe: 'kinderen',
            tags: ['massa', 'Koos Konijn', 'horeca', 'entertainment'],
            employeePerks: [
              'Entertainmentteam met Koos Konijn',
              'Bruisende familiesfeer',
              'Veel horeca en activiteiten',
            ],
          },
        ],
      },
      flevoland: {
        label: 'Flevoland',
        parks: [
          {
            id: 'marker_wadden',
            name: 'Marker Wadden',
            vibe: 'natuur',
            tags: ['boot', 'off-grid', 'natuurbeheer', 'uniek'],
            employeePerks: [
              'Met de boot naar je werk',
              'Off-grid werken in unieke natuur',
              'Pionieren op nieuwe eilanden',
            ],
          },
          {
            id: 'veluwemeer',
            name: 'Waterparc Veluwemeer',
            vibe: 'watersport',
            tags: ['appartementen', 'glas', 'schoonmaak'],
            employeePerks: [
              'Eigen jachthaven',
              'Waterskibaan in de achtertuin',
              'Alles draait om water',
            ],
          },
        ],
      },
      noord_holland: {
        label: 'Noord-Holland',
        parks: [
          {
            id: 'ooghduyne',
            name: 'Beach Resort Ooghduyne',
            vibe: 'strand',
            tags: ['grote villa', 'bloembollen', 'wind'],
            employeePerks: [
              'Bollenvelden in het voorjaar',
              'Strand op loopafstand',
              'Grote luxe villa\'s onderhouden',
            ],
          },
          {
            id: 'berger_duinen',
            name: 'Berger Duinen',
            vibe: 'natuur',
            tags: ['duinen', 'zand', 'schoonmaak', 'wandelaars'],
            employeePerks: [
              'Kunstenaarsdorp Bergen om de hoek',
              'Duinen en strand combineren',
              'Relaxte wandelaars als gasten',
            ],
          },
          {
            id: 'graaf_egmont',
            name: 'De Graaf van Egmont',
            vibe: 'strand',
            tags: ['appartementen', 'boulevard', 'lift'],
            employeePerks: [
              'Boulevard van Egmond voor de deur',
              'Strandwandeling in de pauze',
              'Appartementencomplex met uitzicht',
            ],
          },
          {
            id: 'duynvallei',
            name: 'Duynvallei',
            vibe: 'luxe',
            tags: ['exclusief', 'rietgedekt', 'rustig'],
            employeePerks: [
              'Exclusieve rietgedekte huisjes',
              'Schoorlse Duinen als achtertuin',
              'Premium gasten, rustige sfeer',
            ],
          },
          {
            id: 'volendam_marina',
            name: 'Marinapark Volendam',
            vibe: 'familie',
            tags: ['toeristisch', 'haven', 'stadse drukte'],
            employeePerks: [
              'Havengezicht van Volendam',
              'Toeristen uit de hele wereld',
              'Vis eten in de pauze',
            ],
          },
          {
            id: 'residence_berger',
            name: 'Residence Berger Duinen',
            vibe: 'luxe',
            tags: ['kleinschalig', 'privacy'],
            employeePerks: [
              'Kleinschalig luxe resort',
              'Bergen aan Zee om de hoek',
              'Rustige exclusieve sfeer',
            ],
          },
          {
            id: 'bh_zandvoort',
            name: 'Beach Houses Zandvoort',
            vibe: 'strand',
            tags: ['op strand', 'logistiek', 'zand'],
            employeePerks: [
              'Letterlijk werken op het strand',
              'Zonsondergang elke werkdag',
              'F1-circuit om de hoek',
            ],
          },
          {
            id: 'bloemendaal',
            name: 'Bloemendaal aan Zee',
            vibe: 'strand',
            tags: ['duinen', 'racecircuit', 'hip'],
            employeePerks: [
              'Hipste strandtenten van Nederland',
              'Circuit Zandvoort naast de deur',
              'Beachclub-sfeer',
            ],
          },
          {
            id: 'callantsoog',
            name: 'Park Callantsoog',
            vibe: 'familie',
            tags: ['compact', 'strand', 'familie'],
            employeePerks: [
              'Breedste strand van Nederland',
              'Compact park, korte lijntjes',
              'Familievakantiesfeer',
            ],
          },
          {
            id: 'egmond',
            name: 'Kustpark Egmond aan Zee',
            vibe: 'strand',
            tags: ['duinen', 'hoogteverschil', 'Duitsers'],
            employeePerks: [
              'Vuurtoren van Egmond als baken',
              'Duinen met uitzicht op zee',
              'Internationale gasten',
            ],
          },
          {
            id: 'wijdenes',
            name: 'Roompot Park Wijdenes',
            vibe: 'natuur',
            tags: ['markermeer', 'rustig', 'duurzaam'],
            employeePerks: [
              'Aan het Markermeer',
              'Duurzaam park concept',
              'Rustig West-Friese platteland',
            ],
          },
          {
            id: 'sh_julianadorp',
            name: 'Strandhuisjes Julianadorp',
            vibe: 'strand',
            tags: ['op strand', 'fysiek zwaar', 'wind'],
            employeePerks: [
              'Werken direct op het strand',
              'Frisse zeelucht elke dag',
              'Breedste stranden van Noord-Holland',
            ],
          },
          {
            id: 'zandvoort',
            name: 'Roompot Zandvoort',
            vibe: 'actief',
            tags: ['modern', 'circuit', 'F1', 'stedelijk'],
            employeePerks: [
              'F1 Grand Prix in je achtertuin',
              'Modern stedelijk resort',
              'Strand én circuit in één',
            ],
          },
          {
            id: 'sh_wijk',
            name: 'Strandhuisjes Wijk aan Zee',
            vibe: 'strand',
            tags: ['op strand', 'logistiek', 'industrie-zicht'],
            employeePerks: [
              'Authentiek vissersdorp',
              'Werken op het strand',
              'Kleinschalig en persoonlijk',
            ],
          },
          {
            id: 'callassande',
            name: 'Vakantiepark Callassande',
            vibe: 'familie',
            tags: ['camping', 'tennis', 'gezellig'],
            employeePerks: [
              'Gezellig campinggevoel',
              'Tennisbanen en sportfaciliteiten',
              'Familiale sfeer',
            ],
          },
          {
            id: 'volendam',
            name: 'Volendam',
            vibe: 'familie',
            tags: ['toeristisch', 'haven'],
            employeePerks: [
              'Wereldberoemde vissershaven',
              'Internationale toeristen ontmoeten',
              'Echte Hollandse sfeer',
            ],
          },
        ],
      },
      zuid_holland: {
        label: 'Zuid-Holland',
        parks: [
          {
            id: 'bh_denhaag',
            name: 'Beach Houses Den Haag',
            vibe: 'strand',
            tags: ['strand', 'getijde', 'weer'],
            employeePerks: [
              'Werken op Haags strand',
              'Scheveningen om de hoek',
              'Pier en boulevard bereikbaar',
            ],
          },
          {
            id: 'bh_kijkduin',
            name: 'Beach Houses Kijkduin',
            vibe: 'strand',
            tags: ['strand', 'logistiek', 'uitdaging'],
            employeePerks: [
              'Strandhuisjes met zeezicht',
              'Kijkduin badplaats voor de deur',
              'Den Haag op fietsafstand',
            ],
          },
          {
            id: 'cape_helius',
            name: 'Cape Helius',
            vibe: 'watersport',
            tags: ['jachthaven', 'kleurrijk', 'watersport'],
            employeePerks: [
              'Kleurrijke jachthaven als werkplek',
              'Varen en watersport in vrije tijd',
              'Zeeuwse delta om je heen',
            ],
          },
          {
            id: 'reeuwijk',
            name: 'De Reeuwijkse Plassen',
            vibe: 'natuur',
            tags: ['duurzaam', 'water', 'bootjes'],
            employeePerks: [
              'Duurzaam eco-resort',
              'Varen op de Reeuwijkse Plassen',
              'Groene Hart midden in de Randstad',
            ],
          },
          {
            id: 'dunimar',
            name: 'Duinresort Dunimar',
            vibe: 'strand',
            tags: ['mediterraan', 'bollenstreek', 'rustig'],
            employeePerks: [
              'Mediterrane sfeer in Nederland',
              'Bollenvelden in het voorjaar',
              'Strand en duinen combineren',
            ],
          },
          {
            id: 'scheveningen',
            name: 'Nautisch Centrum Scheveningen',
            vibe: 'luxe',
            tags: ['haven', 'stad', 'zakelijk'],
            employeePerks: [
              'Strandwandeling in je lunchpauze',
              'Pier en boulevard om de hoek',
              'Werken op het bekendste strand van Nederland',
            ],
          },
          {
            id: 'residence_ouddorp',
            name: 'Residence Ouddorp Duin',
            vibe: 'luxe',
            tags: ['duinen', 'zand', 'modern'],
            employeePerks: [
              'Luxe moderne appartementen',
              'Duinen en strand als achtertuin',
              'Premium gasten op Goeree',
            ],
          },
          {
            id: 'hoek_holland',
            name: "Beach Villa's Hoek v. Holland",
            vibe: 'strand',
            tags: ['strand', 'schepen', 'elementen'],
            employeePerks: [
              'Cruiseschepen kijken vanaf het strand',
              'Maeslantkering als buur',
              'Breedste strand van Zuid-Holland',
            ],
          },
          {
            id: 'grevelingen',
            name: 'ECO Grevelingenstrand',
            vibe: 'natuur',
            tags: ['eco', 'natuurgebied', 'duurzaam'],
            employeePerks: [
              'Ecologisch park bij natuurgebied',
              'Grevelingenmeer voor wateractiviteiten',
              'Duurzaam concept met visie',
            ],
          },
          {
            id: 'brielle',
            name: 'Lakeside Resort Brielle',
            vibe: 'watersport',
            tags: ['meer', 'industrie', 'stad'],
            employeePerks: [
              'Historische vestingstad Brielle',
              'Aan het Brielse Meer',
              'Watersport en historie combineren',
            ],
          },
          {
            id: 'duynhille',
            name: 'Strandpark Duynhille',
            vibe: 'strand',
            tags: ['duinen', 'modern', 'Duitsers'],
            employeePerks: [
              'Modern park in de duinen',
              'Strand van Ouddorp nabij',
              'Internationale gasten',
            ],
          },
          {
            id: 'ouddorp_duin',
            name: 'Strand Resort Ouddorp Duin',
            vibe: 'actief',
            tags: ['surf', 'hip', 'duinen'],
            employeePerks: [
              'Surfen en kitesurfen na je shift',
              'Hippe strandsfeer',
              'Actieve gasten, sportieve sfeer',
            ],
          },
          {
            id: 'kijkduin',
            name: 'Vakantiepark Kijkduin',
            vibe: 'familie',
            tags: ['camping', 'stad', 'strand'],
            employeePerks: [
              'Strand én stad bereikbaar',
              'Den Haag voor stedentrip',
              'Familiecamping aan zee',
            ],
          },
        ],
      },
      zeeland: {
        label: 'Zeeland',
        parks: [
          {
            id: 'bos_en_duin',
            name: 'Bos en Duin',
            vibe: 'natuur',
            tags: ['kleinschalig', 'bos', 'strand'],
            employeePerks: [
              'Bos én strand combineren',
              'Kleinschalig en persoonlijk',
              'Walcheren ontdekken',
            ],
          },
          {
            id: 'buitenhof',
            name: 'Buitenhof Domburg',
            vibe: 'luxe',
            tags: ['villa', 'chique', 'verlengstuk'],
            employeePerks: [
              'Chique villapark bij Domburg',
              'Oudste badplaats van Nederland',
              'Premium gasten in luxe villa\'s',
            ],
          },
          {
            id: 'zandput',
            name: 'Camping De Zandput',
            vibe: 'natuur',
            tags: ['natuur', 'duinpan', 'kamperen'],
            employeePerks: [
              'Authentieke camping in duinpan',
              'Natuur puur om je heen',
              'Kampeersfeer met rust',
            ],
          },
          {
            id: 'dishoek_camping',
            name: 'Camping Dishoek',
            vibe: 'strand',
            tags: ['duinvoet', 'toeristisch', 'Duitsers'],
            employeePerks: [
              'Camping aan de duinvoet',
              'Strand van Dishoek nabij',
              'Internationale gasten',
            ],
          },
          {
            id: 'soeten_haert',
            name: 'De Soeten Haert',
            vibe: 'actief',
            tags: ['badplaats', 'jongeren', 'grootschalig'],
            employeePerks: [
              'Renesse badplaatssfeer',
              'Jong en dynamisch team',
              'Bruisend in de zomer',
            ],
          },
          {
            id: 'haamstede_duin',
            name: "Duinpark 't Hof van Haamstede",
            vibe: 'natuur',
            tags: ['natuurgebied', 'strikte regels', 'rust'],
            employeePerks: [
              'Midden in natuurgebied Boswachterij',
              'Rust en ruimte in overvloed',
              'Unieke flora en fauna',
            ],
          },
          {
            id: 'hof_domburg',
            name: 'Hof Domburg',
            vibe: 'familie',
            tags: ['stadspark', 'subtropisch', 'druk'],
            employeePerks: [
              'Subtropisch zwembad',
              'Domburg op loopafstand',
              'Bruisende familiesfeer',
            ],
          },
          {
            id: 'banjaard',
            name: 'Noordzee Residence De Banjaard',
            vibe: 'luxe',
            tags: ['villawijk', 'ruim', 'strand'],
            employeePerks: [
              'Ruime luxe villa\'s aan zee',
              'Strand op loopafstand',
              'Premium omgeving, premium gasten',
            ],
          },
          {
            id: 'vlissingen',
            name: 'Noordzee Resort Vlissingen',
            vibe: 'strand',
            tags: ['stad', 'boulevard', 'modern'],
            employeePerks: [
              'Boulevard van Vlissingen',
              'Grote schepen kijken',
              'Stad én strand in één',
            ],
          },
          {
            id: 'veerse_kreek',
            name: 'Park Veerse Kreek',
            vibe: 'watersport',
            tags: ['veerse meer', 'nieuw', 'watersport'],
            employeePerks: [
              'Aan het Veerse Meer',
              'Zeilen en surfen in vrije tijd',
              'Nieuw modern park',
            ],
          },
          {
            id: 'port_greve',
            name: 'Port Greve',
            vibe: 'watersport',
            tags: ['gezellig', 'TD-werk', 'grevelingen'],
            employeePerks: [
              'Gezellig havenpark',
              'Grevelingenmeer als speeltuin',
              'Watersport en duiken',
            ],
          },
          {
            id: 'residence_haamstede',
            name: "Résidence 't Hof van Haamstede",
            vibe: 'luxe',
            tags: ['statig', 'klassiek', 'ouder publiek'],
            employeePerks: [
              'Statig klassiek park',
              'Rustgevende omgeving',
              'Premium gasten, relaxte sfeer',
            ],
          },
          {
            id: 'wijngaerde',
            name: 'Résidence Wijngaerde',
            vibe: 'luxe',
            tags: ['appartementen', 'centrum', 'hotel-gevoel'],
            employeePerks: [
              'Centrum van Domburg',
              'Hotel-sfeer met gastvrijheid',
              'Alles op loopafstand',
            ],
          },
          {
            id: 'resort_haamstede',
            name: 'Resort Haamstede',
            vibe: 'familie',
            tags: ['groot', 'faciliteiten', 'zomer drukte'],
            employeePerks: [
              'Groot resort met alle faciliteiten',
              'Zomerdrukte betekent teamspirit',
              'Diverse werkzaamheden',
            ],
          },
          {
            id: 'beach_resort',
            name: 'Roompot Beach Resort',
            vibe: 'familie',
            tags: ['moederschip', 'gigantisch', 'fabriekswerk'],
            employeePerks: [
              'Grootste vakantiepark van Zeeland',
              'Mega team, mega faciliteiten',
              'Alles onder één dak',
            ],
          },
          {
            id: 'brouwersdam',
            name: 'Beach Resort Brouwersdam',
            vibe: 'actief',
            tags: ['surfers', 'kitesurfing', 'sportief'],
            employeePerks: [
              'Kitesurfen na je shift',
              'Midden in de watersport community',
              'Mekka voor watersporters',
            ],
          },
          {
            id: 'cadzand',
            name: 'Roompot Cadzand-Bad',
            vibe: 'luxe',
            tags: ['villapark', 'bourgondisch', 'service'],
            employeePerks: [
              'Bourgondisch Zeeuws-Vlaanderen',
              'België om de hoek voor lekker eten',
              'Premium villapark aan zee',
            ],
          },
          {
            id: 'camperveer',
            name: 'Domein Het Camperveer',
            vibe: 'natuur',
            tags: ['kleinschalig', 'meer', 'vogels'],
            employeePerks: [
              'Veerse Meer als werkplek',
              'Vogels spotten in je pauze',
              'Kleinschalig en rustig',
            ],
          },
          {
            id: 'nieuwvliet',
            name: 'Beach Resort Nieuwvliet-Bad',
            vibe: 'strand',
            tags: ['groot', 'modern', 'lodges'],
            employeePerks: [
              'Modern resort met design lodges',
              'Breedste strand van Zeeland',
              'Groot team, veel doorgroeikansen',
            ],
          },
          {
            id: 'dishoek_residence',
            name: 'Noordzee Résidence Dishoek',
            vibe: 'luxe',
            tags: ['kleinschalig', 'duinen', 'culinair'],
            employeePerks: [
              'Culinair hoogstandje',
              'Duinen pal voor de deur',
              'Kleinschalig luxe resort',
            ],
          },
          {
            id: 'st_pierre',
            name: 'St. Pierre',
            vibe: 'strand',
            tags: ['dijk', 'renovatie', 'onderhoud'],
            employeePerks: [
              'Aan de Westerschelde',
              'Zicht op grote schepen',
              'Zeeuws-Vlaanderen ontdekken',
            ],
          },
          {
            id: 'strandpark_zeeland',
            name: 'Strandpark Zeeland',
            vibe: 'strand',
            tags: ['boulevard', 'stadsdynamiek'],
            employeePerks: [
              'Boulevard van Renesse',
              'Stad én strand combineren',
              'Levendig in de zomer',
            ],
          },
          {
            id: 'strand_resort_nieuwvliet',
            name: 'Strand Resort Nieuwvliet-Bad',
            vibe: 'strand',
            tags: ['modern', 'ruim'],
            employeePerks: [
              'Modern strandresort',
              'Ruime accommodaties',
              'Zeeuws-Vlaams strand',
            ],
          },
          {
            id: 'livingstone',
            name: 'Villapark Livingstone',
            vibe: 'luxe',
            tags: ['villa', 'groen', 'privacy'],
            employeePerks: [
              'Luxe villa\'s met privacy',
              'Groene omgeving',
              'Premium gasten, rustige sfeer',
            ],
          },
          {
            id: 'water_village',
            name: 'Water Village',
            vibe: 'natuur',
            tags: ['eco', 'autovrij', 'warmtepompen'],
            employeePerks: [
              'Duurzaam eco-concept',
              'Autovrij en rustig',
              'Pionieren met groene technieken',
            ],
          },
          {
            id: 'zeebad',
            name: 'Zeebad',
            vibe: 'familie',
            tags: ['faciliteiten', 'veerboot', 'Belgisch'],
            employeePerks: [
              'Veerboot naar Breskens naast de deur',
              'Vlissingen op loopafstand',
              'Belgische en Nederlandse gasten',
            ],
          },
        ],
      },
      friesland: {
        label: 'Friesland',
        parks: [
          {
            id: 'elfstedenhart',
            name: 'Elfstedenhart',
            vibe: 'natuur',
            tags: ['weilanden', 'rust', 'cultuur'],
            employeePerks: [
              'Friese weidsheid om je heen',
              'Elfstedentocht historie',
              'Rust en ruimte in overvloed',
            ],
          },
          {
            id: 'esonstad',
            name: 'Esonstad',
            vibe: 'familie',
            tags: ['vestingstad', 'architectuur', 'water'],
            employeePerks: [
              'Werken in een vestingstadje',
              'Unieke architectuur als werkplek',
              'Water en historie combineren',
            ],
          },
          {
            id: 'alde_feanen',
            name: 'Waterpark De Alde Feanen',
            vibe: 'watersport',
            tags: ['water bereikbaar', 'smalle wegen'],
            employeePerks: [
              'Nationaal Park De Alde Feanen',
              'Varen tussen de rietlanden',
              'Natuur en water in één',
            ],
          },
          {
            id: 'oudehaske',
            name: 'Waterpark Oudehaske',
            vibe: 'actief',
            tags: ['recreatiemeer', 'duikschool'],
            employeePerks: [
              'Duiken en wateractiviteiten',
              'Recreatiemeer als speeltuin',
              'Actieve gasten, sportieve sfeer',
            ],
          },
          {
            id: 'sneekermeer',
            name: 'Waterpark Sneekermeer',
            vibe: 'watersport',
            tags: ['Friese meren', 'Sneekweek', 'boten'],
            employeePerks: [
              'Sneekweek in je achtertuin',
              'Zeilen op de Friese meren',
              'Watersportliefhebbers om je heen',
            ],
          },
          {
            id: 'terherne',
            name: 'Waterpark Terherne',
            vibe: 'watersport',
            tags: ['havenwoningen', 'Kameleon', 'varen'],
            employeePerks: [
              'Kameleon-dorpje Terherne',
              'Havensfeer elke dag',
              'Varen door de Friese meren',
            ],
          },
          {
            id: 'terkaple',
            name: 'Waterpark Terkaple',
            vibe: 'watersport',
            tags: ['kleinschalig', 'water', 'rustig'],
            employeePerks: [
              'Kleinschalig waterpark',
              'Rustige Friese meren',
              'Varen in je vrije tijd',
            ],
          },
        ],
      },
      groningen: {
        label: 'Groningen',
        parks: [
          {
            id: 'wedderplassen',
            name: 'De Wedderplassen',
            vibe: 'watersport',
            tags: ['zwemplas', 'nieuw', 'weids'],
            employeePerks: [
              'Nieuw park met potentie',
              'Zwemmen in de plas na werk',
              'Groningse weidsheid',
            ],
          },
          {
            id: 'bourtange',
            name: 'Landgoed Bourtange',
            vibe: 'natuur',
            tags: ['vesting', 'rust', 'cultuur'],
            employeePerks: [
              'Vestingstadje Bourtange naast de deur',
              'Historische sfeer elke dag',
              'Rust in het Groningse land',
            ],
          },
          {
            id: 'suyderoogh',
            name: 'Natuurdorp Suyderoogh',
            vibe: 'natuur',
            tags: ['nationaal park', 'donker', 'sterren'],
            employeePerks: [
              'Donkerste plek van Nederland',
              'Sterren kijken na je shift',
              'Nationaal Park Lauwersmeer',
            ],
          },
          {
            id: 'glamping_lauwersmeer',
            name: 'Roompot Glamping Lauwersmeer',
            vibe: 'actief',
            tags: ['safari', 'seizoen', 'outdoor'],
            employeePerks: [
              'Safari-achtige glamping',
              'Lauwersmeer als speeltuin',
              'Outdoor activiteiten begeleiden',
            ],
          },
        ],
      },
      utrecht: {
        label: 'Utrecht',
        parks: [
          {
            id: 'amerongse_berg',
            name: 'Amerongse Berg',
            vibe: 'natuur',
            tags: ['nationaal park', 'rust', 'fietsers'],
            employeePerks: [
              'Nationaal Park Utrechtse Heuvelrug',
              'Mountainbiken na werktijd',
              'Kasteel Amerongen om de hoek',
            ],
          },
          {
            id: 'buytenplaets',
            name: 'Buytenplaets Rhenen',
            vibe: 'luxe',
            tags: ['buitenplaats', 'kleinschalig', 'dierenpark'],
            employeePerks: [
              'Ouwehands Dierenpark naast de deur',
              'Werken op een buitenplaats',
              'Kleinschalig en luxe',
            ],
          },
          {
            id: 'thijmse_berg',
            name: 'De Thijmse Berg',
            vibe: 'familie',
            tags: ['bos', 'brasserie', 'centraal'],
            employeePerks: [
              'Centraal in Nederland gelegen',
              'Bos om je heen',
              'Brasserie met gezelligheid',
            ],
          },
          {
            id: 'soof_heuvelrug',
            name: 'Soof Heuvelrug',
            vibe: 'wellness',
            tags: ['eco', 'duurzaam', 'wellness'],
            employeePerks: [
              'Duurzaam eco-concept',
              'Wellness faciliteiten',
              'Pionieren in nieuw park',
            ],
          },
        ],
      },
      waddeneilanden: {
        label: 'Waddeneilanden',
        parks: [
          {
            id: 'ameland_state',
            name: 'Ameland State',
            vibe: 'strand',
            tags: ['appartementen', 'eilandlogistiek'],
            employeePerks: [
              'Wadlopen in je vrije tijd',
              'Fietsen zonder verkeerslichten',
              'Rust, ruimte, en zee',
            ],
          },
          {
            id: 'bosch_en_zee',
            name: 'Complex Bosch en Zee',
            vibe: 'strand',
            tags: ['appartementen', 'basis', 'badgasten'],
            employeePerks: [
              'Terschelling eilandleven',
              'Bos én zee combineren',
              'Eilandgevoel elke dag',
            ],
          },
          {
            id: 'beach_park_texel',
            name: 'Beach Park Texel',
            vibe: 'natuur',
            tags: ['villa', 'wind', 'konijnen'],
            employeePerks: [
              'Met de boot naar je werk',
              'Eilandleven zonder vakantiedagen',
              'Texel in je achtertuin',
            ],
          },
          {
            id: 'kaap_west',
            name: 'Kaap West',
            vibe: 'luxe',
            tags: ['appartementen', 'wad', 'horeca'],
            employeePerks: [
              'Aan het Wad werken',
              'Zeehonden spotten',
              'Premium gasten op Terschelling',
            ],
          },
          {
            id: 'kustpark_texel',
            name: 'Kustpark Texel',
            vibe: 'familie',
            tags: ['duinen', 'zwembad', 'klassiek'],
            employeePerks: [
              'Klassiek park op Texel',
              'Duinen en strand nabij',
              'Eiland ontdekken in vrije tijd',
            ],
          },
          {
            id: 'roompot_ameland',
            name: 'Roompot Ameland',
            vibe: 'strand',
            tags: ['vuurtoren', 'duinen', 'eilandgevoel'],
            employeePerks: [
              'Vuurtoren als baken',
              'Echte eilandervaring',
              'Ameland ontdekken',
            ],
          },
          {
            id: 'schuttersbos',
            name: 'Schuttersbos',
            vibe: 'natuur',
            tags: ['knus', 'kleinschalig', 'jutter'],
            employeePerks: [
              'Jutterssfeer op Texel',
              'Kleinschalig en knus',
              'Eilandcommunity',
            ],
          },
          {
            id: 'sluftervallei',
            name: 'Sluftervallei',
            vibe: 'natuur',
            tags: ['uniek', 'duinen', 'afgelegen', 'hecht team'],
            employeePerks: [
              'Unieke duinvallei op Texel',
              'Hecht team op afgelegen locatie',
              'Natuur in zijn puurste vorm',
            ],
          },
          {
            id: 'boomhiemke',
            name: 'Vakantiepark Boomhiemke',
            vibe: 'familie',
            tags: ['groot', 'wellness', 'bus'],
            employeePerks: [
              'Wellness op Ameland',
              'Groot team op het eiland',
              'Eilandleven het hele jaar',
            ],
          },
          {
            id: 'vogelmient',
            name: 'Villapark Vogelmient',
            vibe: 'luxe',
            tags: ['villa', 'strand', 'rust'],
            employeePerks: [
              'Luxe villa\'s op Texel',
              'Strand en rust combineren',
              'Premium gasten in mooie omgeving',
            ],
          },
          {
            id: 'vitamaris',
            name: 'Vitamaris',
            vibe: 'wellness',
            tags: ['appartementen', 'autovrij', 'electrokarren'],
            employeePerks: [
              'Autovrij op Terschelling',
              'Elektrokarren als vervoer',
              'Wellness op het eiland',
            ],
          },
          {
            id: 'vlieduyn',
            name: 'Vlieduyn',
            vibe: 'natuur',
            tags: ['appartementen', 'duinen', 'autovrij'],
            employeePerks: [
              'Vlieland eilandrust',
              'Autovrij en relaxed',
              'Natuur puur om je heen',
            ],
          },
          {
            id: 'west_terschelling',
            name: 'West Terschelling',
            vibe: 'actief',
            tags: ['appartementen', 'haven', 'levendig'],
            employeePerks: [
              'Wonen en werken op een Waddeneiland',
              'Oerol-festival in je achtertuin',
              'Het echte eilandgevoel',
            ],
          },
        ],
      },
    },
  },
  belgie: {
    label: 'België',
    regions: {
      vlaanderen: {
        label: 'Vlaanderen',
        parks: [
          {
            id: 'breeduyn',
            name: 'Breeduyn Village',
            vibe: 'strand',
            tags: ['nieuw', 'duinen', 'Oostende'],
            employeePerks: [
              'Belgische kust ontdekken',
              'Nieuw park, pionieren',
              'Oostende om de hoek',
            ],
          },
          {
            id: 'mooi_zutendaal_be',
            name: 'Mooi Zutendaal',
            vibe: 'luxe',
            tags: ['Jan des Bouvrie', 'bosrijk', 'luxe'],
            employeePerks: [
              'Design villa\'s van Jan des Bouvrie',
              'Bosrijke Limburgse omgeving',
              'Luxe Belgisch concept',
            ],
          },
          {
            id: 'eksel',
            name: 'Roompot Park Eksel',
            vibe: 'actief',
            tags: ['natuurgebied', 'padel', 'buitenleven'],
            employeePerks: [
              'Natuurgebied als werkplek',
              'Padel en sport faciliteren',
              'Belgisch buitenleven',
            ],
          },
        ],
      },
      wallonie: {
        label: 'Wallonië',
        parks: [
          {
            id: 'your_nature',
            name: 'Forest Resort Your Nature',
            vibe: 'natuur',
            tags: ['eco', 'architectuur', 'bos'],
            employeePerks: [
              'Architectonisch hoogstandje in de natuur',
              'Duurzaam eco-concept',
              'Ardennen als werkplek',
            ],
          },
          {
            id: 'neufchateau',
            name: 'Glamping Neufchâteau',
            vibe: 'actief',
            tags: ['glamping', 'ardennen', 'outdoor'],
            employeePerks: [
              'Glamping in de Ardennen',
              'Outdoor activiteiten begeleiden',
              'Avontuurlijk werken',
            ],
          },
          {
            id: 'namur',
            name: 'Namur Nature',
            vibe: 'actief',
            tags: ['rotsachtig', 'klimmen', 'ardennen'],
            employeePerks: [
              'Rotsklimmen en abseilen',
              'Actieve gasten, sportieve sfeer',
              'Spectaculair Ardennenlandschap',
            ],
          },
          {
            id: 'saint_hubert',
            name: 'Nature Parc Saint Hubert',
            vibe: 'natuur',
            tags: ['diep bos', 'back to nature', 'wild'],
            employeePerks: [
              'Diep in het Ardennenbos',
              'Echte natuur, echte rust',
              'Wildlife spotten',
            ],
          },
          {
            id: 'grandvoir',
            name: 'Hillview Resort Grandvoir',
            vibe: 'natuur',
            tags: ['heuvelachtig', 'uitzicht', 'rustiek'],
            employeePerks: [
              'Panoramisch uitzicht',
              'Heuvellandschap Ardennen',
              'Rustieke sfeer',
            ],
          },
          {
            id: 'eau_dheure',
            name: "Village l'Eau d'Heure",
            vibe: 'watersport',
            tags: ['meren', 'watersport', 'heuvelachtig'],
            employeePerks: [
              'Grootste stuwmeer van België',
              'Watersport in de Ardennen',
              'Spectaculair watergebied',
            ],
          },
          {
            id: 'gottales',
            name: 'Village les Gottales',
            vibe: 'natuur',
            tags: ['sprookjesachtig', 'steil', 'rustiek'],
            employeePerks: [
              'Ardennen als speeltuin',
              'Mountainbiken, kajakken, klimmen',
              'Avontuur in de Ardennen',
            ],
          },
        ],
      },
    },
  },
  duitsland: {
    label: 'Duitsland',
    regions: {
      algemeen: {
        label: 'Duitsland',
        parks: [
          {
            id: 'arber',
            name: 'Arber',
            vibe: 'natuur',
            tags: ['beierse woud', 'grens', 'wandelgebied'],
            employeePerks: [
              'Beierse Woud als werkplek',
              'Wandelen in je vrije tijd',
              'Grensregio Duitsland-Tsjechië',
            ],
          },
          {
            id: 'bergresort_winterberg',
            name: 'Bergresort Winterberg',
            vibe: 'actief',
            tags: ['hellingbanen', 'wintersport', 'Nederlanders'],
            employeePerks: [
              'Wintersport om de hoek',
              'Rodelen na je shift',
              'Wintersport zonder ver te reizen',
            ],
          },
          {
            id: 'winterberg_park',
            name: 'Winterberg',
            vibe: 'actief',
            tags: ['piste', 'sneeuwruimen', 'mountainbike'],
            employeePerks: [
              'Skiën in je vrije tijd',
              'Mountainbiken in de zomer',
              'Seizoensgebonden afwisseling',
            ],
          },
          {
            id: 'mont_royal',
            name: 'Mont Royal',
            vibe: 'luxe',
            tags: ['wijnvelden', 'uitzicht', 'ruim'],
            employeePerks: [
              'Wijn proeven aan de Moezel',
              'Kastelen en wijngaarden',
              'Werken in wijngebied',
            ],
          },
          {
            id: 'sonnenberg',
            name: 'Sonnenberg',
            vibe: 'kinderen',
            tags: ['berg', 'speelparadijs', 'wijn'],
            employeePerks: [
              'Moezelstreek ontdekken',
              'Speelparadijs voor kinderen',
              'Wijn en natuur combineren',
            ],
          },
          {
            id: 'cochem',
            name: 'Ferienresort Cochem',
            vibe: 'luxe',
            tags: ['golf', 'villa', 'toeristisch'],
            employeePerks: [
              'Golf in je vrije tijd',
              'Toeristisch Cochem ontdekken',
              'Luxe resort aan de Moezel',
            ],
          },
          {
            id: 'eifeler_tor',
            name: 'Eifeler Tor',
            vibe: 'luxe',
            tags: ['appartementen', 'national park', 'heuvelachtig'],
            employeePerks: [
              'Nationaal Park Eifel',
              'Sterren kijken (Dark Sky Park)',
              'Heuvellandschap als werkplek',
            ],
          },
          {
            id: 'kronenburger_see',
            name: 'Eifelpark Kronenburger See',
            vibe: 'actief',
            tags: ['stuwmeer', 'steil', 'trappen'],
            employeePerks: [
              'Stuwmeer voor wateractiviteiten',
              'Sportief werken op heuvels',
              'Eifel natuur om je heen',
            ],
          },
          {
            id: 'wirfttal',
            name: 'Wirfttal',
            vibe: 'natuur',
            tags: ['bosrijk', 'camping', 'outdoor'],
            employeePerks: [
              'Bosrijke campingsfeer',
              'Outdoor activiteiten',
              'Eifel ontdekken',
            ],
          },
          {
            id: 'hochwald',
            name: 'Hochwald',
            vibe: 'kinderen',
            tags: ['stuwmeer', 'groot', 'speelparadijs'],
            employeePerks: [
              'Groot stuwmeer',
              'Speelparadijs voor kinderen',
              'Hunsrück natuur',
            ],
          },
          {
            id: 'warsberg',
            name: 'Warsberg',
            vibe: 'actief',
            tags: ['berg', 'kabelbaan', 'camping'],
            employeePerks: [
              'Kabelbaan naar de top',
              'Campingsfeer op de berg',
              'Actief Duits platteland',
            ],
          },
          {
            id: 'salztal',
            name: 'Salztal Paradies',
            vibe: 'familie',
            tags: ['zwemparadijs', 'wintersport', 'wandelen'],
            employeePerks: [
              'Zwemparadijs als werkplek',
              'Wintersport en wandelen',
              'Harz ontdekken',
            ],
          },
          {
            id: 'hansa',
            name: 'HANSA-PARK Resort',
            vibe: 'actief',
            tags: ['pretpark', 'zee', 'geluid'],
            employeePerks: [
              'Pretpark naast de deur',
              'Oostzee als buur',
              'Achtbanen in je pauze',
            ],
          },
          {
            id: 'travemunde',
            name: 'Travemünde',
            vibe: 'strand',
            tags: ['schepen', 'strand', 'badplaats'],
            employeePerks: [
              'Badplaats aan de Oostzee',
              'Schepen kijken',
              'Duitse strandcultuur',
            ],
          },
          {
            id: 'dwergter_de',
            name: 'Dwergter Sand',
            vibe: 'natuur',
            tags: ['grens', 'bos', 'heide'],
            employeePerks: [
              'Grensregio Nederland-Duitsland',
              'Bos en heide',
              'Rustige omgeving',
            ],
          },
          {
            id: 'marissa',
            name: 'Marissa Resort',
            vibe: 'luxe',
            tags: ['scandinavisch', 'meer', 'hip'],
            employeePerks: [
              'Scandinavisch design concept',
              'Meer als werkplek',
              'Hip en modern resort',
            ],
          },
          {
            id: 'bad_bentheim',
            name: 'Ferienresort Bad Bentheim',
            vibe: 'familie',
            tags: ['badhuis', 'kasteel', 'Nederlanders'],
            employeePerks: [
              'Thermaal bad Bad Bentheim',
              'Kasteel als buur',
              'Net over de grens',
            ],
          },
          {
            id: 'rheinsberg',
            name: 'Hafendorf Rheinsberg',
            vibe: 'watersport',
            tags: ['haven', 'steiger', 'vuurtoren'],
            employeePerks: [
              'Havendorp met vuurtoren',
              'Brandenburg meren',
              'Varen en watersport',
            ],
          },
        ],
      },
    },
  },
  denemarken: {
    label: 'Denemarken',
    regions: {
      algemeen: {
        label: 'Denemarken',
        parks: [
          {
            id: 'ebeltoft',
            name: 'Ebeltoft',
            vibe: 'strand',
            tags: ['zee', 'maritiem', 'national park'],
            employeePerks: [
              'Deense kust ontdekken',
              'Nationaal Park Mols Bjerge',
              'Maritieme sfeer',
            ],
          },
          {
            id: 'fyrklit',
            name: 'Fyrklit',
            vibe: 'natuur',
            tags: ['duinen', 'ruig', 'bunkers'],
            employeePerks: [
              'Ruige Deense duinen',
              'WOII bunkers als historie',
              'Scandinavische natuur',
            ],
          },
          {
            id: 'gronhoj',
            name: 'Grønhøj Strand',
            vibe: 'familie',
            tags: ['strand', 'familie'],
            employeePerks: [
              'Deens strand als werkplek',
              'Familievakantiesfeer',
              'Scandinavische rust',
            ],
          },
          {
            id: 'ronbjerg',
            name: 'Rønbjerg',
            vibe: 'actief',
            tags: ['sport', 'actief'],
            employeePerks: [
              'Sportfaciliteiten in Denemarken',
              'Actieve gasten',
              'Deense natuur',
            ],
          },
          {
            id: 'seawest',
            name: 'Seawest',
            vibe: 'kinderen',
            tags: ['overdekt', 'duin', 'modern'],
            employeePerks: [
              'Modern resort in de duinen',
              'Overdekte faciliteiten',
              'Deense kust',
            ],
          },
          {
            id: 'sohojlandet',
            name: 'Søhøjlandet',
            vibe: 'actief',
            tags: ['heuvelachtig', 'bos', 'mtb'],
            employeePerks: [
              'Mountainbiken in Denemarken',
              'Heuvellandschap',
              'Deense bossen',
            ],
          },
        ],
      },
    },
  },
  oostenrijk: {
    label: 'Oostenrijk',
    regions: {
      algemeen: {
        label: 'Oostenrijk',
        parks: [
          {
            id: 'dachstein',
            name: 'Alpendorf Dachstein West',
            vibe: 'actief',
            tags: ['chalets', 'ski', 'familie'],
            employeePerks: [
              'Skiën in je vrije tijd',
              'Alpen als uitzicht vanaf je werk',
              'Werken met bergzicht',
            ],
          },
          {
            id: 'bad_kleinkirchheim',
            name: 'Bad Kleinkirchheim',
            vibe: 'wellness',
            tags: ['piste', 'thermen', 'gezelligheid'],
            employeePerks: [
              'Thermen als ontspanning',
              'Skiën en wellness combineren',
              'Oostenrijkse gezelligheid',
            ],
          },
          {
            id: 'gerlitzen',
            name: 'Bergresort Gerlitzen',
            vibe: 'natuur',
            tags: ['uitzicht', 'berg'],
            employeePerks: [
              'Panoramisch bergzicht',
              'Alpen als werkplek',
              'Oostenrijkse natuur',
            ],
          },
          {
            id: 'tauernblick',
            name: 'Bergresort Tauernblick',
            vibe: 'actief',
            tags: ['uitzicht', 'wandelen', 'ski'],
            employeePerks: [
              'Uitzicht op de Tauern',
              'Wandelen en skiën',
              'Bergavontuur',
            ],
          },
          {
            id: 'zugspitze',
            name: 'Bergresort Zugspitze Ehrwald',
            vibe: 'luxe',
            tags: ['imposant', 'luxe', 'berg'],
            employeePerks: [
              'Zugspitze als buur',
              'Imposante bergomgeving',
              'Luxe Alpenresort',
            ],
          },
          {
            id: 'brandnertal',
            name: 'Brandnertal',
            vibe: 'familie',
            tags: ['plateau', 'ski-in', 'familie'],
            employeePerks: [
              'Ski-in ski-out mogelijkheid',
              'Familievriendelijk skigebied',
              'Plateau met uitzicht',
            ],
          },
          {
            id: 'rauris',
            name: 'Carpe Solem Rauris',
            vibe: 'natuur',
            tags: ['appartementen', 'historie', 'wintersport'],
            employeePerks: [
              'Historisch goudgraversdorp',
              'Wintersport in Rauris',
              'Authentieke Oostenrijkse sfeer',
            ],
          },
          {
            id: 'chalet_matin',
            name: 'Chalet Matin',
            vibe: 'rust',
            tags: ['rustig', 'dependance'],
            employeePerks: [
              'Rustige Alpenomgeving',
              'Kleinschalig chalet',
              'Oostenrijkse rust',
            ],
          },
          {
            id: 'clofers_jenig',
            name: 'Clofers Jenig',
            vibe: 'luxe',
            tags: ['modern', 'design', 'ski'],
            employeePerks: [
              'Design chalets in Karinthië',
              'Modern Oostenrijks concept',
              'Skigebied Nassfeld',
            ],
          },
          {
            id: 'clofers_obermoeschach',
            name: 'Clofers Obermöschach',
            vibe: 'luxe',
            tags: ['modern', 'design', 'ski'],
            employeePerks: [
              'Luxe design chalets',
              'Karinthië ontdekken',
              'Skiën in Oostenrijk',
            ],
          },
          {
            id: 'clofers_rattendorf',
            name: 'Clofers Rattendorf',
            vibe: 'luxe',
            tags: ['modern', 'design', 'ski'],
            employeePerks: [
              'Modern design resort',
              'Nassfeld skigebied',
              'Luxe Alpensfeer',
            ],
          },
          {
            id: 'clofers_sonnleitn',
            name: 'Clofers Sonnleitn',
            vibe: 'luxe',
            tags: ['modern', 'design', 'ski'],
            employeePerks: [
              'Zonnige ligging in de Alpen',
              'Design chalets',
              'Skiën in Karinthië',
            ],
          },
          {
            id: 'kitzbuhel',
            name: 'Dorfresort Kitzbühel',
            vibe: 'luxe',
            tags: ['high-end', 'chique', 'wintersport'],
            employeePerks: [
              'Wereldberoemd Kitzbühel',
              'High-end wintersport',
              'Premium gasten ontmoeten',
            ],
          },
          {
            id: 'hochmontafon',
            name: 'Hochmontafon',
            vibe: 'actief',
            tags: ['hoog', 'sneeuwzeker', 'grens'],
            employeePerks: [
              'Hoogste werkplek van Landal',
              'Sneeuwgarantie tot in het voorjaar',
              'Werken op de top',
            ],
          },
          {
            id: 'katschberg',
            name: 'Katschberg',
            vibe: 'actief',
            tags: ['bergpas', 'autovrij', 'wintersport'],
            employeePerks: [
              'Ski-in ski-out werkplek',
              'Après-ski met je collega\'s',
              'Wintersport als lifestyle',
            ],
          },
          {
            id: 'kreischberg',
            name: 'Kreischberg Chalets',
            vibe: 'familie',
            tags: ['piste', 'hout', 'familie'],
            employeePerks: [
              'Houten chalets op de piste',
              'Familie-skigebied',
              'Oostenrijkse gezelligheid',
            ],
          },
          {
            id: 'montafon_suites',
            name: 'Montafon Suites Schruns',
            vibe: 'luxe',
            tags: ['kleinschalig', 'luxe'],
            employeePerks: [
              'Kleinschalig luxe resort',
              'Montafon vallei',
              'Premium Alpensfeer',
            ],
          },
          {
            id: 'naturchalets_turracher_hoehe',
            name: 'Naturchalets Turracher Höhe',
            vibe: 'natuur',
            tags: ['natuur', 'chalets', 'bergen'],
            employeePerks: [
              'Natuur chalets in de bergen',
              'Turracher Höhe skigebied',
              'Oostenrijkse natuur puur',
            ],
          },
          {
            id: 'maria_alm',
            name: 'Resort Maria Alm',
            vibe: 'luxe',
            tags: ['resort', 'dorp', 'exclusief'],
            employeePerks: [
              'Exclusief bergdorp Maria Alm',
              'Ski Amadé skigebied',
              'Luxe resort in de Alpen',
            ],
          },
          {
            id: 'turrach_suites_410',
            name: 'Turrach Suites 410',
            vibe: 'luxe',
            tags: ['suites', 'modern', 'ski'],
            employeePerks: [
              'Moderne suites op de berg',
              'Turracher Höhe als werkplek',
              'Skiën en wandelen',
            ],
          },
        ],
      },
    },
  },
  zwitserland: {
    label: 'Zwitserland',
    regions: {
      algemeen: {
        label: 'Zwitserland',
        parks: [
          {
            id: 'lenzerheide',
            name: 'Alpine Lodge Lenzerheide',
            vibe: 'actief',
            tags: ['toplocatie', 'duur', 'sport'],
            employeePerks: [
              'Zwitserse Alpen als werkplek',
              'Toplocatie voor wintersport',
              'Luxe Alpensfeer',
            ],
          },
          {
            id: 'vierwaldstattersee',
            name: 'Vierwaldstättersee',
            vibe: 'wellness',
            tags: ['wellness', 'sport', 'uitzicht'],
            employeePerks: [
              'Beroemde Vierwaldstättersee',
              'Wellness in de bergen',
              'Spectaculair Zwitsers uitzicht',
            ],
          },
        ],
      },
    },
  },
  tsjechie: {
    label: 'Tsjechië',
    regions: {
      algemeen: {
        label: 'Tsjechië',
        parks: [
          {
            id: 'lipno',
            name: 'Marina Lipno',
            vibe: 'actief',
            tags: ['meer', 'wintersport', 'zomer'],
            employeePerks: [
              'Lipnomeer in Tsjechië',
              'Zomer en winter activiteiten',
              'Betaalbaar Midden-Europa',
            ],
          },
        ],
      },
    },
  },
  engeland: {
    label: 'Verenigd Koninkrijk',
    regions: {
      algemeen: {
        label: 'Verenigd Koninkrijk',
        parks: [
          {
            id: 'angrove',
            name: 'Angrove',
            vibe: 'natuur',
            tags: ['lodges', 'rust', 'natuur'],
            employeePerks: [
              'Engelse platteland',
              'Rustige lodges',
              'Engels verbeteren on the job',
            ],
          },
          {
            id: 'aysgarth',
            name: 'Aysgarth',
            vibe: 'natuur',
            tags: ['yorkshire', 'dales', 'natuur'],
            employeePerks: [
              'Yorkshire Dales Nationaal Park',
              'Watervallen van Aysgarth',
              'Engelse natuur puur',
            ],
          },
          {
            id: 'barnsoul',
            name: 'Barnsoul',
            vibe: 'natuur',
            tags: ['schotland', 'bos', 'rust'],
            employeePerks: [
              'Schotse Highlands ontdekken',
              'Bosrijke omgeving',
              'Schotse rust en ruimte',
            ],
          },
          {
            id: 'belton_view',
            name: 'Belton View',
            vibe: 'natuur',
            tags: ['lodges', 'rust', 'natuur'],
            employeePerks: [
              'Engelse countryside',
              'Luxe lodges',
              'Rust en natuur',
            ],
          },
          {
            id: 'brunston',
            name: 'Brunston',
            vibe: 'luxe',
            tags: ['golf', 'schotland', 'spa'],
            employeePerks: [
              'Golf in Schotland',
              'Spa faciliteiten',
              'Premium hospitality',
            ],
          },
          {
            id: 'bryn_morfydd',
            name: 'Bryn Morfydd',
            vibe: 'natuur',
            tags: ['wales', 'heuvels', 'rust'],
            employeePerks: [
              'Wales ontdekken',
              'Heuvels en natuur',
              'Welsh platteland',
            ],
          },
          {
            id: 'bude_coastal_resort',
            name: 'Bude Coastal Resort',
            vibe: 'strand',
            tags: ['kust', 'cornwall', 'zee'],
            employeePerks: [
              'Cornwall kust',
              'Surfen in Engeland',
              'Kustleven',
            ],
          },
          {
            id: 'clowance',
            name: 'Clowance',
            vibe: 'luxe',
            tags: ['landgoed', 'historisch', 'groot'],
            employeePerks: [
              'Historisch landgoed',
              'Cornwall erfgoed',
              'Luxe omgeving',
            ],
          },
          {
            id: 'dylan_coastal_resort',
            name: 'Dylan Coastal Resort',
            vibe: 'strand',
            tags: ['wales', 'kust', 'zee'],
            employeePerks: [
              'Welsh kust',
              'Zee en strand',
              'Wales ontdekken',
            ],
          },
          {
            id: 'gwel_an_mor',
            name: 'Gwel an Mor',
            vibe: 'luxe',
            tags: ['topsegment', 'bruiloft', 'spa'],
            employeePerks: [
              'Werken in Cornwall',
              'Engels verbeteren on the job',
              'Premium hospitality in Engeland',
            ],
          },
          {
            id: 'hexham_lodges',
            name: 'Hexham Lodges',
            vibe: 'natuur',
            tags: ['lodges', 'rust', 'natuur'],
            employeePerks: [
              'Northumberland ontdekken',
              'Hadrian\'s Wall nabij',
              'Engelse geschiedenis',
            ],
          },
          {
            id: 'kenwick_woods',
            name: 'Kenwick Woods',
            vibe: 'natuur',
            tags: ['bos', 'lodges', 'rust'],
            employeePerks: [
              'Bosrijke omgeving',
              'Lincolnshire ontdekken',
              'Rustige werkplek',
            ],
          },
          {
            id: 'laceby_manor_resort',
            name: 'Laceby Manor Resort',
            vibe: 'luxe',
            tags: ['golf', 'spa', 'resort'],
            employeePerks: [
              'Golf en spa resort',
              'Luxe Engels platteland',
              'Premium gasten',
            ],
          },
          {
            id: 'leycroft_valley',
            name: 'Leycroft Valley',
            vibe: 'natuur',
            tags: ['devon', 'vallei', 'rust'],
            employeePerks: [
              'Devon vallei',
              'Engels platteland puur',
              'Rust en natuur',
            ],
          },
          {
            id: 'marwell_resort',
            name: 'Marwell Resort',
            vibe: 'kinderen',
            tags: ['dierentuin', 'familie', 'kinderen'],
            employeePerks: [
              'Giraffen en leeuwen als buren',
              'Gratis toegang tot de dierentuin',
              'Je collega\'s lopen op vier poten',
            ],
          },
          {
            id: 'north_lakes',
            name: 'North Lakes',
            vibe: 'natuur',
            tags: ['lake district', 'meren', 'bergen'],
            employeePerks: [
              'Lake District Nationaal Park',
              'Meren en bergen',
              'Engels natuurschoon',
            ],
          },
          {
            id: 'piperdam',
            name: 'Piperdam',
            vibe: 'luxe',
            tags: ['golf', 'loch', 'spa'],
            employeePerks: [
              'Schotse golf',
              'Loch als uitzicht',
              'Spa faciliteiten',
            ],
          },
          {
            id: 'rockingham_forest',
            name: 'Rockingham Forest',
            vibe: 'natuur',
            tags: ['bos', 'lodges', 'rust'],
            employeePerks: [
              'Historisch bosgebied',
              'Engels erfgoed',
              'Rustige lodges',
            ],
          },
          {
            id: 'twin_lakes',
            name: 'Twin Lakes',
            vibe: 'kinderen',
            tags: ['pretpark', 'familie', 'kinderen'],
            employeePerks: [
              'Gratis toegang tot het attractiepark',
              'Achtbaan in je lunchpauze',
              'Werk naast een attractiepark',
            ],
          },
          {
            id: 'ullswater_heights',
            name: 'Ullswater Heights',
            vibe: 'natuur',
            tags: ['lake district', 'meren', 'uitzicht'],
            employeePerks: [
              'Ullswater meer',
              'Lake District uitzichten',
              'Engels natuurschoon',
            ],
          },
          {
            id: 'whalesborough_resort',
            name: 'Whalesborough Resort & Spa',
            vibe: 'wellness',
            tags: ['spa', 'cornwall', 'wellness'],
            employeePerks: [
              'Wellness resort in Cornwall',
              'Spa als werkplek',
              'Engels kustgebied',
            ],
          },
          {
            id: 'whitbarrow',
            name: 'Whitbarrow',
            vibe: 'natuur',
            tags: ['lake district', 'bergen', 'natuur'],
            employeePerks: [
              'Lake District',
              'Bergen en natuur',
              'Engels wandelgebied',
            ],
          },
          {
            id: 'whitekirk_hill',
            name: 'Whitekirk Hill',
            vibe: 'luxe',
            tags: ['golf', 'schotland', 'kust'],
            employeePerks: [
              'Schotse golfkust',
              'Links course nabij',
              'Schotland ontdekken',
            ],
          },
          {
            id: 'woodland_lakes',
            name: 'Woodland Lakes',
            vibe: 'natuur',
            tags: ['meren', 'vissen', 'rust'],
            employeePerks: [
              'Meren en vissen',
              'Rustige omgeving',
              'Engels platteland',
            ],
          },
        ],
      },
    },
  },
};

export const getAllParks = () => {
  const parks = [];
  Object.entries(parkDatabase).forEach(([countryId, country]) => {
    Object.entries(country.regions).forEach(([regionId, region]) => {
      region.parks.forEach((park) => {
        parks.push({
          ...park,
          countryId,
          countryLabel: country.label,
          regionId,
          regionLabel: region.label,
        });
      });
    });
  });
  return parks;
};

// Afbeeldingen per regio-type en vibe combinatie
const regionImages = {
  // Nederlandse bossen (Veluwe, Drenthe, Brabant, etc.)
  bos_nl: {
    default: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1200',
    luxe: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200',
    kinderen: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200',
    wellness: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
  },
  // Nederlandse kust (Noord-Holland, Zuid-Holland, Zeeland)
  kust_nl: {
    default: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&q=80&w=1200',
    strand: 'https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=format&fit=crop&q=80&w=1200',
    luxe: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200',
  },
  // Nederlandse meren en watersport
  water_nl: {
    default: 'https://images.unsplash.com/photo-1500463959177-e0869687df26?auto=format&fit=crop&q=80&w=1200',
    watersport: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&q=80&w=1200',
  },
  // Waddeneilanden
  wadden: {
    default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
    strand: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=1200',
    natuur: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200',
  },
  // Limburgse heuvels
  heuvelland: {
    default: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200',
    luxe: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200',
    actief: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
  },
  // Belgische Ardennen
  ardennen: {
    default: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1200',
    natuur: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200',
    actief: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1200',
  },
  // Duitse/Oostenrijkse bergen
  alpen: {
    default: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&q=80&w=1200',
    luxe: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200',
    actief: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&q=80&w=1200',
    wellness: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
  },
  // Duitse Eifel/Moezel
  duitsland_midden: {
    default: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=1200',
    natuur: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200',
    luxe: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=1200',
  },
  // Scandinavië (Denemarken)
  scandinavie: {
    default: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1200',
    strand: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&q=80&w=1200',
    natuur: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&q=80&w=1200',
  },
  // UK
  uk: {
    default: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&q=80&w=1200',
    luxe: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200',
    natuur: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200',
  },
};

// Mapping van regio's naar afbeelding-categorieën
const regionMapping = {
  // Nederland - bos
  gelderland: 'bos_nl',
  drenthe: 'bos_nl',
  overijssel: 'bos_nl',
  noord_brabant: 'bos_nl',
  utrecht: 'bos_nl',
  // Nederland - kust
  noord_holland: 'kust_nl',
  zuid_holland: 'kust_nl',
  zeeland: 'kust_nl',
  // Nederland - water
  friesland: 'water_nl',
  groningen: 'water_nl',
  flevoland: 'water_nl',
  // Nederland - heuvels
  limburg: 'heuvelland',
  // Wadden
  waddeneilanden: 'wadden',
  // België
  vlaanderen: 'bos_nl',
  wallonie: 'ardennen',
  // Duitsland
  algemeen: 'duitsland_midden', // default voor Duitsland
  // Overige landen worden apart behandeld
};

// Land naar regio mapping voor speciale gevallen
const countryImageType = {
  oostenrijk: 'alpen',
  zwitserland: 'alpen',
  denemarken: 'scandinavie',
  engeland: 'uk',
  tsjechie: 'duitsland_midden',
  hongarije: 'water_nl',
};

// Afbeeldingen: eerst CDN URL, dan regio-fallback
export const getParkImage = (vibe, regionId, countryId, parkId) => {
  // 1. Probeer eerst park-specifieke CDN URL (van Landal website)
  if (parkId && parkImageUrls[parkId]) {
    return parkImageUrls[parkId];
  }

  // 2. Fallback naar regio-gebaseerde afbeelding
  let imageCategory = 'bos_nl';

  if (countryId && countryImageType[countryId]) {
    imageCategory = countryImageType[countryId];
  } else if (regionId && regionMapping[regionId]) {
    imageCategory = regionMapping[regionId];
  }

  const categoryImages = regionImages[imageCategory] || regionImages.bos_nl;
  return categoryImages[vibe] || categoryImages.default;
};

// Backwards compatible versie (alleen vibe)
export const getParkImageByVibe = (vibe) => {
  const defaultImages = {
    luxe: regionImages.bos_nl.luxe,
    kinderen: regionImages.bos_nl.kinderen,
    natuur: regionImages.bos_nl.default,
    strand: regionImages.kust_nl.strand,
    actief: regionImages.heuvelland.actief,
    wellness: regionImages.bos_nl.wellness,
    familie: regionImages.bos_nl.default,
    watersport: regionImages.water_nl.watersport,
  };
  return defaultImages[vibe] || regionImages.bos_nl.default;
};
