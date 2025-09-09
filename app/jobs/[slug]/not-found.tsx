// app/not-found.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Executive Partners",
  description:
    "We couldn’t find that page. Explore open Private Banking roles or contact Executive Partners.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* Ambient gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-neutral-300">
          The page you’re looking for may have been removed or doesn’t exist.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/jobs"
            className="block rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Browse Private Banking jobs
          </Link>
          <Link
            href="/apply"
            className="block rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Apply confidentially
          </Link>
          <Link
            href="/candidates"
            className="block rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Candidate hub
          </Link>
          <Link
            href="/contact"
            className="block rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Contact a recruiter
          </Link>
        </div>
      </div>
    </main>
  );
}