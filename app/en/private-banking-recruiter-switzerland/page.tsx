import { Metadata } from "next";

const SITE = "https://www.execpartners.ch";
const PAGE_URL = `${SITE}/en/private-banking-recruiter-switzerland`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  name: "Executive Partners – Private Banking Recruiter Switzerland",
  url: PAGE_URL,
  image: `${SITE}/og.webp`,
  logo: `${SITE}/icon.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "118 rue du Rhône",
    addressLocality: "Geneva",
    postalCode: "1204",
    addressCountry: "CH",
  },
  areaServed: ["Switzerland", "Geneva", "Zurich", "Europe"],
  industry: "Private Banking & Wealth Management Recruitment",
  sameAs: ["https://www.linkedin.com/company/executive-partners", SITE],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Markets", item: `${SITE}/en/markets` },
    { "@type": "ListItem", position: 3, name: "Private Banking Recruiter – Switzerland", item: PAGE_URL },
  ],
};

export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Switzerland | Senior RMs, Geneva & Zurich – Executive Partners" },
  description:
    "Switzerland's specialist executive search firm for private banking. Senior Relationship Managers, Team Heads and UHNW bankers placed across Geneva and Zurich. 200+ placements. Fully confidential.",
  alternates: { canonical: "https://www.execpartners.ch/en/private-banking-recruiter-switzerland" },
  twitter: {
    card: "summary_large_image",
    title: "Executive Recruitment Switzerland | Private Banking Recruiter",
    description: "Executive recruitment in Switzerland for senior private banking professionals. Senior RMs, Team Heads and Market Leaders placed confidentially across Geneva, Zurich and global wealth hubs.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="min-h-screen bg-[#0B0E13] text-white py-20 px-4">
      <div className="container-max max-w-3xl space-y-8">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Private Banking & Wealth Management Recruiter in Switzerland
        </h1>

        <p className="text-white/80 text-lg">
          Executive Partners is a Geneva-based executive search firm specialised in
          Private Banking and Wealth Management. We recruit Senior Relationship
          Managers, Private Bankers, Desk Heads, Team Leaders and Wealth Planners
          for major Swiss and international banks in Geneva and Zurich.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Why Private Bankers Choose Us
        </h2>
        <p className="text-white/70">
          Our approach is fully discreet and tailored. We assess your portability,
          client base, compensation expectations, growth opportunities and cultural
          fit. Over 200 senior bankers have advanced their careers through our
          confidential process.
        </p>

        <h2 className="text-2xl font-semibold mt-12">
          Coverage in Geneva & Zurich
        </h2>
        <p className="text-white/70">
          We work with Swiss and international banks across Geneva, Zurich and
          global wealth hubs — London, Dubai, Singapore, Hong Kong, New York and
          Miami. Our mandates include UHNW desks, HNW desks, EAM coverage, Wealth
          Planning and Market Head roles.
        </p>

        <h2 className="text-2xl font-semibold mt-12">Apply Confidentially</h2>
        <p className="text-white/70">
          If you are a Private Banker with a portable UHNW/HNW portfolio, you can
          apply confidentially. We only present your profile with explicit
          permission.
        </p>

        <div className="pt-6">
          <a
            href="/en/apply"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-emerald-400 text-black hover:bg-emerald-300 transition"
          >
            Apply confidentially
          </a>
        </div>
      </div>
      </main>
    </>
  );
}