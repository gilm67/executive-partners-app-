// app/hiring-managers/page.tsx
import Link from "next/link";
import { getJobs, jobSlug, type Job } from "@/lib/sheets";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export default async function HiringManagersPage() {
  const jobs: Job[] = await getJobs(); // fetch active jobs

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold">Hiring Managers</h1>
        <Link
          href="/jobs"
          className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
        >
          View Public Jobs
        </Link>
      </div>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-3 py-2 text-left">ID</th>
            <th className="px-3 py-2 text-left">Role</th>
            <th className="px-3 py-2 text-left">Location</th>
            <th className="px-3 py-2 text-left">Market</th>
            <th className="px-3 py-2 text-left">Seniority</th>
            <th className="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            const slug = jobSlug(job);
            const url = `/jobs/${encodeURIComponent(slug)}`;
            return (
              <tr key={job.ID || slug} className="hover:bg-gray-100">
                <td className="px-3 py-2">{job.ID}</td>
                <td className="px-3 py-2">{job.Role}</td>
                <td className="px-3 py-2">{job.Location}</td>
                <td className="px-3 py-2">{job.Market}</td>
                <td className="px-3 py-2">{job.Seniority}</td>
                <td className="px-3 py-2">
                  <Link href={url} className="text-blue-600 hover:underline">
                    Open Public Page
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

