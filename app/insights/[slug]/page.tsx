/* app/insights/[slug]/page.tsx */
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getInsightBySlug } from "@/lib/insights/posts";

/* ---------- helpers ---------- */
function siteBase() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "https://www.execpartners.ch";
  const url = raw.startsWith("http") ? raw : `https://${raw}`;
  return url.replace(/\/$/, "");
}
const SITE = siteBase();

export const revalidate = 1800;

/* ---------- SEO ---------- */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getInsightBySlug(params.slug);

  const title =
    post?.title ?? "Private Wealth Pulse | Executive Partners Insights";
  const description =
    post?.excerpt ||
    "Executive Partners insights on Private Banking & Wealth Management hiring trends.";
  const url = `${SITE}/insights/${params.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: "Executive Partners",
      images: [{ url: "/og.png" }],
    },
    robots: { index: true, follow: true },
  };
}

/* ---------- page ---------- */
export default function InsightPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getInsightBySlug(params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#0B0E13] text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold">Article not found</h1>
          <p className="mt-2 text-neutral-300">
            Try our{" "}
            <Link
              href="/insights"
              className="underline underline-offset-4"
            >
              Insights hub
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  // ✅ Definitive behavior:
  // If we don't have any excerpt locally but we DO have a LinkedIn URL,
  // immediately redirect to the original article.
  if ((!post.excerpt || post.excerpt.trim().length === 0) && post.linkedin) {
    redirect(post.linkedin);
  }

  // Pretty date (fall back to raw string if not ISO)
  let niceDate = "—";
  if (post.date) {
    const parsed = Date.parse(post.date);
    niceDate = Number.isNaN(parsed)
      ? post.date
      : new Date(parsed).toLocaleDateString("en-CH", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date || undefined,
    description: post.excerpt || "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}${post.href}`,
    },
    author: {
      "@type": "Organization",
      name: "Executive Partners",
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "Executive Partners",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/icon.png`,
      },
    },
  };

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-20 pt-12">
        {/* Eyebrow */}
        <div className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          Private Wealth Pulse — Insights
        </div>

        {/* Title + date */}
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-white/70">Published {niceDate}</p>

        {/* Body (excerpt) */}
        <article className="prose prose-invert mt-6 max-w-none">
          {post.excerpt ? (
            <p className="text-neutral-200 leading-7 whitespace-pre-line">
              {post.excerpt}
            </p>
          ) : (
            <p className="text-neutral-400">
              Full text is available on LinkedIn.
            </p>
          )}
        </article>

        {/* LinkedIn CTA */}
        {post.linkedin ? (
          <div className="mt-8">
            <a
              href={post.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              View full article on LinkedIn ↗
            </a>
          </div>
        ) : null}

        {/* Back link */}
        <div className="mt-10 text-sm text-neutral-400">
          <Link
            href="/insights"
            className="underline underline-offset-4"
          >
            ← Back to Insights
          </Link>
        </div>
      </div>
    </main>
  );
}