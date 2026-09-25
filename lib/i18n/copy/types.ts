/**
 * Shape of the page copy for every language version of the site.
 *
 * Sentences are functions (not templates with {placeholders}) so each
 * language can build grammatical sentences — word order, prepositions
 * ("a Roma", "au Caire", "no Porto", "w Rzymie") and agreement differ too
 * much between languages for simple string substitution.
 *
 * The indices passed to the describe-style helpers are:
 *   temp: 0 very hot · 1 hot · 2 warm · 3 mild · 4 cool · 5 cold · 6 freezing
 *   rain: 0 very dry · 1 fairly dry · 2 some rain · 3 wet · 4 very wet
 *   sky:  0 mostly sunny · 1 mix of sun and cloud · 2 often cloudy
 */
import type { WeatherStyle } from "@/lib/tripScore";

export type PackKey =
  | "light"
  | "sunhat"
  | "water"
  | "tshirts"
  | "shoes"
  | "sweater"
  | "jacket"
  | "coat"
  | "winterAcc"
  | "thermals"
  | "extraLayer"
  | "umbrella"
  | "waterproofShoes"
  | "smallUmbrella"
  | "sunglasses"
  | "quickDry";

export type Sky = "clear" | "partly" | "cloudy" | "fog" | "drizzle" | "rain" | "snow" | "storm";

export interface MonthSummaryArgs {
  city: string;
  m: number;
  temp: number;
  rain: number;
  sky: number;
  hi: number;
  lo: number;
  hiF: number;
  loF: number;
  mm: number;
  /** Rounded °C difference of this month's high vs previous / next month. */
  dPrev: number;
  dNext: number;
}

/** Strings used by the interactive (client-side) trip finder — plain data only. */
export interface TripUi {
  step1: string;
  step2: string;
  step3: string;
  anywhere: string;
  avoidRain: string;
  share: string;
  copied: string;
  shareTitle: string;
  /** "{month}" is replaced with the month name. */
  bestMatches: string;
  high: string;
  low: string;
  rain: string;
  score: string;
  /** "{month}" is replaced. */
  seeDetails: string;
  showTop: string;
  /** "{n}" is replaced. */
  showAll: string;
  scoreLabels: [string, string, string, string];
  monthShort: string[];
  monthNames: string[];
  styles: Record<WeatherStyle, { label: string; blurb: string }>;
  regions: Record<string, string>;
}

export interface Copy {
  monthShort: string[];
  home: string;
  highsRange: (min: number, max: number) => string;
  viewForecast: string;
  /** "in Rome" with the right preposition/case for this language. */
  inCity: (city: string) => string;

  // Home -------------------------------------------------------------------
  homeTitle: string;
  homeDesc: string;
  homeH1: string;
  homeIntro: string;
  homeLocal: (country: string) => string;
  homeEurope: string;
  homeWorld: string;
  homeCountries: string;
  cardToday: { title: string; text: string; cta: string };
  cardTrip: { title: string; text: string; cta: string };
  cardWhere: { title: string; text: string };
  guidesNote: string;
  guidesLink: string;

  // Country -----------------------------------------------------------------
  countryTitle: (country: string) => string;
  countryDesc: (country: string, cities: string) => string;
  countryH1: (country: string) => string;
  countryIntro: (country: string, n: number) => string;
  countryCitiesH: (country: string) => string;
  countryMonthsH: string;
  countryMonthsText: (country: string) => string;

  // City forecast -------------------------------------------------------------
  cityTitle: (city: string) => string;
  cityDesc: (city: string) => string;
  cityH1: (city: string) => string;
  cityIntro: (city: string, country: string) => string;
  sourcesDown: (n: number, total: number) => string;
  unavailable: string;
  byMonthH: (city: string) => string;
  byMonthSub: string;
  shareCity: (city: string) => string;
  shareCityTitle: (city: string) => string;
  aboutH: (city: string) => string;
  aboutText: (city: string, country: string, lat: string, lon: string) => string;
  faqH: string;
  faqTempQ: (city: string) => string;
  faqTempA: (city: string, t: number, feels: number, source: string) => string;
  faqRainQ: (city: string) => string;
  faqRainA: (city: string, pct: number, source: string) => string;
  faqTomorrowQ: (city: string) => string;
  faqTomorrowA: (city: string, hi: number, lo: number, pct: number) => string;
  faqTenQ: (city: string) => string;
  faqTenA: (city: string) => string;
  nearby: string;
  englishGuide: (city: string) => string;
  moreCountries: (n: number) => string;

  // Month climate -------------------------------------------------------------
  monthTitle: (city: string, m: number) => string;
  monthDesc: (city: string, m: number, hi: number, lo: number, mm: number) => string;
  monthKicker: string;
  monthH1: (city: string, m: number) => string;
  monthSummary: (a: MonthSummaryArgs) => string;
  factWarmest: (city: string, m: number) => string;
  factCoolest: (city: string, m: number) => string;
  factDriest: string;
  factWettest: string;
  stat: { high: string; low: string; rain: string; humidity: string; relative: string; sky: string; cloud: string };
  tempLabels: string[];
  rainLabels: string[];
  skyLabels: string[];
  liveForecast: (city: string) => string;
  whereElse: (m: number) => string;
  packH: (m: number) => string;
  pack: Record<PackKey, string>;
  packGuide: string;
  goodTimeH: (city: string, m: number) => string;
  bestMonthsText: (city: string, months: string, isGood: boolean, m: number) => string;
  otherCitiesH: (country: string, m: number) => string;
  quickAnswersH: (city: string, m: number) => string;
  faqWarmQ: (city: string, m: number) => string;
  faqWarmA: (hi: number, hiF: number, lo: number, loF: number) => string;
  faqWetQ: (city: string, m: number) => string;
  faqWetA: (city: string, m: number, mm: number, rainLabel: string) => string;
  faqBestQ: (city: string) => string;
  faqBestA: (city: string, months: string) => string;
  cityInMonth: (city: string, m: number) => string;
  monthFoot: (city: string) => string;
  monthFootLink: string;

  // Charts ------------------------------------------------------------------
  chartH: (city: string) => string;
  chartLegendTemp: string;
  chartLegendRain: string;
  chartTableToggle: string;
  chartCaption: (city: string) => string;
  chartCols: [string, string, string, string, string, string];
  monthLinksSub: string;

  // Where to go -------------------------------------------------------------
  whereTitle: (m: number) => string;
  whereDesc: (m: number) => string;
  whereH1: (m: number) => string;
  whereIntro: (m: number) => string;
  whereCustomise: string;
  whereStyleH: (styleLabel: string, m: number) => string;
  whereRain: string;
  whereFoot: string;
  wherePrevNext: (m: number) => string;
  whereMonthsH: string;

  // Trip finder ---------------------------------------------------------------
  tripTitle: string;
  tripDesc: string;
  tripH1: string;
  tripIntro: (n: number) => string;
  tripCrumb: string;
  trip: Omit<TripUi, "monthShort" | "monthNames">;

  // Weather today (daily trends) -----------------------------------------------
  todayTitle: string;
  todayDesc: string;
  todayH1: string;
  todayKicker: string;
  todayIntro: (date: string) => string;
  todayUpdated: (time: string) => string;
  todayFallback: string;
  hottest: string;
  coldest: string;
  wettest: string;
  windiest: string;
  sunniest: string;
  todayCol: string;
  tomorrowCol: string;
  localH: (region: string) => string;
  europeH: string;
  worldH: string;
  tomorrowH: string;
  tomorrowWarmer: (cities: string) => string;
  tomorrowCooler: (cities: string) => string;
  tomorrowRainier: (cities: string) => string;
  tomorrowSteady: string;
  suggestionsH: string;
  sugOutdoor: (city: string, t: number) => string;
  sugOutdoorText: string;
  sugUmbrella: (cities: string) => string;
  sugUmbrellaText: string;
  sugNoUmbrella: string;
  sugPackH: string;
  sugPack: (hi: number, lo: number, rainy: boolean) => string;
  sugEscape: (city: string, t: number) => string;
  sugEscapeText: string;
  sugWind: (city: string, kmh: number) => string;
  sugWindText: string;
  trendingH: string;
  trendingText: string;
  sky: Record<Sky, string>;
  rainChance: string;
  wind: string;
}
