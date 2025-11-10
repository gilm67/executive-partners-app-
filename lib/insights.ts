// lib/insights.ts
import fs from "fs";
import path from "path";

export type Insight = {
  title: string;
  linkedin: string;
  date?: string;
  excerpt?: string;
  href: string;
  tag: "Article" | "Private Wealth Pulse";
};

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Your scraped LinkedIn data as a FINAL fallback.
 * This is the JSON you pasted.
 */
const FALLBACK_RAW = [
  {
    title:
      "Turbulent Time: Crisis Resilience and Market Leadership in Turbulent Times  (Middle East Conflict)",
    linkedin:
      "https://www.linkedin.com/pulse/turbulent-time-crisis-resilience-market-leadership-times-m-chalem--wu0fe?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "The Swiss private banking sector demonstrates exceptional stability amid escalating global tensions, with industry assets under management reaching CHF 7.9 trillion as geopolitical risks drive record safe-haven flows . This week’s analysis reveals how Swiss institutions are navigating the most significant Middle East crisis in decades while maintaining robust growth and operational excellence in an increasingly volatile global environment.",
  },
  {
    title: "Global Markets Outlook 2025: Strategic Insights for Private Bankers",
    linkedin:
      "https://www.linkedin.com/pulse/global-markets-outlook-2025-strategic-insights-gil-m-chalem--hjcre?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "Global Markets Outlook 2025: Strategic Insights for Private Bankers",
    excerpt:
      "The global economic landscape in 2025 presents a mosaic of opportunities and risks across regions. Below is a data-driven analysis of Swiss, European, Asian, and US markets, with actionable strategies for private banking clients.",
  },
  {
    title: "From Zurich to Hong Kong: Navigating Wealth in a Multipolar World",
    linkedin:
      "https://www.linkedin.com/pulse/from-zurich-hong-kong-navigating-wealth-multipolar-world-m-chalem--ezase?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "The global wealth management industry is undergoing a seismic shift, driven by technological innovation, regulatory pressures, and evolving client demands. This analysis examines the distinct strategies employed by leading financial hubs Switzerland, the United States, Asia (Singapore/Hong Kong), the Middle East & Africa (Dubai/Saudi Arabia), and Latin America (Brazil/Argentina) highlighting their unique value propositions, operational challenges, and growth trajectories.",
  },
  {
    title:
      "EFG Bank Switzerland: Pioneering Private Banking with Entrepreneurial Agility and Strategic Mastery",
    linkedin:
      "https://www.linkedin.com/pulse/efg-bank-switzerland-pioneering-private-banking-gil-m-chalem--tknge?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "EFG Bank Switzerland, the Swiss subsidiary of EFG International AG, has cemented its position as a cornerstone of global wealth management through a potent combination of entrepreneurial verve, strategic acquisitions, and client-centric innovation. With CHF 165.5 billion in assets under management (AuM) by the end of 2024 and a record net profit of CHF 321.6 million (+6% year-on-year), EFG exemplifies how Swiss banking rigor can harmonize with global ambition.",
  },
  {
    title:
      "How to Build a Billion-Dollar Client Portfolio in International Banking: Lessons from a Top Relationship Manager",
    linkedin:
      "https://www.linkedin.com/pulse/how-build-billion-dollar-client-portfolio-banking-from-gil-m-chalem--uazye?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "In the high-stakes world of international private banking, only 12% of relationship managers consistently grow their AUM during geopolitical crises. Yet one Zurich-based banker has not only maintained but expanded a €1B portfolio through Russia’s invasion of Ukraine, sweeping sanctions regimes, and the largest banking merger in European history. What separates elite performers from the rest?",
  },
  {
    title: "UBS: Switzerland’s Banking Giant in Transformation",
    linkedin:
      "https://www.linkedin.com/pulse/ubs-switzerlands-banking-giant-transformation-gil-m-chalem--fynde?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "In the high-stakes world of global finance, few stories have captured the industry's attention like UBS's bold acquisition of Credit Suisse in 2023. What began as a rescue mission has evolved into one of the most impressive financial integration stories of our generation. As we approach mid-2025, it's time to examine how this Swiss banking giant has transformed the landscape of wealth management worldwide.",
  },
  {
    title:
      "Navigating Trump’s Economic Storm: How Private Banks and Their Clients Can Secure Assets in 2025",
    linkedin:
      "https://www.linkedin.com/pulse/navigating-trumps-economic-storm-how-private-banks-can-gil-m-chalem--9q2de?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "Navigating Trump’s Economic Storm: How Private Banks and Their Clients Can Secure Assets in 2025",
    excerpt:
      "The recent blitz of tariffs, deregulatory actions, and erratic policy shifts by the Trump administration has sent shockwaves through global financial markets, wiping trillions of dollars from stock values and creating unprecedented uncertainty. As private bankers and wealth managers, understanding these dynamics is crucial to safeguarding client assets and capitalizing on emerging opportunities. This analysis explores the multifaceted impact of Trump's economic decisions on private banking, strategic implications, and practical approaches to wealth preservation in this volatile environment.",
  },
  {
    title: "(3) LinkedIn",
    linkedin:
      "https://www.linkedin.com/pulse/whale-vs-retail-investor-behavior-decoding-market-gil-m-chalem--andie?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt: "",
  },
  {
    title:
      "UBS and Credit Suisse: From “Deal of the Century” to High-Stakes Turbulence",
    linkedin:
      "https://www.linkedin.com/pulse/ubs-credit-suisse-from-deal-century-high-stakes-gil-m-chalem--ilpfe?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "The March 2023 rescue of Credit Suisse by UBS—a merger initially celebrated as a masterstroke in stabilizing Switzerland’s financial sector—has evolved into a complex saga of regulatory brinkmanship, political tension, and strategic uncertainty.",
  },
  {
    title:
      "The Ultimate Guide to Interview Preparation: A Recruiter's Insider Perspective",
    linkedin:
      "https://www.linkedin.com/pulse/ultimate-guide-interview-preparation-recruiters-gil-m-chalem--ew6pe?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "As a seasoned recruiter who has interviewed countless candidates over the years, I can confidently say that preparation is the single most important factor that separates successful candidates from those who fall short. Interviewing for a new job naturally creates anxiety regardless of your experience level, but with the right preparation, you can transform that nervous energy into a compelling performance that showcases your true potential.",
  },
  {
    title: "The Changing Face of Swiss Private Banking",
    linkedin:
      "https://www.linkedin.com/pulse/changing-face-swiss-private-banking-gil-m-chalem--thxhe?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt: "",
  },
  {
    title:
      "Private Bankers: How to Choose the Right Institution for Your Career",
    linkedin:
      "https://www.linkedin.com/pulse/private-bankers-how-choose-right-institution-your-gil-m-chalem--suqfe?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt: "",
  },
  {
    title: "The Great Wealth Transfer: Adapting to the Next Generation’s Needs",
    linkedin:
      "https://www.linkedin.com/pulse/great-wealth-transfer-adapting-next-generations-needs-gil-m-chalem--ligae?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "The biggest transfer of wealth in history is happening now, with around $72 trillion expected to change hands globally by 2045. This isn’t just about passing on money—it’s about rethinking how wealth is managed, protected, and given a sense of purpose. The next generation, who grew up in a world of instant digital access, climate concerns, and social awareness, wants to actively manage their inheritance rather than just receive it. Private bankers, wealth managers, and family offices that don’t adapt could lose 70–90% of their clients to competitors. This article looks at the changing expectations of heirs and the practical steps financial institutions need to take to stay relevant.",
  },
  {
    title: "How Global Economic Shifts Reshape High-Net-Worth Portfolios",
    linkedin:
      "https://www.linkedin.com/pulse/how-global-economic-shifts-reshape-high-net-worth-gil-m-chalem--uyl5e?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt: "",
  },
  {
    title: "Traditional Private Banks vs. Family Offices",
    linkedin:
      "https://www.linkedin.com/pulse/traditional-private-banks-vs-family-offices-gil-m-chalem--xkwxe?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "Switzerland has long been a global hub for wealth management, renowned for its stability, privacy, and financial expertise. Historically dominated by private banks such as UBS, Pictet, Julius Baer and Lombard Odier, the industry is witnessing a significant shift with the rise of family offices.",
  },
  {
    title:
      "Swiss Private Banking Shake-Up: The Mega Mergers Redefining an Iconic Industry",
    linkedin:
      "https://www.linkedin.com/pulse/swiss-private-banking-shake-up-mega-mergers-iconic-gil-m-chalem--etbme?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "From 158 to 96 banks in 10 years in Switzerland, more than 50% of mergers and takeovers. How will change the industry of 2000 IAM companies 90%composed of less than 5 people? Whoever moves first will have more opportunities.",
    excerpt:
      "Over the past decade, the Swiss financial landscape has witnessed a significant consolidation, particularly within its esteemed private banking sector. This trend has been driven by a confluence of regulatory changes, economic pressures, and strategic realignments among financial institutions.",
  },
  {
    title:
      "The Battle of the Gulf Giants: Saudi Arabia's Vision 2030 vs. Dubai's Established Dominance",
    linkedin:
      "https://www.linkedin.com/pulse/battle-gulf-giants-saudi-arabias-vision-2030-vs-gil-m-chalem--1kvee?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "The Battle of the Gulf Giants: Saudi Arabia's Vision 2030 vs. Dubai's Established Dominance",
    excerpt: "",
  },
  {
    title: "Saudi Arabia's Economic Landscape and Opportunities for Private Banking",
    linkedin:
      "https://www.linkedin.com/pulse/saudi-arabias-economic-landscape-opportunities-gil-m-chalem--6c2qe?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "Saudi Arabia is undergoing a significant economic transformation, driven by its Vision 2030 initiative, which aims to diversify the economy beyond oil. This creates a fertile ground for foreign private banks to establish onshore operations, leveraging the Kingdom's growing wealth and financial sector reforms.",
  },
  {
    title: "The Rise of the PIGS: Europe's Economic Underdogs Take Flight",
    linkedin:
      "https://www.linkedin.com/pulse/rise-pigs-europes-economic-underdogs-take-flight-gil-m-chalem--1pyme?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "",
    excerpt:
      "Once upon a time, in the not-so-distant past, the acronym \"PIGS\" was whispered in hushed tones across European financial circles. Portugal, Italy, Greece, and Spain were the economic black sheep of the continent, struggling under the weight of debt, unemployment, and fiscal mismanagement. But as we stand in early 2025, a remarkable plot twist has unfolded in the European economic narrative.",
  },
  {
    title: "The NRI Gold Rush: Your 2025 Private Banking Playbook",
    linkedin:
      "https://www.linkedin.com/pulse/nri-gold-rush-your-2025-private-banking-playbook-gil-m-chalem--0zyfe?trackingId=BiFAgvqTQQq%2Boa0IzyTX0Q%3D%3D",
    date: "The NRI Gold Rush: Your 2025 Private Banking Playbook",
    excerpt:
      "The Non-Resident Indian (NRI) market is one of the most dynamic segments in global wealth management today. With over 30 million individuals spanning 200 countries, NRIs collectively command an economic influence that offers significant opportunities for private bankers. Let's dives into the key markets, wealth distribution, client expectations, and growth projections, and provide a comprehensive roadmap for financial professionals looking to excel in this domain.",
  },
  {
    title: "Crisis to Opportunity: Decoding the UBS-Credit Suisse Merger",
    linkedin:
      "https://www.linkedin.com/pulse/crisis-opportunity-decoding-ubs-credit-suisse-merger-gil-m-chalem--f73je?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt:
      "The acquisition of Credit Suisse by UBS in 2023 has set in motion a seismic shift in the Swiss banking landscape, presenting both challenges and opportunities for private bankers. In 2025, the integration process is entering a critical phase, with significant implications for employees and clients alike.",
  },
  {
    title:
      "Latest News on the Swiss Financial Market: A Professional Perspective for Private Bankers",
    linkedin:
      "https://www.linkedin.com/pulse/latest-news-swiss-financial-market-professional-gil-m-chalem--tk3ge?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt: "",
  },
  {
    title:
      "Germany's Economic Outlook and Private Banking Opportunities in 2025",
    linkedin:
      "https://www.linkedin.com/pulse/germanys-economic-outlook-private-banking-2025-gil-m-chalem--3pbze?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "Germany's Economic Outlook and Private Banking Opportunities in 2025",
    excerpt:
      "Germany, the economic powerhouse of Europe, is navigating a complex landscape as it steps into 2025. While facing challenges such as slow growth and rising unemployment, the private banking sector identifies untapped opportunities, particularly in intergenerational wealth transfer, succession planning, and the rising demand for alternative investments among High-Net-Worth Individuals (HNWIs) and Ultra-High-Net-Worth Individuals (UHNWIs).",
  },
  {
    title: "Why APAC is the Ultimate Private Banking Hotspot for 2025",
    linkedin:
      "https://www.linkedin.com/pulse/why-apac-ultimate-private-banking-hotspot-2025-gil-m-chalem--bkhce?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "Why APAC is the Ultimate Private Banking Hotspot for 2025",
    excerpt:
      "Private banker, focusing on the Asia-Pacific (APAC) market in 2025 is a strategic choice due to its robust economic growth, increasing wealth, and evolving financial landscape. Here’s a comprehensive analysis of why APAC is poised to be the most attractive market for private banking:",
  },
  {
    title:
      "Unlocking Growth: The CEE Region's Untapped Potential for Swiss and Global Private Banks",
    linkedin:
      "https://www.linkedin.com/pulse/potential-central-eastern-europe-cee-swiss-private-banks-m-chalem--bpooe?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt:
      "Central and Eastern Europe (CEE) has emerged as a region of increasing importance for private banking and wealth management. Comprising countries like Poland, Hungary, the Czech Republic, Slovakia, Romania, and the Baltic states, CEE offers a dynamic combination of economic growth, increasing wealth accumulation, and strategic geopolitical positioning. This article explores the potential of CEE markets for Swiss and international private banks, focusing on economic opportunities, cross-border challenges, and country-specific insights.",
  },
  {
    title:
      "Latest News on the Swiss Financial Market: Focus on Swiss and International Banks",
    linkedin:
      "https://www.linkedin.com/pulse/latest-news-swiss-financial-market-focus-banks-gil-m-chalem--vgjve?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt:
      "The Swiss National Bank (SNB) has implemented three rate cuts in 2024, shifting its monetary policy from restrictive to supportive. Further rate reductions are expected to bolster domestic economic growth and the local real estate market, benefiting private investors with lower variable mortgage rates. The SNB continues to navigate the balance between controlling inflation and supporting economic growth. Interest rates may remain relatively low, with adjustments dependent on global trends and domestic inflationary pressures.",
  },
  {
    title:
      "LATAM Private Banking: Navigating Challenges and Opportunities in a $1.3T Market",
    linkedin:
      "https://www.linkedin.com/pulse/latam-private-banking-navigating-challenges-13t-gil-m-chalem--g9jqe?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt:
      "Swiss and US private banks face unique challenges and opportunities in covering the Latin American (LATAM) markets, particularly in Brazil, Mexico , Argentina, Chile, and the Andean region. These markets present a significant growth potential but also come with distinct complexities.",
  },
  {
    title:
      "Dubai: The Rising Star of Private Banking and Wealth Management",
    linkedin:
      "https://www.linkedin.com/pulse/dubai-rising-star-private-banking-wealth-management-gil-m-chalem--ag9xe?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt:
      "In recent years, Dubai has emerged as a formidable competitor to traditional wealth management hubs like Switzerland, attracting both private bankers and high-net-worth individuals (HNWIs) and (UHNWIs) from around the globe. This shift is driven by a combination of factors that make Dubai an increasingly attractive destination for wealth preservation and growth.",
  },
  {
    title: "Should Private Banks Embrace Bitcoin for Their Clients?",
    linkedin:
      "https://www.linkedin.com/pulse/should-private-banks-embrace-bitcoin-clients-gil-m-chalem--k0kze?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt:
      "Swiss private banks are facing a pivotal decision regarding Bitcoin investments. While there are potential benefits, there are also significant risks to consider. Let's examine the pros and cons of Swiss private banks investing in Bitcoin, as well as compare their approach to that of private banks in the US and Europe.",
  },
  {
    title: "The Swiss Financial market developments",
    linkedin:
      "https://www.linkedin.com/pulse/swiss-financial-market-developments-gil-m-chalem--kvone?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt:
      "The Swiss financial market has seen significant developments in recent months, particularly in the areas of private banking, wealth management, and services for high-net-worth individuals (HNWIs) and ultra-high-net-worth individuals (UHNWIs). Here's an analysis of the latest trends and their implications for finance professionals:",
  },
  {
    title:
      "Swiss and European Banks Tighten Grip on CIS Clients Amid Sanctions Storm",
    linkedin:
      "https://www.linkedin.com/pulse/swiss-european-banks-tighten-grip-cis-clients-amid-storm-m-chalem--age8e?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt:
      "Swiss private banks and other European financial institutions are taking significant steps to address their relationships with clients from CIS countries, particularly Russia, in response to international sanctions and increased scrutiny. Here's an overview of the current situation and outlook:",
  },
  {
    title:
      "The Exodus of Ultra High Net Worth and High Net Worth Individuals from the UK: Reasons and Destinations",
    linkedin:
      "https://www.linkedin.com/pulse/exodus-ultra-high-net-worth-individuals-from-uk-gil-m-chalem--dwize?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt: "",
  },
  {
    title: "Transforming Wealth Management: Global Trends and Best Practices 🌍💼",
    linkedin:
      "https://www.linkedin.com/pulse/transforming-wealth-management-global-trends-best-gil-m-chalem--jkcqe?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt: "",
  },
  {
    title: "Antipodes of upheaval",
    linkedin:
      "https://www.linkedin.com/pulse/antipodes-upheaval-gil-m-chalem-?trackingId=cp5wjFhIRJ2Qed2dn6V1Mg%3D%3D",
    date: "",
    excerpt: "Antipodes of upheaval",
  },
];

function normalize(data: any[]): Insight[] {
  const cleaned = data
    .filter((item) => item && item.title && item.linkedin)
    .map((item) => {
      const title = String(item.title).trim();
      return {
        title,
        linkedin: String(item.linkedin).trim(),
        date: item.date ? String(item.date).trim() : "",
        excerpt: item.excerpt ? String(item.excerpt).trim() : "",
        href: "/insights/" + slugify(title),
        tag: "Article" as const,
      };
    });

  const seen = new Set<string>();
  const out: Insight[] = [];
  for (const it of cleaned) {
    if (seen.has(it.href)) continue;
    seen.add(it.href);
    out.push(it);
  }
  return out;
}

export async function getInsights(): Promise<Insight[]> {
  // 1) try remote file
  try {
    const base =
      process.env.NEXT_PUBLIC_SITE_URL || "https://www.execpartners.ch";
    const res = await fetch(
      `${base.replace(/\/$/, "")}/data/articles.json`,
      { next: { revalidate: 1800 } }
    );
    if (res.ok) {
      const json = await res.json();
      return normalize(json);
    }
  } catch (e) {
    // ignore, go to fallback
  }

  // 2) try local file
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "articles.json"
    );
    const raw = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(raw);
    return normalize(json);
  } catch (e) {
    // ignore, go to hardcoded
  }

  // 3) hardcoded fallback
  return normalize(FALLBACK_RAW);
}