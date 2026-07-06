import { DocSection } from './doc-section';

import type { DocPage } from '@/content/types';

export function DocsPageTemplate({ page }: { page: DocPage }) {
  return (
    <article className="prose-shell max-w-4xl space-y-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-red)]">
          {page.eyebrow}
        </p>
        <h1 className="font-display text-5xl font-semibold">{page.title}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          {page.description}
        </p>
      </header>

      {page.sections.map((section) => (
        <DocSection key={section.title} section={section} />
      ))}
    </article>
  );
}
