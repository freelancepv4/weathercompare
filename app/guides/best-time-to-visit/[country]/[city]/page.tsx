import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, MapPin, Lightbulb, CloudSun, Bus, Info } from "lucide-react";
import { findCity, coreCityPaths, nearestCities } from "@/config/world";
import { LocalizedBestTime, bestTimeMetadata } from "@/components/LocalizedBestTime";
import { getCityGuide } from "@/lib/data/cityGuides";
import { getLandscapePhoto } from "@/lib/providers/photos";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CityGrid } from "@/components/CityGrid";
import { CiteBox } from "@/components/CiteBox";
import { monthFacts } from "@/lib/content/insights";
import { renderInsights } from "@/lib/i18n/insights";
import { ClimateChart } from "@/components/ClimateChart";
import { MONTHS, getCityClimate, climateHighsFor } from "@/lib/data/climate";
import { ShareBar } from "@/components/ShareBar";
import { seoTitle, seoDescription } from "@/lib/seo";
import { HeroPhoto } from "@/components/HeroPhoto";
import { CityFaq } from "@/components/CityFaq";
import { BestTimeContent } from "@/components/BestTimeContent";
import { analyseClimate, bestTimeFaq, bestTimeCopy } from "@/lib/i18n/bestTime";
import { joinList } from "@/lib/i18n/copy";
import { hreflang } from "@/lib/i18n/pageMeta";
import { keywordsFor } from "@/lib/i18n/keywords";

// Purely editorial — built from lib/data/cityGuides.ts, not live provider
// data — so this stays fully static rather than ISR-revalidated like the
// weather pages themselves.
// Pre-built for core cities; world cities render on first request, then cached.
export const revalidate = false;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ country: string; city: string }>;
}

export function generateStaticParams() {
  return coreCityPaths();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const found = findCity(params.country, params.city);
  if (!found) return {};
  const { country, city } = found;
  // World cities without an editorial guide get the data-driven version.
  if (!getCityGuide(country.slug, city.slug)) return bestTimeMetadata("en", country, city);
  // "{city} weather by month" is a big, low-competition query family (it is
  // what ranks holiday-weather.com's averages pages), so name it in the title
  // whenever it fits.
  const long = `Best Time to Visit ${city.name}: Weather by Month`;
  const title = long.length <= 60 ? long : `Best Time to Visit ${city.name}, ${country.name}`;
  const climate = getCityClimate(country.slug, city.slug);
  const best = climate ? joinList("en", analyseClimate(climate).best.map((m) => MONTHS[m]!.name)) : null;
  const description = best
    ? bestTimeCopy("en").desc(city.name, best)
    : `When to visit ${city.name}: ${city.name} weather by month (average highs, lows and rainfall), the mild-weather, lower-crowd window, and what's worth planning your trip around.`;
  const url = `${siteConfig.url}/guides/best-time-to-visit/${country.slug}/${city.slug}`;
  return {
    title: seoTitle(title),
    description: seoDescription(description),
    keywords: keywordsFor("en").best(city.name),
    alternates: { canonical: url, ...hreflang({ kind: "bestTime", country: country.slug, city: city.slug }) },
    // No `images` here on purpose — the sibling opengraph-image.tsx (a
    // portrait image, sized for Pinterest's Save-from-URL requirement)
    // auto-attaches as og:image whenever a route doesn't set one explicitly.
    openGraph: { type: "website", siteName: siteConfig.name, title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BestTimeToVisitCityPage(props: PageProps) {
  const params = await props.params;
  const found = findCity(params.country, params.city);
  if (!found) notFound();
  const { country, city } = found;
  const guide = getCityGuide(country.slug, city.slug);
  if (!guide) return <LocalizedBestTime locale="en" country={country} city={city} />;
  const heroPhoto = await getLandscapePhoto(`${city.name} ${country.name} landmark`);

  const weatherUrl = `/weather/${country.slug}/${city.slug}`;
  const nearby = nearestCities(city, 4, { sameCountry: country.slug }).map(({ country: co, city: ci }) => ({ country: co, city: ci }));

  const climateData = getCityClimate(country.slug, city.slug);
  const facts = climateData ? analyseClimate(climateData) : null;
  const faq = climateData && facts ? bestTimeFaq("en", city.name, climateData, facts) : [];

  const jsonLd = [
    ...(faq.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
          },
        ]
      : []),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/guides` },
        { "@type": "ListItem", position: 3, name: "Best time to visit", item: `${siteConfig.url}/guides/best-time-to-visit` },
        { "@type": "ListItem", position: 4, name: city.name, item: `${siteConfig.url}/guides/best-time-to-visit/${country.slug}/${city.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `Best Time to Visit ${city.name}`,
      description: guide.bestTimeToVisit,
      url: `${siteConfig.url}/guides/best-time-to-visit/${country.slug}/${city.slug}`,
      publisher: { "@type": "Organization", name: siteConfig.name },
    },
  ];

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <HeroPhoto photo={heroPhoto} priority />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Best time to visit", href: "/guides/best-time-to-visit" },
          { label: city.name },
        ]}
      />

      <article className="mx-auto max-w-3xl">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-300">
          <CalendarDays size={14} aria-hidden="true" /> Best time to visit
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Best Time to Visit {city.name}</h1>
        <ShareBar
          className="mt-4"
          url={`${siteConfig.url}/guides/best-time-to-visit/${country.slug}/${city.slug}`}
          title={`Best Time to Visit ${city.name}`}
          pinImage={`${siteConfig.url}/guides/best-time-to-visit/${country.slug}/${city.slug}/opengraph-image`}
          pinDescription={`Best time to visit ${city.name}: ${guide.bestTimeToVisit}`}
        />
        <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">{guide.intro}</p>

        <div className="mt-6 flex items-start gap-2.5 rounded-xl2 border border-brand-100 bg-gradient-to-br from-brand-50 to-sky-50 px-5 py-4 shadow-soft dark:border-brand-500/20 text-sm text-brand-800 dark:bg-brand-500/10 dark:text-brand-200">
          <CalendarDays size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            <span className="font-semibold">Best time to visit: </span>
            {guide.bestTimeToVisit}
          </p>
        </div>

        <div className="mt-3 flex items-start gap-2.5 rounded-xl2 border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 px-5 py-4 shadow-soft dark:border-amber-500/20 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          <Lightbulb size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            <span className="font-semibold">Local tip: </span>
            {guide.localTip}
          </p>
        </div>

        <div className="mt-3 flex items-start gap-2.5 rounded-xl2 border border-slate-200 bg-white px-5 py-4 shadow-soft dark:border-white/10 text-sm text-slate-700 dark:bg-white/5 dark:text-slate-300">
          <Bus size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            <span className="font-semibold">Getting around: </span>
            {guide.gettingAround}
          </p>
        </div>

        <div className="mt-3 flex items-start gap-2.5 rounded-xl2 border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 px-5 py-4 shadow-soft dark:border-emerald-500/20 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
          <Info size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>
            <span className="font-semibold">Good to know: </span>
            {guide.goodToKnow}
          </p>
        </div>

        <h2 className="mb-4 mt-10 text-xl font-bold text-slate-900 dark:text-white">
          What to plan your trip around
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {guide.landmarks.map((landmark) => (
            <li key={landmark.name} className="relative overflow-hidden rounded-xl2 border border-slate-200 bg-white p-4 pt-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle">
              <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-400 to-orange-400" aria-hidden="true" />
              <div className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white">
                <MapPin size={15} className="shrink-0 text-brand-500" aria-hidden="true" />
                {landmark.name}
              </div>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{landmark.description}</p>
            </li>
          ))}
        </ul>

        <Link
          href={weatherUrl}
          className="mt-8 flex items-center gap-2.5 rounded-xl2 border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-200"
        >
          <CloudSun size={18} className="shrink-0 text-brand-500" aria-hidden="true" />
          Check {city.name}&apos;s live forecast before you book
        </Link>

        {(() => {
          const climate = getCityClimate(country.slug, city.slug);
          if (!climate) return null;
          // One month per season, each with the observations that stand out
          // for THIS city — so every guide gets its own data-driven notes.
          const seasons = [0, 3, 6, 9].map((m) => ({
            m,
            items: renderInsights("en", monthFacts({ country, city, climate, m, landmarks: guide.landmarks, max: 2 }), city.name, m, `${country.slug}/${city.slug}/${m}:guide`),
          }));
          return (
            <>
              <div className="mt-8">
                <ClimateChart climate={climate} countrySlug={country.slug} citySlug={city.slug} cityName={city.name} hideTable />
              </div>
              <h2 className="mb-2 mt-10 text-xl font-bold text-slate-900 dark:text-white">{city.name} weather by month</h2>
              <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                Average temperatures and rainfall {city.name} gets in each month (2011–2020). Tap a month for the full breakdown.
              </p>
              <div className="overflow-x-auto rounded-xl2 border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
                <table className="w-full text-sm">
                  <caption className="sr-only">{city.name} average weather by month</caption>
                  <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-white/5 dark:text-slate-400">
                    <tr>
                      <th scope="col" className="px-3 py-2">Month</th>
                      <th scope="col" className="px-3 py-2 text-right">High</th>
                      <th scope="col" className="px-3 py-2 text-right">Low</th>
                      <th scope="col" className="px-3 py-2 text-right">Rain</th>
                      <th scope="col" className="hidden px-3 py-2 text-right sm:table-cell">Humidity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {MONTHS.map((mo, i) => (
                      <tr key={mo.slug}>
                        <th scope="row" className="px-3 py-2 text-left font-medium">
                          <Link href={`/weather/${country.slug}/${city.slug}/${mo.slug}`} className="text-brand-700 hover:underline dark:text-brand-300">
                            {mo.name}
                          </Link>
                        </th>
                        <td className="px-3 py-2 text-right tabular-nums text-slate-800 dark:text-slate-200">{Math.round(climate.tMax[i]!)}°C</td>
                        <td className="px-3 py-2 text-right tabular-nums text-slate-500 dark:text-slate-400">{Math.round(climate.tMin[i]!)}°C</td>
                        <td className="px-3 py-2 text-right tabular-nums text-slate-500 dark:text-slate-400">{Math.round(climate.precipMm[i]!)} mm</td>
                        <td className="hidden px-3 py-2 text-right tabular-nums text-slate-500 dark:text-slate-400 sm:table-cell">{Math.round(climate.humidity[i]!)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="mb-4 mt-10 text-xl font-bold text-slate-900 dark:text-white">{city.name} through the year</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {seasons.map(({ m, items }) => (
                  <Link
                    key={m}
                    href={`/weather/${country.slug}/${city.slug}/${MONTHS[m]!.slug}`}
                    className="group rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
                  >
                    <p className="text-sm font-bold text-slate-900 group-hover:text-brand-700 dark:text-white">
                      {MONTHS[m]!.name} · {Math.round(climate.tMax[m]!)}° / {Math.round(climate.tMin[m]!)}°C · {climate.precipMm[m]} mm
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {items.map((t) => (
                        <li key={t} className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{t}</li>
                      ))}
                    </ul>
                  </Link>
                ))}
              </div>
            </>
          );
        })()}

        {climateData && facts && (
          <div className="mt-10">
            <BestTimeContent
              locale="en"
              cityLabel={city.name}
              countrySlug={country.slug}
              citySlug={city.slug}
              climate={climateData}
              facts={facts}
              showTable={false}
            />
          </div>
        )}

        {faq.length > 0 && (
          <div className="mt-10">
            <CityFaq title="Frequently asked questions" items={faq} />
          </div>
        )}

        <CiteBox
          className="mt-8"
          url={`${siteConfig.url}/guides/best-time-to-visit/${country.slug}/${city.slug}`}
          title={`Best time to visit ${city.name}`}
          source="climate averages: NASA POWER / ERA5, 2011–2020"
          embedUrl={`${siteConfig.url}/embed/${country.slug}/${city.slug}`}
        />
      </article>

      {nearby.length > 0 && (
        <div className="mx-auto mt-12 max-w-3xl">
          <CityGrid
            title={`More in ${country.name}`}
            items={nearby}
            climate={climateHighsFor(nearby)}
            hrefFor={(c, ci) => `/guides/best-time-to-visit/${c.slug}/${ci.slug}`}
          />
        </div>
      )}

      <p className="mt-10 text-center text-xs text-slate-400">
        <Link href="/guides/best-time-to-visit" className="font-medium text-brand-600 hover:underline">
          See every city&apos;s best time to visit
        </Link>
      </p>
    </div>
  );
}
