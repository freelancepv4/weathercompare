import type { Metadata } from "next";
import { countries } from "@/config/countries";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CityGrid } from "@/components/CityGrid";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const title = "Best Time to Visit — City Guides";
  const description =
    "When to visit every city on WeatherCompare: mild-weather windows, crowd-avoiding shoulder seasons, and what to expect each season.";
  const url = `${siteConfig.url}/guides/best-time-to-visit`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { title, description },
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

      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Best Time to Visit, City by City</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Every city below has its own recommended window — usually a mild shoulder season that avoids both winter cold
          and peak-summer crowds. Pick a city to see when locals and this site both recommend going, plus the
          landmarks worth planning around.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        {countries.map((country) => (
          <CityGrid
            key={country.slug}
            title={country.name}
            items={country.cities.map((city) => ({ country, city }))}
            hrefFor={(c, city) => `/guides/best-time-to-visit/${c.slug}/${city.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
