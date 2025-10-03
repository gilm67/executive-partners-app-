import type { Metadata } from 'next';
import BPSimulator from '@/components/bp/BPSimulator';

export const metadata: Metadata = {
  title: 'BP Simulator – Executive Partners',
  description: 'Business Plan Simulator for Private Bankers (Next.js).',
};

export default function Page() {
  return (
    <main className="min-h-[70vh]">
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <p className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            BP Simulator
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">Business Plan Simulator</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Model NNM, ROA-driven revenue, fixed costs and net margin across 3 years. Data stays in your browser.
          </p>
        </div>

        <BPSimulator />
      </section>
    </main>
  );
}
