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
        {/* gradient & vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
        <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-120px_160px_-60px_rgba(0,0,0,0.65)]" />

        {/* content */}
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
          {/* Logo with subtle glow */}
          <div className="mb-6">
            <div className="inline-block">
              <img
                src="/transparent-ep-logo.png"
                alt="Executive Partners"
                className="h-14 w-auto sm:h-16 md:h-20 drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
              />
            </div>
          </div>

          <h1
            id="bp-hero-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Business Plan Simulator
          </h1>
          <p className="mt-4 max-w-2xl text-base text-neutral-200 sm:text-lg">
            Model your Private Banking business case. Test AUM growth, revenue
            scenarios, and client portability — all in one tool.
          </p>

          <div className="mt-8">
            <a
              href={STREAMLIT_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/90 px-5 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-emerald-300/30 backdrop-blur transition hover:bg-emerald-600 hover:ring-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <span>🚀 Open Fullscreen BP Simulator</span>
            </a>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="bg-neutral-950 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 shadow-sm">
            <h3 className="text-white">Scenario Modelling</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Adjust AUM, spreads and hit rates to stress test revenue outcomes.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 shadow-sm">
            <h3 className="text-white">Portability Focus</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Estimate book portability and phased migration of client assets.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5 shadow-sm">
            <h3 className="text-white">Export &amp; Share</h3>
            <p className="mt-2 text-sm text-neutral-300">
              Revenue tables and totals formatted for review. CSV &amp; Sheets
              kept in sync.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

