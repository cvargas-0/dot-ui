# Skill: create-component

Use this skill whenever asked to create a new dot-ui component.

Triggers: "create a dot-[name] component", "add a new [name] component", "build dot-[name]"

---

## Before you start

1. Read `src/core/dot-element.ts` to understand the base class API
2. Read `src/styles/tokens.css` to know which tokens are available
3. Read `src/components/dot-badge/dot-badge.ts` as the reference implementation (simplest component)
4. Read `scripts/skills/jsdoc/SKILL.md` — JSDoc is required on every component
5. Confirm the component name follows the `dot-[name]` convention

---

## Step 1 — Plan the component

Before writing any code, define:

| Item | Question to answer |
| --- | --- |
| **Tag** | What is the HTML tag? `dot-[name]` |
| **Class** | What is the TS class name? `Dot[Name]` |
| **Properties** | What `@property()` does it expose? Type and default for each. |
| **Internal state** | What `@state()` does it need internally? |
| **Variants** | Does it have visual variants? Which ones? |
| **Sizes** | Does it support `sm`, `md`, `lg`? |
| **Boolean attrs** | Which booleans need `reflect: true` for CSS `:host([attr])` selectors? |
| **Events** | What `dot:` events does it emit? What is the `detail` payload? |
| **Slots** | What slots does it expose? Which named slots can be empty? |
| **Parts** | What CSS parts does it expose? `base` is always required. |
| **Public methods** | Does it need `focus()`, `show()`, `hide()`, etc.? |
| **Queries** | Does it need `@query()` to access shadow DOM elements? |
| **display** | What is the `:host` display? `inline-block`, `block`, or `contents`? |

---

## Step 2 — Create the files

Create exactly **2 files** inside `src/components/dot-[name]/`. Nothing more.

```
src/components/dot-[name]/
├── dot-[name].ts       ← component class + declare global
└── dot-[name].css      ← component styles
```

---

## Step 3 — dot-[name].ts

```typescript
import { html, unsafeCSS } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { DotElement } from '@/core/dot-element'
import styles from './dot-[name].css?inline'

// declare global goes AFTER the class — TypeScript augmentation for HTML autocomplete
declare global {
    interface HTMLElementTagNameMap {
        'dot-[name]': Dot[Name]
    }
}

/**
 * @summary One sentence describing what this component does.
 * @status experimental
 * @since [current version from package.json]
 *
 * @event {CustomEvent} dot:[event] - Emitted when ...
 *
 * @slot - The component's default content.
 * @slot start - A presentational prefix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 *
 * @attr {string} variant - The visual style. Options: default | ...  Defaults to "default".
 * @attr {string} size - The component size. Options: sm | md | lg. Defaults to "md".
 * @attr {boolean} disabled - When present, disables the component.
 */
@customElement('dot-[name]')
export default class Dot[Name] extends DotElement {
    static styles = unsafeCSS(styles)

    // Public properties — reflected as HTML attributes
    @property({ type: String }) variant = 'default'
    @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md'
    @property({ type: Boolean }) disabled = false
    // Use reflect: true only when needed for CSS :host([attr]) selectors
    @property({ type: Boolean, reflect: true }) open = false

    // Internal reactive state — not reflected as HTML attributes
    @state() private _hasIcon = false

    // Shadow DOM queries — available after first render
    @query('[part="base"]') private _base!: HTMLElement

    render() {
        return html`
            <div
                part="base"
                class=${classMap({
                    '[name]': true,
                    [`[name]--${this.variant}`]: true,
                    [`[name]--${this.size}`]: true,
                })}
                aria-disabled=${this.disabled}
            >
                <slot name="start"></slot>
                <slot></slot>
            </div>
        `
    }

    /** Sets focus on the underlying native element. */
    focus() {
        this._base?.focus()
    }

    /** Removes focus from the underlying native element. */
    blur() {
        this._base?.blur()
    }
}
```

### Rules for dot-[name].ts

- `declare global` block goes **before** the JSDoc and `@customElement` — no exceptions
- `@customElement('dot-[name]')` handles registration — never call `customElements.define()` directly
- `export default` is required — `src/index.ts` imports the default export
- Never import from `../../` — always use the `@/` alias
- Only import directives that the component actually uses
- `@state()` for internal reactive state — not reflected to HTML attributes
- `@query()` replaces `this.shadowRoot?.querySelector()`
- JSDoc block is **required** — see `scripts/skills/jsdoc/SKILL.md`

### Directives reference

| Directive | Import | When to use |
| --- | --- | --- |
| `classMap` | `lit/directives/class-map.js` | Conditional class names |
| `ifDefined` | `lit/directives/if-defined.js` | Optional attrs — avoids empty `attr=""` in DOM |
| `live` | `lit/directives/live.js` | Controlled inputs — forces value sync |
| `nothing` | `lit` | Conditional block with no empty node |

---

## Step 4 — dot-[name].css

```css
/* ---- Host ---- */
:host {
    display: inline-block;        /* or block if the component is full-width */
    font-family: var(--dot-font-sans);
}

/* ---- Base ---- */
.[name] {
    /* Always use --dot-* tokens. Never hardcode colors, sizes, or fonts. */
    color: var(--dot-text);
    background-color: var(--dot-surface);
    border: 1px solid var(--dot-border);
    border-radius: var(--dot-radius-md);
    font-size: var(--dot-text-sm);
    padding: var(--dot-space-2) var(--dot-space-4);
    transition:
        background-color var(--dot-duration-base) var(--dot-ease),
        border-color var(--dot-duration-base) var(--dot-ease),
        color var(--dot-duration-base) var(--dot-ease);
}

/* ---- Variants ---- */
.[name]--default { }
.[name]--[variant] { }

/* ---- Sizes ---- */
.[name]--sm { }
.[name]--md { }
.[name]--lg { }

/* ---- States ---- */
.[name]:hover { }

.[name]:focus-visible {
    outline: 2px solid var(--dot-border-focus);
    outline-offset: 2px;
}

/* ---- Boolean attribute states — use :host([attr]) not CSS classes ---- */
:host([disabled]) .[name] {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
}

:host([open]) {
    display: block;
}

:host(:not([open])) {
    display: none;
}
```

### Rules for dot-[name].css

- **Never hardcode** colors, fonts, sizes, or spacing — always use `--dot-*` tokens
- CSS nesting is **allowed** — ESLint is configured with `newly-available`
- Boolean attribute states use `:host([attr])` selector — not CSS classes
- `focus-visible` is preferred over `focus` for keyboard accessibility

---

## Step 5 — Register in src/index.ts

Add the export to the library barrel. Import directly from the component file (no barrel per component):

```typescript
// before
export { default as DotButton } from '@/components/dot-button/dot-button'

// after
export { default as DotButton } from '@/components/dot-button/dot-button'
export { default as Dot[Name] } from '@/components/dot-[name]/dot-[name]'
```

---

## Step 6 — Verify

Run these commands in order. All must pass before the task is complete:

```bash
pnpm lint        # no ESLint errors
pnpm build       # tsc + vite build must succeed
```

If `pnpm build` fails due to a TypeScript error, fix it before finishing.

---

## Events reference

Use `this.emit()` from `DotElement` for all custom events.

```typescript
this.emit('close')
this.emit('input', { value: this._input.value })
```

Use `@event=${this.#handler}` syntax in the template — Lit cleans up listeners automatically.

| Event name | When to emit |
| --- | --- |
| `dot:change` | Value changes (input, select, toggle) |
| `dot:input` | Every keystroke (text input) |
| `dot:focus` | Component receives focus |
| `dot:blur` | Component loses focus |
| `dot:open` | Overlay opens (modal, dropdown) |
| `dot:close` | Overlay closes (modal, alert) |

---

## Slots with collapse behavior

Named slots that can be empty should auto-collapse their container:

```typescript
@state() private _hasHeader = false

// In render():
html`
    <div part="header" ?hidden=${!this._hasHeader}>
        <slot name="header" @slotchange=${this.#onHeaderChange}></slot>
    </div>
`

#onHeaderChange(e: Event) {
    this._hasHeader = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0
}
```

See [[composition]] in the wiki for the full pattern.

---

## Parts and slots reference

```
/* Parts — expose for external styling via ::part() */
part="base"      root container of the component
part="input"     native input element
part="icon"      icon element
part="spinner"   loading spinner

/* Slots — content projection */
<slot>                 default content
<slot name="start">    before main content (left icon)
<slot name="end">      after main content (right icon)
<slot name="header">   card / modal header
<slot name="footer">   card / modal footer
<slot name="icon">     alert / toast icon
```

Only expose parts and slots that the component actually needs.
Do not add parts or slots speculatively.

---

## What must never be done

- ❌ Skip the JSDoc block — it is required on every component
- ❌ Create an `index.ts` per component — `declare global` lives in the component `.ts` file
- ❌ Use `observedAttributes`, getters, or setters — use `@property()` and `@state()`
- ❌ Create `CSSStyleSheet` manually — use `static styles = unsafeCSS(styles)`
- ❌ Use inline `<style>` tags inside the render template
- ❌ Call `customElements.define()` directly — use `@customElement()` decorator
- ❌ Import CSS without `?inline` — causes FOUC
- ❌ Hardcode any color, font, size, or spacing value
- ❌ Use `any` type — use `unknown` + type guards
- ❌ Emit events without `this.emit()` from `DotElement`
- ❌ Create more than 2 files per component
- ❌ Create subfolders inside a component folder
