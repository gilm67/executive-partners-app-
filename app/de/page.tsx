// app/de/page.tsx
import type { Metadata } from "next";
import HomePage from "../page";

export const metadata: Metadata = {
  title: "Executive Partners – Executive Search im Private Banking",
  description:
    "Spezialisierte Executive-Search-Beratung für Private Banking und Wealth Management in Genf, Zürich, London, Dubai, Singapur und Hongkong.",
};

export default function HomeDePage() {
  // Reuse the main homepage layout, but with DE copy
  return <HomePage locale="de" />;
}