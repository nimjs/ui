import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Spinner',
  description:
    'Name the loading task with label. The indicator uses the current text color.',
  registry: 'spinner',
});

export const spinnerPage = createComponentPage(meta, {
  slug: 'spinner',
  eyebrow: 'Component',
  preview: 'spinner',
  code: 'import { Spinner } from \'@nimjs/ui\';\n\nexport function Example() {\n  return (\n    <Spinner label="Loading results" />\n  );\n}',
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Name the loading task with label. The indicator uses the current text color.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'The spinner is a status with an accessible label; animation stops for reduced motion.',
      ],
    },
  ],
});
