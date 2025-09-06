// app/jobs/page.tsx
import { headers } from "next/headers";

export const runtime = "nodejs";
export const revalidate = 60;

type Job = {
  id: string;
  title?: string;
  role?: string;
  market?: string;
  location?: string;
  seniority?: string;
  summary?: string;
  confidential?: boolean;
  active?: boolean;
  createdAt?: string;
  slug?: string;
};

function getBaseUrl() {
  // Try explicit env first
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  // Derive from request headers (works on Vercel)
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") || h.get("host");
    const proto = (h.get("x-forwarded-proto") || "https").split(",")[0].trim();
    if (host) return `${proto}://${host}`;
  } catch {}
  // Safe default for prod
  return "https://www.execpartners.ch";
}

async function getJobs(): Promise<Job[]> {
  const base = getBaseUrl();

  try {
    const res = await fetch(`${base}/api/jobs/list`, {
      // Allow ISR to keep page fresh, but don’t cache the inner call
      cache: "no-store",
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("GET /api/jobs/list failed:", res.status, await res.text());
      return [];
    }

    const data = await res.json().catch(() => ({ ok: false, jobs: [] as Job[] }));
    const jobs: Job[] = Array.isArray(data?.jobs) ? data.jobs : [];

    // Sort newest first (by createdAt if present)
    return jobs.slice().sort((a, b) => {
      const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
      const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
      return tb - ta;
    });
  } catch (err) {
    console.error("Jobs fetch threw:", err);
    return [];
  }
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Open Roles</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Confidential mandates in Private Banking &amp; Wealth Management.
        </p>
      </header>

      {jobs.length === 0 ? (
        <p className="text-neutral-400">No jobs available right now. Check back soon.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
            >
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-white">
                  {job.title ?? "Untitled Role"}
                </h2>
                {job.confidential && (
                  <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-xs text-neutral-300">
                    Confidential
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-neutral-400">
                {[job.market, job.location, job.seniority].filter(Boolean).join(" — ")}
              </p>

              {job.summary && (
                <p className="mt-2 text-sm text-neutral-300">{job.summary}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}