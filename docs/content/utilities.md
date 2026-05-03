+++
title = "Utilities"
description = "Low-level CSS utility classes for layout, spacing, and composition."
+++

<div class="doc-section">
  <h2>Overview</h2>
  <p>Utility classes let you compose layouts directly in HTML without writing component CSS. They follow a mobile-first convention with responsive breakpoint prefixes: <code>sm:</code>, <code>md:</code>, <code>lg:</code>, <code>xl:</code>.</p>
  <p>Use utilities for one-off adjustments. When a pattern repeats across 3 or more places, extract it into a component.</p>
</div>

<div class="doc-section">
  <h2>Flexbox</h2>

  <div class="example">
    <div class="example-preview">
      <div class="flex gap-2" style="width:100%">
        <div class="util-demo-box flex-1">1</div>
        <div class="util-demo-box flex-1">2</div>
        <div class="util-demo-box flex-1">3</div>
      </div>
    </div>

```html
<div class="flex gap-2">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

  </div>

  <div class="example">
    <div class="example-preview">
      <div class="flex items-center justify-center" style="width:100%;height:5rem;border:1px dashed var(--border);border-radius:var(--radius)">
        <span class="text-muted text-sm">Centered</span>
      </div>
    </div>

```html
<div class="flex items-center justify-center">
  Centered
</div>
```

  </div>

  <div class="example">
    <div class="example-preview">
      <div class="flex items-center justify-between" style="width:100%;padding:var(--space-3);border:1px solid var(--border);border-radius:var(--radius)">
        <strong>Title</strong>
        <button data-variant="secondary" class="small">Action</button>
      </div>
    </div>

```html
<div class="flex items-center justify-between">
  <strong>Title</strong>
  <button data-variant="secondary" class="small">Action</button>
</div>
```

  </div>

  <div class="example">
    <div class="example-preview block">
      <div class="flex flex-col gap-2" style="width:100%">
        <div class="util-demo-box">First</div>
        <div class="util-demo-box">Second</div>
        <div class="util-demo-box">Third</div>
      </div>
    </div>

```html
<div class="flex flex-col gap-2">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</div>
```

  </div>

  <table class="props-table">
    <thead>
      <tr><th>Class</th><th>Property</th></tr>
    </thead>
    <tbody>
      <tr><td><code>flex</code></td><td><code>display: flex</code></td></tr>
      <tr><td><code>flex-row</code> / <code>flex-col</code></td><td>Flex direction</td></tr>
      <tr><td><code>flex-wrap</code></td><td><code>flex-wrap: wrap</code></td></tr>
      <tr><td><code>flex-1</code></td><td><code>flex: 1 1 0%</code> - fills available space equally</td></tr>
      <tr><td><code>flex-none</code></td><td><code>flex: none</code> - fixed size, no grow/shrink</td></tr>
      <tr><td><code>items-start</code> / <code>items-center</code> / <code>items-end</code></td><td>Align items on the cross axis</td></tr>
      <tr><td><code>justify-start</code> / <code>justify-center</code> / <code>justify-between</code></td><td>Distribute items on the main axis</td></tr>
      <tr><td><code>gap-1</code> → <code>gap-8</code></td><td>Gap using <code>--space-*</code> tokens</td></tr>
    </tbody>
  </table>
</div>

<div class="doc-section">
  <h2>Grid</h2>

  <div class="example">
    <div class="example-preview block">
      <div class="grid grid-cols-2 gap-2">
        <div class="util-demo-box">1</div>
        <div class="util-demo-box">2</div>
        <div class="util-demo-box">3</div>
        <div class="util-demo-box">4</div>
      </div>
    </div>

```html
<div class="grid grid-cols-2 gap-2">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

  </div>

  <div class="example">
    <div class="example-preview block">
      <div class="grid grid-cols-3 gap-2">
        <div class="util-demo-box">1</div>
        <div class="util-demo-box">2</div>
        <div class="util-demo-box">3</div>
        <div class="util-demo-box">4</div>
        <div class="util-demo-box">5</div>
        <div class="util-demo-box">6</div>
      </div>
    </div>

```html
<div class="grid grid-cols-3 gap-2">
  <!-- 6 items -->
</div>
```

  </div>

  <div class="example">
    <div class="example-preview block">
      <div class="grid grid-cols-3 gap-2">
        <div class="util-demo-box col-span-full">col-span-full</div>
        <div class="util-demo-box col-span-2">col-span-2</div>
        <div class="util-demo-box">1</div>
        <div class="util-demo-box">1</div>
        <div class="util-demo-box">1</div>
        <div class="util-demo-box">1</div>
      </div>
    </div>

```html
<div class="grid grid-cols-3 gap-2">
  <div class="col-span-full">Full width</div>
  <div class="col-span-2">Spans 2</div>
  <div>Spans 1</div>
  <!-- ... -->
</div>
```

  </div>

  <table class="props-table">
    <thead>
      <tr><th>Class</th><th>Property</th></tr>
    </thead>
    <tbody>
      <tr><td><code>grid</code></td><td><code>display: grid</code></td></tr>
      <tr><td><code>grid-cols-1</code> → <code>grid-cols-12</code></td><td>Equal-width column tracks</td></tr>
      <tr><td><code>col-span-1</code> → <code>col-span-6</code></td><td>Column span count</td></tr>
      <tr><td><code>col-span-full</code></td><td>Spans all columns (<code>1 / -1</code>)</td></tr>
      <tr><td><code>gap-1</code> → <code>gap-8</code></td><td>Grid gap using space tokens</td></tr>
    </tbody>
  </table>
</div>

<div class="doc-section">
  <h2>Combining flex + grid</h2>
  <p>Grid structures the outer layout. Flex handles alignment within each cell.</p>

  <div class="example">
    <div class="example-preview block">
      <div class="grid grid-cols-2 gap-3">
        <div class="card">
          <div class="card-body">
            <div class="flex items-center justify-between gap-2">
              <strong>Users</strong>
              <span class="badge" data-variant="success">Active</span>
            </div>
            <p class="text-muted text-sm" style="margin-top:var(--space-1);margin-bottom:0">1,204 total</p>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="flex items-center justify-between gap-2">
              <strong>Revenue</strong>
              <span class="badge">Stable</span>
            </div>
            <p class="text-muted text-sm" style="margin-top:var(--space-1);margin-bottom:0">$8,420</p>
          </div>
        </div>
      </div>
    </div>

```html
<div class="grid grid-cols-2 gap-3">
  <div class="card">
    <div class="card-body">
      <div class="flex items-center justify-between gap-2">
        <strong>Users</strong>
        <span class="badge" data-variant="success">Active</span>
      </div>
      <p class="text-muted text-sm">1,204 total</p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <div class="flex items-center justify-between gap-2">
        <strong>Revenue</strong>
        <span class="badge">Stable</span>
      </div>
      <p class="text-muted text-sm">$8,420</p>
    </div>
  </div>
</div>
```

  </div>
</div>

<div class="doc-section">
  <h2>Responsive prefixes</h2>
  <p>All layout utilities support breakpoint prefixes. Classes apply at the specified width and above (mobile-first).</p>

  <table class="props-table">
    <thead>
      <tr><th>Prefix</th><th>Breakpoint</th><th>Example</th></tr>
    </thead>
    <tbody>
      <tr><td><em>none</em></td><td>All screens</td><td><code>flex</code></td></tr>
      <tr><td><code>sm:</code></td><td>≥ 40rem (640px)</td><td><code>sm:grid-cols-2</code></td></tr>
      <tr><td><code>md:</code></td><td>≥ 48rem (768px)</td><td><code>md:flex-row</code></td></tr>
      <tr><td><code>lg:</code></td><td>≥ 64rem (1024px)</td><td><code>lg:grid-cols-3</code></td></tr>
      <tr><td><code>xl:</code></td><td>≥ 80rem (1280px)</td><td><code>xl:grid-cols-4</code></td></tr>
    </tbody>
  </table>

  <div class="example">
    <div class="example-preview block">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div class="util-demo-box">A</div>
        <div class="util-demo-box">B</div>
        <div class="util-demo-box">C</div>
      </div>
    </div>

```html
<!-- 1 col → 2 col at md → 3 col at lg -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>
```

  </div>
</div>

<div class="doc-section">
  <h2>Best practices</h2>
  <ul>
    <li>Use utilities for one-off layouts. Extract a component once the same combination repeats 3 or more times.</li>
    <li>Avoid stacking more than 4-5 utility classes on a single element - that signals a missing component abstraction.</li>
    <li>Use responsive prefixes (<code>md:flex-row</code>) rather than inline <code>@media</code> overrides.</li>
    <li>Use <code>gap-*</code> for spacing inside flex and grid containers - not margins between siblings.</li>
  </ul>
</div>
