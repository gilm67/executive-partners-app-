import type { Metadata } from "next";
import CandidatesPage from "../../candidates/page";

export const metadata: Metadata = {
  title:
    "Candidats – Banquiers Privés & Wealth Managers | Executive Partners",
  description:
    "Accompagnement sur mesure pour banquiers privés et wealth managers souhaitant évaluer leur portabilité, leur marché et leurs options de carrière.",
};

export default function CandidatesFrPage() {
  return <CandidatesPage locale="fr" />;
}