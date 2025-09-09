// app/jobs/not-found.tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Role Not Found | Executive Partners",
  description:
    "The job you’re looking for may have been removed or is no longer open. Browse all current Private Banking roles.",
  robots: { index: false, follow: true },
};

export default function JobNotFound() {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 400px at 20% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(800px 320px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold">Role not found</h1>
        <p className="mt-2 text-neutral-300">
          The job you’re looking for may have been removed or is no longer open.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/jobs"
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            View all current roles
          </Link>
        </div>
      </div>
    </main>
  );
}
