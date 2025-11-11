// app/insights/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getInsightBySlug, slugify, getAllInsights } from "@/lib/insights/posts";

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

/* --------------------------------------------
   Generate metadata for SEO
-------------------------------------------- */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getInsightBySlug(params.slug);
  const title = post?.title ?? "Executive Partners — Private Wealth Pulse";
  const description = post?.excerpt ?? "Private banking & wealth management insights.";
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
  };
}

/* --------------------------------------------
   Page rendering
-------------------------------------------- */
export default function InsightPage({ params }: { params: { slug: string } }) {
  const post = getInsightBySlug(params.slug);

  if (!post) {
    // 🔧 for debugging: show what slug was searched
    console.warn("Article not found for slug:", params.slug);
    return (
      <main className="min-h-screen bg-[#0B0E13] text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold">Article not found</h1>
          <p className="mt-2 text-neutral-300">
            Try our{" "}
            <Link href="/insights" className="underline">
              Insights hub
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date || undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}${post.href}` },
    publisher: {
      "@type": "Organization",
      name: "Executive Partners",
      logo: { "@type": "ImageObject", url: `${SITE}/icon.png` },
    },
  };

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-20 pt-12">
        <div className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          Private Wealth Pulse — Insights
        </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        {post.date && (
          <p className="mt-2 text-sm text-white/70">{post.date}</p>
        )}

        <p className="mt-6 text-base text-neutral-200 leading-7 whitespace-pre-line">
          {post.excerpt ||
            "This article is currently published on LinkedIn. You can read the full version there."}
        </p>

        <div className="mt-6">
          <a
            href={post.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
          >
            View this article on LinkedIn ↗
          </a>
        </div>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-lg font-bold">Explore related pages</h2>
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

        <div className="mt-8 text-sm text-neutral-400">
          <Link href="/insights" className="underline">
            ← Back to Insights
          </Link>
        </div>
      </div>
    </main>
  );
}