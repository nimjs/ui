import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Accordion',
  description:
    'A list of related native disclosures with single or multiple open state.',
  registry: 'accordion',
});

export const accordionPage = createComponentPage(meta, {
  slug: 'accordion',
  eyebrow: 'Component',
  preview: 'accordion',
  code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@nimjs/ui';

export function Example() {
  return (
    <Accordion type="single" defaultValue="billing">
      <AccordionItem value="billing">
        <AccordionTrigger>Billing</AccordionTrigger>
        <AccordionContent>Manage payment methods.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="team">
        <AccordionTrigger>Team</AccordionTrigger>
        <AccordionContent>Manage members.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'type="single" allows one open item; type="multiple" allows several. Use value and onValueChange for controlled state, or defaultValue for uncontrolled state. AccordionItem supports disabled.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'Each item uses native details and summary elements, which provide keyboard activation and expanded state. Disabled triggers are removed from Tab order.',
      ],
    },
  ],
});
