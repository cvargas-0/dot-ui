import DotButton from './dot-button'

export * from './dot-button'
export default DotButton

DotButton.define('dot-button')

declare global {
    interface HTMLElementTagNameMap {
        'dot-button': DotButton
    }
}
