/**
 * Turkish page copy — WORK IN PROGRESS, not wired into the site yet.
 *
 * Turkish is the next language (decision + keyword evidence in the Project doc
 * claude/daily-seo-2026-09-28.md). This file is type-checked against Copy so it
 * stays complete, but it is not registered in lib/i18n/copy/index.ts,
 * routing.ts, the language switcher or the sitemaps until every piece
 * (routing, places, insights, bestTime, keywords, locale json) is ready.
 *
 * Turkish attaches case endings to names with an apostrophe, following vowel
 * harmony: "Roma'da", "Paris'te", "Berlin'de", "Roma'nın", "İstanbul'un".
 * The helpers below do that from the spelling; names whose pronunciation
 * differs from their spelling can be added to SOUND (e.g. Nice → "nis").
 */
import type { Copy } from "./types";

const M = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const IN = M.map((m) => `${m} ayında`);

const VOWELS = "aeıioöuüâîû";
/** How a name ends when spoken, for names where spelling misleads. */
const SOUND: Record<string, string> = { Nice: "nis", Bordeaux: "bordo", Marseille: "marsilya", Lyon: "liyon", Cannes: "kan" };

function tail(c: string) {
  const w = (SOUND[c] ?? c).toLocaleLowerCase("tr");
  let v = "e";
  for (let i = w.length - 1; i >= 0; i--) {
    if (VOWELS.includes(w[i]!)) {
      v = w[i]!;
      break;
    }
  }
  const last = w[w.length - 1] ?? "";
  return { v, endsVowel: VOWELS.includes(last), hard: "fstkçşhp".includes(last) };
}
const back = (v: string) => "aıouâû".includes(v);
/** Locative "in": Roma'da, Paris'te, Berlin'de. */
export const da = (c: string) => {
  const t = tail(c);
  return `${c}'${t.hard ? "t" : "d"}${back(t.v) ? "a" : "e"}`;
};
/** Genitive "of": Roma'nın, Paris'in, İstanbul'un, Köln'ün. */
export const nin = (c: string) => {
  const t = tail(c);
  const i4 = "aıâ".includes(t.v) ? "ı" : "eiî".includes(t.v) ? "i" : "ouû".includes(t.v) ? "u" : "ü";
  return `${c}'${t.endsVowel ? "n" : ""}${i4}n`;
};
const cmp = (d: number, m: number) =>
  Math.abs(d) < 2 ? `${M[m]} ayındakine benzer` : `${M[m]} ayından ${Math.abs(d)}°C daha ${d > 0 ? "yüksek" : "düşük"}`;
const TEMP = ["çok sıcak", "sıcak", "ılık", "ılıman", "serin", "soğuk", "dondurucu soğuk"];
const RAIN = ["çok kurak", "oldukça kuru", "biraz yağışlı", "yağışlı", "çok yağışlı"];
const SKY = ["çoğunlukla güneşli", "parçalı bulutlu", "sık sık bulutlu"];

export const tr: Copy = {
  monthShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
  home: "Ana sayfa",
  highsRange: (x, y) => `En yüksek ${x}° – ${y}°C`,
  viewForecast: "Tahmini gör →",
  inCity: da,

  homeTitle: "Hava Durumu Karşılaştırma: 15 Günlük Tahmin ve İklim",
  homeDesc: "120'den fazla şehir için 3 hava tahmini yan yana: bugün, yarın ve 15 gün. Ayrıca aylara göre iklim, en iyi seyahat zamanı ve güneşli rotalar.",
  homeH1: "Hava tahminleri karşılaştırmalı",
  homeIntro: "Birden fazla hava kaynağı yan yana, her şehrin aylık iklimi ve aradığınız havaya göre seyahat önerileri.",
  homeLocal: (k) => `${da(k)} hava durumu`,
  homeEurope: "Avrupa'da popüler",
  homeWorld: "Dünyadan",
  homeCountries: "Ülkelere göre hava durumu",
  cardToday: { title: "Bugün hava durumu", text: "Bugün ve yarın en sıcak, en yağışlı ve en rüzgârlı yerler — ve gün için öneriler.", cta: "Bugünün havasına bak" },
  cardTrip: { title: "Seyahat hava bulucu", text: "Bir ay ve istediğiniz havayı seçin, size en uygun şehirleri görün.", cta: "Rotamı bul" },
  cardWhere: { title: "Ay ay nereye gidilir", text: "Yılın her ayı için havası en iyi rotalar." },
  guidesNote: "Ayrıntılı seyahat rehberleri",
  guidesLink: "Rehberleri oku",

  countryTitle: (c) => `${c} Hava Durumu: Şehirlere Göre Tahmin`,
  countryDesc: (c, cities) => `${c} için hava tahminleri, birden fazla kaynakla karşılaştırmalı: ${cities}.`,
  countryH1: (c) => `${c} hava durumu`,
  countryIntro: (c, n) => `${da(c)} ${n} şehir için canlı tahminler ve aylık iklim.`,
  countryCitiesH: (c) => `${nin(c)} şehirleri`,
  countryMonthsH: "Ay ay en iyi seyahat zamanı",
  countryMonthsText: (c) => `${da(c)} hava hangi aylarda en güzel? Bir ay seçin.`,

  cityTitle: (c) => `${c} Hava Durumu: Bugün, Yarın ve 15 Günlük`,
  cityDesc: (c) => `${c} hava durumu bugün ve yarın, birden fazla kaynakla karşılaştırmalı: saatlik sıcaklık, yağış ve rüzgâr, 15 günlük hava tahmini.`,
  cityH1: (c) => `${c} hava durumu: bugün ve yarın`,
  cityIntro: (c, k) => `${c} (${k}) için canlı hava tahmini, birden fazla kaynakla karşılaştırmalı.`,
  sourcesDown: (n, t) => `${t} kaynaktan ${n} tanesine ulaşılamadı ve karşılaştırmaya dahil edilmedi.`,
  unavailable: "Bu konum için hava verileri geçici olarak kullanılamıyor.",
  byMonthH: (c) => `Aylara göre ${c} hava durumu`,
  byMonthSub: "Her ay için tipik sıcaklıklar, yağış ve bavula ne konacağı.",
  shareCity: (c) => `${c} seyahati mi planlıyorsunuz? Bu tahmini kaydedin veya paylaşın.`,
  shareCityTitle: (c) => `${c} hava tahmini, karşılaştırmalı`,
  aboutH: (c) => `${c} hava durumu hakkında`,
  aboutText: (c, k, lat, lon) => `${c} (${k}) yaklaşık ${lat}, ${lon} koordinatlarında yer alır. Yukarıdaki tahminler birbirinden bağımsız birkaç kaynaktan gelir; böylece nerede aynı fikirde olduklarını ve nerede ayrıştıklarını görebilirsiniz.`,
  faqH: "Sık sorulan sorular",
  faqTempQ: (c) => `${da(c)} bugün hava kaç derece?`,
  faqTempA: (c, t, f, s) => `${da(c)} şu anda yaklaşık ${t}°C, hissedilen sıcaklık ${f}°C (kaynak: ${s}).`,
  faqRainQ: (c) => `${da(c)} bugün yağmur yağacak mı?`,
  faqRainA: (c, p, s) => `${s} verilerine göre ${da(c)} yağış olasılığı yaklaşık %${p}. Ayrıntılar için saatlik tahmine bakın.`,
  faqTomorrowQ: (c) => `${da(c)} yarın hava nasıl olacak?`,
  faqTomorrowA: (c, h, l, p) => `${da(c)} yarın en yüksek ${h}°C, en düşük ${l}°C bekleniyor; yağış olasılığı %${p}.`,
  faqTenQ: (c) => `${c} 15 günlük hava durumu nasıl?`,
  faqTenA: (c) => `Yukarıdaki 15 günlük tahmin ${c} için günlük en yüksek ve en düşük sıcaklıkları ve yağış olasılığını gösterir; ne kadar kesin olduğunu görmek için kaynakları karşılaştırın.`,
  nearby: "Yakındaki şehirler",
  englishGuide: (c) => `Tam rehber: ${c} için en iyi zaman →`,
  moreCountries: (n) => `${n} ülkenin tümüne göz atın`,

  monthTitle: (c, m) => `${c} ${M[m]} Hava Durumu: Sıcaklık ve Yağış`,
  monthDesc: (c, m, h, l, mm) => `${c} ${IN[m]} hava nasıl? Ortalama en yüksek ${h}°C, en düşük ${l}°C ve yaklaşık ${mm} mm yağış — bavula ne konacağıyla birlikte.`,
  monthKicker: "Aylık iklim rehberi",
  monthH1: (c, m) => `${c} ${M[m]} hava durumu`,
  monthSummary: (a) =>
    `${a.city} ${IN[a.m]} genellikle ${TEMP[a.temp]} geçer: gündüz sıcaklık ${a.hi}°C (${a.hiF}°F) civarına çıkar, gece ${a.lo}°C (${a.loF}°F) civarına iner. Ay boyunca yaklaşık ${a.mm} mm yağış düşer (${RAIN[a.rain]}) ve gökyüzü ${SKY[a.sky]} olur. En yüksek sıcaklıklar ${cmp(a.dPrev, (a.m + 11) % 12)}, ${cmp(a.dNext, (a.m + 1) % 12)}.`,
  monthSummaryAlt: (a) =>
    `${IN[a.m]} ${da(a.city)} ${TEMP[a.temp]} bir hava bekleyin: öğleden sonra sıcaklık yaklaşık ${a.hi}°C (${a.hiF}°F), gece ise ${a.lo}°C (${a.loF}°F) civarındadır. Ay boyunca yaklaşık ${a.mm} mm yağış düşer (${RAIN[a.rain]}); gökyüzü ${SKY[a.sky]}.`,
  factWarmest: (c, m) => `${M[m]} genellikle ${nin(c)} en sıcak ayıdır.`,
  factCoolest: (c, m) => `${M[m]} genellikle ${nin(c)} en serin ayıdır.`,
  factDriest: "Genellikle yılın en kurak ayı.",
  factWettest: "Genellikle yılın en yağışlı ayı.",
  stat: { high: "Ort. en yüksek", low: "Ort. en düşük", rain: "Yağış", humidity: "Nem", relative: "bağıl", sky: "Gökyüzü", cloud: "bulut" },
  tempLabels: TEMP,
  rainLabels: RAIN,
  skyLabels: SKY,
  liveForecast: (c) => `${c} canlı hava tahmini`,
  whereElse: (m) => `${IN[m]} başka nereye gidilir`,
  packH: (m) => `${IN[m]} bavula ne konur`,
  pack: {
    light: "Hafif, nefes alan giysiler (pamuk veya keten)",
    sunhat: "Şapka ve yüksek faktörlü güneş kremi",
    water: "Tekrar doldurulabilir su şişesi",
    tshirts: "Tişörtler ve akşam için ince bir katman",
    shoes: "Uzun yürüyüşler için rahat ayakkabı veya sandalet",
    sweater: "Katmanlamak için sıcak bir kazak veya polar",
    jacket: "Orta kalınlıkta bir ceket",
    coat: "İyi yalıtımlı bir kışlık mont",
    winterAcc: "Bere, atkı ve eldiven",
    thermals: "Termal içlik ve buzlu sabahlar için kaymayan, sıcak botlar",
    extraLayer: "Ekstra bir katman — akşamlar öğleden sonradan çok daha serin",
    umbrella: "Katlanır şemsiye veya yağmurluk",
    waterproofShoes: "Su geçirmez ayakkabı",
    smallUmbrella: "Her ihtimale karşı küçük bir seyahat şemsiyesi",
    sunglasses: "Güneş gözlüğü",
    quickDry: "Çabuk kuruyan kumaşlar — hava sıcaklığın gösterdiğinden daha bunaltıcı",
  },
  packGuide: "Tam bavul rehberi →",
  goodTimeH: (c, m) => `${M[m]}, ${nin(c)} ziyaret etmek için iyi bir zaman mı?`,
  bestMonthsText: (c, ms, good, m) =>
    good
      ? `Evet — ${M[m]}, ${c} için en iyi aylardan biridir. En keyifli aylar genellikle ${ms}.`
      : `${da(c)} en keyifli aylar genellikle ${ms}. Yukarıdaki grafikte ayları karşılaştırın.`,
  otherCitiesH: (k, m) => `${IN[m]} ${da(k)} diğer şehirler`,
  quickAnswersH: (c, m) => `${IN[m]} ${c}: kısa cevaplar`,
  faqWarmQ: (c, m) => `${c} ${IN[m]} ne kadar sıcak?`,
  faqWarmA: (h, hf, l, lf) => `10 yıllık günlük verilere göre ortalama en yüksek sıcaklık yaklaşık ${h}°C (${hf}°F), en düşük yaklaşık ${l}°C (${lf}°F).`,
  faqWetQ: (c, m) => `${c} ${IN[m]} çok yağmurlu mu?`,
  faqWetA: (c, m, mm, r) => `${c} ${IN[m]} genellikle yaklaşık ${mm} mm yağış alır — ${r}.`,
  faqBestQ: (c) => `${c} için en iyi seyahat zamanı ne zaman?`,
  faqBestA: (c, ms) => `Keyifli ve oldukça kuru bir hava için ${da(c)} en iyi aylar genellikle ${ms}.`,
  cityInMonth: (c, m) => `${IN[m]} ${c}`,
  monthFoot: (c) => `Rakamlar ${c} çevresi için uzun dönem ortalamalarıdır (NASA POWER / ERA5, 2011–2020), belirli bir yılın tahmini değildir.`,
  monthFootLink: "Canlı tahmini gör",

  chartH: (c) => `Aylara göre ${c} hava durumu`,
  chartLegendTemp: "En düşük → en yüksek °C",
  chartLegendRain: "Yağış (mm)",
  chartTableToggle: "Aylık ortalamaları tablo olarak göster",
  chartCaption: (c) => `${c} aylık ortalama iklim`,
  chartCols: ["Ay", "Ort. en yüksek", "Ort. en düşük", "Yağış", "Nem", "Bulutluluk"],
  monthLinksSub: "Her ay için tipik sıcaklıklar, yağış ve bavula ne konacağı.",

  whereTitle: (m) => `${IN[m]} Nereye Gidilir: Havası En İyi Rotalar`,
  whereDesc: (m) => `${IN[m]} plaj havası, ılık şehir gezisi, serin bir kaçamak için en iyi yerler — 10 yıllık iklim verisiyle sıralandı.`,
  whereH1: (m) => `${IN[m]} nereye gidilir`,
  whereIntro: (m) => `10 yıllık sıcaklık, yağış ve bulut verilerine göre bu şehirler ${IN[m]} her seyahat türü için genellikle en iyi havaya sahip.`,
  whereCustomise: "Seyahat bulucuda kişiselleştirin",
  whereStyleH: (s, m) => `${IN[m]} ${s.toLocaleLowerCase("tr")}`,
  whereRain: "yağış",
  whereFoot: "Sıralamalar tahmin değil, uzun dönem aylık ortalamalardır. Yola çıkmadan önce canlı tahmine bakın.",
  wherePrevNext: (m) => `${IN[m]} nereye gidilir`,
  whereMonthsH: "Ay ay nereye gidilir",

  tripTitle: "Seyahat Hava Bulucu: Güzel Hava İçin Nereye Gitmeli",
  tripDesc: "Bir ay ve istediğiniz havayı seçin, 10 yıllık iklim verisine göre hangi şehirlerin en uygun olduğunu görün.",
  tripH1: "İstediğiniz hava için nereye gitmelisiniz?",
  tripIntro: (n) => `Bir ay ve ideal havanızı seçin. ${n} şehri 10 yıllık günlük iklim verisiyle sıralıyoruz.`,
  tripCrumb: "Seyahat hava bulucu",
  trip: {
    step1: "1 · Ne zaman seyahat ediyorsunuz?",
    step2: "2 · Nasıl bir hava istiyorsunuz?",
    step3: "3 · Bölge",
    anywhere: "Her yer",
    avoidRain: "Yağmurlu yerleri hariç tut",
    share: "Sonuçları paylaş",
    copied: "Bağlantı kopyalandı",
    shareTitle: "Güzel hava için nereye gidilir",
    bestMatches: "{month} için en iyi eşleşmeler",
    high: "En yüksek",
    low: "En düşük",
    rain: "Yağış",
    score: "puan",
    seeDetails: "{month} ayrıntıları →",
    showTop: "Yalnızca ilk 9'u göster",
    showAll: "{n} şehrin tümünü göster",
    scoreLabels: ["Mükemmel eşleşme", "İyi eşleşme", "Orta eşleşme", "Zayıf eşleşme"],
    styles: {
      beach: { label: "Sıcak ve güneşli", blurb: "Plaj havası — en yüksek 28–33°C civarı, az yağış" },
      warm: { label: "Ilık gezi havası", blurb: "Hoş, ılık günler — en yüksek 22–28°C civarı" },
      mild: { label: "Ilıman ve rahat", blurb: "Yürüyüş havası — en yüksek 16–22°C civarı" },
      cool: { label: "Serin kaçamak", blurb: "Sıcaktan kaçış — en yüksek 8–16°C civarı" },
      winter: { label: "Kış havası", blurb: "Gerçek kış — en yüksek −5 ile 5°C arası" },
    },
    regions: { Europe: "Avrupa", Asia: "Asya", "Middle East & Africa": "Orta Doğu ve Afrika", Americas: "Amerika", Oceania: "Okyanusya" },
  },

  todayTitle: "Bugün ve Yarın Hava Durumu: En Sıcak, En Yağışlı Yerler",
  todayDesc: "Bugünün öne çıkan hava durumu: en sıcak, en soğuk, en yağışlı ve en rüzgârlı şehirler, yarının görünümü ve gün için öneriler. Gün boyu güncellenir.",
  todayH1: "Bugün ve yarın hava durumu",
  todayKicker: "Günlük hava eğilimleri",
  todayIntro: (d) => `${d}: nerede sıcak, nerede yağmur var ve yarın ne getiriyor — 120'den fazla şehirde, gün boyu güncellenir.`,
  todayUpdated: (t) => `Güncelleme: ${t} UTC`,
  todayFallback: "Canlı veriler geçici olarak kullanılamıyor; yılın bu dönemi için tipik değerler gösteriliyor.",
  hottest: "Bugün en sıcak",
  coldest: "Bu gece en soğuk",
  wettest: "Bugün en yağışlı",
  windiest: "Bugün en rüzgârlı",
  sunniest: "Dışarı çıkmak için en iyi",
  todayCol: "Bugün",
  tomorrowCol: "Yarın",
  localH: (r) => `${r}: bugün ve yarın`,
  europeH: "Avrupa'da bugün ve yarın",
  worldH: "Dünyadan",
  tomorrowH: "Yarının görünümü",
  tomorrowWarmer: (c) => `Yarın daha sıcak: ${c}.`,
  tomorrowCooler: (c) => `Yarın daha serin: ${c}.`,
  tomorrowRainier: (c) => `Yarın daha fazla yağmur olası: ${c}.`,
  tomorrowSteady: "Yarın büyük bir değişiklik beklenmiyor.",
  suggestionsH: "Bugün için öneriler",
  sugOutdoor: (c, t) => `Dışarıda bir gün için en iyisi: ${c} (${t}°C)`,
  sugOutdoorText: "Kuru, aydınlık ve rahat bir sıcaklık — yürüyüş, piknik veya terasta öğle yemeği için ideal.",
  sugUmbrella: (c) => `${da(c)} şemsiyenizi alın`,
  sugUmbrellaText: "Bugün bir ara yağmur olası — kapalı mekân seçenekleri planlayın (müzeler, çarşılar, kafeler).",
  sugNoUmbrella: "Büyük şehirlerde önemli bir yağış beklenmiyor — şemsiyeyi evde bırakabilirsiniz.",
  sugPackH: "Bugün ne giymeli",
  sugPack: (h, l, r) =>
    `${h >= 27 ? "Hafif giysiler, güneş gözlüğü ve su" : h >= 19 ? "Tişört ve akşam için ince bir katman" : h >= 11 ? "Bir kazak ve orta kalınlıkta bir ceket" : "Kalın bir mont, bere ve eldiven"}${r ? ", ayrıca şemsiye" : ""}. Bugünkü tipik aralık: ${l}–${h}°C.`,
  sugEscape: (c, t) => `Güneş mi istiyorsunuz? ${c} bugün ${t}°C`,
  sugEscapeText: "Şu anda Avrupa'nın en sıcak kuru noktası — bir sonraki seyahatinize uyuyor mu bakın.",
  sugWind: (c, k) => `${da(c)} rüzgârlı (hamleler ${k} km/sa)`,
  sugWindText: "Açıktaki eşyaları sabitleyin, yola çıkmadan önce feribot ve uçuşları kontrol edin.",
  trendingH: "Trend hava durumu aramaları",
  trendingText: "Şu anda insanların aradıkları:",
  sky: { clear: "Güneşli", partly: "Parçalı bulutlu", cloudy: "Bulutlu", fog: "Sis", drizzle: "Çisenti", rain: "Yağmur", snow: "Kar", storm: "Gök gürültülü sağanak" },
  rainChance: "yağış",
  wind: "rüzgâr",
};
