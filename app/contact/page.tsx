import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact the ${siteConfig.name} team with questions, feedback, data corrections or partnership ideas about our weather comparisons and travel guides.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-page max-w-2xl py-8 sm:py-10">
      <header className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-blue-900 via-blue-700 to-sky-600 px-6 py-8 text-white sm:px-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-glow/20 blur-3xl" aria-hidden="true" />
        <h1 className="relative text-3xl font-bold tracking-tight sm:text-4xl">Contact</h1>
        <p className="relative mt-3 text-sm text-white/80">
          Questions, feedback, or partnership inquiries — send us a message below. We typically reply within a couple of days.
        </p>
      </header>
      <div className="mt-6 rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle sm:p-8">
        <ContactForm />
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="What you can contact us about">
        {[
          {
            t: "Spotted a data problem?",
            d: "If a forecast, climate average or city detail looks wrong, tell us the page and what you expected. We check every report against our sources and correct the page if needed.",
          },
          {
            t: "Suggest a city or guide",
            d: "Missing a destination you care about, or want a guide on a specific trip question? Suggestions from readers shape which cities and guides we add next.",
          },
          {
            t: "Partnerships and embeds",
            d: "Travel sites and blogs can embed our free city weather widgets. Get in touch for partnership, content or advertising questions.",
          },
          {
            t: "Privacy requests",
            d: "To ask about or delete any personal data you have sent us, use this form or see our Privacy Policy for your rights under GDPR.",
          },
        ].map((c) => (
          <div key={c.t} className="rounded-xl2 border border-slate-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">{c.t}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{c.d}</p>
          </div>
        ))}
      </section>
      <p className="mt-6 text-xs text-slate-400">
        {siteConfig.name} compares forecasts from third-party providers and is not a meteorological authority. For official weather
        warnings, please contact your national weather service.
      </p>
    </div>
  );
}
