/* app/api/jobs/route.ts */
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Job = {
  id?: string;
  title: string;
  location: string;
  market?: string;
  seniority?: string;
  summary?: string;
  slug: string;
  confidential?: boolean;
  active?: boolean;
  createdAt?: string; // ISO
};

const HIDDEN_SLUGS = new Set<string>([
  "senior-relationship-manager-ch-onshore-4",
  "senior-relationship-manager-brazil-2",
  "private-banker-mea-2",
]);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = (url.searchParams.get("q") || "").trim().toLowerCase();
    const market = url.searchParams.get("market") || "";
    const location = url.searchParams.get("location") || "";
    const seniority = url.searchParams.get("seniority") || "";
    const sort = url.searchParams.get("sort") || "newest";
    const activeParam = url.searchParams.get("active");
    const activeOnly = activeParam !== "false"; // default true

    // Load all job-*.json files from project root
    const jobs = await loadJobsFromRepo();

    // Filters
    let out = jobs.filter(j =>
      (!activeOnly || j.active !== false) &&
      !HIDDEN_SLUGS.has(j.slug) &&
      (!market || (j.market || "").toLowerCase() === market.toLowerCase()) &&
      (!location || (j.location || "").toLowerCase() === location.toLowerCase()) &&
      (!seniority || (j.seniority || "").toLowerCase() === seniority.toLowerCase())
    );

    if (q) {
      out = out.filter(j => {
        const hay = [
          j.title, j.summary, j.market, j.location, j.seniority, j.slug
        ].filter(Boolean).join(" ").toLowerCase();
        return hay.includes(q);
      });
    }

    // Sorting
    out.sort((a, b) => {
      if (sort === "title") return (a.title || "").localeCompare(b.title || "");
      const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
      const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
      if (sort === "oldest") return ta - tb;
      return tb - ta; // newest
    });

    return NextResponse.json(out, {
      headers: { "cache-control": "no-store", "content-type": "application/json; charset=utf-8" },
    });
  } catch (err) {
    // Always return an array so clients/JQ don’t break
    return NextResponse.json([], {
      headers: { "cache-control": "no-store", "content-type": "application/json; charset=utf-8" },
    });
  }
}

/* ---------- helpers ---------- */

async function loadJobsFromRepo(): Promise<Job[]> {
  const root = process.cwd();              // project root on Vercel and locally
  const filesDir = root;                   // your job-*.json live at repo root
  const entries = await fs.readdir(filesDir);
  const jobFiles = entries.filter(n => n.startsWith("job-") && n.endsWith(".json"));

  const jobs: Job[] = [];
  for (const file of jobFiles) {
    try {
      const full = path.join(filesDir, file);
      const raw = await fs.readFile(full, "utf8");
      const j = JSON.parse(raw) as Job;
      if (j && j.slug && j.title) jobs.push(j);
    } catch {
      // ignore malformed file
    }
  }
  return jobs;
}