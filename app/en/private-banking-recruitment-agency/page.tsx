import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Banking Recruitment Agency in Switzerland | Executive Partners",
  description:
    "Executive Partners is a Geneva-based private banking recruitment agency specialising in senior hires for Swiss and international wealth managers in Geneva and Zurich.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
      <div className="container-max max-w-3xl space-y-8">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Private Banking Recruitment Agency in Switzerland
        </h1>

        <p className="text-white/80 text-lg">
          Executive Partners is a Geneva-based private banking recruitment
          agency focused on senior hires in Wealth Management. We support Swiss
          and international banks, EAMs and family offices in Geneva, Zurich and
          major global hubs.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Specialist in Senior Private Banking Hires
        </h2>
        <p className="text-white/70">
          We recruit Senior Relationship Managers, Desk Heads, Market Leaders,
          Wealth Planners and senior support functions. Our work is centred on
          UHNW/HNW coverage, cross-border expertise and proven revenue
          generation.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          How We Work with Banks &amp; Wealth Managers
        </h2>
        <p className="text-white/70">
          For hiring managers, we provide calibrated shortlists, portability
          analysis, compensation benchmarking and structured market mapping.
          Our process helps you secure senior bankers with real, portable client
          assets and a clear business case.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Discreet Advisory for Private Bankers
        </h2>
        <p className="text-white/70">
          For candidates, we offer confidential advisory on potential moves
          within Switzerland and to international hubs such as London, Dubai,
          Singapore and Hong Kong. We only present your profile with your
          explicit consent.
        </p>

        <div className="pt-6 flex flex-wrap gap-4">
          <a
            href="/en/apply"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-emerald-400 text-black hover:bg-emerald-300 transition"
          >
            Apply confidentially
          </a>
          <a
            href="/en/hiring-managers"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium border border-white/40 text-white hover:border-emerald-300 hover:text-emerald-200 transition"
          >
            Brief a mandate
          </a>
        </div>
      </div>
    </main>
  );
}