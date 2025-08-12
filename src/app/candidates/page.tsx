export default function CandidatesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">For Candidates</h1>
      <p className="text-neutral-700">
        Register confidentially to join our talent network. We cover Private Bankers/RMs, Investment Advisors,
        Portfolio Managers, and leadership roles (CEO/COO/CIO/Compliance).
      </p>
      <ul className="list-disc pl-5 text-sm text-neutral-700">
        <li>AUM handled, market coverage, languages</li>
        <li>Mobility & notice period</li>
        <li>CV upload (PDF/DOCX)</li>
      </ul>
      <a href="/candidates/register" className="inline-block rounded-xl bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800">
        Register confidentially
      </a>
    </section>
  );
}
