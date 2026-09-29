import type { Metadata } from "next";
import Link from "next/link";
import { countries } from "@/config/world";
import { getForecastBundles } from "@/lib/services/weatherService";
import type { GeoLocation } from "@/types/weather";
import { Breadcrumb } from "@/components/Breadcrumb";
import { WeatherDashboard } from "@/components/WeatherDashboard";
import { ForecastComparison } from "@/components/ForecastComparison";
import { HourlyForecast } from "@/components/HourlyForecast";
import { DailyForecast } from "@/components/DailyForecast";
import { RainSection } from "@/components/RainSection";
import { WindSection } from "@/components/WindSection";
import { WeatherAlerts } from "@/components/WeatherAlerts";
import { WeatherMap } from "@/components/WeatherMap";
import { AdSlot } from "@/components/AdSlot";
import { ErrorState } from "@/components/ErrorState";

/**
 * Renders a weather page for a searched city that ISN'T one of the
 * pre-built cities in config/countries.ts (see /weather/[country]/[city]
 * for those — kept fully static for speed and SEO). This route is
 * necessarily dynamic (it depends on query-string coordinates), so it's
 * marked noindex rather than added to the sitemap: it exists so search
 * results for any city in the world lead somewhere real, not a 404.
 *
 * URL shape: /weather/search?lat=&lon=&name=&region=&country=&countryCode=
 * (built by components/SearchBar.tsx's goToLocation)
 */

interface SearchPageProps {
  searchParams: Promise<{
    lat?: string;
    lon?: string;
    name?: string;
    region?: string;
    country?: string;
    countryCode?: string;
  }>;
}

export async function generateMetadata(props: SearchPageProps): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const name = searchParams.name || "Weather";
  return {
    title: `${name} Weather Forecast`,
    description: `Compare weather forecasts for ${name} from multiple independent weather data sources.`,
    robots: { index: false, follow: true }, // ad hoc page, not meant for search engines
  };
}

export default async function SearchResultWeatherPage(props: SearchPageProps) {
  const searchParams = await props.searchParams;
  const lat = parseFloat(searchParams.lat ?? "");
  const lon = parseFloat(searchParams.lon ?? "");
  const name = searchParams.name || "This location";
  const region = searchParams.region || "";
  const country = searchParams.country || "";

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return (
      <div className="container-page py-8 sm:py-10">
        <ErrorState message="No location was specified. Try searching for a city again." />
      </div>
    );
  }

  const location: GeoLocation = {
    id: `geo-${lat},${lon}`,
    name,
    region,
    country,
    countryCode: searchParams.countryCode || "",
    lat,
    lon,
  };

  const { bundles, errors } = await getForecastBundles(location);
  const primary = bundles[0];

  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: name }]} />

      {!primary ? (
        <ErrorState message="Weather data is temporarily unavailable for this location." />
      ) : (
        <div className="space-y-10">
          <WeatherDashboard location={location} current={primary.current} timezone="UTC" />

          {errors.length > 0 && (
            <p className="rounded-lg bg-amber-50 px-4 py-2.5 text-xs text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
              {errors.length} of {bundles.length + errors.length} sources could not be reached and were left out of this comparison.
            </p>
          )}

          <ForecastComparison bundles={bundles} />

          <AdSlot variant="banner" />

          <HourlyForecast hourly={primary.hourly} />
          <DailyForecast daily={primary.daily} />

          <div className="grid gap-6 lg:grid-cols-2">
            <RainSection hourly={primary.hourly} />
            <WindSection current={primary.current} hourly={primary.hourly} daily={primary.daily} />
          </div>

          <WeatherAlerts alerts={primary.alerts} />
          <WeatherMap location={location} current={primary.current} />
        </div>
      )}

      <p className="mt-10 text-center text-xs text-slate-400">
        Looking for a major city instead?{" "}
        <Link href="/" className="font-medium text-brand-600 hover:underline">
          Browse all {countries.length}+ countries
        </Link>
      </p>
    </div>
  );
}
