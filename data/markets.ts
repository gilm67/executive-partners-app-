export type MarketSlug = "geneva" | "zurich" | "dubai" | "london" | "singapore" | "miami";

export type MarketData = {
  slug: MarketSlug;
  country: string;
  currency: string;
  title: string;
  intro: string;
  highlights: string[];
  regulatory: string[];
  ecosystemTags: string[];
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
      "Switzerland’s discreet capital for wealth. Geneva combines UHNW family offices, global booking centres, and deep cross-border tradition in LatAm and MEA.",
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
      { level: "Mid RM",   base: "CHF 130,000–180,000", bonus: "30–80%" },
      { level: "Senior RM",base: "CHF 180,000–280,000", bonus: "30–80%" },
      { level: "Team Lead",base: "CHF 250,000–350,000", bonus: "40–120%" },
    ],
    footnote: "Indicative; varies by platform, coverage, portability, and revenue model.",
  },
  zurich: {
    slug: "zurich",
    country: "Switzerland",
    currency: "CHF",
    title: "Private Banking Recruitment in Zurich",
    intro:
      "Switzerland’s corporate hub with deep onshore wealth, institutional adjacency, and strong Germanic cross-border flows.",
    highlights: [
      "Onshore CH on-book revenues preferred; Germany/Austria CB coverage valued.",
      "Entrepreneur & SME owner coverage a plus; credit structuring exposure helps.",
      "High bar for compliance hygiene and documented client consent.",
    ],
    regulatory: [
      "FINMA fit & proper; CH CB rules",
      "BaFin/Austrian CB do’s & don’ts",
      "MiFID II for EU client work",
    ],
    ecosystemTags: ["Onshore CH", "DACH coverage", "Credit structuring", "DPM adoption"],
    compTable: [
      { level: "Mid RM", base: "CHF 140,000–190,000", bonus: "30–80%" },
      { level: "Senior RM", base: "CHF 190,000–300,000", bonus: "30–90%" },
      { level: "Team Lead", base: "CHF 260,000–360,000", bonus: "40–120%" },
    ],
    footnote: "Indicative; subject to seniority, portability, risk, and platform.",
  },
  dubai: {
    slug: "dubai",
    country: "UAE",
    currency: "AED",
    title: "Private Banking Recruitment in Dubai",
    intro:
      "Regional booking hub for GCC, South Asia, and Africa with strong offshore/onshore hybrid models.",
    highlights: [
      "GCC + NRI coverage prized; clear revenue attribution required.",
      "Booking portability and multi-custodian experience accelerate offers.",
      "Lending velocity and FX revenues are scrutinized.",
    ],
    regulatory: [
      "DFSA / ADGM frameworks; local suitability rules",
      "Cross-border CB to KSA/Qatar/Kuwait",
      "AML/KYC on legacy offshore books",
    ],
    ecosystemTags: ["GCC hub", "NRI / South Asia", "FX & lending", "Booking portability"],
    compTable: [
      { level: "Mid RM", base: "AED 420,000–650,000", bonus: "30–80%" },
      { level: "Senior RM", base: "AED 650,000–1,000,000", bonus: "30–100%" },
      { level: "Team Lead", base: "AED 1,000,000–1,400,000", bonus: "40–120%" },
    ],
    footnote: "Indicative; depends on coverage, risk, and portability quality.",
  },
  london: {
    slug: "london", country: "UK", currency: "GBP",
    title: "Private Banking Recruitment in London",
    intro: "Global financial centre with deep UHNW, family office, and institutional adjacency.",
    highlights: [], regulatory: [], ecosystemTags: [], compTable: [],
  },
  singapore: {
    slug: "singapore", country: "Singapore", currency: "SGD",
    title: "Private Banking Recruitment in Singapore",
    intro: "APAC booking hub with stable frameworks and regional cross-border reach.",
    highlights: [], regulatory: [], ecosystemTags: [], compTable: [],
  },
  miami: {
    slug: "miami", country: "USA", currency: "USD",
    title: "Private Banking Recruitment in Miami",
    intro: "LatAm gateway with proximity to family offices and hemispheric flows.",
    highlights: [], regulatory: [], ecosystemTags: [], compTable: [],
  },
};
