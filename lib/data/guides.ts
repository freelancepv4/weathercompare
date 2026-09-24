/**
 * Hand-written, editorial travel-guide articles — the "magnet content"
 * pieces meant to be pinned/shared (comparisons, packing lists, seasonal
 * roundups) rather than generated from live weather data.
 *
 * These are deliberately few and well-sourced rather than many and thin:
 * every claim either restates the existing per-city facts in
 * lib/data/cityGuides.ts or is hedged, well-established seasonal-climate
 * knowledge ("typically", "generally") — nothing here invents precise
 * statistics that aren't backed by the provider data shown elsewhere on
 * the site. Add new entries to `guides` to expand a category; the index,
 * sitemap and JSON-LD all read from this array automatically.
 *
 * The fourth content type — "best time to visit" — isn't here because it's
 * fully data-driven already: see app/guides/best-time-to-visit/[country]/
 * [city]/page.tsx, which generates one page per city straight from
 * lib/data/cityGuides.ts.
 */

export type GuideCategory = "packing" | "comparison" | "seasonal";

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  category: GuideCategory;
  title: string;
  description: string;
  updated: string; // ISO date
  intro: string;
  sections: GuideSection[];
  relatedCityPaths: Array<{ country: string; city: string }>;
  /** Search query used against the photo provider (see
   * lib/providers/photos.ts) for this guide's hero/Pin image. Kept
   * separate from the title so it can target a good, photographable
   * subject even when the title itself is a question or comparison. */
  photoQuery: string;
}

export const CATEGORY_LABELS: Record<GuideCategory, string> = {
  packing: "What to pack",
  comparison: "City comparisons",
  seasonal: "Seasonal picks",
};

export const guides: Guide[] = [
  {
    slug: "what-to-pack-for-a-european-city-break",
    category: "packing",
    title: "What to Pack for a European City Break: A Season-by-Season Guide",
    description:
      "A practical, season-by-season packing list for European city trips — layering, footwear for cobblestones, and what actually changes between spring, summer, autumn and winter.",
    updated: "2026-09-23",
    intro:
      "European weather can shift a lot between a spring afternoon and a spring evening, and even more between cities — Seville in July is a very different trip from Edinburgh in July. Rather than one generic list, here's what to actually adjust by season, plus a few things that matter everywhere you go.",
    sections: [
      {
        heading: "Spring (April–May)",
        paragraphs: [
          "Spring is generally the most changeable season across Italy, France, Spain, Germany and the UK — mild, sunny afternoons can still turn into a cool, rainy evening, especially in northern cities.",
        ],
        bullets: [
          "A packable rain jacket or umbrella — spring showers are common almost everywhere on this list",
          "Layers: a t-shirt, a light sweater, and a jacket cover most days",
          "Comfortable, broken-in walking shoes — historic centres mean a lot of cobblestones",
        ],
      },
      {
        heading: "Summer (June–August)",
        paragraphs: [
          "Southern cities — Rome, Seville, Palermo, Valencia — can get genuinely hot in midsummer, while UK and northern German cities stay milder. Check the specific city's forecast before you pack; the range across this list in July is wide.",
        ],
        bullets: [
          "Breathable, light-coloured clothing for southern Europe",
          "A hat and sunscreen — especially for cities like Seville and Palermo, where midday sightseeing can be intense",
          "A light layer for air-conditioned museums and trains, and for evenings that cool off even after a hot day",
          "A reusable water bottle — many European city centres have public drinking fountains",
        ],
      },
      {
        heading: "Autumn (September–October)",
        paragraphs: [
          "Many of the cities on this site — see the seasonal roundup below — list autumn as their best time to visit: warm enough for sightseeing, without peak summer crowds or heat.",
        ],
        bullets: [
          "A versatile jacket that layers over a t-shirt or under a sweater",
          "Waterproof shoes or a shoe spray, particularly for Venice, Hamburg or the UK cities",
          "One warmer layer for evenings, which cool down faster than the daytime temperature suggests",
        ],
      },
      {
        heading: "Winter (November–March)",
        paragraphs: [
          "Winter varies the most by latitude and coast: coastal Mediterranean cities like Nice or Palermo stay relatively mild, while Berlin, Munich and Edinburgh get genuinely cold, and Venice can see acqua alta flooding.",
        ],
        bullets: [
          "A proper insulated coat for northern and inland cities (Munich, Berlin, Turin)",
          "Waterproof, warm footwear — and check Venice's tide forecast if visiting between November and March",
          "Gloves and a scarf for Germany and the UK; a lighter jacket is usually enough on the southern coasts",
        ],
      },
      {
        heading: "A few things that help wherever you go",
        bullets: [
          "A universal or European (Type C/F) plug adapter — most of mainland Europe runs on 220–240V",
          "A cross-body bag you can keep in front of you on crowded metros and markets",
          "Check the live forecast for your exact dates before you finish packing — conditions can differ city to city even within the same country",
        ],
      },
    ],
    relatedCityPaths: [
      { country: "italy", city: "venice" },
      { country: "spain", city: "seville" },
      { country: "germany", city: "munich" },
    ],
    photoQuery: "traveler packing suitcase flat lay",
  },
  {
    slug: "rome-vs-florence-which-italian-city-is-right-for-you",
    category: "comparison",
    title: "Rome vs Florence: Which Italian City Is Right for You?",
    description:
      "Rome and Florence compared — pace, size, highlights and best time to visit — to help you decide between them, or how to split your time.",
    updated: "2026-09-23",
    intro:
      "Rome and Florence sit under three hours apart by train, and a lot of first-time Italy trips end up choosing between them — or trying to fit both in. Here's how they actually differ.",
    sections: [
      {
        heading: "Pace and size",
        paragraphs: [
          "Rome is a genuinely large, busy capital: expect longer distances between sights, more traffic, and a livelier, less predictable street life. Florence is compact enough to cross on foot in well under an hour, with a historic centre built for walking rather than driving.",
          "If you want a city you can fully get your bearings in within a day or two, Florence is the easier one. If you want the energy and scale of a major capital, Rome delivers that at the cost of more walking and more logistics.",
        ],
      },
      {
        heading: "What each is known for",
        bullets: [
          "Rome: ancient history at city scale — the Colosseum, the Roman Forum, the Vatican Museums and Sistine Chapel, and the Trevi Fountain",
          "Florence: the Renaissance concentrated into a few square kilometres — the Duomo's dome, the Uffizi Gallery, and the Ponte Vecchio",
        ],
      },
      {
        heading: "Best time to visit",
        paragraphs: [
          "Both cities point to the same shoulder-season window: late April through June, or September into October, when temperatures are mild and the peak summer crowds have thinned. Summer is hot and heavily crowded in both, but especially so in Florence's compact centre.",
        ],
      },
      {
        heading: "Booking ahead",
        paragraphs: [
          "Both cities reward booking tickets in advance. In Rome, that means the Colosseum and Vatican; in Florence, it means the Uffizi Gallery and, if it fits your dates, Leonardo's The Last Supper (which is technically in Milan, a common add-on to a Florence trip).",
        ],
      },
      {
        heading: "So which one?",
        paragraphs: [
          "If this is a first trip to Italy and you only have a few days, Florence's walkability makes it easier to see a lot without feeling rushed. If you want the sweep of ancient and modern Italy in one place — and don't mind more ground to cover — Rome is worth the extra logistics. Many travellers do both: Rome first for the scale, then a shorter, slower stop in Florence.",
        ],
      },
    ],
    relatedCityPaths: [
      { country: "italy", city: "rome" },
      { country: "italy", city: "florence" },
    ],
    photoQuery: "Florence Italy skyline duomo",
  },
  {
    slug: "best-european-cities-to-visit-this-autumn",
    category: "seasonal",
    title: "Best European Cities to Visit This Autumn",
    description:
      "Six European cities that are consistently at their best in September and October — mild weather, thinner crowds, and full-forecast comparisons for each.",
    updated: "2026-09-23",
    intro:
      "Autumn is the quiet favourite among the cities on this site: warm enough for full days of sightseeing, without the peak-summer heat or the queues. Here are six that call out September–October specifically as their best window.",
    sections: [
      {
        heading: "Venice, Italy",
        paragraphs: [
          "April to June or September to October is the recommended window — and autumn specifically avoids the higher risk of acqua alta flooding that starts to build from November.",
        ],
      },
      {
        heading: "Seville, Spain",
        paragraphs: [
          "Seville's summers regularly pass 35°C, so its best window shifts slightly later than most: March to May, or October to November, once the extreme heat has eased.",
        ],
      },
      {
        heading: "Florence, Italy",
        paragraphs: [
          "April to May or September to October — outside those windows, summer in Florence's compact centre gets both hot and heavily crowded.",
        ],
      },
      {
        heading: "Valencia, Spain",
        paragraphs: [
          "March to May or September to October brings comfortable temperatures for exploring the City of Arts and Sciences and the old town without summer's peak heat.",
        ],
      },
      {
        heading: "Nice, France",
        paragraphs: [
          "May to June or September is when the French Riviera is warm without the peak-season crowds that fill the Promenade des Anglais in midsummer.",
        ],
      },
      {
        heading: "Rome, Italy",
        paragraphs: [
          "Late April to June, or September to October, when temperatures are mild and the summer crowds around the Colosseum and Vatican have thinned.",
        ],
      },
      {
        heading: "Planning around the exact dates",
        paragraphs: [
          "\"Autumn\" still covers a range — check each city's live forecast on this site before booking, since conditions can shift city to city even in the same month.",
        ],
      },
    ],
    relatedCityPaths: [
      { country: "italy", city: "venice" },
      { country: "spain", city: "seville" },
      { country: "italy", city: "florence" },
      { country: "spain", city: "valencia" },
      { country: "france", city: "nice" },
      { country: "italy", city: "rome" },
    ],
    photoQuery: "Venice Italy canal autumn",
  },
];

export function getGuide(slug: string): Guide | null {
  return guides.find((g) => g.slug === slug) ?? null;
}

export function allGuides(): Guide[] {
  return guides;
}

export function guidesByCategory(category: GuideCategory): Guide[] {
  return guides.filter((g) => g.category === category);
}

export function allGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
