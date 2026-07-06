import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  buttonVariants,
} from '@nimjs/ui';
import { cn } from '@nimjs/utils';
import Link from 'next/link';

const pillars = [
  {
    title: 'Tokens First',
    description:
      'A dedicated tokens package maps brand colors into semantic CSS variables and keeps them usable across apps and libraries.',
  },
  {
    title: 'Composable UI',
    description:
      'React components stay small, SSR-safe, tree-shaking friendly, and easy to contribute to without hidden abstractions.',
  },
  {
    title: 'Open-Source Ready',
    description:
      'Governance, release discipline, issue templates, and CI/CD are part of the product baseline instead of afterthoughts.',
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-16 pt-8 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-border bg-white/80 px-4 py-3 shadow-soft backdrop-blur">
          <Link className="flex items-center gap-3 font-semibold" href="/">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              N
            </span>
            UI
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/docs/introduction">Docs</Link>
            <Link href="/components">Components</Link>
            <Link href="/docs/theming">Theming</Link>
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-14 py-20 lg:grid-cols-[1.25fr_0.95fr]">
          <div className="space-y-8">
            <Badge
              className="border-transparent bg-[color:rgba(180,25,2,0.08)] text-[var(--color-brand-deep)]"
              variant="outline"
            >
              Open-source UI ecosystem foundation
            </Badge>
            <div className="space-y-5">
              <p className="font-display text-5xl font-semibold leading-[1.02] text-foreground md:text-7xl">
                A modern design system monorepo built for scale and stewardship.
              </p>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                UI separates tokens, components, docs, and release mechanics so
                contributors can move quickly without sacrificing product rigor.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                className={buttonVariants({ variant: 'primary', size: 'md' })}
                href="/docs/introduction"
              >
                Read the docs
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'md' }),
                  'bg-white',
                )}
                href="/components"
              >
                Browse components
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {pillars.map((pillar) => (
                <Card
                  key={pillar.title}
                  className="border-border bg-white/90 shadow-soft backdrop-blur"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-muted-foreground">
                    {pillar.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-hero-radial blur-3xl" />
            <Card className="relative overflow-hidden border-border bg-white/95 shadow-soft">
              <CardHeader className="border-b border-border bg-[linear-gradient(135deg,rgba(180,25,2,0.06),rgba(133,69,8,0.08))]">
                <CardTitle className="font-display text-2xl">
                  Docs experience
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 p-6">
                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-brand-red-strong)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-brand-amber)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-neutral-300)]" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 w-3/4 rounded-full bg-muted" />
                    <div className="h-3 w-2/3 rounded-full bg-muted" />
                    <div className="h-20 rounded-2xl border border-border bg-white p-4">
                      <div className="mb-3 h-3 w-24 rounded-full bg-[color:rgba(180,25,2,0.12)]" />
                      <div className="flex gap-3">
                        <div className="h-10 w-24 rounded-md bg-primary" />
                        <div className="h-10 w-24 rounded-md border border-border bg-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-accent p-4 text-sm text-accent-foreground">
                    Token-driven theming with semantic CSS variables.
                  </div>
                  <div className="rounded-xl border border-border bg-white p-4 text-sm text-muted-foreground">
                    Changesets, CI, and governance included from day one.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
