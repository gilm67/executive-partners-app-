import type { Metadata } from "next";
import HiringManagersPage from "../../hiring-managers/page";

export const metadata: Metadata = {
  title:
    "Auftraggeber – Executive Search im Private Banking | Executive Partners",
  description:
    "Spezialisierte Rekrutierungslösungen für Private-Banking-Institute und Wealth-Management-Plattformen.",
};

export default function HiringManagersDePage() {
  // Reuse the full original /hiring-managers layout — unchanged
  return <HiringManagersPage locale="de" />;
}