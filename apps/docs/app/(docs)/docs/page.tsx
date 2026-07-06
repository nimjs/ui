import { Card, CardContent, CardHeader, CardTitle } from '@nimjs/ui';
import Link from 'next/link';

import { docsPages } from '@/lib/content';

export default function DocsIndexPage() {
  return (
    <section className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-red)]">
          Documentation
        </p>
        <h1 className="font-display text-5xl font-semibold">
          Product docs and contributor pathways
        </h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          Architecture, installation, theming, and component guidance are kept
          in the repository so the docs stay aligned with the shipped packages.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {docsPages.map((page) => (
          <Link href={`/docs/${page.slug}`} key={page.slug}>
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
