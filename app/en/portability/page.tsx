// app/portability/page.tsx
import type { Metadata } from "next";
import PortabilityForm from "@/components/portability/PortabilityForm";

export const metadata: Metadata = {
  title: { absolute: "Portability for Private Bankers | Executive Partners" },
  description:
    "Assess your Portability Readiness with market-specific benchmarks and booking-centre intelligence.",
};

function Decor() {
  return (
    <div aria-hidden="true" suppressHydrationWarning className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 opacity-[0.06] ep-grid-bg"
      />
      <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
    </div>
  );
}

export default function PortabilityPage() {
  return (
    <main className="relative text-white">
      <Decor />

      {/* Hero */}
      <section className="border-b border-white/10 bg-black/20">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
            Portability Readiness
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Assess your book’s portability
          </h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            A quick, structured assessment of revenue attribution, documentation quality, cross-border
            compliance, and onboarding speed. Your inputs stay private.
          </p>

          {/* Metrics */}
          <div className="mt-8 grid grid-cols-3 gap-4 sm:max-w-lg sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="text-2xl font-semibold">35+</div>
              <div className="text-xs text-neutral-400">Markets</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="text-2xl font-semibold">15</div>
              <div className="text-xs text-neutral-400">Booking centres</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="text-2xl font-semibold">Live</div>
              <div className="text-xs text-neutral-400">Benchmarks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-10 md:py-14">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 lg:grid-cols-3">
          {/* Explainer */}
          <aside className="order-last lg:order-first">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
              <h2 className="text-lg font-semibold">How scoring works</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-300">
                <li>Weighted across revenue, references (documentation), compliance, and onboarding.</li>
                <li>Higher scores suggest faster offers and smoother transitions.</li>
                <li>Optionally share your result with Executive Partners confidentially.</li>
              </ul>
              <p className="mt-4 text-xs text-neutral-400">
                *Indicative only — platforms differ in risk appetite and document thresholds.
              </p>
              <a
                href="/contact"
                className="mt-4 inline-flex text-sm text-emerald-400 underline underline-offset-4 hover:text-emerald-300"
              >
                Contact Executive Partners
              </a>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
              <PortabilityForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
