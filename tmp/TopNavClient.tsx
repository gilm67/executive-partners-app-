'use client';

import dynamic from 'next/dynamic';

// Load the existing TopNav on the client only
const TopNav = dynamic(() => import('@/components/TopNav'), {
  ssr: false,
  loading: () => null,
});

export default function TopNavClient() {
  return <TopNav />;
}
