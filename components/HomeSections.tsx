"use client";

import { Layers, ShieldCheck, Gauge } from "lucide-react";
import { useTranslations } from "@/lib/i18n/I18nProvider";
import { CityGrid } from "./CityGrid";
import { AdSlot } from "./AdSlot";
import { popularCities, europeanHighlights } from "@/config/countries";

export function HomeSections() {
  const t = useTranslations();
  const italy = popularCities(8);
  const europe = europeanHighlights(8);

  return (
    <div className="container-page space-y-16 py-16">
      <CityGrid title={t("home.italySection")} items={italy} />
      <AdSlot variant="banner" />
      <CityGrid title={t("home.europeSection")} items={europe} />

      <section className="rounded-xl3 border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-surface-dark-subtle sm:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{t("home.whyCompareTitle")}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-400">{t("home.whyCompareBody")}</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          <Feature icon={Layers} title="Multiple models" desc="Independent forecast providers, one dashboard." />
          <Feature icon={Gauge} title="Fast & responsive" desc="Optimized for Core Web Vitals on every device." />
          <Feature icon={ShieldCheck} title="Transparent sourcing" desc="Every figure is attributed to its source." />
        </div>
      </section>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: typeof Layers; title: string; desc: string }) {
  return (
    <div className="rounded-xl2 bg-slate-50 p-5 text-left dark:bg-white/5">
      <Icon className="text-brand-600 dark:text-brand-400" size={20} aria-hidden="true" />
      <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{desc}</p>
    </div>
  );
}
