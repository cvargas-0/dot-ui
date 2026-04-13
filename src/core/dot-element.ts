import { LitElement } from 'lit'

/**
 * Base class for all dot-ui components.
 * Extends LitElement and adds the shared `emit()` helper for dispatching
 * prefixed CustomEvents that bubble across Shadow DOM boundaries.
 */
export abstract class DotElement extends LitElement {
    /**
     * Dispatches a CustomEvent with the `dot:` prefix.
     * Events bubble and are composed (cross Shadow DOM boundaries).
     */
    emit(name: string, detail?: unknown): CustomEvent {
        const event = new CustomEvent(`dot:${name}`, {
            detail,
            bubbles: true,
            composed: true,
        })
        this.dispatchEvent(event)
        return event
    }
}
