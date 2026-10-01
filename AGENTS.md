# Instructions for coding agents

Read `README.md`, `docs/architecture.md`, `docs/roadmap.md`, and
`CONTRIBUTING.md` before changing product code. Follow `GOVERNANCE.md` for
public API and release decisions.

- Treat `packages/ui/src/components` as canonical component behavior. Keep
  registry metadata, CLI templates, and docs aligned with it.
- Distinguish package-mode behavior from copy-mode behavior in every user-facing
  claim. Copy mode currently requires manual external-project setup.
- Use semantic tokens from `packages/tokens`; avoid raw colors in components.
- Preserve explicit package exports and SSR-safe React behavior.
- For interactive components, verify native semantics, keyboard access, focus,
  disabled state, and accessible naming where applicable.
- Add a changeset for user-facing package changes. Docs-only edits normally do
  not need one.
- Test a real external consumer when changing exports, CSS paths, registry
  resolution, CLI output, or install instructions.
- Report exact validation commands and any unverified path at the end of work.
