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

async function safeJson(res: Response) {
  try { return await res.json(); } catch { return {}; }
}

export async function getAllJobsPublic(): Promise<PublicJob[]> {
  try {
    const url = `${jobsApiBase()}/api/jobs/list`;
    const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
    const data = await safeJson(res);
    const arr: any[] = Array.isArray(data?.jobs) ? data.jobs : Array.isArray(data) ? data : [];
    return arr.filter(j => j && j.slug);
  } catch {
    return [];
  }
}

export async function getJobBySlugPublic(slug: string): Promise<PublicJob | null> {
  try {
    const url = `${jobsApiBase()}/api/jobs/get?slug=${encodeURIComponent(slug)}`;
    const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
    const data: any = await safeJson(res);
    const job = data?.job || (data && data.slug ? data : null);
    return job && job.slug ? job as PublicJob : null;
  } catch {
    return null;
  }
}
