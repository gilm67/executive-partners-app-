/* app/api/jobs/route.ts */
import { NextResponse } from "next/server";

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
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").trim().toLowerCase();
  const market = url.searchParams.get("market") || "";
  const location = url.searchParams.get("location") || "";
  const seniority = url.searchParams.get("seniority") || "";
  const sort = url.searchParams.get("sort") || "newest";
  const activeParam = url.searchParams.get("active");
  const activeOnly = activeParam !== "false"; // default true

  // ---- Load jobs from your existing store/API ----
  // If you already have code to load jobs, replace the next line with it.
  const jobs: Job[] = await loadJobsFromSameOrigin();

  // ---- Server-side filters (canonical) ----
  let out = jobs.filter(j =>
    (!activeOnly || j.active !== false) &&
    !HIDDEN_SLUGS.has(j.slug) &&
    (!market || (j.market || "").toLowerCase() === market.toLowerCase()) &&
    (!location || (j.location || "").toLowerCase() === location.toLowerCase()) &&
    (!seniority || (j.seniority || "").toLowerCase() === seniority.toLowerCase())
  );

  // Text search (title/summary/market/location)
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
    if (sort === "title") {
      return (a.title || "").localeCompare(b.title || "");
    }
    if (sort === "oldest") {
      const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
      const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
      return ta - tb;
    }
    // newest (default)
    const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
    const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
    return tb - ta;
  });

  return NextResponse.json(out, {
    headers: { "cache-control": "no-store" },
  });
}

/* ---------- helpers ---------- */

// Fetch from the same project’s existing JSON/API.
// This mirrors how your front-end calls /api/jobs already.
async function loadJobsFromSameOrigin(): Promise<Job[]> {
  // If running on Vercel/Edge, use absolute URL from env; fallback to relative
  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  const res = await fetch(`${base}/api/jobs/raw`, { cache: "no-store" }).catch(() => null);

  // If you don't have /api/jobs/raw, replace with your real loader (DB, KV, file, etc.)
  if (!res || !res.ok) {
    // Fallback: try an internal loader if you have one
    // return await db.job.findMany(); // example
    return []; // safe fallback
  }
  return res.json();
}