import type { Metadata } from "next";
import ContactPage from "../../contact/page";

export const metadata: Metadata = {
  title: "Contact – Executive Partners",
  description:
    "Contactez Executive Partners pour un échange confidentiel sur vos besoins en recrutement ou votre carrière en Banque Privée.",
};

export default function ContactFrPage() {
  return <ContactPage locale="fr" />;
}