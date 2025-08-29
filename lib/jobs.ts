// lib/jobs.ts
// Source of truth = external Jobs API (NEXT_PUBLIC_JOBS_API_BASE)/api/jobs/*
// Falls back to data/jobs.json if the API is unreachable.

export type Job = {
  slug: string;
  title: string;
  summary: string;
  location: string;
  seniority: string;
  market?: string;
  datePosted?: string;
  employmentType?:
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACTOR"
    | "TEMPORARY"
    | "INTERN"
    | "VOLUNTEER"
    | "PER_DIEM"
    | "OTHER";
  baseSalaryMin?: number;
  baseSalaryMax?: number;
  currency?: string;
  validThrough?: string;
  directApply?: boolean;
  industry?: string;
  jobLocationType?: "ONSITE" | "HYBRID" | "TELECOMMUTE";
  updatedAt?: string;
  active?: string | boolean;
  id?: string;
};

const BASE =
  process.env.NEXT_PUBLIC_JOBS_API_BASE?.trim() ||
  "https://jobs.execpartners.ch";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store", next: { revalidate: 0 } });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return (await res.json()) as T;
}

async function fetchListFromApi(): Promise<Job[]> {
  // Expected shape: { ok: true, jobs: Job[] }
  const data = await fetchJSON<{ ok?: boolean; jobs?: Job[] }>(
    `${BASE}/api/jobs/list`
  );
  const jobs = data?.jobs ?? [];
  return Array.isArray(jobs) ? jobs.filter((j) => j && j.slug) : [];
}

async function fetchOneFromApi(slug: string): Promise<Job | null> {
  // Expected shape: { ok: true, job: Job }
  const data = await fetchJSON<{ ok?: boolean; job?: Job }>(
    `${BASE}/api/jobs/get?slug=${encodeURIComponent(slug)}`
  );
  return data?.job && data.job.slug ? data.job : null;
}

async function tryLoadJsonFallback(): Promise<Job[]> {
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const file = path.join(process.cwd(), "data", "jobs.json");
    const raw = await fs.readFile(file, "utf8");
    // strip comments if any
    const cleaned = raw
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(^|\s)\/\/.*$/gm, "");
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? (parsed as Job[]) : [];
  } catch {
    return [];
  }
}

export async function getAllJobs(): Promise<Job[]> {
  try {
    return await fetchListFromApi();
  } catch {
    // Fall back only if the API is down/unreachable
    return await tryLoadJsonFallback();
  }
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const job = await fetchOneFromApi(slug);
    if (job) return job;
  } catch {
    // ignore and try fallback path below
  }
  // Fallback: look up in the list (API down → local JSON)
  const all = await getAllJobs();
  return all.find((j) => j.slug === slug) ?? null;
}

export async function getAllJobSlugs(): Promise<string[]> {
  const jobs = await getAllJobs();
  return jobs.map((j) => j.slug).filter(Boolean);
}

export function isExpired(job: Job, at = new Date()): boolean {
  return !!(job.validThrough && new Date(job.validThrough) <= at);
}

export async function getIndexableJobs(): Promise<Job[]> {
  const jobs = await getAllJobs();
  return jobs.filter((j) => !isExpired(j));
}