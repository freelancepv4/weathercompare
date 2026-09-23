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
 */
export function PinImageCard({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0b1f49",
        backgroundImage:
          "radial-gradient(circle at 20% 15%, rgba(56,120,255,0.35), transparent 45%), radial-gradient(circle at 85% 90%, rgba(56,189,248,0.28), transparent 55%)",
        padding: 72,
        fontFamily: "sans-serif",
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
  );
}
