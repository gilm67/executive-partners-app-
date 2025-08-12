// app/hiring-managers/page.tsx
export const metadata = {
  title: "Hiring Managers | Executive Partners",
  description:
    "Confidential hiring for Private Banking & Wealth Management. Browse anonymous top talent or book a shortlist call.",
};

export default function HiringManagersPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Hiring Managers</h1>
        <p className="text-neutral-700">
          Confidential search for Private Banking & Wealth Management. We maintain an anonymized stream of active candidates.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1 */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Browse Top Talent</h2>
          <p className="mt-1 text-sm text-neutral-600">
            View anonymized profiles screened by AI. Filter by market, role and score.
          </p>
          <a
            href="/top-talent"
            className="mt-4 inline-block rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            Open Top Talent
          </a>
          <p className="mt-2 text-xs text-neutral-500">
            Passcode required (ask your EP contact).
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Request a Shortlist</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Share your mandate and we’ll deliver a curated shortlist within days.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="/contact"
              className="rounded-lg border px-4 py-2 text-sm hover:bg-white"
            >
              Contact us
            </a>
            <a
              href="mailto:recruiter@execpartners.ch?subject=Shortlist%20request&body=Hi%20EP%2C%0A%0ARole%3A%20%0AMarket%3A%20%0ATimeline%3A%20%0ABudget%3A%20%0AOther%20notes%3A%20%0A"
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
            >
              Email brief
            </a>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            We’ll respond the same business day.
          </p>
        </div>
      </div>
    </section>
  );
}

