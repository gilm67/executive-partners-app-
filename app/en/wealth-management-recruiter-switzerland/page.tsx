import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/StructuredData";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: "Wealth Management Recruiter Switzerland | Executive Partners Geneva",
  description:
    "Executive Partners is Switzerland's specialist wealth management recruiter. Senior Relationship Managers, Investment Advisors, Team Heads and Market Leaders placed across Geneva, Zurich, London, Dubai and Singapore. Geneva-based headhunter, 200+ placements.",
  alternates: { canonical: `${SITE}/en/wealth-management-recruiter-switzerland` },
  openGraph: {
    title: "Wealth Management Recruiter Switzerland | Executive Partners",
    description:
      "Geneva-based wealth management recruiter specialising in senior RM, Investment Advisor and Team Head placements across Switzerland and global booking centres.",
    url: `${SITE}/en/wealth-management-recruiter-switzerland`,
    images: [{ url: `${SITE}/og.webp` }],
  },
  robots: { index: true, follow: true },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wealth Management Recruitment Switzerland",
  description:
    "Senior executive search for wealth management professionals across Switzerland and major international booking centres. Specialising in Relationship Managers, Investment Advisors, Team Heads and Market Leaders.",
  provider: {
    "@type": "LocalBusiness",
    name: "Executive Partners",
    url: SITE,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Geneva",
      addressCountry: "CH",
    },
  },
  areaServed: [
    { "@type": "City", name: "Geneva" },
    { "@type": "City", name: "Zurich" },
    { "@type": "City", name: "London" },
    { "@type": "City", name: "Dubai" },
    { "@type": "City", name: "Singapore" },
  ],
  serviceType: "Executive Search",
};

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE },
          { name: "Wealth Management Recruiter Switzerland", url: `${SITE}/en/wealth-management-recruiter-switzerland` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A14A]">
            Geneva · Zurich · London · Dubai · Singapore
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Wealth Management Recruiter in Switzerland
          </h1>

          <p className="text-white/80 text-lg leading-relaxed">
            Executive Partners is Geneva's specialist wealth management recruiter. We place senior
            Relationship Managers, Investment Advisors, Team Heads and Market Leaders with private
            banks, global wealth managers and independent asset managers across Switzerland and
            the main international booking centres. 200+ placements. 98% 12-month retention rate.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/en/apply"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold bg-[#C9A14A] text-black hover:opacity-90 transition"
            >
              Apply Confidentially
            </Link>
            <Link
              href="/en/hiring-managers"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition"
            >
              Brief a Mandate
            </Link>
          </div>

          <hr className="border-white/10" />

          <h2 className="text-2xl font-semibold">
            What We Do in Wealth Management Recruitment
          </h2>
          <p className="text-white/70 leading-relaxed">
            We operate exclusively in private banking and wealth management. Every mandate we handle
            involves a senior front-office professional — typically a Relationship Manager with a
            portable book, an Investment Advisor covering a specific market segment, or a Team Head
            with a track record of building out a desk. We do not generalise across financial
            services. Wealth management is the only market we know.
          </p>
          <p className="text-white/70 leading-relaxed">
            Our recruitment process is built around portability analysis, business plan review and
            compliance profiling. Before any candidate is presented to a hiring platform, we have
            assessed AUM composition, wallet share, cross-border licensing, client concentration and
            realistic transfer probability. Hiring managers receive structured candidate dossiers,
            not CVs.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Senior Roles We Place in Switzerland
          </h2>
          <p className="text-white/70 leading-relaxed">
            Our mandates in Switzerland concentrate on Geneva and Zurich, covering Swiss onshore,
            UHNW international, LATAM, CIS/CEE, Italian offshore, MEA, Asian and UK market
            segments. Typical roles include Senior Relationship Manager, Investment Advisor,
            Assistant RM, Market Head, Desk Head and Regional Director. We also advise on EAM
            transitions for senior bankers considering the independent asset manager route.
          </p>
          <p className="text-white/70 leading-relaxed">
            Swiss wealth management hiring committees are among the most demanding in the world.
            They require clean cross-border compliance, documented AUM portability and a credible
            business plan. We prepare candidates for this process and manage the timeline from first
            conversation to signed offer — typically eight to eighteen weeks at the senior level.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            International Wealth Management Mandates
          </h2>
          <p className="text-white/70 leading-relaxed">
            Beyond Switzerland, we run active wealth management recruitment mandates in London,
            Dubai (DIFC), Singapore, Hong Kong, Milan, New York and Miami. Each market has its own
            regulatory environment, client base dynamics and compensation structure. We provide
            candidates with a clear market briefing before any approach is made to a hiring
            institution.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            For Wealth Management Professionals
          </h2>
          <p className="text-white/70 leading-relaxed">
            Most senior wealth managers who contact us are not actively searching. They want to
            understand their market value, assess the portability of their client base and identify
            which platforms would be the best strategic fit. An initial conversation with Executive
            Partners is fully confidential and carries no obligation. We do not charge candidates
            at any stage.
          </p>
          <p className="text-white/70 leading-relaxed">
            Use our{" "}
            <Link href="/en/portability" className="text-[#C9A14A] hover:underline">
              Portability Readiness Score
            </Link>{" "}
            to benchmark your AUM transfer potential, or run a{" "}
            <Link href="/en/bp-simulator" className="text-[#C9A14A] hover:underline">
              Business Plan Simulation
            </Link>{" "}
            to model revenue, break-even timeline and onboarding readiness before approaching
            a new platform.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            For Wealth Management Hiring Managers
          </h2>
          <p className="text-white/70 leading-relaxed">
            We work with a small number of clients on a retained and engaged basis. We do not
            operate on a contingency model. Every mandate receives dedicated research, structured
            market mapping and candidate assessment. Our clients range from the largest global
            private banks to boutique Geneva-based wealth managers and EAM platforms building
            out their front-office teams.
          </p>
          <p className="text-white/70 leading-relaxed">
            To discuss a wealth management recruitment mandate, use our{" "}
            <Link href="/en/hiring-managers/brief" className="text-[#C9A14A] hover:underline">
              confidential mandate brief form
            </Link>{" "}
            or{" "}
            <Link href="/en/contact" className="text-[#C9A14A] hover:underline">
              contact us directly
            </Link>
            . We respond the same business day.
          </p>

          <hr className="border-white/10" />

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/en/jobs"
              className="text-sm text-white/60 hover:text-white underline underline-offset-4"
            >
              View active mandates
            </Link>
            <Link
              href="/en/markets"
              className="text-sm text-white/60 hover:text-white underline underline-offset-4"
            >
              Explore markets
            </Link>
            <Link
              href="/en/about"
              className="text-sm text-white/60 hover:text-white underline underline-offset-4"
            >
              About Executive Partners
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
