// components/HeroFrame.tsx
"use client";
import { useEffect, useState } from "react";

export default function HeroFrame({ children }: { children: React.ReactNode }) {
  const [inView, setInView] = useState(false);
  useEffect(() => { setInView(true); }, []);
  return <section className={`hero-reveal ${inView ? "is-in" : ""}`}>{children}</section>;
}