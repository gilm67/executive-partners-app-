// app/bp-simulator/page.tsx
export const revalidate = 0;

const STREAMLIT_URL =
  "https://bp-simulator-mjyjqy6fbjbenu8kbb6wox3.streamlit.app";

export default function BpSimulatorPage() {
  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden bg-neutral-950"
        aria-labelledby="bp-hero-heading"
      >
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-geneva.jpg')" }}
          aria-hidden="true"
        />

        {/* gradient & vignette overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
        <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-120px_160px_-60px_rgba(0,0,0,0.65)]" />

        {/* content */}
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
          {/* LOGO in frosted-glass card */}
          <div className="mx-auto mb-6 w-fit rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
            <img
              src="/logoep.png"
              alt="Executive Partners"
              className="h-14 w-auto md:h-16"
            />
          </div>

          <h1
            id="bp-hero-heading"
            className="mx-auto max-w-3xl text-center text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Business Plan Simulator
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-neutral-200 sm:text-lg">
            Build a 3-year private banking business case in minutes. Your data
            writes securely to your Google Sheet (<span className="italic">BP_Entries</span>) with the exact header order.
          </p>

          {/* badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Badge>Google Sheets connected</Badge>
            <Badge>3-Year Revenue & Margin</Badge>
            <Badge>Prospects Consistency Check</Badge>
          </div>

          {/* CTA card */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-sm text-neutral-300">
                  Launches in a new tab on Streamlit Cloud.
                </p>
                <p className="text-xs text-neutral-400">
                  (Some platforms block third-party iframes; we’ll self-host to
                  embed inline later.)
                </p>
              </div>

              <a
                href={STREAMLIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:scale-[1.02] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <span className="mr-2">🚀</span> Launch Business Plan Simulator
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES / REASSURANCE */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Feature
            title="Bank-grade handling"
            body="Entries are written to your private Google Sheet using a service account you control."
          />
          <Feature
            title="Recruiter-friendly scoring"
            body="Traffic-light verdict with explainable positives, risks, and flags."
          />
          <Feature
            title="Ready for print & export"
            body="Revenue tables and totals formatted for review. CSV & Sheets kept in sync."
          />
        </div>

        <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-base font-semibold text-white">Notes</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-300">
            <li>
              Uses your validated model (NNM, ROA, costs, profit margin, prospects
              consistency, and scoring).
            </li>
            <li>
              Sheet tab: <span className="font-mono">BP_Entries</span>. We write
              in the exact header order.
            </li>
            <li>
              Want it embedded inline? We can self-host the Streamlit app (or port
              to Next.js) and allow iframe embedding.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

/* ---------- tiny helpers ---------- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-neutral-100 backdrop-blur">
      {children}
    </span>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
      <h3 className="mb-1 text-sm font-semibold text-white">{title}</h3>
      <p className="text-sm text-neutral-300">{body}</p>
    </div>
  );
}


