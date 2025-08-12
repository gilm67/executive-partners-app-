export default function ContactPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="text-neutral-700">Book a confidential introduction. We typically respond within 24 hours.</p>
      <div className="rounded-2xl border border-neutral-200 p-6">
        <p className="text-sm text-neutral-600">Add a Calendly inline widget or keep it simple with your email/phone.</p>
        <ul className="mt-3 text-sm text-neutral-700">
          <li>Email: <a className="text-blue-700 underline" href="mailto:info@executive-partners.ch">info@executive-partners.ch</a></li>
          <li>Phone/WhatsApp: +41 …</li>
        </ul>
      </div>
    </section>
  );
}
