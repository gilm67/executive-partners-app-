// app/page.tsx
import Link from "next/link";
import { CardBtn } from "./components/CardBtn";
import { MapPin, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

// ✅ Mounts from app/components/
import Skyline from "./components/Skyline";
import StatsCount from "./components/StatsCount";
import ConfidentialCTA from "./components/ConfidentialCTA";

/* ---------------- Static rendering lock ---------------- */
export const dynamic = "force-static";
export const revalidate = false;

/* ------------ Types ------------ */
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

/* ------------ (Optional) SEO ------------ */
// If you already declare page-level metadata elsewhere, keep that and remove this.
export const metadata: Metadata = {
  title: { absolute: "Executive Partners – Private Banking & Wealth Management Search" },
  description:
    "Executive Partners is Switzerland’s leading financial recruiter in private banking and wealth management. Based in Geneva, we connect private bankers with confidential opportunities in Zurich, Dubai, Singapore, London, and New York.",
};

/* ---------------- Page ---------------- */

// ⛔️ No async / no fetch — fully static page
export default function HomePage() {
  // Static featured roles (prevents runtime data dependencies)
  const featured: Job[] = [
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
    <main className="relative min-h-screen body-grain text-white">
      {/* Subtle luxury backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%,rgba(158,203,255,.10) 0%, rgba(158,203,255,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(30,144,255,.08) 0%, rgba(30,144,255,0) 60%)",
        }}
      />

      <div className="relative container-max pb-24 pt-14">
        {/* Badge */}
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          International &amp; Swiss Private Banking — HNW/UHNW
        </div>

        {/* Premium H1 */}
        <h1 className="mx-auto mt-4 text-center font-[var(--font-playfair)] text-5xl font-semibold tracking-tight md:text-6xl">
          Exclusive Talent. Global <span className="gold">Private Banking</span>.
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-center text-white/80">
          Geneva-based executive search. We connect seasoned Relationship Managers and senior leaders
          with confidential opportunities across Switzerland, UK, US, MENA &amp; Asia.
        </p>

        {/* CTAs — big, identical width */}
        <div className="mx-auto mt-8 grid w-full max-w-[44rem] grid-cols-1 gap-3 sm:grid-cols-3">
          <Link href="/candidates" className="btn-primary btn-xl text-center">
            I’m a Candidate
          </Link>
          <Link href="/hiring-managers" className="btn-ghost btn-xl text-center">
            I’m Hiring
          </Link>
          <Link href="/jobs" className="btn-primary btn-xl text-center">
            View Jobs
          </Link>
        </div>

        {/* Geneva skyline + hubs + particles */}
        <Skyline />

        {/* SEO internal link */}
        <p className="mt-4 text-center text-xs text-white/60">
          Focus market:{" "}
          <Link
            href="/private-banking-jobs-switzerland"
            className="underline underline-offset-4 hover:text-white"
          >
            Private Banking jobs in Switzerland
          </Link>
        </p>

        {/* Feature cards */}
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

        {/* Authority stats */}
        <StatsCount />

        {/* Featured jobs (static list above) */}
        <FeaturedRoles featured={featured} />
      </div>

      {/* Confidential CTA */}
      <ConfidentialCTA />
    </main>
  );
}

/* ---------------- components (local) ---------------- */

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
    <div className="card relative h-full overflow-hidden">
      {/* inner soft glow (sapphire/ice only) */}
      <div className="pointer-events-none absolute inset-0 opacity-[.18] [background:radial-gradient(600px_120px_at_10%_0%,rgba(30,144,255,1),transparent_60%),radial-gradient(600px_120px_at_100%_0%,rgba(158,203,255,1),transparent_60%)]" />
      <div className="relative flex min-h-[220px] flex-col">
        <div className="text-xs font-semibold text-white/70">{badge}</div>
        <h3 className="mt-2 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{copy}</p>
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
        <h2 className="text-2xl font-semibold">Featured Roles</h2>
        <Link href="/jobs" className="text-sm font-medium text-white hover:underline">
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
    <article className="group relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-white/25 via-white/15 to-white/10">
      {/* inner glass panel */}
      <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
        {/* soft corner glow (sapphire/ice only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-8 h-36 w-36 rounded-full bg-gradient-to-br from-[rgba(158,203,255,.35)] to-[rgba(30,144,255,.25)] blur-2xl opacity-50"
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
        <p className="mt-3 text-sm text-white/80 line-clamp-3 min-h-[3.75rem]">
          {job.summary}
        </p>

        {/* CTA pinned bottom */}
        <div className="mt-auto pt-4">
          <Link
            href={`/jobs/${job.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white outline-none
                       ring-0 transition
                       hover:bg-white/15 hover:shadow-[0_10px_30px_rgba(30,144,255,.22)]
                       focus-visible:ring-2 focus-visible:ring-white/30"
          >
            View details
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}