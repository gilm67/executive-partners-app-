import { notFound } from "next/navigation";
import { getJobBySlugPublic } from "@/lib/jobs-public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = { slug: string };
type PageProps = { params: Promise<Params> };

export default async function JobPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobBySlugPublic(slug);
  if (!job) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <p className="text-sm text-gray-600 mb-2">
        {[job.location, job.seniority, job.market].filter(Boolean).join(" · ")}
      </p>
      <h1 className="text-3xl font-semibold mb-4">{job.title}</h1>
      {job.summary ? <p className="mb-6">{job.summary}</p> : null}
      <article className="prose">
        <p>{job.description ?? "Full role description coming soon."}</p>
      </article>
    </main>
  );
}
