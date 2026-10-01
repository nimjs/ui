import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { defaultConfig } from '../config/resolve-config';
import { log } from '../lib/output';

const CONFIG_FILE_NAME = 'ui.config.ts';

export function runInit(cwd: string) {
  const destination = join(cwd, CONFIG_FILE_NAME);

  if (existsSync(destination)) {
    log(`Config already exists at ${CONFIG_FILE_NAME}.`);
    return;
  }

  writeFileSync(
    destination,
    `export default {\n  componentsDir: '${defaultConfig.componentsDir}',\n  tokens: ${String(defaultConfig.tokens)},\n};\n`,
    'utf8',
  );

  log(`Created ${CONFIG_FILE_NAME}`);
  log('Next steps:');
  log('1. Run `ui add button --dry-run` to inspect the file plan.');
  log('2. Run `ui add button`, then follow the copy-mode setup guide.');
}
