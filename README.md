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

Import the components and stylesheet once in your app entry point:

```js
import '@usedot/ui'       // registers all components
import '@usedot/ui/css'   // design tokens + themes
```

## Dark mode

Add `dot-theme-dark` to your `<html>` element to switch themes:

```js
document.documentElement.classList.toggle('dot-theme-dark')
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

| Component    | Status       |
| ------------ | ------------ |
| `dot-button` | experimental |

## License

[MIT](LICENSE)
