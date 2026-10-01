# @nimjs/tokens

Central design tokens package for UI.

It exposes:

- token primitives in TypeScript
- semantic light theme mappings
- CSS variables for applications and component packages

Use `@nimjs/tokens/styles.css` in apps and rely on semantic variables such as
`--background`, `--foreground`, and `--primary` instead of hardcoded colors.

The light theme also exposes surface, border, foreground, and primary state
roles. Brand primitives (`brand.violet`, `brand.lavender`, `brand.periwinkle`,
and `brand.blue`) feed the shared CSS theme; existing color keys remain exported
for compatibility. A dark selector is present, but the docs app only enables the
light theme today.
