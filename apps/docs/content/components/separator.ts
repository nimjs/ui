import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Separator',
  description:
    'The default divider is decorative. Use decorative={false} for a meaningful section boundary.',
  registry: 'separator',
});

export const separatorPage = createComponentPage(meta, {
  slug: 'separator',
  eyebrow: 'Component',
  preview: 'separator',
  code: "import { Separator } from '@nimjs/ui';\n\nexport function Example() {\n  return (\n    <Separator decorative={false} />\n  );\n}",
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'The default divider is decorative. Use decorative={false} for a meaningful section boundary.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'Semantic separators expose orientation; decorative separators are removed from the accessibility tree.',
      ],
    },
  ],
});
