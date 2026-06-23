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
    country: "Switzerland",
    description:
      "Private banking & wealth management hub serving UHNW clients across Europe and beyond.",
    heroImage: "/images/markets/geneva.jpg",
    facts: [
      { label: "Focus", value: "Private Banking, Wealth Mgmt" },
      { label: "Region", value: "Lake Geneva / Romandy" },
    ],
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