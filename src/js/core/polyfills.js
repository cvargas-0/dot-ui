if (!('command' in HTMLButtonElement.prototype)) {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[commandfor][command]');
    if (!btn) return;
    const target = document.getElementById(btn.getAttribute('commandfor'));
    if (!target) return;
    switch (btn.getAttribute('command')) {
      case 'show-modal':     target.showModal?.();     break;
      case 'close':          target.close?.();          break;
      case 'toggle-popover': target.togglePopover?.(); break;
      case 'show-popover':   target.showPopover?.();   break;
      case 'hide-popover':   target.hidePopover?.();   break;
    }
  });
}
