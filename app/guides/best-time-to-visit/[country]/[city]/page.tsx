import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, MapPin, Lightbulb, CloudSun, Bus, Info } from "lucide-react";
import { findCity, allCityPaths } from "@/config/countries";
import { getCityGuide } from "@/lib/data/cityGuides";
import { getLandscapePhoto } from "@/lib/providers/photos";
import { siteConfig, defaultOgImage } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CityGrid } from "@/components/CityGrid";
import { AdSlot } from "@/components/AdSlot";
import { ClimateChart } from "@/components/ClimateChart";
import { getCityClimate, climateHighsFor } from "@/lib/data/climate";
import { ShareBar } from "@/components/ShareBar";
import { HeroPhoto } from "@/components/HeroPhoto";

// Purely editorial — built from lib/data/cityGuides.ts, not live provider
// data — so this stays fully static rather than ISR-revalidated like the
// weather pages themselves.
export const dynamic = "force-static";

interface PageProps {
  params: { country: string; city: string };
}

export function generateStaticParams() {
  return allCityPaths();
}

export function generateMetadata({ params }: PageProps): Metadata {
  const found = findCity(params.country, params.city);
  if (!found) return {};
  const { country, city } = found;
  const title = `Best Time to Visit ${city.name}, ${country.name}`;
  const description = `When to visit ${city.name}: the mild-weather, lower-crowd window recommended for this city, plus what's worth planning your trip around.`;
  const url = `${siteConfig.url}/guides/best-time-to-visit/${country.slug}/${city.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    // No `images` here on purpose — the sibling opengraph-image.tsx (a
    // portrait image, sized for Pinterest's Save-from-URL requirement)
    // auto-attaches as og:image whenever a route doesn't set one explicitly.
    openGraph: { title, description, url },
    twitter: { title, description, images: [defaultOgImage] },
  };
}

export default async function BestTimeToVisitCityPage({ params }: PageProps) {
  const found = findCity(params.country, params.city);
  if (!found) notFound();
  const { country, city } = found;
  const guide = getCityGuide(country.slug, city.slug);
  if (!guide) notFound();
  const heroPhoto = await getLandscapePhoto(`${city.name} ${country.name} landmark`);

  const weatherUrl = `/weather/${country.slug}/${city.slug}`;
  const nearby = country.cities
    .filter((c) => c.slug !== city.slug)
    .slice(0, 4)
    .map((c) => ({ country, city: c }));

  const jsonLd = [
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
          return climate ? (
            <div className="mt-8">
              <ClimateChart climate={climate} countrySlug={country.slug} citySlug={city.slug} cityName={city.name} />
            </div>
          ) : null;
        })()}

        <div className="mt-8">
          <AdSlot variant="inline" />
        </div>
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
