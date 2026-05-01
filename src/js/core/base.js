
const EVENT_PREFIX = 'dot:';
const DOM_LOADING = 'loading';
const DOM_CONTENT_LOADED = 'DOMContentLoaded';
const KEY_HOME = 'Home';
const KEY_END = 'End';

/**
 * Base class for all Dot UI web components.
 *
 * Provides:
 * - Single-run initialization safe against early upgrades and DOMContentLoaded races.
 * - Delegated event handling via the `EventListener` interface (`handleEvent`).
 * - Typed custom event emission under the `dot:` namespace.
 * - Keyboard navigation helper for roving-tabindex patterns.
 * - Scoped DOM query shortcuts and collision-safe ID generation.
 *
 * @abstract
 * @extends HTMLElement
 */
export class DotBase extends HTMLElement {
  #initialized = false;

  connectedCallback() {
    if (this.#initialized) return;
    if (document.readyState === DOM_LOADING) {
      document.addEventListener(DOM_CONTENT_LOADED, () => this.#setup(), { once: true });
    } else {
      this.#setup();
    }
  }

  #setup() {
    if (this.#initialized) return;
    this.#initialized = true;
    this.init();
  }

  disconnectedCallback() {
    this.cleanup();
  }

  /**
   * Called once after the element is connected and the DOM is ready.
   * Override to set up state, bindings, and initial rendering.
   */
  init() { }

  /**
   * Called when the element is removed from the document.
   * Override to cancel timers, remove global listeners, or release resources.
   */
  cleanup() { }

  /**
   * Implements the `EventListener` interface.
   * Allows passing `this` directly to `addEventListener` and routes each event
   * to the matching `on<type>` method (e.g. `onclick`, `onkeydown`).
   *
   * @param {Event} e
   */
  handleEvent(e) {
    const handler = this[`on${e.type}`];
    if (typeof handler === 'function') handler.call(this, e);
  }

  /**
   * Dispatches a composed, bubbling, cancelable `CustomEvent` prefixed with `dot:`.
   *
   * @param {string} name - Event name without the `dot:` prefix.
   * @param {unknown} [detail=null] - Optional payload attached to `event.detail`.
   * @returns {boolean} `false` if any handler called `preventDefault()`, otherwise `true`.
   */
  emit(name, detail = null) {
    return this.dispatchEvent(
      new CustomEvent(`${EVENT_PREFIX}${name}`, {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail,
      })
    );
  }

  /**
   * Computes the next focused index for roving-tabindex keyboard navigation.
   * Returns `-1` when the pressed key does not apply.
   * Calls `e.preventDefault()` when a movement is triggered.
   *
   * @param {KeyboardEvent} e
   * @param {number} idx     - Current focused index.
   * @param {number} len     - Total number of items.
   * @param {string} prevKey - Key that moves focus backward (e.g. `'ArrowUp'`).
   * @param {string} nextKey - Key that moves focus forward (e.g. `'ArrowDown'`).
   * @param {boolean} [homeEnd=false] - Whether `Home`/`End` keys jump to first/last.
   * @returns {number} Next index, or `-1` if the key was not handled.
   */
  keyNav(e, idx, len, prevKey, nextKey, homeEnd = false) {
    const moves = {
      [nextKey]: (idx + 1) % len,
      [prevKey]: (idx - 1 + len) % len,
      ...(homeEnd && { [KEY_HOME]: 0, [KEY_END]: len - 1 }),
    };
    const next = moves[e.key] ?? -1;
    if (next >= 0) e.preventDefault();
    return next;
  }

  /**
   * Scoped `querySelector` shorthand.
   * @param {string} sel
   * @returns {Element | null}
   */
  $(sel) { return this.querySelector(sel); }

  /**
   * Scoped `querySelectorAll` shorthand, returned as a plain array.
   * @param {string} sel
   * @returns {Element[]}
   */
  $$(sel) { return [...this.querySelectorAll(sel)]; }

  /**
   * Generates a collision-safe UUID v4 suitable for `id` attributes and ARIA references.
   * @returns {string}
   */
  uid() { return crypto.randomUUID(); }
}
