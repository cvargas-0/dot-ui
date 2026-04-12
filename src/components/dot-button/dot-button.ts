import { DotElement } from '@/core/dot-element'
import styles from './dot-button.css?inline'
import '@/components/dot-spinner'

const sheet = new CSSStyleSheet()
sheet.replaceSync(styles)

/**
 * @summary Buttons represent actions that are available to the user.
 * @status experimental
 * @since 0.0.3
 *
 * @dependency dot-spinner - Used to render the loading indicator.
 *
 * @event {CustomEvent} dot:focus - Emitted when the button gains focus.
 * @event {CustomEvent} dot:blur - Emitted when the button loses focus.
 *
 * @slot - The button's label.
 * @slot start - A presentational prefix icon or similar element.
 * @slot end - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper (button or anchor element).
 * @csspart spinner - The dot-spinner element shown when the button is in the loading state.
 *
 * @attr {string} variant - The visual style. Options: solid | outline | ghost | danger.
 * @attr {string} size - The button size. Options: sm | md | lg.
 * @attr {string} type - The button type. Options: button | submit | reset. Only applies when no href is set.
 * @attr {string} href - Renders the button as an anchor element with this URL.
 * @attr {string} target - The anchor target. Options: _blank | _self | _parent | _top. Only applies when href is set.
 * @attr {string} rel - The anchor rel attribute. Defaults to "noreferrer noopener" when target="_blank".
 * @attr {string} name - The button name, submitted with form data.
 * @attr {string} value - The button value, submitted with form data.
 * @attr {boolean} disabled - Disables the button.
 * @attr {boolean} loading - Shows a loading spinner and disables interaction.
 * @attr {boolean} block - Renders the button as a full-width block element.
 * @attr {boolean} active - Renders the button in an active/pressed state.
 */
export default class DotButton extends DotElement {
    static observedAttributes = [
        'variant',
        'size',
        'type',
        'href',
        'target',
        'rel',
        'name',
        'value',
        'disabled',
        'loading',
        'block',
        'active',
    ]

    #controller: AbortController | null = null

    /** The visual style of the button. */
    get variant() {
        return this.attr('variant', 'solid')
    }
    set variant(value: string) {
        this.setAttr('variant', value)
    }

    /** The button size. */
    get size() {
        return this.attr('size', 'md')
    }
    set size(value: string) {
        this.setAttr('size', value)
    }

    /** The button type (button | submit | reset). Only applies without href. */
    get type() {
        return this.attr('type', 'button')
    }
    set type(value: string) {
        this.setAttr('type', value)
    }

    /** Renders the button as an anchor with this URL. */
    get href() {
        return this.attr('href')
    }
    set href(value: string) {
        this.setAttr('href', value)
    }

    /** The anchor target. Only applies when href is set. */
    get target() {
        return this.attr('target')
    }
    set target(value: string) {
        this.setAttr('target', value)
    }

    /** The anchor rel attribute. */
    get rel() {
        return this.attr('rel')
    }
    set rel(value: string) {
        this.setAttr('rel', value)
    }

    /** The button name, submitted with form data. */
    get name() {
        return this.attr('name')
    }
    set name(value: string) {
        this.setAttr('name', value)
    }

    /** The button value, submitted with form data. */
    get value() {
        return this.attr('value')
    }
    set value(value: string) {
        this.setAttr('value', value)
    }

    /** Disables the button, preventing user interaction. */
    get disabled() {
        return this.boolAttr('disabled')
    }
    set disabled(value: boolean) {
        this.setAttr('disabled', value)
    }

    /** Shows a loading spinner and disables interaction. */
    get loading() {
        return this.boolAttr('loading')
    }
    set loading(value: boolean) {
        this.setAttr('loading', value)
    }

    /** Renders the button as a full-width block element. */
    get block() {
        return this.boolAttr('block')
    }
    set block(value: boolean) {
        this.setAttr('block', value)
    }

    /** Renders the button in an active/pressed state. */
    get active() {
        return this.boolAttr('active')
    }
    set active(value: boolean) {
        this.setAttr('active', value)
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.adoptedStyleSheets = [sheet]
        this.render()
        this.#attachListeners()
    }

    disconnectedCallback() {
        if (this.#controller) {
            this.#controller.abort()
            this.#controller = null
        }
    }

    attributeChangedCallback() {
        if (!this.shadowRoot) return
        this.#updateAttributes()
    }

    // Full render only on connectedCallback.
    // attributeChangedCallback calls #updateAttributes() which patches
    // only the element attributes and className — never recreates the DOM.
    // This prevents slot content from flickering on attribute changes.

    render() {
        const isLink = !!this.href
        const tag = isLink ? 'a' : 'button'
        const rel = this.#resolveRel()
        const spinnerSize = this.size === 'lg' ? 'md' : 'sm'

        this.shadowRoot!.innerHTML = /*html*/ `
            <${tag}
                part="base"
                class="${this.#buildClass()}"
                ${isLink ? `href="${this.href}"` : `type="${this.type}"`}
                ${isLink && this.target ? `target="${this.target}"` : ''}
                ${isLink && rel ? `rel="${rel}"` : ''}
                ${!isLink && this.name ? `name="${this.name}"` : ''}
                ${!isLink && this.value ? `value="${this.value}"` : ''}
                ${!isLink && (this.disabled || this.loading) ? 'disabled' : ''}
                aria-busy="${this.loading}"
                aria-disabled="${this.disabled}"
                aria-pressed="${this.active}"
            >
                ${this.loading ? `<dot-spinner part="spinner" size="${spinnerSize}" variant="current" aria-hidden="true"></dot-spinner>` : ''}
                <slot name="start"></slot>
                <slot></slot>
                <slot name="end"></slot>
            </${tag}>
        `
    }

    /** Sets focus on the underlying native element. */
    focus() {
        const el = this.shadowRoot?.querySelector<HTMLElement>('[part="base"]')
        if (el) el.focus()
    }

    /** Removes focus from the underlying native element. */
    blur() {
        const el = this.shadowRoot?.querySelector<HTMLElement>('[part="base"]')
        if (el) el.blur()
    }

    /** Patches only element attributes and className without touching the DOM tree.
     *  Avoids slot content flickering caused by full innerHTML replacement. */
    #updateAttributes() {
        const el = this.shadowRoot?.querySelector<HTMLElement>('[part="base"]')
        if (!el) {
            this.render()
            return
        }

        const isLink = el.tagName === 'A'

        // If href presence changed, a different tag is needed — full render
        if (!!this.href !== isLink) {
            this.render()
            this.#attachListeners()
            return
        }

        // Patch className
        el.className = this.#buildClass()

        // Patch aria
        el.setAttribute('aria-busy', String(this.loading))
        el.setAttribute('aria-disabled', String(this.disabled))
        el.setAttribute('aria-pressed', String(this.active))

        if (isLink) {
            if (this.href) el.setAttribute('href', this.href)
            else el.removeAttribute('href')

            if (this.target) el.setAttribute('target', this.target)
            else el.removeAttribute('target')

            const rel = this.#resolveRel()
            if (rel) el.setAttribute('rel', rel)
            else el.removeAttribute('rel')
        } else {
            el.setAttribute('type', this.type)

            if (this.name) el.setAttribute('name', this.name)
            else el.removeAttribute('name')

            if (this.value) el.setAttribute('value', this.value)
            else el.removeAttribute('value')

            const btn = el as HTMLButtonElement
            btn.disabled = this.disabled || this.loading
        }
    }

    /** Builds the full className string for the base element. */
    #buildClass(): string {
        const classes = ['btn', `btn--${this.variant}`, `btn--${this.size}`]
        if (this.active) classes.push('btn--active')
        if (this.loading) classes.push('btn--loading')
        return classes.join(' ')
    }

    /** Resolves the rel attribute — auto-adds noreferrer noopener for _blank targets. */
    #resolveRel(): string {
        if (this.rel) return this.rel
        if (this.target === '_blank') return 'noreferrer noopener'
        return ''
    }

    /** Attaches focus/blur listeners using AbortController for clean teardown. */
    #attachListeners() {
        if (this.#controller) this.#controller.abort()
        this.#controller = new AbortController()
        const { signal } = this.#controller
        const el = this.shadowRoot?.querySelector<HTMLElement>('[part="base"]')
        if (!el) return

        el.addEventListener(
            'focus',
            () => {
                this.emit('focus')
            },
            { signal }
        )
        el.addEventListener(
            'blur',
            () => {
                this.emit('blur')
            },
            { signal }
        )
    }
}
