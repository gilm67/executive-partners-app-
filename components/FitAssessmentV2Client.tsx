'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  aumRange: string; feeIncome: string; portabilityEstimate: string
  institutionType: string; seniority: string; primaryGeography: string
  secondaryGeography: string; clientTier: string; languages: string[]
  mandateStyle: string; employmentStructure: string; targetBookingCentre: string
  priorityFactor: string; noticePeriod: string; nonSolicitation: string
  moveMotivation: string; name: string; email: string
}

interface TopMarket {
  city: string; flag: string; fitLevel: string
  rationale: string; hiringContext: string; keyRequirement?: string
}

interface AssessmentResult {
  headline: string; overallFit: string; positioning: string
  commercialSummary: string; topMarkets: TopMarket[]
  strengths: string[]; gaps: string[]
  legalNote?: string; timingNote?: string
  epAssessment: string; urgency: string
  jobsUrl?: string; jobsMarketLabel?: string
  matchedMandates?: { id: string; title: string; subtitle: string; location: string; aum: string; flag: string; url: string }[]
}

const INIT: FormData = {
  aumRange: '', feeIncome: '', portabilityEstimate: '', institutionType: '', seniority: '',
  primaryGeography: '', secondaryGeography: '', clientTier: '', languages: [],
  mandateStyle: '', employmentStructure: '', targetBookingCentre: '', priorityFactor: '',
  noticePeriod: '', nonSolicitation: '', moveMotivation: '', name: '', email: '',
}

const FC: Record<string, string> = {
  Exceptional: '#10b981', Strong: '#10b981', Good: '#f59e0b',
  Moderate: '#f97316', Limited: '#ef4444', Weak: '#ef4444',
}
const FB: Record<string, string> = {
  Exceptional: 'rgba(16,185,129,0.10)', Strong: 'rgba(16,185,129,0.10)',
  Good: 'rgba(245,158,11,0.10)', Moderate: 'rgba(249,115,22,0.10)',
  Limited: 'rgba(239,68,68,0.10)', Weak: 'rgba(239,68,68,0.10)',
}
const SCORE: Record<string, number> = {
  Exceptional: 96, Strong: 81, Good: 65, Moderate: 46, Limited: 26,
}

// ─── Custom dropdown ──────────────────────────────────────────────────────────

interface Opt { value: string; label: string; sub?: string }

function Select({ value, onChange, options, placeholder = 'Select an option' }: {
  value: string; onChange: (v: string) => void; options: Opt[]; placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const sel = options.find(o => o.value === value)

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button" onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 12,
          background: open ? 'rgba(201,169,110,0.07)' : value ? 'rgba(201,169,110,0.04)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${open ? 'rgba(201,169,110,0.5)' : value ? 'rgba(201,169,110,0.28)' : 'rgba(255,255,255,0.09)'}`,
          borderRadius: 10, padding: '14px 18px', cursor: 'pointer',
          transition: 'all 0.18s', textAlign: 'left', outline: 'none', WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span style={{ fontSize: 13.5, color: sel ? '#e8d5c4' : 'rgba(255,255,255,0.28)', fontWeight: 400, flex: 1 }}>
          {sel ? sel.label : placeholder}
        </span>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          <path d="M2 4.5L6.5 9L11 4.5" stroke="#C9A96E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 5px)', left: 0, right: 0, zIndex: 60,
          background: '#0c1220', border: '1px solid rgba(201,169,110,0.2)',
          borderRadius: 10, overflow: 'hidden auto', maxHeight: 290,
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
        }}>
          {options.map((opt, i) => (
            <button
              key={opt.value} type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              style={{
                width: '100%', textAlign: 'left', padding: '12px 18px',
                background: opt.value === value ? 'rgba(201,169,110,0.11)' : 'transparent',
                border: 'none', borderBottom: i < options.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', gap: 12, transition: 'background 0.1s', outline: 'none',
              }}
              onMouseEnter={e => { if (opt.value !== value) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
              onMouseLeave={e => { if (opt.value !== value) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              onFocus={e => { (e.currentTarget as HTMLElement).style.outline = 'none' }}
            >
              <div>
                <div style={{ fontSize: 13, color: opt.value === value ? '#e8d5a3' : '#c0cfe0', lineHeight: 1.4 }}>{opt.label}</div>
                {opt.sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>{opt.sub}</div>}
              </div>
              {opt.value === value && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M2 6L4.8 8.8L10 3" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Chip multi-select ────────────────────────────────────────────────────────

function ChipSelect({ options, selected, toggle }: {
  options: [string, string][]; selected: string[]; toggle: (v: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
      {options.map(([val, label]) => {
        const on = selected.includes(val)
        return (
          <button key={val} type="button" onClick={() => toggle(val)} style={{
            padding: '7px 15px', borderRadius: 100, cursor: 'pointer', fontSize: 12, fontWeight: 500,
            background: on ? 'rgba(201,169,110,0.16)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${on ? 'rgba(201,169,110,0.5)' : 'rgba(255,255,255,0.08)'}`,
            color: on ? '#e8d5a3' : 'rgba(255,255,255,0.42)',
            transition: 'all 0.14s', letterSpacing: '0.01em',
          }}>
            {label}
          </button>
        )
      })}
    </div>
  )
}

// ─── Shared UI atoms ──────────────────────────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, height: '100%' }}>
      <div style={{ minHeight: 32 }}>
        <div style={{ color: '#C9A96E', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: 11, marginTop: 3, minHeight: 14 }}>{hint || '\u00A0'}</div>
      </div>
      {children}
    </div>
  )
}

function StepHeader({ n, title, subtitle }: { n: number; title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.38)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700, color: '#C9A96E',
        }}>{String(n).padStart(2, '0')}</div>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>of 5</span>
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 300, color: '#f1f5f9', letterSpacing: '-0.015em', margin: '0 0 7px', lineHeight: 1.25 }}>{title}</h2>
      <p style={{ color: 'rgba(255,255,255,0.33)', fontSize: 12.5, margin: 0, lineHeight: 1.6 }}>{subtitle}</p>
    </div>
  )
}

function NavRow({ onBack, onNext, nextLabel = 'Continue', disabled, loading }: {
  onBack?: () => void; onNext: () => void; nextLabel?: string; disabled?: boolean; loading?: boolean
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {onBack ? (
        <button type="button" onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.28)', cursor: 'pointer', fontSize: 12.5, padding: 0, display: 'flex', alignItems: 'center', gap: 5 }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8.5 2L4 6.5L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back
        </button>
      ) : <div />}
      <button type="button" onClick={onNext} disabled={disabled || loading} style={{
        background: disabled || loading ? 'rgba(255,255,255,0.05)' : '#C9A96E',
        color: disabled || loading ? 'rgba(255,255,255,0.18)' : '#080d16',
        border: 'none', borderRadius: 9, padding: '13px 30px',
        fontSize: 12.5, fontWeight: 700, letterSpacing: '0.04em',
        cursor: disabled || loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        {loading ? 'Generating…' : nextLabel}
        {!loading && !disabled && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8.5 6L4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )}
      </button>
    </div>
  )
}

// ─── Option data ──────────────────────────────────────────────────────────────

const GEO: Opt[] = [
  { value: 'gcc', label: 'GCC – UAE, Saudi Arabia, Qatar' },
  { value: 'israel', label: 'Israel' },
  { value: 'europe_france', label: 'Europe – France' },
  { value: 'europe_italy', label: 'Europe – Italy' },
  { value: 'europe_iberia', label: 'Europe – Iberia' },
  { value: 'europe_dach', label: 'Europe – DACH' },
  { value: 'latam_brazil', label: 'Latin America – Brazil' },
  { value: 'latam_mexico', label: 'Latin America – Mexico / Colombia' },
  { value: 'latam_southern', label: 'Latin America – Argentina / Chile' },
  { value: 'cee', label: 'CEE – Poland, Czech, Hungary' },
  { value: 'swiss_domestic', label: 'Swiss Domestic' },
  { value: 'uk_onshore', label: 'UK Onshore' },
  { value: 'apac_singapore', label: 'APAC – Singapore' },
  { value: 'apac_hk', label: 'APAC – Hong Kong' },
  { value: 'apac_other', label: 'APAC – Japan, Australia' },
  { value: 'nri', label: 'NRI – India' },
  { value: 'cis', label: 'CIS – Russia, Kazakhstan, Ukraine' },
  { value: 'mea', label: 'MEA – Africa, South Africa' },
  { value: 'multi', label: 'Multi-market' },
]

const LANGS: [string, string][] = [
  ['en','English'], ['fr','French'], ['de','German'], ['it','Italian'],
  ['ar','Arabic'], ['he','Hebrew'], ['ru','Russian'], ['pt','Portuguese'],
  ['es','Spanish'], ['zh','Mandarin'], ['tr','Turkish'], ['pl','Polish/Czech'],
  ['hi','Hindi/Gujarati'], ['other','Other'],
]

// ─── Form steps ───────────────────────────────────────────────────────────────

function Step1({ f, set, onNext }: { f: FormData; set: (k: keyof FormData, v: string) => void; onNext: () => void }) {
  const ok = !!(f.aumRange && f.feeIncome && f.portabilityEstimate && f.institutionType && f.seniority)
  return (
    <>
      <StepHeader n={1} title="Commercial Profile" subtitle="AUM, revenue, and portability together define your commercial proposition to any hiring institution." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'start' }}>
          <Field label="AUM under management">
            <Select value={f.aumRange} onChange={v => set('aumRange', v)} options={[
              { value: 'under_50m', label: 'Under CHF 50M' },
              { value: '50m_150m', label: 'CHF 50M – 150M' },
              { value: '150m_500m', label: 'CHF 150M – 500M', sub: 'Core senior RM range' },
              { value: '500m_1b', label: 'CHF 500M – 1B', sub: 'Team Head / MD territory' },
              { value: 'above_1b', label: 'Above CHF 1B', sub: 'Market Head profile' },
            ]} placeholder="Select AUM range" />
          </Field>
          <Field label="Annual fee income" hint="Gross, incl. retrocessions">
            <Select value={f.feeIncome} onChange={v => set('feeIncome', v)} options={[
              { value: 'under_500k', label: 'Under CHF 500K' },
              { value: '500k_1m', label: 'CHF 500K – 1M' },
              { value: '1m_2m', label: 'CHF 1M – 2M', sub: 'Strong senior RM profile' },
              { value: '2m_5m', label: 'CHF 2M – 5M', sub: 'Top performer / team head' },
              { value: 'above_5m', label: 'Above CHF 5M', sub: 'Leadership mandate' },
            ]} placeholder="Select fee range" />
          </Field>
        </div>
        <Field label="Estimated portable AUM" hint="Realistic % that follows you to a new platform">
          <Select value={f.portabilityEstimate} onChange={v => set('portabilityEstimate', v)} options={[
            { value: 'under_30', label: 'Under 30%', sub: 'High custody / EAM-locked' },
            { value: '30_50', label: '30 – 50%', sub: 'Moderate portability' },
            { value: '50_70', label: '50 – 70%', sub: 'Good — typical senior range' },
            { value: '70_90', label: '70 – 90%', sub: 'Strong portability' },
            { value: 'above_90', label: 'Above 90%', sub: 'Fully relationship-driven' },
          ]} placeholder="Select portability estimate" />
        </Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'start' }}>
          <Field label="Current institution type">
            <Select value={f.institutionType} onChange={v => set('institutionType', v)} options={[
              { value: 'universal_bank', label: 'Universal bank wealth division', sub: 'UBS, BNP Paribas WM, HSBC Private Bank, Deutsche Bank' },
              { value: 'swiss_pure_play', label: 'Swiss independent private bank', sub: 'Pictet, Lombard Odier, Julius Baer, UBP, Mirabaud, EFG' },
              { value: 'intl_private_bank', label: 'Foreign-headquartered private bank', sub: 'JPMorgan PB, Citi Private Bank, Barclays, Coutts' },
              { value: 'eam', label: 'External Asset Manager (EAM)' },
              { value: 'family_office', label: 'Family Office / MFO' },
              { value: 'other', label: 'Other / prefer not to say' },
            ]} placeholder="Select institution type" />
          </Field>
          <Field label="Seniority level">
            <Select value={f.seniority} onChange={v => set('seniority', v)} options={[
              { value: 'ia_rm', label: 'Investment Advisor / RM' },
              { value: 'senior_rm', label: 'Senior Relationship Manager' },
              { value: 'team_head_md', label: 'Team Head / MD' },
              { value: 'market_head', label: 'Market Head / Regional Head' },
            ]} placeholder="Select seniority" />
          </Field>
        </div>
      </div>
      <NavRow onNext={onNext} disabled={!ok} />
    </>
  )
}

function Step2({ f, set, toggleLang, onBack, onNext }: {
  f: FormData; set: (k: keyof FormData, v: string) => void
  toggleLang: (l: string) => void; onBack: () => void; onNext: () => void
}) {
  const ok = !!(f.primaryGeography && f.clientTier && f.languages.length > 0)
  const secGeo = [{ value: 'none', label: 'None — single market only' }, ...GEO.filter(o => o.value !== f.primaryGeography)]
  return (
    <>
      <StepHeader n={2} title="Client Focus" subtitle="Geography and language are the primary filters institutions apply when assessing real-world market access." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'start' }}>
          <Field label="Primary client geography">
            <Select value={f.primaryGeography} onChange={v => set('primaryGeography', v)} options={GEO} placeholder="Select primary geography" />
          </Field>
          <Field label="Secondary market" hint="Optional">
            <Select value={f.secondaryGeography} onChange={v => set('secondaryGeography', v)} options={secGeo} placeholder="None / single market" />
          </Field>
        </div>
        <Field label="Client tier">
          <Select value={f.clientTier} onChange={v => set('clientTier', v)} options={[
            { value: 'hnw', label: 'HNW — CHF 1M to 10M' },
            { value: 'uhnw', label: 'UHNW — CHF 10M to 50M' },
            { value: 'vhnw_fo', label: 'VHNW / Family Office — CHF 50M+' },
            { value: 'mixed', label: 'Mixed HNW / UHNW' },
          ]} placeholder="Select client tier" />
        </Field>
        <Field label="Client languages spoken" hint="Select all that apply — this directly determines which markets are structurally open">
          <ChipSelect options={LANGS} selected={f.languages} toggle={toggleLang} />
        </Field>
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!ok} />
    </>
  )
}

function Step3({ f, set, onBack, onNext }: {
  f: FormData; set: (k: keyof FormData, v: string) => void; onBack: () => void; onNext: () => void
}) {
  const ok = !!(f.mandateStyle && f.employmentStructure && f.targetBookingCentre && f.priorityFactor)
  return (
    <>
      <StepHeader n={3} title="Career Preferences" subtitle="Mandate style and employment structure shape which opportunities are realistically accessible." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'start' }}>
          <Field label="Mandate style">
            <Select value={f.mandateStyle} onChange={v => set('mandateStyle', v)} options={[
              { value: 'hunter', label: 'Hunter', sub: 'New asset origination' },
              { value: 'farmer', label: 'Farmer', sub: 'Relationship deepening' },
              { value: 'both', label: 'Hunter + Farmer', sub: 'Comfortable with both' },
            ]} placeholder="Select mandate style" />
          </Field>
          <Field label="Employment structure">
            <Select value={f.employmentStructure} onChange={v => set('employmentStructure', v)} options={[
              { value: 'employed_pb', label: 'Employed private bank', sub: 'Full-time salaried' },
              { value: 'eam', label: 'External Asset Manager', sub: 'Independent, own contracts' },
              { value: 'both', label: 'Open to both' },
            ]} placeholder="Select structure" />
          </Field>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'start' }}>
          <Field label="Target booking centre">
            <Select value={f.targetBookingCentre} onChange={v => set('targetBookingCentre', v)} options={[
              { value: 'geneva', label: 'Geneva' }, { value: 'zurich', label: 'Zurich' },
              { value: 'dubai', label: 'Dubai (DIFC)' }, { value: 'abu_dhabi', label: 'Abu Dhabi (ADGM)' },
              { value: 'singapore', label: 'Singapore' }, { value: 'hong_kong', label: 'Hong Kong' },
              { value: 'london', label: 'London' }, { value: 'luxembourg', label: 'Luxembourg' },
              { value: 'liechtenstein', label: 'Liechtenstein' }, { value: 'monaco', label: 'Monaco' },
              { value: 'tel_aviv', label: 'Tel Aviv' }, { value: 'miami', label: 'Miami' },
              { value: 'new_york', label: 'New York' }, { value: 'multiple', label: 'Multiple / Flexible' },
            ]} placeholder="Select booking centre" />
          </Field>
          <Field label="Primary driver for next move">
            <Select value={f.priorityFactor} onChange={v => set('priorityFactor', v)} options={[
              { value: 'compensation', label: 'Compensation', sub: 'Better revenue share or package' },
              { value: 'brand', label: 'Platform brand', sub: 'Name and backing' },
              { value: 'market', label: 'Market opportunity', sub: 'Better geography or access' },
              { value: 'autonomy', label: 'Autonomy', sub: 'Independence and flexibility' },
              { value: 'culture', label: 'Culture / Leadership', sub: 'Stability and quality' },
              { value: 'growth', label: 'Growth / Promotion', sub: 'Clear senior path' },
            ]} placeholder="Select primary driver" />
          </Field>
        </div>
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!ok} />
    </>
  )
}

function Step4({ f, set, onBack, onNext }: {
  f: FormData; set: (k: keyof FormData, v: string) => void; onBack: () => void; onNext: () => void
}) {
  const ok = !!(f.noticePeriod && f.nonSolicitation && f.moveMotivation)
  return (
    <>
      <StepHeader n={4} title="Timing & Constraints" subtitle="Legal restrictions and notice periods directly determine which mandates can be realistically pursued." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'start' }}>
          <Field label="Availability / notice period">
            <Select value={f.noticePeriod} onChange={v => set('noticePeriod', v)} options={[
              { value: 'immediate', label: 'Available immediately' },
              { value: '1_3m', label: '1 – 3 months', sub: 'Standard notice' },
              { value: '3_6m', label: '3 – 6 months', sub: 'Extended / senior' },
              { value: '6_12m', label: '6 – 12 months', sub: 'MD-level or contractual' },
              { value: 'exploring', label: 'Exploring only — no firm timeline' },
            ]} placeholder="Select availability" />
          </Field>
          <Field label="Non-solicitation clause" hint="Materially affects which firms can approach you">
            <Select value={f.nonSolicitation} onChange={v => set('nonSolicitation', v)} options={[
              { value: 'active', label: 'Active restriction', sub: '12–24 month clause running' },
              { value: 'expired', label: 'Expired or expiring soon', sub: 'No longer binding' },
              { value: 'none', label: 'No restriction in place' },
              { value: 'unsure', label: 'Unsure — need to check contract' },
            ]} placeholder="Select status" />
          </Field>
        </div>
        <Field label="Primary motivation for exploring a move">
          <Select value={f.moveMotivation} onChange={v => set('moveMotivation', v)} options={[
            { value: 'comp', label: 'Compensation / Economics' },
            { value: 'leadership', label: 'Leadership or management change' },
            { value: 'strategy', label: 'Strategic direction of firm' },
            { value: 'opportunity', label: 'Market or geography opportunity' },
            { value: 'personal', label: 'Personal / lifestyle reasons' },
            { value: 'platform', label: 'Platform or technology limitations' },
          ]} placeholder="Select primary motivation" />
        </Field>
      </div>
      <NavRow onBack={onBack} onNext={onNext} disabled={!ok} />
    </>
  )
}

function Step5({ f, set, onBack, onSubmit, loading, error }: {
  f: FormData; set: (k: keyof FormData, v: string) => void
  onBack: () => void; onSubmit: () => void; loading: boolean; error: string
}) {
  return (
    <>
      <StepHeader n={5} title="Receive your assessment" subtitle="Generated instantly and personally reviewed by Gil M. Chalem against live market activity within 48 hours." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Name" hint="Optional">
          <input value={f.name} onChange={e => set('name', e.target.value)} placeholder="Your name"
            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 18px', color: '#f1f5f9', fontSize: 13.5, outline: 'none' }} />
        </Field>
        <Field label="Email address" hint="Your assessment is delivered here — no CV required, no unsolicited contact">
          <input type="email" value={f.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com"
            style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.03)', border: `1px solid ${f.email ? 'rgba(201,169,110,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 10, padding: '14px 18px', color: '#f1f5f9', fontSize: 13.5, outline: 'none' }} />
        </Field>
        {error && (
          <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 9, padding: '12px 16px', color: '#fca5a5', fontSize: 13 }}>{error}</div>
        )}
      </div>
      <NavRow onBack={onBack} onNext={onSubmit} nextLabel="Generate Assessment" disabled={!f.email} loading={loading} />
      {loading && (
        <p style={{ textAlign: 'center', color: '#C9A96E', fontSize: 12, marginTop: 16, fontWeight: 500 }}>
          This usually takes 30-60 seconds. Please keep this page open and avoid clicking again.
        </p>
      )}
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.16)', fontSize: 11, marginTop: 18 }}>
        No CV required · Strictly confidential · Swiss data protection
      </p>
    </>
  )
}

// ─── Score arc ────────────────────────────────────────────────────────────────

function Arc({ score, color }: { score: number; color: string }) {
  const r = 40, cx = 50, cy = 50, circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  return (
    <svg width={100} height={100} viewBox="0 0 100 100">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`} />
      <text x={cx} y={cy + 6} textAnchor="middle" fill={color} fontSize={17} fontWeight={300} fontFamily="Inter,system-ui,sans-serif">{score}</text>
    </svg>
  )
}

// ─── Results page ─────────────────────────────────────────────────────────────

function Results({ result, name }: { result: AssessmentResult; name: string }) {
  const fc = FC[result.overallFit] || '#C9A96E'
  const fb = FB[result.overallFit] || 'rgba(201,169,110,0.1)'
  const sc = SCORE[result.overallFit] || 65
  const card = (children: React.ReactNode, style?: React.CSSProperties) => (
    <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '22px 26px', ...style }}>{children}</div>
  )
  const sLabel = (text: string, color = '#C9A96E') => (
    <div style={{ color, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>{text}</div>
  )

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <div style={{ color: '#C9A96E', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
          Executive Partners · Market Intelligence Report
        </div>
        <div style={{ display: 'inline-block', marginBottom: 16 }}>
          <Arc score={sc} color={fc} />
        </div>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: fb, border: `1px solid ${fc}40`, borderRadius: 100, padding: '5px 15px', marginBottom: 16 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: fc }} />
            <span style={{ color: fc, fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{result.overallFit} Market Fit</span>
          </div>
        </div>
        <h1 style={{ fontSize: 'clamp(18px,3.5vw,30px)', fontWeight: 300, color: '#f1f5f9', letterSpacing: '-0.02em', margin: '0 0 10px', lineHeight: 1.3 }}>
          {result.headline}
        </h1>
        {name && <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 12.5, margin: 0 }}>Assessment prepared for {name}</p>}
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 20 }} />

      {/* Position + commercial */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        {card(<><div>{sLabel('Market Position')}</div><p style={{ color: '#7a8fa6', fontSize: 13, lineHeight: 1.75, margin: 0 }}>{result.positioning}</p></>)}
        {card(<><div>{sLabel('Commercial Value')}</div><p style={{ color: '#7a8fa6', fontSize: 13, lineHeight: 1.75, margin: 0 }}>{result.commercialSummary}</p></>)}
      </div>

      {/* Top markets */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ color: '#C9A96E', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Top Market Matches</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {result.topMarkets.map((m, i) => {
            const mc = FC[m.fitLevel] || '#C9A96E', mb = FB[m.fitLevel] || 'rgba(201,169,110,0.1)'
            return (
              <div key={i} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '18px 22px', display: 'flex', gap: 14 }}>
                <div style={{ fontSize: 22, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{m.flag}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginBottom: 7 }}>
                    <span style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 500 }}>{m.city}</span>
                    <span style={{ background: mb, color: mc, fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 100, border: `1px solid ${mc}35`, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{m.fitLevel}</span>
                  </div>
                  <p style={{ color: '#6e8099', fontSize: 12.5, lineHeight: 1.65, margin: '0 0 5px' }}>{m.rationale}</p>
                  <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: 11.5, fontStyle: 'italic', margin: 0 }}>{m.hiringContext}</p>
                  {m.keyRequirement && (
                    <div style={{ marginTop: 9, background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.16)', borderRadius: 6, padding: '7px 12px', color: '#C9A96E', fontSize: 11 }}>
                      Threshold: {m.keyRequirement}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Strengths + gaps */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.12)', borderRadius: 12, padding: '20px 22px' }}>
          {sLabel('What opens doors', '#10b981')}
          <ul style={{ margin: 0, padding: '0 0 0 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {result.strengths.map((s, i) => <li key={i} style={{ color: '#6e8099', fontSize: 12.5, lineHeight: 1.55 }}>{s}</li>)}
          </ul>
        </div>
        <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: 12, padding: '20px 22px' }}>
          {sLabel('What limits options', '#ef4444')}
          <ul style={{ margin: 0, padding: '0 0 0 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {result.gaps.map((g, i) => <li key={i} style={{ color: '#6e8099', fontSize: 12.5, lineHeight: 1.55 }}>{g}</li>)}
          </ul>
        </div>
      </div>

      {/* Legal / timing */}
      {(result.legalNote || result.timingNote) && (
        <div style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.16)', borderRadius: 12, padding: '20px 22px', marginBottom: 14 }}>
          {sLabel('Considerations', '#f59e0b')}
          {result.legalNote && <p style={{ color: '#6e8099', fontSize: 12.5, lineHeight: 1.65, margin: result.timingNote ? '0 0 8px' : 0 }}>{result.legalNote}</p>}
          {result.timingNote && <p style={{ color: '#6e8099', fontSize: 12.5, lineHeight: 1.65, margin: 0 }}>{result.timingNote}</p>}
        </div>
      )}

      {/* Matched live mandates */}
      {result.matchedMandates && result.matchedMandates.length > 0 ? (
        <div style={{ marginBottom: 14 }}>
          <div style={{ color: '#C9A96E', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Live mandates matching your profile</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {result.matchedMandates.map((m, i) => (
              <a key={i} href={m.url} target="_blank" rel="noopener noreferrer" style={{
                background: 'rgba(201,169,110,0.045)', border: '1px solid rgba(201,169,110,0.18)', borderRadius: 12,
                padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center', textDecoration: 'none',
              }}>
                <div style={{ fontSize: 20, flexShrink: 0 }}>{m.flag}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#f1f5f9', fontSize: 13.5, fontWeight: 500, marginBottom: 2 }}>{m.title}</div>
                  {m.subtitle && (
                    <div style={{ color: '#C9A96E', fontSize: 11, fontWeight: 500, marginBottom: 2 }}>{m.subtitle}</div>
                  )}
                  <div style={{ color: '#7a8fa6', fontSize: 12 }}>Booked in {m.location}{m.aum ? ` · ${m.aum}` : ''}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}><path d="M4.5 2L9.5 7L4.5 12" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            ))}
          </div>
        </div>
      ) : result.jobsUrl && (
        <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '18px 22px', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#C9A96E', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>Live mandates</div>
            <p style={{ color: '#7a8fa6', fontSize: 12.5, margin: 0 }}>No exact match right now — browse current open roles in {result.jobsMarketLabel}</p>
          </div>
          <a href={result.jobsUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: '#C9A96E', textDecoration: 'none', fontSize: 12.5, fontWeight: 600, border: '1px solid rgba(201,169,110,0.3)', borderRadius: 8, padding: '9px 16px', whiteSpace: 'nowrap' }}>
            View open mandates
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8.5 6L4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      )}

      {/* EP assessment CTA */}
      <div style={{ background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 16, padding: '36px 40px', textAlign: 'center' }}>
        {sLabel("EP's assessment")}
        <p style={{ color: '#a0b4c8', fontSize: 13.5, lineHeight: 1.8, margin: '0 auto 26px', maxWidth: 500 }}>{result.epAssessment}</p>
        <a href="https://calendly.com/execpartners/15-minute-career-consultation" target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#C9A96E', color: '#080d16', textDecoration: 'none', borderRadius: 9, padding: '14px 34px', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em' }}>
          Schedule a Confidential Call
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8.5 6L4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, marginTop: 14 }}>15 minutes · No obligation · Senior-level only</p>
      </div>

      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.42)', fontSize: 11.5, lineHeight: 1.75, marginTop: 40 }}>
        Executive Partners · Geneva · execpartners.ch · recruiter@execpartners.ch<br />
        Assessment based on structural market dynamics only. All submissions treated with absolute discretion under Swiss data protection standards.
      </p>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function FitAssessmentV2Client() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(INIT)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [error, setError] = useState('')

  const set = useCallback((k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v })), [])
  const toggle = useCallback((l: string) => setForm(f => ({
    ...f, languages: f.languages.includes(l) ? f.languages.filter(x => x !== l) : [...f.languages, l],
  })), [])

  const submit = async () => {
    if (!form.email) return
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/fit-assessment-v2', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Assessment failed')
      setResult(data.result); setStep(6)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally { setLoading(false) }
  }

  const BG = '#080d16'

  if (step === 6 && result) {
    return <div style={{ minHeight: '100vh', background: BG, color: '#e2e8f0', fontFamily: 'Inter,system-ui,sans-serif' }}><Results result={result} name={form.name} /></div>
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, color: '#e2e8f0', fontFamily: 'Inter,system-ui,sans-serif', padding: '60px 20px 80px' }}>

      {/* Page header */}
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <div style={{ color: '#C9A96E', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
          Executive Partners · Market Intelligence
        </div>
        <h1 style={{ fontSize: 'clamp(22px,4.5vw,38px)', fontWeight: 300, color: '#f1f5f9', letterSpacing: '-0.02em', margin: '0 0 10px', lineHeight: 1.2 }}>
          Private Bank Fit Assessment
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: 13, maxWidth: 440, margin: '0 auto', lineHeight: 1.65 }}>
          A candid, expert analysis of your market position — calibrated to your commercial profile. Reviewed against live mandates within 48 hours.
        </p>
      </div>

      {/* Progress line */}
      <div style={{ maxWidth: 660, margin: '0 auto 32px', height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${((step - 1) / 4) * 100}%`, background: 'linear-gradient(90deg,rgba(201,169,110,0.45),#C9A96E)', borderRadius: 2, transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>

      {/* Step labels */}
      <div style={{ maxWidth: 660, margin: '0 auto 32px', display: 'flex', justifyContent: 'space-between' }}>
        {['Commercial', 'Client Focus', 'Preferences', 'Timing', 'Contact'].map((label, i) => (
          <div key={i} style={{ fontSize: 10, color: step === i + 1 ? '#C9A96E' : 'rgba(255,255,255,0.18)', fontWeight: step === i + 1 ? 700 : 400, letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center', flex: 1 }}>
            {label}
          </div>
        ))}
      </div>

      {/* Form card */}
      <div style={{ maxWidth: 660, margin: '0 auto', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 18, padding: '44px 44px 36px' }}>
        {step === 1 && <Step1 f={form} set={set} onNext={() => setStep(2)} />}
        {step === 2 && <Step2 f={form} set={set} toggleLang={toggle} onBack={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && <Step3 f={form} set={set} onBack={() => setStep(2)} onNext={() => setStep(4)} />}
        {step === 4 && <Step4 f={form} set={set} onBack={() => setStep(3)} onNext={() => setStep(5)} />}
        {step === 5 && <Step5 f={form} set={set} onBack={() => setStep(4)} onSubmit={submit} loading={loading} error={error} />}
      </div>

      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.15)', fontSize: 11, marginTop: 20 }}>
        No CV required · Strictly confidential · No bank names disclosed
      </p>
    </div>
  )
}
