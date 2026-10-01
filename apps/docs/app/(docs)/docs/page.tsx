import Link from 'next/link';

import { docsPages } from '@/lib/content';

export default function DocsIndexPage() {
  return (
    <section className="docs-index">
      <div className="space-y-3">
        <p className="eyebrow">Documentation</p>
        <h1>Documentation</h1>
        <p className="docs-lede">
          Architecture, installation, theming, and component guidance are kept
          in the repository so the docs stay aligned with the shipped packages.
        </p>
      </div>

      <div className="docs-index-list">
        {docsPages.map((page) => (
          <Link
            className="docs-index-link"
            href={`/docs/${page.slug}`}
            key={page.slug}
          >
            <span>
              <strong>{page.title}</strong>
              <small>{page.description}</small>
            </span>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
