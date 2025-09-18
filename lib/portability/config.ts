// ---------- lib/portability/config.ts (data only; NO JSX/React) ----------
export type Market = {
  id: string;
  label: string;
  region: "CH" | "UK" | "EU" | "MEA" | "LATAM" | "ASIA" | "CEE" | "NORDICS" | "US";
  type: "country" | "city";
  country: string;
  city?: string;
  regulator?: string;
  notes?: string[];
  defaultCentres?: string[];
};

export const MARKETS: Market[] = [
  { id: "ch_geneva", label: "Switzerland — Geneva (Onshore)", region: "CH", type: "city", country: "Switzerland", city: "Geneva", regulator: "FINMA", notes: ["LSFin/MiFID reuse", "CRS/FATCA"], defaultCentres: ["Geneva","Zurich","Lugano"] },
  { id: "ch_zurich", label: "Switzerland — Zurich (Onshore)", region: "CH", type: "city", country: "Switzerland", city: "Zurich", regulator: "FINMA", notes: ["LSFin suitability", "KYC portability"], defaultCentres: ["Zurich","Geneva","Lugano"] },
  { id: "ch_lausanne", label: "Switzerland — Lausanne (Onshore)", region: "CH", type: "city", country: "Switzerland", city: "Lausanne", regulator: "FINMA", notes: ["LSFin documentation"], defaultCentres: ["Geneva","Zurich"] },

  { id: "uk_london", label: "United Kingdom — London", region: "UK", type: "city", country: "United Kingdom", city: "London", regulator: "FCA", notes: ["UK SDR", "MiFID-equivalent"], defaultCentres: ["London","Geneva","Zurich","Jersey"] },
  { id: "eu_france_paris", label: "France — Paris", region: "EU", type: "city", country: "France", city: "Paris", regulator: "AMF/ACPR", notes: ["MiFID II", "PRIIPs"], defaultCentres: ["Geneva","Zurich","Luxembourg","Monaco","London"] },
  { id: "eu_italy_milan", label: "Italy — Milan", region: "EU", type: "city", country: "Italy", city: "Milan", regulator: "CONSOB", notes: ["MiFID II", "Tax certificates"], defaultCentres: ["Zurich","Lugano","Geneva","Luxembourg","Monaco"] },
  { id: "eu_spain_madrid", label: "Spain — Madrid", region: "EU", type: "city", country: "Spain", city: "Madrid", regulator: "CNMV", notes: ["MiFID II", "CRS"], defaultCentres: ["Geneva","Zurich","Luxembourg","Monaco"] },
  { id: "eu_germany_munich", label: "Germany — Munich", region: "EU", type: "city", country: "Germany", city: "Munich", regulator: "BaFin", notes: ["MiFID II"], defaultCentres: ["Zurich","Geneva","Luxembourg","London"] },
  { id: "mc_monaco", label: "Monaco — Monaco", region: "EU", type: "city", country: "Monaco", city: "Monaco", regulator: "CCAF", notes: ["Cross-border permissions"], defaultCentres: ["Monaco","Geneva","Zurich"] },
  { id: "lu_luxembourg", label: "Luxembourg — Luxembourg", region: "EU", type: "city", country: "Luxembourg", city: "Luxembourg", regulator: "CSSF", notes: ["UCITS/AIF passports"], defaultCentres: ["Luxembourg","Geneva","Zurich","London"] },

  { id: "se_sweden_stockholm", label: "Sweden — Stockholm", region: "NORDICS", type: "city", country: "Sweden", city: "Stockholm", regulator: "FI", notes: ["MiFID II", "Tax"], defaultCentres: ["Geneva","Zurich","Luxembourg","London"] },
  { id: "no_norway_oslo", label: "Norway — Oslo", region: "NORDICS", type: "city", country: "Norway", city: "Oslo", regulator: "Finanstilsynet", notes: ["MiFID II", "Tax"], defaultCentres: ["Geneva","Zurich","Luxembourg","London"] },
  { id: "dk_denmark_copenhagen", label: "Denmark — Copenhagen", region: "NORDICS", type: "city", country: "Denmark", city: "Copenhagen", regulator: "Finanstilsynet", notes: ["MiFID II", "Tax"], defaultCentres: ["Geneva","Zurich","Luxembourg","London"] },
  { id: "fi_finland_helsinki", label: "Finland — Helsinki", region: "NORDICS", type: "city", country: "Finland", city: "Helsinki", regulator: "FIN-FSA", notes: ["MiFID II", "Tax"], defaultCentres: ["Geneva","Zurich","Luxembourg","London"] },

  { id: "gr_greece_athens", label: "Greece — Athens", region: "EU", type: "city", country: "Greece", city: "Athens", regulator: "HCMC", notes: ["MiFID II", "Tax reporting"], defaultCentres: ["Geneva","Zurich","Luxembourg","London"] },
  { id: "tr_turkey_istanbul", label: "Turkey — Istanbul", region: "CEE", type: "city", country: "Turkey", city: "Istanbul", regulator: "CMB", notes: ["Capital controls", "FX documentation"], defaultCentres: ["Geneva","Zurich","London","Luxembourg"] },
  { id: "il_israel_telaviv", label: "Israel — Tel Aviv", region: "MEA", type: "city", country: "Israel", city: "Tel Aviv", regulator: "ISA", notes: ["Cross-border rules", "Tax clearance"], defaultCentres: ["Geneva","Zurich","London","Luxembourg"] },

  { id: "uae_dubai", label: "UAE — Dubai (DIFC)", region: "MEA", type: "city", country: "United Arab Emirates", city: "Dubai", regulator: "DFSA", notes: ["Outbound permissions", "Client classification"], defaultCentres: ["Dubai (DIFC)","Geneva","Zurich","Singapore","London"] },
  { id: "uae_abudhabi", label: "UAE — Abu Dhabi (ADGM)", region: "MEA", type: "city", country: "United Arab Emirates", city: "Abu Dhabi", regulator: "FSRA", notes: ["ADGM client categorization"], defaultCentres: ["Abu Dhabi (ADGM)","Dubai (DIFC)","Geneva","Zurich"] },
  { id: "saudi_riyadh", label: "Saudi Arabia — Riyadh", region: "MEA", type: "city", country: "Saudi Arabia", city: "Riyadh", regulator: "CMA", notes: ["POA notarization", "Onshore approvals"], defaultCentres: ["Dubai (DIFC)","Geneva","Zurich","London"] },
  { id: "qatar_doha", label: "Qatar — Doha (QFC)", region: "MEA", type: "city", country: "Qatar", city: "Doha", regulator: "QFMA/QFC", notes: ["Outbound marketing rules"], defaultCentres: ["Dubai (DIFC)","Geneva","Zurich"] },
  { id: "kuwait_kuwaitcity", label: "Kuwait — Kuwait City", region: "MEA", type: "city", country: "Kuwait", city: "Kuwait City", regulator: "CMA", notes: ["Client approvals"], defaultCentres: ["Dubai (DIFC)","Geneva","Zurich"] },
  { id: "bahrain_manama", label: "Bahrain — Manama", region: "MEA", type: "city", country: "Bahrain", city: "Manama", regulator: "CBB", notes: ["Client suitability"], defaultCentres: ["Dubai (DIFC)","Geneva","Zurich"] },
  { id: "southafrica_johannesburg", label: "South Africa — Johannesburg", region: "MEA", type: "city", country: "South Africa", city: "Johannesburg", regulator: "FSCA", notes: ["FX/Tax clearance"], defaultCentres: ["Geneva","Zurich","London","Singapore"] },

  { id: "brazil", label: "Brazil", region: "LATAM", type: "country", country: "Brazil", regulator: "CVM/BCB", notes: ["FX registration", "Tax docs"], defaultCentres: ["Geneva","Zurich","Miami","New York","Luxembourg"] },
  { id: "argentina", label: "Argentina", region: "LATAM", type: "country", country: "Argentina", regulator: "CNV/BCRA", notes: ["Capital controls", "Tax"], defaultCentres: ["Geneva","Zurich","Miami","Luxembourg"] },
  { id: "chile", label: "Chile", region: "LATAM", type: "country", country: "Chile", regulator: "CMF", notes: ["Pension rules", "Tax"], defaultCentres: ["Geneva","Zurich","Miami","Luxembourg"] },
  { id: "mexico", label: "Mexico", region: "LATAM", type: "country", country: "Mexico", regulator: "CNBV", notes: ["Suitability", "Tax forms"], defaultCentres: ["Geneva","Zurich","Miami","New York"] },
  { id: "colombia", label: "Colombia", region: "LATAM", type: "country", country: "Colombia", regulator: "SFC", notes: ["Outbound rules"], defaultCentres: ["Geneva","Zurich","Miami"] },
  { id: "peru", label: "Peru", region: "LATAM", type: "country", country: "Peru", regulator: "SMV", notes: ["Tax documentation"], defaultCentres: ["Geneva","Zurich","Miami"] },

  { id: "singapore", label: "Singapore", region: "ASIA", type: "country", country: "Singapore", regulator: "MAS", notes: ["Accredited investor status"], defaultCentres: ["Singapore","Geneva","Zurich","Hong Kong","London"] },
  { id: "hongkong", label: "Hong Kong", region: "ASIA", type: "country", country: "Hong Kong", regulator: "SFC", notes: ["Suitability", "Mainland outbound"], defaultCentres: ["Hong Kong","Singapore","Geneva","Zurich"] },
  { id: "india_mumbai", label: "India — Mumbai", region: "ASIA", type: "city", country: "India", city: "Mumbai", regulator: "SEBI/RBI", notes: ["LRS limits", "Tax"], defaultCentres: ["Singapore","Dubai (DIFC)","Geneva","Zurich"] },
  { id: "china_shanghai", label: "China — Shanghai", region: "ASIA", type: "city", country: "China", city: "Shanghai", regulator: "CSRC", notes: ["Outbound restrictions"], defaultCentres: ["Hong Kong","Singapore"] },
  { id: "indonesia_jakarta", label: "Indonesia — Jakarta", region: "ASIA", type: "city", country: "Indonesia", city: "Jakarta", regulator: "OJK", notes: ["FX/tax"], defaultCentres: ["Singapore","Hong Kong"] },

  { id: "poland_warsaw", label: "Poland — Warsaw", region: "CEE", type: "city", country: "Poland", city: "Warsaw", regulator: "KNF", notes: ["MiFID II"], defaultCentres: ["Geneva","Zurich","Luxembourg","London"] },
  { id: "romania_bucharest", label: "Romania — Bucharest", region: "CEE", type: "city", country: "Romania", city: "Bucharest", regulator: "ASF", notes: ["MiFID II"], defaultCentres: ["Geneva","Zurich","Luxembourg"] },
  { id: "czech_prague", label: "Czechia — Prague", region: "CEE", type: "city", country: "Czechia", city: "Prague", regulator: "CNB", notes: ["MiFID II"], defaultCentres: ["Geneva","Zurich","Luxembourg","London"] },

  { id: "us_miami", label: "United States — Miami", region: "US", type: "city", country: "United States", city: "Miami", regulator: "SEC/FINRA", notes: ["Non-US client rules"], defaultCentres: ["Miami","New York","Geneva","Zurich"] },
  { id: "us_ny", label: "United States — New York", region: "US", type: "city", country: "United States", city: "New York", regulator: "SEC/FINRA", notes: ["Non-US client rules"], defaultCentres: ["New York","Miami","Geneva","Zurich"] },
];

export const BOOKING_CENTRES: string[] = [
  "Geneva","Zurich","Lugano",
  "London","Luxembourg","Monaco","Jersey","Guernsey",
  "Dubai (DIFC)","Abu Dhabi (ADGM)",
  "Singapore","Hong Kong",
  "New York","Miami",
  "Bahamas","Cayman Islands"
];

export const BOOKING_CENTRE_MULTIPLIER: Record<string, number> = {
  "Geneva":1.00, "Zurich":1.00, "Lugano":0.85,
  "London":0.96, "Luxembourg":0.92, "Monaco":0.90, "Jersey":0.88, "Guernsey":0.85,
  "Dubai (DIFC)":0.93, "Abu Dhabi (ADGM)":0.90,
  "Singapore":0.95, "Hong Kong":0.93,
  "New York":0.90, "Miami":0.88,
  "Bahamas":0.80, "Cayman Islands":0.82
};

export const REGION_ORDER: Array<Market["region"]> = ["CH","UK","EU","NORDICS","MEA","LATAM","ASIA","CEE","US"];

