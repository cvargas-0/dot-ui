# dot-ui

Minimal Web Components design system. Vanilla TypeScript, CSS custom properties, no dependencies.

## Install

```bash
pnpm add dot-ui
```

## Usage

```html
<!-- Load both themes -->
<link rel="stylesheet" href="dot-ui/dist/themes/light.css" />
<link rel="stylesheet" href="dot-ui/dist/themes/dark.css" />

<!-- Import components -->
<script type="module">
  import 'dot-ui'
</script>

<!-- Use -->
<dot-button>Save</dot-button>
<dot-button variant="outline">Cancel</dot-button>
```

## Dark mode

Toggle `.dot-theme-dark` on `<html>`:

```js
document.documentElement.classList.toggle('dot-theme-dark')
```

## Components

| Component     | Status       |
| ------------- | ------------ |
| `dot-button`  | experimental |

## Dev

```bash
pnpm dev        # playground
pnpm build      # build → dist/
pnpm lint       # lint
pnpm bump       # version bump
```

## License

[MIT](LICENSE)
