// app/jobs/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Open Roles | Executive Partners",
  description:
    "Confidential mandates in Private Banking & Wealth Management. Explore roles across Switzerland, MEA and LatAm.",
};

type Job = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  location: string;
  market: string;
  seniority: string;
};

async function getJobs(): Promise<Job[]> {
  // Render fresh each time so new jobs appear immediately
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/jobs/list`, {
    cache: "no-store",
  }).catch(() => null);

  if (!res?.ok) {
    // Fallback to relative fetch (works in prod)
    const res2 = await fetch("/api/jobs/list", { cache: "no-store" });
    const data2 = await res2.json().catch(() => ({}));
    return data2?.jobs ?? [];
  }

  const data = await res.json().catch(() => ({}));
  return data?.jobs ?? [];
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold">Open Roles</h1>
      <p className="mt-1 text-sm text-neutral-500">
        Confidential mandates in Private Banking &amp; Wealth Management.
      </p>

      <div className="mt-6 space-y-4">
        {jobs.length === 0 && (
          <div className="rounded-xl border px-4 py-6 text-sm text-neutral-600">
            No jobs available right now. Check back soon.
          </div>
        )}

        {jobs.map((j) => (
          <Link
            key={j.id}
            href={`/jobs/${j.slug}`}
            className="block rounded-xl border px-4 py-4 hover:bg-neutral-50 transition-colors dark:hover:bg-neutral-900"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-base font-medium">{j.title}</h2>
            </div>
            <div className="mt-1 text-sm text-neutral-500">
              {j.market} — {j.location} — {j.seniority}
            </div>
            {j.summary ? (
              <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{j.summary}</p>
            ) : null}
          </Link>
        ))}
      </div>
    </main>
  );
}