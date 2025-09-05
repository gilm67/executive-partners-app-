// app/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Executive Partners — International & Swiss Private Banking",
  description:
    "We connect top Private Bankers, Wealth Managers, and senior executives with leading banks, EAMs, and family offices worldwide.",
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* subtle luxe glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 400px at 20% -10%, rgba(14,165,233,.18) 0%, rgba(14,165,233,0) 60%), radial-gradient(900px 380px at 110% 0%, rgba(34,197,94,.16) 0%, rgba(34,197,94,0) 60%)",
        }}
      />
      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-14 relative">
        {/* badge */}
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          International & Swiss Private Banking — HNW/UHNW
        </div>

        {/* hero */}
        <h1 className="mx-auto mt-6 text-center text-5xl font-extrabold tracking-tight md:text-6xl">
          Executive Partners
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-center text-neutral-300">
          We connect top Private Bankers, Wealth Managers, and senior executives with
          leading banks, EAMs, and family offices worldwide.
        </p>

        {/* primary CTAs */}
        <div className="mx-auto mt-6 flex w-full max-w-xl items-center justify-center gap-3">
          <PrimaryBtn href="/candidates" variant="blue">
            I’m a Candidate
          </PrimaryBtn>
          <PrimaryBtn href="/hiring-managers" variant="outline">
            I’m Hiring
          </PrimaryBtn>
          <PrimaryBtn href="/jobs" variant="ghost">
            View All Jobs
          </PrimaryBtn>
        </div>

        {/* two feature cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
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

        {/* footer row */}
        <div className="mt-10 flex items-center justify-between text-sm text-neutral-400">
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
  leftAction: { label: string; href: string; tone: "blue" | "green" | "neutral" };
  rightAction: { label: string; href: string; tone: "neutral" }; // 🔧 narrowed to match CardBtn
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
      {/* inner soft glow */}
      <div className="pointer-events-none absolute inset-0 opacity-[.18] [background:radial-gradient(600px_120px_at_10%_0%,rgba(14,165,233,1),transparent_60%),radial-gradient(600px_120px_at_100%_0%,rgba(34,197,94,1),transparent_60%)]" />
      <div className="relative">
        <div className="text-xs font-semibold text-[#6EE7B7]">{badge}</div>
        <h3 className="mt-2 text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">{copy}</p>

        {/* perfectly aligned button row */}
        <div className="mt-4 flex items-stretch gap-3">
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

function CardBtn({
  href,
  children,
  tone,
}: {
  href: string;
  children: React.ReactNode;
  tone: "blue" | "green" | "neutral";
}) {
  const tones = {
    blue:
      "bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-[0_8px_24px_rgba(37,99,235,.35)]",
    green:
      "bg-[#16A34A] hover:bg-[#15803D] text-white shadow-[0_8px_24px_rgba(22,163,74,.35)]",
    neutral: "border border-white/15 bg-white/5 hover:bg-white/10 text-white",
  } as const;

  return (
    <Link
      href={href}
      className={`flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold transition ${tones[tone]}`}
    >
      {children}
    </Link>
  );
}