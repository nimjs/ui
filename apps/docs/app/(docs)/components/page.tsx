import Link from 'next/link';

import { componentPages } from '@/lib/content';

export default function ComponentsIndexPage() {
  const groups = [
    { title: 'Actions', category: 'actions' },
    { title: 'Forms', category: 'forms' },
    { title: 'Navigation', category: 'navigation' },
    { title: 'Overlays', category: 'overlays' },
    { title: 'Feedback', category: 'feedback' },
    { title: 'Display', category: 'display' },
    { title: 'Disclosure', category: 'disclosure' },
    { title: 'UI primitives', category: 'ui' },
  ]
    .map((group) => ({
      ...group,
      pages: componentPages.filter(
        (page) => page.manifest.category === group.category,
      ),
    }))
    .filter((group) => group.pages.length > 0);
  return (
    <section className="docs-index">
      <div className="space-y-3">
        <p className="eyebrow">Components</p>
        <h1>Components</h1>
        <p className="docs-lede">
          Explore the preview catalog. Each entry has a package export, a local
          registry entry, and a copy mode source asset.
        </p>
      </div>

      {groups.map((group) => (
        <section key={group.title} className="space-y-4">
          <h2 className="text-xl font-semibold">{group.title}</h2>
          <div className="docs-index-list">
            {group.pages.map((page) => (
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
      ))}
    </section>
  );
}
