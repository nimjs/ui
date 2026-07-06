import type { DocPage } from '../types';

export const introductionPage: DocPage = {
  slug: 'introduction',
  title: 'Introduction',
  description:
    'UI is a monorepo-oriented UI ecosystem that keeps design tokens, React components, docs, and future CLI workflows aligned from the beginning.',
  eyebrow: 'Getting Started',
  sections: [
    {
      title: 'Why this architecture',
      paragraphs: [
        'The repository separates tokens, utilities, component code, docs, and release infrastructure into focused packages so each concern can evolve without dragging unrelated complexity across the workspace.',
        'That structure makes the project easier to understand for contributors and easier to govern for maintainers who need confidence around public API changes and release behavior.',
      ],
    },
    {
      title: 'What ships today',
      paragraphs: [
        'The baseline includes a tokens package, shared utilities, a React UI package, a CLI foundation for future init and add workflows, and a Next.js docs app that demonstrates the full path from tokens to components.',
      ],
      list: [
        'pnpm workspace + Turborepo orchestration',
        'Strict TypeScript and shared configs',
        'Changesets-based release flow',
        'Open-source governance and contribution docs',
      ],
    },
    {
      title: 'Repository map',
      paragraphs: [
        'The package map is intentionally small so maintainers can scale the ecosystem with predictable conventions instead of one-off patterns.',
      ],
      codeBlocks: [
        {
          label: 'Repository structure',
          language: 'bash',
          code: `apps/docs\npackages/ui\npackages/tokens\npackages/utils\npackages/cli\npackages/eslint-config\npackages/tsconfig\n.github\n.changeset`,
        },
      ],
    },
  ],
};
