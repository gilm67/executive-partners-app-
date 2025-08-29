// app/jobs/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getJobBySlugPublic } from "@/lib/jobs-public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = { params: { slug: string } };

export default async function JobDetailPage({ params }: PageProps) {
  const job = await getJobBySlugPublic(params.slug);
  if (!job) return notFound();

  const facts = [job.location, job.market, job.seniority].filter(Boolean).join(" • ");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">{job.title}</h1>
      {facts && <p className="mt-2 text-sm text-neutral-600">{facts}</p>}

      {job.summary && (
        <p className="mt-6 text-neutral-800 leading-relaxed">{job.summary}</p>
      )}

      {job.description && (
        <article className="prose prose-neutral mt-6" dangerouslySetInnerHTML={{ __html: job.description }} />
      )}

      <div className="mt-10">
        <a
          href="/contact"
          className="inline-flex items-center rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Apply / Contact Us
        </a>
      </div>
    </main>
  );
}