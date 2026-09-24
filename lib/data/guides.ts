/**
 * Hand-written, editorial travel-guide articles — the "magnet content"
 * pieces meant to be pinned/shared (comparisons, packing lists, seasonal
 * roundups) rather than generated from live weather data.
 *
 * These are deliberately well-sourced rather than padded — every claim
 * either restates the existing per-city facts in lib/data/cityGuides.ts or
 * is hedged, well-established seasonal-climate and general travel-planning
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
      "A detailed, season-by-season packing list for European city trips — layering, footwear for cobblestones, a carry-on-only strategy, what to leave at home, and city-specific notes.",
    updated: "2026-09-24",
    intro:
      "European weather can shift a lot between a spring afternoon and a spring evening, and even more between cities — Seville in July is a very different trip from Edinburgh in July. Rather than one generic list, here's what to actually adjust by season, the gear that earns its space in every bag regardless of month, and the things most people bring but never use.",
    sections: [
      {
        heading: "Spring (April–May)",
        paragraphs: [
          "Spring is generally the most changeable season across Italy, France, Spain, Germany and the UK — mild, sunny afternoons can still turn into a cool, rainy evening, especially in northern cities. Early April tends to run noticeably cooler than late May, so it's worth checking exactly where your dates fall rather than packing for \"spring\" as a single block.",
          "The trap most people fall into is packing only for the daytime high. A 20°C afternoon in Paris or Munich can drop into single digits after sunset, and outdoor dinner terraces stay open well past the point where a bare-arm outfit stops being comfortable.",
        ],
        bullets: [
          "A packable rain jacket or umbrella — spring showers are common almost everywhere on this list",
          "Layers: a t-shirt, a light sweater, and a jacket cover most days",
          "Comfortable, broken-in walking shoes — historic centres mean a lot of cobblestones",
          "A light scarf or buff — useful for a cool morning and easy to stuff in a daypack once the sun's out",
          "Sunglasses — spring light is often brighter than the temperature suggests, especially at midday",
        ],
      },
      {
        heading: "Summer (June–August)",
        paragraphs: [
          "Southern cities — Rome, Seville, Palermo, Valencia — can get genuinely hot in midsummer, while UK and northern German cities stay milder. Check the specific city's forecast before you pack; the range across this list in July is wide, and a packing list built for Edinburgh will leave you overheating in Seville.",
          "Humidity matters as much as temperature. Coastal and riverside cities (Venice, Hamburg) can feel stickier than the raw number suggests, which makes breathable natural fabrics — cotton, linen — noticeably more comfortable than synthetics over a full day of walking.",
        ],
        bullets: [
          "Breathable, light-coloured clothing for southern Europe",
          "A hat and sunscreen — especially for cities like Seville and Palermo, where midday sightseeing can be intense",
          "A light layer for air-conditioned museums and trains, and for evenings that cool off even after a hot day",
          "A reusable water bottle — many European city centres have public drinking fountains",
          "A compact travel fan or cooling towel, especially useful during southern Europe's hottest stretches in July and August",
          "Sandals or breathable trainers with good arch support, as a break from closed shoes on the hottest days",
        ],
      },
      {
        heading: "Autumn (September–October)",
        paragraphs: [
          "Many of the cities on this site — see the seasonal roundup below — list autumn as their best time to visit: warm enough for sightseeing, without peak summer crowds or heat. September often still runs warm in the south, while October brings a noticeably cooler, crisper feel further north.",
          "This is also the season where a single umbrella in the bottom of a bag earns its keep more than any other month — showers tend to be short but more frequent than in high summer.",
        ],
        bullets: [
          "A versatile jacket that layers over a t-shirt or under a sweater",
          "Waterproof shoes or a shoe spray, particularly for Venice, Hamburg or the UK cities",
          "One warmer layer for evenings, which cool down faster than the daytime temperature suggests",
          "A packable daypack that compresses down — useful once the summer beach gear stays home",
          "An extra pair of socks: cooler mornings mean more layering, and wet pavements or grass catch people out",
        ],
      },
      {
        heading: "Winter (November–March)",
        paragraphs: [
          "Winter varies the most by latitude and coast: coastal Mediterranean cities like Nice or Palermo stay relatively mild, while Berlin, Munich and Edinburgh get genuinely cold, and Venice can see acqua alta flooding. Don't assume \"Italy\" or \"Spain\" means mild — a winter trip to Turin or Madrid still needs a proper coat.",
          "Indoor heating in much of Europe runs warmer than many travellers expect, so the biggest comfort win is a layering system you can shed indoors rather than one enormous coat you're stuck wearing everywhere.",
        ],
        bullets: [
          "A proper insulated coat for northern and inland cities (Munich, Berlin, Turin)",
          "Waterproof, warm footwear — and check Venice's tide forecast if visiting between November and March",
          "Gloves and a scarf for Germany and the UK; a lighter jacket is usually enough on the southern coasts",
          "Thermal base layers — more practical than one very heavy coat when you're moving between warm interiors and cold streets all day",
          "A small travel umbrella as backup even where snow is more likely than rain, since winter often brings both in the same week",
        ],
      },
      {
        heading: "Footwear: the one category worth getting right",
        paragraphs: [
          "A typical sightseeing day in a European city centre easily adds up to 15,000–20,000 steps, much of it on cobblestones, marble or uneven paving that's harder on feet than a flat pavement. Footwear mistakes are the single most common thing that derails an otherwise well-packed trip.",
        ],
        bullets: [
          "Break in any new walking shoes for at least a couple of weeks before you travel — cobblestones will find every blister a stiff, unworn sole can cause",
          "One supportive daily pair plus one lighter pair for evenings covers most trips without adding much weight",
          "Water-resistant soles pay off in any season — Venice, Hamburg and the UK cities all see rain across the year, not just in the shoulder seasons",
          "Avoid packing shoes you've never actually walked in for more than an hour — a shop test is not the same as a full day on stone streets",
        ],
      },
      {
        heading: "Packing light: a carry-on-only strategy",
        paragraphs: [
          "For any trip that moves between two or more cities — Rome then Florence, or a few German cities by train — carry-on-only removes checked-bag waits, makes station transfers far less stressful, and forces a wardrobe that actually works together.",
        ],
        bullets: [
          "Build a capsule wardrobe around two or three coordinating colours so every top pairs with every bottom",
          "Roll clothing rather than folding it, and use packing cubes to compress bulkier items like jumpers",
          "Plan on doing a load of laundry partway through any trip longer than a week rather than packing for every single day",
          "Keep liquids in containers under the standard cabin limit (100ml/3.4oz) and buy toiletries locally instead of over-packing full-size bottles",
        ],
      },
      {
        heading: "What people almost always over-pack",
        paragraphs: [
          "Most over-packing isn't about volume — it's specific categories that sound useful while planning and then sit unused in the case for the whole trip.",
        ],
        bullets: [
          "A hairdryer or styling tool — most hotels provide one, and Europe's 220–240V sockets need a dedicated travel adaptor anyway for anything you do bring",
          "A different outfit for every single day — most travellers re-wear basics more than they expect to once they're actually walking around all day",
          "A large first-aid kit — a small one with the essentials (plasters, pain relief, any personal medication) covers almost everything that comes up",
          "Paper guidebooks or printed maps for every city — a phone with offline maps downloaded covers this with far less weight",
        ],
      },
      {
        heading: "A few things that help wherever you go",
        bullets: [
          "A universal or European (Type C/F) plug adapter — most of mainland Europe runs on 220–240V",
          "A cross-body bag you can keep in front of you on crowded metros and markets",
          "A portable charger, especially useful on long sightseeing days away from an outlet",
          "A small day bag that can also work as your only carry-on for any short flight within Europe",
          "Check the live forecast for your exact dates before you finish packing — conditions can differ city to city even within the same country",
        ],
      },
      {
        heading: "City-specific notes worth knowing before you pack",
        paragraphs: [
          "A few cities on this site reward planning your packing around a specific local factor rather than the season alone.",
        ],
        bullets: [
          "Venice: waterproof shoes matter here more than almost anywhere else on this list — see the acqua alta note in the winter section above",
          "Seville and Palermo: light colours and a proper sun hat make a bigger difference than you'd expect once temperatures climb into the mid-30s°C in summer",
          "Munich and Berlin: a proper insulated coat, not just extra layers, earns its suitcase space from November through February",
          "Nice and the French Riviera: pack swimwear even outside peak summer — the Mediterranean stays inviting well into September",
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
      "Rome and Florence compared in detail — pace, size, getting around, where to stay, food, cost, and best time to visit — to help you decide between them, or how to split your time.",
    updated: "2026-09-24",
    intro:
      "Rome and Florence sit under three hours apart by train, and a lot of first-time Italy trips end up choosing between them — or trying to fit both in. Here's how they actually differ, city by city, on the things that shape a trip: pace, logistics, food, cost, and what each is genuinely known for.",
    sections: [
      {
        heading: "Pace and size",
        paragraphs: [
          "Rome is a genuinely large, busy capital: expect longer distances between sights, more traffic, and a livelier, less predictable street life. Florence is compact enough to cross on foot in well under an hour, with a historic centre built for walking rather than driving.",
          "If you want a city you can fully get your bearings in within a day or two, Florence is the easier one. If you want the energy and scale of a major capital, Rome delivers that at the cost of more walking and more logistics.",
          "This difference in scale shows up in almost everything below — how you get around, how far apart your hotel and the sights might be, and how much a day of sightseeing actually covers.",
        ],
      },
      {
        heading: "What each is known for",
        bullets: [
          "Rome: ancient history at city scale — the Colosseum, the Roman Forum, the Vatican Museums and Sistine Chapel, and the Trevi Fountain",
          "Rome: also home to Baroque piazzas (Piazza Navona, Campo de' Fiori) and a genuinely large, varied restaurant scene spread across dozens of neighbourhoods",
          "Florence: the Renaissance concentrated into a few square kilometres — the Duomo's dome, the Uffizi Gallery, and the Ponte Vecchio",
          "Florence: also the gateway to the Tuscan countryside, with Chianti vineyards and hill towns like Siena within easy day-trip range",
        ],
      },
      {
        heading: "Getting there and around",
        paragraphs: [
          "High-speed trains (Frecciarossa or Italo) connect Rome and Florence in as little as 1.5 hours, making it easy to base yourself in one and day-trip to the other, or split a longer trip between both.",
          "Within each city, the experience is quite different. Florence is best explored almost entirely on foot — most major sights sit within a compact historic centre. Rome is more spread out, and its metro network is deliberately limited (ongoing archaeological digs make new lines slow and expensive to build), so expect to combine walking with buses, trams, or occasional taxis, especially between areas like Trastevere and the Vatican.",
          "Both cities reward comfortable, broken-in shoes over anything else — see the packing guide on this site for more on that.",
        ],
      },
      {
        heading: "Where to stay",
        paragraphs: [
          "In Rome, staying near the historic centre (around the Pantheon, Campo de' Fiori, or Trastevere across the river) keeps you within walking distance of most major sights and cuts down on transit time. Areas immediately around Termini station are more budget-friendly but further from the main sights and less atmospheric at night.",
          "In Florence, almost anywhere inside or just outside the old city walls works well given how compact the centre is. Oltrarno, on the south side of the Arno, tends to be quieter and slightly less touristy than the streets right around the Duomo, while staying close to Santa Maria Novella station is convenient for day trips.",
        ],
      },
      {
        heading: "Food and dining",
        paragraphs: [
          "Roman cuisine leans on a handful of very specific pasta dishes — carbonara, cacio e pepe, and amatriciana — plus casual street food like supplì (fried rice balls). Florentine food centres on Tuscan staples: bistecca alla fiorentina (a large, simply grilled steak), ribollita (a hearty bread-and-vegetable soup), and lampredotto, a Florentine street-food sandwich made from tripe.",
          "Both cities have excellent food at every price point, but the specific dishes worth seeking out are genuinely different — it's less \"Italian food\" and more two distinct regional cuisines a few hours apart.",
        ],
      },
      {
        heading: "Best time to visit",
        paragraphs: [
          "Both cities point to the same shoulder-season window: late April through June, or September into October, when temperatures are mild and the peak summer crowds have thinned. Summer is hot and heavily crowded in both, but especially so in Florence's compact centre, where the smaller footprint concentrates visitors into fewer streets.",
        ],
      },
      {
        heading: "Booking ahead",
        paragraphs: [
          "Both cities reward booking tickets in advance. In Rome, that means the Colosseum and Vatican Museums; in Florence, it means the Uffizi Gallery and, if it fits your dates, Leonardo's The Last Supper (which is technically in Milan, a common add-on to a Florence trip since it's under two hours away by train).",
        ],
      },
      {
        heading: "Budget considerations",
        paragraphs: [
          "As a general pattern rather than fixed numbers: Rome's larger size tends to mean more spent on local transit (buses, metro, occasional taxis) simply to cover the distances between sights. Florence's walkability can offset that, since a short stay there often needs little to no paid transport once you've arrived.",
          "Entry tickets for major sights are broadly comparable between the two, and both cities have a wide range of accommodation and dining options across most budgets — cost differences come down more to trip length and travel style than to one city being inherently cheaper.",
        ],
      },
      {
        heading: "If you're doing both",
        paragraphs: [
          "A common, workable split for a first Italy trip is roughly three days in Rome and two in Florence, using the high-speed train to connect them — it leaves enough time in Rome for its larger sight list, without rushing Florence's more concentrated highlights.",
          "Travelling Rome first, then Florence, also works well logistically since it's a straightforward one-way train route north, and Florence pairs naturally with an onward trip further into Tuscany or up to Milan if your itinerary continues.",
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
      { country: "italy", city: "naples" },
    ],
    photoQuery: "Florence Italy landmark",
  },
  {
    slug: "best-european-cities-to-visit-this-autumn",
    category: "seasonal",
    title: "Best European Cities to Visit This Autumn",
    description:
      "Six European cities that are consistently at their best in September and October — what makes each one work in autumn specifically, mild weather, thinner crowds, and full-forecast comparisons.",
    updated: "2026-09-24",
    intro:
      "Autumn is the quiet favourite among the cities on this site: warm enough for full days of sightseeing, without the peak-summer heat or the queues. It's also when a lot of southern European cities finally become comfortable again after a hot summer, while northern cities get a last stretch of mild, walkable weather before winter sets in. Here are six that call out September–October specifically as their best window, and what actually makes each one worth the trip in this particular season.",
    sections: [
      {
        heading: "Why autumn works so well across Europe",
        paragraphs: [
          "Summer's heat and crowds ease first in the north and later in the south, which is why autumn's \"sweet spot\" shifts slightly by city — some are already comfortable by early September, others need to wait until October. Days are still long enough for a full sightseeing schedule, tourist numbers drop noticeably after the school-holiday months end, and prices on flights and accommodation often ease compared to July and August.",
          "The trade-off is a shorter, less predictable window than summer: pack for both a warm afternoon and a cool evening (see the packing guide on this site), and check each city's specific forecast rather than assuming \"autumn\" means the same thing everywhere.",
        ],
      },
      {
        heading: "Venice, Italy",
        paragraphs: [
          "April to June or September to October is the recommended window — and autumn specifically avoids the higher risk of acqua alta flooding that starts to build from November. September still carries some late-summer warmth, while October brings cooler mornings and a noticeably quieter city, especially once October's cruise-ship traffic thins out compared to peak summer.",
          "Autumn light on the canals — lower sun, longer shadows — is also part of why photographers favour this season over midsummer's harsher midday glare.",
        ],
      },
      {
        heading: "Seville, Spain",
        paragraphs: [
          "Seville's summers regularly pass 35°C, so its best window shifts slightly later than most: March to May, or October to November, once the extreme heat has eased. October is the more reliable autumn pick here — September can still run hot in Andalusia.",
          "Once temperatures drop into a comfortable range, Seville's plazas and tapas-bar terraces become genuinely pleasant to sit out in for an evening, which is a much harder sell in the peak of summer.",
        ],
      },
      {
        heading: "Florence, Italy",
        paragraphs: [
          "April to May or September to October — outside those windows, summer in Florence's compact centre gets both hot and heavily crowded. Because the historic centre is so walkable and concentrated, autumn's thinner crowds make a noticeably bigger difference here than in a larger, more spread-out city.",
          "September in Florence also overlaps with the start of the Tuscan grape harvest, making it a good season to combine city time with a day trip into the surrounding wine country.",
        ],
      },
      {
        heading: "Valencia, Spain",
        paragraphs: [
          "March to May or September to October brings comfortable temperatures for exploring the City of Arts and Sciences and the old town without summer's peak heat. Valencia's beaches stay usable well into September, giving autumn visitors a rare combination: city sightseeing weather paired with still-warm seawater.",
        ],
      },
      {
        heading: "Nice, France",
        paragraphs: [
          "May to June or September is when the French Riviera is warm without the peak-season crowds that fill the Promenade des Anglais in midsummer. September in particular keeps the Mediterranean warm enough to swim in while hotel rates and crowd levels have already started to ease from their August peak.",
        ],
      },
      {
        heading: "Rome, Italy",
        paragraphs: [
          "Late April to June, or September to October, when temperatures are mild and the summer crowds around the Colosseum and Vatican have thinned. Because Rome is such a large, spread-out city, autumn's milder temperatures make the amount of walking between sights considerably more comfortable than in July's heat.",
        ],
      },
      {
        heading: "Planning around the exact dates",
        paragraphs: [
          "\"Autumn\" still covers a range — early September in Seville can feel like peak summer, while late October in Venice is already noticeably cool. Check each city's live forecast on this site before booking, since conditions can shift city to city even in the same month.",
          "If your trip spans several of these cities, pack for the widest range you'll encounter rather than just your first stop — see the season-by-season packing guide on this site for exactly what to bring for a mixed autumn itinerary.",
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
