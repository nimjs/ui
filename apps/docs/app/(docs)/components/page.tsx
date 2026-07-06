import { Card, CardContent, CardHeader, CardTitle } from '@nimjs/ui';
import Link from 'next/link';

import { componentPages } from '@/lib/content';

export default function ComponentsIndexPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-red)]">
          Components
        </p>
        <h1 className="font-display text-5xl font-semibold">
          Small, documented building blocks
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          The baseline library is intentionally small, but the architecture
          supports predictable growth through tokens, shared utilities, and
          strict exports.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {componentPages.map((page) => (
          <Link href={`/components/${page.slug}`} key={page.slug}>
            <Card className="h-full bg-white transition-transform hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle>{page.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {page.description}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
