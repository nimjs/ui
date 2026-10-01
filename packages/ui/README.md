# @nimjs/ui

Preview React components for NimJS UI. The package is not publicly released yet; use the [packed artifact setup](https://github.com/nimjs/ui/blob/main/docs/consumer-setup.md) for external evaluation.

Public entry points: package root, `/button`, `/input`, `/card`, `/badge`, and `/styles.css`. The root exports `Button`, `Input`, `Card` parts, `Badge`, variants, and component prop types. Import only declared subpaths.

```tsx
import { Button } from '@nimjs/ui';

export function Example() {
  return <Button type="submit">Save</Button>;
}
```

React and React DOM `^19.0.0` are peers. Components use Tailwind 3 class names and semantic CSS variables. Import `@nimjs/tokens/styles.css` or `@nimjs/ui/styles.css` once, map semantic colors in Tailwind, and scan the package distribution. See the [consumer cookbook](https://github.com/nimjs/ui/blob/main/docs/consumer-setup.md) for the full setup and current limitations. Copied components use a separate CLI workflow.
