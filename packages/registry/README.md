# @nimjs/registry

Typed local component metadata for NimJS UI. This intended public package is not released on npm yet. Its package root exports the manifest loader, lists, types, and constants; `components/*.json` are bundled data, not declared package subpath exports.

Manifests name canonical source files, system and npm dependencies, semantic tokens, category, status, anatomy, accessibility features, and usage patterns. `schemaVersion` is currently `1`. The CLI and docs use the root loader; implementations remain in `packages/ui/src/components`. Current components are marked `preview` pending external acceptance checks.

See the [registry contract](https://github.com/nimjs/ui/blob/main/docs/architecture.md#registry-contract) and [consumer setup](https://github.com/nimjs/ui/blob/main/docs/consumer-setup.md). Schema changes that affect CLI output need coordinated tests and a changeset.
