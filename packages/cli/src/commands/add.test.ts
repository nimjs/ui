import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getRegistryComponent, listRegistryComponents } from '@nimjs/registry';
import { afterEach, describe, expect, it } from 'vitest';

import { defaultConfig } from '../config/resolve-config';

import { runAdd } from './add';
import { createAddPlan } from './add-plan';

const temporaryDirectories: string[] = [];

function temporaryProject() {
  const path = mkdtempSync(join(tmpdir(), 'nimjs-ui-cli-'));
  temporaryDirectories.push(path);
  return path;
}

afterEach(() => {
  for (const path of temporaryDirectories.splice(0)) {
    rmSync(path, { force: true, recursive: true });
  }
});

describe('add plan', () => {
  it('uses canonical source for every registered component', () => {
    const project = temporaryProject();
    const componentRoot = resolve(
      dirname(fileURLToPath(import.meta.url)),
      '../../../ui/src/components',
    );

    for (const manifest of listRegistryComponents()) {
      const plan = createAddPlan(project, manifest, defaultConfig);
      for (const fileName of manifest.files) {
        const source = readFileSync(
          join(componentRoot, manifest.name, fileName),
          'utf8',
        );
        const copied = plan.files.find((file) =>
          file.destination.endsWith(`/${manifest.name}/${fileName}`),
        );
        expect(copied?.content).toBe(
          source.replaceAll("from '@nimjs/utils'", "from '../_lib/cn'"),
        );
      }
    }
  });

  it('copies canonical Button source and is safe to repeat', async () => {
    const project = temporaryProject();
    const plan = createAddPlan(
      project,
      getRegistryComponent('button'),
      defaultConfig,
    );
    const button = plan.files.find((file) =>
      file.destination.endsWith('/button/button.tsx'),
    );
    const canonical = readFileSync(
      resolve(
        dirname(fileURLToPath(import.meta.url)),
        '../../../ui/src/components/button/button.tsx',
      ),
      'utf8',
    );

    expect(button?.content).toBe(
      canonical.replaceAll("from '@nimjs/utils'", "from '../_lib/cn'"),
    );
    expect(plan.npmDependencies).toContain('class-variance-authority');

    await runAdd(project, 'button', { dryRun: true });
    expect(existsSync(join(project, 'src'))).toBe(false);

    await runAdd(project, 'button');
    expect(readFileSync(button!.destination, 'utf8')).toBe(button!.content);
    expect(
      createAddPlan(
        project,
        getRegistryComponent('button'),
        defaultConfig,
      ).files.every((file) => file.action === 'skip'),
    ).toBe(true);
  });

  it('rejects a collision before writing any shared files', () => {
    const project = temporaryProject();
    const destination = join(project, 'src/components/ui/button/button.tsx');
    mkdirSync(join(project, 'src/components/ui/button'), { recursive: true });
    writeFileSync(destination, 'custom source');

    expect(() =>
      createAddPlan(project, getRegistryComponent('button'), defaultConfig),
    ).toThrow('different content');
    expect(existsSync(join(project, 'src/components/ui/_lib'))).toBe(false);
  });

  it('rejects destinations outside the project and linked directories', () => {
    const project = temporaryProject();
    const outside = temporaryProject();
    const manifest = getRegistryComponent('button');

    expect(() =>
      createAddPlan(project, manifest, {
        ...defaultConfig,
        componentsDir: '../outside',
      }),
    ).toThrow('outside project root');

    mkdirSync(join(project, 'src/components'), { recursive: true });
    symlinkSync(outside, join(project, 'src/components/ui'));
    expect(() => createAddPlan(project, manifest, defaultConfig)).toThrow(
      'symbolic link',
    );
  });
});
