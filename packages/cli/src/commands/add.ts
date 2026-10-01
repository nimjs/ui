import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, relative } from 'node:path';

import type { RegistryComponentName } from '@nimjs/registry';

import { resolveConfig } from '../config/resolve-config';
import { error, log } from '../lib/output';
import {
  describeRegistryComponent,
  listAvailableComponents,
  loadRegistryComponent,
  resolveRegistryDependencies,
} from '../registry/loader';

import { createAddPlan } from './add-plan';

export async function runAdd(
  cwd: string,
  componentName?: string,
  options: { dryRun?: boolean } = {},
) {
  if (!componentName) {
    error('Missing component name. Example: ui add button');
    process.exitCode = 1;
    return;
  }

  const availableComponents = listAvailableComponents();
  const componentNames = availableComponents.map((component) => component.name);

  if (!componentNames.includes(componentName as RegistryComponentName)) {
    error(
      `Unknown component "${componentName}". Available: ${componentNames.join(', ')}`,
    );
    process.exitCode = 1;
    return;
  }

  const manifest = loadRegistryComponent(
    componentName as RegistryComponentName,
  );
  const resolvedDependencies = resolveRegistryDependencies(
    componentName as RegistryComponentName,
  );
  const config = await resolveConfig(cwd);
  const plan = createAddPlan(cwd, manifest, config);
  const summary = describeRegistryComponent(manifest, resolvedDependencies);

  log(
    options.dryRun ? `Plan for ${componentName}:` : `Adding ${componentName}:`,
  );
  for (const file of plan.files) {
    log(`  ${file.action}: ${relative(plan.projectRoot, file.destination)}`);
  }
  log(`npm dependencies: ${plan.npmDependencies.join(', ') || 'none'}`);
  log(`Registry dependencies: ${summary.dependencies}`);
  log(`Tokens: ${summary.tokens}`);

  if (options.dryRun) {
    return;
  }

  for (const file of plan.files) {
    if (file.action === 'create') {
      mkdirSync(dirname(file.destination), { recursive: true });
      writeFileSync(file.destination, file.content, { flag: 'wx' });
    }
  }

  log(
    plan.files.some((file) => file.action === 'create')
      ? `Added ${componentName} from the local registry.`
      : `${componentName} is already up to date.`,
  );
  log(
    'Next: install the listed npm dependencies and configure Tailwind semantic colors.',
  );

  if (config.tokens && manifest.dependencies.includes('tokens')) {
    log('Import _lib/tokens.css once in your application stylesheet.');
  }

  if (!config.tokens && manifest.dependencies.includes('tokens')) {
    log(
      'Warning: tokens are disabled; provide the semantic CSS variables yourself.',
    );
  }
}
