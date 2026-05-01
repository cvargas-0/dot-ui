+++
title = "Toast"
description = "Transient notification messages triggered via a JavaScript API."
+++

<div class="doc-section">
  <h2>Basic usage</h2>
  <div class="example">
    <div class="example-preview">
      <button onclick="DotToast.show('Changes saved successfully.')">Show toast</button>
      <button data-variant="secondary" onclick="DotToast.show('File deleted.', { variant: 'danger' })">Show danger</button>
      <button data-variant="secondary" onclick="DotToast.show('Backup complete.', { variant: 'success' })">Show success</button>
      <button data-variant="secondary" onclick="DotToast.show('Storage 90% full.', { variant: 'warning' })">Show warning</button>
    </div>

```js
DotToast.show('Changes saved successfully.');

DotToast.show('File deleted.', {
  variant:  'danger',       // 'default' | 'success' | 'warning' | 'danger'
  duration: 4000,           // ms until auto-dismiss; 0 = persistent
  position: 'bottom-right', // 'bottom-right' | 'bottom-center' | 'top-right'
});
```

  </div>
</div>

<div class="doc-section">
  <h2>Options</h2>
  <table class="props-table">
    <thead><tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>variant</code></td><td><code>string</code></td><td><code>'default'</code></td><td>Visual style. <code>danger</code> uses <code>role="alert"</code> (assertive).</td></tr>
      <tr><td><code>duration</code></td><td><code>number</code></td><td><code>4000</code></td><td>Auto-dismiss delay in ms. <code>0</code> = persistent.</td></tr>
      <tr><td><code>position</code></td><td><code>string</code></td><td><code>'bottom-right'</code></td><td>Where toasts appear. Applies to the singleton region.</td></tr>
    </tbody>
  </table>
</div>

<div class="doc-section">
  <h2>Persistent toast</h2>

```js
// duration: 0 — stays until the user dismisses it
DotToast.show('Action required: verify your email.', {
  variant:  'warning',
  duration: 0,
});
```

</div>

<div class="doc-section">
  <h2>Accessibility</h2>
  <ul>
    <li><code>default</code>, <code>success</code>, <code>warning</code> toasts use <code>role="status"</code> — polite announcement, does not interrupt.</li>
    <li><code>danger</code> toasts use <code>role="alert"</code> — assertive, interrupts the screen reader immediately.</li>
    <li>Each toast includes a visible ✕ dismiss button.</li>
  </ul>
</div>
