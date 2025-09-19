'use client';

export default function LocaleError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>We’re reloading your page…</h1>
      <p style={{ opacity: .8, marginBottom: 16 }}>
        Something went wrong in the browser. Click the button to try again.
      </p>
      <button onClick={reset} style={{
        padding: '10px 14px',
        borderRadius: 10,
        border: '1px solid #ddd',
        cursor: 'pointer'
      }}>
        Try again
      </button>
      {error?.digest ? (
        <p style={{ marginTop: 12, fontSize: 12, opacity: .6 }}>Digest: {error.digest}</p>
      ) : null}
    </main>
  );
}
