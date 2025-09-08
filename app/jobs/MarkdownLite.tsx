"use client";

type Props = { text: string };

export default function MarkdownLite({ text }: Props) {
  const lines = text.split(/\r?\n/);
  const out: string[] = [];
  let inList = false;

  const flushList = () => {
    if (inList) {
      out.push("</ul>");
      inList = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimRight();

    if (!line.trim()) { flushList(); out.push("<br/>"); continue; }

    if (/^###\s+/.test(line)) { flushList(); out.push(`<h4>${escapeHtml(line.replace(/^###\s+/, ""))}</h4>`); continue; }
    if (/^##\s+/.test(line))  { flushList(); out.push(`<h3>${escapeHtml(line.replace(/^##\s+/, ""))}</h3>`);  continue; }

    if (/^-\s+/.test(line)) {
      if (!inList) { inList = true; out.push("<ul>"); }
      out.push(`<li>${escapeHtml(line.replace(/^-\s+/, ""))}</li>`);
      continue;
    }

    flushList();
    out.push(`<p>${escapeHtml(line)}</p>`);
  }
  flushList();

  return (
    <div
      className="prose-invert prose-headings:mt-6 prose-headings:mb-3 prose-p:my-3 prose-ul:my-4 prose-li:my-1 max-w-none"
      dangerouslySetInnerHTML={{ __html: out.join("\n") }}
    />
  );
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
