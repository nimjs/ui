import { copyFileSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const cliRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packagesRoot = resolve(cliRoot, '..');
const manifests = join(packagesRoot, 'registry', 'components');
const assets = join(cliRoot, 'dist', 'assets');

for (const entry of readdirSync(manifests).filter((name) =>
  name.endsWith('.json'),
)) {
  const manifest = JSON.parse(readFileSync(join(manifests, entry), 'utf8'));
  if (
    manifest.schemaVersion !== 1 ||
    !/^[a-z][a-z0-9-]*$/.test(manifest.name)
  ) {
    throw new Error(`Invalid registry manifest: ${entry}`);
  }

  for (const file of manifest.files) {
    if (!/^[a-z][a-z0-9-]*\.tsx$/.test(file)) {
      throw new Error(`Invalid component source path: ${file}`);
    }
    const source = join(
      packagesRoot,
      'ui',
      'src',
      'components',
      manifest.name,
      file,
    );
    const destination = join(assets, 'components', manifest.name, file);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(source, destination);
  }
}

mkdirSync(assets, { recursive: true });
copyFileSync(
  join(packagesRoot, 'utils', 'src', 'cn.ts'),
  join(assets, 'cn.ts'),
);
copyFileSync(
  join(packagesRoot, 'tokens', 'src', 'css', 'variables.css'),
  join(assets, 'tokens.css'),
);
