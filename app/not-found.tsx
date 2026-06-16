import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-[70vh] flex items-center justify-center px-4 py-20 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 400px at 50% 0%, rgba(201,161,74,.14) 0%, rgba(201,161,74,0) 60%)",
        }}
      />
      <div className="relative max-w-lg text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A14A]">
          Page not found
        </p>
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
          This page doesn't exist
        </h1>
        <p className="mt-3 text-sm text-white/65 leading-relaxed">
          The mandate, article or page you're looking for may have moved or been
          removed. Here are a few places to start instead.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/en/jobs"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A14A] to-[#E8C46A] px-6 py-3 text-sm font-semibold text-[#090C14] hover:brightness-110 transition-all"
          >
            Browse mandates
          </Link>
          <Link
            href="/en/hiring-managers"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
          >
            For hiring managers
          </Link>
          <Link
            href="/en"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
          >
            Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
