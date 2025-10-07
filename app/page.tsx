// app/page.tsx
import HeaderTopBar from "@/components/HeaderTopBar";
import MobileHero from "@/components/MobileHero";

type PageProps = {
  searchParams?: { mobile?: string };
};

export default function Page({ searchParams }: PageProps) {
  // Force the mobile hero when URL has ?mobile, ?mobile=1 or ?mobile=true
  const forceMobile =
    searchParams?.mobile === "" ||
    searchParams?.mobile === "1" ||
    searchParams?.mobile?.toLowerCase() === "true";

  return (
    <main className="relative w-full overflow-hidden pt-0 lg:pt-16">
      <HeaderTopBar />

      {/* Mobile-only hero; also render at any width if ?mobile=1 */}
      <div className={forceMobile ? "" : "lg:hidden"}>
        <MobileHero />
      </div>

      {/* Desktop landing; hidden when forcing mobile */}
      {!forceMobile && (
        <div className="hidden lg:block">
          <LegacyLanding />
        </div>
      )}
    </main>
  );
}

/* ---------- Your existing landing page (desktop) ---------- */
function LegacyLanding() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8 text-white/90">
      {/* Paste your current production landing JSX here */}
    </div>
  );
}
