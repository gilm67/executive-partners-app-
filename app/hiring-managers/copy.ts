// app/hiring-managers/copy.ts
import type { Locale } from "@/lib/i18n/types";

type HiringCopy = {
  heroKicker: string;
  heroTitle: string;
  heroSubtitle: string;

  // Top CTAs under the hero
  ctaViewJobs: string;
  ctaSubmitCv: string;
  ctaContact: string;

  // Card 1 – BP simulator
  card1Title: string;
  card1Body: string;
  card1Bullet1: string;
  card1Bullet2: string;
  card1Bullet3: string;
  card1Button: string;

  // Card 2 – Share a brief
  card2Title: string;
  card2Body: string;
  card2Bullet1: string;
  card2Bullet2: string;
  card2Bullet3: string;
  card2ButtonPrimary: string;
  card2ButtonSecondary: string;
  card2Footnote: string;
};

export const HIRING_COPY: Record<Locale, HiringCopy> = {
  en: {
    heroKicker: "For Hiring Managers · Private Banking Talent",
    heroTitle: "Build stronger Private Banking teams, discreetly",
    heroSubtitle:
      "Geneva & Zurich focused, with mandates across London, Dubai, Singapore, Hong Kong and Miami. We help you assess portability, business plans and long-term fit before you hire.",

    ctaViewJobs: "View active mandates",
    ctaSubmitCv: "Submit CV / profile",
    ctaContact: "Speak with a recruiter",

    card1Title: "Test a 3-year business plan before you hire",
    card1Body:
      "Use our Business Plan Simulator to model NNM, ROA and net margin for a specific RM or team before you open a mandate.",
    card1Bullet1: "3-year view on NNM, revenue, fixed cost and net margin",
    card1Bullet2:
      "Scenario analysis comparing conservative vs ambitious targets",
    card1Bullet3:
      "Exportable PDF to share internally with COOs, HR and ExCo",
    card1Button: "Open the Business Plan Simulator",

    card2Title: "Share a brief (no portals, no admin token)",
    card2Body:
      "Send us a short description of the mandate – booking centre, market focus, seniority, regulatory requirements and product scope – and we revert the same business day with clarifying questions or a proposed call slot.",
    card2Bullet1: "Director / MD RMs, Team Heads and Market Leaders",
    card2Bullet2:
      "Swiss onshore, international desks and cross-border booking centres",
    card2Bullet3:
      "Coverage across CH, UK, US, MEA, LATAM and APAC",
    card2ButtonPrimary: "Send us your brief",
    card2ButtonSecondary: "Explore AUM portability",
    card2Footnote:
      "Existing clients with a secure posting link can continue to use their private URL to create or update roles. If you need your secure link resent, please contact us.",
  },

  fr: {
    heroKicker: "Pour les employeurs · Talents en Banque Privée",
    heroTitle: "Renforcez vos équipes de Banque Privée, en toute discrétion",
    heroSubtitle:
      "Focalisé sur Genève & Zurich, avec des mandats à Londres, Dubaï, Singapour, Hong Kong et Miami. Nous vous aidons à évaluer portabilité, business plan et adéquation long terme avant l’ouverture d’un mandat.",

    ctaViewJobs: "Voir les mandats actifs",
    ctaSubmitCv: "Soumettre un profil / CV",
    ctaContact: "Parler à un recruteur",

    card1Title: "Tester un business plan sur 3 ans avant de recruter",
    card1Body:
      "Utilisez notre Business Plan Simulator pour modéliser NNM, ROA et marge nette pour un RM ou une équipe avant d’ouvrir un mandat.",
    card1Bullet1:
      "Vue à 3 ans sur NNM, revenus, coûts fixes et marge nette",
    card1Bullet2:
      "Scénarios comparant objectifs conservateurs vs ambitieux",
    card1Bullet3:
      "PDF exportable à partager en interne avec COO, RH et ExCo",
    card1Button: "Ouvrir le Business Plan Simulator",

    card2Title: "Partagez un brief (sans portail, sans accès admin)",
    card2Body:
      "Envoyez-nous une description concise du mandat – booking centre, marché cible, séniorité, exigences réglementaires et périmètre produit – et nous revenons vers vous le jour ouvrable même avec des questions ciblées ou une proposition de créneau.",
    card2Bullet1:
      "RMs Director / MD, Team Heads et Market Leaders",
    card2Bullet2:
      "Desks Switzerland onshore, internationaux et booking centres cross-border",
    card2Bullet3:
      "Couverture CH, UK, US, MEA, LATAM et APAC",
    card2ButtonPrimary: "Envoyer un brief",
    card2ButtonSecondary: "Explorer la portabilité d’AUM",
    card2Footnote:
      "Les clients disposant déjà d’un lien sécurisé peuvent continuer à utiliser leur URL privée pour créer ou mettre à jour des postes. Si vous souhaitez le recevoir à nouveau, merci de nous contacter.",
  },

  de: {
    heroKicker: "Für Auftraggeber · Private-Banking-Talente",
    heroTitle:
      "Stärken Sie Ihre Private-Banking-Teams – diskret und gezielt",
    heroSubtitle:
      "Fokus auf Genf & Zürich mit Mandaten in London, Dubai, Singapur, Hongkong und Miami. Wir unterstützen Sie dabei, Portabilität, Business Plan und langfristigen Fit zu prüfen, bevor Sie rekrutieren.",

    ctaViewJobs: "Aktuelle Mandate ansehen",
    ctaSubmitCv: "Profil / CV einreichen",
    ctaContact: "Mit einem Recruiter sprechen",

    card1Title:
      "3-Jahres-Business-Plan testen, bevor Sie einstellen",
    card1Body:
      "Nutzen Sie unseren Business Plan Simulator, um NNM, ROA und Nettomarge für einen konkreten RM oder ein Team zu modellieren, bevor Sie ein Mandat öffnen.",
    card1Bullet1:
      "3-Jahres-Perspektive auf NNM, Ertrag, Fixkosten und Nettomarge",
    card1Bullet2:
      "Szenarioanalyse mit konservativen vs. ambitionierten Zielen",
    card1Bullet3:
      "Exportierbares PDF für COO, HR und ExCo",
    card1Button: "Business Plan Simulator öffnen",

    card2Title: "Mandatsbrief teilen (ohne Portal, ohne Admin-Token)",
    card2Body:
      "Senden Sie uns eine kurze Beschreibung des Mandats – Booking Center, Markt-Fokus, Seniorität, regulatorische Anforderungen und Produktscope – und wir melden uns am selben Werktag mit Rückfragen oder einem Terminvorschlag.",
    card2Bullet1:
      "Director / MD RMs, Team Heads und Market Leaders",
    card2Bullet2:
      "Schweiz Onshore, internationale Desks und grenzüberschreitende Booking-Center",
    card2Bullet3:
      "Abdeckung CH, UK, US, MEA, LATAM und APAC",
    card2ButtonPrimary: "Mandatsbrief senden",
    card2ButtonSecondary: "AUM-Portabilität prüfen",
    card2Footnote:
      "Bestehende Kunden mit einem sicheren Posting-Link können weiterhin ihre private URL nutzen, um Rollen anzulegen oder zu aktualisieren. Wenn Sie Ihren Link erneut benötigen, kontaktieren Sie uns bitte.",
  },
};