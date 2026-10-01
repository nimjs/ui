# Roadmap

This file tracks intended outcomes, not shipped capability. Current behavior and invariants are in [architecture](architecture.md); current setup is in [consumer setup](consumer-setup.md). No date or release commitment is implied.

## External consumer baseline

- Keep package and copy mode working in clean React 19 / Tailwind 3 Vite projects outside the workspace, using packed artifacts. The current gate covers Button, Input, Card, and Badge.
- Add other frameworks or setup variants only when they become supported targets. Browser interaction parity remains to be validated beyond current component unit tests and server-rendered markup checks.
- Reconcile any gaps between canonical source, registry metadata, CLI assets, and website examples.

**Done when:** a new consumer can follow the documented commands without workspace aliases or undocumented repairs.

## Component and theme quality

- Exercise interactive components for keyboard behavior, focus, disabled state, and accessible naming; keep registry status at `preview` until acceptance criteria are met.
- Validate the existing dark CSS selector in real consumer pages before documenting dark mode as supported.
- Add component coverage by complete vertical slice: source, exports, registry, package and copy use, tests, and docs.

**Done when:** each promoted component meets the [component acceptance criteria](architecture.md#component-acceptance) in both modes.

## First public release

- Review the automated packed file, export, CSS, type, and CLI checks against each intended public release artifact; verify release credentials separately.
- Confirm npm scope ownership and public package names; review the [first release checklist](releases.md#first-public-release-checklist).
- Publish reviewed versions and release notes through Changesets.

**Done when:** public install commands work for all intended packages and the release is traceable to reviewed changesets.

## Later candidates

Remote registries, additional framework adapters, broader component patterns, and release automation need a separate design decision after the local paths work. They are not current CLI capabilities.
