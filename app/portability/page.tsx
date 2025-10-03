// app/portability/page.tsx

export const metadata = {
  title: "Portability Score™ – Executive Partners",
  description: "Confidentially assess client portability & transition risk.",
};

export default function PortabilityPage() {
  return (
    <main className="container-max py-10 text-white">
      <h1 className="text-3xl font-bold">Portability Score™</h1>
      <p className="mt-2 max-w-2xl text-white/80">
        Assess client transfer feasibility across booking centres, licensing, and product scope.
        This page is now live under your domain. We’ll mount the interactive widget here soon.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Coming soon</h2>
        <ul className="mt-3 list-disc pl-5 text-sm text-white/80">
          <li>Coverage & cross-border checks</li>
          <li>Wallet share & retention signals</li>
          <li>Booking centre and product compatibility</li>
          <li>PDF export for hiring packs</li>
        </ul>
      </div>
    </main>
  );
}