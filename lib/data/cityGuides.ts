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
};

export function getCityGuide(countrySlug: string, citySlug: string): CityGuide | null {
  return cityGuides[`${countrySlug}:${citySlug}`] ?? null;
}
