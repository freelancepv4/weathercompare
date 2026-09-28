/**
 * Localized country and city names for the translated site versions.
 * Order in every tuple: [it, de, fr, es, pt, nl, pl, tr]. Turkish (last) is
 * prepared for the upcoming /tr version and is not used until "tr" joins CONTENT_LOCALES. Cities not listed use
 * the same name in every language (e.g. "Sydney", "Porto").
 * Portuguese uses European-Portuguese spellings (Europe is the main market).
 */
import type { ContentLocale } from "./routing";

type Names = [string, string, string, string, string, string, string, string];
const ORDER: ContentLocale[] = ["it", "de", "fr", "es", "pt", "nl", "pl"];

const COUNTRIES: Record<string, Names> = {
  italy: ["Italia", "Italien", "Italie", "Italia", "Itália", "Italië", "Włochy", "İtalya"],
  germany: ["Germania", "Deutschland", "Allemagne", "Alemania", "Alemanha", "Duitsland", "Niemcy", "Almanya"],
  france: ["Francia", "Frankreich", "France", "Francia", "França", "Frankrijk", "Francja", "Fransa"],
  spain: ["Spagna", "Spanien", "Espagne", "España", "Espanha", "Spanje", "Hiszpania", "İspanya"],
  uk: ["Regno Unito", "Vereinigtes Königreich", "Royaume-Uni", "Reino Unido", "Reino Unido", "Verenigd Koninkrijk", "Wielka Brytania", "Birleşik Krallık"],
  usa: ["Stati Uniti", "USA", "États-Unis", "Estados Unidos", "Estados Unidos", "Verenigde Staten", "Stany Zjednoczone", "ABD"],
  japan: ["Giappone", "Japan", "Japon", "Japón", "Japão", "Japan", "Japonia", "Japonya"],
  "cape-verde": ["Capo Verde", "Kap Verde", "Cap-Vert", "Cabo Verde", "Cabo Verde", "Kaapverdië", "Republika Zielonego Przylądka", "Yeşil Burun Adaları"],
  uae: ["Emirati Arabi Uniti", "Vereinigte Arabische Emirate", "Émirats arabes unis", "Emiratos Árabes Unidos", "Emirados Árabes Unidos", "Verenigde Arabische Emiraten", "Zjednoczone Emiraty Arabskie", "Birleşik Arap Emirlikleri"],
  australia: ["Australia", "Australien", "Australie", "Australia", "Austrália", "Australië", "Australia", "Avustralya"],
  netherlands: ["Paesi Bassi", "Niederlande", "Pays-Bas", "Países Bajos", "Países Baixos", "Nederland", "Holandia", "Hollanda"],
  portugal: ["Portogallo", "Portugal", "Portugal", "Portugal", "Portugal", "Portugal", "Portugalia", "Portekiz"],
  austria: ["Austria", "Österreich", "Autriche", "Austria", "Áustria", "Oostenrijk", "Austria", "Avusturya"],
  greece: ["Grecia", "Griechenland", "Grèce", "Grecia", "Grécia", "Griekenland", "Grecja", "Yunanistan"],
  switzerland: ["Svizzera", "Schweiz", "Suisse", "Suiza", "Suíça", "Zwitserland", "Szwajcaria", "İsviçre"],
  ireland: ["Irlanda", "Irland", "Irlande", "Irlanda", "Irlanda", "Ierland", "Irlandia", "İrlanda"],
  canada: ["Canada", "Kanada", "Canada", "Canadá", "Canadá", "Canada", "Kanada", "Kanada"],
  brazil: ["Brasile", "Brasilien", "Brésil", "Brasil", "Brasil", "Brazilië", "Brazylia", "Brezilya"],
  mexico: ["Messico", "Mexiko", "Mexique", "México", "México", "Mexico", "Meksyk", "Meksika"],
  thailand: ["Thailandia", "Thailand", "Thaïlande", "Tailandia", "Tailândia", "Thailand", "Tajlandia", "Tayland"],
  singapore: ["Singapore", "Singapur", "Singapour", "Singapur", "Singapura", "Singapore", "Singapur", "Singapur"],
  india: ["India", "Indien", "Inde", "India", "Índia", "India", "Indie", "Hindistan"],
  "south-korea": ["Corea del Sud", "Südkorea", "Corée du Sud", "Corea del Sur", "Coreia do Sul", "Zuid-Korea", "Korea Południowa", "Güney Kore"],
  turkey: ["Turchia", "Türkei", "Turquie", "Turquía", "Turquia", "Turkije", "Turcja", "Türkiye"],
  morocco: ["Marocco", "Marokko", "Maroc", "Marruecos", "Marrocos", "Marokko", "Maroko", "Fas"],
  "south-africa": ["Sudafrica", "Südafrika", "Afrique du Sud", "Sudáfrica", "África do Sul", "Zuid-Afrika", "RPA", "Güney Afrika"],
  egypt: ["Egitto", "Ägypten", "Égypte", "Egipto", "Egito", "Egypte", "Egipt", "Mısır"],
  poland: ["Polonia", "Polen", "Pologne", "Polonia", "Polónia", "Polen", "Polska", "Polonya"],
  belgium: ["Belgio", "Belgien", "Belgique", "Bélgica", "Bélgica", "België", "Belgia", "Belçika"],
  malta: ["Malta", "Malta", "Malte", "Malta", "Malta", "Malta", "Malta", "Malta"],
  cyprus: ["Cipro", "Zypern", "Chypre", "Chipre", "Chipre", "Cyprus", "Cypr", "Kıbrıs"],
  tunisia: ["Tunisia", "Tunesien", "Tunisie", "Túnez", "Tunísia", "Tunesië", "Tunezja", "Tunus"],
  "dominican-republic": ["Repubblica Dominicana", "Dominikanische Republik", "République dominicaine", "República Dominicana", "República Dominicana", "Dominicaanse Republiek", "Dominikana", "Dominik Cumhuriyeti"],
  curacao: ["Curaçao", "Curaçao", "Curaçao", "Curazao", "Curaçau", "Curaçao", "Curaçao", "Curaçao"],
  indonesia: ["Indonesia", "Indonesien", "Indonésie", "Indonesia", "Indonésia", "Indonesië", "Indonezja", "Endonezya"],
  maldives: ["Maldive", "Malediven", "Maldives", "Maldivas", "Maldivas", "Malediven", "Malediwy", "Maldivler"],
  "sri-lanka": ["Sri Lanka", "Sri Lanka", "Sri Lanka", "Sri Lanka", "Sri Lanka", "Sri Lanka", "Sri Lanka", "Sri Lanka"],
  mauritius: ["Mauritius", "Mauritius", "Maurice", "Mauricio", "Maurícia", "Mauritius", "Mauritius", "Mauritius"],
  tanzania: ["Tanzania", "Tansania", "Tanzanie", "Tanzania", "Tanzânia", "Tanzania", "Tanzania", "Tanzanya"],
  vietnam: ["Vietnam", "Vietnam", "Vietnam", "Vietnam", "Vietname", "Vietnam", "Wietnam", "Vietnam"],
  "hong-kong": ["Hong Kong", "Hongkong", "Hong Kong", "Hong Kong", "Hong Kong", "Hongkong", "Hongkong", "Hong Kong"],
  seychelles: ["Seychelles", "Seychellen", "Seychelles", "Seychelles", "Seicheles", "Seychellen", "Seszele", "Seyşeller"],
  "costa-rica": ["Costa Rica", "Costa Rica", "Costa Rica", "Costa Rica", "Costa Rica", "Costa Rica", "Kostaryka", "Kosta Rika"],
  iceland: ["Islanda", "Island", "Islande", "Islandia", "Islândia", "IJsland", "Islandia", "İzlanda"],
  pakistan: ["Pakistan", "Pakistan", "Pakistan", "Pakistán", "Paquistão", "Pakistan", "Pakistan", "Pakistan"],
};

const CITIES: Record<string, Names> = {
  rome: ["Roma", "Rom", "Rome", "Roma", "Roma", "Rome", "Rzym", "Roma"],
  milan: ["Milano", "Mailand", "Milan", "Milán", "Milão", "Milaan", "Mediolan", "Milano"],
  naples: ["Napoli", "Neapel", "Naples", "Nápoles", "Nápoles", "Napels", "Neapol", "Napoli"],
  turin: ["Torino", "Turin", "Turin", "Turín", "Turim", "Turijn", "Turyn", "Torino"],
  florence: ["Firenze", "Florenz", "Florence", "Florencia", "Florença", "Florence", "Florencja", "Floransa"],
  bologna: ["Bologna", "Bologna", "Bologne", "Bolonia", "Bolonha", "Bologna", "Bolonia", "Bologna"],
  venice: ["Venezia", "Venedig", "Venise", "Venecia", "Veneza", "Venetië", "Wenecja", "Venedik"],
  genoa: ["Genova", "Genua", "Gênes", "Génova", "Génova", "Genua", "Genua", "Cenova"],
  verona: ["Verona", "Verona", "Vérone", "Verona", "Verona", "Verona", "Werona", "Verona"],
  catania: ["Catania", "Catania", "Catane", "Catania", "Catânia", "Catania", "Katania", "Catania"],
  berlin: ["Berlino", "Berlin", "Berlin", "Berlín", "Berlim", "Berlijn", "Berlin", "Berlin"],
  munich: ["Monaco di Baviera", "München", "Munich", "Múnich", "Munique", "München", "Monachium", "Münih"],
  hamburg: ["Amburgo", "Hamburg", "Hambourg", "Hamburgo", "Hamburgo", "Hamburg", "Hamburg", "Hamburg"],
  frankfurt: ["Francoforte", "Frankfurt", "Francfort", "Fráncfort", "Frankfurt", "Frankfurt", "Frankfurt", "Frankfurt"],
  cologne: ["Colonia", "Köln", "Cologne", "Colonia", "Colónia", "Keulen", "Kolonia", "Köln"],
  paris: ["Parigi", "Paris", "Paris", "París", "Paris", "Parijs", "Paryż", "Paris"],
  marseille: ["Marsiglia", "Marseille", "Marseille", "Marsella", "Marselha", "Marseille", "Marsylia", "Marsilya"],
  lyon: ["Lione", "Lyon", "Lyon", "Lyon", "Lyon", "Lyon", "Lyon", "Lyon"],
  nice: ["Nizza", "Nizza", "Nice", "Niza", "Nice", "Nice", "Nicea", "Nice"],
  madrid: ["Madrid", "Madrid", "Madrid", "Madrid", "Madrid", "Madrid", "Madryt", "Madrid"],
  barcelona: ["Barcellona", "Barcelona", "Barcelone", "Barcelona", "Barcelona", "Barcelona", "Barcelona", "Barselona"],
  valencia: ["Valencia", "Valencia", "Valence", "Valencia", "Valência", "Valencia", "Walencja", "Valensiya"],
  seville: ["Siviglia", "Sevilla", "Séville", "Sevilla", "Sevilha", "Sevilla", "Sewilla", "Sevilla"],
  london: ["Londra", "London", "Londres", "Londres", "Londres", "Londen", "Londyn", "Londra"],
  edinburgh: ["Edimburgo", "Edinburgh", "Édimbourg", "Edimburgo", "Edimburgo", "Edinburgh", "Edynburg", "Edinburgh"],
  "new-york": ["New York", "New York", "New York", "Nueva York", "Nova Iorque", "New York", "Nowy Jork", "New York"],
  tokyo: ["Tokyo", "Tokio", "Tokyo", "Tokio", "Tóquio", "Tokio", "Tokio", "Tokyo"],
  kyoto: ["Kyoto", "Kyoto", "Kyoto", "Kioto", "Quioto", "Kyoto", "Kioto", "Kyoto"],
  dubai: ["Dubai", "Dubai", "Dubaï", "Dubái", "Dubai", "Dubai", "Dubaj", "Dubai"],
  amsterdam: ["Amsterdam", "Amsterdam", "Amsterdam", "Ámsterdam", "Amesterdão", "Amsterdam", "Amsterdam", "Amsterdam"],
  lisbon: ["Lisbona", "Lissabon", "Lisbonne", "Lisboa", "Lisboa", "Lissabon", "Lizbona", "Lizbon"],
  porto: ["Porto", "Porto", "Porto", "Oporto", "Porto", "Porto", "Porto", "Porto"],
  vienna: ["Vienna", "Wien", "Vienne", "Viena", "Viena", "Wenen", "Wiedeń", "Viyana"],
  salzburg: ["Salisburgo", "Salzburg", "Salzbourg", "Salzburgo", "Salzburgo", "Salzburg", "Salzburg", "Salzburg"],
  athens: ["Atene", "Athen", "Athènes", "Atenas", "Atenas", "Athene", "Ateny", "Atina"],
  thessaloniki: ["Salonicco", "Thessaloniki", "Thessalonique", "Tesalónica", "Salónica", "Thessaloniki", "Saloniki", "Selanik"],
  zurich: ["Zurigo", "Zürich", "Zurich", "Zúrich", "Zurique", "Zürich", "Zurych", "Zürih"],
  geneva: ["Ginevra", "Genf", "Genève", "Ginebra", "Genebra", "Genève", "Genewa", "Cenevre"],
  dublin: ["Dublino", "Dublin", "Dublin", "Dublín", "Dublin", "Dublin", "Dublin", "Dublin"],
  "rio-de-janeiro": ["Rio de Janeiro", "Rio de Janeiro", "Rio de Janeiro", "Río de Janeiro", "Rio de Janeiro", "Rio de Janeiro", "Rio de Janeiro", "Rio de Janeiro"],
  "sao-paulo": ["San Paolo", "São Paulo", "São Paulo", "São Paulo", "São Paulo", "São Paulo", "São Paulo", "São Paulo"],
  "mexico-city": ["Città del Messico", "Mexiko-Stadt", "Mexico", "Ciudad de México", "Cidade do México", "Mexico-Stad", "Meksyk", "Meksiko"],
  cairo: ["Il Cairo", "Kairo", "Le Caire", "El Cairo", "Cairo", "Caïro", "Kair", "Kahire"],
  istanbul: ["Istanbul", "Istanbul", "Istanbul", "Estambul", "Istambul", "Istanboel", "Stambuł", "İstanbul"],
  seoul: ["Seul", "Seoul", "Séoul", "Seúl", "Seul", "Seoul", "Seul", "Seul"],
  singapore: ["Singapore", "Singapur", "Singapour", "Singapur", "Singapura", "Singapore", "Singapur", "Singapur"],
  "cape-town": ["Città del Capo", "Kapstadt", "Le Cap", "Ciudad del Cabo", "Cidade do Cabo", "Kaapstad", "Kapsztad", "Cape Town"],
  marrakech: ["Marrakech", "Marrakesch", "Marrakech", "Marrakech", "Marraquexe", "Marrakesh", "Marrakesz", "Marakeş"],
  mumbai: ["Mumbai", "Mumbai", "Bombay", "Bombay", "Mumbai", "Mumbai", "Mumbaj", "Mumbai"],
  delhi: ["Delhi", "Delhi", "Delhi", "Delhi", "Deli", "Delhi", "Delhi", "Delhi"],
  warsaw: ["Varsavia", "Warschau", "Varsovie", "Varsovia", "Varsóvia", "Warschau", "Warszawa", "Varşova"],
  krakow: ["Cracovia", "Krakau", "Cracovie", "Cracovia", "Cracóvia", "Krakau", "Kraków", "Krakov"],
  gdansk: ["Danzica", "Danzig", "Gdańsk", "Gdansk", "Gdańsk", "Gdańsk", "Gdańsk", "Gdańsk"],
  brussels: ["Bruxelles", "Brüssel", "Bruxelles", "Bruselas", "Bruxelas", "Brussel", "Bruksela", "Brüksel"],
  antwerp: ["Anversa", "Antwerpen", "Anvers", "Amberes", "Antuérpia", "Antwerpen", "Antwerpia", "Anvers"],
  tenerife: ["Tenerife", "Teneriffa", "Tenerife", "Tenerife", "Tenerife", "Tenerife", "Teneryfa", "Tenerife"],
  "gran-canaria": ["Gran Canaria", "Gran Canaria", "Grande Canarie", "Gran Canaria", "Gran Canária", "Gran Canaria", "Gran Canaria", "Gran Canaria"],
  fuerteventura: ["Fuerteventura", "Fuerteventura", "Fuerteventura", "Fuerteventura", "Fuerteventura", "Fuerteventura", "Fuerteventura", "Fuerteventura"],
  mallorca: ["Maiorca", "Mallorca", "Majorque", "Mallorca", "Maiorca", "Mallorca", "Majorka", "Mallorca"],
  malaga: ["Malaga", "Málaga", "Malaga", "Málaga", "Málaga", "Málaga", "Malaga", "Malaga"],
  crete: ["Creta", "Kreta", "Crète", "Creta", "Creta", "Kreta", "Kreta", "Girit"],
  rhodes: ["Rodi", "Rhodos", "Rhodes", "Rodas", "Rodes", "Rhodos", "Rodos", "Rodos"],
  corfu: ["Corfù", "Korfu", "Corfou", "Corfú", "Corfu", "Corfu", "Korfu", "Korfu"],
  madeira: ["Madeira", "Madeira", "Madère", "Madeira", "Madeira", "Madeira", "Madera", "Madeira"],
  "sharm-el-sheikh": ["Sharm el-Sheikh", "Scharm El-Scheich", "Charm el-Cheikh", "Sharm el-Sheij", "Sharm el-Sheikh", "Sharm-el-Sheikh", "Szarm el-Szejk", "Şarm El-Şeyh"],
  valletta: ["La Valletta", "Valletta", "La Valette", "La Valeta", "Valeta", "Valletta", "Valletta", "Valletta"],
  paphos: ["Pafo", "Paphos", "Paphos", "Pafos", "Pafos", "Paphos", "Pafos", "Baf"],
  larnaca: ["Larnaca", "Larnaka", "Larnaca", "Lárnaca", "Lárnaca", "Larnaca", "Larnaka", "Larnaka"],
  djerba: ["Gerba", "Djerba", "Djerba", "Yerba", "Djerba", "Djerba", "Dżerba", "Djerba"],
  menorca: ["Minorca", "Menorca", "Minorque", "Menorca", "Menorca", "Menorca", "Minorka", "Menorca"],
  alicante: ["Alicante", "Alicante", "Alicante", "Alicante", "Alicante", "Alicante", "Alicante", "Alicante"],
  kos: ["Kos", "Kos", "Kos", "Cos", "Cós", "Kos", "Kos", "Kos"],
  zakynthos: ["Zante", "Zakynthos", "Zante", "Zante", "Zante", "Zakynthos", "Zakintos", "Zakintos"],
  kefalonia: ["Cefalonia", "Kefalonia", "Céphalonie", "Cefalonia", "Cefalónia", "Kefalonia", "Kefalonia", "Kefalonya"],
  halkidiki: ["Calcidica", "Chalkidiki", "Chalcidique", "Calcídica", "Calcídica", "Chalkidiki", "Chalkidiki", "Halkidiki"],
  "boa-vista": ["Boa Vista", "Boa Vista", "Boa Vista", "Boa Vista", "Boa Vista", "Boa Vista", "Boa Vista", "Boa Vista"],
  bali: ["Bali", "Bali", "Bali", "Bali", "Bali", "Bali", "Bali", "Bali"],
  maldives: ["Maldive", "Malediven", "Maldives", "Maldivas", "Maldivas", "Malediven", "Malediwy", "Maldivler"],
  colombo: ["Colombo", "Colombo", "Colombo", "Colombo", "Colombo", "Colombo", "Kolombo", "Kolombo"],
  mauritius: ["Mauritius", "Mauritius", "Maurice", "Mauricio", "Maurícia", "Mauritius", "Mauritius", "Mauritius"],
  zanzibar: ["Zanzibar", "Sansibar", "Zanzibar", "Zanzíbar", "Zanzibar", "Zanzibar", "Zanzibar", "Zanzibar"],
  hanoi: ["Hanoi", "Hanoi", "Hanoï", "Hanói", "Hanói", "Hanoi", "Hanoi", "Hanoi"],
  "ho-chi-minh-city": ["Ho Chi Minh", "Ho-Chi-Minh-Stadt", "Hô Chi Minh-Ville", "Ciudad Ho Chi Minh", "Cidade de Ho Chi Minh", "Ho Chi Minhstad", "Ho Chi Minh", "Ho Chi Minh Kenti"],
  "hong-kong": ["Hong Kong", "Hongkong", "Hong Kong", "Hong Kong", "Hong Kong", "Hongkong", "Hongkong", "Hong Kong"],
  seychelles: ["Seychelles", "Seychellen", "Seychelles", "Seychelles", "Seicheles", "Seychellen", "Seszele", "Seyşeller"],
  azores: ["Azzorre", "Azoren", "Açores", "Azores", "Açores", "Azoren", "Azory", "Azorlar"],
  reykjavik: ["Reykjavík", "Reykjavík", "Reykjavik", "Reikiavik", "Reiquiavique", "Reykjavik", "Reykjavík", "Reykjavík"],
  karachi: ["Karachi", "Karatschi", "Karachi", "Karachi", "Carachi", "Karachi", "Karaczi", "Karaçi"],
};

export function countryName(slug: string, english: string, locale: ContentLocale | "en"): string {
  if (locale === "en") return english;
  return COUNTRIES[slug]?.[ORDER.indexOf(locale)] ?? english;
}

export function cityName(slug: string, english: string, locale: ContentLocale | "en"): string {
  if (locale === "en") return english;
  return CITIES[slug]?.[ORDER.indexOf(locale)] ?? english;
}

/** Language spoken locally, for countries whose city names differ from English. */
const LOCAL_LANG: Record<string, ContentLocale> = {
  italy: "it", germany: "de", austria: "de", france: "fr", spain: "es", mexico: "es",
  portugal: "pt", brazil: "pt", netherlands: "nl", poland: "pl",
};

/**
 * The city's name in its own country's language when it differs from the
 * English one (Florence → "Firenze", Munich → "München", Warsaw → "Warszawa"),
 * otherwise null. Used so English pages also match searches like "firenze weather".
 */
/** Other English spellings people search for (UK: "Majorca weather"). */
const EN_ALIAS: Record<string, string> = { mallorca: "Majorca", zakynthos: "Zante" };

export function localCityName(countrySlug: string, citySlug: string, english: string): string | null {
  if (EN_ALIAS[citySlug]) return EN_ALIAS[citySlug]!;
  const l = LOCAL_LANG[countrySlug];
  if (!l) return null;
  const n = cityName(citySlug, english, l);
  return n !== english ? n : null;
}
