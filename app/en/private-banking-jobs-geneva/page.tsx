// app/en/private-banking-jobs-geneva/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { jobsList } from "@/data/jobs";

/* ---------------- SEO ---------------- */

export const metadata: Metadata = {
  title: "Private Banking Jobs in Geneva | Executive Partners",
  description:
    "Explore confidential Private Banking and Wealth Management jobs in Geneva. Senior Relationship Manager, Team Head and leadership roles within Swiss and international private banks.",
  alternates: {
    canonical: "https://www.execpartners.ch/en/private-banking-jobs-geneva",
  },
  openGraph: {
    title: "Private Banking Jobs in Geneva | Executive Partners",
    description:
      "Geneva private banking jobs: discreet mandates for senior Relationship Managers and wealth management leaders.",
    url: "https://www.execpartners.ch/en/private-banking-jobs-geneva",
    type: "article",
  },
  robots: { index: true, follow: true },
};

/* ---------------- Page ---------------- */

export default function GenevaJobsPage() {
  const genevaJobs = jobsList.filter(
    (j) =>
      j.active !== false &&
      /geneva/i.test(j.location || "")
  );

  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      <section className="mx-auto max-w-6xl px-6 py-14">
        {/* ---------- HERO ---------- */}
        <header className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-brandGoldSoft">
            Switzerland · Private Banking
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Private Banking Jobs in Geneva
          </h1>
          <p className="mt-4 text-neutral-300">
            Executive Partners advises senior Relationship Managers, Team Heads
            and wealth management leaders seeking to move or expand their
            franchise within the Geneva private banking market.
          </p>
        </header>

        {/* ---------- SEO CONTENT ---------- */}
        <article className="max-w-3xl space-y-4 text-neutral-200">
          <p>
            Geneva remains one of the most established private banking hubs
            globally, combining Swiss regulatory stability with an
            international UHNW client base. The market serves Swiss-domiciled
            families alongside entrepreneurs and ultra-high-net-worth clients
            from Europe, the Middle East, Latin America and parts of Africa.
          </p>
          <p>
            Private bankers in Geneva typically operate within highly structured
            platforms offering open-architecture investment solutions, Lombard
            lending, structured credit and advanced wealth planning. Hiring
            decisions are strongly driven by <strong>portable assets</strong>,
            revenue quality, client domicile mix and long-term strategic fit.
          </p>
          <p>
            Executive Partners runs both visible and off-market mandates in
            Geneva. Many searches are conducted discreetly and shared only with
            pre-qualified bankers following a confidential discussion.
          </p>

          <p className="pt-2">
            👉 Learn more about the{" "}
            <Link
              href="/en/markets/geneva"
              className="text-brandGold underline underline-offset-2"
            >
              Geneva private banking market
            </Link>{" "}
            or model your move using our{" "}
            <Link
              href="/bp-simulator?src=geneva_jobs"
              className="text-brandGold underline underline-offset-2"
            >
              Business Plan Simulator
            </Link>
            .
          </p>
        </article>

        {/* ---------- JOB LIST ---------- */}
        <section className="mt-14">
          <h2 className="mb-6 text-2xl font-semibold">
            Current Geneva Opportunities
          </h2>

          {genevaJobs.length === 0 ? (
            <p className="text-neutral-300">
              No Geneva roles are publicly listed at the moment. Confidential
              mandates are discussed directly with qualified bankers.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {genevaJobs.map((job) => (
                <Link
                  key={job.slug}
                  href={`/jobs/${job.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-brandGold/50"
                >
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="mt-1 text-sm text-neutral-300">
                    {job.location} · {job.market}
                  </p>
                  <p className="mt-2 text-sm text-neutral-400 line-clamp-2">
                    {job.summary}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ---------- CTA ---------- */}
        <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <h3 className="text-xl font-semibold">
            Explore Geneva Opportunities Confidentially
          </h3>
          <p className="mt-3 text-neutral-300">
            Not all Geneva mandates are advertised. Senior bankers are invited
            to share their profile discreetly or speak directly with our team.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <Link
              href="/en/candidates"
              className="rounded-full bg-brandGold px-6 py-3 text-sm font-semibold text-black"
            >
              Submit your profile
            </Link>
            <Link
              href="/en/contact"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:border-brandGold"
            >
              Contact a Geneva recruiter
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}