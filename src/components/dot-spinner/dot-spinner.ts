import { DotElement } from '@/core/dot-element'
import styles from './dot-spinner.css?inline'

const sheet = new CSSStyleSheet()
sheet.replaceSync(styles)

/**
 * @summary Spinner indicates that content is loading or an action is in progress.
 * @status experimental
 * @since 0.0.5
 *
 * @csspart base - The spinner's animated circle element.
 *
 * @attr {string} variant - The color variant. Options: default | muted | current.
 * @attr {string} size - The spinner size. Options: sm | md | lg.
 */
export default class DotSpinner extends DotElement {
    static observedAttributes = ['variant', 'size']

    /** The color variant of the spinner. */
    get variant() {
        return this.attr('variant', 'default')
    }
    set variant(value: string) {
        this.setAttr('variant', value)
    }

    /** The spinner size. */
    get size() {
        return this.attr('size', 'md')
    }
    set size(value: string) {
        this.setAttr('size', value)
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
            <div
                part="base"
                class="spinner spinner--${this.variant} spinner--${this.size}"
                role="status"
                aria-label="Loading"
            ></div>
        `
    }
}
