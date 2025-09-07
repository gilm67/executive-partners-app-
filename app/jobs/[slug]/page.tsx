// app/jobs/[slug]/page.tsx
import Link from "next/link";
import { getRedis } from "@/lib/redis";

type Job = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  location: string;
  market: string;
  seniority: string;
  role: string;
  confidential: boolean;
  active: boolean;
  createdAt?: string;
};

export const dynamic = "force-dynamic";

/* -------- tiny markdown → HTML + HTML escape -------- */
function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function mdToHtml(md: string): string {
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let inList = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { if (inList) { out.push("</ul>"); inList = false; } continue; }
    if (/^#{2,3}\s+/.test(line)) {
      if (inList) { out.push("</ul>"); inList = false; }
      const level = line.startsWith("###") ? 3 : 2;
      const text = line.replace(/^#{2,3}\s+/, "");
      out.push(`<h${level}>${escapeHtml(text)}</h${level}>`);
      continue;
    }
    if (/^(\*|-)\s+/.test(line)) {
      if (!inList) { out.push("<ul>"); inList = true; }
      const text = line.replace(/^(\*|-)\s+/, "");
      out.push(`<li>${escapeHtml(text)}</li>`);
      continue;
    }
    if (inList) { out.push("</ul>"); inList = false; }
    out.push(`<p>${escapeHtml(line)}</p>`);
  }
  if (inList) out.push("</ul>");
  return out.join("\n");
}

/* -------- helpers -------- */
function normalize(d: Record<string, string>): Job {
  return {
    id: d.id,
    title: d.title,
    slug: (d.slug || "").trim(),
    summary: d.summary || "",
    description: d.description || "",
    location: d.location || "",
    market: d.market || "",
    seniority: d.seniority || "",
    role: d.role || "",
    confidential: d.confidential === "true" || (d as any).confidential === true,
    active: d.active === "true" || (d as any).active === true,
    createdAt: d.createdAt,
  };
}

async function findJobBySlug(slug: string): Promise<Job | null> {
  const want = slug.trim();
  const redis = await getRedis();

  // 1) O(1) mapping (we’ll start writing this in step 3)
  try {
    const id = await redis.get(`jobs:by-slug:${want}`);
    if (id) {
      const data = await redis.hgetall(id);
      if (data?.slug?.trim() === want) return normalize(data);
    }
  } catch {}

  // 2) Native set index
  try {
    const ids = await redis.smembers("jobs:index");
    for (const id of ids) {
      const data = await redis.hgetall(id);
      if (data?.slug?.trim() === want) return normalize(data);
    }
  } catch {}

  // 3) JSON fallback index
  try {
    const raw = await redis.get("jobs:index:__set__");
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        for (const id of arr) {
          const data = await redis.hgetall(String(id));
          if (data?.slug?.trim() === want) return normalize(data);
        }
      }
    }
  } catch {}

  return null;
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await findJobBySlug(params.slug);

  if (!job) {
    return (
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-xl font-semibold">Role not found</h1>
        <p className="mt-2 text-sm text-neutral-600">
          The job you’re looking for may have been removed.
        </p>
        <p className="mt-4">
          <Link href="/jobs" className="text-blue-600 hover:underline">
            View all roles
          </Link>
        </p>
      </main>
    );
  }

  const html = mdToHtml(job.description || "");

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-sm mb-4">
        <Link href="/jobs" className="text-blue-600 hover:underline">← Back to roles</Link>
      </div>

      <h1 className="text-2xl font-semibold">{job.title}</h1>
      <div className="mt-2 text-sm text-neutral-700">
        <div><span className="font-medium">Location:</span> {job.location}</div>
      </div>

      <article
        className="prose prose-sm dark:prose-invert mt-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="mt-8">
        <Link
          href={`/apply?role=${encodeURIComponent(job.title)}`}
          className="inline-block rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
        >
          Apply / Submit CV
        </Link>
      </div>
    </main>
  );
}