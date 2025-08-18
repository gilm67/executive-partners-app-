// app/bp-simulator/page.tsx
import Image from "next/image";

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
          aria-hidden
        />

        {/* gradient & vignette overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
        <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-120px_160px_-60px_rgba(0,0,0,0.65)]" />

        {/* content */}
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <h1
              id="bp-hero-heading"
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Business Plan Simulator
            </h1>
            <p className="mt-4 text-base leading-7 text-neutral-200">
              Model revenue, portability and scenarios for private banking
              teams. Secure, browser-based, always up to date.
            </p>
          </div>

          {/* LOGO in frosted-glass card (now transparent image) */}
          <div className="mt-8 inline-flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-md ring-1 ring-white/15">
            <Image
              src="/transparent-ep-logo.png"
              alt="Executive Partners"
              width={120}
              height={32}
              priority
            />
            <div className="h-5 w-px bg-white/20" />
            <span className="text-sm text-neutral-100">
              Built by Executive Partners
            </span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-neutral-950">
        <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 sm:grid-cols-3">
          <Feature
            title="Scenario Modelling"
            body="Adjust AUM, spreads and hit rates to stress test revenue outcomes."
          />
          <Feature
            title="Portability Focus"
            body="Estimate book portability and phased migration of client assets."
          />
          <Feature
            title="Export & Share"
            body="Revenue tables and totals formatted for review. CSV & Sheets kept in sync."
          />
        </div>
      </section>

      {/* EMBED */}
      <section className="bg-neutral-975">
        <div className="mx-auto max-w-6xl px-6 pb-16">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-2">
            <iframe
              src={STREAMLIT_URL}
              title="BP Simulator"
              className="h-[78vh] w-full rounded-xl bg-black"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5">
      <h3 className="text-white">{title}</h3>
      <p className="mt-2 text-sm text-neutral-300">{body}</p>
    </div>
  );
}

