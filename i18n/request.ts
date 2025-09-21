import {getRequestConfig} from 'next-intl/server';

// Minimal config to satisfy next-intl during dev/build.
// Add real message loading later if needed.
export default getRequestConfig(async ({locale}) => ({
  locale,
  messages: {}
}));
