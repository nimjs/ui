import accordionManifestJson from '../components/accordion.json';
import alertManifestJson from '../components/alert.json';
import avatarManifestJson from '../components/avatar.json';
import badgeManifestJson from '../components/badge.json';
import breadcrumbManifestJson from '../components/breadcrumb.json';
import buttonManifestJson from '../components/button.json';
import cardManifestJson from '../components/card.json';
import checkboxManifestJson from '../components/checkbox.json';
import collapsibleManifestJson from '../components/collapsible.json';
import dialogManifestJson from '../components/dialog.json';
import emptystateManifestJson from '../components/empty-state.json';
import fieldManifestJson from '../components/field.json';
import inputManifestJson from '../components/input.json';
import paginationManifestJson from '../components/pagination.json';
import progressManifestJson from '../components/progress.json';
import radioGroupManifestJson from '../components/radio-group.json';
import selectManifestJson from '../components/select.json';
import separatorManifestJson from '../components/separator.json';
import skeletonManifestJson from '../components/skeleton.json';
import spinnerManifestJson from '../components/spinner.json';
import switchManifestJson from '../components/switch.json';
import tabsManifestJson from '../components/tabs.json';
import textareaManifestJson from '../components/textarea.json';

import {
  registryAccessibilityFeatures,
  componentNames,
  registryCategories,
  registryStatuses,
  registryTokenReferences,
  systemDependencies,
  type RegistryAccessibilityFeature,
  type RegistryAnatomyItem,
  type RegistryCategory,
  type RegistryComponentManifest,
  type RegistryComponentName,
  type RegistryDependency,
  type RegistryStatus,
  type RegistrySystemDependency,
  type RegistryTokenReference,
  type RegistryUsagePattern,
} from './types';

const componentNameSet = new Set<string>(componentNames);
const accessibilityFeatureSet = new Set<string>(registryAccessibilityFeatures);
const categorySet = new Set<string>(registryCategories);
const statusSet = new Set<string>(registryStatuses);
const tokenSet = new Set<string>(registryTokenReferences);
const systemDependencySet = new Set<string>(systemDependencies);

interface RegistryNamedDescription {
  name: string;
  description: string;
}

function createStringLiteralGuard<T extends string>(values: Set<string>) {
  return (value: string): value is T => values.has(value);
}

function findInvalidEntries<T extends string>(
  entries: string[],
  isValidEntry: (entry: string) => entry is T,
) {
  return entries.filter((entry) => !isValidEntry(entry));
}

function hasStringProperty<TProperty extends string>(
  value: unknown,
  property: TProperty,
): value is Record<TProperty, string> {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof (value as Record<TProperty, unknown>)[property] === 'string'
  );
}

const isComponentName =
  createStringLiteralGuard<RegistryComponentName>(componentNameSet);

function isRegistryDependency(value: string): value is RegistryDependency {
  return isComponentName(value) || systemDependencySet.has(value);
}

const isRegistryCategory =
  createStringLiteralGuard<RegistryCategory>(categorySet);
const isRegistryStatus = createStringLiteralGuard<RegistryStatus>(statusSet);
const isRegistryAccessibilityFeature =
  createStringLiteralGuard<RegistryAccessibilityFeature>(
    accessibilityFeatureSet,
  );
const isRegistryTokenReference =
  createStringLiteralGuard<RegistryTokenReference>(tokenSet);

function assertStringArray(
  label: string,
  value: unknown,
): asserts value is string[] {
  if (
    !Array.isArray(value) ||
    value.some((entry) => typeof entry !== 'string')
  ) {
    throw new Error(
      `Registry manifest "${label}" must be an array of strings.`,
    );
  }
}

function assertString(label: string, value: unknown): asserts value is string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Registry manifest "${label}" must be a non-empty string.`);
  }
}

function assertNamedDescriptions<T extends RegistryNamedDescription>(
  label: string,
  value: unknown,
  itemLabel: string,
): asserts value is T[] {
  if (
    !Array.isArray(value) ||
    value.some(
      (entry) =>
        !hasStringProperty(entry, 'name') ||
        !hasStringProperty(entry, 'description'),
    )
  ) {
    throw new Error(
      `Registry manifest "${label}" must be an array of ${itemLabel}.`,
    );
  }
}

function assertUsage(
  label: string,
  value: unknown,
): asserts value is RegistryUsagePattern[] {
  assertNamedDescriptions<RegistryUsagePattern>(label, value, 'usage patterns');
}

function parseManifest(raw: unknown): RegistryComponentManifest {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Registry manifest must be an object.');
  }

  const manifest = raw as Partial<RegistryComponentManifest>;

  if (!manifest.name || !isComponentName(manifest.name)) {
    throw new Error(
      `Unknown registry component name: ${String(manifest.name)}`,
    );
  }

  assertStringArray(`${manifest.name}.files`, manifest.files);
  assertStringArray(`${manifest.name}.dependencies`, manifest.dependencies);
  assertStringArray(
    `${manifest.name}.npmDependencies`,
    manifest.npmDependencies,
  );
  assertStringArray(`${manifest.name}.tokens`, manifest.tokens);
  assertStringArray(`${manifest.name}.accessibility`, manifest.accessibility);
  assertNamedDescriptions<RegistryAnatomyItem>(
    `${manifest.name}.anatomy`,
    manifest.anatomy,
    'anatomy items',
  );
  assertUsage(`${manifest.name}.usage`, manifest.usage);

  if (!manifest.category || !isRegistryCategory(manifest.category)) {
    throw new Error(
      `Unknown registry category for "${manifest.name}": ${String(
        manifest.category,
      )}`,
    );
  }

  if (!manifest.status || !isRegistryStatus(manifest.status)) {
    throw new Error(
      `Unknown registry status for "${manifest.name}": ${String(
        manifest.status,
      )}`,
    );
  }

  assertString(`${manifest.name}.since`, manifest.since);
  assertString(`${manifest.name}.description`, manifest.description);

  if (manifest.schemaVersion !== 1) {
    throw new Error(
      `Unsupported registry schema version for "${manifest.name}".`,
    );
  }

  if (
    manifest.files.length === 0 ||
    new Set(manifest.files).size !== manifest.files.length ||
    manifest.files.some((file) => !/^[a-z][a-z0-9-]*\.tsx$/.test(file))
  ) {
    throw new Error(
      `Registry manifest "${manifest.name}" has unsafe source files.`,
    );
  }

  if (
    manifest.npmDependencies.some(
      (dependency) =>
        !/^(?:@[a-z0-9-]+\/[a-z0-9-]+|[a-z0-9-]+)$/.test(dependency),
    )
  ) {
    throw new Error(
      `Registry manifest "${manifest.name}" has invalid npm dependencies.`,
    );
  }

  const invalidDependencies = findInvalidEntries(
    manifest.dependencies,
    isRegistryDependency,
  );
  const invalidTokens = findInvalidEntries(
    manifest.tokens,
    isRegistryTokenReference,
  );
  const invalidAccessibility = findInvalidEntries(
    manifest.accessibility,
    isRegistryAccessibilityFeature,
  );

  if (invalidDependencies.length > 0) {
    throw new Error(
      `Registry manifest "${manifest.name}" has invalid dependencies: ${invalidDependencies.join(
        ', ',
      )}`,
    );
  }

  if (invalidTokens.length > 0) {
    throw new Error(
      `Registry manifest "${manifest.name}" has invalid tokens: ${invalidTokens.join(
        ', ',
      )}`,
    );
  }

  if (invalidAccessibility.length > 0) {
    throw new Error(
      `Registry manifest "${manifest.name}" has invalid accessibility features: ${invalidAccessibility.join(
        ', ',
      )}`,
    );
  }

  return {
    schemaVersion: manifest.schemaVersion,
    accessibility: manifest.accessibility,
    anatomy: manifest.anatomy,
    category: manifest.category,
    dependencies: manifest.dependencies,
    description: manifest.description,
    files: manifest.files,
    name: manifest.name,
    npmDependencies: manifest.npmDependencies,
    since: manifest.since,
    status: manifest.status,
    tokens: manifest.tokens,
    usage: manifest.usage,
  };
}

export const registryComponents = [
  parseManifest(buttonManifestJson),
  parseManifest(inputManifestJson),
  parseManifest(cardManifestJson),
  parseManifest(badgeManifestJson),
  parseManifest(fieldManifestJson),
  parseManifest(textareaManifestJson),
  parseManifest(selectManifestJson),
  parseManifest(radioGroupManifestJson),
  parseManifest(dialogManifestJson),
  parseManifest(avatarManifestJson),
  parseManifest(emptystateManifestJson),
  parseManifest(collapsibleManifestJson),
  parseManifest(tabsManifestJson),
  parseManifest(accordionManifestJson),
  parseManifest(checkboxManifestJson),
  parseManifest(switchManifestJson),
  parseManifest(alertManifestJson),
  parseManifest(progressManifestJson),
  parseManifest(separatorManifestJson),
  parseManifest(skeletonManifestJson),
  parseManifest(spinnerManifestJson),
  parseManifest(breadcrumbManifestJson),
  parseManifest(paginationManifestJson),
];

export const registryComponentsByName = Object.fromEntries(
  registryComponents.map((component) => [component.name, component]),
) as Record<RegistryComponentName, RegistryComponentManifest>;

export function getRegistryComponent(
  name: RegistryComponentName,
): RegistryComponentManifest {
  return registryComponentsByName[name];
}

export function listRegistryComponents() {
  return [...registryComponents];
}

export function isSystemDependency(
  dependency: RegistryDependency,
): dependency is RegistrySystemDependency {
  return systemDependencySet.has(dependency);
}

export type {
  RegistryAccessibilityFeature,
  RegistryAnatomyItem,
  RegistryCategory,
  RegistryComponentManifest,
  RegistryComponentName,
  RegistryDependency,
  RegistryStatus,
  RegistrySystemDependency,
  RegistryTokenReference,
  RegistryUsagePattern,
} from './types';
