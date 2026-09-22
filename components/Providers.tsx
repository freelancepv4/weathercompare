"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/config/site";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { PreferencesProvider } from "@/lib/hooks/usePreferences";
import { FavoritesProvider } from "@/lib/hooks/useFavorites";

export function Providers({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <I18nProvider initialLocale={locale}>
      <PreferencesProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </PreferencesProvider>
    </I18nProvider>
  );
}
