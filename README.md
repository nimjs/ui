# UI

[![CI](https://img.shields.io/github/actions/workflow/status/nimjs/ui/ci.yml?branch=main&label=ci)](https://github.com/nimjs/ui/actions/workflows/ci.yml)
[![Docs](https://img.shields.io/github/actions/workflow/status/nimjs/ui/docs.yml?branch=main&label=docs)](https://github.com/nimjs/ui/actions/workflows/docs.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-white.svg)](./LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-9.15.4-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/turbo-monorepo-EF4444?logo=turborepo&logoColor=white)](https://turbo.build/repo)
[![TypeScript](https://img.shields.io/badge/typescript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Open-source component ecosystem by `nimjs`: design tokens, a typed component
registry, React components, CLI scaffolding, and documentation in one monorepo.

**Status:** early-stage foundation. Four components and local CLI scaffolding
exist today. There is no public release yet. Installing copied components into
a fresh external project still requires manual setup of imports, utilities,
styles, and dependencies.

The product direction is a two-path experience: use the published React package
when centralized updates matter, or copy component source into an application
when local ownership matters. Both paths should share component behavior and
documentation.

For concrete boundaries and next steps, read the [architecture](docs/architecture.md),
[roadmap](docs/roadmap.md), and [AI task briefs](docs/ai-tasks.md).

UI is inspired by the developer experience of code registries such as shadcn/ui,
while maintaining its own component source, design tokens, and public package
API. The repository already has package boundaries and release tooling; the
roadmap defines the consumer checks needed before the first release.

## Why UI

- Build and document UI primitives from the same system source of truth.
- Keep tokens, docs, CLI, and components aligned through typed metadata.
- Scale from a starter kit to an organization-owned design system foundation.
- Give contributors clear package boundaries and maintainers clear release rules.
- Stay portable: no private infrastructure assumptions, no vendor-locked repo architecture.

## What You Get

- `@nimjs/tokens`
  Design tokens, semantic themes, and CSS variables.
- `@nimjs/registry`
  Typed component manifests shared by CLI and docs.
- `@nimjs/ui`
  React component package with explicit public exports.
- `@nimjs/utils`
  Shared helpers such as `cn()` and small DOM-safe utilities.
- `@nimjs/cli`
  Registry-driven scaffolding foundation for `init` and `add`.
- `@nimjs/docs`
  Next.js App Router docs and demo app.
- OSS baseline
  Changesets, CI/CD, governance, security policy, CODEOWNERS, templates, and Dependabot.

## Architecture

```text
apps/
  docs/                  Next.js docs and demo application
packages/
  cli/                   Registry-aware CLI foundation
  eslint-config/         Shared ESLint flat configs
  registry/              Typed component manifests
  tokens/                Design tokens and semantic theme mappings
  tsconfig/              Shared strict TypeScript presets
  ui/                    React component package
  utils/                 Shared utility helpers
tooling/                 Repo-level setup and support files
.changeset/              Versioning and release notes
.github/                 CI/CD workflows and contribution automation
```

## System Flow

UI is structured as a system, not a gallery of unrelated packages.

1. Tokens are defined in `@nimjs/tokens`.
2. Tokens map to semantic CSS variables consumed by UI components.
3. Components are described in `@nimjs/registry`.
4. The CLI reads the registry to scaffold component files.
5. Docs read the same registry metadata to explain tokens, dependencies, and usage.

That pipeline keeps implementation, documentation, and scaffolding aligned as
the ecosystem grows.

## Design Tokens And Theming

The theme layer is built around semantic CSS variables such as:

- `--background`
- `--foreground`
- `--card`
- `--border`
- `--primary`
- `--primary-foreground`
- `--accent`
- `--ring`
- `--destructive`

The current baseline ships with a light theme and a CSS variable architecture
ready for dark-theme expansion. UI code should consume semantic variables, not
raw color literals.

Relevant sources:

- [packages/tokens/src/colors.ts](./packages/tokens/src/colors.ts)
- [packages/tokens/src/themes/light.ts](./packages/tokens/src/themes/light.ts)
- [packages/tokens/src/css/variables.css](./packages/tokens/src/css/variables.css)

## Component Registry

The registry package is the ecosystem contract between implementation, docs, and
CLI.

Each component manifest declares:

- component name
- source files
- system dependencies
- semantic tokens
- category
- description

Example:

```json
{
  "name": "button",
  "files": ["button.tsx"],
  "dependencies": ["utils", "tokens"],
  "tokens": ["primary", "primary-foreground", "ring", "radius"],
  "category": "ui",
  "description": "Primary action trigger"
}
```

This gives maintainers one place to evolve component metadata without teaching
docs and CLI different models.

## CLI Foundation

The CLI is intentionally small but production-oriented.

Current capabilities:

- `init`
- `add <component>`
- `ui.config.ts` resolution with sensible defaults
- registry-driven canonical source lookup
- basic dependency reporting
- friendly validation and error messages

Default config:

```ts
export default {
  componentsDir: 'src/components/ui',
  tokens: true,
};
```

The current design is ready for future registry fetches, adapters, and canary
channels without rewriting package boundaries.

`ui add <component> --dry-run` shows the file plan. The CLI copies the same
component source used by `@nimjs/ui`, with only the utility import adjusted for
local files. Copy mode still requires manual npm dependency installation and
Tailwind setup; see the [consumer setup guide](docs/consumer-setup.md).

## Docs Experience

The docs app is a product surface, not a sidecar demo.

It includes:

- landing page
- getting started docs
- installation guide
- theming guide
- components index
- dedicated component pages
- demo/code blocks
- registry-backed metadata for tokens and dependencies

Each component page exports typed metadata so the docs system can grow toward
auto-generated sections without losing author control.

## Public API Discipline

UI follows explicit exports by default.

- No `export *` from package roots.
- No accidental deep internal exports.
- Subpath exports are intentional and tree-shaking friendly.
- Public API changes should be additive unless explicitly approved otherwise.

This helps maintainers keep package contracts stable as the ecosystem grows.

## Getting Started

Requirements:

- Node.js 20.11+
- pnpm 9.15.4

Install dependencies:

```bash
pnpm install
```

Start the docs app in development:

```bash
pnpm dev
```

Useful workspace commands:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm changeset
```

## Development Workflows

### Add A New Component

1. Create `packages/ui/src/components/<component>/`.
2. Export the component explicitly from `packages/ui/src/index.ts`.
3. Add a subpath export in `packages/ui/package.json` if needed.
4. Add a registry manifest in `packages/registry/components/`.
5. Add or update docs content in `apps/docs/content/components/`.
6. Add tests when behavior or accessibility are non-trivial.
7. Add a changeset for user-facing package changes.

### Validate The Repo

```bash
pnpm turbo run lint typecheck test build
```

This is the same baseline validated by the main CI workflow.

## Release Flow

Releases are managed with Changesets.

1. Contributors add a changeset for user-facing package changes.
2. Changes land on `main`.
3. The release workflow creates or updates a release PR.
4. Merging the release PR versions packages and publishes to npm.

Before the very first publish, make sure the npm scope exists and provide an
automation token as `NPM_TOKEN`. npm trusted publishing can take over after the
packages already exist on npm and each package has a trusted publisher
configured.

Why this model works well for OSS:

- release intent is reviewed in git
- breaking changes stay explicit
- maintainers avoid ad hoc local publishing
- multi-package versioning stays understandable to contributors

### Canary Releases

Canary publishing is not enabled by default, but the repository is ready for it
through Changesets pre mode.

Recommended canary flow:

```bash
pnpm changeset pre enter canary
pnpm version-packages
pnpm release --tag canary
pnpm changeset pre exit
```

## CI And Deployment

GitHub Actions cover:

- repository validation
- docs build validation
- release automation
- dependency review
- CodeQL analysis

The docs app is Vercel-friendly by default. The repository validates docs builds
in CI without hard-coupling deployment to a provider-specific preview setup.

## Open-Source Governance

UI is structured for public maintenance from the start.

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [SECURITY.md](./SECURITY.md)
- [SUPPORT.md](./SUPPORT.md)
- [GOVERNANCE.md](./GOVERNANCE.md)

These files are part of the product surface. They define how contributors work
in the repo, how maintainers make decisions, and how releases stay safe.

## Who This Repo Is For

- teams building an OSS or internal design system foundation
- maintainers who want docs, tokens, and release flow designed up front
- contributors who prefer explicit architecture over hidden repo conventions
- product organizations that need a scalable component ecosystem, not just components

## Roadmap Direction

Near-term evolution paths that fit the current architecture:

- richer registry metadata for layouts, forms, and patterns
- remote registry distribution for CLI consumers
- more generated docs sections from typed component metadata
- canary release automation
- broader component coverage with stable public export discipline

## Contributing

Start with [CONTRIBUTING.md](./CONTRIBUTING.md). For architectural or
cross-package changes, also read [GOVERNANCE.md](./GOVERNANCE.md) before opening
large pull requests.

## License

[MIT](./LICENSE)
