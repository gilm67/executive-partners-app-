/**
 * Compatibility shim so older imports `@/data/markets`
 * keep working after we moved data to `lib/markets.ts`.
 */
export type { Market as MarketData } from '../../lib/markets';
export { markets } from '../../lib/markets';
export { markets as default } from '../../lib/markets'; // in case a default export is expected
