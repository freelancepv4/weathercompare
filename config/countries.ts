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
  {
    slug: "usa",
    name: "United States",
    isoCode: "US",
    i18nName: { it: "Stati Uniti", de: "Vereinigte Staaten", fr: "États-Unis", es: "Estados Unidos", en: "United States" },
    cities: [
      { slug: "new-york", name: "New York", region: "New York", lat: 40.7128, lon: -74.006, population: 8336000, timezone: "America/New_York" },
      { slug: "los-angeles", name: "Los Angeles", region: "California", lat: 34.0522, lon: -118.2437, population: 3980000, timezone: "America/Los_Angeles" },
      { slug: "chicago", name: "Chicago", region: "Illinois", lat: 41.8781, lon: -87.6298, population: 2746000, timezone: "America/Chicago" },
      { slug: "miami", name: "Miami", region: "Florida", lat: 25.7617, lon: -80.1918, population: 442000, timezone: "America/New_York" },
      { slug: "san-francisco", name: "San Francisco", region: "California", lat: 37.7749, lon: -122.4194, population: 873000, timezone: "America/Los_Angeles" },
    ],
  },
  {
    slug: "japan",
    name: "Japan",
    isoCode: "JP",
    i18nName: { it: "Giappone", de: "Japan", fr: "Japon", es: "Japón", en: "Japan" },
    cities: [
      { slug: "tokyo", name: "Tokyo", region: "Kanto", lat: 35.6762, lon: 139.6503, population: 13960000, timezone: "Asia/Tokyo" },
      { slug: "osaka", name: "Osaka", region: "Kansai", lat: 34.6937, lon: 135.5023, population: 2725000, timezone: "Asia/Tokyo" },
      { slug: "kyoto", name: "Kyoto", region: "Kansai", lat: 35.0116, lon: 135.7681, population: 1463000, timezone: "Asia/Tokyo" },
    ],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    isoCode: "AE",
    i18nName: { it: "Emirati Arabi Uniti", de: "Vereinigte Arabische Emirate", fr: "Émirats arabes unis", es: "Emiratos Árabes Unidos", en: "United Arab Emirates" },
    cities: [
      { slug: "dubai", name: "Dubai", region: "Dubai", lat: 25.2048, lon: 55.2708, population: 3400000, timezone: "Asia/Dubai" },
      { slug: "abu-dhabi", name: "Abu Dhabi", region: "Abu Dhabi", lat: 24.4539, lon: 54.3773, population: 1483000, timezone: "Asia/Dubai" },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    isoCode: "AU",
    i18nName: { it: "Australia", de: "Australien", fr: "Australie", es: "Australia", en: "Australia" },
    cities: [
      { slug: "sydney", name: "Sydney", region: "New South Wales", lat: -33.8688, lon: 151.2093, population: 5312000, timezone: "Australia/Sydney" },
      { slug: "melbourne", name: "Melbourne", region: "Victoria", lat: -37.8136, lon: 144.9631, population: 5078000, timezone: "Australia/Melbourne" },
    ],
  },
  {
    slug: "netherlands",
    name: "Netherlands",
    isoCode: "NL",
    i18nName: { it: "Paesi Bassi", de: "Niederlande", fr: "Pays-Bas", es: "Países Bajos", en: "Netherlands" },
    cities: [
      { slug: "amsterdam", name: "Amsterdam", region: "North Holland", lat: 52.3676, lon: 4.9041, population: 921000, timezone: "Europe/Amsterdam" },
      { slug: "rotterdam", name: "Rotterdam", region: "South Holland", lat: 51.9244, lon: 4.4777, population: 656000, timezone: "Europe/Amsterdam" },
    ],
  },
  {
    slug: "portugal",
    name: "Portugal",
    isoCode: "PT",
    i18nName: { it: "Portogallo", de: "Portugal", fr: "Portugal", es: "Portugal", en: "Portugal" },
    cities: [
      { slug: "lisbon", name: "Lisbon", region: "Lisbon", lat: 38.7223, lon: -9.1393, population: 545000, timezone: "Europe/Lisbon" },
      { slug: "porto", name: "Porto", region: "Porto", lat: 41.1579, lon: -8.6291, population: 231000, timezone: "Europe/Lisbon" },
    ],
  },
  {
    slug: "austria",
    name: "Austria",
    isoCode: "AT",
    i18nName: { it: "Austria", de: "Österreich", fr: "Autriche", es: "Austria", en: "Austria" },
    cities: [
      { slug: "vienna", name: "Vienna", i18nName: { de: "Wien" }, region: "Vienna", lat: 48.2082, lon: 16.3738, population: 1975000, timezone: "Europe/Vienna" },
      { slug: "salzburg", name: "Salzburg", region: "Salzburg", lat: 47.8095, lon: 13.055, population: 156000, timezone: "Europe/Vienna" },
    ],
  },
  {
    slug: "greece",
    name: "Greece",
    isoCode: "GR",
    i18nName: { it: "Grecia", de: "Griechenland", fr: "Grèce", es: "Grecia", en: "Greece" },
    cities: [
      { slug: "athens", name: "Athens", region: "Attica", lat: 37.9838, lon: 23.7275, population: 664000, timezone: "Europe/Athens" },
      { slug: "thessaloniki", name: "Thessaloniki", region: "Central Macedonia", lat: 40.6401, lon: 22.9444, population: 325000, timezone: "Europe/Athens" },
    ],
  },
  {
    slug: "switzerland",
    name: "Switzerland",
    isoCode: "CH",
    i18nName: { it: "Svizzera", de: "Schweiz", fr: "Suisse", es: "Suiza", en: "Switzerland" },
    cities: [
      { slug: "zurich", name: "Zurich", i18nName: { de: "Zürich" }, region: "Zurich", lat: 47.3769, lon: 8.5417, population: 443000, timezone: "Europe/Zurich" },
      { slug: "geneva", name: "Geneva", region: "Geneva", lat: 46.2044, lon: 6.1432, population: 203000, timezone: "Europe/Zurich" },
    ],
  },
  {
    slug: "ireland",
    name: "Ireland",
    isoCode: "IE",
    i18nName: { it: "Irlanda", de: "Irland", fr: "Irlande", es: "Irlanda", en: "Ireland" },
    cities: [
      { slug: "dublin", name: "Dublin", region: "Leinster", lat: 53.3498, lon: -6.2603, population: 592000, timezone: "Europe/Dublin" },
    ],
  },
  {
    slug: "poland",
    name: "Poland",
    isoCode: "PL",
    i18nName: { it: "Polonia", de: "Polen", fr: "Pologne", es: "Polonia", en: "Poland" },
    cities: [
      { slug: "warsaw", name: "Warsaw", i18nName: { it: "Varsavia", de: "Warschau", fr: "Varsovie", es: "Varsovia" }, region: "Masovia", lat: 52.2297, lon: 21.0122, population: 1863000, timezone: "Europe/Warsaw" },
      { slug: "krakow", name: "Kraków", i18nName: { it: "Cracovia", de: "Krakau", fr: "Cracovie", es: "Cracovia" }, region: "Lesser Poland", lat: 50.0647, lon: 19.945, population: 804000, timezone: "Europe/Warsaw" },
      { slug: "gdansk", name: "Gdańsk", i18nName: { it: "Danzica", de: "Danzig" }, region: "Pomerania", lat: 54.352, lon: 18.6466, population: 486000, timezone: "Europe/Warsaw" },
    ],
  },
  {
    slug: "belgium",
    name: "Belgium",
    isoCode: "BE",
    i18nName: { it: "Belgio", de: "Belgien", fr: "Belgique", es: "Bélgica", en: "Belgium" },
    cities: [
      { slug: "brussels", name: "Brussels", i18nName: { it: "Bruxelles", de: "Brüssel", fr: "Bruxelles", es: "Bruselas" }, region: "Brussels-Capital", lat: 50.8503, lon: 4.3517, population: 1222000, timezone: "Europe/Brussels" },
      { slug: "antwerp", name: "Antwerp", i18nName: { it: "Anversa", de: "Antwerpen", fr: "Anvers", es: "Amberes" }, region: "Flanders", lat: 51.2194, lon: 4.4025, population: 530000, timezone: "Europe/Brussels" },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    isoCode: "CA",
    i18nName: { it: "Canada", de: "Kanada", fr: "Canada", es: "Canadá", en: "Canada" },
    cities: [
      { slug: "toronto", name: "Toronto", region: "Ontario", lat: 43.6532, lon: -79.3832, population: 2794000, timezone: "America/Toronto" },
      { slug: "vancouver", name: "Vancouver", region: "British Columbia", lat: 49.2827, lon: -123.1207, population: 662000, timezone: "America/Vancouver" },
    ],
  },
  {
    slug: "brazil",
    name: "Brazil",
    isoCode: "BR",
    i18nName: { it: "Brasile", de: "Brasilien", fr: "Brésil", es: "Brasil", en: "Brazil" },
    cities: [
      { slug: "rio-de-janeiro", name: "Rio de Janeiro", region: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, population: 6748000, timezone: "America/Sao_Paulo" },
      { slug: "sao-paulo", name: "São Paulo", region: "São Paulo", lat: -23.5505, lon: -46.6333, population: 12325000, timezone: "America/Sao_Paulo" },
    ],
  },
  {
    slug: "mexico",
    name: "Mexico",
    isoCode: "MX",
    i18nName: { it: "Messico", de: "Mexiko", fr: "Mexique", es: "México", en: "Mexico" },
    cities: [
      { slug: "mexico-city", name: "Mexico City", region: "Mexico City", lat: 19.4326, lon: -99.1332, population: 9209000, timezone: "America/Mexico_City" },
      { slug: "cancun", name: "Cancún", region: "Quintana Roo", lat: 21.1619, lon: -86.8515, population: 888000, timezone: "America/Cancun" },
    ],
  },
  {
    slug: "thailand",
    name: "Thailand",
    isoCode: "TH",
    i18nName: { it: "Tailandia", de: "Thailand", fr: "Thaïlande", es: "Tailandia", en: "Thailand" },
    cities: [
      { slug: "bangkok", name: "Bangkok", region: "Bangkok", lat: 13.7563, lon: 100.5018, population: 10539000, timezone: "Asia/Bangkok" },
      { slug: "phuket", name: "Phuket", region: "Phuket", lat: 7.8804, lon: 98.3923, population: 85000, timezone: "Asia/Bangkok" },
    ],
  },
  {
    slug: "singapore",
    name: "Singapore",
    isoCode: "SG",
    i18nName: { it: "Singapore", de: "Singapur", fr: "Singapour", es: "Singapur", en: "Singapore" },
    cities: [
      { slug: "singapore", name: "Singapore", region: "Singapore", lat: 1.3521, lon: 103.8198, population: 5638000, timezone: "Asia/Singapore" },
    ],
  },
  {
    slug: "india",
    name: "India",
    isoCode: "IN",
    i18nName: { it: "India", de: "Indien", fr: "Inde", es: "India", en: "India" },
    cities: [
      { slug: "mumbai", name: "Mumbai", region: "Maharashtra", lat: 19.076, lon: 72.8777, population: 12478000, timezone: "Asia/Kolkata" },
      { slug: "delhi", name: "Delhi", region: "Delhi", lat: 28.7041, lon: 77.1025, population: 11034000, timezone: "Asia/Kolkata" },
    ],
  },
  {
    slug: "south-korea",
    name: "South Korea",
    isoCode: "KR",
    i18nName: { it: "Corea del Sud", de: "Südkorea", fr: "Corée du Sud", es: "Corea del Sur", en: "South Korea" },
    cities: [
      { slug: "seoul", name: "Seoul", region: "Seoul", lat: 37.5665, lon: 126.978, population: 9776000, timezone: "Asia/Seoul" },
    ],
  },
  {
    slug: "turkey",
    name: "Turkey",
    isoCode: "TR",
    i18nName: { it: "Turchia", de: "Türkei", fr: "Turquie", es: "Turquía", en: "Turkey" },
    cities: [
      { slug: "istanbul", name: "Istanbul", region: "Istanbul", lat: 41.0082, lon: 28.9784, population: 15462000, timezone: "Europe/Istanbul" },
    ],
  },
  {
    slug: "morocco",
    name: "Morocco",
    isoCode: "MA",
    i18nName: { it: "Marocco", de: "Marokko", fr: "Maroc", es: "Marruecos", en: "Morocco" },
    cities: [
      { slug: "marrakech", name: "Marrakech", region: "Marrakech-Safi", lat: 31.6295, lon: -7.9811, population: 928000, timezone: "Africa/Casablanca" },
    ],
  },
  {
    slug: "south-africa",
    name: "South Africa",
    isoCode: "ZA",
    i18nName: { it: "Sudafrica", de: "Südafrika", fr: "Afrique du Sud", es: "Sudáfrica", en: "South Africa" },
    cities: [
      { slug: "cape-town", name: "Cape Town", region: "Western Cape", lat: -33.9249, lon: 18.4241, population: 4618000, timezone: "Africa/Johannesburg" },
    ],
  },
  {
    slug: "egypt",
    name: "Egypt",
    isoCode: "EG",
    i18nName: { it: "Egitto", de: "Ägypten", fr: "Égypte", es: "Egipto", en: "Egypt" },
    cities: [
      { slug: "cairo", name: "Cairo", region: "Cairo", lat: 30.0444, lon: 31.2357, population: 9540000, timezone: "Africa/Cairo" },
    ],
  },
  {
    slug: "pakistan",
    name: "Pakistan",
    isoCode: "PK",
    i18nName: { it: "Pakistan", de: "Pakistan", fr: "Pakistan", es: "Pakistán", en: "Pakistan" },
    cities: [
      { slug: "karachi", name: "Karachi", region: "Sindh", lat: 24.8607, lon: 67.0011, population: 16000000, timezone: "Asia/Karachi" },
      { slug: "lahore", name: "Lahore", region: "Punjab", lat: 31.5497, lon: 74.3436, population: 13000000, timezone: "Asia/Karachi" },
      { slug: "islamabad", name: "Islamabad", region: "Islamabad Capital Territory", lat: 33.6844, lon: 73.0479, population: 1200000, timezone: "Asia/Karachi" },
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

/** One representative city per non-Italy country, in seed-list order — used
 * for the homepage's "around the world" showcase grid. Not an exhaustive
 * list; see allCityPaths() for every city. */
export function worldHighlights(limit = 12): Array<{ country: CountrySeed; city: CitySeed }> {
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
