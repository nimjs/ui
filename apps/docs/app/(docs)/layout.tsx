import type { ReactNode } from 'react';

import { DocsSidebar } from '@/components/docs-sidebar';
import { SiteHeader } from '@/components/site-header';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="docs-root">
      <SiteHeader />
      <div className="site-container docs-layout">
        <aside className="docs-sidebar">
          <DocsSidebar />
        </aside>
        <details className="docs-mobile-menu">
          <summary>
            Browse documentation <span aria-hidden="true">⌄</span>
          </summary>
          <DocsSidebar mobile />
        </details>
        <main className="docs-main">{children}</main>
      </div>
    </div>
  );
}
