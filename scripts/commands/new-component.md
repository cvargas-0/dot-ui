Create a new dot-ui Web Component following the Research → Plan → Execute → Review → Ship workflow.

## 1. Research

- Read `scripts/skills/create-component/SKILL.md` for the full step-by-step guide.
- Read an existing component as reference — start with `src/components/dot-badge/dot-badge.ts` and `src/components/dot-badge/dot-badge.css`.

## 2. Plan

Before writing any code, answer these questions explicitly:

- **Tag**: `dot-[name]` — what is the HTML tag?
- **Class**: `Dot[Name]` — what is the TypeScript class name?
- **Properties**: list every `@property()` with its type and default value.
- **Internal state**: what `@state()` does it need?
- **Variants**: which visual variants will it support?
- **Sizes**: which sizes (e.g. sm | md | lg)?
- **Boolean attrs needing reflect**: which booleans are needed in CSS `:host([attr])` selectors?
- **Events**: which `dot:` events will it emit, and what is the `detail` payload?
- **Slots**: default slot + named slots — which ones can be empty and need collapse behavior?
- **CSS parts**: `base` is always required — any additional parts?
- **Public methods**: `focus()`, `blur()`, or custom methods?
- **`:host` display**: `inline-flex`, `block`, or `contents`?

## 3. Execute

Create exactly **2 files** under `src/components/dot-[name]/`:

```
src/components/dot-[name]/
├── dot-[name].ts    ← declare global + JSDoc + @customElement + class extending DotElement
└── dot-[name].css   ← styles using --dot-* tokens only, no hardcoded values
```

Then register the component in `src/index.ts` (import directly from the file, no barrel):

```typescript
export { default as Dot[Name] } from '@/components/dot-[name]/dot-[name]'
```

Add a demo section to `index.html` showing all variants, sizes, and states.

## 4. Review

Run the following and fix any errors before proceeding:

```bash
pnpm lint
pnpm build
```

Both must pass with zero errors. Then open `index.html` in the dev server (`pnpm dev`) and visually verify the component renders correctly in all its variants.

## 5. Ship

Once lint and build pass:

1. Stage the 2 new component files + the updated `src/index.ts` + `index.html`.
2. Commit with: `feat: add Dot[Name] component`
3. Update the component inventory table in `AGENT.md` (and sync to `CLAUDE.md` via `scripts/setup-agent.sh`).
