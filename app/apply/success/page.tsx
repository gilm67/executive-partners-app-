// app/apply/success/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Application Received | Executive Partners",
  },
  description:
    "Your confidential submission has been received by Executive Partners. Our team will review your Private Banking & Wealth Management background and revert with tailored guidance.",
  robots: { index: false, follow: false },
};

export default function ApplySuccessPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-white">
      <section className="w-full rounded-3xl border border-white/10 bg-black/40 p-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur">
        {/* Eyebrow */}
        <p className="eyebrow text-[#F5D778] tracking-[0.25em] uppercase text-[11px]">
          Private Banking · Wealth Management · Executive Partners
        </p>

        {/* Title */}
        <h1 className="mt-4 text-2xl font-semibold md:text-3xl">
          Thank you — your application has been received
        </h1>

        {/* Main text */}
        <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem] leading-relaxed">
          Your profile and CV were submitted successfully. Our team will now
          assess your Private Banking background — including AUM portability,
          booking-centre relevance, market coverage and platform alignment across
          Switzerland, the UK, Europe, the US, Dubai, Singapore and Hong Kong.
        </p>

        {/* Confidentiality note */}
        <p className="mt-3 text-xs text-neutral-500">
          <strong className="text-neutral-400">Strict confidentiality:</strong>{" "}
          We never send your CV, profile or business plan to any institution
          without your explicit approval for that specific bank or jurisdiction.
        </p>

        {/* Response time */}
        <p className="mt-1 text-xs text-neutral-500">
          Typical response time: within one business day (Geneva time).
        </p>

        {/* Divider */}
        <div className="mx-auto mt-6 h-px w-20 bg-white/10" />

        {/* Premium CTA */}
        <p className="mt-6 text-sm text-neutral-300">
          While you wait, you can access our{" "}
          <span className="text-[#F5D778] font-semibold">
            Private Banking Career Intelligence 2025
          </span>{" "}
          — market benchmarks across Geneva, Zurich, London, New York, Miami,
          Dubai, Singapore, Hong Kong, Paris, Madrid and Lisbon.
        </p>

        <div className="mt-4">
          <Link
            href="/insights/private-banking-career-intelligence"
            className="btn btn-secondary btn-xl w-full sm:w-auto"
          >
            View the guide &amp; download the PDF
          </Link>
        </div>

        {/* CTA row */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/" className="btn btn-ghost w-full sm:w-auto">
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="btn btn-primary btn-xl w-full sm:w-auto"
          >
            Request a Call
          </Link>
        </div>
      </section>
    </main>
  );
}