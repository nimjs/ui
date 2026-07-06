import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { RegistryComponentName } from '@nim-ui/registry';

import { resolveConfig } from '../config/resolve-config';
import { error, log } from '../lib/output';
import {
  describeRegistryComponent,
  listAvailableComponents,
  loadRegistryComponent,
  resolveRegistryDependencies,
} from '../registry/loader';

function resolveTemplateRoot() {
  const currentFile = fileURLToPath(import.meta.url);
  const distTemplates = join(dirname(currentFile), '..', 'templates');

  if (existsSync(distTemplates)) {
    return distTemplates;
  }

  return join(dirname(currentFile), '..', '..', 'src', 'templates');
}

function renderTemplate(templatePath: string) {
  return readFileSync(templatePath, 'utf8');
}

export async function runAdd(cwd: string, componentName?: string) {
  if (!componentName) {
    error('Missing component name. Example: nim-ui add button');
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
  const outputDir = join(cwd, config.componentsDir, componentName);
  const templateRoot = resolveTemplateRoot();

  mkdirSync(outputDir, { recursive: true });

  for (const fileName of manifest.files) {
    const templatePath = join(
      templateRoot,
      manifest.name,
      `${fileName}.template`,
    );
    const destinationPath = join(outputDir, fileName);

    if (!existsSync(templatePath)) {
      error(`Template not found for ${componentName}: ${templatePath}`);
      process.exitCode = 1;
      return;
    }

    if (existsSync(destinationPath)) {
      error(`File already exists, refusing to overwrite: ${destinationPath}`);
      process.exitCode = 1;
      return;
    }

    const renderedTemplate = renderTemplate(templatePath);
    writeFileSync(destinationPath, renderedTemplate, 'utf8');
    log(`Created ${destinationPath}`);
  }

  const summary = describeRegistryComponent(manifest, resolvedDependencies);

  log(`Added ${componentName} from the local registry.`);
  log(`Status: ${summary.status}`);
  log(`Files: ${summary.files}`);
  log(`Registry dependencies: ${summary.dependencies}`);
  log(`Tokens: ${summary.tokens}`);

  if (!config.configPath) {
    log(
      'No nim-ui.config.ts found. Using default output directory "src/components/ui".',
    );
  }

  if (!config.tokens && manifest.dependencies.includes('tokens')) {
    log(
      'Warning: this component expects semantic CSS variables from @nim-ui/tokens, but config.tokens is false.',
    );
  }
}
