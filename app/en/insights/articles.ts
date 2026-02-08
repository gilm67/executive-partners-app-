// app/en/insights/articles.ts

export type MarketCode =
  | "CH"
  | "UK"
  | "US"
  | "UAE"
  | "ASIA"
  | "EU"
  | "MEA"
  | "LATAM"
  | "CIS"
  | "CEE";

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
 */
export type InsightSubTheme = Pillar1SubTheme;

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
  // 2025
  // =========================
  {
    slug: "from-zurich-hong-kong-navigating-wealth-multipolar-world",
    title: "From Zurich to Hong Kong: Navigating Wealth in a Multipolar World",
    date: "2025-06-01",
    markets: ["CH", "UK", "US", "ASIA"],
    summary:
      "The global wealth management industry is undergoing a seismic shift, driven by technological innovation, regulatory pressures, and evolving client demands. This analysis examines the distinct strategies employed by leading financial hubs across Switzerland, the United States, Asia, MEA, and Latin America.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/from-zurich-hong-kong-navigating-wealth-multipolar-world-m-chalem--ezase",
    featured: true,
    engagementScore: 78,
  },
  {
    slug: "global-markets-outlook-2025-strategic-insights-private-bankers",
    title: "Global Markets Outlook 2025: Strategic Insights for Private Bankers",
    date: "2025-11-25",
    markets: ["CH", "UK", "US", "UAE", "ASIA"],
    summary:
      "The global economic landscape in 2025 presents a mosaic of opportunities and risks across regions. This data-driven analysis provides strategic insights for Swiss, European, and emerging market wealth managers.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/global-markets-outlook-2025-strategic-insights-gil-m-chalem--hjcre",
    featured: true,
    engagementScore: 75,
  },
  {
    slug: "turbulent-time-crisis-resilience-market-leadership-times",
    title:
      "Turbulent Time: Crisis Resilience and Market Leadership in Turbulent Times (Middle East Conflict)",
    date: "2025-12-01",
    markets: ["CH", "UK", "US", "ASIA"],
    summary:
      "The Swiss private banking sector demonstrates exceptional stability amid escalating global tensions, with industry assets under management reaching record levels and providing valuable lessons.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/turbulent-time-crisis-resilience-market-leadership-times-m-chalem--wu0fe",
    featured: true,
    engagementScore: 80,
  },
  {
    slug: "ubss-silent-earthquake-10000-more-jobs-set-disappear-2027",
    title: "UBS's Silent Earthquake: 10,000 More Jobs Set to Disappear by 2027",
    date: "2025-12-08",
    markets: ["CH", "UK", "US", "ASIA"],
    summary:
      "According to Swiss publication SonntagsBlick, UBS is planning to cut up to 10,000 additional jobs by 2027. This signals that the Credit Suisse integration is more challenging than publicly acknowledged.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/ubss-silent-earthquake-10000-more-jobs-set-disappear-2027-m-chalem--z1axe",
    featured: true,
    engagementScore: 85,
  },

  // =========================
  // 2024 — ARCHIVE (ALL MISSING ADDED + DATES CORRECT)
  // =========================
  {
    slug: "transforming-wealth-management-global-trends",
    title: "Transforming Wealth Management: Global Trends and Best Practices 🌍💼",
    date: "2024-12-20",
    markets: ["CH", "UK", "US", "ASIA"],
    summary:
      "The private banking and wealth management sector is at a turning point, driven by technological advancements, shifting client expectations, and regulatory complexity. With $72.6 trillion transferring from baby boomers to millennials by 2045, firms must adapt strategies to include broader service offerings and enhanced digital experiences.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/transforming-wealth-management-global-trends-best-gil-m-chalem--jkcqe",
    featured: false,
    engagementScore: 76,
  },
  {
    slug: "exodus-ultra-high-net-worth-individuals-from-uk",
    title:
      "The Exodus of Ultra High Net Worth and High Net Worth Individuals from the UK: Reasons and Destinations",
    date: "2024-12-01",
    markets: ["UK"],
    summary:
      "In recent years, the United Kingdom has been witnessing a significant exodus of ultra-high-net-worth individuals seeking greener pastures abroad, with profound implications for British wealth management firms.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/exodus-ultra-high-net-worth-individuals-from-uk-gil-m-chalem--dwize",
    featured: false,
    engagementScore: 63,
  },
  {
    slug: "swiss-european-banks-tighten-grip-cis-clients",
    title: "Swiss and European Banks Tighten Grip on CIS Clients Amid Sanctions Storm",
    date: "2024-11-25",
    markets: ["CH", "UK","CIS",],
    summary:
      "Swiss private banks and other European financial institutions are taking significant steps to address compliance and regulatory challenges with Commonwealth of Independent States region clients.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/swiss-european-banks-tighten-grip-cis-clients-amid-storm-m-chalem--age8e",
    featured: false,
    engagementScore: 61,
  },
  {
    slug: "swiss-financial-market-developments",
    title: "The Swiss Financial Market developments",
    date: "2024-11-18",
    markets: ["CH"],
    summary:
      "The Swiss financial market has seen significant developments in recent months, particularly in the areas of regulatory changes, technological innovation, and market consolidation affecting private banking.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/swiss-financial-market-developments-gil-m-chalem--kvone",
    featured: false,
    engagementScore: 58,
  },
  {
    slug: "should-private-banks-embrace-bitcoin-clients",
    title: "Should Private Banks Embrace Bitcoin for Their Clients?",
    date: "2024-11-10",
    markets: ["US", "UK", "CH"],
    summary:
      "Swiss private banks are facing a pivotal decision regarding Bitcoin and cryptocurrency exposure for their high-net-worth clients, balancing innovation with regulatory compliance.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/should-private-banks-embrace-bitcoin-clients-gil-m-chalem--k0kze",
    featured: false,
    engagementScore: 64,
  },
  {
    slug: "latam-private-banking-navigating-challenges",
    title: "LATAM Private Banking: Navigating Challenges and Opportunities in a $1.3T Market",
    date: "2024-11-02",
    markets: ["LATAM"],
    summary:
      "Swiss and US private banks face unique challenges and opportunities in covering the Latin American market, the third-largest globally for wealth management with substantial growth potential.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/latam-private-banking-navigating-challenges-13t-gil-m-chalem--g9jqe",
    featured: false,
    engagementScore: 71,
  },
  {
    slug: "latest-news-swiss-financial-market-focus-banks",
    title: "Latest News on the Swiss Financial Market: Focus on Swiss and International Banks",
    date: "2024-10-25",
    markets: ["CH"],
    summary:
      "Key findings on monetary policy, interest rates, and the SNB's strategic direction continue to reshape the competitive landscape for Swiss banks and wealth managers.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/latest-news-swiss-financial-market-focus-banks-gil-m-chalem--vgjve",
    featured: false,
    engagementScore: 62,
  },
  {
    slug: "unlocking-growth-cee-region-untapped-potential",
    title: "Unlocking Growth: The CEE Region's Untapped Potential for Swiss and Global Private Banks",
    date: "2024-10-18",
    markets: ["CEE"],
    summary:
      "Central and Eastern Europe (CEE) has emerged as a region of increasing importance and opportunity for Swiss and global private banking institutions seeking growth and diversification.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/potential-central-eastern-europe-cee-swiss-private-banks-m-chalem--bpooe",
    featured: false,
    engagementScore: 67,
  },
  {
    slug: "why-apac-ultimate-private-banking-hotspot-2025",
    title: "Why APAC is the Ultimate Private Banking Hotspot for 2025",
    date: "2024-10-12",
    markets: ["ASIA"],
    summary:
      "Private bankers focusing on the Asia-Pacific market in 2025 are positioned for unprecedented growth and opportunity in emerging wealth segments with strong fundamentals.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/why-apac-ultimate-private-banking-hotspot-2025-gil-m-chalem--bkhce",
    featured: false,
    engagementScore: 74,
  },
  {
    slug: "rise-pigs-europes-economic-underdogs",
    title: "The Rise of the PIGS: Europe's Economic Underdogs Take Flight",
    date: "2024-10-05",
    markets: ["EU"],
    summary:
      "Once whispered in hushed tones, the PIGS acronym—Portugal, Italy, Greece, Spain—now represents Europe's emerging economic success stories with implications for wealth management.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/rise-pigs-europes-economic-underdogs-take-flight-gil-m-chalem--1pyme",
    featured: false,
    engagementScore: 66,
  },
  {
    slug: "saudi-arabias-economic-landscape-opportunities",
    title: "Saudi Arabia's Economic Landscape and Opportunities for Private Banking",
    date: "2024-09-28",
    markets: ["MEA"],
    summary:
      "Saudi Arabia is undergoing significant economic transformation driven by its Vision 2030 initiative, creating new opportunities and challenges for private banking firms.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/saudi-arabias-economic-landscape-opportunities-gil-m-chalem--6c2qe",
    featured: false,
    engagementScore: 68,
  },
  {
    slug: "battle-gulf-giants-saudi-arabias-vision-2030",
    title:
      "The Battle of the Gulf Giants: Saudi Arabia's Vision 2030 vs. Dubai's Established Dominance",
    date: "2024-09-20",
    markets: ["UAE"],
    summary:
      "In the heart of the Middle East, a titanic struggle for economic supremacy is unfolding between Saudi Arabia and Dubai for private banking and wealth management dominance.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/battle-gulf-giants-saudi-arabias-vision-2030-vs-gil-m-chalem--1kvee",
    featured: false,
    engagementScore: 75,
  },
  {
    slug: "swiss-private-banking-shake-up-mega-mergers",
    title: "Swiss Private Banking Shake-Up: The Mega Mergers Redefining an Iconic Industry",
    date: "2024-09-12",
    markets: ["CH"],
    summary:
      "Over the past decade, the Swiss financial landscape has witnessed significant consolidation, particularly within its esteemed private banking sector with major implications.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/swiss-private-banking-shake-up-mega-mergers-iconic-gil-m-chalem--etbme",
    featured: false,
    engagementScore: 69,
  },
  {
    slug: "traditional-private-banks-vs-family-offices",
    title: "Traditional Private Banks vs. Family Offices",
    date: "2024-09-05",
    markets: ["CH", "UK", "US"],
    summary:
      "Switzerland has long been a global hub for wealth management. Compare the differences and strategic advantages of traditional private banks versus emerging family office models.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/traditional-private-banks-vs-family-offices-gil-m-chalem--xkwxe",
    featured: false,
    engagementScore: 77,
  },
  {
    slug: "how-global-economic-shifts-reshape-high-net-worth",
    title: "How Global Economic Shifts Reshape High-Net-Worth Portfolios",
    date: "2024-08-28",
    markets: ["US", "UK", "CH", "ASIA"],
    summary:
      "As we approach 2025, high-net-worth individuals face an increasingly complex global economic landscape that directly influences their investment strategies and portfolio decisions.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/how-global-economic-shifts-reshape-high-net-worth-gil-m-chalem--uyl5e",
    featured: false,
    engagementScore: 73,
  },
  {
    slug: "changing-face-swiss-private-banking",
    title: "The Changing Face of Swiss Private Banking",
    date: "2024-08-20",
    markets: ["CH"],
    summary:
      "Switzerland's private banking sector, long renowned for expertise in wealth management, is undergoing significant transformation in response to digital disruption and regulatory changes.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/changing-face-swiss-private-banking-gil-m-chalem--thxhe",
    featured: false,
    engagementScore: 71,
    pillar: "P1",
    subTheme: "ROAPlatform",
    keywords: [
      "Swiss private banking transformation",
      "wealth management pressure",
      "compliance costs",
      "platform dependency",
    ],
  },
  {
    slug: "ultimate-guide-interview-preparation-recruiters",
    title: "The Ultimate Guide to Interview Preparation: A Recruiter's Insider Perspective",
    date: "2024-08-12",
    markets: ["CH", "UK", "US"],
    summary:
      "As a seasoned recruiter, discover the insider perspective on how to prepare for banking and wealth management interviews to significantly improve your chances of success.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/ultimate-guide-interview-preparation-recruiters-gil-m-chalem--ew6pe",
    featured: false,
    engagementScore: 74,
  },
  {
    slug: "whale-vs-retail-investor-behavior-decoding-market",
    title: "Whale vs. Retail Investor Behavior: Decoding Market Dynamics in Bitcoin Investments",
    date: "2024-08-05",
    markets: ["US", "UK", "ASIA"],
    summary:
      "The cryptocurrency market operates as a complex ecosystem where institutional whales and retail investors play distinct yet interconnected roles in market dynamics.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/whale-vs-retail-investor-behavior-decoding-market-gil-m-chalem--andie",
    featured: false,
    engagementScore: 70,
  },
  {
    slug: "navigating-trumps-economic-storm-private-banks",
    title:
      "Navigating Trump's Economic Storm: How Private Banks and Their Clients Can Secure Assets in 2025",
    date: "2024-07-28",
    markets: ["US", "UK", "CH"],
    summary:
      "The recent blitz of tariffs, deregulatory actions, and erratic policy shifts requires private banks to develop new strategies for protecting and growing client assets.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/navigating-trumps-economic-storm-how-private-banks-can-gil-m-chalem--9q2de",
    featured: false,
    engagementScore: 88,
  },
  {
    slug: "ubs-switzerlands-banking-giant-transformation",
    title: "UBS: Switzerland's Banking Giant in Transformation",
    date: "2024-07-20",
    markets: ["CH", "UK", "US"],
    summary:
      "UBS's bold acquisition of Credit Suisse in 2023 has captured the industry's attention. This analysis explores the transformation and integration challenges ahead for the combined entity.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/ubs-switzerlands-banking-giant-transformation-gil-m-chalem--fynde",
    featured: false,
    engagementScore: 82,
  },
  {
    slug: "how-build-billion-dollar-client-portfolio-banking",
    title:
      "How to Build a Billion-Dollar Client Portfolio in International Banking: Lessons from a Top Relationship Manager",
    date: "2024-07-12",
    markets: ["US", "UK", "CH"],
    summary:
      "In international private banking, only 12% of relationship managers consistently grow their AUM during geopolitical crises. Learn the strategies that differentiate these top performers.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/how-build-billion-dollar-client-portfolio-banking-from-gil-m-chalem--uazye",
    featured: false,
    engagementScore: 68,
  },
  {
    slug: "efg-bank-switzerland-pioneering-private-banking",
    title:
      "EFG Bank Switzerland: Pioneering Private Banking with Entrepreneurial Agility and Strategic Mastery",
    date: "2024-07-05",
    markets: ["CH"],
    summary:
      "EFG Bank Switzerland has cemented its position as a cornerstone of global wealth management through entrepreneurial agility, strategic vision, and client-centric innovation.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/efg-bank-switzerland-pioneering-private-banking-gil-m-chalem--tknge",
    featured: false,
    engagementScore: 72,
  },
] as const;