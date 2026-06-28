import type { Metadata } from "next";
import SubscribeForm from "@/app/en/insights/SubscribeForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Subscribe to Private Wealth Pulse | Executive Partners" },
  description:
    "Weekly private banking intelligence: AUM portability, talent flows, compensation benchmarks and market dynamics across Geneva, Zurich, Dubai, Singapore and London. Free. No spam.",
  alternates: { canonical: "https://www.execpartners.ch/en/subscribe" },
  openGraph: {
    title: "Private Wealth Pulse | Weekly Private Banking Intelligence",
    description:
      "One insight per week on what is actually moving in private banking. Free, no paywall, no spam. 2,300+ subscribers.",
    url: "https://www.execpartners.ch/en/subscribe",
    siteName: "Executive Partners",
    images: [{ url: "/og.webp" }],
    type: "website",
  },
  robots: { index: true, follow: true },
};

const RECENT_ARTICLES = [
  {
    slug: "the-sandbox-talent-map",
    title: "The Sandbox Talent Map",
    summary: "Which bankers are positioned to keep Gulf clients, win them, or lose them. Saudization rules, Dubai's hiring bar, and what Swiss banks are doing on both sides of the border.",
  },
  {
    slug: "is-your-aum-portable",
    title: "Is Your AUM Actually Portable?",
    summary: "Most senior bankers overestimate how much of their book will follow them. The six questions every banker gets wrong before a move.",
  },
  {
    slug: "compliance-golden-handcuff",
    title: "Compliance Is the New Golden Handcuff",
    summary: "Why the compliance file is now the single most important document in any private banker's career move.",
  },
  {
    slug: "the-platform-illusion",
    title: "The Platform Illusion",
    summary: "Banks sell platform quality. Clients follow the banker. The most common and costly mistake in private banking transitions.",
  },
];

export default function SubscribePage() {
  return (
    <main className="relative min-h-screen bg-[#0B0F1A] text-white">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 400px at 50% -5%, rgba(201,161,74,.18) 0%, rgba(201,161,74,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-4xl px-4 pb-24 pt-16">

        {/* Eyebrow */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A14A]/30 bg-[#C9A14A]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Private Wealth Pulse · Free Newsletter
          </span>
        </div>

        {/* Headline */}
        <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-700">
          <span>As featured in</span>
          <a
            href="https://www.finews.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-70 transition-opacity"
          >Finews.ch</a>
          <span>— Switzerland's #1 financial media</span>
        </div>
        <h1 className="mt-6 text-center text-3xl font-extrabold tracking-tight md:text-5xl">
          The private banking intelligence<br className="hidden md:block" /> your peers are reading
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-neutral-300 md:text-base">
          One article per week on what is actually moving in private banking: AUM portability,
          talent flows, compensation benchmarks, and market dynamics across Geneva, Zurich, Dubai,
          Singapore, London, and Riyadh. No paywall. No recruitment spam. Just the signals that
          matter to senior practitioners.
        </p>

        {/* Social proof bar */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-center text-xs text-neutral-400">
          <span><span className="text-lg font-bold text-white">2,300+</span><br />subscribers</span>
          <span className="hidden sm:block w-px h-8 bg-white/10 self-center" />
          <span><span className="text-lg font-bold text-white">17,000+</span><br />LinkedIn readers</span>
          <span className="hidden sm:block w-px h-8 bg-white/10 self-center" />
          <span><span className="text-lg font-bold text-white">Free</span><br />always</span>
          <span className="hidden sm:block w-px h-8 bg-white/10 self-center" />
          <span><span className="text-lg font-bold text-white">No spam</span><br />unsubscribe anytime</span>
        </div>

        {/* Subscribe form */}
        <div className="mt-8 mx-auto max-w-lg">
          <SubscribeForm />
          <p className="mt-3 text-center text-xs text-neutral-500">
            By subscribing you receive a free copy of the{" "}
            <span className="text-neutral-400 font-medium">Private Banking Career Intelligence — H2 2026 Edition</span>
            {" "}(PDF, 14 pages).
          </p>
        </div>

        {/* Welcome gift callout */}
        <div className="mt-10 mx-auto max-w-2xl rounded-2xl border border-[#C9A14A]/25 bg-[#C9A14A]/5 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">Welcome gift on signup</p>
          <h2 className="mt-2 text-base font-semibold text-white">Private Banking Career Intelligence — H2 2026</h2>
          <p className="mt-1 text-sm text-neutral-400">
            Compensation benchmarks, hiring signals, and AUM portability data across 13 global wealth hubs.
            14 pages. Updated June 2026.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-neutral-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Geneva · Zurich · London</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Dubai · Riyadh</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Singapore · Hong Kong</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">New York · Miami</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Paris · Milan · Madrid · Lisbon</span>
          </div>
        </div>

        {/* Recent articles */}
        <div className="mt-14">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Recent issues
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {RECENT_ARTICLES.map((a) => (
              <Link
                key={a.slug}
                href={`/en/insights/${a.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#C9A14A]/40 hover:bg-white/[0.06]"
              >
                <h3 className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition">
                  {a.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-400">{a.summary}</p>
                <span className="mt-3 inline-block text-[11px] font-semibold text-[#D4AF37] group-hover:underline">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/en/insights"
              className="text-sm text-neutral-400 hover:text-white transition"
            >
              View full archive →
            </Link>
          </div>
        </div>

        {/* About / credibility */}
        <div className="mt-14 border-t border-white/10 pt-10 text-center">
          <p className="text-xs text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Private Wealth Pulse is written by{" "}
            <span className="text-neutral-300 font-medium">Gil M. Chalem</span>, Managing Partner
            of Executive Partners, a Geneva-based boutique specialising exclusively in private
            banking and wealth management executive search. Views are the author's own.
          </p>
          <p className="mt-3 text-xs text-neutral-600">
            execpartners.ch · 118 rue du Rhône, Geneva CH-1204
          </p>
        </div>

      </div>
    </main>
  );
}
