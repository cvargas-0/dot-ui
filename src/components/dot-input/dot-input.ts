import { DotElement } from '@/core/dot-element'
import styles from './dot-input.css?inline'

const sheet = new CSSStyleSheet()
sheet.replaceSync(styles)

/**
 * @summary Inputs allow the user to enter data into a form field.
 * @status experimental
 * @since 0.0.5
 *
 * @event {CustomEvent<{ value: string }>} dot:input - Emitted on every keystroke.
 * @event {CustomEvent<{ value: string }>} dot:change - Emitted when the value is committed.
 * @event {CustomEvent} dot:focus - Emitted when the input gains focus.
 * @event {CustomEvent} dot:blur - Emitted when the input loses focus.
 *
 * @slot start - A presentational prefix icon or similar element.
 * @slot end - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart input - The native input element.
 *
 * @attr {string} type - The input type. Options: text | email | password | number | search | url | tel.
 * @attr {string} value - The current value.
 * @attr {string} placeholder - Placeholder text shown when empty.
 * @attr {string} size - The input size. Options: sm | md | lg.
 * @attr {string} name - The input name for form submission.
 * @attr {boolean} disabled - Disables the input.
 * @attr {boolean} readonly - Makes the input read-only.
 * @attr {boolean} required - Marks the input as required.
 * @attr {boolean} invalid - Renders the input in an error state.
 */
export default class DotInput extends DotElement {
    static observedAttributes = [
        'type',
        'value',
        'placeholder',
        'size',
        'name',
        'disabled',
        'readonly',
        'required',
        'invalid',
    ]

    #controller: AbortController | null = null

    /** The input type. */
    get type() {
        return this.attr('type', 'text')
    }
    set type(v: string) {
        this.setAttr('type', v)
    }

    /** The current value of the input. Reflects the live native input value when focused. */
    get value() {
        const input = this.shadowRoot?.querySelector<HTMLInputElement>('[part="input"]')
        return input ? input.value : this.attr('value')
    }
    set value(v: string) {
        this.setAttr('value', v)
    }

    /** Placeholder text shown when the input is empty. */
    get placeholder() {
        return this.attr('placeholder')
    }
    set placeholder(v: string) {
        this.setAttr('placeholder', v)
    }

    /** The input size. */
    get size() {
        return this.attr('size', 'md')
    }
    set size(v: string) {
        this.setAttr('size', v)
    }

    /** The input name for form submission. */
    get name() {
        return this.attr('name')
    }
    set name(v: string) {
        this.setAttr('name', v)
    }

    /** Disables the input, preventing user interaction. */
    get disabled() {
        return this.boolAttr('disabled')
    }
    set disabled(v: boolean) {
        this.setAttr('disabled', v)
    }

    /** Makes the input read-only. */
    get readonly() {
        return this.boolAttr('readonly')
    }
    set readonly(v: boolean) {
        this.setAttr('readonly', v)
    }

    /** Marks the input as required for form validation. */
    get required() {
        return this.boolAttr('required')
    }
    set required(v: boolean) {
        this.setAttr('required', v)
    }

    /** Renders the input in an error/invalid state. */
    get invalid() {
        return this.boolAttr('invalid')
    }
    set invalid(v: boolean) {
        this.setAttr('invalid', v)
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' })
        this.shadowRoot!.adoptedStyleSheets = [sheet]
        this.render()
        this.#attachListeners()
    }

    disconnectedCallback() {
        this.#controller?.abort()
        this.#controller = null
    }

    // The `value` attribute is handled separately to avoid overwriting
    // text the user is actively typing. All other attributes patch the DOM.
    attributeChangedCallback(name: string, _old: string | null, newValue: string | null) {
        if (!this.shadowRoot) return
        if (name === 'value') {
            const input = this.shadowRoot.querySelector<HTMLInputElement>('[part="input"]')
            if (input) input.value = newValue ?? ''
            return
        }
        this.#updateAttributes()
    }

    render() {
        this.shadowRoot!.innerHTML = /*html*/ `
            <div
                part="base"
                class="${this.#buildClass()}"
            >
                <slot name="start"></slot>
                <input
                    part="input"
                    type="${this.type}"
                    value="${this.attr('value')}"
                    placeholder="${this.placeholder}"
                    ${this.name ? `name="${this.name}"` : ''}
                    ${this.disabled ? 'disabled' : ''}
                    ${this.readonly ? 'readonly' : ''}
                    ${this.required ? 'required' : ''}
                    aria-invalid="${this.invalid}"
                    aria-disabled="${this.disabled}"
                    aria-required="${this.required}"
                />
                <slot name="end"></slot>
            </div>
        `
    }

    /** Sets focus on the native input element. */
    focus() {
        this.shadowRoot?.querySelector<HTMLInputElement>('[part="input"]')?.focus()
    }

    /** Removes focus from the native input element. */
    blur() {
        this.shadowRoot?.querySelector<HTMLInputElement>('[part="input"]')?.blur()
    }

    /** Selects all text in the native input element. */
    select() {
        this.shadowRoot?.querySelector<HTMLInputElement>('[part="input"]')?.select()
    }

    #buildClass(): string {
        const classes = ['input', `input--${this.size}`]
        if (this.invalid) classes.push('input--invalid')
        return classes.join(' ')
    }

    #updateAttributes() {
        const wrapper = this.shadowRoot?.querySelector<HTMLElement>('[part="base"]')
        const input = this.shadowRoot?.querySelector<HTMLInputElement>('[part="input"]')
        if (!wrapper || !input) {
            this.render()
            this.#attachListeners()
            return
        }

        wrapper.className = this.#buildClass()
        input.type = this.type
        input.placeholder = this.placeholder
        if (this.name) input.setAttribute('name', this.name)
        else input.removeAttribute('name')
        input.disabled = this.disabled
        input.readOnly = this.readonly
        input.required = this.required
        input.setAttribute('aria-invalid', String(this.invalid))
        input.setAttribute('aria-disabled', String(this.disabled))
        input.setAttribute('aria-required', String(this.required))
    }

    #attachListeners() {
        if (this.#controller) this.#controller.abort()
        this.#controller = new AbortController()
        const { signal } = this.#controller
        const input = this.shadowRoot?.querySelector<HTMLInputElement>('[part="input"]')
        if (!input) return

        input.addEventListener('input', () => this.emit('input', { value: input.value }), {
            signal,
        })
        input.addEventListener('change', () => this.emit('change', { value: input.value }), {
            signal,
        })
        input.addEventListener('focus', () => this.emit('focus'), { signal })
        input.addEventListener('blur', () => this.emit('blur'), { signal })
    }
}
