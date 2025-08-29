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
  return (
    process.env.NEXT_PUBLIC_JOBS_API_BASE?.replace(/\/$/, "") ||
    "https://jobs.execpartners.ch"
  );
}

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

// Robust normalization: accept {jobs:[...]}, [...] or single job object
export async function getAllJobsPublic(): Promise<PublicJob[]> {
  try {
    const url = `${jobsApiBase()}/api/jobs/list`;
    const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
    const data: any = await safeJson(res);

    if (Array.isArray(data?.jobs)) return data.jobs.filter((j) => j?.slug);
    if (Array.isArray(data)) return data.filter((j) => j?.slug);
    if (data && typeof data === "object" && data.slug) return [data as PublicJob];

    return [];
  } catch {
    return [];
  }
}

// Accept {job:{...}} or a bare job object
export async function getJobBySlugPublic(slug: string): Promise<PublicJob | null> {
  try {
    const url = `${jobsApiBase()}/api/jobs/get?slug=${encodeURIComponent(slug)}`;
    const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
    const data: any = await safeJson(res);

    if (data?.job?.slug) return data.job as PublicJob;
    if (data?.slug) return data as PublicJob;
    return null;
  } catch {
    return null;
  }
}