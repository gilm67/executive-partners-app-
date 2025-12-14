export default function PrivateHome() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold">Private Candidate Area</h1>
      <p className="mt-4 text-white/80">
        Discreet access. Controlled information. No disclosure without your consent.
      </p>

      <div className="mt-10 rounded-xl bg-white/5 p-6 ring-1 ring-white/10">
        <h2 className="text-xl font-medium">Next steps</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
          <li>Access confidential mandates (limited visibility)</li>
          <li>Use advisory tools (Business Plan Simulator, Portability)</li>
          <li>Request a private discussion before any disclosure</li>
        </ul>
      </div>
    </div>
  );
}