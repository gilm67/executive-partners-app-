// app/components/ConfidentialCTA.tsx
"use client";

import Link from "next/link";

export default function ConfidentialCTA() {
  return (
    <section
      aria-label="Confidential call to action"
      className="mx-auto mt-16 mb-16 w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.03))] p-6 backdrop-blur"
    >
      {/* Start the grid aligned to the top so nothing vertically overlaps */}
      <div className="grid items-start gap-8 md:grid-cols-3">
        {/* TEXT COLUMN — sits above buttons and has padding-right on md+ */}
        <div className="relative z-20 md:col-span-2 md:pr-10">
          <h3 className="text-2xl font-bold leading-snug">
            Move discreetly. Hire decisively.
          </h3>
          <p className="mt-2 text-white/80">
            Leverage our <span className="font-semibold">Portability Score™</span> and the{" "}
            <span className="font-semibold">Business Plan Simulator</span> to pre-validate books,
            de-risk transitions, and accelerate approvals across compliance.
          </p>
        </div>

        {/* ACTIONS COLUMN — lower z-index; no glow/shadow; wraps on small screens */}
        <div className="relative z-10 flex flex-col md:items-end">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/apply"
              className="btn-primary btn-xl text-center !shadow-none !drop-shadow-none !ring-0 relative z-0"
              style={{ boxShadow: "none", filter: "none" }}
            >
              Apply Confidentially
            </Link>

            <Link href="/portability" className="btn-ghost btn-xl text-center relative z-0">
              Portability Score™
            </Link>
          </div>

          <div className="mt-4 text-xs text-white/60">
            Prefer a model review?{" "}
            <Link
              href="/business-plan-simulator"
              className="underline underline-offset-4 hover:text-white"
            >
              Run the Simulator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}