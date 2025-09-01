// app/page.tsx
export default function HomePage() {
  return (
    <div className="container-page space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6">
        <h1 className="ep-title">Executive Partners</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          We connect top Private Bankers, Wealth Managers, and senior executives
          with leading banks, EAMs, and family offices worldwide.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/candidates"
            className="ep-btn"
          >
            I’m a Candidate
          </a>
          <a
            href="/hiring-managers"
            className="ep-btn bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-100 dark:text-black"
          >
            I’m Hiring
          </a>
          <a href="/jobs" className="ep-btn bg-blue-600 hover:bg-blue-700">
            View Jobs
          </a>
        </div>
      </section>

      {/* Candidate Section */}
      <section className="ep-panel space-y-4">
        <h2 className="text-xl font-semibold">Confidential Career Moves</h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          We work discreetly with UHNW/HNW talent. Explore live mandates or
          register to be matched with roles that fit your market, seniority, and
          portability.
        </p>
        <div className="flex gap-4">
          <a href="/jobs" className="ep-btn">
            Browse Jobs
          </a>
          <a href="/candidates" className="ep-btn bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-100 dark:text-black">
            Candidate Hub
          </a>
        </div>
      </section>

      {/* Hiring Managers Section */}
      <section className="ep-panel space-y-4">
        <h2 className="text-xl font-semibold">Targeted Shortlists, Fast</h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          We map markets and deliver vetted shortlists with real portability.
          Post a new role or ask us to discreetly approach specific bankers.
        </p>
        <div className="flex gap-4">
          <a href="/hiring-managers" className="ep-btn">
            Hire Talent
          </a>
          <a href="/contact" className="ep-btn bg-neutral-800 hover:bg-neutral-900 dark:bg-neutral-100 dark:text-black">
            Talk to Us
          </a>
        </div>
      </section>

      {/* Featured Roles */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Roles</h2>
        <div className="ep-panel">
          <p className="text-neutral-600 dark:text-neutral-300">
            No active roles available at this time.
          </p>
        </div>
        <div className="mt-4">
          <a href="/jobs" className="ep-btn">
            View All Jobs
          </a>
        </div>
      </section>
    </div>
  );
}