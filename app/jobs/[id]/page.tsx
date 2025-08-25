// app/jobs/[id]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getJobBySlug, isExpired, getIndexableJobs } from "@/lib/jobs";

/** Generate per-job metadata (await promised params) */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const job = await getJobBySlug(id);
  if (!job || isExpired(job)) {
    return { title: "Job not found | Executive Partners" };
  }

  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

  return {
    title: `${job.title} | Executive Partners`,
    description: job.summary,
    alternates: { canonical: `${base}/jobs/${job.slug}` },
  };
}

/** Pre-generate static params for live (non-expired) jobs */
export async function generateStaticParams() {
  const jobs = await getIndexableJobs();
  return jobs.map((j) => ({ id: j.slug }));
}

/** Page component (await promised params) */
export default async function JobPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const job = await getJobBySlug(id);
  if (!job || isExpired(job)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">{job.title}</h1>
        <p className="mt-2 text-neutral-300">{job.summary}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-neutral-300">
          <div className="rounded border border-neutral-800 bg-neutral-900 p-3">
            <div className="text-neutral-400">Location</div>
            <div>{job.location}</div>
          </div>
          <div className="rounded border border-neutral-800 bg-neutral-900 p-3">
            <div className="text-neutral-400">Seniority</div>
            <div>{job.seniority}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
