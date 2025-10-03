'use client';
import { useEffect } from 'react';
import PortabilityForm from '@/components/portability/PortabilityForm';

export default function ClientMount() {
  useEffect(() => {
    // Fires on client hydration
    console.log('[Portability] ClientMount hydrated');
  }, []);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
        debug: ClientMount hydrated
      </div>
      <PortabilityForm />
    </div>
  );
}
