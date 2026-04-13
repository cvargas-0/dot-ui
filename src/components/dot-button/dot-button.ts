import { html, nothing, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { DotElement } from '@/core/dot-element'
import styles from './dot-button.css?inline'
import '@/components/dot-spinner/dot-spinner'

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
 * @attr {string} type - The button type. Options: button | submit | reset. Only applies when no href is set.
 * @attr {string} href - When set, renders the button as an anchor element with this URL.
 * @attr {string} target - The anchor target. Options: _blank | _self | _parent | _top. Only applies when href is set.
 * @attr {string} rel - The anchor rel attribute. Defaults to "noreferrer noopener" when target="_blank".
 * @attr {string} name - The button name, submitted with form data.
 * @attr {string} value - The button value, submitted with form data.
 * @attr {boolean} disabled - When present, disables the button.
 * @attr {boolean} loading - When present, shows a loading spinner and disables interaction.
 * @attr {boolean} block - When present, renders the button as a full-width block element.
 * @attr {boolean} active - When present, renders the button in an active/pressed state.
 */
@customElement('dot-button')
export default class DotButton extends DotElement {
    static styles = unsafeCSS(styles)

    @property({ type: String }) variant: 'solid' | 'outline' | 'ghost' | 'danger' = 'solid'
    @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md'
    @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button'
    @property({ type: String }) href = ''
    @property({ type: String }) target = ''
    @property({ type: String }) rel = ''
    @property({ type: String }) name = ''
    @property({ type: String }) value = ''
    @property({ type: Boolean, reflect: true }) disabled = false
    @property({ type: Boolean, reflect: true }) loading = false
    @property({ type: Boolean, reflect: true }) block = false
    @property({ type: Boolean }) active = false

    render() {
        const cls = classMap({
            btn: true,
            [`btn--${this.variant}`]: true,
            [`btn--${this.size}`]: true,
            'btn--active': this.active,
            'btn--loading': this.loading,
        })
        const spinnerSize = this.size === 'lg' ? 'md' : 'sm'

        return this.href
            ? html` <a
                  part="base"
                  class=${cls}
                  href=${this.href}
                  target=${ifDefined(this.target || undefined)}
                  rel=${ifDefined(this.#resolveRel() || undefined)}
                  aria-busy=${this.loading}
                  aria-disabled=${this.disabled}
                  @focus=${this.#onFocus}
                  @blur=${this.#onBlur}
              >
                  <slot name="start"></slot>
                  <slot></slot>
                  <slot name="end"></slot>
              </a>`
            : html` <button
                  part="base"
                  class=${cls}
                  type=${this.type}
                  name=${ifDefined(this.name || undefined)}
                  value=${ifDefined(this.value || undefined)}
                  ?disabled=${this.disabled || this.loading}
                  aria-busy=${this.loading}
                  aria-disabled=${this.disabled}
                  aria-pressed=${this.active}
                  @focus=${this.#onFocus}
                  @blur=${this.#onBlur}
              >
                  ${this.loading
                      ? html`<dot-spinner
                            part="spinner"
                            size=${spinnerSize}
                            variant="current"
                            aria-hidden="true"
                        ></dot-spinner>`
                      : nothing}
                  <slot name="start"></slot>
                  <slot></slot>
                  <slot name="end"></slot>
              </button>`
    }

    /** Sets focus on the underlying native element. */
    focus() {
        this.shadowRoot?.querySelector<HTMLElement>('[part="base"]')?.focus()
    }

    /** Removes focus from the underlying native element. */
    blur() {
        this.shadowRoot?.querySelector<HTMLElement>('[part="base"]')?.blur()
    }

    #resolveRel(): string {
        if (this.rel) return this.rel
        if (this.target === '_blank') return 'noreferrer noopener'
        return ''
    }

    #onFocus() {
        this.emit('focus')
    }

    #onBlur() {
        this.emit('blur')
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'dot-button': DotButton
    }
}
