// app/candidates/page.tsx
export const revalidate = 60;

export default function CandidatesPage() {
  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-50">
          Apply confidentially
        </h1>
        <p className="text-neutral-300">
          We work discreetly with Private Banks, Wealth Managers, Family
          Offices and EAMs. Share your profile in confidence and we’ll contact
          you if there’s a strong fit.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: quick explanation */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-2 text-lg font-medium text-neutral-100">
            How it works
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-neutral-300">
            <li>Your details are stored securely and never shared without consent.</li>
            <li>We match you to current & upcoming mandates that fit your market and seniority.</li>
            <li>You can also apply directly to any role on the Jobs page.</li>
          </ul>
          <p className="mt-4 text-sm text-neutral-400">
            Tip: include your preferred market(s), AUM portability, and mobility.
          </p>
        </div>

        {/* Right: actions */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="mb-4 text-lg font-medium text-neutral-100">
            Get started
          </h2>
          <div className="space-y-3">
            <a
              href="/apply"
              className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700"
            >
              Submit my profile (confidential)
            </a>
            <a
              href="/jobs"
              className="inline-flex w-full items-center justify-center rounded-lg border border-neutral-700 px-4 py-2.5 text-neutral-100 hover:bg-neutral-800"
            >
              View current opportunities
            </a>
            <a
              href="/top-talent"
              className="inline-flex w-full items-center justify-center rounded-lg border border-neutral-700 px-4 py-2.5 text-neutral-100 hover:bg-neutral-800"
            >
              For RMs: BP Simulator / Tools
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
