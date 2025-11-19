import type { Metadata } from "next";
import HiringManagersPage from "../../hiring-managers/page";

export const metadata: Metadata = {
  title: "Employeurs – Recrutement Private Banking | Executive Partners",
  description:
    "Solutions de recrutement spécialisées pour les banques privées et acteurs de la gestion de fortune.",
};

export default function HiringManagersFrPage() {
  // Reuse the full original /hiring-managers layout, just with FR locale
  return <HiringManagersPage locale="fr" />;
}