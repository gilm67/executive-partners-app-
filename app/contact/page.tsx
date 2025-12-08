// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from "./ContactForm";

/* ---------------- helpers ---------------- */
function siteBase() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "https://www.execpartners.ch";
  const url = fromEnv.startsWith("http") ? fromEnv : `https://${fromEnv}`;
  return url.replace(/\/$/, "");
}

const SITE = siteBase();
const PAGE_URL = `${SITE}/contact`;

/* ---------------- metadata ---------------- */
export const metadata: Metadata = {
  title: "Contact Executive Partners | Private Banking Recruitment (Geneva)",
  description:
    "Contact Executive Partners for confidential searches in private banking and wealth management. Geneva HQ with mandates across Switzerland, UK, US, Dubai, Singapore & Hong Kong.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Contact Executive Partners",
    siteName: "Executive Partners",
    description:
      "Confidential private banking & wealth management recruitment. Geneva-based, globally connected.",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Executive Partners",
    description:
      "Private Banking & Wealth Management executive search — Geneva HQ, international reach.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  // ---------- Structured Data (JSON-LD) ----------
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "Executive Partners",
    url: SITE,
    image: `${SITE}/og.png`,
    logo: `${SITE}/icon.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "118 rue du Rhône",
      addressLocality: "Geneva",
      postalCode: "1204",
      addressCountry: "CH",
    },
    areaServed: ["CH", "GB", "US", "AE", "SG", "HK"],
    // Email intentionally omitted to reduce spam harvesting
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "General",
        availableLanguage: ["en", "fr", "de"],
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Contact", item: PAGE_URL },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you handle confidential mandates?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Many of our searches are confidential. We only introduce shortlists to the client and do not share your profile without your consent.",
        },
      },
      {
        "@type": "Question",
        name: "Which markets do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Switzerland first (Geneva & Zurich) with mandates across the UK, US, Dubai, Singapore and Hong Kong.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly will you respond?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We typically respond the same business day. If your request is time-sensitive, please mention this in your message.",
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 text-white md:py-16">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* HERO */}
      <header className="mb-10 md:mb-12">
        <p className="eyebrow text-[#F5D778]">Private Banking &amp; Wealth Management</p>
        <h1 className="mt-3">
          Contact Executive Partners
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-neutral-300 md:text-[0.95rem]">
          Geneva-based executive search boutique focusing on private banking and
          wealth management. We work primarily across Switzerland (Geneva &amp; Zurich)
          and key hubs including London, Dubai, Singapore and Hong Kong. We typically
          respond the same business day.
        </p>
      </header>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-5">
        {/* LEFT: form panel */}
        <section className="md:col-span-3 h-full">
          <div className="h-full rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur md:p-7">
            <ContactForm />
          </div>
        </section>

        {/* RIGHT: info card + map */}
        <aside className="md:col-span-2 h-full">
          <div className="flex h-full flex-col gap-4">
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.7)] backdrop-blur">
              <h2 className="text-sm font-semibold text-neutral-50">
                Executive Partners — Geneva
              </h2>

              <div className="mt-3 text-sm text-neutral-300">
                <p className="font-medium text-neutral-100">Head Office</p>
                <p>118 rue du Rhône</p>
                <p>1204 Geneva</p>
                <p>Switzerland</p>
              </div>

              <div className="my-4 h-px w-full bg-white/10" />

              <h3 className="text-sm font-semibold text-neutral-100">
                Typical mandates
              </h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-neutral-300">
                <li>Relationship Managers &amp; Team Heads (HNW / UHNW)</li>
                <li>Market Leaders (CH, MEA, UK, APAC, LatAm)</li>
                <li>Front-support roles (Investor Protection, Risk, COO)</li>
                <li>Private Markets distribution &amp; advisory</li>
              </ul>

              <p className="mt-4 text-xs text-neutral-400">
                Meetings in Geneva are by appointment only. Use the form to
                request a call or meeting, and we will confirm availability.
              </p>
            </div>

            <div className="flex-1 overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
              <iframe
                title="Executive Partners – 118 rue du Rhône, 1204 Geneva"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Executive%20Partners%20118%20rue%20du%20Rh%C3%B4ne%201204%20Geneva&output=embed"
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}