const styles = new CSSStyleSheet()

const loadStyles = async () => {
  const css = await import('./dot-button.css?inline')
  styles.replaceSync(css.default)
}

loadStyles()

export class DotButton extends HTMLElement {
  static observedAttributes = ['variant', 'size', 'disabled', 'loading', 'block']

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.adoptedStyleSheets = [styles]
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
