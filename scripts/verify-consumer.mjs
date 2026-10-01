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

function run(cwd, command, ...args) {
  console.log(`\n${cwd}: ${command} ${args.join(' ')}`);
  execFileSync(command, args, { cwd, stdio: 'inherit' });
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
    dependencies['class-variance-authority'] = '^0.7.1';
    dependencies.clsx = '^2.1.1';
    dependencies['tailwind-merge'] = '^2.6.0';
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
    run(dir, 'pnpm', 'exec', 'ui', 'add', 'button');
    run(dir, 'pnpm', 'exec', 'ui', 'add', 'button');
  }

  const buttonImport = packageMode
    ? '@nimjs/ui'
    : './components/ui/button/button';
  const ssrImport = packageMode
    ? '@nimjs/ui/button'
    : './src/components/ui/button/button';
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
    `import { createRoot } from 'react-dom/client';\nimport { Button } from '${buttonImport}';\nimport './style.css';\ncreateRoot(document.getElementById('root')!).render(<Button>Continue</Button>);\n`,
  );
  put(
    dir,
    'src/style.css',
    `@import '${cssImport}';\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`,
  );
  put(
    dir,
    'ssr.tsx',
    `import React from 'react';\nimport { renderToString } from 'react-dom/server';\nimport { Button } from '${ssrImport}';\nconst html = renderToString(<Button>Continue</Button>);\nif (!html.includes('<button') || !html.includes('Continue')) throw new Error(html);\n`,
  );
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
    `module.exports = { content: ['./src/**/*.{ts,tsx}'${packageMode ? ", './node_modules/@nimjs/ui/dist/**/*.{js,mjs}'" : ''}], theme: { extend: { colors: { primary: 'var(--primary)', 'primary-foreground': 'var(--primary-foreground)', ring: 'var(--ring)' } } } };\n`,
  );
  run(dir, 'pnpm', 'exec', 'tsc', '--noEmit');
  run(dir, 'pnpm', 'exec', 'tsx', 'ssr.tsx');
  run(dir, 'pnpm', 'exec', 'vite', 'build');
  const cssFile = readdirSync(join(dir, 'dist', 'assets')).find((name) =>
    name.endsWith('.css'),
  );
  if (!cssFile) throw new Error('No consumer CSS emitted');
  const css = readFileSync(join(dir, 'dist', 'assets', cssFile), 'utf8');
  if (!css.includes('.bg-primary') || !css.includes('--primary:')) {
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
    const entries = execFileSync('tar', ['-tzf', packageTarball(name)], {
      encoding: 'utf8',
    });
    if (!entries.includes('package/LICENSE'))
      throw new Error(`${name} tarball lacks LICENSE`);
  }
  fixture('package');
  fixture('copy');
  console.log(`\nExternal consumer verification passed. Fixtures: ${temp}`);
} catch (error) {
  console.error(
    `\nExternal consumer verification failed. Inspect fixtures: ${temp}`,
  );
  throw error;
}
