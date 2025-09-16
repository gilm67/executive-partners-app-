// src/lib/markets.ts

export type CompensationRow = {
  level: string;
  base: string;
  bonus: string;
};

export type Market = {
  slug: string;
  name: string;
  country?: string;
  currency?: string;

  // Meta / SEO
  metaTitle?: string;
  metaDescription?: string;
  subtitle?: string;

  // Content blocks
  hiringPulse?: string[];
  mustHaves?: string[];
  comp?: CompensationRow[];
  ecosystem?: string[];

  // Sidebar / cross-links
  jobsHref?: string;
  related?: { slug: string; name: string }[];

  // Optional hero image
  heroImage?: string;
};

export const markets: Market[] = [
  /* --------------------------- Geneva --------------------------- */
  {
    slug: "geneva",
    name: "Geneva",
    country: "Switzerland",
    currency: "CHF",
    metaTitle: "Private Banking Recruitment in Geneva",
    metaDescription:
      "Discover Geneva’s role in private banking: UHNW family offices, global booking centres, and a cross-border tradition in LatAm and MEA.",
    subtitle:
      "Switzerland’s discreet capital for wealth, Geneva combines UHNW family offices, global booking centres, and deep cross-border tradition in LatAm and MEA.",
    hiringPulse: [
      "Portability is non-negotiable: clean, referenceable revenue with low risk flags.",
      "Onshore CH + FR/IT cross-border dual coverage outcompetes single-market books.",
      "Teams with proven DPM penetration and lending velocity see faster offers.",
    ],
    mustHaves: [
      "FINMA fit & proper; CH cross-border rules",
      "MiFID II / EU CB rules for EU clients",
      "KYC/AML depth on legacy books",
    ],
    comp: [
      { level: "Mid RM",     base: "CHF 130,000–180,000", bonus: "30–80%" },
      { level: "Senior RM",  base: "CHF 180,000–280,000", bonus: "30–80%" },
      { level: "Team Lead",  base: "CHF 250,000–350,000", bonus: "40–120%" },
    ],
    ecosystem: [
      "Global booking centre depth",
      "LatAm/MEA desks; FO presence",
      "UHNW advisory platforms",
      "Capital protection",
      "DPM growth",
      "Lombard lending",
    ],
    jobsHref: "/private-banking-jobs-geneva",
    related: [
      { slug: "zurich", name: "Zurich" },
      { slug: "dubai", name: "Dubai" },
      { slug: "london", name: "London" },
    ],
    heroImage: "/images/markets/geneva.jpg",
  },

  /* --------------------------- Zurich --------------------------- */
  {
    slug: "zurich",
    name: "Zurich",
    country: "Switzerland",
    currency: "CHF",
    metaTitle: "Private Banking Recruitment in Zurich",
    metaDescription:
      "Switzerland’s largest financial centre with leading asset management and private banking franchises.",
    subtitle:
      "Switzerland’s largest financial centre with strong AM and PB franchises, plus German-speaking onshore coverage.",
    hiringPulse: [
      "German-speaking onshore + international NNA appetite at top platforms.",
      "Discretionary penetration and structured lending speed up offers.",
      "Stable funding/cross-sell mix valued in risk committees.",
    ],
    mustHaves: [
      "FINMA fit & proper; CH onshore/CB controls",
      "MiFID II familiarity for EU clients",
      "KYC/AML on historic books and third-party intros",
    ],
    comp: [
      { level: "Mid RM",     base: "CHF 140,000–190,000", bonus: "30–80%" },
      { level: "Senior RM",  base: "CHF 190,000–300,000", bonus: "30–90%" },
      { level: "Team Lead",  base: "CHF 270,000–380,000", bonus: "40–120%" },
    ],
    ecosystem: [
      "Asset management depth",
      "Family office coverage",
      "Onshore DE/AT/CH corridors",
      "DPM and advisory scale",
      "Lombard & real-estate lending",
    ],
    jobsHref: "/private-banking-jobs-switzerland",
    related: [
      { slug: "geneva", name: "Geneva" },
      { slug: "london", name: "London" },
      { slug: "singapore", name: "Singapore" },
    ],
    heroImage: "/images/markets/zurich.jpg",
  },

  /* ---------------------------- Dubai --------------------------- */
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    currency: "AED",
    metaTitle: "Private Banking Recruitment in Dubai",
    metaDescription:
      "Fast-growing wealth hub serving Middle East, Africa, and South Asia with international banks and platforms.",
    subtitle:
      "High-growth UHNW/HNW corridor for GCC, Levant, Africa and South Asia with international platforms.",
    hiringPulse: [
      "MEA portability with low compliance friction is the primary filter.",
      "Credit velocity (Lombard/RE) plus advisory penetration accelerates sign-off.",
      "Local presence + multi-jurisdiction booking seen as an edge.",
    ],
    mustHaves: [
      "Local CB rules; EU/UK cross-border awareness",
      "Enhanced KYC/PEP screening",
      "Documented source of funds on legacy books",
    ],
    comp: [
      { level: "Mid RM",     base: "AED 420,000–650,000", bonus: "25–80%" },
      { level: "Senior RM",  base: "AED 650,000–1,000,000", bonus: "30–100%" },
      { level: "Team Lead",  base: "AED 1,000,000–1,500,000", bonus: "40–120%" },
    ],
    ecosystem: [
      "International PB booking",
      "GCC / MENA coverage",
      "Non-resident corridors",
      "Structured lending",
      "Sharia-compliant solutions",
    ],
    jobsHref: "/private-banking-jobs-dubai",
    related: [
      { slug: "geneva", name: "Geneva" },
      { slug: "singapore", name: "Singapore" },
      { slug: "hong-kong", name: "Hong Kong" },
    ],
    heroImage: "/images/markets/dubai.jpg",
  },

  /* ------------------------- Singapore -------------------------- */
  {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    currency: "SGD",
    metaTitle: "Private Banking Recruitment in Singapore",
    metaDescription:
      "APAC hub with deep UHNW/HNW coverage and international booking. Strong regulatory framework and family office growth.",
    subtitle:
      "APAC hub with strong family office inflows, international booking and UHNW/HNW coverage across SEA and North Asia.",
    hiringPulse: [
      "SEA + North Asia cross-coverage with portability preferred.",
      "Credit + structured solutions execution is a differentiator.",
      "Family office origination experience is prized.",
    ],
    mustHaves: [
      "MAS requirements and local suitability rules",
      "KYC/AML for cross-border APAC books",
      "MiFID/UK familiarity for EU/UK corridors",
    ],
    comp: [
      { level: "Mid RM",     base: "SGD 180,000–260,000", bonus: "20–70%" },
      { level: "Senior RM",  base: "SGD 260,000–400,000", bonus: "30–90%" },
      { level: "Team Lead",  base: "SGD 380,000–550,000", bonus: "40–120%" },
    ],
    ecosystem: [
      "Family office growth",
      "DPM & advisory",
      "International booking",
      "Credit & structured solutions",
    ],
    jobsHref: "/private-banking-jobs-singapore",
    related: [
      { slug: "hong-kong", name: "Hong Kong" },
      { slug: "dubai", name: "Dubai" },
      { slug: "geneva", name: "Geneva" },
    ],
    heroImage: "/images/markets/singapore.jpg",
  },

  /* ------------------------- Hong Kong -------------------------- */
  {
    slug: "hong-kong",
    name: "Hong Kong",
    country: "Hong Kong SAR",
    currency: "HKD",
    metaTitle: "Private Banking Recruitment in Hong Kong",
    metaDescription:
      "North Asia private banking hub with China adjacency, UHNW coverage, and international booking.",
    subtitle:
      "North Asia hub with China adjacency, UHNW coverage and international booking for regional clients.",
    hiringPulse: [
      "North Asia (CN/HK/TW) coverage with portable, compliant revenue.",
      "Leverage, FX and structured solutions add velocity.",
      "Mandarin/Cantonese language depth remains important.",
    ],
    mustHaves: [
      "HKMA/SFC rules",
      "Cross-border suitability for PRC clients",
      "Enhanced KYC/source of wealth documentation",
    ],
    comp: [
      { level: "Mid RM",     base: "HKD 900,000–1,400,000", bonus: "25–80%" },
      { level: "Senior RM",  base: "HKD 1,400,000–2,200,000", bonus: "30–100%" },
      { level: "Team Lead",  base: "HKD 2,000,000–3,200,000", bonus: "40–120%" },
    ],
    ecosystem: [
      "China adjacency",
      "Family office expansion",
      "International booking",
      "FX & structured products",
    ],
    jobsHref: "/private-banking-jobs-hong-kong",
    related: [
      { slug: "singapore", name: "Singapore" },
      { slug: "london", name: "London" },
      { slug: "new-york", name: "New York" },
    ],
    heroImage: "/images/markets/hong-kong.jpg",
  },

  /* --------------------------- London --------------------------- */
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    currency: "GBP",
    metaTitle: "Private Banking Recruitment in London",
    metaDescription:
      "Global wealth hub with international booking, UHNW coverage, and depth across product and advisory.",
    subtitle:
      "Global hub for UHNW coverage with deep product benches and multi-jurisdiction booking.",
    hiringPulse: [
      "EMEA + global cross-border revenue with clean portability is key.",
      "Credit solutions and access to private markets accelerate offers.",
      "Entrepreneur/FO origination is a plus.",
    ],
    mustHaves: [
      "FCA fit & proper; UK suitability/COBS",
      "MiFID II knowledge",
      "KYC/AML on legacy and third-party-introduced books",
    ],
    comp: [
      { level: "Mid RM",     base: "£120,000–£180,000", bonus: "30–80%" },
      { level: "Senior RM",  base: "£180,000–£300,000", bonus: "30–100%" },
      { level: "Team Lead",  base: "£250,000–£400,000", bonus: "40–120%" },
    ],
    ecosystem: [
      "FO origination",
      "Global booking",
      "Private markets access",
      "FX & structured products",
    ],
    jobsHref: "/private-banking-jobs-london",
    related: [
      { slug: "geneva", name: "Geneva" },
      { slug: "new-york", name: "New York" },
      { slug: "dubai", name: "Dubai" },
    ],
    heroImage: "/images/markets/london.jpg",
  },

  /* -------------------------- New York -------------------------- */
  {
    slug: "new-york",
    name: "New York",
    country: "United States",
    currency: "USD",
    metaTitle: "Private Banking Recruitment in New York",
    metaDescription:
      "US UHNW centre with global booking, structured lending, and sophisticated product access.",
    subtitle:
      "US UHNW centre with global booking corridors and sophisticated product access.",
    hiringPulse: [
      "US onshore portability and UHNW acquisition is decisive.",
      "Structured credit & alternatives penetration stand out.",
      "Cross-border CH/UK booking familiarity is valued.",
    ],
    mustHaves: [
      "FINRA/SEC where applicable",
      "Enhanced KYC/KYB and source of wealth",
      "MiFID/UK awareness for outbound CB",
    ],
    comp: [
      { level: "Mid RM",     base: "$180,000–$260,000", bonus: "25–80%" },
      { level: "Senior RM",  base: "$260,000–$400,000", bonus: "30–100%" },
      { level: "Team Lead",  base: "$350,000–$500,000", bonus: "40–120%" },
    ],
    ecosystem: [
      "Alternatives & private markets",
      "Global booking corridors",
      "Structured lending and FX",
    ],
    jobsHref: "/private-banking-jobs-new-york",
    related: [
      { slug: "miami", name: "Miami" },
      { slug: "london", name: "London" },
      { slug: "geneva", name: "Geneva" },
    ],
    heroImage: "/images/markets/new-york.jpg",
  },

  /* ---------------------------- Miami --------------------------- */
  {
    slug: "miami",
    name: "Miami",
    country: "United States",
    currency: "USD",
    metaTitle: "Private Banking Recruitment in Miami",
    metaDescription:
      "US gateway for LatAm UHNW/HNW with strong international PB presence and cross-border coverage.",
    subtitle:
      "US gateway for LatAm UHNW/HNW with international PB depth and cross-border coverage.",
    hiringPulse: [
      "LatAm portability with clean KYC is the filter.",
      "FX & credit solutions support rapid monetisation.",
      "Family office/entrepreneur network a plus.",
    ],
    mustHaves: [
      "US suitability, AML/KYC for non-resident flows",
      "MiFID/UK awareness for outbound booking",
      "Source of wealth/OFAC screening discipline",
    ],
    comp: [
      { level: "Mid RM",     base: "$160,000–$230,000", bonus: "25–80%" },
      { level: "Senior RM",  base: "$230,000–$360,000", bonus: "30–100%" },
      { level: "Team Lead",  base: "$300,000–$450,000", bonus: "40–120%" },
    ],
    ecosystem: [
      "LatAm corridors",
      "International booking",
      "FX & structured solutions",
    ],
    jobsHref: "/private-banking-jobs-miami",
    related: [
      { slug: "new-york", name: "New York" },
      { slug: "geneva", name: "Geneva" },
      { slug: "zurich", name: "Zurich" },
    ],
    heroImage: "/images/markets/miami.jpg",
  },
];

/* ------------------------ small helpers ------------------------ */
export const marketSlugs = markets.map((m) => m.slug);

export function getMarket(slug: string) {
  const s = slug.toLowerCase();
  return markets.find((m) => m.slug.toLowerCase() === s);
}
