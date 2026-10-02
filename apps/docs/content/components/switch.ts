import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Switch',
  description:
    'Use this for immediate on or off preferences. It accepts native checked, defaultChecked, and onChange props.',
  registry: 'switch',
});

export const switchPage = createComponentPage(meta, {
  slug: 'switch',
  eyebrow: 'Component',
  preview: 'switch',
  code: "import { Switch } from '@nimjs/ui';\n\nexport function Example() {\n  return (\n    <label><Switch defaultChecked /> Notifications</label>\n  );\n}",
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Use this for immediate on or off preferences. It accepts native checked, defaultChecked, and onChange props.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'A native checkbox exposes the switch role and responds to Space. Give every switch a visible label.',
      ],
    },
  ],
});
