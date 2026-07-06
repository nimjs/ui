'use client';

import { cn } from '@nimjs/utils';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  label?: string;
}

export function CodeBlock({
  code,
  language = 'tsx',
  label = 'Code',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-border bg-[var(--color-neutral-900)] text-[var(--color-neutral-white)] shadow-soft">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/70">
        <span>
          {label} · {language}
        </span>
        <button
          className={cn(
            'rounded-full border px-3 py-1 font-medium transition-colors',
            copied
              ? 'border-transparent bg-white text-[var(--color-brand-deep)]'
              : 'border-white/15 text-white hover:bg-white/10',
          )}
          onClick={handleCopy}
          type="button"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
