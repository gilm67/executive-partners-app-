import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[55vh] lg:h-[480px] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero-executive-partners.png"
        alt="Executive Partners – Global Finance Hero"
        fill
        priority
        // Shift the visual focus slightly higher; tweak to taste (e.g., object-[50%_30%])
        className="object-cover object-[50%_35%]"
        sizes="100vw"
      />

      {/* Overlay for readability (subtler) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center md:px-6 lg:px-8
                      lg:justify-start lg:pt-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow lg:text-5xl">
          EXECUTIVE PARTNERS
        </h1>

        <p className="mt-3 max-w-3xl text-sm text-white/90 sm:text-base">
          Your Gateway to Elite Opportunities in Global Finance.
        </p>

        <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/70 sm:text-xs">
          Top Recruiting for Private Banking &amp; Wealth Management
        </p>

        <div className="mt-6 h-px w-20 bg-white/25" />

        <p className="mt-4 max-w-3xl text-xs leading-6 text-white/85 md:text-sm">
          Based in Geneva. Covering International Financial Hubs: Geneva, Zurich,
          London, New York, Miami, Dubai, Singapore.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/jobs"
            className="rounded-2xl bg-white px-5 py-2.5 text-xs font-semibold text-black hover:bg-white/90 sm:text-sm"
          >
            EXPLORE OPPORTUNITIES
          </Link>
          <Link
            href="/contact"
            className="rounded-2xl border border-white/30 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 sm:text-sm"
          >
            CONNECT WITH US
          </Link>
        </div>
      </div>
    </section>
  );
}