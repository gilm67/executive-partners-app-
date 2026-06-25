path = "app/en/insights/articles.ts"
with open(path, "r", encoding="utf-8") as f:
    s = f.read()

anchor = "export const articles: InsightArticle[] = ["
assert s.count(anchor) == 1, "anchor not found or not unique"

new_entry = open("/tmp/ep_article_body.py").read()
s = s.replace(anchor, anchor + "\n" + new_entry, 1)

with open(path, "w", encoding="utf-8") as f:
    f.write(s)

print("Done. Article inserted.")
