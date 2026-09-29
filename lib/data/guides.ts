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

export type GuideCategory = "packing" | "comparison" | "seasonal" | "ai-tools";

export interface GuideLink {
  label: string;
  url: string;
  /** Set true for affiliate/paid links — rendered with rel="sponsored"
   * (Google's requirement) and should only appear on pages that carry an
   * affiliate disclosure. */
  sponsored?: boolean;
}

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Outbound links shown as buttons at the end of the section. */
  links?: GuideLink[];
}

export interface Guide {
  slug: string;
  category: GuideCategory;
  title: string;
  /** Optional shorter title for the browser tab / search result, when
   * `title` plus " — WeatherCompare" would exceed ~70 characters. */
  seoTitle?: string;
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
  "ai-tools": "AI travel tools",
};

export const guides: Guide[] = [
  {
    slug: "what-to-pack-for-a-european-city-break",
    category: "packing",
    title: "What to Pack for a European City Break: A Season-by-Season Guide",
    seoTitle: "European City Break Packing List: Season by Season",
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
    seoTitle: "Rome vs Florence: Which Italian City to Visit?",
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
  {
    // Fast-moving topic: facts here are dated to launches reported up to
    // September 2026 — re-check and bump `updated` when revisiting.
    slug: "best-ai-travel-agents-for-trip-planning",
    category: "ai-tools",
    title: "Trending AI Travel Agents in 2026: Plan, Book and Check the Weather with AI",
    seoTitle: "AI Travel Agents 2026: Plan, Book & Check the Weather",
    description:
      "The AI agents travellers are actually using in 2026 — ChatGPT, Claude, Google AI Mode, Mindtrip, KAYAK, Layla and more — what each one can really book, where it falls short, and how to pair them with a live forecast comparison.",
    updated: "2026-09-24",
    intro:
      "2026 is the year AI assistants stopped just suggesting itineraries and started doing parts of the booking. Expedia and Booking.com now run inside chatbots, Google's AI Mode tracks flight prices and books hotels, and travel start-ups offer checkout without ever leaving the chat. But each tool does something different, availability varies a lot by country, and none of them replace checking the actual forecast for your dates. Here's what's trending, what each agent is genuinely good at, and how to use them together for a European trip.",
    sections: [
      {
        heading: "The trending AI travel agents at a glance",
        bullets: [
          "Google AI Mode: flight price alerts and hotel booking",
          "Mindtrip: pay for flights without leaving the chat",
          "ChatGPT & Claude: Expedia and Booking.com inside the chat",
          "KAYAK Ask AI: chat beside live flight and hotel results",
          "Layla and Wanderlog: full itineraries with maps and day plans",
        ],
        links: [
          { label: "Google AI Mode", url: "https://search.google/ways-to-search/ai-mode/" },
          { label: "Mindtrip", url: "https://mindtrip.ai/" },
          { label: "ChatGPT", url: "https://chatgpt.com/" },
          { label: "Claude", url: "https://claude.ai/" },
          { label: "KAYAK Ask AI", url: "https://www.kayak.co.uk/ask" },
          { label: "Layla", url: "https://layla.ai/" },
          { label: "Wanderlog", url: "https://wanderlog.com/" },
        ],
      },
      {
        heading: "What makes something an \"AI agent\" rather than a chatbot?",
        paragraphs: [
          "A chatbot answers questions. An agent takes actions: it runs a live search against real inventory, tracks a price over days, fills in a booking, or hands you off to a checkout with your choices already selected. In travel, that difference matters — an itinerary written from a model's general knowledge can list a restaurant that has closed or a train that no longer runs, whereas an agent working with live data is checking what's actually available for your dates.",
          "Most of the tools below sit somewhere in between: they plan conversationally, then call out to a booking partner (Expedia, Booking.com, Sabre, airline systems) for live prices. Knowing which part is \"live\" and which part is the model's own suggestion is the single most useful thing to understand before you trust one with a trip.",
        ],
      },
      {
        heading: "ChatGPT with travel apps",
        paragraphs: [
          "Since late 2025, ChatGPT has supported third-party apps inside the conversation, with Booking.com and Expedia among the first. You can ask for hotels in Florence under a certain price, see live results, and refine them in the chat. ChatGPT remains strongest at the open-ended part of planning — \"where should I go in Europe in October for mild weather and good food?\" — and at turning vague ideas into a shortlist.",
          "In early 2026 OpenAI stepped back from completing purchases directly inside ChatGPT, focusing instead on search and discovery, so bookings are generally finished on the partner's own site or app. Independent hands-on testing in mid-2026 also found that ChatGPT didn't always use connected travel apps without being explicitly asked, so it's worth naming the app in your request.",
        ],
        links: [
          { label: "Open ChatGPT", url: "https://chatgpt.com/" },
        ],
      },
      {
        heading: "Claude with Expedia, Booking.com and Viator",
        paragraphs: [
          "Anthropic's Claude supports \"connectors\" — plug-ins to outside services — and Expedia launched one in May 2026 covering flights and hotels in U.S. markets, with live pricing and room availability shown in the chat before you click through to Expedia to book. Booking.com and Viator (tours and activities) are also available as connectors.",
          "In Skift's July 2026 side-by-side test of travel apps in ChatGPT and connectors in Claude, Claude picked up and used the connected travel apps with less friction. As with any of these tools, availability depends on your country and plan, so check what's offered where you live.",
        ],
        links: [
          { label: "Open Claude", url: "https://claude.ai/" },
          { label: "Expedia connector for Claude", url: "https://claude.com/connectors/expedia" },
        ],
      },
      {
        heading: "Google AI Mode: price tracking and hotel booking",
        paragraphs: [
          "In late August 2026 Google expanded AI Mode in Search into something much closer to a travel agent. You can ask it to \"track flight prices for me\" and get email alerts when fares change — covering 300+ airlines and travel sites, in more than 180 countries. You can also ask for quotes in airline miles or loyalty points.",
          "Hotel booking through AI Mode started in the U.S. in English: you describe what you want, AI Mode shows options with reviews, and you complete the booking via \"Continue on Google\" with partners including Booking.com, Expedia, Hotels.com, Marriott, Hilton, IHG, Trip.com and others. The reservation itself is still made with the hotel or booking site — Google handles the conversation and hand-off.",
        ],
        links: [
          { label: "Try Google AI Mode", url: "https://search.google/ways-to-search/ai-mode/" },
        ],
      },
      {
        heading: "Mindtrip: booking flights inside the chat",
        paragraphs: [
          "Mindtrip is a dedicated AI trip planner, and in May 2026 it launched what it and its partners describe as travel's first all-in-one agentic flight booking: you search, compare and pay for flights inside the conversation, with Sabre supplying live airline inventory and PayPal handling payment — no redirect to another website.",
          "It's flights-only for now (hotels were described as a later phase), but it's the clearest example so far of an AI agent completing a travel purchase end-to-end rather than handing you off.",
        ],
        links: [
          { label: "Open Mindtrip", url: "https://mindtrip.ai/" },
        ],
      },
      {
        heading: "KAYAK Ask AI and the booking sites' own assistants",
        paragraphs: [
          "KAYAK's Ask AI, launched in April 2026, splits the screen: you describe your trip in a chat while flight, hotel and car-rental results update live alongside it, pulling prices from hundreds of partners. It's a good middle ground if you like conversational planning but still want to see and compare real listings yourself.",
          "The big booking platforms are building AI into their own apps too. Booking.com offers AI trip support for questions and reservation changes in several European markets including Italy, Spain, France, Germany, the Netherlands and the UK, plus AI summaries that explain trade-offs between flight options. Booking Holdings' CEO noted in September 2026 that AI-referred traffic was still well under 1% of room nights — a reminder that most people are still experimenting with these tools rather than booking entire trips through them.",
        ],
        links: [
          { label: "Try KAYAK Ask AI", url: "https://www.kayak.co.uk/ask" },
          { label: "Booking.com", url: "https://www.booking.com/" },
        ],
      },
      {
        heading: "Layla, Wanderlog and other itinerary planners",
        bullets: [
          "Layla: an all-in-one planner that links out to Skyscanner, Booking.com and GetYourGuide, with a paid tier for live pricing and fare tracking",
          "Wanderlog: best for organising a trip with others — shared itineraries, maps and route planning, with offline access on its paid tier",
          "Perplexity: better for researching with cited sources (visa rules, local transport, opening times) than for building a day-by-day plan",
          "Quick free generators (Wonderplan and similar): useful for a first-draft itinerary in a minute, but expect generic suggestions you'll need to refine",
        ],
        links: [
          { label: "Layla", url: "https://layla.ai/" },
          { label: "Wanderlog", url: "https://wanderlog.com/" },
          { label: "Perplexity", url: "https://www.perplexity.ai/" },
          { label: "Wonderplan", url: "https://wonderplan.ai/" },
        ],
      },
      {
        heading: "Where AI travel agents still fall short",
        bullets: [
          "Weather: most assistants describe a destination's typical climate, not the live forecast for your exact dates — and they rarely show you where different forecasts disagree",
          "Regional availability: many of the newest booking features launched in the U.S. first and are rolling out country by country",
          "Freshness: anything the AI suggests from its own knowledge (opening hours, prices, events) can be out of date — trust the parts backed by a live search",
          "Final checks: always confirm dates, names, baggage rules and cancellation terms on the actual booking page before paying",
          "Privacy: only connect accounts and share payment or passport details with services you'd trust with them directly",
        ],
      },
      {
        heading: "AI is changing the forecasts too",
        paragraphs: [
          "AI isn't only reshaping how trips get booked — it's reshaping weather forecasting itself. The European Centre for Medium-Range Weather Forecasts (ECMWF) runs an operational AI forecasting system, AIFS, alongside its traditional physics-based model; its May 2026 upgrade added ECMWF's first data-driven wave and snow-cover forecasts. Google DeepMind released WeatherNext 3 in August 2026, a global AI model producing forecasts up to 15 days ahead at resolutions down to roughly 5 km.",
          "More models means more forecasts — and they don't always agree, especially several days out. That's exactly why comparing providers side by side is useful: when several independent forecasts line up, you can plan with more confidence; when they diverge, it's a signal to keep the day flexible or pack for both outcomes.",
        ],
        links: [
          { label: "ECMWF AIFS forecasts", url: "https://www.ecmwf.int/en/forecasts/datasets/set-ix" },
          { label: "Google WeatherNext", url: "https://developers.google.com/weathernext" },
        ],
      },
      {
        heading: "A practical workflow: AI agent + live forecast comparison",
        bullets: [
          "Use ChatGPT, Claude or Perplexity to shortlist destinations — e.g. \"mild, walkable European cities for mid-October\"",
          "Check each shortlisted city's best time to visit and live multi-provider forecast on WeatherCompare before committing",
          "Set a Google AI Mode price alert (or use KAYAK / Mindtrip) once your dates are settled",
          "Let the agent draft a day-by-day plan, then move outdoor-heavy days to the driest dates in the forecast",
          "Re-check the forecast comparison a few days before you fly and adjust your packing — see our season-by-season packing guide",
        ],
      },
    ],
    relatedCityPaths: [
      { country: "italy", city: "rome" },
      { country: "italy", city: "florence" },
      { country: "spain", city: "seville" },
      { country: "france", city: "nice" },
    ],
    photoQuery: "traveler planning trip smartphone airport",
  },
  {
    slug: "year-round-warm-destinations",
    category: "seasonal",
    title: "Where Can You Travel Year-Round With 20–30°C Weather?",
    seoTitle: "Year-Round Warm Destinations: 20–30°C Every Month",
    description:
      "Places where average daytime highs stay between about 20°C and 30°C (70–85°F) in every month of the year — from the Canary Islands and Cape Verde to Curaçao, Mauritius and Bali — and which months are driest in each.",
    updated: "2026-09-29",
    intro:
      "\"Somewhere that's warm but not too hot, whenever I can get time off\" is one of the most common travel-planning wishes. Very few places truly deliver it: most destinations either get cool in winter or scorching in summer. Using 10 years of climate averages for the 139 destinations on this site, these are the ones where the average daytime high stays roughly between 20°C and 30°C (about 70–85°F) in every single month. Temperature is only half the story, though — several of them have a wet season, so we note the driest months too.",
    sections: [
      {
        heading: "How we picked them",
        paragraphs: [
          "Every place below has an average daily high of at least about 20°C in its coolest month and no more than about 30°C in its hottest, based on NASA POWER climate averages (2011–2020). These are area averages, so a specific beach or hillside can run a degree or two warmer or cooler.",
          "\"Warm all year\" doesn't mean \"dry all year\": in the tropics the difference between months is mostly rain, not temperature. Check the rainfall figures before you book.",
        ],
      },
      {
        heading: "Closest to Europe: the Canary Islands",
        paragraphs: [
          "Gran Canaria and Fuerteventura are the only places within a short flight of most of Europe where average highs stay at around 21°C or above all winter, rising to about 28–30°C in August. They are also very dry: Fuerteventura averages under 80 mm of rain in a whole year.",
          "Tenerife and Lanzarote are close behind, with highs of about 19–20°C in February and 24–25°C in late summer, which makes them milder rather than hot. Rain, when it comes, mostly falls between October and December.",
        ],
        bullets: [
          "Gran Canaria: highs about 21°C (Jan) to 30°C (Aug)",
          "Fuerteventura: highs about 21°C (Jan) to 30°C (Aug), the driest of the islands",
          "Tenerife: highs about 19°C (Feb) to 25°C (Aug–Sep)",
        ],
      },
      {
        heading: "Cape Verde: Sal and Boa Vista",
        paragraphs: [
          "About 6 hours from much of Europe, Sal and Boa Vista stay between about 22°C and 27°C all year and get only around 250 mm of rain annually, most of it in a short August–October window. From November to June they are one of the most reliable winter-sun choices in the Atlantic.",
        ],
      },
      {
        heading: "The Caribbean: Curaçao and Punta Cana",
        paragraphs: [
          "Curaçao is remarkably steady: average highs of about 27–29°C in every month, and it sits south of the main hurricane belt. It is also one of the drier Caribbean islands, with most of its rain from October to December.",
          "Punta Cana in the Dominican Republic stays around 26–29°C year-round too, but it is inside the Atlantic hurricane season (June to November), so winter and spring are the safer bet.",
        ],
      },
      {
        heading: "Indian Ocean: Mauritius, Seychelles, Maldives, Zanzibar",
        paragraphs: [
          "Mauritius is the mildest of these, with highs of about 24°C in its July–August winter and 28°C in summer. Its driest, most comfortable months are roughly May to December.",
          "The Maldives, Seychelles and Zanzibar are warmer (about 27–30°C every month) and more humid. For the Maldives, January to April is the drier season; for Zanzibar, June to October and January to February avoid the heaviest rains.",
        ],
      },
      {
        heading: "Asia and the Pacific: Bali, Phuket, Honolulu",
        paragraphs: [
          "Bali (about 26–30°C) and Phuket (about 28–30°C) never get cold, but both have a clear rainy season: Bali is wettest from December to February and driest from June to September; Phuket is wettest from May to October and best from December to March.",
          "Honolulu is the gentlest of all, with highs of about 24–28°C and fairly modest rain spread through the year, which makes it one of the few places that works in almost any month.",
        ],
      },
      {
        heading: "How to choose between them",
        bullets: [
          "Want the shortest flight from Europe? The Canary Islands, then Cape Verde.",
          "Want it hot rather than mild in December–February? The Caribbean, Indian Ocean or Southeast Asia.",
          "Travelling in July–September? Bali, Mauritius, Cape Verde (before late August) or the Canaries; avoid Phuket's monsoon.",
          "Before booking, check the month page for your exact dates and compare the live forecasts a few days before you go.",
        ],
      },
    ],
    relatedCityPaths: [
      { country: "spain", city: "gran-canaria" },
      { country: "spain", city: "fuerteventura" },
      { country: "cape-verde", city: "sal" },
      { country: "curacao", city: "willemstad" },
      { country: "mauritius", city: "mauritius" },
      { country: "indonesia", city: "bali" },
    ],
    photoQuery: "tropical beach palm trees sunny",
  },
  {
    slug: "warm-winter-sun-destinations",
    category: "seasonal",
    title: "Winter Sun 2026–27: 20 Destinations Near Europe Ranked by 10 Years of Weather Data",
    seoTitle: "Winter Sun Ranking 2026–27: 20 Destinations Compared",
    description:
      "Where is it warmest, sunniest and driest from December to February within about 6 hours of Europe? 20 winter-sun destinations ranked with 10 years of climate data: Egypt's Red Sea, Dubai, the Canary Islands, Agadir, Cape Verde and more.",
    updated: "2026-09-29",
    intro:
      "Every winter the same question comes up: where can you actually get sun between December and February without a long-haul flight? Instead of opinions, we ranked 20 popular winter-sun destinations within roughly 6 hours of most of Europe using 10 years of climate data (NASA POWER, 2011–2020). The result: Egypt's Red Sea coast and the Gulf win on heat and sunshine, the Canary Islands and Agadir are the best short-haul picks, and several classic Mediterranean \"winter sun\" favourites turn out to be cooler and wetter than people expect.",
    sections: [
      {
        heading: "How we ranked them",
        paragraphs: [
          "For each destination we averaged December, January and February: the daytime high, the night-time low, monthly rainfall and cloud cover. The Winter Sun score rewards warmth and penalises rain and cloud (score = average high in °C − rainfall ÷ 10 − cloud cover % ÷ 10). Figures are area averages from satellite-based climate data, so a sheltered beach can be a little warmer and sunnier than the number shown.",
        ],
      },
      {
        heading: "The ranking: December–February averages",
        bullets: [
          "1. Sharm el-Sheikh, Egypt: 23°C highs, 15°C lows, 2 mm rain a month, clear skies about 74% of the time",
          "2. Hurghada, Egypt: 22°C / 16°C, 1 mm rain, about 78% clear",
          "3. Abu Dhabi, UAE: 24°C / 19°C, 6 mm rain, about 60% clear",
          "4. Dubai, UAE: 24°C / 19°C, 12 mm rain, about 56% clear",
          "5. Agadir, Morocco: 21°C / 10°C, 22 mm rain, about 79% clear",
          "6. Fuerteventura, Canary Islands: 21°C / 15°C, 7 mm rain, about 63% clear",
          "7. Gran Canaria, Canary Islands: 21°C / 16°C, 12 mm rain, about 70% clear",
          "8. Cairo, Egypt: 20°C / 8°C, 9 mm rain, about 63% clear",
          "9. Boa Vista, Cape Verde: 23°C / 22°C, 25 mm rain, about 44% clear",
          "10. Lanzarote, Canary Islands: 19°C / 17°C, 11 mm rain, about 68% clear",
          "11. Sal, Cape Verde: 23°C / 22°C, 30 mm rain, about 44% clear",
          "12. Marrakech, Morocco: 19°C / 6°C, 27 mm rain, about 72% clear",
          "13. Tenerife, Canary Islands: 20°C / 18°C, 16 mm rain, about 42% clear (the south of the island is sunnier than this island-wide figure)",
          "14. Djerba, Tunisia: 16°C / 12°C, 19 mm rain, about 68% clear",
          "15. Madeira, Portugal: 18°C / 16°C, 29 mm rain, about 49% clear",
          "16. Seville, Spain: 16°C / 5°C, 37 mm rain, about 57% clear",
          "17. Algarve, Portugal: 16°C / 11°C, 46 mm rain, about 54% clear",
          "18. Málaga, Spain: 15°C / 12°C, 41 mm rain, about 45% clear",
          "19. Larnaca, Cyprus: 17°C / 13°C, 64 mm rain, about 50% clear",
          "20. Malta: 16°C / 14°C, 60 mm rain, about 39% clear",
        ],
      },
      {
        heading: "Key findings",
        bullets: [
          "Egypt's Red Sea resorts are the sunniest and driest winter destinations near Europe: barely any rain from December to February.",
          "Dubai and Abu Dhabi are the warmest, at about 24°C by day and 19°C at night — the mildest nights on the list after Cape Verde.",
          "The Canary Islands are the best choice under 4–5 hours from most of Europe: about 19–21°C with very little rain. Fuerteventura and Gran Canaria rank highest.",
          "Cape Verde has the warmest nights (about 22°C) but more cloud than the Canaries or Egypt.",
          "Classic Mediterranean \"winter sun\" spots — Malta, Cyprus, Málaga and the Algarve — average only 15–17°C with 40–65 mm of rain a month: pleasant for city breaks, not for sunbathing.",
          "Marrakech and Agadir have plenty of sun, but nights are cool (6–10°C), so pack layers.",
        ],
      },
      {
        heading: "Which one should you choose?",
        bullets: [
          "Guaranteed sun and warm sea for snorkelling: Sharm el-Sheikh or Hurghada.",
          "Warmest days and nights: Dubai or Abu Dhabi.",
          "Shortest flight for reliable mild weather: Fuerteventura, Gran Canaria or Lanzarote.",
          "Sun plus culture: Agadir combined with Marrakech, or Cairo.",
          "Mild city break rather than beach: Seville, Málaga, Malta or the Algarve.",
          "Going further? The Caribbean, Mexico and Thailand are all in their dry season: Curaçao and Punta Cana average about 27°C, Phuket about 28°C.",
        ],
      },
      {
        heading: "Using this data",
        paragraphs: [
          "Journalists, bloggers and travel sites are welcome to use this ranking. Please credit WeatherCompare with a link to this page. Every destination also has a month-by-month climate page and a live forecast comparison from three weather services on this site.",
        ],
      },
    ],
    relatedCityPaths: [
      { country: "egypt", city: "sharm-el-sheikh" },
      { country: "egypt", city: "hurghada" },
      { country: "uae", city: "dubai" },
      { country: "spain", city: "fuerteventura" },
      { country: "spain", city: "gran-canaria" },
      { country: "morocco", city: "agadir" },
    ],
    photoQuery: "Red Sea beach Egypt sunny",
  },
  {
    slug: "how-accurate-are-weather-forecasts-for-travel",
    category: "comparison",
    title: "How Far Ahead Can You Trust a Weather Forecast for Your Trip?",
    seoTitle: "How Accurate Are Weather Forecasts for Travel?",
    description:
      "How accurate are 3-day, 7-day and 14-day forecasts, why weather apps disagree, and how to plan a trip weeks or months ahead using climate averages instead.",
    updated: "2026-09-29",
    intro:
      "\"The app says rain every day of my holiday. Should I worry?\" If your trip is more than a week away, usually not. Weather forecasts are very good in the short term and lose detail quickly after that. Here is how to read them at different distances, why different apps show different weather for the same place, and what to use instead when you're planning months ahead.",
    sections: [
      {
        heading: "1–3 days ahead: trust it",
        paragraphs: [
          "Modern forecasts for the next one to three days are generally reliable for temperature and whether it will be a wet or dry day. This is the time to plan your outdoor days, boat trips and hikes around the forecast.",
        ],
      },
      {
        heading: "4–7 days ahead: good for the trend",
        paragraphs: [
          "At this range forecasts are usually right about the general pattern (a warm spell, a cooler, unsettled period) but the timing of individual showers can shift by a day or more. Use it to decide which days look best, then re-check the evening before.",
        ],
      },
      {
        heading: "8–16 days ahead: a hint, not a plan",
        paragraphs: [
          "Beyond about a week, day-by-day detail becomes unreliable. A rain symbol on day 12 often just means some models show a chance of rain. It's better to read these days as \"warmer or cooler than normal\" than as a specific forecast.",
        ],
      },
      {
        heading: "Why weather apps disagree",
        paragraphs: [
          "Different apps use different weather models, update them at different times, and turn percentages into icons in different ways. One app may show a rain icon for a 30% chance, another only above 50%.",
          "That's why comparing sources helps: when three independent forecasts agree, confidence is high. When they disagree, the weather really is uncertain, and it's worth keeping plans flexible. WeatherCompare shows three providers side by side for exactly this reason.",
        ],
      },
      {
        heading: "Planning months ahead? Use climate averages",
        paragraphs: [
          "For a trip that's weeks or months away, no forecast can help. What you need is the typical weather for that month: average highs and lows, how much rain usually falls, and how many cloudy days to expect. Every city on this site has a month-by-month page and a \"best time to visit\" page built from 10 years of data.",
        ],
        bullets: [
          "Months away: check the climate averages and the best-time-to-visit page.",
          "1–2 weeks away: watch the long-range trend, but don't cancel anything yet.",
          "3–7 days away: compare the forecasts and start planning specific days.",
          "1–2 days away: plan outdoor activities around the forecast.",
        ],
      },
    ],
    relatedCityPaths: [
      { country: "italy", city: "rome" },
      { country: "spain", city: "tenerife" },
      { country: "france", city: "paris" },
      { country: "uk", city: "london" },
    ],
    photoQuery: "weather forecast phone travel",
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
