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

        {/* gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        {/* content */}
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28 text-center">
          {/* Logo */}
          <img
            src="/transparent-ep-logo.png"
            alt="Executive Partners Logo"
            className="mx-auto mb-6 w-48 sm:w-56 h-auto opacity-95 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />

          {/* Heading */}
          <h1
            id="bp-hero-heading"
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Business Plan Simulator
          </h1>
          <p className="mt-4 text-lg text-neutral-200 max-w-2xl mx-auto">
            Model your Private Banking business case. Test AUM growth, revenue
            scenarios, and client portability — all in one tool.
          </p>

          {/* CTA button */}
          <div className="mt-8 flex justify-center">
            <a
              href={STREAMLIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              🚀 Open Fullscreen BP Simulator
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-neutral-900 p-6 shadow ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-white">Scenario Modelling</h3>
          <p className="mt-2 text-sm text-neutral-300">
            Adjust AUM, spreads and hit rates to stress test revenue outcomes.
          </p>
        </div>
        <div className="rounded-2xl bg-neutral-900 p-6 shadow ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-white">Portability Focus</h3>
          <p className="mt-2 text-sm text-neutral-300">
            Estimate book portability and phased migration of client assets.
          </p>
        </div>
        <div className="rounded-2xl bg-neutral-900 p-6 shadow ring-1 ring-white/10">
          <h3 className="text-lg font-semibold text-white">Export & Share</h3>
          <p className="mt-2 text-sm text-neutral-300">
            Revenue tables and totals formatted for review. CSV & Sheets kept in
            sync.
          </p>
        </div>
      </section>
    </>
  );
}

