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

function jobsApiBases() {
  // 1) Same-origin is first (this deployment)
  const bases: string[] = [""];

  // 2) Optional external base, if you still set it
  const ext = process.env.NEXT_PUBLIC_JOBS_API_BASE?.replace(/\/$/, "");
  if (ext) bases.push(ext);

  return bases;
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

function normalizeArray(data: any): PublicJob[] {
  const arr: any[] = Array.isArray(data?.jobs)
    ? data.jobs
    : Array.isArray(data)
    ? data
    : [];
  return arr.filter((j: any) => j && j.slug);
}

export async function getAllJobsPublic(): Promise<PublicJob[]> {
  // Try: same-origin → external base → static fallback
  const bases = jobsApiBases();

  for (const base of bases) {
    try {
      const url = `${base}/api/jobs/list`;
      const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
      if (!res.ok) continue;
      const data = await safeJson(res);
      const jobs = normalizeArray(data);
      if (jobs.length) return jobs;
      // if response shape is ok but empty, return it (don’t keep falling through)
      if (Array.isArray(data?.jobs)) return jobs;
    } catch {
      // ignore and try next base
    }
  }

  // Static fallback under /public
  try {
    const res = await fetch("/jobs.json", { cache: "no-store", next: { revalidate: 0 } });
    const data = await safeJson(res);
    return normalizeArray(data);
  } catch {
    return [];
  }
}

export async function getJobBySlugPublic(slug: string): Promise<PublicJob | null> {
  const bases = jobsApiBases();

  // Try GET endpoint on each base
  for (const base of bases) {
    try {
      const url = `${base}/api/jobs/get?slug=${encodeURIComponent(slug)}`;
      const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
      if (!res.ok) continue;
      const data: any = await safeJson(res);
      const job = data?.job || (data && data.slug ? data : null);
      if (job?.slug) return job as PublicJob;
    } catch {
      // ignore and continue
    }
  }

  // Fallback: search the list from any base that responds
  try {
    const all = await getAllJobsPublic();
    const found = all.find((j) => j.slug === slug);
    if (found) return found;
  } catch {
    // ignore and continue
  }

  // Final fallback: search /jobs.json directly
  try {
    const res = await fetch("/jobs.json", { cache: "no-store", next: { revalidate: 0 } });
    const data: any = await safeJson(res);
    const all = normalizeArray(data);
    const found = all.find((j) => j.slug === slug);
    if (found) return found;
  } catch {
    // ignore
  }

  return null;
}