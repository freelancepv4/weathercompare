import Link from "next/link";
import { Globe2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { countries, cityCount, worldRegionOf } from "@/config/world";
import { COUNTRY_REGIONS } from "@/lib/tripScore";
import { Breadcrumb } from "@/components/Breadcrumb";
import { paths, type AnyLocale } from "@/lib/i18n/routing";
import { countryName, cityName } from "@/lib/i18n/places";

/**
 * /weather (and /es/tiempo, /de/wetter …): every country on the site,
 * grouped by region, with its biggest cities. The hub that links the
 * 220 country pages together, and from them the 1,800+ city pages.
 */
const REGION_ORDER = ["Europe", "Americas", "Asia", "Middle East & Africa", "Oceania", "Other"] as const;

type Copy = {
  crumb: string;
  home: string;
  h1: string;
  intro: (countries: number, cities: string) => string;
  search: string;
  regions: Record<(typeof REGION_ORDER)[number], string>;
  cities: (n: number) => string;
};

export const COUNTRIES_COPY: Record<AnyLocale, Copy & { title: string; desc: (n: number, c: string) => string }> = {
  en: {
    crumb: "All countries", home: "Home", h1: "Weather in every country",
    title: "World Weather: Forecasts for Every Country and City",
    desc: (n, c) => `Weather forecasts and climate for ${c} cities in ${n} countries, from Spain to Japan. Any other place in the world is one search away.`,
    intro: (n, c) => `${c} cities in ${n} countries, each with a multi-source forecast, month-by-month climate and the best time to visit. Can't see your town? Search for it: every place in the world has a forecast.`,
    search: "Search any city in the world",
    regions: { Europe: "Europe", Americas: "Americas", Asia: "Asia", "Middle East & Africa": "Middle East & Africa", Oceania: "Oceania", Other: "Other" },
    cities: (n) => (n === 1 ? "1 city" : `${n} cities`),
  },
  it: {
    crumb: "Tutti i paesi", home: "Home", h1: "Il meteo in tutti i paesi del mondo",
    title: "Meteo nel mondo: previsioni per ogni paese e città",
    desc: (n, c) => `Previsioni meteo e clima per ${c} città in ${n} paesi, dalla Spagna al Giappone. Qualsiasi altra località del mondo è a una ricerca di distanza.`,
    intro: (n, c) => `${c} città in ${n} paesi, ognuna con previsioni a confronto, clima mese per mese e il periodo migliore per andare. Non trovi il tuo paese? Cercalo: ogni località del mondo ha le sue previsioni.`,
    search: "Cerca qualsiasi città del mondo",
    regions: { Europe: "Europa", Americas: "Americhe", Asia: "Asia", "Middle East & Africa": "Medio Oriente e Africa", Oceania: "Oceania", Other: "Altro" },
    cities: (n) => (n === 1 ? "1 città" : `${n} città`),
  },
  de: {
    crumb: "Alle Länder", home: "Startseite", h1: "Das Wetter in allen Ländern der Welt",
    title: "Wetter weltweit: Vorhersagen für jedes Land und jede Stadt",
    desc: (n, c) => `Wettervorhersagen und Klima für ${c} Städte in ${n} Ländern, von Spanien bis Japan. Jeder andere Ort der Welt ist nur eine Suche entfernt.`,
    intro: (n, c) => `${c} Städte in ${n} Ländern, jeweils mit Vorhersagen im Vergleich, Klima Monat für Monat und der besten Reisezeit. Ihr Ort fehlt? Einfach suchen: Für jeden Ort der Welt gibt es eine Vorhersage.`,
    search: "Jede Stadt der Welt suchen",
    regions: { Europe: "Europa", Americas: "Amerika", Asia: "Asien", "Middle East & Africa": "Naher Osten & Afrika", Oceania: "Ozeanien", Other: "Sonstige" },
    cities: (n) => (n === 1 ? "1 Stadt" : `${n} Städte`),
  },
  fr: {
    crumb: "Tous les pays", home: "Accueil", h1: "La météo dans tous les pays du monde",
    title: "Météo du monde : prévisions pour chaque pays et ville",
    desc: (n, c) => `Prévisions météo et climat pour ${c} villes dans ${n} pays, de l'Espagne au Japon. Tout autre lieu du monde est à une recherche près.`,
    intro: (n, c) => `${c} villes dans ${n} pays, chacune avec des prévisions comparées, le climat mois par mois et la meilleure période pour partir. Votre ville n'y est pas ? Cherchez-la : chaque lieu du monde a sa prévision.`,
    search: "Chercher n'importe quelle ville du monde",
    regions: { Europe: "Europe", Americas: "Amériques", Asia: "Asie", "Middle East & Africa": "Moyen-Orient et Afrique", Oceania: "Océanie", Other: "Autres" },
    cities: (n) => (n === 1 ? "1 ville" : `${n} villes`),
  },
  es: {
    crumb: "Todos los países", home: "Inicio", h1: "El tiempo en todos los países del mundo",
    title: "El tiempo en el mundo: previsión para cada país y ciudad",
    desc: (n, c) => `Previsión del tiempo y clima de ${c} ciudades en ${n} países, de España a Japón. Cualquier otro lugar del mundo está a una búsqueda.`,
    intro: (n, c) => `${c} ciudades en ${n} países, cada una con previsiones comparadas, el clima mes a mes y la mejor época para viajar. ¿No ves tu pueblo? Búscalo: cualquier lugar del mundo tiene su previsión.`,
    search: "Busca cualquier ciudad del mundo",
    regions: { Europe: "Europa", Americas: "América", Asia: "Asia", "Middle East & Africa": "Oriente Medio y África", Oceania: "Oceanía", Other: "Otros" },
    cities: (n) => (n === 1 ? "1 ciudad" : `${n} ciudades`),
  },
  pt: {
    crumb: "Todos os países", home: "Início", h1: "O tempo em todos os países do mundo",
    title: "Tempo no mundo: previsão para cada país e cidade",
    desc: (n, c) => `Previsão do tempo e clima de ${c} cidades em ${n} países, de Espanha ao Japão. Qualquer outro lugar do mundo está à distância de uma pesquisa.`,
    intro: (n, c) => `${c} cidades em ${n} países, cada uma com previsões comparadas, o clima mês a mês e a melhor época para viajar. Não encontra a sua terra? Pesquise: qualquer lugar do mundo tem previsão.`,
    search: "Pesquisar qualquer cidade do mundo",
    regions: { Europe: "Europa", Americas: "Américas", Asia: "Ásia", "Middle East & Africa": "Médio Oriente e África", Oceania: "Oceânia", Other: "Outros" },
    cities: (n) => (n === 1 ? "1 cidade" : `${n} cidades`),
  },
  nl: {
    crumb: "Alle landen", home: "Home", h1: "Het weer in alle landen van de wereld",
    title: "Weer wereldwijd: verwachting voor elk land en elke stad",
    desc: (n, c) => `Weersverwachting en klimaat voor ${c} steden in ${n} landen, van Spanje tot Japan. Elke andere plek ter wereld vind je met één zoekopdracht.`,
    intro: (n, c) => `${c} steden in ${n} landen, elk met vergeleken verwachtingen, het klimaat per maand en de beste reistijd. Staat je plaats er niet bij? Zoek hem op: elke plek ter wereld heeft een verwachting.`,
    search: "Zoek elke stad ter wereld",
    regions: { Europe: "Europa", Americas: "Amerika", Asia: "Azië", "Middle East & Africa": "Midden-Oosten en Afrika", Oceania: "Oceanië", Other: "Overig" },
    cities: (n) => (n === 1 ? "1 stad" : `${n} steden`),
  },
  pl: {
    crumb: "Wszystkie kraje", home: "Strona główna", h1: "Pogoda we wszystkich krajach świata",
    title: "Pogoda na świecie: prognoza dla każdego kraju i miasta",
    desc: (n, c) => `Prognoza pogody i klimat dla ${c} miast w ${n} krajach, od Hiszpanii po Japonię. Każde inne miejsce na świecie znajdziesz wyszukiwarką.`,
    intro: (n, c) => `${c} miast w ${n} krajach, każde z porównaniem prognoz, klimatem miesiąc po miesiącu i najlepszym terminem wyjazdu. Nie ma Twojej miejscowości? Wyszukaj ją: każde miejsce na świecie ma swoją prognozę.`,
    search: "Wyszukaj dowolne miasto na świecie",
    regions: { Europe: "Europa", Americas: "Ameryka", Asia: "Azja", "Middle East & Africa": "Bliski Wschód i Afryka", Oceania: "Oceania", Other: "Inne" },
    cities: (n) => `${n} ${n === 1 ? "miasto" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14) ? "miasta" : "miast"}`,
  },
};

export function countriesIndexStats(locale: AnyLocale) {
  const intl = locale === "en" ? "en-GB" : locale;
  return { countries: countries.length, cities: new Intl.NumberFormat(intl).format(cityCount()) };
}

export function CountriesIndex({ locale }: { locale: AnyLocale }) {
  const t = COUNTRIES_COPY[locale];
  const stats = countriesIndexStats(locale);
  const cmp = new Intl.Collator(locale).compare;
  const byRegion = new Map<string, typeof countries>();
  for (const c of countries) {
    const r = COUNTRY_REGIONS[c.slug] ?? worldRegionOf(c.slug) ?? "Other";
    if (!byRegion.has(r)) byRegion.set(r, []);
    byRegion.get(r)!.push(c);
  }
  const url = `${siteConfig.url}${paths.countries(locale)}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: `${siteConfig.url}${paths.home(locale)}` },
        { "@type": "ListItem", position: 2, name: t.crumb, item: url },
      ],
    },
    { "@context": "https://schema.org", "@type": "CollectionPage", name: t.h1, url, inLanguage: locale },
  ];

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: t.home, href: paths.home(locale) }, { label: t.crumb }]} />
      <header className="max-w-3xl">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-300">
          <Globe2 size={14} aria-hidden="true" /> {stats.countries} · {stats.cities}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{t.h1}</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">{t.intro(stats.countries, stats.cities)}</p>
      </header>

      <div className="mt-10 space-y-12">
        {REGION_ORDER.filter((r) => byRegion.has(r)).map((region) => {
          const list = byRegion.get(region)!.map((c) => ({ c, n: countryName(c.slug, c.name, locale) })).sort((a, b) => cmp(a.n, b.n));
          return (
            <section key={region} aria-labelledby={`region-${region}`}>
              <h2 id={`region-${region}`} className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                {t.regions[region]}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map(({ c, n }) => {
                  const top = [...c.cities].sort((a, b) => Number(!!b.core) - Number(!!a.core) || b.population - a.population).slice(0, 3);
                  return (
                    <li key={c.slug} className="rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
                      <Link href={paths.country(locale, c.slug)} className="font-semibold text-slate-900 hover:text-brand-700 dark:text-white">
                        {n}
                      </Link>
                      <span className="ml-2 text-xs text-slate-400">{t.cities(c.cities.length)}</span>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        {top.map((ci, i) => (
                          <span key={ci.slug}>
                            {i > 0 && " · "}
                            <Link href={paths.city(locale, c.slug, ci.slug)} className="hover:text-brand-700 hover:underline">
                              {cityName(ci.slug, ci.name, locale)}
                            </Link>
                          </span>
                        ))}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
