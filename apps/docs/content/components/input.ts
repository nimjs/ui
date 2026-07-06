import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Input',
  description:
    'Inputs stay lightweight and accessible while inheriting semantic focus, border, and placeholder behavior from the theme layer.',
  registry: 'input',
});

export const inputPage = createComponentPage(meta, {
  slug: 'input',
  eyebrow: 'Component',
  preview: 'input',
  code: `import { Input } from '@nim-ui/ui';\n\nexport function Example() {\n  return <Input placeholder="team@nim-ui.dev" type="email" />;\n}`,
  sections: [
    {
      title: 'Guidance',
      paragraphs: [
        'Prefer pairing inputs with explicit labels in app code. The component intentionally avoids wrapping field abstractions so teams can compose their preferred form patterns without fighting the base library.',
      ],
    },
  ],
});
