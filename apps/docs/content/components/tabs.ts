import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Tabs',
  description:
    'A keyboard operable set of peer views with controlled or uncontrolled selection.',
  registry: 'tabs',
});

export const tabsPage = createComponentPage(meta, {
  slug: 'tabs',
  eyebrow: 'Component',
  preview: 'tabs',
  code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from '@nimjs/ui';

export function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Project views">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Project summary</TabsContent>
      <TabsContent value="activity">Recent changes</TabsContent>
    </Tabs>
  );
}`,
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Use value and onValueChange for controlled selection, or defaultValue for uncontrolled selection. Disable individual triggers with disabled; orientation supports horizontal and vertical layouts.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'Give TabsList an accessible name. Arrow keys move focus and select a tab; Home and End move to the first and last enabled tabs. Direction is respected in RTL horizontal lists.',
      ],
    },
  ],
});
