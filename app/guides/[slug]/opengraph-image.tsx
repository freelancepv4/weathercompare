import { ImageResponse } from "next/og";
import { getGuide, CATEGORY_LABELS } from "@/lib/data/guides";
import { getPortraitPhotoDataUri } from "@/lib/providers/photos";
import { PinImageCard } from "@/lib/pinImageCard";

// Portrait (2:3) so this satisfies Pinterest's "Save from URL" image ratio
// requirement — see lib/pinImageCard.tsx. Because this file lives in the
// same segment as page.tsx's own generateMetadata (which defines its own
// openGraph without an images field — see page.tsx), Next.js auto-attaches
// this as that route's og:image; the twitter card keeps the landscape
// default from config/site.ts instead, since Twitter/Slack prefer that shape.
//
// Left on the default Edge runtime — Buffer is available there too, and
// forcing Node.js turned out not to fix the crash this route was hitting
// (see getPortraitPhotoDataUri's comment for the photo-fetch approach).
// The photo render itself is wrapped in try/catch below as a second,
// belt-and-braces layer: whatever the underlying cause, a failure here
// must never take down the whole route — it should just fall back to the
// flat gradient card, same as "no photo found" already does.
export const alt = "Guide";
export const size = { width: 1000, height: 1500 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  const photo = guide ? await getPortraitPhotoDataUri(guide.photoQuery) : null;
  const eyebrow = guide ? CATEGORY_LABELS[guide.category] : "Guide";
  const title = guide?.title ?? "Travel Guide";

  try {
    return new ImageResponse(
      <PinImageCard eyebrow={eyebrow} title={title} photoUrl={photo?.dataUri} />,
      { ...size }
    );
  } catch {
    // Rendering with the photo failed for some reason — fall back to the
    // flat gradient card rather than let the route 500.
    return new ImageResponse(<PinImageCard eyebrow={eyebrow} title={title} />, { ...size });
  }
}
