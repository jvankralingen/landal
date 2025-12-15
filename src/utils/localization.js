import { vibeConfigs } from '../data/constants';

// Park-specifieke highlights vanuit medewerkersperspectief
const parkHighlights = {
  // Gelderland / Veluwe
  schaapskooi: ['Kleinschalig en persoonlijk team', 'Rustige werkomgeving op de Veluwe', 'Korte lijntjes met collega\'s', 'Werken in bosrijke omgeving'],
  hoenderloo: ['Werken midden op de Veluwe', 'Prachtige bosrijke omgeving', 'Nationaal Park om de hoek', 'Actief buitenwerk mogelijk'],
  cuber_veluwe: ['Werken met innovatieve technologie', 'Moderne luxe accommodaties', 'Hoogwaardige gastvrijheidstraining', 'Premium werkomgeving'],
  coldenhove: ['Groot en gezellig team', 'Levendige zomersfeer', 'Veel doorgroeimogelijkheden', 'Afwisselend werk'],
  hoevegaerde: ['Gemoedelijke werksfeer', 'Trouwe vaste gasten', 'Mooie ligging aan vijvers', 'Hecht teamgevoel'],
  vlinderhoeve: ['Rustige en groene werkomgeving', 'Kleinschalig team', 'Werken in de natuur', 'Ontspannen sfeer'],
  heideheuvel: ['Prachtig uitzicht over de heide', 'Sportieve werkomgeving', 'Actief team', 'Mooie wandelgebieden'],
  heihaas: ['Compact en hecht team', 'Dorpse gezelligheid', 'Persoonlijke werksfeer', 'Snelle samenwerking'],
  t_loo: ['Werken aan recreatieplas', 'Zomerse vakantiesfeer', 'Buitenwerk aan het water', 'Zwemmogelijkheid na werktijd'],
  marber: ['Luxe wellness omgeving', 'Hoogwaardige faciliteiten', 'Professioneel team', 'Korting op spa'],
  miggelenberg: ['Ruim opgezet park', 'Mooie heuvels en bossen', 'Veel bewegingsvrijheid', 'Klassieke Landal sfeer'],
  rabbit_hill: ['Energieke werksfeer', 'Werken met blije kinderen', 'Veel teamactiviteiten', 'Nooit een saaie dag'],
  soof_rijn: ['Duurzame eco-lodges', 'Werken aan de Rijn', 'Innovatief concept', 'Natuurbewuste omgeving'],
  stroombroek: ['Mooie wellness faciliteiten', 'Werken in de Achterhoek', 'Dagrecreatie mogelijkheden', 'Ontspannen sfeer'],

  // Drenthe
  aelderholt: ['Groot park met veel faciliteiten', 'Werken met gezinnen', 'Indoorspeeltuin op het park', 'Gezellige teamsfeer'],
  lunsbergen: ['Rustig bosrijk park', 'Werken in de natuur', 'Ideaal voor wandelaars', 'Ontspannen werksfeer'],
  bloemert: ['Werken aan het Zuidlaardermeer', 'Watersport faciliteiten', 'Nautische sfeer', 'Mooie wateromgeving'],
  drentse_lagune: ['Nieuw en modern park', 'Werken aan zandstranden', 'Waterrijke omgeving', 'Innovatieve faciliteiten'],
  land_van_bartje: ['Uniek pony-resort concept', 'Werken met dieren', 'Populair bij gezinnen', 'Boerderij sfeer'],
  hof_van_saksen: ['Flagship park van Landal', 'Hoogwaardige faciliteiten', 'Hotel-niveau service', 'Culinaire mogelijkheden'],
  hunerwold: ['Werken bij Nationaal Park', 'Rust en ruimte', 'Zelfstandig werken', 'Natuurlijke omgeving'],
  hunzepark: ['Actieve groepsaccommodaties', 'Buitenactiviteiten organiseren', 'Survival faciliteiten', 'Dynamisch werk'],
  orveltermarke: ['Ecologisch verantwoord park', 'Werken met natuurlijke materialen', 'Technisch interessant', 'Duurzame omgeving'],
  puur_exloo: ['Exclusieve villa\'s', 'High-end gastvrijheid', 'Luxe werkomgeving', 'Premium service leren'],
  hunzedal: ['Werken aan recreatiemeer', 'Veel animatie activiteiten', 'Actieve zomerperiode', 'Levendig park'],

  // Overijssel
  vlegge: ['Kleinschalig en knus', 'Werken tussen de bomen', 'Persoonlijke sfeer', 'Rustige omgeving'],
  elsgraven: ['Ruime kavels in Twente', 'Veel groenwerk', 'Mooie landgoed setting', 'Buitenwerk'],
  hellendoorn: ['Gezellige mix van gasten', 'Heuvelachtig terrein', 'Nabij attractiepark', 'Afwisselend werk'],
  olde_kottink: ['Authentieke boerderijstijl', 'Kleinschalig en persoonlijk', 'Gemoedelijke sfeer', 'Karakteristieke omgeving'],
  tolplas: ['Werken aan visvijver', 'Rustige omgeving', 'Ideaal voor natuurliefhebbers', 'Ontspannen werksfeer'],
  sallandse_heuvelrug: ['Uniek duinlandschap', 'Bijzondere natuuromgeving', 'Werken op de heuvelrug', 'Mooie vergezichten'],
  twenhaarsveld: ['Autovrij park', 'Veel hondeneigenaren', 'Rustige werksfeer', 'Groene omgeving'],
  giethoorn: ['Werken in Venetië van het Noorden', 'Unieke bootlogistiek', 'Toeristische hotspot', 'Bijzondere ervaring'],
  weerribben: ['Luxe rietgedekte villa\'s', 'Prachtige omgeving', 'Hoogwaardige accommodaties', 'Karakteristiek werk'],
  belterwiede: ['Werken direct aan het water', 'Bootgasten ontvangen', 'Zomerse sfeer', 'Watersport omgeving'],
  blocksyl: ['Exclusief aan het water', 'Kleinschalig en luxe', 'Premium gastvrijheid', 'Rustige werksfeer'],
  waterstaete: ['Vrijstaande woningen aan water', 'Rustige omgeving', 'Natuurlijke setting', 'Zelfstandig werken'],

  // Noord-Brabant
  wolfsven: ['Groot park aan recreatieplas', 'Levendige zomerperiode', 'Veel teamgenoten', 'Camping sfeer'],
  heihorsten: ['Landelijke luxe omgeving', 'Rietgedekte accommodaties', 'Paarden in de buurt', 'Karakteristiek park'],
  katjeskelder: ['Gezellig bosrijk park', 'Brede mix van gasten', 'Brabantse gezelligheid', 'Fijne teamsfeer'],
  strabrechtse_vennen: ['Nieuw modern park', 'Prachtige natuuromgeving', 'Bij de Strabrechtse Heide', 'Innovatieve faciliteiten'],
  vers: ['Historische omgeving', 'Bosrijk en rustig', 'Oorlogsmuseum nabij', 'Cultuur en natuur'],
  duc_de_brabant: ['Bourgondische sfeer', 'Goed restaurant op park', 'Rustige omgeving', 'Brabantse gastvrijheid'],
  vennenbos: ['Groot subtropisch zwembad', 'Werken in groot team', 'Veel faciliteiten', 'Levendige sfeer'],
  kaatsheuvel: ['Nabij de Efteling', 'Veel korte verblijven', 'Snelle wisselingen', 'Toeristische omgeving'],
  klein_oisterwijk: ['Werken bij de vennen', 'Sportieve gasten', 'Rustige natuuromgeving', 'Brabantse bossen'],
  peel: ['Bosrijk en autovrij', 'Ideaal voor fietsers', 'Rustige werksfeer', 'Natuurlijke omgeving'],
  schaijk: ['Avontuurlijk park', 'Moderne lodges', 'Actieve faciliteiten', 'Innovatief concept'],

  // Limburg
  schin_op_geul: ['Werken in heuvelland', 'Prachtige vergezichten', 'Populair bij wielrenners', 'Sportieve omgeving'],
  lommerbergen: ['Subtropisch zwemparadijs', 'Heuvelachtig terrein', 'Technisch uitdagend', 'Veel faciliteiten'],
  waufsberg: ['Culinaire streekproducten', 'Heuvellandschap', 'Bourgondische sfeer', 'Gastronomisch interessant'],
  schatberg: ['Zeer groot park', 'Werken als in een dorp', 'Veel collega\'s', 'Camping en bungalows'],
  hoog_vaals: ['Drielandenpunt bereikbaar', 'Internationale gasten', 'Hoogste punt van Nederland', 'Unieke ligging'],
  cauberg: ['Toplocatie in Valkenburg', 'Kasteeldomein', 'Chique omgeving', 'Toeristische hotspot'],
  klein_vink: ['Thermaalbad faciliteiten', 'Wellness en camping', 'Ontspannen werksfeer', 'Spa mogelijkheden'],
  aerwinkel: ['Golfbaan op het park', 'Luxe landhuizen', 'Chique clientèle', 'Premium service'],
  marina_well: ['Modern resort aan Leukermeer', 'Nieuw en fris', 'Werken aan het water', 'Eigentijdse faciliteiten'],
  reevallis: ['Hoogstgelegen park', 'Kleinschalig en knus', 'Prachtig uitzicht', 'Intieme werksfeer'],
  resort_arcen: ['Groot park met veel faciliteiten', 'Camping en bungalows', 'Nabij kasteeltuinen', 'Gevarieerd werk'],
  gulpen: ['Panoramisch uitzicht', 'Terrasvormig park', 'Limburgse heuvels', 'Karakteristieke omgeving'],
  weerterbergen: ['Bekend van Koos Konijn', 'Veel horeca en entertainment', 'Levendig kinderpark', 'Nooit saai'],

  // Flevoland
  marker_wadden: ['Unieke locatie op eiland', 'Bereikbaar per boot', 'Off-grid werken', 'Natuurbeheer ervaring'],
  veluwemeer: ['Moderne appartementen', 'Werken aan het Veluwemeer', 'Veel glaswerk', 'Strak en eigentijds'],

  // Noord-Holland
  ooghduyne: ['Grote strandvilla\'s', 'Werken in bollenstreek', 'Zee op loopafstand', 'Luxe accommodaties'],
  berger_duinen: ['Werken in de duinen', 'Zandverstuivingen', 'Natuurlijke omgeving', 'Bergen aan Zee nabij'],
  graaf_egmont: ['Appartementencomplex aan boulevard', 'Stedelijke omgeving', 'Lift aanwezig', 'Badplaats sfeer'],
  duynvallei: ['Exclusief en rietgedekt', 'Rustige luxe', 'Duinomgeving', 'Premium gastvrijheid'],
  volendam_marina: ['Toeristische havenlocatie', 'Authentiek Volendam', 'Veel dagjesmensen', 'Levendige omgeving'],
  residence_berger: ['Kleinschalig en privé', 'Luxe duinvilla\'s', 'Rustige werksfeer', 'Exclusieve gasten'],
  bh_zandvoort: ['Werken óp het strand', 'Unieke strandhuisjes', 'Zee voor de deur', 'Vakantiegevoel dagelijks'],
  bloemendaal: ['Hippe strandtent sfeer', 'Duinen van Bloemendaal', 'Circuit Zandvoort nabij', 'Trendy omgeving'],
  callantsoog: ['Compact strandpark', 'Familie sfeer', 'Strand op loopafstand', 'Gezellige omgeving'],
  egmond: ['Duinpark aan zee', 'Veel Duitse gasten', 'Hoogteverschillen', 'Kustplaats sfeer'],
  wijdenes: ['Werken aan Markermeer', 'Duurzaam park', 'Rustige omgeving', 'Natuurlijk IJsselmeer'],
  sh_julianadorp: ['Strandhuisjes aan zee', 'Fysiek buitenwerk', 'Direct aan het strand', 'Frisse zeelucht'],
  zandvoort: ['Modern bij het circuit', 'F1 evenementen', 'Stedelijke badplaats', 'Dynamische omgeving'],
  sh_wijk: ['Strandhuisjes met karakter', 'Werken aan zee', 'Industrieel uitzicht', 'Unieke locatie'],
  callassande: ['Gezellig vakantiepark', 'Tennisbanen', 'Camping sfeer', 'Familiepark'],
  volendam: ['Authentieke haven', 'Toeristische hotspot', 'Hollandse sfeer', 'Karakteristiek'],

  // Zuid-Holland
  bh_denhaag: ['Strandhuisjes Scheveningen', 'Werken aan zee', 'Getijdenwerking', 'Badplaats bij de stad'],
  bh_kijkduin: ['Strand bij Kijkduin', 'Duinomgeving', 'Logistiek uitdagend', 'Mooie kustlijn'],
  cape_helius: ['Kleurrijke jachthaven', 'Watersport paradijs', 'Marina sfeer', 'Nautisch werk'],
  reeuwijk: ['Werken aan de plassen', 'Duurzaam park', 'Bootjes en water', 'Groene Hart locatie'],
  dunimar: ['Mediterrane sfeer', 'Rustig duinresort', 'Bollenstreek', 'Ontspannen omgeving'],
  scheveningen: ['Haven van Scheveningen', 'Stedelijke omgeving', 'Zakelijke gasten ook', 'Nautisch centrum'],
  residence_ouddorp: ['Moderne duinvilla\'s', 'Luxe aan zee', 'Zeeuwse delta', 'Premium accommodaties'],
  hoek_holland: ['Strandvilla\'s aan zee', 'Grote schepen spotten', 'Elementen voelen', 'Unieke havenmond'],
  grevelingen: ['Ecologisch strand', 'Natuurgebied', 'Duurzaam concept', 'Werken in de delta'],
  brielle: ['Lakeside resort', 'Werken aan het meer', 'Nabij Rotterdam', 'Waterrijke omgeving'],
  duynhille: ['Modern strandpark', 'Duinlandschap', 'Veel Duitse gasten', 'Eigentijds'],
  ouddorp_duin: ['Surfspot van Nederland', 'Hippe doelgroep', 'Duinen en strand', 'Actieve sfeer'],
  kijkduin: ['Camping bij Den Haag', 'Strand en stad', 'Familiepark', 'Stedelijk strand'],

  // Zeeland
  bos_en_duin: ['Kleinschalig bos én strand', 'Beste van twee werelden', 'Rustige omgeving', 'Zeeuwse kust'],
  buitenhof: ['Luxe villa\'s Domburg', 'Chique badplaats', 'Hoogwaardige service', 'Exclusief park'],
  zandput: ['Kamperen in duinpan', 'Puur natuur', 'Authentiek Zeeland', 'Rustig en basic'],
  dishoek_camping: ['Camping aan duinvoet', 'Veel Duitse gasten', 'Toeristische kust', 'Gezellige sfeer'],
  soeten_haert: ['Badplaats Renesse', 'Jonge doelgroep', 'Grootschalig park', 'Levendige sfeer'],
  haamstede_duin: ['Midden in natuurgebied', 'Strikte natuurregels', 'Rust en ruimte', 'Unieke flora en fauna'],
  hof_domburg: ['Subtropisch bad in Domburg', 'Stadspark sfeer', 'Veel faciliteiten', 'Levendige badplaats'],
  banjaard: ['Luxe villawijk', 'Ruime kavels', 'Strand nabij', 'Exclusieve omgeving'],
  vlissingen: ['Boulevard van Vlissingen', 'Moderne stadsontwikkeling', 'Schepen spotten', 'Maritieme sfeer'],
  veerse_kreek: ['Nieuw aan Veerse Meer', 'Watersport faciliteiten', 'Modern park', 'Actief aan het water'],
  port_greve: ['Gezellig aan Grevelingen', 'Technisch werk', 'Watersport omgeving', 'Hecht team'],
  residence_haamstede: ['Statige accommodaties', 'Klassieke uitstraling', 'Ouder publiek', 'Verzorgde omgeving'],
  wijngaerde: ['Appartementen in centrum', 'Hotel-achtige service', 'Domburg centrum', 'Stedelijke ligging'],
  resort_haamstede: ['Groot familieresort', 'Veel faciliteiten', 'Drukke zomers', 'Veel collega\'s'],
  beach_resort: ['Grootste Roompot park', 'Enorme schaal', 'Veel doorgroeikansen', 'Professionele organisatie'],
  brouwersdam: ['Surfparadijs', 'Kitesurfen en meer', 'Sportieve gasten', 'Actieve werksfeer'],
  cadzand: ['Luxe villapark', 'Bourgondisch Zeeuws-Vlaanderen', 'Premium service', 'Culinaire omgeving'],
  camperveer: ['Kleinschalig aan meer', 'Vogelrijk gebied', 'Rust en natuur', 'Intieme sfeer'],
  nieuwvliet: ['Groot modern resort', 'Nieuwe lodges', 'Strand nabij', 'Eigentijdse faciliteiten'],
  dishoek_residence: ['Luxe in de duinen', 'Kleinschalig en exclusief', 'Culinair hoogstaand', 'Premium gasten'],
  st_pierre: ['Park aan de dijk', 'Renovatie ervaring', 'Zeeuws-Vlaanderen', 'Karakteristiek'],
  strandpark_zeeland: ['Boulevard ligging', 'Stedelijke dynamiek', 'Vlissingen centrum', 'Stadsstrand'],
  strand_resort_nieuwvliet: ['Modern strandresort', 'Ruime accommodaties', 'Vlakbij België', 'Nieuw en fris'],
  livingstone: ['Luxe villapark', 'Veel privacy en groen', 'Exclusieve uitstraling', 'Rustige omgeving'],
  water_village: ['Eco-vriendelijk park', 'Autovrij concept', 'Warmtepompen', 'Duurzaam werken'],
  zeebad: ['Veel faciliteiten', 'Veerboot naar Breskens', 'Belgische gasten', 'Internationaal'],

  // Friesland
  elfstedenhart: ['Hart van Friesland', 'Weidse vergezichten', 'Friese cultuur', 'Rust en ruimte'],
  esonstad: ['Unieke vestingstad', 'Bijzondere architectuur', 'Werken aan het water', 'Historische sfeer'],
  alde_feanen: ['Nationaal Park', 'Alleen over water bereikbaar', 'Unieke logistiek', 'Natuurlijk Friesland'],
  oudehaske: ['Recreatiemeer', 'Duikschool op park', 'Actieve faciliteiten', 'Watersport'],
  sneekermeer: ['Friese meren', 'Sneekweek evenement', 'Echt zeilen', 'Nautische traditie'],
  terherne: ['Kameleon dorp', 'Havenwoningen', 'Echt Fries varen', 'Authentiek'],
  terkaple: ['Kleinschalig aan water', 'Rustige omgeving', 'Friese meren', 'Intiem park'],

  // Groningen
  wedderplassen: ['Nieuwe zwemplas', 'Weidse omgeving', 'Modern park', 'Gronings platteland'],
  bourtange: ['Historische vesting', 'Cultuur en rust', 'Unieke omgeving', 'Karakteristiek Groningen'],
  suyderoogh: ['Nationaal Park Lauwersmeer', 'Donkerte voor sterren', 'Echte natuur', 'Bijzondere locatie'],
  glamping_lauwersmeer: ['Safari accommodaties', 'Outdoor seizoenswerk', 'Glamping concept', 'Avontuurlijk'],

  // Utrecht
  amerongse_berg: ['Nationaal Park Utrechtse Heuvelrug', 'Populair bij fietsers', 'Rustige omgeving', 'Centraal in Nederland'],
  buytenplaets: ['Historische buitenplaats', 'Kleinschalig', 'Dierenpark Rhenen nabij', 'Karakteristieke setting'],
  thijmse_berg: ['Bosrijk park', 'Eigen brasserie', 'Centraal gelegen', 'Goed bereikbaar'],
  soof_heuvelrug: ['Duurzaam eco-concept', 'Wellness faciliteiten', 'Innovatief park', 'Groene omgeving'],

  // Waddeneilanden
  ameland_state: ['Werken op Ameland', 'Eilandgevoel', 'Appartementencomplex', 'Waddensfeer'],
  bosch_en_zee: ['Basis appartementen Ameland', 'Badgasten', 'Eilandleven', 'Eenvoudig en fijn'],
  beach_park_texel: ['Villa\'s op Texel', 'Werken op het eiland', 'Veel konijnen', 'Waddennatuur'],
  kaap_west: ['Luxe aan het Wad', 'Appartementen met horeca', 'Texel west', 'Premium eilandwerk'],
  kustpark_texel: ['Klassiek Texels park', 'Zwembad aanwezig', 'Duinomgeving', 'Familiesfeer'],
  roompot_ameland: ['Bij de vuurtoren', 'Duinen van Ameland', 'Eilandgevoel', 'Waddeneiland'],
  schuttersbos: ['Knus en kleinschalig', 'Jutters mentaliteit', 'Texel ontdekken', 'Intieme sfeer'],
  sluftervallei: ['Unieke duinvallei', 'Afgelegen op Texel', 'Hecht team', 'Bijzondere natuur'],
  boomhiemke: ['Groot park op Ameland', 'Wellness aanwezig', 'Busvervoer', 'Complete faciliteiten'],
  vogelmient: ['Luxe villa\'s Texel', 'Strand bereikbaar', 'Rust en ruimte', 'Premium accommodaties'],
  vitamaris: ['Appartementen Vlieland', 'Autovrij eiland', 'Elektrokarren', 'Uniek vervoer'],
  vlieduyn: ['Duinen van Vlieland', 'Autovrij werken', 'Appartementencomplex', 'Eilandrust'],
  west_terschelling: ['Haven Terschelling', 'Levendige omgeving', 'Appartementencomplex', 'Eiland bruist'],

  // België - Vlaanderen
  breeduyn: ['Nieuw park aan kust', 'Duinen bij Oostende', 'Modern België', 'Vlaamse kust'],
  mooi_zutendaal: ['Design van Jan des Bouvrie', 'Bosrijk Limburg', 'Luxe accommodaties', 'Belgisch bos'],
  eksel: ['Natuurgebied België', 'Padelbanen', 'Buitenleven', 'Vlaamse natuur'],

  // België - Wallonië
  your_nature: ['Architectonisch bijzonder', 'Eco-resort in bos', 'Ardennen natuur', 'Duurzaam concept'],
  neufchateau: ['Glamping in Ardennen', 'Outdoor activiteiten', 'Belgische natuur', 'Avontuurlijk'],
  namur: ['Rotsachtige omgeving', 'Klimmen mogelijk', 'Ardennen sport', 'Actief België'],
  saint_hubert: ['Diep in de bossen', 'Back to nature', 'Wilde Ardennen', 'Echte rust'],
  grandvoir: ['Heuvelachtig uitzicht', 'Rustieke omgeving', 'Ardennen panorama', 'Belgisch platteland'],
  eau_dheure: ['Meren van Eau d\'Heure', 'Watersport centraal', 'Heuvelachtig', 'Belgisch water'],
  gottales: ['Sprookjesachtig park', 'Steile hellingen', 'Rustieke sfeer', 'Magische omgeving'],

  // Duitsland
  arber: ['Beierse Woud', 'Grensstreek', 'Wandelparadijs', 'Duitse natuur'],
  bergresort_winterberg: ['Wintersport resort', 'Veel Nederlanders', 'Skiën en fietsen', 'Bergsfeer'],
  winterberg_park: ['Piste voor de deur', 'Mountainbike zomer', 'Sneeuwruimen', 'Seizoenswerk'],
  mont_royal: ['Wijngaarden Moezel', 'Prachtig uitzicht', 'Ruime kavels', 'Duitse wijn'],
  sonnenberg: ['Kinderspeelparadijs', 'Berg en wijn', 'Familie Duitsland', 'Levendig park'],
  cochem: ['Golfbaan aanwezig', 'Luxe villa\'s', 'Toeristisch Moezel', 'Duitse gastvrijheid'],
  eifeler_tor: ['Nationaal Park Eifel', 'Heuvelachtig', 'Appartementencomplex', 'Duitse natuur'],
  kronenburger_see: ['Stuwmeer Eifel', 'Steile omgeving', 'Trappenlopen', 'Waterrijk'],
  wirfttal: ['Bosrijk Eifel', 'Camping sfeer', 'Outdoor Duitsland', 'Groene omgeving'],
  hochwald: ['Groot park bij stuwmeer', 'Kinderspeelparadijs', 'Veel faciliteiten', 'Familie Duitsland'],
  warsberg: ['Kabelbaan nabij', 'Berg locatie', 'Camping en meer', 'Actief Duitsland'],
  salztal: ['Zwemparadijs', 'Winter én zomer', 'Wandelen', 'Veelzijdig park'],
  hansa: ['Bij HANSA-PARK pretpark', 'Aan de Oostzee', 'Levendig', 'Entertainment'],
  travemunde: ['Badplaats Oostzee', 'Grote schepen', 'Strandsfeer', 'Maritiem Duitsland'],
  dwergter_de: ['Grensstreek', 'Bos en heide', 'Rustig Duitsland', 'Nabij Nederland'],
  marissa: ['Scandinavisch design', 'Meer omgeving', 'Hip en modern', 'Trendy Duitsland'],
  bad_bentheim: ['Vlak over de grens', 'Badhuis traditie', 'Kasteel', 'Veel Nederlanders'],
  rheinsberg: ['Hafendorf concept', 'Steiger en vuurtoren', 'Nautisch Duitsland', 'Bijzonder park'],

  // Denemarken
  ebeltoft: ['Deense Oostzee', 'Maritiem park', 'Nationaal Park', 'Scandinavische rust'],
  fyrklit: ['Ruige duinen', 'Bunkers uit oorlog', 'Deense westkust', 'Authentiek'],
  gronhoj: ['Familie strandpark', 'Deens strand', 'Gezellig', 'Scandinavisch'],
  ronbjerg: ['Sportief park', 'Actief Denemarken', 'Faciliteiten', 'Dynamisch'],
  seawest: ['Overdekt zwembad', 'Modern park', 'Duinomgeving', 'Familie Denemarken'],
  sohojlandet: ['Heuvelachtig Denemarken', 'Mountainbike', 'Bossen', 'Actieve natuur'],

  // Oostenrijk
  dachstein: ['Chalets in de bergen', 'Skiën', 'Familie Oostenrijk', 'Alpen sfeer'],
  bad_kleinkirchheim: ['Ski en thermen', 'Gezellig bergdorp', 'Wellness', 'Wintersport'],
  gerlitzen: ['Berg uitzicht', 'Oostenrijkse alpen', 'Panorama', 'Hoogte'],
  tauernblick: ['Wandelen en skiën', 'Alpen panorama', 'Actieve bergen', 'Veelzijdig'],
  zugspitze: ['Bij hoogste berg', 'Imposant', 'Luxe chalets', 'Premium Oostenrijk'],
  brandnertal: ['Ski-in concept', 'Plateau ligging', 'Familie ski', 'Direct de piste op'],
  rauris: ['Historisch mijnstadje', 'Appartementen', 'Wintersport', 'Authentiek'],
  chalet_matin: ['Rustig en klein', 'Dependance sfeer', 'Oostenrijkse rust', 'Intiem'],
  clofers: ['Modern design', 'Ski chalets', 'Strak Oostenrijk', 'Eigentijds'],
  kitzbuhel: ['Chique skioord', 'High-end', 'Wereldberoemd', 'Exclusief Oostenrijk'],
  hochmontafon: ['Sneeuwzeker hoog', 'Grensstreek', 'Echte bergen', 'Wintergarantie'],
  katschberg: ['Autovrij skigebied', 'Bergpas locatie', 'Familie ski', 'Sneeuwzeker'],
  kreischberg: ['Houten chalets', 'Familie piste', 'Gezellig', 'Authentiek skiën'],
  montafon_suites: ['Luxe suites', 'Kleinschalig', 'Premium', 'Exclusief'],
  maria_alm: ['Resort in dorp', 'Exclusieve sfeer', 'Oostenrijks dorp', 'Authentiek luxe'],

  // Zwitserland
  lenzerheide: ['Topskigebied', 'Zwitserse kwaliteit', 'Sport centraal', 'Premium locatie'],
  vierwaldstattersee: ['Wellness met uitzicht', 'Sport en spa', 'Zwitsers meer', 'Spectaculair'],

  // Tsjechië
  lipno: ['Stuwmeer Lipno', 'Zomer en winter', 'Tsjechisch park', 'Veelzijdig'],

  // Hongarije
  balaton: ['Balatonmeer', 'Strand sfeer', 'Hongaars meer', 'Zomerse vakantie'],

  // Verenigd Koninkrijk
  gwel_an_mor: ['Luxe Cornwall', 'Bruiloften en spa', 'Engelse kust', 'Premium UK'],
  darwin_forest: ['Bossen Peak District', 'Cottages', 'Engelse heuvels', 'Natuurlijk UK'],
  piperdam: ['Schotse golf', 'Loch uitzicht', 'Spa aanwezig', 'Schots landschap'],
  clowance: ['Historisch landgoed', 'Groot terrein', 'Engels erfgoed', 'Karakteristiek'],
  uk_overig: ['Britse lodges', 'Hot tubs', 'Rust UK', 'Engels platteland'],
};

// Fallback highlights per vibe als park niet specifiek gedefinieerd is
const vibeHighlights = {
  luxe: ['Premium omgeving', 'Topfaciliteiten', 'Professioneel team', 'Training op niveau'],
  kinderen: ['Energieke sfeer', 'Gezinnen als gasten', 'Afwisselend werk', 'Creatief bezig'],
  natuur: ['In de natuur', 'Rustige sfeer', 'Mooie omgeving', 'Frisse lucht'],
  strand: ['Aan zee', 'Strandgevoel', 'Vakantiesfeer', 'Strand na werk'],
  actief: ['Sportieve sfeer', 'Dynamisch werk', 'Actieve collega\'s', 'Zelf sporten'],
  wellness: ['Ontspannen sfeer', 'Wellness faciliteiten', 'Focus op welzijn', 'Spa korting'],
  familie: ['Gezellige sfeer', 'Hecht team', 'Blije gasten', 'Sociaal'],
  watersport: ['Aan het water', 'Buitenomgeving', 'Nautische sfeer', 'Watersport'],
};

// Exporteer functie om highlights op te halen voor gebruik in AI service
export const getHighlightsForPark = (parkId, vibe) => {
  return parkHighlights[parkId] || vibeHighlights[vibe] || vibeHighlights.natuur;
};

export const generateLocalization = (profile, park, customBeschrijving = null) => {
  const t = vibeConfigs[park.vibe] || vibeConfigs.natuur;

  // Gebruik aangepaste beschrijving indien aanwezig, anders default
  const beschrijving = customBeschrijving || profile.description;

  // Probeer eerst park-specifieke highlights, anders fallback naar vibe
  const highlights = getHighlightsForPark(park.id, park.vibe);

  // Bepaal realistische standaardwaarden op basis van functie
  const titleLower = profile.title.toLowerCase();
  const isFullTime = titleLower.includes('manager') || titleLower.includes('chef');
  const isHoreca = titleLower.includes('horeca') || titleLower.includes('kok') || titleLower.includes('bediening');
  const isTechnisch = titleLower.includes('technisch') || titleLower.includes('onderhoud');

  let salaris = '€2.200 - €2.600 bruto p/m';
  let uren = '24-32 uur per week';
  if (isFullTime) {
    salaris = '€2.800 - €3.400 bruto p/m';
    uren = '36-40 uur per week';
  } else if (isHoreca) {
    salaris = '€2.000 - €2.400 bruto p/m';
  } else if (isTechnisch) {
    salaris = '€2.400 - €2.900 bruto p/m';
    uren = '32-40 uur per week';
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
    intro: `${t.intro} Werk als ${profile.title.toLowerCase()} bij ${park.name} en maak deel uit van ons team.`,
    searchVariants: [profile.title, `${profile.title} vakantiepark`, `${profile.title} recreatie`],
    roleDescription: `Als ${profile.title.toLowerCase()} bij ${park.name} ben jij het gezicht van ons park. ${beschrijving} Je werkt in een ${t.label.toLowerCase()} omgeving waar gastvrijheid centraal staat.`,
    dailyTasks: [
      'Gasten ontvangen en begeleiden',
      'Zorgen voor een optimale gastbeleving',
      'Samenwerken met je teamleden',
      'Bijdragen aan de dagelijkse operatie',
      'Proactief inspelen op gastvragen'
    ],
    responsibilities: [
      'Verantwoordelijk voor kwaliteit van dienstverlening',
      'Zelfstandig werkzaamheden uitvoeren',
      'Signaleren en oplossen van problemen',
      'Bijdragen aan teamdoelstellingen'
    ],
    team: `Je komt te werken in een hecht team van collega's die samen zorgen voor tevreden gasten. De sfeer is ${t.label.toLowerCase()} en informeel.`,
    reportingTo: 'Parkmanager',
    growthPath: 'Bij Landal kun je doorgroeien naar senior functies of andere parken. We bieden interne opleidingen en de mogelijkheid om ervaring op te doen in verschillende afdelingen.',
    whyThisRole: `Onze gasten komen naar ${park.name} voor ontspanning en een onvergetelijke vakantie. Jij zorgt ervoor dat ze zich welkom voelen en alles naar wens verloopt.`,
    mustHaves: [
      'Ervaring in een soortgelijke functie',
      'Goede beheersing van Nederlands',
      'Gastgerichte instelling',
      'Flexibel inzetbaar (ook weekenden)'
    ],
    niceToHaves: [
      'Beheersing van Duits en/of Engels',
      'Ervaring in de recreatiesector',
      'Rijbewijs B'
    ],
    benefits: [
      'Werken in een prachtige omgeving',
      'Korting op verblijven bij Landal parken',
      'Gezellig en informeel team',
      'Mogelijkheden voor groei en ontwikkeling',
      'Reiskostenvergoeding'
    ],
    uren,
    salaris,
    dienstverband: 'Tijdelijk met uitzicht op vast',
    locatie: `${park.name}, ${park.countryLabel || 'Nederland'}`,
    applicationProcess: [
      'Solliciteer via de website',
      'Telefonische kennismaking',
      'Gesprek op locatie',
      'Binnen een week uitsluitsel'
    ],
    highlights,
    generated: true,
    aiGenerated: false,
    date: new Date().toLocaleDateString('nl-NL'),
  };
};
