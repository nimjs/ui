# @nimjs/utils

Small helpers shared by NimJS UI packages. This intended public package is not released on npm yet; use the [packed artifact setup](https://github.com/nimjs/ui/blob/main/docs/consumer-setup.md) for external evaluation.

The package root exports `cn()` for `clsx` plus `tailwind-merge`, `canUseDOM()` for guarded DOM access, and `dataState()` for state attributes. It has runtime dependencies on `clsx` and `tailwind-merge`. Import from the package root only. The copy-mode CLI writes a local copy of `cn.ts` instead of requiring this package in copied component source.
