import Link from 'next/link';
import type { ReactNode } from 'react';

import { CodeBlock } from './code-block';
import { ComponentPreview } from './component-preview';
import { DocSection } from './doc-section';

import type { ComponentPage } from '@/content/types';

const metadataCardClassName = 'metadata-section';
const metadataEyebrowClassName = 'metadata-label';

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
    <article className="docs-article">
      <header className="space-y-4">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="docs-lede">{page.description}</p>
      </header>

      <section className="doc-section">
        <h2>Preview</h2>
        <div className="component-preview-surface">
          <ComponentPreview preview={page.preview} />
        </div>
      </section>

      <section className="doc-section">
        <h2>Installation</h2>
        <p className="doc-paragraph">
          Packages are unreleased. Follow the packed artifact setup for package
          mode, or run the local CLI in copy mode and complete the reported npm,
          token CSS, and Tailwind setup.
        </p>
        <CodeBlock
          code={`pnpm exec ui add ${manifest.name}`}
          label={`Copy ${page.title}`}
          language="bash"
        />
        <Link
          className="text-primary underline underline-offset-4"
          href="/docs/installation"
        >
          Full installation guide
        </Link>
      </section>

      <section className="doc-section">
        <h2>Usage</h2>
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

      <section className="doc-section">
        <h2>System metadata</h2>
        <div className="metadata-grid">
          <MetadataCard title="Registry">
            <p className="mt-3 text-lg font-semibold">{manifest.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Category: {manifest.category}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Status: {manifest.status}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Version marker: {manifest.since} (unreleased)
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
          <MetadataCard className="metadata-wide" title="Usage patterns">
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
