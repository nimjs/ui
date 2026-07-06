import {
  getRegistryComponent,
  isSystemDependency,
  listRegistryComponents,
  type RegistryComponentManifest,
  type RegistryComponentName,
  type RegistryDependency,
  type RegistrySystemDependency,
} from '@nim-ui/registry';

export interface ResolvedRegistryDependencies {
  components: RegistryComponentName[];
  system: RegistrySystemDependency[];
}

export function listAvailableComponents() {
  return listRegistryComponents();
}

export function loadRegistryComponent(name: RegistryComponentName) {
  return getRegistryComponent(name);
}

export function resolveRegistryDependencies(
  componentName: RegistryComponentName,
): ResolvedRegistryDependencies {
  const componentDependencies = new Set<RegistryComponentName>();
  const systemDependencies = new Set<RegistrySystemDependency>();
  const visited = new Set<RegistryComponentName>();

  function visitDependency(dependency: RegistryDependency) {
    if (isSystemDependency(dependency)) {
      systemDependencies.add(dependency);
      return;
    }

    if (visited.has(dependency)) {
      return;
    }

    visited.add(dependency);
    componentDependencies.add(dependency);

    const manifest = loadRegistryComponent(dependency);

    for (const nestedDependency of manifest.dependencies) {
      visitDependency(nestedDependency);
    }
  }

  const manifest = loadRegistryComponent(componentName);

  for (const dependency of manifest.dependencies) {
    visitDependency(dependency);
  }

  componentDependencies.delete(componentName);

  return {
    components: [...componentDependencies],
    system: [...systemDependencies],
  };
}

export function describeRegistryComponent(
  manifest: RegistryComponentManifest,
  resolvedDependencies: ResolvedRegistryDependencies,
) {
  return {
    dependencies:
      resolvedDependencies.system.length > 0
        ? resolvedDependencies.system.join(', ')
        : 'none',
    files: manifest.files.join(', '),
    status: manifest.status,
    tokens: manifest.tokens.join(', '),
  };
}
