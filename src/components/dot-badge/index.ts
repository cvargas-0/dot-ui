import DotBadge from './dot-badge'

export * from './dot-badge'
export default DotBadge

DotBadge.define('dot-badge')

declare global {
    interface HTMLElementTagNameMap {
        'dot-badge': DotBadge
    }
}
