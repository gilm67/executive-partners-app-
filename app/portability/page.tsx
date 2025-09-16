// app/portability/page.tsx
import type { Metadata } from "next";
import PortabilityClient from "./portability-client";

export const metadata: Metadata = {
  title: "Portability – Private Banking Book Readiness",
  description:
    "Score your portability across revenue quality, documentation, cross-border compliance, and onboarding readiness. Instant, private, and free.",
};

export default function PortabilityPage() {
  return (
    <main className="text-white">
      {/* Hero (matches site title scale & rhythm) */}
      <section className="relative">
        <div className="mx-auto w-full max-w-6xl px-4 pt-14 md:pt-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
            Portability Readiness
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Assess your book’s portability
          </h1>

          <p className="mt-3 max-w-2xl text-neutral-300">
            A quick, structured assessment of revenue attribution, documentation quality,
            cross-border compliance, and onboarding speed. Your inputs stay private.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-20 pt-8">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 lg:grid-cols-3">
          {/* Left: explainer panel */}
          <aside className="order-last lg:order-first">
            <div className="sticky top-20 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <h2 className="text-lg font-semibold">How scoring works</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-300">
                <li>Weighted across revenue, references, compliance, and onboarding.</li>
                <li>Higher scores suggest faster offers and smoother transitions.</li>
                <li>You can export or share your result with us confidentially.</li>
              </ul>
              <p className="mt-4 text-xs text-neutral-400">
                Indicative only; platforms differ in risk appetite and documentation thresholds.
              </p>
            </div>
          </aside>

          {/* Right: the actual questionnaire form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              {/* This is your existing client form/logic */}
              <PortabilityClient />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}