import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Field',
  description:
    'Field creates stable IDs for its label, description, and error. Set description and error when those parts are rendered; FieldControl passes the relationships to its single native control child.',
  registry: 'field',
});

export const fieldPage = createComponentPage(meta, {
  slug: 'field',
  eyebrow: 'Component',
  preview: 'field',
  code: 'import { Field, FieldLabel, FieldControl, FieldDescription, FieldError, Input } from \'@nimjs/ui\';\n\nexport function Example() {\n  return (\n    <Field description error invalid>\n      <FieldLabel>Email</FieldLabel>\n      <FieldControl><Input type="email" /></FieldControl>\n      <FieldDescription>Work email</FieldDescription>\n      <FieldError>Enter a valid address.</FieldError>\n    </Field>\n  );\n}',
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Field creates stable IDs for its label, description, and error. Set description and error when those parts are rendered; FieldControl passes the relationships to its single native control child.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'The control keeps its native keyboard behavior. Field adds aria-describedby and aria-invalid without replacing the control semantics.',
      ],
    },
  ],
});
