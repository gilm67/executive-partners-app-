export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          About Executive Partners
        </h1>
        <p className="mt-4 text-neutral-600">
          We specialize in International & Swiss Private Banking for HNW & UHNW clients,
          partnering with leading institutions and top-tier relationship managers.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Our Story</h2>
          <div className="prose-job mt-3">
            <p>
              Executive Partners connects exceptional private bankers with institutions
              where they can thrive. We focus on long-term relationships, cultural fit, and
              sustainable client outcomes across Switzerland and key international markets.
            </p>
          </div>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">What We Value</h2>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>• Client trust & discretion</li>
            <li>• Long-term partnerships</li>
            <li>• Excellence in execution</li>
            <li>• Compliance-first approach</li>
          </ul>
        </article>
      </section>

      <section className="grid gap-6 md:grid-cols-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:col-span-2">
          <h2 className="text-xl font-semibold">Our Address</h2>
          <p className="mt-3 text-neutral-700">
            118 rue du Rhône<br />
            1204 Geneva, Switzerland
          </p>
          <a
            className="mt-5 inline-flex w-fit items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            href="https://maps.google.com/?q=118%20rue%20du%20Rh%C3%B4ne%2C%201204%20Geneva"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </div>

        <div className="md:col-span-3 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: "62%" }}>
            <iframe
              title="Executive Partners — 118 rue du Rhône, 1204 Geneva"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=118%20rue%20du%20Rh%C3%B4ne%2C%201204%20Geneva&output=embed"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
