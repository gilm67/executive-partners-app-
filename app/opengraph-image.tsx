// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0B0E13",
          color: "white",
          fontSize: 56,
          fontWeight: 800,
        }}
      >
        <div style={{ opacity: 0.7, fontSize: 28, marginBottom: 16 }}>
          Executive Partners
        </div>
        <div>Private Banking Recruitment</div>
      </div>
    ),
    { ...size }
  );
}