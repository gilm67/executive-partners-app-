// app/jobs/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getJobBySlugPublic } from "@/lib/jobs-public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = { slug: string };

export default async function JobDetailPage({
  params,
}: {
  // In Next.js 15, params is a Promise
  params: Promise<Params>;
}) {
  const { slug } = await params;

  const job = await getJobBySlugPublic(slug);
  if (!job) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold">{job.title}</h1>
      <div className="text-sm text-gray-600 mt-2">
        {[job.location, job.seniority, job.market].filter(Boolean).join(" • ")}
      </div>

      {job.summary && <p className="mt-6">{job.summary}</p>}
      {job.description && (
        <article className="prose mt-6 whitespace-pre-wrap">{job.description}</article>
      )}

      <div className="mt-8">
        <a
          href="/apply"
          className="inline-block rounded-md border px-4 py-2 hover:bg-gray-50"
        >
          Apply
        </a>
      </div>
    </main>
  );
}
