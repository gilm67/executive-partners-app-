// app/hiring-managers/page.tsx
import Link from "next/link";
import { getJobs, jobSlug, type Job } from "@/lib/sheets";

export const revalidate = 60; // refresh list every minute

export default async function HiringManagersPage() {
  const jobs: Job[] = await getJobs(); // returns only Active jobs

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Hiring Managers</h1>
          <p className="text-neutral-700">
            Active roles pulled from your Google Sheet. Create or edit in the sheet, then refresh here.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/jobs"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
            title="Public jobs listing"
          >
            View public jobs
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead className="bg-neutral-50 text-xs uppercase sticky top-0 z-10">
            <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-left">
              <th className="w-24">ID</th>
              <th className="w-[22%]">Role</th>
              <th className="w-40">Location</th>
              <th className="w-40">Market</th>
              <th className="w-32">Seniority</th>
              <th className="w-[38%]">Summary</th>
              <th className="w-24">Conf.</th>
              <th className="w-40">Actions</th>
            </tr>
          </thead>

          <tbody className="[&>tr:nth-child(even)]:bg-neutral-50/40">
            {jobs.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-sm text-neutral-600">
                  No active jobs found. Add rows to the <strong>Jobs</strong> tab
                  (Active = TRUE) and refresh.
                </td>
              </tr>
            )}

            {jobs.map((j) => {
              const slug = jobSlug(j);
              const publicUrl = `/jobs/${encodeURIComponent(slug)}`;

              return (
                <tr key={j.ID || slug} className="[&>td]:px-3 [&>td]:py-2 align-top">
                  <td className="font-mono text-xs text-neutral-600">{j.ID || "—"}</td>
                  <td className="font-medium">{j.Role || "—"}</td>
                  <td>{j.Location || "—"}</td>
                  <td>{j.Market || "—"}</td>
                  <td>{j.Seniority || "—"}</td>
                  <td className="text-neutral-800">{j.Summary || "—"}</td>
                  <td>{(j.Confidential || "").toUpperCase() === "YES" ? "YES" : "NO"}</td>
                  <td className="whitespace-nowrap space-x-2">
                    <Link
                      href={publicUrl}
                      className="rounded-lg border px-2 py-1 text-xs hover:bg-white"
                      title="Open public job page"
                    >
                      Open public page
                    </Link>
                    <button
                      className="rounded-lg border px-2 py-1 text-xs hover:bg-white"
                      onClick={async () => {
                        try {
                          const url =
                            (typeof window !== "undefined"
                              ? `${window.location.origin}${publicUrl}`
                              : publicUrl) as string;
                          await navigator.clipboard.writeText(url);
                          alert("Copied link to clipboard.");
                        } catch {
                          alert("Could not copy link.");
                        }
                      }}
                    >
                      Copy link
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-neutral-500">Showing {jobs.length} active jobs.</p>
    </section>
  );
}

