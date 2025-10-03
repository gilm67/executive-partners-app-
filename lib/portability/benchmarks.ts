// lib/portability/benchmarks.ts
export type Benchmark = { median: number; topQuartile: number; notes?: string[] };

export const MARKET_BENCHMARKS: Record<string, Benchmark> = {
  /* CH Onshore */
  ch_geneva:   { median: 69, topQuartile: 81, notes: ["LSFin evidence reuse limits portability vs UK/SG"] },
  ch_zurich:   { median: 70, topQuartile: 82 },
  ch_lausanne: { median: 68, topQuartile: 80 },

  /* UK/EU */
  uk_london:          { median: 72, topQuartile: 84, notes: ["High acceptance with CH/SG booking matrices"] },
  eu_france_paris:    { median: 70, topQuartile: 82 },
  eu_spain_madrid:    { median: 69, topQuartile: 81 },
  eu_italy_milan:     { median: 68, topQuartile: 80 },
  eu_germany_munich:  { median: 70, topQuartile: 82 },
  mc_monaco:          { median: 71, topQuartile: 83 },
  lu_luxembourg:      { median: 73, topQuartile: 85 },

  /* MEA */
  uae_dubai:     { median: 73, topQuartile: 86, notes: ["DIFC + CH/SG centres score well"] },
  uae_abudhabi:  { median: 72, topQuartile: 85 },
  saudi_riyadh:  { median: 66, topQuartile: 79, notes: ["CMA POA/notarization often a cap"] },
  qatar_doha:    { median: 69, topQuartile: 82 },
  kuwait_kuwaitcity: { median: 68, topQuartile: 81 },
  bahrain_manama:    { median: 68, topQuartile: 81 },
  southafrica_johannesburg: { median: 67, topQuartile: 80 },

  /* LATAM */
  brazil:    { median: 70, topQuartile: 83, notes: ["FX registration readiness improves portability"] },
  argentina: { median: 64, topQuartile: 77, notes: ["Capital controls often cap scores"] },
  chile:     { median: 69, topQuartile: 82 },
  mexico:    { median: 69, topQuartile: 82 },
  colombia:  { median: 67, topQuartile: 80 },
  peru:      { median: 66, topQuartile: 79 },

  /* ASIA */
  singapore:    { median: 74, topQuartile: 86, notes: ["Global acceptance of SG booking"] },
  hongkong:     { median: 72, topQuartile: 85 },
  india_mumbai: { median: 66, topQuartile: 79, notes: ["LRS & tax documentation are typical caps"] },
  china_shanghai: { median: 62, topQuartile: 75 },
  indonesia_jakarta: { median: 65, topQuartile: 78 },

  /* CEE */
  poland_warsaw:     { median: 68, topQuartile: 81 },
  romania_bucharest: { median: 66, topQuartile: 79 },
  czech_prague:      { median: 68, topQuartile: 81 },

/* Southern Europe */
gr_greece_athens: { median: 67, topQuartile: 80, notes: ["Documentation gaps common vs CH/UK peers"] },

/* Turkey */
tr_turkey_istanbul: { median: 65, topQuartile: 78, notes: ["Capital controls limit portability"] },

/* Israel */
il_israel_telaviv: { median: 69, topQuartile: 82, notes: ["Tax clearance and outbound limits"] },

/* Nordics */
se_sweden_stockholm: { median: 72, topQuartile: 84, notes: ["Stable MiFID framework, strong portability"] },
no_norway_oslo:     { median: 71, topQuartile: 83 },
dk_denmark_copenhagen: { median: 71, topQuartile: 83 },
fi_finland_helsinki:   { median: 70, topQuartile: 82 },

  /* US hubs */
  us_miami: { median: 71, topQuartile: 84 },
  us_ny:    { median: 72, topQuartile: 85 },
};