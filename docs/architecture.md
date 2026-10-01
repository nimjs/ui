# Architecture

NimJS UI is a React design system foundation with two intended consumer paths. This document records the current implementation and rules for changing it. Planned work lives in the [roadmap](roadmap.md); setup commands live in [consumer setup](consumer-setup.md).

## Product boundary

Package mode imports versioned React components and token CSS from package exports. Copy mode runs the local CLI to place source in an application; the application owns that source after copying. A package upgrade does not update copied files. Both paths are meant to preserve observable component behavior and semantics. Neither path is publicly released yet. NimJS UI is not an application framework, a backend framework, or a remote code execution registry.

## Repository and dependency direction

| Location                                      | Responsibility                                    | Direct workspace consumers            |
| --------------------------------------------- | ------------------------------------------------- | ------------------------------------- |
| `packages/tokens`                             | Token scales, light theme mapping, CSS variables  | UI, docs                              |
| `packages/utils`                              | Small class and DOM helpers                       | UI, docs                              |
| `packages/ui`                                 | Canonical React source and explicit exports       | docs; CLI copies source at build time |
| `packages/registry`                           | Versioned local manifests and typed loader        | CLI, docs                             |
| `packages/cli`                                | Config, local install plan, bundled source assets | external consumer                     |
| `apps/docs`                                   | Next.js website, demos, typed content             | users                                 |
| `packages/eslint-config`, `packages/tsconfig` | Internal workspace tooling                        | workspace packages                    |

```text
tokens ─┐
utils ──┴──> ui ───────────────> docs
registry ───> cli
         └────────────────────> docs
ui source ──(CLI build copy)──> cli assets ──> consumer files
```

`@nimjs/ui` declares tokens and utils as dependencies. Its component source directly imports `@nimjs/utils`; semantic CSS classes rely on the consumer's Tailwind mapping and token stylesheet. The CLI depends on registry at runtime, and its build script reads UI source, `cn.ts`, and token CSS. That build-time relation does not make UI a runtime CLI dependency. The docs app uses workspace packages and typed content.

## Sources of truth

| Contract                        | Edit here                                                      | Derived or parallel surface to check          |
| ------------------------------- | -------------------------------------------------------------- | --------------------------------------------- |
| Component behavior              | `packages/ui/src/components/`                                  | CLI bundled assets, tests, docs examples      |
| Component metadata and maturity | `packages/registry/components/*.json`                          | CLI listings, docs pages                      |
| Token values and theme CSS      | `packages/tokens/src/`                                         | docs Tailwind mapping, copied CSS             |
| Public JavaScript and CSS paths | each package's `package.json` `exports` plus source index      | package READMEs, consumer fixture             |
| CLI commands and templates      | `packages/cli/src/` and `packages/cli/scripts/copy-assets.mjs` | CLI README, consumer setup                    |
| Website component content       | `apps/docs/content/`                                           | rendered routes                               |
| Architecture and future work    | this file; `roadmap.md`                                        | README summary                                |
| Release intent                  | `.changeset/`                                                  | generated package changelogs after versioning |

Registry JSON does not contain component implementation. Website pages are authored in TypeScript and reference registry entries; metadata is not generated from source. These surfaces need coordinated review when behavior changes.

## Package mode

`@nimjs/ui` exports its root, `button`, `input`, `card`, `badge`, and `styles.css`. Root exports are explicit. `@nimjs/tokens` exports its root and `styles.css`; registry and utils export their roots. `@nimjs/cli` supplies the `ui` executable. ESLint config, TS config, and docs are private workspace packages. React and React DOM `^19.0.0` are UI peers; the documented styling path uses Tailwind CSS 3. No npm publication has been verified. Consumers currently need packed artifacts and the setup in [consumer setup](consumer-setup.md).

`@nimjs/ui/styles.css` imports the token stylesheet; consumers may import `@nimjs/tokens/styles.css` directly. Import one token stylesheet once, and configure Tailwind to scan the distributed UI JavaScript and map semantic class names to CSS variables. No compiled component CSS is shipped.

## Copy mode and CLI safety

The CLI has `ui init` and `ui add <component> [--dry-run]`. `init` creates `ui.config.ts` if absent. `add` loads local registry metadata, reads its bundled canonical assets, and plans component files plus `_lib/cn.ts` and `_lib/tokens.css` when required. It adjusts the `@nimjs/utils` import to the copied helper. The manifest's `npmDependencies` are reported, not installed. The CLI does not configure Tailwind or import CSS into the application.

`add` rejects unknown names, absolute or escaping `componentsDir`, symbolic links along output paths, and existing files with different content. It skips identical files. `--dry-run` prints a plan without writing. The CLI rejects a manifest with component-to-component dependencies because it cannot copy them yet; the registry gate rejects such manifests before release. A future dependency graph installer needs its own design and tests. Config files are loaded with `jiti`, so a consumer config is executable local code; do not treat it as untrusted data.

There is no remote registry fetch or remote script execution. The CLI build snapshots source into its package artifact; rebuilding the CLI is required after canonical source changes.

## Registry contract

Manifests live in `packages/registry/components/*.json`, use `schemaVersion: 1`, and are exposed through the registry root loader. Current fields: `name`, `files`, `dependencies`, `npmDependencies`, `tokens`, `category`, `status`, `since`, `description`, `anatomy`, `accessibility`, and `usage`. The runtime loader checks names, enums, field shapes, safe filenames, and npm dependency names. `pnpm verify:registry` builds the registry and additionally checks manifest coverage, canonical files and paths, public exports, token variables, npm dependency imports, and unsupported component dependencies. The registry is local metadata, not a remote distribution protocol. Destination directories are determined by CLI config plus manifest name. Schema additions that affect output require registry, CLI, docs, tests, and migration review.

The status vocabulary in code is `experimental`, `preview`, and `stable`. Current components are `preview`; this reflects incomplete external validation, not a claim that they have no usable behavior. Promotion to `stable` requires the acceptance gate below. There is no `deprecated` registry status today; deprecation must be documented in API docs and release notes until a schema decision adds one.

## Tokens and themes

TypeScript primitives and light theme mappings live in `packages/tokens/src/`; `src/css/variables.css` is the stylesheet used by apps and copied installations. Primitive colors feed semantic variables such as `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--border`, and `--ring`. Components use semantic Tailwind keys and radius variables. A missing stylesheet or missing Tailwind mapping leaves component styling incomplete. The CSS includes a `[data-theme='dark']` selector, but dark behavior is not yet a validated consumer contract. A new token should have a clear role, be mapped in CSS and Tailwind examples where needed, and be reflected in registry metadata and docs. Existing primitive names remain exported; removal is an API decision.

## Public API and compatibility

The public contract is the explicit `exports` map, documented CSS paths, component props, token names used by consumers, CLI commands and flags, and the registry root API/schema. Internal `src/` and `dist/` paths, workspace aliases, tests, and generated assets are implementation details. Do not add wildcard exports or promise deep imports. Changes to public paths need consumer validation, documentation, and a changeset. Breaking changes follow [governance](../GOVERNANCE.md) and [release policy](releases.md), including migration guidance, even before 1.0.

The root requires Node 20.11+ and pins pnpm 9.15.4; only the Node 20 major is selected in CI. UI declares React/React DOM 19 peers. The documented stylesheet integration targets Tailwind 3. No browser matrix, Next.js compatibility matrix, or general WCAG conformance claim has been established.

## Component acceptance

For an interactive component, review native semantics, keyboard use, focus visibility, disabled behavior, and accessible naming. Use native props and refs where appropriate, SSR-safe rendering, semantic tokens, typed exports, behavior tests, registry metadata, website examples, package and copy consumer checks, and a changeset for a user-facing package change. A presentational component needs an appropriate subset. Existing tests cover Button and Input behavior and registry/CLI helpers; they are not a full accessibility audit.

## Validation and maintenance

`pnpm verify` runs workspace gates, registry validation, packed consumer checks, and a `/ui/` Pages export; CI calls the same command. `pnpm verify:consumer` packs all five public artifacts, checks their declared export and bin files, then installs into two temporary projects outside the workspace. Package and copy mode typecheck, render on the server, and build with Vite for all four current components; rendered markup is compared. It does not validate browser interaction or other frameworks. The Pages workflow deploys a static export. The release script has a preflight and Changesets publish step, but automated publication is disabled. Details and first release checks are in [releases](releases.md).

Security boundaries are CLI filesystem writes, executable local config, generated source that consumers own, npm dependencies selected by consumers, GitHub Actions permissions, and release credentials. The current CLI neither downloads nor executes registry code. Vulnerabilities use the private route in [Security](../SECURITY.md).

## Invariants for changes

1. Edit canonical components in `packages/ui/src/components`; rebuild CLI assets instead of hand-editing `dist`.
2. Keep registry metadata and website examples aligned with canonical behavior.
3. Keep package exports explicit and component rendering SSR-safe.
4. Use semantic tokens in components; maintain CSS and Tailwind mappings for consumer examples.
5. Preserve the CLI's project-root, symlink, collision, and dry-run safeguards.
6. Keep package and copied component behavior equivalent, allowing only import-path adaptation.
7. Do not rely on repository-only aliases in consumer files.
8. Update docs, tests, and changesets with public changes; do not call future capability implemented.

A cross-package decision should include a short rationale in the PR or issue under [governance](../GOVERNANCE.md). This repository does not require an ADR for routine changes. Record a durable decision in `docs/adr/` only when the rationale would otherwise be lost.
