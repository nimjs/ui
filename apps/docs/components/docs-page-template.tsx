import { DocSection } from './doc-section';

import type { DocPage } from '@/content/types';

export function DocsPageTemplate({ page }: { page: DocPage }) {
  return (
    <article className="prose-shell docs-article">
      <header className="space-y-4">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="docs-lede">{page.description}</p>
      </header>

      {page.sections.map((section) => (
        <DocSection key={section.title} section={section} />
      ))}
    </article>
  );
}
