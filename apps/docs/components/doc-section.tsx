import { CodeBlock } from './code-block';

import type { DocSection as DocSectionContent } from '@/content/types';

export function DocSection({ section }: { section: DocSectionContent }) {
  return (
    <section className="doc-section">
      <h2>{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p className="doc-paragraph" key={paragraph}>
          {paragraph}
        </p>
      ))}
      {section.list ? (
        <ul className="doc-list">
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
