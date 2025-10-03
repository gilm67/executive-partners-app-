'use client';

import dynamic from 'next/dynamic';

const PortabilityForm = dynamic(
  () => import('@/components/portability/PortabilityForm'),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
        Loading Portability…
      </div>
    ),
  }
);

export default function ClientPortability() {
  return <PortabilityForm />;
}