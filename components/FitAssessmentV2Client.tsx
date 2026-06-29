'use client'

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 'result'

interface FormData {
  aumRange: string
  revenueRange: string
  portabilityEstimate: string
  clientTier: string
  seniority: string
  institutionType: string
  primaryGeography: string
  languages: string[]
  mandateStyle: string
  employmentStructure: string
  regulatoryLicence: string
  targetBookingCentre: string
  timeline: string
  legalConstraints: string
  name: string
  email: string
}

interface MarketFit {
  market: string
  fitLabel: 'Excellent' | 'Strong' | 'Moderate' | 'Limited'
  rationale: string
  openDoors: string[]
  constraints: string | null
}

interface AssessmentResult {
  executiveSummary: string
  overallFitScore: number
  overallFitLabel: string
  commercialProfile: { rating: string; rationale: string }
  portabilityRisk: { rating: string; rationale: string }
  marketFit: MarketFit[]
  strengtheners: string[]
  recommendedNextStep: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LANGUAGES = [
  'English', 'French', 'German', 'Italian', 'Spanish', 'Portuguese',
  'Arabic', 'Hebrew', 'Russian', 'Mandarin', 'Hindi', 'Turkish',
  'Polish', 'Greek', 'Dutch', 'Other',
]

const INITIAL_FORM: FormData = {
  aumRange: '', revenueRange: '', portabilityEstimate: '', clientTier: '',
  seniority: '', institutionType: '', primaryGeography: '', languages: [],
  mandateStyle: '', employmentStructure: '', regulatoryLicence: '',
  targetBookingCentre: '', timeline: '', legalConstraints: '',
  name: '', email: '',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({ label, title, children, hint }: {
  label: string; title: string; children: React.ReactNode; hint?: string
}) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-xs text-amber-400/50 font-mono w-6 shrink-0">{label}</span>
        <h2 className="text-sm font-semibold text-white/90">{title}</h2>
      </div>
      {hint && <p className="text-xs text-white/35 mb-3 ml-8">{hint}</p>}
      <div className="ml-8">{children}</div>
    </div>
  )
}

function Radio({ value, label, sub, selected, onChange }: {
  value: string; label: string; sub?: string; selected: boolean; onChange: (v: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`w-full text-left px-4 py-3 rounded border text-sm transition-all ${
        selected
          ? 'border-amber-400 bg-amber-400/10 text-amber-100'
          : 'border-white/10 bg-white/5 text-white/65 hover:border-white/25 hover:text-white'
      }`}
    >
      <span className={`inline-block w-3.5 h-3.5 rounded-full border mr-3 align-middle shrink-0 transition-colors ${
        selected ? 'border-amber-400 bg-amber-400' : 'border-white/30'
      }`} />
      <span className="font-medium">{label}</span>
      {sub && <span className={`block ml-7 mt-0.5 text-xs ${selected ? 'text-amber-200/60' : 'text-white/30'}`}>{sub}</span>}
    </button>
  )
}

function CheckPill({ value, label, selected, onChange }: {
  value: string; label: string; selected: boolean; onChange: (v: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`px-3 py-2 rounded border text-xs font-medium transition-all ${
        selected
          ? 'border-amber-400 bg-amber-400/10 text-amber-200'
          : 'border-white/10 bg-white/5 text-white/50 hover:border-white/25 hover:text-white'
      }`}
    >
      {selected && <span className="mr-1.5">✓</span>}
      {label}
    </button>
  )
}

function NavButtons({ canNext, onNext, onBack, label = 'Continue →' }: {
  canNext: boolean; onNext: () => void; onBack?: () => void; label?: string
}) {
  return (
    <div className="space-y-2 pt-2">
      <button
        onClick={onNext}
        disabled={!canNext}
        className="w-full py-3.5 bg-amber-400 text-black font-semibold rounded text-sm hover:bg-amber-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        {label}
      </button>
      {onBack && (
        <button onClick={onBack} className="w-full py-2 text-white/35 text-sm hover:text-white/70 transition-colors">
          ← Back
        </button>
      )}
    </div>
  )
}

function ScoreRing({ score }: { score: number }) {
  const r = 52
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 75 ? '#f59e0b' : score >= 55 ? '#818cf8' : '#f87171'
  return (
    <div className="relative inline-flex items-center justify-center w-32 h-32">
      <svg width={128} height={128} className="-rotate-90">
        <circle cx={64} cy={64} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={8} />
        <circle
          cx={64} cy={64} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold text-white leading-none">{score}</div>
        <div className="text-xs text-white/40 mt-0.5">/100</div>
      </div>
    </div>
  )
}

function FitBadge({ label }: { label: string }) {
  const cls: Record<string, string> = {
    Excellent: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Strong:    'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Moderate:  'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    Limited:   'bg-red-500/15 text-red-300 border-red-500/30',
  }
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cls[label] ?? cls.Moderate}`}>
      {label}
    </span>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FitAssessmentV2Client() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [error, setError] = useState('')

  const set = (key: keyof FormData) => (val: string) =>
    setForm(prev => ({ ...prev, [key]: val }))

  const toggleLang = (lang: string) =>
    setForm(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang],
    }))

  const showLicenceQ = form.employmentStructure === 'eam'

  const valid = {
    1: !!(form.aumRange && form.revenueRange && form.portabilityEstimate && form.clientTier),
    2: !!(form.seniority && form.institutionType && form.primaryGeography && form.languages.length > 0),
    3: !!(form.mandateStyle && form.employmentStructure && form.targetBookingCentre &&
          form.timeline && form.legalConstraints && (!showLicenceQ || form.regulatoryLicence)),
    4: !!(form.email && form.email.includes('@') && form.email.includes('.')),
  }

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/fit-assessment-v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Assessment failed')
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data.assessment)
      setStep('result')
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const progress = step === 'result' ? 100 : ((step as number) / 4) * 100

  const stepLabels = ['Commercial Footprint', 'Your Profile', 'Mandate Preferences', 'Contact']

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white">
      <div className="max-w-xl mx-auto px-5 py-14">

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-[10px] text-amber-400 font-semibold tracking-[0.2em] uppercase mb-3">
            Executive Partners · Market Intelligence
          </p>
          <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
            Private Bank<br />Fit Assessment
          </h1>
          <p className="text-white/45 text-sm leading-relaxed">
            A rigorous market positioning analysis calibrated to your specific commercial profile.
            Assessed against live market activity within 48 hours.
          </p>
          <p className="text-xs text-white/25 mt-2">
            Confidential · Discretion Guaranteed · No CV Required
          </p>
        </div>

        {/* Progress */}
        {step !== 'result' && (
          <div className="mb-8">
            <div className="flex justify-between text-[10px] text-white/30 mb-2">
              <span>Step {step as number} of 4</span>
              <span className="text-white/50">{stepLabels[(step as number) - 1]}</span>
            </div>
            <div className="h-0.5 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* ── STEP 1: Commercial Footprint ── */}
        {step === 1 && (
          <div className="space-y-7">
            <Section label="01" title="AUM Under Management">
              <div className="space-y-2">
                {([
                  ['under_50',  'Under CHF 50M'],
                  ['50_150',    'CHF 50M – 150M'],
                  ['150_500',   'CHF 150M – 500M'],
                  ['500_1b',    'CHF 500M – 1B'],
                  ['above_1b',  'Above CHF 1B'],
                ] as [string, string][]).map(([v, l]) => (
                  <Radio key={v} value={v} label={l} selected={form.aumRange === v} onChange={set('aumRange')} />
                ))}
              </div>
            </Section>

            <Section label="02" title="Annual Revenue Generated" hint="Your estimated annual fee income contribution to your current institution">
              <div className="space-y-2">
                {([
                  ['under_300k', 'Under CHF 300K'],
                  ['300k_600k', 'CHF 300K – 600K'],
                  ['600k_1m',   'CHF 600K – 1M'],
                  ['1m_2m',     'CHF 1M – 2M'],
                  ['above_2m',  'Above CHF 2M'],
                  ['prefer_not','Prefer not to disclose'],
                ] as [string, string][]).map(([v, l]) => (
                  <Radio key={v} value={v} label={l} selected={form.revenueRange === v} onChange={set('revenueRange')} />
                ))}
              </div>
            </Section>

            <Section label="03" title="Estimated AUM Portability" hint="What proportion of your book would realistically follow you to a new institution?">
              <div className="space-y-2">
                {([
                  ['0_20',     'Under 20%',     'Primarily institutional / discretionary mandates'],
                  ['20_40',    '20 – 40%',       'Mix of portable and institutionalised relationships'],
                  ['40_60',    '40 – 60%',       'Majority of relationships are personal'],
                  ['60_80',    '60 – 80%',       'Strong personal ties, few EAM conflicts'],
                  ['above_80', 'Above 80%',      'Fully portable book'],
                ] as [string, string, string][]).map(([v, l, s]) => (
                  <Radio key={v} value={v} label={l} sub={s} selected={form.portabilityEstimate === v} onChange={set('portabilityEstimate')} />
                ))}
              </div>
            </Section>

            <Section label="04" title="Client Tier">
              <div className="space-y-2">
                {([
                  ['hnw',   'HNW',          'CHF 1M – 10M per client'],
                  ['uhnw',  'UHNW',         'CHF 10M – 50M per client'],
                  ['vhnw',  'VHNW / Family Office', 'CHF 50M+ per client'],
                  ['mixed', 'Mixed HNW / UHNW', ''],
                ] as [string, string, string][]).map(([v, l, s]) => (
                  <Radio key={v} value={v} label={l} sub={s || undefined} selected={form.clientTier === v} onChange={set('clientTier')} />
                ))}
              </div>
            </Section>

            <NavButtons canNext={valid[1]} onNext={() => setStep(2)} />
          </div>
        )}

        {/* ── STEP 2: Your Profile ── */}
        {step === 2 && (
          <div className="space-y-7">
            <Section label="05" title="Seniority Level">
              <div className="space-y-2">
                {([
                  ['rm',          'Relationship Manager / Investment Advisor'],
                  ['senior_rm',   'Senior Relationship Manager'],
                  ['team_head',   'Team Head / Managing Director'],
                  ['market_head', 'Market Head / Regional Head'],
                ] as [string, string][]).map(([v, l]) => (
                  <Radio key={v} value={v} label={l} selected={form.seniority === v} onChange={set('seniority')} />
                ))}
              </div>
            </Section>

            <Section label="06" title="Current Institution Type">
              <div className="space-y-2">
                {([
                  ['swiss_private', 'Swiss Private Bank',       'Pictet, Lombard Odier, Julius Baer, UBP, EFG, Vontobel…'],
                  ['intl_private',  'International Private Bank', 'HSBC PWM, Citi Private, Deutsche Bank, BNP Paribas Wealth…'],
                  ['universal',     'Universal / Cantonal Bank',  'UBS, ZKB, BCGE, PostFinance, Raiffeisen…'],
                  ['eam',           'External Asset Manager (EAM)', 'FINMA-regulated independent wealth manager'],
                  ['family_office', 'Family Office',              'Single-family or multi-family office'],
                  ['other',         'Other / Prefer not to say',  ''],
                ] as [string, string, string][]).map(([v, l, s]) => (
                  <Radio key={v} value={v} label={l} sub={s || undefined} selected={form.institutionType === v} onChange={set('institutionType')} />
                ))}
              </div>
            </Section>

            <Section label="07" title="Primary Client Geography">
              <div className="space-y-2">
                {([
                  ['gcc',           'GCC – UAE, Saudi Arabia, Qatar'],
                  ['israel',        'Israel'],
                  ['europe_france', 'Europe – France'],
                  ['europe_italy',  'Europe – Italy'],
                  ['europe_iberia', 'Europe – Iberia (Spain, Portugal)'],
                  ['europe_dach',   'Europe – DACH'],
                  ['latam_brazil',  'Latin America – Brazil'],
                  ['latam_mx_co',   'Latin America – Mexico / Colombia'],
                  ['latam_arg_cl',  'Latin America – Argentina / Chile'],
                  ['cee',           'CEE – Poland, Czech Republic, Hungary'],
                  ['swiss_domestic','Swiss Domestic'],
                  ['uk_onshore',    'UK Onshore'],
                  ['apac_sg',       'APAC – Singapore'],
                  ['apac_hk',       'APAC – Hong Kong'],
                  ['apac_other',    'APAC – Japan, Australia'],
                  ['nri',           'NRI – India'],
                  ['cis',           'CIS – Russia, Kazakhstan, Ukraine'],
                  ['mea',           'MEA – Africa, South Africa'],
                  ['multi',         'Multi-market'],
                ] as [string, string][]).map(([v, l]) => (
                  <Radio key={v} value={v} label={l} selected={form.primaryGeography === v} onChange={set('primaryGeography')} />
                ))}
              </div>
            </Section>

            <Section label="08" title="Languages Spoken (Client-Facing)" hint="Select all that apply — this is a primary market fit signal">
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(lang => (
                  <CheckPill
                    key={lang}
                    value={lang}
                    label={lang}
                    selected={form.languages.includes(lang)}
                    onChange={toggleLang}
                  />
                ))}
              </div>
            </Section>

            <NavButtons canNext={valid[2]} onNext={() => setStep(3)} onBack={() => setStep(1)} />
          </div>
        )}

        {/* ── STEP 3: Mandate Preferences ── */}
        {step === 3 && (
          <div className="space-y-7">
            <Section label="09" title="Mandate Style">
              <div className="space-y-2">
                {([
                  ['hunter', 'Hunter',         'New asset origination is my primary strength'],
                  ['farmer', 'Farmer',          'Relationship development and AUM deepening'],
                  ['both',   'Hunter + Farmer', 'I originate and deepen with equal strength'],
                ] as [string, string, string][]).map(([v, l, s]) => (
                  <Radio key={v} value={v} label={l} sub={s} selected={form.mandateStyle === v} onChange={set('mandateStyle')} />
                ))}
              </div>
            </Section>

            <Section label="10" title="Preferred Employment Structure">
              <div className="space-y-2">
                {([
                  ['employed', 'Employed (Private Bank)', 'Fixed salary + variable bonus'],
                  ['eam',      'External Asset Manager',  'Revenue share / fully independent model'],
                  ['both',     'Open to Both',            ''],
                ] as [string, string, string][]).map(([v, l, s]) => (
                  <Radio key={v} value={v} label={l} sub={s || undefined} selected={form.employmentStructure === v} onChange={set('employmentStructure')} />
                ))}
              </div>
            </Section>

            {/* Adaptive: EAM regulatory licence */}
            {showLicenceQ && (
              <div className="border border-amber-400/20 rounded-lg p-4 bg-amber-400/5">
                <Section label="10b" title="Regulatory Licence Status" hint="EAM activity in Switzerland requires FINMA authorisation since January 2023">
                  <div className="space-y-2">
                    {([
                      ['licensed',    'Fully Licensed',           'FINMA / DFSA / MAS or equivalent in place'],
                      ['in_progress', 'Application In Progress',  'Licence submission filed or underway'],
                      ['not_yet',     'Not Yet Licensed',         ''],
                    ] as [string, string, string][]).map(([v, l, s]) => (
                      <Radio key={v} value={v} label={l} sub={s || undefined} selected={form.regulatoryLicence === v} onChange={set('regulatoryLicence')} />
                    ))}
                  </div>
                </Section>
              </div>
            )}

            <Section label="11" title="Target Booking Centre">
              <div className="space-y-2">
                {([
                  ['geneva',       'Geneva'],
                  ['zurich',       'Zurich'],
                  ['dubai',        'Dubai (DIFC)'],
                  ['abu_dhabi',    'Abu Dhabi (ADGM)'],
                  ['singapore',    'Singapore'],
                  ['hong_kong',    'Hong Kong'],
                  ['london',       'London'],
                  ['luxembourg',   'Luxembourg'],
                  ['liechtenstein','Liechtenstein'],
                  ['monaco',       'Monaco'],
                  ['tel_aviv',     'Tel Aviv'],
                  ['miami',        'Miami'],
                  ['new_york',     'New York'],
                  ['multiple',     'Multiple / Flexible'],
                ] as [string, string][]).map(([v, l]) => (
                  <Radio key={v} value={v} label={l} selected={form.targetBookingCentre === v} onChange={set('targetBookingCentre')} />
                ))}
              </div>
            </Section>

            <Section label="12" title="Availability / Timeline">
              <div className="space-y-2">
                {([
                  ['active',    'Actively Looking',     'Available within 1–3 months'],
                  ['open',      'Open to Opportunity',  'No hard timeline — right mandate only'],
                  ['exploring', 'Exploring Discreetly', '6–12 month horizon'],
                  ['notional',  'Long-Term Horizon',    '12+ months away'],
                ] as [string, string, string][]).map(([v, l, s]) => (
                  <Radio key={v} value={v} label={l} sub={s} selected={form.timeline === v} onChange={set('timeline')} />
                ))}
              </div>
            </Section>

            <Section label="13" title="Legal Constraints">
              <div className="space-y-2">
                {([
                  ['none',       'None',                      'Clean departure possible immediately'],
                  ['notice',     'Standard Notice Period',    '1–3 months'],
                  ['long_notice','Extended Notice Period',    '3–6 months'],
                  ['garden',     'Garden Leave Clause',       ''],
                  ['non_sol',    'Non-Solicitation Agreement','In place with current employer'],
                  ['unsure',     'Unsure',                    'Need to review contract terms'],
                ] as [string, string, string][]).map(([v, l, s]) => (
                  <Radio key={v} value={v} label={l} sub={s || undefined} selected={form.legalConstraints === v} onChange={set('legalConstraints')} />
                ))}
              </div>
            </Section>

            <NavButtons canNext={valid[3]} onNext={() => setStep(4)} onBack={() => setStep(2)} />
          </div>
        )}

        {/* ── STEP 4: Contact ── */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg border border-white/8 p-4">
              <p className="text-xs text-white/45 leading-relaxed">
                Your assessment is generated by our market intelligence engine and reviewed by our team.
                Results are displayed immediately and sent to your inbox. No CV or bank names are required or disclosed.
              </p>
            </div>

            <Section label="14" title="Name">
              <input
                type="text"
                placeholder="Optional"
                value={form.name}
                onChange={e => set('name')(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-amber-400/60 transition-colors"
              />
            </Section>

            <Section label="15" title="Email Address">
              <input
                type="email"
                placeholder="Your assessment will be sent here"
                value={form.email}
                onChange={e => set('email')(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-amber-400/60 transition-colors"
              />
            </Section>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded px-4 py-3">
                {error}
              </p>
            )}

            <div className="space-y-2 pt-1">
              <button
                onClick={submit}
                disabled={!valid[4] || loading}
                className="w-full py-4 bg-amber-400 text-black font-bold rounded text-sm hover:bg-amber-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Generating your assessment…
                  </span>
                ) : 'Generate Market Assessment →'}
              </button>
              <button onClick={() => setStep(3)} className="w-full py-2 text-white/30 text-sm hover:text-white/60 transition-colors">
                ← Back
              </button>
            </div>

            <p className="text-center text-[11px] text-white/20 leading-relaxed">
              No CV required · Strictly confidential<br />
              Treated under Swiss data protection standards
            </p>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === 'result' && result && (
          <div className="space-y-5">
            {/* Score card */}
            <div className="bg-gradient-to-br from-white/8 to-white/3 rounded-xl border border-white/12 p-6">
              <p className="text-[10px] text-amber-400 font-semibold tracking-[0.2em] uppercase mb-5">
                EP Market Intelligence Report
              </p>
              <div className="flex items-center gap-6 mb-5">
                <ScoreRing score={result.overallFitScore} />
                <div>
                  <p className="text-2xl font-bold text-white leading-tight">{result.overallFitLabel}</p>
                  <p className="text-white/40 text-sm">Market Position</p>
                  {form.name && <p className="text-white/30 text-xs mt-2">{form.name}</p>}
                </div>
              </div>
              <p className="text-white/65 text-sm leading-relaxed border-t border-white/8 pt-4">
                {result.executiveSummary}
              </p>
            </div>

            {/* Commercial Profile + Portability Risk */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg border border-white/8 p-4">
                <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1.5">Commercial Profile</p>
                <p className="text-amber-300 font-semibold text-sm mb-2">{result.commercialProfile.rating}</p>
                <p className="text-white/50 text-xs leading-relaxed">{result.commercialProfile.rationale}</p>
              </div>
              <div className="bg-white/5 rounded-lg border border-white/8 p-4">
                <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1.5">Portability Risk</p>
                <p className={`font-semibold text-sm mb-2 ${
                  result.portabilityRisk.rating === 'Low'      ? 'text-emerald-400' :
                  result.portabilityRisk.rating === 'Moderate' ? 'text-amber-300'   :
                  result.portabilityRisk.rating === 'Elevated' ? 'text-orange-400'  :
                                                                  'text-red-400'
                }`}>{result.portabilityRisk.rating}</p>
                <p className="text-white/50 text-xs leading-relaxed">{result.portabilityRisk.rationale}</p>
              </div>
            </div>

            {/* Market Fit by Geography */}
            <div>
              <h3 className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-3">Market Fit by Geography</h3>
              <div className="space-y-3">
                {result.marketFit.map((m, i) => (
                  <div key={i} className="bg-white/5 rounded-lg border border-white/8 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold text-sm">{m.market}</span>
                      <FitBadge label={m.fitLabel} />
                    </div>
                    <p className="text-white/55 text-xs leading-relaxed mb-3">{m.rationale}</p>
                    {m.openDoors.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.openDoors.map((d, j) => (
                          <span key={j} className="text-[11px] bg-white/5 border border-white/8 rounded px-2 py-0.5 text-white/40">
                            {d}
                          </span>
                        ))}
                      </div>
                    )}
                    {m.constraints && (
                      <p className="text-xs text-amber-400/60 mt-2.5 flex gap-1.5">
                        <span>⚠</span>
                        <span>{m.constraints}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Strengtheners */}
            <div className="bg-white/5 rounded-lg border border-white/8 p-4">
              <h3 className="text-[10px] text-white/30 uppercase tracking-[0.15em] mb-3">What Would Strengthen Your Candidacy</h3>
              <ul className="space-y-2.5">
                {result.strengtheners.map((s, i) => (
                  <li key={i} className="flex gap-2.5 text-xs text-white/55">
                    <span className="text-amber-400 shrink-0 mt-0.5">→</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Next Step */}
            <div className="bg-amber-400/8 rounded-lg border border-amber-400/25 p-4">
              <h3 className="text-[10px] text-amber-400/60 uppercase tracking-[0.15em] mb-2">Recommended Next Step</h3>
              <p className="text-white/75 text-sm leading-relaxed">{result.recommendedNextStep}</p>
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-1">
              <a
                href="https://calendly.com/execpartners/15-minute-career-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-amber-400 text-black font-bold rounded text-sm text-center hover:bg-amber-300 transition-all"
              >
                Schedule a Confidential Review Call →
              </a>
              <p className="text-center text-[11px] text-white/25">
                Full report sent to {form.email} · No obligation · Swiss discretion guaranteed
              </p>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => { setForm(INITIAL_FORM); setResult(null); setStep(1) }}
                className="text-xs text-white/20 hover:text-white/40 transition-colors"
              >
                Start a new assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
