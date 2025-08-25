export const dynamic = "force-static";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          Executive Partners — Private Banking & Wealth Management Recruitment
        </h1>
        <p className="mt-4 text-neutral-300 max-w-3xl">
          Geneva & Zurich headquartered. Mandates across London, New York, Dubai, Singapore & Hong Kong.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/hiring-managers" className="rounded-lg bg-white text-black px-4 py-2 font-medium">
            For Hiring Managers
          </a>
          <a href="/candidates" className="rounded-lg border border-neutral-700 px-4 py-2 font-medium hover:bg-neutral-900">
            For Candidates
          </a>
          <a href="/jobs" className="rounded-lg border border-neutral-700 px-4 py-2 font-medium hover:bg-neutral-900">
            Open Roles
          </a>
          <a href="/contact" className="rounded-lg border border-neutral-700 px-4 py-2 font-medium hover:bg-neutral-900">
            Contact
          </a>
        </div>
      </section>

      {/* Cities */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <h2 className="text-xl font-semibold mb-3">Core Markets</h2>
        <p className="text-neutral-400">
          Geneva • Zurich • London • New York • Dubai • Singapore • Hong Kong
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 text-center text-sm text-neutral-400">
        © {year} Executive Partners. All rights reserved.
      </footer>
    </main>
  );
}
