export type Market = {
  slug: string;
  title: string;
  name?: string;
  headline?: string;
  country: string;
  description?: string;
  heroImage?: string;
  facts?: { label: string; value: string }[];
  hiringPulse?: string[];
  comp?: {
    currency?: string;
    netNote?: string;
    bands?: { level: string; base: string; bonus: string; note?: string }[];
  };
  regulatory?: string[];
  ecosystem?: {
    title?: string;
    items?: string[];
    trends?: string[];
  };
};

export const markets: Market[] = [
  {
    slug: "geneva",
    title: "Geneva",
    name: "Private Banking & Wealth Management Recruitment — Geneva",
    headline: "Executive Partners is Geneva-based and places senior private bankers, relationship managers, and wealth management professionals across the city's leading private banks, EAMs, and family offices.",
    country: "Switzerland",
    description:
      "Geneva is the world's most concentrated private banking market by AUM per capita, home to over 100 banks and the headquarters of most major Swiss and international private banking franchises. Executive Partners operates exclusively in this market from its Geneva base.",
    heroImage: "/images/markets/geneva.jpg",
    facts: [
      { label: "Focus", value: "Private Banking, EAM, Family Offices" },
      { label: "Region", value: "Lake Geneva / Romandy" },
      { label: "Language", value: "French / English" },
      { label: "Currency", value: "CHF" },
    ],
    hiringPulse: [
      "Sustained demand for French-speaking senior RMs with European and MENA client books",
      "EAM sector expanding rapidly — independent asset managers actively hiring experienced bankers",
      "UBP, Lombard Odier, Pictet, and Mirabaud running selective senior mandates",
      "Strong appetite for bankers with UHNW books above CHF 300M and proven portability",
      "Family office structuring and next-gen wealth transition driving new advisory mandates",
      "Compliance timelines lengthening; 3 - 6 month onboarding standard at major platforms",
    ],
    comp: {
      currency: "CHF",
      netNote:
        "Indicative gross figures for Geneva-based roles. Actual packages vary by AUM, revenue generation, book portability, and seniority. Swiss social contributions apply.",
      bands: [
        { level: "Senior Relationship Manager", base: "CHF 180K - 260K", bonus: "40 - 80%", note: "Min. CHF 250M AUM typically expected" },
        { level: "Director / Team Head", base: "CHF 260K - 380K", bonus: "50 - 100%", note: "Revenue target CHF 1.5M+" },
        { level: "Managing Director", base: "CHF 380K - 550K+", bonus: "60 - 130%", note: "Book CHF 500M+ for Tier 1 platforms" },
        { level: "EAM / Independent Advisor", base: "CHF 120K - 200K", bonus: "Revenue share model", note: "Retrocession and AUM-based structures common" },
      ],
    },
    regulatory: [
      "FINMA oversight applies to all client-facing roles; registration mandatory for advisors",
      "Swiss Banking Act and FINSA/FINIA framework governs all wealth management activity",
      "Garden leave clauses typically 3 - 6 months at senior level; factored into all EP mandates",
      "Non-solicitation agreements strictly enforced; client portability analysis essential pre-move",
      "EAM regulation tightened under FINIA 2020 — independent managers require FINMA authorisation",
      "AML/KYC standards among the world's most stringent; FINMA Circular 2016/7 applies",
    ],
    ecosystem: {
      title: "Geneva Private Banking Ecosystem",
      items: [
        "Pictet", "Lombard Odier", "UBP (Union Bancaire Privee)", "Mirabaud",
        "Edmond de Rothschild", "SYZ Group", "Banque Syz", "Julius Baer (Geneva)",
        "UBS (Geneva)", "BNP Paribas Wealth Management", "Credit Agricole (LCL)",
        "BCGE", "Reyl & Cie", "Notz Stucki", "Piguet Galland",
      ],
      trends: [
        "EAM sector consolidation", "UHNW family office mandates",
        "Next-gen wealth transition", "MENA and African client flows",
        "Digital asset integration", "Sustainable / ESG mandates",
        "Cross-border APAC coverage", "Independent manager FINIA compliance",
      ],
    },
  },
    {
    slug: "zurich",
    title: "Zurich",
    name: "Private Banking & Wealth Management Recruitment — Zurich",
    headline: "Executive Partners places senior private bankers and relationship managers across Zurich's leading private banking and asset management institutions, from global majors to independent boutiques.",
    country: "Switzerland",
    description:
      "Switzerland's largest financial centre and home to the country's most concentrated private banking and asset management ecosystem. Executive Partners runs active search mandates across Zurich's full institutional spectrum.",
    heroImage: "/images/markets/zurich.jpg",
    facts: [
      { label: "Focus", value: "Private Banking, Asset Management, Family Offices" },
      { label: "Region", value: "German-speaking Switzerland" },
      { label: "Language", value: "German / English" },
      { label: "Currency", value: "CHF" },
    ],
    hiringPulse: [
      "Active demand for senior relationship managers with German-speaking European client books",
      "UBS post-Credit Suisse integration creating lateral movement across the market",
      "Julius Baer, Vontobel, and EFG hiring selectively at Director and MD level",
      "Strong appetite for bankers with Eastern European, Middle Eastern, and APAC coverage",
      "Independent asset managers and family offices absorbing displaced Credit Suisse talent",
      "Compliance and regulatory scrutiny driving longer onboarding timelines",
    ],
    comp: {
      currency: "CHF",
      netNote:
        "Indicative gross figures for Zurich-based roles. Actual packages vary by AUM, revenue generation, book portability, and seniority. Swiss social contributions apply.",
      bands: [
        { level: "Senior Relationship Manager", base: "CHF 180K - 250K", bonus: "40 - 80%", note: "Min. CHF 300M AUM typically expected" },
        { level: "Director / Team Head", base: "CHF 250K - 350K", bonus: "50 - 100%", note: "Revenue target CHF 2M+" },
        { level: "Managing Director", base: "CHF 350K - 500K+", bonus: "60 - 120%", note: "Book USD 600M+ for Tier 1 platforms" },
        { level: "Investment Advisor / Portfolio Mgr", base: "CHF 150K - 220K", bonus: "20 - 50%", note: "Discretionary mandate experience valued" },
      ],
    },
    regulatory: [
      "FINMA licensing and registration requirements apply to all client-facing roles",
      "SNB and FINMA oversight — one of the world's most rigorous private banking regulatory environments",
      "Garden leave clauses typically 3 - 6 months at senior level; factored into all EP mandates",
      "Non-solicitation agreements widely enforced; AUM portability analysis critical pre-move",
      "Post-Credit Suisse: enhanced onboarding scrutiny on legacy CS client books across all institutions",
      "AML/KYC compliance requirements increasingly stringent; FINMA Circular 2016/7 standards",
    ],
    ecosystem: {
      title: "Zurich Private Banking Ecosystem",
      items: [
        "UBS", "Julius Baer", "Vontobel", "EFG International",
        "Lombard Odier (Zurich desk)", "Pictet (Zurich desk)", "LGT Bank",
        "Liechtensteinische Landesbank", "Bellevue Group",
        "Zurich Cantonal Bank (ZKB)", "Mirabaud (Zurich)", "Credit Suisse (UBS integration)",
      ],
      trends: [
        "Post-CS talent redistribution", "EAM / independent asset manager growth",
        "UHNW family office mandates", "German-speaking European client flows",
        "Digital asset platform build-outs", "Cross-border APAC & MEA coverage",
        "Alternatives & structured products", "ESG / sustainable investment focus",
      ],
    },
  },

  {
    slug: "dubai",
    title: "Dubai",
    name: "Private Banking & Wealth Management Recruitment — Dubai",
    headline: "Executive Partners sources senior private bankers and relationship managers for Dubai's leading international private banking franchises and DIFC-based wealth platforms.",
    country: "United Arab Emirates",
    description:
      "Fast-growing wealth hub serving Middle East, Africa, and South Asia with international banks.",
    heroImage: "/images/markets/dubai.jpg",
    facts: [
      { label: "Focus", value: "International PB / WM" },
      { label: "Region", value: "GCC / MENA" },
    ],
  },
  {
    slug: "london",
    title: "London",
    name: "Private Banking & Wealth Management Recruitment — London",
    headline: "Executive Partners places senior private bankers and wealth managers across London's international UHNW platforms, from global private banking majors to boutique multi-family offices.",
    country: "United Kingdom",
    description:
      "Global hub for international wealth, with deep capital markets and multi-family office presence.",
    heroImage: "/images/markets/london.jpg",
    facts: [
      { label: "Focus", value: "Global UHNW, Family Offices" },
      { label: "Region", value: "Europe / Global" },
    ],
  },
  {
    slug: "new-york",
    title: "New York",
    name: "Private Banking & Wealth Management Recruitment — New York",
    headline: "Executive Partners sources senior private bankers and wealth management professionals for New York's leading UHNW platforms, private banks, and alternative investment firms.",
    country: "United States",
    description:
      "Wall Street and beyond — a world-leading center for investment banking, asset management, and private wealth.",
    heroImage: "/images/markets/new-york.jpg",
    facts: [
      { label: "Focus", value: "PB, Alternatives, Hedge Funds" },
      { label: "Region", value: "North America" },
    ],
  },
  {
    slug: "miami",
    title: "Miami",
    name: "Private Banking & Wealth Management Recruitment — Miami",
    headline: "Executive Partners places senior private bankers and relationship managers serving LATAM UHNW clients across Miami's fast-growing international wealth management market.",
    country: "United States",
    description:
      "Gateway to LATAM wealth, with rapid UHNW inflows and international private banking presence.",
    heroImage: "/images/markets/miami.jpg",
    facts: [
      { label: "Focus", value: "UHNW LATAM, Offshore Banking" },
      { label: "Region", value: "Latin America / US" },
    ],
  },
  {
    slug: "singapore",
    title: "Singapore",
    name: "Private Banking & Wealth Management Recruitment — Singapore",
    headline: "Executive Partners sources senior private bankers and relationship managers for Singapore's leading private banking platforms and family offices serving ASEAN, South Asian, and global UHNW clients.",
    country: "Singapore",
    description:
      "Asia’s premier wealth hub with strong regulatory environment and cross-border private banking.",
    heroImage: "/images/markets/singapore.jpg",
    facts: [
      { label: "Focus", value: "Cross-border PB, Family Offices" },
      { label: "Region", value: "ASEAN / South Asia" },
    ],
  },
  {
    slug: "hong-kong",
    title: "Hong Kong",
    name: "Private Banking & Wealth Management Recruitment — Hong Kong",
    headline: "Executive Partners places senior private bankers and wealth management professionals across Hong Kong's UHNW platforms serving Greater China, North Asia, and international clients.",
    country: "China (SAR)",
    description:
      "Gateway to China and North Asia, with deep-rooted UHNW private banking franchises.",
    heroImage: "/images/markets/hong-kong.jpg",
    facts: [
      { label: "Focus", value: "China / North Asia UHNW" },
      { label: "Region", value: "Greater China" },
    ],
  },
];

/** Helper to fetch a single market by slug */
export function getMarket(slug: string): Market | undefined {
  return markets.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
}