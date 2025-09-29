import Image from "next/image";
import HeaderTopBar from "@/components/HeaderTopBar";

export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <HeaderTopBar />

      {/* Background image: your new file */}
      <Image
        src="/newlp.png"
        alt="Executive Partners — Private Banking & Wealth Management"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Centered content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 text-center md:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
          EXECUTIVE PARTNERS
        </h1>

        <p className="mt-5 max-w-3xl text-base text-white/90 sm:text-lg">
          Your Gateway to Elite Opportunities in Global Finance.
        </p>

        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/70 sm:text-sm">
          Top Recruiting for Private Banking &amp; Wealth Management
        </p>

        <div className="mt-8 h-px w-24 bg-white/25" />

        <p className="mt-6 max-w-3xl text-sm leading-7 text-white/85 md:text-base">
          Based in Geneva. Covering International Financial Hubs: Geneva, Zurich,
          London, New York, Miami, Dubai, Singapore.
        </p>

        <div className="mt-9">
          <a
            href="http://localhost:3007/"
            className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90"
          >
            EXPLORE OPPORTUNITIES
          </a>
        </div>
      </div>
    </main>
  );
}