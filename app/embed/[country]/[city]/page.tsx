import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findCity, allCityPaths } from "@/config/countries";
import { locationFromSeed } from "@/lib/providers/geocoding";
import { getForecastBundles } from "@/lib/services/weatherService";
import { siteConfig } from "@/config/site";
import { formatTemperature } from "@/lib/utils/units";
import { formatTime } from "@/lib/utils/format";
import { WeatherIcon } from "@/components/WeatherIcon";

/**
 * A small, embeddable weather badge for a single city, meant to be dropped
 * into an <iframe> on someone ELSE's site (a travel blog, a local business
 * page) — not browsed directly. Deliberately its own route rather than a
 * variant of the main city page: no header/footer/nav/cookie banner (see
 * the /embed check in Header.tsx, Footer.tsx and CookieConsent.tsx), no
 * third-party map tiles, just the current reading and a link back — see
 * next.config.mjs for the CSP that allows other origins to frame this.
 *
 * Usage for whoever embeds it:
 *   <iframe src="https://weathercompare.eu/embed/italy/rome"
 *           width="300" height="160" style="border:0;border-radius:12px"
 *           loading="lazy" title="Rome weather"></iframe>
 */

export const revalidate = 43200; // 12h literal (must be static for Next.js); matches siteConfig.weatherCacheSeconds

interface PageProps {
  params: Promise<{ country: string; city: string }>;
}

export async function generateStaticParams() {
  return allCityPaths();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const found = findCity(params.country, params.city);
  return {
    title: found ? `${found.city.name} weather widget` : "Weather widget",
    // This page is a component for other pages to embed, not a
    // destination in its own right — keep it out of search results.
    robots: { index: false, follow: false },
  };
}

export default async function EmbedPage(props: PageProps) {
  const params = await props.params;
  const found = findCity(params.country, params.city);
  if (!found) notFound();
  const { country, city } = found;

  const location = locationFromSeed(country.slug, city.slug);
  if (!location) notFound();

  const { bundles } = await getForecastBundles(location);
  const primary = bundles[0];
  const cityUrl = `${siteConfig.url}/weather/${country.slug}/${city.slug}`;

  return (
    <div className="flex h-full min-h-[9rem] w-full flex-col justify-between bg-white p-4 font-sans dark:bg-surface-dark">
      {!primary ? (
        <p className="text-sm text-slate-400">Weather unavailable</p>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {city.name}, {country.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Updated {formatTime(primary.current.observedAt, city.timezone)}
              </p>
            </div>
            <WeatherIcon condition={primary.current.condition} size={28} />
          </div>

          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-3xl font-bold leading-none text-slate-900 dark:text-white">
                {formatTemperature(primary.current.temperature, "celsius")}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{primary.current.conditionLabel}</p>
            </div>
            <a
              href={cityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-brand-600 hover:underline dark:text-brand-300"
            >
              via WeatherCompare
            </a>
          </div>
        </>
      )}
    </div>
  );
}
