import Link from "next/link";
import Image from "next/image";
import { getAllMarkets } from "@/lib/markets/data";

export const metadata = {
  title: "Private Banking Markets | Geneva, Zurich, Dubai & Beyond",
  description: "Private banking recruitment across 14 global wealth hubs. Compensation benchmarks, licensing and mandates in Geneva, Zurich, Dubai, Singapore, London and Riyadh.",
  alternates: { canonical: "https://www.execpartners.ch/en/markets" },
  openGraph: {
    title: "Private Banking Markets | Geneva, Zurich, Dubai & Beyond ",
    description: "Private banking recruitment across 13 global wealth hubs. Compensation, licensing and live mandates by city.",
    type: "website",
    url: "https://www.execpartners.ch/en/markets",
    images: [{ url: "/og.webp", width: 1200, height: 630 }],
    siteName: "Executive Partners",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Markets | Geneva, Zurich, Dubai & Beyond ",
    description: "Compensation benchmarks, licensing, client segments and live mandates across 13 private banking hubs.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function MarketsIndexPage() {
  const markets = getAllMarkets();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold">Markets</h1>
            <p className="mt-2 text-neutral-300">
              Explore compensation benchmarks, licensing, client base insights, and relocation guides for each hub.
            </p>
          </div>
          <Link
            href="/en/markets/compare"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#C9A14A]/30 bg-[#C9A14A]/5 px-5 py-2.5 text-sm font-semibold text-[#D4AF37] hover:bg-[#C9A14A]/10 transition-colors whitespace-nowrap"
          >
            Compare markets
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {markets.map((m) => (
          <Link
            key={m.slug}
            href={`/en/markets/${m.slug}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 shadow-xl ring-1 ring-white/5 transition hover:scale-[1.01]"
          >
            <div className="relative h-40 w-full">
              <Image
                src={m.heroImage}
                alt={`${m.city} hero`}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 100vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-4 text-lg font-medium">
                {m.city}
              </div>
            </div>
            <div className="p-4 text-sm text-neutral-300">
              {m.summary}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}