export default function Home() {
  return (
    <main>
      <h1 style={{ fontSize: 28, margin: "16px 0" }}>
        👋 Hello from /[locale]/page.tsx
      </h1>
      <p style={{ fontSize: 16 }}>
        If you see this along with the yellow banner above, routing & rendering work.
      </p>
      <p style={{ marginTop: 12 }}>
        Links:{" "}
        <a href="/jobs">/jobs</a> · <a href="/candidates">/candidates</a> ·{" "}
        <a href="/hiring-managers">/hiring-managers</a> ·{" "}
        <a href="/contact">/contact</a>
      </p>
    </main>
  );
}
