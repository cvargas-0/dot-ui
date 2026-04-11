import DotAlert from './dot-alert'

export * from './dot-alert'
export default DotAlert

DotAlert.define('dot-alert')

declare global {
    interface HTMLElementTagNameMap {
        'dot-alert': DotAlert
    }
}
