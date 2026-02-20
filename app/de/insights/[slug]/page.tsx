import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INSIGHTS_DE } from "../articles";
import fs from "fs";
import path from "path";
import { marked } from "marked";

type Props = { params: { slug: string } };

const SITE = "https://www.execpartners.ch";
const HOME_DE = "/";

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
  const slug = params.slug;
  const article = INSIGHTS_DE.find((a) => a.slug === slug);
  if (!article) return {};

  const url = `${SITE}/de/insights/${article.slug}`;

  return {
    title: { absolute: `${article.title} | Executive Partners` },
    description: article.summary,
    alternates: {
      canonical: url,
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

/**
 * Replace long dashes with commas ONLY when used like punctuation:
 * surrounded by spaces: " — " or " – ".
 *
 * NEVER touch:
 * - markdown HR lines (---)
 * - markdown table separator lines (|---|---|)
 * - code fences content
 * - numeric ranges like 200–350, 6–12, 1–2, etc.
 */
function dashToCommaSafe(markdown: string): string {
  const lines = markdown.split("\n");
  let inCode = false;

  const out = lines.map((line) => {
    const trimmed = line.trim();

    // toggle fenced code blocks
    if (/^```/.test(trimmed)) {
      inCode = !inCode;
      return line;
    }
    if (inCode) return line;

    // horizontal rule: --- / ---- / etc.
    if (/^-{3,}$/.test(trimmed)) return line;

    // table separator: |---|---|
    if (/^\|?(\s*:?-{3,}:?\s*\|)+\s*$/.test(trimmed)) return line;

    // ✅ only replace when dash is surrounded by spaces (punctuation usage)
    return line.replace(/(\s)[—–](\s)/g, "$1, $2");
  });

  return out
    .join("\n")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ",")
    .replace(/[ \t]{2,}/g, " ");
}

/**
 * Luxe table wrapper (stable)
 * We wrap <table>..</table> and inject a colgroup to prevent overlap reliably.
 */
function wrapTables(html: string): string {
  if (!html.includes("<table")) return html;

  const COLGROUP = `
    <colgroup>
      <col style="width:42%" />
      <col style="width:20%" />
      <col style="width:38%" />
    </colgroup>
  `.trim();

  return html
    .replace(
      /<table>/g,
      `<div class="my-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.7)]">
  <div class="h-[2px] w-full bg-gradient-to-r from-[#D4AF37]/80 via-[#F5D778]/40 to-transparent"></div>
  <div class="px-1 pb-1 pt-0.5">
    <table class="w-full table-fixed border-collapse text-[13px] leading-5">
      ${COLGROUP}`
    )
    .replace(/<\/table>/g, `</table></div></div>`);
}

// ✅ Vercel/TS fix: remove unsupported headerIds from MarkedOptions
marked.setOptions({
  gfm: true,
  breaks: false,
  mangle: false,
});

export default async function DeArticlePage({ params }: Props) {
  const slug = params.slug;

  const article = INSIGHTS_DE.find((a) => a.slug === slug);
  if (!article) return notFound();

  const mdxPath = path.join(process.cwd(), "content", "insights", "de", `${slug}.mdx`);
  let htmlContent: string | null = null;

  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, "utf-8");
    const markdown = stripFrontmatter(raw);
    const cleaned = dashToCommaSafe(markdown);

    const html = marked.parse(cleaned) as string;
    htmlContent = wrapTables(html);
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
    publisher: { "@type": "Organization", name: "Executive Partners", url: SITE },
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

      <Link href="/de/insights" className="mt-4 inline-block text-sm text-white/60 hover:text-white">
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
          className="prose prose-invert prose-lg mt-10 max-w-none

prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white
prose-h1:leading-[1.15]
prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-[1.75rem] prose-h2:leading-[1.25]
prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-[1.35rem] prose-h3:leading-[1.35]

prose-p:text-white/85 prose-p:leading-[1.9] prose-p:my-5
prose-li:text-white/85 prose-li:leading-[1.85] prose-li:my-2

prose-strong:text-white
prose-a:text-[#D4AF37] hover:prose-a:text-[#F5D778] prose-a:no-underline hover:prose-a:underline

prose-hr:my-14 prose-hr:border-white/10

prose-blockquote:my-10 prose-blockquote:rounded-2xl
prose-blockquote:border prose-blockquote:border-white/12
prose-blockquote:border-l-4 prose-blockquote:border-l-[#D4AF37]
prose-blockquote:bg-white/[0.045]
prose-blockquote:px-7 prose-blockquote:py-6
prose-blockquote:font-medium
prose-blockquote:text-white/85

prose-small:text-white/60

/* TABLE typography + spacing (stable + luxe) */
prose-table:w-full prose-table:table-fixed prose-table:border-collapse
prose-thead:bg-white/[0.055]
prose-th:px-6 prose-th:py-4 prose-th:text-left prose-th:font-semibold prose-th:tracking-tight prose-th:text-white/90
prose-th:border-b prose-th:border-white/10
prose-td:px-6 prose-td:py-4 prose-td:align-top prose-td:text-white/80 prose-td:break-words prose-td:leading-[1.65]
prose-tbody:divide-y prose-tbody:divide-white/5
prose-tr:transition-colors hover:prose-tr:bg-white/[0.045]

/* Wert column: right align, allow wrap */
prose-th:[&:nth-child(2)]:text-right
prose-td:[&:nth-child(2)]:text-right prose-td:[&:nth-child(2)]:text-white/90
prose-td:[&:nth-child(2)]:tabular-nums prose-td:[&:nth-child(2)]:whitespace-normal

/* Quelle column: separator + breathing room */
prose-th:[&:nth-child(3)]:pl-8 prose-th:[&:nth-child(3)]:border-l prose-th:[&:nth-child(3)]:border-white/10
prose-td:[&:nth-child(3)]:pl-8 prose-td:[&:nth-child(3)]:border-l prose-td:[&:nth-child(3)]:border-white/10"
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