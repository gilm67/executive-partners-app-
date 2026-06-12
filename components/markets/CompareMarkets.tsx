"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  X,
  Plus,
  Compass,
  TrendingUp,
  Crown,
  Shield,
  Languages,
  Flame,
  Wrench,
  Landmark,
  MapPin,
} from "lucide-react";
import { MARKETS, fmt, type Market } from "@/lib/markets/data";

const MAX_COMPARE = 3;

const FLAGS: Record<string, string> = {
  geneva: "🇨🇭",
  zurich: "🇨🇭",
  london: "🇬🇧",
  dubai: "🇦🇪",
  singapore: "🇸🇬",
  "hong-kong": "🇭🇰",
  "new-york": "🇺🇸",
  miami: "🇺🇸",
  paris: "🇫🇷",
  madrid: "🇪🇸",
  milan: "🇮🇹",
  lisbon: "🇵🇹",
};

const ACCENTS = [
  { ring: "ring-[#D4AF37]/40", bg: "from-[#D4AF37]/15 to-transparent", text: "text-[#F0D060]", dot: "bg-[#D4AF37]" },
  { ring: "ring-[#9ECBFF]/35", bg: "from-[#9ECBFF]/12 to-transparent", text: "text-[#BFE0FF]", dot: "bg-[#9ECBFF]" },
  { ring: "ring-emerald-400/30", bg: "from-emerald-400/10 to-transparent", text: "text-emerald-300", dot: "bg-emerald-400" },
];

function MarketPicker({
  selected,
  onAdd,
}: {
  selected: string[];
  onAdd: (slug: string) => void;
}) {
  const available = MARKETS.filter((m) => !selected.includes(m.slug));
  if (available.length === 0 || selected.length >= MAX_COMPARE) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {available.map((m) => (
        <button
          key={m.slug}
          onClick={() => onAdd(m.slug)}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/70 hover:bg-white/[0.07] hover:text-white hover:border-white/20 transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{FLAGS[m.slug]}</span>
          {m.city}
        </button>
      ))}
    </div>
  );
}

function RowLabel({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/8 shrink-0">
        {icon}
      </span>
      <span className="leading-tight">{label}</span>
    </div>
  );
}

function Row({
  icon,
  label,
  markets,
  render,
  zebra,
}: {
  icon: ReactNode;
  label: string;
  markets: { market: Market; accent: typeof ACCENTS[number] }[];
  render: (m: Market) => ReactNode;
  zebra?: boolean;
}) {
  return (
    <div
      className={`grid border-b border-white/[0.06] last:border-b-0 ${zebra ? "bg-white/[0.015]" : ""}`}
      style={{ gridTemplateColumns: `200px repeat(${markets.length}, 1fr)` }}
    >
      <div className="px-5 py-5 flex items-center">
        <RowLabel icon={icon} label={label} />
      </div>
      {markets.map(({ market, accent }) => (
        <div key={market.slug} className="px-5 py-5 text-sm text-white/85 border-l border-white/[0.06] flex items-center">
          <div className="w-full">{render(market)}</div>
        </div>
      ))}
    </div>
  );
}

export default function CompareMarkets() {
  const [selected, setSelected] = useState<string[]>(["geneva", "dubai"]);

  const markets = useMemo(
    () => selected.map((s) => MARKETS.find((m) => m.slug === s)).filter((m): m is Market => !!m),
    [selected]
  );

  const markedMarkets = useMemo(
    () => markets.map((market, i) => ({ market, accent: ACCENTS[i % ACCENTS.length] })),
    [markets]
  );

  const addMarket = (slug: string) => {
    if (selected.length < MAX_COMPARE) setSelected([...selected, slug]);
  };

  const removeMarket = (slug: string) => {
    setSelected(selected.filter((s) => s !== slug));
  };

  return (
    <div className="space-y-6">
      {/* Market chips */}
      <div className="flex flex-wrap items-center gap-3">
        {markedMarkets.map(({ market: m, accent }) => (
          <div
            key={m.slug}
            className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r ${accent.bg} px-4 py-2 text-sm font-semibold text-white ring-1 ${accent.ring}`}
          >
            <span className="text-base">{FLAGS[m.slug]}</span>
            {m.city}
            {markets.length > 1 && (
              <button
                onClick={() => removeMarket(m.slug)}
                aria-label={`Remove ${m.city}`}
                className="rounded-full p-0.5 hover:bg-white/10 transition-colors"
              >
                <X className="h-3.5 w-3.5 text-white/60" />
              </button>
            )}
          </div>
        ))}
      </div>

      {selected.length < MAX_COMPARE && (
        <div>
          <p className="mb-2 text-xs text-white/40">
            Add {selected.length === 0 ? "a market" : "another market"} to compare (up to {MAX_COMPARE}):
          </p>
          <MarketPicker selected={selected} onAdd={addMarket} />
        </div>
      )}

      {markedMarkets.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/60 text-sm">
          Select at least one market to begin.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur shadow-[0_22px_70px_rgba(0,0,0,.5)]">
          <div className="min-w-[680px]">
            {/* Header row */}
            <div
              className="grid border-b border-white/10"
              style={{ gridTemplateColumns: `200px repeat(${markedMarkets.length}, 1fr)` }}
            >
              <div className="px-5 py-6" />
              {markedMarkets.map(({ market: m, accent }) => (
                <div
                  key={m.slug}
                  className={`px-5 py-6 border-l border-white/[0.06] bg-gradient-to-b ${accent.bg}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{FLAGS[m.slug]}</span>
                    <div>
                      <div className="text-lg font-semibold text-white leading-tight">{m.city}</div>
                      <div className="text-xs text-white/45">{m.country}</div>
                    </div>
                  </div>
                  <div className={`mt-2 h-0.5 w-10 rounded-full ${accent.dot}`} />
                </div>
              ))}
            </div>

            <Row
              icon={<Compass className="h-3.5 w-3.5 text-white/50" />}
              label="Focus"
              markets={markedMarkets}
              render={(m) => (
                <span className="font-medium">{m.atAGlance.find((s) => s.label === "Focus")?.value ?? "—"}</span>
              )}
            />

            <Row
              icon={<TrendingUp className="h-3.5 w-3.5 text-[#D4AF37]" />}
              label="Senior RM / Director"
              markets={markedMarkets}
              zebra
              render={(m) => {
                const band = m.compensation.find((c) => c.role.includes("Senior RM") || c.role.includes("Director"));
                if (!band) return "—";
                return (
                  <div>
                    <div className="font-semibold text-white text-base tabular-nums">
                      {fmt(band.baseMin, m)} – {fmt(band.baseMax, m)}
                    </div>
                    <div className="text-xs text-[#D4AF37]/80 mt-1">Bonus {band.bonusPct}</div>
                  </div>
                );
              }}
            />

            <Row
              icon={<Crown className="h-3.5 w-3.5 text-[#D4AF37]" />}
              label="Team Lead / Market Head"
              markets={markedMarkets}
              render={(m) => {
                const band = m.compensation.find((c) => c.role.includes("Team Lead") || c.role.includes("Market Head"));
                if (!band) return "—";
                return (
                  <div>
                    <div className="font-semibold text-white text-base tabular-nums">
                      {fmt(band.baseMin, m)} – {fmt(band.baseMax, m)}
                    </div>
                    <div className="text-xs text-[#D4AF37]/80 mt-1">Bonus {band.bonusPct}</div>
                  </div>
                );
              }}
            />

            <Row
              icon={<Shield className="h-3.5 w-3.5 text-white/50" />}
              label="Regulator"
              markets={markedMarkets}
              zebra
              render={(m) => <span className="text-white/75">{m.licensing.regulator}</span>}
            />

            <Row
              icon={<Languages className="h-3.5 w-3.5 text-white/50" />}
              label="Languages"
              markets={markedMarkets}
              render={(m) => {
                const lang = m.atAGlance.find((s) => s.label === "Languages");
                if (!lang) return "—";
                return (
                  <div>
                    <div className="font-medium">{lang.value}</div>
                    {lang.hint && <div className="text-xs text-white/40 mt-0.5">{lang.hint}</div>}
                  </div>
                );
              }}
            />

            <Row
              icon={<Flame className="h-3.5 w-3.5 text-orange-400/80" />}
              label="Hot roles"
              markets={markedMarkets}
              zebra
              render={(m) => (
                <ul className="space-y-1.5">
                  {m.hiringPulse.hotRoles.slice(0, 3).map((r) => (
                    <li key={r} className="flex items-start gap-1.5 text-xs text-white/70 leading-snug">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-orange-400/60" />
                      {r}
                    </li>
                  ))}
                </ul>
              )}
            />

            <Row
              icon={<Wrench className="h-3.5 w-3.5 text-[#9ECBFF]" />}
              label="Hot skills"
              markets={markedMarkets}
              render={(m) => (
                <ul className="space-y-1.5">
                  {m.hiringPulse.hotSkills.slice(0, 3).map((s) => (
                    <li key={s} className="flex items-start gap-1.5 text-xs text-white/70 leading-snug">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#9ECBFF]/60" />
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            />

            <Row
              icon={<Landmark className="h-3.5 w-3.5 text-white/50" />}
              label="Key banks"
              markets={markedMarkets}
              zebra
              render={(m) => (
                <div className="text-xs text-white/65 leading-relaxed">
                  {m.ecosystem.keyBanks.slice(0, 5).join(" · ")}
                  {m.ecosystem.keyBanks.length > 5 ? " …" : ""}
                </div>
              )}
            />

            <Row
              icon={<MapPin className="h-3.5 w-3.5 text-white/50" />}
              label="Booking centres"
              markets={markedMarkets}
              render={(m) => (
                <div className="text-xs text-white/65 leading-relaxed">
                  {m.ecosystem.bookingCentres.join(" · ")}
                </div>
              )}
            />

            {/* CTA row */}
            <div
              className="grid border-t border-white/10 bg-white/[0.02]"
              style={{ gridTemplateColumns: `200px repeat(${markedMarkets.length}, 1fr)` }}
            >
              <div className="px-5 py-5" />
              {markedMarkets.map(({ market: m }) => (
                <div key={m.slug} className="px-5 py-5 border-l border-white/[0.06]">
                  <Link
                    href={`/en/markets/${m.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#C9A14A] to-[#F0D060] px-4 py-2 text-xs font-semibold text-[#0B0E13] hover:brightness-105 transition-all"
                  >
                    {m.city} market <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-[11px] text-white/35">
        Compensation figures shown in each market&rsquo;s local currency. Directional benchmarks for 2025 private banking roles; final offers vary by portable book, ROA and firm performance.
      </p>
    </div>
  );
}
