# Node JS/TS

A _buildless_ TypeScript setup. Node runs `.ts` files directly — no bundler, no
transpile step, no `dist/`.

This started as JavaScript annotated with JSDoc types, which was the only way to
get type safety without a build. Node's native TypeScript support makes that
tradeoff unnecessary, so the JSDoc is gone and the sources are plain TypeScript.

## Stack

| Concern   | Tool                                    |
| --------- | --------------------------------------- |
| Runtime   | Node 26 (native TypeScript)             |
| HTTP      | Hono + `@hono/node-server`              |
| Lint      | oxlint (type-aware via oxlint-tsgolint) |
| Format    | oxfmt                                   |
| Tests     | `node:test` + `expect`                  |
| Toolchain | mise                                    |

No ESLint, no Prettier, no `tsc` emit — `tsc` runs as a type checker only.

## Scripts

```sh
pnpm start         # nodemon -> node src/index.ts
pnpm test          # node --test (picks up *.test.ts natively)
pnpm typecheck     # tsc --noEmit
pnpm lint          # oxlint --type-aware
pnpm format        # oxfmt
pnpm format:check  # oxfmt --check (what CI runs)
```

## How buildless TypeScript works here

Node executes TypeScript by **stripping** types. It never type-checks, and it has
no type information while it does so. Three consequences drive the config:

**Imports must name the file on disk.** Node does not rewrite `.js` to `.ts` in
specifiers, so imports say `./sum.ts`, not `./sum.js`. That needs
`allowImportingTsExtensions`, which is legal here because `noEmit` is set.

**Type-only imports must say `import type`.** Stripping is per-file with no type
information, so a type imported as a value is not erased and crashes at runtime.
`verbatimModuleSyntax` makes that a compile error instead.

**Some syntax needs type-directed emit and is banned.** No `enum`, no
`namespace`, no parameter properties, no decorators. `erasableSyntaxOnly` rejects
them at typecheck time rather than at runtime. Enum-like values use a `const`
object plus `as const` — see `src/lib/point.ts`.

`types: ["node"]` is also set explicitly. Node's globals were previously reaching
the program only because Fastify's type definitions imported from `node:http`;
nothing should depend on a dependency dragging them in.

Because Node never type-checks, `pnpm typecheck` is a separate CI step. Tests can
pass while the code has type errors.

## Linting

`.oxlintrc.json` enables the `correctness` (error), `suspicious`, and `pedantic`
categories. `pedantic` is opinionated on purpose — this repo is a demonstration,
and the strictness is part of what it demonstrates.

`prefer-readonly-parameter-types` requires _deeply_ readonly parameters, which is
unsatisfiable for third-party class types like Hono's `Context` — even
`Readonly<Context>` fails, since `Readonly<T>` is shallow. Those types are
exempted by name via the rule's `allow` option rather than with
`ignoreInferredTypes`, which would skip every unannotated parameter and create a
blind spot around your own callbacks.

## Editor

`.zed/settings.json` and `.vscode/settings.json` both wire up oxlint and oxfmt.
Two settings are load-bearing in Zed:

- `typeAware: true` on the oxlint LSP — off by default, so without it the editor
  reports only the syntactic rules and silently omits every type-aware finding.
- `prettier.allowed: false` — Zed bundles prettier and would otherwise use it for
  JS/TS, formatting to prettier's defaults and failing `format:check`.

The oxlint language server only lints files that are open. `pnpm lint` is the
only complete view of the project.

## Testing

Routes in `src/modules/api/date/date.route.ts` are registered with method
chaining so Hono can infer their response types. That inference is what makes
`testClient` fully typed in the tests — registering routes as separate statements
erases it.

## CI

`.github/workflows/nodejs.yml` installs the toolchain with `jdx/mise-action`, so
the Node and pnpm versions come from `mise.toml` and cannot drift from local
development. It runs install, typecheck, lint, format check, and tests.
