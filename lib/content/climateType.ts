/**
 * A simplified Köppen–Geiger classification from the 12 monthly averages,
 * plus a one-line description in every language. It gives each city page a
 * sentence that is genuinely about that city's climate (a Canarian town, a
 * Castilian plateau town and a Galician port read differently), instead of
 * the same template with other numbers.
 */
import type { CityClimate } from "@/lib/data/months";
import type { AnyLocale } from "@/lib/i18n/routing";

export type ClimateType =
  | "tropicalRain"
  | "monsoon"
  | "savanna"
  | "desert"
  | "steppe"
  | "mediterranean"
  | "subtropical"
  | "dryWinter"
  | "oceanic"
  | "continentalHot"
  | "continental"
  | "subarctic"
  | "polar";

export function climateType(c: CityClimate, lat: number): ClimateType {
  const mean = c.tMax.map((hi, i) => (hi + c.tMin[i]!) / 2);
  const warm = Math.max(...mean);
  const cold = Math.min(...mean);
  const P = c.precipMm.reduce((a, b) => a + b, 0);
  const Tann = mean.reduce((a, b) => a + b, 0) / 12;
  const south = lat < 0;
  // "Summer" half-year: Apr–Sep in the north, Oct–Mar in the south.
  const summer = (i: number) => (south ? i >= 9 || i <= 2 : i >= 3 && i <= 8);
  const Ps = c.precipMm.filter((_, i) => summer(i)).reduce((a, b) => a + b, 0);
  const share = P > 0 ? Ps / P : 0.5;
  const threshold = 20 * Tann + (share >= 0.7 ? 280 : share >= 0.3 ? 140 : 0);

  if (warm < 10) return "polar";
  if (P < threshold / 2) return "desert";
  if (P < threshold) return "steppe";

  const driest = Math.min(...c.precipMm);
  if (cold >= 18) {
    if (driest >= 60) return "tropicalRain";
    if (driest >= 100 - P / 25) return "monsoon";
    return "savanna";
  }

  const summerDry = Math.min(...c.precipMm.filter((_, i) => summer(i)));
  const winterWet = Math.max(...c.precipMm.filter((_, i) => !summer(i)));
  const winterDry = Math.min(...c.precipMm.filter((_, i) => !summer(i)));
  const summerWet = Math.max(...c.precipMm.filter((_, i) => summer(i)));
  const warmMonths = mean.filter((t) => t >= 10).length;

  if (cold > -3) {
    if (summerDry < 40 && summerDry < winterWet / 3) return "mediterranean";
    if (winterDry < summerWet / 10) return "dryWinter";
    if (warm >= 22) return "subtropical";
    return "oceanic";
  }
  if (warm >= 22) return "continentalHot";
  if (warmMonths >= 4) return "continental";
  return "subarctic";
}

type Lines = Record<ClimateType, string>;

const NAMES: Record<AnyLocale, Lines> = {
  en: {
    tropicalRain: "a tropical rainforest climate: hot and humid all year, with rain in every month",
    monsoon: "a tropical monsoon climate: hot all year, with a short dry season and a very wet one",
    savanna: "a tropical savanna climate: warm all year, with a clear dry season and a rainy season",
    desert: "a desert climate: very little rain, strong sun and big swings between day and night",
    steppe: "a semi-arid climate: dry for most of the year, with only a little rain",
    mediterranean: "a Mediterranean climate: dry, warm to hot summers and mild, wetter winters",
    subtropical: "a humid subtropical climate: hot, humid summers and mild winters",
    dryWinter: "a climate with a dry winter and a rainy summer season",
    oceanic: "a temperate oceanic climate: summers are rarely very hot and rain is spread across the seasons",
    continentalHot: "a continental climate with hot summers and cold winters",
    continental: "a continental climate: warm summers and cold, often frosty winters",
    subarctic: "a subarctic climate: short, cool summers and long, very cold winters",
    polar: "a polar climate: cold all year, with only a brief, chilly summer",
  },
  it: {
    tropicalRain: "un clima equatoriale: caldo e umido tutto l'anno, con pioggia in ogni mese",
    monsoon: "un clima monsonico: caldo tutto l'anno, con una breve stagione secca e una molto piovosa",
    savanna: "un clima tropicale di savana: caldo tutto l'anno, con una stagione secca e una delle piogge",
    desert: "un clima desertico: pochissima pioggia, sole intenso e forti escursioni tra giorno e notte",
    steppe: "un clima semiarido: secco per gran parte dell'anno, con poche piogge",
    mediterranean: "un clima mediterraneo: estati secche e calde, inverni miti e più piovosi",
    subtropical: "un clima subtropicale umido: estati calde e afose, inverni miti",
    dryWinter: "un clima con inverno secco e una stagione estiva delle piogge",
    oceanic: "un clima temperato oceanico: estati raramente molto calde e piogge distribuite nelle stagioni",
    continentalHot: "un clima continentale con estati calde e inverni freddi",
    continental: "un clima continentale: estati tiepide e inverni freddi, spesso con gelate",
    subarctic: "un clima subartico: estati brevi e fresche, inverni lunghi e molto freddi",
    polar: "un clima polare: freddo tutto l'anno, con un'estate breve e fresca",
  },
  de: {
    tropicalRain: "ein tropisches Regenwaldklima: ganzjährig heiß und feucht, mit Regen in jedem Monat",
    monsoon: "ein tropisches Monsunklima: ganzjährig heiß, mit kurzer Trocken- und ausgeprägter Regenzeit",
    savanna: "ein Savannenklima: ganzjährig warm, mit klarer Trocken- und Regenzeit",
    desert: "ein Wüstenklima: kaum Regen, starke Sonne und große Unterschiede zwischen Tag und Nacht",
    steppe: "ein Steppenklima: die meiste Zeit trocken, mit wenig Regen",
    mediterranean: "ein Mittelmeerklima: trockene, warme bis heiße Sommer und milde, feuchtere Winter",
    subtropical: "ein feuchtes Subtropenklima: heiße, schwüle Sommer und milde Winter",
    dryWinter: "ein Klima mit trockenem Winter und sommerlicher Regenzeit",
    oceanic: "ein gemäßigtes ozeanisches Klima: selten sehr heiße Sommer und Regen über alle Jahreszeiten verteilt",
    continentalHot: "ein Kontinentalklima mit heißen Sommern und kalten Wintern",
    continental: "ein Kontinentalklima: warme Sommer und kalte, oft frostige Winter",
    subarctic: "ein subarktisches Klima: kurze, kühle Sommer und lange, sehr kalte Winter",
    polar: "ein Polarklima: ganzjährig kalt, mit nur kurzem, kühlem Sommer",
  },
  fr: {
    tropicalRain: "un climat équatorial : chaud et humide toute l'année, avec de la pluie chaque mois",
    monsoon: "un climat de mousson : chaud toute l'année, avec une courte saison sèche et une saison très humide",
    savanna: "un climat tropical de savane : chaud toute l'année, avec une saison sèche et une saison des pluies",
    desert: "un climat désertique : très peu de pluie, un soleil fort et de gros écarts entre le jour et la nuit",
    steppe: "un climat semi-aride : sec la plus grande partie de l'année, avec peu de pluie",
    mediterranean: "un climat méditerranéen : étés secs et chauds, hivers doux et plus humides",
    subtropical: "un climat subtropical humide : étés chauds et moites, hivers doux",
    dryWinter: "un climat à hiver sec et saison des pluies en été",
    oceanic: "un climat tempéré océanique : des étés rarement très chauds et des pluies réparties sur les saisons",
    continentalHot: "un climat continental aux étés chauds et aux hivers froids",
    continental: "un climat continental : étés tièdes et hivers froids, souvent avec du gel",
    subarctic: "un climat subarctique : étés courts et frais, hivers longs et très froids",
    polar: "un climat polaire : froid toute l'année, avec un été court et frais",
  },
  es: {
    tropicalRain: "un clima ecuatorial: cálido y húmedo todo el año, con lluvia todos los meses",
    monsoon: "un clima monzónico: cálido todo el año, con una estación seca corta y otra muy lluviosa",
    savanna: "un clima tropical de sabana: cálido todo el año, con una estación seca y otra de lluvias",
    desert: "un clima desértico: muy poca lluvia, sol intenso y grandes diferencias entre el día y la noche",
    steppe: "un clima semiárido: seco la mayor parte del año y con pocas lluvias",
    mediterranean: "un clima mediterráneo: veranos secos y calurosos, inviernos suaves y más lluviosos",
    subtropical: "un clima subtropical húmedo: veranos calurosos y bochornosos, inviernos suaves",
    dryWinter: "un clima de invierno seco y estación de lluvias en verano",
    oceanic: "un clima templado oceánico: veranos pocas veces muy calurosos y lluvias repartidas entre las estaciones",
    continentalHot: "un clima continental de veranos calurosos e inviernos fríos",
    continental: "un clima continental: veranos templados e inviernos fríos, a menudo con heladas",
    subarctic: "un clima subártico: veranos cortos y frescos, inviernos largos y muy fríos",
    polar: "un clima polar: frío todo el año, con un verano breve y fresco",
  },
  pt: {
    tropicalRain: "um clima equatorial: quente e húmido todo o ano, com chuva em todos os meses",
    monsoon: "um clima de monção: quente todo o ano, com uma estação seca curta e outra muito chuvosa",
    savanna: "um clima tropical de savana: quente todo o ano, com uma estação seca e outra de chuvas",
    desert: "um clima desértico: muito pouca chuva, sol forte e grandes diferenças entre o dia e a noite",
    steppe: "um clima semiárido: seco durante a maior parte do ano, com pouca chuva",
    mediterranean: "um clima mediterrânico: verões secos e quentes, invernos amenos e mais chuvosos",
    subtropical: "um clima subtropical húmido: verões quentes e abafados, invernos amenos",
    dryWinter: "um clima de inverno seco e estação das chuvas no verão",
    oceanic: "um clima temperado oceânico: verões raramente muito quentes e chuva distribuída pelas estações",
    continentalHot: "um clima continental de verões quentes e invernos frios",
    continental: "um clima continental: verões amenos e invernos frios, muitas vezes com geada",
    subarctic: "um clima subártico: verões curtos e frescos, invernos longos e muito frios",
    polar: "um clima polar: frio todo o ano, com um verão curto e fresco",
  },
  nl: {
    tropicalRain: "een tropisch regenwoudklimaat: het hele jaar heet en vochtig, met regen in elke maand",
    monsoon: "een moessonklimaat: het hele jaar heet, met een korte droge en een heel natte periode",
    savanna: "een savanneklimaat: het hele jaar warm, met een duidelijk droog en nat seizoen",
    desert: "een woestijnklimaat: nauwelijks regen, felle zon en grote verschillen tussen dag en nacht",
    steppe: "een steppeklimaat: het grootste deel van het jaar droog, met weinig regen",
    mediterranean: "een mediterraan klimaat: droge, warme tot hete zomers en zachte, nattere winters",
    subtropical: "een vochtig subtropisch klimaat: hete, benauwde zomers en zachte winters",
    dryWinter: "een klimaat met een droge winter en een regenseizoen in de zomer",
    oceanic: "een gematigd zeeklimaat: zelden erg hete zomers en regen verspreid over de seizoenen",
    continentalHot: "een landklimaat met hete zomers en koude winters",
    continental: "een landklimaat: warme zomers en koude winters met vaak vorst",
    subarctic: "een subarctisch klimaat: korte, koele zomers en lange, zeer koude winters",
    polar: "een poolklimaat: het hele jaar koud, met maar een korte, frisse zomer",
  },
  pl: {
    tropicalRain: "klimat równikowy: gorąco i wilgotno przez cały rok, z opadami w każdym miesiącu",
    monsoon: "klimat monsunowy: gorąco przez cały rok, z krótką porą suchą i bardzo deszczową porą mokrą",
    savanna: "klimat sawann: ciepło przez cały rok, z wyraźną porą suchą i deszczową",
    desert: "klimat pustynny: bardzo mało opadów, mocne słońce i duże różnice między dniem a nocą",
    steppe: "klimat półsuchy: sucho przez większą część roku, z niewielkimi opadami",
    mediterranean: "klimat śródziemnomorski: suche, ciepłe lub gorące lata i łagodne, wilgotniejsze zimy",
    subtropical: "wilgotny klimat podzwrotnikowy: gorące, parne lata i łagodne zimy",
    dryWinter: "klimat z suchą zimą i porą deszczową latem",
    oceanic: "umiarkowany klimat oceaniczny: rzadko upalne lata i opady rozłożone na wszystkie pory roku",
    continentalHot: "klimat kontynentalny z gorącymi latami i mroźnymi zimami",
    continental: "klimat kontynentalny: ciepłe lata i zimne, często mroźne zimy",
    subarctic: "klimat subarktyczny: krótkie, chłodne lata i długie, bardzo mroźne zimy",
    polar: "klimat polarny: zimno przez cały rok, z krótkim i chłodnym latem",
  },
};

/** "a Mediterranean climate: dry, warm to hot summers…" in the given language. */
export function climateTypeLine(locale: AnyLocale, t: ClimateType): string {
  return (NAMES[locale] ?? NAMES.en)[t];
}
