import { DotElement } from '@/core/dot-element'
import styles from './dot-badge.css?inline'

const sheet = new CSSStyleSheet()
sheet.replaceSync(styles)

/**
 * @summary Badges are small visual indicators used to label, categorize, or highlight content.
 * @status experimental
 * @since 0.0.4
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper element.
 *
 * @attr {string} variant - The visual style. Options: default | success | danger | warning | info.
 * @attr {string} size - The badge size. Options: sm | md | lg.
 * @attr {boolean} pill - Renders the badge with fully rounded corners.
 */
export default class DotBadge extends DotElement {
    static observedAttributes = ['variant', 'size', 'pill']

    /** The visual style of the badge. */
    get variant() {
        return this.attr('variant', 'default')
    }
    set variant(value: string) {
        this.setAttr('variant', value)
    }

    /** The badge size. */
    get size() {
        return this.attr('size', 'md')
    }
    set size(value: string) {
        this.setAttr('size', value)
    }

    /** Renders the badge with fully rounded corners. */
    get pill() {
        return this.boolAttr('pill')
    }
    set pill(value: boolean) {
        this.setAttr('pill', value)
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.adoptedStyleSheets = [sheet]
        this.render()
    }

    disconnectedCallback() {}

    attributeChangedCallback() {
        if (!this.shadowRoot) return
        this.render()
    }

    render() {
        this.shadowRoot!.innerHTML = /*html*/ `
            <span part="base" class="badge badge--${this.variant} badge--${this.size}">
                <slot></slot>
            </span>
        `
    }
}
