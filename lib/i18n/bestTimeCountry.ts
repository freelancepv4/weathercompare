/**
 * Copy for the country-level "best time to visit" pages, in every language
 * the site publishes.
 *
 * A deliberate grammatical decision runs through this whole file: no sentence
 * ever puts a preposition in front of the country name. These pages are built
 * for 225 countries from one set of strings, and every language the site
 * serves inflects country names differently — "in Spagna" but "negli Stati
 * Uniti", "en Espagne" but "au Japon" and "aux Pays-Bas", "nach Spanien" but
 * "in die Türkei", and Polish declines the noun itself ("w Hiszpanii",
 * "w Stanach Zjednoczonych"). A template that guesses would produce broken
 * grammar on a long tail of countries, and broken grammar is exactly what
 * makes a page read as machine-made.
 *
 * So headings use apposition ("Spanien: beste Reisezeit"), and body sentences
 * refer back to "the country" / "das Land" / "il Paese" / "le pays" rather
 * than repeating an inflected name. It costs a little elegance in the
 * headline and buys correctness in all 225.
 *
 * Numbers come from lib/content/countryClimate.ts (2011–2020 normals).
 */
import type { CountryVerdict } from "@/lib/content/countryClimate";
import type { AnyLocale } from "./routing";

export interface BestTimeCountryCopy {
  eyebrow: string;
  /** <title> */
  title: (k: string) => string;
  /** <meta name="description"> */
  desc: (k: string, best: string, lo: number, hi: number) => string;
  keywords: (k: string) => string[];
  h1: (k: string) => string;

  /** Opening answer — written to be liftable verbatim as a snippet. */
  answer: (best: string, hi: number, lo: number, rain: number) => string;
  /** Says which cities the headline figures average, so the basis is visible. */
  basis: (n: number, cities: string) => string;

  /** The "a country is not one climate" section. */
  spreadH: string;
  /** `monthIn` is the "in {month}" phrase (monthInfo().inMonth), not the bare name. */
  spreadLead: (monthIn: string, gap: number) => string;
  spreadDetail: (warmCity: string, warmHi: number, coolCity: string, coolHi: number) => string;
  spreadAdvice: string;
  /** Shown instead, for countries whose cities really are alike. */
  noSpread: string;

  seasonsH: string;
  seasonRange: (from: string, to: string) => string;
  verdict: Record<CountryVerdict, string>;
  verdictText: Record<CountryVerdict, string>;

  tableH: (k: string) => string;
  tableIntro: string;
  cols: [string, string, string, string, string];

  citiesH: string;
  citiesIntro: (n: number) => string;
  cityCols: [string, string, string];
  cityMore: (n: number) => string;

  faqH: string;
  qBest: (k: string) => string;
  aBest: (best: string, hi: number, lo: number, rain: number) => string;
  qWarmest: (k: string) => string;
  aWarmest: (warm: string, warmHi: number, cool: string, coolHi: number) => string;
  qRain: (k: string) => string;
  aRain: (wet: string, wetMm: number, dry: string, dryMm: number) => string;
  qQuiet: (k: string) => string;
  aQuiet: (shoulder: string, best: string) => string;
  aQuietNone: (best: string) => string;
  qWhereWarm: (k: string, monthIn: string) => string;
  aWhereWarm: (warmCity: string, warmHi: number, coolCity: string, coolHi: number, monthIn: string) => string;
  qMonthGood: (k: string, month: string) => string;
  aMonthGood: (month: string, hi: number, lo: number, mm: number, isBest: boolean, best: string) => string;

  sources: string;
  sourcesLink: string;
  ctaH: string;
  ctaForecast: string;
  ctaWhere: string;
  ctaCities: string;
  breadcrumb: string;
}

const EN: BestTimeCountryCopy = {
  eyebrow: "Country climate guide",
  title: (k) => `Best Time to Visit ${k}: Month by Month`,
  desc: (k, best, lo, hi) =>
    `The best time to visit ${k} is ${best}, with highs near ${hi}°C and lows near ${lo}°C. Month-by-month averages, the quiet shoulder season, and where in the country stays warmest.`,
  keywords: (k) => [
    `best time to visit ${k}`,
    `when to go to ${k}`,
    `${k} weather by month`,
    `${k} climate`,
    `hottest month in ${k}`,
    `rainiest month in ${k}`,
    `cheapest time to visit ${k}`,
  ],
  h1: (k) => `${k}: the best time to visit`,
  answer: (best, hi, lo, rain) =>
    `The best months are ${best}, when daytime highs average ${hi}°C, nights settle around ${lo}°C and roughly ${rain} mm of rain falls in a month. That is the window with the most reliable weather across the country's main destinations.`,
  basis: (n, cities) =>
    `These headline figures average the ${n} destinations travellers ask about most — ${cities} — rather than every town on the map, so they describe the trip most people are actually planning.`,
  spreadH: "One country, more than one climate",
  spreadLead: (monthIn, gap) =>
    `The gap is widest ${monthIn}, when the warmest and coolest places in the country are about ${gap}°C apart.`,
  spreadDetail: (warmCity, warmHi, coolCity, coolHi) =>
    `${warmCity} averages ${warmHi}°C that month, while ${coolCity} reaches only ${coolHi}°C.`,
  spreadAdvice:
    "So the honest answer to \"when should I go?\" depends on where you are landing. Pick the city you are actually flying into from the table below and use its months, not the national average.",
  noSpread:
    "The country is compact enough that its cities share one broadly similar pattern, so the months above hold wherever you base yourself.",
  seasonsH: "Season by season",
  seasonRange: (from, to) => `${from}–${to}`,
  verdict: { ideal: "Best window", good: "Workable", hot: "Very hot", rainy: "Wet", cold: "Cold" },
  verdictText: {
    ideal: "The sweet spot: warm enough to be outside all day, without the peak-season extremes.",
    good: "Perfectly travellable, just short of the best weather of the year.",
    hot: "Hot enough that midday sightseeing becomes hard work — plan early starts and long lunches.",
    rainy: "The wettest stretch of the year. Rain rarely cancels a trip, but it will shape the itinerary.",
    cold: "Cold season. Worth it for winter scenery, quiet cities and low prices, not for beach weather.",
  },
  tableH: (k) => `${k} weather by month`,
  tableIntro:
    "Average daily high and low, monthly rainfall and cloud cover, from 2011–2020 records across the destinations listed above.",
  cols: ["Month", "Avg high", "Avg low", "Rainfall", "Cloud"],
  citiesH: "Best months, city by city",
  citiesIntro: (n) =>
    `The national picture hides a lot. Here is every one of the ${n} places in the country with climate records, and the three months that score best in each.`,
  cityCols: ["City", "Best months", "Typical highs then"],
  cityMore: (n) => `Show all ${n} cities`,
  faqH: "Common questions",
  qBest: (k) => `When is the best time to visit ${k}?`,
  aBest: (best, hi, lo, rain) =>
    `${best}. Across the country's main destinations those months average highs of ${hi}°C, lows of ${lo}°C and about ${rain} mm of rain, which is the most dependable combination of the year.`,
  qWarmest: (k) => `What is the hottest month in ${k}?`,
  aWarmest: (warm, warmHi, cool, coolHi) =>
    `${warm}, averaging ${warmHi}°C by day. The coolest is ${cool} at about ${coolHi}°C, so the year swings roughly ${Math.abs(warmHi - coolHi)}°C between the two.`,
  qRain: (k) => `Which month is wettest in ${k}?`,
  aRain: (wet, wetMm, dry, dryMm) =>
    `${wet}, with around ${wetMm} mm on average. The driest month is ${dry} at about ${dryMm} mm. Monthly totals say how much falls, not how many days it rains — a wet month can still be mostly sunny with a few heavy afternoons.`,
  qQuiet: (k) => `When is the quietest time to visit ${k}?`,
  aQuiet: (shoulder, best) =>
    `${shoulder} — the months either side of the ${best} peak. You trade a few degrees for noticeably thinner crowds and lower prices, which is usually the better deal.`,
  aQuietNone: (best) =>
    `There is no comfortable shoulder month here: conditions move fairly sharply from the ${best} window into weather most visitors would rather avoid.`,
  qWhereWarm: (k, monthIn) => `Where in ${k} is warmest ${monthIn}?`,
  aWhereWarm: (warmCity, warmHi, coolCity, coolHi, monthIn) =>
    `${warmCity}, averaging ${warmHi}°C ${monthIn}, against ${coolHi}°C in ${coolCity}. If warmth is the priority that month, head for ${warmCity} rather than relying on the national average.`,
  qMonthGood: (k, month) => `Is ${month} a good time to visit ${k}?`,
  aMonthGood: (month, hi, lo, mm, isBest, best) =>
    isBest
      ? `Yes. ${month} is one of the three best months of the year, averaging ${hi}°C by day, ${lo}°C at night and about ${mm} mm of rain.`
      : `${month} averages ${hi}°C by day, ${lo}°C at night and about ${mm} mm of rain. It is travellable, but ${best} are the stronger months if your dates are flexible.`,
  sources:
    "Averages calculated from NASA POWER / ERA5 reanalysis, 2011–2020. These are long-term climate normals, not a forecast.",
  sourcesLink: "How we source this",
  ctaH: "Plan the actual trip",
  ctaForecast: "Live 14-day forecast",
  ctaWhere: "Where to go this month",
  ctaCities: "All cities in this country",
  breadcrumb: "Best time to visit",
};

const ES: BestTimeCountryCopy = {
  eyebrow: "Guía climática del país",
  title: (k) => `${k}: mejor época para viajar, mes a mes`,
  desc: (k, best, lo, hi) =>
    `La mejor época para viajar a ${k} es ${best}, con máximas de ${hi}°C y mínimas de ${lo}°C. Medias mes a mes, la temporada media y qué zona del país es más cálida.`,
  keywords: (k) => [
    `mejor época para viajar a ${k}`,
    `cuándo viajar a ${k}`,
    `clima de ${k} mes a mes`,
    `${k} clima`,
    `mes más caluroso de ${k}`,
    `mes más lluvioso de ${k}`,
  ],
  h1: (k) => `${k}: la mejor época para viajar`,
  answer: (best, hi, lo, rain) =>
    `Los mejores meses son ${best}: las máximas rondan los ${hi}°C, las noches se quedan cerca de ${lo}°C y caen unos ${rain} mm de lluvia al mes. Es la ventana con el tiempo más fiable en los principales destinos del país.`,
  basis: (n, cities) =>
    `Estas cifras promedian los ${n} destinos por los que más se pregunta — ${cities} — y no todos los municipios del mapa, así que describen el viaje que la mayoría está planeando de verdad.`,
  spreadH: "Un país, más de un clima",
  spreadLead: (monthIn, gap) =>
    `La diferencia es mayor ${monthIn}, cuando entre el punto más cálido y el más fresco del país hay unos ${gap}°C.`,
  spreadDetail: (warmCity, warmHi, coolCity, coolHi) =>
    `${warmCity} promedia ${warmHi}°C ese mes, mientras que ${coolCity} se queda en ${coolHi}°C.`,
  spreadAdvice:
    "Así que la respuesta honesta a «¿cuándo voy?» depende de dónde aterrices. Busca en la tabla de abajo la ciudad a la que vas de verdad y usa sus meses, no la media nacional.",
  noSpread:
    "El país es lo bastante compacto como para que sus ciudades compartan un patrón parecido, así que los meses de arriba valen te alojes donde te alojes.",
  seasonsH: "Estación por estación",
  seasonRange: (from, to) => `${from}–${to}`,
  verdict: { ideal: "Mejor momento", good: "Correcto", hot: "Mucho calor", rainy: "Lluvioso", cold: "Frío" },
  verdictText: {
    ideal: "El punto justo: calor suficiente para estar fuera todo el día, sin los extremos de la temporada alta.",
    good: "Perfectamente viajable, aunque sin llegar al mejor tiempo del año.",
    hot: "Tanto calor que visitar a mediodía cuesta: madruga y alarga las comidas.",
    rainy: "La época más húmeda del año. La lluvia rara vez cancela un viaje, pero sí condiciona el plan.",
    cold: "Temporada fría. Merece la pena por el paisaje invernal, las ciudades tranquilas y los precios bajos, no por la playa.",
  },
  tableH: (k) => `El clima de ${k} mes a mes`,
  tableIntro:
    "Máxima y mínima media diaria, lluvia mensual y nubosidad, según los registros de 2011–2020 en los destinos citados arriba.",
  cols: ["Mes", "Máx. media", "Mín. media", "Lluvia", "Nubes"],
  citiesH: "Los mejores meses, ciudad a ciudad",
  citiesIntro: (n) =>
    `La media nacional esconde mucho. Aquí están las ${n} localidades del país con registros climáticos y los tres meses que mejor puntúan en cada una.`,
  cityCols: ["Ciudad", "Mejores meses", "Máximas entonces"],
  cityMore: (n) => `Ver las ${n} ciudades`,
  faqH: "Preguntas frecuentes",
  qBest: (k) => `¿Cuál es la mejor época para viajar a ${k}?`,
  aBest: (best, hi, lo, rain) =>
    `${best}. En los principales destinos del país esos meses promedian máximas de ${hi}°C, mínimas de ${lo}°C y unos ${rain} mm de lluvia, la combinación más fiable del año.`,
  qWarmest: (k) => `¿Cuál es el mes más caluroso de ${k}?`,
  aWarmest: (warm, warmHi, cool, coolHi) =>
    `${warm}, con una media de ${warmHi}°C de día. El más fresco es ${cool}, en torno a ${coolHi}°C, así que el año oscila unos ${Math.abs(warmHi - coolHi)}°C entre ambos.`,
  qRain: (k) => `¿Cuál es el mes más lluvioso de ${k}?`,
  aRain: (wet, wetMm, dry, dryMm) =>
    `${wet}, con unos ${wetMm} mm de media. El más seco es ${dry}, con unos ${dryMm} mm. El total mensual dice cuánta agua cae, no cuántos días llueve: un mes húmedo puede ser soleado con alguna tarde de tormenta.`,
  qQuiet: (k) => `¿Cuándo hay menos gente en ${k}?`,
  aQuiet: (shoulder, best) =>
    `${shoulder}, los meses justo antes y después del pico de ${best}. Pierdes un par de grados y ganas bastante menos gente y precios más bajos, que suele compensar.`,
  aQuietNone: (best) =>
    `Aquí no hay un mes intermedio cómodo: se pasa bastante rápido de la ventana de ${best} a un tiempo que la mayoría prefiere evitar.`,
  qWhereWarm: (k, monthIn) => `¿Qué zona de ${k} es más cálida ${monthIn}?`,
  aWhereWarm: (warmCity, warmHi, coolCity, coolHi, monthIn) =>
    `${warmCity}, con una media de ${warmHi}°C ${monthIn}, frente a los ${coolHi}°C de ${coolCity}. Si ese mes buscas calor, ve a ${warmCity} en lugar de fiarte de la media nacional.`,
  qMonthGood: (k, month) => `¿Es ${month} buena época para viajar a ${k}?`,
  aMonthGood: (month, hi, lo, mm, isBest, best) =>
    isBest
      ? `Sí. ${month} es uno de los tres mejores meses del año: ${hi}°C de día, ${lo}°C de noche y unos ${mm} mm de lluvia.`
      : `En ${month} se promedian ${hi}°C de día, ${lo}°C de noche y unos ${mm} mm de lluvia. Se puede viajar, pero ${best} son mejores meses si tienes fechas flexibles.`,
  sources:
    "Medias calculadas a partir del reanálisis NASA POWER / ERA5, 2011–2020. Son normales climáticas a largo plazo, no una previsión.",
  sourcesLink: "De dónde salen estos datos",
  ctaH: "Planifica el viaje de verdad",
  ctaForecast: "Previsión a 14 días",
  ctaWhere: "Dónde viajar este mes",
  ctaCities: "Todas las ciudades del país",
  breadcrumb: "Mejor época para viajar",
};

const IT: BestTimeCountryCopy = {
  eyebrow: "Guida al clima del Paese",
  title: (k) => `${k}: quando andare, mese per mese`,
  desc: (k, best, lo, hi) =>
    `Il periodo migliore per andare in ${k} è ${best}, con massime di ${hi}°C e minime di ${lo}°C. Medie mese per mese, la stagione intermedia e le zone più calde del Paese.`,
  keywords: (k) => [
    `quando andare ${k}`,
    `periodo migliore ${k}`,
    `clima ${k} mese per mese`,
    `${k} clima`,
    `mese più caldo ${k}`,
    `mese più piovoso ${k}`,
  ],
  h1: (k) => `${k}: quando andare`,
  answer: (best, hi, lo, rain) =>
    `I mesi migliori sono ${best}: le massime si aggirano sui ${hi}°C, le notti restano intorno ai ${lo}°C e cadono circa ${rain} mm di pioggia al mese. È la finestra con il tempo più affidabile nelle principali mete del Paese.`,
  basis: (n, cities) =>
    `Queste cifre fanno la media delle ${n} mete più richieste — ${cities} — e non di ogni centro sulla mappa: descrivono quindi il viaggio che la maggior parte delle persone sta davvero programmando.`,
  spreadH: "Un Paese, più di un clima",
  spreadLead: (monthIn, gap) =>
    `Il divario è massimo ${monthIn}, quando tra il punto più caldo e quello più fresco del Paese corrono circa ${gap}°C.`,
  spreadDetail: (warmCity, warmHi, coolCity, coolHi) =>
    `${warmCity} segna in media ${warmHi}°C in quel mese, mentre ${coolCity} si ferma a ${coolHi}°C.`,
  spreadAdvice:
    "La risposta onesta alla domanda «quando parto?» dipende quindi da dove atterri. Cerca nella tabella qui sotto la città in cui vai davvero e usa i suoi mesi, non la media nazionale.",
  noSpread:
    "Il Paese è abbastanza compatto da avere città con un andamento simile: i mesi qui sopra valgono ovunque tu ti fermi.",
  seasonsH: "Stagione per stagione",
  seasonRange: (from, to) => `${from}–${to}`,
  verdict: { ideal: "Periodo migliore", good: "Accettabile", hot: "Molto caldo", rainy: "Piovoso", cold: "Freddo" },
  verdictText: {
    ideal: "Il punto giusto: caldo a sufficienza per stare fuori tutto il giorno, senza gli eccessi dell'alta stagione.",
    good: "Si viaggia benissimo, pur senza il tempo migliore dell'anno.",
    hot: "Così caldo che visitare a mezzogiorno diventa faticoso: partenze presto e pranzi lunghi.",
    rainy: "Il periodo più umido dell'anno. La pioggia raramente annulla un viaggio, ma ne cambia il programma.",
    cold: "Stagione fredda. Vale per i paesaggi invernali, le città tranquille e i prezzi bassi, non per il mare.",
  },
  tableH: (k) => `Il clima ${k} mese per mese`,
  tableIntro:
    "Massima e minima media giornaliera, pioggia mensile e nuvolosità, dai dati 2011–2020 delle mete elencate sopra.",
  cols: ["Mese", "Max media", "Min media", "Pioggia", "Nuvole"],
  citiesH: "I mesi migliori, città per città",
  citiesIntro: (n) =>
    `La media nazionale nasconde molto. Ecco tutte le ${n} località del Paese con dati climatici e i tre mesi che ottengono il punteggio migliore in ciascuna.`,
  cityCols: ["Città", "Mesi migliori", "Massime in quei mesi"],
  cityMore: (n) => `Mostra tutte le ${n} città`,
  faqH: "Domande frequenti",
  qBest: (k) => `${k}: qual è il periodo migliore per andare?`,
  aBest: (best, hi, lo, rain) =>
    `${best}. Nelle principali mete del Paese quei mesi registrano in media massime di ${hi}°C, minime di ${lo}°C e circa ${rain} mm di pioggia: la combinazione più affidabile dell'anno.`,
  qWarmest: (k) => `${k}: qual è il mese più caldo?`,
  aWarmest: (warm, warmHi, cool, coolHi) =>
    `${warm}, con una media di ${warmHi}°C di giorno. Il più fresco è ${cool}, intorno ai ${coolHi}°C: l'anno oscilla quindi di circa ${Math.abs(warmHi - coolHi)}°C tra i due.`,
  qRain: (k) => `${k}: qual è il mese più piovoso?`,
  aRain: (wet, wetMm, dry, dryMm) =>
    `${wet}, con circa ${wetMm} mm di media. Il più secco è ${dry}, con circa ${dryMm} mm. Il totale mensile dice quanta acqua cade, non quanti giorni piove: un mese umido può restare soleggiato con qualche pomeriggio di temporale.`,
  qQuiet: (k) => `${k}: quando c'è meno gente?`,
  aQuiet: (shoulder, best) =>
    `${shoulder}, i mesi subito prima e subito dopo il picco di ${best}. Rinunci a qualche grado e guadagni molta meno folla e prezzi più bassi: di solito conviene.`,
  aQuietNone: (best) =>
    `Qui non esiste un mese intermedio comodo: si passa in fretta dalla finestra di ${best} a un tempo che la maggior parte dei viaggiatori preferisce evitare.`,
  qWhereWarm: (k, monthIn) => `${k}: dove fa più caldo ${monthIn}?`,
  aWhereWarm: (warmCity, warmHi, coolCity, coolHi, monthIn) =>
    `${warmCity}, con una media di ${warmHi}°C ${monthIn}, contro i ${coolHi}°C di ${coolCity}. Se in quel mese cerchi il caldo, punta su ${warmCity} invece di fidarti della media nazionale.`,
  qMonthGood: (k, month) => `${k}: ${month} è un buon periodo per andare?`,
  aMonthGood: (month, hi, lo, mm, isBest, best) =>
    isBest
      ? `Sì. ${month} è uno dei tre mesi migliori dell'anno: ${hi}°C di giorno, ${lo}°C di notte e circa ${mm} mm di pioggia.`
      : `${month} segna in media ${hi}°C di giorno, ${lo}°C di notte e circa ${mm} mm di pioggia. Si viaggia, ma ${best} sono mesi migliori se le date sono flessibili.`,
  sources:
    "Medie calcolate dal reanalysis NASA POWER / ERA5, 2011–2020. Sono medie climatiche di lungo periodo, non una previsione.",
  sourcesLink: "Da dove vengono questi dati",
  ctaH: "Organizza il viaggio vero",
  ctaForecast: "Previsioni a 15 giorni",
  ctaWhere: "Dove andare questo mese",
  ctaCities: "Tutte le città del Paese",
  breadcrumb: "Quando andare",
};

const DE: BestTimeCountryCopy = {
  eyebrow: "Klimaguide zum Land",
  title: (k) => `${k}: beste Reisezeit, Monat für Monat`,
  desc: (k, best, lo, hi) =>
    `Die beste Reisezeit für ${k}: ${best}, mit Höchstwerten um ${hi}°C und Tiefstwerten um ${lo}°C. Monatswerte, die ruhige Nebensaison und die wärmsten Regionen des Landes.`,
  keywords: (k) => [
    `beste Reisezeit ${k}`,
    `wann nach ${k} reisen`,
    `${k} Klima`,
    `${k} Klimatabelle`,
    `wärmster Monat ${k}`,
    `regenreichster Monat ${k}`,
  ],
  h1: (k) => `${k}: beste Reisezeit`,
  answer: (best, hi, lo, rain) =>
    `Die besten Monate sind ${best}: tagsüber im Mittel ${hi}°C, nachts rund ${lo}°C, dazu etwa ${rain} mm Regen im Monat. Das ist der Zeitraum mit dem verlässlichsten Wetter in den wichtigsten Reisezielen des Landes.`,
  basis: (n, cities) =>
    `Die Eckwerte mitteln die ${n} Ziele, nach denen am häufigsten gefragt wird — ${cities} — und nicht jeden Ort auf der Karte. Sie beschreiben also die Reise, die die meisten tatsächlich planen.`,
  spreadH: "Ein Land, mehr als ein Klima",
  spreadLead: (monthIn, gap) =>
    `Am größten ist der Unterschied ${monthIn}: Zwischen dem wärmsten und dem kühlsten Ort des Landes liegen dann rund ${gap}°C.`,
  spreadDetail: (warmCity, warmHi, coolCity, coolHi) =>
    `${warmCity} kommt in diesem Monat im Mittel auf ${warmHi}°C, ${coolCity} dagegen nur auf ${coolHi}°C.`,
  spreadAdvice:
    "Die ehrliche Antwort auf „Wann soll ich hin?“ hängt also davon ab, wo Sie landen. Suchen Sie in der Tabelle unten die Stadt heraus, in die Sie wirklich fliegen, und richten Sie sich nach deren Monaten statt nach dem Landesmittel.",
  noSpread:
    "Das Land ist kompakt genug, dass seine Städte einem ähnlichen Muster folgen: Die Monate oben gelten überall.",
  seasonsH: "Jahreszeit für Jahreszeit",
  seasonRange: (from, to) => `${from}–${to}`,
  verdict: { ideal: "Beste Zeit", good: "Brauchbar", hot: "Sehr heiß", rainy: "Regnerisch", cold: "Kalt" },
  verdictText: {
    ideal: "Der Idealfall: warm genug, um den ganzen Tag draußen zu sein, ohne die Extreme der Hochsaison.",
    good: "Gut bereisbar, wenn auch nicht das beste Wetter des Jahres.",
    hot: "So heiß, dass Sightseeing mittags zur Arbeit wird — früh starten, lange Mittagspause.",
    rainy: "Die nasseste Zeit des Jahres. Regen kippt selten eine Reise, prägt aber das Programm.",
    cold: "Kalte Jahreszeit. Lohnt sich für Winterlandschaften, ruhige Städte und niedrige Preise, nicht für Strandwetter.",
  },
  tableH: (k) => `Klimatabelle ${k}`,
  tableIntro:
    "Mittlere Tageshöchst- und Tiefstwerte, Monatsniederschlag und Bewölkung, aus den Aufzeichnungen 2011–2020 für die oben genannten Ziele.",
  cols: ["Monat", "Ø max", "Ø min", "Niederschlag", "Bewölkung"],
  citiesH: "Die besten Monate, Stadt für Stadt",
  citiesIntro: (n) =>
    `Das Landesmittel verdeckt viel. Hier sind alle ${n} Orte des Landes mit Klimaaufzeichnungen und die drei Monate, die dort jeweils am besten abschneiden.`,
  cityCols: ["Stadt", "Beste Monate", "Höchstwerte dann"],
  cityMore: (n) => `Alle ${n} Städte anzeigen`,
  faqH: "Häufige Fragen",
  qBest: (k) => `${k}: Wann ist die beste Reisezeit?`,
  aBest: (best, hi, lo, rain) =>
    `${best}. In den wichtigsten Zielen des Landes liegen diese Monate im Mittel bei ${hi}°C am Tag, ${lo}°C in der Nacht und etwa ${rain} mm Regen — die verlässlichste Kombination des Jahres.`,
  qWarmest: (k) => `${k}: Welcher ist der wärmste Monat?`,
  aWarmest: (warm, warmHi, cool, coolHi) =>
    `${warm} mit durchschnittlich ${warmHi}°C am Tag. Am kühlsten ist ${cool} mit etwa ${coolHi}°C; über das Jahr sind das rund ${Math.abs(warmHi - coolHi)}°C Unterschied.`,
  qRain: (k) => `${k}: In welchem Monat regnet es am meisten?`,
  aRain: (wet, wetMm, dry, dryMm) =>
    `${wet} mit rund ${wetMm} mm im Mittel. Am trockensten ist ${dry} mit etwa ${dryMm} mm. Die Monatssumme sagt, wie viel fällt, nicht an wie vielen Tagen: Ein nasser Monat kann überwiegend sonnig sein, mit einzelnen kräftigen Nachmittagen.`,
  qQuiet: (k) => `${k}: Wann ist am wenigsten los?`,
  aQuiet: (shoulder, best) =>
    `${shoulder} — die Monate direkt vor und nach der Hauptzeit ${best}. Sie geben ein paar Grad ab und bekommen spürbar weniger Andrang und niedrigere Preise, was sich meist lohnt.`,
  aQuietNone: (best) =>
    `Einen bequemen Zwischenmonat gibt es hier nicht: Es geht recht abrupt von der Zeit um ${best} in Wetter über, das die meisten lieber meiden.`,
  qWhereWarm: (k, monthIn) => `${k}: Wo ist es ${monthIn} am wärmsten?`,
  aWhereWarm: (warmCity, warmHi, coolCity, coolHi, monthIn) =>
    `In ${warmCity}, mit durchschnittlich ${warmHi}°C ${monthIn}, gegenüber ${coolHi}°C in ${coolCity}. Wenn es in diesem Monat warm sein soll, fahren Sie nach ${warmCity}, statt sich auf das Landesmittel zu verlassen.`,
  qMonthGood: (k, month) => `${k}: Ist ${month} eine gute Reisezeit?`,
  aMonthGood: (month, hi, lo, mm, isBest, best) =>
    isBest
      ? `Ja. ${month} gehört zu den drei besten Monaten des Jahres: im Mittel ${hi}°C am Tag, ${lo}°C nachts und etwa ${mm} mm Regen.`
      : `${month} bringt im Mittel ${hi}°C am Tag, ${lo}°C nachts und etwa ${mm} mm Regen. Reisen lässt sich gut, aber ${best} sind die stärkeren Monate, wenn die Termine flexibel sind.`,
  sources:
    "Mittelwerte aus der NASA-POWER-/ERA5-Reanalyse, 2011–2020. Es sind langjährige Klimamittel, keine Vorhersage.",
  sourcesLink: "Woher diese Daten stammen",
  ctaH: "Die Reise konkret planen",
  ctaForecast: "14-Tage-Vorhersage",
  ctaWhere: "Wohin in diesem Monat",
  ctaCities: "Alle Orte des Landes",
  breadcrumb: "Beste Reisezeit",
};

const FR: BestTimeCountryCopy = {
  eyebrow: "Guide climatique du pays",
  title: (k) => `${k} : quand partir, mois par mois`,
  desc: (k, best, lo, hi) =>
    `La meilleure période pour partir : ${best}, avec des maximales de ${hi}°C et des minimales de ${lo}°C. Moyennes mois par mois, la basse saison et les régions les plus chaudes de ${k}.`,
  keywords: (k) => [
    `quand partir ${k}`,
    `meilleure période ${k}`,
    `climat ${k} mois par mois`,
    `${k} climat`,
    `mois le plus chaud ${k}`,
    `mois le plus pluvieux ${k}`,
  ],
  h1: (k) => `${k} : quand partir`,
  answer: (best, hi, lo, rain) =>
    `Les meilleurs mois sont ${best} : les maximales tournent autour de ${hi}°C, les nuits restent proches de ${lo}°C et il tombe environ ${rain} mm de pluie par mois. C'est la fenêtre au temps le plus fiable dans les principales destinations du pays.`,
  basis: (n, cities) =>
    `Ces chiffres moyennent les ${n} destinations les plus demandées — ${cities} — et non chaque commune de la carte : ils décrivent donc le voyage que la plupart des gens préparent réellement.`,
  spreadH: "Un pays, plusieurs climats",
  spreadLead: (monthIn, gap) =>
    `L'écart est maximal ${monthIn} : environ ${gap}°C séparent alors l'endroit le plus chaud du plus frais.`,
  spreadDetail: (warmCity, warmHi, coolCity, coolHi) =>
    `${warmCity} affiche en moyenne ${warmHi}°C ce mois-là, quand ${coolCity} plafonne à ${coolHi}°C.`,
  spreadAdvice:
    "La réponse honnête à « quand partir ? » dépend donc de l'endroit où vous atterrissez. Repérez dans le tableau ci-dessous la ville où vous allez vraiment et fiez-vous à ses mois, pas à la moyenne nationale.",
  noSpread:
    "Le pays est assez compact pour que ses villes suivent un schéma voisin : les mois ci-dessus valent où que vous logiez.",
  seasonsH: "Saison par saison",
  seasonRange: (from, to) => `${from}–${to}`,
  verdict: { ideal: "Meilleure période", good: "Correct", hot: "Très chaud", rainy: "Pluvieux", cold: "Froid" },
  verdictText: {
    ideal: "Le bon équilibre : assez chaud pour rester dehors toute la journée, sans les excès de la haute saison.",
    good: "Tout à fait praticable, sans atteindre le meilleur temps de l'année.",
    hot: "Si chaud que visiter à midi devient pénible : départs matinaux et longues pauses déjeuner.",
    rainy: "La période la plus humide de l'année. La pluie annule rarement un voyage, mais elle en change le programme.",
    cold: "Saison froide. Elle vaut pour les paysages d'hiver, les villes calmes et les prix bas, pas pour la plage.",
  },
  tableH: (k) => `Climat de ${k} mois par mois`,
  tableIntro:
    "Maximales et minimales moyennes, pluie mensuelle et nébulosité, d'après les relevés 2011–2020 des destinations citées plus haut.",
  cols: ["Mois", "Max moy.", "Min moy.", "Pluie", "Nuages"],
  citiesH: "Les meilleurs mois, ville par ville",
  citiesIntro: (n) =>
    `La moyenne nationale cache beaucoup de choses. Voici les ${n} localités du pays disposant de relevés climatiques et les trois mois les mieux notés dans chacune.`,
  cityCols: ["Ville", "Meilleurs mois", "Maximales alors"],
  cityMore: (n) => `Afficher les ${n} villes`,
  faqH: "Questions fréquentes",
  qBest: (k) => `${k} : quelle est la meilleure période pour partir ?`,
  aBest: (best, hi, lo, rain) =>
    `${best}. Dans les principales destinations du pays, ces mois affichent en moyenne ${hi}°C le jour, ${lo}°C la nuit et environ ${rain} mm de pluie : la combinaison la plus fiable de l'année.`,
  qWarmest: (k) => `${k} : quel est le mois le plus chaud ?`,
  aWarmest: (warm, warmHi, cool, coolHi) =>
    `${warm}, avec ${warmHi}°C en moyenne dans la journée. Le plus frais est ${cool}, autour de ${coolHi}°C : l'année varie donc d'environ ${Math.abs(warmHi - coolHi)}°C entre les deux.`,
  qRain: (k) => `${k} : quel est le mois le plus pluvieux ?`,
  aRain: (wet, wetMm, dry, dryMm) =>
    `${wet}, avec environ ${wetMm} mm en moyenne. Le plus sec est ${dry}, autour de ${dryMm} mm. Le cumul mensuel dit la quantité d'eau, pas le nombre de jours de pluie : un mois humide peut rester ensoleillé avec quelques gros après-midi.`,
  qQuiet: (k) => `${k} : quand y a-t-il le moins de monde ?`,
  aQuiet: (shoulder, best) =>
    `${shoulder}, les mois juste avant et juste après le pic de ${best}. Vous cédez quelques degrés et gagnez nettement moins d'affluence et des prix plus bas : le calcul est souvent gagnant.`,
  aQuietNone: (best) =>
    `Il n'y a pas ici de mois intermédiaire confortable : on passe assez vite de la fenêtre de ${best} à un temps que la plupart préfèrent éviter.`,
  qWhereWarm: (k, monthIn) => `${k} : où fait-il le plus chaud ${monthIn} ?`,
  aWhereWarm: (warmCity, warmHi, coolCity, coolHi, monthIn) =>
    `À ${warmCity}, avec ${warmHi}°C de moyenne ${monthIn}, contre ${coolHi}°C à ${coolCity}. Si vous cherchez la chaleur ce mois-là, visez ${warmCity} plutôt que de vous fier à la moyenne nationale.`,
  qMonthGood: (k, month) => `${k} : ${month} est-il une bonne période ?`,
  aMonthGood: (month, hi, lo, mm, isBest, best) =>
    isBest
      ? `Oui. ${month} fait partie des trois meilleurs mois de l'année : ${hi}°C le jour, ${lo}°C la nuit et environ ${mm} mm de pluie.`
      : `${month} donne en moyenne ${hi}°C le jour, ${lo}°C la nuit et environ ${mm} mm de pluie. C'est faisable, mais ${best} restent de meilleurs mois si vos dates sont souples.`,
  sources:
    "Moyennes calculées à partir de la réanalyse NASA POWER / ERA5, 2011–2020. Ce sont des normales climatiques, pas une prévision.",
  sourcesLink: "D'où viennent ces données",
  ctaH: "Préparer le voyage pour de vrai",
  ctaForecast: "Prévisions à 15 jours",
  ctaWhere: "Où partir ce mois-ci",
  ctaCities: "Toutes les villes du pays",
  breadcrumb: "Quand partir",
};

const PT: BestTimeCountryCopy = {
  eyebrow: "Guia climático do país",
  title: (k) => `${k}: melhor altura para viajar, mês a mês`,
  desc: (k, best, lo, hi) =>
    `A melhor altura para viajar para ${k} é ${best}, com máximas de ${hi}°C e mínimas de ${lo}°C. Médias mês a mês, a época intermédia e as zonas mais quentes do país.`,
  keywords: (k) => [
    `melhor altura para viajar para ${k}`,
    `quando ir a ${k}`,
    `clima de ${k} mês a mês`,
    `${k} clima`,
    `mês mais quente de ${k}`,
    `mês mais chuvoso de ${k}`,
  ],
  h1: (k) => `${k}: a melhor altura para viajar`,
  answer: (best, hi, lo, rain) =>
    `Os melhores meses são ${best}: as máximas rondam os ${hi}°C, as noites ficam perto dos ${lo}°C e caem cerca de ${rain} mm de chuva por mês. É a janela com o tempo mais fiável nos principais destinos do país.`,
  basis: (n, cities) =>
    `Estes valores fazem a média dos ${n} destinos mais procurados — ${cities} — e não de todas as localidades do mapa, pelo que descrevem a viagem que a maioria está mesmo a planear.`,
  spreadH: "Um país, mais do que um clima",
  spreadLead: (monthIn, gap) =>
    `A diferença é maior ${monthIn}, quando o ponto mais quente e o mais fresco do país distam cerca de ${gap}°C.`,
  spreadDetail: (warmCity, warmHi, coolCity, coolHi) =>
    `${warmCity} regista em média ${warmHi}°C nesse mês, enquanto ${coolCity} fica pelos ${coolHi}°C.`,
  spreadAdvice:
    "A resposta honesta a «quando devo ir?» depende, portanto, de onde aterra. Procure na tabela abaixo a cidade para onde vai mesmo e use os meses dela, não a média nacional.",
  noSpread:
    "O país é suficientemente compacto para que as suas cidades sigam um padrão parecido: os meses acima valem onde quer que fique.",
  seasonsH: "Estação a estação",
  seasonRange: (from, to) => `${from}–${to}`,
  verdict: { ideal: "Melhor altura", good: "Aceitável", hot: "Muito quente", rainy: "Chuvoso", cold: "Frio" },
  verdictText: {
    ideal: "O equilíbrio certo: quente o suficiente para estar na rua todo o dia, sem os extremos da época alta.",
    good: "Perfeitamente viável, ainda que sem o melhor tempo do ano.",
    hot: "Tão quente que visitar ao meio-dia custa: saídas cedo e almoços longos.",
    rainy: "A altura mais húmida do ano. A chuva raramente cancela uma viagem, mas molda o programa.",
    cold: "Época fria. Compensa pelas paisagens de inverno, cidades tranquilas e preços baixos, não pela praia.",
  },
  tableH: (k) => `O clima de ${k} mês a mês`,
  tableIntro:
    "Máxima e mínima média diária, chuva mensal e nebulosidade, a partir dos registos de 2011–2020 dos destinos indicados acima.",
  cols: ["Mês", "Máx. média", "Mín. média", "Chuva", "Nuvens"],
  citiesH: "Os melhores meses, cidade a cidade",
  citiesIntro: (n) =>
    `A média nacional esconde muito. Aqui ficam as ${n} localidades do país com registos climáticos e os três meses com melhor pontuação em cada uma.`,
  cityCols: ["Cidade", "Melhores meses", "Máximas nessa altura"],
  cityMore: (n) => `Ver as ${n} cidades`,
  faqH: "Perguntas frequentes",
  qBest: (k) => `Qual é a melhor altura para viajar para ${k}?`,
  aBest: (best, hi, lo, rain) =>
    `${best}. Nos principais destinos do país, esses meses registam em média ${hi}°C de dia, ${lo}°C de noite e cerca de ${rain} mm de chuva — a combinação mais fiável do ano.`,
  qWarmest: (k) => `Qual é o mês mais quente de ${k}?`,
  aWarmest: (warm, warmHi, cool, coolHi) =>
    `${warm}, com uma média de ${warmHi}°C durante o dia. O mais fresco é ${cool}, perto dos ${coolHi}°C, pelo que o ano oscila cerca de ${Math.abs(warmHi - coolHi)}°C entre os dois.`,
  qRain: (k) => `Qual é o mês mais chuvoso de ${k}?`,
  aRain: (wet, wetMm, dry, dryMm) =>
    `${wet}, com cerca de ${wetMm} mm em média. O mais seco é ${dry}, com cerca de ${dryMm} mm. O total mensal diz quanta água cai, não em quantos dias chove: um mês húmido pode ser solarengo com algumas tardes fortes.`,
  qQuiet: (k) => `Quando há menos gente em ${k}?`,
  aQuiet: (shoulder, best) =>
    `${shoulder}, os meses mesmo antes e depois do pico de ${best}. Abdica de uns graus e ganha bastante menos gente e preços mais baixos, o que costuma compensar.`,
  aQuietNone: (best) =>
    `Aqui não há um mês intermédio confortável: passa-se depressa da janela de ${best} para um tempo que a maioria prefere evitar.`,
  qWhereWarm: (k, monthIn) => `Onde é mais quente em ${k} ${monthIn}?`,
  aWhereWarm: (warmCity, warmHi, coolCity, coolHi, monthIn) =>
    `${warmCity}, com uma média de ${warmHi}°C ${monthIn}, contra ${coolHi}°C em ${coolCity}. Se nesse mês procura calor, vá para ${warmCity} em vez de confiar na média nacional.`,
  qMonthGood: (k, month) => `${month} é boa altura para viajar para ${k}?`,
  aMonthGood: (month, hi, lo, mm, isBest, best) =>
    isBest
      ? `Sim. ${month} é um dos três melhores meses do ano: ${hi}°C de dia, ${lo}°C de noite e cerca de ${mm} mm de chuva.`
      : `${month} regista em média ${hi}°C de dia, ${lo}°C de noite e cerca de ${mm} mm de chuva. Dá para viajar, mas ${best} são meses melhores se as datas forem flexíveis.`,
  sources:
    "Médias calculadas a partir da reanálise NASA POWER / ERA5, 2011–2020. São normais climáticas de longo prazo, não uma previsão.",
  sourcesLink: "De onde vêm estes dados",
  ctaH: "Planear a viagem a sério",
  ctaForecast: "Previsão a 15 dias",
  ctaWhere: "Para onde viajar este mês",
  ctaCities: "Todas as cidades do país",
  breadcrumb: "Melhor altura para viajar",
};

const NL: BestTimeCountryCopy = {
  eyebrow: "Klimaatgids van het land",
  title: (k) => `${k}: beste reistijd, maand voor maand`,
  desc: (k, best, lo, hi) =>
    `De beste reistijd voor ${k} is ${best}, met maxima rond ${hi}°C en minima rond ${lo}°C. Maandgemiddelden, het rustige tussenseizoen en waar het in het land het warmst is.`,
  keywords: (k) => [
    `beste reistijd ${k}`,
    `wanneer naar ${k}`,
    `${k} klimaat`,
    `klimaat ${k} per maand`,
    `warmste maand ${k}`,
    `natste maand ${k}`,
  ],
  h1: (k) => `${k}: de beste reistijd`,
  answer: (best, hi, lo, rain) =>
    `De beste maanden zijn ${best}: overdag gemiddeld ${hi}°C, 's nachts rond ${lo}°C en zo'n ${rain} mm regen per maand. Dat is de periode met het betrouwbaarste weer in de belangrijkste bestemmingen van het land.`,
  basis: (n, cities) =>
    `Deze kerncijfers middelen de ${n} bestemmingen waar het vaakst naar gevraagd wordt — ${cities} — en niet elke plaats op de kaart. Ze beschrijven dus de reis die de meeste mensen echt plannen.`,
  spreadH: "Eén land, meer dan één klimaat",
  spreadLead: (monthIn, gap) =>
    `Het verschil is het grootst ${monthIn}: dan zit er zo'n ${gap}°C tussen de warmste en de koelste plek van het land.`,
  spreadDetail: (warmCity, warmHi, coolCity, coolHi) =>
    `${warmCity} komt die maand gemiddeld op ${warmHi}°C, terwijl ${coolCity} op ${coolHi}°C blijft steken.`,
  spreadAdvice:
    "Het eerlijke antwoord op \"wanneer moet ik gaan?\" hangt dus af van waar je landt. Zoek in de tabel hieronder de stad waar je echt naartoe gaat en ga uit van die maanden, niet van het landelijk gemiddelde.",
  noSpread:
    "Het land is compact genoeg dat de steden een vergelijkbaar patroon volgen: de maanden hierboven gelden overal.",
  seasonsH: "Seizoen voor seizoen",
  seasonRange: (from, to) => `${from}–${to}`,
  verdict: { ideal: "Beste periode", good: "Prima", hot: "Erg heet", rainy: "Nat", cold: "Koud" },
  verdictText: {
    ideal: "Precies goed: warm genoeg om de hele dag buiten te zijn, zonder de uitersten van het hoogseizoen.",
    good: "Uitstekend te doen, al is het niet het beste weer van het jaar.",
    hot: "Zo heet dat rondlopen midden op de dag zwaar wordt — vroeg beginnen en lang lunchen.",
    rainy: "De natste periode van het jaar. Regen gooit zelden een reis om, maar bepaalt wel het programma.",
    cold: "Koud seizoen. De moeite waard voor winterlandschappen, rustige steden en lage prijzen, niet voor strandweer.",
  },
  tableH: (k) => `Het klimaat van ${k} per maand`,
  tableIntro:
    "Gemiddelde maxima en minima, maandelijkse neerslag en bewolking, op basis van de metingen van 2011–2020 voor de hierboven genoemde bestemmingen.",
  cols: ["Maand", "Gem. max", "Gem. min", "Regen", "Bewolking"],
  citiesH: "De beste maanden, stad voor stad",
  citiesIntro: (n) =>
    `Het landelijk gemiddelde verbergt veel. Hier staan alle ${n} plaatsen in het land met klimaatgegevens en de drie maanden die er per plaats het beste scoren.`,
  cityCols: ["Stad", "Beste maanden", "Maxima dan"],
  cityMore: (n) => `Alle ${n} steden tonen`,
  faqH: "Veelgestelde vragen",
  qBest: (k) => `Wat is de beste reistijd voor ${k}?`,
  aBest: (best, hi, lo, rain) =>
    `${best}. In de belangrijkste bestemmingen van het land komen die maanden gemiddeld op ${hi}°C overdag, ${lo}°C 's nachts en zo'n ${rain} mm regen — de betrouwbaarste combinatie van het jaar.`,
  qWarmest: (k) => `Wat is de warmste maand in ${k}?`,
  aWarmest: (warm, warmHi, cool, coolHi) =>
    `${warm}, met gemiddeld ${warmHi}°C overdag. De koelste is ${cool} met ongeveer ${coolHi}°C, dus over het jaar zit er zo'n ${Math.abs(warmHi - coolHi)}°C tussen.`,
  qRain: (k) => `In welke maand regent het het meest in ${k}?`,
  aRain: (wet, wetMm, dry, dryMm) =>
    `${wet}, met gemiddeld zo'n ${wetMm} mm. De droogste maand is ${dry} met ongeveer ${dryMm} mm. Het maandtotaal zegt hoeveel er valt, niet op hoeveel dagen: een natte maand kan grotendeels zonnig zijn met een paar stevige middagen.`,
  qQuiet: (k) => `Wanneer is het het rustigst in ${k}?`,
  aQuiet: (shoulder, best) =>
    `${shoulder} — de maanden net voor en net na de drukte van ${best}. Je levert een paar graden in en krijgt merkbaar minder drukte en lagere prijzen terug, wat meestal gunstig uitpakt.`,
  aQuietNone: (best) =>
    `Een comfortabele tussenmaand is er hier niet: het gaat vrij abrupt van de periode rond ${best} over in weer dat de meeste reizigers liever mijden.`,
  qWhereWarm: (k, monthIn) => `Waar is het in ${k} het warmst ${monthIn}?`,
  aWhereWarm: (warmCity, warmHi, coolCity, coolHi, monthIn) =>
    `In ${warmCity}, gemiddeld ${warmHi}°C ${monthIn}, tegen ${coolHi}°C in ${coolCity}. Wil je die maand warmte, ga dan naar ${warmCity} in plaats van op het landelijk gemiddelde te vertrouwen.`,
  qMonthGood: (k, month) => `Is ${month} een goede tijd om naar ${k} te gaan?`,
  aMonthGood: (month, hi, lo, mm, isBest, best) =>
    isBest
      ? `Ja. ${month} hoort bij de drie beste maanden van het jaar: ${hi}°C overdag, ${lo}°C 's nachts en zo'n ${mm} mm regen.`
      : `${month} komt gemiddeld op ${hi}°C overdag, ${lo}°C 's nachts en zo'n ${mm} mm regen. Het kan prima, maar ${best} zijn sterkere maanden als je data flexibel zijn.`,
  sources:
    "Gemiddelden berekend uit de NASA POWER / ERA5-reanalyse, 2011–2020. Dit zijn langjarige klimaatgemiddelden, geen verwachting.",
  sourcesLink: "Waar deze gegevens vandaan komen",
  ctaH: "De reis echt plannen",
  ctaForecast: "Verwachting voor 14 dagen",
  ctaWhere: "Waar naartoe deze maand",
  ctaCities: "Alle plaatsen in het land",
  breadcrumb: "Beste reistijd",
};

const PL: BestTimeCountryCopy = {
  eyebrow: "Przewodnik klimatyczny po kraju",
  title: (k) => `${k}: kiedy jechać, miesiąc po miesiącu`,
  desc: (k, best, lo, hi) =>
    `Najlepszy termin wyjazdu (${k}): ${best}, z maksimami około ${hi}°C i minimami około ${lo}°C. Średnie miesięczne, spokojny sezon przejściowy i najcieplejsze regiony kraju.`,
  keywords: (k) => [
    `kiedy jechać ${k}`,
    `najlepszy termin wyjazdu ${k}`,
    `klimat ${k}`,
    `pogoda ${k} miesiąc po miesiącu`,
    `najcieplejszy miesiąc ${k}`,
    `najbardziej deszczowy miesiąc ${k}`,
  ],
  h1: (k) => `${k}: kiedy jechać`,
  answer: (best, hi, lo, rain) =>
    `Najlepsze miesiące to ${best}: w dzień średnio ${hi}°C, w nocy około ${lo}°C, a deszczu spada około ${rain} mm miesięcznie. To okres z najbardziej przewidywalną pogodą w głównych kierunkach w tym kraju.`,
  basis: (n, cities) =>
    `Te wartości uśredniają ${n} najczęściej wyszukiwanych kierunków — ${cities} — a nie każdą miejscowość na mapie, więc opisują wyjazd, który faktycznie planuje większość osób.`,
  spreadH: "Jeden kraj, więcej niż jeden klimat",
  spreadLead: (monthIn, gap) =>
    `Różnica jest największa ${monthIn}: najcieplejsze i najchłodniejsze miejsce w kraju dzieli wtedy około ${gap}°C.`,
  spreadDetail: (warmCity, warmHi, coolCity, coolHi) =>
    `${warmCity} notuje w tym miesiącu średnio ${warmHi}°C, podczas gdy ${coolCity} zatrzymuje się na ${coolHi}°C.`,
  spreadAdvice:
    "Uczciwa odpowiedź na pytanie „kiedy jechać?” zależy więc od tego, gdzie lądujesz. Znajdź w tabeli poniżej miasto, do którego naprawdę lecisz, i kieruj się jego miesiącami, a nie średnią krajową.",
  noSpread:
    "Kraj jest na tyle niewielki, że jego miasta mają zbliżony przebieg pogody: miesiące powyżej sprawdzą się wszędzie.",
  seasonsH: "Pora roku po porze roku",
  seasonRange: (from, to) => `${from}–${to}`,
  verdict: { ideal: "Najlepszy okres", good: "Do przyjęcia", hot: "Bardzo gorąco", rainy: "Deszczowo", cold: "Zimno" },
  verdictText: {
    ideal: "Złoty środek: wystarczająco ciepło, by spędzić cały dzień na zewnątrz, bez skrajności szczytu sezonu.",
    good: "Podróżuje się dobrze, choć to nie najlepsza pogoda w roku.",
    hot: "Tak gorąco, że zwiedzanie w południe męczy — wcześnie zaczynaj i rób długie przerwy.",
    rainy: "Najwilgotniejszy okres roku. Deszcz rzadko przekreśla wyjazd, ale zmienia plan dnia.",
    cold: "Chłodna pora. Warto dla zimowych krajobrazów, spokojnych miast i niskich cen, nie dla plaży.",
  },
  tableH: (k) => `Klimat (${k}) miesiąc po miesiącu`,
  tableIntro:
    "Średnie dobowe maksima i minima, miesięczne opady i zachmurzenie, na podstawie danych z lat 2011–2020 dla wymienionych wyżej kierunków.",
  cols: ["Miesiąc", "Śr. maks.", "Śr. min.", "Opady", "Zachmurzenie"],
  citiesH: "Najlepsze miesiące, miasto po mieście",
  citiesIntro: (n) =>
    `Średnia krajowa wiele ukrywa. Poniżej wszystkie ${n} miejscowości w kraju z danymi klimatycznymi i trzy miesiące, które wypadają w nich najlepiej.`,
  cityCols: ["Miasto", "Najlepsze miesiące", "Maksima w tym czasie"],
  cityMore: (n) => `Pokaż wszystkie miasta (${n})`,
  faqH: "Częste pytania",
  qBest: (k) => `Kiedy najlepiej jechać (${k})?`,
  aBest: (best, hi, lo, rain) =>
    `${best}. W głównych kierunkach w tym kraju miesiące te mają średnio ${hi}°C w dzień, ${lo}°C w nocy i około ${rain} mm deszczu — to najbardziej przewidywalne połączenie w roku.`,
  qWarmest: (k) => `Który miesiąc jest najcieplejszy (${k})?`,
  aWarmest: (warm, warmHi, cool, coolHi) =>
    `${warm}, średnio ${warmHi}°C w dzień. Najchłodniejszy jest ${cool}, około ${coolHi}°C, więc w skali roku różnica wynosi mniej więcej ${Math.abs(warmHi - coolHi)}°C.`,
  qRain: (k) => `W którym miesiącu pada najwięcej (${k})?`,
  aRain: (wet, wetMm, dry, dryMm) =>
    `${wet}, średnio około ${wetMm} mm. Najsuchszy jest ${dry}, około ${dryMm} mm. Suma miesięczna mówi, ile wody spadnie, a nie przez ile dni pada: mokry miesiąc bywa w większości słoneczny, z kilkoma ulewnymi popołudniami.`,
  qQuiet: (k) => `Kiedy jest najmniej turystów (${k})?`,
  aQuiet: (shoulder, best) =>
    `${shoulder} — miesiące tuż przed szczytem (${best}) i zaraz po nim. Oddajesz kilka stopni, a zyskujesz wyraźnie mniejsze tłumy i niższe ceny, co zwykle się opłaca.`,
  aQuietNone: (best) =>
    `Nie ma tu wygodnego miesiąca przejściowego: dość szybko przechodzi się od okresu ${best} do pogody, której większość woli unikać.`,
  qWhereWarm: (k, monthIn) => `Gdzie jest najcieplej (${k}) ${monthIn}?`,
  aWhereWarm: (warmCity, warmHi, coolCity, coolHi, monthIn) =>
    `${warmCity}, średnio ${warmHi}°C ${monthIn}, wobec ${coolHi}°C w mieście ${coolCity}. Jeśli w tym miesiącu zależy ci na cieple, wybierz ${warmCity}, zamiast polegać na średniej krajowej.`,
  qMonthGood: (k, month) => `Czy ${month} to dobry termin na wyjazd (${k})?`,
  aMonthGood: (month, hi, lo, mm, isBest, best) =>
    isBest
      ? `Tak. ${month} należy do trzech najlepszych miesięcy w roku: ${hi}°C w dzień, ${lo}°C w nocy i około ${mm} mm deszczu.`
      : `${month} to średnio ${hi}°C w dzień, ${lo}°C w nocy i około ${mm} mm deszczu. Da się podróżować, ale ${best} wypadają lepiej, jeśli masz elastyczne terminy.`,
  sources:
    "Średnie obliczone na podstawie reanalizy NASA POWER / ERA5, 2011–2020. To wieloletnie normy klimatyczne, a nie prognoza.",
  sourcesLink: "Skąd pochodzą te dane",
  ctaH: "Zaplanuj wyjazd na serio",
  ctaForecast: "Prognoza na 16 dni",
  ctaWhere: "Gdzie jechać w tym miesiącu",
  ctaCities: "Wszystkie miejscowości w kraju",
  breadcrumb: "Kiedy jechać",
};

const BY_LOCALE: Record<AnyLocale, BestTimeCountryCopy> = {
  en: EN,
  es: ES,
  it: IT,
  de: DE,
  fr: FR,
  pt: PT,
  nl: NL,
  pl: PL,
};

export function bestTimeCountryCopy(locale: AnyLocale): BestTimeCountryCopy {
  return BY_LOCALE[locale] ?? EN;
}
