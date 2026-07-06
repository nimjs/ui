import { createBaseConfig } from '@nimjs/eslint-config/base';

export default createBaseConfig({
  tsconfigRootDir: import.meta.dirname,
});
