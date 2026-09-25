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

const WET = new Set(["drizzle", "rain", "storm", "snow"]);
const isWet = (c: CityDaily, day: "today" | "tomorrow" = "today") => c[day].pop >= 60 || c[day].precip >= 3 || WET.has(c[day].sky);
const isDry = (c: CityDaily) => c.today.pop < 30 && c.today.precip < 1 && !WET.has(c.today.sky);

function maxBy<T>(items: T[], f: (x: T) => number): T | undefined {
  return items.reduce<T | undefined>((best, x) => (best === undefined || f(x) > f(best) ? x : best), undefined);
}

export function WeatherTodayView({ locale, snapshot }: { locale: AnyLocale; snapshot: DailySnapshot }) {
  const copy = getCopy(locale);
  const region = LOCAL_REGION[locale];
  const cn = (c: CityDaily) => cityName(c.city.slug, c.city.name, locale);
  const kn = (c: CityDaily) => countryName(c.country.slug, c.country.name, locale);
  const href = (c: CityDaily) => paths.city(locale, c.country.slug, c.city.slug);

  const built = new Date(snapshot.builtAt);
  const dateStr = new Intl.DateTimeFormat(region.tag, { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: region.tz }).format(built);
  const timeStr = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" }).format(built);
  const monthNow = Number(new Intl.DateTimeFormat("en-GB", { month: "numeric", timeZone: region.tz }).format(built)) - 1;

  const all = snapshot.cities;
  const europe = all.filter((c) => regionOf(c.country.slug) === "Europe");
  const local = all.filter((c) => region.countries.includes(c.country.slug));
  const localOrEurope = local.length > 0 ? local : europe;
  const europeRest = europe.filter((c) => !region.countries.includes(c.country.slug));
  const world = all.filter((c) => regionOf(c.country.slug) !== "Europe" && !region.countries.includes(c.country.slug));
  const worldOnePerCountry = world.filter((c, i, arr) => arr.findIndex((x) => x.country.slug === c.country.slug) === i);

  // Highlights (Europe-wide — the site's main audience).
  const hottest = maxBy(europe, (c) => c.today.tMax);
  const coldest = maxBy(europe, (c) => -c.today.tMin);
  const wettest = maxBy(europe, (c) => c.today.precip * 10 + c.today.pop / 10);
  const windiest = snapshot.live ? maxBy(europe, (c) => c.today.gust) : undefined;

  // Reader suggestions.
  const outdoor = maxBy(localOrEurope.filter(isDry), (c) => -Math.abs(c.today.tMax - 23)) ?? maxBy(europe.filter(isDry), (c) => -Math.abs(c.today.tMax - 23));
  const umbrella = localOrEurope.filter((c) => isWet(c)).sort((a, b) => b.today.pop - a.today.pop).slice(0, 3);
  const escape = maxBy(europe.filter(isDry), (c) => c.today.tMax);
  const windy = snapshot.live ? maxBy(localOrEurope.filter((c) => c.today.gust >= 55), (c) => c.today.gust) : undefined;
  const avg = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : 0);
  const packHi = avg(localOrEurope.map((c) => c.today.tMax));
  const packLo = avg(localOrEurope.map((c) => c.today.tMin));
  const packRain = localOrEurope.some((c) => isWet(c));

  // Tomorrow's outlook (local first, then the rest of Europe).
  const outlookPool = [...local, ...europeRest];
  const names = (xs: CityDaily[]) => xs.slice(0, 4).map(cn).join(", ");
  const warmer = outlookPool.filter((c) => c.tomorrow.tMax - c.today.tMax >= 3);
  const cooler = outlookPool.filter((c) => c.tomorrow.tMax - c.today.tMax <= -3);
  const rainier = outlookPool.filter((c) => isWet(c, "tomorrow") && !isWet(c));

  const trending = TRENDING[locale];
  const mi = monthInfo(locale);
  const pageUrl = `${siteConfig.url}${paths.today(locale)}`;

  const highlights = [
    hottest && { icon: Flame, label: copy.hottest, c: hottest, value: `${hottest.today.tMax}°C`, tone: "from-orange-400 to-rose-500" },
    coldest && { icon: Snowflake, label: copy.coldest, c: coldest, value: `${coldest.today.tMin}°C`, tone: "from-sky-400 to-brand-600" },
    wettest && wettest.today.precip > 0 && { icon: CloudRain, label: copy.wettest, c: wettest, value: `${wettest.today.precip} mm`, tone: "from-brand-500 to-indigo-600" },
    windiest && { icon: Wind, label: copy.windiest, c: windiest, value: `${windiest.today.gust} km/h`, tone: "from-teal-400 to-cyan-600" },
    outdoor && { icon: Sun, label: copy.sunniest, c: outdoor, value: `${outdoor.today.tMax}°C`, tone: "from-amber-400 to-orange-500" },
  ].filter(Boolean) as Array<{ icon: typeof Flame; label: string; c: CityDaily; value: string; tone: string }>;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: copy.todayH1,
      description: copy.todayDesc,
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
        { "@type": "ListItem", position: 2, name: copy.todayH1, item: pageUrl },
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
      {(["today", "tomorrow"] as const).map((d) => (
        <td key={d} className="py-2.5 pr-3 text-sm">
          <span className="mr-1.5" aria-hidden="true">
            {SKY_EMOJI[c[d].sky]}
          </span>
          <span className="font-semibold text-slate-900 dark:text-white">{c[d].tMax}°</span>
          <span className="text-slate-400"> / {c[d].tMin}°</span>
          <span className="ml-2 whitespace-nowrap text-[11px] text-brand-600 dark:text-brand-300">
            {c[d].pop}% {copy.rainChance}
          </span>
          <span className="sr-only"> · {copy.sky[c[d].sky]}</span>
        </td>
      ))}
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
              {copy.todayCol}
            </th>
            <th scope="col" className="pb-2 pr-3">
              {copy.tomorrowCol}
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
      <Breadcrumb items={[{ label: copy.home, href: paths.home(locale) }, { label: copy.todayH1 }]} />

      <header className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-brand-600 via-indigo-600 to-sky-500 px-6 py-8 text-white shadow-soft sm:px-10 sm:py-10">
        <CalendarDays size={150} className="absolute -right-8 -top-8 text-white/10" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/80">{copy.todayKicker}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{copy.todayH1}</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">{copy.todayIntro(dateStr)}</p>
          <p className="mt-3 text-[11px] font-medium text-white/70">
            <time dateTime={snapshot.builtAt}>{copy.todayUpdated(timeStr)}</time>
          </p>
        </div>
      </header>

      {!snapshot.live && (
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-2.5 text-xs text-amber-800 dark:bg-amber-950/30 dark:text-amber-300">{copy.todayFallback}</p>
      )}

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
          {copy.suggestionsH}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {outdoor && (
            <Suggestion icon={Sun} tone="text-amber-500" title={copy.sugOutdoor(cn(outdoor), outdoor.today.tMax)} text={copy.sugOutdoorText} href={href(outdoor)} />
          )}
          {umbrella.length > 0 ? (
            <Suggestion icon={Umbrella} tone="text-brand-500" title={copy.sugUmbrella(umbrella.map(cn).join(", "))} text={copy.sugUmbrellaText} href={href(umbrella[0]!)} />
          ) : (
            <Suggestion icon={Umbrella} tone="text-brand-500" title={copy.sugNoUmbrella} />
          )}
          <Suggestion icon={Shirt} tone="text-teal-500" title={copy.sugPackH} text={copy.sugPack(packHi, packLo, packRain)} />
          {escape && (
            <Suggestion icon={Plane} tone="text-rose-500" title={copy.sugEscape(cn(escape), escape.today.tMax)} text={copy.sugEscapeText} href={href(escape)} />
          )}
          {windy && <Suggestion icon={Wind} tone="text-cyan-600" title={copy.sugWind(cn(windy), windy.today.gust)} text={copy.sugWindText} href={href(windy)} />}
        </div>
      </section>

      {/* Local cities */}
      {local.length > 0 && (
        <section className="mt-10" aria-labelledby="local-heading">
          <h2 id="local-heading" className="mb-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {copy.localH(region.label)}
          </h2>
          <Table rows={local} caption={copy.localH(region.label)} />
        </section>
      )}

      {/* Tomorrow */}
      <section className="mt-10 rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle" aria-labelledby="tomorrow-heading">
        <h2 id="tomorrow-heading" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <CalendarDays size={18} className="text-brand-500" aria-hidden="true" /> {copy.tomorrowH}
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {warmer.length > 0 && <li>🔺 {copy.tomorrowWarmer(names(warmer))}</li>}
          {cooler.length > 0 && <li>🔻 {copy.tomorrowCooler(names(cooler))}</li>}
          {rainier.length > 0 && <li>🌧️ {copy.tomorrowRainier(names(rainier))}</li>}
          {warmer.length + cooler.length + rainier.length === 0 && <li>{copy.tomorrowSteady}</li>}
        </ul>
      </section>

      <div className="mt-8">
        <AdSlot variant="banner" />
      </div>

      {/* Europe */}
      {europeRest.length > 0 && (
        <section className="mt-10" aria-labelledby="europe-heading">
          <h2 id="europe-heading" className="mb-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
            {copy.europeH}
          </h2>
          <Table rows={europeRest.filter((c, i, arr) => arr.findIndex((x) => x.country.slug === c.country.slug) === i || c.city.population > 1500000).slice(0, 20)} caption={copy.europeH} />
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
                    <span className="block truncate text-[11px] text-slate-400">{copy.sky[c.today.sky]}</span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className="text-lg" aria-hidden="true">
                      {SKY_EMOJI[c.today.sky]}
                    </span>
                    <span className="block text-sm font-bold text-slate-900 dark:text-white">{c.today.tMax}°</span>
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

      <ShareBar className="mt-8" url={pageUrl} title={copy.todayTitle} />
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
  const cls =
    "flex h-full gap-3 rounded-xl3 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle";
  return href ? (
    <Link href={href} className={`${cls} transition-all hover:-translate-y-0.5 hover:shadow-soft-lg`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
