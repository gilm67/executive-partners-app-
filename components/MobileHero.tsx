// components/MobileHero.tsx
"use client";

export default function MobileHero() {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden lg:hidden">
      {/* Mobile image only */}
      <img
        src="/hero-mobile.png"
        alt="Executive Partners — Mobile Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Readability overlay (optional) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CTA pinned bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center px-4">
        <a
          href="/opportunities"
          className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg hover:bg-neutral-100"
        >
          EXPLORE OPPORTUNITIES
        </a>
      </div>
    </section>
  );
}