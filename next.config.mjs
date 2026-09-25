import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Cloudflare has no built-in Next.js image optimizer: a custom loader
    // asks the Pexels CDN for each size instead (see lib/imageLoader.ts).
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
  async headers() {
    return [
      {
        // Basic security headers for every route. Extend with a strict CSP
        // once all third-party embeds (ads, analytics, maps) are finalized.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(self), camera=(), microphone=()" },
        ],
      },
      {
        // /embed/* pages exist specifically to be framed by OTHER sites
        // (see app/embed/[country]/[city]/page.tsx) — the SAMEORIGIN rule
        // above would block exactly that. Every modern browser prefers a
        // CSP frame-ancestors directive over X-Frame-Options when both are
        // present, so this permits framing here without loosening it
        // anywhere else on the site.
        source: "/embed/:path*",
        headers: [{ key: "Content-Security-Policy", value: "frame-ancestors *" }],
      },
      // Translated site versions: tell crawlers (Bing in particular reads
      // this) which language each /{lang}/ section is in. The <html lang>
      // attribute comes from the single root layout, so it can't vary.
      ...["it", "de", "fr", "es", "pt", "nl", "pl"].flatMap((lang) => [
        { source: `/${lang}`, headers: [{ key: "Content-Language", value: lang }] },
        { source: `/${lang}/:path*`, headers: [{ key: "Content-Language", value: lang }] },
      ]),
    ];
  },
};

export default nextConfig;

// Lets `next dev` use the Cloudflare bindings (R2 cache etc.) locally.
initOpenNextCloudflareForDev();
