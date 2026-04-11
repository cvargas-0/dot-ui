# @usedot/ui

> ⚠️ API may change between versions.

Minimal design system built with Web Components, TypeScript, CSS custom properties, and no dependencies.

## Install

```bash
npm install @usedot/ui
pnpm add @usedot/ui
yarn add @usedot/ui
```

## Setup

Import the components and a theme once in your app entry point:

```js
import '@usedot/ui'              // registers all components
import '@usedot/ui/themes/light' // light theme
```

For dark mode, import the dark theme instead — or import both and toggle with a class:

```js
import '@usedot/ui/themes/light'
import '@usedot/ui/themes/dark'
```

If you need access to the raw design tokens stylesheet:

```js
import '@usedot/ui/styles' // design tokens only
```

## Dark mode

The theme system supports three modes:

| Mode             | How to activate                          |
| ---------------- | ---------------------------------------- |
| Automatic        | No class — follows `prefers-color-scheme` |
| Force light      | Add `.light` to `<html>`                 |
| Force dark       | Add `.dark` to `<html>`                  |

```js
// toggle dark mode manually
document.documentElement.classList.toggle('dark')
```

## Usage

Components are standard HTML elements — use them anywhere:

```html
<dot-button>Save</dot-button>
<dot-button variant="outline">Cancel</dot-button>
<dot-button variant="danger" loading>Deleting…</dot-button>
<dot-button href="/home">Go home</dot-button>
```

## Components

| Component    | Attrs                                        | Status       |
| ------------ | -------------------------------------------- | ------------ |
| `dot-button` | `variant` `size` `disabled` `loading` `href` | experimental |
| `dot-badge`  | `variant` `size` `pill`                      | experimental |
| `dot-alert`  | `variant` `open` `closable`                  | experimental |

## License

[MIT](LICENSE)
