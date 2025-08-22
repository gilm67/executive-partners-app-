// app/page.tsx – landing (production-style) with graceful fallback
import Link from "next/link";
import { getJobs, jobSlug, type Job } from "@/lib/sheets";

export const revalidate = 60; // ISR

async function loadJobs(): Promise<Job[]> {
  try {
    const jobs = await getJobs();
    // Hide inactive rows (Active === "FALSE")
    return jobs.filter(j => String((j as any).Active ?? "").toUpperCase() !== "FALSE");
  } catch (e) {
    console.error("getJobs failed:", e);
    return [];
  }
}

export default async function HomePage() {
  const jobs = await loadJobs();

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Executive Partners — Private Banking & Wealth Management
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-300">
            Geneva-based search boutique for HNW/UHNW coverage. Discreet introductions, senior hires,
            and team lift-outs across Switzerland, UK, US, GCC & LATAM.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/jobs"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              View open roles
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-neutral-700 px-5 py-2.5 text-neutral-200 hover:bg-neutral-800"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      {/* Featured / Recent roles */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-xl font-semibold text-white">Open Roles</h2>

        {jobs.length === 0 ? (
          <p className="mt-3 text-neutral-400">No active roles available at this time.</p>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.slice(0, 6).map((j) => {
              const title = (j as any).Title || (j as any).Role || "Untitled Role";
              const location = (j as any).Location || "";
              const market = (j as any).Market || "";
              const href = `/jobs/${jobSlug(j)}`;

              return (
                <li key={(j as any).ID} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
                  <Link href={href} className="block">
                    <h3 className="line-clamp-2 text-lg font-semibold text-white">{title}</h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      {location || "—"}{market ? ` • ${market}` : ""}
                    </p>
                    <p className="mt-3 text-sm text-neutral-300 line-clamp-3">
                      {(j as any).Summary || ""}
                    </p>
                    <span className="mt-4 inline-block text-sm text-blue-400">View role →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-8">
          <Link href="/jobs" className="text-sm text-neutral-300 underline hover:text-white">
            See all roles
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 text-center text-sm text-neutral-400">
        © {new Date().getFu                    <h3 className="leva
      </footer>
    </main>
  );
}
