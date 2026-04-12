import DotSpinner from './dot-spinner'

export * from './dot-spinner'
export default DotSpinner

DotSpinner.define('dot-spinner')

declare global {
    interface HTMLElementTagNameMap {
        'dot-spinner': DotSpinner
    }
}
