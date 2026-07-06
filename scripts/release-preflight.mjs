import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const repoUrl = 'git+https://github.com/nimjs/ui.git';
const packagesDir = path.resolve(process.cwd(), 'packages');

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

async function packageExistsOnNpm(name) {
  const response = await fetch(
    `https://registry.npmjs.org/${encodeURIComponent(name)}`,
    {
      headers: {
        accept: 'application/json',
      },
    },
  );

  if (response.status === 404) {
    return false;
  }

  if (!response.ok) {
    throw new Error(
      `npm registry lookup failed for ${name} (${response.status})`,
    );
  }

  return true;
}

async function main() {
  const entries = await readdir(packagesDir, { withFileTypes: true });
  const packageFiles = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packagesDir, entry.name, 'package.json'));

  const manifests = await Promise.all(packageFiles.map(readJson));
  const publishablePackages = manifests.filter(
    (manifest) => manifest.private !== true,
  );
  const missingRepository = publishablePackages.filter(
    (manifest) => manifest.repository?.url !== repoUrl,
  );

  if (missingRepository.length > 0) {
    const names = missingRepository.map((manifest) => manifest.name).join(', ');
    throw new Error(
      `Publishable packages must set repository.url to ${repoUrl}. Update: ${names}`,
    );
  }

  if (process.env.NPM_TOKEN) {
    console.log(
      'release preflight: NPM_TOKEN detected, skipping first-publish OIDC guard.',
    );
    return;
  }

  const unpublished = [];

  for (const manifest of publishablePackages) {
    const exists = await packageExistsOnNpm(manifest.name);

    if (!exists) {
      unpublished.push(manifest.name);
    }
  }

  if (unpublished.length === 0) {
    console.log(
      'release preflight: all publishable packages already exist on npm.',
    );
    return;
  }

  const scopes = [
    ...new Set(unpublished.map((name) => name.split('/')[0])),
  ].join(', ');
  throw new Error(
    [
      'Initial publish cannot rely on npm trusted publishing alone because these packages do not exist on npm yet:',
      unpublished.map((name) => `- ${name}`).join('\n'),
      `Create or own the npm scope(s) ${scopes}, publish once with an npm automation token in NPM_TOKEN, then configure trusted publishers for each package and remove the token.`,
    ].join('\n'),
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
