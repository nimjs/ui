import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Alert',
  description:
    'Use the default polite status for routine updates. Set role="alert" only for messages that require immediate attention.',
  registry: 'alert',
});

export const alertPage = createComponentPage(meta, {
  slug: 'alert',
  eyebrow: 'Component',
  preview: 'alert',
  code: "import { Alert, AlertTitle, AlertDescription } from '@nimjs/ui';\n\nexport function Example() {\n  return (\n    <Alert><AlertTitle>Saved</AlertTitle><AlertDescription>Changes are ready.</AlertDescription></Alert>\n  );\n}",
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Use the default polite status for routine updates. Set role="alert" only for messages that require immediate attention.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'The alert root announces its content through a status role. Keep the message concise.',
      ],
    },
  ],
});
