import type { GeoLocation } from "@/types/weather";
import { NextRequest, NextResponse } from "next/server";
import { searchLocations } from "@/lib/providers/geocoding";
import { countries } from "@/config/world";
import { rateLimit, clientIp } from "@/lib/rateLimit";

/**
 * GET /api/geocode?q=rome&locale=en
 * GET /api/geocode?lat=41.9&lon=12.49&locale=en   (reverse geocode, demo: nearest seed city)
 *
 * Backs the header/hero search autocomplete. See lib/providers/geocoding.ts
 * for how to swap in a real geocoding API.
 */
export async function GET(request: NextRequest) {
  // 60 requests/minute/IP is generous for autocomplete-as-you-type, and
  // protects the upstream Open-Meteo geocoding API from being hammered by a
  // script (it has its own rate limits we don't control).
  const limit = rateLimit(`geocode:${clientIp(request)}`, 60, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const locale = searchParams.get("locale") ?? "en";

  if (lat && lon) {
    // Demo reverse-geocode: nearest seed city by simple distance.
    const latN = parseFloat(lat);
    const lonN = parseFloat(lon);
    let nearest: GeoLocation | null = null;
    let bestDist = Infinity;
    for (const country of countries) {
      for (const city of country.cities) {
        const d = Math.hypot(city.lat - latN, (city.lon - lonN) * Math.cos((latN * Math.PI) / 180));
        if (d < bestDist) {
          bestDist = d;
          nearest = {
            id: `${country.slug}-${city.slug}`,
            name: city.name,
            region: city.region,
            country: country.name,
            countryCode: country.isoCode,
            lat: city.lat,
            lon: city.lon,
            // Only send visitors to a city page when it is really their area (~50 km).
            page: d < 0.45 ? { country: country.slug, city: city.slug } : undefined,
          };
        }
      }
    }
    return NextResponse.json(nearest ? [nearest] : []);
  }

  if (!q) return NextResponse.json([]);

  try {
    const results = await searchLocations(q, locale);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Geocode error", error);
    return NextResponse.json({ error: "Geocoding failed" }, { status: 500 });
  }
}
