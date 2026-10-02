import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Select',
  description:
    'A native picker for finite choices, with browser keyboard and mobile behavior.',
  registry: 'select',
});

export const selectPage = createComponentPage(meta, {
  slug: 'select',
  eyebrow: 'Component',
  preview: 'select',
  code: `import { Select } from '@nimjs/ui';

export function Example() {
  return (
    <label>
      Region
      <Select defaultValue="eu">
        <optgroup label="Available">
          <option value="eu">Europe</option>
          <option value="us">United States</option>
        </optgroup>
        <option value="ap" disabled>Asia Pacific</option>
      </Select>
    </label>
  );
}`,
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Select accepts native select attributes, including value, defaultValue, onChange, required, and disabled. Compose native option and optgroup elements as children.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'Use a visible label or Field. The browser supplies keyboard navigation, typeahead, disabled option handling, and the platform picker on mobile.',
      ],
    },
  ],
});
