/**
 * URL structure for the translated site versions.
 *
 * English keeps its original, unprefixed URLs (/weather/italy/rome …).
 * Every other language lives under /{lang}/ and uses the word people there
 * actually type into search engines (from Google Trends: "meteo", "wetter",
 * "tiempo", "tempo", "weer", "pogoda"), plus localized month names:
 *
 *   /it/meteo/italy/rome             city forecast
 *   /it/meteo/italy/rome/ottobre     month climate
 *   /it/meteo/italy                  country
 *   /it/dove-andare/ottobre          where to go in a month
 *   /it/trova-meta                   trip weather finder
 *   /it/meteo-oggi                   daily "weather today" page
 *   /it                              home
 *
 * Country and city slugs stay in English on purpose: they are stable IDs,
 * never shown as text (pages display the localized names from places.ts).
 */
// Deliberately NOT imported from lib/data/climate.ts: this file is used by
// client components (header, language switcher), and importing climate.ts
// would pull the whole climate dataset into every page's JavaScript.
const MONTHS = [
  { slug: "january", name: "January" },
  { slug: "february", name: "February" },
  { slug: "march", name: "March" },
  { slug: "april", name: "April" },
  { slug: "may", name: "May" },
  { slug: "june", name: "June" },
  { slug: "july", name: "July" },
  { slug: "august", name: "August" },
  { slug: "september", name: "September" },
  { slug: "october", name: "October" },
  { slug: "november", name: "November" },
  { slug: "december", name: "December" },
];

export const CONTENT_LOCALES = ["it", "de", "fr", "es", "pt", "nl", "pl"] as const;
export type ContentLocale = (typeof CONTENT_LOCALES)[number];
export type AnyLocale = ContentLocale | "en";
export const ALL_LOCALES: AnyLocale[] = ["en", ...CONTENT_LOCALES];

export function isContentLocale(value: string | undefined | null): value is ContentLocale {
  return !!value && (CONTENT_LOCALES as readonly string[]).includes(value);
}

interface LocaleRouting {
  /** hreflang / <html lang> code */
  hreflang: string;
  /** Intl locale for number/date formatting */
  intl: string;
  weather: string;
  whereToGo: string;
  tripFinder: string;
  today: string;
  /** "Weather tomorrow" page, e.g. /es/tiempo-manana */
  tomorrow: string;
  /** "Best time to visit" guides, e.g. /de/beste-reisezeit/spain/tenerife */
  bestTime: string;
  /** Weather FAQ page, e.g. /es/preguntas-frecuentes */
  faq: string;
  /** Month URL slugs, January..December */
  monthSlugs: string[];
  /** Month display names, January..December */
  monthNames: string[];
  /** "in {month}" phrase, January..December (handles e.g. Polish cases) */
  inMonth: string[];
}

export const ROUTING: Record<ContentLocale, LocaleRouting> = {
  it: {
    hreflang: "it",
    intl: "it-IT",
    weather: "meteo",
    whereToGo: "dove-andare",
    tripFinder: "trova-meta",
    today: "meteo-oggi",
    tomorrow: "meteo-domani",
    bestTime: "quando-andare",
    faq: "domande-frequenti",
    monthSlugs: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
    monthNames: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
    inMonth: ["a gennaio", "a febbraio", "a marzo", "ad aprile", "a maggio", "a giugno", "a luglio", "ad agosto", "a settembre", "a ottobre", "a novembre", "a dicembre"],
  },
  de: {
    hreflang: "de",
    intl: "de-DE",
    weather: "wetter",
    whereToGo: "wohin-reisen",
    tripFinder: "reiseziel-finder",
    today: "wetter-heute",
    tomorrow: "wetter-morgen",
    bestTime: "beste-reisezeit",
    faq: "haeufige-fragen",
    monthSlugs: ["januar", "februar", "maerz", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "dezember"],
    monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    inMonth: ["im Januar", "im Februar", "im März", "im April", "im Mai", "im Juni", "im Juli", "im August", "im September", "im Oktober", "im November", "im Dezember"],
  },
  fr: {
    hreflang: "fr",
    intl: "fr-FR",
    weather: "meteo",
    whereToGo: "ou-partir",
    tripFinder: "trouver-destination",
    today: "meteo-aujourdhui",
    tomorrow: "meteo-demain",
    bestTime: "quand-partir",
    faq: "questions-frequentes",
    monthSlugs: ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"],
    monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
    inMonth: ["en janvier", "en février", "en mars", "en avril", "en mai", "en juin", "en juillet", "en août", "en septembre", "en octobre", "en novembre", "en décembre"],
  },
  es: {
    hreflang: "es",
    intl: "es-ES",
    weather: "tiempo",
    whereToGo: "donde-viajar",
    tripFinder: "buscador-destinos",
    today: "tiempo-hoy",
    tomorrow: "tiempo-manana",
    bestTime: "mejor-epoca",
    faq: "preguntas-frecuentes",
    monthSlugs: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    inMonth: ["en enero", "en febrero", "en marzo", "en abril", "en mayo", "en junio", "en julio", "en agosto", "en septiembre", "en octubre", "en noviembre", "en diciembre"],
  },
  pt: {
    hreflang: "pt",
    intl: "pt-PT",
    weather: "tempo",
    whereToGo: "para-onde-viajar",
    tripFinder: "encontrar-destino",
    today: "tempo-hoje",
    tomorrow: "tempo-amanha",
    bestTime: "melhor-epoca",
    faq: "perguntas-frequentes",
    monthSlugs: ["janeiro", "fevereiro", "marco", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
    monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
    inMonth: ["em janeiro", "em fevereiro", "em março", "em abril", "em maio", "em junho", "em julho", "em agosto", "em setembro", "em outubro", "em novembro", "em dezembro"],
  },
  nl: {
    hreflang: "nl",
    intl: "nl-NL",
    weather: "weer",
    whereToGo: "waar-naartoe",
    tripFinder: "bestemming-zoeker",
    today: "weer-vandaag",
    tomorrow: "weer-morgen",
    bestTime: "beste-reistijd",
    faq: "veelgestelde-vragen",
    monthSlugs: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    monthNames: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    inMonth: ["in januari", "in februari", "in maart", "in april", "in mei", "in juni", "in juli", "in augustus", "in september", "in oktober", "in november", "in december"],
  },
  pl: {
    hreflang: "pl",
    intl: "pl-PL",
    weather: "pogoda",
    whereToGo: "gdzie-jechac",
    tripFinder: "wyszukiwarka-kierunkow",
    today: "pogoda-dzisiaj",
    tomorrow: "pogoda-jutro",
    bestTime: "kiedy-jechac",
    faq: "czeste-pytania",
    monthSlugs: ["styczen", "luty", "marzec", "kwiecien", "maj", "czerwiec", "lipiec", "sierpien", "wrzesien", "pazdziernik", "listopad", "grudzien"],
    monthNames: ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"],
    inMonth: ["w styczniu", "w lutym", "w marcu", "w kwietniu", "w maju", "w czerwcu", "w lipcu", "w sierpniu", "we wrześniu", "w październiku", "w listopadzie", "w grudniu"],
  },
};

/**
 * Turkish (tr) — WORK IN PROGRESS, not in CONTENT_LOCALES yet, so no /tr/
 * pages exist. Path words follow Turkish searches ("hava durumu",
 * "15 günlük hava durumu", "ne zaman gidilir"); URL slugs are ASCII.
 * Move this into ROUTING and add "tr" to CONTENT_LOCALES once the copy,
 * places, insights, bestTime and keywords for Turkish are all complete.
 */
export const TR_ROUTING: LocaleRouting = {
  hreflang: "tr",
  intl: "tr-TR",
  weather: "hava-durumu",
  whereToGo: "nereye-gidilir",
  tripFinder: "seyahat-hava-bulucu",
  today: "bugun-hava-durumu",
  tomorrow: "yarin-hava-durumu",
  bestTime: "ne-zaman-gidilir",
  faq: "sikca-sorulan-sorular",
  monthSlugs: ["ocak", "subat", "mart", "nisan", "mayis", "haziran", "temmuz", "agustos", "eylul", "ekim", "kasim", "aralik"],
  monthNames: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
  inMonth: ["Ocak ayında", "Şubat ayında", "Mart ayında", "Nisan ayında", "Mayıs ayında", "Haziran ayında", "Temmuz ayında", "Ağustos ayında", "Eylül ayında", "Ekim ayında", "Kasım ayında", "Aralık ayında"],
};

/** English month names/phrases, for the shared page components. */
export const EN_MONTHS = {
  monthSlugs: MONTHS.map((m) => m.slug),
  monthNames: MONTHS.map((m) => m.name),
  inMonth: MONTHS.map((m) => `in ${m.name}`),
};

export function monthInfo(locale: AnyLocale) {
  return locale === "en" ? EN_MONTHS : ROUTING[locale];
}

/** Month index (0–11) from a localized slug, or -1. */
export function monthFromSlug(locale: AnyLocale, slug: string): number {
  return monthInfo(locale).monthSlugs.indexOf(slug);
}

// ---------------------------------------------------------------------------
// URL builders — one place that knows every page's address in every language.
// ---------------------------------------------------------------------------

const prefix = (l: AnyLocale) => (l === "en" ? "" : `/${l}`);

export const paths = {
  home: (l: AnyLocale) => (l === "en" ? "/" : `/${l}`),
  /** Index of every country: /weather, /es/tiempo, /de/wetter … */
  countries: (l: AnyLocale) => (l === "en" ? "/weather" : `/${l}/${ROUTING[l].weather}`),
  country: (l: AnyLocale, country: string) =>
    l === "en" ? `/weather/${country}` : `/${l}/${ROUTING[l].weather}/${country}`,
  city: (l: AnyLocale, country: string, city: string) =>
    l === "en" ? `/weather/${country}/${city}` : `/${l}/${ROUTING[l].weather}/${country}/${city}`,
  month: (l: AnyLocale, country: string, city: string, month: number) =>
    `${paths.city(l, country, city)}/${monthInfo(l).monthSlugs[month]}`,
  whereToGo: (l: AnyLocale, month: number) =>
    l === "en" ? `/where-to-go/${EN_MONTHS.monthSlugs[month]}` : `/${l}/${ROUTING[l].whereToGo}/${ROUTING[l].monthSlugs[month]}`,
  tripFinder: (l: AnyLocale) => (l === "en" ? "/trip-finder" : `/${l}/${ROUTING[l].tripFinder}`),
  today: (l: AnyLocale) => (l === "en" ? "/weather-today" : `/${l}/${ROUTING[l].today}`),
  tomorrow: (l: AnyLocale) => (l === "en" ? "/weather-tomorrow" : `/${l}/${ROUTING[l].tomorrow}`),
  faq: (l: AnyLocale) => (l === "en" ? "/faq" : `/${l}/${ROUTING[l].faq}`),
  bestTime: (l: AnyLocale, country: string, city: string) =>
    l === "en" ? `/guides/best-time-to-visit/${country}/${city}` : `/${l}/${ROUTING[l].bestTime}/${country}/${city}`,
  prefix,
};

export type PageRef =
  | { kind: "home" }
  | { kind: "countries" }
  | { kind: "country"; country: string }
  | { kind: "city"; country: string; city: string }
  | { kind: "month"; country: string; city: string; month: number }
  | { kind: "whereToGo"; month: number }
  | { kind: "tripFinder" }
  | { kind: "today" }
  | { kind: "tomorrow" }
  | { kind: "faq" }
  | { kind: "bestTime"; country: string; city: string };

export function pathFor(l: AnyLocale, ref: PageRef): string {
  switch (ref.kind) {
    case "home":
      return paths.home(l);
    case "countries":
      return paths.countries(l);
    case "country":
      return paths.country(l, ref.country);
    case "city":
      return paths.city(l, ref.country, ref.city);
    case "month":
      return paths.month(l, ref.country, ref.city, ref.month);
    case "whereToGo":
      return paths.whereToGo(l, ref.month);
    case "tripFinder":
      return paths.tripFinder(l);
    case "today":
      return paths.today(l);
    case "tomorrow":
      return paths.tomorrow(l);
    case "faq":
      return paths.faq(l);
    case "bestTime":
      return paths.bestTime(l, ref.country, ref.city);
  }
}

/**
 * Parses any site path (English or translated) into a PageRef, so the
 * language switcher can jump to the same page in another language.
 * Returns null for pages that exist only in English (guides, legal…).
 */
export function parsePath(pathname: string): { locale: AnyLocale; ref: PageRef } | null {
  const parts = pathname.split("?")[0]!.split("/").filter(Boolean);
  let locale: AnyLocale = "en";
  if (isContentLocale(parts[0])) {
    locale = parts[0];
    parts.shift();
  }
  if (parts.length === 0) return { locale, ref: { kind: "home" } };
  const mi = monthInfo(locale);
  if (locale === "en") {
    const [a, b, c, d] = parts;
    if (a === "weather" && !b) return { locale, ref: { kind: "countries" } };
    if (a === "weather" && b && !c && b !== "search") return { locale, ref: { kind: "country", country: b } };
    if (a === "weather" && b && c && !d) return { locale, ref: { kind: "city", country: b, city: c } };
    if (a === "weather" && b && c && d && mi.monthSlugs.includes(d))
      return { locale, ref: { kind: "month", country: b, city: c, month: mi.monthSlugs.indexOf(d) } };
    if (a === "where-to-go" && b && mi.monthSlugs.includes(b)) return { locale, ref: { kind: "whereToGo", month: mi.monthSlugs.indexOf(b) } };
    if (a === "trip-finder" && !b) return { locale, ref: { kind: "tripFinder" } };
    if (a === "weather-today" && !b) return { locale, ref: { kind: "today" } };
    if (a === "weather-tomorrow" && !b) return { locale, ref: { kind: "tomorrow" } };
    if (a === "faq" && !b) return { locale, ref: { kind: "faq" } };
    if (a === "guides" && b === "best-time-to-visit" && c && d && !parts[4]) return { locale, ref: { kind: "bestTime", country: c, city: d } };
    return null;
  }
  const r = ROUTING[locale];
  const [a, b, c, d] = parts;
  if (a === r.weather && !b) return { locale, ref: { kind: "countries" } };
  if (a === r.weather && b && !c) return { locale, ref: { kind: "country", country: b } };
  if (a === r.weather && b && c && !d) return { locale, ref: { kind: "city", country: b, city: c } };
  if (a === r.weather && b && c && d && r.monthSlugs.includes(d))
    return { locale, ref: { kind: "month", country: b, city: c, month: r.monthSlugs.indexOf(d) } };
  if (a === r.whereToGo && b && r.monthSlugs.includes(b)) return { locale, ref: { kind: "whereToGo", month: r.monthSlugs.indexOf(b) } };
  if (a === r.tripFinder && !b) return { locale, ref: { kind: "tripFinder" } };
  if (a === r.today && !b) return { locale, ref: { kind: "today" } };
  if (a === r.tomorrow && !b) return { locale, ref: { kind: "tomorrow" } };
  if (a === r.faq && !b) return { locale, ref: { kind: "faq" } };
  if (a === r.bestTime && b && c && !d) return { locale, ref: { kind: "bestTime", country: b, city: c } };
  return { locale, ref: { kind: "home" } };
}

/** The locale a pathname belongs to ("en" for unprefixed paths). */
export function localeFromPath(pathname: string | null | undefined): AnyLocale {
  const first = (pathname ?? "").split("/")[1];
  return isContentLocale(first) ? first : "en";
}

/** hreflang alternates for a page (for Next.js metadata `alternates.languages`). */
export function languageAlternates(siteUrl: string, ref: PageRef): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of ALL_LOCALES) out[l === "en" ? "en" : ROUTING[l].hreflang] = `${siteUrl}${pathFor(l, ref)}`;
  out["x-default"] = `${siteUrl}${pathFor("en", ref)}`;
  return out;
}
