// app/about/page.tsx
export const metadata = {
  title: "About | Executive Partners",
  description:
    "Executive Partners is a boutique search firm for Private Banking & Wealth Management across Switzerland and Europe.",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">About Executive Partners</h1>

      <p className="mt-4 text-neutral-300">
        We are a boutique executive search firm focused on Private Banking &amp; Wealth Management
        in Switzerland and Europe. We help banks, family offices, and wealth managers hire
        top-performing relationship managers and leadership talent.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-neutral-800 p-6 bg-neutral-900/40">
          <h2 className="text-xl font-medium text-white">What we do</h2>
          <ul className="mt-3 list-disc pl-5 text-neutral-300 space-y-2">
            <li>Search &amp; selection for Private Banking roles (HNW &amp; UHNW)</li>
            <li>Confidential moves &amp; team lifts</li>
            <li>Market mapping and compensation insights</li>
          </ul>
        </section>

        <section className="rounded-xl border border-neutral-800 p-6 bg-neutral-900/40">
          <h2 className="text-xl font-medium text-white">Where we work</h2>
          <p className="mt-3 text-neutral-300">
            Geneva, Zurich, Lugano, and broader EU hubs. We operate with strict confidentiality and
            a relationship-first approach.
          </p>
        </section>
      </div>

      <section className="mt-10 rounded-xl border border-neutral-800 p-6 bg-neutral-900/40">
        <h2 className="text-xl font-medium text-white">Contact</h2>
        <p className="mt-3 text-neutral-300">
          For mandates or discrete conversations, please{" "}
          <a href="/contact" className="underline underline-offset-4 hover:text-white">
            get in touch
          </a>.
        </p>
      </section>
    </main>
  );
}
