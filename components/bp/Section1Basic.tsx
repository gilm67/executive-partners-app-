'use client';

import React from 'react';
import { useBP } from '@/components/bp/store';

// ── Guide component — shows when showTips is true ─────────
function Guide({ children, show }: { children: React.ReactNode; show?: boolean }) {
  if (!show) return null;
  return (
    <div className="mt-1.5 rounded-lg border-l-2 border-[#D4AF37]/35 bg-[#D4AF37]/5 pl-3 pr-2 py-2">
      <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{children}</p>
    </div>
  );
}

export default function Section1Basic({ showTips }: { showTips?: boolean }) {
  const i = useBP((s: any) => s.i);
  const set = useBP((s: any) => s.set);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">1️⃣ Basic Candidate Information</h2>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <Field label="Candidate Name">
            <input className="w-full bg-transparent outline-none" value={i.candidate_name}
              onChange={(e) => set({ candidate_name: e.target.value })} placeholder="Full name" />
          </Field>
          <Guide show={showTips}>
            Used in the PDF report header and EP follow-up. Does not need to be your full legal name at this stage.
          </Guide>
        </div>

        <div>
          <Field label="Candidate Email *">
            <input className="w-full bg-transparent outline-none" value={i.candidate_email}
              onChange={(e) => set({ candidate_email: e.target.value })} placeholder="your@email.com" />
          </Field>
          <Guide show={showTips}>
            Used only for EP follow-up and to send your PDF. Not shared with any institution without your explicit consent.
          </Guide>
        </div>

        <div>
          <Field label="Years of Experience *">
            <input type="number" min={0} className="w-full bg-transparent outline-none"
              value={i.years_experience} onChange={(e) => set({ years_experience: Number(e.target.value) || 0 })} />
          </Field>
          <Guide show={showTips}>
            Total years in private banking or wealth management front-office roles. Used in the committee readiness score —
            7+ years is the typical threshold for an autonomous senior hire at Tier-1 institutions.
          </Guide>
        </div>

        <div>
          <Field label="Inherited Book (% of AUM) *">
            <input type="number" min={0} max={100} className="w-full bg-transparent outline-none"
              value={i.inherited_book_pct} onChange={(e) => set({ inherited_book_pct: Number(e.target.value) || 0 })} />
          </Field>
          <Guide show={showTips}>
            What percentage of your current AUM was assigned to you by the institution rather than acquired through your own
            client relationships? High inherited book percentage (above 40%) reduces portability scoring significantly —
            clients who came with the desk are less likely to follow you personally.
          </Guide>
        </div>

        <div>
          <Field label="Current Role *">
            <select className="w-full bg-transparent outline-none" value={i.current_role}
              onChange={(e) => set({ current_role: e.target.value })}>
              {['Relationship Manager', 'Senior Relationship Manager', 'Assistant Relationship Manager',
                'Investment Advisor', 'Managing Director', 'Director', 'Team Head', 'Market Head', 'Other'
              ].map(x => <option key={x} value={x} className="bg-[#0B0E13]">{x}</option>)}
            </select>
          </Field>
          <Guide show={showTips}>
            Select the role title closest to your current position. This affects the cost multiplier and seniority
            assessment in the committee readiness score.
          </Guide>
        </div>

        <div>
          <Field label="Candidate Location *">
            <select className="w-full bg-transparent outline-none" value={i.candidate_location}
              onChange={(e) => set({ candidate_location: e.target.value })}>
              {['— Select —', 'Zurich', 'Geneva', 'Lausanne', 'Basel', 'Luzern', 'Dubai', 'London',
                'Hong Kong', 'Singapore', 'New York', 'Miami', 'Madrid', 'Lisbon', 'Sao Paulo', 'Paris', 'Milan'
              ].map(x => <option key={x} value={x} className="bg-[#0B0E13]">{x}</option>)}
            </select>
          </Field>
          <Guide show={showTips}>
            The city where you currently work — not where you are domiciled. This determines applicable
            social charge rates in the cost model and affects market threshold benchmarks.
          </Guide>
        </div>

        <div>
          <Field label="Current Employer *">
            <input className="w-full bg-transparent outline-none" value={i.current_employer}
              onChange={(e) => set({ current_employer: e.target.value })} placeholder="e.g. UBS, Julius Baer..." />
          </Field>
          <Guide show={showTips}>
            The institution you currently work for. Used in the EP narrative and to contextualise your AUM and
            ROA benchmarks against market norms for that institution type.
          </Guide>
        </div>

        <div>
          <Field label="Current Market *">
            <select className="w-full bg-transparent outline-none" value={i.current_market}
              onChange={(e) => set({ current_market: e.target.value })}>
              {['CH Onshore', 'UK', 'Portugal', 'Spain', 'Germany', 'MEA', 'LATAM', 'CIS', 'CEE',
                'France', 'Benelux', 'Asia', 'Argentina', 'Brazil', 'Conosur', 'NRI', 'India', 'US', 'China'
              ].map(x => <option key={x} value={x} className="bg-[#0B0E13]">{x}</option>)}
            </select>
          </Field>
          <Guide show={showTips}>
            The geographic market of your client base — not your personal location. A Geneva-based banker
            managing Russian-speaking clients should select CIS. The minimum AUM threshold varies by market:
            CHF 250M for CH Onshore, CHF 200M for most international markets.
          </Guide>
        </div>

        <div>
          <Field label="Currency *">
            <select className="w-full bg-transparent outline-none" value={i.currency}
              onChange={(e) => set({ currency: e.target.value })}>
              {['CHF', 'USD', 'EUR', 'AED', 'SGD', 'HKD'].map(x =>
                <option key={x} value={x} className="bg-[#0B0E13]">{x}</option>)}
            </select>
          </Field>
          <Guide show={showTips}>
            The currency in which your AUM, salary, and bonus are denominated. All P&L calculations
            will use this currency. If your book spans multiple currencies, use the primary booking currency.
          </Guide>
        </div>

        <div>
          <Field label={`Current Base Salary (${i.currency}) *`}>
            <input type="number" min={0} className="w-full bg-transparent outline-none"
              value={i.base_salary} onChange={(e) => set({ base_salary: Number(e.target.value) || 0 })} />
          </Field>
          <Guide show={showTips}>
            Your current gross annual base salary before bonus. This is used to calculate the all-in annual cost
            to the receiving institution (base × institution multiplier + sign-on amortisation). In Switzerland,
            Tier-1 institutions typically pay CHF 180K–320K base for senior RMs.
          </Guide>
        </div>

        <div>
          <Field label={`Last Bonus (${i.currency}) *`}>
            <input type="number" min={0} className="w-full bg-transparent outline-none"
              value={i.last_bonus} onChange={(e) => set({ last_bonus: Number(e.target.value) || 0 })} />
          </Field>
          <Guide show={showTips}>
            Your most recent annual bonus (gross). The ratio of bonus to base salary is used as a proxy for
            commercial profile — a high bonus-to-base ratio suggests a revenue-generating hunter profile
            rather than an inherited or relationship-maintenance book.
          </Guide>
        </div>

        <div>
          <Field label="Current Number of Clients *">
            <input type="number" min={0} className="w-full bg-transparent outline-none"
              value={i.current_number_clients}
              onChange={(e) => set({ current_number_clients: Number(e.target.value) || 0 })} />
          </Field>
          <Guide show={showTips}>
            The total number of active client relationships you manage. Above 80 clients typically indicates
            an affluent or lower-HNW book rather than true UHNW private banking — which affects committee
            confidence in AUM transfer projections. The ideal range for senior private banking mandates is 25–60 clients.
          </Guide>
        </div>

        <div>
          <Field label={`Current AUM (in million ${i.currency}) *`}>
            <input type="number" min={0} step="0.1" className="w-full bg-transparent outline-none"
              value={i.current_assets_m}
              onChange={(e) => set({ current_assets_m: Number(e.target.value) || 0 })} />
          </Field>
          <Guide show={showTips}>
            Your total assets under management today, in millions. Enter the full headline figure — the
            portability haircut (Section 4) will determine how much of this is realistically transferable.
            Do not pre-apply any discount here. If your book is split with a team or EAM, enter only
            the portion for which you are the primary relationship manager.
          </Guide>
        </div>

      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1 text-sm" style={{ color: "rgba(255,255,255,0.80)" }}>
      <div className="font-medium" style={{ color: "#ffffff" }}>{label}</div>
      <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">{children}</div>
    </label>
  );
}
