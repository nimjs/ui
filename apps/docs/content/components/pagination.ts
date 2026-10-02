import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Pagination',
  description:
    'Use actual URLs for each page. Data fetching and total-page calculations belong to the application.',
  registry: 'pagination',
});

export const paginationPage = createComponentPage(meta, {
  slug: 'pagination',
  eyebrow: 'Component',
  preview: 'pagination',
  code: 'import { Pagination, PaginationList, PaginationItem, PaginationLink } from \'@nimjs/ui\';\n\nexport function Example() {\n  return (\n    <Pagination><PaginationList><PaginationItem><PaginationLink href="?page=1">1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="?page=2" isCurrent>2</PaginationLink></PaginationItem></PaginationList></Pagination>\n  );\n}',
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Use actual URLs for each page. Data fetching and total-page calculations belong to the application.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'A named nav contains links. Set isCurrent on exactly one page and keep link labels understandable.',
      ],
    },
  ],
});
