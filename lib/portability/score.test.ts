import { computeScore } from "./score";

const base = {
  marketId: "uae_dubai",
  bookingCentres: ["Dubai (DIFC)","Geneva"],
  aumMix: 3,
  crossBorderLicenses: 1,
  productScope: 2,
  clientConcentration: 3,
  kycPortability: 1,
};

test("baseline score is within sane range", () => {
  const s = computeScore(base);
  expect(s).toBeGreaterThanOrEqual(40);
  expect(s).toBeLessThanOrEqual(95);
});

test("more licences + product breadth + lower concentration increases score", () => {
  const better = { ...base, crossBorderLicenses: 3, productScope: 4, clientConcentration: 1, kycPortability: 3 };
  expect(computeScore(better)).toBeGreaterThan(computeScore(base));
});
