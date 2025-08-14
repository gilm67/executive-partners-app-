import Link from "next/link";
import { getApplications } from "@/lib/sheets";

export const revalidate = 30;

export default async function ApplicationsPage() {
  const apps = await getApplications();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-white">Candidate Applications</h1>
        <Link
          href="/api/applications/csv"
          className="rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-white hover:bg-white/20"
        >
          Download CSV
        </Link>
      </div>

      {/* High-contrast table card */}
      <div className="overflow-x-auto rounded-xl border border-white/15 bg-white">
        <table className="min-w-[900px] w-full text-sm text-neutral-900">
          <thead className="bg-neutral-100 text-neutral-700">
            <tr className="text-left">
              <th className="px-4 py-3 whitespace-nowrap font-semibold">Timestamp</th>
              <th className="px-4 py-3 whitespace-nowrap font-semibold">Name</th>
              <th className="px-4 py-3 whitespace-nowrap font-semibold">Email</th>
              <th className="px-4 py-3 whitespace-nowrap font-semibold">Role</th>
              <th className="px-4 py-3 whitespace-nowrap font-semibold">Market</th>
              <th className="px-4 py-3 font-semibold">Notes</th>
              <th className="px-4 py-3 whitespace-nowrap font-semibold">Job</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {apps.map((a, i) => {
              const jobId = (a["Job ID"] || "").trim();
              const jobLink = jobId ? `/jobs/${jobId}` : "";

              return (
                <tr key={`${a.Timestamp}-${i}`} className="align-top">
                  <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">
                    {a.Timestamp || "—"}
                  </td>
                  <td className="px-4 py-3">{a.Name || "—"}</td>
                  <td className="px-4 py-3">
                    {a.Email ? (
                      <a className="underline text-blue-700" href={`mailto:${a.Email}`}>
                        {a.Email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">{a.Role || "—"}</td>
                  <td className="px-4 py-3">{a.Market || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="whitespace-pre-wrap text-neutral-800">{a.Notes || "—"}</div>
                  </td>
                  <td className="px-4 py-3">
                    {jobLink ? (
                      <Link className="underline text-blue-700" href={jobLink}>
                        View job #{jobId}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              );
            })}
            {apps.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-neutral-600" colSpan={7}>
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-white/70">
        Tip: filter by role/market in your spreadsheet; this page mirrors the “Applications” tab.
      </p>
    </section>
  );
}

