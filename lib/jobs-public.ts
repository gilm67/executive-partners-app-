// lib/jobs-public.ts

export type PublicJob = {
  slug: string;
  title: string;
  summary?: string;
  location?: string;
  seniority?: string;
  market?: string;
  description?: string;
  active?: string | boolean;
};

function jobsApiBase() {
  // External source (your Jobs microservice)
  const base =
    process.env.NEXT_PUBLIC_JOBS_API_BASE?.replace(/\/$/, "") ||
    "https://jobs.execpartners.ch";
  return base;
}

async function safeJson<T = any>(res: Response): Promise<T | {}> {
  try {
    return (await res.json()) as T;
  } catch {
    return {};
  }
}

/**
 * Try to read from /public/jobs.json on the SAME site as the page.
 * We attempt a relative URL first (works in most Next.js server contexts),
 * then fall back to environment/domain guesses.
 */
async function fetchFallback(): Promise<PublicJob[]> {
  const candidates: string[] = [
    // relative (preferred; works on both server & client in Next 13+/RSC)
    "/jobs.json",
    // env-provided absolute base
    ...(process.env.NEXT_PUBLIC_SITE_URL
      ? [new URL("/jobs.json", process.env.NEXT_PUBLIC_SITE_URL).toString()]
      : []),
    // last resort: your production domain
    "https://www.execpartners.ch/jobs.json",
  ];

  for (const url of candidates) {
    try {
      const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
      if (!res.ok) continue;
      const data: any = await res.json();
      const arr = Array.isArray(data?.jobs) ? (data.jobs as PublicJob[]) : [];
      if (arr.length) return arr.filter((j) => j && j.slug && j.title);
    } catch {
      // try next candidate
    }
  }
  return [];
}

function normalizeJobs(input: unknown): PublicJob[] {
  if (Array.isArray((input as any)?.jobs)) {
    return ((input as any).jobs as unknown[]).filter(Boolean) as PublicJob[];
  }
  if (Array.isArray(input)) {
    return (input as unknown[]).filter(Boolean) as PublicJob[];
  }
  if (input && typeof input === "object" && (input as any).slug) {
    return [input as PublicJob];
  }
  return [];
}

/**
 * Public list loader:
 * 1) try external microservice /api/jobs/list
 * 2) if empty or failed, fall back to /jobs.json
 */
export async function getAllJobsPublic(): Promise<PublicJob[]> {
  // 1) external API
  try {
    const url = `${jobsApiBase()}/api/jobs/list`;
    const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
    if (res.ok) {
      const data: any = await safeJson(res);
      const list = normalizeJobs(data).filter((j) => j?.slug);
      if (list.length) return list;
    }
  } catch {
    // ignore; we’ll try fallback
  }

  // 2) fallback JSON
  return await fetchFallback();
}

/**
 * Public detail loader by slug:
 * 1) try external microservice /api/jobs/get?slug=...
 * 2) if not found or failed, search the fallback list
 */
export async function getJobBySlugPublic(slug: string): Promise<PublicJob | null> {
  // 1) external API
  try {
    const url = `${jobsApiBase()}/api/jobs/get?slug=${encodeURIComponent(slug)}`;
    const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
    if (res.ok) {
      const data: any = await safeJson(res);
      const job: any =
        (data && (data.job ?? data)) && (data.job?.slug || data.slug) ? (data.job ?? data) : null;
      if (job && job.slug) return job as PublicJob;
    }
  } catch {
    // ignore; try fallback
  }

  // 2) fallback JSON
  const fallbackJobs = await fetchFallback();
  return fallbackJobs.find((j) => j.slug === slug) ?? null;
}