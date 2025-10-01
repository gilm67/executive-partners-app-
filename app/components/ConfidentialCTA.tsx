"use client";

import Link from "next/link";

export default function ConfidentialCTA() {
  return (
    <section
      className="mx-auto mt-16 w-full max-w-6xl rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.03))] p-6 backdrop-blur"
      aria-label="Confidential call to action"
    >
      <div className="grid items-center gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold leading-snug">
            Move discreetly. Hire decisively.
          </h3>
          <p className="mt-2 text-white/80">
            Leverage our{" "}
            <span className="font-semibold">Portability Score™</span> and the{" "}
            <span className="font-semibold">Business Plan Simulator</span> to pre-validate books,
            de-risk transitions, and accelerate approvals across compliance.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/apply" className="btn-primary btn-xl text-center">
              Apply Confidentially
            </Link>
            <Link href="/portability" className="btn-ghost btn-xl text-center">
              Portability Score™
            </Link>
          </div>
          <div className="text-xs text-white/60">
            Prefer a model review?{" "}
            <Link href="/business-plan-simulator" className="underline underline-offset-4 hover:text-white">
              Run the Simulator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}