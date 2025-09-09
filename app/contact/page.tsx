// app/contact/page.tsx
import ContactForm from "./ContactForm";
import type { Metadata } from "next";

/* ---------------- helpers ---------------- */
function siteBase() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || "https://www.execpartners.ch";
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "General",
        email: "contact@execpartners.ch",
        availableLanguage: ["en", "fr", "de"],
      },
    ],
    sameAs: [
      // Add/adjust when ready:
      // "https://www.linkedin.com/company/<your-handle>"
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
            "Yes. Most of our searches are confidential. We only introduce shortlists to the client and never share your profile without consent.",
        },
      },
      {
        "@type": "Question",
        name: "Which markets do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Switzerland first (Geneva & Zurich) with active mandates in the UK, US, Dubai, Singapore and Hong Kong.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly will you respond?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We typically respond the same business day. If urgent, include timing in your message.",
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Contact Executive Partners
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Geneva-based. Mandates across Switzerland, the UK, the US, Dubai, Singapore &amp; Hong Kong.
          We typically respond the same business day.
        </p>
      </header>

      {/* Make both columns equal height */}
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-5">
        {/* LEFT: form in a full-height panel */}
        <section className="md:col-span-3 h-full">
          <div className="h-full rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <ContactForm />
          </div>
        </section>

        {/* RIGHT: info card + map; map grows to match left column bottom */}
        <aside className="md:col-span-2 h-full">
          <div className="flex h-full flex-col">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
              <h2 className="text-sm font-semibold text-neutral-200">Executive Partners</h2>
              <div className="mt-2 text-sm text-neutral-400">
                <p className="font-medium text-neutral-200">Head Office</p>
                <p>118 rue du Rhône</p>
                <p>1204 Geneva</p>
                <p>Switzerland</p>
              </div>

              <div className="my-4 h-px w-full bg-neutral-800" />

              <h3 className="text-sm font-semibold text-neutral-200">Typical Mandates</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-neutral-400">
                <li>Relationship Managers &amp; Team Heads (UHNW/HNW)</li>
                <li>Market Leaders (CH, MEA, UK, APAC, LatAm)</li>
                <li>Investor Protection, Risk &amp; COO roles</li>
                <li>Private Markets distribution &amp; advisory</li>
              </ul>

              <p className="mt-4 text-xs text-neutral-500">
                Meetings by appointment.{" "}
                <a className="underline underline-offset-2" href="/contact">
                  Get in touch
                </a>{" "}
                to schedule a time.
              </p>
            </div>

            {/* Map fills remaining height so the right column bottom lines up with the left */}
            <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
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