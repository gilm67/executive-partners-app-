// lib/jobs-public.ts
// Minimal client for fetching jobs from the external public API (jobs.execpartners.ch)

export type Job = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  description?: string;
  location?: string;
  market?: string;
  seniority?: string;
  active?: boolean | string;
};

const API_BASE = "https://jobs.execpartners.ch/api/jobs";

export async function getAllJobs(): Promise<Job[]> {
  const res = await fetch(`${API_BASE}/list`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data.jobs) ? data.jobs : [];
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const res = await fetch(`${API_BASE}/get?slug=${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.job ?? null;
}

// Alias for compatibility with sitemap.ts and pages
export const getAllJobsPublic = getAllJobs;
export const getJobBySlugPublic = getJobBySlug;
export const fetchJobs = getAllJobs;
export const fetchJob = getJobBySlug;
