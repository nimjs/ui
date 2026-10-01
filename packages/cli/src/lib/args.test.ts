import { describe, expect, it } from 'vitest';

import { parseArgs } from './args';

describe('parseArgs', () => {
  it('accepts dry-run before or after the component name', () => {
    for (const argv of [
      ['add', '--dry-run', 'button'],
      ['add', 'button', '--dry-run'],
    ]) {
      expect(parseArgs(argv)).toEqual({
        command: 'add',
        positional: ['button'],
        flags: { 'dry-run': true },
      });
    }
  });
});
