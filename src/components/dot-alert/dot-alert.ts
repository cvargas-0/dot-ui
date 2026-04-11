import { DotElement } from '@/core/dot-element'
import styles from './dot-alert.css?inline'

const sheet = new CSSStyleSheet()
sheet.replaceSync(styles)

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
 * @attr {string} variant - The visual style. Options: default | success | danger | warning | info.
 * @attr {boolean} open - When present, the alert is visible.
 * @attr {boolean} closable - Shows a close button that dismisses the alert.
 */
export default class DotAlert extends DotElement {
    static observedAttributes = ['variant', 'open', 'closable']

    #controller: AbortController | null = null

    /** The visual style of the alert. */
    get variant() {
        return this.attr('variant', 'default')
    }
    set variant(value: string) {
        this.setAttr('variant', value)
    }

    /** When true, the alert is visible. */
    get open() {
        return this.boolAttr('open')
    }
    set open(value: boolean) {
        this.setAttr('open', value)
    }

    /** Shows a close button that dismisses the alert. */
    get closable() {
        return this.boolAttr('closable')
    }
    set closable(value: boolean) {
        this.setAttr('closable', value)
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.adoptedStyleSheets = [sheet]
        this.render()
        this.#attachListeners()
    }

    disconnectedCallback() {
        this.#controller?.abort()
        this.#controller = null
    }

    attributeChangedCallback() {
        if (!this.shadowRoot) return
        this.render()
        this.#attachListeners()
    }

    render() {
        this.shadowRoot!.innerHTML = /*html*/ `
            <div
                part="base"
                class="alert alert--${this.variant}"
                role="alert"
                aria-live="polite"
            >
                <span part="icon" class="alert__icon">
                    <slot name="icon"></slot>
                </span>
                <span part="content" class="alert__content">
                    <slot></slot>
                </span>
                ${
                    this.closable
                        ? `<button part="close-button" class="alert__close" type="button" aria-label="Close">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>`
                        : ''
                }
            </div>
        `
    }

    // ---- Private ----

    #attachListeners() {
        this.#controller?.abort()
        this.#controller = new AbortController()
        const { signal } = this.#controller

        // Close button
        const closeBtn = this.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]')
        if (closeBtn) {
            closeBtn.addEventListener(
                'click',
                () => {
                    this.open = false
                    this.emit('close')
                },
                { signal }
            )
        }

        // Icon slot visibility — toggle .alert--has-icon on base element
        const iconSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="icon"]')
        if (iconSlot) {
            const syncIconClass = () => {
                const base = this.shadowRoot?.querySelector('[part="base"]')
                base?.classList.toggle('alert--has-icon', iconSlot.assignedNodes().length > 0)
            }
            iconSlot.addEventListener('slotchange', syncIconClass, { signal })
            syncIconClass()
        }
    }
}
