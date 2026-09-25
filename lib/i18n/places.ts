/**
 * Localized country and city names for the translated site versions.
 * Order in every tuple: [it, de, fr, es, pt, nl, pl]. Cities not listed use
 * the same name in every language (e.g. "Sydney", "Porto").
 * Portuguese uses European-Portuguese spellings (Europe is the main market).
 */
import type { ContentLocale } from "./routing";

type Names = [string, string, string, string, string, string, string];
const ORDER: ContentLocale[] = ["it", "de", "fr", "es", "pt", "nl", "pl"];

const COUNTRIES: Record<string, Names> = {
  italy: ["Italia", "Italien", "Italie", "Italia", "Itália", "Italië", "Włochy"],
  germany: ["Germania", "Deutschland", "Allemagne", "Alemania", "Alemanha", "Duitsland", "Niemcy"],
  france: ["Francia", "Frankreich", "France", "Francia", "França", "Frankrijk", "Francja"],
  spain: ["Spagna", "Spanien", "Espagne", "España", "Espanha", "Spanje", "Hiszpania"],
  uk: ["Regno Unito", "Vereinigtes Königreich", "Royaume-Uni", "Reino Unido", "Reino Unido", "Verenigd Koninkrijk", "Wielka Brytania"],
  usa: ["Stati Uniti", "USA", "États-Unis", "Estados Unidos", "Estados Unidos", "Verenigde Staten", "Stany Zjednoczone"],
  japan: ["Giappone", "Japan", "Japon", "Japón", "Japão", "Japan", "Japonia"],
  uae: ["Emirati Arabi Uniti", "Vereinigte Arabische Emirate", "Émirats arabes unis", "Emiratos Árabes Unidos", "Emirados Árabes Unidos", "Verenigde Arabische Emiraten", "Zjednoczone Emiraty Arabskie"],
  australia: ["Australia", "Australien", "Australie", "Australia", "Austrália", "Australië", "Australia"],
  netherlands: ["Paesi Bassi", "Niederlande", "Pays-Bas", "Países Bajos", "Países Baixos", "Nederland", "Holandia"],
  portugal: ["Portogallo", "Portugal", "Portugal", "Portugal", "Portugal", "Portugal", "Portugalia"],
  austria: ["Austria", "Österreich", "Autriche", "Austria", "Áustria", "Oostenrijk", "Austria"],
  greece: ["Grecia", "Griechenland", "Grèce", "Grecia", "Grécia", "Griekenland", "Grecja"],
  switzerland: ["Svizzera", "Schweiz", "Suisse", "Suiza", "Suíça", "Zwitserland", "Szwajcaria"],
  ireland: ["Irlanda", "Irland", "Irlande", "Irlanda", "Irlanda", "Ierland", "Irlandia"],
  canada: ["Canada", "Kanada", "Canada", "Canadá", "Canadá", "Canada", "Kanada"],
  brazil: ["Brasile", "Brasilien", "Brésil", "Brasil", "Brasil", "Brazilië", "Brazylia"],
  mexico: ["Messico", "Mexiko", "Mexique", "México", "México", "Mexico", "Meksyk"],
  thailand: ["Thailandia", "Thailand", "Thaïlande", "Tailandia", "Tailândia", "Thailand", "Tajlandia"],
  singapore: ["Singapore", "Singapur", "Singapour", "Singapur", "Singapura", "Singapore", "Singapur"],
  india: ["India", "Indien", "Inde", "India", "Índia", "India", "Indie"],
  "south-korea": ["Corea del Sud", "Südkorea", "Corée du Sud", "Corea del Sur", "Coreia do Sul", "Zuid-Korea", "Korea Południowa"],
  turkey: ["Turchia", "Türkei", "Turquie", "Turquía", "Turquia", "Turkije", "Turcja"],
  morocco: ["Marocco", "Marokko", "Maroc", "Marruecos", "Marrocos", "Marokko", "Maroko"],
  "south-africa": ["Sudafrica", "Südafrika", "Afrique du Sud", "Sudáfrica", "África do Sul", "Zuid-Afrika", "RPA"],
  egypt: ["Egitto", "Ägypten", "Égypte", "Egipto", "Egito", "Egypte", "Egipt"],
  poland: ["Polonia", "Polen", "Pologne", "Polonia", "Polónia", "Polen", "Polska"],
  belgium: ["Belgio", "Belgien", "Belgique", "Bélgica", "Bélgica", "België", "Belgia"],
  malta: ["Malta", "Malta", "Malte", "Malta", "Malta", "Malta", "Malta"],
  cyprus: ["Cipro", "Zypern", "Chypre", "Chipre", "Chipre", "Cyprus", "Cypr"],
  tunisia: ["Tunisia", "Tunesien", "Tunisie", "Túnez", "Tunísia", "Tunesië", "Tunezja"],
  "dominican-republic": ["Repubblica Dominicana", "Dominikanische Republik", "République dominicaine", "República Dominicana", "República Dominicana", "Dominicaanse Republiek", "Dominikana"],
  curacao: ["Curaçao", "Curaçao", "Curaçao", "Curazao", "Curaçau", "Curaçao", "Curaçao"],
  pakistan: ["Pakistan", "Pakistan", "Pakistan", "Pakistán", "Paquistão", "Pakistan", "Pakistan"],
};

const CITIES: Record<string, Names> = {
  rome: ["Roma", "Rom", "Rome", "Roma", "Roma", "Rome", "Rzym"],
  milan: ["Milano", "Mailand", "Milan", "Milán", "Milão", "Milaan", "Mediolan"],
  naples: ["Napoli", "Neapel", "Naples", "Nápoles", "Nápoles", "Napels", "Neapol"],
  turin: ["Torino", "Turin", "Turin", "Turín", "Turim", "Turijn", "Turyn"],
  florence: ["Firenze", "Florenz", "Florence", "Florencia", "Florença", "Florence", "Florencja"],
  bologna: ["Bologna", "Bologna", "Bologne", "Bolonia", "Bolonha", "Bologna", "Bolonia"],
  venice: ["Venezia", "Venedig", "Venise", "Venecia", "Veneza", "Venetië", "Wenecja"],
  genoa: ["Genova", "Genua", "Gênes", "Génova", "Génova", "Genua", "Genua"],
  verona: ["Verona", "Verona", "Vérone", "Verona", "Verona", "Verona", "Werona"],
  catania: ["Catania", "Catania", "Catane", "Catania", "Catânia", "Catania", "Katania"],
  berlin: ["Berlino", "Berlin", "Berlin", "Berlín", "Berlim", "Berlijn", "Berlin"],
  munich: ["Monaco di Baviera", "München", "Munich", "Múnich", "Munique", "München", "Monachium"],
  hamburg: ["Amburgo", "Hamburg", "Hambourg", "Hamburgo", "Hamburgo", "Hamburg", "Hamburg"],
  frankfurt: ["Francoforte", "Frankfurt", "Francfort", "Fráncfort", "Frankfurt", "Frankfurt", "Frankfurt"],
  cologne: ["Colonia", "Köln", "Cologne", "Colonia", "Colónia", "Keulen", "Kolonia"],
  paris: ["Parigi", "Paris", "Paris", "París", "Paris", "Parijs", "Paryż"],
  marseille: ["Marsiglia", "Marseille", "Marseille", "Marsella", "Marselha", "Marseille", "Marsylia"],
  lyon: ["Lione", "Lyon", "Lyon", "Lyon", "Lyon", "Lyon", "Lyon"],
  nice: ["Nizza", "Nizza", "Nice", "Niza", "Nice", "Nice", "Nicea"],
  madrid: ["Madrid", "Madrid", "Madrid", "Madrid", "Madrid", "Madrid", "Madryt"],
  barcelona: ["Barcellona", "Barcelona", "Barcelone", "Barcelona", "Barcelona", "Barcelona", "Barcelona"],
  valencia: ["Valencia", "Valencia", "Valence", "Valencia", "Valência", "Valencia", "Walencja"],
  seville: ["Siviglia", "Sevilla", "Séville", "Sevilla", "Sevilha", "Sevilla", "Sewilla"],
  london: ["Londra", "London", "Londres", "Londres", "Londres", "Londen", "Londyn"],
  edinburgh: ["Edimburgo", "Edinburgh", "Édimbourg", "Edimburgo", "Edimburgo", "Edinburgh", "Edynburg"],
  "new-york": ["New York", "New York", "New York", "Nueva York", "Nova Iorque", "New York", "Nowy Jork"],
  tokyo: ["Tokyo", "Tokio", "Tokyo", "Tokio", "Tóquio", "Tokio", "Tokio"],
  kyoto: ["Kyoto", "Kyoto", "Kyoto", "Kioto", "Quioto", "Kyoto", "Kioto"],
  dubai: ["Dubai", "Dubai", "Dubaï", "Dubái", "Dubai", "Dubai", "Dubaj"],
  amsterdam: ["Amsterdam", "Amsterdam", "Amsterdam", "Ámsterdam", "Amesterdão", "Amsterdam", "Amsterdam"],
  lisbon: ["Lisbona", "Lissabon", "Lisbonne", "Lisboa", "Lisboa", "Lissabon", "Lizbona"],
  porto: ["Porto", "Porto", "Porto", "Oporto", "Porto", "Porto", "Porto"],
  vienna: ["Vienna", "Wien", "Vienne", "Viena", "Viena", "Wenen", "Wiedeń"],
  salzburg: ["Salisburgo", "Salzburg", "Salzbourg", "Salzburgo", "Salzburgo", "Salzburg", "Salzburg"],
  athens: ["Atene", "Athen", "Athènes", "Atenas", "Atenas", "Athene", "Ateny"],
  thessaloniki: ["Salonicco", "Thessaloniki", "Thessalonique", "Tesalónica", "Salónica", "Thessaloniki", "Saloniki"],
  zurich: ["Zurigo", "Zürich", "Zurich", "Zúrich", "Zurique", "Zürich", "Zurych"],
  geneva: ["Ginevra", "Genf", "Genève", "Ginebra", "Genebra", "Genève", "Genewa"],
  dublin: ["Dublino", "Dublin", "Dublin", "Dublín", "Dublin", "Dublin", "Dublin"],
  "rio-de-janeiro": ["Rio de Janeiro", "Rio de Janeiro", "Rio de Janeiro", "Río de Janeiro", "Rio de Janeiro", "Rio de Janeiro", "Rio de Janeiro"],
  "sao-paulo": ["San Paolo", "São Paulo", "São Paulo", "São Paulo", "São Paulo", "São Paulo", "São Paulo"],
  "mexico-city": ["Città del Messico", "Mexiko-Stadt", "Mexico", "Ciudad de México", "Cidade do México", "Mexico-Stad", "Meksyk"],
  cairo: ["Il Cairo", "Kairo", "Le Caire", "El Cairo", "Cairo", "Caïro", "Kair"],
  istanbul: ["Istanbul", "Istanbul", "Istanbul", "Estambul", "Istambul", "Istanboel", "Stambuł"],
  seoul: ["Seul", "Seoul", "Séoul", "Seúl", "Seul", "Seoul", "Seul"],
  singapore: ["Singapore", "Singapur", "Singapour", "Singapur", "Singapura", "Singapore", "Singapur"],
  "cape-town": ["Città del Capo", "Kapstadt", "Le Cap", "Ciudad del Cabo", "Cidade do Cabo", "Kaapstad", "Kapsztad"],
  marrakech: ["Marrakech", "Marrakesch", "Marrakech", "Marrakech", "Marraquexe", "Marrakesh", "Marrakesz"],
  mumbai: ["Mumbai", "Mumbai", "Bombay", "Bombay", "Mumbai", "Mumbai", "Mumbaj"],
  delhi: ["Delhi", "Delhi", "Delhi", "Delhi", "Deli", "Delhi", "Delhi"],
  warsaw: ["Varsavia", "Warschau", "Varsovie", "Varsovia", "Varsóvia", "Warschau", "Warszawa"],
  krakow: ["Cracovia", "Krakau", "Cracovie", "Cracovia", "Cracóvia", "Krakau", "Kraków"],
  gdansk: ["Danzica", "Danzig", "Gdańsk", "Gdansk", "Gdańsk", "Gdańsk", "Gdańsk"],
  brussels: ["Bruxelles", "Brüssel", "Bruxelles", "Bruselas", "Bruxelas", "Brussel", "Bruksela"],
  antwerp: ["Anversa", "Antwerpen", "Anvers", "Amberes", "Antuérpia", "Antwerpen", "Antwerpia"],
  tenerife: ["Tenerife", "Teneriffa", "Tenerife", "Tenerife", "Tenerife", "Tenerife", "Teneryfa"],
  "gran-canaria": ["Gran Canaria", "Gran Canaria", "Grande Canarie", "Gran Canaria", "Gran Canária", "Gran Canaria", "Gran Canaria"],
  fuerteventura: ["Fuerteventura", "Fuerteventura", "Fuerteventura", "Fuerteventura", "Fuerteventura", "Fuerteventura", "Fuerteventura"],
  mallorca: ["Maiorca", "Mallorca", "Majorque", "Mallorca", "Maiorca", "Mallorca", "Majorka"],
  malaga: ["Malaga", "Málaga", "Malaga", "Málaga", "Málaga", "Málaga", "Malaga"],
  crete: ["Creta", "Kreta", "Crète", "Creta", "Creta", "Kreta", "Kreta"],
  rhodes: ["Rodi", "Rhodos", "Rhodes", "Rodas", "Rodes", "Rhodos", "Rodos"],
  corfu: ["Corfù", "Korfu", "Corfou", "Corfú", "Corfu", "Corfu", "Korfu"],
  madeira: ["Madeira", "Madeira", "Madère", "Madeira", "Madeira", "Madeira", "Madera"],
  "sharm-el-sheikh": ["Sharm el-Sheikh", "Scharm El-Scheich", "Charm el-Cheikh", "Sharm el-Sheij", "Sharm el-Sheikh", "Sharm-el-Sheikh", "Szarm el-Szejk"],
  valletta: ["La Valletta", "Valletta", "La Valette", "La Valeta", "Valeta", "Valletta", "Valletta"],
  paphos: ["Pafo", "Paphos", "Paphos", "Pafos", "Pafos", "Paphos", "Pafos"],
  larnaca: ["Larnaca", "Larnaka", "Larnaca", "Lárnaca", "Lárnaca", "Larnaca", "Larnaka"],
  djerba: ["Gerba", "Djerba", "Djerba", "Yerba", "Djerba", "Djerba", "Dżerba"],
  karachi: ["Karachi", "Karatschi", "Karachi", "Karachi", "Carachi", "Karachi", "Karaczi"],
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
const EN_ALIAS: Record<string, string> = { mallorca: "Majorca" };

export function localCityName(countrySlug: string, citySlug: string, english: string): string | null {
  if (EN_ALIAS[citySlug]) return EN_ALIAS[citySlug]!;
  const l = LOCAL_LANG[countrySlug];
  if (!l) return null;
  const n = cityName(citySlug, english, l);
  return n !== english ? n : null;
}
