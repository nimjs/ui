# UI architecture

This document separates the **current foundation** from the **target product**.
See `README.md` for setup and the package map.

## Product contract

UI serves React applications in two ways:

1. **Package mode:** import versioned components from `@nimjs/ui` and tokens
   from `@nimjs/tokens`.
2. **Copy mode:** run the CLI to put reviewed component source into the user's
   repository, where the user owns later edits.

Both modes must have equivalent visible behavior, accessibility semantics,
token usage, and documented examples. They may differ in import paths and
dependency installation. Copy mode is currently a foundation, not a complete
external-project installation experience.

## Source of truth

```text
tokens/theme CSS
       |
       v
canonical component source in packages/ui
       |                 |
       v                 v
registry manifests --> docs metadata
       |
       v
CLI installation plan --> copied source in consumer project
```

`packages/ui/src/components` is the canonical implementation. Registry
manifests describe component files, dependencies, tokens, status, and docs
metadata. The CLI includes canonical source files at build time and changes
only the utility import when installing them. A parity test compares the
installed Button against canonical source. The CLI build fails if a manifest
references a missing component file.

## Existing package boundaries

| Location                                      | Responsibility                                     |
| --------------------------------------------- | -------------------------------------------------- |
| `packages/tokens`                             | Design scales, semantic CSS variables, themes      |
| `packages/ui`                                 | React components and explicit package exports      |
| `packages/utils`                              | Small shared helpers used by package components    |
| `packages/registry`                           | Typed component manifests consumed by docs and CLI |
| `packages/cli`                                | Local config, component lookup, scaffolding        |
| `apps/docs`                                   | Getting started, examples, component documentation |
| `packages/eslint-config`, `packages/tsconfig` | Repository tooling                                 |

The published package path and copy path should remain independently usable.
No runtime dependency on the separate `nimjs` project is planned.

## Registry and CLI target

The versioned manifest now lists source files, internal system dependencies,
and npm dependencies. A future version still needs, for each item:

- source files and destination paths;
- peer requirements;
- component dependencies and install order;
- CSS/token requirements;
- import aliases and transformations;
- richer schema validation errors.

The CLI should resolve the whole dependency graph, show a file and package plan,
check collisions, then write files and update dependencies. Validate every path
against the chosen project root. Prefer an inspectable plan and explicit
overwrite choice; do not execute remote registry scripts. A dry run is a useful
first step toward safe installation.

The current `ui add` command plans all files before writing, rejects collisions
and paths outside the project, and can show its plan with `--dry-run`. It copies
the shared `cn` helper and token CSS locally. It does not install npm packages,
import token CSS into the application, or configure Tailwind. Documentation
must keep those manual steps visible until the CLI handles them.

## Component acceptance criteria

Before a new component is called stable, require:

- a documented use case and a small public prop surface;
- keyboard and screen-reader behavior appropriate to its semantics;
- focus and disabled states, including tests for interactive components;
- support for semantic theme variables rather than raw visual literals;
- a package-mode import and a copy-mode installation fixture;
- docs with a live example, code example, and dependency list;
- a changeset for a published package change.

Prefer a smaller catalog with trustworthy behavior to broad coverage by
unreviewed wrappers. Complex primitives may use an accessibility-focused
dependency when justified; document that choice in the manifest and docs.

## Release boundary

`changesets`, CI, docs builds, CodeQL, and release workflows already exist.
Their presence does not establish that a first consumer installation works.
Before publishing, validate packed package contents, package exports, CSS
imports, CLI binary behavior, and both usage paths in clean external fixtures.

## References

- [shadcn/ui registry guide](https://ui.shadcn.com/docs/registry): reference for
  user-owned code distribution, not a source of code to copy into this project.
- [shadcn/ui registry item format](https://ui.shadcn.com/docs/registry/registry-item-json):
  useful comparison when evolving NimJS manifests.
