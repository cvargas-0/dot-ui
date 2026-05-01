/**
 * dot-ui — Sidebar
 * Handles [data-sidebar-trigger] and [data-sidebar-rail] to open/close
 * the sidebar on [data-sidebar-provider]. On mobile (< 48rem) clicking
 * outside the sidebar also closes it.
 *
 * Composition:
 *   [data-sidebar-provider]       — grid wrapper; receives data-sidebar-open
 *   [data-sidebar]                — the sidebar element
 *   [data-sidebar-header]         — sticky top area
 *   [data-sidebar-content]        — scrollable content area
 *   [data-sidebar-group]          — section within content
 *   [data-sidebar-group-label]    — small uppercase label
 *   [data-sidebar-group-action]   — icon button at end of label row
 *   [data-sidebar-menu]           — <ul> menu list
 *   [data-sidebar-menu-item]      — <li> menu item (relative positioned)
 *   [data-sidebar-menu-button]    — primary link/button in item
 *   [data-sidebar-menu-action]    — secondary icon button (hover-reveal)
 *   [data-sidebar-menu-badge]     — count badge at end of row
 *   [data-sidebar-menu-sub]       — nested <ul> (inside <details>)
 *   [data-sidebar-menu-sub-item]  — nested <li>
 *   [data-sidebar-footer]         — sticky bottom area
 *   [data-sidebar-rail]           — thin desktop toggle strip
 *   [data-sidebar-inset]          — main content column
 *   [data-sidebar-trigger]        — hamburger button in topnav
 *   [data-topnav]                 — sticky top bar
 *
 * State:
 *   data-sidebar-open on [data-sidebar-provider]:
 *     desktop → sidebar collapses
 *     mobile  → sidebar overlay opens
 *
 *   --sidebar-w (CSS custom property) — sidebar width, default 16rem
 */

const MOBILE = '(width < 48rem)';

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-sidebar-trigger]');

  if (trigger) {
    trigger.closest('[data-sidebar-provider]')?.toggleAttribute('data-sidebar-open');
    return;
  }

  // Close on outside click (mobile overlay only)
  if (!e.target.closest('[data-sidebar]')) {
    const provider = document.querySelector('[data-sidebar-provider][data-sidebar-open]');
    if (provider && window.matchMedia(MOBILE).matches) {
      provider.removeAttribute('data-sidebar-open');
    }
  }
});
