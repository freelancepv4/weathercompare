import { NextResponse } from "next/server";
import { getForecastBundles } from "@/lib/services/weatherService";
import { siteConfig } from "@/config/site";
import { locationFromSeed } from "@/lib/providers/geocoding";
import { getWeatherNews } from "@/lib/services/newsService";

/**
 * GET /api/health
 *
 * Machine-readable health check for external uptime monitors (UptimeRobot,
 * BetterStack, Pingdom, etc. — all have a free tier and just need a URL to
 * poll every few minutes; none are wired up automatically here since that
 * requires an account only you can create). Point one at this URL and
 * configure it to alert when the JSON's top-level `status` isn't "ok" or the
 * HTTP status isn't 200, so you find out about an outage before a visitor
 * tells you.
 *
 * Reuses the same cached weather-provider responses city pages already use
 * (see siteConfig.weatherCacheSeconds) rather than issuing fresh upstream
 * API calls on every health check — a monitor pinging this every minute
 * should never itself burn through provider rate limits.
 */
export const dynamic = "force-dynamic";

const REFERENCE_COUNTRY = "italy";
const REFERENCE_CITY = "rome";

export async function GET() {
  const startedAt = Date.now();
  const location = locationFromSeed(REFERENCE_COUNTRY, REFERENCE_CITY);

  const [weatherResult, newsResult] = await Promise.allSettled([
    location ? getForecastBundles(location) : Promise.resolve({ bundles: [], errors: [] }),
    getWeatherNews(1),
  ]);

  const weather =
    weatherResult.status === "fulfilled"
      ? weatherResult.value
      : { bundles: [], errors: [{ providerId: "unknown", message: String(weatherResult.reason) }] };

  const news = newsResult.status === "fulfilled" ? newsResult.value : { items: [], errors: [{ source: "unknown", message: String(newsResult.reason) }] };

  const providerCount = weather.bundles.length + weather.errors.length;
  const allProvidersDown = providerCount > 0 && weather.bundles.length === 0;

  const status = allProvidersDown ? "degraded" : "ok";

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startedAt,
      demoMode: siteConfig.demoMode,
      weatherProviders: {
        healthy: weather.bundles.map((b) => b.provider.id),
        failing: weather.errors.map((e) => ({ id: e.providerId, message: e.message })),
      },
      news: {
        ok: news.errors.length === 0,
        errors: news.errors,
      },
    },
    { status: allProvidersDown ? 503 : 200 }
  );
}
