import { siteConfig } from "@/config/site";

/**
 * Real, licensed stock photography via the Pexels API — used for hero
 * images on weather/guide pages and as the background of the Pinterest
 * portrait cards (see lib/pinImageCard.tsx). Pexels photos are free for
 * commercial use under the Pexels License with no attribution required,
 * but we credit the photographer anyway (see PhotoCredit component) as
 * good practice and because it's a small, professional touch.
 *
 * Requires PEXELS_API_KEY (see .env.example). Without it — or if the
 * request fails or times out — every caller falls back to `null` and the
 * page/image renders its non-photo version instead of breaking the build
 * or the page. Get a free key instantly at pexels.com/api.
 */

export interface CityPhoto {
  url: string;
  width: number;
  height: number;
  avgColor: string;
  photographer: string;
  photographerUrl: string;
  alt: string;
}

// Pexels' own CDN query params to request an appropriately sized/cropped
// render server-side rather than downloading the full original and
// resizing client-side.
function landscapeVariant(baseUrl: string) {
  return `${baseUrl}?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=900`;
}
function portraitVariant(baseUrl: string) {
  return `${baseUrl}?auto=compress&cs=tinysrgb&fit=crop&w=1000&h=1500`;
}

async function searchPexels(query: string): Promise<Omit<CityPhoto, "url"> & { rawUrl: string } | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: { Authorization: apiKey },
        // Photos for a given query barely ever change — cache far longer
        // than the live weather data (siteConfig.weatherCacheSeconds).
        next: { revalidate: siteConfig.weatherCacheSeconds * 12 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const photo = data?.photos?.[0];
    if (!photo?.src?.original) return null;
    return {
      rawUrl: photo.src.original as string,
      width: photo.width,
      height: photo.height,
      avgColor: photo.avg_color ?? "#0b1f49",
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      alt: photo.alt || query,
    };
  } catch {
    // Network blocked, request timed out, rate-limited, bad key, etc. —
    // every caller treats this the same as "no photo available."
    return null;
  }
}

/** A wide (16:9) photo for hero banners on weather/guide pages. */
export async function getLandscapePhoto(query: string): Promise<CityPhoto | null> {
  const result = await searchPexels(query);
  if (!result) return null;
  const { rawUrl, ...rest } = result;
  return { ...rest, url: landscapeVariant(rawUrl) };
}

/** A tall (2:3) photo sized for the Pinterest pin card background. */
export async function getPortraitPhoto(query: string): Promise<CityPhoto | null> {
  const result = await searchPexels(query);
  if (!result) return null;
  const { rawUrl, ...rest } = result;
  return { ...rest, url: portraitVariant(rawUrl) };
}
