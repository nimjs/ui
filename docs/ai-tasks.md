# Bounded agent tasks

Give an agent one task at a time. Start with `AGENTS.md`, [architecture](architecture.md), [contributing](../CONTRIBUTING.md), and the relevant package README. Preserve canonical UI source, explicit exports, semantic tokens, and package/copy mode distinctions. Report exact validation commands and any unverified consumer path.

## External consumer audit

> Pack the public packages and run package mode and copy mode in clean projects outside the workspace. Use [consumer setup](consumer-setup.md). Record commands, CSS and import behavior, and manual steps. Fix a specific failure and update the cookbook. Run workspace gates and external typecheck/build checks.

## New component

> Add one component using the [acceptance criteria](architecture.md#component-acceptance). Update canonical source, explicit exports, registry manifest, website page, behavior tests, package and copy consumer checks, and a changeset. Keep status at preview until the gate passes.

## Registry or CLI change

> Read the current [registry and CLI contracts](architecture.md#registry-contract). Change the manifest schema or install plan for one concrete need, preserve filesystem safety, and update CLI tests, docs metadata, consumer setup, and a changeset. Verify the packed CLI in an external fixture.

## Release readiness

> Follow [releases](releases.md#first-public-release-checklist) without publishing. Inspect tarballs, run workspace and Pages gates, validate external consumers, and report unresolved credentials/settings separately from code failures.
