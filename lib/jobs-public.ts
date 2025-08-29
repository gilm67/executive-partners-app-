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
  return process.env.NEXT_PUBLIC_JOBS_API_BASE?.replace(/\/$/, "") || "https://jobs.execpartners.ch";
}

function siteBase() {
  // Absolute URL needed on the server side
  return (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")) || "https://www.execpartners.ch";
}

async function safeJson(res: Response) {
  try { return await res.json(); } catch { return null; }
}

function normalize(list: any): PublicJob[] {
  const arr: any[] =
    Array.isArray(list?.jobs) ? list.jobs :
    Array.isArray(list) ? list :
    [];
  return arr.filter(j => j && j.slug);
}

export async function getAllJobsPublic(): Promise<PublicJob[]> {
  // 1) Try upstream API
  try {
    const res = await fetch(`${jobsApiBase()}/api/jobs/list`, { cache: "no-store", next: { revalidate: 0 } });
    const data = await safeJson(res);
    const jobs = normalize(data);
    if (jobs.length) return jobs;
  } catch { /* ignore */ }

  // 2) Fallback to static JSON
  try {
    const res = await fetch(`${siteBase()}/jobs.json`, { cache: "no-store", next: { revalidate: 0 } });
    const data = await safeJson(res);
    return normalize(data);
  } catch {
    return [];
  }
}

export async function getJobBySlugPublic(slug: string): Promise<PublicJob | null> {
  // 1) Try upstream API
  try {
    const res = await fetch(`${jobsApiBase()}/api/jobs/get?slug=${encodeURIComponent(slug)}`, { cache: "no-store", next: { revalidate: 0 } });
    const data: any = await safeJson(res);
    const job = data?.job || (data && data.slug ? data : null);
    if (job?.slug) return job as PublicJob;
  } catch { /* ignore */ }

  // 2) Fallback to static JSON
  try {
    const res = await fetch(`${siteBase()}/jobs.json`, { cache: "no-store", next: { revalidate: 0 } });
    const data: any = await safeJson(res);
    const jobs = normalize(data);
    return jobs.find(j => j.slug === slug) || null;
  } catch {
    return null;
  }
}