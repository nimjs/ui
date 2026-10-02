# Consumer setup

The repository also provides `pnpm verify:consumer`, which builds, packs, and tests every registered component in temporary package-mode and copy-mode projects outside the workspace.

These are **local artifact** instructions for an external React 19 application using Tailwind CSS 3. NimJS UI has no public npm release yet. The examples assume an existing pnpm project with React, React DOM, TypeScript, PostCSS, and Tailwind 3 configured. The exact framework bootstrap is the application's choice; the setup below describes the NimJS-specific contract. Run application commands from the external project's root, outside this workspace.

## Prepare packed artifacts

From the NimJS UI repository root, use Node 20.11+ and pnpm 9.15.4:

```sh
pnpm install
pnpm build
mkdir -p /tmp/nimjs-packs
pnpm --dir packages/tokens pack --pack-destination /tmp/nimjs-packs
pnpm --dir packages/utils pack --pack-destination /tmp/nimjs-packs
pnpm --dir packages/ui pack --pack-destination /tmp/nimjs-packs
pnpm --dir packages/registry pack --pack-destination /tmp/nimjs-packs
pnpm --dir packages/cli pack --pack-destination /tmp/nimjs-packs
```

The resulting tarballs use version `0.0.0`. Put this `pnpm` block in the external application's `package.json` before installation so internal package dependencies resolve to the local tarballs:

```json
{
  "pnpm": {
    "overrides": {
      "@nimjs/tokens": "file:/tmp/nimjs-packs/nimjs-tokens-0.0.0.tgz",
      "@nimjs/utils": "file:/tmp/nimjs-packs/nimjs-utils-0.0.0.tgz",
      "@nimjs/registry": "file:/tmp/nimjs-packs/nimjs-registry-0.0.0.tgz"
    }
  }
}
```

Merge the `pnpm` key into your existing manifest; do not replace its scripts or dependencies. Repack and reinstall after changing canonical source. These absolute `/tmp` paths are only for local testing.

## Package mode

Install the packed component and token packages in the external application:

```sh
pnpm add /tmp/nimjs-packs/nimjs-ui-0.0.0.tgz /tmp/nimjs-packs/nimjs-tokens-0.0.0.tgz
```

`@nimjs/ui` peers on React and React DOM `^19.0.0`. Import token CSS once in your application's global stylesheet, before Tailwind directives:

```css
@import '@nimjs/tokens/styles.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add the UI distribution to Tailwind's `content` scan. The components ship class names, not compiled component CSS. Use the semantic mapping below. It covers the current catalog; compare with `apps/docs/tailwind.config.ts` when adding new tokens.

```ts
// tailwind.config.ts, merge into an existing Tailwind 3 config
export default {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@nimjs/ui/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        ring: 'var(--ring)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
      },
    },
  },
};
```

```tsx
import { Button } from '@nimjs/ui';
// Also available: import { Button } from '@nimjs/ui/button';

export function Example() {
  return <Button>Continue</Button>;
}
```

The public package paths are the root, `/button`, `/input`, `/card`, `/badge`, and `/styles.css`. The latter imports token CSS and is an alternative to importing `@nimjs/tokens/styles.css` directly. Do not import both stylesheets. Package updates apply when the application upgrades its package version after publication. This local tarball workflow is for validation, not a published dependency strategy.

## Copy mode

Install the packed CLI in a separate external project with the registry override above:

```sh
pnpm add -D /tmp/nimjs-packs/nimjs-cli-0.0.0.tgz
pnpm exec ui init
pnpm exec ui add button --dry-run
pnpm exec ui add button
pnpm add class-variance-authority@^0.7.1 clsx@^2.1.1 tailwind-merge@^2.6.0
```

`init` writes `ui.config.ts` if absent. Its defaults are `componentsDir: 'src/components/ui'` and `tokens: true`. The config can be edited, but `componentsDir` must stay inside the project. `add` creates `src/components/ui/button/button.tsx`, `src/components/ui/_lib/cn.ts`, and `src/components/ui/_lib/tokens.css` for Button. It prints npm dependencies but does not install them. For other components, install the packages printed by `--dry-run`; the manifests hold those lists.

Import the copied token CSS once from the application's global stylesheet, using the path appropriate to that stylesheet:

```css
@import '../components/ui/_lib/tokens.css'; /* if this file is src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Use the same semantic color mapping as package mode, and ensure Tailwind scans `./src/components/ui/**/*.{ts,tsx}`. Then import the local component:

```tsx
import { Button } from './components/ui/button/button';
```

The copied source belongs to the application. Upgrading `@nimjs/cli` or `@nimjs/ui` does not update it. `ui add` skips identical files, rejects an existing file with different content, refuses paths outside the project or through symlinks, and has no overwrite flag. A dry run does not write files. `tokens: false` omits copied CSS; the application must supply compatible semantic variables itself. CLI config is executable local TypeScript/JavaScript loaded with `jiti`.

## Troubleshooting and limits

- **Unstyled package component:** check the token CSS import, Tailwind 3 semantic color mapping, and scan path for `@nimjs/ui/dist`.
- **Unstyled copied component:** check `_lib/tokens.css` import and Tailwind scan path for copied source.
- **Collision on `ui add`:** compare the existing file; move or reconcile it manually. The CLI intentionally does not overwrite edits.
- **Package not found during local test:** check the `/tmp/nimjs-packs` tarballs and `pnpm.overrides` entries, then reinstall.
- **Missing type or module:** use only explicit package exports and rebuild/repack after source changes.

The registry currently reports npm dependency names without version ranges; the command above uses the ranges declared by the corresponding workspace packages. The CLI does not create a framework app, install npm dependencies, edit Tailwind or PostCSS configuration, or add a CSS import. It rejects component-to-component dependencies until copying them is implemented. The package path has no public npm install command yet. Dark theme behavior and other framework/Tailwind versions are unverified. `pnpm verify:consumer` checks every registered component in external Vite fixtures; it does not test browser interactions.
