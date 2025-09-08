// app/page.tsx
import Link from "next/link";
import { CardBtn } from "./components/CardBtn";
import { MapPin, ChevronRight } from "lucide-react";

/* ------------ Types & helpers ------------ */

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
};

// Hide retired/duplicate slugs if they ever appear in the API
const HIDDEN_SLUGS = new Set<string>([
  "senior-relationship-manager-ch-onshore-4",
  "senior-relationship-manager-brazil-2",
  "private-banker-mea-2",
]);

async function getFeaturedJobs(): Promise<Job[]> {
  const qs = new URLSearchParams({
    active: "true",
    sort: "newest",
    limit: "6", // grab a few, we’ll pick the best 3
  }).toString();

  const abs = (process.env.NEXT_PUBLIC_SITE_URL ?? "") + `/api/jobs?${qs}`;

  // Try absolute first (works in prod/preview), then relative
  const r1 = await fetch(abs, { cache: "no-store" }).catch(() => null);
  const data =
    r1?.ok
      ? await r1.json()
      : await (async () => {
          const r2 = await fetch(`/api/jobs?${qs}`, { cache: "no-store" }).catch(() => null);
          if (!r2?.ok) return [];
          return r2.json();
        })();

  // Filter and pick the top 3
  return (Array.isArray(data) ? data : [])
    .filter((j) => j?.active !== false && !HIDDEN_SLUGS.has(j.slug))
    .slice(0, 3);
}

export const metadata = {
  title: "Executive Partners — International & Swiss Private Banking",
  description:
    "We connect top Private Bankers, Wealth Managers, Compliance Officers and senior executives with leading banks, EAMs, and family offices worldwide.",
};

/* ---------------- Page ---------------- */

export default async function HomePage() {
  // load live featured roles (with fallback below if empty)
  const featured = await getFeaturedJobs();

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px_420px_at_18%_-10%,rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px_380px_at_110%_0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-14">
        {/* badge */}
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          International & Swiss Private Banking — HNW/UHNW
        </div>

        {/* hero */}
        <h1 className="mx-auto mt-4 text-center text-5xl font-extrabold tracking-tight md:text-6xl">
          Executive Partners
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-center text-neutral-300">
          We connect top Private Bankers, Wealth Managers, and senior executives with
          leading banks, EAMs, and family offices worldwide.
        </p>

        {/* primary CTAs */}
        <div className="mx-auto mt-6 flex w-full max-w-xl items-center justify-center gap-3">
          <PrimaryBtn href="/candidates" variant="blue">I’m a Candidate</PrimaryBtn>
          <PrimaryBtn href="/hiring-managers" variant="outline">I’m Hiring</PrimaryBtn>
          <PrimaryBtn href="/jobs" variant="ghost">View All Jobs</PrimaryBtn>
        </div>

        {/* feature cards */}
        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
          <FeatureCard
            badge="For Candidates"
            title="Confidential career moves"
            copy="We work discreetly with UHNW/HNW talent. Explore live mandates or register to be matched with roles that fit your market, seniority, and portability."
            leftAction={{ label: "Browse Jobs", href: "/jobs", tone: "blue" }}
            rightAction={{ label: "Candidate Hub", href: "/candidates", tone: "neutral" }}
          />
          <FeatureCard
            badge="For Hiring Managers"
            title="Targeted shortlists, fast"
            copy="We map markets and deliver vetted shortlists with real portability. Post a new role or ask us to discreetly approach specific bankers."
            leftAction={{ label: "Hire Talent", href: "/hiring-managers", tone: "green" }}
            rightAction={{ label: "Talk to Us", href: "/contact", tone: "neutral" }}
          />
        </div>

        {/* featured jobs – live data with premium layout */}
        <FeaturedRoles featured={featured} />

        {/* footer */}
        <div className="mt-16 flex items-center justify-between text-sm text-neutral-400">
          <span>© {new Date().getFullYear()} Executive Partners. All rights reserved.</span>
          <Link href="/jobs" className="underline-offset-4 hover:underline">
            View all jobs
          </Link>
        </div>
      </div>
    </main>
  );
}

/* ---------------- components ---------------- */

function PrimaryBtn({
  href,
  children,
  variant = "blue",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "blue" | "outline" | "ghost";
}) {
  const cls =
    variant === "blue"
      ? "bg-[#1D4ED8] hover:bg-[#1E40AF] text-white shadow-[0_8px_30px_rgba(29,78,216,.35)]"
      : variant === "outline"
      ? "border border-white/15 bg-white/5 hover:bg-white/10 text-white"
      : "border border-white/10 bg-transparent hover:bg-white/5 text-white";
  return (
    <Link
      href={href}
      className={`w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${cls}`}
    >
      {children}
    </Link>
  );
}

type BtnTone = "blue" | "green" | "neutral";

function FeatureCard({
  badge,
  title,
  copy,
  leftAction,
  rightAction,
}: {
  badge: string;
  title: string;
  copy: string;
  leftAction: { label: string; href: string; tone: BtnTone };
  rightAction: { label: string; href: string; tone: BtnTone };
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
      {/* inner soft glow */}
      <div className="pointer-events-none absolute inset-0 opacity-[.18] [background:radial-gradient(600px_120px_at_10%_0%,rgba(14,165,233,1),transparent_60%),radial-gradient(600px_120px_at_100%_0%,rgba(34,197,94,1),transparent_60%)]" />
      <div className="relative flex min-h-[220px] flex-col">
        <div className="text-xs font-semibold text-[#6EE7B7]">{badge}</div>
        <h3 className="mt-2 text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">{copy}</p>
        <div className="mt-auto flex items-stretch gap-3 pt-3">
          <CardBtn href={leftAction.href} tone={leftAction.tone}>
            {leftAction.label}
          </CardBtn>
          <CardBtn href={rightAction.href} tone={rightAction.tone}>
            {rightAction.label}
          </CardBtn>
        </div>
      </div>
    </div>
  );
}

/* ---------- Featured Roles (premium) ---------- */

function FeaturedRoles({ featured }: { featured: Job[] }) {
  const hasLive = featured.length > 0;

  const items: Job[] = hasLive
    ? featured
    : [
        {
          title: "Senior Relationship Manager — CH Onshore",
          location: "Geneva",
          summary:
            "UHNW/HNW Swiss-domiciled clients; Geneva booking centre; strong local network required.",
          slug: "senior-relationship-manager-ch-onshore-geneva",
          active: true,
        },
        {
          title: "Private Banker — MEA",
          location: "Dubai",
          summary:
            "Cover UHNW/HNW MEA clients from Dubai; strong acquisition and cross-border expertise.",
          slug: "senior-relationship-manager-mea-dubai",
          active: true,
        },
        {
          title: "Senior Relationship Manager — Brazil",
          location: "Zurich or Geneva",
          summary:
            "Develop and manage HNW/UHNW Brazilian clients; full private banking advisory and cross-border expertise.",
          slug: "senior-relationship-manager-brazil-ch",
          active: true,
        },
      ];

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Roles</h2>
        <Link href="/jobs" className="text-sm font-medium text-blue-400 hover:underline">
          View all jobs →
        </Link>
      </div>

      <div className="mt-6 grid items-stretch gap-6 md:grid-cols-3">
        {items.map((job) => (
          <JobCard key={job.slug} job={job} />
        ))}
      </div>
    </section>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <article className="group relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-sky-500/35 via-emerald-400/25 to-fuchsia-500/25">
      {/* inner glass panel */}
      <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-[#0B0E13]/80 p-5 backdrop-blur">
        {/* soft corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full bg-gradient-to-br from-sky-500/30 to-emerald-400/30 blur-2xl opacity-40"
        />

        {/* title (fixed height for alignment) */}
        <h3 className="text-lg font-semibold text-white line-clamp-2 min-h-[3.25rem]">
          {job.title}
        </h3>

        {/* location pill (fixed height) */}
        <div className="mt-2 min-h-[1.6rem]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80">
            <MapPin className="h-3.5 w-3.5 opacity-80" />
            {job.location}
          </span>
        </div>

        {/* summary (fixed height for alignment) */}
        <p className="mt-3 text-sm text-neutral-300 line-clamp-3 min-h-[3.75rem]">
          {job.summary}
        </p>

        {/* CTA pinned bottom */}
        <div className="mt-auto pt-4">
          <Link
            href={`/jobs/${job.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-white/8 px-3 py-2 text-sm font-semibold text-white outline-none
                       ring-0 transition
                       hover:bg-white/12 hover:shadow-[0_10px_30px_rgba(59,130,246,.25)]
                       focus-visible:ring-2 focus-visible:ring-sky-500/40"
          >
            View details
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}