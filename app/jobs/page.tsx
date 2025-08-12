// app/jobs/page.tsx
import Link from "next/link";
import { getJobs, jobSlug, type Job } from "@/lib/sheets";

export const revalidate = 30;

function applyHref(job: Job) {
  const role = encodeURIComponent(job.Role || "");
  const market = encodeURIComponent(job.Market || "");
  const jobId = encodeURIComponent((job.ID || "").toString());
  return `/candidates/register?role=${role}&market=${market}&jobId=${jobId}`;
}

function askHref(job: Job) {
  // You can swap this for /contact if you prefer
  const subject = encodeURIComponent(`Question about role: ${job.Role || "N/A"} (${job.Location || ""})`);
  return `/contact?subject=${subject}`;
}

function detailHref(job: Job) {
  // Only generate a /jobs/[id] link if we actually have an id or a slug
  const idOrSlug = (job.ID && String(job.ID).trim()) || jobSlug({ Title: job.Role || "", Location: job.Location || "" });
  return idOrSlug ? `/jobs/${encodeURIComponent(idOrSlug)}` : null;
}

export default async function JobsPage() {
  const jobs = await getJobs(); // returns only Active == TRUE
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Current Opportunities</h1>
      <p className="text-neutral-700">
        Apply confidentially or register to be matched to upcoming mandates.
      </p>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {jobs.map((job) => {
          const titleLink = detailHref(job);
          return (
            <div key={`${job.ID}-${job.Role}-${job.Location}`} className="rounded-2xl border bg-white/60 p-5 shadow-sm">
              <div className="text-sm text-neutral-600">
                {(job.Location || "").trim()}
                {job.Location && job.Seniority ? " • " : ""}
                {(job.Seniority || "").trim()}
              </div>

              <h2 className="mt-1 text-lg font-semibold">
                {titleLink ? (
                  <Link href={titleLink} className="hover:underline">
                    {job.Role || "Untitled Role"}
                  </Link>
                ) : (
                  <span>{job.Role || "Untitled Role"}</span>
                )}
              </h2>

              {job.Confidential && job.Confidential.trim().toUpperCase() === "YES" ? (
                <div className="mt-1 text-xs text-neutral-500">Confidential</div>
              ) : null}

              <p className="mt-3 text-sm text-neutral-700 whitespace-pre-wrap">
                {(job.Summary || "").trim() || "Confidential"}
              </p>

              <div className="mt-4 flex gap-3">
                <Link
                  href={applyHref(job)}
                  className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                >
                  Apply confidentially
                </Link>
                <Link
                  href={askHref(job)}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-white"
                >
                  Ask about this role
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

