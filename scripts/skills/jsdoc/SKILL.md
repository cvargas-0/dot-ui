# Skill: jsdoc

Use this skill whenever writing or updating JSDoc for a dot-ui component.

Triggers: "add jsdoc to dot-[name]", "document dot-[name]", "create a new component" (always included)

---

## Overview

Every dot-ui component class must have a JSDoc block placed **directly above the `@customElement` decorator**,
after the `declare global` block.

The JSDoc block is the public contract of the component. It documents:
- What the component does (`@summary`)
- If it depends on another component (`@dependency`)
- Its status in the system (`@status`)
- Which version it was added (`@since`)
- Every custom event it emits (`@event`)
- Every slot it exposes (`@slot`)
- Every CSS part it exposes (`@csspart`)
- Every observed attribute (`@attr`)

---

## Block structure

```typescript
declare global {
    interface HTMLElementTagNameMap {
        'dot-[name]': Dot[Name]
    }
}

/**
 * @summary One sentence describing what the component does.
 * @status stable | beta | experimental
 * @since 0.1.0
 *
 * @dependency dot-spinner - Description of the dependency.
 *
 * @event {CustomEvent} dot:[name] - Description of when this event fires.
 *
 * @slot - The component's default content.
 * @slot [name] - Description of named slot.
 *
 * @csspart base - The component's root wrapper.
 * @csspart [name] - Description of the part.
 *
 * @attr {string} variant - The visual style. Options: ... Defaults to "default".
 * @attr {boolean} disabled - When present, disables the component.
 */
@customElement('dot-[name]')
export default class Dot[Name] extends DotElement {
```

---

## Tag rules

### `@summary`
- One sentence only. No period at the end.
- Describe **what it does**, not what it is.
- ✅ `Buttons represent actions that are available to the user`
- ❌ `A button component for dot-ui`

### `@status`
Always one of these three values:

| Value | Meaning |
| --- | --- |
| `experimental` | New, API may change, not production-ready |
| `beta` | Mostly stable, minor API changes possible |
| `stable` | Production-ready, API is locked |

New components always start as `experimental`.

### `@since`
The version in `package.json` at the time the component is created.
Format: `major.minor.patch` — e.g. `0.1.0`, `1.0.0`.

### `@event`
One line per event. Format:

```
@event {CustomEvent<Detail>} dot:[name] - Description of when it fires.
```

```typescript
@event {CustomEvent} dot:focus - Emitted when the component gains focus.
@event {CustomEvent} dot:blur - Emitted when the component loses focus.
@event {CustomEvent<{ value: string }>} dot:change - Emitted when the value changes.
@event {CustomEvent} dot:close - Emitted when the component closes.
```

Only document events that the component actually emits via `this.emit()`.

### `@slot`
One line per slot. The default slot has no name:

```typescript
@slot - The component's default content.
@slot start - A presentational prefix icon or similar element.
@slot end - A presentational suffix icon or similar element.
@slot header - The component's header content.
@slot icon - An icon placed before the content.
```

Match slot names exactly — `<slot name="start">` → `@slot start`.

### `@csspart`
One line per part:

```typescript
@csspart base - The component's base wrapper.
@csspart input - The native input element.
@csspart spinner - The spinner shown during the loading state.
@csspart close-button - The button that dismisses the component.
```

Only document parts that exist via `part="[name]"` in the template.

### `@attr`
Document all public attributes:

```typescript
@attr {string} variant - The visual style. Options: solid | outline | ghost | danger. Defaults to "solid".
@attr {string} size - The component size. Options: sm | md | lg. Defaults to "md".
@attr {boolean} disabled - When present, disables the component.
@attr {boolean} loading - When present, shows a loading spinner and disables interaction.
@attr {boolean} open - When present, the component is visible.
```

Use "When present" for booleans — matches the HTML attribute convention.
Always include the default value for string attributes.

---

## Complete examples

### dot-button

```typescript
/**
 * @summary Buttons represent actions that are available to the user.
 * @status experimental
 * @since 0.0.5
 *
 * @dependency dot-spinner - Used to render the loading indicator.
 *
 * @event {CustomEvent} dot:focus - Emitted when the button gains focus.
 * @event {CustomEvent} dot:blur - Emitted when the button loses focus.
 *
 * @slot - The button's label.
 * @slot start - A presentational prefix icon or similar element.
 * @slot end - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper (button or anchor element).
 * @csspart spinner - The dot-spinner element shown when the button is in the loading state.
 *
 * @attr {string} variant - The visual style. Options: solid | outline | ghost | danger. Defaults to "solid".
 * @attr {string} size - The button size. Options: sm | md | lg. Defaults to "md".
 * @attr {string} href - When set, renders the button as an anchor element with this URL.
 * @attr {boolean} disabled - When present, disables the button.
 * @attr {boolean} loading - When present, shows a loading spinner and disables interaction.
 * @attr {boolean} block - When present, renders the button as a full-width block element.
 */
@customElement('dot-button')
export default class DotButton extends DotElement {
```

### dot-badge

```typescript
/**
 * @summary Badges are small visual indicators used to label, categorize, or highlight content.
 * @status experimental
 * @since 0.0.4
 *
 * @slot - The badge's content. Accepts text, icons, or a spinner.
 *
 * @csspart base - The component's base wrapper element.
 *
 * @attr {string} variant - The visual style. Options: default | success | danger | warning | info. Defaults to "default".
 * @attr {string} size - The badge size. Options: sm | md | lg. Defaults to "md".
 * @attr {boolean} pill - When present, renders the badge with fully rounded corners.
 */
@customElement('dot-badge')
export default class DotBadge extends LitElement {
```

### dot-alert

```typescript
/**
 * @summary Alerts display a short, important message to attract the user's attention.
 * @status experimental
 * @since 0.0.4
 *
 * @event {CustomEvent} dot:close - Emitted when the alert is dismissed via the close button.
 *
 * @slot - The alert's main content.
 * @slot icon - An icon or visual indicator placed before the content.
 *
 * @csspart base - The component's base wrapper element.
 * @csspart icon - The container wrapping the icon slot.
 * @csspart content - The container wrapping the default slot.
 * @csspart close-button - The button that dismisses the alert.
 *
 * @attr {string} variant - The visual style. Options: default | success | danger | warning | info. Defaults to "default".
 * @attr {boolean} open - When present, the alert is visible.
 * @attr {boolean} closable - When present, shows a close button that dismisses the alert.
 */
@customElement('dot-alert')
export default class DotAlert extends DotElement {
```

---

## Where the block goes

```typescript
import { html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { DotElement } from '@/core/dot-element'
import styles from './dot-[name].css?inline'

declare global {
    interface HTMLElementTagNameMap {
        'dot-[name]': Dot[Name]
    }
}

/**          ← JSDoc block starts HERE, after declare global
 * @summary ...
 */
@customElement('dot-[name]')   ← decorator goes here, between JSDoc and class
export default class Dot[Name] extends DotElement {
```

Never place the JSDoc block:
- Before the imports
- Inside the class body
- On a separate file — only on the class in `dot-[name].ts`

---

## Checklist before finishing

- [ ] `@summary` is one sentence, no period at end
- [ ] `@status` is one of: `experimental`, `beta`, `stable`
- [ ] `@since` matches the current version in `package.json`
- [ ] Every `this.emit('x')` call has a matching `@event dot:x`
- [ ] Every `<slot name="x">` has a matching `@slot x`
- [ ] Every `part="x"` in render() has a matching `@csspart x`
- [ ] Every `@property()` has a matching `@attr`
- [ ] Boolean `@attr` entries use "When present" phrasing
- [ ] String `@attr` entries include the default value
- [ ] Block is placed after `declare global`, before `@customElement`
- [ ] No entries that don't exist in the actual code
