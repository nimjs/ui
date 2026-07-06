export const registryCategories = ['ui', 'forms', 'charts', 'layouts'] as const;
export const registryStatuses = ['stable', 'preview', 'experimental'] as const;
export const systemDependencies = ['utils', 'tokens'] as const;
export const componentNames = ['button', 'input', 'card', 'badge'] as const;
export const registryAccessibilityFeatures = [
  'contrast-aware',
  'focus-visible',
  'keyboard-accessible',
  'native-semantics',
  'screen-reader-readable',
] as const;
export const registryTokenReferences = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'muted',
  'muted-foreground',
  'border',
  'input',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'accent',
  'accent-foreground',
  'ring',
  'destructive',
  'destructive-foreground',
  'radius',
] as const;

export type RegistryCategory = (typeof registryCategories)[number];
export type RegistryStatus = (typeof registryStatuses)[number];
export type RegistryComponentName = (typeof componentNames)[number];
export type RegistrySystemDependency = (typeof systemDependencies)[number];
export type RegistryDependency =
  | RegistrySystemDependency
  | RegistryComponentName;
export type RegistryAccessibilityFeature =
  (typeof registryAccessibilityFeatures)[number];
export type RegistryTokenReference = (typeof registryTokenReferences)[number];

export interface RegistryAnatomyItem {
  name: string;
  description: string;
}

export interface RegistryUsagePattern {
  name: string;
  description: string;
}

export interface RegistryComponentManifest {
  name: RegistryComponentName;
  files: string[];
  dependencies: RegistryDependency[];
  tokens: RegistryTokenReference[];
  category: RegistryCategory;
  status: RegistryStatus;
  since: string;
  description: string;
  anatomy: RegistryAnatomyItem[];
  accessibility: RegistryAccessibilityFeature[];
  usage: RegistryUsagePattern[];
}
