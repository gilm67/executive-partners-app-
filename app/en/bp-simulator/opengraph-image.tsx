// app/en/bp-simulator/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BP Simulator | Executive Partners";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0B0E13",
          color: "white",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ fontSize: 28, opacity: 0.7 }}>Executive Partners</div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ fontSize: 72, lineHeight: 1.1, fontWeight: 700 }}>
            BP Simulator
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          {/* IMPORTANT: no <br/>; make it two lines via flex column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 28,
              opacity: 0.9,
              maxWidth: 720,
            }}
          >
            <div>Estimate NNM, revenue & net margin.</div>
            <div>Get instant AI-driven analysis.</div>
          </div>

          <div
            style={{
              display: "flex",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "10px 14px",
              borderRadius: 12,
              fontSize: 24,
              opacity: 0.8,
            }}
          >
            executive-partners.ch
          </div>
        </div>
      </div>
    ),
    size
  );
}