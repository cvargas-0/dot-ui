+++
title = "Dropdown"
description = "Contextual menu anchored to a trigger button."
+++

<div class="doc-section">
  <h2>Basic usage</h2>
  <div class="example">
    <div class="example-preview" style="min-height:12rem;align-items:flex-start">
      <dot-dropdown>
        <button popovertarget="dd-demo-1">Options ▾</button>
        <menu id="dd-demo-1" popover>
          <li><button role="menuitem">Edit</button></li>
          <li><button role="menuitem">Duplicate</button></li>
          <li><button role="menuitem">Archive</button></li>
          <li role="separator"></li>
          <li><button role="menuitem" data-variant="danger">Delete</button></li>
        </menu>
      </dot-dropdown>
    </div>

```html
<dot-dropdown>
  <button popovertarget="my-menu">Options ▾</button>
  <menu id="my-menu" popover>
    <li><button role="menuitem">Edit</button></li>
    <li><button role="menuitem">Duplicate</button></li>
    <li><button role="menuitem">Archive</button></li>
    <li role="separator"></li>
    <li><button role="menuitem" data-variant="danger">Delete</button></li>
  </menu>
</dot-dropdown>
```

  </div>

The `id` on `<menu>` is auto-generated if omitted.
</div>

<div class="doc-section">
  <h2>Keyboard navigation</h2>
  <table class="props-table">
    <thead><tr><th>Key</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td><code>ArrowDown</code> / <code>ArrowUp</code></td><td>Move focus between menu items</td></tr>
      <tr><td><code>Home</code> / <code>End</code></td><td>Jump to first / last menu item</td></tr>
      <tr><td><code>Escape</code></td><td>Close the dropdown, return focus to trigger</td></tr>
      <tr><td><code>Tab</code></td><td>Close the dropdown, continue natural tab order</td></tr>
      <tr><td><code>Enter</code> / <code>Space</code></td><td>Activate the focused item (native button behavior)</td></tr>
    </tbody>
  </table>
</div>

<div class="doc-section">
  <h2>Events</h2>
  <table class="props-table">
    <thead><tr><th>Event</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>dot:open</code></td><td>Fires when the dropdown opens</td></tr>
      <tr><td><code>dot:close</code></td><td>Fires when the dropdown closes</td></tr>
    </tbody>
  </table>

```js
document.querySelector('dot-dropdown').addEventListener('dot:open', () => {
  console.log('Dropdown opened');
});
```

</div>

<div class="doc-section">
  <h2>Menu item variants</h2>
  <p>Add <code>data-variant="danger"</code> on an item button for destructive actions.</p>

```html
<li><button data-variant="danger">Delete</button></li>
```

  Use <code>&lt;li role="separator"&gt;</code> to add a visual divider between groups.
</div>
