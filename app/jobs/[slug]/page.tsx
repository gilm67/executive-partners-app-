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
  body?: string;
};

// Slugs you explicitly want to hide
const HIDDEN_SLUGS = new Set<string>([
  "senior-relationship-manager-ch-onshore-4",
  "senior-relationship-manager-brazil-2",
  "private-banker-mea-2",
]);

/** Normalize slugs so small differences still match. */
function norm(s: string | undefined) {
  return (s ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Safely read either [{…}] or { jobs:[{…}] } */
async function fetchAllJobs(): Promise<Job[]> {
  const abs = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/jobs`
    : null;

  // Try absolute first (prod/preview), then relative (dev)
  const tries: (RequestInfo | URL)[] = [];
  if (abs) tries.push(abs);
  tries.push("/api/jobs");

  for (const url of tries) {
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) continue;
      const raw = await r.json();
      const list: Job[] = Array.isArray(raw) ? raw : Array.isArray(raw?.jobs) ? raw.jobs : [];
      if (Array.isArray(list) && list.length) return list;
    } catch {
      // ignore and try next
    }
  }
  return [];
}

/** Find a job by slug with a few robust fallbacks. */
async function fetchJobBySlug(requestedSlug: string): Promise<Job | null> {
  const all = await fetchAllJobs();
  if (!all.length) return null;

  const wanted = norm(requestedSlug);

  // 1) exact slug match
  let found = all.find((j) => norm(j.slug) === wanted);
  if (found) return found;

  // 2) startsWith/endsWith/contains fallback (handles minor differences)
  found =
    all.find((j) => norm(j.slug).startsWith(wanted)) ||
    all.find((j) => wanted.startsWith(norm(j.slug))) ||
    all.find((j) => norm(j.title).includes(wanted));
  if (found) return found;

  // 3) market/location heuristic (e.g., "...-mea-dubai")
  const parts = wanted.split("-");
  const hints = new Set(parts);
  found = all.find((j) => {
    const hay = `${norm(j.title)}-${norm(j.location)}-${norm(j.market)}`;
    const score = [...hints].reduce((acc, p) => (p && hay.includes(p) ? acc + 1 : acc), 0);
    return score >= 2; // at least two hints line up
  });
  return found ?? null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const job = await fetchJobBySlug(params.slug);
  const title = job?.title ? `${job.title} | Executive Partners` : "Role | Executive Partners";
  const description =
    job?.summary ??
    "Confidential private banking mandate via Executive Partners. Apply discretely.";
  return { title, description };
}

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await fetchJobBySlug(params.slug);

  if (!job || job.active === false || HIDDEN_SLUGS.has(job.slug)) {
    return (
      <main className="relative min-h-screen bg-[#0B0E13] text-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-16">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h1 className="text-xl font-semibold">Role unavailable</h1>
            <p className="mt-2 text-neutral-300">
              We couldn’t locate this mandate. Browse our{" "}
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
                {job.location && <span className="inline-flex items-center gap-1.5">{job.location}</span>}
                {job.seniority && <span className="inline-flex items-center gap-1.5">{job.seniority}</span>}
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