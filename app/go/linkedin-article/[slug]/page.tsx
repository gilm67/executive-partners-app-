import { getLinkedInArticlesSorted } from "@/lib/insights/linkedin";

function cleanLinkedInUrl(url: string) {
  try {
    const u = new URL(url);
    u.search = "";
    return u.toString();
  } catch {
    return url;
  }
}

function getSlugFromLinkedInUrl(url: string) {
  try {
    const u = new URL(url);
    // expects /pulse/<slug>/
    const parts = u.pathname.split("/").filter(Boolean);
    const pulseIndex = parts.indexOf("pulse");
    if (pulseIndex >= 0 && parts[pulseIndex + 1]) return parts[pulseIndex + 1];
  } catch {}
  return null;
}

function findBySlug(slug: string) {
  const items = getLinkedInArticlesSorted().map((x) => ({
    ...x,
    url: cleanLinkedInUrl(x.url),
    slug: getSlugFromLinkedInUrl(x.url),
  }));
  return items.find((x) => x.slug === slug) || null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = findBySlug(params.slug);

  const title = item?.title ?? "LinkedIn Article — Executive Partners";
  const description =
    item?.summary ??
    "External LinkedIn article curated by Executive Partners (Private Wealth Pulse).";

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.execpartners.ch";
  const canonical = `${base.replace(/\/$/, "")}/go/linkedin-article/${params.slug}`;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      images: [{ url: "/og.webp" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.webp"],
    },
    alternates: { canonical },
  };
}

export default function GoLinkedInArticlePage({ params }: { params: { slug: string } }) {
  const item = findBySlug(params.slug);

  const href =
    item?.url ??
    "https://www.linkedin.com/in/gil-m-chalem-35281916b/recent-activity/articles/";

  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      {/* instant redirect, with a visible fallback */}
      <meta httpEquiv="refresh" content={`0;url=${href}`} />

      <div className="mx-auto max-w-2xl px-4 py-14">
        <p className="text-xs uppercase tracking-widest text-white/60">
          Redirecting to LinkedIn…
        </p>

        <h1 className="mt-2 text-2xl font-semibold">
          {item?.title ?? "LinkedIn Article"}
        </h1>

        {item?.summary ? (
          <p className="mt-3 text-white/70">{item.summary}</p>
        ) : null}

        <p className="mt-6 text-white/70">
          If you are not redirected automatically:
        </p>

        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-flex rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-white/90 hover:border-white/25"
        >
          Open on LinkedIn ↗
        </a>

        <div className="mt-8">
          <a
            href="/go/linkedin"
            className="text-sm text-white/70 hover:text-white underline underline-offset-4"
          >
            Having trouble? Open the fallback page →
          </a>
        </div>
      </div>
    </main>
  );
}