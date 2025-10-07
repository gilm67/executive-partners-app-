// app/page.tsx
import HeaderTopBar from "@/components/HeaderTopBar";
import MobileHero from "@/components/MobileHero";
import Splash from "@/components/Splash";

type PageProps = { searchParams: Promise<{ mobile?: string }> };

export default async function Page({ searchParams }: PageProps) {
  const sp = await searchParams;                // ✅ await the dynamic API
  const raw = sp?.mobile ?? "";
  const forceMobile = raw === "" || raw === "1" || raw.toLowerCase() === "true";

  const splashEnabled = process.env.NEXT_PUBLIC_ENABLE_SPLASH === "1";

  return (
    <main className="relative w-full overflow-hidden pt-0 lg:pt-16">
      <HeaderTopBar />

      {splashEnabled && !forceMobile && (
        <div className="hidden lg:block">
          <Splash />
        </div>
      )}

      <div className={forceMobile ? "" : "lg:hidden"}>
        <MobileHero />
      </div>

      {!forceMobile && (
        <div className="hidden lg:block">
          <LegacyLanding />
        </div>
      )}
    </main>
  );
}

/* ---------- Desktop landing (placeholder) ---------- */
function LegacyLanding() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8 text-white/90">
      {/* your real desktop content */}
    </section>
  );
}