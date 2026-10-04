import Link from "next/link";
import { Flame, Snowflake, CloudRain, Wind, Sun, Umbrella, Shirt, Plane, TrendingUp, Compass, CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ShareBar } from "@/components/ShareBar";
import { AdSlot } from "@/components/AdSlot";
import { getCopy } from "@/lib/i18n/copy";
import { paths, pathFor, monthInfo, type AnyLocale } from "@/lib/i18n/routing";
import { cityName, countryName } from "@/lib/i18n/places";
import { TRENDING, LOCAL_REGION } from "@/lib/i18n/trending";
import { regionOf } from "@/lib/tripScore";
import { SKY_EMOJI, type CityDaily, type DailySnapshot } from "@/lib/services/dailyWeather";

/**
 * "Weather tomorrow" page — a sibling of WeatherTodayView, but built around
 * `c.tomorrow` instead of `c.today` and with its own copy namespace
 * (copy.tomorrowPage) so every heading, title and suggestion genuinely talks
 * about tomorrow. Exists because GSC showed "tiempo mañana" / "wetter
 * morgen" / "météo demain" style queries landing on the "today" page (whose
 * title says today) and getting ~0% CTR despite decent position — searchers
 * want a page that visibly answers "tomorrow", not a today page that
 * mentions tomorrow in passing.
 */

const WET = new Set(["drizzle", "rain", "storm", "snow"]);
const isWet = (c: CityDaily) => c.tomorrow.pop >= 60 || c.tomorrow.precip >= 3 || WET.has(c.tomorrow.sky);
const isDry = (c: CityDaily) => c.tomorrow.pop < 30 && c.tomorrow.precip < 1 && !WET.has(c.tomorrow.sky);

function maxBy<T>(items: T[], f: (x: T) => number): T | undefined {
  return items.reduce<T | undefined>((best, x) => (best === undefined || f(x) > f(best) ? x : best), undefined);
}

export function WeatherTomorrowView({ locale, snapshot }: { locale: AnyLocale; snapshot: DailySnapshot }) {
  const copy = getCopy(locale);
  const tc = copy.tomorrowPage;
  const region = LOCAL_REGION[locale];
  const cn = (c: CityDaily) => cityName(c.city.slug, c.city.name, locale);
  const kn = (c: CityDaily) => countryName(c.country.slug, c.country.name, locale);
  const href = (c: CityDaily) => paths.city(locale, c.country.slug, c.city.slug);

  const built = new Date(snapshot.builtAt);
  const tomorrowDate = new Date(built.getTime() + 24 * 60 * 60 * 1000);
  const dateStr = new Intl.DateTimeFormat(region.tag, { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: region.tz }).format(tomorrowDate);
  const timeStr = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(built);
  const monthNow = Number(new Intl.DateTimeFormat("en-GB", { month: "numeric", timeZone: region.tz }).format(built)) - 1;

  const all = snapshot.cities;
  const europe = all.filter((c) => regionOf(c.country.slug) === "Europe");
  const local = all.filter((c) => region.countries.includes(c.country.slug));
  const localOrEurope = local.length > 0 ? local : europe;
  const world = all.filter((c) => regionOf(c.country.slug) !== "Europe" && !region.countries.includes(c.country.slug));
  const worldOnePerCountry = world.filter((c, i, arr) => arr.findIndex((x) => x.country.slug === c.country.slug) === i);

  // Highlights for tomorrow (Europe-wide — the site's main audience).
  const hottest = maxBy(europe, (c) => c.tomorrow.tMax);
  const coldest = maxBy(europe, (c) => -c.tomorrow.tMin);
  const wettest = maxBy(europe, (c) => c.tomorrow.precip * 10 + c.tomorrow.pop / 10);
  const windiest = snapshot.live ? maxBy(europe, (c) => c.tomorrow.gust) : undefined;

  // Reader suggestions, built from tomorrow's numbers.
  const outdoor = maxBy(localOrEurope.filter(isDry), (c) => -Math.abs(c.tomorrow.tMax - 23)) ?? maxBy(europe.filter(isDry), (c) => -Math.abs(c.tomorrow.tMax - 23));
  const umbrella = localOrEurope.filter((c) => isWet(c)).sort((a, b) => b.tomorrow.pop - a.tomorrow.pop).slice(0, 3);
  const escape = maxBy(europe.filter(isDry), (c) => c.tomorrow.tMax);
  const windy = snapshot.live ? maxBy(localOrEurope.filter((c) => c.tomorrow.gust >= 55), (c) => c.tomorrow.gust) : undefined;
  const avg = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : 0);
  const packHi = avg(localOrEurope.map((c) => c.tomorrow.tMax));
  const packLo = avg(localOrEurope.map((c) => c.tomorrow.tMin));
  const packRain = localOrEurope.some((c) => isWet(c));

  const trending = TRENDING[locale];
  const mi = monthInfo(locale);
  const pageUrl = `${siteConfig.url}${paths.tomorrow(locale)}`;

  const highlights = [
    hottest && { icon: Flame, label: tc.hottest, c: hottest, value: `${hottest.tomorrow.tMax}°C`, tone: "from-orange-400 to-rose-500" },
    coldest && { icon: Snowflake, label: tc.coldest, c: coldest, value: `${coldest.tomorrow.tMin}°C`, tone: "from-sky-400 to-brand-600" },
    wettest && wettest.tomorrow.precip > 0 && { icon: CloudRain, label: tc.wettest, c: wettest, value: `${wettest.tomorrow.precip} mm`, tone: "from-brand-500 to-indigo-600" },
    windiest && { icon: Wind, label: tc.windiest, c: windiest, value: `${windiest.tomorrow.gust} km/h`, tone: "from-teal-400 to-cyan-600" },
    outdoor && { icon: Sun, label: tc.sunniest, c: outdoor, value: `${outdoor.tomorrow.tMax}°C`, tone: "from-amber-400 to-orange-500" },
  ].filter(Boolean) as Array<{ icon: typeof Flame; label: string; c: CityDaily; value: string; tone: string }>;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: tc.h1,
      description: tc.desc,
      url: pageUrl,
      inLanguage: locale,
      dateModified: snapshot.builtAt,
      isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: `${siteConfig.url}${paths.home(locale)}` },
        { "@type": "ListItem", position: 2, name: tc.h1, item: pageUrl },
      ],
    },
  ];

  const Row = ({ c }: { c: CityDaily }) => (
    <tr className="border-b border-slate-100 last:border-0 dark:border-white/5">
      <th scope="row" className="py-2.5 pr-3 text-left font-medium">
        <Link href={href(c)} className="text-slate-900 hover:text-brand-700 hover:underline dark:text-white">
          {cn(c)}
        </Link>
        <span className="block text-[11px] font-normal text-slate-400">{kn(c)}</span>
      </th>
      <td className="py-2.5 pr-3 text-sm">
        <span className="mr-1.5" aria-hidden="true">
          {SKY_EMOJI[c.tomorrow.sky]}
        </span>
        <span className="font-semibold text-slate-900 dark:text-white">{c.tomorrow.tMax}°</span>
        <span className="text-slate-400"> / {c.tomorrow.tMin}°</span>
        <span className="ml-2 whitespace-nowrap text-[11px] text-brand-600 dark:text-brand-300">
          {c.tomorrow.pop}% {copy.rainChance}
        </span>
        <span className="sr-only"> · {copy.sky[c.tomorrow.sky]}</span>
      </td>
      <td className="py-2.5 pr-3 text-xs text-slate-400">
        {c.today.tMax}° / {c.today.tMin}°
      </td>
    </tr>
  );

  const Table = ({ rows, caption }: { rows: CityDaily[]; caption: string }) => (
    <div className="relative overflow-x-auto rounded-xl3 border border-slate-200 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle sm:p-5">
      <table className="w-full min-w-[480px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-slate-200 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:border-white/10">
            <th scope="col" className="pb-2 pr-3">
              &nbsp;
            </th>
            <th scope="col" className="pb-2 pr-3">
              {copy.tomorrowCol}
            </th>
            <th scope="col" className="pb-2 pr-3">
              {copy.todayCol}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <Row key={`${c.country.slug}/${c.city.slug}`} c={c} />
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: copy.home, href: paths.home(locale) }, { label: tc.h1 }]} />

      <header className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 px-6 py-8 text-white shadow-soft sm:px-10 sm:py-10">
        <CalendarDays size={150} className="absolute -right-8 -top-8 text-white/10" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/80">{tc.kicker}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{tc.h1}</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">{tc.intro(dateStr)}</p>
          <p className="mt-3 text-[11px] font-medium text-white/70">
            <time dateTime={snapshot.builtAt}>{tc.updated(timeStr)}</time>
          </p>
          <Link href={paths.today(locale)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-2 hover:underline">
            {tc.backToToday}
          </Link>
        </div>
      </header>

      {!snapshot.live && <p className="mt-4 rounded-lg bg-amber-50 px-4 py-2.5 text-xs text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">{tc.fallback}</p>}

      {/* Highlights */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {highlights.map((h) => (
          <Link
            key={h.label}
            href={href(h.c)}
            className={`group rounded-xl2 bg-gradient-to-br ${h.tone} p-4 text-white shadow-soft transition-transform hover:-translate-y-0.5`}
          >
            <h.icon size={18} className="opacity-80" aria-hidden="true" />
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-white/80">{h.label}</p>
            <p className="text-2xl font-bold leading-tight">{h.value}</p>
            <p className="truncate text-xs text-white/90 group-hover:underline">
              {cn(h.c)}, {kn(h.c)}
            </p>
          </Link>
        ))}
      </div>

      {/* Suggestions */}
      <section className="mt-10" aria-labelledby="suggestions-heading">
        <h2 id="suggestions-heading" className="mb-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
          {tc.suggestionsH}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {outdoor && (
            <Suggestion icon={Sun} tone="text-amber-500" title={tc.sugOutdoor(cn(outdoor), outdoor.tomorrow.tMax)} text={copy.sugOutdoorText} href={href(outdoor)} />
          )}
          {umbrella.length > 0 ? (
            <Suggestion icon={Umbrella} tone="text-brand-500" title={tc.sugUmbrella(umbrella.map(cn).join(", "))} text={tc.sugUmbrellaText} href={href(umbrella[0]!)} />
          ) : (
            <Suggestion icon={Umbrella} tone="text-brand-500" title={tc.sugNoUmbrella} />
          )}
          <Suggestion icon={Shirt} tone="text-teal-500" title={tc.sugPackH} text={tc.sugPack(packHi, packLo, packRain)} />
          {escape && <Suggestion icon={Plane} tone="text-rose-500" title={tc.sugEscape(cn(escape), escape.tomorrow.tMax)} text={copy.sugEscapeText} href={href(escape)} />}
          {windy && <Suggestion icon={Wind} tone="text-cyan-600" title={tc.sugWind(cn(windy), windy.tomorrow.gust)} text={copy.sugWindText} href={href(windy)} />}
        </div>
      </section>

      {/* Local cities */}
      {local.length > 0 && (
        <section className="mt-10" aria-labelledby="local-heading">
          <h2 id="local-heading" className="mb-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {tc.localH(region.label)}
          </h2>
          <Table rows={local} caption={tc.localH(region.label)} />
        </section>
      )}

      <div className="mt-8">
        <AdSlot variant="banner" />
      </div>

      {/* Europe */}
      {europe.length > 0 && (
        <section className="mt-10" aria-labelledby="europe-heading">
          <h2 id="europe-heading" className="mb-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {copy.europeH}
          </h2>
          <Table
            rows={europe
              .filter((c) => !local.includes(c))
              .filter((c, i, arr) => arr.findIndex((x) => x.country.slug === c.country.slug) === i || c.city.population > 1500000)
              .slice(0, 20)}
            caption={copy.europeH}
          />
        </section>
      )}

      {/* World */}
      {worldOnePerCountry.length > 0 && (
        <section className="mt-10" aria-labelledby="world-heading">
          <h2 id="world-heading" className="mb-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {copy.worldH}
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {worldOnePerCountry.map((c) => (
              <li key={c.country.slug}>
                <Link
                  href={href(c)}
                  className="flex items-center justify-between gap-2 rounded-xl2 border border-slate-200 bg-white px-3.5 py-3 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-lg dark:border-white/10 dark:bg-surface-dark-subtle"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">{cn(c)}</span>
                    <span className="block truncate text-[11px] text-slate-400">{copy.sky[c.tomorrow.sky]}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="text-lg" aria-hidden="true">
                      {SKY_EMOJI[c.tomorrow.sky]}
                    </span>
                    <span className="block text-sm font-bold text-slate-900 dark:text-white">{c.tomorrow.tMax}°</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Trending + planning */}
      <section className="mt-10 grid gap-5 lg:grid-cols-5" aria-labelledby="trending-heading">
        <div className="rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle lg:col-span-3">
          <h2 id="trending-heading" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <TrendingUp size={18} className="text-rose-500" aria-hidden="true" /> {copy.trendingH}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{copy.trendingText}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {trending.items.map((t) => (
              <li key={t.q}>
                <Link
                  href={pathFor(locale, t.ref)}
                  className="inline-block rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-600 hover:text-white dark:bg-white/5 dark:text-slate-200"
                >
                  {t.q}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={paths.whereToGo(locale, monthNow)}
                className="inline-block rounded-full bg-emerald-100 px-3.5 py-1.5 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-600 hover:text-white dark:bg-emerald-500/15 dark:text-emerald-200"
              >
                {trending.where(mi.monthNames[monthNow]!, mi.inMonth[monthNow]!)}
              </Link>
            </li>
          </ul>
        </div>
        <Link
          href={paths.tripFinder(locale)}
          className="group relative overflow-hidden rounded-xl3 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-6 text-white shadow-soft transition-all hover:-translate-y-1 lg:col-span-2"
        >
          <Compass size={110} className="absolute -bottom-6 -right-6 text-white/15" aria-hidden="true" />
          <p className="text-lg font-bold">{copy.cardTrip.title}</p>
          <p className="mt-1 max-w-xs text-sm text-white/85">{copy.cardTrip.text}</p>
          <span className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-700">{copy.cardTrip.cta} →</span>
        </Link>
      </section>

      <ShareBar className="mt-8" url={pageUrl} title={tc.title} />
    </div>
  );
}

function Suggestion({ icon: Icon, tone, title, text, href }: { icon: typeof Sun; tone: string; title: string; text?: string; href?: string }) {
  const inner = (
    <>
      <Icon size={22} className={`shrink-0 ${tone}`} aria-hidden="true" />
      <span>
        <span className="block text-sm font-bold text-slate-900 dark:text-white">{title}</span>
        {text && <span className="mt-1 block text-sm leading-relaxed text-slate-500 dark:text-slate-400">{text}</span>}
      </span>
    </>
  );
  const cls = "flex h-full gap-3 rounded-xl3 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle";
  return href ? (
    <Link href={href} className={`${cls} transition-all hover:-translate-y-0.5 hover:shadow-soft-lg`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
