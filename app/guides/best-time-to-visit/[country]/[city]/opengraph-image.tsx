import { ImageResponse } from "next/og";
import { findCity } from "@/config/countries";
import { getPortraitPhotoDataUri } from "@/lib/providers/photos";
import { PinImageCard } from "@/lib/pinImageCard";

// Portrait (2:3) — same reasoning as app/guides/[slug]/opengraph-image.tsx.
// Left on the default Edge runtime. See that file's `render` helper
// comment for why we await the bytes ourselves before returning — a plain
// try/catch around `new ImageResponse(...)` doesn't catch a lazy Satori
// render failure, since that only happens once the body is read.
export const alt = "Best time to visit";
export const size = { width: 1000, height: 1500 };
export const contentType = "image/png";

// See app/guides/[slug]/opengraph-image.tsx's `render` for why we set only
// content-type here rather than spreading res.headers wholesale.
async function render(title: string, photoUrl?: string) {
  const res = new ImageResponse(<PinImageCard eyebrow="Best time to visit" title={title} photoUrl={photoUrl} />, {
    ...size,
  });
  const buf = await res.arrayBuffer();
  return new Response(buf, { headers: { "content-type": contentType } });
}

export default async function Image({ params }: { params: { country: string; city: string } }) {
  const found = findCity(params.country, params.city);
  const title = found ? `Best Time to Visit ${found.city.name}` : "Best Time to Visit";
  const photo = found ? await getPortraitPhotoDataUri(`${found.city.name} ${found.country.name} landmark`) : null;

  try {
    return await render(title, photo?.dataUri);
  } catch {
    return render(title);
  }
}
