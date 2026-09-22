# AGENTS.md

## Project content notes
- Blog posts live in `src/content/blog/YYYY/` and use `.mdoc` with frontmatter (`title`, `description`, `date`, optional `cover`).
- Covers are optional; this project can publish posts without a `cover` field.
- Links should be proper markdown links (no raw URLs in body text).
- Tone preference: first-person plural POV for ODIA posts (e.g., “ganamos…”, “constatamos…”).

## Relevant assets
- Public PDFs are served from `public/static/documents/`.
- Example legal PDF in repo: `public/static/documents/2025/yenRuJp7Fngr4qIX1f5Z.pdf`.

## Source context
- For X/Twitter threads, use the FixTweet API when fetching content or ask the user to provide the thread text/JSON.
- For social threads, prefer referencing official ODIA posts and embed as markdown links.

## Orb previews
- Run `amp orb services ensure`; `.amp/services.yaml` declares the Astro preview service.
- Keep Astro's top-level `server.allowedHosts` enabled only when `AMP_ORB` is set, so generated portal hosts work without disabling host validation outside orbs. Setting only `vite.server.allowedHosts` does not work: Astro overrides it.
- Before sharing a preview, verify the actual portal URL, not just localhost. A local HTTP 200 does not catch Vite's blocked-host errors.
- Do not hardcode a thread's portal hostname in app configuration; it changes between orbs.
