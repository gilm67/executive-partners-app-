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
    <main className="relative min-h-[100dvh] bg-[#0B0E13] text-white overflow-hidden">
      <Image
        src="/brand/imageep2.png"
        alt="Executive Partners"
        fill
        priority
        className="object-cover opacity-95"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Button Only */}
      <div className="relative z-10 flex items-center justify-center min-h-[100dvh] text-center">
        <Link
          href="/"
          className="rounded-xl bg-white/15 px-8 py-4 text-white text-base font-semibold hover:bg-white/30 transition shadow-lg backdrop-blur-md"
        >
          Enter Website
        </Link>
      </div>

      <style jsx>{`
        a {
          animation: fadeIn 1.4s ease-out both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}