import Link from "next/link";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import type { Locale } from "@/lib/i18n/types";

/* --------- locale copy (EN / FR / DE) --------- */

type HiringCopy = {
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;

  stat1Title: string;
  stat1Body: string;
  stat2Title: string;
  stat2Body: string;
  stat3Title: string;
  stat3Body: string;

  bpTitle: string;
  bpBodyPrefix: string;
  bpBodyHighlight: string;
  bpBodySuffix: string;
  bpBullet1: string;
  bpBullet2: string;
  bpBullet3: string;
  bpButton: string;
  bpNote: string;

  briefTitle: string;
  briefBody: string;
  briefBullet1: string;
  briefBullet2: string;
  briefBullet3: string;
  briefPrimaryButton: string;
  briefSecondaryButton: string;
  briefFootnoteBeforeLink: string;
  briefFootnoteLinkLabel: string;
  briefFootnoteAfterLink: string;
};

const HM_COPY: Record<Locale, HiringCopy> = {
  en: {
    heroKicker: "For Hiring Managers",
    heroTitle: "Targeted senior hires in Private Banking & Wealth Management",
    heroSubtitle:
      "We work with Desk Heads, Market Leaders and COOs across Switzerland, the UK, US, Dubai, Singapore and Hong Kong to build and strengthen front-office teams with real AUM portability and long-term retention.",
    heroPrimaryCta: "Contact us about a hire",
    heroSecondaryCta: "View live mandates",

    stat1Title: "200+ senior placements",
    stat1Body: "Director / MD RMs, Team Heads and Market Leaders.",
    stat2Title: "Real AUM portability",
    stat2Body:
      "We screen for book composition, cross-border and platform fit.",
    stat3Title: "12+ booking centres",
    stat3Body: "CH, UK, US, MEA, LATAM and APAC private-banking hubs.",

    bpTitle: "Test a 3-year business plan before you hire",
    bpBodyPrefix: "Use our",
    bpBodyHighlight: "Business Plan Simulator",
    bpBodySuffix:
      "to model NNM, ROA and net margin for a specific RM or team before you open a mandate.",
    bpBullet1: "3-year view on NNM, revenue, fixed cost and net margin",
    bpBullet2: "Scenario analysis with conservative vs ambitious targets",
    bpBullet3: "Exportable PDF to share internally with COOs / HR / ExCo",
    bpButton: "Open the Business Plan Simulator",
    bpNote:
      "No login required. Use anonymised data (AUM, NNM, ROA, fixed costs) for pre-mandate calibration.",

    briefTitle: "Share a brief (no portals, no admin token)",
    briefBody:
      "Send us a short description of the mandate – booking centre, market focus, seniority, regulatory requirements and product scope – and we will revert the same business day with clarifying questions or a proposed call slot.",
    briefBullet1: "Director / MD RMs, Team Heads and Market Leaders",
    briefBullet2: "Swiss onshore, international desks and booking centres",
    briefBullet3: "Coverage across CH, UK, US, MEA, LATAM and APAC",
    briefPrimaryButton: "Send us your brief",
    briefSecondaryButton: "Explore AUM portability",
    briefFootnoteBeforeLink:
      "Existing clients with a secure posting link can continue to use their private URL to create or update roles. If you need your secure link resent, please",
    briefFootnoteLinkLabel: "contact us",
    briefFootnoteAfterLink: ".",
  },

  fr: {
    heroKicker: "Pour les employeurs",
    heroTitle:
      "Recrutements de cadres en Banque Privée & Wealth Management",
    heroSubtitle:
      "Nous travaillons avec des Desk Heads, Market Leaders et COOs en Suisse, au Royaume-Uni, aux États-Unis, à Dubaï, Singapour et Hong Kong pour renforcer les équipes front-office avec une vraie portabilité d’AUM et une rétention durable.",
    heroPrimaryCta: "Nous contacter pour un recrutement",
    heroSecondaryCta: "Voir les mandats en cours",

    stat1Title: "200+ placements seniors",
    stat1Body: "RMs Director / MD, Team Heads et Market Leaders.",
    stat2Title: "Portabilité d’AUM réelle",
    stat2Body:
      "Screening détaillé du book, du cross-border et de l’adéquation plateforme.",
    stat3Title: "12+ booking centres",
    stat3Body:
      "Hubs de Banque Privée en CH, UK, US, MEA, LATAM et APAC.",

    bpTitle: "Tester un business plan sur 3 ans avant de recruter",
    bpBodyPrefix: "Utilisez notre",
    bpBodyHighlight: "Business Plan Simulator",
    bpBodySuffix:
      "pour modéliser NNM, ROA et marge nette pour un RM ou une équipe avant d’ouvrir un mandat.",
    bpBullet1:
      "Vue à 3 ans sur NNM, revenus, coûts fixes et marge nette",
    bpBullet2:
      "Scénarios comparant objectifs conservateurs et ambitieux",
    bpBullet3: "PDF exportable à partager avec COO, RH et ExCo",
    bpButton: "Ouvrir le Business Plan Simulator",
    bpNote:
      "Aucun login requis. Utilisez des données anonymisées (AUM, NNM, ROA, coûts fixes) pour calibrer le mandat en amont.",

    briefTitle: "Partagez un brief (sans portail, sans accès admin)",
    briefBody:
      "Envoyez-nous une description concise du mandat – booking centre, marché cible, séniorité, exigences réglementaires et périmètre produit – et nous revenons vers vous le jour ouvrable même avec des questions ciblées ou une proposition de créneau.",
    briefBullet1: "RMs Director / MD, Team Heads et Market Leaders",
    briefBullet2:
      "Desks Switzerland onshore, internationaux et booking centres cross-border",
    briefBullet3: "Couverture CH, UK, US, MEA, LATAM et APAC",
    briefPrimaryButton: "Envoyer un brief",
    briefSecondaryButton: "Explorer la portabilité d’AUM",
    briefFootnoteBeforeLink:
      "Les clients disposant déjà d’un lien sécurisé peuvent continuer à utiliser leur URL privée pour créer ou mettre à jour des postes. Si vous souhaitez le recevoir à nouveau, merci de",
    briefFootnoteLinkLabel: "nous contacter",
    briefFootnoteAfterLink: ".",
  },

  de: {
    heroKicker: "Für Auftraggeber",
    heroTitle:
      "Gezielte Senior Hires im Private Banking & Wealth Management",
    heroSubtitle:
      "Wir arbeiten mit Desk Heads, Market Leaders und COOs in der Schweiz, im Vereinigten Königreich, in den USA, Dubai, Singapur und Hongkong zusammen, um Front-Office-Teams mit echter AUM-Portabilität und nachhaltiger Retention aufzubauen.",
    heroPrimaryCta: "Kontaktieren Sie uns zu einer Besetzung",
    heroSecondaryCta: "Aktuelle Mandate ansehen",

    stat1Title: "200+ Senior-Besetzungen",
    stat1Body: "Director / MD RMs, Team Heads und Market Leaders.",
    stat2Title: "Echte AUM-Portabilität",
    stat2Body:
      "Wir prüfen Buchstruktur, Cross-Border-Profil und Plattform-Fit.",
    stat3Title: "12+ Booking-Center",
    stat3Body:
      "Private-Banking-Hubs in CH, UK, US, MEA, LATAM und APAC.",

    bpTitle: "3-Jahres-Business-Plan testen, bevor Sie einstellen",
    bpBodyPrefix: "Nutzen Sie unseren",
    bpBodyHighlight: "Business Plan Simulator",
    bpBodySuffix:
      "um NNM, ROA und Nettomarge für einen konkreten RM oder ein Team zu modellieren, bevor Sie ein Mandat eröffnen.",
    bpBullet1:
      "3-Jahres-Perspektive auf NNM, Ertrag, Fixkosten und Nettomarge",
    bpBullet2:
      "Szenarioanalyse mit konservativen vs. ambitionierten Zielen",
    bpBullet3:
      "Exportierbares PDF für COO, HR und ExCo",
    bpButton: "Business Plan Simulator öffnen",
    bpNote:
      "Kein Login erforderlich. Nutzen Sie anonymisierte Daten (AUM, NNM, ROA, Fixkosten) zur Vor-Kalibrierung eines Mandats.",

    briefTitle:
      "Mandatsbrief teilen (ohne Portal, ohne Admin-Token)",
    briefBody:
      "Senden Sie uns eine kurze Beschreibung des Mandats – Booking Center, Marktfokus, Seniorität, regulatorische Anforderungen und Produktscope – und wir melden uns am selben Werktag mit Rückfragen oder einem Terminvorschlag.",
    briefBullet1:
      "Director / MD RMs, Team Heads und Market Leaders",
    briefBullet2:
      "Schweiz Onshore, internationale Desks und Booking-Center",
    briefBullet3: "Abdeckung CH, UK, US, MEA, LATAM und APAC",
    briefPrimaryButton: "Mandatsbrief senden",
    briefSecondaryButton: "AUM-Portabilität prüfen",
    briefFootnoteBeforeLink:
      "Bestehende Kunden mit einem sicheren Posting-Link können weiterhin ihre private URL nutzen, um Rollen anzulegen oder zu aktualisieren. Wenn Sie Ihren Link erneut benötigen,",
    briefFootnoteLinkLabel: "kontaktieren Sie uns bitte",
    briefFootnoteAfterLink: ".",
  },
};

/* --------- page --------- */

export default function HiringManagersPage({
  locale,
}: {
  locale?: Locale;
}) {
  const lang: Locale =
    locale && ["en", "fr", "de"].includes(locale) ? locale : "en";
  const t = HM_COPY[lang];
  const basePath = lang === "en" ? "" : `/${lang}`;

  return (
    <main className="min-h-[70vh] px-4 md:px-6 lg:px-10 py-12 md:py-16">
      {/* TOP HERO CARD */}
      <section className="mx-auto max-w-5xl">
        <div
          className="rounded-3xl border border-white/10 bg-white/5/40 
                     bg-gradient-to-br from-white/5 via-white/0 to-brandGold/10
                     px-6 py-8 md:px-10 md:py-10
                     shadow-[0_22px_60px_rgba(0,0,0,0.65)] backdrop-blur"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
            {t.heroKicker}
          </p>

          <h1 className="mt-4 text-3xl md:text-4xl lg:text-[2.6rem] font-semibold leading-tight">
            {t.heroTitle}
          </h1>

          <p className="mt-4 max-w-3xl text-sm md:text-base text-slate-200/80">
            {t.heroSubtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href={`${basePath}/contact`}>
              {t.heroPrimaryCta}
            </PrimaryButton>

            <SecondaryButton href={`${basePath}/jobs`}>
              {t.heroSecondaryCta}
            </SecondaryButton>
          </div>

          <div className="mt-6 grid gap-4 text-xs md:text-[13px] text-slate-200/75 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="font-semibold text-white">{t.stat1Title}</p>
              <p className="mt-1 text-slate-300/75">{t.stat1Body}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="font-semibold text-white">{t.stat2Title}</p>
              <p className="mt-1 text-slate-300/75">{t.stat2Body}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <p className="font-semibold text-white">{t.stat3Title}</p>
              <p className="mt-1 text-slate-300/75">{t.stat3Body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* BP SIMULATOR – HIRING MANAGERS FOCUS */}
      <section className="mx-auto mt-10 max-w-5xl">
        <div
          className="rounded-3xl border border-brandGold/60 bg-black/40 
                     px-6 py-7 md:px-10 md:py-9
                     shadow-[0_18px_50px_rgba(0,0,0,0.8)] backdrop-blur"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl md:text-[1.65rem] font-semibold">
                {t.bpTitle}
              </h2>
              <p className="text-sm md:text-base text-slate-200/85">
                {t.bpBodyPrefix}{" "}
                <span className="font-semibold text-brandGoldSoft">
                  {t.bpBodyHighlight}
                </span>{" "}
                {t.bpBodySuffix}
              </p>

              <ul className="mt-1 list-disc pl-5 text-sm md:text-[15px] text-slate-200/85 space-y-1.5">
                <li>{t.bpBullet1}</li>
                <li>{t.bpBullet2}</li>
                <li>{t.bpBullet3}</li>
              </ul>
            </div>

            <div className="mt-3 flex flex-col gap-3 md:mt-0 md:min-w-[230px]">
              <PrimaryButton href={`${basePath}/bp-simulator`}>
                {t.bpButton}
              </PrimaryButton>
              <p className="text-[11px] text-slate-300/75">{t.bpNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SHARE A BRIEF – GLASS CARD */}
      <section className="mx-auto mt-10 max-w-5xl">
        <div
          className="rounded-3xl border border-white/10 bg-black/40 
                     px-6 py-7 md:px-10 md:py-9
                     shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl md:text-[1.65rem] font-semibold">
                {t.briefTitle}
              </h2>
              <p className="text-sm md:text-base text-slate-200/80">
                {t.briefBody}
              </p>

              <ul className="mt-1 list-disc pl-5 text-sm md:text-[15px] text-slate-200/85 space-y-1.5">
                <li>{t.briefBullet1}</li>
                <li>{t.briefBullet2}</li>
                <li>{t.briefBullet3}</li>
              </ul>
            </div>

            <div className="mt-4 flex flex-col gap-3 md:mt-0 md:min-w-[220px]">
              <PrimaryButton href={`${basePath}/contact`}>
                {t.briefPrimaryButton}
              </PrimaryButton>

              <SecondaryButton href={`${basePath}/portability`}>
                {t.briefSecondaryButton}
              </SecondaryButton>
            </div>
          </div>

          <p className="mt-6 text-[11px] text-slate-300/70">
            {t.briefFootnoteBeforeLink}{" "}
            <Link
              href={`${basePath}/contact`}
              className="underline underline-offset-2"
            >
              {t.briefFootnoteLinkLabel}
            </Link>
            {t.briefFootnoteAfterLink}
          </p>
        </div>
      </section>
    </main>
  );
}