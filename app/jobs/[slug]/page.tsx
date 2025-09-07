// @ts-nocheck
// app/jobs/[slug]/page.tsx
import Link from "next/link";
import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

type JobDoc = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  location: string;
  market: string;
  seniority: string;
  role: string;
  confidential: string; // "true" | "false"
  active: string;       // "true" | "false"
  createdAt?: string;
};

async function getJobBySlug(slug: string): Promise<JobDoc | null> {
  const redis = await getRedis();

  // 1) direct slug -> id
  const id = await redis.get(`jobs:by-slug:${slug}`);
  if (id) {
    const doc = await redis.hgetall(id);
    if (doc && doc.id) return doc as unknown as JobDoc;
  }

  // 2) fallback: walk JSON index
  const raw = await redis.get("jobs:index:__set__");
  if (raw) {
    try {
      const ids = JSON.parse(raw) as string[];
      for (const jid of Array.isArray(ids) ? ids : []) {
        const doc = (await redis.hgetall(jid)) as Record<string, string>;
        if (doc?.slug === slug) return doc as unknown as JobDoc;
      }
    } catch {}
  }
  return null;
}

export default async function JobPage(props: any) {
  const slug = props?.params?.slug as string;
  const job = slug ? await getJobBySlug(slug) : null;

  if (!job || job.active === "false") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Role not found</h1>
        <p className="mt-2 text-neutral-600">
          The job you’re looking for may have been removed.
        </p>
        <div className="mt-6">
          <Link href="/jobs" className="ep-btn-primary">View all roles</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">{job.title}</h1>
        <p className="mt-2 text-sm text-neutral-600">
          {job.market} — {job.location}{job.seniority ? ` — ${job.seniority}` : ""}
        </p>
      </header>

      {job.summary ? <p className="text-neutral-800">{job.summary}</p> : null}

      <section className="prose max-w-none whitespace-pre-wrap">
        {job.description || "More details to follow."}
      </section>

      <div className="pt-2">
        <Link href={`/apply?job=${encodeURIComponent(job.title)}`} className="ep-btn-primary">
          Apply / Submit CV
        </Link>
      </div>

      <div className="pt-8">
        <Link href="/jobs" className="text-sm text-neutral-600 hover:underline">
          ← Back to all roles
        </Link>
      </div>
    </main>
  );
}
