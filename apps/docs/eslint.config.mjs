import { createNextConfig } from '@nimjs/eslint-config/next';

export default createNextConfig({
  tsconfigRootDir: import.meta.dirname,
});
