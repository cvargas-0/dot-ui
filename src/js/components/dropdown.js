/**
 * dot-ui  Dropdown Component
 * Popover API-based dropdown with keyboard navigation and auto-positioning.
 * Uses the native Popover API; the commandfor/command polyfill handles Safari.
 *
 * Usage:
 * <dot-dropdown>
 *   <button popovertarget="my-menu">Options ▾</button>
 *   <menu id="my-menu" popover>
 *     <li><button role="menuitem">Edit</button></li>
 *     <li><button role="menuitem">Duplicate</button></li>
 *     <li role="separator"></li>
 *     <li><button role="menuitem" data-variant="danger">Delete</button></li>
 *   </menu>
 * </dot-dropdown>
 *
 * The `id` on <menu> is auto-generated if omitted.
 *
 * Keyboard:
 *   ArrowDown / ArrowUp  navigate menu items
 *   Home / End           jump to first / last item
 *   Escape               close, return focus to trigger
 *   Tab                  close, continue natural tab order
 *
 * Events:
 *   dot:open   fired when popover opens
 *   dot:close  fired when popover closes
 */
import { DotBase } from '../core/base.js';

const KEY_ARROW_DOWN = 'ArrowDown';
const KEY_ARROW_UP = 'ArrowUp';
const KEY_ESCAPE = 'Escape';
const KEY_TAB = 'Tab';

export class DotDropdown extends DotBase {
  #trigger = null;
  #menu = null;
  /** @type {Element[]|null} cached on open, cleared on close */
  #items = null;
  /** Arrow fn stored so scroll/resize listeners can be removed */
  #pos = null;

  init() {
    this.#trigger = this.$('[popovertarget]');
    this.#menu = this.$('[popover]');

    if (!this.#menu || !this.#trigger) return;

    if (!this.#menu.id) {
      const id = this.uid();
      this.#menu.id = id;
      this.#trigger.setAttribute('popovertarget', id);
    }

    this.#pos = () => this.#position();

    this.#menu.addEventListener('toggle', this);
    this.#menu.addEventListener('keydown', this);
  }

  cleanup() {
    this.#menu?.removeEventListener('toggle', this);
    this.#menu?.removeEventListener('keydown', this);
    this.#removePositionListeners();
  }

  ontoggle(e) {
    if (e.newState === 'open') {
      this.#position();
      window.addEventListener('scroll', this.#pos, true);
      window.addEventListener('resize', this.#pos);
      this.#items = this.$$('[role="menuitem"]:not(:disabled)');
      this.#items[0]?.focus();
      this.#trigger.ariaExpanded = 'true';
      this.emit('open');
    } else {
      this.#removePositionListeners();
      this.#items = null;
      this.#trigger.ariaExpanded = 'false';
      this.#trigger.focus();
      this.emit('close');
    }
  }

  onkeydown(e) {
    if (e.key === KEY_ESCAPE) {
      this.#menu.hidePopover();
      return;
    }

    if (e.key === KEY_TAB) {
      this.#menu.hidePopover();
      return;
    }

    if (!this.#items?.length) return;

    const idx = this.#items.indexOf(document.activeElement);
    const next = this.keyNav(e, idx >= 0 ? idx : 0, this.#items.length, KEY_ARROW_UP, KEY_ARROW_DOWN, true);
    if (next >= 0) this.#items[next].focus();
  }

  #removePositionListeners() {
    window.removeEventListener('scroll', this.#pos, true);
    window.removeEventListener('resize', this.#pos);
  }

  #position() {
    const menu = this.#menu;
    const trigger = this.#trigger;
    const r = trigger.getBoundingClientRect();
    const m = menu.getBoundingClientRect();

    menu.style.position = 'fixed';
    menu.style.minWidth = `${r.width}px`;

    // Flip vertically if menu overflows the bottom of the viewport
    menu.style.top = `${r.bottom + m.height > window.innerHeight ? r.top - m.height - 4 : r.bottom + 4}px`;
    // Flip horizontally if menu overflows the right of the viewport
    menu.style.left = `${r.left + m.width > window.innerWidth ? r.right - m.width : r.left}px`;
  }
}
