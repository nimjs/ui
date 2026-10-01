# NimJS UI documentation

This is the repository documentation entry point. The [website](https://nimjs.github.io/ui/docs/) is built by the Pages workflow to present consumer examples and component pages when repository Pages settings allow deployment; the repository files below define setup and maintenance contracts. Package and copy mode have separate steps because copied code becomes application-owned.

| Audience              | Start here                                                                                        | Responsibility                                         |
| --------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Consumers             | [Consumer setup](consumer-setup.md), [website components](https://nimjs.github.io/ui/components/) | Executable package and copy mode setup, examples       |
| Contributors          | [Contributing](../CONTRIBUTING.md), [development](development.md)                                 | Local workflow, component changes, validation          |
| Architects and agents | [Architecture](architecture.md), [agent instructions](../AGENTS.md)                               | Current boundaries, sources of truth, public API rules |
| Maintainers           | [Governance](../GOVERNANCE.md), [releases](releases.md), [Security](../SECURITY.md)               | Decisions, versioning, release and private reports     |
| Project status        | [Roadmap](roadmap.md)                                                                             | Future outcomes and readiness gates                    |

Other entry points: [Support](../SUPPORT.md) routes questions and bugs; [Code of Conduct](../CODE_OF_CONDUCT.md) sets community behavior; [AI task briefs](ai-tasks.md) contain bounded agent tasks. Package READMEs describe each package's public entry points. Component prose and previews live in `apps/docs/content/`; registry metadata lives in `packages/registry/components/`.

**Ownership rule:** change a component in `packages/ui/src/components`, metadata in registry JSON, tokens and theme in `packages/tokens`, public exports in package `package.json` and source index, release intent in `.changeset`, and future work in `roadmap.md`. Update linked docs and tests when those contracts change.
