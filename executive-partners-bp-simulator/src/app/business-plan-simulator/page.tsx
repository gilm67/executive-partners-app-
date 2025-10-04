'use client';
import dynamic from 'next/dynamic';
const BPClient = dynamic(() => import('../BPClient'), { ssr: false });

export default function BPSimulatorPage() {
  return (
    <main className="min-h-[60vh] p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">Business Plan Simulator</h1>
        <BPClient />
      </div>
    </main>
  );
}
