import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Radio Group',
  description:
    'A named group of native radio controls with controlled or uncontrolled value.',
  registry: 'radio-group',
});

export const radiogroupPage = createComponentPage(meta, {
  slug: 'radio-group',
  eyebrow: 'Component',
  preview: 'radio-group',
  code: `import { RadioGroup, RadioGroupItem } from '@nimjs/ui';

export function Example() {
  return (
    <RadioGroup defaultValue="basic" name="plan">
      <legend>Plan</legend>
      <label><RadioGroupItem value="basic" /> Basic</label>
      <label><RadioGroupItem value="pro" /> Pro</label>
    </RadioGroup>
  );
}`,
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Use value and onValueChange for controlled state, or defaultValue for native uncontrolled state. The group supports disabled, required, invalid, and orientation.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'The fieldset and legend name the group. Each item is a native radio input, so browsers provide Tab and arrow key behavior. Label every item.',
      ],
    },
  ],
});
