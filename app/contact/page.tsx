// app/contact/page.tsx
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact | Executive Partners",
  description:
    "Contact Executive Partners for confidential searches in private banking and wealth management.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Contact</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Geneva-based. Mandates across Switzerland, the UK, the US, Dubai, Singapore & Hong Kong.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <section className="md:col-span-3">
          <ContactForm />
        </section>

        <aside className="md:col-span-2">
          <div className="sticky top-6 space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <h2 className="text-sm font-semibold text-neutral-200">Executive Partners</h2>
            <div className="text-sm text-neutral-400">
              <p>Geneva, Switzerland</p>
              <p className="mt-1">Private Banking &amp; Wealth Management Recruitment</p>
            </div>
            <div className="h-px w-full bg-neutral-800" />
            <h3 className="text-sm font-semibold text-neutral-200">Typical Mandates</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
              <li>Relationship Managers &amp; Team Heads (UHNW/HNW)</li>
              <li>Market Leaders (CH, MEA, UK, APAC, LatAm)</li>
              <li>Investor Protection, Risk &amp; COO roles</li>
              <li>Private Markets distribution &amp; advisory</li>
            </ul>
            <div className="h-px w-full bg-neutral-800" />
            <p className="text-xs text-neutral-500">We typically respond the same business day.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}