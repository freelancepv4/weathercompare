import type { Metadata } from "next";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { getForecastBundles } from "@/lib/services/weatherService";
import { getWeatherNews } from "@/lib/services/newsService";
import { locationFromSeed } from "@/lib/providers/geocoding";
import { siteConfig } from "@/config/site";
import { providerMetas } from "@/lib/providers/registry";

export const metadata: Metadata = {
  title: "System Status",
  description: `Live status of ${siteConfig.name}'s weather data providers and news feed.`,
  alternates: { canonical: "/status" },
  robots: { index: false, follow: true },
};

export const dynamic = "force-dynamic";

function StatusRow({ ok, label, detail }: { ok: boolean; label: string; detail?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-0 dark:border-white/5">
      <div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{label}</p>
        {detail && <p className="mt-0.5 text-xs text-slate-400">{detail}</p>}
      </div>
      {ok ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <CheckCircle2 size={13} aria-hidden="true" /> Operational
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
          <XCircle size={13} aria-hidden="true" /> Down
        </span>
      )}
    </div>
  );
}

export default async function StatusPage() {
  const location = locationFromSeed("italy", "rome");
  const [weatherResult, newsResult] = await Promise.allSettled([
    location ? getForecastBundles(location) : Promise.resolve({ bundles: [], errors: [] }),
    getWeatherNews(1),
  ]);

  const weather = weatherResult.status === "fulfilled" ? weatherResult.value : { bundles: [], errors: [] };
  const news = newsResult.status === "fulfilled" ? newsResult.value : { items: [], errors: [{ source: "news feed", message: "unreachable" }] };

  const healthyIds = new Set(weather.bundles.map((b) => b.provider.id));
  const allProviderIds = Object.values(providerMetas).map((m) => m.id);
  const allWeatherOk = allProviderIds.length > 0 && allProviderIds.every((id) => healthyIds.has(id));
  const overallOk = allWeatherOk && news.errors.length === 0;

  return (
    <div className="container-page max-w-2xl py-12 sm:py-16">
      <div className="flex items-center gap-3">
        {overallOk ? (
          <CheckCircle2 className="text-emerald-500" size={28} aria-hidden="true" />
        ) : (
          <AlertTriangle className="text-amber-500" size={28} aria-hidden="true" />
        )}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {overallOk ? "All systems operational" : "Some systems degraded"}
        </h1>
      </div>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Live status, checked on every load of this page. Machine-readable version at{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">/api/health</code> — point an uptime monitor there.
      </p>

      <div className="mt-8 rounded-xl3 border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-surface-dark-subtle sm:p-8">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-400">Weather providers</h2>
        {siteConfig.demoMode ? (
          <p className="py-3 text-sm text-slate-500 dark:text-slate-400">
            This deployment is running in demo mode — providers below reflect the mock data engine, not live third-party APIs.
          </p>
        ) : (
          Object.values(providerMetas).map((meta) => (
            <StatusRow key={meta.id} ok={healthyIds.has(meta.id)} label={meta.name} detail={meta.attributionLabel} />
          ))
        )}

        <h2 className="mb-1 mt-6 text-sm font-semibold uppercase tracking-wide text-slate-400">Content</h2>
        <StatusRow
          ok={news.errors.length === 0}
          label="News feed"
          detail={news.errors.length > 0 ? news.errors.map((e) => e.message).join("; ") : `${news.items.length}+ items fetched successfully`}
        />
      </div>

      <p className="mt-6 text-center text-xs text-slate-400">Last checked: {new Date().toUTCString()}</p>
    </div>
  );
}
