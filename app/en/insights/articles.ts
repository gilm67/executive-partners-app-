// app/en/insights/articles.ts

export type InsightArticle = {
  slug: string;
  title: string;
  date: string; // ISO format: YYYY-MM-DD
  markets: readonly string[];
  summary: string;
  linkedinUrl: string;
};

export const MARKET_LABELS: Record<string, string> = {
  CH: "Switzerland",
  UK: "United Kingdom",
  US: "United States",
  UAE: "Dubai / UAE",
  Asia: "Asia",
  SG: "Singapore",
  HK: "Hong Kong",
  LU: "Luxembourg",

  // Optional (ready when you need them)
  DE: "Germany",
  NL: "Netherlands",
  BENELUX: "Benelux",
  FR: "France",
  IT: "Italy",
  ES: "Spain",
  AT: "Austria",
  NORDICS: "Nordics",
  GR: "Greece",
  TURKEY: "Turkey",
  CEE: "Central & Eastern Europe",
  CIS: "CIS",
  MEA: "Middle East & Africa",
  SA: "Saudi Arabia",
  IL: "Israel",
  LATAM: "Latin America",
  BR: "Brazil",
  AR: "Argentina",
  CL: "Chile",
  CONOSUR: "Cono Sur",
  PA: "Panama",
  OTHER: "Other",
};

/**
 * INSIGHTS
 * Short-form editorial highlights hosted on Executive Partners,
 * with full articles published on LinkedIn.
 *
 * Ordering: most recent first
 */
export const INSIGHTS: readonly InsightArticle[] = [
  {
    slug: "investment-advisor-replacing-rm",
    title:
      "The Investment Advisor Is Quietly Replacing the Relationship Manager — And Most Banks Are Not Ready",
    date: "2026-02-03",
    markets: ["CH", "UK", "US", "UAE", "Asia"],
    summary:
      "Private banking is shifting: portfolios and performance are now the centre of gravity. Investment Advisors are increasingly driving client retention, while many RM models remain misaligned with what clients value most.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/investment-advisor-quietly-replacing-relationship-gil-m-chalem--rdtoe/",
  },
  {
    slug: "family-office-revolution",
    title:
      "The Family Office Revolution: From Privilege to Power — And the Reckoning That Comes With It",
    date: "2026-01-27",
    markets: ["CH", "UK", "US", "UAE", "Asia"],
    summary:
      "Family offices are no longer discreet satellites of private banks — they are becoming competing ecosystems. The growth is structural, and it is reshaping mandates, talent, and how UHNW clients allocate capital globally.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/family-office-revolution-from-privilege-power-comes-gil-m-chalem--1o96e/",
  },
  {
    slug: "ubs-unbeatable",
    title: "UBS Just Became Unbeatable",
    date: "2026-01-20",
    markets: ["CH", "UK", "US", "UAE", "Asia"],
    summary:
      "Scale, capital, and platform depth are redefining competitive advantage. UBS is consolidating a position that changes hiring patterns, client expectations, and the strategic options available to other private banking players.",
    linkedinUrl:
      "https://www.linkedin.com/pulse/ubs-just-became-unbeatable-gil-m-chalem--pchae/",
  },
];