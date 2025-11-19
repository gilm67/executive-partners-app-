import type { Metadata } from "next";
import ContactPage from "../../contact/page";

export const metadata: Metadata = {
  title: "Kontakt – Executive Partners",
  description:
    "Kontaktieren Sie Executive Partners für ein vertrauliches Gespräch über Rekrutierungsbedürfnisse oder Ihre Karriere im Private Banking.",
};

export default function ContactDePage() {
  return <ContactPage locale="de" />;
}