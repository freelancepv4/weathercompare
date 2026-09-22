import type { Locale } from "@/config/site";
import en from "@/locales/en.json";
import it from "@/locales/it.json";
import de from "@/locales/de.json";
import fr from "@/locales/fr.json";
import es from "@/locales/es.json";

/**
 * All locale dictionaries, loaded once. Adding a new language is:
 *   1. Create /locales/{code}.json (copy en.json as a template).
 *   2. Add {code} to config/site.ts's `locales` tuple.
 *   3. Import + register it below.
 * Nothing else in the app needs to change — every component reads strings
 * through useTranslations()/getDictionary(), never hardcoded text.
 */
export const dictionaries = { en, it, de, fr, es } satisfies Record<Locale, unknown>;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return (dictionaries[locale] ?? dictionaries.en) as Dictionary;
}
