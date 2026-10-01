import { existsSync, lstatSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  isSystemDependency,
  type RegistryComponentManifest,
} from '@nimjs/registry';

import type { UiResolvedConfig } from '../config/types';

export interface PlannedFile {
  destination: string;
  content: string;
  action: 'create' | 'skip';
}

export interface AddPlan {
  files: PlannedFile[];
  npmDependencies: string[];
  projectRoot: string;
}

function assetPaths() {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  const packagedAssets = join(currentDirectory, 'assets');

  if (existsSync(packagedAssets)) {
    return {
      components: join(packagedAssets, 'components'),
      utils: join(packagedAssets, 'cn.ts'),
      tokens: join(packagedAssets, 'tokens.css'),
    };
  }

  // Vitest loads this module from source; the published CLI uses packaged assets.
  return {
    components: resolve(currentDirectory, '../../../ui/src/components'),
    utils: resolve(currentDirectory, '../../../utils/src/cn.ts'),
    tokens: resolve(currentDirectory, '../../../tokens/src/css/variables.css'),
  };
}

function assertInsideProject(projectRoot: string, destination: string) {
  const pathFromRoot = relative(projectRoot, destination);

  if (
    pathFromRoot === '' ||
    pathFromRoot === '..' ||
    pathFromRoot.startsWith(`..${sep}`) ||
    isAbsolute(pathFromRoot)
  ) {
    throw new Error(`Refusing to write outside project root: ${destination}`);
  }

  let path = destination;
  while (path !== projectRoot) {
    if (lstatSync(path, { throwIfNoEntry: false })?.isSymbolicLink()) {
      throw new Error(`Refusing to follow a symbolic link: ${path}`);
    }
    path = dirname(path);
  }
}

function planFile(
  projectRoot: string,
  destination: string,
  content: string,
): PlannedFile {
  assertInsideProject(projectRoot, destination);
  const existing = lstatSync(destination, { throwIfNoEntry: false });

  if (existing) {
    if (!existing.isFile() || readFileSync(destination, 'utf8') !== content) {
      throw new Error(
        `File already exists with different content: ${destination}`,
      );
    }
    return { action: 'skip', content, destination };
  }

  return { action: 'create', content, destination };
}

export function createAddPlan(
  cwd: string,
  manifest: RegistryComponentManifest,
  config: UiResolvedConfig,
): AddPlan {
  const projectRoot = realpathSync(cwd);

  const componentDependencies = manifest.dependencies.filter(
    (dependency) => !isSystemDependency(dependency),
  );
  if (componentDependencies.length > 0) {
    throw new Error(
      `Cannot copy ${manifest.name}: component dependencies are not supported yet (${componentDependencies.join(', ')}).`,
    );
  }

  if (isAbsolute(config.componentsDir)) {
    throw new Error('"componentsDir" must be relative to the project root.');
  }

  const componentsDir = resolve(projectRoot, config.componentsDir);
  assertInsideProject(projectRoot, componentsDir);

  const assets = assetPaths();
  const files: PlannedFile[] = [];

  if (manifest.dependencies.includes('utils')) {
    files.push(
      planFile(
        projectRoot,
        join(componentsDir, '_lib', 'cn.ts'),
        readFileSync(assets.utils, 'utf8'),
      ),
    );
  }

  if (config.tokens && manifest.dependencies.includes('tokens')) {
    files.push(
      planFile(
        projectRoot,
        join(componentsDir, '_lib', 'tokens.css'),
        readFileSync(assets.tokens, 'utf8'),
      ),
    );
  }

  for (const fileName of manifest.files) {
    const source = readFileSync(
      join(assets.components, manifest.name, fileName),
      'utf8',
    );
    if (
      manifest.dependencies.includes('utils') &&
      !source.includes("from '@nimjs/utils'")
    ) {
      throw new Error(
        `Missing canonical utility import in ${manifest.name}/${fileName}.`,
      );
    }
    const content = source.replaceAll(
      "from '@nimjs/utils'",
      "from '../_lib/cn'",
    );
    if (content.includes("from '@nimjs/")) {
      throw new Error(
        `Unresolved package import in ${manifest.name}/${fileName}.`,
      );
    }
    files.push(
      planFile(
        projectRoot,
        join(componentsDir, manifest.name, fileName),
        content,
      ),
    );
  }

  return {
    files,
    npmDependencies: manifest.npmDependencies ?? [],
    projectRoot,
  };
}
