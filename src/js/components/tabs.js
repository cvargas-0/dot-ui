/**
 * dot-ui — Tabs Component
 * Keyboard navigation and ARIA state management for tabbed interfaces.
 * Follows the ARIA Tabs Pattern with roving tabindex.
 *
 * Usage:
 * <dot-tabs>
 *   <div role="tablist" aria-label="Section">
 *     <button role="tab" aria-selected="true"  aria-controls="panel-1" id="tab-1">Tab 1</button>
 *     <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1">Tab 2</button>
 *   </div>
 *   <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">Content 1</div>
 *   <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>Content 2</div>
 * </dot-tabs>
 *
 * Keyboard:
 *   ArrowLeft / ArrowRight — move focus between tabs (wraps)
 *   Home / End             — jump to first / last tab
 *   Enter / Space          — activate focused tab
 *
 * Events:
 *   dot:change — { index: number, tab: HTMLElement }
 */
import { DotBase } from '../core/base.js';

const KEY_ARROW_LEFT  = 'ArrowLeft';
const KEY_ARROW_RIGHT = 'ArrowRight';
const KEY_ENTER       = 'Enter';
const KEY_SPACE       = ' ';

export class DotTabs extends DotBase {
  #tabs   = [];
  #panels = [];

  init() {
    this.#tabs   = this.$$('[role=tab]');
    this.#panels = this.$$('[role=tabpanel]');
    this.addEventListener('click',   this);
    this.addEventListener('keydown', this);
    this.#syncFromDOM();
  }

  cleanup() {
    this.removeEventListener('click',   this);
    this.removeEventListener('keydown', this);
  }

  #syncFromDOM() {
    const active = this.#tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
    this.#activate(active >= 0 ? active : 0, false);
  }

  onclick(e) {
    const tab = e.target.closest('[role=tab]');
    if (!tab) return;
    const idx = this.#tabs.indexOf(tab);
    if (idx >= 0) this.#activate(idx);
  }

  onkeydown(e) {
    const tab = e.target.closest('[role=tab]');
    if (!tab) return;

    const idx  = this.#tabs.indexOf(tab);
    const len  = this.#tabs.length;

    if (e.key === KEY_ENTER || e.key === KEY_SPACE) {
      e.preventDefault();
      this.#activate(idx);
      return;
    }

    const next = this.keyNav(e, idx, len, KEY_ARROW_LEFT, KEY_ARROW_RIGHT, true);
    if (next >= 0) this.#tabs[next].focus();
  }

  #activate(idx, emit = true) {
    this.#tabs.forEach((tab, i) => {
      const active = i === idx;
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });

    this.#panels.forEach((panel, i) => {
      if (i === idx) panel.removeAttribute('hidden');
      else           panel.setAttribute('hidden', '');
    });

    if (emit) this.emit('change', { index: idx, tab: this.#tabs[idx] });
  }
}
