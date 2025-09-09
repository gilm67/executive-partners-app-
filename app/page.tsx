// app/page.tsx
import Link from "next/link";
import { CardBtn } from "./components/CardBtn";
import { MapPin, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

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

const HIDDEN_SLUGS = new Set<string>([
  "senior-relationship-manager-ch-onshore-4",
  "senior-relationship-manager-brazil-2",
  "private-banker-mea-2",
]);

async function getFeaturedJobs(): Promise<Job[]> {
  const qs = new URLSearchParams({ active: "true", sort: "newest", limit: "6" }).toString();
  const abs = (process.env.NEXT_PUBLIC_SITE_URL ?? "") + `/api/jobs?${qs}`;

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

/* ------------ SEO (set absolute to avoid template) ------------ */
export const metadata: Metadata = {
  title: { absolute: "Executive Partners – Private Banking & Wealth Management Search" },
  description:
    "Executive Partners is Switzerland’s leading financial recruiter in private banking and wealth management. Based in Geneva, we connect private bankers with confidential opportunities in Zurich, Dubai, Singapore, London, and New York.",
};

/* ---------------- Page ---------------- */

export default async function HomePage() {
  const featured = await getFeaturedJobs();

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px_420px_at_18%_-10%,rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px_380px_at_110%_0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-14">
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          International & Swiss Private Banking — HNW/UHNW
        </div>

        {/* ✅ Updated H1 */}
        <h1 className="mx-auto mt-4 text-center text-5xl font-extrabold tracking-tight md:text-6xl">
          Private Banking &amp; Wealth Management Search
        </h1>

        <p className="mx-auto mt-3 max-w-3xl text-center text-neutral-300">
          Executive Partners is Switzerland’s leading financial recruiter for private banking and
          wealth management. From our base in Geneva, we connect seasoned Relationship Managers and
          senior leaders with confidential opportunities in Zurich, Dubai, Singapore, London, and New York.
        </p>

        <div className="mx-auto mt-6 flex w-full max-w-xl items-center justify-center gap-3">
          <PrimaryBtn href="/candidates" variant="blue">I’m a Candidate</PrimaryBtn>
          <PrimaryBtn href="/hiring-managers" variant="outline">I’m Hiring</PrimaryBtn>
          <PrimaryBtn href="/jobs" variant="ghost">View Private Banking Jobs</PrimaryBtn>
        </div>

        {/* ...rest of file unchanged... */}
      </div>
    </main>
  );
}

/* ---------------- components (unchanged) ---------------- */
// keep the rest of your components here exactly as before