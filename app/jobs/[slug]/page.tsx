import { notFound } from "next/navigation";

type Job = {
  slug: string;
  title: string;
  location?: string;
  company?: string;
  description?: string;
};

async function getJobs(): Promise<Job[]> {
  // Reads from your existing API route shown in the build output (/api/jobs/list)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/jobs/list`, {
      cache: "no-store",
      // If your API route is same-origin, empty base URL is fine on Vercel
    });
    if (!res.ok) throw new Error("jobs list failed");
    const data = (await res.json()) as { jobs?: Job[] } | Job[];
    const jobs = Array.isArray(data) ? data : data.jobs ?? [];
    return jobs;
  } catch {
    return [];
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const jobs = await getJobs();
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <a href="/jobs" className="text-sm text-gray-500 hover:underline">← Back to jobs</a>
      <h1 className="mt-3 text-3xl font-semibold">{job.title}</h1>
      <p className="mt-1 text-gray-600">
        {job.company ?? "Executive Partners"}{job.location ? ` • ${job.location}` : ""}
      </p>
      {job.description && <p className="mt-6 whitespace-pre-line leading-7">{job.description}</p>}
    </main>
  );
}

export async function generateStaticParams() {
  // Optional: allows SSG for known slugs; safe to return [] if API empty
  const jobs = await getJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}