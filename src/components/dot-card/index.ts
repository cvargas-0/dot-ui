import DotCard from './dot-card'

export * from './dot-card'
export default DotCard

DotCard.define('dot-card')

declare global {
    interface HTMLElementTagNameMap {
        'dot-card': DotCard
    }
}
