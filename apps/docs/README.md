# @nimjs/docs

Next.js App Router docs and demo application for UI.

Goals:

- show the path from tokens to semantic CSS variables to UI components
- show registry metadata such as dependencies and token usage
- keep documentation close to the code that maintainers ship
- make content easy to extend without changing routing architecture
- provide a polished demo surface for open-source adoption

Content is currently typed TypeScript under `content/`, with an MDX-friendly
entrypoint (`mdx-components.tsx`) ready for future content migration.
