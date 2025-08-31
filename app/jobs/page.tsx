// app/jobs/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";

type PublicJob = {
  slug: string;
  title: string;
  summary?: string;
  location?: string;
  seniority?: string;
  market?: string;
  description?: string;
  active?: string | boolean;
};

async function fetchJobs(): Promise<PublicJob[]> {
  // Canonical origin in production to avoid any base-url ambiguity
  const ORIGIN =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.execpartners.ch";

  const res = await fetch(`${ORIGIN}/api/jobs/list`, {
    cache: "no-store",
    next: { revalidate: 0 },
  });
  if (!res.ok) return [];
  const data = await res.json().catch(() => ({}));
  const arr = Array.isArray(data?.jobs) ? data.jobs : [];
  return arr.filter((j: any) => j && j.slug);
}

export default async function JobsPage() {
  const jobs = await fetchJobs();

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