# Consumer setup

There is no public package release yet. These instructions describe how the
current source and packed packages work in a React and Tailwind CSS 3 project.

## Package mode

Once published, install `@nimjs/ui`, `@nimjs/tokens`, React 19, and Tailwind
CSS 3. Import `@nimjs/tokens/styles.css` once in the application stylesheet and
import components from `@nimjs/ui` or an explicit component subpath.

```css
@import '@nimjs/tokens/styles.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```tsx
import { Button } from '@nimjs/ui';

export function Example() {
  return <Button>Continue</Button>;
}
```

The package contains class names rather than precompiled component CSS. Add
`./node_modules/@nimjs/ui/dist/**/*.{js,mjs}` to Tailwind's `content` paths,
along with your application's source. Map semantic colors to CSS variables:

```ts
// tailwind.config.ts (excerpt)
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
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
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

The package stylesheet supplies the variables; Tailwind generates the classes
used by the component package.

## Copy mode

After publication, install `@nimjs/cli`. For local testing before publication,
pack `@nimjs/cli` and `@nimjs/registry` from this repository and install both
tarballs in the external project, overriding the CLI's registry dependency to
the local registry tarball:

```bash
pnpm turbo run build --filter=@nimjs/cli
mkdir -p /tmp/nimjs-packs
pnpm --dir packages/registry pack --pack-destination /tmp/nimjs-packs
pnpm --dir packages/cli pack --pack-destination /tmp/nimjs-packs
```

Set `@nimjs/cli` to `file:/tmp/nimjs-packs/nimjs-cli-0.0.0.tgz` in the external
project's `package.json`, and set `pnpm.overrides["@nimjs/registry"]` to
`file:/tmp/nimjs-packs/nimjs-registry-0.0.0.tgz`. Run `pnpm install`, then run
`ui init`, `ui add button --dry-run`, and
`ui add button`. The command creates the component,
`src/components/ui/_lib/cn.ts`, and `src/components/ui/_lib/tokens.css` by
default. It reports npm packages to install. For Button:

```bash
pnpm add class-variance-authority clsx tailwind-merge
```

Import `_lib/tokens.css` once from your application stylesheet. Ensure
Tailwind scans `src/components/ui/**/*.{ts,tsx}` and uses the semantic color
mapping shown above. Import the copied Button from its local path:

```tsx
import { Button } from './components/ui/button/button';
```

The CLI does not yet change package dependencies, import CSS into the app, or
edit Tailwind config. Those steps remain manual. `ui add` skips identical
files on subsequent runs and refuses to overwrite modified files.
