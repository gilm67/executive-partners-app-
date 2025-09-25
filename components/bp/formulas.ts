import type { CandidateInputs, Prospect } from './types';

export const HEADER_ORDER = [
  "Timestamp","Candidate Name","Candidate Email","Current Role","Candidate Location",
  "Current Employer","Current Market","Currency","Base Salary","Last Bonus",
  "Current Number of Clients","Current AUM (M CHF)",
  "NNM Year 1 (M CHF)","NNM Year 2 (M CHF)","NNM Year 3 (M CHF)",
  "Revenue Year 1 (CHF)","Revenue Year 2 (CHF)","Revenue Year 3 (CHF)",
  "Total Revenue 3Y (CHF)","Profit Margin (%)","Total Profit 3Y (CHF)",
  "Score","AI Evaluation Notes"
] as const;

export function revenueFromNNM(nnmM: number, roaPct: number) {
  return nnmM * (roaPct/100) * 1_000_000;
}

export function fixedCostFromSalary(baseSalary: number) {
  // same as Streamlit: base_salary * 1.25
  return baseSalary * 1.25;
}

export function summarizeRevenue(i: CandidateInputs) {
  const rev1 = revenueFromNNM(i.nnm_y1_m, i.roa_y1_pct);
  const rev2 = revenueFromNNM(i.nnm_y2_m, i.roa_y2_pct);
  const rev3 = revenueFromNNM(i.nnm_y3_m, i.roa_y3_pct);
  const fixed = fixedCostFromSalary(i.base_salary);
  const nm1 = rev1 - fixed;
  const nm2 = rev2 - fixed;
  const nm3 = rev3 - fixed;
  const totalRev = rev1 + rev2 + rev3;
  const totalCosts = fixed * 3;
  const totalNet = nm1 + nm2 + nm3;
  const profitMarginPct = totalRev > 0 ? ((totalNet / totalRev) * 100) : 0;

  return { rev1, rev2, rev3, totalRev, fixed, nm1, nm2, nm3, totalCosts, totalNet, profitMarginPct };
}

export function trafficLightScore(i: CandidateInputs, prospects: Prospect[]) {
  const total_nnm_3y = i.nnm_y1_m + i.nnm_y2_m + i.nnm_y3_m;
  const avg_roa = (i.roa_y1_pct + i.roa_y2_pct + i.roa_y3_pct) / 3;

  // AUM thresholds
  const aum_min = (i.current_market === 'CH Onshore' || i.target_segment==='HNWI') ? 200 : 300;

  let score = 0;
  const positives:string[] = [];
  const negatives:string[] = [];
  const flags:string[] = [];

  if (i.years_experience >= 7) { score += 2; positives.push("Experience ≥7 years in market"); }
  else if (i.years_experience >= 6) { score += 1; positives.push("Experience 6 years"); }
  else { negatives.push("Experience <6 years"); }

  if (i.current_assets_mchf >= aum_min) {
    if (i.current_market === 'CH Onshore' && i.current_assets_mchf >= 250) {
      score += 2; positives.push("AUM meets CH 250M target");
    } else {
      score += 2; positives.push(`AUM ≥ ${aum_min}M`);
    }
  } else {
    negatives.push(`AUM shortfall: ${(aum_min - i.current_assets_mchf).toFixed(0)}M`);
  }

  if (i.base_salary > 200_000 && i.last_bonus > 100_000) {
    score += 2; positives.push("Comp indicates hunter profile");
  } else if (i.base_salary <= 150_000 && i.last_bonus <= 50_000) {
    score -= 1; negatives.push("Low comp indicates inherited/low portability");
  } else {
    flags.push("Comp neutral – clarify origin of book");
  }

  if (avg_roa >= 1.0) { score += 2; positives.push(`Avg ROA ${avg_roa.toFixed(2)}% (excellent)`); }
  else if (avg_roa >= 0.8) { score += 1; positives.push(`Avg ROA ${avg_roa.toFixed(2)}% (acceptable)`); }
  else { negatives.push(`Avg ROA ${avg_roa.toFixed(2)}% is low`); }

  if (i.current_number_clients === 0) flags.push("Clients not provided");
  else if (i.current_number_clients > 80) negatives.push(`High client count (${i.current_number_clients}) – likely lower segment`);
  else { score += 1; positives.push("Client load appropriate (≤80)"); }

  const bestSum = prospects.reduce((s,p)=>s + (p['Best NNM (M)']||0), 0);
  const tol = Math.max(0, i.tolerance_pct)/100;
  if (i.nnm_y1_m === 0 && bestSum === 0) {
    flags.push("Prospects & NNM Y1 both zero");
  } else if (Math.abs(bestSum - i.nnm_y1_m) <= tol * Math.max(i.nnm_y1_m, 1e-9)) {
    score += 1; positives.push(`Prospects Best NNM ${bestSum.toFixed(1)}M ≈ NNM Y1 ${i.nnm_y1_m.toFixed(1)}M`);
  } else {
    negatives.push(`Prospects ${bestSum.toFixed(1)}M vs NNM Y1 ${i.nnm_y1_m.toFixed(1)}M (> ${i.tolerance_pct}% dev)`);
  }

  if (total_nnm_3y >= (i.target_segment === 'HNWI' ? 100 : 200)) {
    score += 2; positives.push(`3Y NNM ${total_nnm_3y.toFixed(1)}M meets target`);
  } else {
    negatives.push(`3Y NNM ${total_nnm_3y.toFixed(1)}M below target`);
  }

  const verdict = score >= 7 ? "🟢 Strong Candidate" : score >= 4 ? "🟡 Medium Potential" : "🔴 Weak Candidate";
  return { score, verdict, positives, negatives, flags, total_nnm_3y, avg_roa };
}
