"use client";

import { AlertTriangle, RotateCw } from "lucide-react";
import { useTranslations } from "@/lib/i18n/I18nProvider";

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl3 border border-rose-100 bg-rose-50 px-6 py-12 text-center dark:border-rose-900/40 dark:bg-rose-950/30">
      <AlertTriangle className="text-rose-500" size={28} aria-hidden="true" />
      <p className="max-w-sm text-sm font-medium text-rose-700 dark:text-rose-300">{message ?? t("error.generic")}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700"
        >
          <RotateCw size={14} aria-hidden="true" />
          {t("error.retry")}
        </button>
      )}
    </div>
  );
}
