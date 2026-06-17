/* app/en/executive-search-geneva/page.tsx */
import type { Metadata } from "next";
import Link from "next/link";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.execpartners.ch";

const PAGE_URL = `${SITE}/en/executive-search-geneva`;

export const metadata: Metadata = {
  title: { absolute: "Executive Search Geneva | Private Banking Specialist – Executive Partners" },
  description:
    "Geneva-based executive search specialist exclusively in private banking. Senior RMs, Investment Advisors and Desk Heads placed across Swiss and international platforms. Every search conducted personally by Gil M. Chalem.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Executive Search Geneva | Private Banking Recruiter — Executive Partners",
    description:
      "Specialist executive search in Geneva for senior private banking talent. Senior RMs, Team Heads and Investment Advisors placed at leading Swiss and international private banks.",
    siteName: "Executive Partners",
    images: [{ url: `${SITE}/og.webp`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Search Geneva | Private Banking Recruiter — Executive Partners",
    description:
      "Geneva-based executive search for senior private banking and wealth management talent. Confidential. Senior-level only.",
    images: [`${SITE}/og.webp`],
  },
  robots: { index: true, follow: true },
};

export default function ExecutiveSearchGenevaPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-white">

      {/* Breadcrumb */}
      <nav className="text-sm text-white/50 mb-8">
        <Link href="/en" className="hover:text-white">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-white/80">Executive Search Geneva</span>
      </nav>

      {/* H1 */}
      <h1 className="text-3xl md:text-4xl font-semibold mb-4">
        Executive Search Geneva
      </h1>
      <p className="text-lg text-white/70 mb-12 max-w-2xl">
        Specialist executive recruitment for private banking and wealth management
        in Geneva. Senior Relationship Managers, Team Heads, Investment Advisors
        and EAM coverage professionals placed at leading Swiss and international
        private banks.
      </p>

      {/* What we do */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-[#C9A14A]">
          What Executive Partners Does
        </h2>
        <p className="text-white/80 leading-relaxed mb-4">
          Executive Partners is a Geneva-based boutique executive search firm
          operating exclusively in private banking and wealth management.
          Every search is conducted personally by{" "}
          <Link href="/en/about" className="text-[#C9A14A] hover:underline">
            Gil M. Chalem
          </Link>
          , Managing Partner, with over twenty years of experience placing
          senior bankers across Geneva, Zurich, Dubai, London, Singapore and
          Hong Kong.
        </p>
        <p className="text-white/80 leading-relaxed">
          We work on a mandate basis with private banks, EAM structures and
          family offices, sourcing senior talent confidentially and providing
          structured candidate assessments including AUM portability analysis,
          compensation benchmarking and full due diligence at the first
          interview stage.
        </p>
      </section>

      {/* Roles we place */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-[#C9A14A]">
          Roles We Place in Geneva
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Senior Relationship Manager",
            "Team Head — Private Banking",
            "Investment Advisor",
            "Assistant Relationship Manager",
            "EAM Coverage Specialist",
            "Head of Market — UHNW",
          ].map((role) => (
            <div
              key={role}
              className="border border-white/10 rounded-lg px-5 py-4 text-white/80 text-sm"
            >
              {role}
            </div>
          ))}
        </div>
      </section>

      {/* Markets */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-[#C9A14A]">
          Markets We Cover from Geneva
        </h2>
        <p className="text-white/80 leading-relaxed mb-4">
          Geneva mandates span the full range of international private banking
          markets: Swiss onshore, Franco-Genevois frontalier, Italian offshore
          and onshore, CIS/CEE, LATAM, Turkish, Greek and Cypriot, UK resident,
          MEA and Asian markets.
        </p>
        <p className="text-white/80 leading-relaxed">
          Every search is structured around the target market's specific client
          profile, portability dynamics and compliance requirements. We do not
          run generic searches.
        </p>
      </section>

      {/* Why Executive Partners */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 text-[#C9A14A]">
          Why Private Banks Choose Executive Partners
        </h2>
        <ul className="space-y-3 text-white/80 text-sm">
          <li className="flex gap-3">
            <span className="text-[#C9A14A] mt-0.5">→</span>
            <span>
              <strong className="text-white">Exclusive focus.</strong> We work
              only in private banking and wealth management. No generalist
              searches. No conflicting priorities.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#C9A14A] mt-0.5">→</span>
            <span>
              <strong className="text-white">Portability analysis.</strong>{" "}
              Every senior candidate is assessed against the EP framework:
              AUM composition, revenue quality, wallet share, EAM exposure and
              legal constraints — before they reach your desk.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#C9A14A] mt-0.5">→</span>
            <span>
              <strong className="text-white">Speed and discretion.</strong>{" "}
              First shortlist within five business days. All communication
              through a single point of contact.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#C9A14A] mt-0.5">→</span>
            <span>
              <strong className="text-white">Market intelligence.</strong>{" "}
              Compensation benchmarks, market movement data and candidate
              pipeline visibility updated continuously across all Geneva
              submarkets.
            </span>
          </li>
        </ul>
      </section>

      {/* CTA blocks */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="border border-[#C9A14A]/40 rounded-xl p-6">
          <h3 className="text-[#C9A14A] font-semibold mb-2">
            Hiring Managers
          </h3>
          <p className="text-white/70 text-sm mb-4">
            Discuss a confidential mandate or request a market briefing.
          </p>
          <Link
            href="/en/hiring-managers"
            className="inline-block bg-[#C9A14A] text-black text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#b8903d] transition-colors"
          >
            Post a Mandate
          </Link>
        </div>
        <div className="border border-white/15 rounded-xl p-6">
          <h3 className="font-semibold mb-2">Senior Bankers</h3>
          <p className="text-white/70 text-sm mb-4">
            Explore active mandates in Geneva and assess your portability.
          </p>
          <Link
            href="/en/jobs"
            className="inline-block border border-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            View Active Mandates
          </Link>
        </div>
      </section>

      {/* Related links */}
      <section className="border-t border-white/10 pt-8">
        <h2 className="text-base font-semibold mb-4 text-white/60 uppercase tracking-wide">
          Related
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Private Banking Recruiter Switzerland", href: "/private-banking-recruiter-switzerland" },
            { label: "Geneva Market Overview", href: "/en/markets/geneva" },
            { label: "Portability Score Tool", href: "/portability" },
            { label: "Business Plan Simulator", href: "/bp-simulator" },
            { label: "Active Mandates", href: "/en/jobs" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-white/60 hover:text-[#C9A14A] border border-white/10 px-4 py-2 rounded-lg hover:border-[#C9A14A]/40 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Executive Partners Sàrl",
            description:
              "Executive search firm specialising in private banking and wealth management recruitment in Geneva and globally.",
            url: PAGE_URL,
            address: {
              "@type": "PostalAddress",
              streetAddress: "118 Rue du Rhône",
              addressLocality: "Geneva",
              postalCode: "CH-1204",
              addressCountry: "CH",
            },
            areaServed: ["Geneva", "Zurich", "Dubai", "London", "Singapore", "Hong Kong"],
            knowsAbout: [
              "Private Banking Recruitment",
              "Wealth Management Executive Search",
              "Senior Relationship Manager Placement",
              "EAM Recruitment Switzerland",
            ],
          }),
        }}
      />
    </main>
  );
}
