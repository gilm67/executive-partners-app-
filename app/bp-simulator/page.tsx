// app/bp-simulator/page.tsx
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function BpSimulatorPublicLanding() {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain">
      {/* subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(201,161,74,.18) 0%, rgba(201,161,74,0) 55%), radial-gradient(1000px 380px at 110% 0%, rgba(245,231,192,.14) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 py-20">
        {/* Eyebrow */}
        <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
          Executive Partners · Private Tool
        </p>

        {/* Hero */}
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
          Business Plan Simulator
        </h1>

        <p className="mt-4 max-w-3xl text-base md:text-lg text-white/70">
          A bank-grade simulation tool designed for senior Private Bankers and
          Wealth Managers to model{" "}
          <strong className="text-white">NNM portability, revenues, ROA</strong>{" "}
          and business viability <strong className="text-white">before</strong>{" "}
          engaging with a platform.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">
          {/* PRIVATE ACCESS */}
          <Link
            href="/en/bp-simulator"
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90"
          >
            Request private access
          </Link>

          {/* SECONDARY */}
          <Link
            href="/jobs"
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Browse public opportunities
          </Link>
        </div>

        {/* Value blocks */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-medium text-white">
              What the simulator answers
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• Is my AUM portability realistic?</li>
              <li>• What revenue trajectory will a bank expect?</li>
              <li>• How long to reach break-even?</li>
              <li>• Does my business plan pass internal committees?</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <h3 className="font-medium text-white">
              What’s inside
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• 3-year NNM & revenue projections</li>
              <li>• ROA & margin logic tailored to Private Banking</li>
              <li>• Instant scenario analysis</li>
              <li>• Export-ready outputs for discussions</li>
            </ul>
          </div>
        </div>

        {/* Credibility */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
          <strong className="text-white">Who it’s for:</strong>{" "}
          Senior Relationship Managers, Team Heads and Private Bankers
          considering a strategic move across Switzerland, the UK, MEA,
          Asia or the US.
        </div>

        {/* Footer CTA */}
        <div className="mt-14 text-center">
          <p className="text-sm text-white/60">
            Access is reviewed manually to preserve confidentiality.
          </p>
          <Link
            href="/en/bp-simulator"
            className="mt-4 inline-flex rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-black hover:opacity-90"
          >
            Request access to the BP Simulator
          </Link>
        </div>
      </div>
    </main>
  );
}