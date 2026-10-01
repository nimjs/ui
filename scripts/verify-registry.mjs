import { existsSync, readFileSync, readdirSync, realpathSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { listRegistryComponents } from '../packages/registry/dist/index.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryRoot = join(root, 'packages/registry');
const componentsRoot = join(root, 'packages/ui/src/components');
const uiPackage = JSON.parse(
  readFileSync(join(root, 'packages/ui/package.json')),
);
const uiIndex = readFileSync(join(root, 'packages/ui/src/index.ts'), 'utf8');
const tokenCss = readFileSync(
  join(root, 'packages/tokens/src/css/variables.css'),
  'utf8',
);
const utilsSource = readFileSync(
  join(root, 'packages/utils/src/cn.ts'),
  'utf8',
);
const uiRuntimeDependencies = uiPackage.dependencies;
const utilsRuntimeDependencies = JSON.parse(
  readFileSync(join(root, 'packages/utils/package.json')),
).dependencies;
const manifests = listRegistryComponents();
const names = new Set(manifests.map((manifest) => manifest.name));
const files = readdirSync(join(registryRoot, 'components')).filter((file) =>
  file.endsWith('.json'),
);

function fail(message) {
  throw new Error(`Registry validation: ${message}`);
}

if (names.size !== manifests.length || files.length !== manifests.length) {
  fail('manifest names or JSON file count do not match the registry loader');
}

for (const manifest of manifests) {
  const jsonFile = `${manifest.name}.json`;
  if (!files.includes(jsonFile)) fail(`missing ${jsonFile}`);
  const json = JSON.parse(
    readFileSync(join(registryRoot, 'components', jsonFile)),
  );
  if (
    JSON.stringify(Object.keys(json).sort()) !==
      JSON.stringify(Object.keys(manifest).sort()) ||
    Object.keys(json).some(
      (key) => JSON.stringify(json[key]) !== JSON.stringify(manifest[key]),
    )
  ) {
    fail(`${jsonFile} differs from the validated loader output`);
  }
  if (!uiPackage.exports[`./${manifest.name}`]) {
    fail(`${manifest.name} lacks an explicit @nimjs/ui export`);
  }
  if (!uiIndex.includes(`from './components/${manifest.name}'`)) {
    fail(`${manifest.name} is missing from the UI root index`);
  }
  if (!existsSync(join(componentsRoot, manifest.name, 'index.ts'))) {
    fail(`${manifest.name} lacks a component index`);
  }
  const sourceImports = new Set();
  for (const file of manifest.files) {
    const sourcePath = join(componentsRoot, manifest.name, file);
    if (
      !existsSync(sourcePath) ||
      !realpathSync(sourcePath).startsWith(
        `${realpathSync(componentsRoot)}${sep}`,
      )
    ) {
      fail(`${manifest.name}/${file} is missing or leaves canonical source`);
    }
    for (const match of readFileSync(sourcePath, 'utf8').matchAll(
      /\bfrom\s+['"]([^'"]+)['"]/g,
    )) {
      sourceImports.add(match[1]);
    }
  }
  if (manifest.dependencies.includes('utils')) {
    if (!sourceImports.has('@nimjs/utils')) {
      fail(`${manifest.name} declares utils without importing it`);
    }
    for (const match of utilsSource.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g)) {
      sourceImports.add(match[1]);
    }
  }
  const requiredNpmDependencies = [...sourceImports].filter(
    (name) =>
      !name.startsWith('.') && name !== 'react' && name !== '@nimjs/utils',
  );
  for (const dependency of requiredNpmDependencies) {
    if (!manifest.npmDependencies.includes(dependency)) {
      fail(
        `${manifest.name} does not declare imported npm dependency ${dependency}`,
      );
    }
  }
  for (const dependency of manifest.npmDependencies) {
    if (
      !requiredNpmDependencies.includes(dependency) ||
      !(
        dependency in uiRuntimeDependencies ||
        dependency in utilsRuntimeDependencies
      )
    ) {
      fail(
        `${manifest.name} declares unused or unknown npm dependency ${dependency}`,
      );
    }
  }
  for (const dependency of manifest.dependencies) {
    if (names.has(dependency)) {
      fail(
        `${manifest.name} depends on ${dependency}; CLI cannot copy component dependencies yet`,
      );
    }
  }
  for (const token of manifest.tokens) {
    if (
      !tokenCss.includes(`--${token}:`) &&
      !tokenCss.includes(`--${token}-`)
    ) {
      fail(`${manifest.name} references undefined token --${token}`);
    }
  }
}

console.log(
  `Validated ${manifests.length} registry manifests, source paths, exports, and tokens.`,
);
