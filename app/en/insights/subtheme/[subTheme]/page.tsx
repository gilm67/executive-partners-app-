import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INSIGHTS, type Pillar1SubTheme } from "../../articles";
import { marketLabel } from "@/lib/markets/marketLabel";
import { slugToP1SubTheme, subThemeToSlug } from "@/lib/insights/subTheme";

type Props = { params: { subTheme: string } };

function siteBase() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "https://www.execpartners.ch";
  const url = raw.startsWith("http") ? raw : `https://${raw}`;
  return url.replace(/\/$/, "");
}
const SITE = siteBase();

function isIsoDate(value: string | undefined) {
  return !!value && /^\d{4}-\d{2}-\d{2}$/.test(value.trim());
}

function formatDate(value: string) {
  const v = value?.trim() ?? "";
  if (!isIsoDate(v)) return v;
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(v));
  } catch {
    return v;
  }
}

function safeTime(iso: string) {
  const t = Date.parse((iso || "").trim());
  return Number.isNaN(t) ? 0 : t;
}

function subThemeLabel(st: Pillar1SubTheme) {
  const map: Record<Pillar1SubTheme, string> = {
    Positioning: "Positioning",
    ScaleVsBoutique: "Scale vs Boutique",
    ROAPlatform: "ROA & Platform",
    "M&ARestructuring": "M&A & Restructuring",
  };
  return map[st];
}

function subThemeIntro(st: Pillar1SubTheme) {
  const map: Record<Pillar1SubTheme, string> = {
    Positioning:
      "Who is winning, who is losing — and why. Competitive moves, strategic positioning, and power dynamics in private banking.",
    ScaleVsBoutique:
      "The economics of scale vs boutique models: distribution, operating leverage, product depth, and what actually compounds over time.",
    ROAPlatform:
      "ROA pressure, platform dependency, cost of compliance, and how operating models are shifting across Swiss and international wealth managers.",
    "M&ARestructuring":
      "M&A, integration reality, silent restructurings, and the second-order effects on clients, talent, and business models.",
  };
  return map[st];
}

function avgEngagement(items: { engagementScore?: number }[]) {
  const scored = items.filter((x) => typeof x.engagementScore === "number") as {
    engagementScore: number;
  }[];
  if (!scored.length) return null;
  const sum = scored.reduce((acc, x) => acc + x.engagementScore, 0);
  return Math.round((sum / scored.length) * 10) / 10;
}

function groupByYear<T extends { date: string }>(items: T[]) {
  const out: Record<string, T[]> = {};
  for (const a of items) {
    const y = (a.date || "").slice(0, 4) || "Unknown";
    (out[y] ||= []).push(a);
  }
  return out;
}

export function generateStaticParams() {
  const subThemes = new Set<string>();
  for (const a of INSIGHTS) {
    if (a.pillar === "P1" && a.subTheme) {
      subThemes.add(subThemeToSlug(a.subTheme));
    }
  }
  return [...subThemes].map((subTheme) => ({ subTheme }));
}

export function generateMetadata({ params }: Props): Metadata {
  const st = slugToP1SubTheme(params.subTheme);
  if (!st) return {};

  const title = `Private Wealth Pulse — ${subThemeLabel(st)} | Executive Partners`;
  const description = subThemeIntro(st);
  const url = `${SITE}/en/insights/subtheme/${params.subTheme}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: "Executive Partners",
      title,
      description,
      images: [{ url: `${SITE}/og.webp` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE}/og.webp`],
    },
    robots: { index: true, follow: true },
  };
}

export default function SubThemeHubPage({ params }: Props) {
  const st = slugToP1SubTheme(params.subTheme);
  if (!st) return notFound();

  const itemsAll = INSIGHTS.filter((a) => a.pillar === "P1" && a.subTheme === st);

  // ✅ Best for "freshness" + reader expectation on hubs
  const itemsByDate = itemsAll.slice().sort((a, b) => safeTime(b.date) - safeTime(a.date));

  // ✅ "Most engaged" mini-section
  const itemsByEngagement = itemsAll
    .slice()
    .sort((a, b) => {
      const ae = typeof a.engagementScore === "number" ? a.engagementScore : -1;
      const be = typeof b.engagementScore === "number" ? b.engagementScore : -1;
      if (be !== ae) return be - ae;
      return safeTime(b.date) - safeTime(a.date);
    });

  const topArticle = itemsByEngagement[0] || itemsByDate[0] || null;
  const mostEngaged = itemsByEngagement.filter((x) => x.slug !== topArticle?.slug).slice(0, 4);

  const markets = Array.from(new Set(itemsAll.flatMap((a) => a.markets))).slice(0, 10);

  const total = itemsAll.length;
  const lastUpdated = itemsByDate[0]?.date;
  const avg = avgEngagement(itemsAll);

  const pageUrl = `${SITE}/en/insights/subtheme/${params.subTheme}`;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Private Wealth Pulse — ${subThemeLabel(st)}`,
    description: subThemeIntro(st),
    url: pageUrl,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "Executive Partners",
      url: SITE,
    },
    mainEntity: itemsByDate.slice(0, 20).map((a) => ({
      "@type": "Article",
      headline: a.title,
      datePublished: a.date,
      url: `${SITE}/en/insights/${a.slug}`,
    })),
  };

  // Group by year for readability
  const byYear = groupByYear(itemsByDate);
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <nav className="text-xs text-white/60">
        <Link href="/en" className="hover:text-white">
          Home
        </Link>{" "}
        <span className="mx-1">/</span>
        <Link href="/en/insights" className="hover:text-white">
          Insights
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-white/80">{subThemeLabel(st)}</span>
      </nav>

      {/* ✅ Strong hero */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
          Pillar I — Strategy & Power Structures
        </p>

        <h1 className="mt-2 text-3xl font-semibold text-white">
          {subThemeLabel(st)}
        </h1>

        <p className="mt-3 max-w-3xl text-sm text-white/70">{subThemeIntro(st)}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
            {total} {total === 1 ? "insight" : "insights"}
          </span>

          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
            Last updated:{" "}
            <span className="text-white/80">
              {lastUpdated ? formatDate(lastUpdated) : "—"}
            </span>
          </span>

          {typeof avg === "number" ? (
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
              Avg engagement: <span className="text-white/80">{avg}</span>
            </span>
          ) : null}
        </div>

        {markets.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {markets.map((m) => (
              <span
                key={m}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
              >
                {marketLabel(m)}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/en/insights"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            ← Back to Insights
          </Link>

          <Link
            href="/en/insights/pillar/p1"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Browse Pillar I
          </Link>

          <Link
            href="/en/insights/archive"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Browse archive
          </Link>
        </div>
      </div>

      {/* ✅ Pinned Top Article */}
      {topArticle ? (
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                Pinned
              </p>
              <h2 className="mt-2 text-lg font-semibold text-white">
                Top article in this sub-theme
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Highest engagement (then recency).
              </p>
            </div>
          </div>

          <Link
            href={`/en/insights/${topArticle.slug}`}
            className="mt-4 block rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-white/60">{formatDate(topArticle.date)}</div>
              {typeof topArticle.engagementScore === "number" ? (
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                  Score {topArticle.engagementScore}
                </span>
              ) : null}
            </div>

            <h3 className="mt-2 text-xl font-semibold text-white leading-snug">
              {topArticle.title}
            </h3>

            {topArticle.summary ? (
              <p className="mt-3 text-sm text-white/75">{topArticle.summary}</p>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              {topArticle.markets.slice(0, 5).map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                >
                  {marketLabel(m)}
                </span>
              ))}
            </div>

            <div className="mt-5 text-sm font-semibold text-[#D4AF37]">
              Read →
            </div>
          </Link>
        </section>
      ) : null}

      {/* ✅ Most engaged (mini-grid) */}
      {mostEngaged.length ? (
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                Most engaged
              </p>
              <h2 className="mt-2 text-lg font-semibold text-white">
                Reader favourites
              </h2>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {mostEngaged.map((a) => (
              <article
                key={a.slug}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs text-white/60">{formatDate(a.date)}</div>
                  {typeof a.engagementScore === "number" ? (
                    <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                      Score {a.engagementScore}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-2 text-base font-semibold text-white leading-snug">
                  <Link href={`/en/insights/${a.slug}`} className="hover:underline">
                    {a.title}
                  </Link>
                </h3>

                {a.summary ? (
                  <p className="mt-3 line-clamp-2 text-sm text-white/75">{a.summary}</p>
                ) : null}

                <div className="mt-4">
                  <Link
                    href={`/en/insights/${a.slug}`}
                    className="text-sm font-semibold text-white/80 hover:text-white underline underline-offset-4"
                  >
                    Read →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* ✅ All articles (grouped by year, sorted by date desc) */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Articles
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">
              All insights in “{subThemeLabel(st)}”
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Sorted by recency (best for discovery + freshness).
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-8">
          {years.map((y) => {
            const list = byYear[y] || [];
            return (
              <div key={y}>
                <h3 className="text-sm font-semibold text-white/80">{y}</h3>

                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {list.map((a) => (
                    <article
                      key={a.slug}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xs text-white/60">{formatDate(a.date)}</div>
                        {typeof a.engagementScore === "number" ? (
                          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                            Score {a.engagementScore}
                          </span>
                        ) : null}
                      </div>

                      <h4 className="mt-2 text-base font-semibold text-white leading-snug">
                        <Link href={`/en/insights/${a.slug}`} className="hover:underline">
                          {a.title}
                        </Link>
                      </h4>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {a.markets.slice(0, 3).map((m) => (
                          <span
                            key={m}
                            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                          >
                            {marketLabel(m)}
                          </span>
                        ))}
                      </div>

                      {a.summary ? (
                        <p className="mt-3 line-clamp-2 text-sm text-white/75">{a.summary}</p>
                      ) : null}

                      <div className="mt-4">
                        <Link
                          href={`/en/insights/${a.slug}`}
                          className="text-sm font-semibold text-white/80 hover:text-white underline underline-offset-4"
                        >
                          Read →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}