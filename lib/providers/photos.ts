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
  // Smaller + more compressed than the landscape variant on purpose: this
  // one gets downloaded server-side and inlined as a base64 data URI (see
  // getPortraitPhotoDataUri below), so a smaller payload means a smaller
  // and faster ImageResponse render — the output PNG is still 1000x1500,
  // this only affects the source photo's file size.
  return `${baseUrl}?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1200&q=70`;
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

/**
 * Tries `query` first, and if Pexels has nothing for it (this does happen —
 * a specific enough query like "Florence Italy skyline duomo" can come back
 * empty even though Pexels has plenty of Florence photos under a broader
 * term), falls back to just the first two words, which is almost always
 * "<City> <Country>" for how callers here build their queries. Cheap
 * insurance against a single narrow query silently costing a guide its
 * photo — searchPexels already caches successes, so this only costs an
 * extra request on the rare query that needs it.
 */
async function searchPexelsWithFallback(query: string) {
  const result = await searchPexels(query);
  if (result) return result;
  const broader = query.split(" ").slice(0, 2).join(" ");
  if (broader && broader !== query) return searchPexels(broader);
  return null;
}

/** A wide (16:9) photo for hero banners on weather/guide pages. */
export async function getLandscapePhoto(query: string): Promise<CityPhoto | null> {
  const result = await searchPexelsWithFallback(query);
  if (!result) return null;
  const { rawUrl, ...rest } = result;
  return { ...rest, url: landscapeVariant(rawUrl) };
}

/** A tall (2:3) photo sized for the Pinterest pin card background. */
export async function getPortraitPhoto(query: string): Promise<CityPhoto | null> {
  const result = await searchPexelsWithFallback(query);
  if (!result) return null;
  const { rawUrl, ...rest } = result;
  return { ...rest, url: portraitVariant(rawUrl) };
}

/**
 * Same portrait photo, but pre-fetched and inlined as a base64 data URI —
 * for use inside next/og's ImageResponse (the Pinterest card generator),
 * NOT for normal <img src> usage in a page.
 *
 * Reason this exists: ImageResponse (Satori) fetches a remote <img src>
 * itself during rendering, and that fetch isn't reliable in production —
 * it can throw and take the whole route down with a 500 instead of
 * degrading gracefully. Fetching the bytes ourselves keeps the same
 * try/catch-and-fall-back-to-null contract as every other helper here, so
 * a failure just means the flat gradient card renders instead, exactly
 * like a missing API key does.
 */
export async function getPortraitPhotoDataUri(
  query: string
): Promise<{ dataUri: string; photographer: string; photographerUrl: string } | null> {
  const photo = await getPortraitPhoto(query);
  if (!photo) return null;
  try {
    const res = await fetch(photo.url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const base64 = Buffer.from(buf).toString("base64");
    const contentType = res.headers.get("content-type") || "image/jpeg";
    return {
      dataUri: `data:${contentType};base64,${base64}`,
      photographer: photo.photographer,
      photographerUrl: photo.photographerUrl,
    };
  } catch {
    return null;
  }
}
