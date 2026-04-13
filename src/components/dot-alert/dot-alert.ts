import { html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { DotElement } from '@/core/dot-element'
import styles from './dot-alert.css?inline'

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
    static styles = unsafeCSS(styles)

    @property({ type: String }) variant: 'default' | 'success' | 'danger' | 'warning' | 'info' =
        'default'
    @property({ type: Boolean, reflect: true }) open = false
    @property({ type: Boolean }) closable = false

    @state() private _hasIcon = false

    render() {
        return html`
            <div
                part="base"
                class="alert alert--${this.variant}${this._hasIcon ? ' alert--has-icon' : ''}"
                role="alert"
                aria-live="polite"
            >
                <span part="icon" class="alert__icon">
                    <slot name="icon" @slotchange=${this.#onIconChange}></slot>
                </span>
                <span part="content" class="alert__content">
                    <slot></slot>
                </span>
                ${this.closable
                    ? html`
                          <button
                              part="close-button"
                              class="alert__close"
                              type="button"
                              aria-label="Close"
                              @click=${this.#handleClose}
                          >
                              <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  aria-hidden="true"
                              >
                                  <path
                                      d="M11 3L3 11M3 3l8 8"
                                      stroke="currentColor"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                  />
                              </svg>
                          </button>
                      `
                    : ''}
            </div>
        `
    }

    #onIconChange(e: Event) {
        this._hasIcon = (e.target as HTMLSlotElement).assignedNodes().length > 0
    }

    #handleClose() {
        this.open = false
        this.emit('close')
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'dot-alert': DotAlert
    }
}
