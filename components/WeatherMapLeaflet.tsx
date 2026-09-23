"use client";

import "leaflet/dist/leaflet.css";
import { useMemo, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { GeoLocation, CurrentConditions } from "@/types/weather";
import { formatTemperature } from "@/lib/utils/units";
import type { TemperatureUnit } from "@/lib/hooks/usePreferences";

export type MapLayerKey = "temperature" | "precipitation" | "wind" | "clouds" | "satellite";

// OpenWeatherMap's free "map tiles" product — same free tier as the current
// conditions API, distinct from it, and designed to be requested directly
// from the browser (see NEXT_PUBLIC_OWM_MAP_KEY in .env.example).
const OWM_TILE_LAYERS: Partial<Record<MapLayerKey, string>> = {
  temperature: "temp_new",
  precipitation: "precipitation_new",
  wind: "wind_new",
  clouds: "clouds_new",
};

// Esri's public World Imagery basemap — no key required, standard practice
// for low/moderate-traffic sites; attribution is shown via AttributionControl.
const SATELLITE_TILE_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const OSM_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

// A simple inline-SVG pin, styled to match the brand color, instead of
// Leaflet's default marker images — sidesteps the well-known bundler asset
// path issue with leaflet's default icon in Next.js/webpack.
const pinIcon = L.divIcon({
  className: "",
  html: `<svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35))">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26s16-15 16-26C32 7.163 24.837 0 16 0z" fill="#0b1f49"/>
    <circle cx="16" cy="16" r="7" fill="#ffffff"/>
  </svg>`,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -38],
});

export function WeatherMapLeaflet({
  location,
  layer,
  mapKey,
  current,
  temperatureUnit,
}: {
  location: GeoLocation;
  layer: MapLayerKey;
  mapKey?: string;
  current?: CurrentConditions;
  temperatureUnit: TemperatureUnit;
}) {
  const center = useMemo<[number, number]>(() => [location.lat, location.lon], [location.lat, location.lon]);
  const owmLayerCode = layer !== "satellite" ? OWM_TILE_LAYERS[layer] : undefined;
  const overlayEnabled = Boolean(owmLayerCode && mapKey);
  const markerRef = useRef<L.Marker>(null);

  // Open the popup on load so the actual reading is visible immediately —
  // the coloured OWM tile overlay is a coarse, low-resolution gradient that
  // isn't precise enough to read a real number off, so the exact current
  // temperature for this city needs to be shown explicitly rather than left
  // for the visitor to infer from the map's colour.
  useEffect(() => {
    markerRef.current?.openPopup();
  }, [current]);

  return (
    <MapContainer center={center} zoom={9} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        url={layer === "satellite" ? SATELLITE_TILE_URL : OSM_TILE_URL}
        attribution={
          layer === "satellite"
            ? "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics"
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      />
      {overlayEnabled && (
        <TileLayer
          url={`https://tile.openweathermap.org/map/${owmLayerCode}/{z}/{x}/{y}.png?appid=${mapKey}`}
          attribution='Weather data &copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
          opacity={0.6}
        />
      )}
      <Marker position={center} icon={pinIcon} ref={markerRef}>
        <Popup autoClose={false} closeOnClick={false}>
          <strong>{location.name}</strong>
          {current ? (
            <>
              <br />
              {formatTemperature(current.temperature, temperatureUnit)} &middot; {current.conditionLabel}
              <br />
              Feels like {formatTemperature(current.feelsLike, temperatureUnit)}
            </>
          ) : (
            <>
              <br />
              Temperature unavailable
            </>
          )}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
