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
  "poland:warsaw": {
    intro:
      "Poland's capital is a city of contrasts: a meticulously rebuilt Old Town, Stalin-era landmarks and a fast-growing skyline of glass towers. Largely destroyed in WWII, it has become one of Central Europe's most dynamic cities, with green parks and a lively food scene.",
    bestTimeToVisit: "May to September, when days are long and mild; July and August are the warmest months.",
    landmarks: [
      { name: "Old Town (Stare Miasto)", description: "The historic centre, rebuilt after WWII from paintings and records and now a UNESCO World Heritage Site." },
      { name: "Royal Castle", description: "The former residence of Polish monarchs, facing Castle Square at the edge of the Old Town." },
      { name: "Łazienki Park", description: "A large landscaped park with a palace on the water and free summer Chopin concerts." },
      { name: "Palace of Culture and Science", description: "A towering 1950s landmark with an observation terrace over the whole city." },
    ],
    localTip: "Try a milk bar (bar mleczny) — simple, traditional canteens serving pierogi and soups at very low prices.",
    gettingAround:
      "Two metro lines, trams and buses cover the city well; the Old Town and the Royal Route along Krakowskie Przedmieście are best explored on foot.",
    goodToKnow:
      "Winters are cold, often around or below freezing, so pack properly warm layers between December and February.",
  },
  "poland:krakow": {
    intro:
      "Poland's former royal capital survived WWII largely intact, and its medieval Old Town, Wawel Castle and the Kazimierz district make it one of Europe's most atmospheric cities. It's compact, walkable and popular for weekend breaks.",
    bestTimeToVisit: "May to June or September, for comfortable sightseeing weather without the peak summer crowds.",
    landmarks: [
      { name: "Main Market Square (Rynek Główny)", description: "One of Europe's largest medieval squares, with the Cloth Hall and St Mary's Basilica." },
      { name: "Wawel Castle & Cathedral", description: "The hilltop seat of Polish kings, overlooking the Vistula river." },
      { name: "Kazimierz", description: "The historic Jewish quarter, now known for its synagogues, cafés and nightlife." },
      { name: "Wieliczka Salt Mine (day trip)", description: "A centuries-old salt mine with underground chapels carved from salt, just outside the city." },
    ],
    localTip: "Listen for the hejnał — a trumpet call played every hour from St Mary's tower that stops abruptly mid-melody.",
    gettingAround:
      "The Old Town and Kazimierz are easily walkable; trams cover longer distances, and trains connect to the airport and nearby towns.",
    goodToKnow:
      "Book timed tickets for the Wieliczka Salt Mine and the Auschwitz-Birkenau memorial in advance — both fill up, especially in summer.",
  },
  "poland:gdansk": {
    intro:
      "A Baltic port city of colourful merchant houses, Gothic brick churches and a long maritime history. Gdańsk is also where the Solidarity movement began, and it pairs well with the nearby beaches of Sopot.",
    bestTimeToVisit: "June to August for the warmest weather and beach days; May and September are quieter and still pleasant.",
    landmarks: [
      { name: "Long Market (Długi Targ)", description: "The grand main street of the Main Town, lined with ornate gabled facades and Neptune's Fountain." },
      { name: "St Mary's Church", description: "One of the largest brick churches in the world, with a tower offering views over the old town." },
      { name: "European Solidarity Centre", description: "A modern museum at the shipyard where the Solidarity movement was born." },
      { name: "Sopot (day trip)", description: "A seaside resort a short train ride away, known for its long wooden pier and sandy beach." },
    ],
    localTip: "Walk along the Motława riverside in the evening, when the old granaries and the medieval crane are lit up.",
    gettingAround:
      "The historic centre is compact and walkable; SKM commuter trains link Gdańsk with Sopot and Gdynia along the coast.",
    goodToKnow:
      "The Baltic sea stays cool even in summer, and the coast can be windy — bring a warm layer for evenings by the water.",
  },
  "belgium:brussels": {
    intro:
      "Belgium's capital and the seat of the EU mixes grand Gothic and Art Nouveau architecture with a relaxed café culture. It's a compact city that is easy to combine with Bruges, Ghent and Antwerp by train.",
    bestTimeToVisit: "May to September for the mildest weather; Brussels sees rain in every season, so pack a light jacket.",
    landmarks: [
      { name: "Grand-Place", description: "The ornate central square framed by guildhalls and the Gothic Town Hall, a UNESCO World Heritage Site." },
      { name: "Atomium", description: "A giant model of an iron crystal built for the 1958 World's Fair, with viewing spheres inside." },
      { name: "Manneken Pis", description: "The small bronze statue that has become one of the city's best-known (and often costumed) symbols." },
      { name: "Royal Museums of Fine Arts", description: "A major collection of Flemish and Belgian art, from the old masters to Magritte." },
    ],
    localTip: "Try fries from a friterie and waffles from a proper bakery rather than the tourist stalls around the Grand-Place.",
    gettingAround:
      "The centre is walkable, and metro, trams and buses cover the rest; fast trains connect Brussels with Bruges, Ghent and Antwerp in under an hour.",
    goodToKnow:
      "Brussels is officially bilingual — street signs and station names appear in both French and Dutch.",
  },
  "belgium:antwerp": {
    intro:
      "Flanders' largest city is a fashion and diamond hub with a handsome old centre, one of Europe's biggest ports and a strong Rubens heritage. It feels more laid-back than Brussels, with excellent food and shopping.",
    bestTimeToVisit: "May to September for the warmest, longest days; spring and early autumn are quieter.",
    landmarks: [
      { name: "Antwerp Central Station", description: "A spectacular early-20th-century railway station, often called one of the most beautiful in the world." },
      { name: "Cathedral of Our Lady", description: "A soaring Gothic cathedral housing several major Rubens paintings." },
      { name: "Grote Markt", description: "The main square, with its Renaissance city hall and the Brabo fountain." },
      { name: "MAS Museum", description: "A striking red-stone museum tower by the docks, with a free rooftop viewpoint." },
    ],
    localTip: "Visit the Rubens House to see where the painter lived and worked, then walk to the cathedral to see his altarpieces.",
    gettingAround:
      "The centre is compact and walkable, trams run across the city, and trains reach Brussels in about 40 minutes.",
    goodToKnow:
      "Antwerp is Dutch-speaking (Flemish); a few words of Dutch are appreciated, though English is widely spoken.",
  },
  "spain:tenerife": {
    intro:
      "The largest of the Canary Islands, with year-round spring-like weather, black-sand and golden beaches, and Mount Teide — Spain's highest peak — at its centre. The sunny south (Costa Adeje, Playa de las Américas, Los Cristianos) is where most visitors stay; the greener north is cooler and cloudier.",
    bestTimeToVisit: "Any time of year — the Canaries are a classic winter-sun escape. Spring and autumn are especially pleasant; summer is hot but tempered by trade winds.",
    landmarks: [
      { name: "Teide National Park", description: "A UNESCO-listed volcanic landscape around Mount Teide, reachable by road and cable car." },
      { name: "Masca", description: "A tiny village in a dramatic ravine in the Teno mountains, popular with hikers." },
      { name: "Los Gigantes", description: "Sheer sea cliffs on the west coast, best seen from a boat trip." },
      { name: "La Laguna", description: "The UNESCO-listed old university town in the north, with colourful colonial-era streets." },
    ],
    localTip: "The south is usually sunnier and warmer than the north — if the forecast looks cloudy for Puerto de la Cruz, the south coast may still be bright.",
    gettingAround:
      "Buses (TITSA) link the main towns, but a hire car makes it much easier to reach Teide, Masca and the north.",
    goodToKnow:
      "Temperatures drop sharply with altitude — bring a warm layer for Teide, where it can be near freezing on winter mornings.",
  },
  "spain:gran-canaria": {
    intro:
      "A round volcanic island often called a 'miniature continent' for its mix of dunes, pine forests and mountain villages. Most sun-seekers stay in the south around Maspalomas and Playa del Inglés; the capital, Las Palmas, has a lively city beach.",
    bestTimeToVisit: "Year-round; it's one of Europe's most reliable winter-sun destinations. The south coast is the sunniest part of the island.",
    landmarks: [
      { name: "Maspalomas Dunes", description: "A protected area of rolling sand dunes next to the beach and lighthouse." },
      { name: "Roque Nublo", description: "A striking rock monolith in the mountainous centre, reached by a short hike." },
      { name: "Vegueta, Las Palmas", description: "The historic quarter of the capital, with the cathedral and Columbus House." },
      { name: "Puerto de Mogán", description: "A pretty harbour village with canals, nicknamed 'little Venice'." },
    ],
    localTip: "Clouds often gather over the north and centre while the south stays sunny — pick your beach day accordingly.",
    gettingAround:
      "Global buses connect Las Palmas, the airport and the southern resorts; a car helps for the mountain villages.",
    goodToKnow:
      "The mountain interior is much cooler than the coast, especially in winter.",
  },
  "spain:lanzarote": {
    intro:
      "A striking volcanic island of black lava fields, white villages and art by local architect César Manrique. It's drier and flatter than the western Canaries, with a mild climate all year.",
    bestTimeToVisit: "Year-round. It's warm and dry for most of the year; winter brings the most (still limited) rain.",
    landmarks: [
      { name: "Timanfaya National Park", description: "Volcanic landscapes from the 18th-century eruptions, visited by coach tour." },
      { name: "Jameos del Agua", description: "A lava tube turned into a concert venue and lagoon by César Manrique." },
      { name: "Papagayo beaches", description: "Sheltered golden coves on the island's southern tip." },
      { name: "Mirador del Río", description: "A clifftop viewpoint overlooking the island of La Graciosa." },
    ],
    localTip: "It can be windy, especially on the north and east coasts — handy for surfers, less so for sunbathers.",
    gettingAround:
      "A hire car is the easiest way to see the island; buses link the main resorts and Arrecife.",
    goodToKnow:
      "Protect your skin even on breezy days — the wind makes the strong sun easy to underestimate.",
  },
  "spain:fuerteventura": {
    intro:
      "The second-largest Canary Island, known for long sandy beaches, dunes and some of Europe's best wind- and kite-surfing. It's the closest Canary Island to Africa and one of the driest.",
    bestTimeToVisit: "Year-round for beaches; spring to autumn for the most consistent sunshine. Summer brings the strongest winds.",
    landmarks: [
      { name: "Corralejo Dunes", description: "A natural park of white sand dunes beside the sea in the north." },
      { name: "Sotavento", description: "A huge lagoon beach in the south, famous for windsurfing." },
      { name: "Betancuria", description: "The island's historic former capital in the mountains." },
      { name: "Isla de Lobos", description: "A small protected island reachable by boat from Corralejo." },
    ],
    localTip: "Wind is part of daily life here — beaches on the south-east side are often more sheltered.",
    gettingAround:
      "Distances are long between resorts, so a hire car is useful; buses serve the main towns.",
    goodToKnow:
      "The Atlantic here is cooler than the Mediterranean, even in summer.",
  },
  "spain:mallorca": {
    intro:
      "The largest Balearic island, with the historic capital Palma, dramatic Tramuntana mountains and dozens of beaches and coves. It is one of Europe's most popular summer holiday islands.",
    bestTimeToVisit: "May, June and September for warm, sunny weather with fewer crowds; July and August are hot and busiest.",
    landmarks: [
      { name: "Palma Cathedral (La Seu)", description: "A Gothic cathedral rising above Palma's seafront." },
      { name: "Serra de Tramuntana", description: "A UNESCO-listed mountain range with stone villages like Valldemossa and Deià." },
      { name: "Cala Mondragó", description: "A protected natural park with sheltered sandy coves." },
      { name: "Sóller", description: "A valley town reached by a vintage wooden train from Palma." },
    ],
    localTip: "Visit popular coves early in the day in summer — car parks and beaches fill up quickly.",
    gettingAround:
      "Buses connect Palma to the main towns; a car gives the most freedom for coves and mountain villages.",
    goodToKnow:
      "Winters are mild but quieter: some resorts close hotels and restaurants from November to March.",
  },
  "spain:ibiza": {
    intro:
      "A Balearic island famous for its nightlife, but also for quiet coves, pine-covered hills and the UNESCO-listed old town of Ibiza Town (Dalt Vila).",
    bestTimeToVisit: "June and September for warm sea and fewer crowds; July and August for peak season and the club scene.",
    landmarks: [
      { name: "Dalt Vila", description: "The fortified, UNESCO-listed old town overlooking the harbour." },
      { name: "Cala Comte", description: "A west-coast beach famous for sunsets." },
      { name: "Es Vedrà", description: "A dramatic rocky islet off the south-west coast." },
      { name: "Santa Eulària", description: "A relaxed resort town with a riverside promenade." },
    ],
    localTip: "Sunset spots on the west coast get busy — arrive early for a good place.",
    gettingAround:
      "Buses cover the main resorts in season; a car or scooter helps for remote coves.",
    goodToKnow:
      "Much of the island is quiet from November to April, when many clubs and hotels close.",
  },
  "spain:malaga": {
    intro:
      "The capital of the Costa del Sol and Picasso's birthplace, combining city culture, beaches and one of mainland Europe's sunniest climates.",
    bestTimeToVisit: "Spring (March–May) and autumn (September–November) for warm, pleasant sightseeing weather; summer is hot.",
    landmarks: [
      { name: "Alcazaba", description: "An 11th-century Moorish fortress-palace above the city centre." },
      { name: "Picasso Museum", description: "A large collection of the artist's work in his home city." },
      { name: "Malagueta Beach", description: "The city beach, a short walk from the old town." },
      { name: "Gibralfaro Castle", description: "Hilltop castle walls with wide views over the port." },
    ],
    localTip: "Midday in July and August is very hot — plan sightseeing for the morning and evening.",
    gettingAround:
      "The centre is walkable; trains and buses link the airport and the Costa del Sol resorts.",
    goodToKnow:
      "Málaga's mild winters make it a popular off-season city break.",
  },
  "spain:benidorm": {
    intro:
      "A high-rise resort on the Costa Blanca with long sandy beaches, a busy promenade and a mild, sunny climate for much of the year.",
    bestTimeToVisit: "May–June and September–October for warm, sunny weather without peak-summer heat.",
    landmarks: [
      { name: "Levante Beach", description: "The long main beach lined with bars and hotels." },
      { name: "Balcón del Mediterráneo", description: "A viewpoint between the two main beaches in the old town." },
      { name: "Terra Mítica", description: "A large theme park on the edge of town." },
      { name: "Guadalest", description: "A mountain village with a castle, a popular day trip." },
    ],
    localTip: "Poniente beach is usually calmer and less crowded than Levante.",
    gettingAround:
      "The town is walkable; trams link it to Alicante along the coast.",
    goodToKnow:
      "Winters are mild and popular with long-stay visitors from northern Europe.",
  },
  "greece:crete": {
    intro:
      "Greece's largest island, with Minoan palaces, Venetian harbour towns, mountain gorges and a long beach season.",
    bestTimeToVisit: "May–June and September–October for warm weather with fewer crowds; July and August are hottest.",
    landmarks: [
      { name: "Knossos", description: "The Minoan palace site near Heraklion." },
      { name: "Samaria Gorge", description: "A long hiking gorge in the White Mountains, open in the warmer months." },
      { name: "Chania Old Town", description: "A Venetian harbour with narrow lanes and waterfront tavernas." },
      { name: "Elafonisi", description: "A lagoon beach known for its pinkish sand." },
    ],
    localTip: "The north coast can be windy in summer (the meltemi); south-coast beaches are often calmer.",
    gettingAround:
      "Buses (KTEL) link the main towns; a hire car is best for gorges and remote beaches.",
    goodToKnow:
      "The Samaria Gorge typically opens from spring to autumn, depending on conditions.",
  },
  "greece:rhodes": {
    intro:
      "A Dodecanese island known for its medieval walled Old Town, beaches and one of the sunniest climates in Greece.",
    bestTimeToVisit: "May–June and September–October for warm, sunny weather; July–August are hot and busy.",
    landmarks: [
      { name: "Rhodes Old Town", description: "A UNESCO-listed medieval town with the Palace of the Grand Master." },
      { name: "Lindos", description: "A white village below a clifftop acropolis." },
      { name: "Anthony Quinn Bay", description: "A small, clear-water cove on the east coast." },
      { name: "Valley of the Butterflies", description: "A shaded valley where butterflies gather in summer." },
    ],
    localTip: "The west coast is windier; the east coast has calmer, warmer water.",
    gettingAround:
      "Buses connect Rhodes Town with Lindos and the resorts; a car helps for the south.",
    goodToKnow:
      "Visit Lindos early in the day in summer, before the heat and crowds.",
  },
  "greece:corfu": {
    intro:
      "A green Ionian island with a UNESCO-listed Venetian old town, olive groves and many small beaches.",
    bestTimeToVisit: "May–June and September for warm weather and fewer crowds; it is greener and wetter than the Aegean islands in winter.",
    landmarks: [
      { name: "Corfu Old Town", description: "A UNESCO-listed town with Venetian fortresses and arcaded streets." },
      { name: "Paleokastritsa", description: "Coves and clear water below a clifftop monastery." },
      { name: "Achilleion Palace", description: "A 19th-century palace built for Empress Elisabeth of Austria." },
      { name: "Canal d'Amour, Sidari", description: "Sandstone rock formations and small coves in the north." },
    ],
    localTip: "Corfu gets more rain than most Greek islands, mostly from late autumn to early spring.",
    gettingAround:
      "Green buses serve the island's villages; a car helps for the quieter west coast.",
    goodToKnow:
      "Many hotels and tavernas in the resorts are seasonal and close in winter.",
  },
  "portugal:madeira": {
    intro:
      "A subtropical Atlantic island famous for mild temperatures all year, levada walks, flowers and dramatic cliffs. Its capital is Funchal.",
    bestTimeToVisit: "Year-round; spring and autumn are especially pleasant for hiking.",
    landmarks: [
      { name: "Funchal Old Town", description: "The capital's historic centre, markets and cable car to Monte." },
      { name: "Levada walks", description: "Paths along historic irrigation channels through the mountains." },
      { name: "Pico do Arieiro", description: "One of the island's highest peaks, known for sunrise views above the clouds." },
      { name: "Porto Moniz", description: "Natural volcanic rock pools on the north-west coast." },
    ],
    localTip: "Weather varies a lot across the island: the south around Funchal is usually sunnier than the north.",
    gettingAround:
      "Buses serve the main towns; a car or guided tour makes it easier to reach trailheads.",
    goodToKnow:
      "Mountain trails can be cold, wet or closed after storms — check conditions before hiking.",
  },
  "portugal:algarve": {
    intro:
      "Portugal's southern coast, known for golden cliffs, sea caves, golf and long sunny summers. Faro is its main airport and regional capital.",
    bestTimeToVisit: "May–June and September–October for warm weather; July–August are hottest and busiest.",
    landmarks: [
      { name: "Benagil Cave", description: "A sea cave with an opening in its roof, usually visited by boat or kayak." },
      { name: "Ponta da Piedade", description: "Rock formations and grottoes near Lagos." },
      { name: "Ria Formosa", description: "A lagoon nature park around Faro." },
      { name: "Tavira", description: "A historic town with a Roman bridge and whitewashed houses." },
    ],
    localTip: "The Atlantic stays cool even in summer — the sea is refreshing rather than warm.",
    gettingAround:
      "Trains and buses connect the main towns; a car helps for beaches and cliffs.",
    goodToKnow:
      "Winters are mild and sunny compared with most of Europe, popular for walking and golf.",
  },
  "turkey:antalya": {
    intro:
      "The main gateway to the Turkish Riviera, with a historic walled harbour (Kaleiçi), waterfalls and nearby beach resorts like Lara, Belek and Kemer.",
    bestTimeToVisit: "May–June and September–October for warm weather; July and August are very hot.",
    landmarks: [
      { name: "Kaleiçi", description: "Antalya's old town with Ottoman houses and a Roman harbour." },
      { name: "Düden Waterfalls", description: "Waterfalls dropping into the sea near the city." },
      { name: "Aspendos", description: "A remarkably preserved Roman theatre east of the city." },
      { name: "Konyaaltı Beach", description: "A long pebble beach backed by mountains." },
    ],
    localTip: "Summer afternoons are very hot — plan sightseeing for early morning and evening.",
    gettingAround:
      "Trams and buses serve the city; resorts are reached by shuttle, bus or taxi.",
    goodToKnow:
      "Spring and autumn are good for combining beaches with ancient sites.",
  },
  "egypt:hurghada": {
    intro:
      "A Red Sea resort town known for coral reefs, diving and snorkelling, with sunshine nearly every day of the year.",
    bestTimeToVisit: "October–April for warm but comfortable weather; summer (June–September) is very hot.",
    landmarks: [
      { name: "Giftun Islands", description: "Protected islands with reefs and beaches, reached by boat." },
      { name: "El Gouna", description: "A lagoon resort town north of Hurghada." },
      { name: "Hurghada Marina", description: "A waterfront area with restaurants and boat departures." },
      { name: "Red Sea reefs", description: "Some of the world's best snorkelling and diving sites." },
    ],
    localTip: "Winter evenings can feel cool, especially on boats — bring a light jacket.",
    gettingAround:
      "Resorts spread along the coast; taxis and hotel shuttles are the usual way to get around.",
    goodToKnow:
      "Wind is common on the coast, which keeps summer heat more bearable but can make boat trips choppy.",
  },
  "egypt:sharm-el-sheikh": {
    intro:
      "A resort on the southern tip of the Sinai Peninsula, famous for coral reefs and diving at Ras Mohammed and Tiran.",
    bestTimeToVisit: "October–April for warm, comfortable weather; summer is very hot.",
    landmarks: [
      { name: "Ras Mohammed National Park", description: "A marine park with some of the Red Sea's best reefs." },
      { name: "Naama Bay", description: "The lively centre with a beach and promenade." },
      { name: "Tiran Island", description: "Reefs and dive sites in the Straits of Tiran." },
      { name: "Old Market (Old Sharm)", description: "A traditional market area with a mosque and cafés." },
    ],
    localTip: "Winter nights in the desert are cooler than many visitors expect.",
    gettingAround:
      "Taxis and hotel shuttles are the usual way to get around.",
    goodToKnow:
      "Reef shoes are useful — many beaches have coral close to shore.",
  },
  "morocco:agadir": {
    intro:
      "A modern Atlantic beach resort in southern Morocco with a long sandy bay and one of the country's sunniest climates.",
    bestTimeToVisit: "Year-round; it's popular for winter sun. Summer is warm but moderated by the Atlantic.",
    landmarks: [
      { name: "Agadir Beach", description: "A long, sandy bay with a seafront promenade." },
      { name: "Agadir Oufella", description: "The hilltop kasbah ruins with views over the bay." },
      { name: "Souk El Had", description: "A large traditional market." },
      { name: "Paradise Valley", description: "A palm-lined gorge in the Atlas foothills, a popular day trip." },
    ],
    localTip: "Morning sea mist is common, especially in summer, and usually burns off by midday.",
    gettingAround:
      "Petit taxis are the easiest way around town; organised tours reach the valleys.",
    goodToKnow:
      "The Atlantic here is cooler than the Mediterranean.",
  },
  "malta:valletta": {
    intro:
      "Malta's compact capital, a UNESCO-listed fortified city on a peninsula, and the base for exploring an island nation with a warm, sunny Mediterranean climate.",
    bestTimeToVisit: "April–June and September–October for warm weather; July and August are hot.",
    landmarks: [
      { name: "St John's Co-Cathedral", description: "A richly decorated Baroque church with works by Caravaggio." },
      { name: "Upper Barrakka Gardens", description: "Terraced gardens with views over the Grand Harbour." },
      { name: "Mdina", description: "The walled 'silent city' in the island's centre." },
      { name: "Blue Lagoon, Comino", description: "Clear turquoise water on the small island of Comino." },
    ],
    localTip: "The Blue Lagoon gets very busy in summer — go early or late.",
    gettingAround:
      "Buses reach most of the island; ferries link Valletta with the Three Cities and Gozo.",
    goodToKnow:
      "Malta has mild winters, making it a good off-season city break.",
  },
  "cyprus:paphos": {
    intro:
      "A harbour town on Cyprus's south-west coast, UNESCO-listed for its Roman mosaics and ancient tombs, with a long sunny season.",
    bestTimeToVisit: "April–June and September–November for warm weather; July and August are very hot.",
    landmarks: [
      { name: "Paphos Archaeological Park", description: "Roman villas with some of the finest mosaics in the Mediterranean." },
      { name: "Tombs of the Kings", description: "Rock-cut tombs near the sea." },
      { name: "Aphrodite's Rock", description: "The legendary birthplace of Aphrodite on the coast." },
      { name: "Akamas Peninsula", description: "A wild area of hiking trails and coves." },
    ],
    localTip: "Summer heat is intense inland; the coast is more comfortable.",
    gettingAround:
      "Buses connect the harbour, old town and nearby beaches; a car helps for Akamas.",
    goodToKnow:
      "Cyprus has one of Europe's longest swimming seasons, often into November.",
  },
  "cyprus:larnaca": {
    intro:
      "A seaside town and the main entry point to Cyprus, with a palm-lined promenade, a salt lake and easy access to beaches and villages.",
    bestTimeToVisit: "April–June and September–November for warm, pleasant weather.",
    landmarks: [
      { name: "Finikoudes Promenade", description: "The palm-lined seafront with cafés and a town beach." },
      { name: "Church of Saint Lazarus", description: "A 9th-century church in the town centre." },
      { name: "Larnaca Salt Lake", description: "A lake visited by flamingos in winter." },
      { name: "Zenobia wreck", description: "A famous shipwreck dive site offshore." },
    ],
    localTip: "Flamingos are usually at the Salt Lake in winter and spring.",
    gettingAround:
      "Buses link the airport, town and beaches; a car helps for mountain villages.",
    goodToKnow:
      "The sea is warm from late spring to autumn.",
  },
  "tunisia:djerba": {
    intro:
      "A flat, sunny island off southern Tunisia with sandy beaches, whitewashed villages and a long tradition as a winter-sun destination.",
    bestTimeToVisit: "April–June and September–October for warm weather; summer is hot.",
    landmarks: [
      { name: "Houmt Souk", description: "The island's main town with markets and an old fort." },
      { name: "El Ghriba Synagogue", description: "One of the oldest synagogues in Africa." },
      { name: "Djerbahood", description: "Street art in the village of Erriadh." },
      { name: "Sidi Mahrez Beach", description: "A long sandy beach on the north-east coast." },
    ],
    localTip: "Winters are mild but can be windy.",
    gettingAround:
      "Taxis and hotel shuttles are the easiest way to get around.",
    goodToKnow:
      "Dress respectfully when visiting religious sites.",
  },
  "dominican-republic:punta-cana": {
    intro:
      "The Dominican Republic's main beach resort area, with long white-sand beaches and warm weather all year.",
    bestTimeToVisit: "December–April for the driest, most comfortable weather; the hurricane season runs from June to November.",
    landmarks: [
      { name: "Bávaro Beach", description: "A long palm-lined beach with calm water." },
      { name: "Saona Island", description: "A protected island in a national park, reached by boat." },
      { name: "Hoyo Azul", description: "A cenote-style natural pool in a limestone cliff." },
      { name: "Macao Beach", description: "A wilder beach popular with surfers." },
    ],
    localTip: "Tropical showers are usually short, even in the rainy season.",
    gettingAround:
      "Most visitors use taxis, resort shuttles or organised tours.",
    goodToKnow:
      "Check forecasts during hurricane season (June–November), especially August–October.",
  },
  "curacao:willemstad": {
    intro:
      "The capital of Curaçao, known for its colourful UNESCO-listed waterfront, and the base for exploring an island of reefs and beaches just outside the main hurricane belt.",
    bestTimeToVisit: "Year-round; it's warm, sunny and fairly dry most of the year, with a short rainier period in late autumn.",
    landmarks: [
      { name: "Handelskade", description: "The colourful waterfront houses of Punda." },
      { name: "Queen Emma Bridge", description: "A floating pontoon bridge across St Anna Bay." },
      { name: "Playa Kenepa", description: "A popular beach on the west coast." },
      { name: "Shete Boka National Park", description: "A wild coastline of sea inlets and caves." },
    ],
    localTip: "The trade winds keep the heat pleasant, but the sun is strong — use high-SPF sunscreen.",
    gettingAround:
      "A hire car is the easiest way to reach the west-coast beaches.",
    goodToKnow:
      "Curaçao lies south of the main hurricane path, so storms are rare.",
  },
  "spain:costa-adeje": {
    intro:
      "Tenerife's main resort area on the sunny southwest coast, with hotels along a long seafront promenade, sheltered beaches and the island's most reliable sunshine.",
    bestTimeToVisit: "All year: winters are mild and summers rarely scorching. March–June and September–November are the most comfortable.",
    landmarks: [
      { name: "Playa del Duque", description: "A sheltered golden-sand beach lined with upmarket hotels." },
      { name: "Siam Park", description: "A large Thai-themed water park just inland." },
      { name: "Barranco del Infierno", description: "A gorge hike to a waterfall above Adeje town; permit required." },
      { name: "Playa de las Américas", description: "The neighbouring resort, known for nightlife and surf breaks." },
    ],
    localTip: "Whale- and dolphin-watching boats leave from Puerto Colón; the sea is calmest in the morning.",
    gettingAround:
      "The seafront promenade links Costa Adeje with Playa de las Américas and Los Cristianos; TITSA buses reach the rest of the island.",
    goodToKnow:
      "The south is drier and sunnier than the north of the island. When Teide has snow in winter, the coast can still be around 22°C.",
  },
  "spain:puerto-de-la-cruz": {
    intro:
      "Tenerife's original resort town on the green north coast, with an old fishing harbour, sea-water pools and views of Mount Teide.",
    bestTimeToVisit: "April–October for the most sunshine; winters are mild but cloudier and wetter than in the south.",
    landmarks: [
      { name: "Lago Martiánez", description: "Sea-water swimming pools designed by César Manrique." },
      { name: "Loro Parque", description: "One of the island's best-known animal parks." },
      { name: "Jardín Botánico", description: "A historic botanical garden founded in the 18th century." },
      { name: "Playa Jardín", description: "A black-sand beach framed by gardens." },
    ],
    localTip: "The Atlantic here can be rough, so swim in Lago Martiánez or at flagged beaches.",
    gettingAround:
      "The town centre is walkable; buses connect it to La Orotava, Santa Cruz and the north airport.",
    goodToKnow:
      "Trade-wind clouds often gather over the north in the afternoons, which keeps it greener and a little cooler than Costa Adeje.",
  },
  "spain:maspalomas": {
    intro:
      "Gran Canaria's big southern resort, famous for its sand dunes, lighthouse and long beach, which runs into neighbouring Playa del Inglés.",
    bestTimeToVisit: "All year; October–May gives warm, sunny days while most of Europe is cold.",
    landmarks: [
      { name: "Maspalomas Dunes", description: "A protected field of sand dunes beside the sea." },
      { name: "Maspalomas Lighthouse", description: "A 19th-century lighthouse at the end of the promenade." },
      { name: "Playa del Inglés", description: "The adjoining resort with the island's busiest beach." },
      { name: "Charca de Maspalomas", description: "A small lagoon and bird reserve at the edge of the dunes." },
    ],
    localTip: "Walk the dunes early or late in the day; the sand gets very hot by midday.",
    gettingAround:
      "Buses link the resort to Las Palmas and the airport in about 40 minutes.",
    goodToKnow:
      "The south of the island is much sunnier than the capital, Las Palmas, which often sits under low cloud in summer.",
  },
  "spain:playa-blanca": {
    intro:
      "A quieter resort at Lanzarote's southern tip, with a marina, a seafront promenade and ferries across to Fuerteventura.",
    bestTimeToVisit: "All year; spring and autumn are warm without the summer crowds.",
    landmarks: [
      { name: "Papagayo Beaches", description: "Sheltered coves in a protected natural area east of town." },
      { name: "Marina Rubicón", description: "A marina with restaurants and a weekly market." },
      { name: "Los Hervideros", description: "Lava caves where the waves crash through the rock." },
      { name: "Timanfaya National Park", description: "Volcanic landscapes about 30 minutes north." },
    ],
    localTip: "The Papagayo coves are reached on a dirt road with a small entry fee, so bring cash.",
    gettingAround:
      "The resort is spread out, so a hire car helps; ferries to Corralejo take about 25 minutes.",
    goodToKnow:
      "Lanzarote is windy, especially in summer, which keeps the heat pleasant but can make beaches blustery.",
  },
  "spain:corralejo": {
    intro:
      "A lively resort town at the northern tip of Fuerteventura, next to a protected area of white sand dunes.",
    bestTimeToVisit: "All year; April–June and September–October have warm days and lighter winds.",
    landmarks: [
      { name: "Corralejo Dunes Natural Park", description: "White sand dunes running down to long beaches." },
      { name: "Isla de Lobos", description: "A small protected island reached by boat for walks and snorkelling." },
      { name: "Old harbour", description: "The original fishing quarter with seafood restaurants." },
      { name: "El Cotillo", description: "A village with calm lagoon beaches on the west coast." },
    ],
    localTip: "Visits to Isla de Lobos need a free online permit, so book it before you go.",
    gettingAround:
      "The town is walkable; buses and hire cars reach the rest of the island, and ferries cross to Lanzarote.",
    goodToKnow:
      "Fuerteventura is one of Europe's windiest islands, popular with kitesurfers, especially from June to August.",
  },
  "spain:menorca": {
    intro:
      "The quietest of the big Balearic Islands, known for turquoise coves, two historic towns and a protected landscape.",
    bestTimeToVisit: "June and September for warm sea and fewer crowds; July and August are hottest and busiest.",
    landmarks: [
      { name: "Ciutadella", description: "The old capital, with a cathedral and a narrow harbour." },
      { name: "Mahón (Maó) Harbour", description: "One of the largest natural harbours in the Mediterranean." },
      { name: "Cala Macarella", description: "A pine-fringed cove with clear, shallow water." },
      { name: "Camí de Cavalls", description: "A coastal footpath that circles the whole island." },
    ],
    localTip: "Parking at popular coves fills early in summer, so take the beach buses or go before 10am.",
    gettingAround:
      "Buses connect the main towns and beaches in summer; a hire car makes the remote coves easier.",
    goodToKnow:
      "Menorca is often windier than Mallorca, especially when the Tramontana blows from the north.",
  },
  "spain:alcudia": {
    intro:
      "A family resort on Mallorca's north coast, with a walled old town and a long, shallow sandy bay.",
    bestTimeToVisit: "May–June and September for warm weather and calmer beaches.",
    landmarks: [
      { name: "Alcúdia Old Town", description: "Medieval walls, narrow streets and a Tuesday and Sunday market." },
      { name: "Playa de Alcúdia", description: "A long bay with gently sloping sand, good for children." },
      { name: "Pollentia", description: "The remains of a Roman town next to the walls." },
      { name: "Cap de Formentor", description: "A dramatic headland with a lighthouse, a short drive away." },
    ],
    localTip: "Drive to Formentor early; in summer, cars are restricted at busy times and shuttle buses run instead.",
    gettingAround:
      "Buses connect Alcúdia with Pollença and Palma; bikes are popular on the flat coastal roads.",
    goodToKnow:
      "The north coast is a little cooler and greener than Palma, with more rain in autumn.",
  },
  "spain:salou": {
    intro:
      "A beach resort on the Costa Dorada near Tarragona, known for its long promenade and the PortAventura theme parks.",
    bestTimeToVisit: "June and September for beach weather without the peak-summer crowds.",
    landmarks: [
      { name: "PortAventura World", description: "A large theme park resort with a water park and Ferrari Land." },
      { name: "Platja Llarga", description: "A quieter beach backed by pine trees." },
      { name: "Camí de Ronda", description: "A coastal path between coves and viewpoints." },
      { name: "Tarragona", description: "A Roman city with an amphitheatre, 15 minutes away." },
    ],
    localTip: "Many hotels and restaurants close from November to March, so check before a winter visit.",
    gettingAround:
      "Trains run to Tarragona and Barcelona; local buses and taxis cover the resort.",
    goodToKnow:
      "Autumn can bring short, heavy rainstorms to this coast, especially in September and October.",
  },
  "spain:lloret-de-mar": {
    intro:
      "A busy Costa Brava resort with a sandy main beach, rocky coves and gardens on the cliffs.",
    bestTimeToVisit: "June and September for warm sea and fewer crowds.",
    landmarks: [
      { name: "Santa Clotilde Gardens", description: "Terraced gardens on the cliffs above the sea." },
      { name: "Sant Joan Castle", description: "A restored watchtower between two beaches." },
      { name: "Cala Boadella", description: "A small cove reached by a path through the pines." },
      { name: "Tossa de Mar", description: "A walled medieval town a short boat trip away." },
    ],
    localTip: "Boats along the coast to Tossa de Mar are the easiest way to see the coves.",
    gettingAround:
      "Buses run to Girona and Barcelona; the town centre is walkable.",
    goodToKnow:
      "The Costa Brava is greener and a little cooler than Spain's southern coasts, with more rain in autumn.",
  },
  "spain:alicante": {
    intro:
      "A port city on the Costa Blanca with a palm-lined promenade, a hilltop castle and a city beach.",
    bestTimeToVisit: "April–June and September–October for warm, sunny days without July and August heat.",
    landmarks: [
      { name: "Castillo de Santa Bárbara", description: "A hilltop fortress with views over the city and coast." },
      { name: "Explanada de España", description: "The wavy mosaic promenade along the harbour." },
      { name: "Playa del Postiguet", description: "The city's central beach below the castle." },
      { name: "Tabarca Island", description: "A small island with a walled village, reached by boat." },
    ],
    localTip: "Take the lift inside the hill up to the castle, then walk down through the old Santa Cruz quarter.",
    gettingAround:
      "Trams run along the coast to Benidorm; buses link the airport with the centre.",
    goodToKnow:
      "Alicante is one of the driest and sunniest cities in Spain, with mild winters.",
  },
  "spain:benalmadena": {
    intro:
      "A Costa del Sol resort west of Málaga, with a large marina, a hillside old village and a cable car into the mountains.",
    bestTimeToVisit: "April–June and September–October for warm weather without the peak-summer heat.",
    landmarks: [
      { name: "Puerto Marina", description: "A marina with fanciful architecture, restaurants and bars." },
      { name: "Benalmádena Cable Car", description: "A cable car up Mount Calamorro for coastal views." },
      { name: "Colomares Castle", description: "An unusual monument to Christopher Columbus." },
      { name: "Benalmádena Pueblo", description: "The white village in the hills above the coast." },
    ],
    localTip: "The cable car closes when it's windy, so check it's running before you go.",
    gettingAround:
      "The Cercanías train links Benalmádena with Málaga airport, Torremolinos and Fuengirola.",
    goodToKnow:
      "The Costa del Sol has mild winters, with daytime highs around 17°C in January.",
  },
  "spain:torremolinos": {
    intro:
      "The Costa del Sol's first big resort, close to Málaga airport, with long beaches and a lively centre.",
    bestTimeToVisit: "April–June and September–October for warm days; July and August are hot and busy.",
    landmarks: [
      { name: "La Carihuela", description: "A former fishing quarter known for fried fish." },
      { name: "Playamar Beach", description: "A long beach with a seafront promenade." },
      { name: "Molino de Inca Botanical Garden", description: "Gardens around historic water mills." },
      { name: "San Miguel Street", description: "The main shopping street in the old centre." },
    ],
    localTip: "Try espetos, sardines grilled on skewers over beach fires, at a chiringuito in La Carihuela.",
    gettingAround:
      "The Cercanías train reaches Málaga airport in about 10 minutes and Málaga city in 20.",
    goodToKnow:
      "Being so close to the airport makes it a popular short winter-sun break.",
  },
  "spain:fuengirola": {
    intro:
      "A family-friendly Costa del Sol town with 7 km of beaches, a Moorish castle and a long seafront promenade.",
    bestTimeToVisit: "April–June and September–October for warm weather; winter stays mild.",
    landmarks: [
      { name: "Sohail Castle", description: "A restored Moorish castle at the mouth of the river." },
      { name: "Bioparc Fuengirola", description: "A zoo designed around natural habitats." },
      { name: "Paseo Marítimo", description: "A seafront promenade along the whole town." },
      { name: "Mijas Pueblo", description: "A white hill village 20 minutes inland." },
    ],
    localTip: "Buses run up to Mijas Pueblo, which is cooler than the coast on hot days.",
    gettingAround:
      "Fuengirola is the last stop on the Cercanías line from Málaga, via the airport.",
    goodToKnow:
      "It has a large year-round community of northern European residents, so it stays lively in winter.",
  },
  "spain:marbella": {
    intro:
      "An upmarket Costa del Sol town with a pretty old quarter, beach clubs and the Puerto Banús marina.",
    bestTimeToVisit: "May–June and September–October for warm, sunny days without the summer peak.",
    landmarks: [
      { name: "Plaza de los Naranjos", description: "The orange-tree square at the heart of the old town." },
      { name: "Puerto Banús", description: "A marina known for yachts, boutiques and nightlife." },
      { name: "Avenida del Mar", description: "A boulevard with Salvador Dalí sculptures." },
      { name: "Sierra Blanca", description: "The mountains behind the town, with hiking trails." },
    ],
    localTip: "Explore the old town in the evening, when the squares fill with people.",
    gettingAround:
      "Buses link Marbella with Málaga and its airport in about 45 minutes; there's no train.",
    goodToKnow:
      "The Sierra Blanca shelters the town from northern winds, giving it a mild microclimate.",
  },
  "portugal:albufeira": {
    intro:
      "The Algarve's liveliest resort, a former fishing town with an old centre on the cliffs and golden beaches below.",
    bestTimeToVisit: "May–June and September–October for warm, sunny weather and quieter beaches.",
    landmarks: [
      { name: "Praia dos Pescadores", description: "The central beach, reached through a tunnel from the old town." },
      { name: "Old Town", description: "White houses and narrow streets on the cliffs." },
      { name: "Praia da Falésia", description: "A long beach under red and orange cliffs." },
      { name: "Benagil Cave", description: "A sea cave with a hole in its roof, reached by boat or kayak." },
    ],
    localTip: "Boat trips to Benagil run from Albufeira's marina; morning trips have calmer seas.",
    gettingAround:
      "Buses link the town with Faro airport; the old town and main beaches are walkable.",
    goodToKnow:
      "The Atlantic stays cool, around 20–22°C even in August.",
  },
  "greece:kos": {
    intro:
      "A Dodecanese island near the Turkish coast, with long sandy beaches, ancient ruins and flat roads made for cycling.",
    bestTimeToVisit: "May–June and September–October for warm sea and fewer crowds.",
    landmarks: [
      { name: "Asklepion", description: "The ancient healing sanctuary linked to Hippocrates." },
      { name: "Neratzia Castle", description: "A Knights of St John fortress by the harbour." },
      { name: "Paradise Beach", description: "A popular sandy beach on the south coast." },
      { name: "Zia", description: "A mountain village known for its sunset views." },
    ],
    localTip: "Rent a bike in Kos Town; there are cycle lanes along the coast.",
    gettingAround:
      "Buses connect the main resorts; ferries go to nearby islands and to Bodrum in Turkey.",
    goodToKnow:
      "The summer meltemi wind keeps temperatures bearable but can make the north coast choppy.",
  },
  "greece:zakynthos": {
    intro:
      "An Ionian island, also known as Zante, famous for Navagio shipwreck beach, sea caves and loggerhead turtles.",
    bestTimeToVisit: "June and September for warm sea and calmer resorts; July and August are hottest.",
    landmarks: [
      { name: "Navagio (Shipwreck Beach)", description: "A cove with a rusting wreck under white cliffs." },
      { name: "Blue Caves", description: "Sea caves with bright blue water on the north coast." },
      { name: "Laganas Bay", description: "A marine park where loggerhead turtles nest." },
      { name: "Bochali", description: "A hill above Zakynthos Town with views over the harbour." },
    ],
    localTip: "Check that Navagio is open before booking; access has been restricted at times because of rockfalls.",
    gettingAround:
      "A hire car or scooter is the easiest way to explore; boat trips go to the caves and Navagio.",
    goodToKnow:
      "Some beaches on Laganas Bay have restrictions during turtle nesting season, from May to October.",
  },
  "greece:kefalonia": {
    intro:
      "The largest Ionian island, with mountains, underground lakes and some of Greece's most photographed beaches.",
    bestTimeToVisit: "June and September for warm weather and sea; spring is green and good for hiking.",
    landmarks: [
      { name: "Myrtos Beach", description: "A white-pebble beach between steep cliffs." },
      { name: "Melissani Cave", description: "An underground lake lit by sunlight through a collapsed roof." },
      { name: "Assos", description: "A fishing village beside a Venetian fortress." },
      { name: "Mount Ainos", description: "A national park with fir forests and hiking trails." },
    ],
    localTip: "Visit Melissani around midday, when sunlight shines straight into the cave.",
    gettingAround:
      "A hire car is almost essential; buses are limited outside Argostoli.",
    goodToKnow:
      "The Ionian islands are greener and get more winter rain than the Aegean islands.",
  },
  "greece:halkidiki": {
    intro:
      "A peninsula in northern Greece with three long fingers of land, pine forests and many sandy beaches.",
    bestTimeToVisit: "June and September for warm sea and quieter beaches; July and August are busiest.",
    landmarks: [
      { name: "Kassandra", description: "The busiest peninsula, with resorts and beach bars." },
      { name: "Sithonia", description: "The middle peninsula, with coves and pine forests." },
      { name: "Mount Athos", description: "A monastic community seen on boat trips from Ouranoupoli." },
      { name: "Petralona Cave", description: "A cave with stalactites and prehistoric finds." },
    ],
    localTip: "Sithonia's beaches are quieter than Kassandra's; stay there if you want space.",
    gettingAround:
      "Thessaloniki airport is about an hour away; a hire car is the easiest way around.",
    goodToKnow:
      "Winters are colder than on the Greek islands, and many hotels close from November to April.",
  },
  "cyprus:ayia-napa": {
    intro:
      "A beach resort on Cyprus's southeast coast, known for clear water, sea caves and a long summer season.",
    bestTimeToVisit: "May–June and September–October for warm sea without the peak heat.",
    landmarks: [
      { name: "Nissi Beach", description: "A sandy beach with a small island reached through shallow water." },
      { name: "Cape Greco", description: "A national park with sea caves and cliff walks." },
      { name: "Ayia Napa Monastery", description: "A Venetian-era monastery in the town centre." },
      { name: "Konnos Bay", description: "A sheltered cove near Cape Greco." },
    ],
    localTip: "Walk to the sea caves at Cape Greco in the early morning, before the boat trips arrive.",
    gettingAround:
      "Buses link Ayia Napa with Protaras and Larnaca airport, about 45 minutes away.",
    goodToKnow:
      "It hardly rains from May to October, and the sea stays warm into November.",
  },
  "turkey:side": {
    intro:
      "A resort on the Turkish Riviera east of Antalya, where hotels and beaches sit around an ancient harbour town.",
    bestTimeToVisit: "May–June and September–October; July and August often pass 35°C.",
    landmarks: [
      { name: "Temple of Apollo", description: "Seaside columns that are lit up at sunset." },
      { name: "Side Ancient Theatre", description: "A large Roman theatre in the old town." },
      { name: "Manavgat Waterfall", description: "A wide, low waterfall a short drive inland." },
      { name: "Aspendos", description: "One of the best-preserved Roman theatres, about 40 minutes away." },
    ],
    localTip: "Visit the ruins in the late afternoon; they're next to the sea and cooler then.",
    gettingAround:
      "Minibuses (dolmuş) run between the old town and hotels; Antalya airport is about an hour away.",
    goodToKnow:
      "The sea is warm enough for swimming from May to early November.",
  },
  "turkey:marmaris": {
    intro:
      "A resort in a sheltered bay where the Aegean meets the Mediterranean, backed by pine-covered hills.",
    bestTimeToVisit: "May–June and September–October for warm, sunny weather without the midsummer heat.",
    landmarks: [
      { name: "Marmaris Castle", description: "A small castle above the harbour with a museum." },
      { name: "Marina", description: "A busy marina with boat trips around the bay." },
      { name: "Turunç", description: "A quieter beach village reached by water taxi." },
      { name: "Dalyan", description: "Rock tombs, mud baths and a turtle beach, on a day trip." },
    ],
    localTip: "Daily boat trips visit several coves; they're the best way to see the coastline.",
    gettingAround:
      "Dalaman airport is about 90 minutes away; dolmuş minibuses link nearby villages.",
    goodToKnow:
      "Winters are mild but wet; almost all the year's rain falls between November and March.",
  },
  "turkey:bodrum": {
    intro:
      "A stylish peninsula on the Aegean coast, with white houses, a crusader castle and many bays and beach clubs.",
    bestTimeToVisit: "June and September for warm sea and a relaxed pace; July and August are busiest.",
    landmarks: [
      { name: "Bodrum Castle", description: "A Knights of St John castle with an underwater archaeology museum." },
      { name: "Mausoleum of Halicarnassus", description: "The site of one of the Seven Wonders of the Ancient World." },
      { name: "Gümüşlük", description: "A fishing village known for its sunset restaurants." },
      { name: "Bodrum Windmills", description: "Old stone windmills on the hill above town." },
    ],
    localTip: "Book a table in Gümüşlük for sunset; the waterfront fills quickly in summer.",
    gettingAround:
      "Dolmuş minibuses connect the peninsula's villages; Milas-Bodrum airport is about 40 minutes away.",
    goodToKnow:
      "The Aegean side is a little less humid than the Turkish Riviera around Antalya.",
  },
  "cape-verde:sal": {
    intro:
      "A flat, dry Atlantic island off West Africa, with warm weather all year, white beaches and strong trade winds.",
    bestTimeToVisit: "All year; November–June is driest, and winter is the main season for European visitors.",
    landmarks: [
      { name: "Santa Maria Beach", description: "A long white-sand beach in the main resort town." },
      { name: "Pedra de Lume Salt Crater", description: "Salt pans inside an old volcanic crater where you can float." },
      { name: "Buracona", description: "A natural rock pool and the 'Blue Eye' light effect." },
      { name: "Kite Beach", description: "One of the best-known kitesurfing spots in the Atlantic." },
    ],
    localTip: "Visit Buracona around midday, when the sun lights up the Blue Eye.",
    gettingAround:
      "The airport is 20 minutes from Santa Maria; taxis and quad tours cover the island.",
    goodToKnow:
      "Daytime highs stay around 25–30°C all year, and it's windy from December to May.",
  },
  "cape-verde:boa-vista": {
    intro:
      "Cape Verde's third-largest island, known for huge empty beaches, desert-like dunes and nesting turtles.",
    bestTimeToVisit: "November–June for dry, sunny weather; July–October brings turtle nesting and the odd shower.",
    landmarks: [
      { name: "Santa Monica Beach", description: "A long, empty beach on the south coast." },
      { name: "Viana Desert", description: "Sand dunes blown in from the Sahara." },
      { name: "Sal Rei", description: "The island's small capital, with a colourful main square." },
      { name: "Cabo Santa Maria shipwreck", description: "A rusting cargo ship stranded on the north coast." },
    ],
    localTip: "Turtle-watching tours run at night from July to October with licensed local guides.",
    gettingAround:
      "Most hotels are outside Sal Rei; taxis and jeep tours are the way to reach remote beaches.",
    goodToKnow:
      "The sea can have strong currents, so swim only at supervised beaches.",
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
  "pakistan:karachi": {
    intro:
      "Pakistan's largest city and its economic engine, a sprawling port metropolis on the Arabian Sea with a mix of colonial-era architecture, busy bazaars, and one of South Asia's liveliest food scenes. It's less about single must-see monuments and more about the energy of the city itself.",
    bestTimeToVisit: "November to February — the cooler, drier winter months, avoiding the intense heat and humidity of summer.",
    landmarks: [
      { name: "Mazar-e-Quaid", description: "The marble mausoleum of Muhammad Ali Jinnah, Pakistan's founder, and the city's most recognisable landmark." },
      { name: "Frere Hall", description: "A grand 19th-century colonial-era hall set in landscaped gardens, now used as a gallery and public library." },
      { name: "Clifton Beach", description: "Karachi's main city beach along the Arabian Sea, popular for camel rides and evening walks." },
      { name: "Empress Market", description: "A bustling Victorian-era covered market dating to the 1880s, still a working hub for produce, spices, and textiles." },
    ],
    localTip: "Karachi's food scene runs late — many of the best-known barbecue and biryani spots hit their stride after sunset, so plan dinner accordingly.",
    gettingAround:
      "Karachi is large and spread out, so taxis or ride-hailing apps are the practical way to get between neighbourhoods rather than walking.",
    goodToKnow:
      "Karachi's humidity and heat build sharply from April onward, so a winter visit makes for a far more comfortable trip than a summer one.",
  },
  "pakistan:lahore": {
    intro:
      "Pakistan's cultural capital, layered with Mughal-era monuments, gardens, and a walled old city that has been continuously inhabited for centuries. It's widely considered the country's culinary and artistic heart, with a slower, more historic feel than Karachi.",
    bestTimeToVisit: "October to March — mild, comfortable weather that suits walking through the old city and gardens.",
    landmarks: [
      { name: "Badshahi Mosque", description: "A monumental 17th-century Mughal mosque and one of the largest in the world by area." },
      { name: "Lahore Fort", description: "A UNESCO World Heritage citadel with palaces, gardens, and audience halls built up over Mughal and Sikh rule." },
      { name: "Shalimar Gardens", description: "A terraced Mughal garden complex from the 1640s, laid out with fountains and marble pavilions." },
      { name: "Walled City (Androon Lahore)", description: "The historic old city's dense lanes, markets, and havelis, entered through monumental gates." },
    ],
    localTip: "Food Street in the old city, facing the Badshahi Mosque, is the easiest way to sample Lahori food in one evening — go hungry and share dishes.",
    gettingAround:
      "The old city is best explored on foot, while newer parts of Lahore are more spread out and better covered by taxi, rickshaw, or ride-hailing apps.",
    goodToKnow:
      "Lahore hosts Basant, a kite-flying spring tradition, and Mughal-era sites can get busy around public holidays — check the calendar if you want quieter visits.",
  },
  "pakistan:islamabad": {
    intro:
      "Pakistan's purpose-built capital, laid out in the 1960s at the foot of the Margalla Hills — greener, quieter, and far more orderly than the country's older cities. It makes an easy base for hiking and day trips as well as seeing national institutions.",
    bestTimeToVisit: "March to April or September to November — spring and autumn bring mild temperatures and clearer views of the hills.",
    landmarks: [
      { name: "Faisal Mosque", description: "One of the largest mosques in the world, with a striking modernist tent-like design at the base of the Margalla Hills." },
      { name: "Margalla Hills National Park", description: "Forested hills on the city's edge with popular hiking trails and viewpoints over Islamabad." },
      { name: "Pakistan Monument", description: "A flower-shaped national monument and museum commemorating the country's founding provinces and territories." },
      { name: "Lok Virsa Museum", description: "A folk heritage museum showcasing crafts, textiles, and traditions from across Pakistan's regions." },
    ],
    localTip: "The Margalla Hills trails (Trail 3 and Trail 5 are the most popular) are best started early in the morning before the heat and crowds build up.",
    gettingAround:
      "Islamabad is spread out and zoned into sectors, so taxis or ride-hailing apps are the most practical way to get around, though central sectors are walkable.",
    goodToKnow:
      "Islamabad sits right next to Rawalpindi, its older twin city, which has a denser bazaar atmosphere worth a short trip if time allows.",
  },
  "indonesia:bali": {
    intro:
      "Indonesia's best-known island mixes Hindu temples, green rice terraces and surf beaches. The busy south coast has most of the resorts, while the cooler hills around Ubud are the island's cultural heart.",
    bestTimeToVisit:
      "April to October, the dry season. July and August are the busiest months; November to March is the wet season, with heavy showers that usually come in the afternoon.",
    landmarks: [
      { name: "Tanah Lot", description: "A sea temple on a rock outcrop that is cut off from the shore at high tide, best known at sunset." },
      { name: "Uluwatu Temple", description: "A clifftop temple on the Bukit peninsula, with Kecak fire-dance performances at sunset." },
      { name: "Tegallalang Rice Terraces", description: "Stepped rice paddies in a valley north of Ubud." },
      { name: "Sacred Monkey Forest Sanctuary", description: "A forest temple complex in Ubud, home to hundreds of long-tailed macaques." },
    ],
    localTip: "Temples ask visitors to wear a sarong and sash; most lend or rent them at the entrance, but bringing your own saves time.",
    gettingAround:
      "There is no public transport that is useful for visitors. Most people hire a driver for the day or use ride-hailing apps; traffic in the south can be very slow.",
    goodToKnow:
      "On Nyepi, the Balinese Day of Silence in March, the whole island shuts down for 24 hours, including the airport, so check the date before you book.",
  },
  "maldives:maldives": {
    intro:
      "About 1,200 coral islands in 26 atolls in the Indian Ocean, most of them home to a single resort with overwater villas, reefs and shallow lagoons. The weather data here is for Malé, the capital.",
    bestTimeToVisit:
      "December to April, the dry northeast monsoon, has the most sunshine and calm seas. May to November brings more rain and wind, but lower prices and the manta season in some atolls.",
    landmarks: [
      { name: "Hukuru Miskiy (Old Friday Mosque)", description: "A 17th-century mosque in Malé built from carved coral stone." },
      { name: "Hanifaru Bay", description: "A small bay in the Baa Atoll UNESCO biosphere reserve, famous for gatherings of manta rays in the southwest monsoon." },
      { name: "Banana Reef", description: "One of the first dive sites in the Maldives, with caves, overhangs and plenty of reef fish." },
      { name: "Malé Fish Market", description: "The capital's busy market where the day's tuna catch is landed and sold." },
    ],
    localTip: "Seaplanes only fly in daylight, so if you land late you may need a night near the airport before the transfer to your resort.",
    gettingAround:
      "Resorts arrange transfers by speedboat, seaplane or domestic flight. Malé itself is small enough to walk, with taxis for longer trips.",
    goodToKnow:
      "The Maldives is a Muslim country: alcohol is served only at resorts and on liveaboard boats, and on local islands swimwear belongs on the marked bikini beaches.",
  },
  "sri-lanka:colombo": {
    intro:
      "Sri Lanka's biggest city and commercial capital on the west coast, with colonial buildings, a busy port and a long seafront. Most trips around the island start or end here.",
    bestTimeToVisit:
      "December to March for Colombo and the west and south coasts. The east coast has its dry season from about May to September, so part of the island has good weather in most months.",
    landmarks: [
      { name: "Galle Face Green", description: "A seafront promenade that fills with families and street-food stalls in the evening." },
      { name: "Gangaramaya Temple", description: "A busy Buddhist temple mixing Sri Lankan, Thai and Chinese styles, with a small museum." },
      { name: "Pettah Market", description: "Crowded bazaar streets near the Fort district, each known for its own goods." },
      { name: "Colombo National Museum", description: "Sri Lanka's largest museum, in a colonial building with royal regalia and ancient art." },
    ],
    localTip: "Go to Galle Face Green around sunset and try isso wade (prawn fritters) from the stalls.",
    gettingAround:
      "Tuk-tuks are everywhere; use one with a meter or book through a ride-hailing app. Trains from Colombo Fort to Kandy and Galle are slow but scenic.",
    goodToKnow:
      "At temples, take off shoes and hats and cover shoulders and knees, and don't take photos with your back to a Buddha statue.",
  },
  "mauritius:mauritius": {
    intro:
      "A volcanic island east of Madagascar ringed by reefs and lagoons, with green mountains inland and a mix of Indian, African, French and Chinese culture. The weather data here is for Port Louis on the drier west coast.",
    bestTimeToVisit:
      "May to December, the cooler and drier season; April–June and September–November are often the most pleasant. January to March is hot and humid and the main cyclone season.",
    landmarks: [
      { name: "Le Morne Brabant", description: "A basalt mountain on the southwest tip, a UNESCO World Heritage Site above one of the island's best lagoons." },
      { name: "Seven Coloured Earth, Chamarel", description: "Small dunes of red, purple and yellow volcanic soil in the southwest hills." },
      { name: "Pamplemousses Botanical Garden", description: "One of the oldest botanical gardens in the southern hemisphere, known for its giant water lilies." },
      { name: "Grand Bassin (Ganga Talao)", description: "A crater lake in the highlands that is a sacred Hindu pilgrimage site." },
    ],
    localTip: "In the southern winter the trade winds make the east coast breezy — good for kitesurfing — while the west coast stays calmer and sunnier.",
    gettingAround:
      "Buses are cheap but slow. Most visitors use taxis, hire a driver, or rent a car (traffic drives on the left).",
    goodToKnow:
      "Try dholl puri, a thin flatbread filled with split peas and curry, from the stalls around Port Louis' Central Market.",
  },
  "tanzania:zanzibar": {
    intro:
      "A semi-autonomous archipelago off the coast of Tanzania. The main island has the historic Stone Town, spice farms and white-sand beaches on the east and north coasts, and it is often combined with a safari.",
    bestTimeToVisit:
      "June to October (dry and a little cooler) and December to February (hot and mostly dry). The long rains fall from March to May, with shorter rains in November.",
    landmarks: [
      { name: "Stone Town", description: "The old trading town, a UNESCO World Heritage Site of narrow lanes, carved doors and Swahili, Arab and Indian buildings." },
      { name: "Jozani Chwaka Bay National Park", description: "Forest and mangroves that are home to the rare Zanzibar red colobus monkey." },
      { name: "Nungwi Beach", description: "A beach on the northern tip, known for swimming at all tides and dhow sunset cruises." },
      { name: "Prison Island (Changuu)", description: "A small island off Stone Town with a colony of giant Aldabra tortoises." },
    ],
    localTip: "East-coast beaches such as Paje and Jambiani have very large tides; for swimming at any time of day, the north coast around Nungwi and Kendwa is better.",
    gettingAround:
      "Taxis and hotel transfers are the easiest option; dala-dala minibuses are cheap. Fast ferries link Stone Town with Dar es Salaam in about two hours.",
    goodToKnow:
      "Zanzibar is mostly Muslim: dress modestly in Stone Town and villages, and expect some restaurants to close during the day in Ramadan.",
  },
};

export function getCityGuide(countrySlug: string, citySlug: string): CityGuide | null {
  return cityGuides[`${countrySlug}:${citySlug}`] ?? null;
}
