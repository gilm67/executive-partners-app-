'use client';

import { useBP } from './store';

export default function Section6Save() {
  const { i } = useBP();

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">6️⃣ Summary & Next Step</h2>
      <p className="text-sm text-white/70">
        Your business plan has been saved and the full professional PDF can be downloaded from the Analysis section.
        If you would like us to contact you, click the button below.
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href={`/en/contact?subject=${encodeURIComponent('BP Simulator – Request a Call')}&name=${encodeURIComponent(i.candidate_name || '')}&email=${encodeURIComponent(i.candidate_email || '')}`}
          className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white px-4 py-2 text-sm font-semibold"
        >
          Request a Call
        </a>
      </div>

      <div className="text-xs text-white/45">
        Note: The “Save to Google Sheet + Download PDF” action is available in Section 5 (AI Candidate Analysis) and
        includes the complete analysis layout.
      </div>
    </section>
  );
}
