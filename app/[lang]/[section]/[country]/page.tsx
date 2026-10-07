import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Compass, CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site";
import { countries, citiesByImportance, type CountrySeed, type CitySeed } from "@/config/world";
import { AllCitiesList } from "@/components/AllCitiesList";
import { citiesWithClimate, featuredCitiesWithClimate, climateHighsFor, getCityClimate } from "@/lib/data/climate";
import { STYLES, scoreMonth } from "@/lib/tripScore";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CityGrid } from "@/components/CityGrid";
import { bestTimeCopy } from "@/lib/i18n/bestTime";
import { ShareBar } from "@/components/ShareBar";
import { getCopy, bestMonths, joinList } from "@/lib/i18n/copy";
import { CONTENT_LOCALES, ROUTING, isContentLocale, paths, monthInfo, type ContentLocale } from "@/lib/i18n/routing";
import { cityName, countryName } from "@/lib/i18n/places";
import { localizedMetadata } from "@/lib/i18n/pageMeta";
import { BestTimeCountryView } from "@/components/BestTimeCountryView";
import { analyseCountryClimate, countriesWithClimate } from "@/lib/content/countryClimate";
import { bestTimeCountryCopy } from "@/lib/i18n/bestTimeCountry";

export const dynamic = "force-static";
// Was `false`. The country-level best-time hub added below exists for 225
// countries in 7 languages; pre-rendering all of them would roughly double
// this route's share of the build for pages most of which are rarely hit.
// Instead the busiest ones are pre-built and the rest render on first
// request and are then cached — the same trade the English guides make.
// Unknown sections still 404: resolve() returns null and the page calls
// notFound().
export const dynamicParams = true;

/** Country best-time hubs pre-rendered per language (largest countries first). */
const PREBUILT_BEST_TIME_COUNTRIES = 40;

interface PageProps {
  params: Promise<{ lang: string; section: string; country: string }>;
}

export function generateStaticParams() {
  const hasClimate = citiesWithClimate().length > 0;
  const bestTimeCountries = countriesWithClimate(countries)
    .slice()
    .sort((a, b) => b.cities.length - a.cities.length)
    .slice(0, PREBUILT_BEST_TIME_COUNTRIES);
  return CONTENT_LOCALES.flatMap((lang) => [
    ...countries.map((c) => ({ lang, section: ROUTING[lang].weather, country: c.slug })),
    ...(hasClimate ? ROUTING[lang].monthSlugs.map((m) => ({ lang, section: ROUTING[lang].whereToGo, country: m })) : []),
    ...bestTimeCountries.map((c) => ({ lang, section: ROUTING[lang].bestTime, country: c.slug })),
  ]);
}

type Resolved =
  | { locale: ContentLocale; kind: "country"; country: CountrySeed }
  | { locale: ContentLocale; kind: "whereToGo"; month: number }
  | { locale: ContentLocale; kind: "bestTimeCountry"; country: CountrySeed };

function resolve(p: Awaited<PageProps["params"]>): Resolved | null {
  if (!isContentLocale(p.lang)) return null;
  const r = ROUTING[p.lang];
  if (p.section === r.weather) {
    const country = countries.find((c) => c.slug === p.country);
    return country ? { locale: p.lang, kind: "country", country } : null;
  }
  if (p.section === r.whereToGo) {
    const month = r.monthSlugs.indexOf(p.country);
    return month >= 0 ? { locale: p.lang, kind: "whereToGo", month } : null;
  }
  // /de/beste-reisezeit/spain — the country hub. The city guides at
  // /de/beste-reisezeit/spain/tenerife are handled one level deeper.
  if (p.section === r.bestTime) {
    const country = countries.find((c) => c.slug === p.country);
    return country && analyseCountryClimate(country) ? { locale: p.lang, kind: "bestTimeCountry", country } : null;
  }
  return null;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const x = resolve(params);
  if (!x) return {};
  const copy = getCopy(x.locale);
  if (x.kind === "country") {
    const k = countryName(x.country.slug, x.country.name, x.locale);
    const cities = x.country.cities.slice(0, 5).map((c) => cityName(c.slug, c.name, x.locale));
    return localizedMetadata(x.locale, { kind: "country", country: x.country.slug }, copy.countryTitle(k), copy.countryDesc(k, joinList(x.locale, cities)));
  }
  if (x.kind === "bestTimeCountry") {
    const analysis = analyseCountryClimate(x.country);
    if (!analysis) return {};
    const t = bestTimeCountryCopy(x.locale);
    const k = countryName(x.country.slug, x.country.name, x.locale);
    const best = joinList(x.locale, analysis.best.map((m) => monthInfo(x.locale).monthNames[m]!));
    return localizedMetadata(
      x.locale,
      { kind: "bestTimeCountry", country: x.country.slug },
      t.title(k),
      t.desc(k, best, analysis.bestLo, analysis.bestHi),
      { keywords: t.keywords(k) }
    );
  }
  return localizedMetadata(x.locale, { kind: "whereToGo", month: x.month }, copy.whereTitle(x.month), copy.whereDesc(x.month));
}

export default async function SlugPage(props: PageProps) {
  const params = await props.params;
  const x = resolve(params);
  if (!x) notFound();
  if (x.kind === "bestTimeCountry") return <BestTimeCountryView locale={x.locale} country={x.country} />;
  return x.kind === "country" ? <CountryView locale={x.locale} country={x.country} /> : <WhereToGoView locale={x.locale} month={x.month} />;
}

/** Heading for the A–Z list of every city in a country. */
const ALL_CITIES: Record<ContentLocale, { h: (k: string, n: number) => string; p: string; other: string }> = {
  it: { h: (k, n) => `Tutte le ${n} località in ${k} con previsioni`, p: "Raggruppate per regione. Ogni pagina ha previsioni a confronto, clima mese per mese e il periodo migliore per andare.", other: "Altro" },
  de: { h: (k, n) => `Alle ${n} Orte in ${k} mit Wettervorhersage`, p: "Nach Region sortiert. Jede Seite bietet Vorhersagen im Vergleich, das Klima Monat für Monat und die beste Reisezeit.", other: "Sonstige" },
  fr: { h: (k, n) => `Les ${n} villes de ${k} avec prévisions`, p: "Classées par région. Chaque page propose des prévisions comparées, le climat mois par mois et la meilleure période pour partir.", other: "Autres" },
  es: { h: (k, n) => `Las ${n} localidades de ${k} con previsión`, p: "Agrupadas por región. Cada página tiene previsiones comparadas, el clima mes a mes y la mejor época para viajar.", other: "Otras" },
  pt: { h: (k, n) => `As ${n} localidades de ${k} com previsão`, p: "Agrupadas por região. Cada página tem previsões comparadas, o clima mês a mês e a melhor época para viajar.", other: "Outras" },
  nl: { h: (k, n) => `Alle ${n} plaatsen in ${k} met weersverwachting`, p: "Per regio. Elke pagina heeft vergeleken verwachtingen, het klimaat per maand en de beste reistijd.", other: "Overig" },
  pl: { h: (k, n) => `Wszystkie miejscowości z prognozą: ${k} (${n})`, p: "Według regionów. Każda strona ma porównanie prognoz, klimat miesiąc po miesiącu i najlepszy termin wyjazdu.", other: "Inne" },
};

/** Localized labels for the per-country climate table. */
const GLANCE: Record<ContentLocale, { h: (k: string) => string; p: (k: string) => string; city: string; warm: string; cool: string; wet: string; dry: string }> = {
  it: { h: (k) => `Il clima in ${k} a colpo d'occhio`, p: (k) => `Per ogni città: il mese più caldo e più fresco (massime e minime medie) e i mesi più piovosi e più secchi, dalle medie 2011–2020.`, city: "Città", warm: "Mese più caldo", cool: "Mese più fresco", wet: "Più piovoso", dry: "Più secco" },
  de: { h: (k) => `Klima in ${k} auf einen Blick`, p: (k) => `Für jede Stadt: der wärmste und kühlste Monat (durchschnittliche Höchst- und Tiefstwerte) sowie der nasseste und trockenste Monat, nach Mittelwerten 2011–2020.`, city: "Stadt", warm: "Wärmster Monat", cool: "Kühlster Monat", wet: "Nassester", dry: "Trockenster" },
  fr: { h: (k) => `Le climat en un coup d'œil : ${k}`, p: (k) => `Pour chaque ville : le mois le plus chaud et le plus frais (maximales et minimales moyennes), ainsi que les mois les plus pluvieux et les plus secs, d'après les moyennes 2011–2020.`, city: "Ville", warm: "Mois le plus chaud", cool: "Mois le plus frais", wet: "Plus pluvieux", dry: "Plus sec" },
  es: { h: (k) => `El clima de ${k} de un vistazo`, p: (k) => `Para cada ciudad: el mes más cálido y el más fresco (máximas y mínimas medias) y los meses más lluviosos y más secos, según las medias 2011–2020.`, city: "Ciudad", warm: "Mes más cálido", cool: "Mes más fresco", wet: "Más lluvioso", dry: "Más seco" },
  pt: { h: (k) => `O clima em ${k} num relance`, p: (k) => `Para cada cidade: o mês mais quente e o mais fresco (máximas e mínimas médias) e os meses mais chuvosos e mais secos, segundo as médias 2011–2020.`, city: "Cidade", warm: "Mês mais quente", cool: "Mês mais fresco", wet: "Mais chuvoso", dry: "Mais seco" },
  nl: { h: (k) => `Het klimaat in ${k} in één oogopslag`, p: (k) => `Per stad: de warmste en koelste maand (gemiddelde maxima en minima) en de natste en droogste maand, op basis van gemiddelden 2011–2020.`, city: "Stad", warm: "Warmste maand", cool: "Koelste maand", wet: "Natste", dry: "Droogste" },
  pl: { h: (k) => `Klimat – ${k} w skrócie`, p: (k) => `Dla każdego miasta: najcieplejszy i najchłodniejszy miesiąc (średnie maksima i minima) oraz najbardziej deszczowy i najsuchszy miesiąc, według średnich z lat 2011–2020.`, city: "Miasto", warm: "Najcieplejszy", cool: "Najchłodniejszy", wet: "Najbardziej deszczowy", dry: "Najsuchszy" },
};

const argMax = (a: number[]) => a.reduce((b, v, i) => (v > a[b]! ? i : b), 0);
const argMin = (a: number[]) => a.reduce((b, v, i) => (v < a[b]! ? i : b), 0);

function CountryView({ locale, country }: { locale: ContentLocale; country: CountrySeed }) {
  const copy = getCopy(locale);
  const mi = monthInfo(locale);
  const k = countryName(country.slug, country.name, locale);
  const main = citiesByImportance(country).slice(0, 24);
  const items = main.map((city) => ({ country, city }));
  const nameFor = (co: CountrySeed, ci: CitySeed) => ({ city: cityName(ci.slug, ci.name, locale), country: countryName(co.slug, co.name, locale) });
  const best = citiesByImportance(country)
    .slice(0, 40)
    .map((city) => ({ city, climate: getCityClimate(country.slug, city.slug) }))
    .filter((x): x is { city: CitySeed; climate: NonNullable<typeof x.climate> } => Boolean(x.climate));
  const url = `${siteConfig.url}${paths.country(locale, country.slug)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: copy.home, item: `${siteConfig.url}${paths.home(locale)}` },
      { "@type": "ListItem", position: 2, name: k, item: url },
    ],
  };

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: copy.home, href: paths.home(locale) }, { label: k }]} />
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.countryH1(k)}</h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300">{copy.countryIntro(k, country.cities.length)}</p>
        <ShareBar className="mt-5" url={url} title={copy.countryTitle(k)} />
      </header>

      <div className="mt-10">
        <CityGrid
          title={copy.countryCitiesH(k)}
          items={items}
          hrefFor={(co, ci) => paths.city(locale, co.slug, ci.slug)}
          nameFor={nameFor}
          climate={climateHighsFor(items)}
          highsLabel={copy.highsRange}
          viewLabel={copy.viewForecast}
          monthShort={copy.monthShort}
        />
      </div>

      {country.cities.length > main.length && (
        <AllCitiesList
          country={country}
          title={ALL_CITIES[locale].h(k, country.cities.length)}
          subtitle={ALL_CITIES[locale].p}
          hrefFor={(c) => paths.city(locale, country.slug, c.slug)}
          nameFor={(c) => cityName(c.slug, c.name, locale)}
          exclude={main.map((c) => c.slug)}
          otherLabel={ALL_CITIES[locale].other}
          collator={locale}
        />
      )}

      {best.length > 0 && (
        <section className="mt-12 rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle" aria-labelledby="best-heading">
          <h2 id="best-heading" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <CalendarDays size={18} className="text-brand-500" aria-hidden="true" /> {copy.countryMonthsH}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{copy.countryMonthsText(k)}</p>
          <ul className="mt-4 divide-y divide-slate-100 dark:divide-white/5">
            {best.map(({ city, climate }) => {
              const n = cityName(city.slug, city.name, locale);
              const months = bestMonths(climate);
              return (
                <li key={city.slug} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
                  <Link href={paths.bestTime(locale, country.slug, city.slug)} className="font-semibold text-slate-900 hover:text-brand-700 dark:text-white">
                    {bestTimeCopy(locale).h1(n)}
                  </Link>
                  <span className="flex flex-wrap gap-1.5">
                    {months.map((m) => (
                      <Link
                        key={m}
                        href={paths.month(locale, country.slug, city.slug, m)}
                        className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 hover:bg-emerald-600 hover:text-white dark:bg-emerald-500/10 dark:text-emerald-300"
                      >
                        {mi.monthNames[m]}
                      </Link>
                    ))}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {best.length > 0 && (() => {
        const g = GLANCE[locale];
        const cell = (m: number, v: string) => (
          <span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{mi.monthNames[m]}</span>{" "}
            <span className="tabular-nums text-slate-500 dark:text-slate-400">{v}</span>
          </span>
        );
        return (
          <section className="mt-12" aria-labelledby="glance-heading">
            <h2 id="glance-heading" className="text-lg font-bold text-slate-900 dark:text-white">{g.h(k)}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{g.p(k)}</p>
            <div className="mt-4 overflow-x-auto rounded-xl2 border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-white/5 dark:text-slate-400">
                  <tr>
                    <th scope="col" className="px-3 py-2">{g.city}</th>
                    <th scope="col" className="px-3 py-2">{g.warm}</th>
                    <th scope="col" className="px-3 py-2">{g.cool}</th>
                    <th scope="col" className="px-3 py-2">{g.wet}</th>
                    <th scope="col" className="px-3 py-2">{g.dry}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {best.map(({ city, climate }) => {
                    const hot = argMax(climate.tMax);
                    const cold = argMin(climate.tMin);
                    const wet = argMax(climate.precipMm);
                    const dry = argMin(climate.precipMm);
                    return (
                      <tr key={city.slug}>
                        <th scope="row" className="px-3 py-2 text-left font-semibold">
                          <Link href={paths.city(locale, country.slug, city.slug)} className="text-brand-700 hover:underline dark:text-brand-300">
                            {cityName(city.slug, city.name, locale)}
                          </Link>
                        </th>
                        <td className="px-3 py-2">{cell(hot, `${Math.round(climate.tMax[hot]!)}°C`)}</td>
                        <td className="px-3 py-2">{cell(cold, `${Math.round(climate.tMin[cold]!)}°C`)}</td>
                        <td className="px-3 py-2">{cell(wet, `${Math.round(climate.precipMm[wet]!)} mm`)}</td>
                        <td className="px-3 py-2">{cell(dry, `${Math.round(climate.precipMm[dry]!)} mm`)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        );
      })()}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href={paths.today(locale)} className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-700">
          {copy.cardToday.cta} <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link
          href={paths.tripFinder(locale)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-200"
        >
          <Compass size={16} aria-hidden="true" /> {copy.cardTrip.title}
        </Link>
      </div>

      <p className="mt-10 text-center text-xs text-slate-400">
        <Link href={paths.home(locale)} className="font-medium text-brand-600 hover:underline">
          {copy.moreCountries(countries.length)}
        </Link>
      </p>
    </div>
  );
}

const SECTIONS = ["beach", "warm", "mild", "cool"] as const;
const TONES: Record<(typeof SECTIONS)[number], string> = {
  beach: "from-orange-400 to-rose-500",
  warm: "from-amber-400 to-orange-500",
  mild: "from-sky-400 to-brand-500",
  cool: "from-indigo-400 to-slate-600",
};

function WhereToGoView({ locale, month: i }: { locale: ContentLocale; month: number }) {
  const copy = getCopy(locale);
  const all = featuredCitiesWithClimate();
  const prev = (i + 11) % 12;
  const next = (i + 1) % 12;
  const lists = SECTIONS.map((style) => ({
    style: STYLES.find((s) => s.id === style)!,
    label: copy.trip.styles[style],
    tone: TONES[style],
    items: all
      .map((c) => ({ ...c, score: scoreMonth(c.climate, i, style) }))
      .filter((c) => c.score >= 50)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6),
  })).filter((l) => l.items.length > 0);
  const url = `${siteConfig.url}${paths.whereToGo(locale, i)}`;

  // ItemList is not a CreativeWork, so it can't carry inLanguage (Semrush
  // flags it as invalid); the language goes on a sibling WebPage instead.
  const jsonLd = [{
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: copy.whereH1(i),
    url,
    inLanguage: locale,
  }, {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.whereH1(i),
    itemListElement: lists
      .flatMap((l) => l.items.slice(0, 3))
      .map((c, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${siteConfig.url}${paths.month(locale, c.country.slug, c.city.slug, i)}`,
        name: `${cityName(c.city.slug, c.city.name, locale)}, ${countryName(c.country.slug, c.country.name, locale)}`,
      })),
  }];

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        items={[
          { label: copy.home, href: paths.home(locale) },
          { label: copy.tripCrumb, href: paths.tripFinder(locale) },
          { label: copy.whereH1(i) },
        ]}
      />
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{copy.whereH1(i)}</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{copy.whereIntro(i)}</p>
        <Link
          href={`${paths.tripFinder(locale)}?month=${monthInfo(locale).monthSlugs[i]}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-emerald-700"
        >
          <Compass size={16} aria-hidden="true" /> {copy.whereCustomise}
        </Link>
        <ShareBar className="mt-5" url={url} title={copy.whereTitle(i)} />
      </header>

      <div className="mt-10 space-y-12">
        {lists.map((l) => (
          <section key={l.style.id} aria-labelledby={`${l.style.id}-heading`}>
            <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${l.tone} px-4 py-1.5 text-white`}>
              <span aria-hidden="true">{l.style.emoji}</span>
              <h2 id={`${l.style.id}-heading`} className="text-sm font-bold">
                {copy.whereStyleH(l.label.label, i)}
              </h2>
            </div>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{l.label.blurb}.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {l.items.map((c, idx) => (
                <Link
                  key={`${c.country.slug}/${c.city.slug}`}
                  href={paths.month(locale, c.country.slug, c.city.slug, i)}
                  className="group flex items-center gap-4 rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${l.tone} text-sm font-bold text-white`}>
                    {idx + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900 group-hover:text-brand-700 dark:text-white">
                      {cityName(c.city.slug, c.city.name, locale)}, {countryName(c.country.slug, c.country.name, locale)}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {Math.round(c.climate.tMax[i]!)}° / {Math.round(c.climate.tMin[i]!)}°C · {c.climate.precipMm[i]} mm {copy.whereRain}
                    </span>
                  </span>
                  <ArrowRight size={16} className="shrink-0 text-slate-300 group-hover:text-brand-500" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>


      <nav className="mt-10 flex items-center justify-between gap-3 text-sm font-semibold" aria-label={copy.whereMonthsH}>
        <Link href={paths.whereToGo(locale, prev)} className="inline-flex items-center gap-1.5 text-brand-600 hover:underline dark:text-brand-300">
          <ArrowLeft size={16} aria-hidden="true" /> {copy.wherePrevNext(prev)}
        </Link>
        <Link href={paths.whereToGo(locale, next)} className="inline-flex items-center gap-1.5 text-brand-600 hover:underline dark:text-brand-300">
          {copy.wherePrevNext(next)} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </nav>
      <p className="mt-8 text-[11px] text-slate-400">{copy.whereFoot}</p>
    </div>
  );
}
