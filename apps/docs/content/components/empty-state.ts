import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Empty State',
  description: 'A composed message for a surface with no content yet.',
  registry: 'empty-state',
});

export const emptystatePage = createComponentPage(meta, {
  slug: 'empty-state',
  eyebrow: 'Component',
  preview: 'empty-state',
  code: `import { EmptyState, EmptyStateTitle, EmptyStateDescription, EmptyStateActions, Button } from '@nimjs/ui';

export function Example() {
  return <EmptyState><EmptyStateTitle>No projects yet</EmptyStateTitle><EmptyStateDescription>Create a project to get started.</EmptyStateDescription><EmptyStateActions><Button>Create project</Button></EmptyStateActions></EmptyState>;
}`,
  sections: [
    {
      title: 'Composition',
      paragraphs: [
        'Use a title, concise explanation, and a relevant action. The component does not own product data or navigation.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'The title is a heading and actions retain their native button or link semantics. Keep the heading level appropriate to its page context.',
      ],
    },
  ],
});
