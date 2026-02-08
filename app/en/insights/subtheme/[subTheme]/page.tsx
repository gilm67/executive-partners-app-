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
  const t = Date.parse(iso);
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

/**
 * Sort:
 * 1) engagementScore desc
 * 2) date desc
 */
function sortByEngagementThenDateDesc(
  a: { date: string; engagementScore?: number },
  b: { date: string; engagementScore?: number }
) {
  const ae = typeof a.engagementScore === "number" ? a.engagementScore : 0;
  const be = typeof b.engagementScore === "number" ? b.engagementScore : 0;
  if (be !== ae) return be - ae;
  return safeTime(b.date) - safeTime(a.date);
}

export function generateStaticParams() {
  // Only for P1 sub-themes for now
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
      images: [{ url: `${SITE}/og.png` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE}/og.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default function SubThemeHubPage({ params }: Props) {
  const st = slugToP1SubTheme(params.subTheme);
  if (!st) return notFound();

  const items = INSIGHTS.filter((a) => a.pillar === "P1" && a.subTheme === st).sort(
    sortByEngagementThenDateDesc
  );

  // Lightweight aggregates for page context
  const markets = Array.from(new Set(items.flatMap((a) => a.markets))).slice(0, 8);

  const pageUrl = `${SITE}/en/insights/subtheme/${params.subTheme}`;

  // JSON-LD CollectionPage (+ list of items)
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
    mainEntity: items.slice(0, 20).map((a) => ({
      "@type": "Article",
      headline: a.title,
      datePublished: a.date,
      url: `${SITE}/en/insights/${a.slug}`,
    })),
  };

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

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
          Pillar I — Strategy & Power Structures
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-white">
          More on “{subThemeLabel(st)}”
        </h1>

        <p className="mt-3 max-w-3xl text-sm text-white/70">{subThemeIntro(st)}</p>

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

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Articles
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white">
              {items.length} insight{items.length === 1 ? "" : "s"}
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Sorted by engagement (then recency).
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {items.map((a) => (
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
                <p className="mt-3 line-clamp-2 text-sm text-white/75">
                  {a.summary}
                </p>
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
    </main>
  );
}