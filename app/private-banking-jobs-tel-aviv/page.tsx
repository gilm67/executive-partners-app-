import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Private Banking Jobs in Tel Aviv | Executive Partners',
  description:
    'Explore Private Banking & Wealth Management jobs in Tel Aviv (Israel). Israeli-market mandates for Relationship Managers, Team Heads and Desk Leads covering UHNW/HNW Israeli clients.',
  alternates: {
    canonical: 'https://www.execpartners.ch/private-banking-jobs-tel-aviv',
  },
  openGraph: {
    title: 'Private Banking Jobs in Tel Aviv | Executive Partners',
    description:
      'Live Israeli-market mandates from Tel Aviv and Geneva/Zurich: Relationship Managers, Desk Heads, Market Leaders. Discreet recruitment for UHNW/HNW private banking in Israel.',
    url: 'https://www.execpartners.ch/private-banking-jobs-tel-aviv',
    siteName: 'Executive Partners',
    type: 'website',
  },
}

export default function TelAvivJobsPage() {
  return (
    <main id="main">

      <section>
        <p>Tel Aviv — Israel Private Banking</p>
        <h1>Private Banking Jobs in Tel Aviv</h1>

        <p>
          Executive Partners works with leading private banks, EAMs and family offices
          active in <strong>Tel Aviv</strong>, Israel&apos;s financial capital and one of the most
          concentrated pools of technology-generated private wealth in the world. With its
          dense base of tech founders, UHNW families and diaspora investors, Tel Aviv anchors
          Israeli-market coverage across cross-border booking centres in{' '}
          <strong>Geneva, Zurich and Luxembourg</strong> — and is increasingly a target for
          international private banks building or expanding Israeli desks.
        </p>

        <p>
          Current mandates prioritise Relationship Managers and Desk Heads with portable Israeli
          client books, cross-border structuring experience, and Hebrew-language coverage. We
          calibrate on booking options, offshore platform fit, and post-liquidity-event advisory
          capability to ensure business plans are realistic and durable.
        </p>
      </section>

      <section>
        <h2>What makes a strong Tel Aviv RM profile?</h2>
        <ul>
          <li>Referenceable UHNW/HNW coverage of Israeli clients, onshore or cross-border.</li>
          <li>
            <strong>Portability</strong> with credible wallet share and retention history,
            including clients who have experienced liquidity events.
          </li>
          <li>Languages: Hebrew and English (essential); additional European languages a plus.</li>
          <li>
            Cross-border expertise: experience booking Israeli assets in Geneva, Zurich or
            Luxembourg, with fluency in FATCA/CRS obligations.
          </li>
          <li>
            Tech-sector literacy: understanding of venture cap tables, secondary liquidity,
            lock-up periods and founder wealth structuring.
          </li>
        </ul>
      </section>

      <section>
        <h2>Hiring themes in Tel Aviv</h2>
        <p>
          Demand is strong for bankers covering the Israeli tech-entrepreneur segment, which
          generated approximately USD 80 billion in exits during 2025 alone. International
          Swiss private banks are expanding Israeli-market desks — typically running senior
          coverage from Geneva or Zurich with a representative presence in Tel Aviv. Employers
          value cross-border governance fluency, Hebrew-language capability, and a genuine
          network in the Israeli tech and business community. ISA licensing is required for
          onshore client-facing roles.
        </p>
      </section>

      <section>
        <h2>Relocating to Tel Aviv</h2>
        <p>
          Onshore roles at representative offices of international banks are typically
          senior-level. Israel applies progressive income tax with a top marginal rate of
          50 percent, though new residents benefit from a ten-year exemption on
          foreign-source income. Tel Aviv and Herzliya Pituach — the primary wealth
          management district — are among Israel&apos;s highest-cost areas. Most mandates at
          international institutions involve coverage from Swiss booking centres with
          periodic travel to Tel Aviv, avoiding full relocation.
        </p>
      </section>

      <section>
        <h2>How we work</h2>
        <p>
          We map the market discreetly, validate portability, and present shortlists you
          can act on. Candidates move only with consent. Hiring managers get calibrated,
          compliance-checked profiles aligned to desk strategy. Our Geneva base and
          long-standing Israeli-market relationships give us a clear view of cross-border
          talent flows between Tel Aviv, Geneva and Zurich.
        </p>
      </section>

      <section>
        <h2>Frequently Asked Questions</h2>

        <h3>Which client segments are most in demand in Tel Aviv?</h3>
        <p>
          UHNW/HNW Israeli tech founders, multi-generational family wealth and diaspora
          investors with cross-border booking requirements in Geneva or Zurich.
        </p>

        <h3>What languages are valued for Tel Aviv private banking roles?</h3>
        <p>
          Hebrew and English are core. Hebrew is non-negotiable for onshore client-facing
          roles; English is sufficient for Swiss-based Israeli desk positions.
        </p>

        <h3>What portability is required?</h3>
        <p>
          Credible portable wallet share with Israeli clients, a clean compliance record,
          and evidence of cross-border booking capability. There is no minimum AUM
          threshold for all mandates — network quality, market coverage and relationship
          depth are weighted alongside book size.
        </p>

        <h3>Is an ISA licence required?</h3>
        <p>
          For onshore client-facing roles in Israel, yes — an ISA investment advisory or
          marketing licence is required. For Swiss-based Israeli desk roles covering clients
          through Geneva or Zurich, no Israeli licence is needed; Swiss regulatory
          frameworks apply.
        </p>

        <h3>Do you support relocations to Tel Aviv?</h3>
        <p>Yes — we advise on ISA licensing requirements, tax considerations and realistic ramp-up timelines.</p>
      </section>

      <section>
        <h2>Featured Tel Aviv Roles</h2>
        <Link href="/en/jobs">View all jobs →</Link>

        <div>
          <h3>Senior Relationship Manager — Israeli Market</h3>
          <p>Geneva / Zurich</p>
          <p>
            Cover UHNW/HNW Israeli clients from a Swiss booking centre; Hebrew fluency
            and cross-border structuring expertise required.
          </p>
          <Link href="/en/jobs">View details</Link>
        </div>
      </section>

      <section>
        <p>Ready to discuss a Tel Aviv mandate or a move?</p>
        <Link href="/en/apply">Candidates — Apply</Link>
        {' '}
        <Link href="/en/contact">Talk to us</Link>
      </section>

      <section>
        <h2>Explore Other Hubs</h2>
        <Link href="/private-banking-jobs-switzerland">Switzerland</Link>{' | '}
        <Link href="/private-banking-jobs-dubai">Dubai</Link>{' | '}
        <Link href="/private-banking-jobs-singapore">Singapore</Link>{' | '}
        <Link href="/private-banking-jobs-london">London</Link>
      </section>

    </main>
  )
}
