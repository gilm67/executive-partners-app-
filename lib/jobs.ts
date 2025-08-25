import fs from "fs";
import path from "path";

export type Job = {
  slug: string;
  title: string;
  summary: string;
  location: string;
  seniority: string;
  market?: string;
  datePosted: string;
  employmentType:
    | "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "TEMPORARY" | "INTERN" | "VOLUNTEER" | "PER_DIEM" | "OTHER";
  baseSalaryMin?: number;
  baseSalaryMax?: number;
  currency?: string;
  validThrough?: string;
  directApply?: boolean;
  industry?: string;
  jobLocationType?: "ONSITE" | "HYBRID" | "TELECOMMUTE";
  updatedAt?: string;
};

function loadJobsFile(): Job[] {
  const file = path.join(process.cwd(), "data", "jobs.json");
  if (!fs.existsSync(file)) return [];

  try {
    let raw = fs.readFileSync(file, "utf8");
    // Strip // line comments and /* block */ comments defensively
    raw = raw.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)\/\/.*$/gm, "");
    const parsed = JSON.parse(raw) as Job[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to read/parse data/jobs.json:", err);
    return [];
  }
}

export async function getAllJobs(): Promise<Job[]> {
  // Swap with DB/CMS later if needed
  return loadJobsFile();
}

export function isExpired(job: Job, at = new Date()): boolean {
  return !!(job.validThrough && new Date(job.validThrough) <= at);
}

export async function getIndexableJobs(): Promise<Job[]> {
  const jobs = await getAllJobs();
  return jobs.filter((j) => !isExpired(j));
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  const job = (await getAllJobs()).find((j) => j.slug === slug);
  return job ?? null;
}
