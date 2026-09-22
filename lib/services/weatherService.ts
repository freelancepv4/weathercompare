import type { ForecastBundle, GeoLocation } from "@/types/weather";
import { getAllProviders, providerIds, type ProviderId } from "@/lib/providers/registry";

/**
 * Server-side aggregation: fan the same location out to every configured
 * provider in parallel, and fail soft per-provider (one provider being down
 * doesn't take out the whole comparison view).
 *
 * Consumers (API routes, server components) should call this instead of
 * talking to individual providers directly.
 */
export async function getForecastBundles(location: GeoLocation): Promise<{
  bundles: ForecastBundle[];
  errors: Array<{ providerId: ProviderId; message: string }>;
}> {
  const providers = getAllProviders();
  const results = await Promise.allSettled(
    providers.map(async (provider) => {
      const [current, hourly, daily, alerts] = await Promise.all([
        provider.getCurrentWeather(location),
        provider.getHourlyForecast(location),
        provider.getDailyForecast(location),
        provider.getAlerts(location),
      ]);
      const bundle: ForecastBundle = {
        provider: provider.meta,
        current,
        hourly,
        daily,
        alerts,
        fetchedAt: new Date().toISOString(),
      };
      return bundle;
    })
  );

  const bundles: ForecastBundle[] = [];
  const errors: Array<{ providerId: ProviderId; message: string }> = [];

  results.forEach((result, i) => {
    const id = providerIds[i] as ProviderId;
    if (result.status === "fulfilled") {
      bundles.push(result.value);
    } else {
      const message = result.reason?.message ?? "Unknown provider error";
      // Logged so real failures are visible in Vercel's logs (build-time for
      // static/ISR pages, runtime for API routes) instead of being swallowed.
      console.error(`[weatherService] provider "${id}" failed: ${message}`);
      errors.push({ providerId: id, message });
    }
  });

  return { bundles, errors };
}

export interface ComparisonSummary {
  tempMin: number;
  tempMax: number;
  rainMin: number;
  rainMax: number;
  windMin: number;
  windMax: number;
  agreementLabel: "high" | "moderate" | "low";
}

/** Computes the "forecast agreement" range shown beneath the comparison cards. */
export function summarizeComparison(bundles: ForecastBundle[]): ComparisonSummary | null {
  if (bundles.length === 0) return null;
  const temps = bundles.map((b) => b.current.temperature);
  const rains = bundles.map((b) => b.current.precipitationProbability);
  const winds = bundles.map((b) => b.current.windSpeed);

  const tempMin = Math.min(...temps);
  const tempMax = Math.max(...temps);
  const rainMin = Math.min(...rains);
  const rainMax = Math.max(...rains);
  const windMin = Math.min(...winds);
  const windMax = Math.max(...winds);

  const tempSpread = tempMax - tempMin;
  const rainSpread = rainMax - rainMin;
  const agreementLabel: ComparisonSummary["agreementLabel"] =
    tempSpread <= 1.5 && rainSpread <= 15 ? "high" : tempSpread <= 3.5 && rainSpread <= 30 ? "moderate" : "low";

  return { tempMin, tempMax, rainMin, rainMax, windMin, windMax, agreementLabel };
}
