import { siteConfig } from "@/config/site";

/**
 * Shared visual for the Pinterest-oriented (portrait) image variants — see
 * app/guides/[slug]/opengraph-image.tsx and
 * app/guides/best-time-to-visit/[country]/[city]/opengraph-image.tsx.
 * Kept separate from the landscape app/opengraph-image.tsx used for
 * Twitter/Facebook/Slack link cards: Pinterest's "Save from URL" flow only
 * accepts images between 2:3 and 1:1 (portrait or square), which a 1.91:1
 * landscape card fails outright — it isn't just a preference, Pinterest
 * reports "No suitable images found" for anything wider than that.
 *
 * `photoUrl` is optional: when a real Pexels photo is available (see
 * lib/providers/photos.ts) it's used as a full-bleed background with a
 * gradient scrim for legible text, which is what actually performs on
 * Pinterest — a real, recognisable place beats a flat brand-colour card.
 * Without one (no API key, fetch failed), it falls back to the original
 * gradient-only card so nothing ever breaks or ships blank.
 */
export function PinImageCard({
  eyebrow,
  title,
  photoUrl,
}: {
  eyebrow: string;
  title: string;
  photoUrl?: string | null;
}) {
  // Satori (next/og's renderer) errors on a style object whose value is
  // literally `undefined` (as opposed to the key being absent) — it was
  // the actual cause of every "Cannot read properties of undefined
  // (reading 'toString')" 500 on this route, unrelated to photo fetching
  // itself. So: always give backgroundImage/background a real string,
  // never `undefined`, for both the photo and no-photo branches.
  const outerBackgroundImage = photoUrl
    ? "none"
    : "radial-gradient(circle at 20% 15%, rgba(56,120,255,0.35), transparent 45%), radial-gradient(circle at 85% 90%, rgba(56,189,248,0.28), transparent 55%)";
  const scrimBackground = photoUrl
    ? "linear-gradient(180deg, rgba(11,31,73,0.05) 0%, rgba(11,31,73,0.15) 38%, rgba(11,31,73,0.94) 76%, rgba(11,31,73,0.99) 100%)"
    : "none";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#0b1f49",
        backgroundImage: outerBackgroundImage,
        fontFamily: "sans-serif",
      }}
    >
      {photoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          width={1000}
          height={1500}
          alt=""
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {/* Gradient scrim — near-transparent at the top so the photo reads
          clearly, opaque toward the bottom where the title/brand sit. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          background: scrimBackground,
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 700,
            color: "#7dd3fc",
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #38bdf8, #3878ff)",
              fontSize: 30,
            }}
          >
            ☁️
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "white" }}>{siteConfig.name}</div>
        </div>
      </div>
    </div>
  );
}
