// app/apply/success/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Application Received | Executive Partners",
  },
  description:
    "Thank you for submitting your profile to Executive Partners. We will review your background confidentially and revert shortly.",
  robots: { index: false, follow: false },
};

export default function ApplySuccessPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-white">
      <section className="w-full rounded-3xl border border-white/10 bg-black/40 p-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur">
        <p className="eyebrow text-[#F5D778]">
          Private Banking &amp; Wealth Management
        </p>
        <h1 className="mt-4 text-2xl font-semibold md:text-3xl">
          Thank you — application received
        </h1>
        <p className="mt-4 text-sm text-neutral-300 md:text-[0.95rem]">
          We have received your details and CV. We will review your profile
          confidentially and only introduce you to a bank or platform with your
          prior consent.
        </p>
        <p className="mt-2 text-xs text-neutral-500">
          Typical response time: within one business day (Geneva time).
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/" className="btn btn-ghost">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-primary btn-xl">
            Request a call
          </Link>
        </div>
      </section>
    </main>
  );
}