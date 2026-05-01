import './core/polyfills.js';
import './components/sidebar.js';
import { DotTabs }     from './components/tabs.js';
import { DotDropdown } from './components/dropdown.js';
import { DotToast }    from './components/toast.js';

customElements.define('dot-tabs',     DotTabs);
customElements.define('dot-dropdown', DotDropdown);
customElements.define('dot-toast',    DotToast);

export { DotTabs, DotDropdown, DotToast };

// Expose for inline scripts in docs / non-module contexts
window.DotToast = DotToast;
