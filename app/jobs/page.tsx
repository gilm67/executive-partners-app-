// app/jobs/page.tsx
import Link from "next/link";
import { headers } from "next/headers";

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

function getBaseUrl() {
  // Prefer request headers (Vercel) → fallback to NEXT_PUBLIC_BASE_URL → final hardcoded domain
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto =
      (h.get("x-forwarded-proto") ?? "https").split(",")[0].trim() || "https";
    if (host) return `${proto}://${host}`;
  } catch {
    // ignore; use fallbacks below
  }
  return (
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ||
    "https://www.execpartners.ch"
  );
}

async function getJobs(): Promise<Job[]> {
  const base = getBaseUrl();

  try {
    const res = await fetch(`${base}/api/jobs/list`, { cache: "no-store" });
    if (!res.ok) {
      // surface text for easier debugging rather than throwing opaque digest
      const t = await res.text();
      console.error("[/jobs] fetch list failed:", res.status, t);
      return [];
    }
    const data = (await res.json()) as { ok?: boolean; jobs?: Job[] };
    return data?.ok && Array.isArray(data.jobs) ? data.jobs : [];
  } catch (e) {
    console.error("[/jobs] fetch threw:", e);
    return [];
  }
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
            <h2 className="text-base font-medium">{j.title}</h2>
            <div className="mt-1 text-sm text-neutral-500">
              {j.market} — {j.location} — {j.seniority}
            </div>
            {j.summary ? (
              <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                {j.summary}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </main>
  );
}