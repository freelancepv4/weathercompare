/**
 * <meta name="keywords"> sets per page type and language. Search engines
 * give this tag little weight; the same phrases are also used in titles,
 * headings and FAQ text, which is what actually matters. The lists mirror
 * the query shapes people type in each market (from Google's related
 * searches and People-also-ask boxes).
 */
import type { AnyLocale } from "./routing";
import { a as itA } from "./copy/it";
import { a as frA } from "./copy/fr";
import { inC as deIn } from "./copy/de";

interface Kw {
  city: (c: string) => string[];
  month: (c: string, m: string) => string[];
  best: (c: string) => string[];
}

const KW: Record<AnyLocale, Kw> = {
  en: {
    city: (c) => [`${c} weather`, `weather in ${c}`, `${c} weather forecast`, `${c} weather 14 days`, `${c} weather tomorrow`, `best time to visit ${c}`],
    month: (c, m) => [`${c} weather in ${m}`, `${c} in ${m}`, `is ${m} a good time to visit ${c}`, `how hot is ${c} in ${m}`, `what to pack for ${c} in ${m}`],
    best: (c) => [`best time to visit ${c}`, `when to go to ${c}`, `${c} weather by month`, `${c} climate`, `warmest month in ${c}`, `rainiest month in ${c}`],
  },
  it: {
    city: (c) => [`meteo ${c}`, `previsioni meteo ${c}`, `meteo ${c} 15 giorni`, `meteo ${c} domani`, `che tempo fa ${itA(c)}`],
    month: (c, m) => [`meteo ${c} ${m}`, `clima ${c} ${m}`, `che tempo fa ${itA(c)} a ${m}`, `${c} a ${m}`],
    best: (c) => [`quando andare ${itA(c)}`, `periodo migliore per andare ${itA(c)}`, `clima ${c}`, `mese più caldo ${itA(c)}`, `mese più piovoso ${itA(c)}`],
  },
  de: {
    city: (c) => [`Wetter ${c}`, `${c} Wetter`, `Wetter ${c} 14 Tage`, `Wetter ${c} morgen`, `Wettervorhersage ${c}`],
    month: (c, m) => [`Wetter ${c} ${m}`, `${c} im ${m}`, `wie warm ist es ${deIn(c)} im ${m}`, `${c} ${m} Temperatur`],
    best: (c) => [`beste Reisezeit ${c}`, `Klimatabelle ${c}`, `Klima ${c}`, `wann nach ${c}`, `wärmster Monat ${c}`],
  },
  fr: {
    city: (c) => [`météo ${c}`, `météo ${c} 14 jours`, `prévisions météo ${c}`, `météo ${c} demain`],
    month: (c, m) => [`météo ${c} ${m}`, `climat ${c} ${m}`, `quel temps fait-il ${frA(c)} en ${m}`, `${c} en ${m}`],
    best: (c) => [`quand partir ${frA(c)}`, `meilleure période pour partir ${frA(c)}`, `climat ${c}`, `météo ${c} par mois`],
  },
  es: {
    city: (c) => [`tiempo en ${c}`, `el tiempo en ${c}`, `tiempo ${c} 14 días`, `pronóstico ${c}`],
    month: (c, m) => [`tiempo en ${c} en ${m}`, `clima ${c} ${m}`, `${c} en ${m}`],
    best: (c) => [`mejor época para viajar a ${c}`, `cuándo ir a ${c}`, `clima en ${c}`, `clima ${c} mes a mes`],
  },
  pt: {
    city: (c) => [`tempo ${c}`, `previsão do tempo ${c}`, `tempo ${c} 14 dias`],
    month: (c, m) => [`tempo ${c} ${m}`, `clima ${c} ${m}`, `${c} em ${m}`],
    best: (c) => [`melhor época para ir a ${c}`, `melhor altura para visitar ${c}`, `clima ${c}`],
  },
  nl: {
    city: (c) => [`weer ${c}`, `weerbericht ${c}`, `weer ${c} 14 dagen`, `weer ${c} morgen`],
    month: (c, m) => [`weer ${c} ${m}`, `${c} in ${m}`, `temperatuur ${c} ${m}`],
    best: (c) => [`beste reistijd ${c}`, `klimaat ${c}`, `wanneer naar ${c}`],
  },
  pl: {
    city: (c) => [`pogoda ${c}`, `pogoda ${c} 14 dni`, `prognoza pogody ${c}`, `pogoda ${c} jutro`],
    month: (c, m) => [`pogoda ${c} ${m}`, `klimat ${c} ${m}`, `${c} ${m} temperatura`],
    best: (c) => [`kiedy jechać ${c}`, `najlepszy czas na wyjazd ${c}`, `klimat ${c}`],
  },
};

export function keywordsFor(locale: AnyLocale): Kw {
  return KW[locale];
}
