import Link from 'next/link';

import { componentPages } from '@/lib/content';

export default function ComponentsIndexPage() {
  return (
    <section className="docs-index">
      <div className="space-y-3">
        <p className="eyebrow">Components</p>
        <h1>Components</h1>
        <p className="docs-lede">
          The baseline library is intentionally small, but the architecture
          supports predictable growth through tokens, shared utilities, and
          strict exports.
        </p>
      </div>

      <div className="docs-index-list">
        {componentPages.map((page) => (
          <Link
            className="docs-index-link"
            href={`/components/${page.slug}`}
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
