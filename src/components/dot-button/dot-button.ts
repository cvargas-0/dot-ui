import { DotElement } from '@/core/dot-element'
import styles from './dot-button.css?inline'

const sheet = new CSSStyleSheet()
sheet.replaceSync(styles)

export default class DotButton extends DotElement {
    static observedAttributes = ['variant', 'size', 'disabled', 'loading', 'block']

    get variant() {
        return this.attr('variant', 'solid')
    }
    set variant(value: string) {
        this.setAttr('variant', value)
    }

    get size() {
        return this.attr('size', 'md')
    }
    set size(value: string) {
        this.setAttr('size', value)
    }

    get disabled() {
        return this.boolAttr('disabled')
    }
    set disabled(value: boolean) {
        this.setAttr('disabled', value)
    }

    get loading() {
        return this.boolAttr('loading')
    }
    set loading(value: boolean) {
        this.setAttr('loading', value)
    }

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
        ${this.loading ? '<span class="btn__spinner" aria-hidden="true"></span>' : ''}
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>
      </button>
    `
    }

    focus() {
        this.shadowRoot?.querySelector('button')?.focus()
    }
    blur() {
        this.shadowRoot?.querySelector('button')?.blur()
    }
}
