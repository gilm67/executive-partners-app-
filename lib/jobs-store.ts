import { getRedis } from "@/lib/redis";

export type Job = {
  id: string;
  title?: string;
  role?: string;
  market?: string;
  location?: string;
  seniority?: string;
  summary?: string;
  confidential?: boolean;
  active?: boolean;
  createdAt?: string | null;
  slug?: string;
};

export async function listJobsFromStore(): Promise<Job[]> {
  const redis = await getRedis();
  const ids = await redis.smembers("jobs:index");
  if (!ids || ids.length === 0) return [];

  const pairs = await Promise.all(
    ids.map(async (id) => {
      const doc = await redis.hgetall(id);
      return [id, doc] as const;
    })
  );

  const jobs = pairs
    .map(([id, doc]) => {
      if (!doc || !doc.title) return null;
      const active =
        doc.active === "true" ||
        doc.active === "1" ||
        doc.active === undefined; // default visible

      return {
        id: doc.id || id,
        title: doc.title || "Untitled Role",
        slug: doc.slug || "",
        summary: doc.summary || "",
        description: doc.description || "",
        location: doc.location || "",
        market: doc.market || "",
        seniority: doc.seniority || "",
        role: doc.role || "",
        confidential: doc.confidential === "true",
        active,
        createdAt: doc.createdAt || null,
      } as Job;
    })
    .filter(Boolean) as Job[];

  // newest first
  jobs.sort((a, b) => {
    const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
    const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
    return tb - ta;
  });

  return jobs;
}
