export type Market = {
  slug: string;
  title: string;
  country: string;
  description?: string;
  heroImage?: string;
  facts?: { label: string; value: string }[];
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
    country: "Switzerland",
    description:
      "Switzerland’s largest financial center with strong asset management and PB franchises.",
    heroImage: "/images/markets/zurich.jpg",
    facts: [
      { label: "Focus", value: "PB, AM, Family Offices" },
      { label: "Region", value: "German-speaking CH" },
    ],
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