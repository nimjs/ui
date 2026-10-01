# Instructions for coding agents

NimJS UI is an early-stage React component and token workspace. Start with `README.md`, `docs/architecture.md`, `docs/roadmap.md`, and `CONTRIBUTING.md`; read the relevant package README before editing. Follow `GOVERNANCE.md` for public API and release decisions. The [docs index](docs/README.md) identifies each document's owner.

## Commands

Use Node 20.11+ and pnpm 9.15.4. Run `pnpm install`, then `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` for relevant changes; `pnpm verify:consumer` tests packed Button in external fixtures. `pnpm dev` starts the docs app. Run `pnpm turbo run build:pages --filter=@nimjs/docs` for Pages changes. Report exact commands and unverified paths.

## Change rules

- `packages/ui/src/components` is canonical behavior. Do not create a second implementation in registry, CLI, or docs. The CLI snapshots canonical source at build time; do not edit `dist` as source.
- Keep package and copied behavior equivalent. Copy mode currently needs manual npm dependencies, token CSS import, and Tailwind 3 setup. Never call planned installation automation implemented.
- Use semantic tokens from `packages/tokens`; avoid raw brand colors in components. Keep theme CSS, registry references, and Tailwind examples aligned.
- Preserve explicit package exports and SSR-safe React behavior. No wildcard export or undocumented deep import. Public changes need docs, meaningful tests, and a changeset.
- For interactive components, verify native semantics, keyboard use, focus, disabled state, and accessible naming. Do not claim library-wide accessibility compliance.
- Update registry manifest, docs content, and CLI asset behavior when changing a component. Do not bypass registry lookup or hand-edit generated assets.
- Review a new dependency's purpose, maintenance, license, bundle, and security/accessibility effect. Declare copy-mode npm dependencies in the manifest.
- Test a real external consumer when changing exports, CSS paths, registry resolution, CLI output, or installation instructions. Workspace imports alone are insufficient.
- Keep edits scoped. Do not publish packages, change release authority, or represent unreleased capabilities as shipped.
