import DotInput from './dot-input'

export * from './dot-input'
export default DotInput

DotInput.define('dot-input')

declare global {
    interface HTMLElementTagNameMap {
        'dot-input': DotInput
    }
}
