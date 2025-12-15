// app/bp-simulator/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function BpSimulatorPublicLanding() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Business Plan Simulator
        </h1>

        <p className="mt-4 text-white/70">
          A premium simulation tool designed for senior Private Bankers and
          Wealth Managers. Model NNM, revenue, ROA and portability assumptions
          before engaging with a platform.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {/* 🔐 PRIVATE ACCESS */}
          <Link
            href="/private/auth/request?next=/private/bp-simulator"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            Request private access
          </Link>

          {/* 🌍 PUBLIC ALTERNATIVE */}
          <Link
            href="/jobs"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            Browse public jobs
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          <div className="font-medium text-white">What’s inside</div>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>3-year revenue & NNM projections</li>
            <li>Portability & ROA logic tailored to Private Banking</li>
            <li>Instant analysis with export-ready outputs</li>
            <li>Used by senior bankers across CH, UK, MEA & Asia</li>
          </ul>
        </div>
      </div>
    </main>
  );
}