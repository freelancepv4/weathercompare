import { ImageResponse } from "next/og";
import { findCity } from "@/config/countries";
import { getPortraitPhotoDataUri } from "@/lib/providers/photos";
import { PinImageCard } from "@/lib/pinImageCard";

// Portrait (2:3) — same reasoning as app/guides/[slug]/opengraph-image.tsx.
// Left on the default Edge runtime (see that file's comment for why the
// Node.js override was dropped) with a try/catch around the render as a
// second fallback layer, on top of getPortraitPhotoDataUri's own.
export const alt = "Best time to visit";
export const size = { width: 1000, height: 1500 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { country: string; city: string } }) {
  const found = findCity(params.country, params.city);
  const title = found ? `Best Time to Visit ${found.city.name}` : "Best Time to Visit";
  const photo = found ? await getPortraitPhotoDataUri(`${found.city.name} ${found.country.name} landmark`) : null;

  try {
    return new ImageResponse(
      <PinImageCard eyebrow="Best time to visit" title={title} photoUrl={photo?.dataUri} />,
      { ...size }
    );
  } catch {
    return new ImageResponse(<PinImageCard eyebrow="Best time to visit" title={title} />, { ...size });
  }
}
