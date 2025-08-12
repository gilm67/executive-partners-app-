export default function PrivacyPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Privacy & Data Protection</h1>
      <p className="text-neutral-700">
        We process personal data solely for recruitment and pre-screening purposes in accordance with the Swiss DPA
        and GDPR. Candidate data is handled confidentially and removed upon request.
      </p>
      <ul className="list-disc pl-5 text-sm text-neutral-700">
        <li>No client names are collected by the BP Simulator.</li>
        <li>Access to candidate details is consent-based.</li>
        <li>Retention: typically 12 months unless you ask for earlier deletion.</li>
      </ul>
      <p className="text-sm text-neutral-600">For data requests: privacy@executive-partners.ch</p>
    </section>
  );
}
