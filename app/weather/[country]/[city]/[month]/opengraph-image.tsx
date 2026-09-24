import { ImageResponse } from "next/og";
import { findCity } from "@/config/countries";
import { getCityClimate, MONTHS, monthIndex, describeMonth } from "@/lib/data/climate";
import { getPortraitPhotoDataUri } from "@/lib/providers/photos";
import { PinImageCard } from "@/lib/pinImageCard";
import { PinInfoCard } from "@/lib/pinInfoCard";

// Portrait (2:3) Pinterest card for "{City} weather in {Month}" pages —
// same pattern as app/guides/best-time-to-visit/[country]/[city]/opengraph-image.tsx.
// page.tsx deliberately sets no openGraph.images so Next attaches this one.
export const alt = "Weather by month";
export const size = { width: 1000, height: 1500 };
export const contentType = "image/png";

const toF = (c: number) => Math.round((c * 9) / 5 + 32);

export default async function Image({ params }: { params: { country: string; city: string; month: string } }) {
  const found = findCity(params.country, params.city);
  const i = monthIndex(params.month);
  const month = i >= 0 ? MONTHS[i]! : null;
  const title = found && month ? `${found.city.name} Weather in ${month.name}` : "Weather by Month";
  const photo = found ? await getPortraitPhotoDataUri(`${found.city.name} ${found.country.name} landmark`) : null;
  const climate = found ? getCityClimate(found.country.slug, found.city.slug) : null;

  if (climate && month) {
    const feel = describeMonth(climate, i);
    return new ImageResponse(
      (
        <PinInfoCard
          eyebrow="Weather by month"
          title={title}
          photoUrl={photo?.dataUri}
          highlights={[
            `Average high ${Math.round(climate.tMax[i]!)}°C / ${toF(climate.tMax[i]!)}°F`,
            `Average low ${Math.round(climate.tMin[i]!)}°C / ${toF(climate.tMin[i]!)}°F`,
            `About ${climate.precipMm[i]} mm of rain (${feel.rain})`,
            `Typically ${feel.sky}`,
          ]}
          statLabel="In short"
          statValue={`${feel.temp[0]!.toUpperCase()}${feel.temp.slice(1)}, ${feel.rain}`}
        />
      ),
      { ...size }
    );
  }

  return new ImageResponse(<PinImageCard eyebrow="Weather by month" title={title} photoUrl={photo?.dataUri} />, { ...size });
}
