"use client";

import { useState } from "react";
import { Quote, Copy, Check, Code2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";

/**
 * "Cite or embed this data" box.
 *
 * Climate sites earn most of their backlinks as *citations*: journalists,
 * bloggers and researchers quote a typical temperature and link the source.
 * This box makes that effortless — a ready-to-paste citation and an embed
 * snippet — and both include a plain <a href> to the page (a link inside
 * an iframe does not count as a backlink, so the embed code adds one below
 * the widget).
 */
const L = {
  en: { h: "Cite or embed this data", p: "Writing about this destination? Copy a ready-made citation or embed a live widget — free, just keep the link.", cite: "Citation", html: "HTML link", embed: "Embed widget", copy: "Copy", copied: "Copied" },
  it: { h: "Cita o incorpora questi dati", p: "Scrivi di questa destinazione? Copia una citazione pronta o incorpora un widget: è gratis, basta mantenere il link.", cite: "Citazione", html: "Link HTML", embed: "Widget da incorporare", copy: "Copia", copied: "Copiato" },
  de: { h: "Daten zitieren oder einbetten", p: "Sie schreiben über dieses Reiseziel? Kopieren Sie ein fertiges Zitat oder betten Sie ein Widget ein – kostenlos, bitte mit Link.", cite: "Zitat", html: "HTML-Link", embed: "Widget einbetten", copy: "Kopieren", copied: "Kopiert" },
  fr: { h: "Citer ou intégrer ces données", p: "Vous écrivez sur cette destination ? Copiez une citation prête à l'emploi ou intégrez un widget : gratuit, en gardant le lien.", cite: "Citation", html: "Lien HTML", embed: "Widget à intégrer", copy: "Copier", copied: "Copié" },
  es: { h: "Cita o inserta estos datos", p: "¿Escribes sobre este destino? Copia una cita lista o inserta un widget: gratis, solo mantén el enlace.", cite: "Cita", html: "Enlace HTML", embed: "Widget para insertar", copy: "Copiar", copied: "Copiado" },
  pt: { h: "Cite ou incorpore estes dados", p: "Está a escrever sobre este destino? Copie uma citação pronta ou incorpore um widget: grátis, basta manter o link.", cite: "Citação", html: "Link HTML", embed: "Widget para incorporar", copy: "Copiar", copied: "Copiado" },
  nl: { h: "Deze gegevens citeren of insluiten", p: "Schrijf je over deze bestemming? Kopieer een kant-en-klare bronvermelding of sluit een widget in – gratis, met de link erbij.", cite: "Bronvermelding", html: "HTML-link", embed: "Widget insluiten", copy: "Kopiëren", copied: "Gekopieerd" },
  pl: { h: "Zacytuj lub osadź te dane", p: "Piszesz o tym miejscu? Skopiuj gotowy cytat lub osadź widżet – za darmo, wystarczy zostawić link.", cite: "Cytat", html: "Link HTML", embed: "Widżet do osadzenia", copy: "Kopiuj", copied: "Skopiowano" },
} as const;

export function CiteBox({
  url,
  title,
  source,
  embedUrl,
  className = "",
}: {
  /** Absolute URL of this page. */
  url: string;
  /** Link text / page title, e.g. "Rome weather in October". */
  title: string;
  /** Data source note, e.g. "NASA POWER 2011–2020 averages". */
  source: string;
  /** Absolute URL of the /embed widget for this city (optional). */
  embedUrl?: string;
  className?: string;
}) {
  const { locale } = useI18n();
  const t = L[locale as keyof typeof L] ?? L.en;
  const [copied, setCopied] = useState<string | null>(null);

  const year = new Date().getFullYear();
  const citation = `${title}. WeatherCompare, ${year} (${source}). ${url}`;
  const html = `<a href="${url}">${title}</a> (WeatherCompare)`;
  const embed = embedUrl
    ? `<iframe src="${embedUrl}" width="300" height="160" style="border:0;border-radius:12px" loading="lazy" title="${title}"></iframe>\n<p style="font-size:12px"><a href="${url}">${title}</a> – WeatherCompare</p>`
    : null;

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked — the text is still selectable */
    }
  };

  const Row = ({ k, label, text, icon: Icon }: { k: string; label: string; text: string; icon: typeof Quote }) => (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
          <Icon size={13} aria-hidden="true" /> {label}
        </span>
        <button
          type="button"
          onClick={() => copy(k, text)}
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-700 dark:border-white/10 dark:text-slate-300"
        >
          {copied === k ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
          {copied === k ? t.copied : t.copy}
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-all rounded-lg bg-slate-50 px-3 py-2 text-[11px] leading-relaxed text-slate-600 dark:bg-white/5 dark:text-slate-300">{text}</pre>
    </div>
  );

  return (
    <section className={`rounded-xl3 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle ${className}`}>
      <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
        <Quote size={17} className="text-brand-500" aria-hidden="true" /> {t.h}
      </h2>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.p}</p>
      <div className="mt-4 space-y-3">
        <Row k="cite" label={t.cite} text={citation} icon={Quote} />
        <Row k="html" label={t.html} text={html} icon={Code2} />
        {embed && <Row k="embed" label={t.embed} text={embed} icon={Code2} />}
      </div>
    </section>
  );
}
