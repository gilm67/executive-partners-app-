// app/page.tsx
import Link from "next/link";
import { CardBtn } from "./components/CardBtn";
import { MapPin, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Executive Partners — International & Swiss Private Banking",
  description:
    "We connect top Private Bankers, Wealth Managers, Compliance Officers and senior executives with leading banks, EAMs, and family offices worldwide.",
};

/* ---------------- Page ---------------- */

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
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

        {/* featured jobs – polished */}
        <section className="mt-14">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Roles</h2>
            <Link href="/jobs" className="text-sm font-medium text-blue-400 hover:underline">
              View all jobs →
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <FeaturedJobCard
              href="/jobs"
              eyebrow="Switzerland (Onshore)"
              title="Senior Relationship Manager — CH Onshore"
              location="Geneva"
              summary="UHNW/HNW Swiss-domiciled clients; Geneva booking centre; strong local network required."
            />
            <FeaturedJobCard
              href="/jobs"
              eyebrow="Middle East & Africa (MEA)"
              title="Private Banker — MEA"
              location="Dubai"
              summary="Cover UHNW/HNW MEA clients from Dubai; strong acquisition and cross-border expertise."
            />
            <FeaturedJobCard
              href="/jobs"
              eyebrow="Brazil (LatAm)"
              title="Senior Relationship Manager — Brazil"
              location="Zurich or Geneva"
              summary="Develop and manage HNW/UHNW Brazilian clients; full private banking advisory and cross-border expertise."
            />
          </div>
        </section>

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

type BtnTone = "blue" | "green" | "neutral";

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

/* ---------- Featured Roles cards ---------- */

function FeaturedJobCard({
  href,
  eyebrow,
  title,
  location,
  summary,
}: {
  href: string;
  eyebrow: string;
  title: string;
  location: string;
  summary: string;
}) {
  return (
    <Link
      href={href}
      className="
        group relative block h-full overflow-hidden rounded-2xl p-[1px]
        [background:linear-gradient(180deg,rgba(255,255,255,.25),rgba(255,255,255,.08))]
        hover:[background:linear-gradient(180deg,rgba(99,102,241,.55),rgba(34,197,94,.35))]
        transition-transform duration-200 hover:-translate-y-1
      "
    >
      {/* card body */}
      <div className="flex h-full flex-col rounded-[15px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
        {/* accent bar */}
        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 opacity-80" />

        {/* eyebrow + title */}
        <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-white/70">
          {eyebrow}
        </div>
        <h3 className="mt-1 text-lg font-semibold leading-snug text-white">
          {title}
        </h3>

        {/* meta */}
        <div className="mt-2 inline-flex items-center gap-2 text-sm text-white/80">
          <MapPin className="h-4 w-4 opacity-80" />
          <span>{location}</span>
        </div>

        {/* summary */}
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-300">
          {summary}
        </p>

        {/* footer CTA row */}
        <div className="mt-auto pt-4">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-400 group-hover:underline">
            View details <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* soft hover glow */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-30 [background:radial-gradient(500px_120px_at_10%_0%,rgba(59,130,246,.6),transparent_60%),radial-gradient(500px_120px_at_100%_0%,rgba(34,197,94,.55),transparent_60%)]" />
    </Link>
  );
}