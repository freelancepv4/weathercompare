import { ImageResponse } from "next/og";
import { findCity } from "@/config/countries";
import { getPortraitPhotoDataUri } from "@/lib/providers/photos";
import { PinImageCard } from "@/lib/pinImageCard";

// Portrait (2:3) — same reasoning as app/guides/[slug]/opengraph-image.tsx.
// Node.js runtime + pre-fetched data URI — see the comment on
// getPortraitPhotoDataUri in lib/providers/photos.ts for why.
export const runtime = "nodejs";
export const alt = "Best time to visit";
export const size = { width: 1000, height: 1500 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { country: string; city: string } }) {
  const found = findCity(params.country, params.city);
  const title = found ? `Best Time to Visit ${found.city.name}` : "Best Time to Visit";
  const photo = found ? await getPortraitPhotoDataUri(`${found.city.name} ${found.country.name} landmark`) : null;
  return new ImageResponse(<PinImageCard eyebrow="Best time to visit" title={title} photoUrl={photo?.dataUri} />, {
    ...size,
  });
}
