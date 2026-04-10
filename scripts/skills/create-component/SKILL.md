# Skill: create-component

Use this skill whenever asked to create a new dot-ui component.

Triggers: "create a dot-[name] component", "add a new [name] component", "build dot-[name]"

---

## Before you start

1. Read `src/core/dot-element.ts` to understand the base class API
2. Read `src/tokens/tokens.css` to know which tokens are available
3. Read `src/components/dot-button/` as the reference implementation
4. Read `scripts/skills/jsdoc/SKILL.md` — JSDoc is required on every component
5. Confirm the component name follows the `dot-[name]` convention

---

## Step 1 — Plan the component

Before writing any code, define:

| Item               | Question to answer                                      |
| ------------------ | ------------------------------------------------------- |
| **Tag**            | What is the HTML tag? `dot-[name]`                      |
| **Class**          | What is the TS class name? `Dot[Name]`                  |
| **Attributes**     | What attributes does it observe?                        |
| **Variants**       | Does it have visual variants? Which ones?               |
| **Sizes**          | Does it support `sm`, `md`, `lg`?                       |
| **Boolean attrs**  | Which attributes are boolean (presence = true)?         |
| **Events**         | What CustomEvents does it emit?                         |
| **Slots**          | What slots does it expose?                              |
| **Parts**          | What CSS parts does it expose?                          |
| **Public methods** | Does it need `focus()`, `show()`, `hide()`, etc.?       |
| **display**        | What is the `:host` display? `inline-block` or `block`? |

---

## Step 2 — Create the files

Create exactly **3 files** inside `src/components/dot-[name]/`. Nothing more.

```
src/components/dot-[name]/
├── index.ts            ← entry point
├── dot-[name].ts       ← component class
└── dot-[name].css      ← component styles
```

---

## Step 3 — dot-[name].ts

The class must include a JSDoc block. Read `scripts/skills/jsdoc/SKILL.md` for the full spec.
The block goes **after** the `sheet` constant and **before** the `export class` declaration.

```typescript
import { DotElement } from '@/core/dot-element'
import styles from './dot-[name].css?inline'

// CSSStyleSheet is created at MODULE LEVEL — never inside the class
const sheet = new CSSStyleSheet()
sheet.replaceSync(styles)

/**
 * @summary One sentence describing what this component does.
 * @status experimental
 * @since [current version from package.json]
 *
 * @event {CustomEvent} dot:[name] - Emitted when ...
 *
 * @slot - The component's default content.
 * @slot start - A presentational prefix icon or similar element.
 * @slot end - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 *
 * @attr {string} variant - The visual style. Options: ...
 * @attr {string} size - The component size. Options: sm | md | lg.
 * @attr {boolean} disabled - Disables the component.
 */
export class Dot[Name] extends DotElement {
  // List every attribute that triggers a re-render
  static observedAttributes = ['variant', 'size', 'disabled']

  // ---- JS properties ↔ HTML attributes ----
  // Every observed attribute MUST have a getter + setter
  // Use this.attr() for string attributes (never getAttribute directly)
  // Use this.boolAttr() for boolean attributes (never hasAttribute directly)
  // Use this.setAttr() to write (never setAttribute/removeAttribute directly)

  /** The visual style of the component. */
  get variant() { return this.attr('variant', 'default') }
  set variant(value: string) { this.setAttr('variant', value) }

  /** The component size. */
  get size() { return this.attr('size', 'md') }
  set size(value: string) { this.setAttr('size', value) }

  /** Disables the component, preventing user interaction. */
  get disabled() { return this.boolAttr('disabled') }
  set disabled(value: boolean) { this.setAttr('disabled', value) }

  // ---- Lifecycle ----

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.adoptedStyleSheets = [sheet]
    this.render()
  }

  disconnectedCallback() {
    // Remove any event listeners, observers, or timers added in connectedCallback
  }

  attributeChangedCallback() {
    // Guard: only re-render if shadow DOM is already attached
    if (this.shadowRoot) this.render()
  }

  // ---- Render ----
  // Build the full shadowRoot innerHTML on every call
  // Use /*html*/ template literal for editor syntax highlighting
  // Always expose part="base" on the root element
  // Always include relevant aria-* attributes

  render() {
    this.shadowRoot!.innerHTML = /*html*/ `
      <div
        part="base"
        class="[name] [name]--${this.variant} [name]--${this.size}"
        aria-disabled="${this.disabled}"
      >
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </div>
    `
  }

  // ---- Public methods (if needed) ----

  /** Sets focus on the underlying native element. */
  focus() { this.shadowRoot?.querySelector<HTMLElement>('[part="base"]')?.focus() }

  /** Removes focus from the underlying native element. */
  blur()  { this.shadowRoot?.querySelector<HTMLElement>('[part="base"]')?.blur() }
}
```

### Rules for dot-[name].ts

- `sheet` is declared **outside** the class at module level — only one instance per module
- `render()` is **not** private — it is the abstract method from `DotElement`
- `disconnectedCallback()` must always be present, even if empty
- `attributeChangedCallback()` always guards with `if (this.shadowRoot)`
- Never call `customElements.define()` directly — that happens in `index.ts`
- Never import from `../../` — always use the `@/` alias
- JSDoc block is **required** — see `scripts/skills/jsdoc/SKILL.md`

---

## Step 4 — dot-[name].css

```css
/* ---- Host ---- */
:host {
  display: inline-block;        /* or block if the component is full-width */
  font-family: var(--dot-font-sans);
}

/* ---- Base ---- */
.component-name {
  /* Always use --dot-* tokens. Never hardcode colors, sizes, or fonts. */
  color: var(--dot-text);
  background-color: var(--dot-bg);
  border: 1px solid var(--dot-border);
  border-radius: var(--dot-radius-md);
  font-size: var(--dot-text-base);
  padding: var(--dot-space-2) var(--dot-space-4);
  transition:
    background-color var(--dot-duration-base) var(--dot-ease),
    border-color var(--dot-duration-base) var(--dot-ease),
    color var(--dot-duration-base) var(--dot-ease);
}

/* ---- Variants ---- */
.component-name--default { }
.component-name--[variant] { }

/* ---- Sizes ---- */
.component-name--sm { }
.component-name--md { }
.component-name--lg { }

/* ---- States ---- */
.component-name:hover { }
.component-name:focus-visible {
  outline: 2px solid var(--dot-border-focus);
  outline-offset: 2px;
}

/* ---- Disabled ---- */
:host([disabled]) .component-name {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Rules for dot-[name].css

- **Never hardcode** colors, fonts, sizes, or spacing — always use `--dot-*` tokens
- CSS nesting is **allowed** — ESLint is configured with `newly-available`
- Disabled state is handled via `:host([disabled])`, not a CSS class
- Loading state is handled via `:host([loading])`
- Boolean attributes always use `:host([attr])` selector, not `.class`
- `focus-visible` is preferred over `focus` for keyboard accessibility
- Shadows use `--dot-shadow-*` tokens only

---

## Step 5 — index.ts

```typescript
import { Dot[Name] } from './dot-[name]'

// Re-export everything from the component module
export * from './dot-[name]'

// Default export for ergonomic imports
export default Dot[Name]

// Register the custom element (safe — checks for existing registration)
Dot[Name].define('dot-[name]')

// TypeScript global declaration — enables autocomplete in HTML files
declare global {
  interface HTMLElementTagNameMap {
    'dot-[name]': Dot[Name]
  }
}
```

### Rules for index.ts

- This file is the **only place** where `define()` is called
- `export *` ensures named types and constants are available to consumers
- `export default` enables framework-style imports
- The `declare global` block is required for every component — no exceptions

---

## Step 6 — Register in src/index.ts

Add the export to the library barrel. Always append at the end of the components block:

```typescript
// before
export { default as DotButton } from '@/components/dot-button'

// after
export { default as DotButton } from '@/components/dot-button'
export { default as Dot[Name] } from '@/components/dot-[name]'
```

---

## Step 7 — Verify

Run these commands in order. All must pass before the task is complete:

```bash
pnpm lint        # no ESLint errors
pnpm build       # tsc + vite build must succeed
```

If `pnpm build` fails due to a TypeScript error, fix it before finishing.
If `pnpm lint` reports warnings (not errors), they are acceptable.

---

## Events reference

Use `this.emit()` from `DotElement` for all custom events.
Never use `dispatchEvent` directly.

```typescript
// Correct
this.emit('change', { value: this.value })
this.emit('close')

// What this.emit() produces
new CustomEvent('dot:change', {
  detail: { value: this.value },
  bubbles: true,
  composed: true,   // REQUIRED — traverses shadow DOM boundary
})
```

| Event name   | When to emit                          |
| ------------ | ------------------------------------- |
| `dot:change` | Value changes (input, select, toggle) |
| `dot:input`  | Every keystroke (text input)          |
| `dot:focus`  | Component receives focus              |
| `dot:blur`   | Component loses focus                 |
| `dot:open`   | Overlay opens (modal, dropdown)       |
| `dot:close`  | Overlay closes (modal, alert)         |

---

## Parts and slots reference

```
/* Parts — expose for external styling via ::part() */
part="base"      root container of the component
part="label"     main text label
part="input"     native input element
part="icon"      icon element
part="spinner"   loading spinner

/* Slots — content projection */
<slot>                 default content
<slot name="start">    before main content (left icon)
<slot name="end">      after main content (right icon)
<slot name="header">   card / modal header
<slot name="footer">   card / modal footer
```

Only expose parts and slots that the component actually needs.
Do not add parts or slots speculatively.

---

## Tokens quick reference

```css
/* Colors */
var(--dot-text)           /* primary text */
var(--dot-text-sub)       /* secondary text */
var(--dot-text-muted)     /* muted/hint text */
var(--dot-bg)             /* page background */
var(--dot-surface)        /* elevated surface */
var(--dot-surface-2)      /* double elevated surface */
var(--dot-border)         /* default border */
var(--dot-border-focus)   /* focus ring border */
var(--dot-accent)         /* primary action color */
var(--dot-accent-hover)   /* primary action hover */
var(--dot-accent-fg)      /* text on accent background */

/* Semantic */
var(--dot-success) / --dot-success-bg / --dot-success-fg
var(--dot-danger)  / --dot-danger-bg  / --dot-danger-fg
var(--dot-warning) / --dot-warning-bg / --dot-warning-fg
var(--dot-info)    / --dot-info-bg    / --dot-info-fg

/* Spacing */
var(--dot-space-1)  /* 4px  */   var(--dot-space-2)  /* 8px  */
var(--dot-space-3)  /* 12px */   var(--dot-space-4)  /* 16px */
var(--dot-space-6)  /* 24px */   var(--dot-space-8)  /* 32px */

/* Radius */
var(--dot-radius-sm)    /* 4px    */
var(--dot-radius-md)    /* 6px    */
var(--dot-radius-lg)    /* 8px    */
var(--dot-radius-full)  /* 9999px */

/* Shadows */
var(--dot-shadow-xs) | var(--dot-shadow-sm) | var(--dot-shadow-md)

/* Typography */
var(--dot-font-sans) | var(--dot-font-mono)
var(--dot-text-xs) /* 11px */ | var(--dot-text-sm) /* 13px */
var(--dot-text-base) /* 15px */ | var(--dot-text-lg) /* 18px */
var(--dot-weight-normal) /* 400 */ | var(--dot-weight-medium) /* 500 */ | var(--dot-weight-bold) /* 600 */

/* Transitions */
var(--dot-duration-fast) /* 100ms */ | var(--dot-duration-base) /* 150ms */
var(--dot-duration-slow) /* 250ms */ | var(--dot-ease) /* ease-in-out */
```

---

## What must never be done

- ❌ Skip the JSDoc block — it is required on every component
- ❌ Create `CSSStyleSheet` inside the class constructor or any method
- ❌ Use inline `<style>` tags inside the render template
- ❌ Call `getAttribute` / `hasAttribute` / `setAttribute` / `removeAttribute` directly
- ❌ Call `customElements.define()` directly — only `DotElement.define()` via `index.ts`
- ❌ Import CSS without `?inline` — causes FOUC
- ❌ Hardcode any color, font, size, or spacing value
- ❌ Use `any` type — use `unknown` + type guards
- ❌ Emit events without `this.emit()` from `DotElement`
- ❌ Create more than 3 files per component
- ❌ Create subfolders inside a component folder
