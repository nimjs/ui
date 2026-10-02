import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Textarea',
  description:
    'Use rows for an initial height. The user can resize the native textarea.',
  registry: 'textarea',
});

export const textareaPage = createComponentPage(meta, {
  slug: 'textarea',
  eyebrow: 'Component',
  preview: 'textarea',
  code: 'import { Textarea } from \'@nimjs/ui\';\n\nexport function Example() {\n  return (\n    <label htmlFor="bio">Bio</label>\n    <Textarea id="bio" rows={4} placeholder="Tell us about yourself" />\n  );\n}',
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Use rows for an initial height. The user can resize the native textarea.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'Connect a visible label with htmlFor. The native control supports required, disabled, and form submission.',
      ],
    },
  ],
});
