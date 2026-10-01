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
- canonical source assets bundled at build time
- future remote registry support

`ui add` reads from `@nimjs/registry`, resolves dependencies, and loads
`ui.config.ts` when present. Its packaged component files are copied from
`packages/ui/src/components` during the CLI build. Run `ui add button --dry-run`
to inspect the plan. Repeated installs skip identical files and reject edits
without overwriting them.

Copy mode creates a local `cn` helper and semantic token CSS. Install the npm
packages listed by the command, import the generated CSS once, and configure
Tailwind semantic colors and content paths in the consuming project. See
[the consumer setup guide](../../docs/consumer-setup.md).
