// app/fr/portability/page.tsx
import type { Metadata } from "next";
import PortabilityPage from "../../en/portability/page";

export const metadata: Metadata = {
  title: "Portabilité du portefeuille – Private Banking | Executive Partners",
  description:
    "Évaluation structurée de la portabilité des portefeuilles HNWI/UHNWI entre plateformes et booking centres. Analyse qualitative et quantitative.",
};

/**
 * FR wrapper — reuse full EN component tree.
 * (We will inject locale-level copy inside PortabilityClient later.)
 */
export default function PortabilityFrPage() {
  return <PortabilityPage />;
}