'use client';

import * as React from 'react';

export function Card({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`px-4 py-3 border-b border-white/10 ${className}`}>{children}</div>
  );
}

export function CardTitle({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`text-sm font-semibold ${className}`}>{children}</div>;
}

export function CardContent({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardFooter({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`px-4 py-3 border-t border-white/10 ${className}`}>{children}</div>
  );
}