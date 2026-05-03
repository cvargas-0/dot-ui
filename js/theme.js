/**
 * dot-ui docs  Theme switcher
 * Runs synchronously in <head> to avoid flash of wrong theme.
 * Stores preference in localStorage under 'dot-ui-theme'.
 */
(function () {
  const KEY = 'dot-ui-theme';
  const root = document.documentElement;

  // Apply stored theme immediately, before first paint
  const stored = localStorage.getItem(KEY);
  if (stored) root.style.colorScheme = stored;

  function getTheme() {
    return localStorage.getItem(KEY) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    root.style.colorScheme = theme;
    localStorage.setItem(KEY, theme);
    syncButton(theme);
  }

  function toggleTheme() {
    applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  function syncButton(theme) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.dataset.theme = theme;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggleTheme);
    syncButton(getTheme());

    // Follow system preference when no stored choice
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(KEY)) syncButton(e.matches ? 'dark' : 'light');
    });
  });

  window.DotTheme = { toggle: toggleTheme, set: applyTheme, get: getTheme };
}());
