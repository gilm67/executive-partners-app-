// app/jobs/page.tsx
import Link from "next/link";
import { getAllJobsPublic } from "@/lib/jobs-public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JobsPage() {
  const jobs = await getAllJobsPublic();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Open Roles</h1>

      {!jobs?.length ? (
        <p>No open roles at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((j) => (
            <li key={j.slug} className="border rounded-lg p-4">
              <Link href={`/jobs/${j.slug}`} className="text-lg font-medium hover:underline">
                {j.title}
              </Link>
              <div className="text-sm text-gray-600">
                {[j.location, j.seniority, j.market].filter(Boolean).join(" • ")}
              </div>
              {j.summary && <p className="mt-2">{j.summary}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}