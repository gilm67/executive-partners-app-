"use client";

import { useState } from "react";

type ContactType = "candidate" | "hiring-manager" | "other";
import type { Locale } from "@/lib/i18n/types";

const FORM_COPY: Record<
  Locale,
  {
    iAmA: string;
    candidate: string;
    hiringManager: string;
    other: string;

    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    phoneHelp: string;

    hmCompanyLabel: string;
    hmCompanyPlaceholder: string;
    hmRoleLabel: string;
    hmRolePlaceholder: string;
    hmLocationLabel: string;
    hmLocationPlaceholder: string;

    candBankLabel: string;
    candBankPlaceholder: string;
    candMarketLabel: string;
    candMarketPlaceholder: string;
    candAumLabel: string;
    candAumPlaceholder: string;

    messageLabel: string;
    candMessagePlaceholder: string;
    hmMessagePlaceholder: string;

    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;

    submit: string;
    sending: string;
    sent: string;
    errorMessage: string;
  }
> = {
  en: {
    iAmA: "I am a…",
    candidate: "Candidate",
    hiringManager: "Hiring Manager",
    other: "Other",

    nameLabel: "Name *",
    emailLabel: "Email *",
    phoneLabel: "Phone (optional)",
    phoneHelp:
      "We can call you discreetly — no voicemail, no messages left without prior agreement.",

    hmCompanyLabel: "Company (optional)",
    hmCompanyPlaceholder: "Bank / IAM / Family Office",
    hmRoleLabel: "Role (optional)",
    hmRolePlaceholder: "Desk Head, COO...",
    hmLocationLabel: "Location (optional)",
    hmLocationPlaceholder: "Geneva, Zurich, Dubai...",

    candBankLabel: "Current bank (optional)",
    candBankPlaceholder: "UBS, Julius Baer...",
    candMarketLabel: "Market (optional)",
    candMarketPlaceholder: "CH Onshore, MEA, LatAm...",
    candAumLabel: "AUM band (optional)",
    candAumPlaceholder: "e.g. 200–500m, 500m+",

    messageLabel: "Message *",
    candMessagePlaceholder:
      "Tell us about your situation, current platform and what you are exploring.",
    hmMessagePlaceholder:
      "Briefly describe the mandate, booking centre, market focus and seniority.",

    namePlaceholder: "Your full name",
    emailPlaceholder: "you@company.com",
    phonePlaceholder: "+41 ...",

    submit: "Send message confidentially",
    sending: "Sending…",
    sent: "Message sent",
    errorMessage: "Something went wrong. Please try again later.",
  },
  fr: {
    iAmA: "Je suis…",
    candidate: "Candidat",
    hiringManager: "Employeur",
    other: "Autre",

    nameLabel: "Nom *",
    emailLabel: "E-mail *",
    phoneLabel: "Téléphone (optionnel)",
    phoneHelp:
      "Nous pouvons vous appeler discrètement — aucun message vocal, aucun message sans accord préalable.",

    hmCompanyLabel: "Société (optionnel)",
    hmCompanyPlaceholder: "Banque / GFI / Family Office",
    hmRoleLabel: "Fonction (optionnel)",
    hmRolePlaceholder: "Desk Head, COO...",
    hmLocationLabel: "Localisation (optionnel)",
    hmLocationPlaceholder: "Genève, Zurich, Dubaï...",

    // shortened labels here to avoid wrapping and misalignment
    candBankLabel: "Banque actuelle",
    candBankPlaceholder: "UBS, Julius Baer...",
    candMarketLabel: "Marché",
    candMarketPlaceholder: "CH Onshore, MEA, LatAm...",
    candAumLabel: "Tranche d’AUM",
    candAumPlaceholder: "ex. 200–500m, 500m+",

    messageLabel: "Message *",
    candMessagePlaceholder:
      "Expliquez-nous votre situation, votre plateforme actuelle et ce que vous explorez.",
    hmMessagePlaceholder:
      "Décrivez brièvement le mandat, le booking centre, le marché ciblé et le niveau de séniorité.",

    namePlaceholder: "Votre nom complet",
    emailPlaceholder: "vous@entreprise.com",
    phonePlaceholder: "+41 ...",

    submit: "Envoyer le message en toute confidentialité",
    sending: "Envoi…",
    sent: "Message envoyé",
    errorMessage:
      "Un problème est survenu. Merci de réessayer un peu plus tard.",
  },
  de: {
    iAmA: "Ich bin...",
    candidate: "Kandidat",
    hiringManager: "Auftraggeber",
    other: "Sonstiges",

    nameLabel: "Name *",
    emailLabel: "E-Mail *",
    phoneLabel: "Telefon (optional)",
    phoneHelp:
      "Wir können Sie diskret anrufen – keine Voicemail, keine Nachrichten ohne vorherige Zustimmung.",

    hmCompanyLabel: "Unternehmen (optional)",
    hmCompanyPlaceholder: "Bank / IAM / Family Office",
    hmRoleLabel: "Funktion (optional)",
    hmRolePlaceholder: "Desk Head, COO...",
    hmLocationLabel: "Standort (optional)",
    hmLocationPlaceholder: "Genf, Zürich, Dubai...",

    candBankLabel: "Aktuelle Bank (optional)",
    candBankPlaceholder: "UBS, Julius Baer...",
    candMarketLabel: "Markt (optional)",
    candMarketPlaceholder: "CH Onshore, MEA, LatAm...",
    candAumLabel: "AUM-Band (optional)",
    candAumPlaceholder: "z.B. 200–500m, 500m+",

    messageLabel: "Nachricht *",
    candMessagePlaceholder:
      "Beschreiben Sie kurz Ihre Situation, Ihre aktuelle Plattform und was Sie prüfen.",
    hmMessagePlaceholder:
      "Beschreiben Sie kurz das Mandat, Booking Centre, Marktschwerpunkt und Senioritätsniveau.",

    namePlaceholder: "Ihr vollständiger Name",
    emailPlaceholder: "sie@unternehmen.com",
    phonePlaceholder: "+41 ...",

    submit: "Nachricht vertraulich senden",
    sending: "Wird gesendet…",
    sent: "Nachricht gesendet",
    errorMessage:
      "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
  },
};

export default function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [contactType, setContactType] = useState<ContactType>("candidate");

  const t = FORM_COPY[locale] ?? FORM_COPY.en;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && (data as any).ok) {
        setStatus("sent");
        form.reset();
      } else {
        console.error("Contact error", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact error", err);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* I am a… */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-neutral-200">
          {t.iAmA}
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setContactType("candidate")}
            className={`btn-ghost text-xs px-3 py-1.5 ${
              contactType === "candidate"
                ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-200"
                : "opacity-80"
            }`}
          >
            {t.candidate}
          </button>

          <button
            type="button"
            onClick={() => setContactType("hiring-manager")}
            className={`btn-ghost text-xs px-3 py-1.5 ${
              contactType === "hiring-manager"
                ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-200"
                : "opacity-80"
            }`}
          >
            {t.hiringManager}
          </button>

          <button
            type="button"
            onClick={() => setContactType("other")}
            className={`btn-ghost text-xs px-3 py-1.5 ${
              contactType === "other"
                ? "border-emerald-400/80 bg-emerald-500/10 text-emerald-200"
                : "opacity-80"
            }`}
          >
            {t.other}
          </button>
        </div>
        <input type="hidden" name="contactType" value={contactType} />
      </div>

      {/* Name + Email */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-200">
            {t.nameLabel}
          </label>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            placeholder={t.namePlaceholder}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-200">
            {t.emailLabel}
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            placeholder={t.emailPlaceholder}
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-neutral-200">
          {t.phoneLabel}
        </label>
        <input
          name="phone"
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          placeholder={t.phonePlaceholder}
        />
        <p className="text-[11px] text-neutral-500">{t.phoneHelp}</p>
      </div>

      {/* Hiring Manager fields */}
      {contactType === "hiring-manager" && (
        <div className="grid gap-4 md:grid-cols-3">
          <InputHM
            label={t.hmCompanyLabel}
            name="hm_company"
            placeholder={t.hmCompanyPlaceholder}
          />
          <InputHM
            label={t.hmRoleLabel}
            name="hm_role"
            placeholder={t.hmRolePlaceholder}
          />
          <InputHM
            label={t.hmLocationLabel}
            name="hm_location"
            placeholder={t.hmLocationPlaceholder}
          />
        </div>
      )}

      {/* Candidate fields */}
      {contactType === "candidate" && (
        <div className="grid gap-4 md:grid-cols-3">
          <InputHM
            label={t.candBankLabel}
            name="cand_bank"
            placeholder={t.candBankPlaceholder}
          />
          <InputHM
            label={t.candMarketLabel}
            name="cand_market"
            placeholder={t.candMarketPlaceholder}
          />
          <InputHM
            label={t.candAumLabel}
            name="cand_aum_band"
            placeholder={t.candAumPlaceholder}
          />
        </div>
      )}

      {/* Message */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-neutral-200">
          {t.messageLabel}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          placeholder={
            contactType === "hiring-manager"
              ? t.hmMessagePlaceholder
              : t.candMessagePlaceholder
          }
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary btn-xl w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "sending"
            ? t.sending
            : status === "sent"
            ? t.sent
            : t.submit}
        </button>
      </div>

      {status === "error" && (
        <p className="text-[12px] text-red-400">{t.errorMessage}</p>
      )}
    </form>
  );
}

/* Small helper component */
function InputHM({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-neutral-200">
        {label}
      </label>
      <input
        name={name}
        className="w-full rounded-xl border border-neutral-700 bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        placeholder={placeholder}
      />
    </div>
  );
}