+++
title = "Button"
description = "Trigger for actions. Applies to native button elements and links."
+++

<div class="doc-section">
  <h2>Variants</h2>
  <div class="example">
    <div class="example-preview">
      <button>Primary</button>
      <button data-variant="secondary">Secondary</button>
      <button data-variant="danger">Danger</button>
    </div>

```html
<button>Primary</button>
<button data-variant="secondary">Secondary</button>
<button data-variant="danger">Danger</button>
```

  </div>
</div>

<div class="doc-section">
  <h2>Outline &amp; Ghost</h2>
  <div class="example">
    <div class="example-preview">
      <button class="outline">Outline</button>
      <button class="outline" data-variant="danger">Outline Danger</button>
      <button class="ghost">Ghost</button>
    </div>

```html
<button class="outline">Outline</button>
<button class="outline" data-variant="danger">Outline Danger</button>
<button class="ghost">Ghost</button>
```

  </div>
</div>

<div class="doc-section">
  <h2>Sizes</h2>
  <div class="example">
    <div class="example-preview" style="align-items:center">
      <button class="small">Small</button>
      <button>Default</button>
      <button class="large">Large</button>
      <button class="icon" aria-label="Settings">⚙</button>
    </div>

```html
<button class="small">Small</button>
<button>Default</button>
<button class="large">Large</button>
<button class="icon" aria-label="Settings">⚙</button>
```

  </div>
</div>

<div class="doc-section">
  <h2>Disabled</h2>
  <div class="example">
    <div class="example-preview">
      <button disabled>Primary</button>
      <button class="outline" disabled>Outline</button>
    </div>

```html
<button disabled>Primary</button>
<button class="outline" disabled>Outline</button>
```

  </div>
</div>

<div class="doc-section">
  <h2>As link</h2>
  <div class="example">
    <div class="example-preview">
      <a href="#" class="button">Link button</a>
    </div>

```html
<a href="/path" class="button">Link button</a>
```

  </div>
</div>

<div class="doc-section">
  <h2>Props</h2>
  <table class="props-table">
    <thead><tr><th>Attribute / Class</th><th>Values</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>data-variant</code></td><td><code>secondary</code> · <code>danger</code></td><td>Color variant</td></tr>
      <tr><td><code>.outline</code></td><td></td><td>Transparent background, visible border</td></tr>
      <tr><td><code>.ghost</code></td><td></td><td>Transparent, no border</td></tr>
      <tr><td><code>.small</code></td><td></td><td>Reduced padding and font size</td></tr>
      <tr><td><code>.large</code></td><td></td><td>Larger padding and font size</td></tr>
      <tr><td><code>.icon</code></td><td></td><td>Square 1:1 icon-only button</td></tr>
    </tbody>
  </table>
</div>
