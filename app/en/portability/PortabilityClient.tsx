'use client';

import dynamic from 'next/dynamic';

const Fallback = ({ title }: { title: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/70">
    Loading {title}…
  </div>
);

// If you have an intro/hero, keep it dynamic too (optional)
const PortabilityForm = dynamic(
  () => import('../../../components/portability/PortabilityForm'),
  { ssr: false, loading: () => <Fallback title="Portability Diagnostic" /> }
);

export default function PortabilityClient() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">Portability</h1>
      <p className="text-sm text-white/70">
        Map your booking-centre coverage, product fit and documentation readiness. Get a
        banker-friendly score with next actions and a downloadable dossier.
      </p>
      <hr className="border-white/10" />
      <PortabilityForm />
    </div>
  );
}
