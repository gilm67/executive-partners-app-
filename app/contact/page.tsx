// app/contact/page.tsx
import type { Metadata } from "next";
import ContactForm from "./ContactForm";

/* ---------------- locale copy ---------------- */

import type { Locale } from "@/lib/i18n/types";

// Restrict UI locales we actually support on this page
type UiLocale = "en" | "fr" | "de";

const CONTACT_COPY: Record<
  UiLocale,
  {
    title: string;
    subtitle: string;
    headOfficeLabel: string;
    typicalMandatesLabel: string;
    meetingNote: string;
  }
> = {
  en: {
    title: "Contact Executive Partners",
    subtitle:
      "Geneva-based. Mandates across Switzerland, the UK, the US, Dubai, Singapore & Hong Kong. We typically respond the same business day.",
    headOfficeLabel: "Head Office",
    typicalMandatesLabel: "Typical Mandates",
    meetingNote:
      "Meetings by appointment. Use the contact form to request a call or meeting time.",
  },
  de: {
    title: "Kontakt Executive Partners",
    subtitle:
      "Mit Sitz in Genf. Mandate in der Schweiz, im Vereinigten Königreich, in den USA, Dubai, Singapur & Hongkong. Wir antworten in der Regel am selben Werktag.",
    headOfficeLabel: "Hauptsitz",
    typicalMandatesLabel: "Typische Mandate",
    meetingNote:
      "Termine nach Vereinbarung. Bitte nutzen Sie das Kontaktformular, um einen Rückruf oder Termin anzufragen.",
  },
  fr: {
    title: "Contact Executive Partners",
    subtitle:
      "Basé à Genève. Mandats en Suisse, au Royaume-Uni, aux États-Unis, à Dubaï, Singapour & Hong Kong. Nous répondons généralement le jour ouvrable même.",
    headOfficeLabel: "Siège",
    typicalMandatesLabel: "Mandats typiques",
    meetingNote:
      "Rendez-vous sur demande. Merci d’utiliser le formulaire pour proposer un créneau ou demander un appel.",
  },
};

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

export default function ContactPage({ locale }: { locale?: Locale }) {
  const SUPPORTED: UiLocale[] = ["en", "fr", "de"];

  const lang: UiLocale = SUPPORTED.includes(locale as UiLocale)
    ? (locale as UiLocale)
    : "en";

  const copy = CONTACT_COPY[lang];

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
    // ❌ Email removed to reduce spam harvesting
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

      <header className="mb-10">
        <h1 className="page-title">{copy.title}</h1>
        <p className="mt-2 text-sm text-neutral-400">{copy.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-5">
        {/* LEFT: form panel */}
        <section className="md:col-span-3 h-full">
          <div className="h-full rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            {/* pass effective locale to the form */}
            <ContactForm locale={lang as Locale} />
          </div>
        </section>

        {/* RIGHT: info card + map */}
        <aside className="md:col-span-2 h-full">
          <div className="flex h-full flex-col">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
              <h2 className="text-sm font-semibold text-neutral-200">
                Executive Partners
              </h2>
              <div className="mt-2 text-sm text-neutral-400">
                <p className="font-medium text-neutral-200">
                  {copy.headOfficeLabel}
                </p>
                <p>118 rue du Rhône</p>
                <p>1204 Geneva</p>
                <p>Switzerland</p>
              </div>

              <div className="my-4 h-px w-full bg-neutral-800" />

              <h3 className="text-sm font-semibold text-neutral-200">
                {copy.typicalMandatesLabel}
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-neutral-400">
                <li>Relationship Managers &amp; Team Heads (UHNW/HNW)</li>
                <li>Market Leaders (CH, MEA, UK, APAC, LatAm)</li>
                <li>Investor Protection, Risk &amp; COO roles</li>
                <li>Private Markets distribution &amp; advisory</li>
              </ul>

              <p className="mt-4 text-xs text-neutral-500">
                {copy.meetingNote}
              </p>
            </div>

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