import type { DocPage } from '../types';

export const installationPage: DocPage = {
  slug: 'installation',
  title: 'Installation',
  description:
    'NimJS UI packages are not publicly released. Evaluate package mode and copy mode from packed local artifacts in an external React 19 and Tailwind 3 project.',
  eyebrow: 'Getting Started',
  sections: [
    {
      title: 'Start with the consumer cookbook',
      paragraphs: [
        'The repository consumer setup guide contains the tested pack commands, local dependency overrides, Tailwind mapping, CSS paths, and troubleshooting steps. Use it before either example below.',
        'Workspace development is a separate flow: use Node 20.11+, pnpm 9.15.4, pnpm install, and pnpm dev from the NimJS UI repository root to run this site.',
      ],
      link: {
        href: 'https://github.com/nimjs/ui/blob/main/docs/consumer-setup.md',
        label: 'Open the consumer setup guide',
      },
    },
    {
      title: 'Package mode',
      paragraphs: [
        'After installing the packed @nimjs/ui and @nimjs/tokens artifacts and their local dependencies, import token CSS once. Configure Tailwind 3 to scan @nimjs/ui/dist and map semantic colors to CSS variables as shown in the consumer cookbook.',
        'The package ships class names, not compiled component CSS. React and React DOM 19 are peer requirements. Public imports are the package root and explicit component subpaths.',
      ],
      codeBlocks: [
        {
          label: 'Global CSS',
          language: 'css',
          code: `@import '@nimjs/tokens/styles.css';\n@tailwind base;\n@tailwind components;\n@tailwind utilities;`,
        },
        {
          label: 'Component usage',
          language: 'tsx',
          code: `import { Button } from '@nimjs/ui';\n\nexport function Example() {\n  return <Button>Continue</Button>;\n}`,
        },
      ],
    },
    {
      title: 'Copy mode',
      paragraphs: [
        'After installing packed @nimjs/cli and @nimjs/registry artifacts, init creates ui.config.ts, and add copies canonical source plus a local cn helper and token CSS. The copied files belong to the application; package upgrades do not update them.',
        'The CLI reports npm dependencies and refuses to overwrite edited files. Install the reported packages, import the copied CSS, and configure Tailwind 3 manually. The consumer cookbook has the complete sequence.',
      ],
      codeBlocks: [
        {
          label: 'Copy Button after packed CLI setup',
          language: 'bash',
          code: `pnpm exec ui init\npnpm exec ui add button --dry-run\npnpm exec ui add button\npnpm add class-variance-authority@^0.7.1 clsx@^2.1.1 tailwind-merge@^2.6.0`,
        },
        {
          label: 'Local import',
          language: 'tsx',
          code: `import { Button } from './components/ui/button/button';`,
        },
      ],
    },
  ],
};
