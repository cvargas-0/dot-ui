import { html, unsafeCSS } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { live } from 'lit/directives/live.js'
import { DotElement } from '@/core/dot-element'
import styles from './dot-input.css?inline'

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
 * @attr {string} type - The input type. Options: text | email | password | number | search | url | tel. Defaults to "text".
 * @attr {string} value - The current value.
 * @attr {string} placeholder - Placeholder text shown when empty.
 * @attr {string} size - The input size. Options: sm | md | lg. Defaults to "md".
 * @attr {string} name - The input name for form submission.
 * @attr {boolean} disabled - When present, disables the input.
 * @attr {boolean} readonly - When present, makes the input read-only.
 * @attr {boolean} required - When present, marks the input as required.
 * @attr {boolean} invalid - When present, renders the input in an error state.
 */
@customElement('dot-input')
export default class DotInput extends DotElement {
    static styles = unsafeCSS(styles)

    @query('[part="input"]') private _input!: HTMLInputElement

    @property({ type: String }) type:
        | 'text'
        | 'email'
        | 'password'
        | 'number'
        | 'search'
        | 'url'
        | 'tel' = 'text'
    @property({ type: String }) value = ''
    @property({ type: String }) placeholder = ''
    @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md'
    @property({ type: String }) name = ''
    @property({ type: Boolean }) disabled = false
    @property({ type: Boolean }) readonly = false
    @property({ type: Boolean }) required = false
    @property({ type: Boolean }) invalid = false

    render() {
        return html`
            <div
                part="base"
                class=${classMap({
                    input: true,
                    [`input--${this.size}`]: true,
                    'input--invalid': this.invalid,
                })}
            >
                <slot name="start"></slot>
                <input
                    part="input"
                    type=${this.type}
                    .value=${live(this.value)}
                    placeholder=${ifDefined(this.placeholder || undefined)}
                    name=${ifDefined(this.name || undefined)}
                    ?disabled=${this.disabled}
                    ?readonly=${this.readonly}
                    ?required=${this.required}
                    aria-invalid=${this.invalid}
                    aria-required=${this.required}
                    @input=${this.#onInput}
                    @change=${this.#onChange}
                    @focus=${this.#onFocus}
                    @blur=${this.#onBlur}
                />
                <slot name="end"></slot>
            </div>
        `
    }

    /** Sets focus on the native input element. */
    focus() {
        this._input?.focus()
    }

    /** Removes focus from the native input element. */
    blur() {
        this._input?.blur()
    }

    /** Selects all text in the native input element. */
    select() {
        this._input?.select()
    }

    #onInput() {
        this.value = this._input.value
        this.emit('input', { value: this.value })
    }

    #onChange() {
        this.emit('change', { value: this._input.value })
    }

    #onFocus() {
        this.emit('focus')
    }

    #onBlur() {
        this.emit('blur')
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'dot-input': DotInput
    }
}
