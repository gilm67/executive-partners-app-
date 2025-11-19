// app/candidates/page.tsx
import Link from "next/link";
import type { Metadata } from "next";

import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import type { Locale } from "@/lib/i18n/types";

export const revalidate = 60;

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.execpartners.ch");

export const metadata: Metadata = {
  title: "Private Banking Careers — Candidates | Executive Partners",
  description:
    "Confidential moves for Private Bankers and Senior Relationship Managers. Geneva & Zurich first, plus Dubai, Singapore, London and New York. Submit your CV securely.",
  alternates: { canonical: `${SITE}/candidates` },
  openGraph: {
    title: "Private Banking Careers — Candidates | Executive Partners",
    description:
      "Discreet executive search for HNW/UHNW Private Banking. Switzerland-focused with global reach.",
    url: `${SITE}/candidates`,
    images: [{ url: "/og.png" }],
  },
};

/* ---------- Locale copy (EN / FR / DE) ---------- */

const CANDIDATE_COPY: Record<
  Locale,
  {
    eyebrow: string;
    h1: string;
    intro: string;
    linkJobs: string;
    linkSubmitCv: string;
    linkContact: string;
    howTitle: string;
    howBullets: string[];
    howTip: string;
    getStartedTitle: string;
    primaryCta: string;
    secondaryJobs: string;
    secondaryBPSim: string;
    faqTitle: string;
    faqs: { q: string; a: string }[];
  }
> = {
  en: {
    eyebrow: "For Candidates · Private Banking Careers",
    h1: "Confidential Moves for Private Bankers",
    intro:
      "Geneva & Zurich first—plus Dubai, Singapore, London and New York. Share your profile in confidence and we’ll contact you when there’s a strong fit.",
    linkJobs: "View Private Banking Jobs",
    linkSubmitCv: "Submit CV",
    linkContact: "Contact a Recruiter",
    howTitle: "How it works",
    howBullets: [
      "Your details are stored securely and never shared without consent.",
      "We match you to current & upcoming mandates that fit your market and seniority.",
      "You can also apply directly to any role on the Jobs page.",
    ],
    howTip:
      "Tip: include preferred market(s), AUM portability, and mobility.",
    getStartedTitle: "Get started",
    primaryCta: "Submit my profile (confidential)",
    secondaryJobs: "View current opportunities",
    secondaryBPSim: "For RMs: BP Simulator / Tools",
    faqTitle: "FAQs",
    faqs: [
      {
        q: "Is my application confidential?",
        a: "Yes. We operate quiet processes and never share your CV without explicit permission.",
      },
      {
        q: "Which markets do you cover?",
        a: "Geneva and Zurich as a priority, plus Dubai, Singapore, London, New York and Hong Kong.",
      },
      {
        q: "What seniorities do you place?",
        a: "Senior Relationship Managers (Director/ED/MD), Team Heads, Market/Desk Leads and leadership.",
      },
    ],
  },

  fr: {
    eyebrow: "Candidats · Carrières en Banque Privée",
    h1: "Mouvements confidentiels pour banquiers privés",
    intro:
      "Genève & Zurich en priorité — avec des mandats actifs à Dubaï, Singapour, Londres et New York. Partagez votre profil en toute confidentialité, nous revenons vers vous lorsqu’il y a un fort matching.",
    linkJobs: "Voir les offres en Banque Privée",
    linkSubmitCv: "Envoyer mon CV",
    linkContact: "Contacter un recruteur",
    howTitle: "Comment cela fonctionne",
    howBullets: [
      "Vos informations sont stockées de manière sécurisée et jamais partagées sans votre accord.",
      "Nous vous positionnons sur des mandats actuels & à venir, en ligne avec votre marché et votre séniorité.",
      "Vous pouvez également postuler directement aux rôles publiés sur la page Jobs.",
    ],
    howTip:
      "Conseil : précisez vos marchés cibles, la portabilité estimée de votre portefeuille et votre mobilité.",
    getStartedTitle: "Commencer",
    primaryCta: "Envoyer mon profil (confidentiel)",
    secondaryJobs: "Voir les opportunités actuelles",
    secondaryBPSim: "Pour RMs : BP Simulator / Outils",
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        q: "Ma démarche est-elle confidentielle ?",
        a: "Oui. Nous travaillons de manière discrète et ne partageons jamais votre CV sans votre accord explicite.",
      },
      {
        q: "Quels marchés couvrez-vous ?",
        a: "Genève et Zurich en priorité, avec des mandats à Dubaï, Singapour, Londres, New York et Hong Kong.",
      },
      {
        q: "Quels niveaux de séniorité placez-vous ?",
        a: "Senior Relationship Managers (Director/ED/MD), Team Heads, responsables de marchés / desks et fonctions de leadership.",
      },
    ],
  },

  de: {
    eyebrow: "Kandidaten · Private Banking Karrieren",
    h1: "Diskrete Wechsel für Private Banker",
    intro:
      "Genf & Zürich zuerst – mit Mandaten in Dubai, Singapur, London und New York. Teilen Sie Ihr Profil vertraulich, wir melden uns bei einem klaren Match.",
    linkJobs: "Aktuelle Private-Banking-Jobs ansehen",
    linkSubmitCv: "CV einreichen",
    linkContact: "Recruiter kontaktieren",
    howTitle: "So funktioniert es",
    howBullets: [
      "Ihre Angaben werden sicher gespeichert und niemals ohne Ihre Zustimmung weitergegeben.",
      "Wir matchen Sie mit aktuellen und kommenden Mandaten, die zu Ihrem Markt und Ihrer Seniorität passen.",
      "Sie können sich zusätzlich direkt auf Rollen auf der Jobs-Seite bewerben.",
    ],
    howTip:
      "Tipp: Geben Sie bevorzugte Märkte, Portabilität Ihres Buches und Mobilität an.",
    getStartedTitle: "Jetzt starten",
    primaryCta: "Profil vertraulich einreichen",
    secondaryJobs: "Aktuelle Vakanzen ansehen",
    secondaryBPSim: "Für RMs: BP Simulator / Tools",
    faqTitle: "FAQs",
    faqs: [
      {
        q: "Ist meine Bewerbung vertraulich?",
        a: "Ja. Wir arbeiten sehr diskret und geben Ihren CV niemals ohne Ihr ausdrückliches Einverständnis weiter.",
      },
      {
        q: "Welche Märkte decken Sie ab?",
        a: "Genf und Zürich als Priorität sowie Dubai, Singapur, London, New York und Hongkong.",
      },
      {
        q: "Auf welcher Seniorität platzieren Sie?",
        a: "Senior Relationship Manager (Director/ED/MD), Team Heads, Markt-/Desk-Leads und ausgewählte Führungsfunktionen.",
      },
    ],
  },
};

/* ---------- Page component (layout unchanged) ---------- */

export default function CandidatesPage({ locale }: { locale?: Locale }) {
  const lang: Locale = locale && locale in CANDIDATE_COPY ? locale : "en";
  const t = CANDIDATE_COPY[lang];
  const basePath = lang === "en" ? "" : `/${lang}`;

  // JSON-LD: FAQ (rich results) – uses locale copy
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  // JSON-LD: Breadcrumbs (kept pointing to /candidates for all locales)
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Candidates",
        item: `${SITE}/candidates`,
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* ambient background glow – gold themed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 55%), radial-gradient(1000px 380px at 110% 0%, rgba(245,231,192,.20) 0%, rgba(245,231,192,0) 60%)",
        }}
      />

      <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-14">
        {/* SEO H1 */}
        <header className="mx-auto max-w-5xl space-y-3 text-center">
          <p className="mx-auto text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
            {t.eyebrow}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {t.h1}
          </h1>
          <p className="mx-auto max-w-3xl text-neutral-300">{t.intro}</p>

          {/* helpful internal links */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
            <Link
              href={`${basePath}/jobs`}
              className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
            >
              {t.linkJobs}
            </Link>
            <Link
              href={`${basePath}/apply`}
              className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
            >
              {t.linkSubmitCv}
            </Link>
            <Link
              href={`${basePath}/contact`}
              className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white"
            >
              {t.linkContact}
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Left: quick explanation */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="mb-2 text-lg font-bold text-white">
              {t.howTitle}
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-neutral-300">
              {t.howBullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-neutral-400">{t.howTip}</p>
          </div>

          {/* Right: actions */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="mb-4 text-lg font-bold text-white">
              {t.getStartedTitle}
            </h2>
            <div className="space-y-3">
              <PrimaryButton href={`${basePath}/apply`} className="w-full">
                {t.primaryCta}
              </PrimaryButton>

              <SecondaryButton href={`${basePath}/jobs`} className="w-full">
                {t.secondaryJobs}
              </SecondaryButton>

              <SecondaryButton
                href={`${basePath}/bp-simulator?src=candidates_cta`}
                className="w-full"
              >
                {t.secondaryBPSim}
              </SecondaryButton>
            </div>
          </div>
        </div>

        {/* Small FAQ section matching JSON-LD */}
        <section className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-bold">{t.faqTitle}</h2>
          <div className="mt-4 space-y-4 text-sm text-neutral-300">
            {t.faqs.map((f, idx) => (
              <div key={idx}>
                <div className="font-semibold text-white">{f.q}</div>
                <p className="mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}