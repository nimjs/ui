import { describe, expect, it } from 'vitest';

import { componentNames } from './types';

import {
  getRegistryComponent,
  listRegistryComponents,
  registryComponentsByName,
} from './index';

describe('registry', () => {
  it('loads the declared component manifests', () => {
    expect(listRegistryComponents()).toHaveLength(componentNames.length);
    expect(listRegistryComponents().map((component) => component.name)).toEqual(
      expect.arrayContaining([...componentNames]),
    );
    expect(getRegistryComponent('button').dependencies).toContain('tokens');
    expect(getRegistryComponent('button').accessibility).toContain(
      'keyboard-accessible',
    );
    expect(
      getRegistryComponent('card').anatomy.map((item) => item.name),
    ).toContain('content');
    expect(registryComponentsByName.input.tokens).toContain('input');
    expect(registryComponentsByName.input.status).toBe('preview');
    expect(getRegistryComponent('button').schemaVersion).toBe(1);
    expect(getRegistryComponent('button').npmDependencies).toContain(
      'class-variance-authority',
    );
    expect(getRegistryComponent('button').tokens).toEqual(
      expect.arrayContaining([
        'background',
        'destructive',
        'secondary-foreground',
      ]),
    );
  });
});
