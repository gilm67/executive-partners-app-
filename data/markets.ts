export type MarketSlug =
  | "geneva"
  | "zurich"
  | "dubai"
  | "london"
  | "singapore"
  | "miami"
  | "paris"
  | "milano"
  | "lisbon"
  | "madrid";

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
      "Onshore CH + EU cross-border adjacency (FR/IT) strengthens multi-corridor coverage.",
      "Teams with strong DPM penetration and lending velocity see faster offers.",
    ],
    regulatory: [
      "FINMA fit & proper; CH cross-border rules",
      "EU cross-border do’s & don’ts for EU clients",
      "KYC/AML depth and documented suitability on legacy books",
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
    footnote: "Indicative; varies by platform, coverage, portability, and revenue model.",
  },

  zurich: {
    slug: "zurich",
    country: "Switzerland",
    currency: "CHF",
    title: "Private Banking Recruitment in Zurich",
    intro:
      "Switzerland’s corporate hub with deep onshore wealth, institutional adjacency, and strong DACH-linked cross-border flows.",
    highlights: [
      "Onshore CH revenues are preferred; Germany/Austria cross-border coverage valued.",
      "Entrepreneur coverage and credit structuring exposure support faster progression.",
      "High bar for compliance hygiene and documented client consent.",
    ],
    regulatory: [
      "FINMA fit & proper; CH cross-border rules",
      "DACH cross-border constraints (DE/AT) where applicable",
      "MiFID II alignment for EU client work",
    ],
    ecosystemTags: [
      "Onshore CH",
      "DACH coverage",
      "Credit structuring",
      "DPM adoption",
      "Entrepreneurs",
    ],
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
      "Regional booking hub for GCC, South Asia, Turkey and Africa with strong offshore/onshore hybrid models.",
    highlights: [
      "GCC + NRI coverage prized; clear revenue attribution and governance required.",
      "Booking portability and multi-custodian experience accelerate offers.",
      "Lending velocity, FX revenues and suitability discipline are scrutinized.",
    ],
    regulatory: [
      "DFSA / ADGM frameworks; local suitability rules",
      "Cross-border constraints by corridor (KSA/Qatar/Kuwait and beyond)",
      "AML/KYC robustness on legacy offshore books",
    ],
    ecosystemTags: [
      "GCC hub",
      "NRI / South Asia",
      "Turkey corridor",
      "FX & lending",
      "Booking portability",
    ],
    compTable: [
      { level: "Mid RM", base: "AED 420,000–650,000", bonus: "30–80%" },
      { level: "Senior RM", base: "AED 650,000–1,000,000", bonus: "30–100%" },
      { level: "Team Lead", base: "AED 1,000,000–1,400,000", bonus: "40–120%" },
    ],
    footnote: "Indicative; depends on coverage, risk, and portability quality.",
  },

  london: {
    slug: "london",
    country: "UK",
    currency: "GBP",
    title: "Private Banking Recruitment in London",
    intro:
      "Global wealth centre with UHNW depth, family office adjacency and strong institutional connectivity across EMEA and international markets.",
    highlights: [
      "Advisory credibility and investment governance are critical; clean suitability files win processes.",
      "Private markets literacy and lending competence are increasingly differentiating.",
      "Portability expectations are explicit: recurring revenues and documented client relationships.",
    ],
    regulatory: [
      "FCA conduct expectations; SM&CR where applicable",
      "Market abuse and financial promotions discipline",
      "KYC/AML and ongoing monitoring standards (group policy driven)",
    ],
    ecosystemTags: [
      "UHNW & Family Office",
      "Structured & alternatives",
      "Specialist lending",
      "International connectivity",
    ],
    compTable: [
      { level: "Mid RM", base: "GBP 110,000–160,000", bonus: "30–80%" },
      { level: "Senior RM", base: "GBP 160,000–250,000", bonus: "30–100%" },
      { level: "Team Lead", base: "GBP 220,000–320,000", bonus: "40–120%" },
    ],
    footnote: "Indicative; varies by platform, risk appetite, portability and desk economics.",
  },

  singapore: {
    slug: "singapore",
    country: "Singapore",
    currency: "SGD",
    title: "Private Banking Recruitment in Singapore",
    intro:
      "APAC booking hub combining stable regulatory frameworks with regional cross-border reach into SEA, North Asia and global UHNW segments.",
    highlights: [
      "Strong demand for clean acquisition and disciplined advisory; suitability discipline is decisive.",
      "Multi-booking familiarity and structured/alternatives literacy support senior moves.",
      "Client onboarding quality and source of wealth narratives are heavily reviewed.",
    ],
    regulatory: [
      "MAS expectations; robust client due diligence",
      "Cross-border constraints by market corridor",
      "Ongoing AML monitoring and documentation governance",
    ],
    ecosystemTags: [
      "APAC booking hub",
      "SEA / North Asia corridors",
      "Alternatives & structured",
      "Credit & FX",
    ],
    compTable: [
      { level: "Mid RM", base: "SGD 180,000–260,000", bonus: "30–80%" },
      { level: "Senior RM", base: "SGD 260,000–420,000", bonus: "30–100%" },
      { level: "Team Lead", base: "SGD 420,000–600,000", bonus: "40–120%" },
    ],
    footnote: "Indicative; depends on booking model, corridor, portability and platform.",
  },

  miami: {
    slug: "miami",
    country: "USA",
    currency: "USD",
    title: "Private Banking Recruitment in Miami",
    intro:
      "Strategic LatAm gateway with proximity to entrepreneurs, diaspora networks and family offices across the Americas.",
    highlights: [
      "Cross-border governance and documentation discipline are non-negotiable for LATAM coverage.",
      "Credit and FX revenues are frequently evaluated alongside recurring advisory revenues.",
      "Strong introducer networks (law/tax/FO) materially accelerate hiring outcomes.",
    ],
    regulatory: [
      "US regulatory expectations; internal cross-border policy discipline",
      "KYC/AML, SoW/SoF narratives and suitability are closely reviewed",
      "Ongoing monitoring and audit-ready documentation standards",
    ],
    ecosystemTags: [
      "LATAM gateway",
      "Diaspora channels",
      "Introducer networks",
      "Specialist credit",
      "Global product shelf",
    ],
    compTable: [
      { level: "Mid RM", base: "USD 150,000–220,000", bonus: "30–80%" },
      { level: "Senior RM", base: "USD 220,000–320,000", bonus: "30–100%" },
      { level: "Team Lead", base: "USD 300,000–450,000", bonus: "40–120%" },
    ],
    footnote: "Indicative; varies by bank, corridor, portability and revenue mix.",
  },

  paris: {
    slug: "paris",
    country: "France",
    currency: "EUR",
    title: "Private Banking Recruitment in Paris",
    intro:
      "A major European wealth centre combining domestic UHNW depth with strong connectivity to Geneva/Luxembourg platforms and international advisory capabilities.",
    highlights: [
      "Advisory credibility and DPM/mandate penetration drive senior offers.",
      "Entrepreneur coverage and lending structuring exposure are valued.",
      "Compliance hygiene and suitability documentation must be exemplary.",
    ],
    regulatory: [
      "AMF/ACPR conduct and distribution expectations",
      "MiFID II alignment for investment services",
      "KYC/AML and ongoing monitoring discipline",
    ],
    ecosystemTags: [
      "Domestic UHNW",
      "Entrepreneurs",
      "Geneva adjacency",
      "Mandates / DPM",
      "Credit structuring",
    ],
    compTable: [
      { level: "Mid RM", base: "EUR 95,000–140,000", bonus: "25–70%" },
      { level: "Senior RM", base: "EUR 140,000–220,000", bonus: "30–90%" },
      { level: "Team Lead", base: "EUR 200,000–280,000", bonus: "40–120%" },
    ],
    footnote: "Indicative; varies by firm, segment, portability and revenue model.",
  },

  milano: {
    slug: "milano",
    country: "Italy",
    currency: "EUR",
    title: "Private Banking Recruitment in Milan",
    intro:
      "Italy’s private wealth hub with strong entrepreneur density, advisory demand and an active interplay between onshore needs and international booking solutions.",
    highlights: [
      "Strong network in Lombardy and key Italian corridors is a differentiator.",
      "Advisory discipline and risk governance are increasingly decisive.",
      "Credit fluency and private markets literacy support senior mobility.",
    ],
    regulatory: [
      "CONSOB / Bank of Italy expectations",
      "MiFID II alignment and client documentation discipline",
      "KYC/AML and ongoing monitoring controls",
    ],
    ecosystemTags: [
      "Entrepreneurs",
      "Family-owned businesses",
      "Advisory / DPM",
      "Credit & Lombard",
      "International booking adjacency",
    ],
    compTable: [
      { level: "Mid RM", base: "EUR 90,000–135,000", bonus: "25–70%" },
      { level: "Senior RM", base: "EUR 135,000–210,000", bonus: "30–90%" },
      { level: "Team Lead", base: "EUR 190,000–270,000", bonus: "40–120%" },
    ],
    footnote: "Indicative; varies by segment, bank and portability.",
  },

  lisbon: {
    slug: "lisbon",
    country: "Portugal",
    currency: "EUR",
    title: "Private Banking Recruitment in Lisbon",
    intro:
      "A fast-growing wealth location with strong entrepreneur base, international inflows and increasing connectivity to Swiss booking centres for sophisticated offshore structures.",
    highlights: [
      "Portuguese entrepreneurs and internationally mobile clients are key segments.",
      "Advisory/DPM adoption and structured solutions knowledge are increasingly valued.",
      "Introducer networks and documented pipeline discipline accelerate hiring outcomes.",
    ],
    regulatory: [
      "CMVM expectations and MiFID II alignment",
      "Cross-border considerations for offshore booking solutions",
      "KYC/AML and ongoing monitoring discipline",
    ],
    ecosystemTags: [
      "Entrepreneurs",
      "International inflows",
      "Swiss booking adjacency",
      "Introducers",
      "Mandates / DPM",
    ],
    compTable: [
      { level: "Mid RM", base: "EUR 80,000–120,000", bonus: "20–60%" },
      { level: "Senior RM", base: "EUR 120,000–190,000", bonus: "30–80%" },
      { level: "Team Lead", base: "EUR 170,000–240,000", bonus: "40–110%" },
    ],
    footnote: "Indicative; varies by platform, segment and portability.",
  },

  madrid: {
    slug: "madrid",
    country: "Spain",
    currency: "EUR",
    title: "Private Banking Recruitment in Madrid",
    intro:
      "Spain’s institutional and private wealth hub with strong domestic UHNW coverage and increasing demand for disciplined advisory, credit and international solutions.",
    highlights: [
      "Domestic UHNW relationships and institutional adjacency are differentiators.",
      "Credit competence and mandate penetration support senior outcomes.",
      "Strong governance and suitability documentation are essential.",
    ],
    regulatory: [
      "CNMV expectations and MiFID II alignment",
      "Cross-border discipline for international structures",
      "KYC/AML and ongoing monitoring standards",
    ],
    ecosystemTags: [
      "Domestic UHNW",
      "Entrepreneurs",
      "Advisory / DPM",
      "Credit structuring",
      "International solutions",
    ],
    compTable: [
      { level: "Mid RM", base: "EUR 85,000–125,000", bonus: "20–60%" },
      { level: "Senior RM", base: "EUR 125,000–200,000", bonus: "30–85%" },
      { level: "Team Lead", base: "EUR 180,000–260,000", bonus: "40–120%" },
    ],
    footnote: "Indicative; varies by platform, segment and revenue mix.",
  },
};