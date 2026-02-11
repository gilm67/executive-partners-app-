'use client';

import React from 'react';
import { useBP } from '@/components/bp/store';

export default function Section1Basic() {
  // ✅ Use selectors (more stable + avoids rerenders)
  const i = useBP((s: any) => s.i);
  const set = useBP((s: any) => s.set);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">1️⃣ Basic Candidate Information</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Candidate Name">
          <input
            className="w-full bg-transparent outline-none"
            value={i.candidate_name}
            onChange={(e) => set({ candidate_name: e.target.value })}
          />
        </Field>

        <Field label="Candidate Email *">
          <input
            className="w-full bg-transparent outline-none"
            value={i.candidate_email}
            onChange={(e) => set({ candidate_email: e.target.value })}
          />
        </Field>

        <Field label="Years of Experience *">
          <input
            type="number"
            min={0}
            className="w-full bg-transparent outline-none"
            value={i.years_experience}
            onChange={(e) => set({ years_experience: Number(e.target.value) || 0 })}
          />
        </Field>

        <Field label="Inherited Book (% of AUM) *">
          <input
            type="number"
            min={0}
            max={100}
            className="w-full bg-transparent outline-none"
            value={i.inherited_book_pct}
            onChange={(e) => set({ inherited_book_pct: Number(e.target.value) || 0 })}
          />
        </Field>

        <Field label="Current Role *">
          <select
            className="w-full bg-transparent outline-none"
            value={i.current_role}
            onChange={(e) => set({ current_role: e.target.value })}
          >
            {[
              'Relationship Manager',
              'Senior Relationship Manager',
              'Assistant Relationship Manager',
              'Investment Advisor',
              'Managing Director',
              'Director',
              'Team Head',
              'Market Head',
              'Other',
            ].map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Candidate Location *">
          <select
            className="w-full bg-transparent outline-none"
            value={i.candidate_location}
            onChange={(e) => set({ candidate_location: e.target.value })}
          >
            {[
              '— Select —',
              'Zurich',
              'Geneva',
              'Lausanne',
              'Basel',
              'Luzern',
              'Dubai',
              'London',
              'Hong Kong',
              'Singapore',
              'New York',
              'Miami',
              'Madrid',
              'Lisbon',
              'Sao Paulo',
            ].map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Current Employer *">
          <input
            className="w-full bg-transparent outline-none"
            value={i.current_employer}
            onChange={(e) => set({ current_employer: e.target.value })}
          />
        </Field>

        <Field label="Current Market *">
          <select
            className="w-full bg-transparent outline-none"
            value={i.current_market}
            onChange={(e) => set({ current_market: e.target.value })}
          >
            {[
              'CH Onshore',
              'UK',
              'Portugal',
              'Spain',
              'Germany',
              'MEA',
              'LATAM',
              'CIS',
              'CEE',
              'France',
              'Benelux',
              'Asia',
              'Argentina',
              'Brazil',
              'Conosur',
              'NRI',
              'India',
              'US',
              'China',
            ].map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Currency *">
          <select
            className="w-full bg-transparent outline-none"
            value={i.currency}
            onChange={(e) => set({ currency: e.target.value })}
          >
            {['CHF', 'USD', 'EUR', 'AED', 'SGD', 'HKD'].map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </Field>

        <Field label={`Current Base Salary (${i.currency}) *`}>
          <input
            type="number"
            min={0}
            className="w-full bg-transparent outline-none"
            value={i.base_salary}
            onChange={(e) => set({ base_salary: Number(e.target.value) || 0 })}
          />
        </Field>

        <Field label={`Last Bonus (${i.currency}) *`}>
          <input
            type="number"
            min={0}
            className="w-full bg-transparent outline-none"
            value={i.last_bonus}
            onChange={(e) => set({ last_bonus: Number(e.target.value) || 0 })}
          />
        </Field>

        <Field label="Current Number of Clients *">
          <input
            type="number"
            min={0}
            className="w-full bg-transparent outline-none"
            value={i.current_number_clients}
            onChange={(e) => set({ current_number_clients: Number(e.target.value) || 0 })}
          />
        </Field>

        <Field label="Current AUM (in million CHF) *">
          <input
            type="number"
            min={0}
            step="0.1"
            className="w-full bg-transparent outline-none"
            value={i.current_assets_m}
            onChange={(e) => set({ current_assets_m: Number(e.target.value) || 0 })}
          />
        </Field>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1 text-sm text-white/80">
      <div className="font-medium text-white">{label}</div>
      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">{children}</div>
    </label>
  );
}