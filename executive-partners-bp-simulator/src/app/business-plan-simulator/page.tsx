// src/app/business-plan-simulator/page.tsx
import dynamic from 'next/dynamic';

export const metadata = {
  title: 'Business Plan Simulator – Executive Partners',
  description: 'Plan, project and export an Executive Partners business plan.',
};

// Dynamically import the client-only component
const BPClient = dynamic(() => import('../BPClient'), { ssr: false });

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white">
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        <h1 className="text-2xl font-semibold mb-6">Business Plan Simulator</h1>
        <BPClient />
      </div>
    </main>
  );
}
