# Skill: jsdoc

Use this skill whenever writing or updating JSDoc for a dot-ui component.

Triggers: "add jsdoc to dot-[name]", "document dot-[name]", "create a new component" (always included)

---

## Overview

Every dot-ui component class must have a JSDoc block placed **directly above the class declaration**,
after the `sheet` module-level constant and before `export`.

The JSDoc block is the public contract of the component. It documents:
- What the component does (`@summary`)
- If it depends on another component (`@dependency`)
- Its status in the system (`@status`)
- Which version it was added (`@since`)
- Every custom event it emits (`@event`)
- Every slot it exposes (`@slot`)
- Every CSS part it exposes (`@csspart`)
- Every observed attribute (`@attr`)
- Public methods (`@method`)

---

## Block structure

```typescript
/**
 * @summary One sentence describing what the component does.
 * @status stable | beta | experimental
 * @since 0.1.0
 *
 * @dependency dot:[name] - Description of the dependency.
 * 
 * @event {CustomEvent} dot:[name] - Description of when this event fires.
 *
 * @slot - The component's default content.
 * @slot [name] - Description of named slot.
 *
 * @csspart base - The component's root wrapper.
 * @csspart [name] - Description of the part.
 */
export class Dot[Name] extends DotElement {
```

---

## Tag rules

### `@summary`
- One sentence only. No period at the end.
- Describe **what it does**, not what it is.
- ✅ `Buttons represent actions that are available to the user`
- ❌ `A button component for dot-ui`

### `@status`
Always one of these three values — nothing else:

| Value          | Meaning                                              |
| -------------- | ---------------------------------------------------- |
| `experimental` | New, API may change, not production-ready            |
| `beta`         | Mostly stable, minor API changes possible            |
| `stable`       | Production-ready, API is locked                      |

New components always start as `experimental`.

### `@since`
The version in `package.json` at the time the component is created.
Format: `major.minor.patch` — e.g. `0.1.0`, `1.0.0`.

### `@event`
One line per event. Format:

```
@event {CustomEvent<Detail>} dot:[name] - Description of when it fires.
```

- Always prefix with `dot:` — matches `this.emit()` convention
- Include the detail type if it carries data
- Use present tense: "Emitted when..." or direct description

```typescript
// Examples
@event {CustomEvent} dot:focus - Emitted when the component gains focus.
@event {CustomEvent} dot:blur - Emitted when the component loses focus.
@event {CustomEvent<{ value: string }>} dot:change - Emitted when the value changes.
@event {CustomEvent} dot:close - Emitted when the component closes.
@event {CustomEvent} dot:open - Emitted when the component opens.
```

Only document events that the component actually emits via `this.emit()`.
Do not document inherited or speculative events.

### `@slot`
One line per slot. The default slot has no name:

```typescript
// Default slot (no name attribute)
@slot - The component's default content.
@slot - The badge's content.
@slot - The button's label.

// Named slots
@slot start - A presentational prefix icon or similar element.
@slot end - A presentational suffix icon or similar element.
@slot header - The component's header content.
@slot footer - The component's footer content.
```

Only document slots that exist in the `render()` template.
Match slot names exactly — `slot name="start"` → `@slot start`.

### `@csspart`
One line per part. Format:

```
@csspart [name] - Description of what this part wraps.
```

```typescript
// Examples
@csspart base - The component's base wrapper.
@csspart label - The component's text label.
@csspart input - The native input element.
@csspart prefix - The container that wraps the start slot.
@csspart suffix - The container that wraps the end slot.
@csspart spinner - The spinner shown during the loading state.
```

Only document parts that exist in the `render()` template via `part="[name]"`.

### `@attr` (optional — for non-obvious attributes)
Document attributes whose behavior is not self-evident:

```typescript
@attr {string} variant - The visual variant. Options: solid | outline | ghost | danger.
@attr {string} size - The component size. Options: sm | md | lg.
@attr {boolean} disabled - Disables the component.
@attr {boolean} loading - Shows a loading spinner and disables interaction.
@attr {boolean} block - Renders the component as a full-width block element.
```

---

## Complete examples

### dot-button

```typescript
/**
 * @summary Buttons represent actions that are available to the user.
 * @status stable
 * @since 0.1.0
 *
 * @event {CustomEvent} dot:focus - Emitted when the button gains focus.
 * @event {CustomEvent} dot:blur - Emitted when the button loses focus.
 *
 * @slot - The button's label.
 * @slot start - A presentational prefix icon or similar element.
 * @slot end - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart spinner - The spinner shown when the button is in the loading state.
 *
 * @attr {string} variant - The visual style. Options: solid | outline | ghost | danger.
 * @attr {string} size - The button size. Options: sm | md | lg.
 * @attr {boolean} disabled - Disables the button.
 * @attr {boolean} loading - Shows a loading spinner and disables interaction.
 * @attr {boolean} block - Renders the button as a full-width block element.
 */
export default class DotButton extends DotElement {
```

### dot-badge

```typescript
/**
 * @summary Badges are used to draw attention and display statuses or counts.
 * @status experimental
 * @since 0.1.0
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @attr {string} variant - The visual style. Options: default | success | danger | warning | info.
 * @attr {string} size - The badge size. Options: sm | md | lg.
 * @attr {boolean} pill - Renders the badge with fully rounded corners.
 */
export class DotBadge extends DotElement {
```

### dot-input

```typescript
/**
 * @summary Inputs allow the user to enter data into a form field.
 * @status experimental
 * @since 0.1.0
 *
 * @event {CustomEvent<{ value: string }>} dot:input - Emitted on every keystroke.
 * @event {CustomEvent<{ value: string }>} dot:change - Emitted when the value is committed.
 * @event {CustomEvent} dot:focus - Emitted when the input gains focus.
 * @event {CustomEvent} dot:blur - Emitted when the input loses focus.
 *
 * @slot start - A presentational prefix icon or similar element.
 * @slot end - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart input - The native input element.
 * @csspart label - The input's label.
 *
 * @attr {string} type - The input type. Options: text | email | password | number | search.
 * @attr {string} value - The current value.
 * @attr {string} placeholder - Placeholder text shown when empty.
 * @attr {string} size - The input size. Options: sm | md | lg.
 * @attr {boolean} disabled - Disables the input.
 * @attr {boolean} readonly - Makes the input read-only.
 * @attr {boolean} required - Marks the input as required.
 */
export class DotInput extends DotElement {
```

### dot-alert

```typescript
/**
 * @summary Alerts display important messages inline or as toast notifications.
 * @status experimental
 * @since 0.1.0
 *
 * @event {CustomEvent} dot:close - Emitted when the alert is dismissed.
 *
 * @slot - The alert's main content.
 * @slot icon - An icon to show in the alert.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the icon slot.
 * @csspart content - The container that wraps the default slot.
 * @csspart close-button - The close button.
 *
 * @attr {string} variant - The visual style. Options: default | success | danger | warning | info.
 * @attr {boolean} closable - Shows a close button to dismiss the alert.
 * @attr {boolean} open - Shows the alert when present.
 */
export class DotAlert extends DotElement {
```

### dot-card

```typescript
/**
 * @summary Cards group related content and actions into a contained surface.
 * @status experimental
 * @since 0.1.0
 *
 * @slot - The card's main body content.
 * @slot header - The card's header content.
 * @slot footer - The card's footer content.
 * @slot media - An image or media element displayed at the top.
 *
 * @csspart base - The component's base wrapper.
 * @csspart header - The container that wraps the header slot.
 * @csspart body - The container that wraps the default slot.
 * @csspart footer - The container that wraps the footer slot.
 * @csspart media - The container that wraps the media slot.
 */
export class DotCard extends DotElement {
```

---

## Where the block goes

```typescript
import { DotElement } from '@/core/dot-element'
import styles from './dot-[name].css?inline'

const sheet = new CSSStyleSheet()
sheet.replaceSync(styles)

/**          ← JSDoc block starts HERE, after the sheet constant
 * @summary ...
 * ...
 */
export class Dot[Name] extends DotElement {   ← and ends HERE
```

Never place the JSDoc block:
- Before the imports
- Between imports and the `sheet` constant
- Inside the class body
- On `index.ts` — only on the class in `dot-[name].ts`

---

## Property and method JSDoc

In addition to the class block, document non-obvious properties and public methods inline:

```typescript
/** The visual style of the component. */
get variant() { return this.attr('variant', 'solid') }

/** Disables the component, preventing user interaction. */
get disabled() { return this.boolAttr('disabled') }

/** Sets focus on the underlying native element. */
focus() { this.shadowRoot?.querySelector('button')?.focus() }

/** Removes focus from the underlying native element. */
blur() { this.shadowRoot?.querySelector('button')?.blur() }

/** Programmatically shows the component. */
show() { this.setAttr('open', true) }

/** Programmatically hides the component. */
hide() { this.setAttr('open', false) }
```

Keep property docs to one line. Only document what is not immediately obvious from the name.

---

## Checklist before finishing

- [ ] `@summary` is one sentence, no period at end
- [ ] `@status` is one of: `experimental`, `beta`, `stable`
- [ ] `@since` matches the current version in `package.json`
- [ ] Every `this.emit('x')` call has a matching `@event dot:x`
- [ ] Every `<slot name="x">` has a matching `@slot x`
- [ ] Every `part="x"` in render() has a matching `@csspart x`
- [ ] Block is placed after `sheet` constant, before `export class`
- [ ] No `@event`, `@slot`, or `@csspart` entries that don't exist in code
