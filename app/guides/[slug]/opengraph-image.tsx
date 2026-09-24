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
// forcing Node.js didn't fix the crash this route was hitting.
export const alt = "Guide";
export const size = { width: 1000, height: 1500 };
export const contentType = "image/png";

// ImageResponse renders lazily — Satori/resvg does the actual PNG encode
// when the response BODY is read, which happens after a route handler
// returns. So a try/catch around `new ImageResponse(...)` never sees a
// render failure — it only guards the constructor call. To actually catch
// a bad render (e.g. an undecodable inlined photo), we force it to
// materialize now, inside our own try/catch, by awaiting the bytes
// ourselves before returning.
//
// IMPORTANT: don't spread `res.headers` into the rebuilt Response — that
// copies headers (content-length, transfer-encoding, ...) computed for
// the ORIGINAL streamed body, which don't validly apply to a fresh Response
// built from raw bytes, and constructing one with them throws. Set only
// the headers this route actually needs.
async function render(eyebrow: string, title: string, photoUrl?: string) {
  const res = new ImageResponse(<PinImageCard eyebrow={eyebrow} title={title} photoUrl={photoUrl} />, { ...size });
  const buf = await res.arrayBuffer();
  return new Response(buf, { headers: { "content-type": contentType } });
}

export default async function Image({ params }: { params: { slug: string } }) {
  const guide = getGuide(params.slug);
  const photo = guide ? await getPortraitPhotoDataUri(guide.photoQuery) : null;
  const eyebrow = guide ? CATEGORY_LABELS[guide.category] : "Guide";
  const title = guide?.title ?? "Travel Guide";

  try {
    return await render(eyebrow, title, photo?.dataUri);
  } catch {
    // Rendering with the photo failed — fall back to the flat gradient
    // card, which has no remote image to fail on and should always render.
    return render(eyebrow, title);
  }
}
