# @nimjs/ui

Core React components for UI.

Included in the baseline:

- `Button`
- `Input`
- `Card`
- `Badge`

Design goals:

- stable public exports
- semantic color usage through CSS variables
- accessible defaults
- no circular dependencies
- straightforward contributor ergonomics
- registry-friendly component boundaries for docs and CLI integration

When adding a new component:

1. Create `src/components/<component>/`.
2. Export it from the package root and a dedicated subpath.
3. Add docs content in `apps/docs`.
4. Add tests if behavior or variants are non-trivial.
5. Add a changeset if the package is user-facing.
