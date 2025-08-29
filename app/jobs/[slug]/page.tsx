// app/jobs/[slug]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

import { notFound } from "next/navigation";

type Job = {
  slug: string; title: string; summary?: string; description?: string;
  location?: string; market?: string; seniority?: string; active?: string;
};

async function loadJob(slug: string): Promise<Job | null> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    `https://${process.env.VERCEL_URL}`;
  try {
    const res = await fetch(`${base}/api/jobs/get?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store", next: { revalidate: 0 }
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    const job: Job | undefined = data?.job || data;
    return job && job.slug ? job : null;
  } catch {
    return null;
  }
}

// Next 15: params is a Promise in RSC
export default async function JobDetailPage({
  params,
}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await loadJob(decodeURIComponent(slug));
  if (!job) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">{job.title}</h1>
      <div className="mt-3 flex flex-wrap gap-2 text-sm text-neutral-300">
        {job.location && <span>{job.location}</span>}
        {job.market && <span>· {job.market}</span>}
        {job.seniority && <span>· {job.seniority}</span>}
      </div>
      {job.summary && <p className="mt-6 text-neutral-200">{job.summary}</p>}
      {job.description ? (
        <article
          className="prose prose-invert mt-6 max-w-none"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      ) : (
        <p className="mt-6 text-neutral-300">Full description coming soon.</p>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  return [];
}