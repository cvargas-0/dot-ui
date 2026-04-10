import styles from '@/components/dot-button/dot-button.css?inline'

const styleSheet = new CSSStyleSheet()
styleSheet.replaceSync(styles)

export class DotButton extends HTMLElement {
    static observedAttributes = ['variant', 'size', 'disabled', 'loading', 'block']

    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.adoptedStyleSheets = [styleSheet]
        this.render()
    }

    attributeChangedCallback() {
        if (this.shadowRoot) this.render()
    }

    private render() {
        const variant = this.getAttribute('variant') ?? 'solid'
        const size = this.getAttribute('size') ?? 'md'
        const loading = this.hasAttribute('loading')
        const disabled = this.hasAttribute('disabled')

        this.shadowRoot!.innerHTML = /*html*/ `
      <button class="btn btn--${variant} btn--${size}" ${disabled || loading ? 'disabled' : ''} part="button" aria-busy="${loading}">
        ${loading ? '<span class="btn__spinner" aria-hidden="true"></span>' : ''}
        <slot></slot>
      </button>
    `
    }
}

customElements.define('dot-button', DotButton)
