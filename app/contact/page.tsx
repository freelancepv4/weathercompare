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
        Questions, feedback, or partnership inquiries — send us a message below. This form is spam-protected and validated server-side;
        until an email backend is connected (see <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-white/10">app/api/contact/route.ts</code>), submissions will
        return a clear message rather than silently disappearing.
      </p>
      <div className="mt-8 rounded-xl3 border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle sm:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
