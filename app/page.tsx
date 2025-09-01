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
        <div className="flex justify-center gap-3 flex-wrap">
          <a href="/candidates" className="ep-btn">I’m a Candidate</a>
          <a href="/hiring-managers" className="ep-btn ep-btn-muted">I’m Hiring</a>
          <a href="/jobs" className="ep-btn ep-btn-primary">View Jobs</a>
        </div>
      </section>

      {/* Candidates */}
      <section className="ep-panel space-y-3">
        <h2 className="text-xl font-semibold">Confidential Career Moves</h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          We work discreetly with UHNW/HNW talent. Explore live mandates or register to be matched with roles that fit your market, seniority, and portability.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a href="/jobs" className="ep-btn">Browse Jobs</a>
          <a href="/candidates" className="ep-btn ep-btn-muted">Candidate Hub</a>
        </div>
      </section>

      {/* Hiring Managers */}
      <section className="ep-panel space-y-3">
        <h2 className="text-xl font-semibold">Targeted Shortlists, Fast</h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          We map markets and deliver vetted shortlists with real portability. Post a new role or ask us to discreetly approach specific bankers.
        </p>
        <div className="flex gap-3 flex-wrap">
          <a href="/hiring-managers" className="ep-btn">Hire Talent</a>
          <a href="/contact" className="ep-btn ep-btn-muted">Talk to Us</a>
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
          <a href="/jobs" className="ep-btn">View All Jobs</a>
        </div>
      </section>
    </div>
  );
}
