/* app/insights/page.tsx */
import type { Metadata } from "next";
import Link from "next/link";
import { getAllInsights } from "@/lib/insights/posts";

/* helpers */
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

const isIsoDate = (value: string | undefined) =>
  !!value && /^\d{4}-\d{2}-\d{2}$/.test(value.trim());

/* SEO */
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

export const revalidate = 1800;

/* page */
export default function InsightsPage() {
  const insights = getAllInsights();

  // sort: ISO dates (YYYY-MM-DD) first, newest to oldest; others stay in title order
  const sorted = [...insights].sort((a, b) => {
    const ad = a.date?.trim() ?? "";
    const bd = b.date?.trim() ?? "";

    const aIso = isIsoDate(ad);
    const bIso = isIsoDate(bd);

    if (!aIso && !bIso) {
      return a.title.localeCompare(b.title);
    }
    if (!aIso) return 1;
    if (!bIso) return -1;

    const da = Date.parse(ad);
    const db = Date.parse(bd);
    return db - da;
  });

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sorted.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}${it.href}`,
      name: it.title,
    })),
  };
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Private Wealth Pulse — Insights",
    url: PAGE_URL,
    description:
      "Private Banking & Wealth Management market pulse and hiring insights.",
    isPartOf: { "@type": "WebSite", name: "Executive Partners", url: SITE },
  };

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
        {/* Header */}
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          Weekly market pulse — Private Banking &amp; Wealth Management
        </div>

        <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          Private Wealth Pulse — Insights
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-center text-neutral-300">
          Hiring trends, market notes and portability signals across
          Switzerland, Dubai, Singapore, London &amp; New York.
        </p>

        {/* List */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {sorted.map((it) => {
            let displayDate = "—";

            if (it.date) {
              const trimmed = it.date.trim();

              if (isIsoDate(trimmed)) {
                const parsed = Date.parse(trimmed);
                if (!Number.isNaN(parsed)) {
                  displayDate = new Date(parsed).toLocaleDateString("en-CH", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                } else {
                  displayDate = trimmed;
                }
              } else {
                // show exactly what you stored in JSON (no guessing)
                displayDate = trimmed;
              }
            }

            return (
              <article
                key={it.href}
                className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-wide text-emerald-200/70">
                  {it.tag ?? "Article"}
                </p>
                <h2 className="mt-2 text-lg font-semibold">
                  <Link href={it.href} className="hover:underline">
                    {it.title}
                  </Link>
                </h2>
                <p className="mt-1 text-xs text-white/50">{displayDate}</p>
                {it.excerpt ? (
                  <p className="mt-3 text-sm text-neutral-200 line-clamp-3">
                    {it.excerpt}
                  </p>
                ) : null}
                <div className="mt-4 flex gap-3">
                  <Link
                    href={it.href}
                    className="text-sm font-medium text-white underline-offset-4 hover:underline"
                  >
                    Read on site →
                  </Link>
                  {it.linkedin ? (
                    <a
                      href={it.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-neutral-300 hover:text-white"
                    >
                      LinkedIn ↗
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        {/* Hub backlinks */}
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