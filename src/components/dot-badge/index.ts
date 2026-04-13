import DotBadge from './dot-badge'

export * from './dot-badge'
export default DotBadge

declare global {
    interface HTMLElementTagNameMap {
        'dot-badge': DotBadge
    }
}
