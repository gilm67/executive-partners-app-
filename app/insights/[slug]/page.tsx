/* app/insights/[slug]/page.tsx */
import type { Metadata } from "next";
import Link from "next/link";
import { getInsightBySlug, getAllInsights } from "../../../lib/insights/posts";

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

export async function generateStaticParams() {
  const all = getAllInsights();
  return all.map((post) => ({ slug: post.href.replace("/insights/", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getInsightBySlug(params.slug);
  const title =
    post?.title ?? "Private Wealth Pulse | Executive Partners Insights";
  const description =
    post?.excerpt ??
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

export default function InsightPostPage({ params }: { params: { slug: string } }) {
  const post = getInsightBySlug(params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#0B0E13] text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold">Article not found</h1>
          <p className="mt-2 text-neutral-300">
            Try our{" "}
            <Link href="/insights" className="underline underline-offset-4">
              Insights hub
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  const niceDate = post.date
    ? new Date(post.date).toLocaleDateString("en-CH", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-20 pt-12">
        <div className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          Private Wealth Pulse — Insights
        </div>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        {niceDate ? (
          <p className="mt-2 text-sm text-white/70">Published {niceDate}</p>
        ) : null}

        <article className="prose prose-invert mt-6 max-w-none">
          {post.excerpt ? (
            <p className="text-neutral-200 leading-7 whitespace-pre-line">
              {post.excerpt}
            </p>
          ) : (
            <p className="text-neutral-400">
              This article was scraped from LinkedIn. Open the original version below.
            </p>
          )}
        </article>

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

        <div className="mt-8 text-sm text-neutral-400">
          <Link href="/insights" className="underline underline-offset-4">
            ← Back to Insights
          </Link>
        </div>
      </div>
    </main>
  );
}