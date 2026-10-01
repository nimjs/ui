# Contributing to NimJS UI

Thanks for contributing. Read the [Code of Conduct](CODE_OF_CONDUCT.md) before participating. NimJS UI is pre-release; the [architecture](docs/architecture.md) and [roadmap](docs/roadmap.md) distinguish current behavior from planned work.

## Find a task

Use an issue for a reproducible bug, docs correction, or scoped feature proposal. Include the affected package, reproduction, and expected behavior. Use [Support](SUPPORT.md) for usage questions; report suspected vulnerabilities privately through [Security](SECURITY.md). For a breaking API or cross-package design, explain the use case and proposed contract in an issue or PR before substantial implementation. [Governance](GOVERNANCE.md) describes who decides.

## Work locally

Fork and clone the repository, branch from `main`, and use Node 20.11+ with pnpm 9.15.4. The root package accepts pnpm 9+, but 9.15.4 is pinned for reproducibility.

```sh
pnpm install
pnpm dev
```

`pnpm dev` starts the docs app. In another terminal, validate your change:

```sh
pnpm verify
```

The gate includes `pnpm turbo run build:pages --filter=@nimjs/docs` with the `/ui` base path and packed external checks. Individual commands remain available for focused work. [Development](docs/development.md) explains each gate and the component checklist. The [consumer cookbook](docs/consumer-setup.md) supplies the current external setup.

## Make the change

Canonical component code lives in `packages/ui/src/components`; registry metadata in `packages/registry/components`; tokens and CSS in `packages/tokens/src`; website content in `apps/docs/content`. Keep package and copy mode behavior aligned. Use semantic tokens, explicit exports, native semantics, accessible focus/keyboard/disabled behavior where relevant, and SSR-safe React code. Avoid generated `dist` edits. A new production dependency needs purpose, maintenance/license, bundle, and security/accessibility review; copied components also need the dependency in their registry manifest.

For a component, follow the [cross-package checklist](docs/development.md#add-or-change-a-component). For documentation, update the canonical owner listed in the [docs index](docs/README.md) and check links and example imports. Keep pull requests focused and include the motivation, any public API or architecture effect, and exact validation commands. Descriptive commits are enough; no strict commit format is required.

## Changesets and review

Run `pnpm changeset` for user-facing package changes, including registry status, CLI behavior, public exports, CSS/token changes, and component behavior. Docs-only edits normally do not need one. A breaking change needs an explicit changeset and migration note under [Governance](GOVERNANCE.md). Maintainers review correctness, public contract, tests, docs, and release impact. Review timing is best effort. Contributions are submitted under the repository's [MIT License](LICENSE); do not include third-party code without compatible rights and attribution.
