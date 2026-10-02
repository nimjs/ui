import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Avatar',
  description: 'A profile image with a fallback for failed or absent images.',
  registry: 'avatar',
});

export const avatarPage = createComponentPage(meta, {
  slug: 'avatar',
  eyebrow: 'Component',
  preview: 'avatar',
  code: `import { Avatar, AvatarImage, AvatarFallback } from '@nimjs/ui';

export function Example() {
  return <Avatar aria-label="Ada Lovelace"><AvatarFallback>AL</AvatarFallback><AvatarImage src="/ada.jpg" alt="" /></Avatar>;
}`,
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Avatar composes an image over fallback content. When the image fails to load, the fallback remains visible. Size the root with className.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'If the image has meaningful alt text, use it as the name. If the image is decorative, set alt="" and give the root an accessible name. Fallback initials are hidden from assistive technology.',
      ],
    },
  ],
});
