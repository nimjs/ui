# @nimjs/cli

Foundation CLI for UI.

Current commands:

- `ui init`
- `ui add <component>`

The current implementation is intentionally small, but the package layout already
supports:

- command modules
- registry-driven component lookup
- config resolution
- local templates
- future remote registry support

`ui add` now reads from `@nimjs/registry`, resolves basic dependencies, and
loads `ui.config.ts` when present.
