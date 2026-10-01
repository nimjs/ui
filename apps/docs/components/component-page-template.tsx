import type { ReactNode } from 'react';

import { CodeBlock } from './code-block';
import { ComponentPreview } from './component-preview';
import { DocSection } from './doc-section';

import type { ComponentPage } from '@/content/types';

const metadataCardClassName = 'rounded-lg border border-border bg-white p-5';
const metadataEyebrowClassName =
  'text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-red)]';

function formatLabel(value: string) {
  return value.replaceAll('-', ' ');
}

function MetadataCard({
  children,
  className = '',
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) {
  return (
    <div className={`${metadataCardClassName} ${className}`.trim()}>
      <p className={metadataEyebrowClassName}>{title}</p>
      {children}
    </div>
  );
}

function MetadataPills({
  items,
  tone = 'default',
}: {
  items: string[];
  tone?: 'accent' | 'default';
}) {
  const className =
    tone === 'accent'
      ? 'rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground'
      : 'rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground';

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <span className={className} key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

export function ComponentPageTemplate({ page }: { page: ComponentPage }) {
  const { manifest } = page;

  return (
    <article className="max-w-4xl space-y-10">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-red)]">
          {page.eyebrow}
        </p>
        <h1 className="font-display text-5xl font-semibold">{page.title}</h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          {page.description}
        </p>
      </header>

      <section className="space-y-5">
        <h2 className="font-display text-3xl font-semibold">Preview</h2>
        <div className="rounded-[1.5rem] border border-border bg-white p-6 shadow-soft">
          <ComponentPreview preview={page.preview} />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-3xl font-semibold">Usage</h2>
        <p className="text-sm text-muted-foreground">
          This example uses package mode. In copy mode, import the generated
          component from your project and complete the manual setup steps in the
          installation guide.
        </p>
        <CodeBlock
          code={page.code}
          label={`${page.title} example`}
          language="tsx"
        />
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-3xl font-semibold">System metadata</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <MetadataCard title="Registry">
            <p className="mt-3 text-lg font-semibold">{manifest.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Category: {manifest.category}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Status: {manifest.status}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Since: {manifest.since}
            </p>
          </MetadataCard>
          <MetadataCard title="Files">
            <div className="mt-3 flex flex-wrap gap-2">
              {manifest.files.map((file) => (
                <span
                  className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-xs text-foreground"
                  key={file}
                >
                  {file}
                </span>
              ))}
            </div>
          </MetadataCard>
          <MetadataCard title="Tokens">
            <MetadataPills items={manifest.tokens} tone="accent" />
          </MetadataCard>
          <MetadataCard title="Dependencies">
            <MetadataPills items={manifest.dependencies} />
          </MetadataCard>
          <MetadataCard title="Copy-mode npm packages">
            <MetadataPills items={manifest.npmDependencies ?? []} />
          </MetadataCard>
          <MetadataCard title="Accessibility">
            <MetadataPills items={manifest.accessibility.map(formatLabel)} />
          </MetadataCard>
          <MetadataCard title="Anatomy">
            <div className="mt-3 space-y-3">
              {manifest.anatomy.map((item) => (
                <div key={item.name}>
                  <p className="font-mono text-xs font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </MetadataCard>
          <MetadataCard className="md:col-span-2" title="Usage patterns">
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {manifest.usage.map((item) => (
                <div
                  className="rounded-md border border-border bg-background p-3"
                  key={item.name}
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </MetadataCard>
        </div>
      </section>

      {page.sections.map((section) => (
        <DocSection key={section.title} section={section} />
      ))}
    </article>
  );
}
