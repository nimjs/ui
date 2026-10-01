export interface ParsedArgs {
  command?: string;
  positional: string[];
  flags: Record<string, string | boolean>;
}

export function parseArgs(argv: string[]): ParsedArgs {
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (!current) {
      continue;
    }

    if (!current.startsWith('--')) {
      positional.push(current);
      continue;
    }

    if (current === '--dry-run') {
      flags['dry-run'] = true;
      continue;
    }

    const [key, value] = current.slice(2).split('=');

    if (!key) {
      continue;
    }

    if (value) {
      flags[key] = value;
      continue;
    }

    const next = argv[index + 1];
    if (next && !next.startsWith('-')) {
      flags[key] = next;
      index += 1;
      continue;
    }

    flags[key] = true;
  }

  return {
    command: positional[0],
    positional: positional.slice(1),
    flags,
  };
}
