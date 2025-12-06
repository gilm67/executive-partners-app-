import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Banker Jobs in Lisbon | Executive Partners",
  description:
    "Private banker and wealth manager roles in Lisbon, often linked to international and offshore client coverage.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
      <div className="container-max max-w-3xl space-y-8">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Private Banker Jobs in Lisbon
        </h1>

        <p className="text-white/80 text-lg">
          Executive Partners advises private bankers and wealth managers in
          Lisbon who serve domestic, European and international offshore clients,
          often in collaboration with Swiss or other European booking centres.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          International Wealth Platforms in Lisbon
        </h2>
        <p className="text-white/70">
          We support roles within banks and platforms that use Lisbon as a hub for
          European and international wealth clients, often with strong links to
          Switzerland, the UK or other EU centres.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Long-Term Career Advisory
        </h2>
        <p className="text-white/70">
          We help you map potential moves between Lisbon and other key wealth
          hubs, understanding platform positioning, compensation and impact on
          your client relationships.
        </p>

        <div className="pt-6 flex flex-wrap gap-4">
          <a
            href="/en/apply"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-emerald-400 text-black hover:bg-emerald-300 transition"
          >
            Apply confidentially
          </a>
          <a
            href="/en/jobs"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium border border-white/40 text-white hover:border-emerald-300 hover:text-emerald-200 transition"
          >
            View open roles
          </a>
        </div>
      </div>
    </main>
  );
}