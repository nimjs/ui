# @nimjs/tokens

Design primitives, a light theme mapping, and CSS variables for NimJS UI. This intended public package is not released on npm yet. Use the [packed artifact setup](https://github.com/nimjs/ui/blob/main/docs/consumer-setup.md) for external evaluation.

Public entry points: package root for TypeScript values and `/styles.css` for variables. Import the stylesheet once in an application's global CSS:

```css
@import '@nimjs/tokens/styles.css';
```

Components consume semantic roles such as `--background`, `--foreground`, `--primary`, and `--ring`. The CSS contains a dark selector, but dark consumer behavior has not passed its validation gate. Missing CSS variables leave NimJS components incompletely styled. The [architecture](https://github.com/nimjs/ui/blob/main/docs/architecture.md#tokens-and-themes) explains token ownership and changes.
