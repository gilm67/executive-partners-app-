// app/jobs/page.tsx
import Link from "next/link";
import { getJobs, jobSlug, type Job } from "@/lib/sheets";

export const revalidate = 60;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-700/60 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-300">
      {children}
    </span>
  );
}

export default async function JobsPage() {
  // Filter out rows explicitly marked as FALSE in the “Active” column (if present)
  const rows = (await getJobs()).filter(
    (j: any) => String(j?.Active ?? "").toUpperCase() !== "FALSE"
  );

  // Optional debug:
  // console.log("DEBUG jobs (count):", rows.length, rows.slice(0, 3));

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Open Roles</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Discreet mandates across Swiss & international private banking.
        </p>
      </header>

      {rows.length === 0 ? (
        <p className="text-neutral-400">No live roles right now.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {rows.map((job: Job) => {
            const tags = [job.Location, job.Market, job.Seniority].filter(Boolean) as string[];
            const href = `/jobs/${jobSlug(job)}`;
            return (
              <Link
                key={job.ID || job.Title}
                href={href}
                className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-5 shadow-sm transition-colors hover:border-neutral-700 hover:bg-neutral-900/60"
              >
                <div className="mb-3 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
                <h3 className="text-lg font-semibold text-neutral-100">
                  {job.Title || job.Role || "Role"}
                </h3>
                {job.Summary && (
                  <p className="mt-1 text-sm text-neutral-400">{job.Summary}</p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
