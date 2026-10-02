import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Progress',
  description:
    'Omit value when the duration is unknown. Values outside the range are clamped to zero and max.',
  registry: 'progress',
});

export const progressPage = createComponentPage(meta, {
  slug: 'progress',
  eyebrow: 'Component',
  preview: 'progress',
  code: 'import { Progress } from \'@nimjs/ui\';\n\nexport function Example() {\n  return (\n    <Progress value={65} max={100} aria-label="Upload progress" />\n  );\n}',
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Omit value when the duration is unknown. Values outside the range are clamped to zero and max.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'Always provide an accessible name via aria-label or aria-labelledby; the progressbar exposes its numeric range.',
      ],
    },
  ],
});
