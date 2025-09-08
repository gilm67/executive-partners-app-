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
          We typically respond the same business day.
        </p>
      </header>

      {/* Make both columns equal height */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 items-stretch">
        {/* LEFT: form in a full-height panel */}
        <section className="md:col-span-3 h-full">
          <div className="h-full rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <ContactForm />
          </div>
        </section>

        {/* RIGHT: info card + map; map grows to match left column bottom */}
        <aside className="md:col-span-2 h-full">
          <div className="h-full flex flex-col">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
              <h2 className="text-sm font-semibold text-neutral-200">Executive Partners</h2>
              <div className="mt-2 text-sm text-neutral-400">
                <p className="font-medium text-neutral-200">Head Office</p>
                <p>118 rue du Rhône</p>
                <p>1204 Geneva</p>
                <p>Switzerland</p>
              </div>

              <div className="my-4 h-px w-full bg-neutral-800" />

              <h3 className="text-sm font-semibold text-neutral-200">Typical Mandates</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-neutral-400">
                <li>Relationship Managers &amp; Team Heads (UHNW/HNW)</li>
                <li>Market Leaders (CH, MEA, UK, APAC, LatAm)</li>
                <li>Investor Protection, Risk &amp; COO roles</li>
                <li>Private Markets distribution &amp; advisory</li>
              </ul>

              <p className="mt-4 text-xs text-neutral-500">
                Meetings by appointment. <a className="underline underline-offset-2" href="/contact">Get in touch</a> to schedule a time.
              </p>
            </div>

            {/* Map fills the remaining height so the right column bottom lines up with the left */}
            <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
              <iframe
                title="Executive Partners – 118 rue du Rhône, 1204 Geneva"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Executive%20Partners%20118%20rue%20du%20Rh%C3%B4ne%201204%20Geneva&output=embed"
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}