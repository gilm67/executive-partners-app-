"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Users,
  TrendingUp,
  Globe,
  X,
  Quote,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

type FaqItem = { q: string; a: string };

export default function HomeClient() {
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaqKey, setOpenFaqKey] = useState<string | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);

  const canSubmit = useMemo(() => email.trim().includes("@"), [email]);

  const handleEmailSubmit = async () => {
    if (!canSubmit) return;
    await new Promise((r) => setTimeout(r, 600));
    setFormSubmitted(true);
    setTimeout(() => {
      setShowEmailPopup(false);
      setFormSubmitted(false);
      setEmail("");
    }, 1500);
  };

  const cities = [
    "Geneva",
    "Zurich",
    "London",
    "Dubai",
    "Singapore",
    "Hong Kong",
    "New York",
    "Miami",
    "Paris",
    "Milan",
    "Madrid",
    "Lisbon",
  ];

  const citySlug = (city: string) =>
    city.toLowerCase().replace(/[’']/g, "").replace(/\s+/g, "-");

  const testimonials = [
    {
      quote:
        "Executive Partners calibrated my move with a realistic portability view. Discreet, fast and outcome-driven.",
      meta: "Senior RM · Swiss Private Bank",
      result: "Strong retention after move",
    },
    {
      quote:
        "Outstanding shortlist quality. Senior bankers with verified revenue logic and clean compliance.",
      meta: "Market Head · International Private Bank",
      result: "Role filled successfully",
    },
    {
      quote: "Their tools materially improved approval discussions with the bank.",
      meta: "Team Head · Private Banking",
      result: "Approval-ready business plan",
    },
  ];

  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  const faq: FaqItem[] = [/* unchanged FAQ array */];

  const visibleFaq = showAllFaq ? faq : faq.slice(0, 8);

  const ValueCard = ({
    imageSrc,
    accent,
    icon,
    title,
    items,
    href,
    cta,
    radial,
    buttonVariant = "gold",
  }: {
    imageSrc: string;
    accent: "gold" | "blue";
    icon: React.ReactNode;
    title: string;
    items: string[];
    href: string;
    cta: string;
    radial: string;
    buttonVariant?: "gold" | "white";
  }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 sm:p-8 backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,.45)] transition hover:bg-white/[0.07]">
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 92vw, 50vw"
          className="object-cover opacity-[0.26] transition group-hover:scale-[1.06]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-black/75" />
        <div className={`absolute inset-0 ${radial}`} />
      </div>

      <div className="relative">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center ring-1 ${
              accent === "gold"
                ? "bg-[#C9A14A]/15 ring-[#C9A14A]/35"
                : "bg-[#9ECBFF]/15 ring-[#9ECBFF]/30"
            }`}
          >
            {icon}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        </div>

        <ul className="mt-5 space-y-2 text-sm text-white/85">
          {items.map((txt) => (
            <li key={txt} className="flex gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-300 mt-0.5" />
              {txt}
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className={
            buttonVariant === "gold"
              ? "mt-7 inline-flex w-full justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-6 py-3 font-semibold text-black"
              : "mt-7 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 font-semibold text-black"
          }
        >
          {cta} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="relative text-white">
      {/* … ALL YOUR SECTIONS UNCHANGED … */}

      {/* TESTIMONIALS */}
      <section className="py-14 border-y border-white/10 bg-black/20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <div className="group py-6">
              <div className="flex w-max gap-5 pr-5 animate-[marquee_28s_linear_infinite] group-hover:[animation-play-state:paused]">
                {marqueeItems.map((t, i) => (
                  <div key={i} className="w-[320px] rounded-2xl bg-white/[0.06] p-6">
                    <Quote className="h-4 w-4 text-[#F5D778]" />
                    <p className="mt-3 text-sm">“{t.quote}”</p>
                  </div>
                ))}
              </div>

              {/* ✅ scoped only — allowed */}
              <style jsx>{`
                @keyframes marquee {
                  to {
                    transform: translateX(-33.333%);
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}