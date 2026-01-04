/* app/insights/[slug]/page.tsx */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getInsightBySlug } from "@/lib/insights/posts";
import TocMobile from "../TocMobile.client";
import TocDesktop from "../TocDesktop.client";

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
type Params = Promise<{ slug: string }>;

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights");

function readPostBody(slug: string): string | null {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw); // strips frontmatter
  return content.trim();
}

/** Minimal slug for headings (stable anchors) */
function slugifyHeading(input: string) {
  return input
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Extract plain text from react-markdown children */
function childrenToText(children: any): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children?.props?.children) return childrenToText(children.props.children);
  return "";
}

/** Build a Table of Contents from markdown headings */
function buildToc(
  md: string
): Array<{ id: string; title: string; level: 2 | 3 }> {
  const lines = md.split("\n");
  const toc: Array<{ id: string; title: string; level: 2 | 3 }> = [];
  const seen = new Map<string, number>();

  for (const line of lines) {
    const m = /^(##|###)\s+(.*)$/.exec(line.trim());
    if (!m) continue;

    const level = m[1] === "##" ? 2 : 3;
    let title = m[2].trim();

    // remove inline markdown emphasis/backticks
    title = title.replace(/[`*_~]/g, "").trim();
    if (!title) continue;

    let id = slugifyHeading(title);
    const count = (seen.get(id) ?? 0) + 1;
    seen.set(id, count);
    if (count > 1) id = `${id}-${count}`;

    toc.push({ id, title, level });
  }
  return toc;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = getInsightBySlug(slug);
  const title =
    post?.title ?? "Private Wealth Pulse | Executive Partners Insights";
  const description =
    post?.excerpt ||
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

export default async function InsightPostPage({ params }: { params: Params }) {
  const { slug } = await params;

  const post = getInsightBySlug(slug);
  if (!post) return notFound();

  const body = readPostBody(slug);
  if (!body) return notFound();

  const toc = buildToc(body);

  // Map heading title -> deterministic id (handles duplicates)
  const headingCount = new Map<string, number>();
  const headingIdForTitle = (title: string) => {
    const base = slugifyHeading(title);
    const count = (headingCount.get(base) ?? 0) + 1;
    headingCount.set(base, count);
    return count > 1 ? `${base}-${count}` : base;
  };

  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      {/* Luxury hero glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div className="absolute left-1/2 top-[-140px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#d4af37]/10 blur-[120px]" />
        <div className="absolute left-[10%] top-[40px] h-[360px] w-[360px] rounded-full bg-emerald-500/10 blur-[110px]" />
        <div className="absolute right-[8%] top-[60px] h-[320px] w-[320px] rounded-full bg-sky-500/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16">
        {/* Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            {post.tag ?? "Article"} — Insights
          </div>

          <h1 className="mt-6 text-4xl md:text-6xl font-semibold leading-[1.03] tracking-tight">
            {post.title}
          </h1>

          {post.date ? (
            <div className="mt-3 text-sm text-white/60">
              Published {post.date}
            </div>
          ) : null}

          {post.excerpt ? (
            <p className="mt-6 max-w-3xl text-[15px] md:text-[17px] leading-[1.9] text-white/80">
              {post.excerpt}
            </p>
          ) : null}

          <div className="mt-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <div className="h-px w-16 bg-[#d4af37]/60" />
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="mt-6">
            <Link
              href="/insights"
              className="text-sm text-white/70 hover:text-white"
            >
              ← Back to Insights
            </Link>
          </div>
        </div>

        {/* Layout: Body + TOC */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          {/* Left column: Mobile TOC + Body */}
          <div>
            {/* Mobile TOC (dropdown, active highlight handled inside component) */}
            <TocMobile toc={toc} />

            {/* Body */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.35)]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => {
                    const title = childrenToText(children).trim();
                    const id = headingIdForTitle(title);
                    return (
                      <div className="mt-12 scroll-mt-24">
                        <div className="mb-6 flex items-center gap-3">
                          <div className="h-px flex-1 bg-white/10" />
                          <div className="h-px w-14 bg-[#d4af37]/70" />
                          <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <h2
                          id={id}
                          className="text-2xl md:text-3xl font-semibold tracking-tight text-white"
                        >
                          {children}
                        </h2>
                      </div>
                    );
                  },
                  h3: ({ children }) => {
                    const title = childrenToText(children).trim();
                    const id = headingIdForTitle(title);
                    return (
                      <h3
                        id={id}
                        className="mt-9 scroll-mt-24 text-xl md:text-2xl font-semibold tracking-tight text-white/95"
                      >
                        {children}
                      </h3>
                    );
                  },
                  p: ({ children }) => (
                    <p className="mt-5 text-[15px] md:text-[17px] leading-[1.95] text-white/80">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">
                      {children}
                    </strong>
                  ),
                  hr: () => (
                    <div className="my-10 flex items-center gap-3">
                      <div className="h-px flex-1 bg-white/10" />
                      <div className="h-px w-16 bg-[#d4af37]/60" />
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                  ),
                  blockquote: ({ children }) => (
                    <div className="my-8 rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/10 p-6">
                      <div className="text-[12px] uppercase tracking-wider text-[#d4af37]">
                        Key takeaways
                      </div>
                      <div className="mt-3 space-y-2 text-[15px] md:text-[16px] leading-[1.9] text-white/85">
                        {children}
                      </div>
                    </div>
                  ),
                  ul: ({ children }) => (
                    <ul className="mt-4 space-y-2 pl-5 text-[15px] md:text-[17px] leading-[1.9] text-white/80">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mt-4 space-y-2 pl-5 text-[15px] md:text-[17px] leading-[1.9] text-white/80">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="marker:text-white/35">{children}</li>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-white underline decoration-white/25 underline-offset-4 hover:decoration-white/70"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  table: ({ children }) => (
                    <div className="my-8 overflow-x-auto rounded-xl border border-white/10">
                      <table className="w-full border-collapse text-left text-sm">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-white/[0.06] text-white">
                      {children}
                    </thead>
                  ),
                  th: ({ children }) => (
                    <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white/80">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3 align-top text-white/80">
                      {children}
                    </td>
                  ),
                  tr: ({ children }) => (
                    <tr className="border-t border-white/10">{children}</tr>
                  ),
                  em: ({ children }) => (
                    <em className="text-white/70">{children}</em>
                  ),
                }}
              >
                {body}
              </ReactMarkdown>
            </div>
          </div>

          {/* Sticky TOC (desktop, active highlight handled in client component) */}
          <aside className="hidden lg:block">
            <TocDesktop toc={toc} />
          </aside>
        </div>
      </div>
    </main>
  );
}