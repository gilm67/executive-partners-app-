/* app/insights/[slug]/page.tsx */
import type { Metadata } from "next";
import Link from "next/link";

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

/** Minimal in-file “CMS” so the page renders immediately.
 *  Add more posts here or wire this up to MDX/CMS later.
 */
type Post = {
  slug: string;
  title: string;
  dateISO: string;
  excerpt: string;
  body: string; // plain text / basic markdown-ish
};

const POSTS: Record<string, Post> = {
  "swiss-private-banking-weekly-update-sep-2025": {
    slug: "swiss-private-banking-weekly-update-sep-2025",
    title: "Swiss Private Banking Weekly Update – Sep 2025",
    dateISO: "2025-09-08",
    excerpt:
      "Signals from Geneva & Zurich desks: steady onboarding where discretionary share is high; select hiring across CH Onshore, MEA via Zurich and Portugal diaspora in Romandie.",
    body: `
**Market pulse (CH):** Client activity remains stable with healthy inflows to discretionary and advisory mandates. Banks continue to prioritise low-noise growth and strong documentation discipline.

**Hiring note:** Demand concentrates on Relationship Managers with credible portability, clean compliance files, and realistic transition plans. Romandie shows interest for Portugal diaspora; Zurich desks for MEA coverage.

**What it means:** Balanced books with recurring revenue (DPM + advisory) are onboarding faster. Teams are calibrating comp grids to retain and land steady performers.

**For candidates:** If you cover CH Onshore, MEA (via Zurich), or Portugal diaspora (via Geneva), we’d like to speak confidentially.

**For hiring managers:** We’ll map your segment, pressure-test portability and present actionable shortlists aligned to booking and cross-border realities.
    `.trim(),
  },
};

/* Simple safe HTML helpers */
function escapeHTML(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function toHtml(s: string) {
  // super-light markdown-ish: escape + line breaks + bold
  const escaped = escapeHTML(s);
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>");
}

/* ---------- data fetching ---------- */
async function getPost(slug: string): Promise<Post | null> {
  return POSTS[slug] ?? null;
}

/* ---------- SEO metadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params; // ✅ Next 15: await params
  const post = await getPost(slug);

  const title =
    post?.title ?? "Private Wealth Pulse | Executive Partners Insights";
  const description =
    post?.excerpt ??
    "Executive Partners insights on Private Banking & Wealth Management hiring trends.";
  const url = `${SITE}/insights/${slug}`;

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

export const revalidate = 3600;

/* ---------- page ---------- */
export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ await the Promise
  const post = await getPost(slug);

  if (!post) {
    // Let the app fallback to your global not-found if missing
    return (
      <main className="min-h-screen bg-[#0B0E13] text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold">Article not found</h1>
          <p className="mt-2 text-neutral-300">
            Try our{" "}
            <Link href="/insights" className="underline underline-offset-4">
              Insights hub
            </Link>{" "}
            or{" "}
            <Link href="/jobs" className="underline underline-offset-4">
              see open roles
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  const pageUrl = `${SITE}/insights/${post.slug}`;

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    description: post.excerpt,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
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

  const niceDate = new Date(post.dateISO).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* ambient bg */}
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

        {/* H1 */}
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-white/70">Published {niceDate}</p>

        {/* Body */}
        <article className="prose prose-invert mt-6 max-w-none">
          <p
            className="text-neutral-300 leading-7"
            dangerouslySetInnerHTML={{ __html: `<p>${toHtml(post.body)}</p>` }}
          />
        </article>

        {/* Inline CTA to hub pages (internal linking for SEO) */}
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

        {/* Bottom nav */}
        <div className="mt-8 text-sm text-neutral-400">
          <Link href="/insights" className="underline underline-offset-4">
            ← Back to Insights
          </Link>
        </div>
      </div>
    </main>
  );
}