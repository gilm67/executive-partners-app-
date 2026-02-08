// app/en/insights/articles.ts

export type MarketCode =
  | "CH"
  | "UK"
  | "US"
  | "UAE"
  | "ASIA"
  | "EU"
  | "MEA"
  | "LATAM";

/**
 * Content strategy taxonomy
 */
export type PillarCode = "P1" | "P2" | "P3" | "P4";

/**
 * Pillar I — Private Banking Strategy & Power Structures
 * Sub-themes:
 * - Positioning: who is winning/losing & why (banks, competitive moves)
 * - ScaleVsBoutique: economics of scale vs boutique models
 * - ROAPlatform: ROA pressure, platform dependency, cost of compliance
 * - M&ARestructuring: M&A, integration failures, silent restructurings
 */
export type Pillar1SubTheme =
  | "Positioning"
  | "ScaleVsBoutique"
  | "ROAPlatform"
  | "M&ARestructuring";

/**
 * ✅ Extensible subTheme union
 * When you define P2/P3/P4, add:
 * export type Pillar2SubTheme = ...
 * export type Pillar3SubTheme = ...
 * export type Pillar4SubTheme = ...
 * and extend the union below.
 */
export type InsightSubTheme = Pillar1SubTheme;
// Later:
// export type InsightSubTheme = Pillar1SubTheme | Pillar2SubTheme | Pillar3SubTheme | Pillar4SubTheme;

export type InsightArticle = {
  slug: string;
  title: string;
  date: string; // ISO: YYYY-MM-DD
  markets: readonly MarketCode[];
  summary: string;
  linkedinUrl: string;

  /**
   * Display logic
   */
  featured?: boolean; // Homepage / Insights landing
  engagementScore?: number; // Used for "Popular Insights"

  /**
   * ✅ Content taxonomy (optional but recommended)
   */
  pillar?: PillarCode;
  subTheme?: InsightSubTheme;
  keywords?: readonly string[];
};

/**
 * 🔹 Insights single source of truth
 * Rules:
 * - featured === true → appears on /insights
 * - featured !== true → goes to Archive automatically
 * - engagementScore drives "Popular"
 */
export const INSIGHTS: readonly InsightArticle[] = [
  // =========================
  // 2026 — FEATURED
  // =========================
  {
    slug: "investment-advisor-replacing-rm",
    title:
      "The Investment Advisor Is Quietly Replacing the Relationship Manager — And Most Banks Are Not Ready",
    date: "2026-02-03",
    markets: ["CH", "UK", "US", "UAE", "ASIA"],
    summary:
      "Private banking is shifting: portfolios and performance are now the centre of gravity. Investment Advisors are increasingly driving client retention, while many RM models remain misaligned with what clients value most.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/investment-advisor-quietly-replacing-relationship-gil-m-chalem--rdtoe/",
    featured: true,
    engagementScore: 92,

    // ✅ Pillar I
    pillar: "P1",
    subTheme: "ROAPlatform",
    keywords: [
      "private banking strategy",
      "investment advisor vs relationship manager",
      "wealth management operating model",
      "ROA pressure",
    ],
  },
  {
    slug: "family-office-revolution",
    title:
      "The Family Office Revolution: From Privilege to Power — And the Reckoning That Comes With It",
    date: "2026-01-27",
    markets: ["CH", "UK", "US", "UAE", "ASIA"],
    summary:
      "Family offices are no longer discreet satellites of private banks — they are becoming competing ecosystems. The growth is structural, and it is reshaping mandates, talent, and how UHNW clients allocate capital globally.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/family-office-revolution-from-privilege-power-comes-gil-m-chalem--1o96e/",
    featured: true,
    engagementScore: 80,

    // ✅ Pillar I
    pillar: "P1",
    subTheme: "ScaleVsBoutique",
    keywords: [
      "family office vs private bank",
      "wealth management competition",
      "UHNW ecosystem",
      "Swiss private banking strategy",
    ],
  },
  {
    slug: "ubs-unbeatable",
    title: "UBS Just Became Unbeatable",
    date: "2026-01-20",
    markets: ["CH", "UK", "US", "UAE", "ASIA"],
    summary:
      "Scale, capital, and platform depth are redefining competitive advantage. UBS is consolidating a position that changes hiring patterns, client expectations, and the strategic options available to other private banking players.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/ubs-just-became-unbeatable-gil-m-chalem--pchae/",
    featured: true,
    engagementScore: 74,

    // ✅ Pillar I
    pillar: "P1",
    subTheme: "Positioning",
    keywords: [
      "UBS private banking future",
      "Swiss private banking strategy",
      "wealth management consolidation",
      "platform advantage",
    ],
  },

  // =========================
  // 2025 — ARCHIVE (featured: false)
  // =========================
  {
    slug: "ubss-silent-earthquake-10000-more-jobs-set-disappear-2027",
    title: "UBS's Silent Earthquake: 10,000 More Jobs Set to Disappear by 2027",
    date: "2025-12-08",
    markets: ["CH", "UK", "US", "ASIA"],
    summary:
      "According to Swiss publication SonntagsBlick, UBS is planning to cut up to 10,000 additional jobs by 2027. This signals that the Credit Suisse integration is more challenging than publicly acknowledged.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/ubss-silent-earthquake-10000-more-jobs-set-disappear-2027-m-chalem--z1axe/",
    featured: false,
    engagementScore: 85,

    // ✅ Pillar I
    pillar: "P1",
    subTheme: "M&ARestructuring",
    keywords: [
      "UBS Credit Suisse integration",
      "Swiss banking restructuring",
      "wealth management layoffs",
      "bank integration risk",
    ],
  },
  {
    slug: "turbulent-time-crisis-resilience-market-leadership-times",
    title:
      "Turbulent Time: Crisis Resilience and Market Leadership in Turbulent Times (Middle East Conflict)",
    date: "2025-12-01",
    markets: ["CH", "UK", "US", "ASIA"],
    summary:
      "The Swiss private banking sector demonstrates exceptional stability amid escalating global tensions, with industry assets under management reaching record levels.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/turbulent-time-crisis-resilience-market-leadership-times-m-chalem--wu0fe/",
    featured: false,
    engagementScore: 80,

    // ✅ Pillar I
    pillar: "P1",
    subTheme: "Positioning",
    keywords: [
      "Swiss private banking resilience",
      "wealth management during crisis",
      "bank strategy geopolitical risk",
    ],
  },
  {
    slug: "global-markets-outlook-2025-strategic-insights-private-bankers",
    title: "Global Markets Outlook 2025: Strategic Insights for Private Bankers",
    date: "2025-11-25",
    markets: ["CH", "UK", "US", "UAE", "ASIA"],
    summary:
      "The global economic landscape in 2025 presents a mosaic of opportunities and risks across regions, with data-driven analysis for Swiss, European, and emerging markets.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/global-markets-outlook-2025-strategic-insights-gil-m-chalem--hjcre/",
    featured: false,
    engagementScore: 75,

    // ✅ Pillar I (macro context influencing strategy)
    pillar: "P1",
    subTheme: "Positioning",
    keywords: [
      "wealth management outlook 2025",
      "private banking strategy",
      "global markets for private bankers",
    ],
  },
  {
    slug: "from-zurich-hong-kong-navigating-wealth-multipolar-world",
    title: "From Zurich to Hong Kong: Navigating Wealth in a Multipolar World",
    date: "2025-11-18",
    markets: ["CH", "UK", "US", "ASIA"],
    summary:
      "The global wealth management industry is undergoing a seismic shift, driven by technological innovation, regulatory pressures, and evolving client demographics.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/from-zurich-hong-kong-navigating-wealth-multipolar-world-m-chalem--ezase/",
    featured: false,
    engagementScore: 78,

    // ✅ Pillar I
    pillar: "P1",
    subTheme: "Positioning",
    keywords: [
      "global wealth management shifts",
      "private banking strategy",
      "multipolar world wealth",
    ],
  },
  {
    slug: "efg-bank-switzerland-pioneering-private-banking",
    title:
      "EFG Bank Switzerland: Pioneering Private Banking with Entrepreneurial Agility and Strategic Mastery",
    date: "2025-11-10",
    markets: ["CH"],
    summary:
      "EFG Bank Switzerland has cemented its position as a cornerstone of global wealth management through entrepreneurial agility and strategic mastery.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/efg-bank-switzerland-pioneering-private-banking-gil-m-chalem--tknge/",
    featured: false,
    engagementScore: 72,

    // ✅ Pillar I
    pillar: "P1",
    subTheme: "Positioning",
    keywords: [
      "EFG private banking strategy",
      "Swiss private banking",
      "boutique bank positioning",
    ],
  },
  {
    slug: "how-build-billion-dollar-client-portfolio-banking",
    title:
      "How to Build a Billion-Dollar Client Portfolio in International Banking: Lessons from a Top Relationship Manager",
    date: "2025-11-05",
    markets: ["US", "UK", "CH"],
    summary:
      "In international private banking, only 12% of relationship managers consistently grow their AUM during geopolitical crises. Learn the strategies of top performers.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/how-build-billion-dollar-client-portfolio-banking-from-gil-m-chalem--uazye/",
    featured: false,
    engagementScore: 68,

    // (More “craft/production” than strategy; tag later to P2/P3 depending on your pillars)
  },
  {
    slug: "ubs-switzerlands-banking-giant-transformation",
    title: "UBS: Switzerland's Banking Giant in Transformation",
    date: "2025-10-28",
    markets: ["CH", "UK", "US"],
    summary:
      "UBS's bold acquisition of Credit Suisse in 2023 has captured the industry's attention. This analysis explores the transformation and integration challenges.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/ubs-switzerlands-banking-giant-transformation-gil-m-chalem--fynde/",
    featured: false,
    engagementScore: 82,

    // ✅ Pillar I
    pillar: "P1",
    subTheme: "M&ARestructuring",
    keywords: [
      "UBS Credit Suisse integration",
      "Swiss banking consolidation",
      "wealth management restructuring",
    ],
  },
  {
    slug: "navigating-trumps-economic-storm-private-banks",
    title:
      "Navigating Trump's Economic Storm: How Private Banks and Their Clients Can Secure Assets in 2025",
    date: "2025-10-20",
    markets: ["US", "UK", "CH"],
    summary:
      "The recent blitz of tariffs, deregulatory actions, and erratic policy shifts requires private banks to develop new strategies for protecting client assets.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/navigating-trumps-economic-storm-how-private-banks-can-gil-m-chalem--9q2de/",
    featured: false,
    engagementScore: 88,

    // ✅ Pillar I (macro → strategy/positioning)
    pillar: "P1",
    subTheme: "Positioning",
    keywords: [
      "private banking strategy US",
      "wealth management policy risk",
      "asset protection strategy",
    ],
  },
  {
    slug: "whale-vs-retail-investor-behavior-decoding-market",
    title:
      "Whale vs. Retail Investor Behavior: Decoding Market Dynamics in Bitcoin Investments",
    date: "2025-10-12",
    markets: ["US", "UK", "ASIA"],
    summary:
      "The cryptocurrency market operates as a complex ecosystem where institutional whales and retail investors play distinct yet interconnected roles in market dynamics.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/whale-vs-retail-investor-behavior-decoding-market-gil-m-chalem--andie/",
    featured: false,
    engagementScore: 70,

    // (Probably a different pillar later: investments/markets)
  },
  {
    slug: "ubs-credit-suisse-from-deal-century-high-stakes",
    title:
      'UBS and Credit Suisse: From "Deal of the Century" to High-Stakes Turbulence',
    date: "2025-10-05",
    markets: ["CH", "UK"],
    summary:
      "The March 2023 rescue of Credit Suisse by UBS—initially celebrated as a masterstroke—has evolved into a high-stakes integration challenge.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/ubs-credit-suisse-from-deal-century-high-stakes-gil-m-chalem--ilpfe/",
    featured: false,
    engagementScore: 76,

    // ✅ Pillar I
    pillar: "P1",
    subTheme: "M&ARestructuring",
    keywords: [
      "UBS Credit Suisse deal",
      "integration turbulence",
      "Swiss banking consolidation",
    ],
  },

  // ... (Keep the rest exactly as you have it)
  // You can tag progressively. Nothing breaks if pillar/subTheme/keywords are missing.

  {
    slug: "ultimate-guide-interview-preparation-recruiters",
    title:
      "The Ultimate Guide to Interview Preparation: A Recruiter's Insider Perspective",
    date: "2025-09-28",
    markets: ["CH", "UK", "US"],
    summary:
      "As a seasoned recruiter, discover the insider perspective on how to prepare for banking and wealth management interviews to stand out from other candidates.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/ultimate-guide-interview-preparation-recruiters-gil-m-chalem--ew6pe/",
    featured: false,
    engagementScore: 74,
  },
  {
    slug: "changing-face-swiss-private-banking",
    title: "The Changing Face of Swiss Private Banking",
    date: "2025-09-20",
    markets: ["CH"],
    summary:
      "Switzerland's private banking sector, long renowned for expertise in wealth management, is undergoing significant transformation in the digital age.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/changing-face-swiss-private-banking-gil-m-chalem--thxhe/",
    featured: false,
    engagementScore: 71,

    // ✅ Pillar I
    pillar: "P1",
    subTheme: "ROAPlatform",
    keywords: [
      "Swiss private banking transformation",
      "wealth management pressure",
      "compliance costs",
      "platform dependency",
    ],
  },

  // ...continue your list here unchanged...

  // =========================
  // 2024 — ARCHIVE (add below)
  // =========================
  // Add your 2024 entries here (featured: false)
] as const;