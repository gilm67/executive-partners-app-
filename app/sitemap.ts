applypatch <<'PATCH'
*** Begin Patch
*** Update File: app/sitemap.ts
@@
-      .map(j => ({
-        url: `${base}/jobs/${j.slug}`,
-        lastModified: now,
-        changeFrequency: "daily" as const,
-        priority: 0.8,
-      }));
+      .map(j => ({
+        url: `${base}/jobs/${j.slug}`,
+        // Keep it simple: we don’t rely on an optional field the type doesn’t guarantee
+        lastModified: now,
+        changeFrequency: "daily" as const,
+        priority: 0.8,
+      }));
*** End Patch
PATCH