# From your repo root
pbpaste > lib/jobs-public.ts   # then paste the first block and save (or edit with your editor)
pbpaste > app/jobs/page.tsx    # paste second block
pbpaste > app/jobs/[slug]/page.tsx  # paste third block

# Or just edit the three files in your editor manually, then:
git add lib/jobs-public.ts app/jobs/page.tsx 'app/jobs/[slug]/page.tsx'
git commit -m "Jobs: robust public API client + resilient list & detail pages"
git push
vercel deploy --prod