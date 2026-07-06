# Contributing To UI

Thanks for contributing. This repository is structured to be welcoming to
external contributors while keeping maintainers confident about API stability and
release quality.

## Local Setup

Requirements:

- Node.js 20+
- pnpm 9+

Bootstrap the workspace:

```bash
pnpm install
pnpm dev
```

Common commands:

```bash
pnpm lint
pnpm test
pnpm typecheck
pnpm build
pnpm changeset
```

## Working In The Monorepo

- `apps/docs` contains the docs and demo application.
- `packages/tokens` contains token primitives, semantic themes, and CSS vars.
- `packages/ui` contains public React components.
- `packages/utils` contains shared helpers.
- `packages/cli` contains scaffolding foundations.

Before opening a pull request, make sure relevant packages pass lint, tests,
typecheck, and build.

## Adding A Component

1. Create a new directory under `packages/ui/src/components/<component>/`.
2. Keep the component SSR-safe and accessibility-aware by default.
3. Export it through `packages/ui/src/index.ts` and a dedicated subpath export in
   `packages/ui/package.json`.
4. Add or update docs content in `apps/docs/content/` and route coverage in the
   docs app.
5. Add tests when behavior, variants, or accessibility rules are non-trivial.
6. Add a changeset if the new component changes a published package.

## Naming Conventions

- Package names use the `@nimjs/*` scope.
- Component directories and route slugs use lowercase kebab-case.
- React component names use PascalCase.
- Public exports should stay explicit and intentionally curated.

## Branch And PR Expectations

- Branch from `main`.
- Keep pull requests focused on one concern when practical.
- Link an issue or explain the motivation clearly in the PR body.
- Update docs when public behavior changes.
- Add a changeset for any user-facing package change.

## Commit Expectations

We do not require a strict commit convention for every contributor, but commits
should still be:

- reviewable
- scoped
- descriptive

Squash merges are acceptable when they produce a clean history.

## Review Expectations

- Maintainers review for correctness, API design, docs impact, and release
  implications.
- Large architectural changes may be redirected into an RFC-like discussion
  before merge.
- Review SLA is best effort and depends on maintainer availability.

## Public API And Compatibility Policy

- Do not break public API without explicit maintainer approval.
- Do not remove or rename exports in published packages casually.
- Prefer additive evolution over implicit behavior changes.
- Breaking changes require documentation updates and a clearly marked changeset.

Backwards compatibility matters even during `0.x` development. If a change would
surprise downstream users, surface it early and treat it as a deliberate design
decision rather than a refactor detail.

## Changesets

Run:

```bash
pnpm changeset
```

Add a changeset when a change affects consumers of a published package. Docs-only
changes usually do not need one unless they reflect a shipped package change that
also needs release notes.

## Security And Secrets

- Do not commit secrets, tokens, or private credentials.
- Do not open public issues for suspected vulnerabilities.
- Follow [SECURITY.md](./SECURITY.md) for vulnerability reporting.
