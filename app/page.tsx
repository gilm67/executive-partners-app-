// app/page.tsx
import HeaderTopBar from "@/components/HeaderTopBar";
import MobileHero from "@/components/MobileHero"; // mobile-only hero

export default function Page() {
  return (
    <main className="relative w-full overflow-hidden pt-0 lg:pt-16">
      {/* Header: transparent on mobile (over hero), solid on desktop */}
      <HeaderTopBar />

      {/* Mobile-only hero (phones/tablets) */}
      <div className="lg:hidden">
        <MobileHero />
      </div>

      {/* Desktop-only: ALWAYS your existing landing */}
      <div className="hidden lg:block">
        <LegacyLanding />
      </div>
    </main>
  );
}

/* ---------- Your existing landing page (desktop) ---------- */
function LegacyLanding() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8 text-white/90">
      {/* ← Keep/paste your current production landing JSX here */}
    </div>
  );
}

/* NOTE:
   - Removed HeroSection entirely from rendering.
   - Removed NEXT_PUBLIC_SHOW_NEW_HERO toggle usage.
   - Desktop will ONLY show LegacyLanding (your current live landing).
   - Mobile will ONLY show MobileHero.
*/