import { html, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { DotElement } from '@/core/dot-element'
import styles from './dot-card.css?inline'

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
 * @attr {string} variant - The visual style. Options: default | outlined | elevated. Defaults to "default".
 * @attr {string} padding - The inner padding of header, body and footer. Options: none | sm | md | lg. Defaults to "md".
 */

@customElement('dot-card')
export default class DotCard extends DotElement {
    static styles = unsafeCSS(styles)

    @property({ type: String }) variant: 'default' | 'outlined' | 'elevated' = 'default'
    @property({ type: String }) padding: 'none' | 'sm' | 'md' | 'lg' = 'md'

    @state() private _hasMedia = false
    @state() private _hasHeader = false
    @state() private _hasFooter = false

    render() {
        return html`
            <div part="base" class="card card--${this.variant} card--pad-${this.padding}">
                <div part="media" ?hidden=${!this._hasMedia}>
                    <slot name="media" @slotchange=${this.#onSlotChange}></slot>
                </div>
                <div part="header" ?hidden=${!this._hasHeader}>
                    <slot name="header" @slotchange=${this.#onSlotChange}></slot>
                </div>
                <div part="body">
                    <slot></slot>
                </div>
                <div part="footer" ?hidden=${!this._hasFooter}>
                    <slot name="footer" @slotchange=${this.#onSlotChange}></slot>
                </div>
            </div>
        `
    }

    #onSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement
        const hasNodes = slot.assignedNodes({ flatten: true }).length > 0
        if (slot.name === 'media') this._hasMedia = hasNodes
        else if (slot.name === 'header') this._hasHeader = hasNodes
        else if (slot.name === 'footer') this._hasFooter = hasNodes
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'dot-card': DotCard
    }
}
