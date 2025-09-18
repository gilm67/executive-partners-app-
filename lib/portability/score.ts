// lib/portability/score.ts
import { BOOKING_CENTRE_MULTIPLIER } from "./config";

export type Inputs = {
  marketId: string;
  bookingCentres: string[];
  aumMix: number;           // 1–5
  crossBorderLicenses: number; // 0–3
  productScope: number;     // 1–4
  clientConcentration: number; // 1–5 (inverse)
  kycPortability: number;   // 0–3
};

export function computeScore(i: Inputs) {
  const centreFactor =
    i.bookingCentres.reduce((acc, c) => acc + (BOOKING_CENTRE_MULTIPLIER[c] || 0.8), 0) /
    Math.max(i.bookingCentres.length, 1);

  // weights tuned for CH/UK/SG/DIFC reality; you can tweak later
  const w = { aumMix: 0.2, centres: 0.2, licenses: 0.15, product: 0.15, concentration: 0.15, kyc: 0.15 };

  const invConcentration = (6 - i.clientConcentration); // lower concentration → higher score
  let raw =
    w.aumMix * normalize(i.aumMix, 1, 5) +
    w.centres * clamp01(centreFactor) +
    w.licenses * normalize(i.crossBorderLicenses, 0, 3) +
    w.product * normalize(i.productScope, 1, 4) +
    w.concentration * normalize(invConcentration, 1, 5) +
    w.kyc * normalize(i.kycPortability, 0, 3);

  return Math.round(raw * 100);
}

const normalize = (v: number, min: number, max: number) => (v - min) / (max - min);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));