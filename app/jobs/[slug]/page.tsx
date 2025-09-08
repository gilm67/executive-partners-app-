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

// helper to wrap template strings as markdown (just returns the string)
function md(s: string) {
  return s.trim();
}

/* ------------ Rich fallback bodies (markdown) ------------ */
/* Brazil = EXACT text you provided. Others are region-adapted with the same structure. */
const FALLBACK_BODIES: Record<string, string> = {
  // ===== BRAZIL — Zurich or Geneva =====
  "senior-relationship-manager-brazil-ch": md(`
**Title:** Senior Relationship Manager Brazil  
**Location:** Zurich or Geneva

### Position Overview
The **Senior Relationship Manager** is responsible for acquiring, developing, and managing a portfolio of high-net-worth (HNW) and ultra-high-net-worth (UHNW) individuals **based in Brazil**, serving as a trusted advisor by providing comprehensive private banking services and tailored financial solutions.

### Key Responsibilities
- Develop and expand a personal client network, especially within the **Brazil** market.  
- Act as a strategic advisor, offering integrated wealth management solutions across investments, lending, and estate planning.  
- Deliver full-service banking and facilitate all client transactions, collaborating with product specialists as needed.  
- Proactively identify business development opportunities and generate new leads through networking and referrals.  
- Provide consistent, high-value advice with a focus on long-term relationships and client satisfaction.  
- Maintain rigorous compliance with internal policies and regulatory guidelines, including **KYC and AML** standards.  
- Mentor junior staff, contribute to team goals, and share best practices within the organization.

### Core Requirements
- University degree in finance, banking, or a related field; advanced education or certifications preferred.  
- Proven track record of at least **7–10 years** in private banking, with a strong portfolio of **HNW/UHNW clients in Brazil**.  
- Deep knowledge of financial markets, investment products, and regulatory topics.  
- Outstanding interpersonal, communication, and negotiation skills, with fluency in **English and Portuguese**; French or Swiss German considered a plus.  
- Demonstrated entrepreneurial drive, with experience in both client acquisition ("hunter") and client retention ("farmer") roles.  
- **Swiss residency or valid permit** highly desirable; cross-border experience an advantage.

### Essential Competencies
- Business acumen with a robust local network and a client-focused, ethical approach.  
- Ability to leverage internal experts and resources for holistic client solutions.  
- Strong compliance awareness and attention to detail.  
- High motivation, team spirit, and adaptability in a dynamic and demanding environment.

### What Our Client Offer
- Advanced workplace infrastructure, collaborative spaces, and diverse teams.  
- Opportunities for career progression in a client-focused, entrepreneurial setting.  
- Competitive compensation, benefits, and ongoing professional development.
`),

  // ===== MEA — Dubai =====
  "senior-relationship-manager-mea-dubai": md(`
**Title:** Private Banker / Senior Relationship Manager — MEA  
**Location:** Dubai

### Position Overview
The **Senior Relationship Manager** will acquire, develop, and manage a portfolio of **HNW/UHNW clients across the Middle East & Africa (MEA)** from a Dubai hub, delivering tailored private banking solutions across investment, credit, and wealth planning.

### Key Responsibilities
- Build and expand a personal client network across GCC, Levant, and North Africa.  
- Act as a strategic advisor, providing integrated wealth solutions (DPM/advisory, structured products, Lombard/real-estate credit, and wealth planning).  
- Drive new business through referrals, professional networks, and targeted events across the region.  
- Maintain strict cross-border and local regulatory adherence; ensure comprehensive **KYC/AML**.  
- Partner with product specialists; mentor juniors and champion best practices.

### Core Requirements
- 7–10+ years in private banking with **portable MEA relationships** and proven acquisition.  
- Strong knowledge of regional markets and cross-border frameworks.  
- Fluency in **English**; **Arabic and/or French** are strong advantages.  
- Entrepreneurial, results-driven profile; track record of sustainable client retention.

### Essential Competencies
- High cultural fluency across MEA and strong stakeholder management.  
- Rigorous compliance mind-set and disciplined execution.  
- Collaborative, proactive, and client-centric approach.

### What Our Client Offer
- **Dubai** hub with global booking options, competitive grid, and robust product shelf.  
- Clear development path, diverse teams, and private markets access.
`),

  // ===== MEA — Zurich =====
  "senior-relationship-manager-mea-zurich": md(`
**Title:** Senior Relationship Manager — MEA  
**Location:** Zurich

### Position Overview
Advise **HNW/UHNW MEA** clients via **Zurich booking**, leveraging Switzerland’s stability and depth in global wealth management.

### Key Responsibilities
- Acquire and grow a MEA portfolio (GCC/Levant/Africa) from a Swiss platform.  
- Provide integrated investment, credit, and succession solutions with strong cross-border governance.  
- Build professional referral networks (lawyers, fiduciaries, family offices).  
- Ensure robust **KYC/AML** and cross-border compliance.

### Core Requirements
- 7+ years in Swiss private banking with **MEA coverage** and portable relationships.  
- Fluent **English** (Arabic and/or French valued).  
- Strong acquisition track record and disciplined client care.

### Essential Competencies
- Client-first advisory, structured problem-solving, and collaboration across teams.  
- High integrity and compliance discipline.

### What Our Client Offer
- Swiss booking center with global reach, strong platform support, and competitive remuneration.
`),

  // ===== CH Onshore — Zurich =====
  "senior-relationship-manager-ch-onshore-zurich": md(`
**Title:** Senior Relationship Manager — CH Onshore  
**Location:** Zurich

### Position Overview
Serve **Swiss-domiciled HNW/UHNW** clients in **Zurich**, offering holistic onshore private banking solutions aligned with FINMA standards.

### Key Responsibilities
- Acquire and grow a Swiss onshore portfolio across Zurich and surrounding cantons.  
- Deliver integrated advisory across investments, mortgages, pension, and succession planning.  
- Build referral ecosystems with local lawyers, fiduciaries, and entrepreneurs.  
- Maintain **FINMA-grade** documentation and compliance.

### Core Requirements
- 7–10+ years Swiss onshore coverage with a portable network.  
- Fluency in **German/Swiss German** and English (French a plus).  
- Strong commercial drive and client care.

### Essential Competencies
- Local market credibility, ethical approach, and attention to detail.  
- Collaborative team player with high standards and resilience.

### What Our Client Offer
- Entrepreneurial onshore platform, respected brand, and competitive grid.
`),

  // ===== CH Onshore — Lausanne =====
  "senior-relationship-manager-ch-onshore-lausanne": md(`
**Title:** Senior Relationship Manager — CH Onshore  
**Location:** Lausanne (Romandie)

### Position Overview
Advise **HNW/UHNW Swiss onshore** clients across **Romandie** (Lausanne/Vaud/Geneva), offering comprehensive local solutions.

### Key Responsibilities
- Develop and manage a portfolio across Lausanne, Vaud, and Geneva.  
- Provide investment advisory, lending, pension, and estate planning tailored to Swiss onshore needs.  
- Grow referral channels with local professionals; ensure top-tier client service.  
- Uphold **FINMA** compliance and rigorous **KYC/AML**.

### Core Requirements
- 7+ years Swiss onshore PB; proven Romandie network.  
- Fluency in **French** and English; strong local presence.  
- Acquisition and long-term relationship management skills.

### Essential Competencies
- Client-first mentality, diligence, and collaborative mindset.  
- Strong ethics and attention to detail.

### What Our Client Offer
- Strong Romandie brand, supportive culture, and competitive compensation.
`),

  // ===== Portugal — Geneva =====
  "senior-relationship-manager-portugal-geneva": md(`
**Title:** Senior Relationship Manager — Portugal  
**Location:** Geneva

### Position Overview
Lead relationships with **HNW/UHNW Portuguese** clients and diaspora from **Geneva**, leveraging Switzerland’s booking center and cross-border capabilities.

### Key Responsibilities
- Acquire and grow a portfolio of Portuguese entrepreneurs and families in CH/EU.  
- Provide integrated advisory across investments, credit, and wealth/succession planning.  
- Build diaspora referral channels; drive new business via events and partnerships.  
- Ensure stringent **KYC/AML** and cross-border compliance.

### Core Requirements
- 7–10+ years covering **Portugal** with portable relationships.  
- Fluency in **Portuguese** and English (French a strong plus).  
- Consistent acquisition and retention track record.

### Essential Competencies
- Cultural fluency, client-centric advisory, and disciplined execution.  
- Strong compliance awareness and team collaboration.

### What Our Client Offer
- Geneva hub with dedicated Portugal/LatAm desk, private markets access, and competitive grid.
`),
};

/* ---------------- “Always available” job fallbacks ---------------- */
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
    } catch {}
  }
  // fallback to our known jobs if API is empty
  return Object.values(KNOWN_JOBS);
}

/** Find a job by slug with a few robust fallbacks. */
async function fetchJobBySlug(requestedSlug: string): Promise<Job | null> {
  const all = await fetchAllJobs();
  if (!all.length) return null;

  const wanted = norm(requestedSlug);

  // exact slug
  let found = all.find((j) => norm(j.slug) === wanted);
  if (found) return found;

  // fuzzy
  found =
    all.find((j) => norm(j.slug).startsWith(wanted)) ||
    all.find((j) => wanted.startsWith(norm(j.slug))) ||
    all.find((j) => norm(j.title).includes(wanted));
  if (found) return found;

  // heuristic
  const hints = new Set(wanted.split("-"));
  found = all.find((j) => {
    const hay = `${norm(j.title)}-${norm(j.location)}-${norm(j.market)}`;
    const score = [...hints].reduce((acc, p) => (p && hay.includes(p) ? acc + 1 : acc), 0);
    return score >= 2;
  });
  if (found) return found;

  // final fallback
  return KNOWN_JOBS[wanted] ?? null;
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