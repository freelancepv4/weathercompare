import { ImageResponse } from "next/og";
import { getGuide, CATEGORY_LABELS } from "@/lib/data/guides";
import { PinImageCard } from "@/lib/pinImageCard";

// Portrait (2:3) so this satisfies Pinterest's "Save from URL" image ratio
// requirement — see lib/pinImageCard.tsx. Because this file lives in the
// same segment as page.tsx's own generateMetadata (which defines its own
// openGraph without an images field — see page.tsx), Next.js auto-attaches
// this as that route's og:image; the twitter card keeps the landscape
// default from config/site.ts instead, since Twitter/Slack prefer that shape.
export const alt = "Guide";
export const size = { width: 1000, height: 1500 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  return new ImageResponse(
    <PinImageCard eyebrow={guide ? CATEGORY_LABELS[guide.category] : "Guide"} title={guide?.title ?? "Travel Guide"} />,
    { ...size }
  );
}
