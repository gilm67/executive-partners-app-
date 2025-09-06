// app/jobs/page.tsx
export const runtime = "nodejs";
export const revalidate = 60; // ISR — refresh every 60s

// Build a safe absolute BASE_URL
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000"; // fallback for local dev/build
}

type Job = {
  id: string;
  title?: string;
  role?: string;
  market?: string;
  location?: string;
  seniority?: string;
  summary?: string;
  confidential?: boolean;
  createdAt?: string;
};

async function getJobs(): Promise<Job[]> {
  const BASE_URL = getBaseUrl();

  try {
    const res = await fetch(`${BASE_URL}/api/jobs/list`, {
      next: { revalidate: 60 }, // ✅ ISR cache
    });

    if (!res.ok) {
      console.error("GET /api/jobs/list failed:", res.status, await res.text());
      return [];
    }

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return Array.isArray(data) ? data : [];
    } catch {
      console.error("Jobs JSON parse failed; first 200 chars:", text.slice(0, 200));
      return [];
    }
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
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Open Roles
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Confidential mandates in Private Banking &amp; Wealth Management.
        </p>
      </header>

      {jobs.length === 0 ? (
        <p className="text-neutral-400">
          No jobs available right now. Check back soon.
        </p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4"
            >
              <h2 className="text-lg font-semibold text-white">
                {job.title ?? "Untitled Role"}
              </h2>
              <p className="text-sm text-neutral-400">
                {job.market} — {job.location} — {job.seniority}
              </p>
              {job.summary && (
                <p className="mt-1 text-sm text-neutral-300">{job.summary}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}