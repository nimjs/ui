import type { DocPage } from '../types';

export const themingPage: DocPage = {
  slug: 'theming',
  title: 'Theming',
  description:
    'The theming layer starts from token primitives, maps them into semantic CSS variables, and keeps room for a future dark theme without forcing that complexity into every component today.',
  eyebrow: 'Design Tokens',
  sections: [
    {
      title: 'Token layers',
      paragraphs: [
        'Primitive tokens live in the tokens package across color, typography, spacing, radius, and motion groups. Applications consume semantic variables such as background, card, and primary instead of raw brand values.',
        'The pipeline in this repository is explicit: registry metadata points to semantic tokens, the tokens package maps them to CSS variables, the UI package consumes those variables, and the docs app demonstrates the same system without a separate theme fork.',
      ],
      codeBlocks: [
        {
          label: 'Semantic variables',
          language: 'css',
          code: `--background\n--foreground\n--card\n--card-foreground\n--muted\n--muted-foreground\n--border\n--input\n--primary\n--primary-foreground\n--secondary\n--secondary-foreground\n--accent\n--accent-foreground\n--ring\n--destructive\n--destructive-foreground`,
        },
      ],
    },
    {
      title: 'Foundation scales',
      paragraphs: [
        'The theme exports reusable typography, spacing, and motion scales so component work does not invent one-off values as the library grows.',
        'Those scales are also exposed as CSS variables, which lets Tailwind configuration, package CSS, and consumer apps reference the same contract.',
      ],
      codeBlocks: [
        {
          label: 'Foundation variables',
          language: 'css',
          code: `--font-body\n--font-display\n--font-mono\n--space-1\n--space-2\n--space-3\n--duration-fast\n--ease-standard`,
        },
      ],
    },
    {
      title: 'Why semantic mapping matters',
      paragraphs: [
        'Components can remain stable while visual direction changes, because the UI package refers to semantic roles rather than to individual brand colors. That lowers migration cost when the design language evolves.',
      ],
      list: [
        'No hardcoded color values in the docs app or component package',
        'Light theme is fully implemented',
        'Dark theme hook points are present through data-theme selectors',
      ],
    },
    {
      title: 'Tailwind integration',
      paragraphs: [
        'The docs app maps semantic CSS variables into Tailwind theme keys so component classes stay readable and designers can reason about usage at a glance.',
      ],
      codeBlocks: [
        {
          label: 'Tailwind color mapping',
          language: 'tsx',
          code: `colors: {\n  background: 'var(--background)',\n  foreground: 'var(--foreground)',\n  primary: 'var(--primary)',\n  'primary-foreground': 'var(--primary-foreground)'\n}`,
        },
      ],
    },
    {
      title: 'End-to-end pipeline',
      paragraphs: [
        'The docs are not a disconnected marketing surface. Each component page carries typed metadata that mirrors the registry, so tokens and dependencies shown in docs stay aligned with the component ecosystem contract.',
      ],
      codeBlocks: [
        {
          label: 'Pipeline',
          language: 'bash',
          code: `registry -> docs meta -> design tokens -> CSS variables -> @nimjs/ui -> docs and consumer apps`,
        },
      ],
    },
  ],
};
