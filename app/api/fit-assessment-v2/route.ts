export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

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

Return ONLY valid JSON, no markdown, no preamble:
{
  "headline": "3-6 word headline",
  "overallFit": "Exceptional|Strong|Good|Moderate|Limited",
  "positioning": "3-4 sentences referencing AUM, revenue, portability, geography and seniority together",
  "commercialSummary": "2-3 sentences on commercial attractiveness and portability context",
  "topMarkets": [
    {
      "city": "city name",
      "flag": "emoji flag",
      "fitLevel": "Strong|Good|Moderate|Weak",
      "rationale": "2-3 sentences specific to this profile",
      "hiringContext": "1-2 sentences on current 2026 market activity",
      "keyRequirement": "single most important threshold — omit field entirely if none"
    }
  ],
  "strengths": ["specific strength 1", "specific strength 2", "specific strength 3"],
  "gaps": ["honest gap 1", "honest gap 2"],
  "legalNote": "practical guidance if non-solicitation is active — omit field entirely if no active constraint",
  "timingNote": "timing context if notice is 6+ months or exploring only — omit field entirely if not material",
  "epAssessment": "2-3 sentences on EP recommendation and what a confidential conversation unlocks",
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

async function sendEmails(f: FormData, fitLevel: string, headline: string) {
  const key = process.env.RESEND_API_KEY
  if (!key) return
  const greeting = f.name ? `Dear ${f.name},` : 'Dear candidate,'
  const emails = [
    { from:'Executive Partners <recruiter@execpartners.ch>', to:['gil.chalem@execpartners.ch'], subject:`[Fit Assessment] ${fitLevel} — ${f.name||f.email}`, html:`<h2 style="color:#C9A96E">New Fit Assessment: ${fitLevel}</h2><p><strong>${headline}</strong></p><p>Name: ${f.name||'—'}<br>Email: ${f.email}<br>AUM: ${AUM[f.aumRange]||f.aumRange}<br>Revenue: ${FEE[f.feeIncome]||f.feeIncome}<br>Portability: ${PORT[f.portabilityEstimate]||f.portabilityEstimate}<br>Institution: ${INST[f.institutionType]||f.institutionType}<br>Seniority: ${SEN[f.seniority]||f.seniority}<br>Geography: ${GEO[f.primaryGeography]||f.primaryGeography}<br>Languages: ${f.languages.map(l=>LANG[l]||l).join(', ')}<br>Booking: ${BOOK[f.targetBookingCentre]||f.targetBookingCentre}<br>Notice: ${NOTICE[f.noticePeriod]||f.noticePeriod}<br>Legal: ${SOL[f.nonSolicitation]||f.nonSolicitation}</p>` },
    { from:'Executive Partners <recruiter@execpartners.ch>', to:[f.email], subject:'Your Private Bank Fit Assessment — Executive Partners', html:`<p>${greeting}</p><p>Thank you for completing your Private Bank Fit Assessment.</p><p>Your market fit has been assessed as <strong>${fitLevel}</strong>.</p><p style="border-left:3px solid #C9A96E;padding:8px 16px;font-style:italic">${headline}</p><p>Our team reviews every submission against live mandates within 48 hours. Schedule a confidential call: <a href="https://calendly.com/execpartners/15-minute-career-consultation">calendly.com/execpartners</a></p><p>Confidentially,<br><strong>Gil M. Chalem</strong><br>Managing Partner, Executive Partners</p>` },
  ]
  await Promise.allSettled(emails.map(e => fetch('https://api.resend.com/emails', { method:'POST', headers:{ Authorization:`Bearer ${key}`, 'Content-Type':'application/json' }, body:JSON.stringify(e) })))
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
      body:JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:2000, system:SYSTEM, messages:[{ role:'user', content:`Generate a Market Fit Assessment for this private banking professional:\n\n${profile}` }] })
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
    try { result = JSON.parse(cleaned) }
    catch { console.error('JSON parse failed:', cleaned); return NextResponse.json({ error:'Assessment parsing failed' }, { status:500 }) }

    const jobsSlug = BOOKING_TO_JOBS_SLUG[form.targetBookingCentre] || 'geneva'
    result.jobsUrl = `https://www.execpartners.ch/en/private-banker-jobs-${jobsSlug}`
    result.jobsMarketLabel = BOOK[form.targetBookingCentre] || 'your target market'

    const fitLevel = (result.overallFit as string) || 'Good'
    const headline = (result.headline as string) || 'Assessment complete'

    Promise.allSettled([logToSheets(form, fitLevel, headline), sendEmails(form, fitLevel, headline)])

    return NextResponse.json({ result })
  } catch(err) {
    console.error('fit-assessment-v2 error:', err)
    return NextResponse.json({ error:'Internal server error' }, { status:500 })
  }
}
