// app/jobs/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobByIdOrSlug, jobSlug, type Job } from "@/lib/sheets";

// keep it server-only (we import googleapis indirectly in lib/sheets)
export const revalidate = 60;

// Next.js 15 dynamic routes: params must be awaited
type Params = { id: string };

export default async function JobDetailPage(
  props: { params: Promise<Params> } // <- IMPORTANT: Promise here
) {
  const { id } = await props.params;   // <- and await here

  const job = await getJobByIdOrSlug(id);
  if (!job) {
    notFound();
  }

  // Safe field normalization
  const title = (job.Title || job.Role || "").trim() || "Untitled Role";
  const location = (job.Location || "").trim();
  const market = (job.Market || "").trim();
  const seniority = (job.Seniority || "").trim();
  const summary = (job.Summary || "").trim();
  const rawDescription = (job.Description || "").toString();

  // Unescape any "\n" sequences into real newlines (data often pasted that way)
  const unescaped = rawDescription.replace(/\\n/g, "\n").trim();

  // Make simple “section” headings bold when they appear on a line by themselves
  const bolded = unescaped
    .replace(/(^|\n)\s*Key Responsibilities\s*\/\s*Tasks\s*(\n|$)/gi, "\n**Key Responsibilities / Tasks**\n")
    .replace(/(^|\n)\s*Key Qualifications\s*\/\s*Experience\s*(\n|$)/gi, "\n**Key Qualifications / Experience**\n");

  // Convert bullet characters to markdown bullets and collapse excessive blank lines
  const mdReady = bolded
    .replace(/(^|\n)\s*•\s*/g, "\n- ")
    .replace(/\n{3,}/g, "\n\n");

  const idOrSlug = (job.ID && String(job.ID)) || jobSlug(job);
  const applyHref = `/apply?role=${encodeURIComponent(title)}&market=${encodeURIComponent(market || location || "")}&jobId=${encodeURIComponent(idOrSlug)}`;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Link
          href="/jobs"
          className="text-sm text-neutral-400 underline hover:text-neutral-200"
        >
          ← Back to Jobs
        </Link>
      </div>

      <p className="text-sm text-neutral-400">
        {(location || "—")}
        {market ? ` • ${market}` : ""}
        {seniority ? ` • ${seniority}` : ""}
      </p>

      {summary && (
        <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-4 text-neutral-200">
          <p className="whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {mdReady && (
        <div className="rounded-xl border border-neutral-700 bg-neutral-900 p-4 text-neutral-200">
          <h2 className="mb-2 text-lg font-semibold">Role Description</h2>
          {/* minimal markdown renderer for headings + bullets */}
          <Article md={mdReady} />
        </div>
      )}

      <div className="flex gap-3">
        <Link
          href={applyHref}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Apply confidentially
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-neutral-700 px-4 py-2 text-neutral-200 hover:bg-neutral-900"
        >
          Ask about this role
        </Link>
      </div>

      <p className="text-xs text-neutral-500">
        Reference: {idOrSlug || "(unassigned)"}
      </p>
    </section>
  );
}

/**
 * Tiny Markdown-ish renderer for our limited needs:
 * - **Bold** headings
 * - "- " bullets
 * - Paragraphs & line breaks
 */
function Article({ md }: { md: string }) {
  const lines = md.split("\n");
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} className="h-2" />;
        if (t.startsWith("- ")) {
          // bullet
          return (
            <div key={i} className="flex items-start gap-2">
              <div className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-neutral-400" />
              <div className="whitespace-pre-wrap">{t.slice(2)}</div>
            </div>
          );
        }
        // bold headings if wrapped in **...**
        const m = t.match(/^\*\*(.+)\*\*$/);
        if (m) {
          return <h3 key={i} className="mt-4 text-base font-semibold">{m[1]}</h3>;
        }
        return <p key={i} className="whitespace-pre-wrap">{t}</p>;
      })}
    </div>
  );
}

