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
  },
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
  },
  {
    slug: "private-bankers-how-choose-right-institution-career",
    title:
      "Private Bankers: How to Choose the Right Institution for Your Career",
    date: "2025-09-12",
    markets: ["CH", "UK", "US"],
    summary:
      "Selecting the right financial institution is one of the most crucial decisions a private banker will make. Explore the key factors in making this choice.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/private-bankers-how-choose-right-institution-your-gil-m-chalem--suqfe/",
    featured: false,
    engagementScore: 79,
  },
  {
    slug: "great-wealth-transfer-adapting-next-generations",
    title: "The Great Wealth Transfer: Adapting to the Next Generation's Needs",
    date: "2025-09-05",
    markets: ["CH", "UK", "US", "UAE"],
    summary:
      "The biggest transfer of wealth in history is happening now, with around $72 trillion expected to change hands globally by 2045. Are you prepared?",
    linkedinUrl:
      "https://www.linkedin.com/pulse/great-wealth-transfer-adapting-next-generations-needs-gil-m-chalem--ligae/",
    featured: false,
    engagementScore: 83,
  },
  {
    slug: "how-global-economic-shifts-reshape-high-net-worth",
    title: "How Global Economic Shifts Reshape High-Net-Worth Portfolios",
    date: "2025-08-28",
    markets: ["US", "UK", "CH", "ASIA"],
    summary:
      "As we approach 2025, high-net-worth individuals face an increasingly complex global economic landscape that directly influences their investment strategies.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/how-global-economic-shifts-reshape-high-net-worth-gil-m-chalem--uyl5e/",
    featured: false,
    engagementScore: 73,
  },
  {
    slug: "traditional-private-banks-vs-family-offices",
    title: "Traditional Private Banks vs. Family Offices",
    date: "2025-08-20",
    markets: ["CH", "UK", "US"],
    summary:
      "Switzerland has long been a global hub for wealth management. Compare the differences between traditional private banks and emerging family office models.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/traditional-private-banks-vs-family-offices-gil-m-chalem--xkwxe/",
    featured: false,
    engagementScore: 77,
  },
  {
    slug: "swiss-private-banking-shake-up-mega-mergers",
    title:
      "Swiss Private Banking Shake-Up: The Mega Mergers Redefining an Iconic Industry",
    date: "2025-08-12",
    markets: ["CH"],
    summary:
      "Over the past decade, the Swiss financial landscape has witnessed significant consolidation, particularly within its esteemed private banking sector.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/swiss-private-banking-shake-up-mega-mergers-iconic-gil-m-chalem--etbme/",
    featured: false,
    engagementScore: 69,
  },
  {
    slug: "battle-gulf-giants-saudi-arabias-vision-2030",
    title:
      "The Battle of the Gulf Giants: Saudi Arabia's Vision 2030 vs. Dubai's Established Dominance",
    date: "2025-08-05",
    markets: ["UAE"],
    summary:
      "In the heart of the Middle East, a titanic struggle for economic supremacy is unfolding between Saudi Arabia and Dubai for private banking dominance.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/battle-gulf-giants-saudi-arabias-vision-2030-vs-gil-m-chalem--1kvee/",
    featured: false,
    engagementScore: 75,
  },
  {
    slug: "saudi-arabias-economic-landscape-opportunities",
    title:
      "Saudi Arabia's Economic Landscape and Opportunities for Private Banking",
    date: "2025-07-28",
    markets: ["UAE"],
    summary:
      "Saudi Arabia is undergoing significant economic transformation driven by its Vision 2030 initiative, creating new opportunities for private banking firms.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/saudi-arabias-economic-landscape-opportunities-gil-m-chalem--6c2qe/",
    featured: false,
    engagementScore: 68,
  },
  {
    slug: "rise-pigs-europes-economic-underdogs",
    title: "The Rise of the PIGS: Europe's Economic Underdogs Take Flight",
    date: "2025-07-20",
    markets: ["UK"],
    summary:
      "Once whispered in hushed tones, the PIGS acronym—Portugal, Italy, Greece, Spain—now represents Europe's emerging economic success stories.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/rise-pigs-europes-economic-underdogs-take-flight-gil-m-chalem--1pyme/",
    featured: false,
    engagementScore: 66,
  },
  {
    slug: "nri-gold-rush-your-2025-private-banking-playbook",
    title: "The NRI Gold Rush: Your 2025 Private Banking Playbook",
    date: "2025-07-12",
    markets: ["ASIA"],
    summary:
      "The Non-Resident Indian (NRI) market is one of the most dynamic segments in global wealth management, offering substantial growth opportunities.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/nri-gold-rush-your-2025-private-banking-playbook-gil-m-chalem--0zyfe/",
    featured: false,
    engagementScore: 72,
  },
  {
    slug: "crisis-opportunity-decoding-ubs-credit-suisse",
    title: "Crisis to Opportunity: Decoding the UBS-Credit Suisse Merger",
    date: "2025-07-05",
    markets: ["CH", "UK", "US"],
    summary:
      "The acquisition of Credit Suisse by UBS in 2023 has set in motion a seismic shift in the Swiss banking and global wealth management landscape.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/crisis-opportunity-decoding-ubs-credit-suisse-merger-gil-m-chalem--f73je/",
    featured: false,
    engagementScore: 70,
  },
  {
    slug: "latest-news-swiss-financial-market-professional",
    title:
      "Latest News on the Swiss Financial Market: A Professional Perspective for Private Bankers",
    date: "2025-06-28",
    markets: ["CH"],
    summary:
      "Economic Outlook 2025 highlights steady growth projections for the Swiss economy at 1.4%, with important implications for private banking institutions.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/latest-news-swiss-financial-market-professional-gil-m-chalem--tk3ge/",
    featured: false,
    engagementScore: 60,
  },
  {
    slug: "germanys-economic-outlook-private-banking-2025",
    title: "Germany's Economic Outlook and Private Banking Opportunities in 2025",
    date: "2025-06-20",
    markets: ["UK"],
    summary:
      "Germany, the economic powerhouse of Europe, is navigating complex market conditions with significant implications for private banking operations.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/germanys-economic-outlook-private-banking-2025-gil-m-chalem--3pbze/",
    featured: false,
    engagementScore: 65,
  },
  {
    slug: "why-apac-ultimate-private-banking-hotspot-2025",
    title: "Why APAC is the Ultimate Private Banking Hotspot for 2025",
    date: "2025-06-12",
    markets: ["ASIA"],
    summary:
      "Private bankers focusing on the Asia-Pacific market in 2025 are positioned for unprecedented growth and opportunity in emerging wealth segments.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/why-apac-ultimate-private-banking-hotspot-2025-gil-m-chalem--bkhce/",
    featured: false,
    engagementScore: 74,
  },
  {
    slug: "unlocking-growth-cee-region-untapped-potential-swiss-banks",
    title:
      "Unlocking Growth: The CEE Region's Untapped Potential for Swiss and Global Private Banks",
    date: "2025-06-05",
    markets: ["UK"],
    summary:
      "Central and Eastern Europe (CEE) has emerged as a region of increasing importance and opportunity for Swiss and global private banking institutions.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/potential-central-eastern-europe-cee-swiss-private-banks-m-chalem--bpooe/",
    featured: false,
    engagementScore: 67,
  },
  {
    slug: "latest-news-swiss-financial-market-focus-banks",
    title:
      "Latest News on the Swiss Financial Market: Focus on Swiss and International Banks",
    date: "2025-05-28",
    markets: ["CH"],
    summary:
      "Key findings on monetary policy, interest rates, and the SNB's strategic direction continue to reshape the competitive landscape for Swiss banks.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/latest-news-swiss-financial-market-focus-banks-gil-m-chalem--vgjve/",
    featured: false,
    engagementScore: 62,
  },
  {
    slug: "latam-private-banking-navigating-challenges-opportunities",
    title:
      "LATAM Private Banking: Navigating Challenges and Opportunities in a $1.3T Market",
    date: "2025-05-20",
    markets: ["LATAM", "US"],
    summary:
      "Swiss and US private banks face unique challenges and opportunities in covering the Latin American market, the third-largest globally for wealth.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/latam-private-banking-navigating-challenges-13t-gil-m-chalem--g9jqe/",
    featured: false,
    engagementScore: 71,
  },
  {
    slug: "dubai-rising-star-private-banking-wealth",
    title: "Dubai: The Rising Star of Private Banking and Wealth Management",
    date: "2025-05-12",
    markets: ["UAE"],
    summary:
      "In recent years, Dubai has emerged as a formidable competitor to traditional wealth management hubs like Zurich and London.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/dubai-rising-star-private-banking-wealth-management-gil-m-chalem--ag9xe/",
    featured: false,
    engagementScore: 81,
  },
  {
    slug: "should-private-banks-embrace-bitcoin-clients",
    title: "Should Private Banks Embrace Bitcoin for Their Clients?",
    date: "2025-05-05",
    markets: ["US", "UK", "CH"],
    summary:
      "Swiss private banks are facing a pivotal decision regarding Bitcoin and cryptocurrency exposure for their high-net-worth clients.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/should-private-banks-embrace-bitcoin-clients-gil-m-chalem--k0kze/",
    featured: false,
    engagementScore: 64,
  },
  {
    slug: "swiss-financial-market-developments",
    title: "The Swiss Financial market developments",
    date: "2025-04-28",
    markets: ["CH"],
    summary:
      "Recent developments in the Swiss financial market continue to shape the strategic direction of private banking institutions across all sectors.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/swiss-financial-market-developments-gil-m-chalem--kvone/",
    featured: false,
    engagementScore: 58,
  },
  {
    slug: "swiss-european-banks-tighten-grip-cis-clients",
    title:
      "Swiss and European Banks Tighten Grip on CIS Clients Amid Sanctions Storm",
    date: "2025-04-20",
    markets: ["CH", "UK"],
    summary:
      "Swiss private banks and European financial institutions are taking significant steps to address compliance and regulatory challenges with CIS clients.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/swiss-european-banks-tighten-grip-cis-clients-amid-storm-m-chalem--age8e/",
    featured: false,
    engagementScore: 61,
  },
  {
    slug: "exodus-ultra-high-net-worth-individuals-uk",
    title:
      "The Exodus of Ultra High Net Worth and High Net Worth Individuals from the UK: Reasons and Destinations",
    date: "2025-04-12",
    markets: ["UK"],
    summary:
      "The United Kingdom has been witnessing a significant exodus of ultra-high-net-worth individuals seeking opportunities in other jurisdictions.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/exodus-ultra-high-net-worth-individuals-from-uk-gil-m-chalem--dwize/",
    featured: false,
    engagementScore: 63,
  },
  {
    slug: "transforming-wealth-management-global-trends",
    title: "Transforming Wealth Management: Global Trends and Best Practices",
    date: "2025-04-05",
    markets: ["CH", "UK", "US", "ASIA"],
    summary:
      "The private banking and wealth management sector is at a turning point, driven by technological advancements and shifting client expectations worldwide.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/transforming-wealth-management-global-trends-best-gil-m-chalem--jkcqe/",
    featured: false,
    engagementScore: 76,
  },
  {
    slug: "antipodes-upheaval",
    title: "Antipodes of upheaval",
    date: "2025-03-28",
    markets: ["ASIA"],
    summary:
      "Over the past ten years, two managers have made a significant contribution to market dynamics in the Asia-Pacific region with major implications.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/antipodes-upheaval-gil-m-chalem-/",
    featured: false,
    engagementScore: 59,
  },

  // =========================
  // 2024 — ARCHIVE (add below)
  // =========================
  // Add your 2024 entries here (featured: false)
] as const;