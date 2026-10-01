# AI task briefs

Give an agent one brief at a time. Ask it to read `AGENTS.md`,
`docs/architecture.md`, and the relevant package README first.

## External consumer audit

> Create a temporary React app outside the UI workspace. Install the built
> package and try the documented imports, styles, and Button behavior. Then
> try `ui init` and `ui add button` in a second clean app. Record exact manual
> steps and failures. Fix one end-to-end path and update docs. Do not call copy
> mode complete until all dependencies and aliases are handled.

## New component

> Add one component using the architecture acceptance criteria. Update
> canonical source, explicit exports, registry manifest, docs, tests, and a
> changeset. Verify keyboard/focus semantics and both package and copy-mode
> behavior. State any external primitive dependency and why it is needed.

## Registry and CLI redesign

> Propose a versioned registry manifest capable of listing source files,
> destination paths, npm packages, component dependencies, token CSS, and import
> transformations. Migrate Button first. Make the CLI produce an inspectable
> install plan and reject unsafe paths or collisions. Test the plan on a clean
> external fixture before migrating the remaining components.
