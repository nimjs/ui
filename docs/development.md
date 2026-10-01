# Development guide

For repository setup and pull request policy, start with [Contributing](../CONTRIBUTING.md). This page covers the cross-package work that is easy to miss. Current boundaries are in [architecture](architecture.md). `pnpm dev` first builds the docs app's workspace dependencies, then runs their package watchers alongside Next.js.

## Add or change a component

1. Change canonical behavior under `packages/ui/src/components/<name>/`. Use native semantics, SSR-safe rendering, semantic tokens, and accessible naming, focus, keyboard, and disabled behavior where applicable.
2. Curate root exports in `packages/ui/src/index.ts`, a component index, and an explicit `exports` entry in `packages/ui/package.json`. Keep the `build` and `dev` entry lists aligned.
3. Add or update `packages/registry/components/<name>.json`; if the name is new, update `packages/registry/src/types.ts` and the loader's import list. Declare files, system and npm dependencies, tokens, status, anatomy, and accessibility claims accurately.
4. Update typed website content under `apps/docs/content/components/`, navigation and route data as needed. Verify the example against public exports.
5. Add meaningful component, registry, and CLI tests for behavior or contract changes. `pnpm verify:registry` rejects component dependencies until copy mode supports them. Check package and copied use in an external consumer when exports, CSS paths, registry lookup, or CLI output change.
6. Add a changeset for user-facing package changes. Run the relevant workspace gates.

`preview` means available for evaluation with known validation gaps. `stable` requires the [acceptance gate](architecture.md#component-acceptance), including external package and copy mode checks. The registry does not currently support a `deprecated` status.

## Validation layers

| Gate                   | What it catches                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `pnpm lint`            | Static code issues                                                                      |
| `pnpm typecheck`       | Type and docs route generation failures                                                 |
| `pnpm test`            | Unit, component, registry, and CLI behavior already covered by tests                    |
| `pnpm build`           | Package artifacts and Next.js docs build                                                |
| `pnpm verify:registry` | Manifest schema, canonical source paths, token references, and public exports           |
| `pnpm verify:consumer` | Packed files, exports, CSS, types, CLI, Vite builds, and SSR parity for four components |
| `pnpm verify`          | All rows above plus the `/ui/` GitHub Pages static export                               |

The docs app currently has no behavioral tests; its build is the automated route gate. The external consumer gate uses temporary projects and tarballs, but it does not prove browser interaction or support for other frameworks.

## Documentation changes

Repository docs own architecture, contribution, maintenance, and the external setup cookbook. The website owns detailed component demos and consumer examples. Registry JSON owns component status, token, and dependency metadata; website pages add authored prose. Update the canonical source first, then affected projections. Avoid duplicating a component count or support claim across many pages.

## Dependencies

A new production dependency needs a specific use case, maintenance and license review, bundle impact consideration, and accessibility/security impact where relevant. Document why it belongs in the target package and, for copied components, in the manifest's `npmDependencies`.
