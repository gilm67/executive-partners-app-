export const dynamic = "force-static";

export default function BPSimulatorPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-semibold">Business Plan Simulator</h1>
        <p className="mt-2 text-neutral-300">
          The simulator loads below. If it doesn’t, open it{" "}
          <a className="underline" href="https://sim.execpartners.ch" target="_blank" rel="noopener noreferrer">
            in a new tab
          </a>.
        </p>
      </div>
      <div className="h-[calc(100vh-120px)]">
        <iframe
          src="https://sim.execpartners.ch"
          title="Business Plan Simulator"
          className="w-full h-full border-0"
          allow="clipboard-write; fullscreen"
        />
      </div>
    </main>
  );
}
