import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Checkbox',
  description:
    'Use checked and onChange for controlled state, or defaultChecked for native uncontrolled state. indeterminate sets the mixed visual and DOM state.',
  registry: 'checkbox',
});

export const checkboxPage = createComponentPage(meta, {
  slug: 'checkbox',
  eyebrow: 'Component',
  preview: 'checkbox',
  code: "import { Checkbox } from '@nimjs/ui';\n\nexport function Example() {\n  return (\n    <label><Checkbox defaultChecked /> Email updates</label>\n  );\n}",
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Use checked and onChange for controlled state, or defaultChecked for native uncontrolled state. indeterminate sets the mixed visual and DOM state.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'The native checkbox responds to Space and exposes disabled, required, and checked states.',
      ],
    },
  ],
});
