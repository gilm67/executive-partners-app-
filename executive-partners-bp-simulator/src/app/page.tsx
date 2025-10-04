// src/app/page.tsx
'use client';

import dynamic from 'next/dynamic';

// Load the interactive simulator only on the client
const BPClient = dynamic(() => import('./BPClient'), { ssr: false });

export default function Page() {
  return (
    <main className="min-h-[60vh] p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Business Plan Simulator</h1>
          <p className="text-sm text-black/60 dark:text-white/60">
            Fill the sections below and download the analysis PDF.
          </p>
        </header>

        <BPClient />
      </div>
    </main>
  );
}