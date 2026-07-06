import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Card',
  description:
    'Card primitives help structure panels, settings surfaces, and summary blocks without introducing behavior-specific abstractions.',
  registry: 'card',
});

export const cardPage = createComponentPage(meta, {
  slug: 'card',
  eyebrow: 'Component',
  preview: 'card',
  code: `import {\n  Card,\n  CardContent,\n  CardDescription,\n  CardHeader,\n  CardTitle,\n} from '@nimjs/ui';\n\nexport function Example() {\n  return (\n    <Card>\n      <CardHeader>\n        <CardTitle>Workspace analytics</CardTitle>\n        <CardDescription>Weekly delivery overview.</CardDescription>\n      </CardHeader>\n      <CardContent>Track releases and contributor activity.</CardContent>\n    </Card>\n  );\n}`,
  sections: [
    {
      title: 'Guidance',
      paragraphs: [
        'Keep cards presentational. Interactions and domain logic should live in the consuming app so the package remains reusable across product surfaces and documentation examples.',
      ],
    },
  ],
});
