import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link className="flex items-center gap-3 font-semibold" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            N
          </span>
          UI
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link className="hover:text-foreground" href="/docs">
            Docs
          </Link>
          <Link className="hover:text-foreground" href="/components">
            Components
          </Link>
          <Link className="hover:text-foreground" href="/docs/theming">
            Theming
          </Link>
        </nav>
      </div>
    </header>
  );
}
