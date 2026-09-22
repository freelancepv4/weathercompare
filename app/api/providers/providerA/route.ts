import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/providers/registry";
import type { GeoLocation } from "@/types/weather";

/**
 * GET /api/providers/providerA?lat=41.9&lon=12.49&name=Rome&region=Lazio&country=Italy&countryCode=IT
 *
 * Thin, provider-scoped endpoint. Demonstrates the clean separation the
 * project brief asks for — each provider gets its own route, all
 * implementing the same WeatherProvider contract via lib/providers/registry.
 * In demo mode this returns deterministic mock data; with DEMO_MODE=false
 * it calls the real adapter in lib/providers/openweather.ts.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") ?? "");
  const lon = parseFloat(searchParams.get("lon") ?? "");
  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return NextResponse.json({ error: "lat and lon query params are required" }, { status: 400 });
  }

  const location: GeoLocation = {
    id: `${lat},${lon}`,
    name: searchParams.get("name") ?? "Unknown",
    region: searchParams.get("region") ?? "",
    country: searchParams.get("country") ?? "",
    countryCode: searchParams.get("countryCode") ?? "",
    lat,
    lon,
  };

  try {
    const provider = getProvider("providerA");
    const [current, hourly, daily, alerts] = await Promise.all([
      provider.getCurrentWeather(location),
      provider.getHourlyForecast(location),
      provider.getDailyForecast(location),
      provider.getAlerts(location),
    ]);
    return NextResponse.json(
      { provider: provider.meta, current, hourly, daily, alerts, fetchedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "s-maxage=600, stale-while-revalidate=1200" } }
    );
  } catch (error) {
    console.error("providerA error", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 502 });
  }
}
