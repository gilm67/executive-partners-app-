// app/jobs/[slug]/page.tsx
import { notFound } from "next/navigation";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = { slug: string };

export default async function JobDetailPage({
  params,
}: {
  // Next 15 passes params as a Promise in RSC
  params: Promise<Params>;
}) {
  const { slug } = await params;

  // Build an absolute base URL from the current request (works on Vercel & locally)
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host") || "localhost:3000";
  const proto = (h.get("x-forwarded-proto") || (process.env.VERCEL ? "https" : "http")) as
    | "http"
    | "https";
  const base = `${proto}://${host}`;

  let job: any = null;
  try {
    const res = await fetch(
      `${base}/api/jobs/get?slug=${encodeURIComponent(slug)}`,
      { cache: "no-store", next: { revalidate: 0 } }
    );
    const data = await res.json();
    job = data?.job ?? (data?.slug ? data : null);
  } catch {
    // fall through to notFound
  }

  if (!job?.slug) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold">{job.title}</h1>
      <div className="text-sm text-gray-600 mt-2">
        {[job.location, job.seniority, job.market].filter(Boolean).join(" • ")}
      </div>

      {job.summary && <p className="mt-6">{job.summary}</p>}
      {job.description && (
        <article className="prose mt-6 whitespace-pre-wrap">
          {job.description}
        </article>
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
