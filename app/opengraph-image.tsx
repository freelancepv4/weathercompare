import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Site-wide default Open Graph / link-preview image, generated at build
 * time (not a static file) via Next's `opengraph-image` file convention —
 * Next.js automatically wires this into every page's metadata as its
 * `og:image` (and it's reused for Twitter/X cards too, see twitter-image.tsx)
 * unless a route defines its own. Without this, link previews on
 * Pinterest, Twitter, Slack, iMessage, etc. had no thumbnail at all.
 */

export const alt = `${siteConfig.name} — Weather forecasts, compared in one place`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b1f49",
          backgroundImage:
            "radial-gradient(circle at 18% 20%, rgba(56,120,255,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(56,189,248,0.25), transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              borderRadius: 20,
              background: "linear-gradient(135deg, #38bdf8, #3878ff)",
              fontSize: 40,
            }}
          >
            ☁️
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              color: "white",
              letterSpacing: -1,
            }}
          >
            {siteConfig.name}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          Weather forecasts, compared in one place
        </div>
      </div>
    ),
    { ...size }
  );
}
