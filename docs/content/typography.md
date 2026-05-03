+++
title = "Typography"
description = "Typefaces, type scale, and semantic text elements used across dot-ui."
+++

<div class="doc-section">
  <h2>Heading scale</h2>
  <p>Headings <code>h1</code> through <code>h6</code> are styled by the design system. Use them for semantic document structure - not as a visual sizing tool.</p>

  <div class="example">
    <div class="example-preview block">
      <h1 style="margin:0 0 var(--space-2)">Heading 1</h1>
      <h2 style="margin:0 0 var(--space-2)">Heading 2</h2>
      <h3 style="margin:0 0 var(--space-2)">Heading 3</h3>
      <h4 style="margin:0 0 var(--space-2)">Heading 4</h4>
      <h5 style="margin:0 0 var(--space-2)">Heading 5</h5>
      <h6 style="margin:0">Heading 6</h6>
    </div>

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

  </div>
</div>

<div class="doc-section">
  <h2>Type scale</h2>
  <p>Use <code>.text-{size}</code> classes to override font size. Each class maps to a CSS custom property.</p>

  <div class="example">
    <div class="example-preview block">
      <p class="text-xs" style="margin:0 0 var(--space-2)"><code class="text-xs">text-xs</code> - Extra small</p>
      <p class="text-sm" style="margin:0 0 var(--space-2)"><code class="text-xs">text-sm</code> - Small</p>
      <p class="text-base" style="margin:0 0 var(--space-2)"><code class="text-xs">text-base</code> - Base (default)</p>
      <p class="text-lg" style="margin:0 0 var(--space-2)"><code class="text-xs">text-lg</code> - Large</p>
      <p class="text-xl" style="margin:0 0 var(--space-2)"><code class="text-xs">text-xl</code> - Extra large</p>
      <p class="text-2xl" style="margin:0 0 var(--space-2)"><code class="text-xs">text-2xl</code> - 2x large</p>
      <p class="text-3xl" style="margin:0"><code class="text-xs">text-3xl</code> - 3x large</p>
    </div>

```html
<p class="text-xs">Extra small</p>
<p class="text-sm">Small</p>
<p class="text-base">Base</p>
<p class="text-lg">Large</p>
<p class="text-xl">Extra large</p>
<p class="text-2xl">2x large</p>
<p class="text-3xl">3x large</p>
```

  </div>
</div>

<div class="doc-section">
  <h2>Font weight</h2>

  <div class="example">
    <div class="example-preview block">
      <p style="margin:0 0 var(--space-2)">Regular - default body weight</p>
      <p class="font-medium" style="margin:0 0 var(--space-2)">font-medium</p>
      <p class="font-semibold" style="margin:0 0 var(--space-2)">font-semibold</p>
      <p class="font-bold" style="margin:0">font-bold</p>
    </div>

```html
<p>Regular</p>
<p class="font-medium">Medium</p>
<p class="font-semibold">Semibold</p>
<p class="font-bold">Bold</p>
```

  </div>
</div>

<div class="doc-section">
  <h2>Semantic text elements</h2>
  <p>Use native HTML elements. The design system applies consistent styles automatically.</p>

  <div class="example">
    <div class="example-preview block">
      <p style="margin:0 0 var(--space-3)"><strong>strong</strong> - bold importance &nbsp; <em>em</em> - emphasis &nbsp; <small>small</small> - fine print</p>
      <p style="margin:0 0 var(--space-3)"><code>code</code> - inline code</p>
      <p style="margin:0"><a href="#">Link text</a> - navigable reference</p>
    </div>

```html
<strong>Bold importance</strong>
<em>Emphasized text</em>
<small>Fine print</small>
<code>inline code</code>
<a href="/path">Link</a>
```

  </div>
</div>

<div class="doc-section">
  <h2>Color utilities</h2>
  <p>Semantic color classes communicate meaning without hardcoding hex values.</p>

  <div class="example">
    <div class="example-preview block">
      <p style="margin:0 0 var(--space-2)">Default foreground</p>
      <p class="text-muted" style="margin:0 0 var(--space-2)">text-muted - secondary copy</p>
      <p class="text-danger" style="margin:0 0 var(--space-2)">text-danger - error or destructive</p>
      <p class="text-success" style="margin:0 0 var(--space-2)">text-success - positive state</p>
      <p class="text-warning" style="margin:0">text-warning - caution</p>
    </div>

```html
<p>Default</p>
<p class="text-muted">Secondary</p>
<p class="text-danger">Error</p>
<p class="text-success">Success</p>
<p class="text-warning">Warning</p>
```

  </div>
</div>

<div class="doc-section">
  <h2>Best practices</h2>
  <ul>
    <li>Use one <code>&lt;h1&gt;</code> per page. Heading levels must not skip - <code>h1</code> → <code>h2</code> → <code>h3</code>, never <code>h1</code> → <code>h3</code>.</li>
    <li>Reserve <code>var(--font-display)</code> for large display text only - hero titles, section banners. Not body copy.</li>
    <li>Use <code>.text-muted</code> for supporting or secondary text. Avoid freeform <code>opacity</code> hacks for contrast reduction.</li>
    <li>Prefer <code>&lt;strong&gt;</code> and <code>&lt;em&gt;</code> over <code>.font-bold</code> when the intent is semantic (importance vs. visual style).</li>
    <li>Use <code>.text-danger</code> / <code>.text-success</code> alongside icon or label context - never as the sole signal for color-blind users.</li>
  </ul>
</div>
