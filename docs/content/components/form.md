+++
title = "Form"
description = "Input controls styled by element type. No class needed on most native elements."
+++

<div class="doc-section">
  <h2>Text inputs</h2>
  <div class="example">
    <div class="example-preview block" style="max-width:24rem">
      <div class="form-group">
        <label for="demo-name">Full name</label>
        <input id="demo-name" type="text" placeholder="Jane Smith">
      </div>
      <div class="form-group" style="margin-top:var(--space-4)">
        <label for="demo-email">Email</label>
        <input id="demo-email" type="email" placeholder="jane@example.com">
        <p class="form-hint">We'll never share your email.</p>
      </div>
    </div>

```html
<div class="form-group">
  <label for="name">Full name</label>
  <input id="name" type="text" placeholder="Jane Smith">
</div>

<div class="form-group">
  <label for="email">Email</label>
  <input id="email" type="email" placeholder="jane@example.com">
  <p class="form-hint">We'll never share your email.</p>
</div>
```

  </div>
</div>

<div class="doc-section">
  <h2>Textarea &amp; Select</h2>
  <div class="example">
    <div class="example-preview block" style="max-width:24rem">
      <div class="form-group">
        <label for="demo-msg">Message</label>
        <textarea id="demo-msg" placeholder="Write something…"></textarea>
      </div>
      <div class="form-group" style="margin-top:var(--space-4)">
        <label for="demo-country">Country</label>
        <select id="demo-country">
          <option value="">Select a country</option>
          <option>United States</option>
          <option>Colombia</option>
          <option>Spain</option>
        </select>
      </div>
    </div>

```html
<div class="form-group">
  <label for="msg">Message</label>
  <textarea id="msg" placeholder="Write something…"></textarea>
</div>

<div class="form-group">
  <label for="country">Country</label>
  <select id="country">
    <option value="">Select a country</option>
    <option>United States</option>
  </select>
</div>
```

  </div>
</div>

<div class="doc-section">
  <h2>Validation state</h2>
  <div class="example">
    <div class="example-preview block" style="max-width:24rem">
      <div class="form-group">
        <label for="demo-invalid">Username</label>
        <input id="demo-invalid" type="text" value="x" aria-invalid="true" aria-describedby="demo-invalid-err">
        <p class="form-error" id="demo-invalid-err">Must be at least 3 characters.</p>
      </div>
    </div>

```html
<div class="form-group">
  <label for="username">Username</label>
  <input id="username" type="text" value="x"
         aria-invalid="true" aria-describedby="username-err">
  <p class="form-error" id="username-err">Must be at least 3 characters.</p>
</div>
```

  </div>
</div>

<div class="doc-section">
  <h2>Checkbox &amp; Radio</h2>
  <div class="example">
    <div class="example-preview block">
      <div class="form-group">
        <label class="flex items-center gap-2">
          <input type="checkbox" checked> Remember me
        </label>
      </div>
      <fieldset style="margin-top:var(--space-4)">
        <legend>Notifications</legend>
        <div class="flex flex-col gap-2" style="margin-top:var(--space-3)">
          <label class="flex items-center gap-2"><input type="radio" name="notif" checked> All</label>
          <label class="flex items-center gap-2"><input type="radio" name="notif"> Mentions only</label>
          <label class="flex items-center gap-2"><input type="radio" name="notif"> None</label>
        </div>
      </fieldset>
    </div>

```html
<label class="flex items-center gap-2">
  <input type="checkbox"> Remember me
</label>

<fieldset>
  <legend>Notifications</legend>
  <label class="flex items-center gap-2">
    <input type="radio" name="notif"> All
  </label>
  <label class="flex items-center gap-2">
    <input type="radio" name="notif"> Mentions only
  </label>
</fieldset>
```

  </div>
</div>

<div class="doc-section">
  <h2>Helpers</h2>
  <table class="props-table">
    <thead><tr><th>Class</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>.form-group</code></td><td>Stacks label, input, and hint vertically</td></tr>
      <tr><td><code>.form-hint</code></td><td>Secondary help text below the field</td></tr>
      <tr><td><code>.form-error</code></td><td>Validation error message below the field</td></tr>
      <tr><td><code>aria-invalid="true"</code></td><td>Applies invalid styling to the input - no class needed</td></tr>
    </tbody>
  </table>
</div>
