import Link from "next/link";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gil M. Chalem",
  jobTitle: "Managing Partner",
  worksFor: {
    "@type": "Organization",
    name: "Executive Partners",
    url: "https://www.execpartners.ch",
  },
  url: "https://www.execpartners.ch/en/about",
  sameAs: ["https://www.linkedin.com/in/gil-m-chalem-35281916b/"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Geneva",
    addressCountry: "CH",
  },
  description: "Senior executive recruiter dedicated exclusively to Private Banking and Wealth Management. 200+ placements across 14 global hubs including Geneva, Zurich, London, Dubai, Riyadh, Singapore and Hong Kong.",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Executive Partners",
  url: "https://www.execpartners.ch",
  logo: "https://www.execpartners.ch/icon.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "118 rue du Rhône",
    addressLocality: "Geneva",
    postalCode: "1204",
    addressCountry: "CH",
  },
  founder: {
    "@type": "Person",
    name: "Gil M. Chalem",
  },
  numberOfEmployees: { "@type": "QuantitativeValue", value: 2 },
  description: "Geneva-based boutique executive search firm dedicated exclusively to Private Banking and Wealth Management. 200+ placements, 98% 12-month retention.",
  sameAs: ["https://www.linkedin.com/company/executive-partners"],
};

export const metadata = {
  title: { absolute: "About Executive Partners | Geneva Private Banking Recruiter" },
  description: "Geneva-based boutique executive search for Private Banking and Wealth Management. 200+ placements. 98% retention rate.",
  alternates: { canonical: "https://www.execpartners.ch/en/about" },
};

const team = [
  {
    name: "Gil M. Chalem",
    title: "Managing Partner",
    initials: "GC",
    bio: "Senior recruiter dedicated exclusively to Wealth Management and Private Banking with 2,300+ newsletter subscribers and 17,000+ LinkedIn connections and a track record built on portability intelligence, not volume.",
    tags: ["Geneva", "UHNW", "Swiss & Offshore", "MEA", "LATAM"],
    linkedin: "https://www.linkedin.com/in/gil-m-chalem-35281916b/",
  },
  {
    name: "Philippe Perret",
    title: "Administrator",
    initials: "PP",
    bio: "20 years as Senior Relationship Manager in Private Banking and Trading before transitioning to executive search. Deep front-office credibility that no generalist recruiter can replicate.",
    tags: ["Geneva", "Trading", "Private Banking", "Swiss Markets"],
    linkedin: "https://www.linkedin.com/in/philippe-perret-b80a8b27/",
  },
];

const pillars = [
  {
    n: "01",
    title: "We do one thing",
    body: "Private Banking and Wealth Management — exclusively. No generalist recruiters. No volume plays. Every conversation is sector-fluent from the first minute.",
  },
  {
    n: "02",
    title: "We read the business plan",
    body: "Before any introduction, we validate AUM composition, wallet share, and realistic transfer potential. Banks get bankers who will actually land.",
  },
  {
    n: "03",
    title: "We count bankers who stayed",
    body: "98% 12-month retention across 200+ placements. We measure outcomes, not CVs sent. That number is the only metric that matters.",
  },
  {
    n: "04",
    title: "Zero market noise",
    body: "Fully confidential from first contact to day one. No speculative approaches. No leaks to compliance. Candidates and clients never appear on the open market.",
  },
  {
    n: "05",
    title: "Front-office fluent",
    body: "Our team has sat in front of clients. We understand non-solicit clauses, cross-border tax implications, and what a CHF 300M book actually looks like.",
  },
  {
    n: "06",
    title: "A network, not a database",
    body: "Supported by former private banking heads, compliance specialists, and market intelligence partners across Geneva, London, Dubai, Riyadh, and Singapore.",
  },
];

const steps = [
  {
    n: "01",
    label: "Week 1",
    title: "Brief and calibration",
    body: "Success profile, target market, compensation range, and compliance constraints locked before any outreach begins.",
  },
  {
    n: "02",
    label: "Week 1-2",
    title: "Market map",
    body: "We define the viable universe and pre-screen for portability, non-solicit exposure, and cultural fit — before a single name reaches you.",
  },
  {
    n: "03",
    label: "Week 2-3",
    title: "Discreet approach",
    body: "Targeted outreach to candidates who are not visibly on the market. Structured evaluation using our EP Second Interview Framework.",
  },
  {
    n: "04",
    label: "Week 3-5",
    title: "Qualified shortlist",
    body: "3 to 5 candidates with verified AUM composition, revenue quality, and a written portability rationale attached to every dossier.",
  },
  {
    n: "05",
    label: "Week 5-8",
    title: "Close and onboard",
    body: "Offer management, legal risk checks, and onboarding support through to day one. Typically 6-8 weeks from brief to signed contract.",
  },
];

const quotes = [
  {
    text: "The first recruiter who actually read my business plan before presenting me.",
    source: "Senior RM, CHF 400M book — placed Geneva 2024",
  },
  {
    text: "They introduced one candidate. The right one. No noise, no wasted meetings.",
    source: "Head of Desk, Tier-1 Swiss private bank",
  },
];

export default function AboutPage() {
  return (
    <main>

      {/* Hero */}
      <section className="relative px-6 py-24 md:px-16 md:py-36">
        <p className="mb-4 text-xs uppercase tracking-[0.16em] text-[#C9A14A]">
          Private Banking · Executive Search · Geneva
        </p>
        <h1 className="max-w-3xl text-4xl font-light leading-tight text-white md:text-6xl">
          Most recruiters count CVs sent.<br />
          <span className="italic text-[#C9A14A]">We count bankers who stayed.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/50">
          A boutique dedicated exclusively to Private Banking and Wealth Management — 200+ placements, 98% retention, zero noise.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/en/hiring-managers/brief" className="rounded-lg bg-[#C9A14A] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#b8903f]">
            Brief a role
          </Link>
          <Link href="/en/candidates" className="rounded-lg border border-white/20 px-7 py-3 text-sm text-white/65 transition hover:border-white/40 hover:text-white">
            I am a candidate
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="mx-auto grid max-w-4xl grid-cols-3 divide-x divide-white/10">
          {[
            { n: "200+", l: "Placements" },
            { n: "98%", l: "12-month retention" },
            { n: "13", l: "Global hubs" },
          ].map((s) => (
            <div key={s.l} className="py-10 text-center">
              <p className="text-4xl font-light text-white">{s.n}</p>
              <p className="mt-2 text-[11px] uppercase tracking-widest text-white/40">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="border-b border-white/10 px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {quotes.map((q) => (
            <div key={q.source} className="rounded-2xl border border-[#C9A14A]/20 bg-[#C9A14A]/5 p-8">
              <p className="text-[28px] leading-none text-[#C9A14A]/40">&ldquo;</p>
              <p className="mt-2 text-base font-light italic leading-relaxed text-white/80">{q.text}</p>
              <p className="mt-4 text-[11px] uppercase tracking-widest text-white/30">{q.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-6 py-20 md:px-16">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[#C9A14A]">The team</p>
        <h2 className="mb-2 text-3xl font-light text-white md:text-4xl">Who you work with</h2>
        <div className="mb-12 h-px w-12 bg-[#C9A14A]" />
        <div className="grid gap-6 md:grid-cols-2">
          {team.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:border-[#C9A14A]/40"
            >
              <div className="mb-6 flex items-center gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#C9A14A]/30 bg-[#C9A14A]/10 text-base font-semibold tracking-wider text-[#C9A14A]">
                  {p.initials}
                </div>
                <div>
                  <p className="text-base font-semibold text-white">{p.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-[#C9A14A]">{p.title}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/55">{p.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/40"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={p.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#C9A14A] hover:underline"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn profile
              </a>
            </div>
          ))}
        </div>

        {/* Worldwide experts callout */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 md:flex md:items-center md:gap-10">
          <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C9A14A]/30 bg-[#C9A14A]/10 text-xl text-[#C9A14A] md:mb-0">
            &#9678;
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold text-white">Supported by a worldwide expert network</p>
            <p className="text-sm leading-relaxed text-white/50">
              We collaborate with former private banking heads, compliance and legal specialists, tax advisors, and market intelligence partners across Geneva, London, Zurich, Dubai, Riyadh, and Singapore — giving every mandate access to knowledge that goes well beyond standard recruitment.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-white/10 px-6 py-20 md:px-16">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[#C9A14A]">Why us</p>
        <h2 className="mb-2 text-3xl font-light text-white md:text-4xl">What sets us apart</h2>
        <div className="mb-12 h-px w-12 bg-[#C9A14A]" />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {pillars.map((pi) => (
            <div
              key={pi.title}
              className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#C9A14A]/30"
            >
              <p className="mb-3 text-2xl font-light text-[#C9A14A]/50">{pi.n}</p>
              <h3 className="mb-2 text-sm font-semibold text-white">{pi.title}</h3>
              <p className="text-xs leading-relaxed text-white/45">{pi.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-white/10 px-6 py-20 md:px-16">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[#C9A14A]">Our process</p>
        <h2 className="mb-2 text-3xl font-light text-white md:text-4xl">Brief to signed — typically 6-8 weeks</h2>
        <div className="mb-10 h-px w-12 bg-[#C9A14A]" />
        <div className="mx-auto max-w-2xl divide-y divide-white/10">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-6 py-6">
              <div className="min-w-[72px]">
                <p className="text-sm font-bold text-[#C9A14A]">{s.n}</p>
                <p className="text-[10px] text-white/25">{s.label}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/45">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-24 text-center md:px-16">
        <p className="mb-3 text-xs uppercase tracking-[0.14em] text-[#C9A14A]">Confidential · Senior-level · No obligation</p>
        <h2 className="mb-4 text-3xl font-light text-white md:text-4xl">
          Ready to discuss a mandate<br />or explore a move?
        </h2>
        <p className="mb-10 text-base text-white/40">
          Hiring managers and candidates both engage on a fully confidential basis.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/en/hiring-managers/brief"
            className="rounded-lg bg-[#C9A14A] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#b8903f]"
          >
            Brief a role
          </Link>
          <Link
            href="/en/candidates"
            className="rounded-lg border border-white/20 px-8 py-3 text-sm text-white/65 transition hover:border-white/40 hover:text-white"
          >
            I am a candidate
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
    </main>
  );
}
