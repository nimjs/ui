# @nimjs/cli

Local source-copying CLI for NimJS UI. It is not publicly released yet. Evaluate it through the [packed artifact workflow](https://github.com/nimjs/ui/blob/main/docs/consumer-setup.md#copy-mode).

Requires Node 20.11 or newer.

```sh
pnpm exec ui init
pnpm exec ui add button --dry-run
pnpm exec ui add button
```

`init` creates `ui.config.ts` if absent, with `componentsDir: 'src/components/ui'` and `tokens: true`. `add` uses local registry metadata and assets bundled when the CLI was built. It writes the component, a local `cn` helper, and token CSS when needed. `--dry-run` prints planned creates/skips without writing. Existing identical files are skipped; different content causes an error, with no overwrite flag. Paths outside the project and symbolic-link output paths are rejected.

The CLI reports npm dependencies but does not install them, import CSS, or configure Tailwind. Install the reported packages, import the generated token CSS, and configure Tailwind 3 content paths and semantic colors manually. Component-to-component registry dependencies are rejected until the CLI can copy them. Copied code belongs to your application and is not updated by package upgrades. Config files are executable local code loaded with `jiti`.
