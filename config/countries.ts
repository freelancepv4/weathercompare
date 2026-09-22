/**
 * Seed dataset of countries and cities used to generate SEO-friendly
 * location pages (/weather/{country}/{city}) without a database.
 *
 * In production this would be backed by a geocoding API / database of
 * thousands of locations (see lib/providers/geocoding.ts). This seed list
 * keeps the demo build fast and avoids generating fake/low-value pages.
 */

export interface CitySeed {
  slug: string;
  name: string;
  // Localized display names, keyed by locale code.
  i18nName?: Partial<Record<"en" | "it" | "de" | "fr" | "es", string>>;
  region: string;
  lat: number;
  lon: number;
  population: number;
  timezone: string;
}

export interface CountrySeed {
  slug: string;
  name: string;
  i18nName?: Partial<Record<"en" | "it" | "de" | "fr" | "es", string>>;
  isoCode: string;
  cities: CitySeed[];
}

export const countries: CountrySeed[] = [
  {
    slug: "italy",
    name: "Italy",
    isoCode: "IT",
    i18nName: { it: "Italia", de: "Italien", fr: "Italie", es: "Italia", en: "Italy" },
    cities: [
      { slug: "rome", name: "Rome", i18nName: { it: "Roma" }, region: "Lazio", lat: 41.9028, lon: 12.4964, population: 2873000, timezone: "Europe/Rome" },
      { slug: "milan", name: "Milan", i18nName: { it: "Milano" }, region: "Lombardy", lat: 45.4642, lon: 9.19, population: 1372000, timezone: "Europe/Rome" },
      { slug: "naples", name: "Naples", i18nName: { it: "Napoli" }, region: "Campania", lat: 40.8518, lon: 14.2681, population: 914758, timezone: "Europe/Rome" },
      { slug: "turin", name: "Turin", i18nName: { it: "Torino" }, region: "Piedmont", lat: 45.0703, lon: 7.6869, population: 848196, timezone: "Europe/Rome" },
      { slug: "florence", name: "Florence", i18nName: { it: "Firenze" }, region: "Tuscany", lat: 43.7696, lon: 11.2558, population: 366927, timezone: "Europe/Rome" },
      { slug: "bologna", name: "Bologna", region: "Emilia-Romagna", lat: 44.4949, lon: 11.3426, population: 388367, timezone: "Europe/Rome" },
      { slug: "palermo", name: "Palermo", region: "Sicily", lat: 38.1157, lon: 13.3615, population: 630167, timezone: "Europe/Rome" },
      { slug: "venice", name: "Venice", i18nName: { it: "Venezia" }, region: "Veneto", lat: 45.4408, lon: 12.3155, population: 258685, timezone: "Europe/Rome" },
      { slug: "genoa", name: "Genoa", i18nName: { it: "Genova" }, region: "Liguria", lat: 44.4056, lon: 8.9463, population: 561300, timezone: "Europe/Rome" },
      { slug: "verona", name: "Verona", region: "Veneto", lat: 45.4384, lon: 10.9916, population: 257275, timezone: "Europe/Rome" },
      { slug: "bari", name: "Bari", region: "Apulia", lat: 41.1171, lon: 16.8719, population: 316491, timezone: "Europe/Rome" },
      { slug: "catania", name: "Catania", region: "Sicily", lat: 37.5079, lon: 15.083, population: 311584, timezone: "Europe/Rome" },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    isoCode: "DE",
    i18nName: { it: "Germania", de: "Deutschland", fr: "Allemagne", es: "Alemania", en: "Germany" },
    cities: [
      { slug: "berlin", name: "Berlin", region: "Berlin", lat: 52.52, lon: 13.405, population: 3677000, timezone: "Europe/Berlin" },
      { slug: "munich", name: "Munich", i18nName: { de: "München" }, region: "Bavaria", lat: 48.1351, lon: 11.582, population: 1488000, timezone: "Europe/Berlin" },
      { slug: "hamburg", name: "Hamburg", region: "Hamburg", lat: 53.5511, lon: 9.9937, population: 1841000, timezone: "Europe/Berlin" },
      { slug: "frankfurt", name: "Frankfurt", region: "Hesse", lat: 50.1109, lon: 8.6821, population: 764104, timezone: "Europe/Berlin" },
      { slug: "cologne", name: "Cologne", i18nName: { de: "Köln" }, region: "North Rhine-Westphalia", lat: 50.9375, lon: 6.9603, population: 1085664, timezone: "Europe/Berlin" },
    ],
  },
  {
    slug: "france",
    name: "France",
    isoCode: "FR",
    i18nName: { it: "Francia", de: "Frankreich", fr: "France", es: "Francia", en: "France" },
    cities: [
      { slug: "paris", name: "Paris", region: "Île-de-France", lat: 48.8566, lon: 2.3522, population: 2148000, timezone: "Europe/Paris" },
      { slug: "marseille", name: "Marseille", region: "Provence-Alpes-Côte d'Azur", lat: 43.2965, lon: 5.3698, population: 870731, timezone: "Europe/Paris" },
      { slug: "lyon", name: "Lyon", region: "Auvergne-Rhône-Alpes", lat: 45.764, lon: 4.8357, population: 522250, timezone: "Europe/Paris" },
      { slug: "nice", name: "Nice", region: "Provence-Alpes-Côte d'Azur", lat: 43.7102, lon: 7.262, population: 342669, timezone: "Europe/Paris" },
    ],
  },
  {
    slug: "spain",
    name: "Spain",
    isoCode: "ES",
    i18nName: { it: "Spagna", de: "Spanien", fr: "Espagne", es: "España", en: "Spain" },
    cities: [
      { slug: "madrid", name: "Madrid", region: "Community of Madrid", lat: 40.4168, lon: -3.7038, population: 3223000, timezone: "Europe/Madrid" },
      { slug: "barcelona", name: "Barcelona", region: "Catalonia", lat: 41.3874, lon: 2.1686, population: 1620000, timezone: "Europe/Madrid" },
      { slug: "valencia", name: "Valencia", region: "Valencian Community", lat: 39.4699, lon: -0.3763, population: 791413, timezone: "Europe/Madrid" },
      { slug: "seville", name: "Seville", i18nName: { es: "Sevilla" }, region: "Andalusia", lat: 37.3891, lon: -5.9845, population: 688711, timezone: "Europe/Madrid" },
    ],
  },
  {
    slug: "uk",
    name: "United Kingdom",
    isoCode: "GB",
    i18nName: { it: "Regno Unito", de: "Vereinigtes Königreich", fr: "Royaume-Uni", es: "Reino Unido", en: "United Kingdom" },
    cities: [
      { slug: "london", name: "London", region: "England", lat: 51.5072, lon: -0.1276, population: 8982000, timezone: "Europe/London" },
      { slug: "manchester", name: "Manchester", region: "England", lat: 53.4808, lon: -2.2426, population: 552858, timezone: "Europe/London" },
      { slug: "edinburgh", name: "Edinburgh", region: "Scotland", lat: 55.9533, lon: -3.1883, population: 526470, timezone: "Europe/London" },
      { slug: "birmingham", name: "Birmingham", region: "England", lat: 52.4862, lon: -1.8904, population: 1141816, timezone: "Europe/London" },
    ],
  },
];

export function findCity(countrySlug: string, citySlug: string) {
  const country = countries.find((c) => c.slug === countrySlug);
  const city = country?.cities.find((c) => c.slug === citySlug);
  if (!country || !city) return null;
  return { country, city };
}

export function allCityPaths() {
  return countries.flatMap((country) =>
    country.cities.map((city) => ({ country: country.slug, city: city.slug }))
  );
}

export function popularCities(limit = 8): Array<{ country: CountrySeed; city: CitySeed }> {
  const italy = countries.find((c) => c.slug === "italy")!;
  return italy.cities.slice(0, limit).map((city) => ({ country: italy, city }));
}

export function europeanHighlights(limit = 8): Array<{ country: CountrySeed; city: CitySeed }> {
  const picks: Array<{ country: CountrySeed; city: CitySeed }> = [];
  for (const country of countries) {
    if (country.slug === "italy") continue;
    const city = country.cities[0];
    if (city) picks.push({ country, city });
    if (picks.length >= limit) break;
  }
  return picks;
}

export function localizedCountryName(country: CountrySeed, locale: string) {
  return country.i18nName?.[locale as "en"] || country.name;
}

export function localizedCityName(city: CitySeed, locale: string) {
  return city.i18nName?.[locale as "en"] || city.name;
}
