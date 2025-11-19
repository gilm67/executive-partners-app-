export type Locale = "en" | "fr" | "de";

export const FOOTER_COPY: Record<
  Locale,
  {
    markets: string;
    jobs: string;
    candidates: string;
    hiringManagers: string;
    bpSimulator: string;
    portability: string;
    insights: string;
    about: string;
    contact: string;
    tagline: string;
    rights: string;
  }
> = {
  en: {
    markets: "Markets",
    jobs: "Jobs",
    candidates: "Candidates",
    hiringManagers: "Hiring Managers",
    bpSimulator: "BP Simulator",
    portability: "Portability",
    insights: "Insights",
    about: "About",
    contact: "Contact",
    tagline: "Executive Search for Private Banking & Wealth Management",
    rights: "All rights reserved.",
  },

  fr: {
    markets: "Marchés",
    jobs: "Jobs",
    candidates: "Candidats",
    hiringManagers: "Employeurs",
    bpSimulator: "BP Simulator",
    portability: "Portabilité",
    insights: "Analyses",
    about: "À propos",
    contact: "Contact",
    tagline:
      "Executive Search pour la Banque Privée & la Gestion de Fortune",
    rights: "Tous droits réservés.",
  },

  de: {
    markets: "Märkte",
    jobs: "Jobs",
    candidates: "Kandidaten",
    hiringManagers: "Auftraggeber",
    bpSimulator: "BP Simulator",
    portability: "Portabilität",
    insights: "Analysen",
    about: "Über uns",
    contact: "Kontakt",
    tagline:
      "Executive Search für Private Banking & Wealth Management",
    rights: "Alle Rechte vorbehalten.",
  },
};