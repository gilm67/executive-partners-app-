import Link from "next/link";
import { getAllJobsPublic } from "@/lib/jobs-public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JobsPage() {
  const jobs = await getAllJobsPublic();

  if (!jobs?.length) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Open roles</h1>
        <p>No open roles at the moment.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Open roles</h1>
      <ul className="space-y-4">
        {jobs.map((j) => (
          <li key={j.slug} className="border rounded p-4">
            <Link href={`/jobs/${j.slug}`} className="text-lg font-medium underline">
              {j.title}
            </Link>
            <div className="text-sm text-gray-600">
              {j.location} {j.market ? `• ${j.market}` : ""} {j.seniority ? `• ${j.seniority}` : ""}
            </div>
            {j.summary && <p className="mt-2">{j.summary}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
