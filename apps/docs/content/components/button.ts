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
  code: `import { Button } from '@nimjs/ui';\n\nexport function Example() {\n  return (\n    <div className="flex gap-3">\n      <Button>Primary</Button>\n      <Button variant="secondary">Secondary</Button>\n      <Button variant="outline">Outline</Button>\n      <Button loading>Saving</Button>\n      <Button disabled>Unavailable</Button>\n    </div>\n  );\n}`,
  sections: [
    {
      title: 'Guidance',
      paragraphs: [
        'Use variant for intent and size for density. loading keeps the label width and disables activation while exposing aria-busy. Icon-only buttons need an accessible name such as aria-label.',
      ],
    },
  ],
});
