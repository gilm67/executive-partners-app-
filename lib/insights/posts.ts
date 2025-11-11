// lib/insights/posts.ts

export type Insight = {
  title: string;
  linkedin: string;
  date: string;
  excerpt: string;
  href: string;
  tag: "Article" | "Private Wealth Pulse";
};

// same slug logic everywhere
export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// your scraped LinkedIn data – embed it so Vercel always has it
const RAW: Array<{
  title: string;
  linkedin: string;
  date?: string;
  excerpt?: string;
}> = [
  {
    title:
      "Turbulent Time: Crisis Resilience and Market Leadership in Turbulent Times  (Middle East Conflict)",
    linkedin:
      "https://www.linkedin.com/pulse/turbulent-time-crisis-resilience-market-leadership-times-m-chalem--wu0fe?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "The Swiss private banking sector demonstrates exceptional stability amid escalating global tensions...",
  },
  {
    title: "Global Markets Outlook 2025: Strategic Insights for Private Bankers",
    linkedin:
      "https://www.linkedin.com/pulse/global-markets-outlook-2025-strategic-insights-gil-m-chalem--hjcre?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "2025-01-05",
    excerpt:
      "The global economic landscape in 2025 presents a mosaic of opportunities and risks...",
  },
  {
    title: "From Zurich to Hong Kong: Navigating Wealth in a Multipolar World",
    linkedin:
      "https://www.linkedin.com/pulse/from-zurich-hong-kong-navigating-wealth-multipolar-world-m-chalem--ezase?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "The global wealth management industry is undergoing a seismic shift...",
  },
  {
    title:
      "EFG Bank Switzerland: Pioneering Private Banking with Entrepreneurial Agility and Strategic Mastery",
    linkedin:
      "https://www.linkedin.com/pulse/efg-bank-switzerland-pioneering-private-banking-gil-m-chalem--tknge?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "EFG Bank Switzerland has cemented its position as a cornerstone of global wealth management...",
  },
  {
    title:
      "How to Build a Billion-Dollar Client Portfolio in International Banking: Lessons from a Top Relationship Manager",
    linkedin:
      "https://www.linkedin.com/pulse/how-build-billion-dollar-client-portfolio-banking-from-gil-m-chalem--uazye?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "In the high-stakes world of international private banking, only 12% of RMs consistently grow AUM...",
  },
  {
    title: "UBS: Switzerland’s Banking Giant in Transformation",
    linkedin:
      "https://www.linkedin.com/pulse/ubs-switzerlands-banking-giant-transformation-gil-m-chalem--fynde?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "UBS's acquisition of Credit Suisse in 2023 has become a major integration story...",
  },
  {
    title:
      "Navigating Trump’s Economic Storm: How Private Banks and Their Clients Can Secure Assets in 2025",
    linkedin:
      "https://www.linkedin.com/pulse/navigating-trumps-economic-storm-how-private-banks-can-gil-m-chalem--9q2de?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "Tariffs and policy shifts are creating volatility – private banks need playbooks...",
  },
  {
    title:
      "UBS and Credit Suisse: From “Deal of the Century” to High-Stakes Turbulence",
    linkedin:
      "https://www.linkedin.com/pulse/ubs-credit-suisse-from-deal-century-high-stakes-gil-m-chalem--ilpfe?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "The 2023 rescue of Credit Suisse by UBS has evolved into a complex saga...",
  },
  {
    title:
      "Dubai: The Rising Star of Private Banking and Wealth Management",
    linkedin:
      "https://www.linkedin.com/pulse/dubai-rising-star-private-banking-wealth-management-gil-m-chalem--ag9xe?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt: "Dubai has emerged as a formidable competitor to Switzerland...",
  },
  {
    title:
      "LATAM Private Banking: Navigating Challenges and Opportunities in a $1.3T Market",
    linkedin:
      "https://www.linkedin.com/pulse/latam-private-banking-navigating-challenges-13t-gil-m-chalem--g9jqe?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt:
      "Swiss and US private banks face unique challenges covering Brazil, Mexico, Argentina...",
  },
  // 👉 continue pasting the rest of your scraped items here in the same shape
];

// turn RAW into the shape the app expects
export function getAllInsights(): Insight[] {
  const seen = new Set<string>();

  return RAW.map((item) => {
    const title = item.title.trim();
    const href = "/insights/" + slugify(title);

    // dedupe on href
    if (seen.has(href)) return null;
    seen.add(href);

    return {
      title,
      linkedin: item.linkedin.trim(),
      date: item.date ? item.date.trim() : "",
      excerpt: item.excerpt ? item.excerpt.trim() : "",
      href,
      tag: "Article",
    } as Insight;
  }).filter(Boolean) as Insight[];
}

/**
 * Find one insight by slug, but be tolerant (LinkedIn titles can change).
 */
export function getInsightBySlug(slug: string): Insight | null {
  const all = getAllInsights();
  const norm = slug.toLowerCase();

  // exact
  const exact = all.find((x) => slugify(x.title) === norm);
  if (exact) return exact;

  // loose
  const loose = all.find((x) => slugify(x.title).startsWith(norm));
  return loose ?? null;
}