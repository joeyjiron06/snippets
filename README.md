# Snippets

Static docs site built with Next.js and Fumadocs.

## Requirements

- Node 22+
- pnpm 10+

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm typecheck
```

## Paths

- Docs content: `content/docs/**`
- Archived Astro site: `archive/astro`
- GitHub Pages base path: `/snippets`

## Deployment

The site is exported statically and deployed to GitHub Pages via `.github/workflows/astro.yml`.
