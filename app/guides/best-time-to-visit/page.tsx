import type { Metadata } from "next";
import { countries } from "@/config/countries";
import { siteConfig, defaultOgImage } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CityGrid } from "@/components/CityGrid";
import { PageHeader } from "@/components/PageHeader";
import { climateHighsFor } from "@/lib/data/climate";
import { CalendarDays, Compass } from "lucide-react";
import { seoTitle, seoDescription } from "@/lib/seo";
import Link from "next/link";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const title = "Best Time to Visit — City Guides";
  const description =
    "When to visit every city on WeatherCompare, worldwide: mild-weather windows, crowd-avoiding shoulder seasons, and what to expect each season.";
  const url = `${siteConfig.url}/guides/best-time-to-visit`;
  return {
    title: seoTitle(title),
    description: seoDescription(description),
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: siteConfig.name, title, description, url, images: [defaultOgImage] },
    twitter: { card: "summary_large_image", title, description, images: [defaultOgImage] },
  };
}

export default function BestTimeToVisitIndexPage() {
  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Best time to visit" },
        ]}
      />

      <PageHeader
        eyebrow="Best time to visit"
        icon={CalendarDays}
        tone="sunset"
        title="Best Time to Visit, City by City"
        description={
          <p>
            Every city has its own recommended window — usually a mild shoulder season that avoids both winter cold and peak-summer
            crowds. The mini charts show each city&apos;s average daytime high through the year.
          </p>
        }
      >
        <Link
          href="/trip-finder"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-soft hover:bg-rose-50"
        >
          <Compass size={15} aria-hidden="true" /> Not sure where? Try the trip finder
        </Link>
      </PageHeader>

      <div className="space-y-12">
        {countries.map((country) => (
          <div key={country.slug}>
            <CityGrid
              title={country.name}
              items={country.cities.map((city) => ({ country, city }))}
              climate={climateHighsFor(country.cities.map((city) => ({ country, city })))}
              hrefFor={(c, city) => `/guides/best-time-to-visit/${c.slug}/${city.slug}`}
            />
            {/* Entry point for the country-level question. The city grid above
                answers "when should I go to Seville"; this answers "when
                should I go to Spain", which is a different search. */}
            <Link
              href={`/guides/best-time-to-visit/${country.slug}`}
              className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:underline dark:text-brand-300"
            >
              Best time to visit {country.name}: every city compared →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
