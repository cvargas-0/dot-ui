import { DotElement } from '@/core/dot-element'
import styles from './dot-card.css?inline'

const sheet = new CSSStyleSheet()
sheet.replaceSync(styles)

/**
 * @summary Cards group related content and actions into a contained surface.
 * @status experimental
 * @since 0.0.6
 *
 * @slot - The card's main body content.
 * @slot media - An image or media element displayed at the top of the card.
 * @slot header - The card's header content.
 * @slot footer - The card's footer content.
 *
 * @csspart base - The component's base wrapper.
 * @csspart media - The container that wraps the media slot.
 * @csspart header - The container that wraps the header slot.
 * @csspart body - The container that wraps the default slot.
 * @csspart footer - The container that wraps the footer slot.
 *
 * @attr {string} variant - The visual style. Options: default | outlined | elevated.
 * @attr {string} padding - The inner padding of header, body and footer. Options: none | sm | md | lg.
 */
export default class DotCard extends DotElement {
    static observedAttributes = ['variant', 'padding']

    /** The visual style of the card. */
    get variant() {
        return this.attr('variant', 'default')
    }
    set variant(v: string) {
        this.setAttr('variant', v)
    }

    /** The inner padding applied to header, body, and footer sections. */
    get padding() {
        return this.attr('padding', 'md')
    }
    set padding(v: string) {
        this.setAttr('padding', v)
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.adoptedStyleSheets = [sheet]
        this.render()
        this.#watchSlots()
    }

    disconnectedCallback() {}

    // Only the className needs to change on attribute update — no DOM recreation.
    // Avoids clearing slotchange listeners and losing projected content.
    attributeChangedCallback() {
        if (!this.shadowRoot) return
        this.#updateAttributes()
    }

    render() {
        this.shadowRoot!.innerHTML = /*html*/ `
            <div part="base" class="${this.#buildClass()}">
                <div part="media" hidden><slot name="media"></slot></div>
                <div part="header" hidden><slot name="header"></slot></div>
                <div part="body"><slot></slot></div>
                <div part="footer" hidden><slot name="footer"></slot></div>
            </div>
        `
    }

    #buildClass(): string {
        return `card card--${this.variant} card--pad-${this.padding}`
    }

    #updateAttributes() {
        const base = this.shadowRoot?.querySelector('[part="base"]')
        if (!base) {
            this.render()
            this.#watchSlots()
            return
        }
        base.className = this.#buildClass()
    }

    // Show/hide named slot containers based on whether content is projected.
    // Prevents empty padding gaps when slots are not used.
    #watchSlots() {
        const named = ['media', 'header', 'footer'] as const
        named.forEach((name) => {
            const slot = this.shadowRoot!.querySelector<HTMLSlotElement>(`slot[name="${name}"]`)
            slot?.addEventListener('slotchange', () => this.#updateSlotVisibility(name))
            this.#updateSlotVisibility(name)
        })
    }

    #updateSlotVisibility(name: 'media' | 'header' | 'footer') {
        const slot = this.shadowRoot!.querySelector<HTMLSlotElement>(`slot[name="${name}"]`)
        const container = this.shadowRoot!.querySelector<HTMLElement>(`[part="${name}"]`)
        if (!slot || !container) return
        container.hidden = slot.assignedNodes({ flatten: true }).length === 0
    }
}
