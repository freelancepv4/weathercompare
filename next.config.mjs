/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Add remote weather-icon / avatar CDNs here if needed later.
    formats: ["image/avif", "image/webp"],
    // Pexels-hosted hero photos (see lib/providers/photos.ts) — Next
    // blocks unlisted remote image hosts from its optimizer by default.
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
    ];
  },
};

export default nextConfig;
