import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Banking Recruitment in Zurich | Executive Partners",
  description:
    "Executive Partners supports Swiss and international banks with senior private banking recruitment in Zurich. Discreet search for Senior RMs, Desk Heads and Wealth Managers.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
      <div className="container-max max-w-3xl space-y-8">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Private Banking Recruitment in Zurich
        </h1>

        <p className="text-white/80 text-lg">
          Executive Partners is an executive search firm specialised in Private
          Banking and Wealth Management. From our base in Geneva we support
          clients with senior private banking recruitment in Zurich and across
          all major Swiss hubs.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Senior Hiring for Zurich Booking Centres
        </h2>
        <p className="text-white/70">
          We work with Swiss pure-play banks, global institutions and boutiques
          operating out of Zurich. Typical mandates include Senior Relationship
          Managers, Desk Heads, Market Leaders and senior Wealth Planners
          covering UHNW and HNW clients.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Focus on Portability &amp; Business Cases
        </h2>
        <p className="text-white/70">
          Our recruitment process includes portability assessment, client base
          analysis, revenue potential and compensation benchmarking. This helps
          hiring managers secure candidates with a clear, approvable business
          case and realistic ramp-up assumptions.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Advisory for Private Bankers Moving to Zurich
        </h2>
        <p className="text-white/70">
          For senior private bankers considering a move to Zurich, we offer
          confidential advisory on platforms, team culture, booking centre
          specifics and relocation aspects. We only introduce your profile with
          your explicit consent.
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
            Brief a Zurich mandate
          </a>
        </div>
      </div>
    </main>
  );
}