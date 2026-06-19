import type { Metadata } from "next";
import Link from "next/link";

export const revalidate = 1800; // 30 min

export const metadata: Metadata = {
  title: "Private Banking Recruiter Tel Aviv | Israel Wealth Management Search",
  description:
    "Executive Partners is the specialist private banking recruiter for the Israeli market. Senior RM, Team Head and Desk Head mandates covering UHNW/HNW Israeli clients from Geneva, Zurich and Tel Aviv.",
  alternates: {
    canonical: "https://www.execpartners.ch/en/private-banking-recruiter-tel-aviv",
  },
  openGraph: {
    title: "Private Banking Recruiter Tel Aviv | Israel Wealth Management Search",
    description:
      "Senior RM and Team Head mandates for the Israeli private banking market. Cross-border and onshore coverage from Geneva, Zurich and Tel Aviv.",
    url: "https://www.execpartners.ch/en/private-banking-recruiter-tel-aviv",
    siteName: "Executive Partners",
    type: "website",
    images: [{ url: "https://www.execpartners.ch/images/markets/tel-aviv-hero.webp", width: 1200, height: 630 }],
  },
};

export default function TelAvivRecruiterPage() {
  return (
    <main id="main" className="min-h-[70vh] px-6 py-20 md:px-16 max-w-4xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-brand-gold mb-4">
        Executive Search · Tel Aviv · Israeli Market
      </p>

      <h1 className="text-3xl md:text-4xl font-light text-white mb-6">
        Private Banking Recruiter Tel Aviv
      </h1>

      <p className="text-white/70 leading-relaxed mb-8 max-w-2xl">
        Executive Partners is a Geneva-based boutique executive search firm specialising
        exclusively in Private Banking and Wealth Management. We work with leading Swiss
        and international private banks building or expanding Israeli-market coverage —
        whether from Geneva and Zurich or through onshore representative offices in Tel Aviv.
      </p>

      <p className="text-white/70 leading-relaxed mb-8 max-w-2xl">
        Israel is one of the most concentrated pools of technology-generated private wealth
        outside the United States. With 41 USD billionaires as of 2025, approximately
        USD 80 billion in high-tech exits during 2025 alone, and a dense network of Swiss
        private banking representation in Herzliya Pituach, the Israeli market demands bankers
        with genuine Hebrew-language capability, cross-border structuring fluency, and credible
        relationships with tech-founder wealth.
      </p>

      <h2 className="text-xl font-semibold text-white mb-4 mt-10">
        What we recruit for in the Israeli market
      </h2>
      <ul className="text-white/70 space-y-2 mb-10 list-disc list-inside">
        <li>Senior Relationship Manager — Israeli Market (Geneva or Zurich based)</li>
        <li>Israeli Desk Head — Cross-Border Coverage</li>
        <li>Private Banker — Tech-Entrepreneur Segment</li>
        <li>Onshore Relationship Manager (Tel Aviv representative office)</li>
        <li>Market Leader — Israel Coverage Build-Out</li>
      </ul>

      <h2 className="text-xl font-semibold text-white mb-4">
        The Israeli private banking market
      </h2>
      <p className="text-white/70 leading-relaxed mb-6 max-w-2xl">
        UBS, Julius Baer, EFG International, Lombard Odier, Citi Private Bank, Rothschild,
        Dreyfus Bank and Union Bancaire Privée all maintain a presence in Israel. HSBC
        operates a full branch. The density of Swiss private banking representation in a
        single metropolitan area reflects the structural importance of the Israeli client
        segment for Geneva-based institutions. Booking centres are Geneva, Zurich and
        Luxembourg; onshore offices operate as non-transactional advisory entities under
        ISA regulation.
      </p>

      <div className="flex flex-wrap gap-4 mt-10">
        <Link
          href="/en/markets/tel-aviv"
          className="rounded-full bg-brand-gold px-6 py-2.5 text-sm font-semibold text-brand-bg hover:opacity-90 transition"
        >
          Tel Aviv market intelligence →
        </Link>
        <Link
          href="/en/contact"
          className="rounded-full border border-white/20 px-6 py-2.5 text-sm text-white/70 hover:text-white hover:border-white/40 transition"
        >
          Brief a mandate
        </Link>
        <Link
          href="/en/candidates"
          className="rounded-full border border-white/20 px-6 py-2.5 text-sm text-white/70 hover:text-white hover:border-white/40 transition"
        >
          Share your profile
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Executive Partners — Private Banking Recruiter Tel Aviv",
            description:
              "Geneva-based executive search boutique specialising in private banking and wealth management recruitment for the Israeli market.",
            url: "https://www.execpartners.ch/en/private-banking-recruiter-tel-aviv",
            areaServed: ["IL", "CH", "LU"],
            serviceType: "Executive Search",
            provider: {
              "@type": "Organization",
              name: "Executive Partners",
              url: "https://www.execpartners.ch",
            },
          }),
        }}
      />
    </main>
  );
}
