import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Collapsible',
  description:
    'A compact disclosure built on native details and summary elements.',
  registry: 'collapsible',
});

export const collapsiblePage = createComponentPage(meta, {
  slug: 'collapsible',
  eyebrow: 'Component',
  preview: 'collapsible',
  code: `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@nimjs/ui';

export function Example() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
      <CollapsibleContent>Choose additional options here.</CollapsibleContent>
    </Collapsible>
  );
}`,
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Use defaultOpen for initial uncontrolled state, or open and onOpenChange for controlled state. Compose one CollapsibleTrigger and one CollapsibleContent inside the root.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'The native summary is keyboard operable and exposes expanded state. Keep the trigger text meaningful; reduced motion is respected because no animation is imposed.',
      ],
    },
  ],
});
