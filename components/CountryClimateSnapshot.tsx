import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { CountrySeed } from "@/config/world";
import { analyseCountryClimate } from "@/lib/content/countryClimate";
import { bestTimeCountryCopy } from "@/lib/i18n/bestTimeCountry";
import { monthInfo, paths, type AnyLocale } from "@/lib/i18n/routing";
import { joinList } from "@/lib/i18n/copy";

/**
 * Country-level monthly climate block for /weather/{country} pages.
 *
 * These pages used to be little more than a card grid (~800 characters of
 * real text for small countries), which is exactly the profile Google files
 * under "Crawled – currently not indexed". This adds figures that are
 * different for every country (12 monthly means plus its warmest, coolest,
 * wettest, driest and sunniest months) without any inflected country name in
 * a sentence — labels and numbers only — so the same strings are
 * grammatically safe in all eight languages.
 */
const SNAP: Record<AnyLocale, { h: (k: string) => string; intro: string; facts: [string, string, string, string, string, string]; hub: string }> = {
  en: {
    h: (k) => `${k}: monthly climate averages`,
    intro: "Country-wide averages built from the main destinations (2011–2020 records). Use them to judge what each month feels like before you open a city forecast.",
    facts: ["Warmest month", "Coolest month", "Wettest month", "Driest month", "Sunniest month", "Best window"],
    hub: "Full month-by-month planning guide",
  },
  it: {
    h: (k) => `${k}: medie climatiche mese per mese`,
    intro: "Medie nazionali calcolate sulle principali destinazioni (dati 2011–2020). Servono a capire com'è ogni mese prima di aprire la previsione di una città.",
    facts: ["Mese più caldo", "Mese più fresco", "Mese più piovoso", "Mese più secco", "Mese più soleggiato", "Periodo migliore"],
    hub: "Guida completa: quando andare",
  },
  de: {
    h: (k) => `${k}: Klimadurchschnitt Monat für Monat`,
    intro: "Landesweite Mittelwerte aus den wichtigsten Reisezielen (Daten 2011–2020). Sie zeigen, wie sich jeder Monat anfühlt, bevor Sie die Vorhersage einer Stadt öffnen.",
    facts: ["Wärmster Monat", "Kühlster Monat", "Nassester Monat", "Trockenster Monat", "Sonnigster Monat", "Beste Reisezeit"],
    hub: "Ausführlicher Reisezeit-Ratgeber",
  },
  fr: {
    h: (k) => `${k} : moyennes climatiques mois par mois`,
    intro: "Moyennes nationales calculées sur les principales destinations (données 2011–2020). Elles montrent ce que chaque mois donne avant d'ouvrir la prévision d'une ville.",
    facts: ["Mois le plus chaud", "Mois le plus frais", "Mois le plus pluvieux", "Mois le plus sec", "Mois le plus ensoleillé", "Meilleure période"],
    hub: "Guide complet : quand partir",
  },
  es: {
    h: (k) => `${k}: medias climáticas mes a mes`,
    intro: "Medias nacionales calculadas con los principales destinos (datos 2011–2020). Sirven para saber cómo es cada mes antes de abrir la previsión de una ciudad.",
    facts: ["Mes más cálido", "Mes más fresco", "Mes más lluvioso", "Mes más seco", "Mes más soleado", "Mejor época"],
    hub: "Guía completa: cuándo viajar",
  },
  pt: {
    h: (k) => `${k}: médias climáticas mês a mês`,
    intro: "Médias nacionais calculadas com os principais destinos (dados 2011–2020). Servem para perceber como é cada mês antes de abrir a previsão de uma cidade.",
    facts: ["Mês mais quente", "Mês mais fresco", "Mês mais chuvoso", "Mês mais seco", "Mês mais ensolarado", "Melhor época"],
    hub: "Guia completo: quando viajar",
  },
  nl: {
    h: (k) => `${k}: klimaatgemiddelden per maand`,
    intro: "Landelijke gemiddelden op basis van de belangrijkste bestemmingen (gegevens 2011–2020). Zo zie je hoe elke maand aanvoelt voordat je de verwachting van een stad opent.",
    facts: ["Warmste maand", "Koelste maand", "Natste maand", "Droogste maand", "Zonnigste maand", "Beste periode"],
    hub: "Volledige gids: beste reistijd",
  },
  pl: {
    h: (k) => `${k}: średnie klimatyczne miesiąc po miesiącu`,
    intro: "Średnie dla kraju policzone z głównych kierunków (dane 2011–2020). Pokazują, jak wygląda każdy miesiąc, zanim otworzysz prognozę dla miasta.",
    facts: ["Najcieplejszy miesiąc", "Najchłodniejszy miesiąc", "Najbardziej deszczowy miesiąc", "Najsuchszy miesiąc", "Najbardziej słoneczny miesiąc", "Najlepszy termin"],
    hub: "Pełny przewodnik: kiedy jechać",
  },
};

export function CountryClimateSnapshot({ locale, country, name }: { locale: AnyLocale; country: CountrySeed; name: string }) {
  const a = analyseCountryClimate(country);
  if (!a) return null;
  const s = SNAP[locale];
  const t = bestTimeCountryCopy(locale);
  const mn = monthInfo(locale).monthNames;
  const facts: Array<[string, string]> = [
    [s.facts[0], `${mn[a.warmest]} · ${a.tMax[a.warmest]}°C`],
    [s.facts[1], `${mn[a.coolest]} · ${a.tMax[a.coolest]}°C`],
    [s.facts[2], `${mn[a.wettest]} · ${a.precipMm[a.wettest]} mm`],
    [s.facts[3], `${mn[a.driest]} · ${a.precipMm[a.driest]} mm`],
    [s.facts[4], `${mn[a.sunniest]} · ${a.cloud[a.sunniest]}%`],
    [s.facts[5], `${joinList(locale, a.best.map((m) => mn[m]!))} · ${a.bestLo}–${a.bestHi}°C`],
  ];
  return (
    <section className="mt-12" aria-labelledby="country-snapshot-heading">
      <h2 id="country-snapshot-heading" className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
        <CalendarDays size={20} className="text-brand-500" aria-hidden="true" /> {s.h(name)}
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.intro}</p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map(([label, value]) => (
          <div key={label} className="rounded-xl2 border border-slate-200 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</dt>
            <dd className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 overflow-x-auto rounded-xl3 border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400 dark:border-white/10">
              {t.cols.map((c) => (
                <th key={c} scope="col" className="px-4 py-3 font-semibold">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mn.map((m, i) => (
              <tr key={m} className="border-b border-slate-100 last:border-0 dark:border-white/5">
                <th scope="row" className="px-4 py-2.5 font-semibold text-slate-900 dark:text-white">{m}</th>
                <td className="px-4 py-2.5 tabular-nums">{a.tMax[i]}°C</td>
                <td className="px-4 py-2.5 tabular-nums">{a.tMin[i]}°C</td>
                <td className="px-4 py-2.5 tabular-nums">{a.precipMm[i]} mm</td>
                <td className="px-4 py-2.5 tabular-nums">{a.cloud[i]}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm">
        <Link href={paths.bestTimeCountry(locale, country.slug)} className="font-semibold text-brand-700 hover:underline dark:text-brand-300">
          {t.h1(name)} →
        </Link>{" "}
        <span className="text-slate-500 dark:text-slate-400">{s.hub}</span>
      </p>
    </section>
  );
}
