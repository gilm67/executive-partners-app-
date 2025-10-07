"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const AUTO = process.env.NEXT_PUBLIC_WELCOME_AUTOREDIRECT === "1";

export default function Welcome() {
  useEffect(() => {
    if (!AUTO) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => { window.location.replace("/"); }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-[100dvh] bg-[#0B0E13] text-white">
      <Image src="/brand/imageep2.png" alt="Executive Partners" fill priority className="object-cover opacity-95" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex items-center justify-center min-h-[100dvh] text-center px-6">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">Executive Partners</h1>
          <p className="mt-4 text-lg text-white/80">Innovative Talent Solutions for Private Banking &amp; Wealth Management</p>
          <p className="mt-2 text-sm text-white/70">Zurich · Geneva · London · New York · Dubai · Hong Kong · Singapore</p>
          <div className="mt-10">
            <Link href="/" className="inline-block rounded-xl bg-white/10 px-6 py-3 text-white text-sm font-semibold hover:bg-white/20 transition">
              Enter Website
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in { animation: fadeIn 1.2s ease-out both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
      `}</style>
    </main>
  );
}
