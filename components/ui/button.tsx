'use client';

import * as React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold rounded-lg transition focus:outline-none disabled:opacity-50';
    const variants = {
      default:   'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600',
      secondary: 'bg-white/10 hover:bg-white/15 text-white border border-white/15',
      outline:   'bg-transparent hover:bg-white/10 text-white border border-white/15',
      ghost:     'bg-transparent hover:bg-white/10 text-white',
      link:      'bg-transparent text-emerald-300 hover:underline border-0',
    } as const;
    const sizes = {
      sm: 'text-xs px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-sm px-5 py-2.5',
    } as const;

    return (
      <button
        ref={ref}
        className={[base, variants[variant], sizes[size], className].join(' ')}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';