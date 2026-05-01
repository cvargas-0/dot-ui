/**
 * dot-ui — Toast Component
 * JS API for transient notification toasts using the Popover API.
 * Toasts stack in a singleton region element appended to <body>.
 *
 * Usage:
 * // Basic
 * DotToast.show('Changes saved');
 *
 * // With options
 * DotToast.show('File deleted', {
 *   variant:  'danger',        // 'default' | 'success' | 'warning' | 'danger'
 *   duration: 5000,            // ms; 0 = persistent until dismissed manually
 *   position: 'bottom-right',  // 'bottom-right' | 'bottom-center' | 'top-right'
 * });
 *
 * Toasts are dismissed automatically after `duration` ms, or via the ✕ button.
 * `danger` toasts use role="alert" (assertive); others use role="status" (polite).
 */
import { DotBase } from '../core/base.js';

const REGION_TAG  = 'dot-toast-region';
const DEFAULTS    = { variant: 'default', duration: 4000, position: 'bottom-right' };

export class DotToast extends DotBase {
  static show(message, opts = {}) {
    const { variant, duration, position } = { ...DEFAULTS, ...opts };
    const region = DotToast.#getRegion(position);
    const toast  = DotToast.#build(message, variant);

    region.appendChild(toast);
    toast.showPopover();

    if (duration > 0) setTimeout(() => DotToast.#dismiss(toast), duration);
    return toast;
  }

  static #getRegion(position) {
    let region = document.querySelector(REGION_TAG);
    if (!region) {
      region = document.createElement(REGION_TAG);
      document.body.appendChild(region);
    }
    region.dataset.position = position;
    return region;
  }

  static #build(message, variant) {
    const toast = document.createElement('div');
    toast.setAttribute('popover', 'manual');
    toast.className = 'toast';
    toast.dataset.variant = variant;
    toast.setAttribute('role', variant === 'danger' ? 'alert' : 'status');

    const text = document.createElement('span');
    text.textContent = message;

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'toast-close';
    close.setAttribute('aria-label', 'Dismiss');
    close.setAttribute('commandfor', '');
    close.setAttribute('command', 'hide-popover');
    close.textContent = '✕';
    close.addEventListener('click', () => DotToast.#dismiss(toast), { once: true });

    toast.append(text, close);
    return toast;
  }

  static #dismiss(toast) {
    if (!toast.isConnected) return;
    toast.classList.add('toast--exit');
    toast.addEventListener('animationend', () => {
      toast.hidePopover();
      toast.remove();
    }, { once: true });
  }
}
