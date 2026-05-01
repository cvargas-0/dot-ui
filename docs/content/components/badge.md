+++
title = "Badge"
description = "Small inline label for status, category, or count."
+++

<div class="doc-section">
  <h2>Variants</h2>
  <div class="example">
    <div class="example-preview">
      <span class="badge">Default</span>
      <span class="badge" data-variant="secondary">Secondary</span>
      <span class="badge" data-variant="success">Success</span>
      <span class="badge" data-variant="warning">Warning</span>
      <span class="badge" data-variant="danger">Danger</span>
      <span class="badge" data-variant="outline">Outline</span>
    </div>

```html
<span class="badge">Default</span>
<span class="badge" data-variant="secondary">Secondary</span>
<span class="badge" data-variant="success">Success</span>
<span class="badge" data-variant="warning">Warning</span>
<span class="badge" data-variant="danger">Danger</span>
<span class="badge" data-variant="outline">Outline</span>
```

  </div>
</div>

<div class="doc-section">
  <h2>Inline usage</h2>
  <div class="example">
    <div class="example-preview">
      <p>Plan: <span class="badge" data-variant="success">Active</span></p>
      <p>Billing: <span class="badge" data-variant="warning">Overdue</span></p>
    </div>

```html
<p>Plan: <span class="badge" data-variant="success">Active</span></p>
<p>Billing: <span class="badge" data-variant="warning">Overdue</span></p>
```

  </div>
</div>

<div class="doc-section">
  <h2>Props</h2>
  <table class="props-table">
    <thead><tr><th>Attribute</th><th>Values</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>data-variant</code></td><td><code>secondary</code> · <code>success</code> · <code>warning</code> · <code>danger</code> · <code>outline</code></td><td>Visual style</td></tr>
    </tbody>
  </table>
</div>
