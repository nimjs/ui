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
  code: `import { Field, FieldControl, FieldDescription, FieldLabel, Input } from '@nimjs/ui';\n\nexport function Example() {\n  return <Field description><FieldLabel>Email</FieldLabel><FieldControl><Input type="email" /></FieldControl><FieldDescription>Use your work address.</FieldDescription></Field>;\n}`,
  sections: [
    {
      title: 'Guidance',
      paragraphs: [
        'Pair Input with a visible label or compose it inside Field for description and error IDs. Use invalid for visual error styling and native required or disabled for form behavior.',
      ],
    },
  ],
});
