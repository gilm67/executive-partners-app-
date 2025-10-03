'use client';

export default function PortabilityForm() {
  console.log('[Portability] Minimal PortabilityForm rendered');
  return (
    <div className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 p-4 text-sm">
      <div className="font-semibold">DEBUG: Minimal PortabilityForm rendered</div>
      <div className="mt-1 opacity-70">
        If you can see this box, the import & render path is OK. The earlier blank
        state came from inside the original PortabilityForm code.
      </div>
    </div>
  );
}
