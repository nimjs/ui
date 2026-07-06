# @nimjs/registry

Typed component registry for UI.

This package is the shared source of truth for:

- CLI component discovery
- docs metadata linkage
- future generated docs and remote registries

Each component manifest lives in `components/*.json` and is validated through the
typed runtime loader exported from `src/index.ts`.
