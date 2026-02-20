import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INSIGHTS_DE } from "../articles";
import fs from "fs";
import path from "path";
import { marked } from "marked";

type Props = { params: Promise<{ slug: string }> };

const SITE = "https://www.execpartners.ch";

// Optional: if you have a DE home page, set it here.
// Otherwise, keep "/" (or "/en") depending on your routing.
const HOME_DE = "/"; // or "/de" if you have it

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("de-CH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function generateStaticParams() {
  return INSIGHTS_DE.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = INSIGHTS_DE.find((a) => a.slug === slug);
  if (!article) return {};

  const url = `${SITE}/de/insights/${article.slug}`;

  return {
    title: { absolute: `${article.title} | Executive Partners` },
    description: article.summary,
    alternates: {
      canonical: url,
      // NOTE: If you later add 1:1 EN equivalents, replace the EN link with the EN article URL.
      languages: {
        "de-CH": url,
        en: `${SITE}/en/insights`,
      },
    },
    openGraph: {
      type: "article",
      url,
      locale: "de_CH",
      siteName: "Executive Partners",
      title: article.title,
      description: article.summary,
      publishedTime: article.date,
      modifiedTime: article.date,
      images: [{ url: `${SITE}/og.webp` }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: [`${SITE}/og.webp`],
    },
    robots: { index: true, follow: true },
  };
}

function stripFrontmatter(source: string): string {
  if (source.startsWith("---")) {
    const end = source.indexOf("---", 3);
    if (end !== -1) return source.slice(end + 3).trim();
  }
  return source;
}

// Configure marked once (safe defaults + GFM).
marked.setOptions({
  gfm: true,
  breaks: false,
});

export default async function DeArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = INSIGHTS_DE.find((a) => a.slug === slug);
  if (!article) return notFound();

  const mdxPath = path.join(
    process.cwd(),
    "content",
    "insights",
    "de",
    `${slug}.mdx`
  );

  let htmlContent: string | null = null;

  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, "utf-8");
    const markdown = stripFrontmatter(raw);

    // marked.parse is synchronous and stable here.
    htmlContent = marked.parse(markdown) as string;
  }

  const pageUrl = `${SITE}/de/insights/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "de-CH",
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    url: pageUrl,
    image: [`${SITE}/og.webp`],
    author: { "@type": "Person", name: "Gil M. Chalem" },
    publisher: {
      "@type": "Organization",
      name: "Executive Partners",
      url: SITE,
      // Optional: add a logo if you have one publicly accessible
      // logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    keywords: Array.isArray(article.keywords) ? article.keywords.join(", ") : "",
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}${HOME_DE}` },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE}/de/insights` },
      { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-14" lang="de-CH">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <nav className="text-xs text-white/60">
        <Link href={HOME_DE} className="hover:text-white">
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link href="/de/insights" className="hover:text-white">
          Insights
        </Link>
        <span className="mx-1">/</span>
        <span className="text-white/80 line-clamp-1">{article.title}</span>
      </nav>

      <Link
        href="/de/insights"
        className="mt-4 inline-block text-sm text-white/60 hover:text-white"
      >
        ← Zurück zu Insights
      </Link>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-3 text-xs text-white/60">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>·</span>
          <span>{article.readTime} Lesezeit</span>
        </div>

        <h1 className="mt-2 text-2xl font-semibold text-white">{article.title}</h1>

        <div className="mt-3 flex flex-wrap gap-2">
          {article.markets?.map((m) => (
            <span
              key={m}
              className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/75"
            >
              {m === "CH" ? "Schweiz" : m}
            </span>
          ))}
        </div>

        <p className="mt-4 text-white/80">{article.summary}</p>
      </div>

      {htmlContent ? (
        <article
          className="prose prose-invert prose-lg mt-8 max-w-none
prose-headings:font-semibold prose-headings:tracking-tight
prose-headings:text-white
prose-p:text-white/85 prose-p:leading-relaxed prose-p:my-4

prose-strong:text-white
prose-a:text-[#D4AF37] hover:prose-a:text-[#F5D778]

prose-hr:my-10 prose-hr:border-white/10

prose-blockquote:my-6 prose-blockquote:rounded-2xl
prose-blockquote:border prose-blockquote:border-white/12
prose-blockquote:border-l-4 prose-blockquote:border-l-[#D4AF37]
prose-blockquote:bg-white/5
prose-blockquote:px-5 prose-blockquote:py-4
prose-blockquote:font-medium
prose-blockquote:text-white/85

prose-small:text-white/60

prose-table:w-full
prose-th:text-white/90 prose-td:text-white/80
prose-td:align-top"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/70">Der vollständige Artikel wird in Kürze veröffentlicht.</p>
        </div>
      )}

      <aside className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="font-semibold text-white">Vertrauliches Gespräch über den Zürcher Markt?</p>
        <p className="mt-1 text-sm text-white/60">Gil | Executive Partners | Genf</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-5 py-2.5 text-sm font-semibold text-[#0B0E13] hover:opacity-90"
          >
            Kontakt aufnehmen
          </Link>

          <Link
            href="/en/portability"
            className="inline-flex rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Portability Score™
          </Link>
        </div>
      </aside>

      <footer className="mt-8 text-xs italic text-white/50">
        Dieser Artikel basiert auf öffentlich zugänglichen Quellen (KPMG, FINMA, Reuters, UBS-Geschäftsberichte) sowie auf Marktbeobachtungen aus der
        Mandatsarbeit von Executive Partners.
      </footer>
    </main>
  );
}