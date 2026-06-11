import candidates from "@/data/candidates.json";
import TalentBenchClient from "./TalentBenchClient";

export const metadata = {
  title: "Confidential Talent Bench | Executive Partners",
  description:
    "A curated, anonymized selection of senior private banking and wealth management professionals currently engaged with Executive Partners.",
};

export default function TalentBenchPage() {
  return (
    <main className="bg-brand-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-brand-gold mb-3">
            Confidential
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-brand-text">
            Talent Bench
          </h1>
          <p className="text-brand-textMuted leading-relaxed">
            A selection of senior professionals currently engaged with
            Executive Partners, presented on a fully anonymized basis. These
            profiles span compliance, investments, operations, family office
            and relationship management roles across multiple jurisdictions.
            Identities and current employers are disclosed only after a
            formal introduction request and mutual confidentiality
            understanding.
          </p>
        </header>

        <TalentBenchClient candidates={candidates} />
      </div>
    </main>
  );
}
