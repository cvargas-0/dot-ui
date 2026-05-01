+++
title = "Card"
description = "Container for grouped content with optional header and footer sections."
+++

<div class="doc-section">
  <h2>Full card</h2>
  <div class="example">
    <div class="example-preview">
      <div class="card" style="width:20rem">
        <div class="card-header">Card title</div>
        <div class="card-body">
          <p>Card body text. Place any content here — text, images, or other components.</p>
        </div>
        <div class="card-footer">
          <button class="small">Action</button>
          <button class="small ghost">Cancel</button>
        </div>
      </div>
    </div>

```html
<div class="card">
  <div class="card-header">Card title</div>
  <div class="card-body">
    <p>Card body text.</p>
  </div>
  <div class="card-footer">
    <button class="small">Action</button>
    <button class="small ghost">Cancel</button>
  </div>
</div>
```

  </div>
</div>

<div class="doc-section">
  <h2>Body only</h2>
  <div class="example">
    <div class="example-preview">
      <div class="card" style="width:18rem">
        <div class="card-body">
          <p>A simple card with just a body. Header and footer are optional.</p>
        </div>
      </div>
    </div>

```html
<div class="card">
  <div class="card-body">
    <p>A simple card with just a body.</p>
  </div>
</div>
```

  </div>
</div>

<div class="doc-section">
  <h2>Grid of cards</h2>
  <div class="example">
    <div class="example-preview block">
      <div class="grid grid-cols-3 gap-4">
        <div class="card"><div class="card-body"><strong>Alpha</strong><p>First item.</p></div></div>
        <div class="card"><div class="card-body"><strong>Beta</strong><p>Second item.</p></div></div>
        <div class="card"><div class="card-body"><strong>Gamma</strong><p>Third item.</p></div></div>
      </div>
    </div>

```html
<div class="grid grid-cols-3 gap-4">
  <div class="card"><div class="card-body">...</div></div>
  <div class="card"><div class="card-body">...</div></div>
  <div class="card"><div class="card-body">...</div></div>
</div>
```

  </div>
</div>

<div class="doc-section">
  <h2>Parts</h2>
  <table class="props-table">
    <thead><tr><th>Class</th><th>Element</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>.card</code></td><td>Required wrapper</td><td>Sets background, border, shadow, border-radius</td></tr>
      <tr><td><code>.card-header</code></td><td>Optional</td><td>Top section with bottom border</td></tr>
      <tr><td><code>.card-body</code></td><td>Optional</td><td>Main content area with padding</td></tr>
      <tr><td><code>.card-footer</code></td><td>Optional</td><td>Bottom section with muted background</td></tr>
    </tbody>
  </table>
</div>
