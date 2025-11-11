/* app/insights/[slug]/page.tsx */
import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Link from "next/link";

type Article = {
  title: string;
  linkedin: string;
  date?: string;
  excerpt?: string;
  body?: string;
};

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

function loadArticles(): Article[] {
  try {
    const file = path.join(process.cwd(), "public/data/articles.json");
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("cannot read public/data/articles.json", e);
    return [];
  }
}

// base slugify
function slugifyBase(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// stricter normalizer: collapse multiple dashes and trim ending dash
function normalizeSlug(s: string) {
  return slugifyBase(s).replace(/-+/g, "-").replace(/-$/, "");
}

/* ---------- metadata ---------- */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const all = loadArticles();
  const targetSlug = normalizeSlug(decodeURIComponent(params.slug));
  const article =
    all.find((a) => normalizeSlug(a.title) === targetSlug) ||
    null;

  const title = article?.title ?? "Executive Partners Insights";
  const desc = article?.excerpt ?? "Private Banking & Wealth Management insights.";
  const url = `${SITE}/insights/${params.slug}`;

  return {
    title: { absolute: title },
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: desc,
      siteName: "Executive Partners",
      images: [{ url: "/og.png" }],
    },
  };
}

/* ---------- page ---------- */
export default async function InsightPostPage({ params }: { params: { slug: string } }) {
  const articles = loadArticles();
  const targetSlug = normalizeSlug(decodeURIComponent(params.slug));

  // try exact normalized match
  let article =
    articles.find((a) => normalizeSlug(a.title) === targetSlug) || null;

  // fallback: sometimes LinkedIn adds tracking, so try contains
  if (!article) {
    article =
      articles.find((a) =>
        normalizeSlug(a.title).includes(targetSlug)
      ) || null;
  }

  if (!article) {
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

  const dateLabel =
    article.date && article.date.trim().length > 0
      ? article.date
      : "Published on LinkedIn";

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
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
        <div className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          Private Wealth Pulse — Insights
        </div>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-2 text-sm text-white/70">{dateLabel}</p>

        <article className="prose prose-invert mt-6 max-w-none whitespace-pre-line leading-relaxed">
          {article.body || article.excerpt || "No content available."}
        </article>

        {article.linkedin ? (
          <div className="mt-8">
            <a
              href={article.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              View on LinkedIn ↗
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