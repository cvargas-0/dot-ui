+++
title = "Alert"
description = "Contextual feedback messages for user actions or system state."
+++

<div class="doc-section">
  <h2>Variants</h2>
  <div class="example">
    <div class="example-preview block">
      <div class="alert" role="alert" style="margin-bottom:var(--space-3)">
        <strong>Info:</strong> This is a neutral informational message.
      </div>
      <div class="alert" data-variant="success" role="alert" style="margin-bottom:var(--space-3)">
        <strong>Success:</strong> Your changes have been saved.
      </div>
      <div class="alert" data-variant="warning" role="alert" style="margin-bottom:var(--space-3)">
        <strong>Warning:</strong> Your trial expires in 3 days.
      </div>
      <div class="alert" data-variant="danger" role="alert">
        <strong>Error:</strong> Failed to connect. Please try again.
      </div>
    </div>

```html
<div class="alert" role="alert">
  <strong>Info:</strong> Neutral informational message.
</div>
<div class="alert" data-variant="success" role="alert">
  <strong>Success:</strong> Your changes have been saved.
</div>
<div class="alert" data-variant="warning" role="alert">
  <strong>Warning:</strong> Your trial expires in 3 days.
</div>
<div class="alert" data-variant="danger" role="alert">
  <strong>Error:</strong> Failed to connect. Please try again.
</div>
```

  </div>
</div>

<div class="doc-section">
  <h2>Props</h2>
  <table class="props-table">
    <thead><tr><th>Attribute</th><th>Values</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>data-variant</code></td><td><code>success</code> · <code>warning</code> · <code>danger</code></td><td>Semantic color. Omit for neutral/info.</td></tr>
      <tr><td><code>role="alert"</code></td><td>—</td><td>Required for screen reader announcements</td></tr>
    </tbody>
  </table>
</div>
