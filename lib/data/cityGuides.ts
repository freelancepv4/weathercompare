/**
 * Original, hand-written guide content for every city in config/countries.ts.
 * Purely editorial (landmarks, best time to visit, getting around, local
 * tips) — no weather data lives here, that stays in the provider adapters.
 *
 * Keyed by `${countrySlug}:${citySlug}` to match config/countries.ts.
 *
 * Every field is either widely established, verifiable general knowledge
 * (a landmark's known role, a well-documented seasonal pattern) or a
 * clearly hedged practical observation ("most sights are walkable") —
 * nothing here invents precise statistics, prices, or opening hours that
 * change too often to state reliably in static content.
 */

export interface Landmark {
  name: string;
  description: string;
}

export interface CityGuide {
  intro: string;
  bestTimeToVisit: string;
  landmarks: Landmark[];
  localTip: string;
  /** One or two sentences on how visitors typically get around the city —
   * walkable centre, metro/transit system, or car-dependent sprawl. */
  gettingAround: string;
  /** A second, distinct practical tip beyond localTip — food, budget,
   * booking, or etiquette detail worth knowing before the trip. */
  goodToKnow: string;
}

export const cityGuides: Record<string, CityGuide> = {
  "italy:rome": {
    intro:
      "Italy's capital layers three thousand years of history into a single walkable city, where ancient ruins sit a few minutes from Renaissance piazzas and busy modern streets. Expect a livelier, less orderly pace than smaller Italian cities — Rome rewards travellers who build in slower, unplanned time between the major sights.",
    bestTimeToVisit:
      "Late April to June or September to October, when temperatures are mild and the summer crowds have thinned.",
    landmarks: [
      { name: "Colosseum", description: "The largest amphitheatre ever built in the Roman Empire, still the city's defining silhouette." },
      { name: "Vatican Museums & Sistine Chapel", description: "A vast collection of art and antiquities leading to Michelangelo's famous ceiling." },
      { name: "Trevi Fountain", description: "An 18th-century Baroque fountain where visitors toss a coin over their shoulder for good luck." },
      { name: "Pantheon", description: "A remarkably preserved 2nd-century Roman temple with the world's largest unreinforced concrete dome, free to enter." },
    ],
    localTip: "Book skip-the-line tickets for the Colosseum and Vatican in advance — same-day queues can run over an hour, especially in summer.",
    gettingAround:
      "The historic centre is largely walkable, but Rome is bigger than it looks on a map — the metro (two main lines) and buses fill the gaps, especially toward the Vatican and Trastevere.",
    goodToKnow:
      "A sit-down meal at a table with waiter service (\"al tavolo\") usually costs noticeably more than the same dish at a counter — worth knowing if you're eating on a budget.",
  },
  "italy:milan": {
    intro:
      "Italy's financial and fashion capital pairs Gothic grandeur with sleek modern design, and makes an easy base for day trips into the Lombardy lakes. It's a more businesslike, fast-paced city than Rome or Florence, with fashion, design, and finance as its backbone rather than ancient ruins.",
    bestTimeToVisit: "April to June or September to October, before the summer heat and after the crowds ease.",
    landmarks: [
      { name: "Duomo di Milano", description: "A vast marble Gothic cathedral whose rooftop terraces offer sweeping city views." },
      { name: "Galleria Vittorio Emanuele II", description: "One of the world's oldest shopping arcades, capped by an iron-and-glass dome." },
      { name: "Sforza Castle", description: "A 15th-century fortress now home to several of the city's art and history museums." },
      { name: "Navigli District", description: "Milan's canal district, lined with bars and restaurants and especially lively during the evening aperitivo hour." },
    ],
    localTip: "See Leonardo da Vinci's The Last Supper at Santa Maria delle Grazie — timed-entry tickets sell out weeks ahead, so book early.",
    gettingAround:
      "Milan has Italy's most extensive metro system, making it easy to reach sights spread further apart than in a smaller historic centre.",
    goodToKnow:
      "Aperitivo — a pre-dinner drink that comes with a spread of free snacks or a small buffet — is a genuine Milanese institution, typically running from around 6 to 9pm.",
  },
  "italy:naples": {
    intro:
      "A dense, dramatic port city beneath Mount Vesuvius, known for its historic centre, its food, and its position as the gateway to Pompeii and the Amalfi Coast. It's rawer and less polished than Rome or Florence, which is exactly what draws travellers looking for a less touristy slice of Italy.",
    bestTimeToVisit: "Spring (April–June) or autumn (September–October) for comfortable sightseeing weather.",
    landmarks: [
      { name: "Spaccanapoli", description: "The narrow, arrow-straight street that splits the ancient historic centre in two." },
      { name: "Castel dell'Ovo", description: "A seafront castle on a small island, one of the oldest fortifications in the city." },
      { name: "Pompeii (day trip)", description: "The Roman city preserved by the 79 AD eruption of Vesuvius, roughly 40 minutes away." },
      { name: "Naples National Archaeological Museum", description: "One of the world's most important collections of Greco-Roman artifacts, including finds from Pompeii and Herculaneum." },
    ],
    localTip: "Naples is widely credited as the birthplace of pizza — a Margherita here is a different experience from anywhere else in the country.",
    gettingAround:
      "The historic centre is walkable but dense and chaotic; a hop-on train or the Circumvesuviana line is the standard way to reach Pompeii, Herculaneum, and the Amalfi Coast.",
    goodToKnow:
      "Naples pizza is traditionally eaten folded (a portafoglio) rather than cut with a knife and fork — a small detail that marks out where locals actually eat.",
  },
  "italy:turin": {
    intro:
      "An elegant, arcaded northern city known for its Baroque architecture, its café culture, and its role as Italy's first capital. It sits close to the Alps, giving it a cooler, more continental feel than most Italian cities further south.",
    bestTimeToVisit: "April to June or September to October, avoiding the humid peak of summer.",
    landmarks: [
      { name: "Mole Antonelliana", description: "A soaring 19th-century tower that now houses the National Museum of Cinema." },
      { name: "Egyptian Museum", description: "One of the largest collections of Egyptian antiquities outside Cairo." },
      { name: "Piazza Castello", description: "The grand central square ringed by royal palaces and porticoed streets." },
      { name: "Mercato di Porta Palazzo", description: "One of Europe's largest open-air markets, a good place to see everyday Turin away from the main sights." },
    ],
    localTip: "Turin claims to be the home of the espresso-based drink 'bicerin' — worth trying at one of its historic cafés.",
    gettingAround:
      "Turin's porticoed streets make for easy, largely covered walking even in wet weather, with a small driverless metro line for longer hops across the city.",
    goodToKnow:
      "Turin is also considered one of Italy's chocolate capitals — look for gianduja, a hazelnut-chocolate paste invented here, in cafés across the city.",
  },
  "italy:florence": {
    intro:
      "The cradle of the Renaissance, compact enough to explore on foot, with an extraordinary concentration of art and architecture. Almost everything worth seeing sits within a historic centre small enough to cross in under an hour, which makes it one of the easiest major Italian cities to plan a short trip around.",
    bestTimeToVisit: "April to May or September to October — summer is hot and heavily crowded.",
    landmarks: [
      { name: "Florence Cathedral (Duomo)", description: "Brunelleschi's red-tiled dome still dominates the skyline nearly six centuries on." },
      { name: "Uffizi Gallery", description: "Home to one of the world's most important collections of Renaissance painting." },
      { name: "Ponte Vecchio", description: "A medieval stone bridge lined with jewellers' shops over the Arno river." },
      { name: "Piazzale Michelangelo", description: "A hilltop square across the Arno with the city's best panoramic view, especially at sunset." },
    ],
    localTip: "Reserve Uffizi Gallery tickets online — the walk-up queue routinely stretches for hours in high season.",
    gettingAround:
      "Florence is best explored almost entirely on foot — the historic centre is compact enough that public transport is rarely necessary once you've arrived.",
    goodToKnow:
      "Bistecca alla fiorentina, the city's signature grilled steak, is typically sold and priced by weight and meant to be shared — check the menu before ordering solo.",
  },
  "italy:bologna": {
    intro:
      "A red-brick university city famous for its food, its porticoes, and its lively, less touristy atmosphere. As home to one of the world's oldest universities, it has a younger, more local energy than many other Italian art cities.",
    bestTimeToVisit: "Spring or early autumn, for pleasant walking weather under the arcades.",
    landmarks: [
      { name: "Two Towers", description: "The leaning medieval towers of Asinelli and Garisenda, the city's iconic skyline marker." },
      { name: "Piazza Maggiore", description: "The historic main square, framed by the Basilica of San Petronio." },
      { name: "Portico di San Luca", description: "A nearly 4km covered walkway of arches leading up to a hilltop sanctuary." },
      { name: "Quadrilatero Market", description: "The old medieval market district behind Piazza Maggiore, dense with food shops and delis." },
    ],
    localTip: "Bologna is the origin of ragù alla bolognese — look for it served with tagliatelle, not spaghetti, as it is locally.",
    gettingAround:
      "Bologna's famous porticoes mean you can walk most of the centre with cover from rain or sun — over 60km of them lace through the city.",
    goodToKnow:
      "Bologna is also the birthplace of tortellini and mortadella — a food-focused day here can easily rival any single monument for the highlight of a visit.",
  },
  "italy:palermo": {
    intro:
      "Sicily's capital blends Arab, Norman, and Baroque influences into a chaotic, colourful, deeply atmospheric city. Its layered history shows up as much in its street markets and food as in its churches and palaces.",
    bestTimeToVisit: "April to June or September to October — summer heat can be intense.",
    landmarks: [
      { name: "Palermo Cathedral", description: "A striking mix of architectural styles accumulated over centuries of rebuilding." },
      { name: "Teatro Massimo", description: "One of the largest opera houses in Europe, famed for its acoustics." },
      { name: "Ballarò Market", description: "A centuries-old street market and one of the best places to try Sicilian street food." },
      { name: "Palatine Chapel", description: "A 12th-century royal chapel inside the Norman Palace, renowned for its gold Byzantine mosaics." },
    ],
    localTip: "Try Palermo's street food — arancine and panelle are local staples best eaten straight from a market stall.",
    gettingAround:
      "The historic centre rewards walking, though its layout is dense and can be disorienting — a paper or offline map helps more here than in most Italian cities.",
    goodToKnow:
      "Palermo's markets (Ballarò, Vucciria, Capo) each have a slightly different character — visiting more than one gives a fuller sense of the city than any single sight.",
  },
  "italy:venice": {
    intro:
      "A city built on water, where canals replace streets and every corner opens onto another postcard view. There are no cars anywhere in the historic centre — everything moves on foot or by boat, which shapes the whole rhythm of a visit.",
    bestTimeToVisit: "April to June or September to October — November through early spring brings a higher risk of acqua alta flooding.",
    landmarks: [
      { name: "St Mark's Square & Basilica", description: "The historic heart of Venice, anchored by its gold-mosaic Byzantine basilica." },
      { name: "Rialto Bridge", description: "The oldest of the four bridges spanning the Grand Canal, lined with shops." },
      { name: "Grand Canal", description: "The city's main waterway, best seen from a vaporetto or a traditional gondola." },
      { name: "Doge's Palace", description: "The former residence of Venice's rulers, connected to the infamous Bridge of Sighs." },
    ],
    localTip: "Check the city's official tide forecast if visiting outside summer — acqua alta can close low-lying squares with little notice.",
    gettingAround:
      "Everything moves on foot or by boat — the vaporetto (water bus) network covers the Grand Canal and outer islands, while the historic centre itself is entirely pedestrian.",
    goodToKnow:
      "Venice charges a day-tripper access fee on many peak dates for visitors not staying overnight — check current requirements before a single-day visit.",
  },
  "italy:genoa": {
    intro:
      "A historic maritime republic turned working port city, with one of Europe's largest old towns and a compact aquarium-front waterfront. It's less visited than Italy's other major cities, which keeps its dense old town feeling genuinely local.",
    bestTimeToVisit: "April to June or September to October for mild coastal weather.",
    landmarks: [
      { name: "Genoa Aquarium", description: "One of the largest aquariums in Europe, on the restored old port." },
      { name: "Porto Antico", description: "The redeveloped historic harbour, now a hub for walking, dining, and museums." },
      { name: "Caruggi", description: "The dense maze of narrow medieval alleys that makes up the historic centre." },
      { name: "Via Garibaldi", description: "A UNESCO-listed street of Renaissance palaces, several now open as museums." },
    ],
    localTip: "Genoa is the birthplace of pesto — try it here made the traditional way, with a mortar and pestle.",
    gettingAround:
      "The old town's caruggi are pedestrian and best walked, while public lifts and funiculars help with the city's steep hillside districts.",
    goodToKnow:
      "Focaccia is a Genoese staple eaten at any time of day, often as a breakfast snack alongside a cappuccino — look for it fresh from a bakery rather than a restaurant.",
  },
  "italy:verona": {
    intro:
      "A Roman-founded city on the Adige river, best known for its ancient arena and its association with Shakespeare's Romeo and Juliet. Its compact, well-preserved centre makes it an easy add-on to a wider northern Italy trip.",
    bestTimeToVisit: "Spring or early autumn, avoiding the peak heat of July and August.",
    landmarks: [
      { name: "Verona Arena", description: "A 1st-century Roman amphitheatre that still hosts opera performances every summer." },
      { name: "Juliet's House", description: "A medieval courtyard house associated with Shakespeare's fictional heroine." },
      { name: "Piazza delle Erbe", description: "The old Roman forum, now a lively market square ringed by frescoed buildings." },
      { name: "Castelvecchio", description: "A 14th-century fortress with its own fortified bridge over the Adige, now an art museum." },
    ],
    localTip: "If opera is on at the Arena during your visit, it's one of the most memorable ways to spend an evening in the city.",
    gettingAround:
      "Verona's historic centre is small and flat enough to see almost entirely on foot in a day or two.",
    goodToKnow:
      "Verona sits close to Lake Garda, making it a workable base for a day trip to the lake if you have a car or are comfortable with regional trains and buses.",
  },
  "italy:bari": {
    intro:
      "The main city of Puglia, with an atmospheric old town squeezed onto a small peninsula and a lively seafront promenade. It's a practical gateway to the wider Puglia region — trulli towns, olive groves, and Adriatic coastline are all within reach.",
    bestTimeToVisit: "May to June or September, avoiding the height of summer heat.",
    landmarks: [
      { name: "Basilica di San Nicola", description: "A Romanesque basilica built to house the relics of Saint Nicholas, a major pilgrimage site." },
      { name: "Bari Vecchia", description: "The tangled old town, where residents still hand-make orecchiette pasta on the street." },
      { name: "Lungomare", description: "One of Italy's longest seafront promenades, popular for an evening stroll." },
      { name: "Swabian Castle", description: "A Norman-Swabian fortress on the edge of the old town, with roots going back to the 12th century." },
    ],
    localTip: "Walk through Bari Vecchia in the late morning to see local women hand-rolling orecchiette pasta outside their doorways.",
    gettingAround:
      "The old town is small and pedestrian; regional trains from Bari make popular Puglia day trips like Alberobello and Polignano a Mare straightforward without a car.",
    goodToKnow:
      "Bari's fish market and seafront kiosks are known for raw, just-caught seafood eaten standing up — a distinctly local experience worth seeking out.",
  },
  "italy:catania": {
    intro:
      "A Sicilian city rebuilt in black volcanic stone after Mount Etna's eruptions, with the volcano itself as a constant backdrop. Its Baroque centre, rebuilt after a 17th-century earthquake, is a UNESCO World Heritage Site.",
    bestTimeToVisit: "April to June or September to October.",
    landmarks: [
      { name: "Piazza Duomo", description: "The Baroque central square, anchored by the black-and-white lava-stone cathedral." },
      { name: "Mount Etna", description: "Europe's most active volcano, reachable on a half-day trip from the city." },
      { name: "La Pescheria", description: "A loud, historic fish market a short walk from the cathedral square." },
      { name: "Roman Amphitheatre", description: "The excavated remains of a Roman-era amphitheatre, sitting below the modern street level in the city centre." },
    ],
    localTip: "Book an Etna excursion with a licensed guide — conditions and accessible altitude change with the volcano's activity.",
    gettingAround:
      "The historic centre is walkable, and Catania is also a common base for reaching both Mount Etna and Sicily's eastern coast by rail or organised tours.",
    goodToKnow:
      "Try a granita with brioche for breakfast — it's the traditional Sicilian way to eat it, rather than as a dessert.",
  },
  "germany:berlin": {
    intro:
      "A city defined by its 20th-century history, now known equally for its museums, nightlife, and green public spaces. Its neighbourhoods each have a distinct character, from grand former-East boulevards to gritty, creative districts.",
    bestTimeToVisit: "May to September for warm, long days; the Christmas markets make December worthwhile too.",
    landmarks: [
      { name: "Brandenburg Gate", description: "The 18th-century neoclassical monument that became a symbol of German reunification." },
      { name: "Museum Island", description: "A UNESCO World Heritage cluster of five major museums on the Spree river." },
      { name: "East Side Gallery", description: "The longest surviving stretch of the Berlin Wall, painted with murals since 1990." },
      { name: "Reichstag Building", description: "Germany's parliament building, with a glass dome open to visitors that offers panoramic city views (advance booking required)." },
    ],
    localTip: "Many of Berlin's major museums are free or discounted on the first Sunday of the month at participating venues.",
    gettingAround:
      "Berlin is large and spread out, but its U-Bahn and S-Bahn networks are extensive and run late — most visitors rely on transit more than walking between districts.",
    goodToKnow:
      "A currywurst — sliced sausage in curry-spiced ketchup — is Berlin's signature street food, invented here after WWII and still sold from stands across the city.",
  },
  "germany:munich": {
    intro:
      "Bavaria's capital pairs grand royal architecture with a relaxed beer-garden culture and easy access to the Alps. It's more conservative and traditional in feel than Berlin, with deep roots in Bavarian customs still visible in everyday life.",
    bestTimeToVisit: "May to September, or late September for the start of Oktoberfest.",
    landmarks: [
      { name: "Marienplatz", description: "The central square, home to the New Town Hall's famous Glockenspiel clock." },
      { name: "Nymphenburg Palace", description: "The sprawling Baroque summer residence of the former Bavarian royal family." },
      { name: "English Garden", description: "One of the largest urban parks in the world, bigger than New York's Central Park." },
      { name: "Viktualienmarkt", description: "A permanent daily food market near Marienplatz with a large beer garden at its centre." },
    ],
    localTip: "Oktoberfest actually starts in mid-September — book accommodation many months ahead if visiting during the festival.",
    gettingAround:
      "Munich's compact centre is walkable, with an efficient U-Bahn and S-Bahn network for reaching outlying sights like Nymphenburg Palace or the English Garden's far end.",
    goodToKnow:
      "Beer gardens traditionally allow you to bring your own food as long as you buy drinks there — a long-standing Bavarian custom still honoured at many of the classic ones.",
  },
  "germany:hamburg": {
    intro:
      "A major port city built around water, with a striking modern skyline rising above its historic warehouse district. It has a distinct maritime identity — shipping and trade still visibly shape the city's economy and culture.",
    bestTimeToVisit: "May to September for the mildest, driest weather.",
    landmarks: [
      { name: "Speicherstadt", description: "The world's largest warehouse district, built on oak piles over the harbour water." },
      { name: "Miniatur Wunderland", description: "The world's largest model railway exhibit, a surprisingly compelling city attraction." },
      { name: "Elbphilharmonie", description: "A glass concert hall rising like a wave above the old harbour, with a free public viewing platform." },
      { name: "St. Pauli & Reeperbahn", description: "Hamburg's famous nightlife district, also home to the lively Fischmarkt on Sunday mornings." },
    ],
    localTip: "The Elbphilharmonie's Plaza viewing platform is free, but timed tickets are needed and go quickly — reserve online.",
    gettingAround:
      "Hamburg's U-Bahn, S-Bahn, and harbour ferries (which regular transit tickets also cover) make it easy to combine the historic centre with waterfront sights.",
    goodToKnow:
      "A harbour boat tour is one of the best ways to see the Speicherstadt and modern HafenCity skyline together, and most depart right from the historic Landungsbrücken piers.",
  },
  "germany:frankfurt": {
    intro:
      "Germany's financial capital, with a skyline of skyscrapers standing beside a carefully rebuilt medieval old town. It's a smaller, faster city to see than Berlin or Munich, making it a practical stop for a short layover-length visit.",
    bestTimeToVisit: "May to September for warm, comfortable sightseeing weather.",
    landmarks: [
      { name: "Römerberg", description: "The historic square at the heart of the old town, framed by reconstructed half-timbered houses." },
      { name: "Frankfurt Cathedral", description: "The Gothic church where Holy Roman Emperors were once elected and crowned." },
      { name: "Museumsufer", description: "A riverside row of museums covering everything from art to architecture and film." },
      { name: "Main Tower", description: "One of the few skyscraper observation decks in Europe open to the public, with views over the city and, on clear days, the surrounding hills." },
    ],
    localTip: "Try apfelwein (apple wine) at a traditional Sachsenhausen tavern — it's a Frankfurt specialty rarely found elsewhere.",
    gettingAround:
      "The city centre is compact and walkable, with the old town, main shopping streets, and riverside museums all within easy reach of each other on foot.",
    goodToKnow:
      "Frankfurt's old town (Altstadt) was almost entirely reconstructed after WWII — the half-timbered look is a careful modern recreation, not original medieval fabric.",
  },
  "germany:cologne": {
    intro:
      "A Rhine-side city whose twin-spired cathedral has watched over it since the Middle Ages, rebuilt almost entirely after WWII. It has one of Germany's most relaxed, sociable drinking cultures, centred on its own local beer style.",
    bestTimeToVisit: "April to October for mild weather and long daylight hours.",
    landmarks: [
      { name: "Cologne Cathedral", description: "A UNESCO-listed Gothic cathedral and one of the tallest twin-spired churches in the world." },
      { name: "Altstadt", description: "The reconstructed old town along the Rhine, dense with cafés and traditional Kölsch breweries." },
      { name: "Rhine Promenade", description: "A riverside path popular for walking and cycling with cathedral views." },
      { name: "Museum Ludwig", description: "A major modern art museum next to the cathedral, with a strong collection of Picasso and Pop Art." },
    ],
    localTip: "Kölsch beer is traditionally served in small 0.2-litre glasses — expect your waiter to keep bringing fresh ones until you say stop.",
    gettingAround:
      "Cologne's centre is walkable along the Rhine, with an efficient tram and light-rail network covering the rest of the city.",
    goodToKnow:
      "Cologne Cathedral's exterior stonework is a mix of original medieval sections and later 19th- and 20th-century completion work — construction actually took over 600 years.",
  },
  "france:paris": {
    intro:
      "France's capital needs little introduction — a dense, walkable city of grand boulevards, world-class museums, and neighbourhood life. Its 20 arrondissements each have their own character, so it rewards picking a base neighbourhood rather than just the sights.",
    bestTimeToVisit: "April to June or September to October, avoiding August when many Parisians (and some businesses) are away.",
    landmarks: [
      { name: "Eiffel Tower", description: "The 1889 iron tower that remains the city's most recognisable landmark." },
      { name: "Louvre Museum", description: "The world's most-visited museum, home to the Mona Lisa and the Venus de Milo." },
      { name: "Notre-Dame / Île de la Cité", description: "The medieval cathedral island at the historic heart of the city, still under restoration." },
      { name: "Montmartre & Sacré-Cœur", description: "A hilltop village-like district with a white-domed basilica and sweeping city views." },
    ],
    localTip: "Book Louvre and Eiffel Tower tickets online for a specific time slot — it's the single biggest time-saver in the city.",
    gettingAround:
      "The metro is extensive, fast, and covers nearly every corner of the city, making it the default way to move between neighbourhoods rather than walking every route.",
    goodToKnow:
      "Many boulangeries close one day a week (often Monday) on rotation, so if your favourite is shut, another nearby is usually open — Paris regulates this to keep bread available daily.",
  },
  "france:marseille": {
    intro:
      "France's oldest city and its biggest Mediterranean port, with a gritty, sun-bleached charm distinct from the rest of the country. It feels more Mediterranean than typically French, shaped by centuries as a trading and immigration hub.",
    bestTimeToVisit: "May to June or September for warm weather without the peak summer crowds.",
    landmarks: [
      { name: "Vieux-Port", description: "The historic old harbour, still full of fishing boats and waterfront cafés." },
      { name: "Notre-Dame de la Garde", description: "A hilltop basilica overlooking the city, reachable by a scenic uphill walk or bus." },
      { name: "Calanques National Park", description: "Dramatic limestone cliffs and turquoise coves just outside the city." },
      { name: "Le Panier", description: "Marseille's oldest neighbourhood, a hillside maze of colourful streets and street art near the Vieux-Port." },
    ],
    localTip: "Try bouillabaisse at a restaurant that follows the Charte de la Bouillabaisse — it guarantees a traditional preparation.",
    gettingAround:
      "Central Marseille is walkable around the Vieux-Port and Le Panier; the Calanques and further beaches are usually reached by bus, boat, or a short drive.",
    goodToKnow:
      "The Calanques are best visited outside peak summer if possible — access is sometimes restricted on the highest-risk fire days in July and August.",
  },
  "france:lyon": {
    intro:
      "France's culinary capital, built on a peninsula between two rivers, with a UNESCO-listed old town of hidden passageways. It's often ranked alongside Paris for its food scene, without anywhere near the same crowds.",
    bestTimeToVisit: "April to June or September to October.",
    landmarks: [
      { name: "Basilica of Notre-Dame de Fourvière", description: "A hilltop basilica with sweeping views across Lyon and, on clear days, the Alps." },
      { name: "Vieux Lyon", description: "One of the largest Renaissance districts in Europe, full of narrow cobbled streets." },
      { name: "Traboules", description: "Hidden covered passageways once used by silk workers to move goods between streets." },
      { name: "Presqu'île", description: "The peninsula between Lyon's two rivers, home to the city's main shopping streets and squares." },
    ],
    localTip: "Eat at a traditional bouchon — Lyon's classic small restaurants serving hearty local dishes like quenelles and andouillette.",
    gettingAround:
      "A funicular connects Vieux Lyon to the Fourvière hilltop, and the city's metro and tram network covers the rest comfortably without a car.",
    goodToKnow:
      "Many traboules are inside private residential buildings but remain publicly accessible during daylight hours — keep noise down, as people actually live there.",
  },
  "france:nice": {
    intro:
      "The heart of the French Riviera, with a long pebble beach, pastel architecture, and an old town of narrow Italian-influenced streets. Its Mediterranean, sun-drenched feel comes partly from its history as an Italian city before joining France in 1860.",
    bestTimeToVisit: "May to June or September, when the Mediterranean coast is warm without peak-season crowds.",
    landmarks: [
      { name: "Promenade des Anglais", description: "The famous seafront promenade stretching along the Baie des Anges." },
      { name: "Vieux Nice", description: "The old town's maze of narrow streets, markets, and pastel-coloured buildings." },
      { name: "Castle Hill", description: "A hilltop park with panoramic views over the city and coastline, on the site of a former fortress." },
      { name: "Cours Saleya Market", description: "A daily flower, produce, and antiques market in the heart of the old town." },
    ],
    localTip: "Try socca, a chickpea-flour flatbread sold at market stalls, and salade niçoise, both born in this city.",
    gettingAround:
      "Central Nice is walkable, with trams connecting the main train station, old town, and port; nearby Riviera towns like Villefranche-sur-Mer are an easy short train ride.",
    goodToKnow:
      "Nice's beaches are mostly pebble, not sand — worth packing water shoes if you plan to spend real time swimming or sunbathing.",
  },
  "spain:madrid": {
    intro:
      "Spain's capital, laid out around grand boulevards and green parks, with one of the world's great art museum districts. It runs on a later daily rhythm than much of Europe — dinner rarely starts before 9pm.",
    bestTimeToVisit: "April to June or September to October — summer here gets very hot.",
    landmarks: [
      { name: "Prado Museum", description: "One of the world's finest collections of European art, from Goya to Velázquez." },
      { name: "Royal Palace of Madrid", description: "The official residence of the Spanish royal family, still used for state ceremonies." },
      { name: "Retiro Park", description: "A large landscaped park in the city centre, popular for walking, rowing, and people-watching." },
      { name: "Gran Vía", description: "Madrid's main thoroughfare, lined with early 20th-century architecture, theatres, and shops." },
    ],
    localTip: "Many Madrid museums, including the Prado, offer free entry during a couple of hours in the early evening — check current hours before visiting.",
    gettingAround:
      "Madrid's metro is extensive, fast, and one of the largest in Europe, making it the easiest way to cover a city that's more spread out than it first appears.",
    goodToKnow:
      "Tapas culture here often means moving between several bars over an evening, each known for one or two specialities, rather than a single sit-down meal.",
  },
  "spain:barcelona": {
    intro:
      "A Mediterranean city famous for Gaudí's architecture, a historic Gothic Quarter, and beaches within walking distance of the centre. Its distinct Catalan identity — language, flag, and culture — sets it apart from the rest of Spain.",
    bestTimeToVisit: "May to June or September to October, avoiding the peak summer heat and crowds.",
    landmarks: [
      { name: "Sagrada Família", description: "Gaudí's still-unfinished basilica, one of the most visited monuments in Spain." },
      { name: "Park Güell", description: "A whimsical public park designed by Gaudí, with mosaic-covered terraces and city views." },
      { name: "Gothic Quarter", description: "The medieval heart of the city, with narrow stone streets and Roman-era remains." },
      { name: "La Rambla & Boqueria Market", description: "The city's best-known boulevard, leading to a historic produce and tapas market just off it." },
    ],
    localTip: "Book Sagrada Família and Park Güell tickets online in advance — both cap daily visitor numbers and often sell out.",
    gettingAround:
      "Barcelona's metro network is fast and covers the whole city well, though the Gothic Quarter and beachfront are both easily walkable once you're there.",
    goodToKnow:
      "Pickpocketing is a genuinely common issue on La Rambla and the metro — keep bags zipped and in front of you in crowded areas, as in any major tourist city.",
  },
  "spain:valencia": {
    intro:
      "Spain's third-largest city, home to the birthplace of paella, a futuristic arts complex, and a former riverbed turned park. It's noticeably more relaxed and less crowded than Madrid or Barcelona, with a strong claim to being Spain's best food city.",
    bestTimeToVisit: "March to May or September to October for comfortable temperatures.",
    landmarks: [
      { name: "City of Arts and Sciences", description: "A striking futuristic complex of museums, an aquarium, and an opera house." },
      { name: "Central Market", description: "One of the oldest and largest produce markets in Europe, housed in an Art Nouveau building." },
      { name: "Turia Gardens", description: "A 9km park built along the old riverbed, running through much of the city." },
      { name: "Valencia Cathedral", description: "A Gothic cathedral said to house the Holy Chalice, with a bell tower offering city views." },
    ],
    localTip: "Paella originated here — for the most traditional version, look for arroz a la valenciana on the menu.",
    gettingAround:
      "The Turia Gardens' car-free park cuts right through the city and connects most major sights on foot or by bike, alongside a compact metro network.",
    goodToKnow:
      "Traditional Valencian paella is made with rabbit and chicken, not seafood — the seafood version is a different, equally valid dish, but not the original.",
  },
  "spain:seville": {
    intro:
      "The heart of Andalusia, known for flamenco, Moorish architecture, and some of the hottest summers in mainland Europe. Its blend of Islamic, Christian, and Jewish heritage is visible across the old city, especially in the Real Alcázar and Santa Cruz quarter.",
    bestTimeToVisit: "March to May or October to November — July and August bring extreme heat.",
    landmarks: [
      { name: "Seville Cathedral & Giralda", description: "The largest Gothic cathedral in the world, with a bell tower that was once a minaret." },
      { name: "Real Alcázar", description: "A royal palace complex showcasing centuries of Mudéjar architecture." },
      { name: "Plaza de España", description: "A grand semicircular plaza built for the 1929 Ibero-American Exposition." },
      { name: "Barrio Santa Cruz", description: "The former Jewish quarter, a maze of narrow whitewashed streets near the cathedral." },
    ],
    localTip: "If visiting in summer, plan sightseeing for early morning or evening — afternoon temperatures regularly pass 35°C.",
    gettingAround:
      "Seville's historic centre is compact and walkable, and increasingly bike-friendly thanks to a dedicated cycle-lane network across the city.",
    goodToKnow:
      "Flamenco performed in a tablao (a dedicated small venue) is generally a more authentic experience than a large dinner-show — ask locally for a genuine, less touristy option.",
  },
  "uk:london": {
    intro:
      "The UK's capital and one of the world's most visited cities, spanning royal history, world-class museums, and a huge range of neighbourhoods. Its scale means most visitors see it in distinct chunks rather than as one continuous walk.",
    bestTimeToVisit: "May to September for the warmest, driest weather and the longest daylight hours.",
    landmarks: [
      { name: "Tower of London", description: "A historic castle on the Thames that has served as a fortress, palace, and prison." },
      { name: "British Museum", description: "A vast, free museum of world history and culture, including the Rosetta Stone." },
      { name: "Buckingham Palace", description: "The monarch's official London residence, with the Changing of the Guard held several mornings a week." },
      { name: "Westminster Abbey & Big Ben", description: "The coronation church of British monarchs, next to the Houses of Parliament and its famous clock tower." },
    ],
    localTip: "Many of London's biggest museums — including the British Museum — are free to enter, though special exhibitions carry a charge.",
    gettingAround:
      "The Underground (Tube) covers the whole city and is generally faster than walking or driving between the major sightseeing areas.",
    goodToKnow:
      "Standing on the right and walking on the left on Tube escalators is a strongly enforced unwritten rule — blocking the left side is one of the fastest ways to draw a look from commuters.",
  },
  "uk:manchester": {
    intro:
      "A former industrial powerhouse turned cultural capital of the north, known for its music scene, football, and regenerated warehouses. It has a strong, distinct civic identity separate from London, built on its industrial and musical history.",
    bestTimeToVisit: "May to September for the mildest, driest conditions.",
    landmarks: [
      { name: "Manchester Cathedral", description: "A medieval cathedral in the historic heart of the city centre." },
      { name: "Science and Industry Museum", description: "A museum on the site of the world's oldest surviving passenger railway station." },
      { name: "Northern Quarter", description: "A bohemian district of independent shops, street art, and live music venues." },
      { name: "John Rylands Library", description: "A dramatic neo-Gothic library on Deansgate, free to enter and one of the city's most striking interiors." },
    ],
    localTip: "Football fans can tour Old Trafford or the Etihad Stadium even outside match days — book stadium tours ahead of time.",
    gettingAround:
      "The city centre is compact and walkable, with trams (Metrolink) covering the wider city and airport connections.",
    goodToKnow:
      "Manchester's weather is genuinely rainy year-round rather than seasonally — pack a waterproof layer regardless of when you visit.",
  },
  "uk:edinburgh": {
    intro:
      "Scotland's capital, built across dramatic hills and extinct volcanoes, with a medieval Old Town beside an elegant Georgian New Town. The contrast between the two districts — one a warren of closes and wynds, the other laid out in orderly grids — is part of what makes it a UNESCO World Heritage Site.",
    bestTimeToVisit: "May to September, or August specifically for the Edinburgh Fringe Festival.",
    landmarks: [
      { name: "Edinburgh Castle", description: "A fortress perched on an extinct volcanic crag, dominating the city skyline." },
      { name: "Royal Mile", description: "The historic street linking the Castle to the Palace of Holyroodhouse." },
      { name: "Arthur's Seat", description: "An extinct volcano within the city, with a walkable summit and panoramic views." },
      { name: "New Town", description: "The elegant Georgian district that contrasts with the Old Town, itself a UNESCO World Heritage site." },
    ],
    localTip: "If visiting in August, book accommodation and Fringe Festival show tickets well ahead — the city's population roughly doubles.",
    gettingAround:
      "Central Edinburgh is very walkable, though the Old Town's steep closes and hills make comfortable shoes more important than in a flatter city.",
    goodToKnow:
      "Edinburgh's weather can shift quickly even within a single day — layer up regardless of season, as locals routinely do.",
  },
  "uk:birmingham": {
    intro:
      "The UK's second-largest city, once the industrial 'workshop of the world', now known for its canals, curry houses, and jewellery trade. It has more miles of canal than Venice, a legacy of its role as an industrial manufacturing hub.",
    bestTimeToVisit: "May to September for the warmest, driest weather.",
    landmarks: [
      { name: "Birmingham Museum & Art Gallery", description: "A major museum with one of the world's best collections of Pre-Raphaelite art." },
      { name: "Library of Birmingham", description: "One of the largest public libraries in Europe, with a striking modern façade." },
      { name: "Jewellery Quarter", description: "A historic district still producing much of the UK's handmade jewellery." },
      { name: "Birmingham Canals", description: "A network of Victorian-era waterways through the city centre, now lined with bars, restaurants, and walking paths." },
    ],
    localTip: "Birmingham has more canals than Venice — a canalside walk through the city centre is one of the best free things to do.",
    gettingAround:
      "The city centre is walkable and increasingly pedestrianised, with trams and an extensive bus network covering areas like the Jewellery Quarter and Digbeth.",
    goodToKnow:
      "Birmingham is often credited as the birthplace of the balti curry — the Balti Triangle district remains one of the best places in the UK to try it.",
  },
  "usa:new-york": {
    intro:
      "A dense, round-the-clock city of five boroughs, where world-famous skyline views, museums, and neighbourhood food scenes sit a subway ride apart. Manhattan gets most of the attention, but Brooklyn, Queens, and the other boroughs hold plenty of their own draws.",
    bestTimeToVisit: "April to June or September to November, avoiding the humid peak of summer and the coldest weeks of winter.",
    landmarks: [
      { name: "Central Park", description: "An 843-acre green space cutting through Manhattan, popular for walking, boating, and people-watching." },
      { name: "Empire State Building", description: "An Art Deco skyscraper with an observation deck offering sweeping views across the city." },
      { name: "Metropolitan Museum of Art", description: "One of the largest and most comprehensive art museums in the world." },
      { name: "Statue of Liberty & Ellis Island", description: "The harbour monument and adjoining former immigration station, reachable by ferry." },
    ],
    localTip: "Get a 7-day unlimited MetroCard (or use contactless tap) if you're staying more than a couple of days — it's far cheaper than single rides.",
    gettingAround:
      "The subway runs 24 hours a day and is the fastest way to cross Manhattan and reach the other boroughs — walking works well within a single neighbourhood but not much further.",
    goodToKnow:
      "Tipping (typically 15–20%) is expected at sit-down restaurants and for many services — it's built into how service workers are paid, not optional the way it can be elsewhere.",
  },
  "usa:los-angeles": {
    intro:
      "A sprawling, car-dependent city stitched together from distinct neighbourhoods, known for its entertainment industry, beaches, and near-constant sunshine. It's less a single city centre than a patchwork of very different areas — Downtown, Hollywood, Santa Monica — each with its own character.",
    bestTimeToVisit: "March to May or September to November, when temperatures are comfortable and coastal fog is less frequent.",
    landmarks: [
      { name: "Griffith Observatory", description: "A hilltop observatory with free telescopes and panoramic views of the Hollywood Sign and city below." },
      { name: "Santa Monica Pier", description: "A classic oceanfront pier with an amusement park and beach access." },
      { name: "The Getty Center", description: "A hilltop art museum and gardens with free admission and tram access." },
      { name: "Hollywood Walk of Fame", description: "The stretch of Hollywood Boulevard embedded with stars honouring entertainment-industry figures." },
    ],
    localTip: "Budget real time for driving between neighbourhoods — LA's distances look short on a map but traffic can make them slow.",
    gettingAround:
      "A car is close to essential for most itineraries — public transit exists but covers only parts of the city, and distances between neighbourhoods are significant.",
    goodToKnow:
      "Morning marine layer (coastal fog and cloud) is common even in summer, especially near the beach — it usually burns off by early-to-mid afternoon.",
  },
  "usa:chicago": {
    intro:
      "A Great Lakes city famous for its bold modern and early-skyscraper architecture, deep-dish pizza, and a long lakefront path connecting its parks. It's often cited as the birthplace of the modern skyscraper, and that architectural history is still visible throughout downtown.",
    bestTimeToVisit: "May to June or September to October, avoiding the bitter winter cold and the most humid days of summer.",
    landmarks: [
      { name: "Millennium Park", description: "Home to the reflective 'Cloud Gate' sculpture (locally nicknamed 'The Bean')." },
      { name: "Art Institute of Chicago", description: "One of the oldest and largest art museums in the United States." },
      { name: "Willis Tower Skydeck", description: "A glass-floored observation deck high above the Loop, with views across four states on a clear day." },
      { name: "Navy Pier", description: "A lakefront entertainment pier with a Ferris wheel, gardens, and boat tours." },
    ],
    localTip: "A river or lake architecture boat tour is one of the best ways to see the skyline that made Chicago famous for its buildings.",
    gettingAround:
      "The 'L' train network covers downtown and most neighbourhoods well, and the Loop area itself is easily walkable once you're there.",
    goodToKnow:
      "Chicago-style deep-dish pizza is closer to a pie than a typical flat pizza — it takes longer to bake, so many restaurants ask you to order it before you sit down.",
  },
  "usa:miami": {
    intro:
      "A subtropical coastal city known for its beaches, Art Deco architecture, and strong Latin American and Caribbean influence. English and Spanish are used interchangeably across much of the city, reflecting its deep ties to the wider Caribbean and Latin America.",
    bestTimeToVisit: "November to April, outside the hot, humid, and hurricane-prone summer and early autumn months.",
    landmarks: [
      { name: "South Beach", description: "Miami's best-known beach, backed by pastel Art Deco hotels along Ocean Drive." },
      { name: "Wynwood Walls", description: "An outdoor museum of large-scale murals in a converted warehouse district." },
      { name: "Vizcaya Museum and Gardens", description: "An early 20th-century waterfront estate modeled on Italian Renaissance villas." },
      { name: "Little Havana", description: "A historic Cuban-American neighbourhood known for its cafés, cigar shops, and Calle Ocho street life." },
    ],
    localTip: "Check the Atlantic hurricane season (June–November) if booking a summer trip — it can affect flights and outdoor plans with little notice.",
    gettingAround:
      "A car or rideshare is the practical way to cover Miami's spread-out districts, though South Beach itself is walkable once you're there.",
    goodToKnow:
      "A cafecito (small, strong Cuban coffee) from a Little Havana walk-up window is a genuine local ritual, usually shared and drunk standing at the counter.",
  },
  "usa:san-francisco": {
    intro:
      "A hilly, compact city on the water, known for the Golden Gate Bridge, cable cars, and a famously mild but changeable microclimate. Its neighbourhoods can each feel like a different city block by block, from Victorian houses to steep, view-filled hills.",
    bestTimeToVisit: "September to November, when fog is less frequent and temperatures are at their warmest — summer here can be surprisingly cool and foggy.",
    landmarks: [
      { name: "Golden Gate Bridge", description: "The Art Deco suspension bridge that has defined the city's skyline since 1937." },
      { name: "Alcatraz Island", description: "A former federal prison on an island in the bay, reachable by ferry and best booked ahead." },
      { name: "Fisherman's Wharf", description: "A lively waterfront area with seafood, sea lions, and views across the bay." },
      { name: "Golden Gate Park", description: "A large park stretching from downtown to the ocean, home to gardens, museums, and open lawns." },
    ],
    localTip: "Bring layers even in summer — Mark Twain's famous (if apocryphal) line about a cold San Francisco summer is closer to true than visitors expect.",
    gettingAround:
      "The city's steep hills make walking tiring in places, but cable cars, buses, and the Muni Metro cover most routes well.",
    goodToKnow:
      "Alcatraz tickets regularly sell out days or weeks ahead in peak season — book as early as your dates are confirmed.",
  },
  "japan:tokyo": {
    intro:
      "A vast, layered metropolis where ultramodern districts, quiet shrines, and dense neighbourhood streets sit within the same efficient train network. Despite its size, it's known as one of the safest and most orderly major cities in the world.",
    bestTimeToVisit: "March to May for cherry blossoms, or September to November for mild temperatures and autumn colour.",
    landmarks: [
      { name: "Senso-ji Temple", description: "Tokyo's oldest temple, in the historic Asakusa district, approached through a lively market street." },
      { name: "Shibuya Crossing", description: "One of the world's busiest pedestrian crossings, a symbol of the city's scale and energy." },
      { name: "Meiji Shrine", description: "A forested Shinto shrine near Harajuku, a calm contrast to the surrounding city." },
      { name: "Shinjuku Gyoen", description: "A large, landscaped park blending Japanese, French, and English garden styles near Shinjuku station." },
    ],
    localTip: "Get an IC card (Suica or Pasmo) on arrival — it works across nearly all trains, subways, and buses, and at many convenience stores.",
    gettingAround:
      "Tokyo's train and subway network is extensive, punctual, and the default way to get around — most visitors rarely need a taxi except late at night.",
    goodToKnow:
      "Eating or drinking while walking on the street is generally considered poor etiquette — most people eat standing near a stall or vending machine, or wait until seated.",
  },
  "japan:osaka": {
    intro:
      "Japan's food capital, known for its casual, lively street food culture and as an easy base for day trips to Kyoto and Nara. Locals have a reputation for being more outgoing and humour-driven than in more reserved Tokyo.",
    bestTimeToVisit: "March to May or October to November, avoiding the hot, humid summer.",
    landmarks: [
      { name: "Osaka Castle", description: "A reconstructed feudal-era castle set in a large park, with a museum inside." },
      { name: "Dotonbori", description: "A neon-lit canalside district packed with restaurants, famous for its giant illuminated signs." },
      { name: "Shitennoji Temple", description: "One of Japan's oldest officially administered temples, founded in the 6th century." },
      { name: "Kuromon Ichiba Market", description: "A lively covered market known as \"Osaka's kitchen,\" good for trying fresh seafood and street snacks." },
    ],
    localTip: "Osaka is widely considered Japan's best city for street food — look for takoyaki and okonomiyaki at casual stalls in Dotonbori.",
    gettingAround:
      "Osaka's subway network covers the city well, and it's also a convenient rail hub for day trips to Kyoto and Nara, both under an hour away.",
    goodToKnow:
      "Unlike in Tokyo, standing on the right (not left) on escalators is the local custom in Osaka — a small but noticeable regional difference.",
  },
  "japan:kyoto": {
    intro:
      "Japan's former imperial capital, with thousands of temples and shrines, preserved geisha districts, and some of the country's most photographed gardens. It was largely spared bombing in WWII, so much of its historic architecture survives intact.",
    bestTimeToVisit: "March to April for cherry blossoms or November for autumn foliage — both are peak season, so book well ahead.",
    landmarks: [
      { name: "Fushimi Inari Shrine", description: "Famous for its thousands of vermillion torii gates climbing the hillside behind the shrine." },
      { name: "Kinkaku-ji (Golden Pavilion)", description: "A Zen temple whose top two floors are covered in gold leaf, reflected in its surrounding pond." },
      { name: "Arashiyama Bamboo Grove", description: "A towering bamboo forest path on the city's western edge." },
      { name: "Gion District", description: "Kyoto's famous geisha district, with preserved wooden machiya houses and teahouses." },
    ],
    localTip: "Visit the most famous sites (Fushimi Inari, Kinkaku-ji) at opening time — both get extremely crowded by mid-morning.",
    gettingAround:
      "Kyoto's sights are spread across the city, so a combination of buses, trains, and taxis usually works better than trying to walk between districts.",
    goodToKnow:
      "Photographing geisha or maiko without permission, especially in Gion's private lanes, is discouraged and increasingly restricted — always ask first or photograph from public streets.",
  },
  "uae:dubai": {
    intro:
      "A fast-built desert city of record-breaking skyscrapers, large-scale shopping malls, and beaches on the Arabian Gulf. Much of what's here today was built within the last few decades, giving it a distinctly futuristic, master-planned feel.",
    bestTimeToVisit: "November to March, when daytime temperatures are pleasant — summer regularly exceeds 40°C.",
    landmarks: [
      { name: "Burj Khalifa", description: "The world's tallest building, with an observation deck offering views across the city and desert." },
      { name: "Dubai Mall", description: "One of the world's largest shopping malls, with an aquarium and ice rink among its attractions." },
      { name: "Dubai Marina", description: "A dense, walkable waterfront district of high-rises, restaurants, and a promenade." },
      { name: "Al Fahidi Historical District", description: "A restored old quarter with wind-tower architecture, offering a rare glimpse of Dubai before the skyscrapers." },
    ],
    localTip: "If visiting in summer, plan outdoor sightseeing for early morning or evening — midday heat can be genuinely dangerous to underestimate.",
    gettingAround:
      "Dubai is spread out and built around highways, but its modern metro connects most major districts, malls, and the airport.",
    goodToKnow:
      "Dress and behaviour standards are more conservative than many visitors expect outside beach and pool areas — shoulders and knees covered is a safe default in malls and public spaces.",
  },
  "uae:abu-dhabi": {
    intro:
      "The UAE's capital, a more spacious and formal counterpart to Dubai, built around grand mosques, museums, and a long corniche. It moves at a slightly slower, more official pace than its more commercially driven neighbour.",
    bestTimeToVisit: "November to March, avoiding the extreme heat of the summer months.",
    landmarks: [
      { name: "Sheikh Zayed Grand Mosque", description: "One of the world's largest mosques, known for its white marble domes and vast prayer hall." },
      { name: "Louvre Abu Dhabi", description: "An art and civilization museum built under a striking perforated dome." },
      { name: "Corniche Beach", description: "A long, family-friendly beach along the city's waterfront promenade." },
      { name: "Qasr Al Watan", description: "The UAE's presidential palace, with sections open to the public showcasing Arabian craftsmanship." },
    ],
    localTip: "Dress modestly when visiting the Grand Mosque — robes are available to borrow at the entrance if needed.",
    gettingAround:
      "Abu Dhabi is spread across several islands connected by bridges — a car or taxi is the most practical way to cover its main sights.",
    goodToKnow:
      "The Sheikh Zayed Grand Mosque is free to enter and one of the few working mosques in the region that welcomes non-Muslim visitors on a daily basis, outside prayer times.",
  },
  "australia:sydney": {
    intro:
      "Australia's largest city, built around a dramatic natural harbour, with a mild climate that keeps its beaches and outdoor life going most of the year. Its harbour setting shapes daily life here more than in almost any other major city.",
    bestTimeToVisit: "September to November or March to May — Southern Hemisphere spring and autumn, avoiding peak summer crowds and heat.",
    landmarks: [
      { name: "Sydney Opera House", description: "The sail-shaped performing arts venue that has become Australia's most recognisable building." },
      { name: "Sydney Harbour Bridge", description: "A steel arch bridge offering walking access and a climbable summit with harbour views." },
      { name: "Bondi Beach", description: "One of Australia's best-known beaches, with a scenic coastal walk to Coogee." },
      { name: "The Rocks", description: "Sydney's oldest neighbourhood, with cobbled lanes, markets, and colonial-era buildings near the harbour bridge." },
    ],
    localTip: "Remember Australia's seasons are reversed from the Northern Hemisphere — 'summer' here runs December to February.",
    gettingAround:
      "Sydney's ferries are one of the most enjoyable ways to get around the harbour, alongside a train and light-rail network covering the wider city.",
    goodToKnow:
      "Sun protection matters more here than most visitors expect — the UV index runs high even on mild days, so sunscreen is a genuine daily habit, not just a summer one.",
  },
  "australia:melbourne": {
    intro:
      "Australia's cultural capital, known for its laneway cafés, street art, and a famously changeable climate — locals joke you can get four seasons in one day. It's widely considered Australia's coffee and dining capital, with a dense, walkable inner city.",
    bestTimeToVisit: "March to May or September to November, for milder, more predictable weather.",
    landmarks: [
      { name: "Federation Square", description: "The city's central civic square, home to galleries, events, and a striking angular design." },
      { name: "Queen Victoria Market", description: "A historic open-air market selling fresh produce, food, and local goods since the 1870s." },
      { name: "Royal Botanic Gardens", description: "Expansive gardens along the Yarra River, a short walk from the city centre." },
      { name: "Laneways & Street Art", description: "A network of hidden inner-city laneways covered in murals and packed with small cafés and bars." },
    ],
    localTip: "Pack a layer even in summer — Melbourne's weather can shift quickly, especially with the 'southerly change' that follows hot days.",
    gettingAround:
      "Melbourne has the largest tram network in the world, and the inner city's free tram zone makes short hops around downtown genuinely free.",
    goodToKnow:
      "Melbourne takes its coffee seriously — independent cafés generally outrank chain coffee shops here, a point of local pride worth leaning into.",
  },
  "netherlands:amsterdam": {
    intro:
      "A compact canal city best explored by bike or on foot, with a dense concentration of museums and a UNESCO-listed historic centre. Cycling isn't just a tourist activity here — it's the primary way most residents get around daily.",
    bestTimeToVisit: "April for tulip season, or May to September for the mildest, driest weather.",
    landmarks: [
      { name: "Rijksmuseum", description: "The Netherlands' national museum, home to Rembrandt's The Night Watch." },
      { name: "Anne Frank House", description: "The preserved hiding place documented in Anne Frank's diary, one of the city's most visited sites." },
      { name: "Canal Ring", description: "The UNESCO-listed 17th-century canal belt, best seen on foot, by bike, or from a boat." },
      { name: "Jordaan District", description: "A former working-class neighbourhood turned charming residential area of narrow streets and small galleries." },
    ],
    localTip: "Book Anne Frank House and Rijksmuseum tickets online well in advance — both regularly sell out, especially in summer.",
    gettingAround:
      "Renting a bike is the most authentically Amsterdam way to get around, though the compact centre is also very walkable and served by trams.",
    goodToKnow:
      "Stick to marked bike lanes as a pedestrian — cyclists have genuine right of way here, and stepping into a bike lane without looking is a common visitor mistake.",
  },
  "netherlands:rotterdam": {
    intro:
      "A rebuilt, architecturally bold port city, known for its modern skyline in contrast to Amsterdam's historic one. Almost entirely destroyed in a WWII bombing raid, it was rebuilt as a testing ground for ambitious modern architecture.",
    bestTimeToVisit: "May to September for the warmest, driest weather.",
    landmarks: [
      { name: "Cube Houses", description: "A cluster of tilted cube-shaped houses, one of the city's most photographed modern landmarks." },
      { name: "Markthal", description: "A striking arched market hall combining food stalls with apartments and a huge ceiling mural." },
      { name: "Erasmus Bridge", description: "A cable-stayed bridge nicknamed 'The Swan' that has become a symbol of the rebuilt city." },
      { name: "Euromast", description: "A 185-metre observation tower offering panoramic views over the city and its port." },
    ],
    localTip: "Rotterdam is one of Europe's most bike-friendly cities — renting one is an easy way to cover its spread-out modern landmarks.",
    gettingAround:
      "A metro, tram, and extensive cycling network all cover the city well — Rotterdam's landmarks are more spread out than Amsterdam's, so transit or a bike helps more here.",
    goodToKnow:
      "Because Rotterdam was rebuilt almost entirely after WWII, it has a very different, far more modern architectural character than most other historic Dutch cities.",
  },
  "portugal:lisbon": {
    intro:
      "A hilly, coastal capital of pastel buildings, historic trams, and viewpoints (miradouros) over the Tagus river. Its seven hills mean a lot of up-and-down walking, softened by frequent viewpoints and outdoor café stops.",
    bestTimeToVisit: "March to May or September to October, avoiding the hottest and most crowded summer months.",
    landmarks: [
      { name: "Belém Tower", description: "A 16th-century fortified tower on the riverfront, a symbol of Portugal's Age of Discovery." },
      { name: "Jerónimos Monastery", description: "An elaborate Manueline-style monastery near Belém, a UNESCO World Heritage Site." },
      { name: "Alfama", description: "The oldest district in Lisbon, a maze of narrow streets and the traditional home of fado music." },
      { name: "Miradouro da Senhora do Monte", description: "One of Lisbon's best panoramic viewpoints, looking across the city's rooftops to the castle and river." },
    ],
    localTip: "Ride Tram 28 through the old town for classic views — but expect it to be crowded; an early morning ride avoids the worst of it.",
    gettingAround:
      "Lisbon's hills make walking tiring in places, but its historic trams, funiculars, and a metro network all help cover the steeper districts.",
    goodToKnow:
      "A pastel de nata (custard tart) from a genuinely old, well-regarded bakery is worth seeking out specifically — quality varies a lot between tourist-area stalls and the real thing.",
  },
  "portugal:porto": {
    intro:
      "A riverside city of tiled facades and steep streets, famous as the origin of port wine and its dramatic Douro river valley. It has a grittier, more workaday character than Lisbon, which many visitors end up preferring.",
    bestTimeToVisit: "May to June or September, for mild weather without peak summer crowds.",
    landmarks: [
      { name: "Ribeira District", description: "The colourful, UNESCO-listed riverfront old town, lined with cafés and port wine cellars across the water." },
      { name: "Livraria Lello", description: "An ornate early 20th-century bookshop, one of the most visited (and photographed) in the world." },
      { name: "Dom Luís I Bridge", description: "A double-deck iron bridge with walkable upper and lower levels and river views." },
      { name: "São Bento Railway Station", description: "A working train station famous for its entrance hall, covered in over 20,000 hand-painted azulejo tiles." },
    ],
    localTip: "Cross the river to Vila Nova de Gaia for port wine cellar tours — most of the historic producers are based there, not in Porto itself.",
    gettingAround:
      "Porto's steep streets are best tackled on foot in stages, with a metro and funicular helping on the steepest climbs between the riverfront and upper town.",
    goodToKnow:
      "Livraria Lello now charges an entry fee (redeemable against a book purchase) due to overwhelming visitor numbers — buy a timed ticket online rather than queuing on the day.",
  },
  "austria:vienna": {
    intro:
      "A former imperial capital of grand palaces, coffee house culture, and a long classical music tradition. As the former seat of the Habsburg Empire, its scale and grandeur reflect centuries as one of Europe's most powerful courts.",
    bestTimeToVisit: "April to June or September to October, or December for the Christmas markets.",
    landmarks: [
      { name: "Schönbrunn Palace", description: "The former summer residence of the Habsburgs, with extensive formal gardens." },
      { name: "St. Stephen's Cathedral", description: "The Gothic cathedral at the heart of the old town, with a distinctive tiled roof." },
      { name: "Belvedere Palace", description: "A Baroque palace complex housing Gustav Klimt's The Kiss among its art collection." },
      { name: "Hofburg Palace", description: "The Habsburgs' former winter residence, now housing several museums and the Spanish Riding School." },
    ],
    localTip: "Sit down at a traditional Viennese coffee house (Café Central, Café Sacher) rather than grabbing coffee to go — it's a genuine part of the culture, not just a tourist stop.",
    gettingAround:
      "Vienna's trams, U-Bahn, and buses are efficient and well-integrated, and the historic centre itself is compact enough to walk between major sights.",
    goodToKnow:
      "Viennese coffee house culture is UNESCO-recognised as intangible cultural heritage — lingering over one drink for hours with a newspaper is the actual local custom, not a tourist affectation.",
  },
  "austria:salzburg": {
    intro:
      "Mozart's birthplace, a compact Baroque city set against the Alps, also known as the filming location for The Sound of Music. Its old town's Baroque architecture is largely preserved intact and UNESCO-listed.",
    bestTimeToVisit: "May to September for hiking and outdoor sightseeing, or December for its Christmas market.",
    landmarks: [
      { name: "Hohensalzburg Fortress", description: "A hilltop medieval fortress overlooking the old town, reachable by funicular." },
      { name: "Mirabell Palace and Gardens", description: "Baroque gardens featured in The Sound of Music, free to enter." },
      { name: "Mozart's Birthplace", description: "The house where Wolfgang Amadeus Mozart was born in 1756, now a museum." },
      { name: "Salzburg Cathedral", description: "A 17th-century Baroque cathedral in the heart of the old town, where Mozart himself was baptised." },
    ],
    localTip: "A Sound of Music tour is popular but optional — the old town and fortress are worth the trip on their own merits.",
    gettingAround:
      "Salzburg's old town is compact and pedestrianised, with a funicular up to the fortress and buses covering the wider city and nearby lakes.",
    goodToKnow:
      "The Salzburg Card (available for one to several days) bundles entry to most major sights with public transport — worth totalling up if you plan to see more than two or three attractions.",
  },
  "greece:athens": {
    intro:
      "The birthplace of Western philosophy and democracy, where ancient ruins sit directly among the streets of a busy modern capital. Few cities anywhere let you walk from a functioning neighbourhood into a 2,500-year-old monument in a few minutes.",
    bestTimeToVisit: "April to June or September to October, avoiding the intense heat of July and August.",
    landmarks: [
      { name: "Acropolis", description: "The ancient citadel crowned by the Parthenon, visible from much of the city below." },
      { name: "Ancient Agora", description: "The former civic and commercial heart of ancient Athens, at the foot of the Acropolis." },
      { name: "Plaka", description: "The old neighbourhood beneath the Acropolis, with narrow streets and neoclassical buildings." },
      { name: "Acropolis Museum", description: "A modern museum at the foot of the Acropolis displaying artifacts found on the site, with a glass floor over ongoing excavations." },
    ],
    localTip: "Visit the Acropolis at opening time (8am) — both the crowds and the heat build quickly through the day.",
    gettingAround:
      "Central Athens is walkable between the Acropolis, Plaka, and Monastiraki, with a small but useful metro network for reaching the coast or the airport.",
    goodToKnow:
      "A combined ticket covering the Acropolis and several other major ancient sites is usually better value than paying for each individually if you plan to see more than two.",
  },
  "greece:thessaloniki": {
    intro:
      "Greece's second city, a seafront university town with a layered Byzantine, Ottoman, and Jewish history, and a lively food and nightlife scene. It has a younger, more relaxed energy than Athens, driven partly by its large student population.",
    bestTimeToVisit: "April to June or September to October for comfortable temperatures.",
    landmarks: [
      { name: "White Tower", description: "A former Ottoman fortress on the waterfront, now the city's best-known landmark and a museum." },
      { name: "Rotunda", description: "A 4th-century Roman monument later used as a church and mosque, now a museum site." },
      { name: "Ano Poli (Upper Town)", description: "The old town above the modern city, with preserved Byzantine walls and narrow streets." },
      { name: "Aristotelous Square", description: "The city's main seafront square, a central meeting point framed by early 20th-century architecture." },
    ],
    localTip: "Thessaloniki is considered Greece's food capital by many Greeks themselves — its street food and tavernas are worth building time around.",
    gettingAround:
      "The waterfront and old town are both walkable on their own, with local buses covering the wider city — Thessaloniki's compact size means a car is rarely necessary.",
    goodToKnow:
      "Try bougatsa, a custard- or cheese-filled pastry, for breakfast — it's a Thessaloniki specialty best eaten fresh from a local bakery rather than a café chain.",
  },
  "switzerland:zurich": {
    intro:
      "Switzerland's largest city, on a lake framed by mountains, combining a compact old town with a major financial centre. Despite its wealth and reputation for formality, its lake and rivers are clean enough for locals to swim in through summer.",
    bestTimeToVisit: "May to September for lake swimming and outdoor life, or December for Christmas markets.",
    landmarks: [
      { name: "Lake Zurich", description: "A large lake at the city's edge, popular for swimming, boat trips, and lakeside walks." },
      { name: "Old Town (Altstadt)", description: "The historic centre on both banks of the Limmat river, with narrow lanes and guild houses." },
      { name: "Grossmünster", description: "A twin-towered Romanesque church associated with the Swiss Reformation." },
      { name: "Bahnhofstrasse", description: "One of the world's most exclusive shopping streets, running from the main station toward the lake." },
    ],
    localTip: "Public transport (trains, trams, boats) runs on a single integrated ticket system — a day pass is usually the simplest option for visitors.",
    gettingAround:
      "Zurich's trams and trains are punctual and cover the city thoroughly, though the compact old town is also easy to explore entirely on foot.",
    goodToKnow:
      "Locals genuinely swim in the Limmat river and Lake Zurich through summer — public bathing spots (badis) dot both, and jumping in is a normal warm-weather activity, not just for tourists.",
  },
  "switzerland:geneva": {
    intro:
      "A lakeside city hosting numerous international organisations, known for its Old Town, the Jet d'Eau fountain, and nearby Alpine and vineyard scenery. Its international character — UN offices, NGOs, diplomacy — gives it an unusually cosmopolitan feel for its size.",
    bestTimeToVisit: "May to September, for warm days and long evenings by the lake.",
    landmarks: [
      { name: "Jet d'Eau", description: "A 140-metre fountain on Lake Geneva, one of the world's tallest and a symbol of the city." },
      { name: "Old Town (Vieille Ville)", description: "Geneva's hilltop historic centre, home to St. Pierre Cathedral and cobbled streets." },
      { name: "United Nations Office", description: "The UN's European headquarters, with guided tours available for visitors." },
      { name: "Patek Philippe Museum", description: "A museum tracing the history of watchmaking, a craft closely associated with the city and wider region." },
    ],
    localTip: "A day trip along Lake Geneva to the Lavaux vineyard terraces (a short train ride away) is one of the most rewarding half-days from the city.",
    gettingAround:
      "Geneva's centre is compact and walkable, with trams and buses covering the wider city, and even a small ferry (the mouette) crossing the lake.",
    goodToKnow:
      "Public transport is free for visitors staying in registered accommodation — ask for a Geneva Transport Card at check-in, which covers trams, buses, and some trains.",
  },
  "ireland:dublin": {
    intro:
      "Ireland's compact, walkable capital, built along the River Liffey, known for its literary history, Georgian architecture, and pub culture. It has produced a disproportionate number of major writers, and that literary heritage runs through much of the city.",
    bestTimeToVisit: "May to September for the mildest, driest weather — though Dublin's weather is changeable year-round.",
    landmarks: [
      { name: "Trinity College & Book of Kells", description: "Ireland's oldest university, home to the illuminated medieval manuscript and the Long Room library." },
      { name: "Guinness Storehouse", description: "A multi-floor exhibition on Ireland's best-known beer, topped with a rooftop bar and city views." },
      { name: "Temple Bar", description: "A lively riverside district of pubs, live music, and cobbled streets." },
      { name: "Kilmainham Gaol", description: "A former prison central to Irish independence history, now a museum offering guided tours." },
    ],
    localTip: "Book Book of Kells and Guinness Storehouse tickets online ahead of time — both are popular enough to have queues without a timed slot.",
    gettingAround:
      "Central Dublin is compact and easily walkable, with buses, trams (Luas), and a coastal rail line (DART) covering trips further out.",
    goodToKnow:
      "Temple Bar is popular with visitors but noticeably pricier than pubs just a few streets away — locals often recommend wandering slightly further for better value.",
  },
  "canada:toronto": {
    intro:
      "Canada's largest city, a diverse, lakeside metropolis known for its distinct neighbourhoods and the CN Tower skyline. It's regularly ranked among the world's most multicultural cities, which shows up strongly in its food scene.",
    bestTimeToVisit: "May to September for warm weather, or September to October for autumn colour.",
    landmarks: [
      { name: "CN Tower", description: "A 553-metre communications tower with an observation deck and glass floor above the city." },
      { name: "Distillery District", description: "A pedestrian-only historic district of Victorian industrial buildings turned galleries and restaurants." },
      { name: "Toronto Islands", description: "A car-free chain of islands just offshore, reachable by ferry, with beaches and skyline views." },
      { name: "St. Lawrence Market", description: "A historic covered market often ranked among the best food markets in the world." },
    ],
    localTip: "Toronto winters are genuinely cold — if visiting between December and March, plan for well below freezing and use the city's indoor PATH walkway system downtown.",
    gettingAround:
      "The TTC (subway, streetcars, and buses) covers most of the city, and downtown itself, along with the PATH underground walkway, is very walkable.",
    goodToKnow:
      "Toronto's food scene reflects its diversity strongly — neighbourhoods like Kensington Market and Chinatown are worth building an afternoon around rather than just the major landmarks.",
  },
  "canada:vancouver": {
    intro:
      "A coastal city framed by mountains and ocean, consistently ranked among the most liveable in the world, with a mild but rainy climate. Its setting between the Pacific and the North Shore mountains makes outdoor activity part of daily life here more than in most cities.",
    bestTimeToVisit: "June to September, when rainfall is lowest and days are longest.",
    landmarks: [
      { name: "Stanley Park", description: "A large forested park on a peninsula, with a seawall path and coastal views." },
      { name: "Granville Island", description: "A former industrial site turned public market and arts district on False Creek." },
      { name: "Capilano Suspension Bridge", description: "A pedestrian bridge high above a forested canyon, a short trip from downtown." },
      { name: "Gastown", description: "Vancouver's oldest neighbourhood, known for its cobblestone streets, steam clock, and converted warehouse boutiques." },
    ],
    localTip: "Pack for rain outside summer — Vancouver gets significantly more rainfall than most North American cities from October through April.",
    gettingAround:
      "The SkyTrain and buses cover the city well, and downtown Vancouver, including the Stanley Park seawall, is very walkable and bike-friendly.",
    goodToKnow:
      "The North Shore mountains (Grouse, Cypress, Seymour) are reachable by public transit and offer hiking or skiing within roughly 30–45 minutes of downtown, depending on the season.",
  },
  "brazil:rio-de-janeiro": {
    intro:
      "A dramatic coastal city set between mountains and ocean, known for its beaches, Carnival, and the Christ the Redeemer statue overlooking it all. Its setting is often cited as one of the most scenic of any major city in the world.",
    bestTimeToVisit: "April to June or September to October, avoiding the peak heat and crowds of the December–February summer.",
    landmarks: [
      { name: "Christ the Redeemer", description: "The Art Deco statue atop Corcovado mountain, one of the most recognisable monuments in the world." },
      { name: "Sugarloaf Mountain", description: "A granite peak reachable by cable car, with panoramic views over the bay." },
      { name: "Copacabana Beach", description: "One of Rio's most famous beaches, lined with a long promenade." },
      { name: "Ipanema Beach", description: "A more upscale, laid-back beach neighbourhood next to Copacabana, known for its sunset views." },
    ],
    localTip: "Stick to well-touristed areas and take standard city precautions with valuables — like any major city, it pays to be aware of your surroundings.",
    gettingAround:
      "Rio's metro covers key routes reliably, but many visitors combine it with rideshares or organised transport for reaching Christ the Redeemer and Sugarloaf.",
    goodToKnow:
      "Carnival timing shifts every year with the Christian calendar — check the exact dates well ahead if that's the reason for your trip, as accommodation books up fast.",
  },
  "brazil:sao-paulo": {
    intro:
      "Brazil's largest city and its financial and cultural engine, less scenic than Rio but known for its restaurants, museums, and street art. It has one of the largest and most diverse restaurant scenes in South America, shaped by waves of immigration.",
    bestTimeToVisit: "April to June or August to September, in the milder, drier shoulder months.",
    landmarks: [
      { name: "Avenida Paulista", description: "The city's main avenue, home to major museums, and closed to cars on Sundays for public use." },
      { name: "São Paulo Museum of Art (MASP)", description: "Known for its distinctive red glass-and-concrete building raised on stilts." },
      { name: "Beco do Batman", description: "A graffiti alley in Vila Madalena showcasing some of the city's best street art." },
      { name: "Municipal Market (Mercadão)", description: "A grand early 20th-century market famous for its stained glass and enormous mortadella sandwiches." },
    ],
    localTip: "São Paulo's food scene is considered one of the best in South America — it's worth building an itinerary around restaurants, not just sights.",
    gettingAround:
      "The metro is the most reliable way to cross this very large city, since surface traffic can be heavy at most times of day.",
    goodToKnow:
      "São Paulo has one of the largest Japanese communities outside Japan, centred on the Liberdade district — worth a visit for a very different side of Brazilian food and culture.",
  },
  "mexico:mexico-city": {
    intro:
      "A vast, high-altitude capital layering Aztec, colonial, and modern history, with one of the world's great museum and food scenes. Built on the site of the Aztec capital Tenochtitlan, its history is visible in layers, from ruins to colonial churches to modern boulevards.",
    bestTimeToVisit: "March to May, in the dry season before the June–October rains, with warm days and cool evenings due to the altitude.",
    landmarks: [
      { name: "Zócalo", description: "The city's main square, ringed by the Metropolitan Cathedral and National Palace." },
      { name: "Templo Mayor", description: "The excavated ruins of the main Aztec temple, uncovered beneath the modern city centre." },
      { name: "Frida Kahlo Museum (Casa Azul)", description: "The artist's former home, now a museum of her life and work." },
      { name: "Chapultepec Park & Castle", description: "One of the largest city parks in the Western Hemisphere, home to a hilltop castle and several major museums." },
    ],
    localTip: "The city sits at over 2,200m altitude — take it easy on your first day or two, especially with alcohol or strenuous activity.",
    gettingAround:
      "The metro is extensive and inexpensive, though traffic can be heavy — many visitors combine it with rideshares for longer or late-night trips.",
    goodToKnow:
      "Frida Kahlo Museum tickets are timed and regularly sell out days in advance — book online as soon as your dates are set.",
  },
  "mexico:cancun": {
    intro:
      "A purpose-built resort city on the Caribbean coast, known for its beaches, all-inclusive hotels, and easy access to Maya ruins. Most of its hotel zone was deliberately developed from the 1970s onward, distinct from the older town centre.",
    bestTimeToVisit: "December to April, in the dry season and outside the June–November hurricane season.",
    landmarks: [
      { name: "Hotel Zone Beaches", description: "A long strip of white-sand Caribbean beaches lined with resorts along a narrow peninsula." },
      { name: "El Rey Ruins", description: "A small, quiet Maya archaeological site within the Hotel Zone itself." },
      { name: "Isla Mujeres", description: "A small island a short ferry ride away, known for calm, clear water." },
      { name: "Chichén Itzá (day trip)", description: "One of the New Seven Wonders of the World, a major Maya archaeological site roughly 2.5 hours away." },
    ],
    localTip: "Chichén Itzá and Tulum are both feasible day trips from Cancún — book an early departure to avoid the worst of the midday heat and crowds.",
    gettingAround:
      "The Hotel Zone has its own dedicated bus route running its length, and ferries connect to Isla Mujeres — a rental car is only needed for further day trips.",
    goodToKnow:
      "Sargassum seaweed affects Caribbean beaches unpredictably by season and year — check current conditions if a specific beach is central to your plans.",
  },
  "thailand:bangkok": {
    intro:
      "A fast-paced capital of ornate temples, riverside markets, and street food, and the usual gateway to the rest of Thailand. Its Chao Phraya river and canal network (klongs) were historically central to the city, and boats remain a genuine way to get around.",
    bestTimeToVisit: "November to February, the cool, dry season — March to May gets very hot, and June to October is the rainy season.",
    landmarks: [
      { name: "Grand Palace & Wat Phra Kaew", description: "The former royal residence and its temple housing the revered Emerald Buddha." },
      { name: "Wat Arun", description: "The riverside 'Temple of Dawn', known for its ornate porcelain-decorated spires." },
      { name: "Chatuchak Weekend Market", description: "One of the world's largest markets, with thousands of stalls across a huge site." },
      { name: "Wat Pho", description: "Home to a giant 46-metre reclining Buddha statue, also considered the birthplace of traditional Thai massage." },
    ],
    localTip: "Dress modestly (shoulders and knees covered) to enter the Grand Palace and major temples — sarongs are available to rent at the entrance if needed.",
    gettingAround:
      "The BTS Skytrain, MRT subway, and river boats together cover Bangkok's worst traffic far better than relying on cars alone.",
    goodToKnow:
      "Street food stalls with a constant line of local customers are usually a more reliable quality signal than a quiet one in a tourist-heavy area.",
  },
  "thailand:phuket": {
    intro:
      "Thailand's largest island, known for its beaches, nightlife in Patong, and as a base for boat trips to the surrounding Andaman Sea islands. Beyond the beach resorts, the island also has a preserved old town with a distinct Sino-Portuguese architectural heritage.",
    bestTimeToVisit: "November to April, the dry season — the rainy season from May to October can bring rough seas and reduced boat trips.",
    landmarks: [
      { name: "Big Buddha", description: "A 45-metre marble-clad statue on a hilltop, with panoramic island views." },
      { name: "Old Phuket Town", description: "A district of preserved Sino-Portuguese shophouses, cafés, and street art." },
      { name: "Phi Phi Islands (day trip)", description: "Dramatic limestone islands reachable by boat, popular for snorkelling and beaches." },
      { name: "Patong Beach", description: "Phuket's busiest beach and nightlife hub, with the island's highest concentration of hotels and bars." },
    ],
    localTip: "If visiting outside the dry season, check sea conditions before booking island-hopping boat trips — some routes reduce or pause in rough weather.",
    gettingAround:
      "Phuket doesn't have a rail or metro system — rented scooters, taxis, or ride apps are the standard way to move between beaches and the old town.",
    goodToKnow:
      "Different beaches on Phuket have distinctly different characters — Patong is loud and nightlife-focused, while others further south and north are quieter and more family-oriented.",
  },
  "singapore:singapore": {
    intro:
      "A compact, ultra-modern city-state blending Chinese, Malay, Indian, and colonial influences, known for its cleanliness, food, and green architecture. Despite its small size, its four official languages and mix of cultures give it an unusually rich food and cultural scene.",
    bestTimeToVisit: "Year-round destination with consistent tropical heat and humidity — February to April is comparatively drier.",
    landmarks: [
      { name: "Gardens by the Bay", description: "A futuristic park with the towering Supertree structures and climate-controlled domes." },
      { name: "Marina Bay Sands", description: "An iconic three-tower hotel with a rooftop infinity pool and observation deck." },
      { name: "Chinatown & Little India", description: "Historic ethnic districts with temples, markets, and hawker food centres." },
      { name: "Sentosa Island", description: "A resort island connected to the mainland, home to beaches, theme parks, and a cable car." },
    ],
    localTip: "Eat at a hawker centre rather than a restaurant for the best value and some of the most celebrated food in the country, including Michelin-recognised stalls.",
    gettingAround:
      "The MRT subway is clean, fast, and covers nearly the entire city-state, making a car genuinely unnecessary for almost any itinerary.",
    goodToKnow:
      "Chewing gum is banned for sale in Singapore (importing a small personal amount is generally tolerated) — one of several strict rules, alongside heavy fines for littering and jaywalking.",
  },
  "india:mumbai": {
    intro:
      "India's financial capital and the heart of its film industry, a dense coastal city of colonial architecture, markets, and street food. It's home to Bollywood, the world's largest film industry by number of productions, which shapes much of the city's culture.",
    bestTimeToVisit: "November to February, the cool, dry season — the June–September monsoon brings heavy rainfall.",
    landmarks: [
      { name: "Gateway of India", description: "A monumental arch overlooking the harbour, built to commemorate a royal visit in 1911." },
      { name: "Chhatrapati Shivaji Maharaj Terminus", description: "A UNESCO-listed Victorian Gothic railway station, still in daily use." },
      { name: "Elephanta Caves", description: "Ancient rock-cut cave temples on an island, a short ferry ride from the Gateway of India." },
      { name: "Marine Drive", description: "A sweeping seafront boulevard nicknamed the \"Queen's Necklace\" for its curved shoreline lights at night." },
    ],
    localTip: "Traffic can make short distances slow — build extra time into any itinerary that crosses the city, especially during rush hour.",
    gettingAround:
      "Mumbai's suburban rail network moves millions daily and is by far the fastest way across the city, though it gets extremely crowded at peak times.",
    goodToKnow:
      "Mumbai's monsoon (roughly June to September) can bring intense, sudden downpours and localised flooding — check forecasts closely if travelling during those months.",
  },
  "india:delhi": {
    intro:
      "India's capital, pairing the planned colonial boulevards of New Delhi with the dense historic lanes of Old Delhi and its Mughal-era monuments. The contrast between the two halves — one designed by the British in the 20th century, the other centuries older — makes it feel like two cities in one.",
    bestTimeToVisit: "October to March, avoiding the extreme heat of summer and the monsoon rains.",
    landmarks: [
      { name: "Red Fort", description: "A massive 17th-century Mughal fortress that was the seat of imperial power for over 200 years." },
      { name: "Humayun's Tomb", description: "A UNESCO-listed Mughal tomb complex that inspired the design of the Taj Mahal." },
      { name: "India Gate", description: "A war memorial arch at the heart of New Delhi's ceremonial boulevard." },
      { name: "Qutub Minar", description: "A 73-metre 12th-century minaret, the tallest brick minaret in the world and a UNESCO World Heritage Site." },
    ],
    localTip: "Winter mornings (December–January) can bring heavy fog affecting flights — build a buffer into travel plans during those months.",
    gettingAround:
      "The Delhi Metro is extensive, affordable, and generally the most reliable way to avoid the city's heavy road traffic.",
    goodToKnow:
      "Delhi is also a practical base for a Taj Mahal day trip to Agra — the high-speed Gatimaan Express covers the distance in under two hours.",
  },
  "south-korea:seoul": {
    intro:
      "A hyper-modern capital built around centuries-old royal palaces, with a huge food, shopping, and nightlife scene across its districts. Traditional hanok neighbourhoods sit within a few minutes of some of the most technologically advanced streets in the world.",
    bestTimeToVisit: "April to June or September to November, avoiding the summer monsoon and winter cold.",
    landmarks: [
      { name: "Gyeongbokgung Palace", description: "The largest of Seoul's Joseon-dynasty royal palaces, with a daily changing-of-the-guard ceremony." },
      { name: "Bukchon Hanok Village", description: "A preserved neighbourhood of traditional hanok houses between two royal palaces." },
      { name: "Myeongdong", description: "A busy shopping and street food district in the city centre." },
      { name: "N Seoul Tower", description: "A hilltop communications tower with an observation deck offering panoramic views across the city." },
    ],
    localTip: "Wear a traditional hanbok (rentable near the palaces) for free entry to Gyeongbokgung — a popular and inexpensive way to visit.",
    gettingAround:
      "Seoul's subway system is one of the most extensive and easy to navigate in the world, with English signage throughout.",
    goodToKnow:
      "A T-money transit card, available at convenience stores and subway stations, covers subways, buses, and even taxis and small purchases — worth getting on arrival.",
  },
  "turkey:istanbul": {
    intro:
      "A city spanning two continents across the Bosphorus, layering Byzantine and Ottoman history with a large, modern metropolis. Few cities anywhere let you cross between Europe and Asia on a short public ferry ride.",
    bestTimeToVisit: "April to May or September to November, avoiding the summer heat and crowds.",
    landmarks: [
      { name: "Hagia Sophia", description: "A former Byzantine cathedral and Ottoman mosque, now open to visitors, with a vast domed interior." },
      { name: "Blue Mosque", description: "An early 17th-century mosque known for its six minarets and blue Iznik tile interior." },
      { name: "Grand Bazaar", description: "One of the world's oldest and largest covered markets, with thousands of shops." },
      { name: "Topkapi Palace", description: "The former residence of Ottoman sultans for roughly 400 years, now a museum of imperial treasures." },
    ],
    localTip: "A short Bosphorus ferry ride is one of the easiest ways to see the city from the water and cross between its European and Asian sides.",
    gettingAround:
      "Istanbul's tram, metro, and ferry network together cover the historic peninsula and both sides of the Bosphorus well.",
    goodToKnow:
      "Dress modestly and expect to remove shoes when entering working mosques like the Blue Mosque — headscarves are provided for women if needed.",
  },
  "morocco:marrakech": {
    intro:
      "A red-walled city at the foot of the Atlas Mountains, known for its maze-like medina, souks, and riad courtyard houses. Its old city walls and much of the medina layout have remained largely unchanged for centuries.",
    bestTimeToVisit: "March to May or September to November, avoiding the intense summer heat.",
    landmarks: [
      { name: "Jemaa el-Fnaa", description: "The city's main square and market, especially lively with food stalls and performers after dark." },
      { name: "Bahia Palace", description: "A 19th-century palace known for its intricately decorated courtyards and rooms." },
      { name: "Majorelle Garden", description: "A vivid blue-accented botanical garden restored by designer Yves Saint Laurent." },
      { name: "Koutoubia Mosque", description: "Marrakech's largest mosque and most prominent landmark, visible across much of the city." },
    ],
    localTip: "Expect to get lost in the medina at least once — it's part of the experience, and most riads are used to guiding guests in by phone if needed.",
    gettingAround:
      "The medina is entirely pedestrian and best explored on foot; taxis are the practical option for reaching sights outside the old walls, like Majorelle Garden.",
    goodToKnow:
      "Haggling is a normal, expected part of souk shopping — prices are rarely fixed, and starting well below the asking price is standard practice, not rude.",
  },
  "south-africa:cape-town": {
    intro:
      "A coastal city beneath Table Mountain, known for its beaches, wine regions nearby, and a striking mix of ocean and mountain scenery. Its setting is regularly ranked among the most dramatic of any city in the world, with mountain, ocean, and vineyard all within a short drive.",
    bestTimeToVisit: "November to March, the Southern Hemisphere summer — outside this window, winter (June–August) brings more rain and wind.",
    landmarks: [
      { name: "Table Mountain", description: "A flat-topped mountain overlooking the city, reachable by cableway or hiking trails." },
      { name: "Robben Island", description: "The former prison island where Nelson Mandela was held, now a museum reachable by ferry." },
      { name: "V&A Waterfront", description: "A working harbour turned shopping, dining, and entertainment district." },
      { name: "Cape of Good Hope", description: "A dramatic nature reserve at the peninsula's tip, roughly an hour's drive from the city centre." },
    ],
    localTip: "Book the Table Mountain cableway or a hike for early in your trip if possible — it closes in high wind, so a flexible schedule helps.",
    gettingAround:
      "A rental car or organised tour is the practical way to reach the Cape Peninsula and nearby Winelands, though central Cape Town and the Waterfront are walkable.",
    goodToKnow:
      "The Cape Winelands (Stellenbosch, Franschhoek) make an easy day trip from Cape Town, roughly 45 minutes to an hour's drive from the city centre.",
  },
  "egypt:cairo": {
    intro:
      "A vast, historic capital on the Nile, the gateway to the Pyramids of Giza and one of the world's great collections of ancient Egyptian artifacts. Greater Cairo is one of the largest metropolitan areas in Africa and the Middle East, with the Pyramids sitting right at its modern edge.",
    bestTimeToVisit: "October to April, avoiding the extreme heat of the summer months.",
    landmarks: [
      { name: "Pyramids of Giza", description: "The last surviving wonder of the ancient world, on the edge of the modern city." },
      { name: "Egyptian Museum", description: "A vast collection of pharaonic antiquities, including treasures from Tutankhamun's tomb." },
      { name: "Khan el-Khalili", description: "A historic bazaar dating to the 14th century, still a major shopping and dining destination." },
      { name: "Great Sphinx of Giza", description: "The enormous limestone statue guarding the Giza plateau, immediately next to the Pyramids." },
    ],
    localTip: "Hire a licensed guide for the Pyramids and Egyptian Museum — both are large sites where context adds a lot, and it helps navigate persistent vendors near Giza.",
    gettingAround:
      "Central Cairo traffic is often heavy, so many visitors rely on taxis or ride apps rather than walking or driving themselves between distant sights.",
    goodToKnow:
      "The Grand Egyptian Museum near Giza has been opening in phases and is intended to eventually replace much of the downtown Egyptian Museum's collection — check current status before planning which one to visit.",
  },
};

export function getCityGuide(countrySlug: string, citySlug: string): CityGuide | null {
  return cityGuides[`${countrySlug}:${citySlug}`] ?? null;
}
