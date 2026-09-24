import { ImageResponse } from "next/og";
import { getGuide, CATEGORY_LABELS } from "@/lib/data/guides";
import { getPortraitPhotoDataUri } from "@/lib/providers/photos";
import { PinImageCard } from "@/lib/pinImageCard";
import { PinInfoCard } from "@/lib/pinInfoCard";

// Portrait (2:3) so this satisfies Pinterest's "Save from URL" image ratio
// requirement — see lib/pinImageCard.tsx. Because this file lives in the
// same segment as page.tsx's own generateMetadata (which defines its own
// openGraph without an images field — see page.tsx), Next.js auto-attaches
// this as that route's og:image; the twitter card keeps the landscape
// default from config/site.ts instead, since Twitter/Slack prefer that shape.
//
// Left on the default Edge runtime.
//
// Kept deliberately simple: earlier attempts here wrapped the render in a
// helper that awaited `res.arrayBuffer()` and rebuilt the Response, meant
// to catch a lazy Satori render failure — but that wrapper turned out to
// break the route outright (confirmed by testing a slug with no photo
// involved at all, which still 500'd only with that wrapper in place).
// Back to the plain form that's known to work; photoUrl is a pre-fetched
// data URI from getPortraitPhotoDataUri, which already degrades to
// `undefined` on any fetch failure so PinImageCard always has something
// valid to render.
export const alt = "Guide";
export const size = { width: 1000, height: 1500 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  const photo = guide ? await getPortraitPhotoDataUri(guide.photoQuery) : null;
  const eyebrow = guide ? CATEGORY_LABELS[guide.category] : "Guide";
  const title = guide?.title ?? "Travel Guide";

  // Use the richer infographic card when the guide has a real bulleted
  // section to draw highlights from; otherwise fall back to the plain
  // title card rather than showing an empty highlights box.
  const bulletSection = guide?.sections.find((s) => s.bullets && s.bullets.length > 0);
  if (guide && bulletSection?.bullets) {
    return new ImageResponse(
      (
        <PinInfoCard
          eyebrow={eyebrow}
          title={title}
          photoUrl={photo?.dataUri}
          highlights={bulletSection.bullets}
        />
      ),
      { ...size }
    );
  }

  return new ImageResponse(<PinImageCard eyebrow={eyebrow} title={title} photoUrl={photo?.dataUri} />, { ...size });
}
