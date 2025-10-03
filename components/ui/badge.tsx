'use client';

import * as React from 'react';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning';
};

export function Badge({ variant = 'default', className = '', ...props }: BadgeProps) {
  const base =
    'inline-flex items-center rounded-full border text-xs px-2 py-1';
  const variants = {
    default:     'border-white/10 bg-white/5 text-white',
    secondary:   'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
    outline:     'border-white/25 bg-transparent text-white',
    destructive: 'border-red-500/40 bg-red-500/10 text-red-200',
    success:     'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
    warning:     'border-amber-400/40 bg-amber-500/10 text-amber-200',
  } as const;

  return (
    <span className={[base, variants[variant], className].join(' ')} {...props} />
  );
}