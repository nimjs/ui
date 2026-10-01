# NimJS UI documentation app

Internal Next.js App Router site. Typed content and component examples live in `content/`; routes render them from `app/`. Registry metadata supplies component status, tokens, and dependencies. Repository architecture, contribution, and release policy live in the [docs index](../../docs/README.md).

From the repository root, `pnpm dev` runs the site and `pnpm build` builds all packages plus the site. The Pages workflow runs `pnpm turbo run build:pages --filter=@nimjs/docs` with a base path and static export; that workflow publishes to GitHub Pages when enabled by repository settings. A successful workflow file alone does not prove Pages settings are active.
