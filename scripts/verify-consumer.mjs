import { execFileSync } from 'node:child_process';
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const temp = mkdtempSync(join(tmpdir(), 'nimjs-consumer-'));
const packs = join(temp, 'packs');
mkdirSync(packs);
const uiDependencies = JSON.parse(
  readFileSync(join(root, 'packages/ui/package.json')),
).dependencies;
const utilsDependencies = JSON.parse(
  readFileSync(join(root, 'packages/utils/package.json')),
).dependencies;
const componentNames = readdirSync(join(root, 'packages/registry/components'))
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.slice(0, -5))
  .sort();
const copyDependencies = new Set(
  componentNames.flatMap(
    (name) =>
      JSON.parse(
        readFileSync(
          join(root, 'packages/registry/components', name + '.json'),
        ),
      ).npmDependencies,
  ),
);

function run(cwd, command, ...args) {
  console.log(`\n${cwd}: ${command} ${args.join(' ')}`);
  execFileSync(command, args, { cwd, stdio: 'inherit' });
}

function capture(cwd, command, ...args) {
  return execFileSync(command, args, { cwd, encoding: 'utf8' }).trim();
}

function put(dir, name, content) {
  const target = join(dir, name);
  mkdirSync(resolve(target, '..'), { recursive: true });
  writeFileSync(target, content);
}

function packageTarball(name) {
  const manifest = JSON.parse(
    readFileSync(join(root, 'packages', name, 'package.json'), 'utf8'),
  );
  return join(packs, `nimjs-${name}-${manifest.version}.tgz`);
}

function fixture(mode) {
  const dir = join(temp, mode);
  const packageMode = mode === 'package';
  mkdirSync(dir);
  const dependencies = {
    react: '^19.0.0',
    'react-dom': '^19.0.0',
    tailwindcss: '^3.4.17',
    postcss: '^8.4.49',
    autoprefixer: '^10.4.20',
    typescript: '^5.7.2',
    '@types/react': '^19.0.2',
    '@types/react-dom': '^19.0.2',
    vite: '^6.0.0',
    tsx: '^4.0.0',
  };
  if (packageMode) {
    dependencies['@nimjs/ui'] = `file:${packageTarball('ui')}`;
    dependencies['@nimjs/tokens'] = `file:${packageTarball('tokens')}`;
  } else {
    dependencies['@nimjs/cli'] = `file:${packageTarball('cli')}`;
    for (const name of copyDependencies) {
      dependencies[name] = uiDependencies[name] ?? utilsDependencies[name];
      if (!dependencies[name])
        throw new Error(`No workspace version for ${name}`);
    }
  }
  put(
    dir,
    'package.json',
    JSON.stringify(
      {
        name: `nimjs-consumer-${mode}`,
        private: true,
        version: '1.0.0',
        type: 'module',
        packageManager: 'pnpm@9.15.4',
        dependencies,
        pnpm: {
          overrides: {
            '@nimjs/tokens': `file:${packageTarball('tokens')}`,
            '@nimjs/utils': `file:${packageTarball('utils')}`,
            '@nimjs/registry': `file:${packageTarball('registry')}`,
          },
        },
      },
      null,
      2,
    ) + '\n',
  );
  run(dir, 'pnpm', 'install');
  if (!packageMode) {
    run(dir, 'pnpm', 'exec', 'ui', 'init');
    const config = readFileSync(join(dir, 'ui.config.ts'), 'utf8');
    if (!config.includes("componentsDir: 'src/components/ui',\n")) {
      throw new Error('ui init wrote an invalid or unexpected config');
    }
    run(dir, 'pnpm', 'exec', 'ui', 'add', 'button', '--dry-run');
    for (const component of componentNames) {
      run(dir, 'pnpm', 'exec', 'ui', 'add', component);
      run(dir, 'pnpm', 'exec', 'ui', 'add', component);
    }
  }

  const imports = packageMode
    ? "import { Button, Input, Card, CardTitle, Badge } from '@nimjs/ui';"
    : `import { Button } from './components/ui/button/button';
import { Input } from './components/ui/input/input';
import { Card, CardTitle } from './components/ui/card/card';
import { Badge } from './components/ui/badge/badge';`;
  const ssrImports = imports.replaceAll("'./components/", "'./src/components/");
  const extraImports = packageMode
    ? "import { Field, FieldControl, FieldLabel, FieldDescription, FieldError, Textarea, Checkbox, Switch, Alert, AlertTitle, AlertDescription, Progress, Separator, Skeleton, Spinner, Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, Pagination, PaginationList, PaginationItem, PaginationLink, Select, RadioGroup, RadioGroupItem, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose, Avatar, AvatarFallback, AvatarImage, EmptyState, EmptyStateTitle, EmptyStateDescription, EmptyStateActions, Collapsible, CollapsibleTrigger, CollapsibleContent, Tabs, TabsList, TabsTrigger, TabsContent, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@nimjs/ui';"
    : `import { Field, FieldControl, FieldLabel, FieldDescription, FieldError } from './components/ui/field/field';
import { Textarea } from './components/ui/textarea/textarea';
import { Checkbox } from './components/ui/checkbox/checkbox';
import { Switch } from './components/ui/switch/switch';
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert/alert';
import { Progress } from './components/ui/progress/progress';
import { Separator } from './components/ui/separator/separator';
import { Skeleton } from './components/ui/skeleton/skeleton';
import { Spinner } from './components/ui/spinner/spinner';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './components/ui/breadcrumb/breadcrumb';
import { Pagination, PaginationList, PaginationItem, PaginationLink } from './components/ui/pagination/pagination';`;
  const formImports = packageMode
    ? ''
    : `import { Select } from './components/ui/select/select';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group/radio-group';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from './components/ui/dialog/dialog';`;
  const displayImports = packageMode
    ? ''
    : `import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar/avatar';
import { EmptyState, EmptyStateTitle, EmptyStateDescription, EmptyStateActions } from './components/ui/empty-state/empty-state';`;
  const disclosureImports = packageMode
    ? ''
    : `import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './components/ui/collapsible/collapsible';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion/accordion';`;
  put(
    dir,
    'src/extra.tsx',
    `${extraImports}
${formImports}
${displayImports}
${disclosureImports}
import { Input } from '${packageMode ? '@nimjs/ui' : './components/ui/input/input'}';
export const extra = <><Field description error invalid><FieldLabel>Email</FieldLabel><FieldControl><Input /></FieldControl><FieldDescription>Help</FieldDescription><FieldError>Error</FieldError></Field><Textarea aria-label="Note" /><Checkbox aria-label="Accept" /><Switch aria-label="Enable" /><Select aria-label="Region" defaultValue="eu"><option value="eu">Europe</option></Select><RadioGroup defaultValue="a"><legend>Plan</legend><RadioGroupItem value="a" aria-label="Basic" /></RadioGroup><Dialog><DialogTrigger>Open</DialogTrigger><DialogContent><DialogTitle>Dialog</DialogTitle><DialogDescription>Details</DialogDescription><DialogClose>Close</DialogClose></DialogContent></Dialog><Avatar aria-label="Ada"><AvatarFallback>AL</AvatarFallback><AvatarImage src="/avatar.png" alt="" /></Avatar><EmptyState><EmptyStateTitle>No results</EmptyStateTitle><EmptyStateDescription>Try another query.</EmptyStateDescription><EmptyStateActions><button>Clear</button></EmptyStateActions></EmptyState><Collapsible defaultOpen><CollapsibleTrigger>More</CollapsibleTrigger><CollapsibleContent>Details</CollapsibleContent></Collapsible><Tabs defaultValue="one"><TabsList aria-label="Views"><TabsTrigger value="one">One</TabsTrigger></TabsList><TabsContent value="one">Panel</TabsContent></Tabs><Accordion defaultValue="one"><AccordionItem value="one"><AccordionTrigger>Question</AccordionTrigger><AccordionContent>Answer</AccordionContent></AccordionItem></Accordion><Alert><AlertTitle>Saved</AlertTitle><AlertDescription>Ready</AlertDescription></Alert><Progress value={50} aria-label="Upload" /><Separator /><Skeleton className="h-4 w-8" /><Spinner /><Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Here</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb><Pagination><PaginationList><PaginationItem><PaginationLink href="?page=1" isCurrent>1</PaginationLink></PaginationItem></PaginationList></Pagination></>;\n`,
  );
  const cssImport = packageMode
    ? '@nimjs/tokens/styles.css'
    : './components/ui/_lib/tokens.css';
  put(
    dir,
    'index.html',
    '<div id="root"></div><script type="module" src="/src/main.tsx"></script>\n',
  );
  put(
    dir,
    'src/main.tsx',
    `import { createRoot } from 'react-dom/client';\n${imports}\nimport { extra } from './extra';\nimport './style.css';\ncreateRoot(document.getElementById('root')!).render(<main><Button>Continue</Button><Input aria-label="Name" /><Card><CardTitle>Title</CardTitle></Card><Badge>Preview</Badge>{extra}</main>);\n`,
  );
  put(
    dir,
    'src/style.css',
    `@import '${cssImport}';\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`,
  );
  put(
    dir,
    'ssr.tsx',
    `import React from 'react';\nimport { renderToString } from 'react-dom/server';\n${ssrImports}\nimport { extra } from './src/extra';\nconst html = renderToString(<main><Button disabled>Continue</Button><Input aria-label="Name" /><Card><CardTitle>Title</CardTitle></Card><Badge>Preview</Badge>{extra}</main>);\nif (!html.includes('<button') || !html.includes('disabled=""') || !html.includes('aria-label="Name"') || !html.includes('Preview')) throw new Error(html);\nconsole.log(html);\n`,
  );
  if (packageMode) {
    put(
      dir,
      'src/subpaths.tsx',
      `${componentNames.map((name) => `import * as component_${name.replaceAll('-', '')} from '@nimjs/ui/${name}';`).join('\n')}\nexport const components = [${componentNames.map((name) => 'component_' + name.replaceAll('-', '')).join(', ')}];\n`,
    );
  }
  put(
    dir,
    'tsconfig.json',
    JSON.stringify({
      compilerOptions: {
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'Bundler',
        jsx: 'react-jsx',
        strict: true,
        skipLibCheck: true,
        noEmit: true,
        lib: ['ES2022', 'DOM'],
        types: ['vite/client'],
      },
      include: ['src', 'ssr.tsx'],
    }),
  );
  put(
    dir,
    'postcss.config.cjs',
    'module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };\n',
  );
  put(
    dir,
    'tailwind.config.cjs',
    `module.exports = { content: ['./src/**/*.{ts,tsx}'${packageMode ? ", './node_modules/@nimjs/ui/dist/**/*.{js,mjs}'" : ''}], theme: { extend: { colors: Object.fromEntries(['background','foreground','card','card-foreground','muted','muted-foreground','border','input','primary','primary-foreground','secondary','secondary-foreground','accent','accent-foreground','ring','destructive','destructive-foreground'].map(name => [name, 'var(--' + name + ')'])) } } };\n`,
  );
  run(dir, 'pnpm', 'exec', 'tsc', '--noEmit');
  const html = capture(dir, 'pnpm', 'exec', 'tsx', 'ssr.tsx');
  if (packageMode) {
    run(
      dir,
      'node',
      '-e',
      `for (const name of ${JSON.stringify(componentNames)}) if (!require('@nimjs/ui/' + name)) throw new Error(name)`,
    );
  }
  run(dir, 'pnpm', 'exec', 'vite', 'build');
  const cssFile = readdirSync(join(dir, 'dist', 'assets')).find((name) =>
    name.endsWith('.css'),
  );
  if (!cssFile) throw new Error('No consumer CSS emitted');
  const css = readFileSync(join(dir, 'dist', 'assets', cssFile), 'utf8');
  if (
    !css.includes('.bg-primary') ||
    !css.includes('.bg-card') ||
    !css.includes('.border-input') ||
    !css.includes('--primary:')
  ) {
    throw new Error(
      'Consumer CSS is missing the Button class or semantic token',
    );
  }
  if (packageMode) {
    put(
      dir,
      'src/style.css',
      `@import '@nimjs/ui/styles.css';\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`,
    );
    run(dir, 'pnpm', 'exec', 'vite', 'build');
  }
  return html;
}

function verifyArchive(name) {
  const archive = packageTarball(name);
  const entries = capture(root, 'tar', '-tzf', archive).split('\n');
  const manifest = JSON.parse(
    readFileSync(join(root, 'packages', name, 'package.json')),
  );
  const required = [
    'package/package.json',
    'package/README.md',
    'package/LICENSE',
  ];
  for (const target of Object.values(manifest.exports ?? {})) {
    for (const path of Object.values(
      typeof target === 'string' ? { default: target } : target,
    )) {
      required.push(`package/${path.slice(2)}`);
    }
  }
  for (const path of Object.values(manifest.bin ?? {})) {
    required.push(`package/${path.slice(2)}`);
  }
  for (const path of required) {
    if (!entries.includes(path))
      throw new Error(`${name} archive lacks ${path}`);
  }
  for (const path of entries) {
    const allowed =
      required.includes(path) ||
      (path.startsWith('package/dist/') &&
        !/\.(?:map|test\.[cm]?[jt]sx?|spec\.[cm]?[jt]sx?)$/.test(path)) ||
      (name === 'registry' &&
        /^package\/components\/[a-z][a-z0-9-]*\.json$/.test(path));
    if (!allowed) {
      throw new Error(`${name} archive contains unwanted file: ${path}`);
    }
  }
}

try {
  run(
    root,
    'pnpm',
    'turbo',
    'run',
    'build',
    '--filter=@nimjs/ui',
    '--filter=@nimjs/cli',
  );
  for (const name of ['tokens', 'utils', 'ui', 'registry', 'cli']) {
    if (
      readFileSync(join(root, 'packages', name, 'LICENSE'), 'utf8') !==
      readFileSync(join(root, 'LICENSE'), 'utf8')
    ) {
      throw new Error(`${name} LICENSE differs from the repository license`);
    }
    run(
      root,
      'pnpm',
      '--dir',
      `packages/${name}`,
      'pack',
      '--pack-destination',
      packs,
    );
    verifyArchive(name);
  }
  const packageHtml = fixture('package');
  const copyHtml = fixture('copy');
  if (packageHtml !== copyHtml) {
    throw new Error(
      'Package and copy mode produce different server-rendered markup',
    );
  }
  console.log(`\nExternal consumer verification passed. Fixtures: ${temp}`);
} catch (error) {
  console.error(
    `\nExternal consumer verification failed. Inspect fixtures: ${temp}`,
  );
  throw error;
}
