import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/StructuredData";

const SITE = "https://www.execpartners.ch";

export const metadata: Metadata = {
  title: "EAM Recruiter Switzerland | External Asset Manager Headhunter | Executive Partners",
  description:
    "Executive Partners specialises in recruiting for External Asset Managers and independent wealth managers in Switzerland. Senior bankers transitioning to EAM, and EAM platforms building front-office teams in Geneva and Zurich.",
  alternates: { canonical: `${SITE}/en/eam-recruiter-switzerland` },
  openGraph: {
    title: "EAM Recruiter Switzerland | Executive Partners Geneva",
    description:
      "Geneva-based headhunter for External Asset Managers. Senior RM placement, EAM transition advisory and front-office team building across Switzerland.",
    url: `${SITE}/en/eam-recruiter-switzerland`,
    images: [{ url: `${SITE}/og.webp` }],
  },
  robots: { index: true, follow: true },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "EAM Recruitment Switzerland — External Asset Manager Headhunter",
  description:
    "Executive search for External Asset Managers and independent wealth managers in Switzerland. Senior RM placement, EAM transition advisory and front-office team building in Geneva and Zurich.",
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
    { "@type": "Country", name: "Switzerland" },
  ],
  serviceType: "Executive Search — External Asset Manager",
};

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: SITE },
          { name: "EAM Recruiter Switzerland", url: `${SITE}/en/eam-recruiter-switzerland` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
        <div className="mx-auto max-w-3xl space-y-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A14A]">
            Geneva · Zurich · Switzerland
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            EAM Recruiter Switzerland
          </h1>

          <p className="text-white/80 text-lg leading-relaxed">
            Executive Partners is a Geneva-based headhunter specialising in External Asset Manager
            recruitment across Switzerland. We place senior Relationship Managers transitioning to
            the EAM model and help independent wealth management platforms build their
            front-office teams in Geneva and Zurich.
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
            What Is an External Asset Manager?
          </h2>
          <p className="text-white/70 leading-relaxed">
            An External Asset Manager (EAM), also known as an independent asset manager or
            independent wealth manager, is a regulated advisory firm that manages client assets
            through custodian banks rather than as an integrated part of a bank. Switzerland
            has one of the most developed EAM ecosystems in the world, with over 2,500 registered
            independent asset managers operating primarily from Geneva and Zurich.
          </p>
          <p className="text-white/70 leading-relaxed">
            Since FINMA introduced the Financial Institutions Act (FinIA) in 2020, all Swiss EAMs
            must be licensed by FINMA. This regulatory professionalisation has accelerated
            consolidation in the sector and increased demand for senior talent with private banking
            experience, portable books and clean compliance profiles.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Senior Bankers Considering the EAM Route
          </h2>
          <p className="text-white/70 leading-relaxed">
            Many senior Relationship Managers at private banks explore the independent model after
            ten or more years on the front line. The EAM route offers greater autonomy, higher
            revenue share and direct client ownership. It also carries significant transition risk:
            regulatory licensing, custodian negotiations, client migration strategy and revenue
            break-even timelines all require careful planning.
          </p>
          <p className="text-white/70 leading-relaxed">
            Executive Partners advises senior bankers at this decision point. We assess EAM
            readiness across five dimensions — AUM portability, regulatory licensing, custodian
            access, product scope and operational infrastructure — and provide a structured
            transition roadmap before any platform approach is made. Use our{" "}
            <Link href="/en/portability" className="text-[#C9A14A] hover:underline">
              Portability Readiness Score
            </Link>{" "}
            as a starting point.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            EAM Platforms Hiring Front-Office Talent
          </h2>
          <p className="text-white/70 leading-relaxed">
            Established EAMs and multi-family offices building out their front-office teams face a
            specific recruitment challenge: they need senior Relationship Managers who are
            genuinely EAM-ready — with a portable book, a track record of independent client
            ownership and the commercial discipline to operate outside a large bank infrastructure.
            Generic recruitment firms cannot screen for this. We can.
          </p>
          <p className="text-white/70 leading-relaxed">
            Our EP Second Interview Framework includes a dedicated EAM portability risk block that
            assesses whether a candidate has the client relationships, regulatory permissions and
            commercial profile to succeed in an independent setting. Hiring committees receive a
            structured dossier with a portability score, a business case and a risk assessment —
            not a CV.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Geneva and Zurich EAM Market
          </h2>
          <p className="text-white/70 leading-relaxed">
            Geneva remains the centre of gravity for Swiss EAMs, particularly for international
            client books covering LATAM, MEA, CIS/CEE, Italian offshore and Asian markets. Zurich
            has a stronger onshore Swiss and DACH-focused EAM cluster. We are active in both
            markets and maintain relationships with the leading independent platforms, custodian
            banks and FINMA-licensed EAM structures across Switzerland.
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Confidential. No Obligation.
          </h2>
          <p className="text-white/70 leading-relaxed">
            Whether you are a senior banker evaluating the EAM transition or an independent
            platform looking to hire, the first conversation with Executive Partners is fully
            confidential. We do not charge candidates at any stage. For hiring mandates, we work
            on a retained basis with a small number of EAM clients at any one time.
          </p>
          <p className="text-white/70 leading-relaxed">
            To start a confidential conversation, use our{" "}
            <Link href="/en/contact" className="text-[#C9A14A] hover:underline">
              contact form
            </Link>{" "}
            or explore our{" "}
            <Link href="/en/jobs" className="text-[#C9A14A] hover:underline">
              active mandates
            </Link>
            . You can also run a{" "}
            <Link href="/en/bp-simulator" className="text-[#C9A14A] hover:underline">
              Business Plan Simulation
            </Link>{" "}
            to model what the EAM economics would look like for your specific book.
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
              href="/en/portability"
              className="text-sm text-white/60 hover:text-white underline underline-offset-4"
            >
              Portability Score
            </Link>
            <Link
              href="/en/markets/geneva"
              className="text-sm text-white/60 hover:text-white underline underline-offset-4"
            >
              Geneva market
            </Link>
            <Link
              href="/en/markets/zurich"
              className="text-sm text-white/60 hover:text-white underline underline-offset-4"
            >
              Zurich market
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}