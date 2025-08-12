// app/hiring-managers/page.tsx
import Link from "next/link";
import { getJobs, type Job } from "@/lib/sheets";

export const revalidate = 30; // Revalidate on the server every 30s

export default async function HiringManagersPage() {
  let jobs: Job[] = [];
  let error: string | null = null;

  try {
    jobs = await getJobs(); // pulls ACTIVE jobs from "Jobs" tab
  } catch (e: any) {
    error = e?.message || "Failed to load jobs.";
  }

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Hiring Managers</h1>
          <p className="text-neutral-700">
            View current mandates and manage postings. Public view is{" "}
            <Link href="/jobs" className="underline">/jobs</Link>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/candidates/diag"
            className="text-sm underline text-neutral-600"
            target="_blank"
          >
            API diag
          </a>
          <a
            href="/jobs"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
          >
            Public jobs page
          </a>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      ) : (
        <>
          <div className="rounded-2xl border overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-neutral-50">
                <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-left">
                  <th className="w-20">ID</th>
                  <th className="w-80">Title</th>
                  <th className="w-40">Location</th>
                  <th className="w-40">Market</th>
                  <th className="w-32">Seniority</th>
                  <th className="w-24">Conf.</th>
                  <th className="w-24">Active</th>
                  <th className="w-28">Link</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-neutral-50/40">
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-6 text-center text-neutral-500">
                      No active jobs yet.
                    </td>
                  </tr>
                )}

                {jobs.map((j, i) => {
                  const title = j.Title || j.Role || "—";
                  const slugBase =
                    (j.ID && String(j.ID).trim()) ||
                    `${title}-${j.Location || ""}`;
                  const slug = slugBase
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "");
                  const link = slug ? `/jobs/${encodeURIComponent(slug)}` : "";

                  return (
                    <tr key={`${j.ID ?? "noid"}-${i}`} className="[&>td]:px-3 [&>td]:py-2 align-top">
                      <td>{j.ID || "—"}</td>
                      <td className="font-medium">{title}</td>
                      <td>{j.Location || "—"}</td>
                      <td>{j.Market || "—"}</td>
                      <td>{j.Seniority || "—"}</td>
                      <td>{(j.Confidential || "").toUpperCase() === "YES" ? "YES" : "NO"}</td>
                      <td>{(j.Active || "").toUpperCase() === "TRUE" ? "TRUE" : "FALSE"}</td>
                      <td>
                        {link ? (
                          <Link href={link} className="text-blue-700 hover:underline">View</Link>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-neutral-500">
            Showing {jobs.length} active job{jobs.length === 1 ? "" : "s"}.
            {" "}Updates appear within ~30s (ISR).
          </p>
        </>
      )}
    </section>
  );
}

