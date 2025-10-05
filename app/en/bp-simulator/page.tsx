
import React from 'react';

export const metadata = {
  title: 'Business Plan Simulator — Executive Partners',
  description: 'Plan, project and export an Executive Partners business plan.',
};

export default function BPSimulatorEmbedPage() {
  return (
    <main className="min-h-screen">
      {/* Your header/footer come from the app-wide layout.tsx */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Business Plan Simulator</h1>
        <p className="text-sm text-neutral-500 mb-4">
          This tool is embedded from our secure simulator service.
        </p>

        <div className="rounded-xl border border-black/10 overflow-hidden">
          <iframe
            title="Executive Partners – Business Plan Simulator"
            src="https://executive-partners-bp-simulator.vercel.app/business-plan-simulator"
            style={{ width: '100%', height: '80vh', border: '0' }}
            loading="eager"
            referrerPolicy="no-referrer"
            allow="clipboard-write"
          />
        </div>
      </div>
    </main>
  );
}
