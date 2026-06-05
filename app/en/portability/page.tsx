// app/en/portability/page.tsx
import type { Metadata } from "next";
import ClientWrapper from "@/app/portability/ClientWrapper";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://www.execpartners.ch");

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Free AUM Portability Calculator — Portability Score™",
  description:
    "Calculate your true AUM portability before your next private banking career move. Our 30-point Portability Score™ has been applied across 200+ senior placements in Switzerland and internationally.",
  alternates: { canonical: "https://www.execpartners.ch/en/portability" },
  twitter: {
    card: "summary_large_image",
    title: "Free AUM Portability Calculator — Portability Score™ ",
    description: "Assess your book's true portability across markets. 30-point framework, used by 500+ private bankers. Free, confidential, no obligation.",
    images: ["/og.webp"],
  },
  openGraph: {
    title: "Portability Score™ — Assess Your AUM Transferability ",
    description: "Assess your book's true portability across markets. Used by 500+ private bankers. Free, confidential, no obligation.",
    url: `${SITE}/en/portability`,
    images: [{ url: "/og.webp" }],
  },
};

export default function PortabilityPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
          Portability Score™ · Executive Partners
        </p>
        <h1 className="mt-3 font-[var(--font-playfair)] text-4xl font-semibold leading-tight text-white md:text-5xl">
          Free AUM Portability Calculator — Portability Score™
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-300">
          Portability — a private banker's ability to transfer client assets when
          changing employer — is the single most important variable in any senior
          career move in wealth management.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-400">
          A relationship manager with CHF 350m AUM does not automatically control
          CHF 350m of portable assets. The actual portable fraction depends on
          where that AUM sits, how deep the personal client relationship runs
          versus the bank brand, whether competitors have already approached those
          clients, and whether non-solicitation obligations create a lock-out window.
        </p>
        <p className="mt-4 leading-relaxed text-neutral-400">
          The Portability Score™ is a six-block, 30-point framework developed by
          Executive Partners across 200+ completed placements. It stress-tests
          each of these dimensions to give you an honest picture of your true
          commercial position — before you start talking to banks.
        </p>
        <div className="mt-6 flex gap-6 border-t border-white/10 pt-6 text-sm text-neutral-500">
          <span>✓ 200+ placements tested</span>
          <span>✓ 6 blocks · 30 points</span>
          <span>✓ 100% confidential</span>
        </div>
      </section>
      <ClientWrapper />
    </>
  );
}
