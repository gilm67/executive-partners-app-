// app/fr/page.tsx
import type { Metadata } from "next";
import HomePage from "../page";

export const metadata: Metadata = {
  title:
    "Executive Partners – Recrutement Banque Privée & Gestion de Fortune",
  description:
    "Cabinet de recrutement spécialisé en Banque Privée et Wealth Management à Genève, Zurich, Londres, Dubaï, Singapour et Hong Kong.",
};

export default function HomeFrPage() {
  // Reuse the main homepage layout, but with FR copy
  return <HomePage locale="fr" />;
}