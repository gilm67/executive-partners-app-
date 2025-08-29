// app/jobs/page.tsx
import Link from "next/link";
import { getAllJobsPublic } from "@/lib/jobs-public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JobsPage() {
  let jobs: Awaited<ReturnType<typeof getAllJobsPublic>> = [];
  try {
    jobs = await getAllJobsPublic();
  } catch {
    jobs = [];
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Open Positions</h1>

      {!jobs?.length ? (
        <p>No open roles right now. Please check back soon.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((j) => (
            <li key={j.slug} className="border rounded p-4">
              <h2 className="text-xl font-medium">
                <Link href={`/jobs/${j.slug}`} className="underline">
                  {j.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-600">
                {j.location} · {j.seniority}
                {j.market ? ` · ${j.market}` : ""}
              </p>
              {j.summary ? <p className="mt-2">{j.summary}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
