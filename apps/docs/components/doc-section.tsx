import { CodeBlock } from './code-block';

import type { DocSection as DocSectionContent } from '@/content/types';

export function DocSection({ section }: { section: DocSectionContent }) {
  return (
    <section className="space-y-5">
      <h2 className="font-display text-3xl font-semibold">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p
          className="text-base leading-8 text-muted-foreground"
          key={paragraph}
        >
          {paragraph}
        </p>
      ))}
      {section.list ? (
        <ul className="space-y-2 pl-5 text-base leading-8 text-muted-foreground">
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.codeBlocks?.map((block) => (
        <CodeBlock
          code={block.code}
          key={block.label}
          label={block.label}
          language={block.language}
        />
      ))}
    </section>
  );
}
