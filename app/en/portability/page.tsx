import type { Metadata } from "next";
import ClientMount from "./ClientMount";

/** SEO */
export const metadata: Metadata = {
  title: "Portability Readiness – Executive Partners",
  description:
    "Assess your book’s portability across booking centres with live benchmarks and banker-grade guidance.",
  openGraph: {
    title: "Portability Readiness – Executive Partners",
    description:
      "Quick, structured assessment across documentation, licensing and onboarding speed.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Executive Partners" }],
  },
  twitter: { card: "summary_large_image", title: "Portability", images: ["/og.png"] },
};

export default function PortabilityPage() {
  return (
    <main className="min-h-[70vh]">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <p className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Portability Readiness
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Assess your book’s portability
          </h1>
          <p className="mt-3 max-w-2xl text-white/70">
            A quick, structured assessment of revenue attribution, documentation quality,
            cross-border compliance, and onboarding speed. Your inputs stay private.
          </p>
          <div className="mt-6 flex gap-3 text-sm text-white/70">
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1">35+ Markets</span>
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1">15 Booking centres</span>
            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1">Live Benchmarks</span>
          </div>
        </div>

        {/* Interactive tool (client-only wrapper) */}
        <ClientMount />

        <p className="mt-6 text-xs text-white/60">
          Privacy: We do not store any data without your explicit consent.
        </p>
      </section>
    </main>
  );
}
