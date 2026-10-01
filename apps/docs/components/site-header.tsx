'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { BrandMark } from './brand-mark';

const links = [
  { href: '/docs', label: 'Docs' },
  { href: '/components', label: 'Components' },
  { href: '/docs/theming', label: 'Theming' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (mobileMenuRef.current) mobileMenuRef.current.open = false;
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link aria-label="NimJS UI home" className="brand-lockup" href="/">
          <BrandMark className="brand-symbol" />
          <span>
            NimJS <span className="brand-slash">/</span> UI
          </span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/nimjs/ui"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </nav>
        <Link className="header-action" href="/docs/introduction">
          Get started <span aria-hidden="true">↗</span>
        </Link>
        <details className="mobile-navigation" ref={mobileMenuRef}>
          <summary aria-label="Menu">
            <span />
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/nimjs/ui"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <Link href="/docs/introduction">Get started</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
