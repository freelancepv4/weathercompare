/**
 * Klook's internal city IDs, keyed by "{country.slug}/{city.slug}", for the
 * Travelpayouts "Specific City/Category Tours Widget" used by
 * components/TripBookingWidget.tsx. There's no public lookup API for these —
 * each one is found one at a time in the widget's own city selector at
 * app.travelpayouts.com/tools/widgets, so this list is grown by hand as
 * pilot cities are added. A city missing here simply gets no booking widget
 * on its "best time to visit" guide page.
 */
export const KLOOK_CITY_IDS: Record<string, number> = {
  "italy/rome": 92,
  "italy/florence": 115,
  "italy/naples": 126,
};
