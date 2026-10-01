import type { DocPage } from '../types';

export const installationPage: DocPage = {
  slug: 'installation',
  title: 'Installation',
  description:
    'UI is not publicly released yet. Package mode and copy mode have different setup steps for external React projects.',
  eyebrow: 'Getting Started',
  sections: [
    {
      title: 'Bootstrap the workspace',
      paragraphs: [
        'Use pnpm at the root so workspace links, Turbo task execution, and Changesets all operate against the same dependency graph.',
      ],
      codeBlocks: [
        {
          label: 'Install and run',
          language: 'bash',
          code: `pnpm install\npnpm dev`,
        },
      ],
    },
    {
      title: 'Package mode',
      paragraphs: [
        'After publication, install @nimjs/ui and @nimjs/tokens. Import the token stylesheet once, then import components from the package root or an explicit subpath.',
        'The package ships Tailwind class names, not precompiled component CSS. Add node_modules/@nimjs/ui/dist/**/*.{js,mjs} to Tailwind content paths and map semantic color names such as primary, ring, and border to their CSS variables. The docs app Tailwind config contains the full mapping.',
      ],
      codeBlocks: [
        {
          label: 'Root styles',
          language: 'css',
          code: `@import '@nimjs/tokens/styles.css';`,
        },
        {
          label: 'Component usage',
          language: 'tsx',
          code: `import { Button } from '@nimjs/ui';\n\nexport function HeroActions() {\n  return <Button>Start building</Button>;\n}`,
        },
      ],
    },
    {
      title: 'Copy mode',
      paragraphs: [
        'The CLI is not publicly released yet. For local testing, pack @nimjs/cli and @nimjs/registry and install both tarballs in an external project. Run ui init, inspect ui add button --dry-run, then run ui add button. The CLI copies canonical component source, a local cn helper, and token CSS. It skips identical files on repeated runs and refuses to overwrite edited files.',
        'Manual setup is still required: install the npm dependencies reported by the command, import the generated _lib/tokens.css once, and configure Tailwind content paths and semantic colors in your app.',
      ],
      codeBlocks: [
        {
          label: 'Copy Button',
          language: 'bash',
          code: `ui init\nui add button --dry-run\nui add button\npnpm add class-variance-authority clsx tailwind-merge`,
        },
        {
          label: 'Local import',
          language: 'tsx',
          code: `import { Button } from './components/ui/button/button';`,
        },
      ],
    },
    {
      title: 'Monorepo workflows',
      paragraphs: [
        'Use Turbo-powered scripts for consistent build, lint, test, and typecheck behavior. Package boundaries stay explicit, but contributors still get one command surface from the root.',
      ],
      codeBlocks: [
        {
          label: 'Common scripts',
          language: 'bash',
          code: `pnpm lint\npnpm test\npnpm build\npnpm typecheck`,
        },
      ],
    },
  ],
};
