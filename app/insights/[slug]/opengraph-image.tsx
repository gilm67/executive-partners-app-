/* app/insights/[slug]/opengraph-image.tsx */
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Minimal source (reuse same POSTS here or fetch your CMS)
const POSTS: Record<string, { title: string; dateISO: string }> = {
  "swiss-private-banking-weekly-update-sep-2025": {
    title: "Swiss Private Banking Weekly Update – Sep 2025",
    dateISO: "2025-09-08",
  },
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ Next 15: params is a Promise
  const post = POSTS[slug];

  const title = post?.title ?? "Private Wealth Pulse";
  const dateStr = post?.dateISO
    ? new Date(post.dateISO).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

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
          background:
            "linear-gradient(180deg, rgba(9,12,18,1) 0%, rgba(11,14,19,1) 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 28, opacity: 0.9 }}>{dateStr}</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>Executive Partners</div>
        </div>
      </div>
    ),
    { ...size }
  );
}