'use client';
import { useEffect } from 'react';
import React from 'react';
import PortabilityForm from '@/components/portability/PortabilityForm';

class Boundary extends React.Component<{children: React.ReactNode}, {err?: Error}> {
  state = { err: undefined as Error | undefined };
  static getDerivedStateFromError(err: Error) { return { err }; }
  componentDidCatch(err: Error) { console.error('[Portability] render error:', err); }
  render() {
    if (this.state.err) {
      return (
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm">
          <div className="font-semibold">Portability UI failed to render</div>
          <pre className="mt-2 whitespace-pre-wrap text-xs opacity-80">
            {String(this.state.err.stack || this.state.err.message)}
          </pre>
        </div>
      );
    }
    return this.props.children as any;
  }
}

export default function ClientMount() {
  useEffect(() => { console.log('[Portability] ClientMount hydrated'); }, []);
  return (
    <Boundary>
      <PortabilityForm />
    </Boundary>
  );
}
