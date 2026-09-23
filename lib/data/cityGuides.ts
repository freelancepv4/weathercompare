/**
 * Original, hand-written guide content for every city in config/countries.ts.
 * Purely editorial (landmarks, best time to visit, a local tip) — no
 * weather data lives here, that stays in the provider adapters.
 *
 * Keyed by `${countrySlug}:${citySlug}` to match config/countries.ts.
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
}

export const cityGuides: Record<string, CityGuide> = {
  "italy:rome": {
    intro:
      "Italy's capital layers three thousand years of history into a single walkable city, where ancient ruins sit a few minutes from Renaissance piazzas and busy modern streets.",
    bestTimeToVisit:
      "Late April to June or September to October, when temperatures are mild and the summer crowds have thinned.",
    landmarks: [
      { name: "Colosseum", description: "The largest amphitheatre ever built in the Roman Empire, still the city's defining silhouette." },
      { name: "Vatican Museums & Sistine Chapel", description: "A vast collection of art and antiquities leading to Michelangelo's famous ceiling." },
      { name: "Trevi Fountain", description: "An 18th-century Baroque fountain where visitors toss a coin over their shoulder for good luck." },
    ],
    localTip: "Book skip-the-line tickets for the Colosseum and Vatican in advance — same-day queues can run over an hour, especially in summer.",
  },
  "italy:milan": {
    intro:
      "Italy's financial and fashion capital pairs Gothic grandeur with sleek modern design, and makes an easy base for day trips into the Lombardy lakes.",
    bestTimeToVisit: "April to June or September to October, before the summer heat and after the crowds ease.",
    landmarks: [
      { name: "Duomo di Milano", description: "A vast marble Gothic cathedral whose rooftop terraces offer sweeping city views." },
      { name: "Galleria Vittorio Emanuele II", description: "One of the world's oldest shopping arcades, capped by an iron-and-glass dome." },
      { name: "Sforza Castle", description: "A 15th-century fortress now home to several of the city's art and history museums." },
    ],
    localTip: "See Leonardo da Vinci's The Last Supper at Santa Maria delle Grazie — timed-entry tickets sell out weeks ahead, so book early.",
  },
  "italy:naples": {
    intro:
      "A dense, dramatic port city beneath Mount Vesuvius, known for its historic centre, its food, and its position as the gateway to Pompeii and the Amalfi Coast.",
    bestTimeToVisit: "Spring (April–June) or autumn (September–October) for comfortable sightseeing weather.",
    landmarks: [
      { name: "Spaccanapoli", description: "The narrow, arrow-straight street that splits the ancient historic centre in two." },
      { name: "Castel dell'Ovo", description: "A seafront castle on a small island, one of the oldest fortifications in the city." },
      { name: "Pompeii (day trip)", description: "The Roman city preserved by the 79 AD eruption of Vesuvius, roughly 40 minutes away." },
    ],
    localTip: "Naples is widely credited as the birthplace of pizza — a Margherita here is a different experience from anywhere else in the country.",
  },
  "italy:turin": {
    intro:
      "An elegant, arcaded northern city known for its Baroque architecture, its café culture, and its role as Italy's first capital.",
    bestTimeToVisit: "April to June or September to October, avoiding the humid peak of summer.",
    landmarks: [
      { name: "Mole Antonelliana", description: "A soaring 19th-century tower that now houses the National Museum of Cinema." },
      { name: "Egyptian Museum", description: "One of the largest collections of Egyptian antiquities outside Cairo." },
      { name: "Piazza Castello", description: "The grand central square ringed by royal palaces and porticoed streets." },
    ],
    localTip: "Turin claims to be the home of the espresso-based drink 'bicerin' — worth trying at one of its historic cafés.",
  },
  "italy:florence": {
    intro: "The cradle of the Renaissance, compact enough to explore on foot, with an extraordinary concentration of art and architecture.",
    bestTimeToVisit: "April to May or September to October — summer is hot and heavily crowded.",
    landmarks: [
      { name: "Florence Cathedral (Duomo)", description: "Brunelleschi's red-tiled dome still dominates the skyline nearly six centuries on." },
      { name: "Uffizi Gallery", description: "Home to one of the world's most important collections of Renaissance painting." },
      { name: "Ponte Vecchio", description: "A medieval stone bridge lined with jewellers' shops over the Arno river." },
    ],
    localTip: "Reserve Uffizi Gallery tickets online — the walk-up queue routinely stretches for hours in high season.",
  },
  "italy:bologna": {
    intro: "A red-brick university city famous for its food, its porticoes, and its lively, less touristy atmosphere.",
    bestTimeToVisit: "Spring or early autumn, for pleasant walking weather under the arcades.",
    landmarks: [
      { name: "Two Towers", description: "The leaning medieval towers of Asinelli and Garisenda, the city's iconic skyline marker." },
      { name: "Piazza Maggiore", description: "The historic main square, framed by the Basilica of San Petronio." },
      { name: "Portico di San Luca", description: "A nearly 4km covered walkway of arches leading up to a hilltop sanctuary." },
    ],
    localTip: "Bologna is the origin of ragù alla bolognese — look for it served with tagliatelle, not spaghetti, as it is locally.",
  },
  "italy:palermo": {
    intro: "Sicily's capital blends Arab, Norman, and Baroque influences into a chaotic, colourful, deeply atmospheric city.",
    bestTimeToVisit: "April to June or September to October — summer heat can be intense.",
    landmarks: [
      { name: "Palermo Cathedral", description: "A striking mix of architectural styles accumulated over centuries of rebuilding." },
      { name: "Teatro Massimo", description: "One of the largest opera houses in Europe, famed for its acoustics." },
      { name: "Ballarò Market", description: "A centuries-old street market and one of the best places to try Sicilian street food." },
    ],
    localTip: "Try Palermo's street food — arancine and panelle are local staples best eaten straight from a market stall.",
  },
  "italy:venice": {
    intro: "A city built on water, where canals replace streets and every corner opens onto another postcard view.",
    bestTimeToVisit: "April to June or September to October — November through early spring brings a higher risk of acqua alta flooding.",
    landmarks: [
      { name: "St Mark's Square & Basilica", description: "The historic heart of Venice, anchored by its gold-mosaic Byzantine basilica." },
      { name: "Rialto Bridge", description: "The oldest of the four bridges spanning the Grand Canal, lined with shops." },
      { name: "Grand Canal", description: "The city's main waterway, best seen from a vaporetto or a traditional gondola." },
    ],
    localTip: "Check the city's official tide forecast if visiting outside summer — acqua alta can close low-lying squares with little notice.",
  },
  "italy:genoa": {
    intro: "A historic maritime republic turned working port city, with one of Europe's largest old towns and a compact aquarium-front waterfront.",
    bestTimeToVisit: "April to June or September to October for mild coastal weather.",
    landmarks: [
      { name: "Genoa Aquarium", description: "One of the largest aquariums in Europe, on the restored old port." },
      { name: "Porto Antico", description: "The redeveloped historic harbour, now a hub for walking, dining, and museums." },
      { name: "Caruggi", description: "The dense maze of narrow medieval alleys that makes up the historic centre." },
    ],
    localTip: "Genoa is the birthplace of pesto — try it here made the traditional way, with a mortar and pestle.",
  },
  "italy:verona": {
    intro: "A Roman-founded city on the Adige river, best known for its ancient arena and its association with Shakespeare's Romeo and Juliet.",
    bestTimeToVisit: "Spring or early autumn, avoiding the peak heat of July and August.",
    landmarks: [
      { name: "Verona Arena", description: "A 1st-century Roman amphitheatre that still hosts opera performances every summer." },
      { name: "Juliet's House", description: "A medieval courtyard house associated with Shakespeare's fictional heroine." },
      { name: "Piazza delle Erbe", description: "The old Roman forum, now a lively market square ringed by frescoed buildings." },
    ],
    localTip: "If opera is on at the Arena during your visit, it's one of the most memorable ways to spend an evening in the city.",
  },
  "italy:bari": {
    intro: "The main city of Puglia, with a atmospheric old town squeezed onto a small peninsula and a lively seafront promenade.",
    bestTimeToVisit: "May to June or September, avoiding the height of summer heat.",
    landmarks: [
      { name: "Basilica di San Nicola", description: "A Romanesque basilica built to house the relics of Saint Nicholas, a major pilgrimage site." },
      { name: "Bari Vecchia", description: "The tangled old town, where residents still hand-make orecchiette pasta on the street." },
      { name: "Lungomare", description: "One of Italy's longest seafront promenades, popular for an evening stroll." },
    ],
    localTip: "Walk through Bari Vecchia in the late morning to see local women hand-rolling orecchiette pasta outside their doorways.",
  },
  "italy:catania": {
    intro: "A Sicilian city rebuilt in black volcanic stone after Mount Etna's eruptions, with the volcano itself as a constant backdrop.",
    bestTimeToVisit: "April to June or September to October.",
    landmarks: [
      { name: "Piazza Duomo", description: "The Baroque central square, anchored by the black-and-white lava-stone cathedral." },
      { name: "Mount Etna", description: "Europe's most active volcano, reachable on a half-day trip from the city." },
      { name: "La Pescheria", description: "A loud, historic fish market a short walk from the cathedral square." },
    ],
    localTip: "Book an Etna excursion with a licensed guide — conditions and accessible altitude change with the volcano's activity.",
  },
  "germany:berlin": {
    intro: "A city defined by its 20th-century history, now known equally for its museums, nightlife, and green public spaces.",
    bestTimeToVisit: "May to September for warm, long days; the Christmas markets make December worthwhile too.",
    landmarks: [
      { name: "Brandenburg Gate", description: "The 18th-century neoclassical monument that became a symbol of German reunification." },
      { name: "Museum Island", description: "A UNESCO World Heritage cluster of five major museums on the Spree river." },
      { name: "East Side Gallery", description: "The longest surviving stretch of the Berlin Wall, painted with murals since 1990." },
    ],
    localTip: "Many of Berlin's major museums are free or discounted on the first Sunday of the month at participating venues.",
  },
  "germany:munich": {
    intro: "Bavaria's capital pairs grand royal architecture with a relaxed beer-garden culture and easy access to the Alps.",
    bestTimeToVisit: "May to September, or late September for the start of Oktoberfest.",
    landmarks: [
      { name: "Marienplatz", description: "The central square, home to the New Town Hall's famous Glockenspiel clock." },
      { name: "Nymphenburg Palace", description: "The sprawling Baroque summer residence of the former Bavarian royal family." },
      { name: "English Garden", description: "One of the largest urban parks in the world, bigger than New York's Central Park." },
    ],
    localTip: "Oktoberfest actually starts in mid-September — book accommodation many months ahead if visiting during the festival.",
  },
  "germany:hamburg": {
    intro: "A major port city built around water, with a striking modern skyline rising above its historic warehouse district.",
    bestTimeToVisit: "May to September for the mildest, driest weather.",
    landmarks: [
      { name: "Speicherstadt", description: "The world's largest warehouse district, built on oak piles over the harbour water." },
      { name: "Miniatur Wunderland", description: "The world's largest model railway exhibit, a surprisingly compelling city attraction." },
      { name: "Elbphilharmonie", description: "A glass concert hall rising like a wave above the old harbour, with a free public viewing platform." },
    ],
    localTip: "The Elbphilharmonie's Plaza viewing platform is free, but timed tickets are needed and go quickly — reserve online.",
  },
  "germany:frankfurt": {
    intro: "Germany's financial capital, with a skyline of skyscrapers standing beside a carefully rebuilt medieval old town.",
    bestTimeToVisit: "May to September for warm, comfortable sightseeing weather.",
    landmarks: [
      { name: "Römerberg", description: "The historic square at the heart of the old town, framed by reconstructed half-timbered houses." },
      { name: "Frankfurt Cathedral", description: "The Gothic church where Holy Roman Emperors were once elected and crowned." },
      { name: "Museumsufer", description: "A riverside row of museums covering everything from art to architecture and film." },
    ],
    localTip: "Try apfelwein (apple wine) at a traditional Sachsenhausen tavern — it's a Frankfurt specialty rarely found elsewhere.",
  },
  "germany:cologne": {
    intro: "A Rhine-side city whose twin-spired cathedral has watched over it since the Middle Ages, rebuilt almost entirely after WWII.",
    bestTimeToVisit: "April to October for mild weather and long daylight hours.",
    landmarks: [
      { name: "Cologne Cathedral", description: "A UNESCO-listed Gothic cathedral and one of the tallest twin-spired churches in the world." },
      { name: "Altstadt", description: "The reconstructed old town along the Rhine, dense with cafés and traditional Kölsch breweries." },
      { name: "Rhine Promenade", description: "A riverside path popular for walking and cycling with cathedral views." },
    ],
    localTip: "Kölsch beer is traditionally served in small 0.2-litre glasses — expect your waiter to keep bringing fresh ones until you say stop.",
  },
  "france:paris": {
    intro: "France's capital needs little introduction — a dense, walkable city of grand boulevards, world-class museums, and neighbourhood life.",
    bestTimeToVisit: "April to June or September to October, avoiding August when many Parisians (and some businesses) are away.",
    landmarks: [
      { name: "Eiffel Tower", description: "The 1889 iron tower that remains the city's most recognisable landmark." },
      { name: "Louvre Museum", description: "The world's most-visited museum, home to the Mona Lisa and the Venus de Milo." },
      { name: "Notre-Dame / Île de la Cité", description: "The medieval cathedral island at the historic heart of the city, still under restoration." },
    ],
    localTip: "Book Louvre and Eiffel Tower tickets online for a specific time slot — it's the single biggest time-saver in the city.",
  },
  "france:marseille": {
    intro: "France's oldest city and its biggest Mediterranean port, with a gritty, sun-bleached charm distinct from the rest of the country.",
    bestTimeToVisit: "May to June or September for warm weather without the peak summer crowds.",
    landmarks: [
      { name: "Vieux-Port", description: "The historic old harbour, still full of fishing boats and waterfront cafés." },
      { name: "Notre-Dame de la Garde", description: "A hilltop basilica overlooking the city, reachable by a scenic uphill walk or bus." },
      { name: "Calanques National Park", description: "Dramatic limestone cliffs and turquoise coves just outside the city." },
    ],
    localTip: "Try bouillabaisse at a restaurant that follows the Charte de la Bouillabaisse — it guarantees a traditional preparation.",
  },
  "france:lyon": {
    intro: "France's culinary capital, built on a peninsula between two rivers, with a UNESCO-listed old town of hidden passageways.",
    bestTimeToVisit: "April to June or September to October.",
    landmarks: [
      { name: "Basilica of Notre-Dame de Fourvière", description: "A hilltop basilica with sweeping views across Lyon and, on clear days, the Alps." },
      { name: "Vieux Lyon", description: "One of the largest Renaissance districts in Europe, full of narrow cobbled streets." },
      { name: "Traboules", description: "Hidden covered passageways once used by silk workers to move goods between streets." },
    ],
    localTip: "Eat at a traditional bouchon — Lyon's classic small restaurants serving hearty local dishes like quenelles and andouillette.",
  },
  "france:nice": {
    intro: "The heart of the French Riviera, with a long pebble beach, pastel architecture, and an old town of narrow Italian-influenced streets.",
    bestTimeToVisit: "May to June or September, when the Mediterranean coast is warm without peak-season crowds.",
    landmarks: [
      { name: "Promenade des Anglais", description: "The famous seafront promenade stretching along the Baie des Anges." },
      { name: "Vieux Nice", description: "The old town's maze of narrow streets, markets, and pastel-coloured buildings." },
      { name: "Castle Hill", description: "A hilltop park with panoramic views over the city and coastline, on the site of a former fortress." },
    ],
    localTip: "Try socca, a chickpea-flour flatbread sold at market stalls, and salade niçoise, both born in this city.",
  },
  "spain:madrid": {
    intro: "Spain's capital, laid out around grand boulevards and green parks, with one of the world's great art museum districts.",
    bestTimeToVisit: "April to June or September to October — summer here gets very hot.",
    landmarks: [
      { name: "Prado Museum", description: "One of the world's finest collections of European art, from Goya to Velázquez." },
      { name: "Royal Palace of Madrid", description: "The official residence of the Spanish royal family, still used for state ceremonies." },
      { name: "Retiro Park", description: "A large landscaped park in the city centre, popular for walking, rowing, and people-watching." },
    ],
    localTip: "Many Madrid museums, including the Prado, offer free entry during a couple of hours in the early evening — check current hours before visiting.",
  },
  "spain:barcelona": {
    intro: "A Mediterranean city famous for Gaudí's architecture, a historic Gothic Quarter, and beaches within walking distance of the centre.",
    bestTimeToVisit: "May to June or September to October, avoiding the peak summer heat and crowds.",
    landmarks: [
      { name: "Sagrada Família", description: "Gaudí's still-unfinished basilica, one of the most visited monuments in Spain." },
      { name: "Park Güell", description: "A whimsical public park designed by Gaudí, with mosaic-covered terraces and city views." },
      { name: "Gothic Quarter", description: "The medieval heart of the city, with narrow stone streets and Roman-era remains." },
    ],
    localTip: "Book Sagrada Família and Park Güell tickets online in advance — both cap daily visitor numbers and often sell out.",
  },
  "spain:valencia": {
    intro: "Spain's third-largest city, home to the birthplace of paella, a futuristic arts complex, and a former riverbed turned park.",
    bestTimeToVisit: "March to May or September to October for comfortable temperatures.",
    landmarks: [
      { name: "City of Arts and Sciences", description: "A striking futuristic complex of museums, an aquarium, and an opera house." },
      { name: "Central Market", description: "One of the oldest and largest produce markets in Europe, housed in an Art Nouveau building." },
      { name: "Turia Gardens", description: "A 9km park built along the old riverbed, running through much of the city." },
    ],
    localTip: "Paella originated here — for the most traditional version, look for arroz a la valenciana on the menu.",
  },
  "spain:seville": {
    intro: "The heart of Andalusia, known for flamenco, Moorish architecture, and some of the hottest summers in mainland Europe.",
    bestTimeToVisit: "March to May or October to November — July and August bring extreme heat.",
    landmarks: [
      { name: "Seville Cathedral & Giralda", description: "The largest Gothic cathedral in the world, with a bell tower that was once a minaret." },
      { name: "Real Alcázar", description: "A royal palace complex showcasing centuries of Mudéjar architecture." },
      { name: "Plaza de España", description: "A grand semicircular plaza built for the 1929 Ibero-American Exposition." },
    ],
    localTip: "If visiting in summer, plan sightseeing for early morning or evening — afternoon temperatures regularly pass 35°C.",
  },
  "uk:london": {
    intro: "The UK's capital and one of the world's most visited cities, spanning royal history, world-class museums, and a huge range of neighbourhoods.",
    bestTimeToVisit: "May to September for the warmest, driest weather and the longest daylight hours.",
    landmarks: [
      { name: "Tower of London", description: "A historic castle on the Thames that has served as a fortress, palace, and prison." },
      { name: "British Museum", description: "A vast, free museum of world history and culture, including the Rosetta Stone." },
      { name: "Buckingham Palace", description: "The monarch's official London residence, with the Changing of the Guard held several mornings a week." },
    ],
    localTip: "Many of London's biggest museums — including the British Museum — are free to enter, though special exhibitions carry a charge.",
  },
  "uk:manchester": {
    intro: "A former industrial powerhouse turned cultural capital of the north, known for its music scene, football, and regenerated warehouses.",
    bestTimeToVisit: "May to September for the mildest, driest conditions.",
    landmarks: [
      { name: "Manchester Cathedral", description: "A medieval cathedral in the historic heart of the city centre." },
      { name: "Science and Industry Museum", description: "A museum on the site of the world's oldest surviving passenger railway station." },
      { name: "Northern Quarter", description: "A bohemian district of independent shops, street art, and live music venues." },
    ],
    localTip: "Football fans can tour Old Trafford or the Etihad Stadium even outside match days — book stadium tours ahead of time.",
  },
  "uk:edinburgh": {
    intro: "Scotland's capital, built across dramatic hills and extinct volcanoes, with a medieval Old Town beside an elegant Georgian New Town.",
    bestTimeToVisit: "May to September, or August specifically for the Edinburgh Fringe Festival.",
    landmarks: [
      { name: "Edinburgh Castle", description: "A fortress perched on an extinct volcanic crag, dominating the city skyline." },
      { name: "Royal Mile", description: "The historic street linking the Castle to the Palace of Holyroodhouse." },
      { name: "Arthur's Seat", description: "An extinct volcano within the city, with a walkable summit and panoramic views." },
    ],
    localTip: "If visiting in August, book accommodation and Fringe Festival show tickets well ahead — the city's population roughly doubles.",
  },
  "uk:birmingham": {
    intro: "The UK's second-largest city, once the industrial 'workshop of the world', now known for its canals, curry houses, and jewellery trade.",
    bestTimeToVisit: "May to September for the warmest, driest weather.",
    landmarks: [
      { name: "Birmingham Museum & Art Gallery", description: "A major museum with one of the world's best collections of Pre-Raphaelite art." },
      { name: "Library of Birmingham", description: "One of the largest public libraries in Europe, with a striking modern façade." },
      { name: "Jewellery Quarter", description: "A historic district still producing much of the UK's handmade jewellery." },
    ],
    localTip: "Birmingham has more canals than Venice — a canalside walk through the city centre is one of the best free things to do.",
  },
  "usa:new-york": {
    intro:
      "A dense, round-the-clock city of five boroughs, where world-famous skyline views, museums, and neighbourhood food scenes sit a subway ride apart.",
    bestTimeToVisit: "April to June or September to November, avoiding the humid peak of summer and the coldest weeks of winter.",
    landmarks: [
      { name: "Central Park", description: "An 843-acre green space cutting through Manhattan, popular for walking, boating, and people-watching." },
      { name: "Empire State Building", description: "An Art Deco skyscraper with an observation deck offering sweeping views across the city." },
      { name: "Metropolitan Museum of Art", description: "One of the largest and most comprehensive art museums in the world." },
    ],
    localTip: "Get a 7-day unlimited MetroCard (or use contactless tap) if you're staying more than a couple of days — it's far cheaper than single rides.",
  },
  "usa:los-angeles": {
    intro:
      "A sprawling, car-dependent city stitched together from distinct neighbourhoods, known for its entertainment industry, beaches, and near-constant sunshine.",
    bestTimeToVisit: "March to May or September to November, when temperatures are comfortable and coastal fog is less frequent.",
    landmarks: [
      { name: "Griffith Observatory", description: "A hilltop observatory with free telescopes and panoramic views of the Hollywood Sign and city below." },
      { name: "Santa Monica Pier", description: "A classic oceanfront pier with an amusement park and beach access." },
      { name: "The Getty Center", description: "A hilltop art museum and gardens with free admission and tram access." },
    ],
    localTip: "Budget real time for driving between neighbourhoods — LA's distances look short on a map but traffic can make them slow.",
  },
  "usa:chicago": {
    intro:
      "A Great Lakes city famous for its bold modern and early-skyscraper architecture, deep-dish pizza, and a long lakefront path connecting its parks.",
    bestTimeToVisit: "May to June or September to October, avoiding the bitter winter cold and the most humid days of summer.",
    landmarks: [
      { name: "Millennium Park", description: "Home to the reflective 'Cloud Gate' sculpture (locally nicknamed 'The Bean')." },
      { name: "Art Institute of Chicago", description: "One of the oldest and largest art museums in the United States." },
      { name: "Willis Tower Skydeck", description: "A glass-floored observation deck high above the Loop, with views across four states on a clear day." },
    ],
    localTip: "A river or lake architecture boat tour is one of the best ways to see the skyline that made Chicago famous for its buildings.",
  },
  "usa:miami": {
    intro:
      "A subtropical coastal city known for its beaches, Art Deco architecture, and strong Latin American and Caribbean influence.",
    bestTimeToVisit: "November to April, outside the hot, humid, and hurricane-prone summer and early autumn months.",
    landmarks: [
      { name: "South Beach", description: "Miami's best-known beach, backed by pastel Art Deco hotels along Ocean Drive." },
      { name: "Wynwood Walls", description: "An outdoor museum of large-scale murals in a converted warehouse district." },
      { name: "Vizcaya Museum and Gardens", description: "An early 20th-century waterfront estate modeled on Italian Renaissance villas." },
    ],
    localTip: "Check the Atlantic hurricane season (June–November) if booking a summer trip — it can affect flights and outdoor plans with little notice.",
  },
  "usa:san-francisco": {
    intro:
      "A hilly, compact city on the water, known for the Golden Gate Bridge, cable cars, and a famously mild but changeable microclimate.",
    bestTimeToVisit: "September to November, when fog is less frequent and temperatures are at their warmest — summer here can be surprisingly cool and foggy.",
    landmarks: [
      { name: "Golden Gate Bridge", description: "The Art Deco suspension bridge that has defined the city's skyline since 1937." },
      { name: "Alcatraz Island", description: "A former federal prison on an island in the bay, reachable by ferry and best booked ahead." },
      { name: "Fisherman's Wharf", description: "A lively waterfront area with seafood, sea lions, and views across the bay." },
    ],
    localTip: "Bring layers even in summer — Mark Twain's famous (if apocryphal) line about a cold San Francisco summer is closer to true than visitors expect.",
  },
  "japan:tokyo": {
    intro:
      "A vast, layered metropolis where ultramodern districts, quiet shrines, and dense neighbourhood streets sit within the same efficient train network.",
    bestTimeToVisit: "March to May for cherry blossoms, or September to November for mild temperatures and autumn colour.",
    landmarks: [
      { name: "Senso-ji Temple", description: "Tokyo's oldest temple, in the historic Asakusa district, approached through a lively market street." },
      { name: "Shibuya Crossing", description: "One of the world's busiest pedestrian crossings, a symbol of the city's scale and energy." },
      { name: "Meiji Shrine", description: "A forested Shinto shrine near Harajuku, a calm contrast to the surrounding city." },
    ],
    localTip: "Get an IC card (Suica or Pasmo) on arrival — it works across nearly all trains, subways, and buses, and at many convenience stores.",
  },
  "japan:osaka": {
    intro:
      "Japan's food capital, known for its casual, lively street food culture and as an easy base for day trips to Kyoto and Nara.",
    bestTimeToVisit: "March to May or October to November, avoiding the hot, humid summer.",
    landmarks: [
      { name: "Osaka Castle", description: "A reconstructed feudal-era castle set in a large park, with a museum inside." },
      { name: "Dotonbori", description: "A neon-lit canalside district packed with restaurants, famous for its giant illuminated signs." },
      { name: "Shitennoji Temple", description: "One of Japan's oldest officially administered temples, founded in the 6th century." },
    ],
    localTip: "Osaka is widely considered Japan's best city for street food — look for takoyaki and okonomiyaki at casual stalls in Dotonbori.",
  },
  "japan:kyoto": {
    intro:
      "Japan's former imperial capital, with thousands of temples and shrines, preserved geisha districts, and some of the country's most photographed gardens.",
    bestTimeToVisit: "March to April for cherry blossoms or November for autumn foliage — both are peak season, so book well ahead.",
    landmarks: [
      { name: "Fushimi Inari Shrine", description: "Famous for its thousands of vermillion torii gates climbing the hillside behind the shrine." },
      { name: "Kinkaku-ji (Golden Pavilion)", description: "A Zen temple whose top two floors are covered in gold leaf, reflected in its surrounding pond." },
      { name: "Arashiyama Bamboo Grove", description: "A towering bamboo forest path on the city's western edge." },
    ],
    localTip: "Visit the most famous sites (Fushimi Inari, Kinkaku-ji) at opening time — both get extremely crowded by mid-morning.",
  },
  "uae:dubai": {
    intro:
      "A fast-built desert city of record-breaking skyscrapers, large-scale shopping malls, and beaches on the Arabian Gulf.",
    bestTimeToVisit: "November to March, when daytime temperatures are pleasant — summer regularly exceeds 40°C.",
    landmarks: [
      { name: "Burj Khalifa", description: "The world's tallest building, with an observation deck offering views across the city and desert." },
      { name: "Dubai Mall", description: "One of the world's largest shopping malls, with an aquarium and ice rink among its attractions." },
      { name: "Dubai Marina", description: "A dense, walkable waterfront district of high-rises, restaurants, and a promenade." },
    ],
    localTip: "If visiting in summer, plan outdoor sightseeing for early morning or evening — midday heat can be genuinely dangerous to underestimate.",
  },
  "uae:abu-dhabi": {
    intro:
      "The UAE's capital, a more spacious and formal counterpart to Dubai, built around grand mosques, museums, and a long corniche.",
    bestTimeToVisit: "November to March, avoiding the extreme heat of the summer months.",
    landmarks: [
      { name: "Sheikh Zayed Grand Mosque", description: "One of the world's largest mosques, known for its white marble domes and vast prayer hall." },
      { name: "Louvre Abu Dhabi", description: "An art and civilization museum built under a striking perforated dome." },
      { name: "Corniche Beach", description: "A long, family-friendly beach along the city's waterfront promenade." },
    ],
    localTip: "Dress modestly when visiting the Grand Mosque — robes are available to borrow at the entrance if needed.",
  },
  "australia:sydney": {
    intro:
      "Australia's largest city, built around a dramatic natural harbour, with a mild climate that keeps its beaches and outdoor life going most of the year.",
    bestTimeToVisit: "September to November or March to May — Southern Hemisphere spring and autumn, avoiding peak summer crowds and heat.",
    landmarks: [
      { name: "Sydney Opera House", description: "The sail-shaped performing arts venue that has become Australia's most recognisable building." },
      { name: "Sydney Harbour Bridge", description: "A steel arch bridge offering walking access and a climbable summit with harbour views." },
      { name: "Bondi Beach", description: "One of Australia's best-known beaches, with a scenic coastal walk to Coogee." },
    ],
    localTip: "Remember Australia's seasons are reversed from the Northern Hemisphere — 'summer' here runs December to February.",
  },
  "australia:melbourne": {
    intro:
      "Australia's cultural capital, known for its laneway cafés, street art, and a famously changeable climate — locals joke you can get four seasons in one day.",
    bestTimeToVisit: "March to May or September to November, for milder, more predictable weather.",
    landmarks: [
      { name: "Federation Square", description: "The city's central civic square, home to galleries, events, and a striking angular design." },
      { name: "Queen Victoria Market", description: "A historic open-air market selling fresh produce, food, and local goods since the 1870s." },
      { name: "Royal Botanic Gardens", description: "Expansive gardens along the Yarra River, a short walk from the city centre." },
    ],
    localTip: "Pack a layer even in summer — Melbourne's weather can shift quickly, especially with the 'southerly change' that follows hot days.",
  },
  "netherlands:amsterdam": {
    intro:
      "A compact canal city best explored by bike or on foot, with a dense concentration of museums and a UNESCO-listed historic centre.",
    bestTimeToVisit: "April for tulip season, or May to September for the mildest, driest weather.",
    landmarks: [
      { name: "Rijksmuseum", description: "The Netherlands' national museum, home to Rembrandt's The Night Watch." },
      { name: "Anne Frank House", description: "The preserved hiding place documented in Anne Frank's diary, one of the city's most visited sites." },
      { name: "Canal Ring", description: "The UNESCO-listed 17th-century canal belt, best seen on foot, by bike, or from a boat." },
    ],
    localTip: "Book Anne Frank House and Rijksmuseum tickets online well in advance — both regularly sell out, especially in summer.",
  },
  "netherlands:rotterdam": {
    intro:
      "A rebuilt, architecturally bold port city, known for its modern skyline in contrast to Amsterdam's historic one.",
    bestTimeToVisit: "May to September for the warmest, driest weather.",
    landmarks: [
      { name: "Cube Houses", description: "A cluster of tilted cube-shaped houses, one of the city's most photographed modern landmarks." },
      { name: "Markthal", description: "A striking arched market hall combining food stalls with apartments and a huge ceiling mural." },
      { name: "Erasmus Bridge", description: "A cable-stayed bridge nicknamed 'The Swan' that has become a symbol of the rebuilt city." },
    ],
    localTip: "Rotterdam is one of Europe's most bike-friendly cities — renting one is an easy way to cover its spread-out modern landmarks.",
  },
  "portugal:lisbon": {
    intro:
      "A hilly, coastal capital of pastel buildings, historic trams, and viewpoints (miradouros) over the Tagus river.",
    bestTimeToVisit: "March to May or September to October, avoiding the hottest and most crowded summer months.",
    landmarks: [
      { name: "Belém Tower", description: "A 16th-century fortified tower on the riverfront, a symbol of Portugal's Age of Discovery." },
      { name: "Jerónimos Monastery", description: "An elaborate Manueline-style monastery near Belém, a UNESCO World Heritage Site." },
      { name: "Alfama", description: "The oldest district in Lisbon, a maze of narrow streets and the traditional home of fado music." },
    ],
    localTip: "Ride Tram 28 through the old town for classic views — but expect it to be crowded; an early morning ride avoids the worst of it.",
  },
  "portugal:porto": {
    intro:
      "A riverside city of tiled facades and steep streets, famous as the origin of port wine and its dramatic Douro river valley.",
    bestTimeToVisit: "May to June or September, for mild weather without peak summer crowds.",
    landmarks: [
      { name: "Ribeira District", description: "The colourful, UNESCO-listed riverfront old town, lined with cafés and port wine cellars across the water." },
      { name: "Livraria Lello", description: "An ornate early 20th-century bookshop, one of the most visited (and photographed) in the world." },
      { name: "Dom Luís I Bridge", description: "A double-deck iron bridge with walkable upper and lower levels and river views." },
    ],
    localTip: "Cross the river to Vila Nova de Gaia for port wine cellar tours — most of the historic producers are based there, not in Porto itself.",
  },
  "austria:vienna": {
    intro:
      "A former imperial capital of grand palaces, coffee house culture, and a long classical music tradition.",
    bestTimeToVisit: "April to June or September to October, or December for the Christmas markets.",
    landmarks: [
      { name: "Schönbrunn Palace", description: "The former summer residence of the Habsburgs, with extensive formal gardens." },
      { name: "St. Stephen's Cathedral", description: "The Gothic cathedral at the heart of the old town, with a distinctive tiled roof." },
      { name: "Belvedere Palace", description: "A Baroque palace complex housing Gustav Klimt's The Kiss among its art collection." },
    ],
    localTip: "Sit down at a traditional Viennese coffee house (Café Central, Café Sacher) rather than grabbing coffee to go — it's a genuine part of the culture, not just a tourist stop.",
  },
  "austria:salzburg": {
    intro:
      "Mozart's birthplace, a compact Baroque city set against the Alps, also known as the filming location for The Sound of Music.",
    bestTimeToVisit: "May to September for hiking and outdoor sightseeing, or December for its Christmas market.",
    landmarks: [
      { name: "Hohensalzburg Fortress", description: "A hilltop medieval fortress overlooking the old town, reachable by funicular." },
      { name: "Mirabell Palace and Gardens", description: "Baroque gardens featured in The Sound of Music, free to enter." },
      { name: "Mozart's Birthplace", description: "The house where Wolfgang Amadeus Mozart was born in 1756, now a museum." },
    ],
    localTip: "A Sound of Music tour is popular but optional — the old town and fortress are worth the trip on their own merits.",
  },
  "greece:athens": {
    intro:
      "The birthplace of Western philosophy and democracy, where ancient ruins sit directly among the streets of a busy modern capital.",
    bestTimeToVisit: "April to June or September to October, avoiding the intense heat of July and August.",
    landmarks: [
      { name: "Acropolis", description: "The ancient citadel crowned by the Parthenon, visible from much of the city below." },
      { name: "Ancient Agora", description: "The former civic and commercial heart of ancient Athens, at the foot of the Acropolis." },
      { name: "Plaka", description: "The old neighbourhood beneath the Acropolis, with narrow streets and neoclassical buildings." },
    ],
    localTip: "Visit the Acropolis at opening time (8am) — both the crowds and the heat build quickly through the day.",
  },
  "greece:thessaloniki": {
    intro:
      "Greece's second city, a seafront university town with a layered Byzantine, Ottoman, and Jewish history, and a lively food and nightlife scene.",
    bestTimeToVisit: "April to June or September to October for comfortable temperatures.",
    landmarks: [
      { name: "White Tower", description: "A former Ottoman fortress on the waterfront, now the city's best-known landmark and a museum." },
      { name: "Rotunda", description: "A 4th-century Roman monument later used as a church and mosque, now a museum site." },
      { name: "Ano Poli (Upper Town)", description: "The old town above the modern city, with preserved Byzantine walls and narrow streets." },
    ],
    localTip: "Thessaloniki is considered Greece's food capital by many Greeks themselves — its street food and tavernas are worth building time around.",
  },
  "switzerland:zurich": {
    intro:
      "Switzerland's largest city, on a lake framed by mountains, combining a compact old town with a major financial centre.",
    bestTimeToVisit: "May to September for lake swimming and outdoor life, or December for Christmas markets.",
    landmarks: [
      { name: "Lake Zurich", description: "A large lake at the city's edge, popular for swimming, boat trips, and lakeside walks." },
      { name: "Old Town (Altstadt)", description: "The historic centre on both banks of the Limmat river, with narrow lanes and guild houses." },
      { name: "Grossmünster", description: "A twin-towered Romanesque church associated with the Swiss Reformation." },
    ],
    localTip: "Public transport (trains, trams, boats) runs on a single integrated ticket system — a day pass is usually the simplest option for visitors.",
  },
  "switzerland:geneva": {
    intro:
      "A lakeside city hosting numerous international organisations, known for its Old Town, the Jet d'Eau fountain, and nearby Alpine and vineyard scenery.",
    bestTimeToVisit: "May to September, for warm days and long evenings by the lake.",
    landmarks: [
      { name: "Jet d'Eau", description: "A 140-metre fountain on Lake Geneva, one of the world's tallest and a symbol of the city." },
      { name: "Old Town (Vieille Ville)", description: "Geneva's hilltop historic centre, home to St. Pierre Cathedral and cobbled streets." },
      { name: "United Nations Office", description: "The UN's European headquarters, with guided tours available for visitors." },
    ],
    localTip: "A day trip along Lake Geneva to the Lavaux vineyard terraces (a short train ride away) is one of the most rewarding half-days from the city.",
  },
  "ireland:dublin": {
    intro:
      "Ireland's compact, walkable capital, built along the River Liffey, known for its literary history, Georgian architecture, and pub culture.",
    bestTimeToVisit: "May to September for the mildest, driest weather — though Dublin's weather is changeable year-round.",
    landmarks: [
      { name: "Trinity College & Book of Kells", description: "Ireland's oldest university, home to the illuminated medieval manuscript and the Long Room library." },
      { name: "Guinness Storehouse", description: "A multi-floor exhibition on Ireland's best-known beer, topped with a rooftop bar and city views." },
      { name: "Temple Bar", description: "A lively riverside district of pubs, live music, and cobbled streets." },
    ],
    localTip: "Book Book of Kells and Guinness Storehouse tickets online ahead of time — both are popular enough to have queues without a timed slot.",
  },
  "canada:toronto": {
    intro:
      "Canada's largest city, a diverse, lakeside metropolis known for its distinct neighbourhoods and the CN Tower skyline.",
    bestTimeToVisit: "May to September for warm weather, or September to October for autumn colour.",
    landmarks: [
      { name: "CN Tower", description: "A 553-metre communications tower with an observation deck and glass floor above the city." },
      { name: "Distillery District", description: "A pedestrian-only historic district of Victorian industrial buildings turned galleries and restaurants." },
      { name: "Toronto Islands", description: "A car-free chain of islands just offshore, reachable by ferry, with beaches and skyline views." },
    ],
    localTip: "Toronto winters are genuinely cold — if visiting between December and March, plan for well below freezing and use the city's indoor PATH walkway system downtown.",
  },
  "canada:vancouver": {
    intro:
      "A coastal city framed by mountains and ocean, consistently ranked among the most liveable in the world, with a mild but rainy climate.",
    bestTimeToVisit: "June to September, when rainfall is lowest and days are longest.",
    landmarks: [
      { name: "Stanley Park", description: "A large forested park on a peninsula, with a seawall path and coastal views." },
      { name: "Granville Island", description: "A former industrial site turned public market and arts district on False Creek." },
      { name: "Capilano Suspension Bridge", description: "A pedestrian bridge high above a forested canyon, a short trip from downtown." },
    ],
    localTip: "Pack for rain outside summer — Vancouver gets significantly more rainfall than most North American cities from October through April.",
  },
  "brazil:rio-de-janeiro": {
    intro:
      "A dramatic coastal city set between mountains and ocean, known for its beaches, Carnival, and the Christ the Redeemer statue overlooking it all.",
    bestTimeToVisit: "April to June or September to October, avoiding the peak heat and crowds of the December–February summer.",
    landmarks: [
      { name: "Christ the Redeemer", description: "The Art Deco statue atop Corcovado mountain, one of the most recognisable monuments in the world." },
      { name: "Sugarloaf Mountain", description: "A granite peak reachable by cable car, with panoramic views over the bay." },
      { name: "Copacabana Beach", description: "One of Rio's most famous beaches, lined with a long promenade." },
    ],
    localTip: "Stick to well-touristed areas and take standard city precautions with valuables — like any major city, it pays to be aware of your surroundings.",
  },
  "brazil:sao-paulo": {
    intro:
      "Brazil's largest city and its financial and cultural engine, less scenic than Rio but known for its restaurants, museums, and street art.",
    bestTimeToVisit: "April to June or August to September, in the milder, drier shoulder months.",
    landmarks: [
      { name: "Avenida Paulista", description: "The city's main avenue, home to major museums, and closed to cars on Sundays for public use." },
      { name: "São Paulo Museum of Art (MASP)", description: "Known for its distinctive red glass-and-concrete building raised on stilts." },
      { name: "Beco do Batman", description: "A graffiti alley in Vila Madalena showcasing some of the city's best street art." },
    ],
    localTip: "São Paulo's food scene is considered one of the best in South America — it's worth building an itinerary around restaurants, not just sights.",
  },
  "mexico:mexico-city": {
    intro:
      "A vast, high-altitude capital layering Aztec, colonial, and modern history, with one of the world's great museum and food scenes.",
    bestTimeToVisit: "March to May, in the dry season before the June–October rains, with warm days and cool evenings due to the altitude.",
    landmarks: [
      { name: "Zócalo", description: "The city's main square, ringed by the Metropolitan Cathedral and National Palace." },
      { name: "Templo Mayor", description: "The excavated ruins of the main Aztec temple, uncovered beneath the modern city centre." },
      { name: "Frida Kahlo Museum (Casa Azul)", description: "The artist's former home, now a museum of her life and work." },
    ],
    localTip: "The city sits at over 2,200m altitude — take it easy on your first day or two, especially with alcohol or strenuous activity.",
  },
  "mexico:cancun": {
    intro:
      "A purpose-built resort city on the Caribbean coast, known for its beaches, all-inclusive hotels, and easy access to Maya ruins.",
    bestTimeToVisit: "December to April, in the dry season and outside the June–November hurricane season.",
    landmarks: [
      { name: "Hotel Zone Beaches", description: "A long strip of white-sand Caribbean beaches lined with resorts along a narrow peninsula." },
      { name: "El Rey Ruins", description: "A small, quiet Maya archaeological site within the Hotel Zone itself." },
      { name: "Isla Mujeres", description: "A small island a short ferry ride away, known for calm, clear water." },
    ],
    localTip: "Chichén Itzá and Tulum are both feasible day trips from Cancún — book an early departure to avoid the worst of the midday heat and crowds.",
  },
  "thailand:bangkok": {
    intro:
      "A fast-paced capital of ornate temples, riverside markets, and street food, and the usual gateway to the rest of Thailand.",
    bestTimeToVisit: "November to February, the cool, dry season — March to May gets very hot, and June to October is the rainy season.",
    landmarks: [
      { name: "Grand Palace & Wat Phra Kaew", description: "The former royal residence and its temple housing the revered Emerald Buddha." },
      { name: "Wat Arun", description: "The riverside 'Temple of Dawn', known for its ornate porcelain-decorated spires." },
      { name: "Chatuchak Weekend Market", description: "One of the world's largest markets, with thousands of stalls across a huge site." },
    ],
    localTip: "Dress modestly (shoulders and knees covered) to enter the Grand Palace and major temples — sarongs are available to rent at the entrance if needed.",
  },
  "thailand:phuket": {
    intro:
      "Thailand's largest island, known for its beaches, nightlife in Patong, and as a base for boat trips to the surrounding Andaman Sea islands.",
    bestTimeToVisit: "November to April, the dry season — the rainy season from May to October can bring rough seas and reduced boat trips.",
    landmarks: [
      { name: "Big Buddha", description: "A 45-metre marble-clad statue on a hilltop, with panoramic island views." },
      { name: "Old Phuket Town", description: "A district of preserved Sino-Portuguese shophouses, cafés, and street art." },
      { name: "Phi Phi Islands (day trip)", description: "Dramatic limestone islands reachable by boat, popular for snorkelling and beaches." },
    ],
    localTip: "If visiting outside the dry season, check sea conditions before booking island-hopping boat trips — some routes reduce or pause in rough weather.",
  },
  "singapore:singapore": {
    intro:
      "A compact, ultra-modern city-state blending Chinese, Malay, Indian, and colonial influences, known for its cleanliness, food, and green architecture.",
    bestTimeToVisit: "Year-round destination with consistent tropical heat and humidity — February to April is comparatively drier.",
    landmarks: [
      { name: "Gardens by the Bay", description: "A futuristic park with the towering Supertree structures and climate-controlled domes." },
      { name: "Marina Bay Sands", description: "An iconic three-tower hotel with a rooftop infinity pool and observation deck." },
      { name: "Chinatown & Little India", description: "Historic ethnic districts with temples, markets, and hawker food centres." },
    ],
    localTip: "Eat at a hawker centre rather than a restaurant for the best value and some of the most celebrated food in the country, including Michelin-recognised stalls.",
  },
  "india:mumbai": {
    intro:
      "India's financial capital and the heart of its film industry, a dense coastal city of colonial architecture, markets, and street food.",
    bestTimeToVisit: "November to February, the cool, dry season — the June–September monsoon brings heavy rainfall.",
    landmarks: [
      { name: "Gateway of India", description: "A monumental arch overlooking the harbour, built to commemorate a royal visit in 1911." },
      { name: "Chhatrapati Shivaji Maharaj Terminus", description: "A UNESCO-listed Victorian Gothic railway station, still in daily use." },
      { name: "Elephanta Caves", description: "Ancient rock-cut cave temples on an island, a short ferry ride from the Gateway of India." },
    ],
    localTip: "Traffic can make short distances slow — build extra time into any itinerary that crosses the city, especially during rush hour.",
  },
  "india:delhi": {
    intro:
      "India's capital, pairing the planned colonial boulevards of New Delhi with the dense historic lanes of Old Delhi and its Mughal-era monuments.",
    bestTimeToVisit: "October to March, avoiding the extreme heat of summer and the monsoon rains.",
    landmarks: [
      { name: "Red Fort", description: "A massive 17th-century Mughal fortress that was the seat of imperial power for over 200 years." },
      { name: "Humayun's Tomb", description: "A UNESCO-listed Mughal tomb complex that inspired the design of the Taj Mahal." },
      { name: "India Gate", description: "A war memorial arch at the heart of New Delhi's ceremonial boulevard." },
    ],
    localTip: "Winter mornings (December–January) can bring heavy fog affecting flights — build a buffer into travel plans during those months.",
  },
  "south-korea:seoul": {
    intro:
      "A hyper-modern capital built around centuries-old royal palaces, with a huge food, shopping, and nightlife scene across its districts.",
    bestTimeToVisit: "April to June or September to November, avoiding the summer monsoon and winter cold.",
    landmarks: [
      { name: "Gyeongbokgung Palace", description: "The largest of Seoul's Joseon-dynasty royal palaces, with a daily changing-of-the-guard ceremony." },
      { name: "Bukchon Hanok Village", description: "A preserved neighbourhood of traditional hanok houses between two royal palaces." },
      { name: "Myeongdong", description: "A busy shopping and street food district in the city centre." },
    ],
    localTip: "Wear a traditional hanbok (rentable near the palaces) for free entry to Gyeongbokgung — a popular and inexpensive way to visit.",
  },
  "turkey:istanbul": {
    intro:
      "A city spanning two continents across the Bosphorus, layering Byzantine and Ottoman history with a large, modern metropolis.",
    bestTimeToVisit: "April to May or September to November, avoiding the summer heat and crowds.",
    landmarks: [
      { name: "Hagia Sophia", description: "A former Byzantine cathedral and Ottoman mosque, now open to visitors, with a vast domed interior." },
      { name: "Blue Mosque", description: "An early 17th-century mosque known for its six minarets and blue Iznik tile interior." },
      { name: "Grand Bazaar", description: "One of the world's oldest and largest covered markets, with thousands of shops." },
    ],
    localTip: "A short Bosphorus ferry ride is one of the easiest ways to see the city from the water and cross between its European and Asian sides.",
  },
  "morocco:marrakech": {
    intro:
      "A red-walled city at the foot of the Atlas Mountains, known for its maze-like medina, souks, and riad courtyard houses.",
    bestTimeToVisit: "March to May or September to November, avoiding the intense summer heat.",
    landmarks: [
      { name: "Jemaa el-Fnaa", description: "The city's main square and market, especially lively with food stalls and performers after dark." },
      { name: "Bahia Palace", description: "A 19th-century palace known for its intricately decorated courtyards and rooms." },
      { name: "Majorelle Garden", description: "A vivid blue-accented botanical garden restored by designer Yves Saint Laurent." },
    ],
    localTip: "Expect to get lost in the medina at least once — it's part of the experience, and most riads are used to guiding guests in by phone if needed.",
  },
  "south-africa:cape-town": {
    intro:
      "A coastal city beneath Table Mountain, known for its beaches, wine regions nearby, and a striking mix of ocean and mountain scenery.",
    bestTimeToVisit: "November to March, the Southern Hemisphere summer — outside this window, winter (June–August) brings more rain and wind.",
    landmarks: [
      { name: "Table Mountain", description: "A flat-topped mountain overlooking the city, reachable by cableway or hiking trails." },
      { name: "Robben Island", description: "The former prison island where Nelson Mandela was held, now a museum reachable by ferry." },
      { name: "V&A Waterfront", description: "A working harbour turned shopping, dining, and entertainment district." },
    ],
    localTip: "Book the Table Mountain cableway or a hike for early in your trip if possible — it closes in high wind, so a flexible schedule helps.",
  },
  "egypt:cairo": {
    intro:
      "A vast, historic capital on the Nile, the gateway to the Pyramids of Giza and one of the world's great collections of ancient Egyptian artifacts.",
    bestTimeToVisit: "October to April, avoiding the extreme heat of the summer months.",
    landmarks: [
      { name: "Pyramids of Giza", description: "The last surviving wonder of the ancient world, on the edge of the modern city." },
      { name: "Egyptian Museum", description: "A vast collection of pharaonic antiquities, including treasures from Tutankhamun's tomb." },
      { name: "Khan el-Khalili", description: "A historic bazaar dating to the 14th century, still a major shopping and dining destination." },
    ],
    localTip: "Hire a licensed guide for the Pyramids and Egyptian Museum — both are large sites where context adds a lot, and it helps navigate persistent vendors near Giza.",
  },
};

export function getCityGuide(countrySlug: string, citySlug: string): CityGuide | null {
  return cityGuides[`${countrySlug}:${citySlug}`] ?? null;
}
