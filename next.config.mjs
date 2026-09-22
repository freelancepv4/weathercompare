/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    // Add remote weather-icon / avatar CDNs here if needed later.
    formats: ["image/avif", "image/webp"],
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
    ];
  },
};

export default nextConfig;
