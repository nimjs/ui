const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const isGithubPagesBuild = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isGithubPagesBuild ? 'export' : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: [
    '@nimjs/registry',
    '@nimjs/tokens',
    '@nimjs/ui',
    '@nimjs/utils',
  ],
};

export default nextConfig;
