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
  body?: string;
};

/* ---------------- Hide retired/duplicate slugs ---------------- */
const HIDDEN_SLUGS = new Set<string>([
  "senior-relationship-manager-ch-onshore-4",
  "senior-relationship-manager-brazil-2",
  "private-banker-mea-2",
]);

/* ---------------- Utils ---------------- */
function norm(s: string | undefined) {
  return (s ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}
function md(s: string) {
  return s.trim();
}

/* ---------------- Rich fallback bodies (markdown) ---------------- */
const FALLBACK_BODIES: Record<string, string> = {
  "senior-relationship-manager-brazil-ch": md(`
**Position Overview**  
The *Senior Relationship Manager* is responsible for acquiring, developing, and managing a portfolio of HNW/UHNW individuals based in **Brazil**, serving as a trusted advisor with comprehensive private banking services and tailored financial solutions (Zurich or Geneva booking).

**Key Responsibilities**
- Develop and expand a personal client network across Brazil and the Brazilian diaspora.
- Act as a strategic advisor across investments, lending, and estate planning; coordinate with product specialists.
- Proactively originate new business via networking, referrals, and targeted events.
- Ensure rigorous KYC/AML and cross-border compliance.
- Mentor junior staff and contribute to team best practices.

**Core Requirements**
- 7–10+ years in private banking with a portable HNW/UHNW Brazil book.
- Deep markets knowledge; fluency in **Portuguese** and English (French/Swiss German a plus).
- Entrepreneurial “hunter + farmer” profile; Swiss permit ideal.

**Essential Competencies**
- Client-centric, ethical approach; strong compliance discipline.
- Ability to orchestrate internal experts for holistic solutions.
- High energy, team spirit, and adaptability.

**What Our Client Offer**
- Advanced platform, collaborative culture, and private markets access.
- Clear career progression and competitive compensation grid.
`),

  "senior-relationship-manager-mea-dubai": md(`
**Position Overview**  
Lead and grow relationships with UHNW/HNW clients across **MEA** from a **Dubai** hub, leveraging a full-suite platform and regional reach.

**Key Responsibilities**
- Originate/grow a MEA portfolio (GCC, Levant, North Africa).
- Advise across DPM/advisory, credit, and wealth planning (incl. Sharia-compliant where relevant).
- Activate professional networks, family offices, and referral partners.
- Maintain strict cross-border and local regulatory compliance.
- Guide juniors and promote team collaboration.

**Core Requirements**
- 7–10+ years in private banking with a portable MEA book.
- Proven acquisition & retention; English fluent (Arabic/French a plus).
- Robust MEA cross-border understanding.

**What Our Client Offer**
- Dubai hub with global booking; competitive grid and strong product shelf.
`),

  "senior-relationship-manager-mea-zurich": md(`
**Position Overview**  
Cover MEA clients booking in **Zurich**, using Switzerland's infrastructure and reputation as a global wealth hub.

**Key Responsibilities**
- Originate and serve UHNW/HNW clients from GCC, Levant, and Africa.
- Deliver investment, credit, and succession/structuring solutions with Zurich booking.
- Work closely with family office, asset management, and private markets teams.
- Ensure cross-border compliance across MEA jurisdictions.

**Core Requirements**
- 7+ years Swiss private banking with MEA exposure.
- Portable UHNW/HNW book; English fluent (Arabic/French valued).

**What Our Client Offer**
- Swiss booking with global reach, strong platform support.
`),

  "senior-relationship-manager-ch-onshore-zurich": md(`
**Position Overview**  
Advise **Swiss-domiciled UHNW/HNW** clients in **Zurich**, providing a holistic onshore proposition.

**Key Responsibilities**
- Acquire and grow a Swiss onshore portfolio in Zurich and surrounding cantons.
- Provide integrated solutions: investments, mortgages, pension, and succession.
- Cultivate referral networks with local lawyers, fiduciaries, and entrepreneurs.
- Maintain FINMA-grade compliance and documentation.

**Core Requirements**
- 7–10+ years Swiss onshore coverage.
- Fluent **German/Swiss German** and English (French a plus).
- Strong local network and commercial drive.

**What Our Client Offer**
- Entrepreneurial onshore platform and competitive remuneration.
`),

  "senior-relationship-manager-ch-onshore-lausanne": md(`
**Position Overview**  
Focus on **Romandie** (Lausanne/Vaud/Geneva), advising local UHNW/HNW individuals and families.

**Key Responsibilities**
- Acquire and serve clients in Lausanne, Vaud, and Geneva regions.
- Tailor investment and estate planning to Swiss onshore needs.
- Build robust referral channels with local professionals.

**Core Requirements**
- 7+ years Swiss onshore PB.
- Fluent **French** and English; strong Romandie network.

**What Our Client Offer**
- Strong brand recognition in Romandie and collaborative culture.
`),

  "senior-relationship-manager-portugal-geneva": md(`
**Position Overview**  
Geneva-based role focused on UHNW/HNW **Portuguese** clients and diaspora, leveraging Switzerland’s booking center.

**Key Responsibilities**
- Grow a client base of Portuguese entrepreneurs and families.
- Offer global investments, cross-border structuring, and succession planning.
- Prospect actively and leverage diaspora links across Switzerland and Europe.
- Ensure KYC/AML and cross-border rules are fully respected.

**Core Requirements**
- 7–10+ years with Portugal coverage.
- Fluent **Portuguese** and English (French a plus).
- Strong acquisition track record and diaspora network.

**What Our Client Offer**
- Geneva hub with dedicated Portugal/LatAm desk; competitive platform and private markets access.
`),
};

/* ---------------- “Always available” job fallbacks ----------------
   These render even if /api/jobs returns [].
------------------------------------------------------------------- */
const KNOWN_JOBS: Record<string, Job> = {
  "senior-relationship-manager-brazil-ch": {
    slug: "senior-relationship-manager-brazil-ch",
    title: "Senior Relationship Manager — Brazil",
    location: "Zurich or Geneva",
    market: "Brazil (LatAm)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "Develop and manage HNW/UHNW Brazilian clients; full private banking advisory and cross-border expertise.",
    body: FALLBACK_BODIES["senior-relationship-manager-brazil-ch"],
  },
  "senior-relationship-manager-mea-dubai": {
    slug: "senior-relationship-manager-mea-dubai",
    title: "Private Banker — MEA",
    location: "Dubai",
    market: "Middle East & Africa (MEA)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "Cover UHNW/HNW MEA clients from Dubai; strong acquisition and cross-border expertise.",
    body: FALLBACK_BODIES["senior-relationship-manager-mea-dubai"],
  },
  "senior-relationship-manager-mea-zurich": {
    slug: "senior-relationship-manager-mea-zurich",
    title: "Senior Relationship Manager — MEA",
    location: "Zurich",
    market: "Middle East & Africa (MEA)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "Serve UHNW/HNW MEA clients via Zurich booking; advisory, credit and structuring.",
    body: FALLBACK_BODIES["senior-relationship-manager-mea-zurich"],
  },
  "senior-relationship-manager-ch-onshore-zurich": {
    slug: "senior-relationship-manager-ch-onshore-zurich",
    title: "Senior Relationship Manager — CH Onshore",
    location: "Zurich",
    market: "Switzerland (Onshore)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "UHNW/HNW Swiss-domiciled clients; Zurich booking centre; strong local network required.",
    body: FALLBACK_BODIES["senior-relationship-manager-ch-onshore-zurich"],
  },
  "senior-relationship-manager-ch-onshore-lausanne": {
    slug: "senior-relationship-manager-ch-onshore-lausanne",
    title: "Senior Relationship Manager — CH Onshore",
    location: "Lausanne",
    market: "Switzerland (Onshore)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "UHNW/HNW Swiss-domiciled clients; Romandie focus; strong local network required.",
    body: FALLBACK_BODIES["senior-relationship-manager-ch-onshore-lausanne"],
  },
  "senior-relationship-manager-portugal-geneva": {
    slug: "senior-relationship-manager-portugal-geneva",
    title: "Senior Relationship Manager — Portugal",
    location: "Geneva",
    market: "Portugal (LatAm/Europe)",
    seniority: "Director/ED/MD",
    active: true,
    summary:
      "UHNW/HNW Portuguese clients and diaspora; Geneva booking centre; cross-border expertise.",
    body: FALLBACK_BODIES["senior-relationship-manager-portugal-geneva"],
  },
};

/* ---------------- Data loading ---------------- */
async function fetchAllJobs(): Promise<Job[]> {
  const abs = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/jobs`
    : null;

  const tries: (RequestInfo | URL)[] = [];
  if (abs) tries.push(abs);
  tries.push("/api/jobs");

  for (const url of tries) {
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) continue;
      const raw = await r.json();
      const list: Job[] = Array.isArray(raw)
        ? raw
        : Array.isArray((raw as any)?.jobs)
        ? (raw as any).jobs
        : [];
      if (Array.isArray(list) && list.length) return list;
    } catch {
      // ignore and try next
    }
  }

  // 🔁 If API is empty/unavailable, return our known jobs as a fallback source
  return Object.values(KNOWN_JOBS);
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

  // 3) market/location heuristic
  const parts = wanted.split("-");
  const hints = new Set(parts);
  found = all.find((j) => {
    const hay = `${norm(j.title)}-${norm(j.location)}-${norm(j.market)}`;
    const score = [...hints].reduce((acc, p) => (p && hay.includes(p) ? acc + 1 : acc), 0);
    return score >= 2;
  });
  if (found) return found;

  // 4) Final safety: look directly in known jobs map
  const known = KNOWN_JOBS[wanted] || KNOWN_JOBS[Object.keys(KNOWN_JOBS).find((k) => norm(k) === wanted) ?? ""];
  return known ?? null;
}

/* ---------------- Metadata & Page ---------------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await fetchJobBySlug(slug);
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
  const job = await fetchJobBySlug(slug);

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

  const body =
    job.body?.trim() ||
    FALLBACK_BODIES[norm(job.slug)] ||
    (job.summary ? `**Overview**\n\n${job.summary}\n\nFor full details, please contact us confidentially.` : "");

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
          {body ? <MarkdownLite text={body} /> : <p className="text-neutral-300">Details available upon request.</p>}
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