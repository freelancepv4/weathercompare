/**
 * next/image loader used on Cloudflare (no Vercel image optimizer there).
 *
 * Remote hero photos come from Pexels, whose CDN resizes and compresses on
 * the fly via URL parameters, so each srcset width simply asks Pexels for
 * that width (height scaled to keep the crop). This is free and cacheable
 * worldwide. Local files are served as-is from static assets.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  if (src.startsWith("https://images.pexels.com/")) {
    const url = new URL(src);
    const oldW = Number(url.searchParams.get("w"));
    const oldH = Number(url.searchParams.get("h"));
    url.searchParams.set("w", String(width));
    if (oldW > 0 && oldH > 0) url.searchParams.set("h", String(Math.round((oldH * width) / oldW)));
    url.searchParams.set("auto", "compress");
    url.searchParams.set("cs", "tinysrgb");
    if (quality) url.searchParams.set("q", String(quality));
    return url.toString();
  }
  // Static files: the width parameter is ignored, but keeps srcset entries unique.
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
