import { html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { DotElement } from '@/core/dot-element'
import styles from './dot-spinner.css?inline'

/**
 * @summary Spinner indicates that content is loading or an action is in progress.
 * @status experimental
 * @since 0.0.5
 *
 * @csspart base - The spinner's animated circle element.
 *
 * @attr {string} variant - The color variant. Options: default | muted | current. Defaults to "default".
 * @attr {string} size - The spinner size. Options: sm | md | lg. Defaults to "md".
 */
@customElement('dot-spinner')
export default class DotSpinner extends DotElement {
    static styles = unsafeCSS(styles)

    @property({ type: String }) variant: 'default' | 'muted' | 'current' = 'default'
    @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md'

    render() {
        return html`
            <div
                part="base"
                class="spinner spinner--${this.variant} spinner--${this.size}"
                role="status"
                aria-label="Loading"
            ></div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'dot-spinner': DotSpinner
    }
}
