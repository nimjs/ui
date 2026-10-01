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
  log(
    '  add <component> [--dry-run]   Add canonical component source from the local registry',
  );
}

function main() {
  const parsed = parseArgs(process.argv.slice(2));
  const workingDirectory = cwd();

  switch (parsed.command) {
    case 'init':
      runInit(workingDirectory);
      return;
    case 'add':
      if ('dry-run' in parsed.flags && parsed.flags['dry-run'] !== true) {
        error('--dry-run does not take a value.');
        process.exitCode = 1;
        return;
      }
      void runAdd(workingDirectory, parsed.positional[0], {
        dryRun: parsed.flags['dry-run'] === true,
      }).catch((cause: unknown) => {
        error(
          cause instanceof Error
            ? cause.message
            : 'Unexpected error while adding component.',
        );
        process.exitCode = 1;
      });
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
