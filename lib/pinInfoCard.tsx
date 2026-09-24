import { siteConfig } from "@/config/site";

/**
 * Richer Pinterest Pin template — a step up from PinImageCard's simple
 * photo+title card. Modelled on what actually performs well in this niche
 * on Pinterest (see the @weathercompare Pinterest growth notes): a full-
 * bleed photo, a short bulleted "what's inside" list instead of just a
 * title, a factual stat line (best time to visit), and a branded footer.
 *
 * Every string that reaches this component must come from real guide/city
 * data already on the site (guide section bullets, cityGuides landmarks,
 * cityGuides.bestTimeToVisit) — this component itself invents nothing, it
 * only lays content out. Callers should fall back to the plain
 * PinImageCard when they don't have real highlights to show (e.g. a guide
 * with no bulleted section), rather than padding this template with
 * placeholder text.
 *
 * Same Satori landmines as pinImageCard.tsx apply here (see that file's
 * comment): never set a style value to literal `undefined`, never use
 * `backgroundImage: "none"` — omit the key instead.
 */

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  // Break on the last whole word so we never chop mid-word, unless that
  // would throw away more than a third of the budget (a single very long
  // word), in which case a hard cut is the lesser evil.
  const clean = lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut;
  return clean.trimEnd() + "…";
}

export interface PinInfoCardProps {
  eyebrow: string;
  title: string;
  photoUrl?: string | null;
  /** Up to ~4 short, factual highlights (landmark names, guide bullets). */
  highlights: string[];
  /** Optional short factual stat line, e.g. "Best time: Apr–Jun, Sep–Oct". */
  statLabel?: string;
  statValue?: string;
}

export function PinInfoCard({ eyebrow, title, photoUrl, highlights, statLabel, statValue }: PinInfoCardProps) {
  const outerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    position: "relative",
    backgroundColor: "#0b1f49",
    fontFamily: "sans-serif",
    ...(!photoUrl && {
      backgroundImage:
        "radial-gradient(circle at 20% 15%, rgba(56,120,255,0.35), transparent 45%), radial-gradient(circle at 85% 90%, rgba(56,189,248,0.28), transparent 55%)",
    }),
  };

  // Darkens progressively further down the card than PinImageCard's scrim,
  // since this layout carries a highlights card + stat + footer in the
  // lower two-thirds rather than just a title.
  const scrimStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    ...(photoUrl && {
      background:
        "linear-gradient(180deg, rgba(11,31,73,0.10) 0%, rgba(11,31,73,0.35) 30%, rgba(11,31,73,0.90) 58%, rgba(11,31,73,0.99) 100%)",
    }),
  };

  const shownHighlights = highlights.slice(0, 4).map((h) => truncate(h, 62));

  return (
    <div style={outerStyle}>
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

      <div style={scrimStyle} />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 64,
        }}
      >
        {/* Eyebrow + title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              fontSize: 24,
              fontWeight: 700,
              color: "#7dd3fc",
              textTransform: "uppercase",
              letterSpacing: 2,
              background: "rgba(255,255,255,0.14)",
              borderRadius: 999,
              padding: "10px 22px",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 50,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
        </div>

        {/* Highlights card */}
        {shownHighlights.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              background: "rgba(255,255,255,0.10)",
              borderRadius: 24,
              padding: 30,
            }}
          >
            {shownHighlights.map((text, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #38bdf8, #3878ff)",
                    color: "white",
                    fontSize: 20,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ display: "flex", flex: 1, fontSize: 26, fontWeight: 600, color: "white", lineHeight: 1.25 }}>
                  {text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stat + brand footer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {statValue && (
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  background: "#7dd3fc",
                  flexShrink: 0,
                }}
              />
              <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: "#7dd3fc", lineHeight: 1.3 }}>
                {statLabel ? `${statLabel}: ` : ""}
                {truncate(statValue, 78)}
              </div>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 15,
                background: "linear-gradient(135deg, #38bdf8, #3878ff)",
                fontSize: 28,
              }}
            >
              ☁️
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "white" }}>{siteConfig.name}</div>
              <div style={{ display: "flex", fontSize: 20, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>
                Full forecast & guide
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
