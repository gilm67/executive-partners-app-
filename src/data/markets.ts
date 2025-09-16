// src/data/markets.ts
export type MarketSlug =
  | "geneva"
  | "zurich"
  | "dubai"
  | "london"
  | "singapore"
  | "miami"
  | "hong-kong"
  | "new-york";

export type MarketData = {
  slug: MarketSlug;
  country: string;
  currency: string;
  title: string;
  intro: string;
  highlights: string[];       // Hiring Pulse
  regulatory: string[];       // Regulatory Must-Haves
  ecosystemTags: string[];    // Ecosystem bullets
  compTable: Array<{ level: string; base: string; bonus: string }>;
  footnote?: string;
};

export const MARKETS: Record<MarketSlug, MarketData> = {
  geneva: {
    slug: "geneva",
    country: "Switzerland",
    currency: "CHF",
    title: "Private Banking Recruitment in Geneva",
    intro:
      "Switzerland’s discreet capital for wealth, Geneva combines UHNW family offices, global booking centres, and deep cross-border tradition in LatAm and MEA.",
    highlights: [
      "Portability is non-negotiable: clean, referenceable revenue with low risk flags.",
      "Onshore CH + FR/IT cross-border dual coverage outcompetes single-market books.",
      "Teams with strong DPM penetration and lending velocity see faster offers.",
    ],
    regulatory: [
      "FINMA fit & proper; CH cross-border rules",
      "MiFID II / EU CB rules for EU clients",
      "KYC/AML depth on legacy books",
    ],
    ecosystemTags: [
      "Global booking centre depth",
      "LatAm/MEA desks; FO presence",
      "UHNW advisory platforms",
      "Capital protection",
      "DPM growth",
      "Lombard lending",
    ],
    compTable: [
      { level: "Mid RM", base: "CHF 130,000–180,000", bonus: "30–80%" },
      { level: "Senior RM", base: "CHF 180,000–280,000", bonus: "30–80%" },
      { level: "Team Lead", base: "CHF 250,000–350,000", bonus: "40–120%" },
    ],
    footnote:
      "Indicative only; varies by platform, coverage, portability, and revenue model.",
  },

  zurich: {
    slug: "zurich",
    country: "Switzerland",
    currency: "CHF",
    title: "Private Banking Recruitment in Zurich",
    intro:
      "Switzerland’s corporate hub with deep onshore wealth, institutional adjacency, and strong Germanic cross-border flows.",
    highlights: [
      "On-book onshore revenues preferred; DE/AT cross-border coverage highly valued.",
      "Entrepreneur & SME owner coverage a plus; credit structuring exposure helps.",
      "High bar for compliance hygiene and documented client consent.",
    ],
    regulatory: [
      "FINMA fit & proper; CH cross-border rules",
      "BaFin / FMA Austria cross-border do’s & don’ts",
      "MiFID II requirements for EU client work",
    ],
    ecosystemTags: ["Onshore CH", "DACH coverage", "Credit structuring", "DPM adoption"],
    compTable: [
      { level: "Mid RM", base: "CHF 140,000–190,000", bonus: "30–80%" },
      { level: "Senior RM", base: "CHF 190,000–300,000", bonus: "30–90%" },
      { level: "Team Lead", base: "CHF 260,000–360,000", bonus: "40–120%" },
    ],
    footnote:
      "Indicative; subject to seniority, portability, risk profile, and platform.",
  },

  dubai: {
    slug: "dubai",
    country: "UAE",
    currency: "AED",
    title: "Private Banking Recruitment in Dubai",
    intro:
      "Regional booking hub for GCC, South Asia and Africa with hybrid on/offshore models and rapid acquisition cycles.",
    highlights: [
      "GCC + NRI coverage prized; clear revenue attribution and portability required.",
      "Multi-custodian experience and booking portability accelerate offers.",
      "Lending velocity, FX take, and wallet capture are scrutinized.",
    ],
    regulatory: [
      "DFSA / ADGM frameworks; local suitability & conduct rules",
      "Cross-border to KSA / Qatar / Kuwait under approved itineraries",
      "Enhanced AML/KYC on legacy offshore books",
    ],
    ecosystemTags: ["GCC hub", "NRI / South Asia", "FX & lending", "Booking portability"],
    compTable: [
      { level: "Mid RM", base: "AED 420,000–650,000", bonus: "30–80%" },
      { level: "Senior RM", base: "AED 650,000–1,000,000", bonus: "30–100%" },
      { level: "Team Lead", base: "AED 1,000,000–1,400,000", bonus: "40–120%" },
    ],
    footnote: "Indicative; depends on coverage mix, risk and portability quality.",
  },

  london: {
    slug: "london",
    country: "UK",
    currency: "GBP",
    title: "Private Banking Recruitment in London",
    intro:
      "Global financial centre with dense UHNW concentration, family office ecosystem, and institutional adjacency across credit, alts and markets.",
    highlights: [
      "Onshore UK books with provable wallet share and references lead processes.",
      "EMEA/North America dual-coverage backgrounds valued on global platforms.",
      "Strong advisory/DPM penetration and lending capability differentiate senior hires.",
    ],
    regulatory: [
      "FCA fit & proper; UK suitability/PROD rules",
      "Cross-border within EEA under local regimes (no EU passporting)",
      "KYC/AML with strong Source-of-Wealth evidence",
    ],
    ecosystemTags: [
      "Family offices",
      "PE/HF adjacency",
      "Credit & structured lending",
      "Global platforms",
      "Alts access",
    ],
    compTable: [
      { level: "Mid RM", base: "GBP 95,000–140,000", bonus: "30–80%" },
      { level: "Senior RM", base: "GBP 140,000–250,000", bonus: "30–100%" },
      { level: "Team Lead", base: "GBP 200,000–320,000", bonus: "40–120%" },
    ],
    footnote:
      "Indicative; varies by platform tier, coverage, and revenue/portability profile.",
  },

  singapore: {
    slug: "singapore",
    country: "Singapore",
    currency: "SGD",
    title: "Private Banking Recruitment in Singapore",
    intro:
      "APAC booking hub with stable frameworks, regional cross-border reach (SEA/North Asia), and a strong family office ecosystem.",
    highlights: [
      "SEA + North Asia cross-border experience is highly prized.",
      "Multi-booking centre (SG/HK/CH) familiarity and custodian portability help.",
      "Credit, FX and discretionary penetration support faster sign-offs.",
    ],
    regulatory: [
      "MAS licensing / representative notifications",
      "Cross-border rules for MY/ID/TH/PH and CN/IN",
      "Enhanced KYC for offshore structures and trusts",
    ],
    ecosystemTags: [
      "Family office growth",
      "Regional CB reach",
      "Alts & funds platform",
      "FX & lending",
      "Dual SG/HK coverage",
    ],
    compTable: [
      { level: "Mid RM", base: "SGD 160,000–240,000", bonus: "30–80%" },
      { level: "Senior RM", base: "SGD 240,000–380,000", bonus: "30–100%" },
      { level: "Team Lead", base: "SGD 350,000–520,000", bonus: "40–120%" },
    ],
    footnote:
      "Indicative; dependent on market mix, licensing scope and portability readiness.",
  },

  miami: {
    slug: "miami",
    country: "USA",
    currency: "USD",
    title: "Private Banking Recruitment in Miami",
    intro:
      "LatAm gateway with proximity to family offices and hemispheric flows; strong demand for clean, portable offshore/onshore LatAm books.",
    highlights: [
      "LatAm client coverage with documented attribution and references is key.",
      "Multi-jurisdiction booking experience (US/CH/BS/PA) speeds transitions.",
      "Credit & FX revenues plus advisory penetration strengthen cases.",
    ],
    regulatory: [
      "US broker-dealer / RIA registrations as applicable",
      "SEC/FINRA compliance; suitability and marketing restrictions",
      "Enhanced AML on cross-border legacy books",
    ],
    ecosystemTags: [
      "LatAm gateway",
      "FO presence",
      "Offshore/onshore mix",
      "FX & credit",
      "Wealth migration",
    ],
    compTable: [
      { level: "Mid RM", base: "USD 130,000–180,000", bonus: "30–80%" },
      { level: "Senior RM", base: "USD 180,000–280,000", bonus: "30–100%" },
      { level: "Team Lead", base: "USD 250,000–350,000", bonus: "40–120%" },
    ],
    footnote:
      "Indicative; depends on coverage depth, risk, compliance and portability evidence.",
  },

  "hong-kong": {
    slug: "hong-kong",
    country: "Hong Kong SAR",
    currency: "HKD",
    title: "Private Banking Recruitment in Hong Kong",
    intro:
      "North Asia hub with deep UHNW coverage across Mainland China, Hong Kong, and Taiwan; strong alts and trading adjacency.",
    highlights: [
      "Mainland China & North Asia cross-border experience is highly valued.",
      "Booking portability (HK/SG/CH) and multi-custodian familiarity help.",
      "Credit/FX revenues and discretionary penetration speed decisioning.",
    ],
    regulatory: [
      "SFC licensing (Type 1/4/9 as applicable)",
      "Cross-border activity into Mainland China under local constraints",
      "Enhanced KYC/SoW for complex offshore structures",
    ],
    ecosystemTags: [
      "North Asia hub",
      "Mainland China access",
      "FO & alts platforms",
      "Dual HK/SG coverage",
      "FX & lending",
    ],
    compTable: [
      { level: "Mid RM", base: "HKD 1,200,000–1,800,000", bonus: "30–80%" },
      { level: "Senior RM", base: "HKD 1,800,000–3,000,000", bonus: "30–100%" },
      { level: "Team Lead", base: "HKD 2,500,000–4,000,000", bonus: "40–120%" },
    ],
    footnote:
      "Indicative; varies by licensing scope, platform, and portability readiness.",
  },

  "new-york": {
    slug: "new-york",
    country: "USA",
    currency: "USD",
    title: "Private Banking Recruitment in New York",
    intro:
      "US UHNW centre with proximity to multi-family offices, alternatives, and institutional markets; strong onshore advisory and credit demand.",
    highlights: [
      "Onshore US books with clear attribution and references lead processes.",
      "Cross-border LatAm/EMEA coverage on global platforms adds value.",
      "DPM/advisory penetration plus lending velocity accelerate offers.",
    ],
    regulatory: [
      "SEC/FINRA registrations as applicable",
      "Reg S / marketing restrictions for cross-border clients",
      "Robust KYC/SoW on offshore structures",
    ],
    ecosystemTags: [
      "MFO / alts adjacency",
      "US onshore growth",
      "Credit solutions",
      "FX & markets access",
      "Global platforms",
    ],
    compTable: [
      { level: "Mid RM", base: "USD 140,000–200,000", bonus: "30–80%" },
      { level: "Senior RM", base: "USD 200,000–320,000", bonus: "30–100%" },
      { level: "Team Lead", base: "USD 300,000–420,000", bonus: "40–120%" },
    ],
    footnote:
      "Indicative; varies by platform, coverage mix, compliance/risk profile, and portability strength.",
  },
};