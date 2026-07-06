'use client';

import { cn } from '@nimjs/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationGroups } from '@/content/navigation';

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-72 shrink-0 overflow-y-auto pr-4 lg:block">
      <nav className="space-y-8">
        {navigationGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-red)]">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    className={cn(
                      'block rounded-md px-3 py-2 text-sm transition-colors',
                      active
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                    href={item.href}
                    key={item.href}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
