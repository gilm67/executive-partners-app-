// lib/jobs-public.ts
export type Job = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  location: string;
  seniority: string;
  market?: string;
  active?: string | boolean;
  description?: string;
  createdAt?: string;
  validThrough?: string;
};

const API_BASE =
  process.env.NEXT_PUBLIC_JOBS_API_BASE?.replace(/\/$/, "") ||
  "https://jobs.execpartners.ch";

async function safeJson(res: Response) {
  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Upstream non-JSON (${res.status}): ${text.slice(0, 120)}`);
  }
  return res.json();
}

const fetchOpts: RequestInit & { next?: { revalidate?: number } } = {
  cache: "no-store",
};

export async function fetchJobs(): Promise<Job[]> {
  const url = `${API_BASE}/api/jobs/list`;
  const res = await fetch(url, fetchOpts);
  if (!res.ok) return [];
  const data = await safeJson(res);
  const arr = (data?.jobs ?? []) as Job[];
  return Array.isArray(arr) ? arr.filter(j => !!j?.slug) : [];
}

export async function fetchJobBySlug(slug: string): Promise<Job | null> {
  const url = `${API_BASE}/api/jobs/get?slug=${encodeURIComponent(slug)}`;
  const res = await fetch(url, fetchOpts);
  if (!res.ok) return null;
  const data = await safeJson(res);
  const j = (data?.job ?? null) as Job | null;
  return j && j.slug ? j : null;
}
