/**
 * "Best time to visit {city}" pages in every language.
 *
 * These answer the when / why / how questions people actually type in each
 * market ("beste Reisezeit Teneriffa", "quando andare a Tenerife", "quand
 * partir à Tenerife", "kiedy najlepiej jechać na Teneryfę"…) and the
 * People-also-ask questions Google shows under them (warmest month, rainiest
 * month, when to avoid, why a month is good). Everything is computed from the
 * city's 10-year climate averages, so each page says something specific.
 */
import type { CityClimate } from "@/lib/data/climate";
import { bestMonths, joinList } from "@/lib/i18n/copy";
import { scoreMonth } from "@/lib/tripScore";
import { monthInfo, type AnyLocale } from "@/lib/i18n/routing";
import { a as itA } from "@/lib/i18n/copy/it";
import { a as frA } from "@/lib/i18n/copy/fr";
import { em as ptEm } from "@/lib/i18n/copy/pt";
import { inC as deIn, fuer as deFuer, nach as deNach } from "@/lib/i18n/copy/de";
import { inC as nlIn, deK as nlDe } from "@/lib/i18n/copy/nl";
import { w as plW } from "@/lib/i18n/copy/pl";

export type Verdict = "ideal" | "good" | "hot" | "rainy" | "cold";
export type GoodKind = "yes" | "hot" | "cold" | "rainy" | "ok";
export type WorstReason = "heat" | "cold" | "rain" | "none";

export interface BestTimeCopy {
  /** URL segment, e.g. /de/beste-reisezeit/spain/tenerife */
  slug: string;
  eyebrow: string;
  title: (c: string) => string;
  desc: (c: string, best: string) => string;
  h1: (c: string) => string;
  answer: (c: string, best: string, lo: number, hi: number, rain: number) => string;
  factsH: string;
  warmest: string;
  coolest: string;
  wettest: string;
  driest: string;
  sunniest: string;
  tableH: (c: string) => string;
  tableIntro: (c: string) => string;
  cols: [string, string, string, string, string];
  periodsH: (c: string) => string;
  verdict: Record<Verdict, string>;
  verdictText: Record<Verdict, string>;
  faqH: string;
  qBest: (c: string) => string;
  aBest: (c: string, best: string, lo: number, hi: number) => string;
  qWarm: (c: string) => string;
  aWarm: (c: string, m: string, hi: number, lo: number) => string;
  qCold: (c: string) => string;
  aCold: (c: string, m: string, hi: number, lo: number) => string;
  qRain: (c: string) => string;
  aRain: (c: string, wet: string, wetMm: number, dry: string, dryMm: number) => string;
  qWorst: (c: string) => string;
  /** For "none", `value` / `value2` are the year's lowest and highest average highs. */
  aWorst: (c: string, m: string, reason: WorstReason, value: number, value2: number) => string;
  qWhy: (c: string, m: string) => string;
  aWhy: (c: string, m: string, hi: number, lo: number, rain: number, cloud: number) => string;
  /** "Is {month} a good time to visit {city}?" — m = month name, inM = "in May" phrase. */
  qGood: (c: string, m: string, inM: string) => string;
  aGood: (c: string, m: string, inM: string, kind: GoodKind, hi: number, mm: number) => string;
  qHow: (c: string) => string;
  aHow: (c: string) => string;
  liveCta: (c: string) => string;
  monthsH: (c: string) => string;
  moreH: (country: string) => string;
  source: string;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "26–29" but just "28" when both ends are equal (avoids "28–28°C"). */
const rg = (lo: number, hi: number) => (lo === hi ? `${hi}` : `${lo}–${hi}`);
const frRg = (lo: number, hi: number) => (lo === hi ? `de ${hi}` : `de ${lo} à ${hi}`);
/** Italian "a maggio" / "ad aprile". */
const itM = (m: string) => (/^[aeiou]/i.test(m) ? `ad ${m}` : `a ${m}`);

const en: BestTimeCopy = {
  slug: "",
  eyebrow: "Best time to visit",
  title: (c) => `Best Time to Visit ${c}: Weather by Month`,
  desc: (c, b) => `When is the best time to visit ${c}? Usually ${b}. See ${c} weather by month, the warmest, coldest and rainiest months, and when to avoid.`,
  h1: (c) => `Best Time to Visit ${c}`,
  answer: (c, b, lo, hi, r) => `The best time to visit ${c} is ${b}, when average highs are ${rg(lo, hi)}°C and rainfall is around ${r} mm a month.`,
  factsH: "At a glance",
  warmest: "Warmest month",
  coolest: "Coolest month",
  wettest: "Wettest month",
  driest: "Driest month",
  sunniest: "Sunniest month",
  tableH: (c) => `${c} weather by month`,
  tableIntro: (c) => `Average highs, lows, rainfall and humidity in ${c} (10-year averages).`,
  cols: ["Month", "High", "Low", "Rain", "Humidity"],
  periodsH: (c) => `When to go to ${c}, season by season`,
  verdict: { ideal: "Best time", good: "Good", hot: "Hot", rainy: "Rainy", cold: "Cold" },
  verdictText: {
    ideal: "Pleasant temperatures and relatively little rain: the best window for sightseeing and time outdoors.",
    good: "Comfortable weather overall, with fewer visitors than peak season.",
    hot: "Very hot days. Plan sightseeing for mornings and evenings and keep the afternoon for shade or the beach.",
    rainy: "The wettest part of the year. Showers are likely, so pack a rain jacket and keep plans flexible.",
    cold: "Cool to cold days. Fine for museums and city breaks, less so for the beach.",
  },
  faqH: "Frequently asked questions",
  qBest: (c) => `When is the best time to visit ${c}?`,
  aBest: (c, b, lo, hi) => `For pleasant, fairly dry weather, go to ${c} in ${b}. Average highs are then ${rg(lo, hi)}°C.`,
  qWarm: (c) => `What is the warmest month in ${c}?`,
  aWarm: (c, m, hi, lo) => `${m} is the warmest month in ${c}, with average highs of ${hi}°C and lows of ${lo}°C.`,
  qCold: (c) => `What is the coldest month in ${c}?`,
  aCold: (c, m, hi, lo) => `${m} is the coldest month in ${c}: average highs of ${hi}°C, dropping to ${lo}°C at night.`,
  qRain: (c) => `When does it rain the most in ${c}?`,
  aRain: (c, wet, wm, dry, dm) => `${wet} is the wettest month in ${c} with about ${wm} mm of rain. The driest is ${dry}, with around ${dm} mm.`,
  qWorst: (c) => `When is the worst time to visit ${c}?`,
  aWorst: (c, m, r, v, v2) =>
    r === "none"
      ? `${c} has no really bad month for weather: average highs stay between ${v} and ${v2}°C all year.`
      : r === "heat"
      ? `${m} is the least comfortable month for sightseeing in ${c}, with average highs of ${v}°C. If you go then, plan outdoor visits for early morning.`
      : r === "cold"
        ? `${m} is the least pleasant month in ${c}, with average highs of just ${v}°C. It's still fine for museums and fewer crowds.`
        : `${m} is the least reliable month in ${c}, with around ${v} mm of rain. Bring a rain jacket and keep a flexible plan.`,
  qWhy: (c, m) => `Why is ${m} a good time to visit ${c}?`,
  aWhy: (c, m, hi, lo, r, cl) => `In ${m}, ${c} averages ${hi}°C by day and ${lo}°C at night, with about ${r} mm of rain and ${cl}% cloud cover: warm enough to be outdoors without the peak heat or the wettest weather.`,
  qGood: (c, m) => `Is ${m} a good time to visit ${c}?`,
  aGood: (c, m, _i, k, hi, mm) =>
    k === "yes"
      ? `Yes. ${m} is one of the best months for ${c}, with highs around ${hi}°C and about ${mm} mm of rain.`
      : k === "hot"
        ? `It can be, if you like heat: ${m} highs in ${c} are around ${hi}°C. Good for the beach; plan sightseeing for early morning and evening.`
        : k === "cold"
          ? `${m} is cool in ${c}, with highs around ${hi}°C. Better for museums and city walks than the beach, and usually quieter.`
          : k === "rainy"
            ? `${m} is one of the wetter months in ${c}, with about ${mm} mm of rain. You can still go: pack a rain jacket and keep plans flexible.`
            : `${m} is a reasonable time for ${c}: highs around ${hi}°C and about ${mm} mm of rain, though not one of the three best months.`,
  qHow: (c) => `How can I check the weather in ${c} before I travel?`,
  aHow: (c) => `Compare the live forecast for ${c} from three independent weather services on WeatherCompare. When they agree, the forecast is more reliable.`,
  liveCta: (c) => `Check the live ${c} forecast from 3 weather services`,
  monthsH: (c) => `${c} weather in every month`,
  moreH: (k) => `Best time to visit other places in ${k}`,
  source: "Climate averages: NASA POWER, 10-year averages.",
};

const it: BestTimeCopy = {
  slug: "quando-andare",
  eyebrow: "Quando andare",
  title: (c) => `Quando andare ${itA(c)}: clima e periodo migliore`,
  desc: (c, b) => `Qual è il periodo migliore per andare ${itA(c)}? Di solito ${b}. Clima mese per mese, mese più caldo, più freddo e più piovoso, e quando evitare.`,
  h1: (c) => `Quando andare ${itA(c)}: il periodo migliore`,
  answer: (c, b, lo, hi, r) => `Il periodo migliore per andare ${itA(c)} sono i mesi di ${b}: le massime medie sono di ${rg(lo, hi)}°C e cadono circa ${r} mm di pioggia al mese.`,
  factsH: "In breve",
  warmest: "Mese più caldo",
  coolest: "Mese più freddo",
  wettest: "Mese più piovoso",
  driest: "Mese più secco",
  sunniest: "Mese più soleggiato",
  tableH: (c) => `Clima ${itA(c)} mese per mese`,
  tableIntro: (c) => `Temperature massime e minime, pioggia e umidità medie ${itA(c)} (medie su 10 anni).`,
  cols: ["Mese", "Max", "Min", "Pioggia", "Umidità"],
  periodsH: (c) => `Quando andare ${itA(c)}, stagione per stagione`,
  verdict: { ideal: "Periodo migliore", good: "Buono", hot: "Caldo", rainy: "Piovoso", cold: "Freddo" },
  verdictText: {
    ideal: "Temperature piacevoli e poca pioggia: il momento ideale per visitare la città e stare all'aperto.",
    good: "Clima nel complesso gradevole e meno turisti rispetto all'alta stagione.",
    hot: "Giornate molto calde: meglio visitare la mattina e la sera e riservare il pomeriggio all'ombra o al mare.",
    rainy: "Il periodo più piovoso dell'anno: gli acquazzoni sono probabili, porta una giacca impermeabile.",
    cold: "Giornate fresche o fredde: vanno bene musei e city break, meno il mare.",
  },
  faqH: "Domande frequenti",
  qBest: (c) => `Qual è il periodo migliore per andare ${itA(c)}?`,
  aBest: (c, b, lo, hi) => `Per un clima piacevole e abbastanza asciutto conviene andare ${itA(c)} nei mesi di ${b}, con massime medie di ${rg(lo, hi)}°C.`,
  qWarm: (c) => `Qual è il mese più caldo ${itA(c)}?`,
  aWarm: (c, m, hi, lo) => `Il mese più caldo ${itA(c)} è ${m}, con massime medie di ${hi}°C e minime di ${lo}°C.`,
  qCold: (c) => `Qual è il mese più freddo ${itA(c)}?`,
  aCold: (c, m, hi, lo) => `Il mese più freddo ${itA(c)} è ${m}: massime medie di ${hi}°C e minime notturne di ${lo}°C.`,
  qRain: (c) => `Qual è il mese più piovoso ${itA(c)}?`,
  aRain: (c, wet, wm, dry, dm) => `Il mese più piovoso ${itA(c)} è ${wet}, con circa ${wm} mm di pioggia. Il più secco è ${dry}, con circa ${dm} mm.`,
  qWorst: (c) => `Quando è meglio non andare ${itA(c)}?`,
  aWorst: (c, m, r, v, v2) =>
    r === "none"
      ? `${cap(itA(c))} non c'è un mese davvero sfavorevole: le massime medie restano tra ${v} e ${v2}°C tutto l'anno.`
      : r === "heat"
      ? `Il mese meno comodo per visitare ${c} è ${m}, con massime medie di ${v}°C. Se vai in quel periodo, programma le visite all'aperto di prima mattina.`
      : r === "cold"
        ? `Il mese meno piacevole ${itA(c)} è ${m}, con massime medie di appena ${v}°C. Va comunque bene per musei e meno folla.`
        : `Il mese meno affidabile ${itA(c)} è ${m}, con circa ${v} mm di pioggia. Porta un impermeabile e tieni un programma flessibile.`,
  qWhy: (c, m) => `Perché ${m} è un buon mese per andare ${itA(c)}?`,
  aWhy: (c, m, hi, lo, r, cl) => `${cap(itM(m))} ${c} registra in media ${hi}°C di giorno e ${lo}°C di notte, circa ${r} mm di pioggia e il ${cl}% di copertura nuvolosa: abbastanza caldo per stare fuori, senza il picco del caldo né il periodo più piovoso.`,
  qGood: (c, _m, i) => `${cap(i)} è un buon periodo per andare ${itA(c)}?`,
  aGood: (c, m, i, k, hi, mm) =>
    k === "yes"
      ? `Sì. ${cap(m)} è uno dei mesi migliori per andare ${itA(c)}, con massime di circa ${hi}°C e circa ${mm} mm di pioggia.`
      : k === "hot"
        ? `Sì, se ami il caldo: ${i} le massime ${itA(c)} arrivano a circa ${hi}°C. Ottimo per il mare; visite la mattina presto e la sera.`
        : k === "cold"
          ? `${cap(i)} ${itA(c)} fa fresco, con massime di circa ${hi}°C. Meglio per musei e passeggiate in città che per il mare, e c'è meno gente.`
          : k === "rainy"
            ? `${cap(m)} è uno dei mesi più piovosi ${itA(c)}, con circa ${mm} mm di pioggia. Si può andare comunque: porta un impermeabile.`
            : `${cap(m)} è un periodo discreto per andare ${itA(c)}: massime di circa ${hi}°C e circa ${mm} mm di pioggia, anche se non è tra i tre mesi migliori.`,
  qHow: (c) => `Come controllare il meteo ${itA(c)} prima di partire?`,
  aHow: (c) => `Su WeatherCompare puoi confrontare le previsioni per ${c} di tre servizi meteo indipendenti. Quando concordano, la previsione è più affidabile.`,
  liveCta: (c) => `Previsioni meteo ${itA(c)} a confronto (3 fonti)`,
  monthsH: (c) => `Meteo ${itA(c)} mese per mese`,
  moreH: (k) => `Quando andare in altre località: ${k}`,
  source: "Medie climatiche: NASA POWER, medie su 10 anni.",
};

const de: BestTimeCopy = {
  slug: "beste-reisezeit",
  eyebrow: "Beste Reisezeit",
  title: (c) => `Beste Reisezeit ${c}: Klimatabelle & Wetter pro Monat`,
  desc: (c, b) => `Wann ist die beste Reisezeit ${deFuer(c)}? Meist ${b}. Klimatabelle, wärmster, kältester und regenreichster Monat und wann man lieber nicht reist.`,
  h1: (c) => `Beste Reisezeit ${c}`,
  answer: (c, b, lo, hi, r) => `Die beste Reisezeit ${deFuer(c)} sind die Monate ${b}: Die Tageshöchstwerte liegen dann im Schnitt bei ${rg(lo, hi)}°C, und es fallen etwa ${r} mm Regen pro Monat.`,
  factsH: "Auf einen Blick",
  warmest: "Wärmster Monat",
  coolest: "Kältester Monat",
  wettest: "Nassester Monat",
  driest: "Trockenster Monat",
  sunniest: "Sonnigster Monat",
  tableH: (c) => `Klimatabelle ${c}`,
  tableIntro: (c) => `Durchschnittliche Höchst- und Tiefstwerte, Niederschlag und Luftfeuchtigkeit ${deIn(c)} (10-Jahres-Mittel).`,
  cols: ["Monat", "Max", "Min", "Regen", "Feuchte"],
  periodsH: (c) => `Wann ${deNach(c)}? Die Jahreszeiten im Überblick`,
  verdict: { ideal: "Beste Reisezeit", good: "Gut", hot: "Heiß", rainy: "Regnerisch", cold: "Kalt" },
  verdictText: {
    ideal: "Angenehme Temperaturen und wenig Regen: die ideale Zeit für Besichtigungen und Aktivitäten im Freien.",
    good: "Insgesamt angenehmes Wetter und weniger Besucher als in der Hochsaison.",
    hot: "Sehr heiße Tage: Besichtigungen am besten morgens und abends, nachmittags Schatten oder Strand.",
    rainy: "Die nasseste Zeit des Jahres: Schauer sind wahrscheinlich, eine Regenjacke gehört ins Gepäck.",
    cold: "Kühle bis kalte Tage: gut für Museen und Städtereisen, weniger für den Strand.",
  },
  faqH: "Häufige Fragen",
  qBest: (c) => `Wann ist die beste Reisezeit ${deFuer(c)}?`,
  aBest: (c, b, lo, hi) => `Für angenehmes, eher trockenes Wetter reist man am besten im ${b} ${deNach(c)}. Die Höchstwerte liegen dann bei ${rg(lo, hi)}°C.`,
  qWarm: (c) => `Welcher ist der wärmste Monat ${deIn(c)}?`,
  aWarm: (c, m, hi, lo) => `Der wärmste Monat ${deIn(c)} ist der ${m} mit durchschnittlich ${hi}°C am Tag und ${lo}°C in der Nacht.`,
  qCold: (c) => `Welcher ist der kälteste Monat ${deIn(c)}?`,
  aCold: (c, m, hi, lo) => `Der kälteste Monat ${deIn(c)} ist der ${m}: im Schnitt ${hi}°C tagsüber und ${lo}°C nachts.`,
  qRain: (c) => `Wann regnet es am meisten ${deIn(c)}?`,
  aRain: (c, wet, wm, dry, dm) => `Am meisten regnet es ${deIn(c)} im ${wet} mit rund ${wm} mm. Am trockensten ist der ${dry} mit etwa ${dm} mm.`,
  qWorst: (c) => `Wann sollte man nicht ${deNach(c)} reisen?`,
  aWorst: (c, m, r, v, v2) =>
    r === "none"
      ? `${cap(deIn(c))} gibt es keinen wirklich schlechten Reisemonat: Die Höchstwerte liegen das ganze Jahr zwischen ${v} und ${v2}°C.`
      : r === "heat"
      ? `Am wenigsten angenehm für Besichtigungen ist der ${m} mit durchschnittlich ${v}°C. Wer dann reist, plant Ausflüge am besten früh morgens.`
      : r === "cold"
        ? `Am ungemütlichsten ist es ${deIn(c)} im ${m} mit nur ${v}°C im Schnitt. Für Museen und leere Sehenswürdigkeiten ist das aber kein Problem.`
        : `Am unbeständigsten ist das Wetter ${deIn(c)} im ${m} mit rund ${v} mm Regen. Regenjacke einpacken und flexibel planen.`,
  qWhy: (c, m) => `Warum ist der ${m} eine gute Reisezeit ${deFuer(c)}?`,
  aWhy: (c, m, hi, lo, r, cl) => `Im ${m} hat ${c} im Schnitt ${hi}°C am Tag und ${lo}°C in der Nacht, etwa ${r} mm Regen und ${cl} % Bewölkung: warm genug für draußen, aber ohne die größte Hitze und ohne die nasseste Zeit.`,
  qGood: (c, _m, i) => `Lohnt sich ${c} ${i}?`,
  aGood: (c, m, i, k, hi, mm) =>
    k === "yes"
      ? `Ja. Der ${m} gehört zu den besten Reisemonaten ${deFuer(c)}, mit Höchstwerten um ${hi}°C und etwa ${mm} mm Regen.`
      : k === "hot"
        ? `Ja, wenn Sie Hitze mögen: ${cap(i)} erreicht ${c} um ${hi}°C. Gut für den Strand; Besichtigungen besser früh morgens und abends.`
        : k === "cold"
          ? `${cap(i)} ist es ${deIn(c)} kühl, mit Höchstwerten um ${hi}°C. Eher etwas für Museen und Stadtbummel als für den Strand, dafür ruhiger.`
          : k === "rainy"
            ? `Der ${m} gehört zu den nasseren Monaten ${deIn(c)}, mit etwa ${mm} mm Regen. Reisen kann man trotzdem: Regenjacke einpacken und flexibel planen.`
            : `Der ${m} ist eine ordentliche Reisezeit ${deFuer(c)}: um ${hi}°C und etwa ${mm} mm Regen, auch wenn er nicht zu den drei besten Monaten zählt.`,
  qHow: (c) => `Wie prüfe ich das Wetter ${deIn(c)} vor der Reise?`,
  aHow: (c) => `Auf WeatherCompare vergleichen Sie die Vorhersage ${deFuer(c)} von drei unabhängigen Wetterdiensten. Stimmen sie überein, ist die Prognose verlässlicher.`,
  liveCta: (c) => `Aktuelles Wetter ${deIn(c)}: 3 Vorhersagen im Vergleich`,
  monthsH: (c) => `Wetter ${deIn(c)} in jedem Monat`,
  moreH: (k) => `Beste Reisezeit für weitere Ziele: ${k}`,
  source: "Klimadaten: NASA POWER, 10-Jahres-Mittel.",
};

const fr: BestTimeCopy = {
  slug: "quand-partir",
  eyebrow: "Quand partir",
  title: (c) => `Quand partir ${frA(c)} ? Climat et météo par mois`,
  desc: (c, b) => `Quelle est la meilleure période pour partir ${frA(c)} ? En général ${b}. Climat mois par mois, mois le plus chaud, le plus froid, le plus pluvieux.`,
  h1: (c) => `Quand partir ${frA(c)} ? La meilleure période`,
  answer: (c, b, lo, hi, r) => `La meilleure période pour partir ${frA(c)} correspond aux mois de ${b} : les maximales moyennes sont ${frRg(lo, hi)} °C, avec environ ${r} mm de pluie par mois.`,
  factsH: "En bref",
  warmest: "Mois le plus chaud",
  coolest: "Mois le plus froid",
  wettest: "Mois le plus pluvieux",
  driest: "Mois le plus sec",
  sunniest: "Mois le plus ensoleillé",
  tableH: (c) => `Climat ${frA(c)} mois par mois`,
  tableIntro: (c) => `Températures maximales et minimales, pluie et humidité moyennes ${frA(c)} (moyennes sur 10 ans).`,
  cols: ["Mois", "Max", "Min", "Pluie", "Humidité"],
  periodsH: (c) => `Quand partir ${frA(c)}, saison par saison`,
  verdict: { ideal: "Meilleure période", good: "Bien", hot: "Chaud", rainy: "Pluvieux", cold: "Froid" },
  verdictText: {
    ideal: "Températures agréables et peu de pluie : le moment idéal pour visiter et profiter du plein air.",
    good: "Météo globalement agréable et moins de monde qu'en haute saison.",
    hot: "Journées très chaudes : visitez le matin et en soirée, gardez l'après-midi pour l'ombre ou la plage.",
    rainy: "La période la plus pluvieuse de l'année : les averses sont probables, prévoyez un imperméable.",
    cold: "Journées fraîches à froides : idéal pour les musées et les city-breaks, moins pour la plage.",
  },
  faqH: "Questions fréquentes",
  qBest: (c) => `Quelle est la meilleure période pour partir ${frA(c)} ?`,
  aBest: (c, b, lo, hi) => `Pour un temps agréable et plutôt sec, partez ${frA(c)} en ${b}. Les maximales tournent alors autour ${frRg(lo, hi)} °C.`,
  qWarm: (c) => `Quel est le mois le plus chaud ${frA(c)} ?`,
  aWarm: (c, m, hi, lo) => `Le mois le plus chaud ${frA(c)} est ${m}, avec des maximales moyennes de ${hi} °C et des minimales de ${lo} °C.`,
  qCold: (c) => `Quel est le mois le plus froid ${frA(c)} ?`,
  aCold: (c, m, hi, lo) => `Le mois le plus froid ${frA(c)} est ${m} : ${hi} °C en journée en moyenne et ${lo} °C la nuit.`,
  qRain: (c) => `Quand pleut-il le plus ${frA(c)} ?`,
  aRain: (c, wet, wm, dry, dm) => `C'est en ${wet} qu'il pleut le plus ${frA(c)}, avec environ ${wm} mm. Le mois le plus sec est ${dry}, avec environ ${dm} mm.`,
  qWorst: (c) => `Quand éviter de partir ${frA(c)} ?`,
  aWorst: (c, m, r, v, v2) =>
    r === "none"
      ? `Il n'y a pas vraiment de mauvais mois ${frA(c)} : les maximales moyennes restent entre ${v} et ${v2} °C toute l'année.`
      : r === "heat"
      ? `Le mois le moins confortable pour visiter ${c} est ${m}, avec ${v} °C en moyenne l'après-midi. Si vous partez à ce moment-là, prévoyez les visites tôt le matin.`
      : r === "cold"
        ? `Le mois le moins agréable ${frA(c)} est ${m}, avec seulement ${v} °C de maximale moyenne. Parfait en revanche pour les musées et éviter la foule.`
        : `Le mois le plus incertain ${frA(c)} est ${m}, avec environ ${v} mm de pluie. Emportez un imperméable et gardez un programme souple.`,
  qWhy: (c, m) => `Pourquoi partir ${frA(c)} en ${m} ?`,
  aWhy: (c, m, hi, lo, r, cl) => `En ${m}, ${c} affiche en moyenne ${hi} °C le jour et ${lo} °C la nuit, environ ${r} mm de pluie et ${cl} % de couverture nuageuse : assez chaud pour profiter du dehors, sans les pics de chaleur ni la période la plus pluvieuse.`,
  qGood: (c, _m, i) => `Faut-il partir ${frA(c)} ${i} ?`,
  aGood: (c, m, i, k, hi, mm) =>
    k === "yes"
      ? `Oui. ${cap(m)} est l'un des meilleurs mois pour partir ${frA(c)}, avec des maximales d'environ ${hi} °C et environ ${mm} mm de pluie.`
      : k === "hot"
        ? `Oui, si vous aimez la chaleur : ${i}, les maximales atteignent environ ${hi} °C ${frA(c)}. Idéal pour la plage ; visitez tôt le matin et en soirée.`
        : k === "cold"
          ? `${cap(i)}, il fait frais ${frA(c)}, avec des maximales d'environ ${hi} °C. Plutôt pour les musées et les balades en ville que pour la plage, et il y a moins de monde.`
          : k === "rainy"
            ? `${cap(m)} est l'un des mois les plus pluvieux ${frA(c)}, avec environ ${mm} mm de pluie. On peut y aller, mais prévoyez un imperméable.`
            : `${cap(m)} est une période correcte pour partir ${frA(c)} : environ ${hi} °C et ${mm} mm de pluie, même si ce n'est pas l'un des trois meilleurs mois.`,
  qHow: (c) => `Comment vérifier la météo ${frA(c)} avant de partir ?`,
  aHow: (c) => `Sur WeatherCompare, comparez les prévisions pour ${c} de trois services météo indépendants. Quand elles concordent, la prévision est plus fiable.`,
  liveCta: (c) => `Météo ${frA(c)} : 3 prévisions comparées`,
  monthsH: (c) => `Météo ${frA(c)} mois par mois`,
  moreH: (k) => `Quand partir ailleurs : ${k}`,
  source: "Moyennes climatiques : NASA POWER, moyennes sur 10 ans.",
};

const es: BestTimeCopy = {
  slug: "mejor-epoca",
  eyebrow: "Mejor época para viajar",
  title: (c) => `Mejor época para viajar a ${c}: clima mes a mes`,
  desc: (c, b) => `¿Cuál es la mejor época para viajar a ${c}? Normalmente ${b}. Clima mes a mes, el mes más cálido, más frío y más lluvioso, y cuándo evitarlo.`,
  h1: (c) => `Mejor época para viajar a ${c}`,
  answer: (c, b, lo, hi, r) => `La mejor época para viajar a ${c} son los meses de ${b}: las máximas medias rondan los ${rg(lo, hi)} °C y caen unos ${r} mm de lluvia al mes.`,
  factsH: "En resumen",
  warmest: "Mes más cálido",
  coolest: "Mes más frío",
  wettest: "Mes más lluvioso",
  driest: "Mes más seco",
  sunniest: "Mes más soleado",
  tableH: (c) => `Clima en ${c} mes a mes`,
  tableIntro: (c) => `Temperaturas máximas y mínimas, lluvia y humedad medias en ${c} (promedios de 10 años).`,
  cols: ["Mes", "Máx", "Mín", "Lluvia", "Humedad"],
  periodsH: (c) => `Cuándo ir a ${c}, estación por estación`,
  verdict: { ideal: "Mejor época", good: "Buena", hot: "Calor", rainy: "Lluvioso", cold: "Frío" },
  verdictText: {
    ideal: "Temperaturas agradables y poca lluvia: el momento ideal para hacer turismo y estar al aire libre.",
    good: "Tiempo agradable en general y menos turistas que en temporada alta.",
    hot: "Días muy calurosos: haz las visitas por la mañana y al atardecer y deja la tarde para la sombra o la playa.",
    rainy: "La época más lluviosa del año: los chubascos son probables, lleva un chubasquero.",
    cold: "Días frescos o fríos: buenos para museos y escapadas urbanas, no tanto para la playa.",
  },
  faqH: "Preguntas frecuentes",
  qBest: (c) => `¿Cuál es la mejor época para viajar a ${c}?`,
  aBest: (c, b, lo, hi) => `Para un tiempo agradable y bastante seco, viaja a ${c} en ${b}. Las máximas medias son entonces de ${rg(lo, hi)} °C.`,
  qWarm: (c) => `¿Cuál es el mes más caluroso en ${c}?`,
  aWarm: (c, m, hi, lo) => `El mes más caluroso en ${c} es ${m}, con máximas medias de ${hi} °C y mínimas de ${lo} °C.`,
  qCold: (c) => `¿Cuál es el mes más frío en ${c}?`,
  aCold: (c, m, hi, lo) => `El mes más frío en ${c} es ${m}: máximas medias de ${hi} °C y mínimas nocturnas de ${lo} °C.`,
  qRain: (c) => `¿Cuándo llueve más en ${c}?`,
  aRain: (c, wet, wm, dry, dm) => `El mes más lluvioso en ${c} es ${wet}, con unos ${wm} mm. El más seco es ${dry}, con unos ${dm} mm.`,
  qWorst: (c) => `¿Cuándo no conviene viajar a ${c}?`,
  aWorst: (c, m, r, v, v2) =>
    r === "none"
      ? `En ${c} no hay un mes realmente malo: las máximas medias se mantienen entre ${v} y ${v2} °C todo el año.`
      : r === "heat"
      ? `El mes menos cómodo para hacer turismo en ${c} es ${m}, con máximas medias de ${v} °C. Si vas entonces, planea las visitas a primera hora.`
      : r === "cold"
        ? `El mes menos agradable en ${c} es ${m}, con máximas medias de solo ${v} °C. Aun así, es buen momento para museos y menos colas.`
        : `El mes menos fiable en ${c} es ${m}, con unos ${v} mm de lluvia. Lleva chubasquero y un plan flexible.`,
  qWhy: (c, m) => `¿Por qué ${m} es un buen mes para viajar a ${c}?`,
  aWhy: (c, m, hi, lo, r, cl) => `En ${m}, ${c} tiene de media ${hi} °C de día y ${lo} °C de noche, unos ${r} mm de lluvia y un ${cl} % de nubosidad: suficiente calor para estar fuera, sin el pico de calor ni la época más lluviosa.`,
  qGood: (c, m) => `¿Es ${m} buen mes para viajar a ${c}?`,
  aGood: (c, m, i, k, hi, mm) =>
    k === "yes"
      ? `Sí. ${cap(m)} es uno de los mejores meses para viajar a ${c}, con máximas de unos ${hi} °C y unos ${mm} mm de lluvia.`
      : k === "hot"
        ? `Sí, si te gusta el calor: ${i} las máximas en ${c} rondan los ${hi} °C. Ideal para la playa; haz las visitas a primera hora y al atardecer.`
        : k === "cold"
          ? `${cap(i)} hace fresco en ${c}, con máximas de unos ${hi} °C. Mejor para museos y paseos por la ciudad que para la playa, y hay menos gente.`
          : k === "rainy"
            ? `${cap(m)} es uno de los meses más lluviosos en ${c}, con unos ${mm} mm. Se puede ir igualmente: lleva chubasquero y un plan flexible.`
            : `${cap(m)} es una época aceptable para viajar a ${c}: unos ${hi} °C y ${mm} mm de lluvia, aunque no está entre los tres mejores meses.`,
  qHow: (c) => `¿Cómo consultar el tiempo en ${c} antes de viajar?`,
  aHow: (c) => `En WeatherCompare puedes comparar la previsión para ${c} de tres servicios meteorológicos independientes. Cuando coinciden, la previsión es más fiable.`,
  liveCta: (c) => `El tiempo en ${c}: 3 previsiones comparadas`,
  monthsH: (c) => `El tiempo en ${c} mes a mes`,
  moreH: (k) => `Mejor época para otros destinos: ${k}`,
  source: "Promedios climáticos: NASA POWER, promedios de 10 años.",
};

const pt: BestTimeCopy = {
  slug: "melhor-epoca",
  eyebrow: "Melhor época para visitar",
  title: (c) => `Melhor época para visitar ${c}: clima mês a mês`,
  desc: (c, b) => `Qual é a melhor altura para visitar ${c}? Normalmente ${b}. Clima mês a mês, o mês mais quente, mais frio e mais chuvoso, e quando evitar.`,
  h1: (c) => `Melhor época para visitar ${c}`,
  answer: (c, b, lo, hi, r) => `A melhor época para visitar ${c} são os meses de ${b}: as máximas médias rondam os ${rg(lo, hi)} °C e caem cerca de ${r} mm de chuva por mês.`,
  factsH: "Em resumo",
  warmest: "Mês mais quente",
  coolest: "Mês mais frio",
  wettest: "Mês mais chuvoso",
  driest: "Mês mais seco",
  sunniest: "Mês com mais sol",
  tableH: (c) => `Clima ${ptEm(c)} mês a mês`,
  tableIntro: (c) => `Temperaturas máximas e mínimas, chuva e humidade médias ${ptEm(c)} (médias de 10 anos).`,
  cols: ["Mês", "Máx", "Mín", "Chuva", "Humidade"],
  periodsH: (c) => `Quando ir a ${c}, estação a estação`,
  verdict: { ideal: "Melhor época", good: "Boa", hot: "Calor", rainy: "Chuvoso", cold: "Frio" },
  verdictText: {
    ideal: "Temperaturas agradáveis e pouca chuva: a altura ideal para passear e estar ao ar livre.",
    good: "Tempo agradável no geral e menos turistas do que na época alta.",
    hot: "Dias muito quentes: visite de manhã e ao fim da tarde e guarde a tarde para a sombra ou a praia.",
    rainy: "A altura mais chuvosa do ano: os aguaceiros são prováveis, leve um impermeável.",
    cold: "Dias frescos a frios: bons para museus e escapadinhas na cidade, menos para a praia.",
  },
  faqH: "Perguntas frequentes",
  qBest: (c) => `Qual é a melhor altura para visitar ${c}?`,
  aBest: (c, b, lo, hi) => `Para tempo agradável e bastante seco, visite ${c} em ${b}. As máximas médias rondam então os ${rg(lo, hi)} °C.`,
  qWarm: (c) => `Qual é o mês mais quente ${ptEm(c)}?`,
  aWarm: (c, m, hi, lo) => `O mês mais quente ${ptEm(c)} é ${m}, com máximas médias de ${hi} °C e mínimas de ${lo} °C.`,
  qCold: (c) => `Qual é o mês mais frio ${ptEm(c)}?`,
  aCold: (c, m, hi, lo) => `O mês mais frio ${ptEm(c)} é ${m}: máximas médias de ${hi} °C e mínimas de ${lo} °C à noite.`,
  qRain: (c) => `Quando chove mais ${ptEm(c)}?`,
  aRain: (c, wet, wm, dry, dm) => `O mês mais chuvoso ${ptEm(c)} é ${wet}, com cerca de ${wm} mm. O mais seco é ${dry}, com cerca de ${dm} mm.`,
  qWorst: (c) => `Quando é melhor não ir a ${c}?`,
  aWorst: (c, m, r, v, v2) =>
    r === "none"
      ? `Não há um mês realmente mau ${ptEm(c)}: as máximas médias ficam entre ${v} e ${v2} °C durante todo o ano.`
      : r === "heat"
      ? `O mês menos confortável para passear ${ptEm(c)} é ${m}, com máximas médias de ${v} °C. Se for nessa altura, faça as visitas logo de manhã.`
      : r === "cold"
        ? `O mês menos agradável ${ptEm(c)} é ${m}, com máximas médias de apenas ${v} °C. Mesmo assim, é boa altura para museus e menos filas.`
        : `O mês menos fiável ${ptEm(c)} é ${m}, com cerca de ${v} mm de chuva. Leve um impermeável e um plano flexível.`,
  qWhy: (c, m) => `Porque é que ${m} é uma boa altura para visitar ${c}?`,
  aWhy: (c, m, hi, lo, r, cl) => `Em ${m}, ${c} tem em média ${hi} °C de dia e ${lo} °C à noite, cerca de ${r} mm de chuva e ${cl} % de nebulosidade: calor suficiente para estar ao ar livre, sem o pico do calor nem a altura mais chuvosa.`,
  qGood: (c, m) => `${cap(m)} é boa altura para visitar ${c}?`,
  aGood: (c, m, i, k, hi, mm) =>
    k === "yes"
      ? `Sim. ${cap(m)} é um dos melhores meses para visitar ${c}, com máximas de cerca de ${hi} °C e cerca de ${mm} mm de chuva.`
      : k === "hot"
        ? `Sim, se gosta de calor: ${i} as máximas ${ptEm(c)} rondam os ${hi} °C. Ótimo para praia; faça as visitas de manhã cedo e ao fim da tarde.`
        : k === "cold"
          ? `${cap(i)} está fresco ${ptEm(c)}, com máximas de cerca de ${hi} °C. Melhor para museus e passeios pela cidade do que para praia, e há menos gente.`
          : k === "rainy"
            ? `${cap(m)} é um dos meses mais chuvosos ${ptEm(c)}, com cerca de ${mm} mm. Pode ir na mesma: leve um impermeável e um plano flexível.`
            : `${cap(m)} é uma altura razoável para visitar ${c}: cerca de ${hi} °C e ${mm} mm de chuva, embora não esteja entre os três melhores meses.`,
  qHow: (c) => `Como ver o tempo ${ptEm(c)} antes de viajar?`,
  aHow: (c) => `No WeatherCompare pode comparar a previsão para ${c} de três serviços meteorológicos independentes. Quando coincidem, a previsão é mais fiável.`,
  liveCta: (c) => `Tempo ${ptEm(c)}: 3 previsões comparadas`,
  monthsH: (c) => `Tempo ${ptEm(c)} mês a mês`,
  moreH: (k) => `Melhor época para outros destinos: ${k}`,
  source: "Médias climáticas: NASA POWER, médias de 10 anos.",
};

const nl: BestTimeCopy = {
  slug: "beste-reistijd",
  eyebrow: "Beste reistijd",
  title: (c) => `Beste reistijd ${c}: klimaat en weer per maand`,
  desc: (c, b) => `Wat is de beste reistijd voor ${nlDe(c)}? Meestal ${b}. Klimaat per maand, de warmste, koudste en natste maand, en wanneer je beter niet gaat.`,
  h1: (c) => `Beste reistijd ${c}`,
  answer: (c, b, lo, hi, r) => `De beste reistijd voor ${nlDe(c)} is ${b}: de gemiddelde maximumtemperatuur ligt dan op ${rg(lo, hi)}°C en er valt zo'n ${r} mm regen per maand.`,
  factsH: "In het kort",
  warmest: "Warmste maand",
  coolest: "Koudste maand",
  wettest: "Natste maand",
  driest: "Droogste maand",
  sunniest: "Zonnigste maand",
  tableH: (c) => `Klimaat ${nlIn(c)} per maand`,
  tableIntro: (c) => `Gemiddelde maximum- en minimumtemperaturen, neerslag en luchtvochtigheid ${nlIn(c)} (10-jarig gemiddelde).`,
  cols: ["Maand", "Max", "Min", "Regen", "Vocht"],
  periodsH: (c) => `Wanneer naar ${nlDe(c)}? Per seizoen`,
  verdict: { ideal: "Beste reistijd", good: "Goed", hot: "Heet", rainy: "Nat", cold: "Koud" },
  verdictText: {
    ideal: "Aangename temperaturen en weinig regen: de ideale tijd voor bezienswaardigheden en buiten zijn.",
    good: "Over het algemeen prettig weer en minder toeristen dan in het hoogseizoen.",
    hot: "Zeer warme dagen: bezichtig 's ochtends en 's avonds en zoek 's middags schaduw of het strand op.",
    rainy: "De natste periode van het jaar: buien zijn waarschijnlijk, neem een regenjas mee.",
    cold: "Frisse tot koude dagen: prima voor musea en stedentrips, minder voor het strand.",
  },
  faqH: "Veelgestelde vragen",
  qBest: (c) => `Wat is de beste reistijd voor ${nlDe(c)}?`,
  aBest: (c, b, lo, hi) => `Voor aangenaam, vrij droog weer ga je het best in ${b} naar ${nlDe(c)}. De maxima liggen dan rond ${rg(lo, hi)}°C.`,
  qWarm: (c) => `Wat is de warmste maand ${nlIn(c)}?`,
  aWarm: (c, m, hi, lo) => `De warmste maand ${nlIn(c)} is ${m}, met gemiddeld ${hi}°C overdag en ${lo}°C 's nachts.`,
  qCold: (c) => `Wat is de koudste maand ${nlIn(c)}?`,
  aCold: (c, m, hi, lo) => `De koudste maand ${nlIn(c)} is ${m}: gemiddeld ${hi}°C overdag en ${lo}°C 's nachts.`,
  qRain: (c) => `Wanneer regent het het meest ${nlIn(c)}?`,
  aRain: (c, wet, wm, dry, dm) => `Het natst is het ${nlIn(c)} in ${wet}, met zo'n ${wm} mm regen. Het droogst is ${dry}, met ongeveer ${dm} mm.`,
  qWorst: (c) => `Wanneer kun je beter niet naar ${nlDe(c)}?`,
  aWorst: (c, m, r, v, v2) =>
    r === "none"
      ? `${cap(nlIn(c))} is er geen echt slechte maand: de gemiddelde maxima liggen het hele jaar tussen ${v} en ${v2}°C.`
      : r === "heat"
      ? `De minst prettige maand voor bezienswaardigheden is ${m}, met gemiddeld ${v}°C. Ga je dan toch, plan uitstapjes vroeg in de ochtend.`
      : r === "cold"
        ? `De minst aangename maand ${nlIn(c)} is ${m}, met gemiddeld maar ${v}°C. Wel prima voor musea en rustige bezienswaardigheden.`
        : `De minst betrouwbare maand ${nlIn(c)} is ${m}, met zo'n ${v} mm regen. Neem een regenjas mee en houd je planning flexibel.`,
  qWhy: (c, m) => `Waarom is ${m} een goede reistijd voor ${nlDe(c)}?`,
  aWhy: (c, m, hi, lo, r, cl) => `In ${m} is het ${nlIn(c)} gemiddeld ${hi}°C overdag en ${lo}°C 's nachts, met zo'n ${r} mm regen en ${cl}% bewolking: warm genoeg om buiten te zijn, zonder de grootste hitte of de natste periode.`,
  qGood: (c, m) => `Is ${m} een goede maand voor ${nlDe(c)}?`,
  aGood: (c, m, i, k, hi, mm) =>
    k === "yes"
      ? `Ja. ${cap(m)} is een van de beste maanden voor ${nlDe(c)}, met maxima rond ${hi}°C en zo'n ${mm} mm regen.`
      : k === "hot"
        ? `Ja, als je van warmte houdt: ${i} wordt het ${nlIn(c)} rond ${hi}°C. Prima voor het strand; bezichtig vroeg in de ochtend en 's avonds.`
        : k === "cold"
          ? `${cap(i)} is het fris ${nlIn(c)}, met maxima rond ${hi}°C. Meer iets voor musea en stadswandelingen dan voor het strand, en rustiger.`
          : k === "rainy"
            ? `${cap(m)} is een van de nattere maanden ${nlIn(c)}, met zo'n ${mm} mm regen. Je kunt gerust gaan: neem een regenjas mee en plan flexibel.`
            : `${cap(m)} is een redelijke reistijd voor ${nlDe(c)}: rond ${hi}°C en ${mm} mm regen, al hoort hij niet bij de drie beste maanden.`,
  qHow: (c) => `Hoe check je het weer ${nlIn(c)} voor vertrek?`,
  aHow: (c) => `Op WeatherCompare vergelijk je de verwachting voor ${nlDe(c)} van drie onafhankelijke weerdiensten. Als ze overeenkomen, is de verwachting betrouwbaarder.`,
  liveCta: (c) => `Weer ${nlIn(c)}: 3 verwachtingen vergeleken`,
  monthsH: (c) => `Weer ${nlIn(c)} per maand`,
  moreH: (k) => `Beste reistijd voor andere bestemmingen: ${k}`,
  source: "Klimaatgemiddelden: NASA POWER, 10-jarig gemiddelde.",
};

const pl: BestTimeCopy = {
  slug: "kiedy-jechac",
  eyebrow: "Kiedy jechać",
  title: (c) => `${c}: kiedy jechać? Klimat i pogoda w miesiącach`,
  desc: (c, b) => `Kiedy jest najlepsza pogoda ${plW(c)}? Zwykle: ${b}. Klimat miesiąc po miesiącu, najcieplejszy, najzimniejszy i najbardziej deszczowy miesiąc.`,
  h1: (c) => `${c}: kiedy jechać? Najlepszy czas na wyjazd`,
  answer: (c, b, lo, hi, r) => `Najlepszy czas na wyjazd – ${c} – to ${b}: średnie temperatury maksymalne wynoszą wtedy ${rg(lo, hi)}°C, a opady to około ${r} mm na miesiąc.`,
  factsH: "W skrócie",
  warmest: "Najcieplejszy miesiąc",
  coolest: "Najzimniejszy miesiąc",
  wettest: "Najbardziej deszczowy",
  driest: "Najbardziej suchy",
  sunniest: "Najbardziej słoneczny",
  tableH: (c) => `Klimat ${plW(c)} – miesiąc po miesiącu`,
  tableIntro: (c) => `Średnie temperatury maksymalne i minimalne, opady i wilgotność ${plW(c)} (średnie z 10 lat).`,
  cols: ["Miesiąc", "Maks.", "Min.", "Opady", "Wilgotność"],
  periodsH: () => `Kiedy jechać? Pory roku w skrócie`,
  verdict: { ideal: "Najlepszy czas", good: "Dobrze", hot: "Upał", rainy: "Deszczowo", cold: "Zimno" },
  verdictText: {
    ideal: "Przyjemne temperatury i mało deszczu: idealny czas na zwiedzanie i spędzanie czasu na zewnątrz.",
    good: "Ogólnie przyjemna pogoda i mniej turystów niż w szczycie sezonu.",
    hot: "Bardzo gorące dni: zwiedzaj rano i wieczorem, a popołudnie spędź w cieniu lub na plaży.",
    rainy: "Najbardziej deszczowa pora roku: przelotne opady są prawdopodobne, zabierz kurtkę przeciwdeszczową.",
    cold: "Chłodne lub zimne dni: dobre na muzea i city break, gorsze na plażę.",
  },
  faqH: "Najczęstsze pytania",
  qBest: (c) => `Kiedy jest najlepsza pogoda ${plW(c)}?`,
  aBest: (c, b, lo, hi) => `Na przyjemną, raczej suchą pogodę ${plW(c)} najlepsze są miesiące: ${b}. Średnie maksima wynoszą wtedy ${rg(lo, hi)}°C.`,
  qWarm: (c) => `Który miesiąc jest najcieplejszy ${plW(c)}?`,
  aWarm: (c, m, hi, lo) => `Najcieplejszy miesiąc ${plW(c)} to ${m}: średnio ${hi}°C w dzień i ${lo}°C w nocy.`,
  qCold: (c) => `Który miesiąc jest najzimniejszy ${plW(c)}?`,
  aCold: (c, m, hi, lo) => `Najzimniejszy miesiąc ${plW(c)} to ${m}: średnio ${hi}°C w dzień i ${lo}°C w nocy.`,
  qRain: (c) => `Kiedy ${plW(c)} pada najwięcej?`,
  aRain: (c, wet, wm, dry, dm) => `Najbardziej deszczowy miesiąc ${plW(c)} to ${wet} (około ${wm} mm), a najbardziej suchy – ${dry} (około ${dm} mm).`,
  qWorst: (c) => `Kiedy pogoda ${plW(c)} jest najgorsza?`,
  aWorst: (c, m, r, v, v2) =>
    r === "none"
      ? `${cap(plW(c))} nie ma naprawdę złego miesiąca: średnie maksima przez cały rok wynoszą od ${v} do ${v2}°C.`
      : r === "heat"
      ? `Najmniej komfortowy miesiąc na zwiedzanie to ${m}: średnie maksima sięgają ${v}°C. Jeśli jedziesz wtedy, zwiedzaj wcześnie rano.`
      : r === "cold"
        ? `Najmniej przyjemny miesiąc ${plW(c)} to ${m}: średnio tylko ${v}°C w dzień. To jednak dobry czas na muzea i mniejsze tłumy.`
        : `Najmniej pewny miesiąc ${plW(c)} to ${m}: około ${v} mm deszczu. Zabierz kurtkę przeciwdeszczową i planuj elastycznie.`,
  qWhy: (c, m) => `Dlaczego ${m} to dobry miesiąc na wyjazd (${c})?`,
  aWhy: (c, m, hi, lo, r, cl) => `${cap(m)}: ${plW(c)} jest wtedy średnio ${hi}°C w dzień i ${lo}°C w nocy, spada około ${r} mm deszczu, a zachmurzenie wynosi ${cl}%. Wystarczająco ciepło, by być na zewnątrz, bez największych upałów i bez najbardziej deszczowej pory.`,
  qGood: (c, _m, i) => `Jaka jest pogoda ${plW(c)} ${i} – czy warto jechać?`,
  aGood: (c, m, i, k, hi, mm) =>
    k === "yes"
      ? `Tak. ${cap(m)} to jeden z najlepszych miesięcy na wyjazd: ${plW(c)} jest wtedy ok. ${hi}°C, a opady to ok. ${mm} mm.`
      : k === "hot"
        ? `Tak, jeśli lubisz upał: ${i} ${plW(c)} jest ok. ${hi}°C. Dobry czas na plażę; zwiedzaj wcześnie rano i wieczorem.`
        : k === "cold"
          ? `${cap(i)} ${plW(c)} jest chłodno, ok. ${hi}°C w dzień. Lepiej na muzea i spacery po mieście niż na plażę, za to jest spokojniej.`
          : k === "rainy"
            ? `${cap(m)} to jeden z bardziej deszczowych miesięcy ${plW(c)} (ok. ${mm} mm). Można jechać, ale zabierz kurtkę przeciwdeszczową.`
            : `${cap(m)} to niezły czas na wyjazd: ${plW(c)} jest ok. ${hi}°C i ${mm} mm opadów, choć to nie jeden z trzech najlepszych miesięcy.`,
  qHow: (c) => `Jak sprawdzić pogodę ${plW(c)} przed wyjazdem?`,
  aHow: (c) => `Na WeatherCompare porównasz prognozy pogody ${plW(c)} z trzech niezależnych serwisów pogodowych. Gdy są zgodne, prognoza jest bardziej wiarygodna.`,
  liveCta: (c) => `Pogoda ${plW(c)}: porównanie 3 prognoz`,
  monthsH: (c) => `Pogoda ${plW(c)} w każdym miesiącu`,
  moreH: (k) => `Kiedy jechać – inne miejsca: ${k}`,
  source: "Średnie klimatyczne: NASA POWER, średnie z 10 lat.",
};

const ALL: Record<AnyLocale, BestTimeCopy> = { en, it, de, fr, es, pt, nl, pl };

export function bestTimeCopy(locale: AnyLocale): BestTimeCopy {
  return ALL[locale];
}

// ---------------------------------------------------------------------------
// Climate analysis shared by the page and its FAQ.
// ---------------------------------------------------------------------------

const argmax = (xs: number[]) => xs.reduce((b, x, i) => (x > xs[b]! ? i : b), 0);
const argmin = (xs: number[]) => xs.reduce((b, x, i) => (x < xs[b]! ? i : b), 0);
const r0 = (n: number) => Math.round(n);

export interface Period {
  months: number[];
  hi: number;
  lo: number;
  rain: number;
  verdict: Verdict;
}

export interface BestTimeFacts {
  best: number[];
  bestLo: number;
  bestHi: number;
  bestRain: number;
  warmest: number;
  coolest: number;
  wettest: number;
  driest: number;
  sunniest: number;
  worst: number;
  worstReason: WorstReason;
  worstValue: number;
  worstValue2: number;
  periods: Period[];
}

export function analyseClimate(c: CityClimate): BestTimeFacts {
  const best = bestMonths(c);
  const his = best.map((m) => c.tMax[m]!);
  const score = (m: number) => Math.max(scoreMonth(c, m, "warm"), scoreMonth(c, m, "mild"));
  const worst = Array.from({ length: 12 }, (_, m) => m).sort((x, y) => score(x) - score(y))[0]!;
  const hiW = c.tMax[worst]!;
  const wet = argmax(c.precipMm);
  let worstM = worst;
  let worstReason: WorstReason = hiW >= 30 ? "heat" : hiW < 14 ? "cold" : "none";
  if (worstReason === "none" && c.precipMm[wet]! >= 60) {
    worstReason = "rain";
    worstM = wet;
  }
  const worstValue = worstReason === "rain" ? r0(c.precipMm[worstM]!) : worstReason === "none" ? r0(Math.min(...c.tMax)) : r0(hiW);
  const worstValue2 = r0(Math.max(...c.tMax));

  const groups = [[11, 0, 1], [2, 3, 4], [5, 6, 7], [8, 9, 10]];
  const avg = (ms: number[], xs: number[]) => ms.reduce((s, m) => s + xs[m]!, 0) / ms.length;
  const periods: Period[] = groups.map((ms) => {
    const hi = avg(ms, c.tMax);
    const lo = avg(ms, c.tMin);
    const rain = avg(ms, c.precipMm);
    const verdict: Verdict = ms.filter((m) => best.includes(m)).length >= 2
      ? "ideal"
      : hi >= 31
        ? "hot"
        : rain >= 100
          ? "rainy"
          : hi < 13
            ? "cold"
            : "good";
    return { months: ms, hi: r0(hi), lo: r0(lo), rain: r0(rain), verdict };
  });

  return {
    best,
    bestLo: r0(Math.min(...his)),
    bestHi: r0(Math.max(...his)),
    bestRain: r0(best.reduce((s, m) => s + c.precipMm[m]!, 0) / best.length),
    warmest: argmax(c.tMax),
    coolest: argmin(c.tMax),
    wettest: argmax(c.precipMm),
    driest: argmin(c.precipMm),
    sunniest: argmin(c.cloud),
    worst: worstM,
    worstReason,
    worstValue,
    worstValue2,
    periods,
  };
}

export function goodKind(c: CityClimate, best: number[], m: number): GoodKind {
  if (best.includes(m)) return "yes";
  const hi = c.tMax[m]!;
  if (hi >= 31) return "hot";
  if (hi < 13) return "cold";
  if (c.precipMm[m]! >= 90) return "rainy";
  return "ok";
}

/** "Is {month} a good time to visit {city}?" as a FAQ item. */
export function goodMonthFaq(locale: AnyLocale, cityLabel: string, c: CityClimate, m: number) {
  const t = bestTimeCopy(locale);
  const mi = monthInfo(locale);
  const k = goodKind(c, bestMonths(c), m);
  return {
    question: t.qGood(cityLabel, mi.monthNames[m]!, mi.inMonth[m]!),
    answer: cap(t.aGood(cityLabel, mi.monthNames[m]!, mi.inMonth[m]!, k, r0(c.tMax[m]!), r0(c.precipMm[m]!))),
  };
}

/** FAQ items (question/answer) for a city, in the page's language. */
export function bestTimeFaq(locale: AnyLocale, cityLabel: string, c: CityClimate, f: BestTimeFacts) {
  const t = bestTimeCopy(locale);
  const mn = monthInfo(locale).monthNames;
  const best = joinList(locale, f.best.map((m) => mn[m]!));
  // German takes "im Mai", Dutch/French/Spanish "in/en mei": the copy adds prepositions itself.
  const why = f.best.includes(f.warmest) && f.best.length > 1 ? f.best.find((m) => m !== f.warmest)! : f.best[0]!;
  return [
    { question: t.qBest(cityLabel), answer: t.aBest(cityLabel, best, f.bestLo, f.bestHi) },
    { question: t.qWhy(cityLabel, mn[why]!), answer: t.aWhy(cityLabel, mn[why]!, r0(c.tMax[why]!), r0(c.tMin[why]!), r0(c.precipMm[why]!), r0(c.cloud[why]!)) },
    { question: t.qWarm(cityLabel), answer: t.aWarm(cityLabel, mn[f.warmest]!, r0(c.tMax[f.warmest]!), r0(c.tMin[f.warmest]!)) },
    { question: t.qCold(cityLabel), answer: t.aCold(cityLabel, mn[f.coolest]!, r0(c.tMax[f.coolest]!), r0(c.tMin[f.coolest]!)) },
    { question: t.qRain(cityLabel), answer: t.aRain(cityLabel, mn[f.wettest]!, r0(c.precipMm[f.wettest]!), mn[f.driest]!, r0(c.precipMm[f.driest]!)) },
    { question: t.qWorst(cityLabel), answer: t.aWorst(cityLabel, mn[f.worst]!, f.worstReason, f.worstValue, f.worstValue2) },
    { question: t.qHow(cityLabel), answer: t.aHow(cityLabel) },
  ].map((x) => ({ question: x.question, answer: cap(x.answer) }));
}
