import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";
import { citiesWithClimate, MONTHS } from "@/lib/data/climate";
import { regionOf } from "@/lib/tripScore";
import { siteConfig, defaultOgImage } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TripFinder, type FinderCity } from "@/components/TripFinder";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const title = "Trip Weather Finder: Where to Go for Good Weather";
  const description =
    "Pick a month and the weather you want — hot and sunny, mild, or cool — and instantly see which cities match best, based on 10 years of climate data.";
  const url = `${siteConfig.url}/trip-finder`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images: [defaultOgImage] },
    twitter: { title, description, images: [defaultOgImage] },
  };
}

export default function TripFinderPage() {
  const cities: FinderCity[] = citiesWithClimate().map(({ country, city, climate }) => ({
    country: country.name,
    countrySlug: country.slug,
    city: city.name,
    citySlug: city.slug,
    region: regionOf(country.slug),
    climate,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    // Plain WebPage: Google's SoftwareApplication/WebApplication rich result
    // requires ratings or reviews, which this free tool doesn't have.
    "@type": "WebPage",
    name: "Trip Weather Finder",
    url: `${siteConfig.url}/trip-finder`,
    description: "Find destinations with your preferred weather for any month of the year.",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Trip weather finder" }]} />

      <header className="relative mb-8 overflow-hidden rounded-xl3 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 px-6 py-10 text-white sm:px-10">
        <Compass size={160} className="absolute -right-8 -top-8 text-white/10" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Where should you go for the weather you want?</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base">
            Choose a month and your ideal weather. We rank {cities.length} cities worldwide using 10 years of daily climate data —
            temperature, rainfall and cloud cover.
          </p>
        </div>
      </header>

      {cities.length > 0 ? (
        <TripFinder cities={cities} initialMonth={new Date().getMonth()} />
      ) : (
        <p className="text-sm text-slate-500">Climate data is being prepared — please check back soon.</p>
      )}

      <section className="mt-16" aria-labelledby="by-month-heading">
        <h2 id="by-month-heading" className="text-xl font-bold text-slate-900 dark:text-white">
          Where to go, month by month
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {MONTHS.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/where-to-go/${m.slug}`}
                className="block rounded-xl2 border border-slate-200 bg-white px-3 py-3 text-center text-sm font-semibold text-slate-700 shadow-soft hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-200"
              >
                Where to go in {m.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[11px] text-slate-400">
          Scores compare each city&apos;s long-term monthly averages with the weather style you choose. They describe typical
          conditions, not a forecast — check the live forecast before you travel.
        </p>
      </section>
    </div>
  );
}
