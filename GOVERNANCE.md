# Governance

NimJS UI is maintained through public issues and pull requests. Maintainers review and merge changes; maintainers with release access decide when to publish. This file defines decision authority, not a service-level response commitment.

## Decisions

Routine fixes use a focused pull request and maintainer review. Public API, package boundaries, registry schema, token/theme architecture, release mechanics, and governance changes need a written rationale in the issue or PR. Maintainers may request a short design discussion before implementation. Durable decisions may be recorded in [ADRs](docs/adr/README.md). No committee or formal RFC is required for ordinary work.

## Breaking changes and deprecation

A breaking change requires explicit maintainer approval, a clearly marked changeset, updated docs/tests, and migration instructions. Pre-1.0 status does not remove that requirement. Deprecate a public path with a replacement and proposed removal release when feasible. Public API boundaries are defined in [architecture](docs/architecture.md#public-api-and-compatibility); versioning is in [releases](docs/releases.md).

## Releases

Only maintainers with package publishing permission may approve versions or publish. Automated publication is disabled. Maintainers review changesets, packed artifacts, and external consumer checks before running `pnpm version-packages` and `pnpm release`. Follow the [first release checklist](docs/releases.md#first-public-release-checklist). No fixed review or release schedule is promised.
