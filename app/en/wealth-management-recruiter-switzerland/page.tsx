import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wealth Management Recruiter in Switzerland | Executive Partners",
  description:
    "Executive Partners specialises in recruiting senior Wealth Managers and Private Wealth advisors across Switzerland. Geneva-based, active in Zurich, London, Dubai, Singapore, and Hong Kong.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
      <div className="container-max max-w-3xl space-y-8">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Wealth Management Recruiter in Switzerland
        </h1>

        <p className="text-white/80 text-lg">
          Executive Partners is a Geneva-based executive search firm specialising in
          recruiting Wealth Managers, Senior Advisers, Portfolio Managers, and
          Private Wealth professionals across Switzerland and global hubs.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Expertise in Private Wealth Recruitment
        </h2>
        <p className="text-white/70">
          We partner with leading Swiss and international banks, independent asset
          managers, and multi-family offices. Our team supports senior hires from
          UHNW wealth advisers to senior portfolio managers.
        </p>

        <h2 className="text-2xl font-semibold mt-12">Geneva & Zurich Coverage</h2>
        <p className="text-white/70">
          Our mandates cover Geneva and Zurich as well as London, Dubai, Singapore,
          Hong Kong, New York, and Miami. We specialise in UHNW/HNW advisory and
          Wealth Planning positions.
        </p>

        <h2 className="text-2xl font-semibold mt-12">Confidential Advisory</h2>
        <p className="text-white/70">
          We conduct discreet market assessments, compensation benchmarking,
          relocation guidance, and career strategy advisory for senior wealth
          professionals exploring new opportunities.
        </p>

        <div className="pt-6">
          <a
            href="/en/apply"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-emerald-400 text-black hover:bg-emerald-300 transition"
          >
            Apply Confidentially
          </a>
        </div>
      </div>
    </main>
  );
}