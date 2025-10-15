/* app/en/about/page.tsx */
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HubsGrid from "@/components/HubsGrid";

export const metadata: Metadata = {
  title: "About — Executive Partners",
  description:
    "Geneva-based executive search boutique specialized in Private Banking & Wealth Management across CH, UK, US, Dubai, Singapore, and Hong Kong.",
  openGraph: {
    title: "About — Executive Partners",
    description:
      "A specialist search partner for Private Banking & Wealth Management. We move revenue books with precision, confidentiality, and speed.",
  },
};

export default function AboutPage() {
  return (
    <main className="relative">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/about/hero-geneva.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>
        <div className="container-max py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="font-semibold tracking-tight text-4xl md:text-5xl">
              We move books, not just CVs.
            </h1>
            <p className="mt-4 text-white/85 text-lg">
              Executive Partners is a Geneva-based search boutique focused on Private Banking &amp; Wealth Management.
              We help RMs, Team Heads, and Market Leaders transition their client franchises across Switzerland, the UK,
              US, Dubai, Singapore, and Hong Kong—with discretion and data-driven certainty.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/en/markets" className="btn btn-ghost btn-xl">Explore Markets</Link>
              <Link href="/en/contact" className="btn-primary btn btn-xl">Confidential Strategy Call</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Credibility / Stats ===== */}
      <section className="container-max py-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "10–30%", v: "Typical uplift in total comp for placed RMs*" },
            { k: "CHF 1–5bn", v: "Aggregate AuM portability advised yearly" },
            { k: "4–8 weeks", v: "Avg. end-to-end move (signed to landed)" },
            { k: "92%", v: "Retention at 12 months post-move" },
          ].map((s) => (
            <div key={s.k} className="card">
              <div className="text-3xl font-semibold">{s.k}</div>
              <div className="mt-2 text-white/80 text-sm">{s.v}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-white/50">*Depending on portable book, ROA, lending penetration, and platform fit.</p>
      </section>

      {/* ===== Why EP (Value Props) ===== */}
      <section className="container-max py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-2xl md:text-3xl font-semibold">What makes us different</h2>
            <p className="mt-3 text-white/80">
              We combine rigorous book analysis with discreet choreography across hiring committees, risk, and
              cross-border compliance—so you land where your franchise compounds.
            </p>
          </div>
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Book-first methodology",
                desc:
                  "We underwrite your client revenues: ROA, NNA cadence, product mix (DPM/Alts/Lombard), and cross-border rules by market.",
              },
              {
                title: "Real compensation intelligence",
                desc:
                  "Benchmarks by city and seniority with clarity on deferrals, clawbacks, and allowances—no guesswork.",
              },
              {
                title: "Platform fit mapping",
                desc:
                  "We compare platforms: pricing grids, credit appetite, product shelf, EAM collaboration, and digital tooling.",
              },
              {
                title: "Low-noise process",
                desc:
                  "Fewer, sharper conversations with genuine decision-makers. Confidentiality rigor from first call to sign.",
              },
            ].map((b) => (
              <div key={b.title} className="rounded-2xl border border-white/10 bg-neutral-900/40 p-5">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-2 text-white/80 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Global Hubs (cards replacing the map) ===== */}
      <HubsGrid />

      {/* ===== Timeline ===== */}
      <section className="container-max py-10 md:py-14">
        <h2 className="text-2xl md:text-3xl font-semibold">A process built for discretion & speed</h2>
        <ol className="mt-6 relative border-s border-white/10 ps-6 space-y-6">
          {[
            { t: "Signal & Fit", d: "Off-record intake on book composition, constraints, and target platforms." },
            { t: "Shortlist", d: "2–3 platforms that match pricing, credit appetite, cross-border, and culture." },
            { t: "Deep Diligence", d: "Anonymous cases with Market Heads; indicative comp & platform guardrails." },
            { t: "Confidential Introductions", d: "Structured meetings only with empowered decision-makers." },
            { t: "Offer & Exit", d: "Deferrals, buy-outs, notice strategy, client communication choreography." },
          ].map((i, idx) => (
            <li key={i.t}>
              <div className="absolute -start-2 mt-1.5 h-4 w-4 rounded-full bg-white/20 ring-2 ring-white/30" />
              <div className="rounded-xl bg-black/30 p-4 ring-1 ring-white/10">
                <div className="text-sm text-white/60">Step {idx + 1}</div>
                <div className="font-semibold">{i.t}</div>
                <p className="text-white/80 text-sm mt-1">{i.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ===== Quote ===== */}
      <section className="container-max py-10 md:py-14">
        <figure className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-700/20 via-fuchsia-700/10 to-emerald-700/10 p-6 ring-1 ring-white/10">
          <blockquote className="text-xl leading-relaxed">
            “In Private Banking, timing and discretion are everything. We make sure both work in your favor—
            with a move that upgrades your platform and compounds your franchise.”
          </blockquote>
          <figcaption className="mt-4 text-sm text-white/70">Executive Partners</figcaption>
        </figure>
      </section>

      {/* ===== CTA ===== */}
      <section className="container-max py-12">
        <div className="rounded-2xl border border-white/10 bg-neutral-900/40 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Let’s plan your next move</h3>
            <p className="mt-1 text-white/80">Get a confidential, data-driven view of comp, platform fit, and timing.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/en/contact" className="btn-primary">Confidential Call</Link>
            <Link href="/en/bp-simulator" className="btn-ghost">Upload Business Plan</Link>
          </div>
        </div>
      </section>
    </main>
  );
}