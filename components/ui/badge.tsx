'use client';

import * as React from 'react';

export function Badge({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border border-white/10',
        'bg-white/5 px-2 py-1 text-xs text-white',
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}