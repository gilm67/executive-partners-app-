// app/page.tsx — resilient landing
import Link from "next/link";
import { getJobs, jobSlug } from "@/lib/sheets";

export const revalidate = 60;
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function Chip({ children }: { children?: string }) {
  const t = (children || "").trim();
  if (!t) return null;
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-700 px-2 py-0.5 text-xs text-neutral-300">
      {t}
    </span>
  );
}

async function fetchJobsSafe() {
  try {
    const jobs = await getJobs();
    return Array.isArray(jobs)
      ? jobs.filter((j: any) => String(j?.Active ?? "").toUpperCase() !== "FALSE")
      : [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const jobs = await fetchJobsSafe();

  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-14 text-center">
        <div className="mx-auto inline-flex rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-300">
          International &amp; Swiss Private Banking — HNW/UHNWI
        </div>

        <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight">
          Executive Partners
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-neutral-300">
          We connect top Private Bankers, Wealth Managers, and senior executives with leading banks,
          EAMs, and family offices worldwide.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/candidates" className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700">
            I’m a Candidate
          </Link>
          <Link href="/hiring-managers" className="rounded-lg border border-neutral-700 px-5 py-2.5 text-neutral-200 hover:bg-neutral-800">
            I’m Hiring
          </Link>
          <Link href="/jobs" className="rounded-lg border border-neutral-700 px-5 py-2.5 text-neutral-200 hover:bg-neutral-800">
            View All Jobs
          </Link>
        </div>
      </section>

      {/* Two cards */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 pb-12 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
          <p className="text-xs font-semibold text-blue-300">For Candidates</p>
          <h3 className="mt-2 text-lg font-semibold">Confidential career moves</h3>
          <p className="mt-2 text-sm text-neutral-300">
            We work discreetly with UHNW/HNW talent. Explore live mandates or register to be matched with roles that fit your market,
            seniority, and portability.
          </p>
          <div className="mt-4 flex gap-3">
            <Link href="/jobs" className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">Browse Jobs</Link>
            <Link href="/candidates" className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800">Candidate Hub</Link>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
          <p className="text-xs font-semibold text-emerald-300">For Hiring Managers</p>
          <h3 className="mt-2 text-lg font-semibold">Targeted shortlists, fast</h3>
          <p className="mt-2 text-sm text-neutral-300">
            We map markets and deliver vetted shortlists with real portability. Post a new role or ask us to discreetly approach specific bankers.
          </p>
          <div className="mt-4 flex gap-3">
            <Link href="/hiring-managers" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700">Hire Talent</Link>
            <Link href="/contact" className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800">Talk to Us</Link>
          </div>
        </div>
      </section>

      {/* Featured Roles */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Featured Roles</h2>
          <Link href="/jobs" className="text-sm text-neutral-300 hover:text-white">View all jobs</Link>
        </div>

        {jobs.length === 0 ? (
          <p className="text-neutral-400">No active roles available at this time.</p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2">
            {jobs.slice(0, 6).map((j: any) => {
              const title = j?.Title || j?.Role || "Untitled Role";
              const href = `/jobs/${jobSlug(j)}`;
              return (
                <li key={j?.ID || href} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 hover:border-neutral-700">
                  <div className="flex flex-wrap gap-2 text-neutral-300">
                    <Chip>{j?.Location}</Chip>
                    <Chip>{j?.Market}</Chip>
                    <Chip>{j?.Seniority}</Chip>
                  </div>
                  <Link href={href} className="mt-2 block">
                    <h3 className="text-base font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      {(j?.Summary || "").toString()}
                    </p>
                    <span className="mt-3 inline-block text-sm text-blue-400">View role →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
