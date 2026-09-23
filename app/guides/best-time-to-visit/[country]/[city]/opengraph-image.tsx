import { ImageResponse } from "next/og";
import { findCity } from "@/config/countries";
import { PinImageCard } from "@/lib/pinImageCard";

// Portrait (2:3) — same reasoning as app/guides/[slug]/opengraph-image.tsx.
export const alt = "Best time to visit";
export const size = { width: 1000, height: 1500 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { country: string; city: string } }) {
  const found = findCity(params.country, params.city);
  const title = found ? `Best Time to Visit ${found.city.name}` : "Best Time to Visit";
  return new ImageResponse(<PinImageCard eyebrow="Best time to visit" title={title} />, { ...size });
}
