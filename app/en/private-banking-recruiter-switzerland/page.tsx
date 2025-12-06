import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Banking Recruiter in Switzerland | Executive Partners",
  description:
    "Executive Partners is the leading executive search firm for Private Banking and Wealth Management in Switzerland. Based in Geneva and active in Zurich, London, Dubai, Singapore and Hong Kong.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
      <div className="container-max max-w-3xl space-y-8">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Private Banking & Wealth Management Recruiter in Switzerland
        </h1>

        <p className="text-white/80 text-lg">
          Executive Partners is a Geneva-based executive search firm specialised in
          Private Banking and Wealth Management. We recruit Senior Relationship
          Managers, Private Bankers, Desk Heads, Team Leaders and Wealth Planners
          for major Swiss and international banks in Geneva and Zurich.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Why Private Bankers Choose Us
        </h2>
        <p className="text-white/70">
          Our approach is fully discreet and tailored. We assess your portability,
          client base, compensation expectations, growth opportunities and cultural
          fit. Over 200 senior bankers have advanced their careers through our
          confidential process.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Coverage in Geneva & Zurich
        </h2>
        <p className="text-white/70">
          We work with Swiss and international banks across Geneva, Zurich and
          global wealth hubs — London, Dubai, Singapore, Hong Kong, New York and
          Miami. Our mandates include UHNW desks, HNW desks, EAM coverage, Wealth
          Planning and Market Head roles.
        </p>

        <h2 className="text-2xl font-semibold mt-12">Apply Confidentially</h2>
        <p className="text-white/70">
          If you are a Private Banker with a portable UHNW/HNW portfolio, you can
          apply confidentially. We only present your profile with explicit
          permission.
        </p>

        <div className="pt-6">
          <a
            href="/en/apply"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-emerald-400 text-black hover:bg-emerald-300 transition"
          >
            Apply confidentially
          </a>
        </div>
      </div>
    </main>
  );
}