import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudLightning,
  Snowflake,
  CloudSnow,
  Wind,
  type LucideProps,
} from "lucide-react";
import type { ConditionCode } from "@/types/weather";

const ICONS: Record<ConditionCode, typeof Sun> = {
  clear: Sun,
  "mostly-clear": Sun,
  "partly-cloudy": CloudSun,
  cloudy: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  "heavy-rain": CloudRainWind,
  thunderstorm: CloudLightning,
  snow: CloudSnow,
  sleet: Snowflake,
  windy: Wind,
};

const COLORS: Record<ConditionCode, string> = {
  clear: "text-amber-400",
  "mostly-clear": "text-amber-400",
  "partly-cloudy": "text-sky-500",
  cloudy: "text-slate-400",
  fog: "text-slate-400",
  drizzle: "text-sky-500",
  rain: "text-sky-600",
  "heavy-rain": "text-sky-700",
  thunderstorm: "text-violet-500",
  snow: "text-sky-300",
  sleet: "text-sky-300",
  windy: "text-teal-500",
};

interface WeatherIconProps extends LucideProps {
  condition: ConditionCode;
  colored?: boolean;
}

export function WeatherIcon({ condition, colored = true, className, ...rest }: WeatherIconProps) {
  const Icon = ICONS[condition] ?? Sun;
  return (
    <Icon
      aria-hidden="true"
      className={[colored ? COLORS[condition] : "", className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
