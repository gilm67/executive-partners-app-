export type LinkedInArticle = {
  dateISO: string; // YYYY-MM-DD
  title: string;
  summary: string;
  url: string;
  tags?: string[];
};

export const linkedInArticles: LinkedInArticle[] = [
  /* =========================
     JANUARY 2026 (NEW)
  ========================= */

  {
    dateISO: "2026-01-14",
    title: "Bonus Season Intelligence: Global Compensation Guide 2025",
    summary:
      "A global, fact-checked guide to bonus season mechanics across Switzerland, London, New York, Dubai, and Asia — including payout timing, leverage windows, and how senior private bankers should position themselves for 2025–2026.",
    url: "https://www.linkedin.com/pulse/bonus-season-intelligence-global-compensation-guide-2025-m-chalem--widde/",
    tags: ["Compensation", "Bonus Season", "Private Banking", "Global Markets"],
  },

  {
    dateISO: "2026-01-13",
    title: "Swiss Private Banking Compensation Blueprint 2025",
    summary:
      "A definitive breakdown of Swiss private banking compensation structures: base salaries, bonus mechanics, portability leverage, and why Switzerland remains structurally different from London, Dubai, and the US.",
    url: "https://www.linkedin.com/pulse/swiss-private-banking-compensation-blueprint-2025-gil-m-chalem--dhvnf/",
    tags: ["Switzerland", "Compensation", "Private Banking", "Recruitment"],
  },

  /* =========================
     DECEMBER 2025
  ========================= */

  {
    dateISO: "2025-12-30",
    title:
      "Billionaire Ambitions 2025: What UBS’s New Report Reveals About UHNW Migration and Portfolio Strategy",
    summary:
      "UBS’s Billionaire Ambitions 2025 highlights record global wealth, accelerating inheritance, and what it means for private banks: UHNW mobility, diversification into alternatives, and next-generation advisory priorities.",
    url: "https://www.linkedin.com/pulse/billionaire-ambitions-2025-what-ubss-new-report-uhnw-gil-m-chalem--nelle/",
    tags: ["UBS", "UHNW", "Wealth Management", "Switzerland", "Mobility"],
  },

  {
    dateISO: "2025-12-22",
    title: "Final Chapter of 2025: UBS at a Crossroads — Swiss Banking Faces…",
    summary:
      "Key signals shaping Swiss private banking into 2026: strategy, profitability, talent pressure, and what it means for client coverage.",
    url: "https://www.linkedin.com/pulse/final-chapter-2025-ubs-crossroads-swiss-banking-faces-gil-m-chalem--lj27e/",
    tags: ["Switzerland", "UBS", "Private Banking"],
  },

  {
    dateISO: "2025-12-15",
    title: "Swiss Banking’s Pivotal Week: UBS Hits a 17-Year High While…",
    summary:
      "A snapshot week in Swiss banking: markets, positioning, leadership moves, and implications for wealth management hiring momentum.",
    url: "https://www.linkedin.com/pulse/swiss-bankings-pivotal-week-ubs-hits-17-year-high-while-m-chalem--jmzre/",
    tags: ["Switzerland", "Markets", "Wealth Management"],
  },
];

/**
 * Always returns the list sorted newest → oldest by dateISO.
 * Centralised guardrail so ordering never breaks again.
 */
export function getLinkedInArticlesSorted(): LinkedInArticle[] {
  return [...linkedInArticles].sort((a, b) =>
    b.dateISO.localeCompare(a.dateISO)
  );
}