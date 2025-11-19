// app/de/portability/page.tsx
import type { Metadata } from "next";
import PortabilityPage from "../../en/portability/page";

export const metadata: Metadata = {
  title: "Portabilität des Buches – Private Banking | Executive Partners",
  description:
    "Strukturierte Bewertung der Portabilität von HNWI/UHNWI-Portfolios in unterschiedlichen Plattformkontexten.",
};

/**
 * DE wrapper — reuses full EN layout.
 * (Design untouched; localisation will later be handled
 *  inside PortabilityClient via dictionaries.)
 */
export default function PortabilityDePage() {
  return <PortabilityPage />;
}