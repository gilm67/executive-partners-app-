'use client';

import dynamic from 'next/dynamic';

/* ---------- Minimal loading fallback ---------- */
const Fallback = ({ title }: { title: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/70">
    Loading {title}…
  </div>
);

/* ---------- Explicit dynamic imports (Sections 1–5 only) ---------- */
const Section1Basic = dynamic(
  () => import('../../../components/bp/Section1Basic'),
  { ssr: false, loading: () => <Fallback title="Section 1 – Basic Candidate Information" /> }
);

const Section2NNM = dynamic(
  () => import('../../../components/bp/Section2NNM'),
  { ssr: false, loading: () => <Fallback title="Section 2 – Net New Money (3Y)" /> }
);

const Section3Prospects = dynamic(
  () => import('../../../components/bp/Section3Prospects'),
  { ssr: false, loading: () => <Fallback title="Section 3 – Prospects" /> }
);

const Section4Revenue = dynamic(
  () => import('../../../components/bp/Section4Revenue'),
  { ssr: false, loading: () => <Fallback title="Section 4 – Revenue, Costs & Net Margin" /> }
);

const Section5Analysis = dynamic(
  () => import('../../../components/bp/Section5Analysis'),
  { ssr: false, loading: () => <Fallback title="Section 5 – AI Candidate Analysis" /> }
);

export default function BPClient() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">BP Simulator</h1>
      <p className="text-sm text-white/70">
        *Fields marked with an asterisk are mandatory and handled confidentially.
      </p>
      <hr className="border-white/10" />

      <Section1Basic />
      <hr className="border-white/10" />

      <Section2NNM />
      <hr className="border-white/10" />

      <Section3Prospects />
      <hr className="border-white/10" />

      <Section4Revenue />
      <hr className="border-white/10" />

      {/* Single Save/Download button lives inside Section 5 */}
      <Section5Analysis />
    </div>
  );
}
