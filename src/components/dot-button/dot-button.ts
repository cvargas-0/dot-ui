import { DotElement } from '@/core/dot-element'
import styles from './dot-button.css?inline'

const sheet = new CSSStyleSheet()
sheet.replaceSync(styles)

/**
 * @summary Buttons represent actions that are available to the user.
 * @status experimental
 * @since 0.0.2
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
    static observedAttributes = ['variant', 'size', 'disabled', 'loading', 'block']

    /** The visual style of the button. */
    get variant() {
        return this.attr('variant', 'solid')
    }
    set variant(value: string) {
        this.setAttr('variant', value)
    }

    /** The button size. */
    get size() {
        return this.attr('size', 'md')
    }
    set size(value: string) {
        this.setAttr('size', value)
    }

    /** Disables the button, preventing user interaction. */
    get disabled() {
        return this.boolAttr('disabled')
    }
    set disabled(value: boolean) {
        this.setAttr('disabled', value)
    }

    /** Shows a loading spinner and disables interaction. */
    get loading() {
        return this.boolAttr('loading')
    }
    set loading(value: boolean) {
        this.setAttr('loading', value)
    }

    /** Renders the button as a full-width block element. */
    get block() {
        return this.boolAttr('block')
    }
    set block(value: boolean) {
        this.setAttr('block', value)
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.adoptedStyleSheets = [sheet]
        this.render()
    }

    disconnectedCallback() {}

    attributeChangedCallback() {
        if (this.shadowRoot) this.render()
    }

    render() {
        this.shadowRoot!.innerHTML = /*html*/ `
      <button
        class="btn btn--${this.variant} btn--${this.size}"
        ${this.disabled || this.loading ? 'disabled' : ''}
        part="base"
        aria-busy="${this.loading}"
        aria-disabled="${this.disabled}"
      >
        ${this.loading ? '<span class="btn__spinner" part="spinner" aria-hidden="true"></span>' : ''}
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </button>
    `
    }

    /** Sets focus on the underlying button element. */
    focus() {
        this.shadowRoot?.querySelector('button')?.focus()
    }

    /** Removes focus from the underlying button element. */
    blur() {
        this.shadowRoot?.querySelector('button')?.blur()
    }
}
