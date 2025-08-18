// app/jobs/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJobByIdOrSlug, jobSlug } from "@/lib/sheets";

// Server-only
export const revalidate = 60;

type Params = { id: string };

export default async function JobDetailPage(
  props: { params: Promise<Params> } // Next 15: params is a Promise
) {
  const { id } = await props.params;

  const job = await getJobByIdOrSlug(id);
  if (!job) {
    notFound();
  }

  // Normalize fields safely
  const title = (job.Title || job.Role || "").trim() || "Untitled Role";
  const location = (job.Location || "").trim();
  const market = (job.Market || "").trim();
  const seniority = (job.Seniority || "").trim();
  const summary = (job.Summary || "").toString().trim();
  const rawDescription = (job.Description || "").toString();

  // Prepare markdown-ish description (if any)
  const unescaped = rawDescription.replace(/\\n/g, "\n").trim();
  const bolded = unescaped
    .replace(
      /(^|\n)\s*Key Responsibilities\s*\/\s*Tasks\s*(\n|$)/gi,
      "\n**Key Responsibilities / Tasks**\n"
    )
    .replace(
      /(^|\n)\s*Key Qualifications\s*\/\s*Experience\s*(\n|$)/gi,
      "\n**Key Qualifications / Experience**\n"
    );
  const mdReady = bolded
    .replace(/(^|\n)\s*•\s*/g, "\n- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const idOrSlug = (job.ID && String(job.ID)) || jobSlug(job);
  const applyHref = `/apply?role=${encodeURIComponent(title)}&market=${encodeURIComponent(
    market || location || ""
  )}&jobId=${encodeURIComponent(idOrSlug)}`;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <Link
          href="/jobs"
          className="text-sm text-neutral-400 underline hover:text-neutral-200"
        >
          ← Back to Jobs
        </Link>
      </div>

      {/* Meta line */}
      <p className="text-sm text-neutral-400">
        {location || "—"}
        {market ? ` • ${market}` : ""}
        {seniority ? ` • ${seniority}` : ""}
      </p>

      {/* Summary as a full card (always shows if present) */}
      {summary && (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-neutral-200">
          <h2 className="mb-2 text-lg font-semibold">Summary</h2>
          <p className="whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {/* Role Description (preferred) OR fallback Details card */}
      {mdReady ? (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-neutral-200">
          <h2 className="mb-2 text-lg font-semibold">Role Description</h2>
          <Article md={mdReady} />
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-neutral-200">
          <h2 className="mb-2 text-lg font-semibold">Details</h2>
          <ul className="text-sm text-neutral-300 space-y-1">
            <li><span className="text-neutral-500">Location:</span> {location || "—"}</li>
            <li><span className="text-neutral-500">Market:</span> {market || "—"}</li>
            <li><span className="text-neutral-500">Seniority:</span> {seniority || "—"}</li>
            {summary ? (
              <li className="pt-2">
                <span className="text-neutral-500">Summary:</span>{" "}
                <span className="whitespace-pre-wrap">{summary}</span>
              </li>
            ) : null}
          </ul>
          <p className="mt-3 text-xs text-neutral-400">
            More details coming soon. You can still apply confidentially or ask us about the role.
          </p>
        </div>
      )}

      {/* CTAs */}
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

      {/* Reference */}
      <p className="text-xs text-neutral-500">Reference: {idOrSlug || "(unassigned)"}</p>
    </section>
  );
}

/** Minimal renderer for our markdown-ish text */
function Article({ md }: { md: string }) {
  const lines = md.split("\n");
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} className="h-2" />;
        if (t.startsWith("- ")) {
          return (
            <div key={i} className="flex items-start gap-2">
              <div className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-neutral-400" />
              <div className="whitespace-pre-wrap">{t.slice(2)}</div>
            </div>
          );
        }
        const m = t.match(/^\*\*(.+)\*\*$/);
        if (m) return <h3 key={i} className="mt-4 text-base font-semibold">{m[1]}</h3>;
        return <p key={i} className="whitespace-pre-wrap">{t}</p>;
      })}
    </div>
  );
}

