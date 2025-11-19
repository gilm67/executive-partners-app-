// app/fr/jobs/page.tsx
import type { Metadata } from "next";
import JobsPage from "../../jobs/page";

export const metadata: Metadata = {
  title: "Jobs pour Banquiers Privés – Executive Partners",
  description:
    "Sélection de postes pour banquiers privés, wealth managers et dirigeants dans les principaux centres financiers.",
};

export default function JobsFrPage() {
  return <JobsPage locale="fr" />;
}