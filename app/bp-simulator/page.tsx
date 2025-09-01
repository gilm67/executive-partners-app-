// app/bp-simulator/page.tsx
"use client";

import { useMemo, useState } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BP Simulator — Executive Partners",
  description:
    "Quickly simulate a private banking book: fees, lending income, custody splits, and net P&L.",
};

type Num = number | "";

function toNum(v: Num, fallback = 0) {
  if (v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export default function BpSimulatorPage() {
  // Inputs
  const [aum, setAum] = useState<Num>(50); // CHF m
  const [mgmtBps, setMgmtBps] = useState<Num>(60); // bps
  const [txBps, setTxBps] = useState<Num>(15); // bps
  const [lendingPct, setLendingPct] = useState<Num>(20); // % of AUM in Lombard
  const [nimBps, setNimBps] = useState<Num>(180); // lending net interest margin bps
  const [custodySplit, setCustodySplit] = useState<Num>(70); // % kept by bank after platform split
  const [rmShare, setRmShare] = useState<Num>(25); // % payout to RM/team
  const [otherCosts, setOtherCosts] = useState<Num>(120_000); // CHF fixed costs

  // Calculations
  const calc = useMemo(() => {
    const _aum = toNum(aum) * 1_000_000; // CHF
    const mgmtFee = (_aum * toNum(mgmtBps)) / 10_000; // bps -> %
    const txFee = (_aum * toNum(txBps)) / 10_000;
    const lendingBook = (_aum * toNum(lendingPct)) / 100;
    const lendingIncome = (lendingBook * toNum(nimBps)) / 10_000;
    const grossBankSide = (mgmtFee + txFee + lendingIncome) * (toNum(custodySplit) / 100);
    const payout = grossBankSide * (toNum(rmShare) / 100);
    const net = grossBankSide - payout - toNum(otherCosts);
    return {
      mgmtFee,
      txFee,
      lendingBook,
      lendingIncome,
      grossBankSide,
      payout,
      net,
    };
  }, [aum, mgmtBps, txBps, lendingPct, nimBps, custodySplit, rmShare, otherCosts]);

  const fmtCHF = (n: number) =>
    new Intl.NumberFormat("en-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="ep-section">
      <h1 className="ep-title">Business Plan Simulator</h1>
      <p className="ep-subtitle">
        Estimate book revenues and net P&amp;L from management fees, transactions, lending and payouts.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-5">
        {/* Inputs */}
        <section className="ep-panel md:col-span-3">
          <h2 className="text-base font-semibold">Inputs</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="ep-label">AUM (CHF m)</label>
              <input className="ep-input" type="number" value={aum} onChange={(e) => setAum(e.target.value as Num)} />
            </div>
            <div>
              <label className="ep-label">Mgmt fee (bps)</label>
              <input className="ep-input" type="number" value={mgmtBps} onChange={(e) => setMgmtBps(e.target.value as Num)} />
            </div>
            <div>
              <label className="ep-label">Transaction fees (bps)</label>
              <input className="ep-input" type="number" value={txBps} onChange={(e) => setTxBps(e.target.value as Num)} />
            </div>
            <div>
              <label className="ep-label">Lending as % of AUM</label>
              <input className="ep-input" type="number" value={lendingPct} onChange={(e) => setLendingPct(e.target.value as Num)} />
            </div>
            <div>
              <label className="ep-label">Lending NIM (bps)</label>
              <input className="ep-input" type="number" value={nimBps} onChange={(e) => setNimBps(e.target.value as Num)} />
            </div>
            <div>
              <label className="ep-label">Custody/platform split kept by bank (%)</label>
              <input className="ep-input" type="number" value={custodySplit} onChange={(e) => setCustodySplit(e.target.value as Num)} />
            </div>
            <div>
              <label className="ep-label">RM/team payout (%)</label>
              <input className="ep-input" type="number" value={rmShare} onChange={(e) => setRmShare(e.target.value as Num)} />
            </div>
            <div>
              <label className="ep-label">Other fixed costs (CHF)</label>
              <input className="ep-input" type="number" value={otherCosts} onChange={(e) => setOtherCosts(e.target.value as Num)} />
            </div>
          </div>
        </section>

        {/* Results */}
        <aside className="md:col-span-2 space-y-4">
          <div className="ep-panel">
            <h2 className="text-base font-semibold">Revenue breakdown</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between"><span>Management fees</span><span>{fmtCHF(calc.mgmtFee)}</span></li>
              <li className="flex justify-between"><span>Transaction fees</span><span>{fmtCHF(calc.txFee)}</span></li>
              <li className="flex justify-between"><span>Lending income</span><span>{fmtCHF(calc.lendingIncome)}</span></li>
              <li className="mt-2 border-t border-neutral-200 dark:border-neutral-800 pt-2 flex justify-between">
                <span>Gross (after custody split)</span><span className="font-semibold">{fmtCHF(calc.grossBankSide)}</span>
              </li>
            </ul>
          </div>

          <div className="ep-panel">
            <h2 className="text-base font-semibold">Payout &amp; Net</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between"><span>Payout</span><span>{fmtCHF(calc.payout)}</span></li>
              <li className="flex justify-between"><span>Other costs</span><span>{fmtCHF(toNum(otherCosts))}</span></li>
              <li className="mt-2 border-t border-neutral-200 dark:border-neutral-800 pt-2 flex justify-between">
                <span>Net P&amp;L</span>
                <span className={`font-semibold ${calc.net >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  {fmtCHF(calc.net)}
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <p className="mt-4 text-xs text-neutral-500">
        * Educational estimate. Actual results depend on product mix, pricing tiers, and platform agreements.
      </p>
    </div>
  );
}