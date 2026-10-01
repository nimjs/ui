# NimJS UI [![CI](https://img.shields.io/github/actions/workflow/status/nimjs/ui/ci.yml?branch=main&label=CI)](https://github.com/nimjs/ui/actions/workflows/ci.yml) [![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

NimJS UI is an early-stage React component library with design tokens, a local component registry, a source-copying CLI, and a documentation app. It supports two intended ways to use a component: import a package, or copy its source into an application. The same files in `packages/ui/src/components` define component behavior for both paths.

**Current status:** The repository has Button, Input, Card, and Badge, a light theme, package builds, and a local CLI. The registry marks these components **preview**. The `@nimjs/*` packages are not publicly released; external use currently requires packed artifacts. Copy mode still needs manual npm dependency installation, stylesheet import, and Tailwind configuration. A dark selector exists in CSS, but dark theme behavior has not passed a consumer validation gate.

[Documentation map](docs/README.md) · [Component pages](https://nimjs.github.io/ui/components/) · [Consumer setup](docs/consumer-setup.md) · [Roadmap](docs/roadmap.md) · [Contributing](CONTRIBUTING.md)

## Choose a usage path

| Path         | What it does now                                                                                       | Ownership                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Package mode | Imports explicit `@nimjs/ui` exports and token CSS; requires Tailwind 3 theme/content setup            | The package supplies component updates when upgraded          |
| Copy mode    | `ui add` copies bundled canonical source, a local `cn` helper, and token CSS; reports npm dependencies | The application owns copied files and must update them itself |

See the [consumer cookbook](docs/consumer-setup.md) for prerequisites, pack/install commands, CSS, imports, and limitations. The packages are not on npm yet, so `pnpm add @nimjs/ui` is **not** a working public installation command today.

## Develop this repository

Use Node.js **20.11+** and pnpm **9.15.4** (the root package accepts pnpm 9+; 9.15.4 is the pinned tool version).

```sh
pnpm install
pnpm dev
```

`pnpm dev` starts the Next.js docs app. Run `pnpm verify` before a PR. It runs lint, typecheck, tests, package and docs builds, registry validation, packed external consumer checks for all four components, and the `/ui/` Pages export. The consumer check installs tarballs into temporary projects outside this workspace.

## Packages and architecture

| Package                                   | Role                                                                 | Availability                        |
| ----------------------------------------- | -------------------------------------------------------------------- | ----------------------------------- |
| `@nimjs/ui`                               | React components; root, component subpaths, and `styles.css` exports | Intended public package; unreleased |
| `@nimjs/tokens`                           | TypeScript tokens and `styles.css`                                   | Intended public package; unreleased |
| `@nimjs/utils`                            | `cn`, `canUseDOM`, and `dataState` helpers                           | Intended public package; unreleased |
| `@nimjs/registry`                         | Typed local component metadata                                       | Intended public package; unreleased |
| `@nimjs/cli`                              | Local `ui init` and `ui add` commands                                | Intended public package; unreleased |
| `@nimjs/eslint-config`, `@nimjs/tsconfig` | Workspace build tooling                                              | Internal                            |
| `@nimjs/docs`                             | Next.js site and examples                                            | Internal application                |

```text
@nimjs/tokens ─┐
@nimjs/utils ──┴──> @nimjs/ui ──> docs app
@nimjs/registry ───> @nimjs/cli
               └──> docs app
canonical UI source ──> CLI build assets ──> consumer copy
```

The registry describes components; it does not contain a second implementation. The CLI bundles source at build time. For dependency direction, public API, token and registry contracts, see [architecture](docs/architecture.md).

## Project and community

The [roadmap](docs/roadmap.md) tracks consumer validation, theme work, and first release readiness. [Contributing](CONTRIBUTING.md) explains changesets and review. Report vulnerabilities privately through [Security](SECURITY.md); use [Support](SUPPORT.md) for other questions. Decisions about breaking changes and releases follow [Governance](GOVERNANCE.md).

Licensed under [MIT](LICENSE).
