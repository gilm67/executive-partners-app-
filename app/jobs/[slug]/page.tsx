// app/jobs/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

/* ------------ Types (strings because KV stores string values) ----------- */
type JobDoc = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  location: string;
  market: string;
  seniority: string;
  role: string;
  confidential: string; // "true" | "false"
  active: string;       // "true" | "false"
  createdAt?: string;
};

/* ----------------------- Data helpers (server) -------------------------- */
async function getJobBySlug(slug: string): Promise<JobDoc | null> {
  const redis = await getRedis();
  const id = await redis.get(`jobs:by-slug:${slug}`);
  if (!id) return null;
  const data = await redis.hgetall(id);
  if (!data || !data.id) return null;
  return data as unknown as JobDoc;
}

/* ------------------- Minimal markdown-ish rendering --------------------- */
/** Tiny renderer: supports `## Heading`, bullet lists, and paragraphs. */
function renderDescription(md: string) {
  // Normalize line endings
  md = (md || "").replace(/\r\n/g, "\n").trim();

  // Split into blocks separated by blank lines
  const blocks = md.split(/\n{2,}/);

  return blocks.map((block, i) => {
    const lines = block.split("\n");

    // Heading?
    if (lines.length === 1 && /^#{2}\s+/.test(lines[0])) {
      const text = lines[0].replace(/^#{2}\s+/, "");
      return (
        <h3 key={`h-${i}`} className="mt-8 text-lg font-semibold tracking-tight">
          {text}
        </h3>
      );
    }

    // Bullet list? (all lines start with "- ")
    if (lines.every((l) => /^\-\s+/.test(l))) {
      return (
        <ul key={`ul-${i}`} className="mt-4 list-disc pl-5 space-y-1">
          {lines.map((l, j) => (
            <li key={`li-${i}-${j}`}>{l.replace(/^\-\s+/, "")}</li>
          ))}
        </ul>
      );
    }

    // Paragraph (preserve single line breaks)
    return (
      <p key={`p-${i}`} className="mt-4 leading-relaxed text-neutral-800">
        {lines.map((l, j) => (
          <span key={`span-${i}-${j}`}>
            {l}
            {j < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
    );
  });
}

/* --------------------------- Metadata (loose typing) -------------------- */
export async function generateMetadata(props: any) {
  const slug: string = props?.params?.slug ?? "";
  const job = await getJobBySlug(slug);
  if (!job) {
    return { title: "Role not found — Executive Partners" };
  }
  const title = `${job.title} | Executive Partners`;
  const description =
    job.summary || `${job.role} – ${job.market} – ${job.location}`;
  const url = `https://www.execpartners.ch/jobs/${job.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ------------------------------- Page ----------------------------------- */
export default async function JobPage(props: any) {
  const slug: string = props?.params?.slug ?? "";
  const job = await getJobBySlug(slug);
  if (!job || job.active === "false") {
    notFound();
  }

  const applyHref = `/apply?job=${encodeURIComponent(job.title)}`;

  return (
    <div className="bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-neutral-500">
          <Link href="/jobs" className="hover:text-neutral-800">
            ← Back to all roles
          </Link>
        </nav>

        {/* Hero */}
        <header className="rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-neutral-200">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {job.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-neutral-100 px-3 py-1">
              {job.market}
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1">
              {job.location}
            </span>
            {job.seniority ? (
              <span className="rounded-full bg-neutral-100 px-3 py-1">
                {job.seniority}
              </span>
            ) : null}
            {job.confidential === "true" ? (
              <span className="rounded-full bg-amber-100 px-3 py-1">
                Confidential
              </span>
            ) : null}
          </div>

          {job.summary ? (
            <p className="mt-4 max-w-3xl text-neutral-700">{job.summary}</p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={applyHref}
              className="inline-flex items-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Apply / Submit CV
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
            >
              View all roles
            </Link>
          </div>
        </header>

        {/* Body */}
        <section className="mt-8 rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-neutral-200">
          <article className="prose prose-neutral max-w-none">
            {renderDescription(job.description)}
          </article>
        </section>

        {/* Footer note */}
        <p className="mt-6 text-xs text-neutral-500">
          Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "recently"} ·{" "}
          {job.active === "true" ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  );
}