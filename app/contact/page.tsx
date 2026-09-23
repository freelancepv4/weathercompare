import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-page max-w-2xl py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Contact</h1>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        Questions, feedback, or partnership inquiries — send us a message below. We typically reply within a couple of days.
      </p>
      <div className="mt-8 rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
