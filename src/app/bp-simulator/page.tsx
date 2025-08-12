export default function BpSimulatorPage() {
  const url = process.env.NEXT_PUBLIC_BP_URL || ""; // set this in .env.local
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Business Plan Simulator</h1>
      <p className="text-neutral-700">
        Use our simulator to estimate 3-year NNM, revenue, and profitability. Data is confidential.
      </p>
      {!url ? (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-900">
          Set <code>NEXT_PUBLIC_BP_URL</code> in <code>.env.local</code> to embed your Streamlit app (e.g., Streamlit Cloud URL).
        </div>
      ) : (
        <iframe
          src={url}
          className="mt-4 h-[80vh] w-full rounded-2xl border"
          allow="clipboard-write; fullscreen"
        />
      )}
    </section>
  );
}
