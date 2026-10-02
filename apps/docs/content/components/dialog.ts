import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Dialog',
  description: 'A modal task surface built on the browser dialog top layer.',
  registry: 'dialog',
});

export const dialogPage = createComponentPage(meta, {
  slug: 'dialog',
  eyebrow: 'Component',
  preview: 'dialog',
  code: `import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@nimjs/ui';

export function Example() {
  return (
    <Dialog>
      <DialogTrigger>Open settings</DialogTrigger>
      <DialogContent>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>Update your preferences.</DialogDescription>
        <DialogClose>Done</DialogClose>
      </DialogContent>
    </Dialog>
  );
}`,
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Use open and onOpenChange for controlled state, or defaultOpen for uncontrolled state. DialogTrigger and DialogClose are native buttons. DialogContent uses showModal and the browser top layer.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'Include DialogTitle and DialogDescription in the content. Escape closes the modal, focus returns to the trigger, and the browser confines focus while it is open. Outside clicks dismiss the dialog.',
      ],
    },
  ],
});
