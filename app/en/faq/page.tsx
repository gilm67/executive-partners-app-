// app/en/faq/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: "Private Banking FAQ | Executive Search Switzerland | Executive Partners",
  description:
    "Answers to the most common questions about private banking careers, AUM portability, compensation, and executive search in Geneva, Zurich, Dubai and Singapore.",
  alternates: {
    canonical: `${SITE}/en/faq`,
  },
  openGraph: {
    title: "Private Banking FAQ | Executive Partners Geneva",
    description: "Expert answers on private banking careers, AUM portability, compensation benchmarks and executive search in Switzerland.",
    type: "website",
    siteName: "Executive Partners",
    images: [{ url: `${SITE}/og.webp` }],
  },
  robots: { index: true, follow: true },
};

const FAQS = [
  {
    category: "Executive Search & Recruitment",
    items: [
      {
        q: "What does a private banking headhunter do?",
        a: "A private banking headhunter specialises in the confidential placement of senior Relationship Managers, Team Heads, Investment Advisors and Managing Directors at private banks and wealth managers. Unlike generalist recruiters, a specialist headhunter understands AUM portability, compensation structures, licensing requirements and the specific dynamics of each market. Executive Partners operates exclusively in private banking and wealth management across Geneva, Zurich, London, Dubai, Singapore and Hong Kong.",
      },
      {
        q: "How does executive search work in private banking?",
        a: "Executive search in private banking is a confidential, direct-approach process. A headhunter identifies and contacts senior bankers who match a client's mandate — typically not active job seekers. The process involves an initial confidential discussion, a portability and fit assessment, an anonymous profile presentation to the hiring bank, and a structured interview process. Executive Partners manages the entire process from mandate to signed contract, typically within 8-12 weeks for senior roles.",
      },
      {
        q: "How much does executive search cost for private banking?",
        a: "Executive search fees in private banking are typically charged as a percentage of the placed candidate's first-year total compensation, usually between 20-30%. Fees are paid by the hiring institution, never by the candidate. Executive Partners works exclusively on retained or contingency mandates depending on seniority and exclusivity.",
      },
      {
        q: "What is the difference between a headhunter and a recruitment agency in banking?",
        a: "A headhunter proactively identifies and approaches passive candidates — senior professionals not actively looking for a new role. A recruitment agency typically manages inbound applications from active job seekers. In private banking, the most valuable talent — senior RMs with large portable books — is almost never actively applying. This is why specialist headhunters are essential for senior private banking mandates.",
      },
    ],
  },
  {
    category: "AUM Portability",
    items: [
      {
        q: "What is AUM portability in private banking?",
        a: "AUM portability refers to the proportion of a Relationship Manager's assets under management that can realistically be transferred to a new bank when the RM moves. Portability is rarely 100% — it depends on client relationships, the bank's brand strength, the RM's tenure, client loyalty, and legal constraints such as non-solicitation clauses. In Swiss private banking, senior RMs typically bring 40-70% of their stated AUM in the first 12 months. Executive Partners has developed a proprietary Portability Score to help RMs assess their realistic portability before making a move.",
      },
      {
        q: "How much AUM do I need to move to a new private bank?",
        a: "Most private banks in Geneva and Zurich require a minimum of CHF 50 million in portable AUM for a Senior RM role, and CHF 150 million or more for Team Head and Director-level positions. Dubai and Singapore mandates typically require USD 50-200 million depending on market focus. Requirements vary significantly by institution — boutiques may accept lower AUM thresholds in exchange for specific market expertise or language skills.",
      },
      {
        q: "What is a non-solicitation clause in private banking?",
        a: "A non-solicitation clause is a contractual restriction that prevents a departing RM from actively contacting former clients for a specified period — typically 6-12 months in Switzerland. It differs from a non-compete clause, which restricts working for competitors altogether. Non-solicitation clauses are common in Swiss private banking employment contracts and significantly impact AUM portability. Executive Partners advises candidates on the enforceability and practical implications of their specific contractual restrictions.",
      },
      {
        q: "Can clients follow their relationship manager to a new bank?",
        a: "Yes — client loyalty to their RM is a well-documented phenomenon in private banking. UHNW and HNW clients often follow their trusted banker to a new institution, particularly when the relationship has lasted more than five years and the RM provides personalised, high-quality service. However, portability is never guaranteed and depends heavily on the client's relationship with the institution, not just the individual RM.",
      },
    ],
  },
  {
    category: "Compensation & Career",
    items: [
      {
        q: "What is the average salary for a private banker in Geneva?",
        a: "Senior Relationship Managers in Geneva typically earn CHF 180,000-350,000 in base salary, with total compensation including bonus ranging from CHF 250,000 to CHF 500,000+ depending on AUM, performance and seniority. Team Heads and Managing Directors can exceed CHF 600,000 in total compensation. Bonuses in Geneva private banking are typically 30-80% of base salary for strong performers. Executive Partners publishes annual compensation benchmarks through the Private Wealth Pulse newsletter.",
      },
      {
        q: "What is the average salary for a private banker in Zurich?",
        a: "Senior Relationship Managers in Zurich earn CHF 160,000-320,000 in base salary with total compensation of CHF 220,000-480,000+. DACH-focused onshore roles tend to have lower variable components than international UHNW mandates. UBS, Julius Baer and ZKB are among the largest employers of private bankers in Zurich.",
      },
      {
        q: "What is the average salary for a private banker in Dubai?",
        a: "Senior Relationship Managers in Dubai DIFC earn USD 120,000-280,000 in base salary, with total tax-free compensation of USD 180,000-400,000+. GCC and NRI-focused roles command the highest packages. Dubai offers significant financial advantages over European centres given zero income tax, though cost of living has risen substantially since 2022.",
      },
      {
        q: "How do private banking bonuses work in Switzerland?",
        a: "Private banking bonuses in Switzerland are typically discretionary and based on net new money, AUM growth, revenue generation and return on assets. Most Swiss private banks pay bonuses annually in Q1 for the prior year. Deferred compensation — where part of the bonus is paid over 2-3 years — is increasingly common at larger institutions. Bankers who leave before their deferred bonus vests typically forfeit the unvested portion.",
      },
    ],
  },
  {
    category: "Private Banking Markets",
    items: [
      {
        q: "Which are the best private banks in Geneva?",
        a: "Geneva is home to over 100 private banks and wealth managers. Leading institutions include UBS, Pictet, Lombard Odier, Julius Baer, Union Bancaire Privée (UBP), Mirabaud, Bordier, Banque Syz, EFG International and numerous boutiques. The choice of bank depends on the RM's client base, AUM profile, preferred working culture and compensation expectations.",
      },
      {
        q: "Is Dubai a good place to work as a private banker?",
        a: "Dubai has become one of the fastest-growing private banking centres globally, driven by UHNW wealth migration from Russia, Asia, Africa and the Middle East following geopolitical events since 2022. DIFC hosts over 60 licensed wealth managers and private banks. The key advantages are zero income tax, a growing client base and a dynamic environment. Challenges include increasing competition for talent, rising costs, and geopolitical sensitivity. Executive Partners places senior bankers in Dubai across GCC, NRI, MENA and expat wealth mandates.",
      },
      {
        q: "What is an External Asset Manager (EAM) in Switzerland?",
        a: "An External Asset Manager is an independent wealth manager who manages client assets through a custodian bank rather than as an employee of a bank. EAMs in Switzerland are regulated by FINMA and must be affiliated with a recognised self-regulatory organisation. Senior RMs increasingly consider the EAM model as an alternative to traditional bank employment, offering greater independence and potentially higher earnings on managed assets. Executive Partners advises on the transition from employed banker to EAM.",
      },
      {
        q: "What languages do private bankers need in Switzerland?",
        a: "The language requirements depend entirely on the market focus. Geneva-based RMs serving French-speaking clients need French; those serving international UHNW clients primarily use English. Zurich-based RMs serving DACH clients need German. For specific market mandates — Italian, Russian, Arabic, Mandarin — native or near-native language skills are often a hard requirement. Executive Partners matches candidates to mandates based on language profile as a primary filter.",
      },
    ],
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.flatMap(cat =>
      cat.items.map(item => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };

  return (
    <main className="relative min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-4xl px-6 py-16">

        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A14A] mb-3">
            Knowledge Base
          </p>
          <h1 className="font-[var(--font-playfair)] text-4xl font-semibold text-white mb-4">
            Private Banking FAQ
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Expert answers on private banking careers, AUM portability, compensation benchmarks and executive search across Geneva, Zurich, Dubai and Singapore. Written by Gil M. Chalem, Managing Partner at Executive Partners.
          </p>
        </div>

        {/* FAQ Categories */}
        {FAQS.map((cat) => (
          <section key={cat.category} className="mb-12">
            <h2 className="text-xl font-semibold text-[#C9A14A] mb-6 pb-2 border-b border-white/10">
              {cat.category}
            </h2>
            <div className="space-y-6">
              {cat.items.map((item) => (
                <div key={item.q} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{item.q}</h3>
                  <p className="text-white/75 leading-relaxed text-[0.95rem]">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="rounded-2xl border border-[#C9A14A]/20 bg-[#C9A14A]/5 p-8 mt-8">
          <h2 className="text-2xl font-semibold text-white mb-3">Have a specific question?</h2>
          <p className="text-white/75 mb-6">
            Speak confidentially with Gil M. Chalem, Managing Partner at Executive Partners. No obligation, no pressure.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/en/contact"
              className="inline-flex rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-6 py-3 text-sm font-semibold text-[#0B0E13] hover:opacity-90">
              Contact us confidentially →
            </Link>
            <Link href="/en/portability"
              className="inline-flex rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Check your portability →
            </Link>
            <Link href="/en/jobs"
              className="inline-flex rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Browse active mandates →
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
