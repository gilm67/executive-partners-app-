/* app/insights/page.tsx */
import type { Metadata } from "next";
import Link from "next/link";
import ClientInsights from "./ClientInsights";

type Item = {
  title: string;
  date: string; // human-readable (e.g., "Sep 1, 2025")
  href: string; // can be on LinkedIn (external) or on your site
  tag: "Private Wealth Pulse" | "Article";
};

/* ---------------- SEO metadata ---------------- */
function siteBase() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "https://www.execpartners.ch";
  const url = raw.startsWith("http") ? raw : `https://${raw}`;
  return url.replace(/\/$/, "");
}
const SITE = siteBase();

export const metadata: Metadata = {
  title: { absolute: "Private Wealth Pulse — Insights | Executive Partners" },
  description:
    "Weekly Private Wealth Pulse and articles on Private Banking & Wealth Management hiring. Switzerland, Dubai, Singapore, London & New York coverage.",
  alternates: { canonical: "/insights" },
  openGraph: {
    type: "website",
    url: "/insights",
    siteName: "Executive Partners",
    title: "Private Wealth Pulse — Insights | Executive Partners",
    description:
      "Market pulse and hiring trends across Switzerland, MEA, UK, US and APAC.",
    images: [{ url: "/og.png" }],
  },
  robots: { index: true, follow: true },
};

const newsletter: Item[] = [
  {
    title:
      "Swiss Private Banks Double Down on Digital, Outperform Amid Global Volatility",
    date: "Sep 1, 2025",
    href: "https://www.linkedin.com/pulse/swiss-private-banks-double-down-digital-outperform-amid-m-chalem--h5vne/?trackingId=l4J5BhFKGRuipGhjm6NeoA%3D%3D",
    tag: "Private Wealth Pulse",
  },
  {
    title:
      "Swiss Private Banks Forge Ahead: Profit Surges, Talent Battles, and Digital Transformation Define August 2025",
    date: "Aug 19, 2025",
    href: "https://www.linkedin.com/pulse/swiss-private-banks-forge-ahead-profit-surges-talent-2025-m-chalem--hfnme/?trackingId=W4nWPfJLYU%2FuuXz9CGha7w%3D%3D",
    tag: "Private Wealth Pulse",
  },
  {
    title: "Swiss Private Banking & Global Markets Weekly",
    date: "Aug 6, 2025",
    href: "https://www.linkedin.com/pulse/swiss-private-banking-global-markets-weekly-gil-m-chalem--krzje/?trackingId=NwRRUi4mLFy1unMWAGN1dQ%3D%3D",
    tag: "Private Wealth Pulse",
  },
  {
    title: "Swiss Private Banking & Global Markets Weekly",
    date: "Jul 21, 2025",
    href: "https://www.linkedin.com/pulse/swiss-private-banking-global-markets-weekly-gil-m-chalem--owyqc/?trackingId=xd3HE5Ha9NaFhoMoAAj%2BIw%3D%3D",
    tag: "Private Wealth Pulse",
  },
  {
    title: "Swiss Private Banking: New Data, Risks & Strategic Moves",
    date: "Jul 16, 2025",
    href: "https://www.linkedin.com/pulse/swiss-private-banking-new-data-risks-strategic-moves-gil-m-chalem--cc2ge/?trackingId=QbY0bCjkcfywKEbQmC%2FWMA%3D%3D",
    tag: "Private Wealth Pulse",
  },
  {
    title:
      "Swiss Private Banking Weekly: Post-Crisis Resilience and Market Stabilisation",
    date: "Jul 8, 2025",
    href: "https://www.linkedin.com/pulse/swiss-private-banking-weekly-post-crisis-resilience-gil-m-chalem--igode/?trackingId=d54tvsQ4fKDE8gmVObUKVA%3D%3D",
    tag: "Private Wealth Pulse",
  },
];

const articles: Item[] = [
  {
    title:
      "Turbulent Time: Crisis Resilience and Market Leadership in Turbulent Times (Middle East Conflict)",
    date: "Jun 22, 2025",
    href: "https://www.linkedin.com/pulse/turbulent-time-crisis-resilience-market-leadership-times-m-chalem--wu0fe/?trackingId=Xbv8b8OzSFOKaJNrxuEcaw%3D%3D",
    tag: "Article",
  },
  {
    title: "Global Markets Outlook 2025: Strategic Insights for Private Bankers",
    date: "Jun 5, 2025",
    href: "https://www.linkedin.com/pulse/global-markets-outlook-2025-strategic-insights-gil-m-chalem--hjcre/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title: "From Zurich to Hong Kong: Navigating Wealth in a Multipolar World",
    date: "Jun 1, 2025",
    href: "https://www.linkedin.com/pulse/from-zurich-hong-kong-navigating-wealth-multipolar-world-m-chalem--ezase/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title:
      "EFG Bank Switzerland: Pioneering Private Banking with Entrepreneurial Agility and Strategic Mastery",
    date: "May 27, 2025",
    href: "https://www.linkedin.com/pulse/efg-bank-switzerland-pioneering-private-banking-gil-m-chalem--tknge/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title:
      "How to Build a Billion-Dollar Client Portfolio in International Banking: Lessons from a Top Relationship Manager",
    date: "May 14, 2025",
    href: "https://www.linkedin.com/pulse/how-build-billion-dollar-client-portfolio-banking-from-gil-m-chalem--uazye/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title: "UBS: Switzerland’s Banking Giant in Transformation",
    date: "Apr 30, 2025",
    href: "https://www.linkedin.com/pulse/ubs-switzerlands-banking-giant-transformation-gil-m-chalem--fynde/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title:
      "Navigating Trump’s Economic Storm: How Private Banks and Their Clients Can Secure Assets in 2025",
    date: "Apr 13, 2025",
    href: "https://www.linkedin.com/pulse/navigating-trumps-economic-storm-how-private-banks-can-gil-m-chalem--9q2de/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title:
      "Whale vs. Retail Investor Behavior: Decoding Market Dynamics in Bitcoin Investments",
    date: "Apr 6, 2025",
    href: "https://www.linkedin.com/pulse/whale-vs-retail-investor-behavior-decoding-market-gil-m-chalem--andie/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title:
      "UBS and Credit Suisse: From “Deal of the Century” to High-Stakes Turbulence",
    date: "Apr 1, 2025",
    href: "https://www.linkedin.com/pulse/ubs-credit-suisse-from-deal-century-high-stakes-gil-m-chalem--ilpfe/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title:
      "The Ultimate Guide to Interview Preparation: A Recruiter's Insider Perspective",
    date: "Mar 30, 2025",
    href: "https://www.linkedin.com/pulse/ultimate-guide-interview-preparation-recruiters-gil-m-chalem--ew6pe/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title: "The Changing Face of Swiss Private Banking",
    date: "Mar 26, 2025",
    href: "https://www.linkedin.com/pulse/changing-face-swiss-private-banking-gil-m-chalem--thxhe/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title:
      "Private Bankers: How to Choose the Right Institution for Your Career",
    date: "Mar 14, 2025",
    href: "https://www.linkedin.com/pulse/private-bankers-how-choose-right-institution-your-gil-m-chalem--suqfe/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title: "The Great Wealth Transfer: Adapting to the Next Generation’s Needs",
    date: "Mar 4, 2025",
    href: "https://www.linkedin.com/pulse/great-wealth-transfer-adapting-next-generations-needs-gil-m-chalem--ligae/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title: "How Global Economic Shifts Reshape High-Net-Worth Portfolios",
    date: "Feb 27, 2025",
    href: "https://www.linkedin.com/pulse/how-global-economic-shifts-reshape-high-net-worth-gil-m-chalem--uyl5e/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title: "Traditional Private Banks vs. Family Offices",
    date: "Feb 19, 2025",
    href: "https://www.linkedin.com/in/gil-m-chalem-35281916b/recent-activity/articles/",
    tag: "Article",
  },
  {
    title:
      "Swiss Private Banking Shake-Up: The Mega Mergers Redefining an Iconic Industry",
    date: "Feb 16, 2025",
    href: "https://www.linkedin.com/pulse/swiss-private-banking-shake-up-mega-mergers-iconic-gil-m-chalem--etbme/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title:
      "The Battle of the Gulf Giants: Saudi Arabia's Vision 2030 vs. Dubai's Established Dominance",
    date: "Feb 9, 2025",
    href: "https://www.linkedin.com/pulse/battle-gulf-giants-saudi-arabias-vision-2030-vs-gil-m-chalem--1kvee/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title: "Saudi Arabia's Economic Landscape and Opportunities for Private Banking",
    date: "2025",
    href: "https://www.linkedin.com/pulse/saudi-arab",
    tag: "Article",
  },
  {
    title:
      "The Rise of the PIGS: Europe's Economic Underdogs Take Flight",
    date: "Feb 4, 2025",
    href: "https://www.linkedin.com/pulse/rise-pigs-europes-economic-underdogs-take-flight-gil-m-chalem--1pyme/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title: "The NRI Gold Rush: Your 2025 Private Banking Playbook",
    date: "Jan 29, 2025",
    href: "https://www.linkedin.com/pulse/nri-gold-rush-your-2025-private-banking-playbook-gil-m-chalem--0zyfe/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
  {
    title: "Crisis to Opportunity: Decoding the UBS-Credit Suisse Merger",
    date: "Jan 25, 2025",
    href: "https://www.linkedin.com/pulse/crisis-opportunity-decoding-ubs-credit-suisse-merger-gil-m-chalem--f73je/?trackingId=jpmgGLfyRqmRzxVPYBJLVg%3D%3D",
    tag: "Article",
  },
  {
    title:
      "Latest News on the Swiss Financial Market: A Professional Perspective for Private Bankers",
    date: "Jan 24, 2025",
    href: "https://www.linkedin.com/pulse/latest-news-swiss-financial-market-professional-gil-m-chalem--tk3ge/?trackingId=jpmgGLfyRqmRzxVPYBJLVg%3D%3D",
    tag: "Article",
  },
  {
    title:
      "Germany's Economic Outlook and Private Banking Opportunities in 2025",
    date: "Jan 19, 2025",
    href: "https://www.linkedin.com/pulse/germanys-economic-outlook-private-banking-2025-gil-m-chalem--3pbze/?trackingId=jpmgGLfyRqmRzxVPYBJLVg%3D%3D",
    tag: "Article",
  },
  {
    title:
      "Why APAC is the Ultimate Private Banking Hotspot for 2025",
    date: "Jan 14, 2025",
    href: "https://www.linkedin.com/in/gil-m-chalem-35281916b/recent-activity/articles/",
    tag: "Article",
  },
  {
    title:
      "Unlocking Growth: The CEE Region's Untapped Potential for Swiss and Global Private Banks",
    date: "Jan 10, 2025",
    href: "https://www.linkedin.com/pulse/potential-central-eastern-europe-cee-swiss-private-banks-m-chalem--bpooe/?trackingId=jpmgGLfyRqmRzxVPYBJLVg%3D%3D",
    tag: "Article",
  },
  {
    title:
      "Latest News on the Swiss Financial Market: Focus on Swiss and International Banks",
    date: "Jan 9, 2025",
    href: "https://www.linkedin.com/pulse/latest-news-swiss-financial-market-focus-banks-gil-m-chalem--vgjve/?trackingId=G%2FjgEiXPSSSO33kg6d6pdA%3D%3D",
    tag: "Article",
  },
  {
    title:
      "LATAM Private Banking: Navigating Challenges and Opportunities in a $1.3T Market",
    date: "Jan 5, 2025",
    href: "https://www.linkedin.com/pulse/latam-private-banking-navigating-challenges-13t-gil-m-chalem--g9jqe/?trackingId=G%2FjgEiXPSSSO33kg6d6pdA%3D%3D",
    tag: "Article",
  },
  {
    title:
      "Dubai: The Rising Star of Private Banking and Wealth Management",
    date: "Jan 3, 2025",
    href: "https://www.linkedin.com/pulse/dubai-rising-star-private-banking-wealth-management-gil-m-chalem--ag9xe/?trackingId=G%2FjgEiXPSSSO33kg6d6pdA%3D%3D",
    tag: "Article",
  },
  {
    title: "Should Private Banks Embrace Bitcoin for Their Clients?",
    date: "Jan 2, 2025",
    href: "https://www.linkedin.com/pulse/should-private-banks-embrace-bitcoin-clients-gil-m-chalem--k0kze/?trackingId=G%2FjgEiXPSSSO33kg6d6pdA%3D%3D",
    tag: "Article",
  },
  {
    title: "The Swiss Financial market developments",
    date: "Dec 30, 2024",
    href: "https://www.linkedin.com/pulse/swiss-financial-market-developments-gil-m-chalem--kvone/?trackingId=G%2FjgEiXPSSSO33kg6d6pdA%3D%3D",
    tag: "Article",
  },
  {
    title:
      "Swiss and European Banks Tighten Grip on CIS Clients Amid Sanctions Storm",
    date: "Dec 24, 2024",
    href: "https://www.linkedin.com/pulse/swiss-european-banks-tighten-grip-cis-clients-amid-storm-m-chalem--age8e/?trackingId=G%2FjgEiXPSSSO33kg6d6pdA%3D%3D",
    tag: "Article",
  },
  {
    title:
      "The Exodus of Ultra High Net Worth and High Net Worth Individuals from the UK: Reasons and Destinations",
    date: "Dec 23, 2024",
    href: "https://www.linkedin.com/pulse/exodus-ultra-high-net-worth-individuals-from-uk-gil-m-chalem--dwize/?trackingId=G%2FjgEiXPSSSO33kg6d6pdA%3D%3D",
    tag: "Article",
  },
  {
    title:
      "Transforming Wealth Management: Global Trends and Best Practices",
    date: "Dec 20, 2024",
    href: "https://www.linkedin.com/pulse/transforming-wealth-management-global-trends-best-gil-m-chalem--jkcqe/?trackingId=G%2FjgEiXPSSSO33kg6d6pdA%3D%3D",
    tag: "Article",
  },
];

/* Convert "Sep 1, 2025" -> ISO if possible */
function toISO(dateStr: string | undefined) {
  if (!dateStr) return undefined;
  const t = Date.parse(dateStr);
  return Number.isFinite(t) ? new Date(t).toISOString() : undefined;
}

export const revalidate = 1800;

/* ---------------- Page ---------------- */
export default function InsightsPage() {
  // Build JSON-LD (Blog + ItemList) for better discovery
  const blogUrl = `${SITE}/insights`;
  const items = [...newsletter, ...articles];

  const itemList = items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: it.href.startsWith("http") ? it.href : `${SITE}${it.href}`,
    name: it.title,
  }));

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Private Wealth Pulse — Insights",
    url: blogUrl,
    description:
      "Private Banking & Wealth Management market pulse and hiring insights.",
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: itemList,
  };

  // Optional: Article JSON-LD for your most recent internal post
  const latestInternal = items.find((x) => x.href.startsWith("/"));
  const articleJsonLd = latestInternal
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: latestInternal.title,
        datePublished: toISO(latestInternal.date),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE}${latestInternal.href}`,
        },
        publisher: {
          "@type": "Organization",
          name: "Executive Partners",
          logo: {
            "@type": "ImageObject",
            url: `${SITE}/icon.png`,
          },
        },
      }
    : null;

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {articleJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      ) : null}

      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      {/* Header */}
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          Weekly market pulse — Private Banking & Wealth Management
        </div>

        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          Private Wealth Pulse — Insights
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-center text-neutral-300">
          Hiring trends, market notes and portability signals across Switzerland,
          Dubai, Singapore, London &amp; New York.
        </p>

        {/* Render your existing UI */}
        <div className="mt-8">
          <ClientInsights newsletter={newsletter} articles={articles} />
        </div>

        {/* Hub backlinks (internal interlinking) */}
        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-lg font-semibold">Explore related pages</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link
              href="/private-banking-jobs-switzerland"
              className="underline hover:text-white"
            >
              See open Private Banking jobs in Switzerland
            </Link>
            <Link
              href="/private-banking-jobs-dubai"
              className="underline hover:text-white"
            >
              Private Banking roles in Dubai
            </Link>
            <Link
              href="/private-banking-jobs-singapore"
              className="underline hover:text-white"
            >
              Private Banking roles in Singapore
            </Link>
            <Link
              href="/private-banking-jobs-london"
              className="underline hover:text-white"
            >
              Private Banking roles in London
            </Link>
            <Link
              href="/private-banking-jobs-new-york"
              className="underline hover:text-white"
            >
              Private Banking roles in New York
            </Link>
          </div>
        </section>

        {/* ✅ RSS link (footer area) */}
        <p className="mt-6 text-center text-sm text-neutral-400">
          Subscribe via{" "}
          <a href="/rss.xml" className="underline hover:text-white">
            RSS
          </a>
        </p>
      </div>
    </main>
  );
}