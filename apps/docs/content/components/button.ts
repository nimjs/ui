import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Button',
  description:
    'Buttons provide semantic variants and size options with accessible focus styles and SSR-safe rendering.',
  registry: 'button',
});

export const buttonPage = createComponentPage(meta, {
  slug: 'button',
  eyebrow: 'Component',
  preview: 'button',
  code: `import { Button } from '@nimjs/ui';\n\nexport function Example() {\n  return (\n    <div className="flex gap-3">\n      <Button>Primary</Button>\n      <Button variant="secondary">Secondary</Button>\n      <Button variant="outline">Outline</Button>\n    </div>\n  );\n}`,
  sections: [
    {
      title: 'Guidance',
      paragraphs: [
        'Use semantic variants for intent, not for ad hoc color changes. If a new visual meaning is needed across the system, introduce it through tokens and documented variants rather than one-off class overrides.',
      ],
    },
  ],
});
