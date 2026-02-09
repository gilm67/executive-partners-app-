type BreadcrumbItem = {
  name: string;
  item: string; // absolute URL preferred; relative allowed (we'll normalize)
};

function toAbsoluteUrl(url: string) {
  const SITE_URL = "https://www.execpartners.ch";

  const u = (url || "").trim();
  if (!u) return SITE_URL;

  // already absolute
  if (u.startsWith("http://") || u.startsWith("https://")) return u;

  // normalize relative
  if (u.startsWith("/")) return `${SITE_URL}${u}`;
  return `${SITE_URL}/${u}`;
}

export default function BreadcrumbJsonLd({
  items,
}: {
  items: readonly BreadcrumbItem[];
}) {
  const list = (items || [])
    .map((it) => ({
      name: (it?.name || "").trim(),
      item: toAbsoluteUrl(it?.item || ""),
    }))
    .filter((it) => it.name && it.item);

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}