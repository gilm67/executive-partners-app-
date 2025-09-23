import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // no caching in dev

type Job = {
  title: string;
  location?: string;
  slug: string;
  summary?: string;
  featured?: boolean;
};

const ALL_JOBS: Job[] = [
  {
    title: "Senior Relationship Manager — MEA",
    location: "Dubai",
    slug: "sr-rm-mea-dubai",
    summary: "Cover UHNW/HNW MEA clients from Dubai; strong acquisition and cross-border expertise.",
    featured: true,
  },
  {
    title: "Senior Relationship Manager — Brazil",
    location: "Zurich or Geneva",
    slug: "sr-rm-brazil-ch",
    summary: "Acquire and manage HNW/UHNW Brazilian clients; full PB advisory and cross-border.",
    featured: true,
  },
  {
    title: "Senior Relationship Manager — CH Onshore",
    location: "Zurich",
    slug: "sr-rm-ch-onshore-zurich",
    summary: "Manage UHNW/HNW Swiss onshore clients; acquisition and advisory focus.",
    featured: true,
  },
  {
    title: "Senior Relationship Manager — Portugal",
    location: "Geneva",
    slug: "sr-rm-portugal-geneva",
    summary: "Manage UHNW/HNW Portuguese clients booking in Switzerland.",
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") ?? "10");
  const featured = searchParams.get("featured");

  let jobs = ALL_JOBS;
  if (featured === "1" || featured === "true") {
    jobs = jobs.filter(j => j.featured);
  }
  return NextResponse.json({ jobs: jobs.slice(0, Math.max(1, limit)) });
}
