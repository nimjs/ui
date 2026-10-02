import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Badge',
  description:
    'Badges provide compact labels for status, categorization, and lightweight emphasis.',
  registry: 'badge',
});

export const badgePage = createComponentPage(meta, {
  slug: 'badge',
  eyebrow: 'Component',
  preview: 'badge',
  code: `import { Badge } from '@nimjs/ui';\n\nexport function Example() {\n  return (\n    <div className="flex gap-2">\n      <Badge>Stable</Badge>\n      <Badge variant="secondary">Community</Badge>\n      <Badge variant="outline">Docs</Badge>\n      <Badge variant="destructive">Action needed</Badge>\n    </div>\n  );\n}`,
  sections: [
    {
      title: 'Guidance',
      paragraphs: [
        'Badges should stay short and scannable. Use destructive for urgent status and keep actions in buttons or links. A ref can target the underlying span.',
      ],
    },
  ],
});
