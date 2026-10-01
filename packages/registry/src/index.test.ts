import { describe, expect, it } from 'vitest';

import {
  getRegistryComponent,
  listRegistryComponents,
  registryComponentsByName,
} from './index';

describe('registry', () => {
  it('loads all baseline component manifests', () => {
    expect(listRegistryComponents()).toHaveLength(4);
    expect(getRegistryComponent('button').dependencies).toContain('tokens');
    expect(getRegistryComponent('button').accessibility).toContain(
      'keyboard-accessible',
    );
    expect(
      getRegistryComponent('card').anatomy.map((item) => item.name),
    ).toContain('content');
    expect(registryComponentsByName.input.tokens).toContain('input');
    expect(registryComponentsByName.input.status).toBe('stable');
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
