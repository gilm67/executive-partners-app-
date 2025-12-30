export type LinkedInArticle = {
  dateISO: string; // YYYY-MM-DD
  title: string;
  summary: string;
  url: string;
  tags?: string[];
};

export const linkedInArticles: LinkedInArticle[] = [
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