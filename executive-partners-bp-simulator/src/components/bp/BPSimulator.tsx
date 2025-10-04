'use client';

import React from 'react';
import Section1Basic from './Section1Basic';
import Section2NNM from './Section2NNM';
import Section3Prospects from './Section3Prospects';
import Section4Revenue from './Section4Revenue';
import Section5Analysis from './Section5Analysis';
import Section6Save from './Section6Save';

export default function BPSimulator() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-sm text-white/70">
          Enter your assumptions below. This mirrors your Streamlit logic:
          NNM → Revenue via ROA% → Fixed Cost = Base Salary × 1.25 → Net Margin per year + 3-year totals.
        </p>
      </div>

      <section aria-label="Basic information">
        <h2 className="mb-3 text-lg font-semibold">1️⃣ Basic Information</h2>
        <Section1Basic />
      </section>

      <section aria-label="Net New Money">
        <h2 className="mb-3 text-lg font-semibold">2️⃣ Net New Money</h2>
        <Section2NNM />
      </section>

      <section aria-label="Prospects">
        <h2 className="mb-3 text-lg font-semibold">3️⃣ Prospects</h2>
        <Section3Prospects />
      </section>

      <section aria-label="Revenue / Costs / Net Margin">
        <h2 className="mb-3 text-lg font-semibold">4️⃣ Revenue, Costs & Net Margin</h2>
        <Section4Revenue />
      </section>

      <section aria-label="Analysis">
        <h2 className="mb-3 text-lg font-semibold">5️⃣ Analysis</h2>
        <Section5Analysis />
      </section>

      <section aria-label="Save & Export">
        <h2 className="mb-3 text-lg font-semibold">6️⃣ Save & Export</h2>
        <Section6Save />
      </section>
    </div>
  );
}
