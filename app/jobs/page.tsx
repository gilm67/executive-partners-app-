/* app/jobs/page.tsx */
import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";
import {
  Search, MapPin, Briefcase, Shield, CalendarDays, ChevronRight, Filter, Star,
} from "lucide-react";

/* ---------------- meta ---------------- */

export const metadata: Metadata = {
  title: "Open Roles — Executive Partners | Private Banking & Wealth Management",
  description:
    "Browse confidential mandates across Switzerland and international hubs. Roles for Senior Relationship Managers, Team Heads, and leadership in Private Banking.",
  openGraph: {
    title: "Open Roles — Executive Partners",
    description:
      "Targeted, confidential private banking mandates across CH, UK, US, Dubai, Singapore, and Hong Kong.",
    url: "https://www.execpartners.ch/jobs",
    images: [{ url: "/og.png" }],
  },
  alternates: { canonical: "https://www.execpartners.ch/jobs" },
};

/* ---------------- types ---------------- */

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
  createdAt?: string; // ISO
};

/* ---------------- data: fallback (keeps page populated) ---------------- */

const CANONICAL_JOBS: Job[] = [
  {
    title: "Senior Relationship Manager — MEA",
    location: "Dubai",
    market: "Middle East & Africa (MEA)",
    seniority: "Director / Executive Director",
    summary:
      "Cover UHNW/HNW MEA clients from Dubai; strong acquisition and cross-border expertise.",
    slug: "senior-relationship-manager-mea-dubai",
    confidential: true,
    active: true,
  },
  {
    title: "Senior Relationship Manager — Brazil",
    location: "Zurich or Geneva",
    market: "Brazil (LatAm)",
    seniority: "Director / Executive Director",
    summary:
      "Acquire, develop and manage HNW/UHNW Brazilian clients in Switzerland; full private banking advisory and cross-border expertise.",
    slug: "senior-relationship-manager-brazil-ch",
    confidential: true,
    active: true,
  },
  {
    title: "Senior Relationship Manager — CH Onshore",
    location: "Zurich",
    market: "Switzerland (Onshore)",
    seniority: "Director / Executive Director",
    summary:
      "Manage UHNW/HNW Swiss onshore clients in German-speaking Switzerland; strong acquisition and advisory expertise.",
    slug: "senior-relationship-manager-ch-onshore-zurich",
    confidential: true,
    active: true,
  },
  {
    title: "Senior Relationship Manager — CH Onshore",
    location: "Lausanne",
    market: "Switzerland (Onshore)",
    seniority: "Director / Executive Director",
    summary:
      "Cover UHNW/HNW Swiss onshore clients in Romandie; focus on acquisition and cross-generational advisory.",
    slug: "senior-relationship-manager-ch-onshore-lausanne",
    confidential: true,
    active: true,
  },
  {
    title: "Senior Relationship Manager — Portugal",
    location: "Geneva",
    market: "Portugal (LatAm/Europe)",
    seniority: "Director / Executive Director",
    summary:
      "Manage UHNW/HNW Portuguese clients booking in Switzerland; strong cross-border, advisory, and acquisition expertise.",
    slug: "senior-relationship-manager-portugal-geneva",
    confidential: true,
    active: true,
  },
  {
    title: "Senior Relationship Manager — MEA",
    location: "Zurich",
    market: "Middle East & Africa (MEA)",
    seniority: "Director / Executive Director",
    summary:
      "Cover UHNW/HNW MEA clients from Zurich; GCC and African markets focus.",
    slug: "senior-relationship-manager-mea-zurich",
    confidential: true,
    active: true,
  },
];

/* Hide retired/duplicate slugs */
const HIDDEN_SLUGS = new Set<string>([
  "senior-relationship-manager-ch-onshore-4",
  "senior-relationship-manager-brazil-2",
  "private-banker-mea-2",
]);

/* ---------------- fetching ---------------- */

async function safeFetchJSON(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}

async function getJobs(query: string, filters: Record<string, string>) {
  const params = new URLSearchParams({ q: query, ...filters });
  const absBase = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const urls = [
    absBase ? `${absBase}/api/jobs?${params}` : "",
    `/api/jobs?${params}`,
  ].filter(Boolean) as string[];

  for (const u of urls) {
    const json = await safeFetchJSON(u);
    if (Array.isArray(json) && json.length) return json as Job[];
  }
  // ✅ Fallback so the page is never empty
  return CANONICAL_JOBS;
}

/* ---------------- UI primitives (unchanged) ---------------- */

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/80">
      {children}
    </span>
  );
}

function BadgeTone({ market }: { market?: string }) {
  const mk = (market || "").toLowerCase();
  const isMEA = mk.includes("mea");
  const isCH = mk.includes("switzerland") || mk.includes("onshore");
  const base = isMEA
    ? "from-emerald-500 to-teal-400"
    : isCH
    ? "from-sky-500 to-blue-400"
    : "from-purple-500 to-pink-500";
  return (
    <div className={`inline-flex select-none items-center gap-2 rounded-full bg-gradient-to-r ${base} px-2.5 py-1 text-xs font-semibold text-white shadow-sm`}>
      <Star className="h-3.5 w-3.5 opacity-90" />
      {market ?? "International"}
    </div>
  );
}

function Card({ job }: { job: Job }) {
  const href = `/jobs/${job.slug}`;
  const created = job.createdAt ? new Date(job.createdAt) : null;
  const createdFmt = created
    ? created.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    : null;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)] transition hover:shadow-[0_8px_30px_rgba(0,0,0,.45)]">
      <div className="pointer-events-none absolute inset-0 opacity-[.18] [background:radial-gradient(700px_160px_at_0%_0%,rgba(14,165,233,1),transparent_60%),radial-gradient(700px_160px_at_100%_0%,rgba(34,197,94,1),transparent_60%)]" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <BadgeTone market={job.market} />
          {createdFmt && (
            <span className="inline-flex items-center gap-1 text-xs text-white/70">
              <CalendarDays className="h-3.5 w-3.5" /> {createdFmt}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-xl font-bold text-white">{job.title}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-white/80">
          {job.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 opacity-90" /> {job.location}
            </span>
          )}
          {job.seniority && (
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 opacity-90" /> {job.seniority}
            </span>
          )}
          {job.confidential ? (
            <Chip>
              <Shield className="mr-1 h-3.5 w-3.5" />
              Confidential
            </Chip>
          ) : null}
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-300">
          {job.summary ?? "Discreet mandate with strong platform, open architecture and competitive grid."}
        </p>

        <div className="mt-auto pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            View details <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="h-5 w-40 rounded-full bg-white/10" />
      <div className="mt-3 h-6 w-3/5 rounded bg-white/10" />
      <div className="mt-2 h-4 w-2/5 rounded bg-white/10" />
      <div className="mt-4 h-16 w-full rounded bg-white/10" />
      <div className="mt-6 h-9 w-32 rounded-xl bg-white/10" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
      <h3 className="text-lg font-semibold text-white">No roles match your filters</h3>
      <p className="mt-2 text-sm text-neutral-300">
        Try clearing filters or checking back soon—new mandates drop regularly.
      </p>
      <div className="mt-4">
        <Link href="/contact" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
          Talk to us confidentially
        </Link>
      </div>
    </div>
  );
}

/* ---------------- Filter Bar (unchanged) ---------------- */

function FilterBar({
  defaultQuery,
  defaultFilters,
}: {
  defaultQuery?: string;
  defaultFilters?: Record<string, string>;
}) {
  return (
    <form className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
        <input
          name="q"
          defaultValue={defaultQuery}
          placeholder="Search by title, market, location…"
          className="w-full rounded-xl border border-white/10 bg-transparent py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-white/20"
        />
      </div>

      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-3">
        <select name="market" defaultValue={defaultFilters?.market ?? ""} className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none">
          <option value="" className="bg-[#0B0E13]">All markets</option>
          <option value="Switzerland (Onshore)" className="bg-[#0B0E13]">Switzerland (Onshore)</option>
          <option value="Middle East & Africa (MEA)" className="bg-[#0B0E13]">MEA</option>
          <option value="UK" className="bg-[#0B0E13]">UK</option>
          <option value="US" className="bg-[#0B0E13]">US</option>
          <option value="Singapore" className="bg-[#0B0E13]">Singapore</option>
          <option value="Hong Kong" className="bg-[#0B0E13]">Hong Kong</option>
          <option value="Portugal (LatAm/Europe)" className="bg-[#0B0E13]">Portugal</option>
        </select>

        <select name="location" defaultValue={defaultFilters?.location ?? ""} className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none">
          <option value="" className="bg-[#0B0E13]">All locations</option>
          <option value="Geneva" className="bg-[#0B0E13]">Geneva</option>
          <option value="Zurich" className="bg-[#0B0E13]">Zurich</option>
          <option value="Lausanne" className="bg-[#0B0E13]">Lausanne</option>
          <option value="Dubai" className="bg-[#0B0E13]">Dubai</option>
          <option value="Singapore" className="bg-[#0B0E13]">Singapore</option>
          <option value="Hong Kong" className="bg-[#0B0E13]">Hong Kong</option>
          <option value="London" className="bg-[#0B0E13]">London</option>
          <option value="New York" className="bg-[#0B0E13]">New York</option>
        </select>

        <select name="seniority" defaultValue={defaultFilters?.seniority ?? ""} className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none">
          <option value="" className="bg-[#0B0E13]">All seniorities</option>
          <option value="Director" className="bg-[#0B0E13]">Director</option>
          <option value="Executive Director" className="bg-[#0B0E13]">Executive Director</option>
          <option value="Managing Director" className="bg-[#0B0E13]">Managing Director</option>
          <option value="Team Head" className="bg-[#0B0E13]">Team Head</option>
        </select>
      </div>

      <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
        <Filter className="h-4 w-4" /> Apply
      </button>
    </form>
  );
}

/* ---------------- Page (unchanged layout) ---------------- */

export default async function JobsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const sp = (await searchParams) ?? {};
  const q = typeof sp.q === "string" ? sp.q : "";
  const market = typeof sp.market === "string" ? sp.market : "";
  const location = typeof sp.location === "string" ? sp.location : "";
  const seniority = typeof sp.seniority === "string" ? sp.seniority : "";
  const sort = typeof sp.sort === "string" ? sp.sort : "newest";

  const filters: Record<string, string> = {};
  if (market) filters.market = market;
  if (location) filters.location = location;
  if (seniority) filters.seniority = seniority;
  if (sort) filters.sort = sort;

  const rawJobs: Job[] = await getJobs(q, filters);

  const jobs = rawJobs.filter(
    (j) => j?.active !== false && !HIDDEN_SLUGS.has(j.slug)
  );

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1400px 500px at 10% -10%, rgba(14,165,233,.15) 0%, rgba(14,165,233,0) 60%), radial-gradient(1100px 420px at 110% 0%, rgba(34,197,94,.14) 0%, rgba(34,197,94,0) 60%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-14">
        <div className="text-center">
          <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
            Discreet Private Banking Mandates
          </div>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">Open Roles</h1>
          <p className="mx-auto mt-3 max-w-3xl text-neutral-300">
            Switzerland first—plus UK, US, Dubai, Singapore &amp; Hong Kong. We publish a subset of live searches; confidential roles are shared directly with qualified bankers.
          </p>
        </div>

        <div className="mt-8">
          <FilterBar defaultQuery={q} defaultFilters={{ market, location, seniority }} />
        </div>

        {/* Sort row */}
        <div className="mt-4 flex items-center justify-between text-sm text-white/70">
          <div>{jobs.length} role{jobs.length === 1 ? "" : "s"}</div>
          <form>
            <select name="sort" defaultValue={sort} className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none">
              <option value="newest" className="bg-[#0B0E13]">Newest first</option>
              <option value="oldest" className="bg-[#0B0E13]">Oldest first</option>
              <option value="title" className="bg-[#0B0E13]">Title A–Z</option>
            </select>
          </form>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Suspense fallback={<><SkeletonCard/><SkeletonCard/><SkeletonCard/><SkeletonCard/></>}>
            {jobs.length === 0 ? <EmptyState /> : jobs.map((job) => <Card key={job.slug} job={job} />)}
          </Suspense>
        </div>

        {/* Footer CTA */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
          <p className="text-neutral-300">Don’t see your exact market? We run confidential mandates continuously.</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <Link href="/contact" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Contact us</Link>
            <Link href="/candidates" className="rounded-xl bg-[#1D4ED8] !text-white text-white px-4 py-2 text-sm font-semibold text-white hover:bg-[#1E40AF] !text-white text-white font-semibold">Register confidentially</Link>
          </div>
        </div>
      </div>
    </main>
  );
}