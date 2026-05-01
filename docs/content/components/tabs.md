+++
title = "Tabs"
description = "Tabbed interface with keyboard navigation and full ARIA state management."
+++

<div class="doc-section">
  <h2>Basic usage</h2>
  <div class="example">
    <div class="example-preview block">
      <dot-tabs>
        <div role="tablist" aria-label="Account">
          <button role="tab" aria-selected="true" aria-controls="tab-panel-1" id="tab-btn-1">Profile</button>
          <button role="tab" aria-selected="false" aria-controls="tab-panel-2" id="tab-btn-2" tabindex="-1">Security</button>
          <button role="tab" aria-selected="false" aria-controls="tab-panel-3" id="tab-btn-3" tabindex="-1">Billing</button>
        </div>
        <div role="tabpanel" id="tab-panel-1" aria-labelledby="tab-btn-1">
          <p>Manage your profile information and avatar.</p>
        </div>
        <div role="tabpanel" id="tab-panel-2" aria-labelledby="tab-btn-2" hidden>
          <p>Update your password and two-factor authentication.</p>
        </div>
        <div role="tabpanel" id="tab-panel-3" aria-labelledby="tab-btn-3" hidden>
          <p>View invoices and manage your payment method.</p>
        </div>
      </dot-tabs>
    </div>

```html
<dot-tabs>
  <div role="tablist" aria-label="Account">
    <button role="tab" aria-selected="true"  aria-controls="panel-1" id="tab-1">Profile</button>
    <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" tabindex="-1">Security</button>
    <button role="tab" aria-selected="false" aria-controls="panel-3" id="tab-3" tabindex="-1">Billing</button>
  </div>
  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">Profile content</div>
  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>Security content</div>
  <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>Billing content</div>
</dot-tabs>
```

  </div>
</div>

<div class="doc-section">
  <h2>Keyboard navigation</h2>
  <table class="props-table">
    <thead><tr><th>Key</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td><code>ArrowLeft</code> / <code>ArrowRight</code></td><td>Move focus between tabs (wraps around)</td></tr>
      <tr><td><code>Home</code> / <code>End</code></td><td>Jump to first / last tab</td></tr>
      <tr><td><code>Enter</code> / <code>Space</code></td><td>Activate the focused tab</td></tr>
      <tr><td><code>Tab</code></td><td>Move focus to the active panel content</td></tr>
    </tbody>
  </table>
</div>

<div class="doc-section">
  <h2>Events</h2>
  <table class="props-table">
    <thead><tr><th>Event</th><th>Detail</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>dot:change</code></td><td><code>{ index, tab }</code></td><td>Fires when the active tab changes</td></tr>
    </tbody>
  </table>

```js
document.querySelector('dot-tabs').addEventListener('dot:change', (e) => {
  console.log('Active tab index:', e.detail.index);
});
```

</div>

<div class="doc-section">
  <h2>Accessibility notes</h2>
  <ul>
    <li>Add <code>aria-label</code> on the <code>[role=tablist]</code> to describe the tab group.</li>
    <li>Connect each tab to its panel with <code>aria-controls</code> / <code>id</code> pairs.</li>
    <li>Add <code>aria-labelledby</code> on panels pointing back to their tab.</li>
    <li>Set <code>hidden</code> on inactive panels in HTML  the component manages it from there.</li>
  </ul>
</div>
