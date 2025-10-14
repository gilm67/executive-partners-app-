import Link from "next/link";
import Image from "next/image";
import { getAllMarkets } from "@/lib/markets/data";

export const metadata = {
  title: "Markets — Executive Partners",
  description: "Compensation, licensing, client base, and relocation guides by city.",
};

export default function MarketsIndexPage() {
  const markets = getAllMarkets();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">Markets</h1>
        <p className="mt-2 text-neutral-300">
          Explore compensation benchmarks, licensing, client base insights, and relocation guides for each hub.
        </p>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
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