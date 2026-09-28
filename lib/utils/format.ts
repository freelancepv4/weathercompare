export function formatTime(iso: string, timeZone = "UTC", locale = "en") {
  try {
    return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date(iso));
  } catch {
    return new Date(iso).toISOString().slice(11, 16);
  }
}

/**
 * Hour label in the city's own time zone. Always pass an explicit zone: without
 * one the server (UTC) and the visitor's browser would format differently,
 * which breaks React hydration.
 */
export function formatHourLabel(iso: string, locale = "en", timeZone = "UTC") {
  try {
    return new Intl.DateTimeFormat(locale, { hour: "numeric", timeZone }).format(new Date(iso));
  } catch {
    return new Date(iso).toISOString().slice(11, 13);
  }
}

export function formatWeekday(iso: string, locale = "en") {
  try {
    return new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));
  } catch {
    return iso;
  }
}

export function formatDayMonth(iso: string, locale = "en") {
  try {
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));
  } catch {
    return iso;
  }
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
