"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
      company: String(form.get("company") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-xl2 border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300">
        <CheckCircle2 size={20} aria-hidden="true" />
        <p className="text-sm font-medium">Thanks — your message has been received.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field — hidden from real users, catches simple bots */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" type="text" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Subject" name="subject" type="text" required />
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          className="w-full rounded-xl2 border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-shadow focus:border-brand-400 focus:shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle dark:text-white"
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow-brand transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        <Send size={15} aria-hidden="true" />
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl2 border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-shadow focus:border-brand-400 focus:shadow-soft dark:border-white/10 dark:bg-surface-dark-subtle dark:text-white"
      />
    </div>
  );
}
