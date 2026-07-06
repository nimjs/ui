import type { DocPage } from '../types';

export const designSystemPage: DocPage = {
  slug: 'design-system',
  title: 'Design System',
  description:
    'Nim UI treats visual decisions as system contracts: token layers, component anatomy, states, and accessibility metadata move through the same registry-backed workflow.',
  eyebrow: 'Design System',
  sections: [
    {
      title: 'Token layers',
      paragraphs: [
        'Primitive tokens describe raw values such as color, spacing, typography, motion, and radius. Semantic tokens translate those values into product roles such as background, foreground, primary, border, and ring.',
        'Components should consume semantic variables first. Raw primitives are useful for documentation, theme construction, and controlled escape hatches, but they should not become the default component API.',
      ],
      codeBlocks: [
        {
          label: 'Layer model',
          language: 'bash',
          code: `primitive tokens -> semantic tokens -> component styles -> docs and consuming apps`,
        },
      ],
    },
    {
      title: 'Component anatomy',
      paragraphs: [
        'Every component registry manifest owns an anatomy list. That keeps implementation, docs, accessibility review, and future visual tooling aligned around the same named parts.',
        'Anatomy should describe stable composition slots, not incidental markup. If a part is named in the registry, it should be meaningful for docs, tests, and future component review.',
      ],
    },
    {
      title: 'States',
      paragraphs: [
        'Interactive components should define hover, focus-visible, disabled, invalid, and loading states through shared tokens where possible. This keeps state styling consistent as the component set grows.',
        'The baseline exposes focus ring and disabled opacity variables, plus motion duration and easing variables for predictable interaction timing.',
      ],
      codeBlocks: [
        {
          label: 'State variables',
          language: 'css',
          code: `--focus-ring-width: 2px;\n--disabled-opacity: 0.5;\n--duration-fast: 120ms;\n--ease-standard: cubic-bezier(0.2, 0, 0, 1);`,
        },
      ],
    },
    {
      title: 'Accessibility contract',
      paragraphs: [
        'Accessibility metadata lives in the registry so it can be shown in docs, validated by tests, and used by CLI or future review tooling.',
        'The metadata does not replace behavior tests. It makes the expected behavior explicit before implementation details spread across components, examples, and prose.',
      ],
      list: [
        'Use native semantics where practical',
        'Expose visible focus styles for keyboard users',
        'Keep foreground and background pairs contrast-aware',
        'Document screen reader expectations for non-obvious patterns',
      ],
    },
  ],
};
