import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Banking Headhunter in Geneva | Executive Partners",
  description:
    "Executive Partners is a Geneva-based private banking headhunter specialising in the recruitment of Senior RMs, Desk Heads and Wealth Managers for Swiss and international banks.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
      <div className="container-max max-w-3xl space-y-8">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Private Banking Headhunter in Geneva
        </h1>

        <p className="text-white/80 text-lg">
          Executive Partners is a leading headhunter for Private Banking in
          Geneva. We specialise in discreet recruitment of Senior Relationship
          Managers, Private Bankers, Desk Heads and Market Leaders for Swiss and
          international wealth managers.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Discreet Executive Search for Senior Private Bankers
        </h2>
        <p className="text-white/70">
          Our approach is confidential, analytical and tailored. We evaluate
          client portability, cross-border expertise, compensation alignment and
          long-term strategic fit. Over 200 senior bankers have advanced their
          careers through our advisory.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Why Private Bankers Contact Us in Geneva
        </h2>
        <p className="text-white/70">
          Senior RMs choose us for our discretion and market insight. We provide
          unbiased advice on the best platforms in Geneva and Zurich, including
          Swiss pure-play banks, global institutions, boutiques and EAM
          platforms.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Strong Coverage Across Swiss and Global Markets
        </h2>
        <p className="text-white/70">
          Our mandates include UHNW/HNW desks, international coverage teams,
          EAM-focused roles, Wealth Planning and senior leadership positions. We
          also support relocations to London, Dubai, Singapore and Hong Kong.
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
            Hire Private Bankers
          </a>
        </div>
      </div>
    </main>
  );
}