// components/MobileHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function MobileHero() {
  return (
    <section
      aria-label="Executive Partners mobile hero"
      className="relative w-full h-[100dvh] overflow-hidden lg:hidden"
    >
      {/* Background image (optimized) */}
      <Image
        src="/hero-mobile.png"
        alt="Executive Partners — Global finance opportunities"
        fill
        priority={false}
        sizes="100vw"
        className="object-cover"
      />

      {/* Readability/contrast overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" aria-hidden />

      {/* CTA pinned with safe-area padding */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
        <div className="flex justify-center">
          <Link
            href="/opportunities"
            aria-label="Explore opportunities"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-base font-semibold text-neutral-900 shadow-lg hover:bg-neutral-100 active:scale-[0.99] transition"
          >
            EXPLORE OPPORTUNITIES
          </Link>
        </div>
      </div>
    </section>
  );
}