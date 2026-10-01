# Governance

This document describes how UI is maintained as an open-source project.

## Roles

### Maintainers

Maintainers are responsible for:

- reviewing and merging pull requests
- protecting API quality and release discipline
- guiding architecture and package boundaries
- triaging issues and community requests

### Core Maintainers

Core maintainers are maintainers who can make final decisions on:

- breaking changes
- release publication
- architectural direction
- governance updates

## Decision Making

Routine changes are handled through pull requests and maintainer review.

Architectural or cross-package changes should include a written rationale in the
PR description or issue. Core maintainers may ask for an RFC-like discussion when
the change affects:

- public API shape
- package boundaries
- theming architecture
- CLI registry format
- release or governance mechanics

## Breaking Changes

Breaking changes require:

- explicit maintainer approval
- a documented migration note
- a clearly marked changeset
- coordination with docs updates

No single contributor should merge a breaking change casually, even if the code
change is mechanically small.

## Release Authority

Only maintainers with release permissions should publish packages or approve
release version changes.

The automated release workflow is currently disabled. Until it is restored,
maintainers should review changesets and consumer checks, then use the
repository's `version-packages` and `release` scripts for publication.

## Review SLA

We aim to review community pull requests in a reasonable timeframe, but we do not
guarantee fixed response windows. Priority depends on maintainer availability,
release timing, and change scope.

## Stewardship Expectations

Maintainers are expected to:

- communicate decisions clearly
- explain trade-offs when declining proposals
- keep contributor pathways documented
- avoid hidden process requirements that are not written in the repository
