import type { GeoLocation } from "@/types/weather";
import { countries, localizedCityName, localizedCountryName } from "@/config/world";

/**
 * Location search / geocoding layer.
 *
 * Searches worldwide via the Open-Meteo Geocoding API (free, keyless,
 * https://open-meteo.com/en/docs/geocoding-api), so people can find any
 * city — not just the pre-built ones in config/countries.ts. Results for
 * cities that already have a pre-built page (the "seed" list) are matched
 * up so search still links to the fast, SEO-friendly static page; anything
 * else links to a page generated on the fly from the search result's own
 * coordinates.
 *
 * Falls back to the bundled seed list if the geocoding API can't be
 * reached, so search still works even if Open-Meteo's geocoding endpoint
 * (a separate service from the forecast one) is briefly unavailable.
 */

const GEOCODING_API_BASE = "https://geocoding-api.open-meteo.com/v1/search";

interface OpenMeteoGeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string; // region/state, when available
}

function searchSeedList(query: string, locale: string): GeoLocation[] {
  const normalized = query.trim().toLowerCase();
  const results: GeoLocation[] = [];
  for (const country of countries) {
    for (const city of country.cities) {
      const displayName = localizedCityName(city, locale);
      const haystack = `${city.name} ${displayName} ${city.region}`.toLowerCase();
      if (haystack.includes(normalized)) {
        results.push({
          id: `${country.slug}-${city.slug}`,
          name: displayName,
          region: city.region,
          country: localizedCountryName(country, locale),
          countryCode: country.isoCode,
          lat: city.lat,
          lon: city.lon,
        });
      }
    }
  }
  return results;
}

export async function searchLocations(query: string, locale = "en"): Promise<GeoLocation[]> {
  const normalized = query.trim();
  if (!normalized) return [];

  try {
    const params = new URLSearchParams({
      name: normalized,
      count: "8",
      language: locale,
      format: "json",
    });
    const res = await fetch(`${GEOCODING_API_BASE}?${params.toString()}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Open-Meteo geocoding request failed (${res.status})`);
    const data = (await res.json()) as { results?: OpenMeteoGeocodingResult[] };

    return (data.results ?? []).map((r) => {
      // Prefer the pre-built seed city (and its localized name) when this
      // result matches one, so search still routes to the fast static page.
      // Same name nearby, or (for translated/alternate spellings) practically the same spot.
      const seedMatch =
        countries
          .flatMap((country) => country.cities.map((city) => ({ country, city })))
          .find(
            ({ city }) =>
              city.name.toLowerCase() === r.name.toLowerCase() &&
              Math.abs(city.lat - r.latitude) < 0.5 &&
              Math.abs(city.lon - r.longitude) < 0.5
          ) ??
        countries
          .flatMap((country) => country.cities.map((city) => ({ country, city })))
          .find(({ city }) => Math.abs(city.lat - r.latitude) < 0.06 && Math.abs(city.lon - r.longitude) < 0.06);

      if (seedMatch) {
        return {
          id: `${seedMatch.country.slug}-${seedMatch.city.slug}`,
          name: localizedCityName(seedMatch.city, locale),
          region: seedMatch.city.region,
          country: localizedCountryName(seedMatch.country, locale),
          countryCode: seedMatch.country.isoCode,
          lat: seedMatch.city.lat,
          lon: seedMatch.city.lon,
          page: { country: seedMatch.country.slug, city: seedMatch.city.slug },
        };
      }

      return {
        id: `geo-${r.id}`,
        name: r.name,
        region: r.admin1 ?? "",
        country: r.country,
        countryCode: r.country_code,
        lat: r.latitude,
        lon: r.longitude,
      };
    });
  } catch (error) {
    console.error("[geocoding] Open-Meteo geocoding search failed, falling back to seed list:", (error as Error).message);
    return searchSeedList(normalized, locale).slice(0, 8);
  }
}

export function locationFromSeed(countrySlug: string, citySlug: string, locale = "en"): GeoLocation | null {
  const country = countries.find((c) => c.slug === countrySlug);
  const city = country?.cities.find((c) => c.slug === citySlug);
  if (!country || !city) return null;
  return {
    id: `${country.slug}-${city.slug}`,
    name: localizedCityName(city, locale),
    region: city.region,
    country: localizedCountryName(country, locale),
    countryCode: country.isoCode,
    lat: city.lat,
    lon: city.lon,
    page: { country: country.slug, city: city.slug },
  };
}
