/* app/en/jobs/page.tsx */
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Shield,
  CalendarDays,
  ChevronRight,
  Filter,
  Star,
} from "lucide-react";

import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { BreadcrumbSchema } from "@/components/StructuredData";

/* 🔗 Central job data (single source of truth) */
import { jobsList as CANONICAL_DATA } from "@/data/jobs";

/* ---------------- site base ---------------- */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

/* ---------------- meta (SEO) ---------------- */
export const metadata: Metadata = {
  title: "Private Banking Jobs in Switzerland | Executive Partners",
  description:
    "Explore confidential Private Banking jobs across Geneva & Zurich, plus Dubai, Singapore, London and New York. Discreet executive search for HNW/UHNW markets.",
  openGraph: {
    title: "Private Banking Jobs in Switzerland | Executive Partners",
    description:
      "Confidential Private Banking opportunities in Geneva, Zurich and global hubs. Submit your CV or speak with our search team.",
    url: `${SITE}/en/jobs`,
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Jobs | Executive Partners",
    description:
      "Exclusive private banking opportunities across Geneva, Zurich, Dubai, Singapore, London, New York.",
  },
  alternates: { canonical: `${SITE}/en/jobs` },
  robots: { index: true, follow: true },
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

/* ---------------- data: fallback (centralised) ---------------- */
const CANONICAL_JOBS: Job[] = CANONICAL_DATA.map((j) => ({
  title: j.title,
  location: j.location,
  market: j.market,
  seniority: "Director / Executive Director",
  summary: j.summary,
  slug: j.slug,
  confidential: true,
  active: true,
}));

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
    if (Array.isArray(json) && json.length) {
      return json as Job[];
    }
  }

  return CANONICAL_JOBS;
}

/* ---------------- helpers: country from location (for schema) ---------------- */
function countryFromLocation(location: string | undefined): string | undefined {
  if (!location) return undefined;
  const loc = location.toLowerCase();

  if (["geneva", "zurich", "lausanne", "lugano"].some((c) => loc.includes(c))) {
    return "CH";
  }
  if (loc.includes("dubai")) return "AE";
  if (loc.includes("singapore")) return "SG";
  if (loc.includes("hong kong")) return "HK";
  if (loc.includes("london")) return "GB";
  if (loc.includes("new york") || loc.includes("ny")) return "US";
  if (loc.includes("miami")) return "US";
  if (loc.includes("paris")) return "FR";
  if (loc.includes("madrid")) return "ES";
  if (loc.includes("lisbon")) return "PT";
  if (loc.includes("milan")) return "IT";

  return undefined;
}

/* ---------------- local filtering + sorting (FIX) ---------------- */
function norm(s: string) {
  return s.trim().toLowerCase();
}

function applyLocalFiltersAndSort(
  list: Job[],
  {
    q,
    market,
    location,
    seniority,
    sort,
  }: {
    q: string;
    market: string;
    location: string;
    seniority: string;
    sort: string;
  }
) {
  const qN = norm(q);
  const mN = norm(market);
  const lN = norm(location);
  const sN = norm(seniority);

  let out = list.filter((j) => j?.active !== false && !HIDDEN_SLUGS.has(j.slug));

  if (qN) {
    out = out.filter((j) => {
      const hay = [
        j.title ?? "",
        j.location ?? "",
        j.market ?? "",
        j.seniority ?? "",
        j.summary ?? "",
      ]
        .map(norm)
        .join(" ");
      return hay.includes(qN);
    });
  }

  // Use "includes" instead of strict equality to tolerate slightly different labels
  if (mN) out = out.filter((j) => norm(j.market ?? "").includes(mN));
  if (lN) out = out.filter((j) => norm(j.location ?? "").includes(lN));
  if (sN) out = out.filter((j) => norm(j.seniority ?? "").includes(sN));

  if (sort === "oldest") {
    out = out.sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return da - db;
    });
  } else if (sort === "title") {
    out = out.sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
  } else {
    // newest (default)
    out = out.sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });
  }

  return out;
}

/* ---------------- UI primitives ---------------- */
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
    ? "from-brandGoldDark to-brandGold"
    : isCH
    ? "from-brandGold to-brandGoldSoft"
    : "from-brandGoldSoft to-brandGold";

  return (
    <div
      className={`inline-flex select-none items-center gap-2 rounded-full bg-gradient-to-r ${base} px-2.5 py-1 text-xs font-semibold text-black shadow-sm`}
    >
      <Star className="h-3.5 w-3.5 opacity-90" />
      {market ?? "International"}
    </div>
  );
}

function Card({ job }: { job: Job }) {
  const href = `/en/jobs/${job.slug}`;

  const created = job.createdAt ? new Date(job.createdAt) : null;
  const createdFmt = created
    ? created.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)] transition hover:shadow-[0_8px_30px_rgba(0,0,0,.45)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[.18]"
        style={{
          background:
            "radial-gradient(700px 160px at 0% 0%, rgba(201,161,74,.35), transparent 60%), radial-gradient(700px 160px at 100% 0%, rgba(245,231,192,.28), transparent 60%)",
        }}
      />
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
          {job.summary ??
            "Discreet mandate with strong platform, open architecture and competitive grid."}
        </p>

        <div className="mt-auto pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-xl border border-brandGold/40 bg-black/30 px-4 py-2 text-sm font-semibold text-brandGoldPale transition hover:bg-brandGold/15 hover:text-white"
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
      <h3 className="text-lg font-semibold text-white">
        No roles match your filters
      </h3>
      <p className="mt-2 text-sm text-neutral-300">
        Try clearing filters or checking back soon—new mandates drop regularly.
      </p>
      <div className="mt-4 flex justify-center">
        <PrimaryButton href="/en/contact" className="px-4 py-2 text-sm">
          Talk to us confidentially
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------- Filter Bar (FIX: GET submit to /en/jobs) ---------------- */
function FilterBar({
  defaultQuery,
  defaultFilters,
  sort,
}: {
  defaultQuery?: string;
  defaultFilters?: Record<string, string>;
  sort?: string;
}) {
  return (
    <form
      method="get"
      action="/en/jobs"
      className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-4 md:flex-row md:items-center"
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
        <input
          name="q"
          defaultValue={defaultQuery}
          placeholder="Search by title, market, location…"
          className="w-full rounded-xl border border-white/10 bg-transparent py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-brandGold/60"
        />
      </div>

      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-3">
        {/* ✅ UPDATED: All markets list */}
        <select
          name="market"
          defaultValue={defaultFilters?.market ?? ""}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none"
        >
          <option value="" className="bg-[#0B0E13]">
            All markets
          </option>

          <option value="Switzerland (Onshore)" className="bg-[#0B0E13]">
            Switzerland (Onshore)
          </option>
          <option value="Middle East & Africa (MEA)" className="bg-[#0B0E13]">
            Middle East & Africa (MEA)
          </option>
          <option value="UK" className="bg-[#0B0E13]">
            UK
          </option>
          <option value="US" className="bg-[#0B0E13]">
            US
          </option>
          <option value="Singapore" className="bg-[#0B0E13]">
            Singapore
          </option>
          <option value="Hong Kong" className="bg-[#0B0E13]">
            Hong Kong
          </option>
          <option value="France" className="bg-[#0B0E13]">
            France
          </option>
          <option value="Spain" className="bg-[#0B0E13]">
            Spain
          </option>
          <option value="Turkey" className="bg-[#0B0E13]">
            Turkey
          </option>
          <option value="Israel" className="bg-[#0B0E13]">
            Israel
          </option>
          <option value="Italy" className="bg-[#0B0E13]">
            Italy
          </option>
          <option value="NRI" className="bg-[#0B0E13]">
            NRI
          </option>
          <option value="Nordics" className="bg-[#0B0E13]">
            Nordics
          </option>
          <option value="Greece" className="bg-[#0B0E13]">
            Greece
          </option>
          <option value="Germany" className="bg-[#0B0E13]">
            Germany
          </option>
          <option value="Austria" className="bg-[#0B0E13]">
            Austria
          </option>
          <option value="South Africa" className="bg-[#0B0E13]">
            South Africa
          </option>
          <option value="CEE" className="bg-[#0B0E13]">
            CEE
          </option>
          <option value="Poland" className="bg-[#0B0E13]">
            Poland
          </option>
          <option value="CIS" className="bg-[#0B0E13]">
            CIS
          </option>
          <option value="Brazil" className="bg-[#0B0E13]">
            Brazil
          </option>
          <option value="Argentina" className="bg-[#0B0E13]">
            Argentina
          </option>
          <option value="Conosur" className="bg-[#0B0E13]">
            Conosur
          </option>

          {/* keep your existing label too */}
          <option value="Portugal (LatAm/Europe)" className="bg-[#0B0E13]">
            Portugal
          </option>
        </select>

        {/* ✅ UPDATED: All locations list */}
        <select
          name="location"
          defaultValue={defaultFilters?.location ?? ""}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none"
        >
          <option value="" className="bg-[#0B0E13]">
            All locations
          </option>
          <option value="Geneva" className="bg-[#0B0E13]">
            Geneva
          </option>
          <option value="Zurich" className="bg-[#0B0E13]">
            Zurich
          </option>
          <option value="Lausanne" className="bg-[#0B0E13]">
            Lausanne
          </option>
          <option value="Dubai" className="bg-[#0B0E13]">
            Dubai
          </option>
          <option value="Singapore" className="bg-[#0B0E13]">
            Singapore
          </option>
          <option value="Hong Kong" className="bg-[#0B0E13]">
            Hong Kong
          </option>
          <option value="London" className="bg-[#0B0E13]">
            London
          </option>
          <option value="New York" className="bg-[#0B0E13]">
            New York
          </option>

          {/* added */}
          <option value="Paris" className="bg-[#0B0E13]">
            Paris
          </option>
          <option value="Milano" className="bg-[#0B0E13]">
            Milano
          </option>
          <option value="Lisbon" className="bg-[#0B0E13]">
            Lisbon
          </option>
          <option value="Miami" className="bg-[#0B0E13]">
            Miami
          </option>
        </select>

        <select
          name="seniority"
          defaultValue={defaultFilters?.seniority ?? ""}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none"
        >
          <option value="" className="bg-[#0B0E13]">
            All seniorities
          </option>
          <option value="Director" className="bg-[#0B0E13]">
            Director
          </option>
          <option value="Executive Director" className="bg-[#0B0E13]">
            Executive Director
          </option>
          <option value="Managing Director" className="bg-[#0B0E13]">
            Managing Director
          </option>
          <option value="Team Head" className="bg-[#0B0E13]">
            Team Head
          </option>
        </select>
      </div>

      {/* keep sort when applying filters */}
      <input type="hidden" name="sort" value={sort ?? "newest"} />

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl border border-brandGold/70 bg-brandGold/15 px-4 py-2 text-sm font-semibold text-brandGoldPale hover:bg-brandGold/25 hover:text-white"
      >
        <Filter className="h-4 w-4" /> Apply
      </button>
    </form>
  );
}

/* ---------------- Page ---------------- */
export default async function JobsPage({
  searchParams,
}: {
  // ✅ FIX: in your Next build, searchParams is async → await it
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
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

  // ✅ FIX: filter + sort locally so it always works
  const jobs = applyLocalFiltersAndSort(rawJobs, {
    q,
    market,
    location,
    seniority,
    sort,
  });

  const base = SITE;

  const jobsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: jobs.length,
    itemListElement: jobs.map((j, idx) => {
      const country = countryFromLocation(j.location);
      const jobPosting: any = {
        "@type": "JobPosting",
        title: j.title,
        description:
          j.summary ??
          "Discreet private banking mandate handled by Executive Partners.",
        industry: "Private Banking & Wealth Management",
        employmentType: "FULL_TIME",
        hiringOrganization: {
          "@type": "Organization",
          name: "Executive Partners (executive search boutique)",
          sameAs: SITE,
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: j.location,
          },
        },
      };

      if (country) jobPosting.jobLocation.address.addressCountry = country;
      if (j.createdAt) jobPosting.datePosted = j.createdAt;

      return {
        "@type": "ListItem",
        position: idx + 1,
        url: `${base}/en/jobs/${j.slug}`,
        item: jobPosting,
      };
    }),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: `${SITE}` },
          { name: "Jobs", url: `${SITE}/en/jobs` },
        ]}
      />

      <main className="relative min-h-screen bg-[#0B0E13] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1400px 500px at 10% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(1100px 420px at 110% 0%, rgba(245,231,192,.20) 0%, rgba(245,231,192,0) 60%)",
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobsJsonLd) }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-14">
          <div className="text-center">
            <p className="mx-auto text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
              Private Banking · Discreet Mandates
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
              Private Banking Jobs in Switzerland
            </h1>
            <p className="mx-auto mt-3 max-w-3xl text-neutral-300">
              Live mandates across <strong>Geneva</strong> and{" "}
              <strong>Zurich</strong>, with international coverage in{" "}
              <strong>Dubai</strong>, <strong>Singapore</strong>,{" "}
              <strong>London</strong> &amp; <strong>New York</strong>. We publish
              a subset of searches; confidential roles are shared directly with
              qualified bankers.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
              <Link
                href="/en/apply"
                className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
              >
                Submit CV
              </Link>
              <Link
                href="/en/candidates"
                className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
              >
                Candidate Hub
              </Link>
              <Link
                href="/en/contact"
                className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
              >
                Contact a Recruiter
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <FilterBar
              defaultQuery={q}
              defaultFilters={{ market, location, seniority }}
              sort={sort}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-white/70">
            <div>
              {jobs.length} role{jobs.length === 1 ? "" : "s"}
            </div>

            <form method="get" action="/en/jobs" className="flex items-center gap-2">
              {q ? <input type="hidden" name="q" value={q} /> : null}
              {market ? <input type="hidden" name="market" value={market} /> : null}
              {location ? <input type="hidden" name="location" value={location} /> : null}
              {seniority ? <input type="hidden" name="seniority" value={seniority} /> : null}

              <select
                name="sort"
                defaultValue={sort}
                className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white outline-none"
              >
                <option value="newest" className="bg-[#0B0E13]">
                  Newest first
                </option>
                <option value="oldest" className="bg-[#0B0E13]">
                  Oldest first
                </option>
                <option value="title" className="bg-[#0B0E13]">
                  Title A–Z
                </option>
              </select>

              <button
                type="submit"
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Apply sort
              </button>
            </form>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Suspense
              fallback={
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              }
            >
              {jobs.length === 0 ? (
                <EmptyState />
              ) : (
                jobs.map((job) => <Card key={job.slug} job={job} />)
              )}
            </Suspense>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
            <p className="text-neutral-300">
              Don't see your exact market? We run confidential mandates
              continuously.
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton href="/en/contact">Contact us</PrimaryButton>
              <SecondaryButton href="/en/candidates">
                Register confidentially
              </SecondaryButton>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}