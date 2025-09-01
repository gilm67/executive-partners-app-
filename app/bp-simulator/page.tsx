// app/bp-simulator/page.tsx
import Link from "next/link";

export const metadata = {
  title: "BP Simulator",
  description: "Business Portability / Banker Portability simulator (temporarily unavailable).",
};

export default function BpSimulatorFallback() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-3xl bg-neutral-950 ring-1 ring-white/10 p-8 sm:p-10 text-neutral-200">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          <span>Tool</span>
          <span className="opacity-70">•</span>
          <span>BP Simulator</span>
        </div>

        <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
          BP Simulator is temporarily unavailable
        </h1>
        <p className="mt-3 text-sm sm:text-base text-neutral-300">
          We’re migrating the simulator. In the meantime, our team can run the model for you and share the results.
        </p>

        <div className="mt-6 grid gap-3 sm:flex">
          <Link href="/contact" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            Request a run
          </Link>
          <a
            href="mailto:info@execpartners.ch?subject=BP%20Simulator%20Request"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-neutral-800"
          >
            Email us
          </a>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-white font-semibold">What it does</h2>
          <ul className="mt-2 list-disc pl-5 text-sm text-neutral-300 space-y-1">
            <li>Models client portability under different move scenarios</li>
            <li>Estimates AUM/Revenue ramp with realistic haircut assumptions</li>
            <li>Outputs sensitivity tables you can share with stakeholders</li>
          </ul>
        </div>

        <p className="mt-6 text-xs text-neutral-400">
          If you had a direct Streamlit link, we’ll restore that shortly.
        </p>
      </div>
    </div>
  );
}
