# UI roadmap

## 0. Make the current promise accurate

- Keep README and docs explicit about four current components and incomplete
  external copy-mode setup.
- Add an example consumer app outside the workspace dependency graph.
- Record package-mode and copy-mode setup steps from a clean install.

**Done when:** a new user can tell what works today without reading source.

## 1. Complete one component end to end

- Choose Button as the first reference component.
- Make registry metadata complete enough for its files, npm dependencies,
  utility import, tokens, and destination path.
- Make CLI installation deterministic and safe on repeated runs.
- Compare package and copied versions in consumer tests.

**Done when:** `ui add button` produces a working button in a clean supported
React project using only documented commands.

## 2. Reliable design system baseline

- Add a documented dark theme and verify semantic token coverage.
- Test interactive components for keyboard, focus, and disabled behavior.
- Remove or generate duplicated templates after parity is proven.
- Publish component status and compatibility notes in docs.

**Done when:** each stable component meets the acceptance criteria in
`docs/architecture.md` in both usage modes.

## 3. First release and broader catalog

- Verify packed package exports, CSS paths, CLI executable, versioning, and
  release credentials in a dry-run environment.
- Publish first versions and a migration policy.
- Add high-demand components based on use cases, one vertical slice at a time.

**Done when:** an external project can install from the published packages and
from the copy-mode CLI without workspace-only imports.

## Later

Remote registry distribution, namespaces, blocks, more framework adapters,
and design-tool integrations should follow a working local registry and real
consumer demand.
