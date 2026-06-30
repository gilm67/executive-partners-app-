export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { MANDATES } from '@/app/en/jobs/mandates-data'

const RESEND_FROM = (
  process.env.RESEND_FROM ||
  (process.env.NODE_ENV !== 'production'
    ? 'Executive Partners <onboarding@resend.dev>'
    : 'Executive Partners <no-reply@auth.execpartners.ch>')
).trim()
import { generateFitAssessmentPdf, FitResult } from '@/lib/reports/fitAssessmentReport'
import { Resend } from 'resend'

interface Mandate {
  id: string; title: string; subtitle?: string; location: string
  tag?: string; aum?: string; comp_base?: string; flag?: string
}

// Keywords to match a candidate's primary geography against mandate tag/title/location text
const GEO_KEYWORDS: Record<string,string[]> = {
  gcc: ['gcc','uae','dubai','saudi','qatar','mea'],
  israel: ['israel','israeli'],
  europe_france: ['france','french','frontalier','cross-border'],
  europe_italy: ['italy','italian'],
  europe_iberia: ['iberia','spain','spanish','portugal'],
  europe_dach: ['dach','germany','austria','german'],
  latam_brazil: ['brazil','brazilian'],
  latam_mexico: ['mexico','colombia'],
  latam_southern: ['argentina','argentine','chile'],
  cee: ['cee','poland','czech','hungary'],
  swiss_domestic: ['swiss onshore','switzerland','domestic'],
  uk_onshore: ['uk','united kingdom','london'],
  apac_singapore: ['singapore'],
  apac_hk: ['hong kong'],
  apac_other: ['japan','australia','apac'],
  nri: ['nri','india'],
  cis: ['cis','russia','kazakhstan','ukraine'],
  mea: ['mea','africa'],
  multi: [],
}

// Keywords to match candidate's target booking centre against mandate location
const BOOK_KEYWORDS: Record<string,string[]> = {
  geneva: ['geneva'], zurich: ['zurich'], dubai: ['dubai'], abu_dhabi: ['abu dhabi'],
  singapore: ['singapore'], hong_kong: ['hong kong'], london: ['london'],
  luxembourg: ['luxembourg'], liechtenstein: ['liechtenstein'], monaco: ['monaco'],
  tel_aviv: ['tel aviv'], miami: ['miami'], new_york: ['new york'], multiple: [],
}

function findMatchingMandates(form: FormData): Mandate[] {
  const geoTerms = GEO_KEYWORDS[form.primaryGeography] || []
  const bookTerms = BOOK_KEYWORDS[form.targetBookingCentre] || []
  const haystack = (m: Mandate) => `${m.tag||''} ${m.title||''} ${m.subtitle||''} ${m.location||''}`.toLowerCase()

  const scored = (MANDATES as Mandate[]).map(m => {
    const text = haystack(m)
    const geoMatch = geoTerms.length > 0 && geoTerms.some(t => text.includes(t))
    const bookMatch = bookTerms.length > 0 && bookTerms.some(t => text.includes(t))
    let score = 0
    if (geoMatch) score += 2
    if (bookMatch) score += 1
    // Booking-centre overlap alone is not a real match — geography must match
    return { m, score: geoMatch ? score : 0 }
  })

  return scored.filter(s => s.score > 0).sort((a,b) => b.score - a.score).slice(0,3).map(s => s.m)
}

interface FormData {
  aumRange: string; feeIncome: string; portabilityEstimate: string
  institutionType: string; seniority: string; primaryGeography: string
  secondaryGeography: string; clientTier: string; languages: string[]
  mandateStyle: string; employmentStructure: string; targetBookingCentre: string
  priorityFactor: string; noticePeriod: string; nonSolicitation: string
  moveMotivation: string; name: string; email: string
}

const AUM: Record<string,string> = { under_50m:'Under CHF 50M', '50m_150m':'CHF 50M-150M', '150m_500m':'CHF 150M-500M', '500m_1b':'CHF 500M-1B', above_1b:'Above CHF 1B' }
const FEE: Record<string,string> = { under_500k:'Under CHF 500K', '500k_1m':'CHF 500K-1M', '1m_2m':'CHF 1M-2M', '2m_5m':'CHF 2M-5M', above_5m:'Above CHF 5M' }
const PORT: Record<string,string> = { under_30:'Under 30%', '30_50':'30-50%', '50_70':'50-70%', '70_90':'70-90%', above_90:'Above 90%' }
const INST: Record<string,string> = { universal_bank:'Universal bank wealth division', swiss_pure_play:'Swiss independent private bank', intl_private_bank:'Foreign-headquartered private bank', eam:'EAM', family_office:'Family Office', other:'Other' }
const SEN: Record<string,string> = { ia_rm:'IA / RM', senior_rm:'Senior RM', team_head_md:'Team Head / MD', market_head:'Market Head' }
const GEO: Record<string,string> = { gcc:'GCC', israel:'Israel', europe_france:'France', europe_italy:'Italy', europe_iberia:'Iberia', europe_dach:'DACH', latam_brazil:'Brazil', latam_mexico:'Mexico/Colombia', latam_southern:'Argentina/Chile', cee:'CEE', swiss_domestic:'Swiss Domestic', uk_onshore:'UK Onshore', apac_singapore:'Singapore', apac_hk:'Hong Kong', apac_other:'Japan/Australia', nri:'NRI India', cis:'CIS', mea:'MEA/Africa', multi:'Multi-market' }
const TIER: Record<string,string> = { hnw:'HNW', uhnw:'UHNW', vhnw_fo:'VHNW/FO', mixed:'Mixed HNW/UHNW' }
const LANG: Record<string,string> = { en:'English', fr:'French', de:'German', it:'Italian', ar:'Arabic', he:'Hebrew', ru:'Russian', pt:'Portuguese', es:'Spanish', zh:'Mandarin/Cantonese', tr:'Turkish', pl:'Polish/Czech/Hungarian', hi:'Hindi/Gujarati', other:'Other' }
const MAN: Record<string,string> = { hunter:'Hunter', farmer:'Farmer', both:'Hunter+Farmer' }
const EMP: Record<string,string> = { employed_pb:'Employed private bank', eam:'EAM', both:'Open to both' }
const BOOK: Record<string,string> = { geneva:'Geneva', zurich:'Zurich', dubai:'Dubai (DIFC)', abu_dhabi:'Abu Dhabi (ADGM)', singapore:'Singapore', hong_kong:'Hong Kong', london:'London', luxembourg:'Luxembourg', liechtenstein:'Liechtenstein', monaco:'Monaco', tel_aviv:'Tel Aviv', miami:'Miami', new_york:'New York', multiple:'Multiple/Flexible' }
const NOTICE: Record<string,string> = { immediate:'Available immediately', '1_3m':'1-3 months', '3_6m':'3-6 months', '6_12m':'6-12 months', exploring:'Exploring only' }
const SOL: Record<string,string> = { active:'Non-solicitation ACTIVE', expired:'Non-solicitation expired', none:'No restriction', unsure:'Unsure' }
const MOT: Record<string,string> = { comp:'Compensation', leadership:'Leadership change', strategy:'Strategic direction', opportunity:'Market opportunity', personal:'Personal/lifestyle', platform:'Platform limitations' }
const PRI: Record<string,string> = { compensation:'Compensation structure', brand:'Platform brand', market:'Market opportunity', autonomy:'Autonomy', culture:'Culture/Leadership', growth:'Growth/Promotion' }

const SYSTEM = `You are the head of market intelligence at Executive Partners, a Geneva-based boutique executive search firm specializing in private banking and wealth management. Give a frank expert assessment — the honest analysis a senior recruiter gives privately, not a marketing pitch. If the profile has real limitations, name them. If a market is cold, say so.

CRITICAL — AVOID GENERIC OUTPUT:
- Every sentence must reference at least one concrete number, label, or fact from the submitted profile (AUM band, fee income, portability %, languages, booking centre, notice period). Do not write sentences that could apply to any candidate.
- Do not repeat the same observation in two different sections using different words — each section must add new information.
- When discussing a market, name the SPECIFIC tension or alignment between this candidate's actual client geography and that market's booking/regulatory reality. Do not describe a market in the abstract.
- "topMarkets" must be ranked by genuine fit given THIS candidate's languages, booking centre preference, and client geography — not a generic top-3 of major hubs. If the candidate's own booking centre preference is a poor fit, say so explicitly rather than softening it.

KEY PRINCIPLES:
1. AUM + revenue + portability together form the commercial proposition — never evaluate AUM alone
2. Portability matters more than AUM size
3. Language capability is often the single most decisive market access filter — weight it heavily
4. Active non-solicitation clauses are genuinely limiting — do not minimize them
5. Notice periods over 6 months reduce live mandate options materially
6. UHNW client tiers open more doors than HNW
7. Hunter profiles are in higher demand in 2026
8. Never name specific institutions — use categories only
9. Do not invent statistics
10. If the candidate's stated booking centre preference conflicts with their client geography (e.g. a UK onshore book paired with a Zurich booking preference), name this as the single biggest constraint up front in positioning, not buried later

Return ONLY valid JSON, no markdown, no preamble:
{
  "headline": "3-6 word headline",
  "overallFit": "Exceptional|Strong|Good|Moderate|Limited",
  "positioning": "3-4 sentences referencing AUM, revenue, portability, geography and seniority together — open with the single most decisive fact about this profile, not a generic restatement",
  "commercialSummary": "2-3 sentences on commercial attractiveness and portability context, citing the actual portable CHF range implied by the stated AUM band and portability percentage",
  "topMarkets": [
    {
      "city": "city name",
      "flag": "emoji flag",
      "fitLevel": "Strong|Good|Moderate|Weak",
      "rationale": "2-3 sentences specific to this profile — must reference the candidate's actual client geography or language set, not generic market commentary",
      "hiringContext": "1-2 sentences on current 2026 market activity specific to this client segment, not a generic 'hiring remains active' line",
      "keyRequirement": "single most important threshold — omit field entirely if none"
    }
  ],
  "strengths": ["specific strength 1 tied to a submitted fact", "specific strength 2", "specific strength 3"],
  "gaps": ["honest gap 1 tied to a submitted fact", "honest gap 2"],
  "legalNote": "practical guidance if non-solicitation is active — omit field entirely if no active constraint",
  "timingNote": "timing context if notice is 6+ months or exploring only — omit field entirely if not material",
  "epAssessment": "2-3 sentences on EP recommendation — must name the single biggest lever the candidate could pull (e.g. recalibrating booking centre preference, broadening client tier framing) and what a confidential conversation specifically unlocks",
  "urgency": "high|moderate|low"
}`

function buildProfile(f: FormData): string {
  const langs = f.languages.map(l => LANG[l] || l).join(', ')
  const sec = f.secondaryGeography && f.secondaryGeography !== 'none' ? GEO[f.secondaryGeography] || f.secondaryGeography : 'None'
  return `COMMERCIAL PROFILE
AUM: ${AUM[f.aumRange] || f.aumRange}
Annual fee income: ${FEE[f.feeIncome] || f.feeIncome}
Portable AUM estimate: ${PORT[f.portabilityEstimate] || f.portabilityEstimate}
Current institution: ${INST[f.institutionType] || f.institutionType}
Seniority: ${SEN[f.seniority] || f.seniority}

CLIENT FOCUS
Primary geography: ${GEO[f.primaryGeography] || f.primaryGeography}
Secondary market: ${sec}
Client tier: ${TIER[f.clientTier] || f.clientTier}
Languages: ${langs}

CAREER PREFERENCES
Mandate style: ${MAN[f.mandateStyle] || f.mandateStyle}
Employment: ${EMP[f.employmentStructure] || f.employmentStructure}
Target booking centre: ${BOOK[f.targetBookingCentre] || f.targetBookingCentre}
Primary driver: ${PRI[f.priorityFactor] || f.priorityFactor}

TIMING & CONSTRAINTS
Availability: ${NOTICE[f.noticePeriod] || f.noticePeriod}
Legal: ${SOL[f.nonSolicitation] || f.nonSolicitation}
Move motivation: ${MOT[f.moveMotivation] || f.moveMotivation}`
}

async function getSheetToken(): Promise<string> {
  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}')
  const { client_email, private_key } = key
  const now = Math.floor(Date.now() / 1000)
  const enc = (o: object) => btoa(JSON.stringify(o)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')
  const header = { alg:'RS256', typ:'JWT' }
  const payload = { iss:client_email, scope:'https://www.googleapis.com/auth/spreadsheets', aud:'https://oauth2.googleapis.com/token', exp:now+3600, iat:now }
  const toSign = `${enc(header)}.${enc(payload)}`
  const pem = private_key.replace(/\\n/g,'\n').replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----/g,'').replace(/\n/g,'')
  const der = Uint8Array.from(atob(pem), c => c.charCodeAt(0))
  const ck = await crypto.subtle.importKey('pkcs8', der.buffer, { name:'RSASSA-PKCS1-v1_5', hash:'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', ck, new TextEncoder().encode(toSign))
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')
  const jwt = `${toSign}.${sigB64}`
  const tr = await fetch('https://oauth2.googleapis.com/token', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:`grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}` })
  const td = await tr.json()
  return td.access_token
}

async function logToSheets(f: FormData, fitLevel: string, headline: string) {
  try {
    const token = await getSheetToken()
    const row = [new Date().toISOString(), f.name||'', f.email, AUM[f.aumRange]||f.aumRange, FEE[f.feeIncome]||f.feeIncome, PORT[f.portabilityEstimate]||f.portabilityEstimate, INST[f.institutionType]||f.institutionType, SEN[f.seniority]||f.seniority, GEO[f.primaryGeography]||f.primaryGeography, TIER[f.clientTier]||f.clientTier, f.languages.map(l=>LANG[l]||l).join(', '), MAN[f.mandateStyle]||f.mandateStyle, BOOK[f.targetBookingCentre]||f.targetBookingCentre, NOTICE[f.noticePeriod]||f.noticePeriod, SOL[f.nonSolicitation]||f.nonSolicitation, fitLevel, headline]
    const SHEET_ID = '1Osr2RrgQZqDjK28knSXlqNXqJk2rcaATLqE1Yjy_W0c'
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Assessments!A:Q:append?valueInputOption=USER_ENTERED`, { method:'POST', headers:{ Authorization:`Bearer ${token}`, 'Content-Type':'application/json' }, body:JSON.stringify({ values:[row] }) })
  } catch(e) { console.error('Sheets error:', e) }
}

async function sendEmails(f: FormData, fitLevel: string, headline: string, pdfBase64?: string) {
  const key = (process.env.RESEND_API_KEY || '').trim()
  if (!key) { console.error('RESEND_API_KEY is missing — no emails will be sent'); return }

  const resend = new Resend(key)
  const greeting = f.name ? `Dear ${f.name},` : 'Dear candidate,'
  const attachments = pdfBase64
    ? [{ filename: `EP-Fit-Assessment-${(f.name || f.email).replace(/[^a-zA-Z0-9]+/g, '-')}.pdf`, content: pdfBase64 }]
    : undefined

  const internalHtml = `<h2 style="color:#C9A96E">New Fit Assessment: ${fitLevel}</h2><p><strong>${headline}</strong></p><p>Name: ${f.name||'—'}<br>Email: ${f.email}<br>AUM: ${AUM[f.aumRange]||f.aumRange}<br>Revenue: ${FEE[f.feeIncome]||f.feeIncome}<br>Portability: ${PORT[f.portabilityEstimate]||f.portabilityEstimate}<br>Institution: ${INST[f.institutionType]||f.institutionType}<br>Seniority: ${SEN[f.seniority]||f.seniority}<br>Geography: ${GEO[f.primaryGeography]||f.primaryGeography}<br>Languages: ${f.languages.map(l=>LANG[l]||l).join(', ')}<br>Booking: ${BOOK[f.targetBookingCentre]||f.targetBookingCentre}<br>Notice: ${NOTICE[f.noticePeriod]||f.noticePeriod}<br>Legal: ${SOL[f.nonSolicitation]||f.nonSolicitation}</p>`

  const candidateHtml = `<p>${greeting}</p><p>Thank you for completing your Private Bank Fit Assessment.</p><p>Your market fit has been assessed as <strong>${fitLevel}</strong>.</p><p style="border-left:3px solid #C9A96E;padding:8px 16px;font-style:italic">${headline}</p><p>Your full report is attached as a PDF. Our team reviews every submission against live mandates within 48 hours. Schedule a confidential call: <a href="https://calendly.com/execpartners/15-minute-career-consultation">calendly.com/execpartners</a></p><p>Confidentially,<br><strong>Gil M. Chalem</strong><br>Managing Partner, Executive Partners</p>`

  const [internalOutcome, candidateOutcome] = await Promise.allSettled([
    resend.emails.send({
      from: RESEND_FROM,
      to: 'gil.chalem@execpartners.ch',
      replyTo: f.email,
      subject: `[Fit Assessment] ${fitLevel} — ${f.name || f.email}`,
      html: internalHtml,
      attachments,
    }),
    resend.emails.send({
      from: RESEND_FROM,
      to: f.email,
      subject: 'Your Private Bank Fit Assessment — Executive Partners',
      html: candidateHtml,
      attachments,
    }),
  ])

  if (internalOutcome.status === 'fulfilled') {
    console.log('Resend internal email result:', JSON.stringify(internalOutcome.value))
  } else {
    console.error('Resend internal email failed:', internalOutcome.reason)
  }

  if (candidateOutcome.status === 'fulfilled') {
    console.log('Resend candidate email result:', JSON.stringify(candidateOutcome.value))
  } else {
    console.error('Resend candidate email failed:', candidateOutcome.reason)
  }
}

const BOOKING_TO_JOBS_SLUG: Record<string,string> = {
  geneva: 'geneva', zurich: 'zurich', dubai: 'dubai', singapore: 'singapore',
  hong_kong: 'hong-kong', london: 'london', miami: 'miami', new_york: 'new-york',
  tel_aviv: 'tel-aviv', monaco: 'geneva', luxembourg: 'london', liechtenstein: 'zurich',
  abu_dhabi: 'dubai', multiple: 'geneva',
}

export async function POST(req: NextRequest) {
  try {
    const form: FormData = await req.json()
    if (!form.email) return NextResponse.json({ error:'Email is required' }, { status:400 })

    const profile = buildProfile(form)

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{ 'x-api-key': process.env.ANTHROPIC_API_KEY||'', 'anthropic-version':'2023-06-01', 'Content-Type':'application/json' },
      body:JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:4000, system:SYSTEM, messages:[{ role:'user', content:`Generate a Market Fit Assessment for this private banking professional:\n\n${profile}` }] })
    })

    if (!anthropicRes.ok) {
      const err = await anthropicRes.text()
      console.error('Anthropic error:', err)
      return NextResponse.json({ error:'Assessment generation failed' }, { status:500 })
    }

    const ad = await anthropicRes.json()
    const raw: string = ad.content?.[0]?.text || ''
    const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()

    let result: Record<string, unknown>
    try {
      result = JSON.parse(cleaned)
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/)
      if (match) {
        try {
          result = JSON.parse(match[0])
        } catch {
          console.error('JSON parse failed even after extraction. Raw length:', cleaned.length, 'Raw tail:', cleaned.slice(-300))
          return NextResponse.json({ error:'Assessment parsing failed' }, { status:500 })
        }
      } else {
        console.error('JSON parse failed, no JSON object found. Raw length:', cleaned.length, 'Raw tail:', cleaned.slice(-300))
        return NextResponse.json({ error:'Assessment parsing failed' }, { status:500 })
      }
    }

    const matchedMandates = findMatchingMandates(form)
    result.matchedMandates = matchedMandates.map(m => ({
      id: m.id, title: m.title, subtitle: m.subtitle || '', location: m.location,
      aum: m.aum || '', flag: m.flag || '', url: `https://www.execpartners.ch/en/jobs/${m.id}`,
    }))
    const jobsSlug = BOOKING_TO_JOBS_SLUG[form.targetBookingCentre] || 'geneva'
    result.jobsUrl = `https://www.execpartners.ch/en/private-banker-jobs-${jobsSlug}`
    result.jobsMarketLabel = BOOK[form.targetBookingCentre] || 'your target market'

    const fitLevel = (result.overallFit as string) || 'Good'
    const headline = (result.headline as string) || 'Assessment complete'

    let pdfBase64: string | undefined
    try {
      const pdfBuffer = await generateFitAssessmentPdf(
        { name: form.name, email: form.email },
        result as unknown as FitResult
      )
      pdfBase64 = pdfBuffer.toString('base64')
    } catch (pdfErr) {
      console.error('PDF generation error (candidate will not receive attachment):', pdfErr)
    }

    await Promise.allSettled([logToSheets(form, fitLevel, headline), sendEmails(form, fitLevel, headline, pdfBase64)])

    return NextResponse.json({ result })
  } catch(err) {
    console.error('fit-assessment-v2 error:', err)
    return NextResponse.json({ error:'Internal server error' }, { status:500 })
  }
}
