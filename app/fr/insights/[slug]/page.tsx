import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INSIGHTS_FR } from "../articles";
import fs from "fs";
import path from "path";
import { marked } from "marked";

type Props = { params: { slug: string } };

const SITE = "https://www.execpartners.ch";

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("fr-CH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function generateStaticParams() {
  return INSIGHTS_FR.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const article = INSIGHTS_FR.find((a) => a.slug === slug);
  if (!article) return {};

  const url = `${SITE}/fr/insights/${article.slug}`;

  return {
    title: { absolute: `${article.title}` },
    description: article.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      locale: "fr_CH",
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

function wrapTables(html: string): string {
  if (!html.includes("<table")) return html;
  return html
    .replace(
      /<table>/g,
      `<div class="my-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_20px_60px_-40px_rgba(0,0,0,0.7)]">
  <div class="h-[2px] w-full bg-gradient-to-r from-[#D4AF37]/80 via-[#F5D778]/40 to-transparent"></div>
  <div class="px-1 pb-1 pt-0.5">
    <table class="w-full table-fixed border-collapse text-[13px] leading-5">`
    )
    .replace(/<\/table>/g, `</table></div></div>`);
}

marked.setOptions({ gfm: true, breaks: false });

export default async function FrArticlePage({ params }: Props) {
  const slug = params.slug;
  const article = INSIGHTS_FR.find((a) => a.slug === slug);
  if (!article) return notFound();

  const mdxPath = path.join(process.cwd(), "content", "insights", "fr", `${slug}.mdx`);
  let htmlContent: string | null = null;

  if (fs.existsSync(mdxPath)) {
    const raw = fs.readFileSync(mdxPath, "utf-8");
    const markdown = stripFrontmatter(raw);
    const html = marked.parse(markdown) as string;
    htmlContent = wrapTables(html);
  }

  const pageUrl = `${SITE}/fr/insights/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "fr-CH",
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
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE}/fr` },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE}/fr/insights` },
      { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-14" lang="fr-CH">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }} />

      <nav className="text-xs text-white/60">
        <Link href="/fr" className="hover:text-white">Accueil</Link>
        <span className="mx-1">/</span>
        <Link href="/fr/insights" className="hover:text-white">Insights</Link>
        <span className="mx-1">/</span>
        <span className="text-white/80 line-clamp-1">{article.title}</span>
      </nav>

      <Link href="/fr/insights" className="mt-4 inline-block text-sm text-white/60 hover:text-white">
        ← Retour aux Insights
      </Link>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-3 text-xs text-white/60">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>·</span>
          <span>{article.readTime} de lecture</span>
        </div>
        <h1 className="mt-2 text-2xl font-semibold text-white">{article.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {article.markets?.map((m) => (
            <span key={m} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/75">
              {m === "CH" ? "Suisse" : m}
            </span>
          ))}
        </div>
        <p className="mt-4 text-white/80">{article.summary}</p>
      </div>

      {htmlContent ? (
        <article
          className="prose prose-invert prose-lg mt-10 max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-[1.75rem] prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-[1.35rem] prose-p:text-white/85 prose-p:leading-[1.9] prose-p:my-5 prose-li:text-white/85 prose-li:leading-[1.85] prose-li:my-2 prose-strong:text-white prose-a:text-[#D4AF37] hover:prose-a:text-[#F5D778] prose-a:no-underline hover:prose-a:underline prose-hr:my-14 prose-hr:border-white/10 prose-blockquote:my-10 prose-blockquote:rounded-2xl prose-blockquote:border prose-blockquote:border-white/12 prose-blockquote:border-l-4 prose-blockquote:border-l-[#D4AF37] prose-blockquote:bg-white/[0.045] prose-blockquote:px-7 prose-blockquote:py-6 prose-blockquote:font-medium prose-blockquote:text-white/85"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-white/70">L&apos;article complet sera publié prochainement.</p>
        </div>
      )}

      <aside className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="font-semibold text-white">Conversation confidentielle sur le marché genevois ?</p>
        <p className="mt-1 text-sm text-white/60">Gil M. Chalem | Executive Partners | Genève</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/en/contact" className="inline-flex rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-5 py-2.5 text-sm font-semibold text-[#0B0E13] hover:opacity-90">
            Nous contacter
          </Link>
          <Link href="/en/portability" className="inline-flex rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
            Portability Score™
          </Link>
        </div>
      </aside>

      <footer className="mt-8 text-xs italic text-white/50">
        Cet article s&apos;appuie sur des sources publiques (KPMG, FINMA, finews.ch) ainsi que sur les observations de terrain issues de la pratique de mandat d&apos;Executive Partners.
      </footer>
    </main>
  );
}
