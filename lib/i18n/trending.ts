/**
 * Trending weather searches per language, shown on the daily "Weather
 * today" pages and linked to the matching page on this site.
 *
 * Source: Google Trends exports (Sept 2026) — worldwide rising queries
 * ("weather tomorrow" +30%, "previsão do tempo" +30%, "météo demain" +20%,
 * "clima para amanhã" +10%, "wetter morgen" +10%) and Italy's daily trends
 * ("meteo napoli", "meteo bari", wind alerts). Refresh this list whenever
 * you export new trends — each entry is just a search phrase + a page.
 */
import type { AnyLocale, PageRef } from "./routing";

export interface TrendItem {
  q: string;
  ref: PageRef;
}

const city = (country: string, c: string): PageRef => ({ kind: "city", country, city: c });
const TODAY: PageRef = { kind: "today" };

/** `where` builds the "where to go in {current month}" phrase. */
export const TRENDING: Record<AnyLocale, { items: TrendItem[]; where: (monthName: string, inMonth: string) => string }> = {
  en: {
    items: [
      { q: "weather tomorrow", ref: TODAY },
      { q: "london weather", ref: city("uk", "london") },
      { q: "new york weather", ref: city("usa", "new-york") },
      { q: "dubai weather", ref: city("uae", "dubai") },
    ],
    where: (m) => `where to go in ${m}`,
  },
  it: {
    items: [
      { q: "meteo domani", ref: TODAY },
      { q: "meteo napoli", ref: city("italy", "naples") },
      { q: "meteo bari", ref: city("italy", "bari") },
      { q: "meteo roma", ref: city("italy", "rome") },
      { q: "meteo milano", ref: city("italy", "milan") },
    ],
    where: (_m, inM) => `dove andare ${inM}`,
  },
  de: {
    items: [
      { q: "wetter morgen", ref: TODAY },
      { q: "wetter berlin", ref: city("germany", "berlin") },
      { q: "wetter münchen", ref: city("germany", "munich") },
      { q: "wetter hamburg", ref: city("germany", "hamburg") },
      { q: "wetter wien", ref: city("austria", "vienna") },
    ],
    where: (m) => `wo ist es im ${m} warm`,
  },
  fr: {
    items: [
      { q: "météo demain", ref: TODAY },
      { q: "météo paris", ref: city("france", "paris") },
      { q: "météo marseille", ref: city("france", "marseille") },
      { q: "météo lyon", ref: city("france", "lyon") },
      { q: "météo bruxelles", ref: city("belgium", "brussels") },
    ],
    where: (m) => `où partir en ${m}`,
  },
  es: {
    items: [
      { q: "tiempo mañana", ref: TODAY },
      { q: "tiempo madrid", ref: city("spain", "madrid") },
      { q: "tiempo barcelona", ref: city("spain", "barcelona") },
      { q: "tiempo sevilla", ref: city("spain", "seville") },
      { q: "clima cancún", ref: city("mexico", "cancun") },
    ],
    where: (m) => `dónde viajar en ${m}`,
  },
  pt: {
    items: [
      { q: "clima para amanhã", ref: TODAY },
      { q: "previsão do tempo lisboa", ref: city("portugal", "lisbon") },
      { q: "tempo porto", ref: city("portugal", "porto") },
      { q: "previsão do tempo são paulo", ref: city("brazil", "sao-paulo") },
      { q: "tempo rio de janeiro", ref: city("brazil", "rio-de-janeiro") },
    ],
    where: (m) => `para onde viajar em ${m}`,
  },
  nl: {
    items: [
      { q: "weer morgen", ref: TODAY },
      { q: "weer amsterdam", ref: city("netherlands", "amsterdam") },
      { q: "weer rotterdam", ref: city("netherlands", "rotterdam") },
      { q: "weer antwerpen", ref: city("belgium", "antwerp") },
      { q: "weer brussel", ref: city("belgium", "brussels") },
    ],
    where: (m) => `waar is het warm in ${m}`,
  },
  pl: {
    items: [
      { q: "pogoda jutro", ref: TODAY },
      { q: "pogoda warszawa", ref: city("poland", "warsaw") },
      { q: "pogoda kraków", ref: city("poland", "krakow") },
      { q: "pogoda gdańsk", ref: city("poland", "gdansk") },
      { q: "pogoda londyn", ref: city("uk", "london") },
    ],
    where: (_m, inM) => `gdzie jest ciepło ${inM}`,
  },
};

/** Home countries shown first on each language's daily page. */
export const LOCAL_REGION: Record<AnyLocale, { countries: string[]; label: string; tz: string; tag: string }> = {
  en: { countries: ["uk", "ireland"], label: "UK & Ireland", tz: "Europe/London", tag: "en-GB" },
  it: { countries: ["italy"], label: "Italia", tz: "Europe/Rome", tag: "it-IT" },
  de: { countries: ["germany", "austria", "switzerland"], label: "Deutschland, Österreich, Schweiz", tz: "Europe/Berlin", tag: "de-DE" },
  fr: { countries: ["france", "belgium", "switzerland"], label: "France, Belgique, Suisse", tz: "Europe/Paris", tag: "fr-FR" },
  es: { countries: ["spain", "mexico"], label: "España y México", tz: "Europe/Madrid", tag: "es-ES" },
  pt: { countries: ["portugal", "brazil"], label: "Portugal e Brasil", tz: "Europe/Lisbon", tag: "pt-PT" },
  nl: { countries: ["netherlands", "belgium"], label: "Nederland en België", tz: "Europe/Amsterdam", tag: "nl-NL" },
  pl: { countries: ["poland"], label: "Polska", tz: "Europe/Warsaw", tag: "pl-PL" },
};
