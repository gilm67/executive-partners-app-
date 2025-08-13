// app/jobs/page.tsx
import Link from "next/link";
import { getJobs, jobSlug, Job } from "@/lib/sheets";
import JobsFilterClient from "./components/JobsFilterClient";

export const revalidate = 30;

type UIJob = {
  id: string;
  title: string;
  role: string;
  location: string;
  market: string;
  seniority: string;
  summary: string;
  confidential: boolean;
  slug: string;
};

function toUI(j: Job, fallbackId: number): UIJob {
  const title = (j.Title || j.Role || "").trim();
  const role = (j.Role || j.Title || "").trim();

  return {
    id: String(j.ID || fallbackId),
    title: title || "Untitled Role",
    role,
    location: (j.Location || "").trim(),
    market: (j.Market || "").trim(),
    seniority: (j.Seniority || "").trim(),
    summary: (j.Summary || j.Description || "").trim(),
    confidential: String(j.Confidential || "").toUpperCase() === "YES",
    slug: jobSlug(j),
  };
}

export default async function JobsPage() {
  const data = await getJobs();
  const jobs: UIJob[] = data.map((j, i) => toUI(j, 1000 + i));

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Current Opportunities</h1>
        <p className="text-neutral-700">
          Apply confidentially or register to be matched to upcoming mandates.
        </p>
      </div>

      {/* Client-side filtering/search UI */}
      <JobsFilterClient jobs={jobs} />

      {/* Fallback (no JS) */}
      <noscript>
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((j) => (
            <article
              key={j.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="text-sm text-neutral-500">
                {j.location || "—"} • {j.seniority || "—"}
              </div>
              <h3 className="mt-1 text-lg font-semibold">{j.title}</h3>
              {j.confidential && (
                <div className="mt-1 text-xs text-neutral-500">Confidential</div>
              )}
              {j.summary && (
                <p className="mt-2 text-sm text-neutral-700">{j.summary}</p>
              )}

              <div className="mt-4 flex gap-3">
                <Link
                  href={`/candidates/register?role=${encodeURIComponent(
                    j.role || j.title
                  )}&market=${encodeURIComponent(j.market || "")}&jobId=${encodeURIComponent(
                    j.id
                  )}`}
                  className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800"
                >
                  Apply confidentially
                </Link>
                <Link
                  href={`/jobs/${encodeURIComponent(j.slug || j.id)}`}
                  className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
                >
                  Ask about this role
                </Link>
              </div>
            </article>
          ))}
        </div>
      </noscript>
    </section>
  );
}

