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
      <header className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-brand-950 via-brand-800 to-brand-600 px-6 py-8 text-white sm:px-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-glow/20 blur-3xl" aria-hidden="true" />
        <h1 className="relative text-3xl font-bold tracking-tight sm:text-4xl">Contact</h1>
        <p className="relative mt-3 text-sm text-white/80">
          Questions, feedback, or partnership inquiries — send us a message below. We typically reply within a couple of days.
        </p>
      </header>
      <div className="mt-6 rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
