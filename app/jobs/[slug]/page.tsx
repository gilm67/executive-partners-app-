import { notFound } from "next/navigation";
import { fetchJobBySlugPublic } from "@/lib/jobs-public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Next 15 PageProps: params is a Promise in dynamic routes
export default async function JobDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const job = await fetchJobBySlugPublic(slug);
  if (!job) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">{job.title}</h1>
      <div className="text-sm text-gray-600">
        {job.location} {job.market ? `• ${job.market}` : ""} {job.seniority ? `• ${job.seniority}` : ""}
      </div>
      {job.summary && <p className="mt-4">{job.summary}</p>}
    </main>
  );
}
