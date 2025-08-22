// app/jobs/page.tsx
import Link from "next/link";
import { getJobs, jobSlug, type Job } from "@/lib/sheets";

export const revalidate = 60;

function normalize(job: any) {
  const Title = (job.Title ?? job.title ?? job.Role ?? "").toString().trim();
  const Location = (job.Location ?? job.location ?? "").toString().trim();
  const Market = (job.Market ?? job.market ?? "").toString().trim();
  const Seniority = (job.Seniority ?? job.seniority ?? "").toString().trim();
  const Summary = (job.Summary ?? job.summary ?? "").toString().trim();
  const Active = (job.Active ?? job.active ?? "").toString().trim();
  const ID = (job.ID ?? job.id ?? "").toString().trim();
  return { ID, Title, Location, Market, Seniority, Summary, Active };
}

function isActive(job: any) {
  const v = (job.Active ?? job.active ?? "").toString().trim().toUpperCase();
  return v !== "FALSE";
}

function short(s: string, n = 110) {
  if (!s) return "";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export default async function JobsPage() {
  const all: Job[] = await getJobs();
  const active = all.map(normalize).filter(isActive);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-white mb-4">Open Roles</h1>

      {active.length === 0 ? (
        <p className="text-neutral-400">No active roles available at this time.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((j) => {
            const slug = j.ID ? `${jobSlug({ ID: j.ID, Title: j.Title })}` : "#";
            return (
              <Link
                key={`${j.ID}-${slug}`}
                href={`/jobs/${encodeURIComponent(slug)}`}
                className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 hover:border-neutral-700"
              >
                <h3 className="text-white font-semibold">{short(j.Title || "Untitled", 60)}</h3>
                <p className="mt-1 text-sm text-neutral-400">
                  {j.Location || "—"}
                  {j.Market ? ` • ${j.Market}` : ""}
                  {j.Seniority ? ` • ${j.Seniority}` : ""}
                </p>
                {j.Summary ? (
                  <p className="mt-3 text-sm text-neutral-300">{short(j.Summary, 120)}</p>
                ) : null}
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
