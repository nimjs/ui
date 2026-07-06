import type { DocPage } from '../types';

export const installationPage: DocPage = {
  slug: 'installation',
  title: 'Installation',
  description:
    'Local development keeps the docs app and package builds in the same monorepo loop, while published packages remain independently consumable.',
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
      title: 'Consume tokens and components',
      paragraphs: [
        'Applications should import the token stylesheet once near the root, then rely on semantic Tailwind classes or CSS variables in components and layout code.',
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
