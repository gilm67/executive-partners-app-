/* app/insights/page.tsx */
import type { Metadata } from "next";
import Link from "next/link";
import ClientInsights from "./ClientInsights";
import { getAllInsights } from "../../lib/insights/posts";

function siteBase() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "https://www.execpartners.ch";
  const url = raw.startsWith("http") ? raw : `https://${raw}`;
  return url.replace(/\/$/, "");
}
const SITE = siteBase();
const PAGE_URL = `${SITE}/insights`;

export const metadata: Metadata = {
  title: { absolute: "Private Wealth Pulse — Insights | Executive Partners" },
  description:
    "Private Wealth Pulse and articles on Private Banking & Wealth Management hiring. Switzerland, Dubai, Singapore, London & New York coverage.",
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

export const revalidate = 1800;

export default function InsightsPage() {
  const insights = getAllInsights();

  // your client component wants 2 arrays
  const articles = insights.map((it) => ({
    title: it.title,
    date: it.date || "",
    href: it.href,
    tag: it.tag,
    linkedin: it.linkedin,
    excerpt: it.excerpt,
  }));
  const newsletter: typeof articles = []; // none for now

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: insights.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}${it.href}`,
      name: it.title,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Insights", item: PAGE_URL },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          Weekly market pulse — Private Banking &amp; Wealth Management
        </div>

        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          Private Wealth Pulse — Insights
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-center text-neutral-300">
          Hiring trends, market notes and portability signals across Switzerland,
          Dubai, Singapore, London &amp; New York.
        </p>

        <div className="mt-10">
          <ClientInsights newsletter={newsletter} articles={articles} />
        </div>

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
      </div>
    </main>
  );
}