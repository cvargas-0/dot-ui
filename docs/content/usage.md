+++
title = "Usage"
description = "Integrate dot-ui into any HTML project."
+++

<div class="doc-section">
  <h2>Installation</h2>
  <p>Add two tags to your <code>&lt;head&gt;</code>. No build step, no bundler, no framework.</p>

{% cdn_install() %}
```html
<link rel="stylesheet" href="https://unpkg.com/@usedot/ui@VERSION/dist/dot-ui.min.css">
<script src="https://unpkg.com/@usedot/ui@VERSION/dist/dot-ui.min.js" defer></script>
```
{% end %}

  <p>Or install via npm:</p>

  <div class="example">

```bash
npm install @usedot/ui
```

  </div>
</div>

<div class="doc-section">
  <h2>Basic example</h2>
  <p>Components are native HTML elements. No wrappers, no imports.</p>

  <div class="example">
    <div class="example-preview">
      <button>Save changes</button>
      <button data-variant="secondary">Cancel</button>
      <button data-variant="danger">Delete</button>
    </div>

```html
<button>Save changes</button>
<button data-variant="secondary">Cancel</button>
<button data-variant="danger">Delete</button>
```

  </div>
</div>

<div class="doc-section">
  <h2>Composition</h2>
  <p>Components compose naturally using standard HTML structure.</p>

  <div class="example">
    <div class="example-preview block">
      <div class="card" style="max-width:26rem">
        <div class="card-header" style="display:flex;align-items:center;justify-content:space-between">
          <strong>API Connection</strong>
          <span class="badge" data-variant="success">Live</span>
        </div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:var(--space-4)">
          <div class="form-group">
            <label for="usage-endpoint">Endpoint</label>
            <input type="url" id="usage-endpoint" value="https://api.example.com/v1" readonly>
            <span class="form-hint">Read-only in production.</span>
          </div>
          <div class="form-group">
            <label for="usage-token">API token</label>
            <input type="password" id="usage-token" placeholder="sk-••••••••••••••••">
          </div>
        </div>
        <div class="card-footer" style="display:flex;gap:var(--space-2);justify-content:flex-end">
          <button class="ghost">Reset</button>
          <button>Save changes</button>
        </div>
      </div>
    </div>

```html
<div class="card">
  <div class="card-header">
    <strong>API Connection</strong>
    <span class="badge" data-variant="success">Live</span>
  </div>
  <div class="card-body">
    <div class="form-group">
      <label for="endpoint">Endpoint</label>
      <input type="url" id="endpoint" value="https://api.example.com/v1" readonly>
      <span class="form-hint">Read-only in production.</span>
    </div>
    <div class="form-group">
      <label for="token">API token</label>
      <input type="password" id="token" placeholder="sk-...">
    </div>
  </div>
  <div class="card-footer">
    <button class="ghost">Reset</button>
    <button>Save changes</button>
  </div>
</div>
```

  </div>
</div>
