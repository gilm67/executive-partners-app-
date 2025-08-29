// app/jobs/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getJobBySlugPublic } from "@/lib/jobs-public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Next.js 15 passes params as a Promise
type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;

  let job = null as Awaited<ReturnType<typeof getJobBySlugPublic>> | null;
  try {
    job = await getJobBySlugPublic(slug);
  } catch {
    job = null;
  }

  if (!job) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <p className="text-sm text-gray-600 mb-2">
        {job.location} · {job.seniority}
        {job.market ? ` · ${job.market}` : ""}
      </p>
      <h1 className="text-3xl font-semibold mb-4">{job.title}</h1>
      {job.summary ? <p className="mb-6">{job.summary}</p> : null}
      <article className="prose">
        <p>
          {/* Replace with the real description if you store it. This keeps page
             robust even if description is missing in the public API. */}
          {job.description ?? "Full role description coming soon."}
        </p>
      </article>
    </main>
  );
}
