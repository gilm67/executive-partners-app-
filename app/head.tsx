// app/head.tsx
export default function Head() {
  return (
    <>
      {/* Prevent Grammarly from injecting attributes that cause hydration mismatches */}
      <meta name="grammarly:disabled" content="true" />
    </>
  );
}
