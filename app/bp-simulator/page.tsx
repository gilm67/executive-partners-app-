export const dynamic = "force-static";

const SIM_URL =
  process.env.NEXT_PUBLIC_SIMULATOR_URL?.trim() || "https://sim.execpartners.ch/";

export default function BpSimulatorPage() {
  return (
    <main className="min-h-[70vh] bg-white">
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Business Plan Simulator</h1>
        <p className="mt-4 text-neutral-600">
          Model your Private Banking business case: test AUM growth, revenue scenarios,
          and client portability — all in one tool.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href={SIM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-5 py-3 text-white bg-black hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition"
          >
            🚀 Open Simulator in a new tab
          </a>
          <a
            href={SIM_URL}
            className="rounded-xl px-5 py-3 border border-neutral-300 text-neutral-800 hover:bg-neutral-50 transition"
          >
            Open in this tab
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 text-left">
          <div className="rounded-lg border border-neutral-200 p-4">
            <p className="font-medium">AUM & Revenue</p>
            <p className="text-sm text-neutral-600 mt-1">Project growth & fee income.</p>
          </div>
          <div className="rounded-lg border border-neutral-200 p-4">
            <p className="font-medium">Client Portability</p>
            <p className="text-sm text-neutral-600 mt-1">Estimate portable assets.</p>
          </div>
          <div className="rounded-lg border border-neutral-200 p-4">
            <p className="font-medium">Scenarios</p>
            <p className="text-sm text-neutral-600 mt-1">Best / base / downside.</p>
          </div>
        </div>

        <p className="mt-10 text-xs text-neutral-500">
          Note: For security, the simulator opens outside this page.
        </p>
      </section>
    </main>
  );
}
