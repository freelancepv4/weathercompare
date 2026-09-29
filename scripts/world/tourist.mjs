// Famous destinations that deserve a page even when their population is small.
// "ISO:Name" — matched against GeoNames names (accent/case-insensitive).
export const TOURIST = `
ES:Marbella ES:Salou ES:Sitges ES:Tossa de Mar ES:Calella ES:Calp ES:Altea ES:Xàbia ES:Dénia ES:Torrevieja ES:Nerja ES:Estepona
ES:Almuñécar ES:Roquetas de Mar ES:Peníscola ES:Cullera ES:Gandia ES:Sóller ES:Pollença ES:Maó ES:Ciutadella ES:Sant Antoni de Portmany
ES:Santa Eulària des Riu ES:Puerto del Carmen ES:Los Cristianos ES:Puerto de Mogán ES:Conil de la Frontera ES:Tarifa ES:Chipiona ES:Rota
ES:Mojácar ES:San Sebastián ES:Donostia ES:Santander ES:Gijón ES:Oviedo ES:Santiago de Compostela ES:A Coruña ES:Vigo ES:Pontevedra ES:Sanxenxo
ES:Granada ES:Córdoba ES:Cádiz ES:Jerez de la Frontera ES:Ronda ES:Toledo ES:Segovia ES:Salamanca ES:Ávila ES:Cuenca ES:Cáceres ES:Mérida
ES:Zaragoza ES:Pamplona ES:Logroño ES:Burgos ES:León ES:Valladolid ES:Tarragona ES:Girona ES:Lleida ES:Castellón de la Plana ES:Alicante
ES:Murcia ES:Cartagena ES:Almería ES:Huelva ES:Jaén ES:Badajoz ES:Huesca ES:Teruel ES:Soria ES:Jaca ES:Benasque ES:Sierra Nevada ES:Formigal
ES:Lloret de Mar ES:Blanes ES:Cadaqués ES:Roses ES:L'Estartit ES:Cambrils ES:Vinaròs ES:Oropesa del Mar ES:Benicasim ES:Jávea ES:Santa Pola
ES:Águilas ES:Mazarrón ES:San Javier ES:La Manga del Mar Menor ES:Vera ES:Zahara de los Atunes ES:Sanlúcar de Barrameda ES:Isla Cristina
ES:Ayamonte ES:Valle Gran Rey ES:San Sebastián de la Gomera ES:Santa Cruz de la Palma ES:Los Llanos de Aridane ES:Valverde ES:Arrecife
ES:Puerto del Rosario ES:Morro Jable ES:Playa del Inglés ES:Las Palmas de Gran Canaria ES:Santa Cruz de Tenerife ES:Adeje ES:Arona
ES:Magaluf ES:Cala Millor ES:Cala d'Or ES:Port d'Alcúdia ES:Palma ES:Manacor ES:Inca ES:Bilbao ES:Vitoria-Gasteiz ES:Ceuta ES:Melilla
ES:Laredo ES:Comillas ES:Llanes ES:Ribadeo ES:Baiona ES:Cangas ES:Viveiro ES:Albarracín ES:Cuenca ES:Úbeda ES:Baeza ES:Antequera ES:Frigiliana
IT:Sorrento IT:Positano IT:Amalfi IT:Taormina IT:Cefalù IT:Siracusa IT:Agrigento IT:Trapani IT:Lampedusa IT:Olbia IT:Cagliari IT:Alghero
IT:Rimini IT:Riccione IT:Jesolo IT:Lignano Sabbiadoro IT:Sanremo IT:Portofino IT:Monterosso al Mare IT:La Spezia IT:Pisa IT:Lucca IT:Siena
IT:San Gimignano IT:Cortona IT:Assisi IT:Perugia IT:Orvieto IT:Matera IT:Lecce IT:Gallipoli IT:Otranto IT:Polignano a Mare IT:Alberobello
IT:Tropea IT:Bolzano IT:Merano IT:Cortina d'Ampezzo IT:Madonna di Campiglio IT:Bormio IT:Livigno IT:Courmayeur IT:Aosta IT:Como IT:Bellagio
IT:Stresa IT:Riva del Garda IT:Sirmione IT:Bardolino IT:Trieste IT:Trento IT:Parma IT:Modena IT:Ravenna IT:Ferrara IT:Mantova IT:Bergamo
IT:Brescia IT:Padova IT:Vicenza IT:Treviso IT:Udine IT:Ancona IT:Pescara IT:L'Aquila IT:Salerno IT:Capri IT:Ischia IT:Reggio Calabria
IT:Vieste IT:Lipari IT:Porto Cervo IT:Viareggio IT:Forte dei Marmi IT:Grosseto IT:Arezzo IT:Urbino IT:Spoleto IT:Termoli IT:Chioggia
FR:Cannes FR:Saint-Tropez FR:Antibes FR:Menton FR:Avignon FR:Arles FR:Aix-en-Provence FR:Montpellier FR:Carcassonne FR:Biarritz FR:Bordeaux
FR:La Rochelle FR:Saint-Malo FR:Mont-Saint-Michel FR:Chamonix-Mont-Blanc FR:Annecy FR:Grenoble FR:Strasbourg FR:Colmar FR:Reims FR:Lille
FR:Rouen FR:Deauville FR:Nantes FR:Rennes FR:Brest FR:Quimper FR:Tours FR:Amboise FR:Dijon FR:Toulouse FR:Perpignan FR:Ajaccio FR:Bastia
FR:Porto-Vecchio FR:Calvi FR:Bonifacio FR:Lourdes FR:Pau FR:Arcachon FR:Val-d'Isère FR:Courchevel FR:Tignes FR:Megève FR:Saint-Jean-de-Luz
PT:Albufeira PT:Lagos PT:Portimão PT:Faro PT:Tavira PT:Vilamoura PT:Sintra PT:Cascais PT:Nazaré PT:Óbidos PT:Coimbra PT:Braga PT:Aveiro
PT:Évora PT:Guimarães PT:Viana do Castelo PT:Ponta Delgada PT:Angra do Heroísmo PT:Porto Santo PT:Ericeira PT:Peniche PT:Setúbal
GR:Santorini GR:Thira GR:Oia GR:Mykonos GR:Naxos GR:Paros GR:Ios GR:Milos GR:Kos GR:Lindos GR:Chania GR:Rethymno GR:Heraklion GR:Agios Nikolaos
GR:Nafplio GR:Kalamata GR:Thessaloniki GR:Ioannina GR:Parga GR:Lefkada GR:Skiathos GR:Samos GR:Mytilene GR:Chios GR:Karpathos GR:Hydra
GR:Kalambaka GR:Delphi GR:Olympia GR:Patra GR:Volos GR:Kavala GR:Syros GR:Ermoupoli GR:Tinos GR:Kythira GR:Kalymnos GR:Patmos GR:Symi
HR:Dubrovnik HR:Split HR:Hvar HR:Makarska HR:Zadar HR:Šibenik HR:Rovinj HR:Pula HR:Poreč HR:Opatija HR:Korčula HR:Bol HR:Krk HR:Rijeka HR:Zagreb
ME:Kotor ME:Budva ME:Herceg Novi ME:Ulcinj SI:Bled SI:Piran SI:Ljubljana SI:Portorož AL:Sarandë AL:Durrës AL:Vlorë AL:Ksamil AL:Himarë
BG:Sunny Beach BG:Nesebar BG:Varna BG:Burgas BG:Sozopol BG:Bansko BG:Plovdiv RO:Brașov RO:Sibiu RO:Constanța RO:Mamaia RO:Cluj-Napoca
TR:Bodrum TR:Marmaris TR:Fethiye TR:Kemer TR:Side TR:Alanya TR:Belek TR:Kaş TR:Kuşadası TR:Çeşme TR:Didim TR:Dalyan TR:Ölüdeniz TR:Göreme
TR:Ürgüp TR:Pamukkale TR:Trabzon TR:Izmir TR:Bursa TR:Uludağ TR:Konya TR:Mardin TR:Datça TR:Kalkan TR:Göcek
CY:Ayia Napa CY:Protaras CY:Limassol CY:Nicosia CY:Kyrenia MT:Sliema MT:St. Julian's MT:Mellieħa MT:Victoria
AT:Innsbruck AT:Salzburg AT:Hallstatt AT:Kitzbühel AT:Sankt Anton am Arlberg AT:Ischgl AT:Sölden AT:Mayrhofen AT:Zell am See AT:Bad Gastein AT:Graz
AT:Linz AT:Klagenfurt AT:Villach AT:Lech AT:Saalbach CH:Zermatt CH:Interlaken CH:Grindelwald CH:St. Moritz CH:Davos CH:Lucerne CH:Luzern
CH:Lugano CH:Locarno CH:Montreux CH:Verbier CH:Crans-Montana CH:Saas-Fee CH:Lausanne CH:Bern CH:Basel CH:Lauterbrunnen CH:Engelberg CH:Arosa
DE:Garmisch-Partenkirchen DE:Berchtesgaden DE:Füssen DE:Oberstdorf DE:Heidelberg DE:Rothenburg ob der Tauber DE:Baden-Baden DE:Freiburg
DE:Konstanz DE:Lindau DE:Sylt DE:Westerland DE:Norderney DE:Binz DE:Rostock DE:Warnemünde DE:Kiel DE:Lübeck DE:Dresden DE:Leipzig
DE:Nuremberg DE:Nürnberg DE:Regensburg DE:Würzburg DE:Bamberg DE:Trier DE:Koblenz DE:Rüdesheim am Rhein DE:Cochem DE:Bremen DE:Hannover
DE:Stuttgart DE:Düsseldorf DE:Dortmund DE:Essen DE:Weimar DE:Erfurt DE:Potsdam DE:Stralsund DE:Timmendorfer Strand DE:Heringsdorf
GB:Edinburgh GB:Glasgow GB:Inverness GB:Fort William GB:Aviemore GB:St Andrews GB:Oban GB:Portree GB:Kirkwall GB:Lerwick GB:Belfast GB:Derry
GB:Cardiff GB:Swansea GB:Tenby GB:Llandudno GB:Bath GB:Oxford GB:Cambridge GB:York GB:Brighton GB:Bournemouth GB:Newquay GB:St Ives
GB:Penzance GB:Torquay GB:Plymouth GB:Exeter GB:Windermere GB:Keswick GB:Whitby GB:Scarborough GB:Blackpool GB:Canterbury GB:Dover
IE:Galway IE:Killarney IE:Kilkenny IE:Dingle IE:Cork IE:Limerick IE:Westport IE:Sligo IS:Akureyri IS:Vík IS:Höfn IS:Húsavík
NO:Tromsø NO:Bergen NO:Ålesund NO:Geiranger NO:Flåm NO:Lofoten NO:Svolvær NO:Stavanger NO:Trondheim NO:Longyearbyen NO:Alta NO:Kirkenes NO:Bodø
SE:Kiruna SE:Abisko SE:Åre SE:Visby SE:Gothenburg SE:Göteborg SE:Malmö SE:Uppsala FI:Rovaniemi FI:Levi FI:Saariselkä FI:Ivalo FI:Turku
FI:Tampere FI:Oulu DK:Skagen DK:Aarhus DK:Odense DK:Billund EE:Tallinn EE:Pärnu LV:Riga LV:Jūrmala LT:Vilnius LT:Palanga LT:Klaipėda
CZ:Prague CZ:Český Krumlov CZ:Karlovy Vary CZ:Brno SK:Bratislava SK:Poprad HU:Budapest HU:Hévíz HU:Siófok HU:Eger PL:Zakopane PL:Gdańsk
PL:Sopot PL:Kraków PL:Wrocław PL:Poznań PL:Kołobrzeg PL:Międzyzdroje PL:Szczecin PL:Toruń PL:Lublin PL:Łódź PL:Karpacz PL:Świnoujście PL:Hel
NL:Zandvoort NL:Maastricht NL:Utrecht NL:Rotterdam NL:The Hague NL:Den Haag NL:Texel NL:Groningen NL:Eindhoven NL:Scheveningen NL:Delft
BE:Bruges NE:Niamey BE:Ghent BE:Antwerp BE:Ostend BE:Knokke-Heist BE:Liège LU:Luxembourg MC:Monaco AD:Andorra la Vella SM:San Marino LI:Vaduz
MA:Essaouira MA:Chefchaouen MA:Fes MA:Fès MA:Tangier MA:Tanger MA:Ouarzazate MA:Merzouga MA:Rabat MA:Casablanca MA:Taghazout MA:Dakhla MA:Saïdia
TN:Hammamet TN:Sousse TN:Monastir TN:Mahdia TN:Tozeur TN:Tabarka EG:Luxor EG:Aswan EG:Marsa Alam EG:Dahab EG:El Gouna EG:Alexandria EG:Makadi Bay
EG:Safaga EG:Siwa JO:Aqaba JO:Petra JO:Wadi Musa JO:Amman IL:Eilat IL:Tel Aviv IL:Jerusalem LB:Beirut
AE:Abu Dhabi AE:Ras al-Khaimah AE:Fujairah AE:Sharjah AE:Ajman OM:Muscat OM:Salalah OM:Nizwa OM:Khasab QA:Doha BH:Manama KW:Kuwait City SA:Jeddah
SA:Riyadh SA:AlUla SA:Medina SA:Mecca
TH:Chiang Mai TH:Chiang Rai TH:Krabi TH:Ao Nang TH:Pattaya TH:Hua Hin TH:Koh Phangan TH:Koh Tao TH:Koh Lanta TH:Koh Chang TH:Pai TH:Ayutthaya
TH:Kanchanaburi TH:Khao Lak TH:Patong TH:Sukhothai VN:Hoi An VN:Da Nang VN:Nha Trang VN:Hue VN:Huế VN:Sa Pa VN:Da Lat VN:Phu Quoc VN:Duong Dong
VN:Ha Long VN:Hạ Long VN:Mui Ne VN:Phan Thiet VN:Can Tho VN:Ninh Binh KH:Siem Reap KH:Phnom Penh KH:Sihanoukville KH:Kampot LA:Luang Prabang
LA:Vang Vieng LA:Vientiane MM:Bagan MM:Yangon MM:Mandalay ID:Ubud ID:Kuta ID:Seminyak ID:Canggu ID:Sanur ID:Nusa Dua ID:Denpasar ID:Lombok
ID:Mataram ID:Senggigi ID:Labuan Bajo ID:Yogyakarta ID:Gili Trawangan ID:Bandung ID:Medan ID:Manado ID:Makassar MY:Langkawi MY:George Town
MY:Kota Kinabalu MY:Malacca MY:Melaka MY:Cameron Highlands MY:Kuching MY:Penang MY:Kuala Lumpur PH:Boracay PH:El Nido PH:Coron PH:Puerto Princesa
PH:Cebu City PH:Bohol PH:Tagbilaran PH:Siargao PH:General Luna PH:Manila PH:Baguio PH:Dumaguete PH:Davao LK:Galle LK:Kandy LK:Ella LK:Mirissa
LK:Negombo LK:Trincomalee LK:Sigiriya LK:Nuwara Eliya LK:Arugam Bay LK:Bentota LK:Unawatuna IN:Goa IN:Panaji IN:Calangute IN:Jaipur IN:Agra
IN:Udaipur IN:Jodhpur IN:Jaisalmer IN:Varanasi IN:Rishikesh IN:Shimla IN:Manali IN:Leh IN:Srinagar IN:Darjeeling IN:Kochi IN:Munnar IN:Alleppey
IN:Alappuzha IN:Varkala IN:Mysore IN:Hampi IN:Pondicherry IN:Puducherry IN:Amritsar IN:Rishikesh IN:Ooty IN:Gangtok IN:Port Blair NP:Kathmandu
NP:Pokhara BT:Thimphu BT:Paro MV:Malé MV:Maafushi CN:Guilin CN:Yangshuo CN:Lijiang CN:Dali CN:Sanya CN:Zhangjiajie CN:Xi'an CN:Hangzhou
CN:Suzhou CN:Chengdu CN:Kunming CN:Lhasa CN:Harbin CN:Qingdao CN:Xiamen CN:Guangzhou CN:Shenzhen CN:Beijing CN:Shanghai CN:Chongqing
JP:Kyoto JP:Nara JP:Hakone JP:Nikko JP:Kanazawa JP:Takayama JP:Hiroshima JP:Sapporo JP:Niseko JP:Fukuoka JP:Nagasaki JP:Okinawa JP:Naha
JP:Ishigaki JP:Kagoshima JP:Sendai JP:Matsumoto JP:Hakodate KR:Busan KR:Jeju City KR:Seogwipo KR:Gyeongju KR:Gangneung TW:Taipei TW:Tainan
TW:Kaohsiung TW:Hualien TW:Taichung MO:Macau MN:Ulaanbaatar UZ:Samarkand UZ:Bukhara UZ:Khiva UZ:Tashkent GE:Tbilisi GE:Batumi GE:Kutaisi
GE:Stepantsminda AM:Yerevan AZ:Baku KZ:Almaty KG:Karakol KG:Bishkek
AU:Cairns AU:Port Douglas AU:Gold Coast AU:Surfers Paradise AU:Byron Bay AU:Noosa Heads AU:Hobart AU:Launceston AU:Alice Springs AU:Yulara
AU:Darwin AU:Broome AU:Adelaide AU:Canberra AU:Airlie Beach AU:Hervey Bay AU:Townsville AU:Margaret River AU:Exmouth AU:Coffs Harbour AU:Newcastle
NZ:Queenstown NZ:Rotorua NZ:Wanaka NZ:Christchurch NZ:Wellington NZ:Dunedin NZ:Nelson NZ:Napier NZ:Taupo NZ:Te Anau NZ:Paihia NZ:Franz Josef
FJ:Nadi FJ:Suva PF:Papeete PF:Bora Bora PF:Vaitape NC:Nouméa WS:Apia TO:Nuku'alofa VU:Port Vila CK:Avarua PW:Koror GU:Hagåtña
US:Las Vegas US:Orlando US:Key West US:San Francisco US:Seattle US:Boston US:Chicago US:New Orleans US:San Diego US:Honolulu
US:Lahaina US:Kahului US:Kailua-Kona US:Hilo US:Lihue US:Anchorage US:Juneau US:Fairbanks US:Aspen US:Vail US:Park City US:Jackson US:Sedona
US:Flagstaff US:Page US:Moab US:Santa Fe US:Taos US:Napa US:Santa Barbara US:Palm Springs US:Lake Tahoe US:South Lake Tahoe US:Yosemite Valley
US:Charleston US:Savannah US:Myrtle Beach US:Nashville US:Memphis US:Austin US:San Antonio US:Houston US:Dallas US:Denver US:Phoenix US:Tucson
US:Portland US:Atlanta US:Philadelphia US:Detroit US:Minneapolis US:Salt Lake City US:Albuquerque US:Bar Harbor US:Nantucket US:Provincetown
US:Clearwater US:Naples US:Tampa US:Fort Lauderdale US:Destin US:Panama City Beach US:Daytona Beach US:St. Augustine US:Asheville US:Gatlinburg
US:Branson US:Mackinaw City US:Bozeman US:West Yellowstone US:Monterey US:Carmel-by-the-Sea US:Big Sur US:Malibu US:Anaheim US:Ocean City
CA:Banff CA:Jasper CA:Whistler CA:Lake Louise CA:Quebec CA:Québec CA:Victoria CA:Tofino CA:Niagara Falls CA:Halifax CA:Calgary CA:Edmonton
CA:Ottawa CA:Winnipeg CA:Charlottetown CA:St. John's CA:Yellowknife CA:Whitehorse CA:Kelowna CA:Mont-Tremblant CA:Churchill CA:Montreal CA:Montréal
MX:Tulum MX:Playa del Carmen MX:Cozumel MX:Isla Mujeres MX:Holbox MX:Bacalar MX:Mérida MX:Valladolid MX:Campeche MX:Puerto Vallarta
MX:Cabo San Lucas MX:San José del Cabo MX:La Paz MX:Mazatlán MX:Acapulco MX:Zihuatanejo MX:Puerto Escondido MX:Oaxaca MX:San Cristóbal de las Casas
MX:Palenque MX:San Miguel de Allende MX:Guanajuato MX:Querétaro MX:Puebla MX:Taxco MX:Huatulco MX:Guadalajara MX:Monterrey MX:Sayulita MX:Todos Santos
MX:Ensenada MX:Tijuana MX:Chihuahua MX:Creel MX:Morelia MX:Veracruz MX:Zacatecas MX:Cuernavaca MX:Tepoztlán MX:Puerto Morelos MX:Mahahual MX:Loreto
GT:Antigua Guatemala GT:Flores GT:Panajachel GT:Quetzaltenango BZ:San Pedro BZ:Placencia BZ:Caye Caulker BZ:Belize City SV:San Salvador SV:El Tunco
HN:Roatán HN:Tegucigalpa HN:San Pedro Sula HN:La Ceiba NI:Granada NI:León NI:San Juan del Sur NI:Managua CR:Tamarindo CR:La Fortuna CR:Puerto Viejo
CR:Monteverde CR:Jacó CR:Quepos CR:Manuel Antonio CR:Liberia CR:Nosara CR:Santa Teresa PA:Panama City PA:Bocas del Toro PA:Boquete PA:Colón
CU:Havana CU:Varadero CU:Trinidad CU:Viñales CU:Cienfuegos CU:Santiago de Cuba CU:Holguín CU:Cayo Coco CU:Camagüey DO:Santo Domingo DO:Puerto Plata
DO:La Romana DO:Samaná DO:Las Terrenas DO:Bayahibe DO:Sosúa DO:Cabarete JM:Montego Bay JM:Negril JM:Ocho Rios JM:Kingston HT:Port-au-Prince
PR:San Juan PR:Rincón PR:Ponce PR:Fajardo AW:Oranjestad BQ:Kralendijk BS:Nassau BS:Freeport BB:Bridgetown LC:Castries LC:Soufrière
AG:St. John's KN:Basseterre VC:Kingstown GD:St. George's DM:Roseau TT:Port of Spain TT:Scarborough KY:George Town TC:Cockburn Town
VG:Road Town VI:Charlotte Amalie SX:Philipsburg MF:Marigot BL:Gustavia GP:Pointe-à-Pitre GP:Basse-Terre MQ:Fort-de-France AI:The Valley
BM:Hamilton
CO:Cartagena CO:Santa Marta CO:Medellín CO:Cali CO:Bogotá CO:San Andrés CO:Salento CO:Villa de Leyva CO:Barranquilla CO:Palomino CO:Minca CO:Guatapé
VE:Porlamar VE:Mérida VE:Caracas VE:Canaima EC:Quito EC:Cuenca EC:Guayaquil EC:Baños EC:Montañita EC:Puerto Ayora EC:Otavalo EC:Puerto Baquerizo Moreno
PE:Cusco PE:Aguas Calientes PE:Arequipa PE:Puno PE:Lima PE:Máncora PE:Paracas PE:Huacachina PE:Ica PE:Iquitos PE:Huaraz PE:Nazca PE:Trujillo
BO:La Paz BO:Uyuni BO:Sucre BO:Copacabana BO:Santa Cruz de la Sierra BO:Potosí CL:Santiago CL:Valparaíso CL:Viña del Mar CL:San Pedro de Atacama
CL:Puerto Natales CL:Punta Arenas CL:Puerto Varas CL:Pucón CL:Hanga Roa CL:La Serena CL:Arica CL:Iquique CL:Puerto Montt CL:Castro CL:Valdivia
AR:Buenos Aires AR:Bariloche AR:San Carlos de Bariloche AR:Mendoza AR:Salta AR:Ushuaia AR:El Calafate AR:El Chaltén AR:Puerto Iguazú AR:Córdoba
AR:Mar del Plata AR:Puerto Madryn AR:San Martín de los Andes AR:Tilcara AR:Rosario AR:Cafayate AR:Villa La Angostura AR:Esquel UY:Montevideo UY:Punta del Este
UY:Colonia del Sacramento UY:José Ignacio UY:Piriápolis PY:Asunción PY:Encarnación BR:Florianópolis BR:Búzios BR:Armação dos Búzios BR:Paraty
BR:Salvador BR:Recife BR:Fortaleza BR:Natal BR:Maceió BR:Porto de Galinhas BR:Jericoacoara BR:Fernando de Noronha BR:Foz do Iguaçu BR:Manaus
BR:Ouro Preto BR:Gramado BR:Bonito BR:Porto Seguro BR:Trancoso BR:Ilhabela BR:Ubatuba BR:Angra dos Reis BR:Arraial do Cabo BR:Cabo Frio BR:Balneário Camboriú
BR:Belo Horizonte BR:Brasília BR:Curitiba BR:Porto Alegre BR:Belém BR:São Luís BR:Morro de São Paulo BR:Itacaré BR:Pipa BR:Petrópolis
KE:Mombasa KE:Diani Beach KE:Malindi KE:Lamu KE:Nairobi KE:Naivasha KE:Watamu TZ:Arusha TZ:Moshi TZ:Stone Town TZ:Dar es Salaam TZ:Nungwi
UG:Kampala UG:Entebbe RW:Kigali ET:Addis Ababa ET:Lalibela ZA:Durban ZA:Johannesburg ZA:Port Elizabeth ZA:Gqeberha ZA:Knysna ZA:Plettenberg Bay
ZA:Hermanus ZA:Stellenbosch ZA:Franschhoek ZA:Hoedspruit ZA:Skukuza ZA:George ZA:Mossel Bay ZA:Oudtshoorn NA:Windhoek NA:Swakopmund NA:Sossusvlei NA:Lüderitz
BW:Maun BW:Kasane BW:Gaborone ZW:Victoria Falls ZW:Harare ZM:Livingstone ZM:Lusaka MZ:Maputo MZ:Vilanculos MZ:Tofo MG:Antananarivo MG:Nosy Be
MG:Hell-Ville MG:Morondava RE:Saint-Denis RE:Saint-Gilles-les-Bains RE:Saint-Pierre SN:Dakar SN:Saly GM:Banjul GH:Accra NG:Lagos CI:Abidjan
CV:Mindelo CV:Praia ST:São Tomé SC:Victoria MU:Port Louis MU:Grand Baie YT:Mamoudzou KM:Moroni DJ:Djibouti
`.trim().split(/\s+(?=[A-Z]{2}:)/).map((s) => {
  const i = s.indexOf(":");
  return { iso: s.slice(0, i), name: s.slice(i + 1).trim() };
});
