// app/contact/page.tsx
import ContactForm from "./ContactForm";
import Link from "next/link";

export const metadata = {
  title: "Contact | Executive Partners",
  description:
    "Contact Executive Partners for confidential searches in private banking and wealth management.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      {/* Soft hero glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 360px at 15% -10%, rgba(59,130,246,.12) 0%, rgba(59,130,246,0) 60%), radial-gradient(900px 320px at 110% 0%, rgba(16,185,129,.12) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
            Confidential Private Banking Recruitment
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            Contact
          </h1>
          <p className="mt-2 max-w-2xl text-neutral-300">
            Geneva-based. Mandates across Switzerland, the UK, the US, Dubai, Singapore &amp; Hong Kong.
            We typically respond the same business day.
          </p>
        </header>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {/* Left: form */}
          <section className="md:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
              <h2 className="text-lg font-semibold">Start a confidential conversation</h2>
              <p className="mt-1 mb-4 text-sm text-neutral-300">
                Share a few details and we’ll be in touch shortly.
              </p>
              <ContactForm />
            </div>
          </section>

          {/* Right: office & map */}
          <aside className="md:col-span-2">
            <div className="sticky top-6 space-y-4">
              {/* Office card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
                <h2 className="text-sm font-semibold text-white">Executive Partners</h2>
                <address className="not-italic mt-3 text-sm text-neutral-300 leading-relaxed">
                  <div className="font-semibold text-white">Head Office</div>
                  <div>118 rue du Rhône</div>
                  <div>1204 Geneva</div>
                  <div className="mt-1">Switzerland</div>
                </address>

                <div className="my-4 h-px w-full bg-white/10" />

                <h3 className="text-sm font-semibold text-white">Typical Mandates</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-neutral-300">
                  <li>Relationship Managers &amp; Team Heads (UHNW/HNW)</li>
                  <li>Market Leaders (CH, MEA, UK, APAC, LatAm)</li>
                  <li>Investor Protection, Risk &amp; COO roles</li>
                  <li>Private Markets distribution &amp; advisory</li>
                </ul>

                <p className="mt-4 text-xs text-neutral-400">
                  Meetings by appointment.{" "}
                  <Link href="/contact" className="text-blue-400 underline-offset-4 hover:underline">
                    Get in touch
                  </Link>{" "}
                  to schedule a time.
                </p>
              </div>

              {/* Map */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,.25)]">
                <iframe
                  title="Executive Partners — 118 rue du Rhône, 1204 Geneva"
                  src="https://www.google.com/maps?q=Executive+Partners+118+rue+du+Rh%C3%B4ne+1204+Geneva&output=embed"
                  className="h-[320px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </aside>
        </div>

        {/* JSON-LD for local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Executive Partners",
              url: "https://www.execpartners.ch",
              address: {
                "@type": "PostalAddress",
                streetAddress: "118 rue du Rhône",
                addressLocality: "Geneva",
                postalCode: "1204",
                addressCountry: "CH",
              },
            }),
          }}
        />
      </div>
    </main>
  );
}