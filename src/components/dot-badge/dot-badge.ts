import { LitElement, unsafeCSS, html } from 'lit'
import styles from './dot-badge.css?inline'
import { customElement, property } from 'lit/decorators.js'

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
    static styles = unsafeCSS(styles)

    @property({ type: String }) variant: 'default' | 'success' | 'danger' | 'warning' | 'info' =
        'default'
    @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md'
    @property({ type: Boolean }) pill = false

    render() {
        return html`
            <span part="base" class="badge badge--${this.variant} badge--${this.size}">
                <slot></slot>
            </span>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'dot-badge': DotBadge
    }
}
