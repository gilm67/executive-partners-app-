// app/page.tsx
import Link from "next/link";
import { CardBtn } from "./components/CardBtn";
import { MapPin, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

// ✅ FIXED imports: point to app/components/
import Skyline from "./components/Skyline";
import StatsCount from "./components/StatsCount";
import ConfidentialCTA from "./components/ConfidentialCTA";

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
  const qs = new URLSearchParams({ active: "true", sort: "newest", limit: "6" }).toString();
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const abs = base ? `${base}/api/jobs?${qs}` : `/api/jobs?${qs}`;

  const r1 = await fetch(abs, { cache: "no-store" }).catch(() => null);
  const data =
    r1?.ok
      ? await r1.json()
      : await (async () => {
          const r2 = await fetch(`/api/jobs?${qs}`, { cache: "no-store" }).catch(() => null);
          if (!r2?.ok) return [];
          return r2.json();
        })();

  return (Array.isArray(data) ? data : [])
    .filter((j) => j?.active !== false && !HIDDEN_SLUGS.has(j.slug))
    .slice(0, 3);
}

/* ------------ SEO ------------ */
export const metadata: Metadata = {
  title: { absolute: "Executive Partners – Private Banking & Wealth Management Search" },
  description:
    "Executive Partners is Switzerland’s leading financial recruiter in private banking and wealth management. Based in Geneva, we connect private bankers with confidential opportunities in Zurich, Dubai, Singapore, London, and New York.",
};

/* ---------------- Page ---------------- */

export default async function HomePage() {
  const featured = await getFeaturedJobs();

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

        {/* CTAs */}
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

        {/* Geneva skyline */}
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

        {/* Stats */}
        <StatsCount />

        {/* Featured jobs */}
        <FeaturedRoles featured={featured} />
      </div>

      {/* Confidential CTA */}
      <ConfidentialCTA />
    </main>
  );
}

/* ---------------- components (local) ---------------- */
// (FeatureCard, FeaturedRoles, JobCard remain unchanged)