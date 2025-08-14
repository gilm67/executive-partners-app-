// app/hiring-managers/page.tsx
import Link from "next/link";
import CreateJobForm from "./CreateJobForm";
import { getJobs, jobSlug } from "@/lib/sheets";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HiringManagersPage() {
  let jobs: Awaited<ReturnType<typeof getJobs>> = [];
  try {
    jobs = await getJobs();
  } catch (e) {
    console.error("Jobs load error:", e);
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Hiring Managers</h1>
      <p className="text-neutral-400">
        Post new roles and view active openings.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* LEFT: create a job */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
          <CreateJobForm />
        </div>

        {/* RIGHT: active jobs */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Jobs</h2>
            <Link href="/jobs" className="text-sm underline text-neutral-300 hover:text-white">
              View all
            </Link>
          </div>

          {jobs.length === 0 ? (
            <p className="text-sm text-neutral-400">
              No active jobs yet. Create one on the left.
            </p>
          ) : (
            <ul className="divide-y divide-neutral-800">
              {jobs.map((j, i) => {
                const id = j.ID || jobSlug(j);
                const url = id ? `/jobs/${encodeURIComponent(id)}` : undefined;
                const title = j.Title || j.Role || "Untitled Role";
                const meta = [j.Location, j.Market, j.Seniority]
                  .filter(Boolean)
                  .join(" • ");
                const isConf = (j.Confidential || "").toUpperCase() === "YES";

                return (
                  <li key={`${id}-${i}`} className="py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {url ? (
                          <Link
                            href={url}
                            className="font-medium text-white hover:underline"
                          >
                            {title}
                          </Link>
                        ) : (
                          <span className="font-medium text-white">{title}</span>
                        )}
                        {meta && (
                          <div className="text-sm text-neutral-400">{meta}</div>
                        )}
                        {j.Summary && (
                          <p className="mt-1 text-sm text-neutral-300">{j.Summary}</p>
                        )}
                      </div>
                      <div className="text-right text-xs text-neutral-500">
                        {isConf ? "Confidential" : ""}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

