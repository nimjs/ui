import type { DocPage } from '../types';

export const introductionPage: DocPage = {
  slug: 'introduction',
  title: 'Introduction',
  description:
    'NimJS UI is an early-stage React component ecosystem that keeps design tokens, React components, docs, and a local CLI workflow aligned from the beginning.',
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
        'The repository includes token and utility packages, preview React components, local init and add commands, and a Next.js documentation app. The packages are not publicly released; external testing uses packed artifacts.',
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
          code: `apps/docs\npackages/ui\npackages/tokens\npackages/utils\npackages/registry\npackages/cli\npackages/eslint-config\npackages/tsconfig\n.github\n.changeset`,
        },
      ],
    },
  ],
};
