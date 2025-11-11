// app/insights/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getAllInsights } from "@/lib/insights/posts";

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
    "Hiring trends, market notes and portability signals across Switzerland, Dubai, Singapore, London & New York.",
  alternates: { canonical: "/insights" },
  robots: { index: true, follow: true },
};

export const revalidate = 1800;

export default function InsightsPage() {
  const insights = getAllInsights();

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

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Background */}
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

        {insights.length === 0 ? (
          <p className="mt-10 text-center text-neutral-400">
            No insights available yet.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {insights.map((it) => (
              <article
                key={it.href}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 hover:border-white/15"
              >
                <h2 className="text-base font-semibold leading-tight">
                  <Link href={it.href}>{it.title}</Link>
                </h2>
                {it.date ? (
                  <p className="mt-1 text-xs text-neutral-400">{it.date}</p>
                ) : null}
                {it.excerpt ? (
                  <p className="mt-3 text-sm text-neutral-300 line-clamp-4">
                    {it.excerpt}
                  </p>
                ) : null}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <Link href={it.href} className="text-emerald-400">
                    Read on site →
                  </Link>
                  <a
                    href={it.linkedin}
                    className="text-xs text-neutral-400 hover:text-white"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* SEO links */}
        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-lg font-semibold">Explore related pages</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link href="/private-banking-jobs-switzerland" className="underline hover:text-white">
              See open Private Banking jobs in Switzerland
            </Link>
            <Link href="/private-banking-jobs-dubai" className="underline hover:text-white">
              Private Banking roles in Dubai
            </Link>
            <Link href="/private-banking-jobs-singapore" className="underline hover:text-white">
              Private Banking roles in Singapore
            </Link>
            <Link href="/private-banking-jobs-london" className="underline hover:text-white">
              Private Banking roles in London
            </Link>
            <Link href="/private-banking-jobs-new-york" className="underline hover:text-white">
              Private Banking roles in New York
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}