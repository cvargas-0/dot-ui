export abstract class DotElement extends HTMLElement {
    abstract render(): void

    static define(tag: string): void {
        if (!customElements.get(tag)) {
            customElements.define(tag, this as unknown as CustomElementConstructor)
        }
    }

    protected setAttr(name: string, value: string | boolean | null): void {
        if (value === null || value === false) {
            this.removeAttribute(name)
        } else if (value === true) {
            this.setAttribute(name, '')
        } else {
            this.setAttribute(name, value)
        }
    }

    attr(name: string, fallback = ''): string {
        return this.getAttribute(name) ?? fallback
    }

    boolAttr(name: string): boolean {
        return this.hasAttribute(name)
    }

    emit(name: string, detail?: unknown): void {
        this.dispatchEvent(
            new CustomEvent(`dot:${name}`, {
                detail,
                bubbles: true,
                composed: true,
            })
        )
    }
}
