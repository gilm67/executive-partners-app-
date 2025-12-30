// app/rss.xml/route.ts
import { NextResponse } from "next/server";
import { getLinkedInArticlesSorted } from "@/lib/insights/linkedin";

type Item = { title: string; date: string; href: string; tag: string; description?: string };

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

function cleanLinkedInUrl(url: string) {
  try {
    const u = new URL(url);
    u.search = ""; // strips trackingId etc.
    return u.toString();
  } catch {
    return url;
  }
}

// Keep in sync with app/insights/page.tsx
const NEWSLETTER: Item[] = [
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
];

const ARTICLES: Item[] = [
  {
    title: "Global Markets Outlook 2025: Strategic Insights for Private Bankers",
    date: "Jun 5, 2025",
    href: "https://www.linkedin.com/pulse/global-markets-outlook-2025-strategic-insights-gil-m-chalem--hjcre/?trackingId=dJZo6qjzRUOFPP3nQIxj4Q%3D%3D",
    tag: "Article",
  },
];

function toRFC822(d: string) {
  const t = Date.parse(d);
  return Number.isFinite(t) ? new Date(t).toUTCString() : new Date().toUTCString();
}

export async function GET() {
  // LinkedIn articles from your Insights source of truth (sorted newest-first)
  const linkedIn = getLinkedInArticlesSorted().map((a) => ({
    title: a.title,
    date: a.dateISO, // YYYY-MM-DD
    href: cleanLinkedInUrl(a.url),
    tag: "LinkedIn",
    description: a.summary,
  }));

  const items: Item[] = [...linkedIn, ...NEWSLETTER, ...ARTICLES];

  const xmlItems = items
    .map((i) => {
      const link = i.href.startsWith("http") ? i.href : `${SITE}${i.href}`;
      const desc = i.description?.trim();

      return `
        <item>
          <title><![CDATA[${i.title}]]></title>
          <link>${link}</link>
          <guid isPermaLink="true">${link}</guid>
          <pubDate>${toRFC822(i.date)}</pubDate>
          <category>${i.tag}</category>
          ${desc ? `<description><![CDATA[${desc}]]></description>` : ""}
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Executive Partners — Private Wealth Pulse</title>
      <link>${SITE}/insights</link>
      <description>Market pulse & articles for Private Banking & Wealth Management.</description>
      <language>en</language>
      ${xmlItems}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=UTF-8" },
  });
}