# Releases and compatibility

NimJS UI has not completed a public npm release. This document describes the current manual path and its readiness checks; it does not authorize publication. [Governance](../GOVERNANCE.md) defines release authority.

## Current mechanics

The root uses Changesets. A user-facing package change gets a changeset in `.changeset/`; `pnpm version-packages` updates package versions and generated package changelogs. There is no competing root changelog. `pnpm release` runs a metadata and npm existence preflight, builds publishable packages, then invokes `changeset publish`. CI validates the workspace; no GitHub Action currently publishes packages or opens release PRs. Tags and GitHub Releases are not automated by these scripts.

The preflight checks publishable package repository metadata and queries npm. If an unpublished package has no configured `NPM_TOKEN`, it stops with first-publish guidance. `NPM_TOKEN` detection alone does not prove scope ownership or correct credentials. Trusted publishing is a future setup option after packages exist and publisher settings are configured. Do not infer provenance or signing from the current scripts.

## Versioning before 1.0

Use patch for compatible fixes, minor for additive features, and a clearly marked breaking changeset with migration guidance for removals or incompatible behavior. Changesets may express a major bump, but pre-1.0 version output must be reviewed before publishing because `0.x` consumers can see breaking behavior in a minor version. Do not bury a breaking change in an unmarked patch. Public CSS paths, token names, CLI output that consumers rely on, registry schema, and component props need the same review as JavaScript exports.

For deprecation, document the replacement and intended removal release in API docs and changeset before removing a public path. No fixed deprecation period is promised before 1.0.

## Compatibility currently documented

| Surface                    | Current evidence                                                        |
| -------------------------- | ----------------------------------------------------------------------- |
| Workspace Node             | `>=20.11.0` in root `engines`; CI selects Node 20 via `.nvmrc`          |
| pnpm                       | Root pins 9.15.4; root engine accepts 9+                                |
| React / React DOM          | `@nimjs/ui` peer range `^19.0.0`                                        |
| Tailwind                   | Consumer instructions and docs config target Tailwind CSS 3             |
| Browser / framework matrix | No formal browser or Next.js/Vite support matrix is tested              |
| Accessibility              | Component-level expectations and some tests; no library-wide WCAG claim |

## First public release checklist

- [ ] Confirm npm `@nimjs` scope ownership and publish permissions for every intended public package.
- [ ] Review package names, versions, `exports`, peer dependencies, license, repository links, and README content.
- [ ] Run lint, typecheck, tests, package and docs builds, and Pages static export.
- [ ] Pack every publishable package; inspect files, types, CSS, CLI executable, LICENSE, and dependency resolution.
- [ ] Run `pnpm verify:consumer` and extend the packed external checks to every component intended for release.
- [ ] Confirm the website URL and component links, private vulnerability reporting route, and support links.
- [ ] Review Changesets, version output, migration notes, and package changelogs.
- [ ] Verify release credentials or trusted publisher configuration outside git; restrict publishing to authorized maintainers.
- [ ] Decide explicitly whether to create git tags and GitHub Releases; they are not currently automated.

A canary channel is not configured. Changesets pre mode exists as a tool, but no canary publishing process has passed the release checks above.
