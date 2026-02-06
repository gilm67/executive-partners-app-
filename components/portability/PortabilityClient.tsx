// components/portability/PortabilityClient.tsx
'use client';

import Section1Profile from './Section1Profile';
import Section2Book from './Section2Book';
import Section3Geography from './Section3Geography';
import Section4Relationships from './Section4Relationships';
import Section5Analysis from './Section5Analysis';

export default function PortabilityClient() {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white body-grain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(1000px 380px at 110% 0%, rgba(245,231,192,.20) 0%, rgba(245,231,192,0) 60%)",
        }}
      />
      
      <div className="relative mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 rounded-2xl border border-white/10 bg-black/30 p-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10 mb-2">
            Executive Partners · Professional Diagnostic
          </div>
          
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Portability Readiness Diagnostic
          </h1>
          
          <p className="mt-2 text-sm text-white/70">
            Comprehensive assessment across client quality, regulatory infrastructure, product dependencies, and relationship strength.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <Section1Profile />
          <hr className="border-white/10" />
          
          <Section2Book />
          <hr className="border-white/10" />
          
          <Section3Geography />
          <hr className="border-white/10" />
          
          <Section4Relationships />
          <hr className="border-white/10" />
          
          <Section5Analysis />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-white/50">
          Confidential diagnostic • Data not stored without explicit consent
        </div>
      </div>
    </main>
  );
}