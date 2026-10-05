# WeatherCompare

A premium, production-oriented weather comparison platform: search any city
across Italy and Europe, see current conditions, hourly/daily forecasts,
rain, wind, alerts, and a side-by-side comparison of multiple independent
weather data sources — all in one fast, multilingual, accessible interface.

Runs entirely on realistic **demo data** out of the box — no API keys
required. Flip one environment variable to switch to real weather providers.

---

## Tech stack

- **Next.js 14** (App Router) + **TypeScript** + **React 18**
- **Tailwind CSS** for styling (custom design tokens in `tailwind.config.ts`)
- **Recharts** for the forecast comparison chart and rain timeline
- **lucide-react** for icons
- No database required — favorites/recent searches/preferences live in
  `localStorage`; forecast data is fetched server-side and cached at the edge

## Project structure

```
app/                         Next.js App Router pages & API routes
  page.tsx                   Homepage
  weather/[country]/[city]/  SEO-friendly city forecast pages (ISR)
  favorites/                 Saved locations (client, localStorage)
  about/ contact/ data-sources/ privacy/ cookies/ terms/ api-docs/
  api/
    geocode/route.ts         Location search endpoint
    providers/providerA|B|C/ One route per comparison source
    contact/route.ts         Validated contact form endpoint (no backend yet)
  sitemap.ts robots.ts manifest.ts    Dynamic SEO infrastructure
components/                  All UI components (Header, Footer, Search,
                              WeatherDashboard, ForecastComparison,
                              HourlyForecast, DailyForecast, WeatherAlerts,
                              WeatherMap, LanguageSelector, UnitSelector,
                              ThemeToggle, CookieConsent, LoadingSkeleton,
                              ErrorState, ...)
lib/
  providers/                 WeatherProvider interface + mock + adapters
    mockData.ts mockProvider.ts   Deterministic demo data engine
    openweather.ts weatherapi.ts meteomatics.ts   Real adapter stubs
    registry.ts               Chooses mock vs. real providers (DEMO_MODE)
    geocoding.ts               Location search abstraction
  services/weatherService.ts  Parallel fan-out + "forecast agreement" math
  i18n/                       Dictionary loader + React context/provider
  hooks/                      usePreferences, useFavorites (localStorage)
  utils/                      Unit conversion, date formatting
locales/                     en.json it.json de.json fr.json es.json
config/
  site.ts                    Brand name, URL, demo-mode flag, locales
  countries.ts                Seed country/city dataset (used for SEO pages)
types/weather.ts             Canonical domain types shared everywhere
public/                      Favicon, app icons
```

## Getting started (local development)

```bash
npm install
cp .env.example .env.local     # demo mode works with zero changes
npm run dev
```

Open http://localhost:3000 — the whole site works immediately in demo mode.

## Going live with real weather data

1. Pick your providers (see `/data-sources` in the running app for
   suggestions and required diligence). Common choices: Open-Meteo,
   OpenWeatherMap, WeatherAPI.com, Meteomatics.
2. **Verify each provider's current commercial licensing, attribution
   requirements and rate limits yourself** — this is not done for you.
3. Get API keys, then in `.env.local` (or your host's environment
   variables):
   ```
   DEMO_MODE=false
   WEATHER_API_KEY=...
   SECOND_WEATHER_API_KEY=...
   THIRD_WEATHER_API_KEY=...
   ```
4. Implement the three `IMPLEMENT REAL CALL HERE` blocks in
   `lib/providers/openweather.ts`, `weatherapi.ts` and `meteomatics.ts`,
   mapping each provider's response onto the shared types in
   `types/weather.ts`. Nothing else in the app needs to change — every
   component only ever talks to that shared interface.
5. (Optional) Connect a real geocoding API in
   `lib/providers/geocoding.ts` to search beyond the bundled seed cities.
6. (Optional) Connect a weather-map tile provider in
   `components/WeatherMap.tsx`.

## Adding a language

1. Copy `locales/en.json` to `locales/xx.json` and translate every string.
2. Add `"xx"` to `siteConfig.locales` in `config/site.ts`.
3. Import and register it in `lib/i18n/dictionaries.ts`.

No component code needs to change — every user-facing string is looked up
through `useTranslations()`.

## Adding a city / country

Add an entry to `config/countries.ts`. The new city automatically gets:
a `/weather/{country}/{city}` page (statically generated + revalidated
every 10 minutes), a sitemap entry, and appears in "Popular locations" /
"Nearby cities" where relevant.

## SEO

- Semantic HTML, one `<h1>` per page, structured heading hierarchy
- Per-page `<title>`/description via Next.js Metadata API, canonical URLs
- Open Graph + Twitter card metadata
- JSON-LD: `WebSite` (homepage), `BreadcrumbList` + `WebPage` + `FAQPage`
  (city pages)
- `app/sitemap.ts` — dynamic, generated from `config/countries.ts`
- `app/robots.ts` — disallows `/api/*`, allows everything else

## Performance

- Server-rendered city pages with ISR (`revalidate = 600`) — fast TTFB,
  fresh-enough data, no client waterfall for the initial view
- Edge caching on provider API routes (`Cache-Control: s-maxage=600`)
- No client-side data fetch required for the primary city-page content
- Minimal client JS: interactivity (units, theme, language, favorites,
  charts) is isolated to small client components
- `next/image`-ready image config; no external render-blocking fonts by
  default (system font stack) — swap in a self-hosted webfont if desired

## Accessibility

- Skip-to-content link, semantic landmarks, visible focus states
- Keyboard-navigable search (arrow keys + Enter/Escape), ARIA roles on
  comboboxes/listboxes/tabs
- `prefers-reduced-motion` respected for all animations
- Color choices checked for reasonable contrast in both themes

## Privacy / GDPR

- Cookie consent banner with granular categories (Necessary, Analytics,
  Advertising, Preferences) — no pre-ticked non-essential boxes
- Geolocation only requested on explicit user action, never silently
- `/privacy`, `/cookies`, `/terms`, `/data-sources` placeholder pages —
  **have these reviewed by a qualified professional before launch**

## Monetization readiness

- No ads are currently shown (the Adsterra `AdSlot` component was removed);
  add a new ad component gated behind the "Advertising" cookie-consent
  category when ready
- Architecture supports adding: user accounts, saved cities synced to a
  backend, push/email notifications, historical weather, a public API,
  premium (ad-free) tier, embeddable widgets — without restructuring
  existing code

## Deployment

### Vercel (recommended)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import it in Vercel — it auto-detects Next.js.
3. Add the environment variables from `.env.example` in the Vercel
   project settings.
4. Connect your custom domain (e.g. `weathercompare.it`) in Vercel's
   Domains tab; Vercel provisions HTTPS automatically.

### Netlify / Cloudflare Pages

Both support Next.js via their respective adapters (`@netlify/plugin-nextjs`,
Cloudflare's `next-on-pages`). Server-rendered routes (API routes, ISR city
pages) need their Next.js runtime support — check current compatibility
before choosing.

### Traditional VPS / shared hosting

This is a **server-rendered** Next.js app (API routes + ISR), so it needs a
Node.js runtime — plain static shared hosting (upload-your-HTML-files style)
is **not** sufficient. On a VPS: `npm run build && npm run start` behind a
reverse proxy (Nginx/Caddy) with a process manager (pm2/systemd), and a
Let's Encrypt certificate for HTTPS.

### Caching in production

Provider API responses are cached for 10 minutes at the edge/CDN
(`Cache-Control: s-maxage=600, stale-while-revalidate=1200`). City pages use
Next.js ISR with the same 10-minute revalidation window. Adjust both in
tandem if you change provider rate limits.

## Estimated running costs (small launch)

- Hosting: Vercel Hobby (free) or Pro (~$20/mo) depending on traffic
- Domain: ~€10–15/year
- Weather APIs: most providers offer a free tier sufficient for early
  traffic; costs scale with request volume — check current pricing
- Analytics: free (Plausible/GA4 free tier) to ~$9/mo depending on choice

Realistically **€0–40/month** to start; re-evaluate provider tiers as
traffic grows.

## Legal reminders

- Never scrape weather websites (Google Weather, Apple Weather,
  AccuWeather, Weather.com, Meteoblue, etc.) — use licensed APIs only.
- Verify each weather API's current commercial terms before launch; none
  are guaranteed or reproduced in this codebase.
- Have `/privacy`, `/cookies`, `/terms` reviewed by a qualified legal
  professional for your jurisdiction before going live with real users.
