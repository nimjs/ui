'use client';

import { cn } from '@nimjs/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { navigationGroups } from '@/content/navigation';

export function DocsSidebar({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    if (mobile) {
      document
        .querySelector<HTMLDetailsElement>('.docs-mobile-menu')
        ?.removeAttribute('open');
    }
  }, [mobile, pathname]);

  return (
    <nav aria-label="Documentation" className="docs-navigation">
      {navigationGroups.map((group) => (
        <div className="docs-navigation-group" key={group.title}>
          <p className="docs-navigation-label">{group.title}</p>
          <div className="docs-navigation-items">
            {group.items.map((item) => {
              const active = pathname.replace(/\/$/, '') === item.href;

              return (
                <Link
                  className={cn('docs-navigation-link', active && 'is-active')}
                  href={item.href}
                  key={item.href}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
