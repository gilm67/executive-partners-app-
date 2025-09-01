// app/about/page.tsx
export const metadata = {
  title: "About Executive Partners",
  description:
    "International & Swiss Private Banking — HNW & UHNWI. Based in Geneva & Zurich.",
};

export default function AboutPage() {
  return (
    <div className="prose-page py-8 sm:py-10">
      {/* Page title */}
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        About Executive Partners
      </h1>

      {/* Main intro uses typography with dark invert for great contrast */}
      <article className="prose dark:prose-invert prose-neutral max-w-none text-base leading-7 mt-4">
        <p>
          We specialize in International &amp; Swiss Private Banking for HNW &amp; UHNWI
          clients, partnering with leading institutions and top-tier relationship managers.
        </p>
      </article>

      <section className="mt-6 grid gap-6 md:grid-cols-5">
        {/* Story + Values */}
        <article className="md:col-span-3 rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-sm">
          <div className="prose dark:prose-invert prose-neutral max-w-none">
            <h2>Our Story</h2>
            <p>
              Executive Partners connects exceptional private bankers with institutions where
              they can thrive. We focus on long-term relationships, cultural fit, and
              sustainable client outcomes.
            </p>

            <h3>What We Value</h3>
            <ul>
              <li>Client trust &amp; discretion</li>
              <li>Long-term partnerships</li>
              <li>Excellence in execution</li>
              <li>Compliance-first approach</li>
            </ul>
          </div>
        </article>

        {/* Address + CTA */}
        <div className="md:col-span-2 rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 sm:p-6 shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Our Address
          </h2>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            118 rue du Rhône<br />
            1204 Geneva, Switzerland
          </p>
          <a
            className="mt-5 inline-flex w-fit items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            href="https://maps.google.com/?q=118%20rue%20du%20Rh%C3%B4ne%2C%201204%20Geneva"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </div>
      </section>

      {/* Map card */}
      <section className="mt-6 rounded-2xl border border-neutral-200/70 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            title="Executive Partners — 118 rue du Rhône, 1204 Geneva"
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=118%20rue%20du%20Rh%C3%B4ne%2C%201204%20Geneva&output=embed"
          />
        </div>
      </section>
    </div>
  );
}
