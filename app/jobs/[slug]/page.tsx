// app/jobs/[slug]/page.tsx
import Link from "next/link";
import MarkdownLite from "../MarkdownLite";

type Job = {
  id?: string;
  title: string;
  location: string;
  market?: string;
  seniority?: string;
  summary?: string;
  slug: string;
  confidential?: boolean;
  active?: boolean;
  createdAt?: string;
  body?: string; // full description text/markdown
};

// Hide retired/duplicate slugs if they ever appear
const HIDDEN_SLUGS = new Set<string>([
  "senior-relationship-manager-ch-onshore-4",
  "senior-relationship-manager-brazil-2",
  "private-banker-mea-2",
]);

async function fetchJob(slug: string): Promise<Job | null> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  // Try multiple API shapes in order of most specific → broadest,
  // and absolute → relative to work in preview/prod/local
  const endpoints = [
    `${base}/api/jobs/${encodeURIComponent(slug)}`,
    `/api/jobs/${encodeURIComponent(slug)}`,
    `${base}/api/jobs?slug=${encodeURIComponent(slug)}`,
    `/api/jobs?slug=${encodeURIComponent(slug)}`,
    `${base}/api/jobs`,
    `/api/jobs`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) continue;

      const data = await res.json();

      // Single job object
      if (data && !Array.isArray(data) && typeof data === "object") {
        const j = data as Job;
        if (j?.slug) return j;
      }

      // Array of jobs: find by slug
      if (Array.isArray(data)) {
        const list = data as Job[];
        const found = list.find((j) => j?.slug === slug);
        if (found) return found;
        // Sometimes the API returns one-item arrays when filtering
        if (list.length === 1 && list[0]?.title) return list[0];
      }
    } catch {
      // ignore and try next
    }
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await fetchJob(slug);
  const title = job?.title ? `${job.title} | Executive Partners` : "Role | Executive Partners";
  const description =
    job?.summary ??
    "Confidential private banking mandate via Executive Partners. Apply discretely.";
  return { title, description };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await fetchJob(slug);

  if (!job || HIDDEN_SLUGS.has(job.slug)) {
    return (
      <main className="relative min-h-screen bg-[#0B0E13] text-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-16">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h1 className="text-xl font-semibold">Role unavailable</h1>
            <p className="mt-2 text-neutral-300">
              This mandate is no longer available or was set to confidential. Browse our{" "}
              <Link href="/jobs" className="text-blue-400 underline-offset-4 hover:underline">
                open roles
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    );
  }

  const createdFmt = job.createdAt
    ? new Date(job.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : undefined;

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* soft ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-10">
        {/* Header Card */}
        <section className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-6 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                {job.market ? (
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 to-blue-400 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                    {job.market}
                  </span>
                ) : null}
                {job.confidential ? (
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium">
                    Confidential
                  </span>
                ) : null}
                {createdFmt ? (
                  <span className="text-xs text-white/70">Posted {createdFmt}</span>
                ) : null}
              </div>

              <h1 className="mt-2 text-2xl font-bold leading-tight md:text-3xl">{job.title}</h1>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/80">
                {job.location && (
                  <span className="inline-flex items-center gap-1.5">{job.location}</span>
                )}
                {job.seniority && (
                  <span className="inline-flex items-center gap-1.5">{job.seniority}</span>
                )}
              </div>
            </div>

            <div className="flex w-full items-center gap-3 md:w-auto">
              <Link
                href="/apply"
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1E40AF] md:flex-none"
              >
                Apply / Submit CV
              </Link>
              <Link
                href="/contact"
                className="hidden items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 md:inline-flex"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          {job.body ? (
            <MarkdownLite text={job.body} />
          ) : job.summary ? (
            <MarkdownLite text={job.summary} />
          ) : (
            <p className="text-neutral-300">
              Full description available upon request.{" "}
              <Link href="/contact" className="text-blue-400 underline-offset-4 hover:underline">
                Contact us confidentially
              </Link>
              .
            </p>
          )}
        </section>

        {/* Footer CTA */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-neutral-300 md:text-left">
              Not an exact match? We share <span className="font-semibold">confidential</span> mandates
              directly with qualified bankers.
            </p>
            <div className="flex gap-3">
              <Link
                href="/jobs"
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Browse more roles
              </Link>
              <Link
                href="/apply"
                className="rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF]"
              >
                Submit CV
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}