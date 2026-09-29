/**
 * The site-wide weather FAQ (/faq, /es/preguntas-frecuentes, /de/haeufige-fragen …).
 *
 * Three groups of general questions (how the site works, what forecast terms
 * mean, when things happen) written per language, plus a Spain & Europe group
 * whose answers are calculated from the same 2011–2020 climate averages as
 * the month pages, so the figures always match what those pages show.
 */
import { getCityClimate } from "@/lib/data/climate";
import { findCity } from "@/config/world";
import { cityName } from "@/lib/i18n/places";
import { paths, monthInfo, type AnyLocale } from "@/lib/i18n/routing";

export interface FaqLink {
  href: string;
  label: string;
}
export interface FaqItem {
  q: string;
  a: string;
  links?: FaqLink[];
}
export interface FaqSection {
  id: "how" | "what" | "when" | "spain";
  heading: string;
  items: FaqItem[];
}

type QA = [q: string, a: string];

interface Copy {
  title: string;
  desc: string;
  h1: string;
  intro: string;
  home: string;
  crumb: string;
  heads: Record<FaqSection["id"], string>;
  how: QA[];
  what: QA[];
  when: QA[];
  and: string;
  /** Link labels */
  l: { countries: string; tripFinder: string; today: string; sources: string; bestTime: (c: string) => string; weather: (c: string) => string };
  spain: {
    bestQ: string;
    bestA: (madMay: number, madHot: number, sevHot: number, canJan: number) => string;
    warmQ: string;
    warmA: (list: string, mad: number, mal: number) => string;
    hotQ: string;
    hotA: (city: string, month: string, t: number, north: string, n: number) => string;
    euQ: string;
    euA: (list: string) => string;
    bcnQ: string;
    bcnA: (wet: string, wetMm: number, dry: string, dryMm: number) => string;
    madQ: string;
    madA: (hot: string, t: number, julMm: number, wet: string, wetMm: number) => string;
  };
}

const C: Record<AnyLocale, Copy> = {
  en: {
    title: "Weather FAQ: How, When and What to Expect",
    desc: "Answers to common weather questions: how accurate a 14-day forecast is, what chance of rain means, the best time to visit Spain and where it's warm in winter.",
    h1: "Weather questions, answered",
    intro: "Straight answers to the questions people ask most about forecasts, rain, heat and travel weather. The Spain and Europe answers are worked out from 10 years of daily climate data.",
    home: "Home",
    crumb: "FAQ",
    heads: { how: "How WeatherCompare works", what: "Understanding the forecast", when: "Timing and seasons", spain: "Spain and Europe: when and where" },
    how: [
      ["How does WeatherCompare work?", "We don't run our own weather model. Each city page puts forecasts from up to three independent services (Open-Meteo, WeatherAPI.com and OpenWeatherMap) side by side, so you can see at a glance where they agree and where they don't."],
      ["How do I get the forecast for a town that isn't listed?", "Type its name in the search box: the site covers every city, town and village in the world, not only the ones with their own page. On a phone, the location button next to the search box finds the forecast for where you are right now."],
      ["How accurate is a 14-day forecast?", "The first three days are usually very reliable and days 4 to 7 are good for planning. Beyond about 7 to 10 days a forecast shows the likely trend (warmer, cooler, unsettled) rather than exact numbers, so check again as the date gets closer."],
      ["How often are the forecasts updated?", "The weather services behind the site rerun their models several times a day, and our city pages pick up the new data at least twice a day."],
      ["How are the \"best time to visit\" months worked out?", "From daily climate data for 2011–2020 (NASA POWER, and ERA5 for coasts and islands), averaged month by month. Months score highest when daytime temperatures are comfortable and rain is low. The trip finder lets you choose your own ideal weather instead."],
    ],
    what: [
      ["What does a \"40% chance of rain\" mean?", "It means that on 4 out of 10 days with a forecast like this, measurable rain falls at that place. It says nothing about how long or how hard it rains, so look at the expected millimetres as well."],
      ["What is the \"feels like\" temperature?", "It is how the air feels on your skin once wind and humidity are taken into account. Wind makes cold days feel colder (wind chill), and humid air makes hot days feel hotter because sweat evaporates more slowly."],
      ["What UV index is dangerous?", "On the World Health Organization scale, 3–5 is moderate, 6–7 high, 8–10 very high and 11 or more extreme. From 3 upwards, use sunscreen, a hat and sunglasses, and seek shade around midday."],
      ["What is the difference between weather and climate?", "Weather is what happens on a given day; climate is the average over many years. Our forecasts cover the next two weeks, while the month pages and best-time guides show what a place is usually like, which is what you need for planning further ahead."],
      ["What should I do when the forecasts disagree?", "Take it as a sign that the weather is hard to predict for those days. Plan for the wider range, keep a backup for outdoor plans and check again a day or two later: the services usually converge as the date approaches."],
      ["Is WeatherCompare free?", "Yes. Every forecast, climate page and tool is free, with no account needed. You can also save your favourite cities in your browser."],
    ],
    when: [
      ["When should I check the forecast before a trip?", "About a week before, to see the general trend; two or three days before, for temperatures and rain you can pack for; and on the morning itself, for the hour-by-hour details."],
      ["When is hurricane season?", "In the Atlantic, the Caribbean and the Gulf of Mexico it officially runs from 1 June to 30 November, peaking from mid-August to mid-October. In the eastern Pacific it starts on 15 May."],
      ["When is the rainy season in Southeast Asia?", "For most of Thailand, Cambodia, Laos and Myanmar, the southwest monsoon brings the wettest weather from about May to October. Vietnam's central coast is wettest later, roughly September to December, so check the month pages for the exact place you are going."],
    ],
    and: "and",
    l: { countries: "All countries", tripFinder: "Trip finder", today: "Weather today", sources: "Data sources", bestTime: (c) => `Best time to visit ${c}`, weather: (c) => `${c} weather` },
    spain: {
      bestQ: "When is the best time to visit Spain?",
      bestA: (m, mh, s, c) => `For most of mainland Spain, spring (April to June) and autumn (September and October) are the sweet spot: Madrid averages about ${m}°C in May, against ${mh}°C at the height of summer and ${s}°C in Seville. The Canary Islands are the exception: with highs around ${c}°C even in January, they are good all year round.`,
      warmQ: "Where is the warmest place in Spain in winter?",
      warmA: (l, m, ma) => `The Canary Islands, by a clear margin. Average daytime highs from December to February: ${l}, compared with ${m}°C in Madrid and ${ma}°C in Málaga.`,
      hotQ: "What is the hottest city in Spain in summer?",
      hotA: (c, mo, t, n, nt) => `Among the main destinations, ${c} is the hottest: ${mo} the average high is about ${t}°C, and the Guadalquivir valley around it (Córdoba, Écija) is just as hot. For a cooler summer, head to the north coast: ${n} averages about ${nt}°C.`,
      euQ: "Where is it warm in Europe in winter, apart from Spain?",
      euA: (l) => `Outside Spain, the mildest winters among the main destinations are in ${l}, going by average highs from December to February. Not beach-hot, but a comfortable escape from the cold.`,
      bcnQ: "When does it rain most in Barcelona?",
      bcnA: (w, wm, d, dm) => `${w} is usually the wettest month in Barcelona (about ${wm} mm), often in short, heavy storms, while ${d} is the driest (about ${dm} mm).`,
      madQ: "What is the hottest month in Madrid, and when does it rain?",
      madA: (h, t, j, w, wm) => `${h} is the hottest month in Madrid, with average highs around ${t}°C. Rain is scarce in summer (about ${j} mm in July) and most frequent in ${w} (about ${wm} mm).`,
    },
  },
  es: {
    title: "Preguntas frecuentes sobre el tiempo: cómo, cuándo y qué",
    desc: "Dudas frecuentes sobre el tiempo: fiabilidad de la previsión a 14 días, probabilidad de lluvia, cuándo viajar a España y dónde hace calor en invierno.",
    h1: "Preguntas frecuentes sobre el tiempo",
    intro: "Respuestas claras a lo que más se pregunta sobre previsiones, lluvia, calor y el tiempo para viajar. Las respuestas sobre España y Europa salen de 10 años de datos climáticos diarios.",
    home: "Inicio",
    crumb: "Preguntas frecuentes",
    heads: { how: "Cómo funciona WeatherCompare", what: "Entender la previsión", when: "Cuándo: épocas y estaciones", spain: "España y Europa: cuándo y dónde" },
    how: [
      ["¿Cómo funciona WeatherCompare?", "No tenemos un modelo meteorológico propio. Cada página de ciudad muestra juntas las previsiones de hasta tres servicios independientes (Open-Meteo, WeatherAPI.com y OpenWeatherMap), para que veas de un vistazo en qué coinciden y en qué no."],
      ["¿Cómo veo el tiempo de un pueblo que no aparece en la lista?", "Escribe su nombre en el buscador: la web cubre cualquier ciudad, pueblo o aldea del mundo, no solo los que tienen página propia. En el móvil, el botón de ubicación junto al buscador te muestra el tiempo del lugar donde estás."],
      ["¿Qué fiabilidad tiene la previsión a 14 días?", "Los tres primeros días suelen ser muy fiables y del cuarto al séptimo sirven bien para planificar. Más allá de 7 a 10 días, la previsión indica la tendencia (más calor, más frío, tiempo inestable) más que cifras exactas, así que vuelve a mirarla a medida que se acerque la fecha."],
      ["¿Cada cuánto se actualizan las previsiones?", "Los servicios meteorológicos que usamos recalculan sus modelos varias veces al día, y nuestras páginas de ciudad recogen los datos nuevos al menos dos veces al día."],
      ["¿Cómo se calcula la mejor época para viajar?", "Con datos climáticos diarios de 2011 a 2020 (NASA POWER, y ERA5 para costas e islas), promediados mes a mes. Los meses mejor valorados son los de temperaturas agradables y poca lluvia. Con el buscador de destinos puedes elegir tú el tiempo ideal."],
    ],
    what: [
      ["¿Qué significa un 40 % de probabilidad de lluvia?", "Que de cada 10 días con una previsión así, en 4 llueve de forma apreciable en ese lugar. No dice cuánto dura ni con qué intensidad llueve, así que fíjate también en los milímetros previstos."],
      ["¿Qué es la sensación térmica?", "Es cómo notamos la temperatura en la piel teniendo en cuenta el viento y la humedad. El viento hace que un día frío parezca más frío, y la humedad hace que el calor se note más porque el sudor se evapora peor."],
      ["¿A partir de qué índice UV hay peligro?", "En la escala de la Organización Mundial de la Salud, de 3 a 5 es moderado, 6–7 alto, de 8 a 10 muy alto y 11 o más extremo. A partir de 3 conviene usar protector solar, gorra y gafas de sol, y buscar la sombra en las horas centrales."],
      ["¿Qué diferencia hay entre tiempo y clima?", "El tiempo es lo que ocurre un día concreto; el clima es la media de muchos años. Nuestras previsiones cubren las próximas dos semanas, y las páginas mensuales y las guías de mejor época muestran cómo suele ser un lugar, que es lo que necesitas para planificar con más antelación."],
      ["¿Qué hago si las previsiones no coinciden?", "Tómalo como señal de que esos días son difíciles de prever. Prepárate para el rango más amplio, ten un plan B para las actividades al aire libre y vuelve a consultar en uno o dos días: las fuentes suelen coincidir más a medida que se acerca la fecha."],
      ["¿WeatherCompare es gratis?", "Sí. Todas las previsiones, páginas de clima y herramientas son gratuitas y no hace falta registrarse. También puedes guardar tus ciudades favoritas en el navegador."],
    ],
    when: [
      ["¿Cuándo conviene mirar el tiempo antes de un viaje?", "Una semana antes, para ver la tendencia general; dos o tres días antes, para saber qué temperaturas y lluvia esperar al hacer la maleta; y la misma mañana, para el detalle hora a hora."],
      ["¿Cuándo es la temporada de huracanes?", "En el Atlántico, el Caribe y el golfo de México va oficialmente del 1 de junio al 30 de noviembre, con el pico entre mediados de agosto y mediados de octubre. En el Pacífico oriental empieza el 15 de mayo."],
      ["¿Cuándo es la temporada de lluvias en el sudeste asiático?", "En casi toda Tailandia, Camboya, Laos y Birmania, el monzón del suroeste trae las lluvias más fuertes de mayo a octubre, aproximadamente. En la costa central de Vietnam llueve más tarde, más o menos de septiembre a diciembre, así que consulta las páginas mensuales del lugar exacto al que vas."],
    ],
    and: "y",
    l: { countries: "Todos los países", tripFinder: "Buscador de destinos", today: "El tiempo hoy", sources: "Fuentes de datos", bestTime: (c) => `Mejor época para ir a ${c}`, weather: (c) => `El tiempo en ${c}` },
    spain: {
      bestQ: "¿Cuál es la mejor época para viajar a España?",
      bestA: (m, mh, s, c) => `En casi toda la península, la primavera (de abril a junio) y el otoño (septiembre y octubre) son el momento ideal: Madrid ronda los ${m}°C de máxima en mayo, frente a ${mh}°C en pleno verano y ${s}°C en Sevilla. Canarias es la excepción: con máximas de unos ${c}°C incluso en enero, es buena todo el año.`,
      warmQ: "¿Dónde hace más calor en España en invierno?",
      warmA: (l, m, ma) => `En Canarias, con diferencia. Máximas medias de diciembre a febrero: ${l}, frente a ${m}°C en Madrid y ${ma}°C en Málaga.`,
      hotQ: "¿Cuál es la ciudad más calurosa de España en verano?",
      hotA: (c, mo, t, n, nt) => `Entre los destinos principales, ${c}: ${mo} la máxima media ronda los ${t}°C, y el valle del Guadalquivir a su alrededor (Córdoba, Écija) no se queda atrás. Si buscas un verano más fresco, ve a la costa norte: ${n} ronda los ${nt}°C.`,
      euQ: "¿Dónde hace buen tiempo en Europa en invierno, además de España?",
      euA: (l) => `Fuera de España, los inviernos más suaves entre los destinos principales están en ${l}, según las máximas medias de diciembre a febrero. No es tiempo de playa, pero sí una buena escapada del frío.`,
      bcnQ: "¿Cuándo llueve más en Barcelona?",
      bcnA: (w, wm, d, dm) => `${w} suele ser el mes más lluvioso en Barcelona (unos ${wm} mm), a menudo con tormentas cortas e intensas, y ${d} el más seco (unos ${dm} mm).`,
      madQ: "¿Cuál es el mes más caluroso en Madrid y cuándo llueve?",
      madA: (h, t, j, w, wm) => `${h} es el mes más caluroso en Madrid, con máximas medias de unos ${t}°C. En verano apenas llueve (unos ${j} mm en julio); el mes más lluvioso es ${w} (unos ${wm} mm).`,
    },
  },
  it: {
    title: "Domande frequenti sul meteo: come, quando e cosa",
    desc: "Domande comuni sul meteo: affidabilità della previsione a 14 giorni, probabilità di pioggia, quando andare in Spagna e dove fa caldo in inverno.",
    h1: "Domande frequenti sul meteo",
    intro: "Risposte chiare alle domande più comuni su previsioni, pioggia, caldo e meteo di viaggio. Le risposte su Spagna ed Europa si basano su 10 anni di dati climatici giornalieri.",
    home: "Home",
    crumb: "Domande frequenti",
    heads: { how: "Come funziona WeatherCompare", what: "Capire le previsioni", when: "Quando: periodi e stagioni", spain: "Spagna ed Europa: quando e dove" },
    how: [
      ["Come funziona WeatherCompare?", "Non abbiamo un modello meteorologico nostro. Ogni pagina città mette a confronto le previsioni di fino a tre servizi indipendenti (Open-Meteo, WeatherAPI.com e OpenWeatherMap), così vedi subito dove concordano e dove no."],
      ["Come trovo il meteo di un paese che non è in elenco?", "Scrivi il nome nella casella di ricerca: il sito copre ogni città, paese e villaggio del mondo, non solo quelli con una pagina propria. Da smartphone, il pulsante di posizione accanto alla ricerca mostra il meteo del luogo in cui ti trovi."],
      ["Quanto è affidabile la previsione a 14 giorni?", "I primi tre giorni sono di solito molto affidabili e dal quarto al settimo vanno bene per organizzarsi. Oltre i 7–10 giorni la previsione indica la tendenza (più caldo, più fresco, instabile) più che valori esatti: ricontrolla man mano che la data si avvicina."],
      ["Ogni quanto vengono aggiornate le previsioni?", "I servizi meteo che usiamo ricalcolano i loro modelli più volte al giorno e le nostre pagine città ricevono i dati nuovi almeno due volte al giorno."],
      ["Come si calcola il periodo migliore per andare?", "Con dati climatici giornalieri dal 2011 al 2020 (NASA POWER, ed ERA5 per coste e isole), mediati mese per mese. I mesi migliori sono quelli con temperature piacevoli e poca pioggia. Con il cerca-mete puoi scegliere tu il meteo ideale."],
    ],
    what: [
      ["Cosa significa il 40% di probabilità di pioggia?", "Che su 10 giorni con una previsione del genere, in 4 cade pioggia misurabile in quel luogo. Non dice quanto dura né quanto è intensa, quindi guarda anche i millimetri previsti."],
      ["Cos'è la temperatura percepita?", "È come avvertiamo l'aria sulla pelle tenendo conto di vento e umidità. Il vento fa sembrare più freddi i giorni freddi, mentre l'umidità fa sentire di più il caldo perché il sudore evapora a fatica."],
      ["Quale indice UV è pericoloso?", "Sulla scala dell'Organizzazione Mondiale della Sanità, 3–5 è moderato, 6–7 alto, 8–10 molto alto e da 11 in su estremo. Da 3 in su usa crema solare, cappello e occhiali da sole e cerca l'ombra nelle ore centrali."],
      ["Che differenza c'è tra tempo e clima?", "Il tempo è ciò che succede in un certo giorno; il clima è la media di molti anni. Le nostre previsioni coprono le prossime due settimane, mentre le pagine mensili e le guide sul periodo migliore mostrano com'è di solito un luogo, utile per organizzarsi con anticipo."],
      ["Cosa faccio se le previsioni non coincidono?", "È il segnale che quei giorni sono difficili da prevedere. Preparati all'intervallo più ampio, tieni un piano B per le attività all'aperto e ricontrolla dopo un giorno o due: le fonti di solito convergono man mano che la data si avvicina."],
      ["WeatherCompare è gratuito?", "Sì. Tutte le previsioni, le pagine sul clima e gli strumenti sono gratuiti e non serve registrarsi. Puoi anche salvare le città preferite nel browser."],
    ],
    when: [
      ["Quando conviene controllare il meteo prima di un viaggio?", "Una settimana prima, per la tendenza generale; due o tre giorni prima, per sapere quali temperature e quanta pioggia aspettarti quando fai la valigia; e la mattina stessa, per il dettaglio ora per ora."],
      ["Quando è la stagione degli uragani?", "Nell'Atlantico, nei Caraibi e nel Golfo del Messico va ufficialmente dal 1° giugno al 30 novembre, con il picco da metà agosto a metà ottobre. Nel Pacifico orientale inizia il 15 maggio."],
      ["Quando è la stagione delle piogge nel Sud-est asiatico?", "In gran parte di Thailandia, Cambogia, Laos e Myanmar il monsone di sud-ovest porta le piogge più forti all'incirca da maggio a ottobre. Sulla costa centrale del Vietnam piove di più più tardi, grosso modo da settembre a dicembre: controlla le pagine mensili della località esatta."],
    ],
    and: "e",
    l: { countries: "Tutti i paesi", tripFinder: "Cerca-mete", today: "Meteo oggi", sources: "Fonti dei dati", bestTime: (c) => `Quando andare a ${c}`, weather: (c) => `Meteo ${c}` },
    spain: {
      bestQ: "Qual è il periodo migliore per andare in Spagna?",
      bestA: (m, mh, s, c) => `Per quasi tutta la Spagna continentale, primavera (da aprile a giugno) e autunno (settembre e ottobre) sono il momento ideale: a maggio Madrid ha massime di circa ${m}°C, contro ${mh}°C in piena estate e ${s}°C a Siviglia. Le Canarie fanno eccezione: con massime intorno ai ${c}°C anche a gennaio, vanno bene tutto l'anno.`,
      warmQ: "Dove fa più caldo in Spagna in inverno?",
      warmA: (l, m, ma) => `Alle Canarie, con largo margine. Massime medie da dicembre a febbraio: ${l}, contro ${m}°C a Madrid e ${ma}°C a Malaga.`,
      hotQ: "Qual è la città più calda della Spagna d'estate?",
      hotA: (c, mo, t, n, nt) => `Tra le mete principali, ${c}: ${mo} la massima media è di circa ${t}°C, e la valle del Guadalquivir intorno (Cordova, Écija) è altrettanto calda. Per un'estate più fresca, vai sulla costa nord: ${n} ha massime di circa ${nt}°C.`,
      euQ: "Dove fa caldo in Europa in inverno, oltre alla Spagna?",
      euA: (l) => `Fuori dalla Spagna, gli inverni più miti tra le mete principali sono a ${l}, in base alle massime medie da dicembre a febbraio. Non è clima da spiaggia, ma è una piacevole fuga dal freddo.`,
      bcnQ: "Quando piove di più a Barcellona?",
      bcnA: (w, wm, d, dm) => `Di solito il mese più piovoso a Barcellona è ${w} (circa ${wm} mm), spesso con temporali brevi e intensi, mentre il più secco è ${d} (circa ${dm} mm).`,
      madQ: "Qual è il mese più caldo a Madrid e quando piove?",
      madA: (h, t, j, w, wm) => `Il mese più caldo a Madrid è ${h}, con massime medie di circa ${t}°C. D'estate piove pochissimo (circa ${j} mm a luglio); il mese più piovoso è ${w} (circa ${wm} mm).`,
    },
  },
  de: {
    title: "Wetter-FAQ: Wie, wann und was Sie erwartet",
    desc: "Häufige Wetterfragen: wie genau die 14-Tage-Vorhersage ist, was Regenwahrscheinlichkeit heißt, beste Reisezeit für Spanien und wo es im Winter warm ist.",
    h1: "Häufige Fragen zum Wetter",
    intro: "Klare Antworten auf die häufigsten Fragen zu Vorhersage, Regen, Hitze und Reisewetter. Die Antworten zu Spanien und Europa beruhen auf 10 Jahren täglicher Klimadaten.",
    home: "Start",
    crumb: "Häufige Fragen",
    heads: { how: "So funktioniert WeatherCompare", what: "Die Vorhersage verstehen", when: "Wann: Zeiten und Jahreszeiten", spain: "Spanien und Europa: wann und wo" },
    how: [
      ["Wie funktioniert WeatherCompare?", "Wir betreiben kein eigenes Wettermodell. Jede Stadtseite zeigt die Vorhersagen von bis zu drei unabhängigen Diensten (Open-Meteo, WeatherAPI.com und OpenWeatherMap) nebeneinander, sodass Sie sofort sehen, wo sie übereinstimmen und wo nicht."],
      ["Wie finde ich das Wetter für einen Ort, der nicht aufgelistet ist?", "Geben Sie den Namen ins Suchfeld ein: Die Seite deckt jede Stadt, jeden Ort und jedes Dorf der Welt ab, nicht nur die mit eigener Seite. Auf dem Handy zeigt der Standort-Knopf neben der Suche das Wetter dort, wo Sie gerade sind."],
      ["Wie genau ist eine 14-Tage-Vorhersage?", "Die ersten drei Tage sind meist sehr zuverlässig, Tag 4 bis 7 eignen sich gut zum Planen. Ab etwa 7 bis 10 Tagen zeigt eine Vorhersage eher den Trend (wärmer, kühler, wechselhaft) als genaue Werte – schauen Sie also näher am Termin noch einmal nach."],
      ["Wie oft werden die Vorhersagen aktualisiert?", "Die Wetterdienste hinter der Seite rechnen ihre Modelle mehrmals täglich neu, und unsere Stadtseiten übernehmen die neuen Daten mindestens zweimal am Tag."],
      ["Wie wird die beste Reisezeit berechnet?", "Aus täglichen Klimadaten von 2011 bis 2020 (NASA POWER, für Küsten und Inseln ERA5), gemittelt nach Monaten. Am besten schneiden Monate mit angenehmen Tagestemperaturen und wenig Regen ab. Im Reiseziel-Finder können Sie Ihr Wunschwetter selbst wählen."],
    ],
    what: [
      ["Was bedeutet „40 % Regenwahrscheinlichkeit“?", "An 4 von 10 Tagen mit einer solchen Vorhersage fällt an diesem Ort messbarer Regen. Wie lange und wie stark es regnet, sagt die Zahl nicht – achten Sie deshalb auch auf die erwarteten Millimeter."],
      ["Was ist die gefühlte Temperatur?", "So fühlt sich die Luft auf der Haut an, wenn Wind und Luftfeuchtigkeit berücksichtigt werden. Wind lässt kalte Tage kälter wirken (Windchill), feuchte Luft lässt heiße Tage heißer wirken, weil Schweiß schlechter verdunstet."],
      ["Ab welchem UV-Index wird es gefährlich?", "Auf der Skala der Weltgesundheitsorganisation gilt 3–5 als mäßig, 6–7 als hoch, 8–10 als sehr hoch und ab 11 als extrem. Ab 3 sollten Sie Sonnencreme, Hut und Sonnenbrille nutzen und mittags den Schatten suchen."],
      ["Was ist der Unterschied zwischen Wetter und Klima?", "Wetter ist das, was an einem bestimmten Tag passiert; Klima ist der Durchschnitt vieler Jahre. Unsere Vorhersagen reichen zwei Wochen weit, die Monatsseiten und Reisezeit-Ratgeber zeigen, wie es an einem Ort normalerweise ist – ideal für die langfristige Planung."],
      ["Was tun, wenn sich die Vorhersagen widersprechen?", "Das zeigt, dass das Wetter an diesen Tagen schwer vorherzusagen ist. Planen Sie mit der größeren Spanne, halten Sie für Aktivitäten im Freien einen Plan B bereit und schauen Sie ein, zwei Tage später wieder nach: Je näher der Termin, desto mehr gleichen sich die Dienste an."],
      ["Ist WeatherCompare kostenlos?", "Ja. Alle Vorhersagen, Klimaseiten und Werkzeuge sind kostenlos, ohne Anmeldung. Ihre Lieblingsorte können Sie im Browser speichern."],
    ],
    when: [
      ["Wann sollte ich vor einer Reise das Wetter prüfen?", "Etwa eine Woche vorher für den groben Trend, zwei bis drei Tage vorher für Temperaturen und Regen, nach denen Sie packen können, und am Morgen selbst für die stündlichen Details."],
      ["Wann ist Hurrikansaison?", "Im Atlantik, in der Karibik und im Golf von Mexiko offiziell vom 1. Juni bis 30. November, mit dem Höhepunkt von Mitte August bis Mitte Oktober. Im östlichen Pazifik beginnt sie am 15. Mai."],
      ["Wann ist Regenzeit in Südostasien?", "In den meisten Teilen Thailands, Kambodschas, Laos' und Myanmars bringt der Südwestmonsun etwa von Mai bis Oktober den meisten Regen. An der zentralen Küste Vietnams regnet es später am meisten, etwa von September bis Dezember – prüfen Sie daher die Monatsseiten Ihres genauen Reiseziels."],
    ],
    and: "und",
    l: { countries: "Alle Länder", tripFinder: "Reiseziel-Finder", today: "Wetter heute", sources: "Datenquellen", bestTime: (c) => `Beste Reisezeit ${c}`, weather: (c) => `Wetter ${c}` },
    spain: {
      bestQ: "Wann ist die beste Reisezeit für Spanien?",
      bestA: (m, mh, s, c) => `Für den größten Teil des Festlands sind Frühling (April bis Juni) und Herbst (September und Oktober) ideal: Madrid kommt im Mai auf etwa ${m}°C, im Hochsommer auf ${mh}°C, Sevilla sogar auf ${s}°C. Die Kanaren sind die Ausnahme: Mit rund ${c}°C selbst im Januar lohnen sie sich das ganze Jahr.`,
      warmQ: "Wo ist es in Spanien im Winter am wärmsten?",
      warmA: (l, m, ma) => `Auf den Kanaren, mit großem Abstand. Mittlere Höchstwerte von Dezember bis Februar: ${l} – gegenüber ${m}°C in Madrid und ${ma}°C in Málaga.`,
      hotQ: "Welche Stadt in Spanien ist im Sommer am heißesten?",
      hotA: (c, mo, t, n, nt) => `Unter den wichtigsten Reisezielen ${c}: ${mo} liegt das mittlere Maximum bei etwa ${t}°C, und das Guadalquivir-Tal ringsum (Córdoba, Écija) ist ebenso heiß. Wer es kühler mag, fährt an die Nordküste: ${n} kommt auf etwa ${nt}°C.`,
      euQ: "Wo ist es in Europa im Winter warm, außer in Spanien?",
      euA: (l) => `Außerhalb Spaniens sind die Winter unter den wichtigsten Reisezielen in ${l} am mildesten, gemessen an den mittleren Höchstwerten von Dezember bis Februar. Kein Badewetter, aber eine angenehme Flucht vor der Kälte.`,
      bcnQ: "Wann regnet es in Barcelona am meisten?",
      bcnA: (w, wm, d, dm) => `Der regenreichste Monat in Barcelona ist meist der ${w} (etwa ${wm} mm), oft mit kurzen, heftigen Gewittern; der trockenste ist der ${d} (etwa ${dm} mm).`,
      madQ: "Welcher Monat ist in Madrid am heißesten, und wann regnet es?",
      madA: (h, t, j, w, wm) => `Der heißeste Monat in Madrid ist der ${h} mit mittleren Höchstwerten um ${t}°C. Im Sommer regnet es kaum (etwa ${j} mm im Juli), am meisten im ${w} (etwa ${wm} mm).`,
    },
  },
  fr: {
    title: "FAQ météo : comment, quand et à quoi s'attendre",
    desc: "Questions météo courantes : fiabilité de la prévision à 14 jours, probabilité de pluie, quand partir en Espagne et où il fait doux en hiver.",
    h1: "Vos questions sur la météo",
    intro: "Des réponses claires aux questions les plus posées sur les prévisions, la pluie, la chaleur et la météo en voyage. Les réponses sur l'Espagne et l'Europe s'appuient sur 10 ans de données climatiques quotidiennes.",
    home: "Accueil",
    crumb: "Questions fréquentes",
    heads: { how: "Comment fonctionne WeatherCompare", what: "Comprendre la prévision", when: "Quand : périodes et saisons", spain: "Espagne et Europe : quand et où" },
    how: [
      ["Comment fonctionne WeatherCompare ?", "Nous n'avons pas de modèle météo à nous. Chaque page de ville affiche côte à côte les prévisions de jusqu'à trois services indépendants (Open-Meteo, WeatherAPI.com et OpenWeatherMap) : vous voyez tout de suite où elles concordent et où elles divergent."],
      ["Comment trouver la météo d'une commune qui n'est pas dans la liste ?", "Tapez son nom dans la barre de recherche : le site couvre toutes les villes, communes et villages du monde, pas seulement ceux qui ont leur page. Sur mobile, le bouton de localisation à côté de la recherche affiche la météo de l'endroit où vous êtes."],
      ["Quelle est la fiabilité d'une prévision à 14 jours ?", "Les trois premiers jours sont en général très fiables, et les jours 4 à 7 suffisent pour s'organiser. Au-delà de 7 à 10 jours, la prévision indique surtout une tendance (plus chaud, plus frais, instable) plutôt que des valeurs précises : revenez vérifier à l'approche de la date."],
      ["À quelle fréquence les prévisions sont-elles mises à jour ?", "Les services météo que nous utilisons recalculent leurs modèles plusieurs fois par jour, et nos pages de ville récupèrent les nouvelles données au moins deux fois par jour."],
      ["Comment est calculée la meilleure période pour partir ?", "À partir de données climatiques quotidiennes de 2011 à 2020 (NASA POWER, et ERA5 pour les côtes et les îles), moyennées mois par mois. Les mois les mieux notés combinent températures agréables et peu de pluie. Avec l'outil « Trouver une destination », vous choisissez vous-même votre météo idéale."],
    ],
    what: [
      ["Que signifie « 40 % de risque de pluie » ?", "Que sur 10 jours avec une telle prévision, il tombe une pluie mesurable à cet endroit 4 fois. Cela ne dit rien de la durée ni de l'intensité : regardez aussi les millimètres attendus."],
      ["Qu'est-ce que la température ressentie ?", "C'est la sensation de l'air sur la peau en tenant compte du vent et de l'humidité. Le vent rend les jours froids plus froids (refroidissement éolien) et l'humidité rend la chaleur plus pénible, car la transpiration s'évapore moins bien."],
      ["À partir de quel indice UV y a-t-il danger ?", "Sur l'échelle de l'Organisation mondiale de la santé, 3 à 5 est modéré, 6–7 élevé, 8 à 10 très élevé et 11 ou plus extrême. Dès 3, mettez de la crème solaire, un chapeau et des lunettes de soleil, et restez à l'ombre en milieu de journée."],
      ["Quelle différence entre météo et climat ?", "La météo, c'est le temps qu'il fait un jour donné ; le climat, c'est la moyenne sur de nombreuses années. Nos prévisions couvrent les deux prochaines semaines, tandis que les pages mensuelles et les guides « quand partir » montrent le temps habituel d'un lieu, utile pour préparer un voyage longtemps à l'avance."],
      ["Que faire quand les prévisions ne concordent pas ?", "C'est le signe que ces jours-là sont difficiles à prévoir. Prévoyez la fourchette la plus large, gardez une solution de repli pour les activités en plein air et revenez voir un ou deux jours plus tard : les services convergent généralement à l'approche de la date."],
      ["WeatherCompare est-il gratuit ?", "Oui. Toutes les prévisions, pages climat et outils sont gratuits, sans inscription. Vous pouvez aussi enregistrer vos villes favorites dans votre navigateur."],
    ],
    when: [
      ["Quand consulter la météo avant un voyage ?", "Environ une semaine avant pour la tendance générale, deux ou trois jours avant pour les températures et la pluie qui guideront votre valise, et le matin même pour le détail heure par heure."],
      ["Quand a lieu la saison des ouragans ?", "Dans l'Atlantique, les Caraïbes et le golfe du Mexique, elle va officiellement du 1er juin au 30 novembre, avec un pic de la mi-août à la mi-octobre. Dans le Pacifique oriental, elle commence le 15 mai."],
      ["Quand est la saison des pluies en Asie du Sud-Est ?", "Dans la majeure partie de la Thaïlande, du Cambodge, du Laos et de la Birmanie, la mousson du sud-ouest apporte le plus de pluie de mai à octobre environ. Sur la côte centre du Vietnam, c'est plus tard, à peu près de septembre à décembre : consultez les pages mensuelles de votre destination exacte."],
    ],
    and: "et",
    l: { countries: "Tous les pays", tripFinder: "Trouver une destination", today: "Météo du jour", sources: "Sources des données", bestTime: (c) => `Quand partir à ${c}`, weather: (c) => `Météo ${c}` },
    spain: {
      bestQ: "Quelle est la meilleure période pour partir en Espagne ?",
      bestA: (m, mh, s, c) => `Pour l'essentiel de l'Espagne continentale, le printemps (d'avril à juin) et l'automne (septembre et octobre) sont idéaux : Madrid affiche environ ${m} °C en mai, contre ${mh} °C au cœur de l'été et ${s} °C à Séville. Les Canaries font exception : avec environ ${c} °C même en janvier, elles se visitent toute l'année.`,
      warmQ: "Où fait-il le plus chaud en Espagne en hiver ?",
      warmA: (l, m, ma) => `Aux Canaries, de loin. Maximales moyennes de décembre à février : ${l}, contre ${m} °C à Madrid et ${ma} °C à Malaga.`,
      hotQ: "Quelle est la ville la plus chaude d'Espagne en été ?",
      hotA: (c, mo, t, n, nt) => `Parmi les grandes destinations, ${c} : ${mo}, la maximale moyenne tourne autour de ${t} °C, et la vallée du Guadalquivir alentour (Cordoue, Écija) est tout aussi chaude. Pour un été plus frais, direction la côte nord : ${n} affiche environ ${nt} °C.`,
      euQ: "Où fait-il doux en Europe en hiver, en dehors de l'Espagne ?",
      euA: (l) => `Hors d'Espagne, les hivers les plus doux parmi les grandes destinations sont à ${l}, d'après les maximales moyennes de décembre à février. Pas un temps de plage, mais une belle échappée loin du froid.`,
      bcnQ: "Quand pleut-il le plus à Barcelone ?",
      bcnA: (w, wm, d, dm) => `C'est généralement en ${w} qu'il pleut le plus à Barcelone (environ ${wm} mm), souvent sous forme d'orages courts et violents ; le mois le plus sec est ${d} (environ ${dm} mm).`,
      madQ: "Quel est le mois le plus chaud à Madrid, et quand pleut-il ?",
      madA: (h, t, j, w, wm) => `Le mois le plus chaud à Madrid est ${h}, avec des maximales moyennes d'environ ${t} °C. Il ne pleut presque pas en été (environ ${j} mm en juillet) ; c'est en ${w} qu'il pleut le plus (environ ${wm} mm).`,
    },
  },
  pt: {
    title: "Perguntas frequentes sobre o tempo: como, quando e o quê",
    desc: "Dúvidas comuns sobre o tempo: fiabilidade da previsão a 14 dias, probabilidade de chuva, quando ir a Espanha e onde está calor no inverno.",
    h1: "Perguntas frequentes sobre o tempo",
    intro: "Respostas claras às perguntas mais comuns sobre previsões, chuva, calor e o tempo em viagem. As respostas sobre Espanha e a Europa baseiam-se em 10 anos de dados climáticos diários.",
    home: "Início",
    crumb: "Perguntas frequentes",
    heads: { how: "Como funciona o WeatherCompare", what: "Perceber a previsão", when: "Quando: épocas e estações", spain: "Espanha e Europa: quando e onde" },
    how: [
      ["Como funciona o WeatherCompare?", "Não temos um modelo meteorológico próprio. Cada página de cidade mostra lado a lado as previsões de até três serviços independentes (Open-Meteo, WeatherAPI.com e OpenWeatherMap), para ver logo onde concordam e onde não."],
      ["Como vejo o tempo de uma localidade que não está na lista?", "Escreva o nome na caixa de pesquisa: o site cobre qualquer cidade, vila ou aldeia do mundo, não só as que têm página própria. No telemóvel, o botão de localização ao lado da pesquisa mostra o tempo do sítio onde está."],
      ["Qual é a fiabilidade de uma previsão a 14 dias?", "Os três primeiros dias costumam ser muito fiáveis e do quarto ao sétimo servem bem para planear. Para lá de 7 a 10 dias, a previsão mostra sobretudo a tendência (mais calor, mais fresco, instável) e não valores exatos, por isso volte a ver à medida que a data se aproxima."],
      ["De quanto em quanto tempo são atualizadas as previsões?", "Os serviços meteorológicos que usamos recalculam os modelos várias vezes por dia, e as nossas páginas de cidade recebem os dados novos pelo menos duas vezes por dia."],
      ["Como se calcula a melhor época para visitar?", "Com dados climáticos diários de 2011 a 2020 (NASA POWER, e ERA5 para costas e ilhas), em médias mês a mês. Os meses mais bem classificados juntam temperaturas agradáveis e pouca chuva. Com a ferramenta «Encontrar destino» pode escolher o seu tempo ideal."],
    ],
    what: [
      ["O que significa «40% de probabilidade de chuva»?", "Que em cada 10 dias com uma previsão assim, em 4 chove de forma mensurável nesse local. Não diz quanto tempo nem com que força chove, por isso veja também os milímetros previstos."],
      ["O que é a sensação térmica?", "É a forma como sentimos o ar na pele, tendo em conta o vento e a humidade. O vento faz os dias frios parecerem mais frios, e a humidade faz o calor custar mais, porque o suor evapora pior."],
      ["A partir de que índice UV há perigo?", "Na escala da Organização Mundial da Saúde, 3 a 5 é moderado, 6–7 elevado, 8 a 10 muito elevado e 11 ou mais extremo. A partir de 3, use protetor solar, chapéu e óculos de sol e procure a sombra nas horas centrais do dia."],
      ["Qual é a diferença entre tempo e clima?", "O tempo é o que acontece num dia concreto; o clima é a média de muitos anos. As nossas previsões cobrem as próximas duas semanas, e as páginas mensais e os guias de melhor época mostram como costuma ser um lugar, o que é útil para planear com antecedência."],
      ["O que faço quando as previsões não coincidem?", "É sinal de que esses dias são difíceis de prever. Conte com o intervalo mais largo, tenha um plano B para atividades ao ar livre e volte a consultar um ou dois dias depois: as fontes costumam aproximar-se à medida que a data chega."],
      ["O WeatherCompare é gratuito?", "Sim. Todas as previsões, páginas de clima e ferramentas são gratuitas e não é preciso registo. Também pode guardar as cidades favoritas no navegador."],
    ],
    when: [
      ["Quando devo ver o tempo antes de uma viagem?", "Cerca de uma semana antes, para a tendência geral; dois ou três dias antes, para as temperaturas e a chuva que vão ditar a mala; e na própria manhã, para o detalhe hora a hora."],
      ["Quando é a época dos furacões?", "No Atlântico, nas Caraíbas e no golfo do México vai oficialmente de 1 de junho a 30 de novembro, com o pico entre meados de agosto e meados de outubro. No Pacífico oriental começa a 15 de maio."],
      ["Quando é a época das chuvas no Sudeste Asiático?", "Na maior parte da Tailândia, do Camboja, do Laos e de Myanmar, a monção de sudoeste traz mais chuva mais ou menos de maio a outubro. Na costa central do Vietname chove mais tarde, aproximadamente de setembro a dezembro, por isso consulte as páginas mensais do destino exato."],
    ],
    and: "e",
    l: { countries: "Todos os países", tripFinder: "Encontrar destino", today: "Tempo hoje", sources: "Fontes de dados", bestTime: (c) => `Melhor época para ir a ${c}`, weather: (c) => `Tempo em ${c}` },
    spain: {
      bestQ: "Qual é a melhor época para ir a Espanha?",
      bestA: (m, mh, s, c) => `Na maior parte da Espanha continental, a primavera (de abril a junho) e o outono (setembro e outubro) são ideais: Madrid ronda os ${m}°C em maio, contra ${mh}°C em pleno verão e ${s}°C em Sevilha. As Canárias são a exceção: com máximas de cerca de ${c}°C mesmo em janeiro, são boas o ano todo.`,
      warmQ: "Onde está mais calor em Espanha no inverno?",
      warmA: (l, m, ma) => `Nas Canárias, com grande diferença. Máximas médias de dezembro a fevereiro: ${l}, contra ${m}°C em Madrid e ${ma}°C em Málaga.`,
      hotQ: "Qual é a cidade mais quente de Espanha no verão?",
      hotA: (c, mo, t, n, nt) => `Entre os principais destinos, ${c}: ${mo} a máxima média ronda os ${t}°C, e o vale do Guadalquivir à volta (Córdova, Écija) é igualmente quente. Para um verão mais fresco, vá para a costa norte: ${n} ronda os ${nt}°C.`,
      euQ: "Onde está calor na Europa no inverno, além de Espanha?",
      euA: (l) => `Fora de Espanha, os invernos mais amenos entre os principais destinos são em ${l}, segundo as máximas médias de dezembro a fevereiro. Não é tempo de praia, mas é uma boa fuga ao frio.`,
      bcnQ: "Quando chove mais em Barcelona?",
      bcnA: (w, wm, d, dm) => `O mês mais chuvoso em Barcelona costuma ser ${w} (cerca de ${wm} mm), muitas vezes com trovoadas curtas e fortes, e o mais seco é ${d} (cerca de ${dm} mm).`,
      madQ: "Qual é o mês mais quente em Madrid e quando chove?",
      madA: (h, t, j, w, wm) => `O mês mais quente em Madrid é ${h}, com máximas médias de cerca de ${t}°C. No verão quase não chove (cerca de ${j} mm em julho); o mês mais chuvoso é ${w} (cerca de ${wm} mm).`,
    },
  },
  nl: {
    title: "Veelgestelde vragen over het weer: hoe, wanneer en wat",
    desc: "Veelgestelde weervragen: hoe betrouwbaar de 14-daagse verwachting is, wat regenkans betekent, beste reistijd voor Spanje en waar het 's winters warm is.",
    h1: "Veelgestelde vragen over het weer",
    intro: "Duidelijke antwoorden op de meest gestelde vragen over verwachtingen, regen, hitte en reisweer. De antwoorden over Spanje en Europa zijn berekend uit 10 jaar dagelijkse klimaatgegevens.",
    home: "Home",
    crumb: "Veelgestelde vragen",
    heads: { how: "Zo werkt WeatherCompare", what: "De verwachting begrijpen", when: "Wanneer: perioden en seizoenen", spain: "Spanje en Europa: wanneer en waar" },
    how: [
      ["Hoe werkt WeatherCompare?", "We hebben geen eigen weermodel. Elke stadspagina zet de verwachtingen van maximaal drie onafhankelijke diensten (Open-Meteo, WeatherAPI.com en OpenWeatherMap) naast elkaar, zodat je meteen ziet waar ze het over eens zijn en waar niet."],
      ["Hoe vind ik het weer voor een plaats die niet in de lijst staat?", "Typ de naam in het zoekvak: de site dekt elke stad, elk dorp en elke plaats ter wereld, niet alleen die met een eigen pagina. Op je telefoon toont de locatieknop naast het zoekvak het weer op de plek waar je nu bent."],
      ["Hoe betrouwbaar is een 14-daagse verwachting?", "De eerste drie dagen zijn meestal zeer betrouwbaar en dag 4 tot 7 zijn goed om mee te plannen. Na ongeveer 7 tot 10 dagen laat een verwachting vooral de trend zien (warmer, koeler, wisselvallig) en geen exacte cijfers, dus kijk opnieuw als de datum dichterbij komt."],
      ["Hoe vaak worden de verwachtingen bijgewerkt?", "De weerdiensten achter de site rekenen hun modellen meerdere keren per dag door, en onze stadspagina's halen de nieuwe gegevens minstens twee keer per dag op."],
      ["Hoe wordt de beste reistijd berekend?", "Uit dagelijkse klimaatgegevens van 2011 tot 2020 (NASA POWER, en ERA5 voor kusten en eilanden), gemiddeld per maand. Maanden met aangename temperaturen en weinig regen scoren het best. Met de bestemmingzoeker kies je zelf je ideale weer."],
    ],
    what: [
      ["Wat betekent „40% kans op regen”?", "Dat er op 4 van de 10 dagen met zo'n verwachting meetbare regen valt op die plek. Het zegt niets over hoe lang of hoe hard het regent, dus kijk ook naar het verwachte aantal millimeters."],
      ["Wat is de gevoelstemperatuur?", "Zo voelt de lucht op je huid aan als je rekening houdt met wind en luchtvochtigheid. Wind laat koude dagen kouder aanvoelen, en vochtige lucht maakt warme dagen drukkender omdat zweet minder goed verdampt."],
      ["Welke UV-index is gevaarlijk?", "Op de schaal van de Wereldgezondheidsorganisatie is 3–5 matig, 6–7 hoog, 8–10 zeer hoog en 11 of meer extreem. Vanaf 3 gebruik je zonnebrand, een pet en een zonnebril, en zoek je rond het middaguur de schaduw op."],
      ["Wat is het verschil tussen weer en klimaat?", "Weer is wat er op een bepaalde dag gebeurt; klimaat is het gemiddelde over vele jaren. Onze verwachtingen gaan twee weken vooruit, terwijl de maandpagina's en reistijdgidsen laten zien hoe het er meestal is: handig om ver vooruit te plannen."],
      ["Wat doe ik als de verwachtingen niet overeenkomen?", "Dat betekent dat het weer op die dagen lastig te voorspellen is. Houd rekening met de ruimste marge, zorg voor een plan B voor buitenactiviteiten en kijk een of twee dagen later opnieuw: de diensten komen meestal dichter bij elkaar naarmate de datum nadert."],
      ["Is WeatherCompare gratis?", "Ja. Alle verwachtingen, klimaatpagina's en tools zijn gratis, zonder account. Je kunt je favoriete steden ook in je browser bewaren."],
    ],
    when: [
      ["Wanneer kijk ik het best naar het weer voor een reis?", "Ongeveer een week vooraf voor de grote lijn, twee of drie dagen vooraf voor temperaturen en regen waarop je kunt inpakken, en op de ochtend zelf voor de details per uur."],
      ["Wanneer is het orkaanseizoen?", "In de Atlantische Oceaan, het Caribisch gebied en de Golf van Mexico loopt het officieel van 1 juni tot 30 november, met een piek van half augustus tot half oktober. In de oostelijke Stille Oceaan begint het op 15 mei."],
      ["Wanneer is het regenseizoen in Zuidoost-Azië?", "In het grootste deel van Thailand, Cambodja, Laos en Myanmar brengt de zuidwestmoesson ongeveer van mei tot oktober de meeste regen. Aan de middenkust van Vietnam valt de meeste regen later, grofweg van september tot december, dus bekijk de maandpagina's van je precieze bestemming."],
    ],
    and: "en",
    l: { countries: "Alle landen", tripFinder: "Bestemmingzoeker", today: "Weer vandaag", sources: "Gegevensbronnen", bestTime: (c) => `Beste reistijd ${c}`, weather: (c) => `Weer ${c}` },
    spain: {
      bestQ: "Wat is de beste reistijd voor Spanje?",
      bestA: (m, mh, s, c) => `Voor het grootste deel van het vasteland zijn de lente (april tot juni) en de herfst (september en oktober) ideaal: Madrid haalt in mei gemiddeld zo'n ${m}°C, tegen ${mh}°C hartje zomer en ${s}°C in Sevilla. De Canarische Eilanden zijn de uitzondering: met zo'n ${c}°C zelfs in januari zijn ze het hele jaar goed.`,
      warmQ: "Waar is het in Spanje in de winter het warmst?",
      warmA: (l, m, ma) => `Op de Canarische Eilanden, met afstand. Gemiddelde maxima van december tot februari: ${l}, tegen ${m}°C in Madrid en ${ma}°C in Málaga.`,
      hotQ: "Wat is de heetste stad van Spanje in de zomer?",
      hotA: (c, mo, t, n, nt) => `Van de belangrijkste bestemmingen is dat ${c}: ${mo} ligt het gemiddelde maximum rond ${t}°C, en de vallei van de Guadalquivir eromheen (Córdoba, Écija) is net zo heet. Voor een koelere zomer ga je naar de noordkust: ${n} haalt gemiddeld zo'n ${nt}°C.`,
      euQ: "Waar is het in Europa in de winter warm, behalve in Spanje?",
      euA: (l) => `Buiten Spanje zijn de winters van de belangrijkste bestemmingen het mildst in ${l}, afgaande op de gemiddelde maxima van december tot februari. Geen strandweer, maar wel een fijne ontsnapping aan de kou.`,
      bcnQ: "Wanneer regent het het meest in Barcelona?",
      bcnA: (w, wm, d, dm) => `De natste maand in Barcelona is meestal ${w} (zo'n ${wm} mm), vaak met korte, hevige buien; de droogste is ${d} (zo'n ${dm} mm).`,
      madQ: "Wat is de warmste maand in Madrid, en wanneer regent het?",
      madA: (h, t, j, w, wm) => `De warmste maand in Madrid is ${h}, met gemiddelde maxima rond ${t}°C. In de zomer valt nauwelijks regen (zo'n ${j} mm in juli); de natste maand is ${w} (zo'n ${wm} mm).`,
    },
  },
  pl: {
    title: "Pytania o pogodę: jak, kiedy i czego się spodziewać",
    desc: "Częste pytania o pogodę: jak trafna jest prognoza na 14 dni, co znaczy szansa na deszcz, kiedy jechać do Hiszpanii i gdzie jest ciepło zimą.",
    h1: "Najczęstsze pytania o pogodę",
    intro: "Jasne odpowiedzi na najczęstsze pytania o prognozy, deszcz, upały i pogodę w podróży. Odpowiedzi o Hiszpanii i Europie opierają się na 10 latach dziennych danych klimatycznych.",
    home: "Strona główna",
    crumb: "Częste pytania",
    heads: { how: "Jak działa WeatherCompare", what: "Jak czytać prognozę", when: "Kiedy: pory roku i sezony", spain: "Hiszpania i Europa: kiedy i gdzie" },
    how: [
      ["Jak działa WeatherCompare?", "Nie mamy własnego modelu pogody. Każda strona miasta zestawia prognozy z maksymalnie trzech niezależnych serwisów (Open-Meteo, WeatherAPI.com i OpenWeatherMap), więc od razu widać, w czym są zgodne, a w czym nie."],
      ["Jak sprawdzić pogodę dla miejscowości, której nie ma na liście?", "Wpisz jej nazwę w wyszukiwarkę: serwis obejmuje każde miasto, miasteczko i wieś na świecie, a nie tylko te z własną stroną. Na telefonie przycisk lokalizacji obok wyszukiwarki pokaże pogodę tam, gdzie właśnie jesteś."],
      ["Jak trafna jest prognoza na 14 dni?", "Pierwsze trzy dni są zwykle bardzo pewne, a dni 4–7 dobrze nadają się do planowania. Powyżej 7–10 dni prognoza pokazuje raczej trend (cieplej, chłodniej, zmiennie) niż dokładne wartości, więc sprawdzaj ją ponownie, gdy termin się zbliża."],
      ["Jak często aktualizowane są prognozy?", "Serwisy pogodowe, z których korzystamy, przeliczają swoje modele kilka razy dziennie, a nasze strony miast pobierają nowe dane co najmniej dwa razy na dobę."],
      ["Jak wyliczany jest najlepszy czas na wyjazd?", "Na podstawie dziennych danych klimatycznych z lat 2011–2020 (NASA POWER, a dla wybrzeży i wysp ERA5), uśrednionych dla każdego miesiąca. Najwyżej wypadają miesiące z przyjemną temperaturą i małą ilością deszczu. W wyszukiwarce kierunków możesz sam wybrać idealną pogodę."],
    ],
    what: [
      ["Co oznacza „40% szans na deszcz”?", "Że na 10 dni z taką prognozą w 4 spada w tym miejscu mierzalny deszcz. Nie mówi to nic o tym, jak długo i jak mocno pada, dlatego zwracaj uwagę także na przewidywane milimetry."],
      ["Co to jest temperatura odczuwalna?", "To, jak odczuwamy powietrze na skórze, uwzględniając wiatr i wilgotność. Wiatr sprawia, że zimne dni wydają się zimniejsze, a wilgotne powietrze potęguje upał, bo pot gorzej odparowuje."],
      ["Jaki indeks UV jest niebezpieczny?", "W skali Światowej Organizacji Zdrowia 3–5 to poziom umiarkowany, 6–7 wysoki, 8–10 bardzo wysoki, a 11 i więcej ekstremalny. Od 3 w górę używaj kremu z filtrem, nakrycia głowy i okularów przeciwsłonecznych, a w południe szukaj cienia."],
      ["Czym różni się pogoda od klimatu?", "Pogoda to to, co dzieje się danego dnia; klimat to średnia z wielu lat. Nasze prognozy obejmują najbliższe dwa tygodnie, a strony miesięczne i poradniki o najlepszym czasie na wyjazd pokazują, jak zwykle jest w danym miejscu – to przydaje się przy planowaniu z wyprzedzeniem."],
      ["Co zrobić, gdy prognozy się różnią?", "To znak, że pogoda na te dni jest trudna do przewidzenia. Przygotuj się na szerszy zakres, miej plan B na zajęcia na zewnątrz i sprawdź ponownie za dzień lub dwa: w miarę zbliżania się terminu serwisy zwykle się do siebie zbliżają."],
      ["Czy WeatherCompare jest darmowy?", "Tak. Wszystkie prognozy, strony klimatyczne i narzędzia są bezpłatne i nie wymagają konta. Ulubione miasta możesz zapisać w przeglądarce."],
    ],
    when: [
      ["Kiedy sprawdzać pogodę przed podróżą?", "Około tydzień wcześniej, by poznać ogólny trend; dwa–trzy dni przed wyjazdem, by wiedzieć, jakich temperatur i opadów się spodziewać przy pakowaniu; i rano w dniu wyjazdu, by zobaczyć szczegóły godzina po godzinie."],
      ["Kiedy jest sezon huraganów?", "Na Atlantyku, na Karaibach i w Zatoce Meksykańskiej trwa oficjalnie od 1 czerwca do 30 listopada, a szczyt przypada od połowy sierpnia do połowy października. We wschodniej części Pacyfiku zaczyna się 15 maja."],
      ["Kiedy jest pora deszczowa w Azji Południowo-Wschodniej?", "W większości Tajlandii, Kambodży, Laosu i Mjanmy monsun południowo-zachodni przynosi najwięcej deszczu mniej więcej od maja do października. Na środkowym wybrzeżu Wietnamu pada najwięcej później, mniej więcej od września do grudnia, więc sprawdź strony miesięczne konkretnego miejsca."],
    ],
    and: "i",
    l: { countries: "Wszystkie kraje", tripFinder: "Wyszukiwarka kierunków", today: "Pogoda dzisiaj", sources: "Źródła danych", bestTime: (c) => `Kiedy jechać: ${c}`, weather: (c) => `Pogoda ${c}` },
    spain: {
      bestQ: "Kiedy najlepiej jechać do Hiszpanii?",
      bestA: (m, mh, s, c) => `W większości kontynentalnej Hiszpanii najlepsze są wiosna (od kwietnia do czerwca) i jesień (wrzesień i październik): w maju w Madrycie jest średnio około ${m}°C, w szczycie lata ${mh}°C, a w Sewilli nawet ${s}°C. Wyjątkiem są Wyspy Kanaryjskie: z temperaturą około ${c}°C nawet w styczniu nadają się na wyjazd przez cały rok.`,
      warmQ: "Gdzie w Hiszpanii jest najcieplej zimą?",
      warmA: (l, m, ma) => `Na Wyspach Kanaryjskich, z dużą przewagą. Średnie maksima od grudnia do lutego: ${l}, wobec ${m}°C w Madrycie i ${ma}°C w Maladze.`,
      hotQ: "Które miasto w Hiszpanii jest latem najgorętsze?",
      hotA: (c, mo, t, n, nt) => `Spośród głównych kierunków – ${c}: ${mo} średnia temperatura maksymalna wynosi około ${t}°C, a okoliczna dolina Gwadalkiwiru (Kordoba, Écija) jest równie gorąca. Po chłodniejsze lato jedź na północne wybrzeże: ${n} ma średnio około ${nt}°C.`,
      euQ: "Gdzie w Europie jest ciepło zimą, poza Hiszpanią?",
      euA: (l) => `Poza Hiszpanią najłagodniejsze zimy wśród głównych kierunków mają ${l}, sądząc po średnich maksimach od grudnia do lutego. To nie pogoda na plażę, ale przyjemna ucieczka przed zimnem.`,
      bcnQ: "Kiedy w Barcelonie pada najwięcej?",
      bcnA: (w, wm, d, dm) => `Najbardziej deszczowym miesiącem w Barcelonie jest zwykle ${w} (około ${wm} mm), często z krótkimi, gwałtownymi burzami, a najsuchszym ${d} (około ${dm} mm).`,
      madQ: "Który miesiąc jest w Madrycie najgorętszy i kiedy pada?",
      madA: (h, t, j, w, wm) => `Najgorętszym miesiącem w Madrycie jest ${h}, ze średnimi maksimami około ${t}°C. Latem prawie nie pada (około ${j} mm w lipcu), a najwięcej deszczu przynosi ${w} (około ${wm} mm).`,
    },
  },
};

export const FAQ_COPY = C;

const r = Math.round;
const argMax = (a: number[]) => a.reduce((b, v, i) => (v > a[b]! ? i : b), 0);
const argMin = (a: number[]) => a.reduce((b, v, i) => (v < a[b]! ? i : b), 0);
const winter = (t: number[]) => (t[11]! + t[0]! + t[1]!) / 3;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function city(country: string, slug: string, locale: AnyLocale) {
  const found = findCity(country, slug);
  const climate = getCityClimate(country, slug);
  if (!found || !climate) return null;
  return { country, slug, name: cityName(slug, found.city.name, locale), climate };
}

export function buildFaq(locale: AnyLocale): FaqSection[] {
  const t = C[locale] ?? C.en;
  const m = monthInfo(locale).monthNames;
  const join = (a: string[]) => (a.length <= 1 ? a.join("") : `${a.slice(0, -1).join(", ")} ${t.and} ${a[a.length - 1]}`);
  const plain = (list: QA[]): FaqItem[] => list.map(([q, a]) => ({ q, a }));

  const how = plain(t.how);
  how[1]!.links = [{ href: paths.countries(locale), label: t.l.countries }];
  how[4]!.links = [
    { href: paths.tripFinder(locale), label: t.l.tripFinder },
    { href: "/data-sources", label: t.l.sources },
  ];
  const when = plain(t.when);
  when[0]!.links = [{ href: paths.today(locale), label: t.l.today }];

  const sections: FaqSection[] = [
    { id: "how", heading: t.heads.how, items: how },
    { id: "what", heading: t.heads.what, items: plain(t.what) },
    { id: "when", heading: t.heads.when, items: when },
  ];

  const mad = city("spain", "madrid", locale);
  const sev = city("spain", "seville", locale);
  const bcn = city("spain", "barcelona", locale);
  const mal = city("spain", "malaga", locale);
  const canaries = (["fuerteventura", "gran-canaria", "tenerife"] as const).map((s) => city("spain", s, locale));
  const north = city("spain", "san-sebastian", locale);
  const eu = ([["portugal", "madeira"], ["cyprus", "larnaca"], ["malta", "valletta"]] as const).map(([c, s]) => city(c, s, locale));
  if (!mad || !sev || !bcn || !mal || !north || canaries.some((c) => !c) || eu.some((c) => !c)) return sections;
  const can = canaries as NonNullable<(typeof canaries)[number]>[];
  const eus = eu as NonNullable<(typeof eu)[number]>[];
  const s = t.spain;
  const link = (c: { country: string; slug: string; name: string }, kind: "bestTime" | "weather") =>
    kind === "bestTime"
      ? { href: paths.bestTime(locale, c.country, c.slug), label: t.l.bestTime(c.name) }
      : { href: paths.city(locale, c.country, c.slug), label: t.l.weather(c.name) };

  const madHot = argMax(mad.climate.tMax);
  const sevHot = argMax(sev.climate.tMax);
  const bcnWet = argMax(bcn.climate.precipMm);
  const bcnDry = argMin(bcn.climate.precipMm);
  const madWet = argMax(mad.climate.precipMm);

  const spain: FaqItem[] = [
    {
      q: s.bestQ,
      a: s.bestA(r(mad.climate.tMax[4]!), r(mad.climate.tMax[madHot]!), r(sev.climate.tMax[sevHot]!), r(can[2]!.climate.tMax[0]!)),
      links: [link(mad, "bestTime"), link(sev, "bestTime"), link(can[2]!, "bestTime")],
    },
    {
      q: s.warmQ,
      a: s.warmA(join(can.map((c) => `${c.name} (${r(winter(c.climate.tMax))}°C)`)), r(winter(mad.climate.tMax)), r(winter(mal.climate.tMax))),
      links: can.map((c) => link(c, "bestTime")),
    },
    {
      q: s.hotQ,
      a: s.hotA(sev.name, monthInfo(locale).inMonth[sevHot]!, r(sev.climate.tMax[sevHot]!), north.name, r(north.climate.tMax[argMax(north.climate.tMax)]!)),
      links: [link(sev, "weather"), link(north, "weather")],
    },
    {
      q: s.euQ,
      a: s.euA(join(eus.map((c) => `${c.name} (${r(winter(c.climate.tMax))}°C)`))),
      links: eus.map((c) => link(c, "bestTime")),
    },
    {
      q: s.bcnQ,
      a: cap(s.bcnA(m[bcnWet]!, r(bcn.climate.precipMm[bcnWet]!), m[bcnDry]!, r(bcn.climate.precipMm[bcnDry]!))),
      links: [link(bcn, "bestTime")],
    },
    {
      q: s.madQ,
      a: cap(s.madA(m[madHot]!, r(mad.climate.tMax[madHot]!), r(mad.climate.precipMm[6]!), m[madWet]!, r(mad.climate.precipMm[madWet]!))),
      links: [link(mad, "weather"), link(mad, "bestTime")],
    },
  ];
  const spainSection: FaqSection = { id: "spain", heading: t.heads.spain, items: spain };
  // Most of the site's search traffic comes from Spain: lead with Spain there.
  return locale === "es" ? [spainSection, ...sections] : [...sections, spainSection];
}
