import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Skeleton',
  description:
    'Size the placeholder to match the content it represents. Add a separate status message if loading needs announcement.',
  registry: 'skeleton',
});

export const skeletonPage = createComponentPage(meta, {
  slug: 'skeleton',
  eyebrow: 'Component',
  preview: 'skeleton',
  code: 'import { Skeleton } from \'@nimjs/ui\';\n\nexport function Example() {\n  return (\n    <Skeleton className="h-4 w-48" />\n  );\n}',
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Size the placeholder to match the content it represents. Add a separate status message if loading needs announcement.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'Skeleton is hidden from assistive technology and its animation stops for reduced motion.',
      ],
    },
  ],
});
