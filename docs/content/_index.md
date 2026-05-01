+++
title = "Introduction"
sort_by = "title"
+++

<div class="doc-section">
  <h2>dot-ui</h2>
  <p style="font-size:var(--text-lg);color:var(--muted-fg);margin-bottom:var(--space-6)">
    Semantic UI components — no framework required.
  </p>
  <p>dot-ui is a CSS-first component library built on native HTML elements and Web Components.
  No build step required — just drop in a <code>&lt;link&gt;</code> and <code>&lt;script&gt;</code>.</p>
</div>

<div class="doc-section">
  <h2>Installation</h2>

```html
<link rel="stylesheet" href="dot-ui.min.css">
<script src="dot-ui.min.js" defer></script>
```
</div>

<div class="doc-section">
  <h2>Design principles</h2>
  <ul>
    <li><strong>Semantic HTML first</strong>  uses real <code>&lt;button&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;dialog&gt;</code> elements.</li>
    <li><strong>CSS custom properties</strong>  fully themeable, light/dark automatic via <code>light-dark()</code>.</li>
    <li><strong>No Shadow DOM</strong>  components enhance light DOM so your styles always apply.</li>
    <li><strong>Keyboard accessible</strong>  roving tabindex, ARIA roles, and focus management built-in.</li>
  </ul>
</div>

<div class="doc-section">
  <h2>Components</h2>
  <table class="props-table">
    <thead><tr><th>Component</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><a href="/components/button/">Button</a></td><td>CSS</td><td>Action trigger with variants and sizes</td></tr>
      <tr><td><a href="/components/badge/">Badge</a></td><td>CSS</td><td>Inline status labels and counters</td></tr>
      <tr><td><a href="/components/alert/">Alert</a></td><td>CSS</td><td>Contextual feedback messages</td></tr>
      <tr><td><a href="/components/card/">Card</a></td><td>CSS</td><td>Content container with header and footer</td></tr>
      <tr><td><a href="/components/form/">Form</a></td><td>CSS</td><td>Input, textarea, select, and form helpers</td></tr>
      <tr><td><a href="/components/tabs/">Tabs</a></td><td>Web Component</td><td>Tabbed interface with keyboard navigation</td></tr>
      <tr><td><a href="/components/dropdown/">Dropdown</a></td><td>Web Component</td><td>Popover-based contextual menu</td></tr>
      <tr><td><a href="/components/toast/">Toast</a></td><td>Web Component</td><td>Transient notification via JS API</td></tr>
    </tbody>
  </table>
</div>
