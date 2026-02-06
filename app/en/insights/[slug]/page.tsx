import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INSIGHTS } from "../articles";
import { marketLabel } from "@/lib/markets/marketLabel";

type Props = { params: { slug: string } };

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

function getYear(iso: string) {
  const y = Number(iso?.slice(0, 4));
  return Number.isFinite(y) ? y : null;
}

function sortByDateDesc(a: { date: string }, b: { date: string }) {
  const ad = a.date?.trim() ?? "";
  const bd = b.date?.trim() ?? "";

  const aIso = isIsoDate(ad);
  const bIso = isIsoDate(bd);

  if (!aIso && !bIso) return 0;
  if (!aIso) return 1;
  if (!bIso) return -1;

  return Date.parse(bd) - Date.parse(ad);
}

function cleanLinkedInUrl(url: string) {
  try {
    const u = new URL(url);
    u.search = "";
    return u.toString();
  } catch {
    return url;
  }
}

function getRelatedInsights(slug: string, limit = 5) {
  const current = INSIGHTS.find((a) => a.slug === slug);
  if (!current) return [];

  const currentYear = getYear(current.date);
  const currentMarkets = new Set(current.markets);

  const others = INSIGHTS.filter((a) => a.slug !== slug);

  // 1) market overlap (priority)
  const sameMarket = others
    .filter((a) => a.markets.some((m) => currentMarkets.has(m)))
    .sort(sortByDateDesc);

  // 2) same year fallback
  const sameYear =
    currentYear === null
      ? []
      : others
          .filter((a) => getYear(a.date) === currentYear)
          .sort(sortByDateDesc);

  // 3) newest fallback
  const newest = [...others].sort(sortByDateDesc);

  // Merge unique by slug
  const merged: typeof others = [];
  const seen = new Set<string>();

  for (const a of [...sameMarket, ...sameYear, ...newest]) {
    if (seen.has(a.slug)) continue;
    seen.add(a.slug);
    merged.push(a);
    if (merged.length >= limit) break;
  }
  return merged;
}

/**
 * ✅ Better SEO: pre-render article routes
 */
export function generateStaticParams() {
  return INSIGHTS.map((a) => ({ slug: a.slug }));
}

/**
 * ✅ SEO: canonical + OpenGraph + Twitter per article
 */
export function generateMetadata({ params }: Props): Metadata {
  const article = INSIGHTS.find((a) => a.slug === params.slug);
  if (!article) return {};

  const url = `${SITE}/en/insights/${article.slug}`;
  const title = article.title;
  const description = article.summary;

  return {
    title: { absolute: `${title} | Executive Partners` },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
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

export default function InsightDetailPage({ params }: Props) {
  const article = INSIGHTS.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  const related = getRelatedInsights(article.slug, 5);
  const pageUrl = `${SITE}/en/insights/${article.slug}`;

  /**
   * ✅ JSON-LD Breadcrumbs
   */
  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/en` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: `${SITE}/en/insights`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: pageUrl,
      },
    ],
  };

  /**
   * ✅ JSON-LD Article (strong SEO signal)
   */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    // dateModified: article.date, // keep if you don't track modifications yet
    inLanguage: "en",
    author: { "@type": "Person", name: "Gil M. Chalem" },
    publisher: {
      "@type": "Organization",
      name: "Executive Partners",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/og.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    url: pageUrl,
    articleSection: "Private Wealth Pulse",
    keywords: article.markets.map((m) => marketLabel(m)).join(", "),
    about: article.markets.map((m) => ({
      "@type": "Thing",
      name: marketLabel(m),
    })),
  };

  /**
   * ✅ FAQ Schema (only on selected pillar articles)
   * Add more slugs over time.
   */
  const faqJsonLd =
    article.slug === "investment-advisor-replacing-rm"
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is the relationship manager model still relevant in private banking?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "The relationship manager role remains important, but it is no longer sufficient on its own. Clients increasingly expect strong investment performance, which shifts influence toward investment advisors.",
              },
            },
            {
              "@type": "Question",
              name: "Why are investment advisors becoming more influential than relationship managers?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Investment advisors increasingly drive portfolio positioning, performance explanation and risk management—factors that directly impact client retention and satisfaction.",
              },
            },
            {
              "@type": "Question",
              name: "How does this shift impact private banks in Switzerland?",
              acceptedAnswer: {
                "@type": "Answer",
                text:
                  "Swiss private banks are evolving operating models and hiring priorities to better integrate investment advisory capabilities alongside traditional relationship management—particularly for UHNW and cross-border clients.",
              },
            },
          ],
        }
      : null;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-14">
      {/* ✅ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}

      {/* ✅ Visible breadcrumb */}
      <nav className="text-xs text-white/60">
        <Link href="/en" className="hover:text-white">
          Home
        </Link>{" "}
        <span className="mx-1">/</span>
        <Link href="/en/insights" className="hover:text-white">
          Insights
        </Link>{" "}
        <span className="mx-1">/</span>
        <span className="text-white/80 line-clamp-1">{article.title}</span>
      </nav>

      <Link
        href="/en/insights"
        className="mt-4 inline-block text-sm text-white/60 hover:text-white"
      >
        ← Back to Insights
      </Link>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-xs text-white/60">{formatDate(article.date)}</div>
        <h1 className="mt-2 text-2xl font-semibold text-white">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {article.markets.map((m) => (
            <span
              key={m}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/75"
            >
              {marketLabel(m)}
            </span>
          ))}
        </div>

        <p className="mt-5 text-white/80">{article.summary}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={cleanLinkedInUrl(article.linkedinUrl)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-5 py-2.5 text-sm font-semibold text-[#0B0E13] hover:opacity-90"
          >
            Read the full article on LinkedIn →
          </a>

          <Link
            href="/en/insights/archive"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Browse archive
          </Link>
        </div>
      </div>

      {/* ✅ RELATED INSIGHTS */}
      {related.length ? (
        <section className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                Keep reading
              </p>
              <h2 className="mt-2 text-lg font-semibold text-white">
                Related Insights
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Suggested by market overlap (then year).
              </p>
            </div>

            <Link
              href="/en/insights/archive"
              className="text-sm text-white/70 hover:text-white underline underline-offset-4"
            >
              Browse archive →
            </Link>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <article
                key={r.slug}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="text-xs text-white/60">{formatDate(r.date)}</div>

                <h3 className="mt-2 text-base font-semibold text-white leading-snug">
                  <Link
                    href={`/en/insights/${r.slug}`}
                    className="hover:underline"
                  >
                    {r.title}
                  </Link>
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {r.markets.slice(0, 3).map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                    >
                      {marketLabel(m)}
                    </span>
                  ))}
                </div>

                {r.summary ? (
                  <p className="mt-3 line-clamp-2 text-sm text-white/75">
                    {r.summary}
                  </p>
                ) : null}

                <div className="mt-4">
                  <Link
                    href={`/en/insights/${r.slug}`}
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
    </main>
  );
}