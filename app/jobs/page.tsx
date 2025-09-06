// app/jobs/page.tsx
import Link from "next/link";
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
  slug?: string;
};

function getBaseUrl() {
  // 1) Explicit env (recommended for Vercel): https://www.execpartners.ch
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;

  // 2) Infer from request headers at runtime (works server-side)
  try {
    const h = headers();
    const host = h.get("x-forwarded-host") || h.get("host");
    const proto = (h.get("x-forwarded-proto") || "https").split(",")[0].trim();
    if (host) return `${proto}://${host}`;
  } catch {
    // headers() unavailable at build time; fall through
  }

  // 3) Last resort (keeps dev working)
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.execpartners.ch";
}

async function getJobs(): Promise<Job[]> {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/jobs/list`, {
      // still ISR-cached by Next (since this is a server component)
      next: { revalidate: 60 },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.jobs) ? data.jobs : [];
  } catch {
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
          {jobs.map((job) => {
            const href = job.slug ? `/jobs/${job.slug}` : "#";
            return (
              <li
                key={job.id}
                className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
              >
                <h2 className="text-lg font-semibold">
                  <Link
                    href={href}
                    className="text-white hover:text-neutral-200 underline-offset-4 hover:underline focus:underline focus:outline-none"
                    aria-disabled={!job.slug}
                    onClick={(e) => {
                      if (!job.slug) e.preventDefault();
                    }}
                  >
                    {job.title ?? "Untitled Role"}
                  </Link>
                </h2>
                <p className="text-sm text-neutral-400">
                  {[job.market, job.location, job.seniority].filter(Boolean).join(" — ")}
                </p>
                {job.summary && (
                  <p className="mt-1 text-sm text-neutral-300">{job.summary}</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}