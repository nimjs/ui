import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  buttonVariants,
} from '@nimjs/ui';
import Link from 'next/link';

import { BrandMark } from '@/components/brand-mark';
import { CodeBlock } from '@/components/code-block';
import { SiteHeader } from '@/components/site-header';

const system = [
  {
    number: '01',
    name: 'Tokens',
    detail: 'Shared primitives and semantic roles',
  },
  {
    number: '02',
    name: 'Components',
    detail: 'Four composable React building blocks',
  },
  { number: '03', name: 'Registry', detail: 'Typed metadata for docs and CLI' },
  {
    number: '04',
    name: 'Interfaces',
    detail: 'Package or locally owned source',
  },
];

const swatches = [
  { name: 'Primary', token: '--primary', className: 'swatch-primary' },
  { name: 'Accent', token: '--accent', className: 'swatch-accent' },
  { name: 'Surface', token: '--surface-subtle', className: 'swatch-surface' },
  { name: 'Border', token: '--border', className: 'swatch-border' },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section
          className="hero-section site-container"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              Open-source UI ecosystem
            </p>
            <h1 id="hero-title">
              Interfaces,
              <br />
              <span>built in flow.</span>
            </h1>
            <p className="hero-description">
              Composable React components, shared design tokens and tooling
              designed to evolve as one system.
            </p>
            <div className="hero-actions">
              <Link
                className={buttonVariants({ variant: 'primary', size: 'lg' })}
                href="/components"
              >
                Explore components <span aria-hidden="true">↗</span>
              </Link>
              <Link
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
                href="/docs/introduction"
              >
                Read the docs
              </Link>
            </div>
            <p className="hero-meta">
              React <span /> TypeScript <span /> Design tokens <span /> Open
              source
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-ring" />
            <BrandMark className="hero-mark" />
            <span className="hero-art-caption">
              N / 01 &nbsp; Continuous by design
            </span>
          </div>
        </section>

        <section className="showcase-section" aria-labelledby="showcase-title">
          <div className="site-container">
            <div className="section-intro">
              <div>
                <p className="eyebrow">The components</p>
                <h2 id="showcase-title">A small set, built with intent.</h2>
              </div>
              <p>
                The current foundation has four components. Each one uses the
                same semantic theme and an explicit package export.
              </p>
            </div>
            <div className="showcase-surface">
              <div className="showcase-topline">
                <span>Component preview</span>
                <span>01 / 04</span>
              </div>
              <div className="showcase-grid">
                <div className="showcase-controls">
                  <div className="showcase-field">
                    <span className="showcase-label">Actions</span>
                    <div className="showcase-actions">
                      <Button>Continue</Button>
                      <Button variant="outline">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                  </div>
                  <div className="showcase-field">
                    <label className="showcase-label" htmlFor="showcase-email">
                      Input
                    </label>
                    <Input
                      id="showcase-email"
                      placeholder="name@example.com"
                      type="email"
                    />
                  </div>
                  <div className="showcase-field">
                    <span className="showcase-label">Status</span>
                    <div className="showcase-actions">
                      <Badge>Primary</Badge>
                      <Badge variant="secondary">Neutral</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </div>
                </div>
                <div className="showcase-card-wrap">
                  <Card className="showcase-card">
                    <CardHeader>
                      <Badge variant="accent">In progress</Badge>
                      <CardTitle>Build with one foundation.</CardTitle>
                      <CardDescription>
                        Compose a clear interface from shared primitives and
                        semantic roles.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="showcase-card-footer">
                        <span>Design system / 001</span>
                        <span aria-hidden="true">↗</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="showcase-bottomline">
                <span>Button / Input / Badge / Card</span>
                <Link href="/components">
                  View component docs <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="system-section site-container"
          aria-labelledby="system-title"
        >
          <div className="section-intro">
            <div>
              <p className="eyebrow">One connected foundation</p>
              <h2 id="system-title">Built as a system.</h2>
            </div>
            <p>
              Tokens set the visual language. Canonical components feed registry
              metadata, documentation and local CLI scaffolding.
            </p>
          </div>
          <ol className="system-flow">
            {system.map((step) => (
              <li key={step.name}>
                <span className="system-number">{step.number}</span>
                <strong>{step.name}</strong>
                <span>{step.detail}</span>
              </li>
            ))}
          </ol>
          <p className="system-note">
            Package mode uses <code>@nimjs/ui</code>. Copy mode uses canonical
            source through the local CLI and currently needs manual setup in
            external projects.
          </p>
        </section>

        <section className="tokens-section" aria-labelledby="tokens-title">
          <div className="site-container tokens-layout">
            <div className="tokens-copy">
              <p className="eyebrow">Design tokens</p>
              <h2 id="tokens-title">
                A visual language with a source of truth.
              </h2>
              <p>
                Primitive color values become semantic CSS variables. Components
                reference those roles, so the theme can change without rewriting
                component behavior.
              </p>
              <Link href="/docs/theming">
                Explore theming <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="tokens-specimen">
              <div className="tokens-specimen-header">
                <span>Semantic color / light</span>
                <span>4 roles</span>
              </div>
              <div className="swatch-grid">
                {swatches.map((swatch) => (
                  <div className="swatch-item" key={swatch.token}>
                    <span className={`swatch-color ${swatch.className}`} />
                    <span className="swatch-name">{swatch.name}</span>
                    <code>{swatch.token}</code>
                  </div>
                ))}
              </div>
              <div className="token-translation">
                <code>brand.violet</code>
                <span aria-hidden="true">→</span>
                <code>--primary</code>
                <span aria-hidden="true">→</span>
                <Button size="sm">Button</Button>
              </div>
            </div>
          </div>
        </section>

        <section
          className="developer-section site-container"
          aria-labelledby="developer-title"
        >
          <div className="developer-copy">
            <p className="eyebrow">Developer experience</p>
            <h2 id="developer-title">
              Start in the workspace. Grow with the system.
            </h2>
            <p>
              The packages are not published yet. Clone the repository to try
              the components today, then follow the installation guide for
              package and copy mode details.
            </p>
            <Link
              className={buttonVariants({ variant: 'outline', size: 'md' })}
              href="/docs/installation"
            >
              Installation guide <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="developer-code">
            <CodeBlock
              code={'pnpm install\npnpm dev'}
              label="Run the docs locally"
              language="bash"
            />
            <CodeBlock
              code={
                "import { Button } from '@nimjs/ui';\n\nexport function Example() {\n  return <Button>Continue</Button>;\n}"
              }
              label="Package-mode API after publication"
              language="tsx"
            />
          </div>
        </section>

        <section className="closing-section">
          <div className="site-container closing-inner">
            <div>
              <p className="eyebrow">Open source by design</p>
              <h2>Shape what comes next.</h2>
              <p>
                Four components today. A clear path for contributing, reviewing
                and growing the system.
              </p>
            </div>
            <div className="closing-links">
              <a
                className={buttonVariants({ variant: 'primary', size: 'lg' })}
                href="https://github.com/nimjs/ui"
                rel="noreferrer"
                target="_blank"
              >
                View on GitHub <span aria-hidden="true">↗</span>
              </a>
              <Link href="/docs/introduction">
                Read the docs <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="site-container footer-inner">
          <span>NimJS / UI</span>
          <span>Tokens. Components. Continuity.</span>
          <a
            href="https://github.com/nimjs/ui"
            rel="noreferrer"
            target="_blank"
          >
            GitHub ↗
          </a>
        </div>
      </footer>
    </>
  );
}
