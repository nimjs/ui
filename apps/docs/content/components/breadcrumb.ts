import { createComponentPage, defineComponentMeta } from '../types';

export const meta = defineComponentMeta({
  title: 'Breadcrumb',
  description:
    'Use actual links for ancestors and BreadcrumbPage for the current location.',
  registry: 'breadcrumb',
});

export const breadcrumbPage = createComponentPage(meta, {
  slug: 'breadcrumb',
  eyebrow: 'Component',
  preview: 'breadcrumb',
  code: 'import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from \'@nimjs/ui\';\n\nexport function Example() {\n  return (\n    <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Settings</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>\n  );\n}',
  sections: [
    {
      title: 'API and states',
      paragraphs: [
        'Use actual links for ancestors and BreadcrumbPage for the current location.',
      ],
    },
    {
      title: 'Accessibility',
      paragraphs: [
        'A named nav contains an ordered list; the current page exposes aria-current="page".',
      ],
    },
  ],
});
