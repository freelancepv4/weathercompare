import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";
import { LegalLayout, LegalHeading } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Data Sources & Methodology",
  description: `Where ${siteConfig.name}'s forecasts and climate averages come from, how the monthly figures are calculated, how often data is refreshed, and its limits.`,
  alternates: { canonical: "/data-sources" },
};

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-600">
    {children}
  </a>
);

export default function DataSourcesPage() {
  return (
    <LegalLayout title="Data Sources & Methodology">
      <p>
        {siteConfig.name} does not run its own weather model. We bring together forecasts from independent weather services and publish
        long-term climate averages so you can see where the forecasts agree, and what the weather is usually like before you travel.
        This page explains where every number comes from.
      </p>

      <LegalHeading>Live forecasts</LegalHeading>
      <p>Each city page compares up to three independent forecast services side by side:</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Open-Meteo</strong> (<A href="https://open-meteo.com">open-meteo.com</A>): hourly forecasts up to 16 days ahead,
          built from national weather-service models. Data licensed under{" "}
          <A href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</A>.
        </li>
        <li>
          <strong>WeatherAPI.com</strong> (<A href="https://www.weatherapi.com">weatherapi.com</A>): daily and hourly forecasts,
          plus official weather alerts where they are issued.
        </li>
        <li>
          <strong>OpenWeatherMap</strong> (<A href="https://openweathermap.org">openweathermap.org</A>): current conditions and a
          5-day forecast in 3-hour steps; also the live temperature, rain, wind and cloud layers on our maps.
        </li>
      </ul>
      <p>
        Every forecast block is labelled with the service it comes from. When the services agree, the forecast is usually more
        reliable; when they differ, the weather is harder to predict and it is worth checking again closer to the date.
      </p>

      <LegalHeading>Climate averages (month and &ldquo;best time to visit&rdquo; pages)</LegalHeading>
      <p>
        The monthly figures (average high and low, rainfall, humidity and cloud cover) are long-term averages of daily values for{" "}
        <strong>2011–2020</strong>, grouped by calendar month. They describe what the weather is typically like, not a forecast for a
        particular year.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Most cities:</strong> NASA POWER (<A href="https://power.larc.nasa.gov">power.larc.nasa.gov</A>), a global dataset
          produced by NASA&rsquo;s Langley Research Center from satellite observations and the MERRA-2 reanalysis.
        </li>
        <li>
          <strong>Coastal and island destinations:</strong> ERA5 reanalysis from the Copernicus Climate Change Service (ECMWF),
          retrieved through Open-Meteo&rsquo;s historical weather API and adjusted to the height of the town or resort. ERA5 resolves
          small islands and coastlines far better, which matters because a coarse grid cell that is mostly sea understates daytime
          highs and overstates night-time lows.
        </li>
      </ul>
      <p>
        The &ldquo;best months&rdquo; on each guide are chosen by scoring every month for comfortable daytime temperatures, low rainfall
        and sunshine. The same scores power the <Link href="/trip-finder" className="underline hover:text-brand-600">trip weather finder</Link>{" "}
        and the <Link href="/where-to-go/january" className="underline hover:text-brand-600">where-to-go</Link> pages.
      </p>

      <LegalHeading>How often data is refreshed</LegalHeading>
      <p>
        City forecast pages are rebuilt at least twice a day, and the &ldquo;weather today&rdquo; overview every three hours. Climate
        averages change only when we add cities or improve the underlying data.
      </p>

      <LegalHeading>Photos and maps</LegalHeading>
      <p>
        Destination photos come from <A href="https://www.pexels.com">Pexels</A> and are credited to their photographers under each
        image. Maps use <A href="https://www.openstreetmap.org/copyright">OpenStreetMap</A> (© OpenStreetMap contributors), satellite
        imagery from Esri World Imagery, and weather layers from OpenWeatherMap.
      </p>

      <LegalHeading>Limitations</LegalHeading>
      <p>
        Forecasts from any service are estimates, and they become less certain the further ahead they look. Climate averages smooth out
        individual hot, cold or wet years. {siteConfig.name} is not a meteorological authority: for official warnings and any decision
        that affects safety, always follow your national weather service.
      </p>

      <LegalHeading>Attribution</LegalHeading>
      <p className="text-sm">
        Forecast data by Open-Meteo.com (CC BY 4.0), WeatherAPI.com and OpenWeatherMap. Climate data: NASA Langley Research Center
        (LaRC) POWER Project, funded through the NASA Earth Science/Applied Science Program; and Hersbach, H. et al. (2023): ERA5
        hourly data, Copernicus Climate Change Service (C3S) Climate Data Store. Contains modified Copernicus Climate Change Service
        information {new Date().getFullYear()}. Neither the European Commission nor ECMWF is responsible for any use that may be made of
        the Copernicus information or data it contains.
      </p>
      <p>
        Spotted something that looks wrong? Please <Link href="/contact" className="underline hover:text-brand-600">let us know</Link>.
      </p>
    </LegalLayout>
  );
}
