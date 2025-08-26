import Link from "next/link";
import { notFound } from "next/navigation";

import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

async function getJobBySlug(slug: string) {
  const redis = await getRedis();
  const id = await redis.get(`jobs:by-slug:${slug}`);
  if (!id) return null;
  const j = await redis.hGetAll(String(id));
  if (!j?.id || j.active === "false") return null;
  return j as Record<string, string>;
}

export default async function Page({ params }: PageProps<{ slug: string }>) {
  const { slug } = await params; // Next 15: params is a Promise
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/jobs"
        className="text-sm text-neutral-300 hover:text-white underline underline-offset-4"
      >
        ← Back to all roles
      </Link>

      <h1 className="mt-4 text-3xl font-semibold text-white">{job.title}</h1>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-neutral-300">
        {job.location ? (
          <span className="px-2 py-1 rounded-md border border-neutral-800">
            {job.location}
          </span>
        ) : null}
        {job.market ? (
          <span className="px-2 py-1 rounded-md border border-neutral-800">
            {job.market}
          </span>
        ) : null}
        {job.seniority ? (
          <span className="px-2 py-1 rounded-md border border-neutral-800">
            {job.seniority}
          </span>
        ) : null}
      </div>

      {job.summary ? (
        <p className="mt-6 text-lg text-neutral-200">{job.summary}</p>
      ) : null}

      {job.description ? (
        <div className="prose prose-invert mt-6 max-w-none">
          <p style={{ whiteSpace: "pre-wrap" }}>{job.description}</p>
        </div>
      ) : (
        <p className="mt-6 text-neutral-300">
          Full description coming soon. For details, contact{" "}
          <a
            href="mailto:recruiter@execpartners.ch"
            className="underline underline-offset-4"
          >
            recruiter@execpartners.ch
          </a>
          .
        </p>
      )}
    </div>
  );
}
