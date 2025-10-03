"use client";

export default function ResultCard({
  result,
}: {
  result: { score: number; summary?: string; reasons_pos?: string[]; reasons_neg?: string[] };
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="text-sm text-white/60">Portability Score</div>
      <div className="mt-1 text-4xl font-extrabold">{result.score}</div>
      {result.summary && <p className="mt-2 text-sm text-white/80">{result.summary}</p>}
      <div className="mt-4 space-y-2 text-sm">
        {result.reasons_pos && result.reasons_pos.length > 0 && (
          <div>
            <div className="font-semibold text-green-300">Strengths</div>
            <ul className="list-disc pl-5 text-green-200">
              {result.reasons_pos.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
        {result.reasons_neg && result.reasons_neg.length > 0 && (
          <div>
            <div className="font-semibold text-red-300">Risks</div>
            <ul className="list-disc pl-5 text-red-200">
              {result.reasons_neg.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}