#!/usr/bin/env node
import { cwd } from 'node:process';

import { runAdd } from './commands/add';
import { runInit } from './commands/init';
import { parseArgs } from './lib/args';
import { error, log } from './lib/output';

function printHelp() {
  log('ui');
  log('');
  log('Commands:');
  log('  init              Create a ui.config.ts file');
  log('  add <component>   Scaffold a component from the local registry');
}

function main() {
  const parsed = parseArgs(process.argv.slice(2));
  const workingDirectory = cwd();

  switch (parsed.command) {
    case 'init':
      runInit(workingDirectory);
      return;
    case 'add':
      void runAdd(workingDirectory, parsed.positional[0]).catch(
        (cause: unknown) => {
          error(
            cause instanceof Error
              ? cause.message
              : 'Unexpected error while adding component.',
          );
          process.exitCode = 1;
        },
      );
      return;
    case '--help':
    case '-h':
    case 'help':
    case undefined:
      printHelp();
      return;
    default:
      error(`Unknown command: ${parsed.command}`);
      printHelp();
      process.exitCode = 1;
  }
}

main();
